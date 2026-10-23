import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useAuth } from './AuthContext';
import Logo from '../../components/layout/Logo';

export default function AdminLoginPage() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (admin) return <Navigate to="/admin" replace />;

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-mist px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md border border-navy-100 bg-white p-9 shadow-[0_30px_60px_-40px_rgba(11,32,88,0.5)]">
        <Logo />
        <h1 className="mt-8 flex items-center gap-2.5 text-[28px] font-bold"><Lock size={22} className="text-leaf-600" /> Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-500">Review and follow up on website inquiries.</p>
        <label className="field-label mt-7" htmlFor="a-email">Email</label>
        <input id="a-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" autoComplete="username" />
        <label className="field-label mt-5" htmlFor="a-pass">Password</label>
        <input id="a-pass" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field" autoComplete="current-password" />
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{error}</p>}
        <button disabled={busy} className="btn-primary mt-7 w-full">{busy ? 'Signing in…' : <>Sign in <ArrowUpRight size={16} /></>}</button>
      </form>
    </div>
  );
}
