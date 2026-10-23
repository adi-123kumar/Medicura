import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { api, ApiError } from '../../services/api';

export const COURSES = ['MBBS in India', 'MBBS Abroad', 'MD / MS', 'NEET guidance', 'Other'];

const emptyValues = (course, message) => ({ fullName: '', email: '', phone: '', course: course || COURSES[0], neetScore: '', message: message || '', website: '' });

function validate(v, { showNeet }) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name';
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Enter a valid email address';
  if (v.phone.trim() && !/^\+?[0-9][0-9\s-]{6,17}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number';
  if (v.message.trim().length < 5) e.message = 'Tell us how we can help';
  if (showNeet && v.neetScore !== '' && !(Number(v.neetScore) >= 0 && Number(v.neetScore) <= 720)) e.neetScore = 'Score must be between 0 and 720';
  return e;
}

function Field({ label, required, error, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">{label}{required && <span className="text-navy-700"> *</span>}</label>
      {children}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

/**
 * "Request a conversation" form. Submitting it creates a record the admin dashboard shows.
 * Props: college (adds the college to the record), defaultCourse, defaultMessage, source, showNeet.
 */
export default function InquiryForm({ college, defaultCourse, defaultMessage, source = 'contact', showNeet = false, title = 'Request a conversation.' }) {
  const [values, setValues] = useState(() => emptyValues(defaultCourse, defaultMessage));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [formError, setFormError] = useState('');

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values, { showNeet });
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    setFormError('');
    try {
      await api.submitApplication({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || null,
        course: values.course,
        neetScore: showNeet && values.neetScore !== '' ? Number(values.neetScore) : null,
        message: values.message.trim(),
        website: values.website,
        source: college ? 'college' : source,
        collegeSlug: college?.slug || null,
        collegeName: college?.name || null,
        collegeCategory: college?.category || null,
      });
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      if (err instanceof ApiError && Object.keys(err.errors).length) setErrors(err.errors);
      setFormError(err.message);
    }
  }

  if (status === 'done') {
    return (
      <div className="py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto text-leaf-500" size={52} />
        <h2 className="mt-5 text-3xl font-bold">Thank you, {values.fullName.trim().split(' ')[0]}.</h2>
        <p className="mx-auto mt-3 max-w-sm text-slate-500">We have your inquiry. A counselor will get back to you using the details you shared.</p>
        <button onClick={() => { setValues(emptyValues(defaultCourse, defaultMessage)); setStatus('idle'); }} className="btn-outline mt-8">Send another inquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <h2 className="text-[28px] font-bold tracking-[-0.03em]">{title}</h2>
      {college && <p className="-mt-3 rounded-md bg-leaf-50 px-4 py-3 text-sm font-semibold text-leaf-700">About: {college.name}</p>}

      <Field label="Full name" required error={errors.fullName} htmlFor="f-name">
        <input id="f-name" className="field !h-14" value={values.fullName} onChange={set('fullName')} autoComplete="name" placeholder="Your name" />
      </Field>
      <Field label="Email address" required error={errors.email} htmlFor="f-email">
        <input id="f-email" type="email" className="field !h-14" value={values.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />
      </Field>
      <Field label="Phone number" error={errors.phone} htmlFor="f-phone">
        <input id="f-phone" type="tel" className="field !h-14" value={values.phone} onChange={set('phone')} autoComplete="tel" placeholder="Your phone number" />
      </Field>
      <Field label="Interested in" error={errors.course} htmlFor="f-course">
        <div className="relative">
          <select id="f-course" className="field !h-14 appearance-none pr-11" value={values.course} onChange={set('course')}>
            {COURSES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy-700" />
        </div>
      </Field>
      {showNeet && (
        <Field label="NEET score (out of 720)" error={errors.neetScore} htmlFor="f-neet">
          <input id="f-neet" type="number" min="0" max="720" inputMode="numeric" className="field !h-14" value={values.neetScore} onChange={set('neetScore')} placeholder="e.g. 540" />
        </Field>
      )}
      <Field label="Your message" required error={errors.message} htmlFor="f-message">
        <textarea id="f-message" rows={4} className="field" value={values.message} onChange={set('message')} placeholder="How can we help?" maxLength={1500} />
      </Field>

      {/* Honeypot: hidden from people, bots fill it in. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
      </div>

      {formError && !Object.keys(errors).length && <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{formError}</p>}
      <button type="submit" disabled={status === 'sending'} className="btn-primary !h-[60px] w-full text-base">
        {status === 'sending' ? 'Sending…' : <>Submit inquiry <ArrowUpRight size={17} /></>}
      </button>
    </form>
  );
}
