import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import InfoPage from '../components/common/InfoPage';
import { faqs } from '../data/insights';

export default function InsightsPage() {
  const [open, setOpen] = useState(0);
  return (
    <InfoPage title="Insights & articles" eyebrow="Insights" heading="Admission basics, in plain language." intro="Quick answers on NEET, counselling and documents. Rules change every year, so confirm details on the official websites.">
      <div className="mx-auto max-w-3xl divide-y divide-navy-100 border border-navy-100">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-bold text-navy-700">
              {q} <Plus size={18} className={`shrink-0 text-leaf-600 transition ${open === i ? 'rotate-45' : ''}`} />
            </button>
            {open === i && <p className="px-6 pb-6 leading-relaxed text-slate-500">{a}</p>}
          </div>
        ))}
      </div>
      <p className="mt-10 text-center"><Link to="/contact#inquiry" className="btn-primary">Ask your own question <ArrowUpRight size={16} /></Link></p>
    </InfoPage>
  );
}
