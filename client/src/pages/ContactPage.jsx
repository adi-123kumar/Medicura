import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import Eyebrow from '../components/common/Eyebrow';
import InquiryForm, { COURSES } from '../features/inquiry/InquiryForm';
import { CATEGORIES } from '../config/categories';
import { findCollege } from '../utils/colleges';
import { site } from '../config/site';

function InfoCard({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-4 border border-navy-100 bg-mist px-5 py-4">
      <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-leaf-50 text-leaf-600"><Icon size={19} /></span>
      <div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">{label}</p><div className="mt-0.5 text-[15px] font-bold text-navy-700">{children}</div></div>
    </div>
  );
}

export default function ContactPage() {
  const [params] = useSearchParams();
  useEffect(() => { document.title = `Contact | ${site.name}`; }, []);

  // Links like /contact?college=<slug>&category=mbbs-india or ?interest=MBBS%20Abroad pre-fill the form.
  const college = findCollege(params.get('category'), params.get('college'));
  const interest = params.get('interest');
  const defaultCourse = college ? CATEGORIES[college.category].course : COURSES.includes(interest) ? interest : undefined;
  const defaultMessage = college ? `I would like guidance about ${college.name}.` : '';

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="lg:pt-4">
          <Eyebrow className="!text-slate-500">We’re here to listen</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.6rem,5.4vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.05em] text-navy-700">
            Bring your<br />questions.<br /><span className="text-leaf-600">We’ll start there.</span>
          </h1>
          <p className="mt-8 max-w-[440px] text-[15px] leading-relaxed text-slate-500">
            Tell us what you are exploring. Call us at {site.phone} or send your inquiry using the form.
          </p>
          <div className="mt-10 max-w-[520px] space-y-3">
            <InfoCard icon={Phone} label="Phone"><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:underline">{site.phone}</a></InfoCard>
            <InfoCard icon={MapPin} label="Office">{site.address}</InfoCard>
          </div>
        </div>

        <div id="inquiry" className="scroll-mt-28 border border-navy-100 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(11,32,88,0.45)] sm:p-10">
          {/* key re-creates the form when the pre-filled college/course changes */}
          <InquiryForm key={`${college?.slug || ''}-${defaultCourse || ''}`} college={college} defaultCourse={defaultCourse} defaultMessage={defaultMessage} />
        </div>
      </div>
    </section>
  );
}
