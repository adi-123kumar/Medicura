import { CATEGORIES } from '../../config/categories';
import { site } from '../../config/site';
import { formatNumber, groupCounts, sumSeats } from '../../utils/colleges';

/** Green overview band: figures come straight from the data files. */
export function IndiaOverview() {
  const list = CATEGORIES['mbbs-india'].colleges;
  const items = [
    [`${formatNumber(list.length)}+`, 'college listings'],
    [groupCounts(list).length, 'states covered'],
    [formatNumber(sumSeats(list)), 'MBBS seats'],
  ];
  return (
    <section className="border-y border-leaf-100 bg-leaf-50/80">
      <div className="container-page py-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="eyebrow-plain">MBBS in India · Overview</p>
          <span className="rounded-full border border-leaf-100 bg-white/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-700">Reference figures · Placeholders</span>
        </div>
        <dl className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-0">
          {items.map(([value, label], i) => (
            <div key={label} className={`flex items-baseline gap-3 ${i > 0 ? 'sm:border-l sm:border-leaf-100 sm:pl-10' : ''}`}>
              <dd className="font-display text-[40px] font-bold leading-none tracking-[-0.04em] text-navy-700">{value}</dd>
              <dt className="text-[15px] font-semibold text-slate-500">{label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[13px] text-slate-500">Replace these sample figures with current, verified directory data.</p>
      </div>
    </section>
  );
}

/** White row of four sample impact figures (edit them in config/site.js). */
export function ImpactStats() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="container-page py-10">
        <dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
          {site.impact.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-3 ${i > 0 ? 'lg:border-l lg:border-navy-100 lg:pl-9' : ''}`}>
              <dd className="font-display text-[44px] font-bold leading-none tracking-[-0.045em] text-navy-700">{s.value}</dd>
              <dt className="max-w-[110px] text-[13px] font-semibold leading-snug text-slate-500">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-7 text-[13px] text-slate-500">{site.sampleNote}</p>
      </div>
    </section>
  );
}
