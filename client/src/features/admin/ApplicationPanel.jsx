import { useEffect, useState } from 'react';
import { BadgeCheck, Mail, MessageCircle, PhoneCall, PhoneForwarded, RotateCcw, Trash2, X, XCircle } from 'lucide-react';
import { SOURCE_LABEL, STATUS_META, digitsForWhatsApp, formatDate, mailtoLink } from './statusMeta';

const Row = ({ label, children }) => (
  <div className="flex justify-between gap-6 py-3"><dt className="shrink-0 text-slate-500">{label}</dt><dd className="min-w-0 break-words text-right font-semibold text-navy-ink">{children}</dd></div>
);

/** Side drawer with the full inquiry and every action. */
export default function ApplicationPanel({ app, onClose, onUpdate, onDelete }) {
  const [notes, setNotes] = useState(app.adminNotes || '');
  const [busy, setBusy] = useState(false);
  useEffect(() => setNotes(app.adminNotes || ''), [app.id, app.adminNotes]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const act = async (patch) => {
    setBusy(true);
    try { await onUpdate(app.id, patch); } finally { setBusy(false); }
  };
  const wa = digitsForWhatsApp(app.phone);
  const btn = 'btn-outline btn-sm flex-1 justify-center';
  const status = STATUS_META[app.status] || STATUS_META.new;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/50" onMouseDown={onClose}>
      <aside role="dialog" aria-modal="true" aria-label={`Inquiry from ${app.fullName}`} onMouseDown={(e) => e.stopPropagation()} className="h-full w-full max-w-lg animate-pop overflow-y-auto bg-white p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{app.fullName}</h2>
            <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${status.badge}`}>{status.label}</span>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-navy-50"><X size={20} /></button>
        </div>

        <div className="mt-6 flex gap-2">
          {app.phone ? <a href={`tel:${app.phone}`} className={btn}><PhoneCall size={15} /> Call</a> : <span className={`${btn} cursor-not-allowed opacity-40`}><PhoneCall size={15} /> Call</span>}
          <a href={mailtoLink(app)} className={btn}><Mail size={15} /> Email</a>
          {wa ? <a href={`https://wa.me/${wa}?text=${encodeURIComponent(`Hello ${app.fullName}, this is MediCura World about your inquiry.`)}`} target="_blank" rel="noreferrer" className={btn}><MessageCircle size={15} /> WhatsApp</a> : null}
        </div>

        <div className="mt-6 rounded-md bg-mist p-5">
          <p className="eyebrow-plain !text-slate-400">Message</p>
          <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-navy-ink">{app.message || 'No message'}</p>
        </div>

        <dl className="mt-4 divide-y divide-navy-100 text-sm">
          <Row label="Phone">{app.phone || 'Not shared'}</Row>
          <Row label="Email"><a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a></Row>
          <Row label="Interested in">{app.course}</Row>
          {app.neetScore != null && <Row label="NEET score">{app.neetScore}</Row>}
          {app.collegeName && <Row label="College">{app.collegeName}</Row>}
          <Row label="Sent from">{SOURCE_LABEL[app.source] || app.source}</Row>
          <Row label="Received">{formatDate(app.createdAt)}</Row>
        </dl>

        <p className="eyebrow-plain mt-7 !text-slate-400">Update status</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button disabled={busy || app.status === 'verified'} onClick={() => act({ status: 'verified' })} className="btn btn-sm bg-leaf-600 text-white hover:bg-leaf-700"><BadgeCheck size={15} /> Verify</button>
          <button disabled={busy || app.status === 'contacted'} onClick={() => act({ status: 'contacted' })} className="btn-outline btn-sm"><PhoneForwarded size={15} /> Mark contacted</button>
          <button disabled={busy || app.status === 'rejected'} onClick={() => act({ status: 'rejected' })} className="btn btn-sm bg-red-600 text-white hover:bg-red-700"><XCircle size={15} /> Reject</button>
          <button disabled={busy || app.status === 'new'} onClick={() => act({ status: 'new' })} className="btn-outline btn-sm"><RotateCcw size={15} /> Back to new</button>
        </div>

        <label className="field-label mt-7" htmlFor="notes">Internal notes</label>
        <textarea id="notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} className="field" placeholder="Call outcome, follow-up date…" maxLength={2000} />
        <button disabled={busy || notes === (app.adminNotes || '')} onClick={() => act({ adminNotes: notes })} className="btn-primary btn-sm mt-3">Save notes</button>

        <button onClick={() => window.confirm('Delete this inquiry permanently?') && onDelete(app.id)} className="mt-10 flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"><Trash2 size={14} /> Delete inquiry</button>
      </aside>
    </div>
  );
}
