import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from '../components/layout/TopBar';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

/** Header and footer live here once, so every public page gets exactly the same ones. */
export default function MainLayout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) return void el.scrollIntoView();
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
