import { Link } from 'react-router-dom';

export default function NotFoundPage({ message = 'The page you are looking for does not exist.' }) {
  return (
    <section className="container-page py-28 text-center">
      <p className="font-display text-7xl font-extrabold text-coral-500">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-slate-600">{message}</p>
      <Link to="/" className="btn-ink mt-8">Back to home</Link>
    </section>
  );
}
