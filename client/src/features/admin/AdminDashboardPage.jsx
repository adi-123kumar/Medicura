import { useCallback, useEffect, useState } from 'react';
import { BadgeCheck, Download, LogOut, Mail, MessageCircle, PhoneCall, Search, XCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from './AuthContext';
import Logo from '../../components/layout/Logo';
import ApplicationPanel from './ApplicationPanel';
import { STATUS_KEYS, STATUS_META, digitsForWhatsApp, formatDate, mailtoLink } from './statusMeta';

const iconBtn = 'grid h-9 w-9 place-items-center rounded-md border border-navy-100 bg-white text-navy-700 transition hover:border-navy-700 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-navy-100';

export default function AdminDashboardPage() {
  const { admin, logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, new: 0, verified: 0, contacted: 0, rejected: 0 });
  const [data, setData] = useState({ items: [], total: 0, pages: 1 });
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const params = { page, limit: 15 };
      if (status) params.status = status;
      if (query) params.q = query;
      const [list, s] = await Promise.all([api.listApplications(params), api.stats()]);
      setData(list);
      setStats(s);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, status, query]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { const t = setTimeout(() => { setQuery(q); setPage(1); }, 300); return () => clearTimeout(t); }, [q]);

  const selected = data.items.find((a) => a.id === selectedId) || null;
  const update = async (id, patch) => {
    try { await api.updateApplication(id, patch); await load(); } catch (e) { setError(e.message); }
  };
  const remove = async (id) => {
    try { await api.deleteApplication(id); setSelectedId(null); await load(); } catch (e) { setError(e.message); }
  };
  const reject = (a) => window.confirm(`Reject the inquiry from ${a.fullName}?`) && update(a.id, { status: 'rejected' });

  const cards = [['', 'Total', stats.total], ...STATUS_KEYS.map((k) => [k, STATUS_META[k].label, stats[k]])];
  const exportParams = {};
  if (status) exportParams.status = status;
  if (query) exportParams.q = query;

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-navy-100 bg-white">
        <div className="container-page flex h-[76px] items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-slate-500 sm:inline">{admin?.email}</span>
            <button onClick={logout} className="btn-outline btn-sm"><LogOut size={15} /> Sign out</button>
          </div>
        </div>
      </header>

      <main className="container-page py-10">
        <h1 className="text-[34px] font-bold">Inquiries</h1>
        <p className="mt-1.5 text-slate-500">Requests sent through the website form. Open one to verify, reject, call or email.</p>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-5">
          {cards.map(([key, label, n]) => (
            <button key={label} onClick={() => { setStatus(key); setPage(1); }} aria-pressed={status === key}
              className={`border bg-white p-5 text-left transition ${status === key ? 'border-navy-700 ring-1 ring-navy-700' : 'border-navy-100 hover:border-navy-300'}`}>
              <p className="eyebrow-plain !text-slate-500">{label}</p>
              <p className="mt-2 font-display text-4xl font-bold tracking-[-0.04em] text-navy-700">{n}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search inquiries</span>
            <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-leaf-600" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email, college or message" className="field pl-11" />
          </label>
          <a href={api.exportUrl(exportParams)} className="btn-outline btn-sm"><Download size={15} /> Export CSV</a>
        </div>

        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{error}</p>}

        <div className="mt-4 overflow-x-auto border border-navy-100 bg-white">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-navy-100 bg-navy-50 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
              <tr><th className="px-4 py-3.5">Person</th><th className="px-4 py-3.5">Interested in</th><th className="px-4 py-3.5">Message</th><th className="px-4 py-3.5">Received</th><th className="px-4 py-3.5">Status</th><th className="px-4 py-3.5 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {loading && <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Loading…</td></tr>}
              {!loading && data.items.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">No inquiries found.</td></tr>}
              {data.items.map((a) => {
                const st = STATUS_META[a.status] || STATUS_META.new;
                const wa = digitsForWhatsApp(a.phone);
                return (
                  <tr key={a.id} onClick={() => setSelectedId(a.id)} className={`cursor-pointer align-top hover:bg-mist ${a.status === 'new' ? 'bg-navy-50/40' : ''}`}>
                    <td className="px-4 py-4"><div className="font-bold text-navy-ink">{a.fullName}</div><div className="text-xs text-slate-500">{a.email}</div><div className="text-xs text-slate-500">{a.phone || 'No phone'}</div></td>
                    <td className="px-4 py-4"><div className="font-semibold text-navy-700">{a.course}</div><div className="max-w-[200px] truncate text-xs text-slate-500">{a.collegeName || (a.neetScore != null ? `NEET ${a.neetScore}` : 'General inquiry')}</div></td>
                    <td className="max-w-[280px] px-4 py-4"><p className="line-clamp-2 text-slate-600">{a.message}</p></td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-500">{formatDate(a.createdAt)}</td>
                    <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${st.badge}`}>{st.label}</span></td>
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-1.5">
                        {a.phone ? <a href={`tel:${a.phone}`} className={iconBtn} title="Call" aria-label={`Call ${a.fullName}`}><PhoneCall size={15} /></a> : <button disabled className={iconBtn} title="No phone number" aria-label="Call unavailable"><PhoneCall size={15} /></button>}
                        <a href={mailtoLink(a)} className={iconBtn} title="Email" aria-label={`Email ${a.fullName}`}><Mail size={15} /></a>
                        {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className={iconBtn} title="WhatsApp" aria-label={`WhatsApp ${a.fullName}`}><MessageCircle size={15} /></a>}
                        <button onClick={() => update(a.id, { status: 'verified' })} disabled={a.status === 'verified'} className={`${iconBtn} hover:!border-leaf-600 hover:text-leaf-600`} title="Verify" aria-label={`Verify ${a.fullName}`}><BadgeCheck size={15} /></button>
                        <button onClick={() => reject(a)} disabled={a.status === 'rejected'} className={`${iconBtn} hover:!border-red-600 hover:text-red-600`} title="Reject" aria-label={`Reject ${a.fullName}`}><XCircle size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {data.pages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-4 text-sm">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn-outline btn-sm">Previous</button>
            <span>Page {page} of {data.pages}</span>
            <button disabled={page >= data.pages} onClick={() => setPage(page + 1)} className="btn-outline btn-sm">Next</button>
          </div>
        )}
      </main>

      {selected && <ApplicationPanel app={selected} onClose={() => setSelectedId(null)} onUpdate={update} onDelete={remove} />}
    </div>
  );
}
