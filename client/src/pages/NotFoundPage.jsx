import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function NotFoundPage({ message = 'The page you are looking for does not exist.' }) {
  return (
    <section className="container-page py-28 text-center">
      <p className="font-display text-8xl font-bold tracking-[-0.06em] text-leaf-600">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">{message}</p>
      <Link to="/" className="btn-primary mt-8">Back to home <ArrowUpRight size={16} /></Link>
    </section>
  );
}
