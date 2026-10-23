import { Link } from 'react-router-dom';
import { ArrowUpRight, Asterisk } from 'lucide-react';

export default function ExploreOptions() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[28px] border border-navy-100 lg:grid-cols-[1.03fr_1fr]">
          <div className="relative overflow-hidden bg-navy-800 p-9 text-white md:p-12">
            <svg className="pointer-events-none absolute -right-10 -top-24 h-[420px] w-[420px] text-white/[0.06]" viewBox="0 0 400 400" fill="none" aria-hidden="true">
              <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="40" />
              <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="24" />
            </svg>
            <div className="relative">
              <p className="text-[12px] font-bold uppercase tracking-[0.17em] text-leaf-300">Explore your options</p>
              <h2 className="mt-5 max-w-[470px] text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-[1.08] text-white">Find a college that inspires your next step.</h2>
              <p className="mt-5 max-w-[470px] text-[15px] leading-relaxed text-navy-200">Compare institutions and build a shortlist based on your interests. Verify admission information through official sources.</p>
              <Link to="/colleges/mbbs-india" className="btn-white mt-8">Browse MBBS colleges <ArrowUpRight size={16} /></Link>
            </div>
          </div>
          <div className="relative bg-mist p-9 md:p-12">
            <Asterisk size={26} className="absolute right-8 top-8 text-leaf-500" aria-hidden="true" />
            <div className="flex h-full flex-col items-start justify-center gap-7 sm:flex-row sm:items-center">
              <div className="grid h-[100px] w-[100px] shrink-0 place-items-center rounded-full border border-navy-100 bg-white text-center shadow-[inset_0_0_0_9px_#f4f7fc]">
                <span className="leading-tight"><b className="block text-[15px] font-bold text-navy-700">MC</b><span className="block text-[9.5px] font-bold uppercase tracking-wide text-leaf-600">Medical<br />Education</span></span>
              </div>
              <div>
                <p className="eyebrow-plain !text-slate-500">College explorer</p>
                <h3 className="mt-2 text-[28px] font-bold leading-tight">Explore your possibilities</h3>
                <p className="mt-1.5 text-slate-500">India and international destinations</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <Link to="/colleges/mbbs-india" className="rounded-full bg-navy-100/70 px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-100">MBBS India</Link>
                  <Link to="/colleges/mbbs-abroad" className="rounded-full bg-navy-100/70 px-4 py-2 text-xs font-bold text-navy-700 hover:bg-navy-100">MBBS Abroad</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
