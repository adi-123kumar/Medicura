import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PAGE_SIZE = 12;

/** Filter state lives in the URL, so filtered lists can be shared and survive refresh. */
export function useCollegeFilters(colleges) {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const group = params.get('group') || '';
  const type = params.get('type') || '';
  const visible = Math.max(1, Number(params.get('show')) || PAGE_SIZE);

  const set = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!('show' in patch)) next.delete('show');
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return colleges.filter(
      (c) =>
        (!group || c.group === group) &&
        (!type || c.type === type) &&
        (!needle || `${c.name} ${c.shortName} ${c.city} ${c.group} ${c.recognition}`.toLowerCase().includes(needle))
    );
  }, [colleges, q, group, type]);

  return {
    q, group, type,
    filtered,
    shown: filtered.slice(0, visible),
    hasMore: filtered.length > visible,
    setQuery: (v) => set({ q: v }),
    setGroup: (v) => set({ group: v }),
    setType: (v) => set({ type: v }),
    showMore: () => set({ show: String(visible + PAGE_SIZE) }),
    clear: () => setParams({}, { replace: true }),
  };
}
