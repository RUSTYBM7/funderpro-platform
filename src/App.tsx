import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Landing page - iframe serving cloned funderpro.com pages
const FunderproLanding = lazy(() => import('./pages/landing/FunderproLanding'));

// Admin pages
import AdminRoutes from './pages/admin';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

// Dashboard pages
import DashboardPage from './pages/dashboard/DashboardPage';
import TradingTerminal from './pages/trading/TradingTerminal';
import WalletPage from './pages/wallet/WalletPage';
import KYCPage from './pages/kyc/KYCPage';
import AITradingPage from './pages/ai-trading/AITradingPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import ReferralsPage from './pages/referrals/ReferralsPage';
import RewardsPage from './pages/rewards/RewardsPage';
import SettingsPage from './pages/settings/SettingsPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import SupportPage from './pages/support/SupportPage';
import MarketsPage from './pages/markets/MarketsPage';
import PortfolioPage from './pages/portfolio/PortfolioPage';

// Loading fallback with FunderPro logo
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f1527' }}>
      <div className="text-center">
        <img src="/funderpro-logo.png" alt="FunderPro" className="w-16 h-auto mx-auto mb-4 animate-pulse" />
        <div className="w-8 h-8 border-2 rounded-full mx-auto animate-spin" style={{ borderColor: '#e42338', borderTopColor: 'transparent' }}></div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Landing pages via iframe - serves cloned funderpro.com pages */}
          <Route path="/" element={<FunderproLanding />} />
          <Route path="/features" element={<FunderproLanding />} />
          <Route path="/challenges" element={<FunderproLanding />} />
          <Route path="/the-challenge" element={<FunderproLanding />} />
          <Route path="/trading-rules" element={<FunderproLanding />} />
          <Route path="/rewards-external" element={<FunderproLanding />} />
          <Route path="/careers" element={<FunderproLanding />} />
          <Route path="/about" element={<FunderproLanding />} />
          <Route path="/contact" element={<FunderproLanding />} />
          <Route path="/blog" element={<FunderproLanding />} />
          <Route path="/products" element={<FunderproLanding />} />
          <Route path="/platforms" element={<FunderproLanding />} />
          <Route path="/calendar" element={<FunderproLanding />} />
          <Route path="/tools" element={<FunderproLanding />} />
          <Route path="/technology" element={<FunderproLanding />} />
          <Route path="/affiliate" element={<FunderproLanding />} />
          <Route path="/sitemap" element={<FunderproLanding />} />
          <Route path="/terms" element={<FunderproLanding />} />
          <Route path="/privacy" element={<FunderproLanding />} />
          <Route path="/cookies" element={<FunderproLanding />} />
          <Route path="/risk" element={<FunderproLanding />} />
          <Route path="/general-terms" element={<FunderproLanding />} />

          {/* Auth pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Dashboard pages */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trading" element={<TradingTerminal />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/kyc" element={<KYCPage />} />
          <Route path="/ai-trading" element={<AITradingPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* Admin pages */}
          <Route path="/admin-privacy/*" element={<AdminRoutes />} />

          {/* Fallback to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;