import { CATEGORIES } from '../../config/categories';
import { Link } from 'react-router-dom';
import { BookOpen, Globe2, GraduationCap } from 'lucide-react';
import { useGuidance } from '../../features/guidance/GuidanceContext';

const icons = { 'mbbs-india': BookOpen, 'mbbs-abroad': Globe2, 'md-ms': GraduationCap };

export default function GuidanceSidebar({ college }) {
  const { openGuidance } = useGuidance();
  return (
    <aside className="space-y-4 lg:sticky lg:top-44">
      <div className="rounded-3xl bg-pine-900 p-6 text-center text-white">
        <h3 className="text-xl font-extrabold text-white">Admission {new Date().getFullYear()}–{String(new Date().getFullYear() + 1).slice(2)}</h3>
        <p className="mt-2 text-sm text-pine-100">Expert guidance for counselling and college selection.</p>
        <button onClick={() => openGuidance({ college })} className="btn-accent mt-5 w-full py-3.5">Apply for guidance</button>
      </div>
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4">
        <div className="rounded-2xl bg-coral-50 p-4 text-center">
          <p className="text-[11px] font-bold uppercase text-coral-600">Annual fees</p>
          <p className="mt-1 font-extrabold text-pine-900">{college.fees.tuition}</p>
        </div>
        {college.fees.nri && (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
            <p className="text-[11px] font-bold uppercase text-slate-500">NRI quota fees</p>
            <p className="mt-1 font-extrabold text-pine-900">{college.fees.nri}</p>
          </div>
        )}
        <p className="pt-2 text-center text-xs font-bold uppercase tracking-widest text-pine-900">Quick links</p>
        {Object.values(CATEGORIES).map((c) => {
          const Icon = icons[c.key];
          return (
            <Link key={c.key} to={c.path} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 p-3 text-sm font-semibold text-pine-800 hover:border-pine-900">
              <Icon size={16} /> {c.navLabel}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
