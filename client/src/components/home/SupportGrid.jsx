import { Asterisk } from 'lucide-react';
import SectionIntro from './SectionIntro';

const ITEMS = [
  ['Career conversation', 'Discuss your interests and goals.'],
  ['University options', 'Explore institutions and destinations.'],
  ['Admission guidance', 'Organize your application questions.'],
  ['Personal support', 'Consider options that fit your needs.'],
  ['Document planning', 'Review the relevant official checklists.'],
  ['Next-step planning', 'Prepare for the transition to a new campus.'],
];

export default function SupportGrid() {
  return (
    <section className="bg-mist pb-20 pt-4 md:pb-28">
      <div className="container-page">
        <SectionIntro eyebrow="Support at every step" line1="A thoughtful guide," line2="from shortlist to start." text="Practical support to help you understand your options and prepare for the next stage of your journey." />
        <ol className="mt-12 grid overflow-hidden border border-navy-100 bg-white sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(([title, text], i) => (
            <li key={title} className="relative min-h-[195px] border-b border-navy-100 p-8 sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l lg:[&:nth-last-child(-n+3)]:border-b-0">
              <span className="absolute right-6 top-5 text-[11px] font-semibold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
              <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-leaf-50 text-leaf-500"><Asterisk size={20} /></span>
              <h3 className="mt-6 text-[20px] font-bold tracking-[-0.03em] text-navy-700">{title}</h3>
              <p className="mt-2 text-[15px] text-slate-500">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
