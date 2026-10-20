import { useEffect, useState } from 'react';
import { CheckCircle2, GraduationCap, Mail, Phone, User } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { api, ApiError } from '../../services/api';
import { CATEGORIES } from '../../config/categories';

const COURSES = ['MBBS India', 'MBBS Abroad', 'MD / MS', 'Not sure yet'];
const empty = { fullName: '', email: '', phone: '', course: '', neetScore: '', message: '' };

function validate(v) {
  const e = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name';
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address';
  if (!/^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number';
  if (!v.course) e.course = 'Select a course';
  if (v.neetScore !== '' && !(Number(v.neetScore) >= 0 && Number(v.neetScore) <= 720)) e.neetScore = 'Score must be between 0 and 720';
  return e;
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-pine-900">{label}</span>
      <span className="relative block">
        {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        {children}
      </span>
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

export default function GuidanceModal({ open, onClose, college }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    setErrors({});
    setFormError('');
    setValues((v) => ({ ...v, course: college ? CATEGORIES[college.category]?.course || v.course : v.course }));
  }, [open, college]);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus('sending');
    setFormError('');
    try {
      await api.submitApplication({
        ...values,
        neetScore: values.neetScore === '' ? null : Number(values.neetScore),
        message: values.message || null,
        collegeSlug: college?.slug || null,
        collegeName: college?.name || null,
        collegeCategory: college?.category || null,
      });
      setValues(empty);
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      if (err instanceof ApiError && Object.keys(err.errors).length) setErrors(err.errors);
      setFormError(err.message);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Free counselling"
      subtitle={college ? `Enquiring about ${college.name}` : 'Share your details and a counsellor will call you shortly.'}
    >
      {status === 'done' ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto text-lake-600" size={48} />
          <h3 className="mt-4 text-xl font-bold">We have your details</h3>
          <p className="mt-2 text-sm text-slate-600">A counsellor will contact you shortly on the number you shared.</p>
          <button onClick={onClose} className="btn-ink mt-6">Close</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <Field label="Full name" icon={User} error={errors.fullName}>
            <input className="field pl-9" value={values.fullName} onChange={set('fullName')} autoComplete="name" placeholder="Your full name" />
          </Field>
          <Field label="Email address" icon={Mail} error={errors.email}>
            <input type="email" className="field pl-9" value={values.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" />
          </Field>
          <Field label="Mobile number" icon={Phone} error={errors.phone}>
            <input type="tel" className="field pl-9" value={values.phone} onChange={set('phone')} autoComplete="tel" placeholder="10-digit mobile number" />
          </Field>
          <Field label="Course interested" icon={GraduationCap} error={errors.course}>
            <select className="field pl-9" value={values.course} onChange={set('course')}>
              <option value="">Select course</option>
              {COURSES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="NEET score (optional)" error={errors.neetScore}>
            <input type="number" min="0" max="720" className="field" value={values.neetScore} onChange={set('neetScore')} placeholder="Out of 720" />
          </Field>
          {formError && !Object.keys(errors).length && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}
          <button type="submit" disabled={status === 'sending'} className="btn-ink w-full">
            {status === 'sending' ? 'Sending…' : 'Get free consultation'}
          </button>
        </form>
      )}
    </Modal>
  );
}
