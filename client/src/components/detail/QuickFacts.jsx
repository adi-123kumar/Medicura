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
    <div className="border-b border-navy-100 bg-white">
      <dl className="container-page grid grid-cols-2 divide-slate-200 py-2 lg:grid-cols-4 lg:divide-x">
        {facts.slice(0, 4).map((f) => (
          <div key={f.label} className="px-4 py-4 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{f.label}</dt>
            <dd className="mt-1 font-display text-lg font-extrabold text-navy-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
