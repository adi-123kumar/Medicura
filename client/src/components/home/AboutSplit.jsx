import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Eyebrow from '../common/Eyebrow';

const POINTS = ['University and course exploration', 'Admission process guidance', 'Application and document planning', 'Support for your next steps'];

export function AboutCard() {
  return (
    <div className="relative pb-9">
      <div className="relative aspect-[1.2/1] overflow-hidden rounded-[8px] rounded-tl-[150px] bg-gradient-to-br from-navy-800 via-navy-600 to-leaf-400">
        <div className="absolute inset-0 opacity-[0.12] [background:repeating-linear-gradient(135deg,transparent_0_22px,#fff_22px_23px)]" aria-hidden="true" />
        <div className="absolute left-[18%] top-[16%] h-[68%] w-[56%] rounded-full bg-white/[0.07]" aria-hidden="true" />
        <div className="absolute left-1/2 top-[44%] h-[62%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-navy-700/30 text-center" aria-hidden="true" />
        <div className="absolute left-[46%] top-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-display text-[clamp(4rem,9vw,7rem)] font-light leading-none tracking-[-0.06em] text-white">MC</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-wide text-leaf-100">WORLD</p>
        </div>
        <span className="absolute bottom-[8%] right-[6%] grid h-[76px] w-[76px] -rotate-6 place-items-center rounded-full bg-leaf-50 text-center text-[9.5px] font-extrabold uppercase leading-tight tracking-wider text-navy-700">Guidance<br />with care</span>
      </div>
      <p className="absolute bottom-0 left-0 max-w-[85%] rounded-[3px] bg-white px-6 py-5 text-[17px] text-navy-700 shadow-[0_20px_40px_-20px_rgba(11,32,88,0.35)]">A supportive guide for your next step.</p>
    </div>
  );
}

export default function AboutSplit() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <AboutCard />
        <div>
          <Eyebrow className="!text-slate-500">About MediCura World</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.2vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.05em]">Guidance that keeps <span className="text-leaf-600">your goals</span> in focus.</h2>
          <p className="mt-6 max-w-[580px] text-[17px] leading-[1.8] text-slate-500">Choosing where and how to study medicine involves many decisions. Explore your options, organize your questions and learn which details to verify before making a decision.</p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3.5 text-[16px] font-bold text-navy-700">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-leaf-50 text-leaf-600"><Check size={15} strokeWidth={3} /></span>{p}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/about" className="btn-outline">About us <ArrowUpRight size={15} /></Link>
            <Link to="/contact#inquiry" className="inline-flex items-center gap-2 text-[15px] font-bold text-navy-700 hover:underline">Speak with a counselor <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
