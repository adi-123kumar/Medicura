import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORY_LIST } from '../../config/categories';
import { contactUrl } from '../../utils/colleges';

export default function GuidanceSidebar({ college }) {
  const year = new Date().getFullYear();
  return (
    <aside className="space-y-4 lg:sticky lg:top-[170px] lg:self-start">
      <div className="rounded-[20px] bg-navy-800 p-7 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-leaf-300">Admission {year}–{String(year + 1).slice(2)}</p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-white">Questions about {college.shortName}?</h3>
        <p className="mt-2 text-sm text-navy-200">A counselor can walk you through fees, seats and the admission route.</p>
        <Link to={contactUrl({ college })} className="btn-white mt-6 w-full">Ask a counselor <ArrowUpRight size={16} /></Link>
      </div>
      <div className="space-y-3 rounded-[20px] border border-navy-100 bg-white p-4">
        <div className="rounded-2xl bg-leaf-50 p-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-wider text-leaf-700">Annual fees</p>
          <p className="mt-1 font-extrabold text-navy-ink">{college.fees.tuition}</p>
        </div>
        {college.fees.nri && (
          <div className="rounded-2xl bg-navy-50 p-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">NRI quota fees</p>
            <p className="mt-1 font-extrabold text-navy-ink">{college.fees.nri}</p>
          </div>
        )}
        <p className="pt-2 text-center text-[11px] font-bold uppercase tracking-[0.17em] text-navy-700">Quick links</p>
        {CATEGORY_LIST.map((c) => (
          <Link key={c.key} to={c.path} className="flex items-center justify-center gap-2 rounded-xl border border-navy-100 p-3 text-sm font-semibold text-navy-700 hover:border-navy-700">{c.navLabel}</Link>
        ))}
      </div>
    </aside>
  );
}
