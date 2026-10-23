import { Link } from 'react-router-dom';
import { site } from '../../config/site';

/** Two-tone wordmark: "MediCura" + green "World", with the circular logo. */
export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3.5" aria-label={`${site.name} home`}>
      <img src="/logo.png" alt="" width="50" height="50" className="h-[50px] w-[50px] shrink-0 rounded-full shadow-[0_6px_16px_-6px_rgba(18,51,122,0.5)]" />
      <span className="leading-none">
        <span className="block font-display text-[27px] font-extrabold tracking-[-0.045em]">
          <span className={light ? 'text-white' : 'text-navy-700'}>MediCura</span>{' '}
          <span className={light ? 'text-leaf-400' : 'text-leaf-600'}>World</span>
        </span>
        <span className={`mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-navy-200' : 'text-slate-500'}`}>
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
