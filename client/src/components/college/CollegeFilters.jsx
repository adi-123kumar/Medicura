import { Search, X } from 'lucide-react';

export default function CollegeFilters({ category, filters, groups, types }) {
  const { q, group, type, setQuery, setGroup, setType, clear } = filters;
  const active = q || group || type;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQuery(e.target.value)} placeholder={category.searchPlaceholder} className="field rounded-full py-3 pl-11" />
        </label>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="College type" className="field rounded-full py-3 sm:w-48">
          <option value="">All types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={category.groupLabel}>
        <Chip active={!group} onClick={() => setGroup('')}>{category.groupAll}</Chip>
        {groups.map((g) => (
          <Chip key={g.name} active={group === g.name} onClick={() => setGroup(g.name)}>{g.name} <span className="opacity-60">{g.count}</span></Chip>
        ))}
      </div>
      {active && (
        <button onClick={clear} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-lake-700 hover:underline"><X size={13} /> Clear all filters</button>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${active ? 'border-pine-900 bg-pine-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-pine-900'}`}
    >
      {children}
    </button>
  );
}
