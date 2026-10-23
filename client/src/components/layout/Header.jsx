import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';

const UPDATE_LINKS = [
  { to: '/updates', label: 'Admission updates', hint: 'Dates, notices and counselling news' },
  { to: '/insights', label: 'Insights & articles', hint: 'Plain-language admission guides' },
];

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/colleges/mbbs-india', label: 'MBBS India' },
  { to: '/colleges/mbbs-abroad', label: 'MBBS Abroad' },
  { to: '/colleges/md-ms', label: 'MD / MS' },
];

const linkClass = ({ isActive }) =>
  `relative rounded-md px-3.5 py-2 text-[15px] font-semibold transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-leaf-500 after:transition-transform ${
    isActive ? 'text-navy-700 after:scale-x-100' : 'text-slate-600 after:scale-x-0 hover:text-navy-700'
  }`;

function UpdatesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative mx-1" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full bg-navy-50 px-5 py-2.5 text-[15px] font-bold text-navy-700 transition hover:bg-navy-100"
      >
        Updates <ChevronDown size={15} className={`transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div role="menu" className="absolute left-0 top-full z-50 w-72 pt-2">
          <div className="animate-pop rounded-2xl border border-navy-100 bg-white p-2 shadow-[0_24px_48px_-20px_rgba(11,32,88,0.35)]">
            {UPDATE_LINKS.map((l) => (
              <Link key={l.to} to={l.to} role="menuitem" className="block rounded-xl px-4 py-3 hover:bg-navy-50">
                <span className="block text-sm font-bold text-navy-ink">{l.label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{l.hint}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[82px] items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center lg:flex" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end={n.end} className={linkClass}>{n.label}</NavLink>)}
          <UpdatesMenu />
          <NavLink to="/neet-predictor" className={linkClass}>NEET Predictor</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact#inquiry" className="btn-primary hidden sm:inline-flex">Free counselling <ArrowUpRight size={16} /></Link>
          <button onClick={() => setOpen((o) => !o)} className="rounded-md p-2.5 text-navy-700 hover:bg-navy-50 lg:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-5 pb-5 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1 pt-3 text-[15px] font-semibold text-navy-ink">
            {[...NAV, ...UPDATE_LINKS, { to: '/neet-predictor', label: 'NEET Predictor' }].map((n) => (
              <li key={n.to}><Link className="block rounded-md px-3 py-3 hover:bg-navy-50" to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
          <Link to="/contact#inquiry" className="btn-primary mt-3 w-full">Free counselling <ArrowUpRight size={16} /></Link>
        </nav>
      )}
    </header>
  );
}
