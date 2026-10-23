import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PAGE_SIZE = 10; // 296 colleges → 30 "slides", like the design

/** Search, state filter and page all live in the URL, so a filtered view can be shared and survives refresh. */
export function useCollegeFilters(colleges) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const group = params.get('group') || '';

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return colleges.filter(
      (c) =>
        (!group || c.group === group) &&
        (!needle || `${c.name} ${c.shortName} ${c.city} ${c.group} ${c.country || ''}`.toLowerCase().includes(needle))
    );
  }, [colleges, q, group]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(params.get('page')) || 1));

  const set = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!('page' in patch)) next.delete('page');
    setParams(next, { replace: true });
  };

  return {
    q, group, page, pages,
    filtered,
    shown: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    offset: (page - 1) * PAGE_SIZE,
    setQuery: (v) => set({ q: v }),
    setGroup: (v) => set({ group: v }),
    setPage: (n) => set({ page: n > 1 ? String(n) : '' }),
  };
}
