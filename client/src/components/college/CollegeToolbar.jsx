import { ChevronDown, Search } from 'lucide-react';

/** Search box + state/country select + result summary, in one bordered bar. */
export default function CollegeToolbar({ category, filters, groups }) {
  const { q, group, page, pages, filtered, setQuery, setGroup } = filters;
  const sorted = [...groups].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="grid gap-3 border border-navy-100 bg-mist p-3 lg:grid-cols-[1fr_300px_auto] lg:items-center">
      <label className="relative block">
        <span className="sr-only">Search</span>
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-leaf-600" />
        <input value={q} onChange={(e) => setQuery(e.target.value)} placeholder={category.searchPlaceholder} className="field pl-11" />
      </label>
      <label className="relative block">
        <span className="sr-only">{category.groupAll}</span>
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="field appearance-none pr-10 font-semibold text-navy-700">
          <option value="">{category.groupAll}</option>
          {sorted.map((g) => <option key={g.name} value={g.name}>{g.name} ({g.count})</option>)}
        </select>
        <ChevronDown size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-navy-700" />
      </label>
      <p className="px-2 text-sm text-slate-500 lg:text-right" aria-live="polite">{filtered.length} {category.unit} · Slide {page} of {pages}</p>
    </div>
  );
}
