import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionIntro from './SectionIntro';

const PATHS = [
  { n: '01', tag: 'India', code: 'IND', title: 'MBBS in India', text: 'Explore colleges, NEET counselling and admission steps across states.', to: '/colleges/mbbs-india', tint: 'bg-navy-50 text-navy-700' },
  { n: '02', tag: 'Global', code: 'INT', title: 'MBBS Abroad', text: 'Compare international destinations and university options.', to: '/colleges/mbbs-abroad', tint: 'bg-leaf-50 text-leaf-700' },
  { n: '03', tag: 'Postgraduate', code: 'PG', title: 'MD / MS', text: 'Explore postgraduate medical education pathways.', to: '/colleges/md-ms', tint: 'bg-navy-50 text-navy-700' },
];

export default function Pathways() {
  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="container-page">
        <SectionIntro eyebrow="Your medical journey" line1="Choose a path." line2="Build a future." text="Explore different medical education pathways and identify which option best fits your goals." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PATHS.map((p) => (
            <article key={p.n} className="group relative flex flex-col rounded-[4px] border border-navy-100 bg-white p-8 transition hover:border-navy-300 hover:shadow-[0_24px_40px_-28px_rgba(11,32,88,0.5)]">
              <div className="flex items-start justify-between">
                <span className="text-[26px] font-light text-slate-300">{p.n}</span>
                <span className="rounded-full bg-leaf-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-leaf-700">{p.tag}</span>
              </div>
              <span className={`mt-7 grid h-[58px] w-[58px] place-items-center rounded-full text-[13px] font-bold tracking-[0.12em] ${p.tint}`}>{p.code}</span>
              <h3 className="mt-6 text-[28px] font-bold tracking-[-0.04em]">{p.title}</h3>
              <p className="mt-3 text-base leading-[1.75] text-slate-500">{p.text}</p>
              <Link to={p.to} className="mt-7 inline-flex items-center gap-2 text-[15px] font-bold text-navy-700 after:absolute after:inset-0">Explore pathway <ArrowUpRight size={15} /></Link>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[4px] border border-navy-100 bg-white px-6 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-leaf-500/40 text-lg text-leaf-600">?</span>
            <p className="leading-snug"><b className="block text-[15px] font-bold text-navy-700">Not sure where to begin?</b><span className="text-sm text-slate-500">Let’s talk through your options.</span></p>
          </div>
          <Link to="/contact#inquiry" className="btn-outline btn-sm">Get guidance <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </section>
  );
}
