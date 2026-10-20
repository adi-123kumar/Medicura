import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Clock, Star, Users } from 'lucide-react';
import { collegeUrl } from '../../utils/colleges';
import { CATEGORIES } from '../../config/categories';

const TYPE_STYLE = {
  Government: 'bg-pine-900 text-white',
  Private: 'bg-coral-500 text-pine-950',
  Trust: 'bg-lake-700 text-white',
  Society: 'bg-lake-600 text-white',
  Deemed: 'bg-slate-700 text-white',
};

const initials = (name) => name.replace(/\(.*?\)/g, '').split(/\s+/).filter((w) => /^[A-Za-z]/.test(w) && w.length > 2).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function Cover({ college }) {
  if (college.image) return <img src={college.image} alt={college.name} loading="lazy" className="h-full w-full object-cover" />;
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-to-br from-pine-800 via-pine-700 to-lake-700">
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
        <defs><pattern id="plus" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M12 6h4v6h6v4h-6v6h-4v-6H6v-4h6z" fill="#fff" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#plus)" />
      </svg>
      <span className="relative font-display text-5xl font-extrabold tracking-tight text-white/90">{initials(college.shortName) || '+'}</span>
    </div>
  );
}

export default function CollegeCard({ college }) {
  const category = CATEGORIES[college.category];
  const isAbroad = college.category === 'mbbs-abroad';
  const approved = isAbroad ? (college.isWho ? 'WHO & NMC' : college.isNmc ? 'NMC' : null) : college.isNmc ? 'NMC approved' : null;
  const pill = isAbroad ? college.feature : college.ranking;
  const sub = [college.city, isAbroad ? college.country : null, isAbroad ? college.medium : null, college.recognition].filter(Boolean).join(' • ');

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative h-44">
        <Cover college={college} />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${TYPE_STYLE[college.type] || 'bg-slate-700 text-white'}`}>{college.type}</span>
        {approved && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-lake-700 shadow">
            <BadgeCheck size={13} /> {approved}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {pill && (
          <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-coral-50 px-2.5 py-1 text-[11px] font-bold uppercase text-coral-600">
            <Star size={12} fill="currentColor" /> {pill}
          </span>
        )}
        <h3 className="text-lg font-bold leading-snug"><Link to={collegeUrl(college)} className="after:absolute after:inset-0 hover:text-lake-700">{college.name}</Link></h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{sub}</p>
        <div className="mt-4 rounded-2xl bg-coral-50 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-coral-600">Fees</p>
          <p className="mt-0.5 text-sm font-bold text-pine-900">{college.fees.tuition}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {isAbroad ? <Clock size={13} /> : <Users size={13} />}
            {isAbroad ? college.duration || 'Duration on request' : college.seats ? `${college.seats} seats` : 'Seats on request'}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-coral-600">{category.cardCta} <ArrowRight size={15} /></span>
        </div>
      </div>
    </article>
  );
}
