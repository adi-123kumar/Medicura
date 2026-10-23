import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionIntro from './SectionIntro';
import CollegeImage from '../college/CollegeImage';
import { CATEGORIES, COUNTRY_CODES } from '../../config/categories';
import { groupCounts, slugify } from '../../utils/colleges';

// Cards show in this order first; any other country in the data follows by university count.
const ORDER = ['Russia', 'Kazakhstan', 'Georgia', 'Bangladesh', 'Uzbekistan', 'Nepal', 'Tajikistan'];
const TINTS = ['from-sky-700 via-navy-700 to-navy-900', 'from-slate-500 via-navy-800 to-navy-900', 'from-slate-600 via-navy-800 to-navy-900', 'from-navy-500 via-navy-800 to-navy-950'];

function Skyline() {
  return (
    <svg viewBox="0 0 300 120" className="absolute inset-x-0 bottom-16 h-24 w-full text-navy-950/40" preserveAspectRatio="none" aria-hidden="true" fill="currentColor">
      <path d="M0 120V80h20V60h16v20h14V40h12V20h6V6h4v14h6v20h12v30h18V50h16v30h14V64h22V30h8v34h14V80h20V56h18v24h16V70h22v50z" />
    </svg>
  );
}

export default function Destinations() {
  const abroad = CATEGORIES['mbbs-abroad'];
  const counts = groupCounts(abroad.colleges);
  const byName = new Map(counts.map((c) => [c.name, c.count]));
  const names = [...ORDER.filter((n) => byName.has(n)), ...counts.map((c) => c.name).filter((n) => !ORDER.includes(n))];

  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="container-page">
        <SectionIntro eyebrow="Global MBBS destinations" line1="Explore study" line2="destinations." text="Explore international medical education destinations and compare university options. Verify recognition, eligibility and tuition through official sources.">
          <Link to={abroad.path} className="btn-outline mt-6">Explore MBBS abroad <ArrowUpRight size={15} /></Link>
        </SectionIntro>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {names.map((name, i) => (
            <Link key={name} to={`${abroad.path}?group=${encodeURIComponent(name)}`} className="group relative block h-[305px] overflow-hidden rounded-[22px] bg-navy-800 shadow-[0_20px_40px_-28px_rgba(11,32,88,0.6)]">
              <CollegeImage
                src={`/destinations/${slugify(name)}.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                fallback={<div className={`absolute inset-0 bg-gradient-to-b ${TINTS[i % TINTS.length]}`}><Skyline /></div>}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/55 to-navy-900/25" aria-hidden="true" />
              <svg className="absolute -right-6 -top-6 h-44 w-44 text-white/10" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" /><circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="2" /></svg>
              <span className="absolute left-5 top-5 grid h-11 min-w-[48px] place-items-center rounded-xl border border-white/20 bg-white/15 px-3 text-[13px] font-bold tracking-wider text-white backdrop-blur">{COUNTRY_CODES[name] || name.slice(0, 2).toUpperCase()}</span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="text-[28px] font-bold leading-none tracking-[-0.04em] text-white">{name}</h3>
                  <p className="mt-2 text-[13px] font-medium text-navy-200">{byName.get(name)} sample universities</p>
                </div>
                <span className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-bold text-navy-ink transition group-hover:bg-leaf-500 group-hover:text-white">View <ArrowUpRight size={13} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
