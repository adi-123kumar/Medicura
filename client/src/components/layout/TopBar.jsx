import { Mail, Phone, Instagram, Facebook, Linkedin } from 'lucide-react';
import { site } from '../../config/site';

export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-100 bg-white text-xs md:block">
      <div className="container-page flex items-center justify-between py-1.5">
        <div className="flex items-center gap-3">
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 rounded-full bg-pine-900 px-3 py-1 font-semibold text-white">
            <Phone size={12} /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 rounded-full bg-coral-50 px-3 py-1 font-semibold text-coral-600">
            <Mail size={12} /> {site.email}
          </a>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <a href={site.social.instagram} aria-label="Instagram" className="hover:text-pine-900"><Instagram size={15} /></a>
          <a href={site.social.facebook} aria-label="Facebook" className="hover:text-pine-900"><Facebook size={15} /></a>
          <a href={site.social.linkedin} aria-label="LinkedIn" className="hover:text-pine-900"><Linkedin size={15} /></a>
        </div>
      </div>
    </div>
  );
}
