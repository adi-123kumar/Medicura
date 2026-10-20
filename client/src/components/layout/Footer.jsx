import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { site } from '../../config/site';
import { CATEGORIES } from '../../config/categories';
import { groupCounts } from '../../utils/colleges';
import { useGuidance } from '../../features/guidance/GuidanceContext';

export default function Footer() {
  const { openGuidance } = useGuidance();
  const india = CATEGORIES['mbbs-india'];
  const states = groupCounts(india.colleges).slice(0, 6);
  const link = 'text-sm text-pine-100 hover:text-white';

  return (
    <footer className="mt-20 bg-pine-900 text-pine-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">Expert counselling for MBBS and MD/MS admissions in India and abroad: college shortlisting, admission process and documentation.</p>
          <button onClick={() => openGuidance()} className="btn-accent mt-5">Get free counselling</button>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Useful links</h3>
          <ul className="space-y-2.5">
            <li><Link className={link} to="/">Home</Link></li>
            <li><Link className={link} to="/about">About us</Link></li>
            <li><Link className={link} to="/contact">Contact us</Link></li>
            <li><Link className={link} to={CATEGORIES['mbbs-abroad'].path}>MBBS abroad</Link></li>
            <li><Link className={link} to={CATEGORIES['md-ms'].path}>MD / MS</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">MBBS in India</h3>
          <ul className="space-y-2.5">
            {states.map((s) => (
              <li key={s.name}><Link className={link} to={`${india.path}?group=${encodeURIComponent(s.name)}`}>MBBS in {s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin size={16} className="mt-0.5 shrink-0 text-coral-400" /> {site.address}</li>
            <li className="flex gap-2.5"><Phone size={16} className="mt-0.5 shrink-0 text-coral-400" /> <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a></li>
            <li className="flex gap-2.5"><Mail size={16} className="mt-0.5 shrink-0 text-coral-400" /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page space-y-2 py-6 text-xs text-pine-100/80">
          <p><b className="text-white">Disclaimer:</b> {site.disclaimer}</p>
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
