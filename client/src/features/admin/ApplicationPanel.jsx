import { useEffect, useState } from 'react';
import { Check, Mail, Phone, Trash2, X, PhoneCall, MessageCircle } from 'lucide-react';
import { STATUS_META, formatDate } from './statusMeta';
import { waLink } from '../../utils/colleges';

export default function ApplicationPanel({ app, onClose, onUpdate, onDelete }) {
  const [notes, setNotes] = useState(app.adminNotes || '');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setNotes(app.adminNotes || '');
  }, [app.id, app.adminNotes]);

  const act = async (patch) => {
    setBusy(true);
    try { await onUpdate(app.id, patch); } finally { setBusy(false); }
  };
  const phone = app.phone.replace(/[^\d]/g, '').replace(/^(91)?/, '91');

  const rows = [
    ['Course', app.course],
    ['NEET score', app.neetScore ?? 'Not shared'],
    ['College enquired', app.collegeName || 'General enquiry'],
    ['Received', formatDate(app.createdAt)],
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-pine-950/50" onMouseDown={onClose}>
      <aside onMouseDown={(e) => e.stopPropagation()} className="h-full w-full max-w-md animate-pop overflow-y-auto bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-extrabold">{app.fullName}</h2>
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_META[app.status].badge}`}>{STATUS_META[app.status].label}</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-slate-100"><X size={20} /></button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <a href={`tel:${app.phone}`} className="btn-outline flex-col gap-1 rounded-2xl py-3 text-xs"><PhoneCall size={16} /> Call</a>
          <a href={waLink(phone, `Hello ${app.fullName}, this is Medicura World regarding your admission enquiry.`)} target="_blank" rel="noreferrer" className="btn-outline flex-col gap-1 rounded-2xl py-3 text-xs"><MessageCircle size={16} /> WhatsApp</a>
          <a href={`mailto:${app.email}`} className="btn-outline flex-col gap-1 rounded-2xl py-3 text-xs"><Mail size={16} /> Email</a>
        </div>

        <dl className="mt-5 divide-y divide-slate-100 text-sm">
          <div className="flex justify-between gap-4 py-2.5"><dt className="text-slate-500">Phone</dt><dd className="font-semibold text-pine-900">{app.phone}</dd></div>
          <div className="flex justify-between gap-4 py-2.5"><dt className="text-slate-500">Email</dt><dd className="break-all font-semibold text-pine-900">{app.email}</dd></div>
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-slate-500">{k}</dt><dd className="text-right font-semibold text-pine-900">{v}</dd></div>
          ))}
        </dl>

        <label className="mt-5 block text-xs font-semibold text-pine-900">Internal notes
          <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="field mt-1" placeholder="Call outcome, follow-up date…" />
        </label>
        <button disabled={busy || notes === (app.adminNotes || '')} onClick={() => act({ adminNotes: notes })} className="btn-outline mt-2">Save notes</button>

        <p className="mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">Update status</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button disabled={busy || app.status === 'contacted'} onClick={() => act({ status: 'contacted' })} className="btn-outline text-xs"><Phone size={14} /> Contacted</button>
          <button disabled={busy || app.status === 'accepted'} onClick={() => act({ status: 'accepted' })} className="btn bg-green-600 text-xs text-white hover:bg-green-700"><Check size={14} /> Accept</button>
          <button disabled={busy || app.status === 'rejected'} onClick={() => act({ status: 'rejected' })} className="btn bg-red-600 text-xs text-white hover:bg-red-700"><X size={14} /> Reject</button>
        </div>

        <button onClick={() => window.confirm('Delete this application permanently?') && onDelete(app.id)} className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"><Trash2 size={14} /> Delete application</button>
      </aside>
    </div>
  );
}
