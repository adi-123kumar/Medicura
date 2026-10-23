import { ChevronLeft, ChevronRight } from 'lucide-react';

/** Previous / numbered circles / Next. All page numbers are shown and wrap onto a second row. */
export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const nav = 'inline-flex h-[52px] shrink-0 items-center gap-1.5 rounded-full px-6 text-sm font-semibold transition';
  return (
    <nav aria-label="Pagination" className="flex items-start justify-between gap-3">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} className={`${nav} bg-navy-50 text-slate-500 enabled:border enabled:border-navy-100 enabled:bg-white enabled:text-navy-700 enabled:hover:border-navy-700 disabled:cursor-not-allowed`}>
        <ChevronLeft size={14} /> <span className="hidden sm:inline">Previous</span>
      </button>
      <ol className="flex max-w-[1040px] flex-1 flex-wrap justify-center gap-2.5">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <button
              onClick={() => onChange(n)}
              aria-current={n === page ? 'page' : undefined}
              aria-label={`Page ${n}`}
              className={`grid h-[38px] w-[38px] place-items-center rounded-full text-xs font-bold transition ${n === page ? 'bg-navy-700 text-white shadow-[0_8px_16px_-8px_rgba(18,51,122,0.8)]' : 'border border-navy-100 bg-white text-navy-700 hover:border-navy-700'}`}
            >
              {n}
            </button>
          </li>
        ))}
      </ol>
      <button onClick={() => onChange(page + 1)} disabled={page >= pages} className={`${nav} border border-navy-100 bg-white text-navy-700 hover:border-navy-700 disabled:cursor-not-allowed disabled:text-slate-400`}>
        <span className="hidden sm:inline">Next</span> <ChevronRight size={14} />
      </button>
    </nav>
  );
}
