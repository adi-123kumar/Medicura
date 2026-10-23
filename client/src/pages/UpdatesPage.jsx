import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import InfoPage from '../components/common/InfoPage';
import EmptyState from '../components/common/EmptyState';
import { updates } from '../data/updates';

const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function UpdatesPage() {
  return (
    <InfoPage title="Admission updates" eyebrow="Updates" heading="Dates and notices, in one place." intro="Counselling schedules, notices and admission news for MBBS and MD / MS aspirants. Always confirm dates with the official source.">
      {updates.length === 0 ? (
        <EmptyState title="No updates published yet" text="We will post counselling dates and admission notices here. Talk to a counselor if you need the latest information now." action={<Link to="/contact#inquiry" className="btn-primary">Talk to a counselor <ArrowUpRight size={15} /></Link>} />
      ) : (
        <ul className="divide-y divide-navy-100 border border-navy-100">
          {updates.map((u) => (
            <li key={u.title} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                {u.tag && <span className="rounded-full bg-leaf-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-leaf-700">{u.tag}</span>}
                <h3 className="mt-3 text-xl font-bold">{u.title}</h3>
                {u.summary && <p className="mt-1.5 max-w-2xl text-slate-500">{u.summary}</p>}
                {u.link && <a href={u.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 hover:underline">Official source <ArrowUpRight size={14} /></a>}
              </div>
              <time dateTime={u.date} className="shrink-0 text-sm font-semibold text-slate-400">{fmt(u.date)}</time>
            </li>
          ))}
        </ul>
      )}
    </InfoPage>
  );
}
