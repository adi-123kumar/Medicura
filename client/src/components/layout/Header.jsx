import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import TopBar from './TopBar';
import Logo from './Logo';
import { CATEGORY_LIST } from '../../config/categories';
import { groupCounts } from '../../utils/colleges';
import { useGuidance } from '../../features/guidance/GuidanceContext';

function Dropdown({ category }) {
  const groups = groupCounts(category.colleges);
  return (
    <div className="group relative">
      <NavLink
        to={category.path}
        className={({ isActive }) =>
          `flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-pine-900 text-white' : 'text-pine-800 hover:bg-slate-100'}`
        }
      >
        {category.navLabel} <ChevronDown size={14} />
      </NavLink>
      <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="max-h-80 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
          <Link to={category.path} className="block rounded-lg px-3 py-2 text-sm font-semibold text-lake-700 hover:bg-lake-50">
            All {category.navLabel} colleges
          </Link>
          {groups.length === 0 && <p className="px-3 py-2 text-sm text-slate-400">Coming soon</p>}
          {groups.map((g) => (
            <Link
              key={g.name}
              to={`${category.path}?group=${encodeURIComponent(g.name)}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {g.name}
              <span className="text-xs text-slate-400">{g.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openGuidance } = useGuidance();
  const location = useLocation();

  // close the mobile menu when navigating
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    if (open) setOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-pine-900 text-white' : 'text-pine-800 hover:bg-slate-100'}`;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <TopBar />
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          {CATEGORY_LIST.map((c) => <Dropdown key={c.key} category={c} />)}
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => openGuidance()} className="btn-accent">Get guidance</button>
          <button onClick={() => setOpen((o) => !o)} className="rounded-full p-2 text-pine-900 hover:bg-slate-100 lg:hidden" aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden" aria-label="Mobile">
          <ul className="space-y-1 pt-2 text-sm font-semibold text-pine-900">
            <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-slate-50" to="/">Home</Link></li>
            {CATEGORY_LIST.map((c) => (
              <li key={c.key}><Link className="block rounded-lg px-3 py-2.5 hover:bg-slate-50" to={c.path}>{c.navLabel}</Link></li>
            ))}
            <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-slate-50" to="/about">About</Link></li>
            <li><Link className="block rounded-lg px-3 py-2.5 hover:bg-slate-50" to="/contact">Contact</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
