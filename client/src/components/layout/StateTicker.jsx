import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { CATEGORIES } from '../../config/categories';
import { groupCounts } from '../../utils/colleges';

/** Scrolling strip fixed to the bottom. Built from data, so new states appear automatically. */
export default function StateTicker() {
  const india = CATEGORIES['mbbs-india'];
  const items = groupCounts(india.colleges).map((g) => ({ ...g, to: `${india.path}?group=${encodeURIComponent(g.name)}` }));
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 overflow-hidden bg-pine-900 py-2.5" aria-label="Browse MBBS by state">
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {loop.map((it, i) => (
          <Link key={`${it.name}-${i}`} to={it.to} className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs text-pine-100 hover:bg-white/20">
            <Send size={12} /> MBBS in <b className="text-white">{it.name}</b>
          </Link>
        ))}
      </div>
    </div>
  );
}
