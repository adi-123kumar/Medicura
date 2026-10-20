import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';
import { CATEGORIES } from '../../config/categories';
import { ALL_COLLEGES } from '../../data';
import { formatNumber } from '../../utils/colleges';
import { useGuidance } from '../../features/guidance/GuidanceContext';

export default function Hero() {
  const { openGuidance } = useGuidance();
  const india = CATEGORIES['mbbs-india'].colleges.length;
  const abroad = CATEGORIES['mbbs-abroad'].colleges.length;
  return (
    <section className="relative overflow-hidden bg-pine-900 text-white">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lake-600/30 blur-3xl" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-coral-400">
            <Stethoscope size={16} /> MBBS and MD/MS admission guidance
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl">
            Find the right medical college, in India or abroad.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-pine-100">
            Compare {formatNumber(ALL_COLLEGES.length)} colleges by fees, seats, recognition and admission route, then talk to a counsellor who helps with every step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => openGuidance()} className="btn-accent px-7 py-3.5 text-base">Get free counselling</button>
            <Link to={CATEGORIES['mbbs-india'].path} className="btn border border-white/30 px-7 py-3.5 text-base text-white hover:bg-white/10">
              Explore colleges <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-400">Browse by pathway</p>
          <div className="mt-4 space-y-3">
            {[
              ['mbbs-india', `${india} colleges across India`],
              ['mbbs-abroad', `${abroad} universities overseas`],
              ['md-ms', 'Postgraduate programmes'],
            ].map(([key, text]) => (
              <Link key={key} to={CATEGORIES[key].path} className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 transition hover:bg-white/20">
                <span><b className="block text-white">{CATEGORIES[key].navLabel}</b><span className="text-sm text-pine-100">{text}</span></span>
                <ArrowRight size={18} className="text-coral-400" />
              </Link>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-pine-100"><ShieldCheck size={15} className="text-coral-400" /> We never collect fees on behalf of colleges.</p>
        </div>
      </div>
    </section>
  );
}
