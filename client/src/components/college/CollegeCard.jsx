import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { collegeUrl } from '../../utils/colleges';
import CollegeImage from './CollegeImage';

const initials = (name) =>
  name.replace(/\(.*?\)/g, '').split(/\s+/).filter((w) => /^[A-Za-z]/.test(w) && w.length > 2).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function Monogram({ college }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-navy-600 via-navy-800 to-navy-900">
      <span className="-mt-10 font-display text-6xl font-bold tracking-tight text-white/20">{initials(college.shortName) || '+'}</span>
    </div>
  );
}

/** "New Delhi, Delhi" / "Perm, Russia". Left alone when the city already holds the region. */
const place = (c) => {
  const region = c.country || c.state;
  const city = String(c.city || '');
  return !region || city.includes(',') || city.toLowerCase() === region.toLowerCase() ? city || region : `${city}, ${region}`;
};

/** Directory card: photo with a navy wash, running number, name and an Ask button. */
export default function CollegeCard({ college, number }) {
  const name = college.shortName || college.name;
  const long = name.length > 24;
  return (
    <article className="group relative h-[305px] overflow-hidden rounded-[24px] bg-navy-800 shadow-[0_22px_40px_-28px_rgba(11,32,88,0.65)]">
      <CollegeImage
        src={college.image}
        alt={college.imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        fallback={<Monogram college={college} />}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/70 to-navy-900/35" aria-hidden="true" />
      <svg className="absolute -right-6 -top-6 h-44 w-44 text-white/10" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" /></svg>
      <span className="absolute left-5 top-5 grid h-11 min-w-[48px] place-items-center rounded-xl border border-white/20 bg-white/15 px-3 text-[13px] font-bold tracking-wider text-white backdrop-blur">{String(number).padStart(2, '0')}</span>
      <div className="absolute inset-x-5 bottom-5">
        <h3 className={`line-clamp-2 font-bold leading-[1.08] tracking-[-0.04em] text-white ${long ? 'text-[22px]' : 'text-[28px]'}`}>{name}</h3>
        <p className="mt-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-200">{college.type} · {college.group}</p>
        <p className="mt-1 line-clamp-1 max-w-[62%] text-[13px] text-navy-200">{place(college)}</p>
      </div>
      <Link to={collegeUrl(college)} aria-label={`Ask about ${college.name}`} className="absolute inset-0 focus-visible:outline-white">
        <span className="absolute bottom-5 right-5 inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-bold text-navy-ink transition group-hover:bg-leaf-500 group-hover:text-white">Ask <ArrowUpRight size={13} /></span>
      </Link>
    </article>
  );
}
