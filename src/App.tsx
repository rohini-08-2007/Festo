import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { QuoteModal } from './components/QuoteModal';
import { ReviewModal } from './components/ReviewModal';

import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { SearchPage } from './pages/SearchPage';
import { ProviderProfilePage } from './pages/ProviderProfilePage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { ProviderRegistrationPage } from './pages/ProviderRegistrationPage';
import { ProviderPricingPage } from './pages/ProviderPricingPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'categories':
        return <CategoriesPage />;
      case 'search':
        return <SearchPage />;
      case 'provider-profile':
        return <ProviderProfilePage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'provider-dashboard':
        return <ProviderDashboard />;
      case 'provider-register':
        return <ProviderRegistrationPage />;
      case 'pricing':
        return <ProviderPricingPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241C1D]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <Toast />
      <QuoteModal />
      <ReviewModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
