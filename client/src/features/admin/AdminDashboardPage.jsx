import { useCallback, useEffect, useState } from 'react';
import { LogOut, Search } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from './AuthContext';
import Logo from '../../components/layout/Logo';
import ApplicationPanel from './ApplicationPanel';
import { STATUS_KEYS, STATUS_META, formatDate } from './statusMeta';

export default function AdminDashboardPage() {
  const { admin, logout } = useAuth();
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, accepted: 0, rejected: 0 });
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

  const update = async (id, patch) => { await api.updateApplication(id, patch); await load(); };
  const remove = async (id) => { await api.deleteApplication(id); setSelectedId(null); await load(); };

  const cards = [['', 'Total', stats.total], ...STATUS_KEYS.map((k) => [k, STATUS_META[k].label, stats[k]])];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-slate-500 sm:inline">{admin?.email}</span>
            <button onClick={logout} className="btn-outline px-4 py-2"><LogOut size={15} /> Sign out</button>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        <h1 className="text-3xl font-extrabold">Applications</h1>
        <p className="mt-1 text-sm text-slate-500">Guidance requests submitted from the website.</p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {cards.map(([key, label, n]) => (
            <button key={label} onClick={() => { setStatus(key); setPage(1); }} aria-pressed={status === key}
              className={`rounded-2xl border bg-white p-4 text-left transition ${status === key ? 'border-pine-900 ring-1 ring-pine-900' : 'border-slate-200 hover:border-slate-400'}`}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-pine-900">{n}</p>
            </button>
          ))}
        </div>

        <label className="relative mt-6 block max-w-md">
          <span className="sr-only">Search applications</span>
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email or college" className="field rounded-full bg-white py-3 pl-11" />
        </label>

        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Course / College</th><th className="px-4 py-3">NEET</th><th className="px-4 py-3">Received</th><th className="px-4 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">Loading…</td></tr>}
              {!loading && data.items.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">No applications found.</td></tr>}
              {data.items.map((a) => (
                <tr key={a.id} onClick={() => setSelectedId(a.id)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-pine-900">{a.fullName}</td>
                  <td className="px-4 py-3"><div>{a.phone}</div><div className="text-xs text-slate-500">{a.email}</div></td>
                  <td className="px-4 py-3"><div>{a.course}</div><div className="max-w-[220px] truncate text-xs text-slate-500">{a.collegeName || 'General enquiry'}</div></td>
                  <td className="px-4 py-3">{a.neetScore ?? '—'}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(a.createdAt)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_META[a.status].badge}`}>{STATUS_META[a.status].label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data.pages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn-outline px-4 py-2">Previous</button>
            <span>Page {page} of {data.pages}</span>
            <button disabled={page >= data.pages} onClick={() => setPage(page + 1)} className="btn-outline px-4 py-2">Next</button>
          </div>
        )}
      </main>

      {selected && <ApplicationPanel app={selected} onClose={() => setSelectedId(null)} onUpdate={update} onDelete={remove} />}
    </div>
  );
}
