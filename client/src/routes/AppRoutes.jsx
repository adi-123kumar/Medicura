import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import CollegeListPage from '../pages/CollegeListPage';
import CollegeDetailPage from '../pages/CollegeDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import { AuthProvider } from '../features/admin/AuthContext';
import ProtectedRoute from '../features/admin/ProtectedRoute';

// Admin code is split out so public visitors never download it.
const AdminLoginPage = lazy(() => import('../features/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('../features/admin/AdminDashboardPage'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-slate-500">Loading…</p>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="colleges/mbbs-india" element={<CollegeListPage categoryKey="mbbs-india" />} />
          <Route path="colleges/mbbs-abroad" element={<CollegeListPage categoryKey="mbbs-abroad" />} />
          <Route path="colleges/md-ms" element={<CollegeListPage categoryKey="md-ms" />} />
          <Route path="colleges/:category/:slug" element={<CollegeDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="admin" element={<AuthProvider><AdminOutlet /></AuthProvider>}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

import { Outlet } from 'react-router-dom';
function AdminOutlet() { return <Outlet />; }
