import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const faqs = [
  ['What is NEET UG?', 'NEET UG is the national entrance test for admission to MBBS, BDS and other undergraduate medical courses in India.'],
  ['Who is eligible for NEET UG?', 'Candidates must meet the age and Class 12 requirements (Physics, Chemistry, Biology and English) set by the National Testing Agency. Always check the current official notice.'],
  ['How many times can I attempt NEET UG?', 'The number of attempts is not capped under the current rules. Confirm the latest rules on the official NTA website.'],
  ['How are MBBS seats allotted in India?', 'Seats are allotted through counselling: MCC handles All India Quota and some institutions, while state authorities handle state quota seats.'],
  ['Do I need NEET to study MBBS abroad?', 'Indian students generally need to qualify NEET to be eligible to practise in India after a foreign medical degree. Check current NMC rules.'],
  ['What documents will I need?', 'Typically Class 10 and 12 marksheets, NEET scorecard and admit card, ID proof, photographs and category certificates if applicable.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="container-page max-w-3xl py-20">
      <SectionHeading title="Frequently asked questions" text="Quick answers on NEET, counselling and admissions." />
      <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-pine-900">
              {q} <ChevronDown size={18} className={`shrink-0 transition ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
