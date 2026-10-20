import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items, dark = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center justify-center gap-1 text-sm ${dark ? 'text-pine-100' : 'text-slate-500'}`}>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} />}
          {item.to ? (
            <Link to={item.to} className="hover:underline">{item.label}</Link>
          ) : (
            <span className={`font-semibold ${dark ? 'text-white' : 'text-pine-900'}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
