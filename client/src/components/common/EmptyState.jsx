export default function EmptyState({ title, text, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy-200 bg-white p-12 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      {text && <p className="mx-auto mt-2 max-w-md text-slate-500">{text}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
