import { Link } from 'react-router-dom';
import { site } from '../../config/site';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-pine-900">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#ff8a6b"><path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" /></svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold ${light ? 'text-white' : 'text-pine-900'}`}>{site.name}</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-pine-100' : 'text-slate-500'}`}>{site.tagline}</span>
      </span>
    </Link>
  );
}
