import { useEffect, useState } from 'react';
import { BadgeIndianRupee, FileText, GraduationCap, Info, TrendingUp } from 'lucide-react';

export const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Info },
  { id: 'fees', label: 'Fees', icon: BadgeIndianRupee },
  { id: 'admission', label: 'Admission', icon: GraduationCap },
  { id: 'placements', label: 'Placements', icon: TrendingUp },
  { id: 'documents', label: 'Documents', icon: FileText },
];

/** Sticky pill tabs that follow scroll position (scroll-spy). */
export default function DetailTabs() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-[82px] z-30 border-b border-navy-100 bg-white/95 backdrop-blur">
      <nav className="container-page flex gap-2 overflow-x-auto py-3 md:justify-center" aria-label="College sections">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${active === id ? 'border-navy-700 bg-navy-700 text-white' : 'border-navy-100 text-navy-700 hover:border-navy-700'}`}
          >
            <Icon size={16} /> {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
