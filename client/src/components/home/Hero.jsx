import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Eyebrow from '../common/Eyebrow';
import HeroArt from './HeroArt';

export default function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-mist via-white to-leaf-50/70">
      <div className="pointer-events-none absolute -left-44 top-24 h-[560px] w-[560px] rounded-full bg-navy-100/40" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-14 pb-16 pt-14 lg:grid-cols-[1.02fr_1fr] lg:pt-[72px]">
        <div>
          <Eyebrow>MBBS admissions · India &amp; abroad</Eyebrow>
          <h1 className="mt-7 text-[clamp(2.8rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.05em]">
            Find your way to <span className="text-leaf-600">a future in medicine.</span>
          </h1>
          <p className="mt-8 max-w-[520px] text-lg leading-[1.8] text-slate-500">
            Explore medical education pathways, compare college options, and get guidance for your next admission step.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/contact#inquiry" className="btn-primary">Talk to an expert <ArrowUpRight size={16} /></Link>
            <Link to="/colleges/mbbs-india" className="btn-outline">Explore colleges <ArrowUpRight size={16} /></Link>
          </div>
          <div className="mt-12 flex items-center gap-4">
            <span className="grid h-[50px] w-[50px] place-items-center rounded-full border border-leaf-500/40 bg-white text-xl font-medium text-leaf-600">M</span>
            <p className="leading-snug"><b className="block text-[15px] font-semibold text-navy-700">One step at a time.</b><span className="text-sm text-slate-500">Guidance built around your goals.</span></p>
          </div>
        </div>

        <div className="relative mx-auto aspect-[6/7] w-full max-w-[600px] overflow-hidden rounded-[32px] bg-navy-100 shadow-[0_40px_80px_-40px_rgba(11,32,88,0.55)]">
          {photoFailed ? (
            <HeroArt />
          ) : (
            <img src="/hero.jpg" alt="Student looking toward a medical college campus" className="h-full w-full object-cover" onError={() => setPhotoFailed(true)} />
          )}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-900/90 to-transparent" aria-hidden="true" />
          <Link to="/contact#inquiry" className="group absolute bottom-24 left-6 w-[250px] rounded-sm bg-navy-800 p-6 text-white shadow-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-leaf-300">Your journey</p>
            <p className="mt-3 pr-6 text-[19px] font-bold leading-snug text-white">Starts with a clear next step.</p>
            <ArrowUpRight size={17} className="absolute bottom-5 right-5 text-leaf-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <p className="absolute bottom-6 left-6 flex items-center gap-2.5 text-sm font-semibold text-white"><span className="h-2.5 w-2.5 rounded-full bg-leaf-400" /> Every future doctor starts somewhere.</p>
        </div>
      </div>

      <div className="container-page relative flex items-center gap-5 pb-9 text-[12px] font-bold uppercase tracking-[0.17em] text-slate-500">
        <span>Guidance for aspiring doctors</span>
        <span className="h-px w-11 bg-navy-600" aria-hidden="true" />
        <span>India · Abroad · Postgraduate</span>
      </div>
    </section>
  );
}
