import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2.5 text-sm">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2.5">
          {i > 0 && <span className="text-slate-400" aria-hidden="true">/</span>}
          {item.to ? <Link to={item.to} className="font-semibold text-navy-700 hover:underline">{item.label}</Link> : <span className="font-semibold text-slate-500">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
