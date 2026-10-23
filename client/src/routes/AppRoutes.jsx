import { lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CollegeListPage from '../pages/CollegeListPage';
import CollegeDetailPage from '../pages/CollegeDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NeetPredictorPage from '../pages/NeetPredictorPage';
import UpdatesPage from '../pages/UpdatesPage';
import InsightsPage from '../pages/InsightsPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import SitemapPage from '../pages/SitemapPage';
import NotFoundPage from '../pages/NotFoundPage';
import { AuthProvider } from '../features/admin/AuthContext';
import ProtectedRoute from '../features/admin/ProtectedRoute';

// Admin code is split out so public visitors never download it.
const AdminLoginPage = lazy(() => import('../features/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('../features/admin/AdminDashboardPage'));

const AdminShell = () => <AuthProvider><Outlet /></AuthProvider>;

export default function AppRoutes() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-slate-500">Loading…</p>}>
      <Routes>
        {/* Every public page shares MainLayout, so the header and footer are identical everywhere. */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="colleges/mbbs-india" element={<CollegeListPage categoryKey="mbbs-india" />} />
          <Route path="colleges/mbbs-abroad" element={<CollegeListPage categoryKey="mbbs-abroad" />} />
          <Route path="colleges/md-ms" element={<CollegeListPage categoryKey="md-ms" />} />
          <Route path="colleges/:slug" element={<CollegeDetailPage />} />
          <Route path="colleges/:category/:slug" element={<CollegeDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="neet-predictor" element={<NeetPredictorPage />} />
          <Route path="updates" element={<UpdatesPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<AdminShell />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
