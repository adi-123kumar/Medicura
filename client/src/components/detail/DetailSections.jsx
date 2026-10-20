import { CheckCircle2, CalendarDays, Users, Info } from 'lucide-react';

export function Card({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-extrabold sm:text-3xl">
        {Icon && <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral-50 text-coral-600"><Icon size={20} /></span>}
        {title}
      </h2>
      {children}
    </section>
  );
}

const Row = ({ label, value, highlight }) =>
  value ? (
    <tr className={highlight ? 'bg-coral-50 font-bold' : 'even:bg-slate-50'}>
      <td className="px-4 py-3 text-slate-600">{label}</td>
      <td className="px-4 py-3 font-semibold text-pine-900">{value}</td>
    </tr>
  ) : null;

export function Overview({ college }) {
  const stats = [
    college.seats && ['Total seats', college.seats],
    college.establishment && ['Establishment', college.establishment],
    ['Type', college.type],
    ['City', college.city],
    college.country && ['Country', college.country],
    college.state && ['State', college.state],
  ].filter(Boolean);
  return (
    <>
      {college.about && <p className="leading-relaxed text-slate-600">{college.about}</p>}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-coral-50 p-5">
          <h3 className="mb-3 text-lg font-bold">Academic highlights</h3>
          <ul className="space-y-2.5">
            {college.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-lake-600" /> {h}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="mb-3 text-lg font-bold">Quick statistics</h3>
          <dl className="divide-y divide-slate-100 text-sm">
            {stats.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-slate-500">{k}</dt><dd className="text-right font-bold text-pine-900">{v}</dd></div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}

export function Fees({ college }) {
  const f = college.fees;
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-pine-900 text-xs uppercase tracking-wider text-white">
            <tr><th className="px-4 py-3">Fee component</th><th className="px-4 py-3">Amount</th></tr>
          </thead>
          <tbody>
            <Row label="Annual tuition fee" value={f.tuition} />
            <Row label="Hostel & mess charges" value={f.hostel} />
            <Row label="Other fees" value={f.other} />
            <Row label="NRI quota fees" value={f.nri} highlight />
            <Row label="Approx. annual total" value={f.total} highlight />
          </tbody>
        </table>
      </div>
      {f.note && (
        <p className="mt-4 flex gap-2.5 rounded-2xl bg-coral-50 p-4 text-sm text-slate-700"><Info size={17} className="mt-0.5 shrink-0 text-coral-600" /> {f.note}</p>
      )}
    </>
  );
}

export function Admission({ college }) {
  const a = college.admission;
  return (
    <>
      {a.intro && <p className="leading-relaxed text-slate-600">{a.intro}</p>}
      {a.steps.length > 0 && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <h3 className="mb-4 text-center text-lg font-bold">Step-by-step admission journey</h3>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-pine-900 font-bold text-white">{i + 1}</span>
                <h4 className="mt-3 font-bold">{s.title}</h4>
                <p className="mt-1.5 text-sm text-slate-600">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-bold"><CalendarDays size={18} className="text-coral-600" /> Entrance exams</h3>
          <div className="flex flex-wrap gap-2">{a.exams.map((x) => <span key={x} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-pine-900">{x}</span>)}</div>
        </div>
        <div className="rounded-2xl border border-coral-400 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-bold"><Users size={18} className="text-coral-600" /> Eligibility</h3>
          <p className="text-sm text-slate-600">{a.eligibility}</p>
        </div>
      </div>
    </>
  );
}

export function Placements({ college }) {
  const p = college.placement;
  return (
    <>
      <div className="rounded-2xl bg-pine-900 p-6 text-white">
        {p.quote && <p className="text-sm italic leading-relaxed text-pine-100">{p.quote}</p>}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <div key={m.value + m.label} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center">
              <p className="font-display text-xl font-extrabold text-white">{m.value}</p>
              <p className="mt-1 text-xs text-pine-100">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">Placement and stipend figures are indicative and not independently verified. Confirm them with the college.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {p.internship && <div><h3 className="mb-2 text-lg font-bold">Internship opportunities</h3><p className="text-sm leading-relaxed text-slate-600">{p.internship}</p></div>}
        {p.postGraduation && <div><h3 className="mb-2 text-lg font-bold">Post-graduation success</h3><p className="text-sm leading-relaxed text-slate-600">{p.postGraduation}</p></div>}
      </div>
    </>
  );
}

export function Documents({ college }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        {college.documents.map((d) => (
          <div key={d} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-semibold text-pine-900">
            <CheckCircle2 size={18} className="shrink-0 text-coral-600" /> {d}
          </div>
        ))}
      </div>
      {college.documentNote && (
        <p className="mt-4 rounded-2xl bg-coral-50 p-4 text-sm"><b>Important:</b> {college.documentNote}</p>
      )}
    </>
  );
}
