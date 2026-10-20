export default function QuickFacts({ college }) {
  const isAbroad = college.category === 'mbbs-abroad';
  const facts = [
    college.seats && { label: 'Total seats', value: college.seats },
    { label: 'College type', value: college.type },
    college.recognition && { label: 'Recognition', value: college.recognition },
    college.ranking && { label: 'Ranking', value: college.ranking },
    isAbroad && college.duration && { label: 'Duration', value: college.duration },
    isAbroad && college.medium && { label: 'Medium', value: college.medium },
  ].filter(Boolean);
  return (
    <div className="container-page -mt-8">
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.slice(0, 4).map((f) => (
          <div key={f.label} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
            <dt className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{f.label}</dt>
            <dd className="mt-1 font-display text-lg font-extrabold text-pine-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
