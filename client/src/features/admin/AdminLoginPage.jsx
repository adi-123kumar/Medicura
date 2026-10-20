import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
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
    <div className="grid min-h-screen place-items-center bg-cream px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <Logo />
        <h1 className="mt-6 flex items-center gap-2 text-2xl font-extrabold"><Lock size={20} /> Admin sign in</h1>
        <label className="mt-6 block text-xs font-semibold text-pine-900">Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field mt-1" autoComplete="username" />
        </label>
        <label className="mt-4 block text-xs font-semibold text-pine-900">Password
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="field mt-1" autoComplete="current-password" />
        </label>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}
        <button disabled={busy} className="btn-ink mt-6 w-full">{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
