import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const { pathname } = useLocation();
  const { toast } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink font-body antialiased selection:bg-secondary-fixed selection:text-primary">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-line bg-white/95 px-5 py-3 shadow-lift backdrop-blur-md transition animate-in slide-in-from-bottom-5">
          <span className="material-symbols-outlined text-primary">
            {toast.type === 'success' ? 'check_circle' : 'info'}
          </span>
          <span className="text-sm font-medium text-ink">{toast.message}</span>
        </div>
      )}

      {/* Shared Unified Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Shared Unified Footer */}
      <Footer />
    </div>
  );
}
