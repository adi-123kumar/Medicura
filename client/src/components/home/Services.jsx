import { ClipboardCheck, Compass, FileCheck2, Plane, UserRound, Wallet } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const services = [
  { icon: Compass, title: 'College shortlisting', text: 'Match colleges to your NEET score, budget and preferred location.' },
  { icon: ClipboardCheck, title: 'Counselling support', text: 'Guidance on registration, choice filling and seat allotment rounds.' },
  { icon: FileCheck2, title: 'Documentation', text: 'A clear checklist so nothing is missed at reporting or verification.' },
  { icon: Wallet, title: 'Fee clarity', text: 'Understand tuition, hostel and other costs before you commit.' },
  { icon: Plane, title: 'Abroad support', text: 'Visa, travel and pre-departure help for MBBS abroad students.' },
  { icon: UserRound, title: 'One-to-one mentoring', text: 'A counsellor who knows your situation, from first call to admission.' },
];

export default function Services() {
  return (
    <section className="container-page py-20">
      <SectionHeading title="How we help you" text="Support at each stage of your medical admission journey." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-lake-600">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lake-50 text-lake-700"><Icon size={22} /></span>
            <h3 className="mt-4 text-lg font-bold">{title}</h3>
            <p className="mt-1.5 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
