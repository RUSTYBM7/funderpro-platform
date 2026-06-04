import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import TransactionMonitoring from './TransactionMonitoring';
import KYCManagement from './KYCManagement';
import WalletManagement from './WalletManagement';
import AdminAnalytics from './AdminAnalytics';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="transactions" element={<TransactionMonitoring />} />
        <Route path="kyc" element={<KYCManagement />} />
        <Route path="wallets" element={<WalletManagement />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

function AdminSettings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
      <p className="text-gray-400 mt-2">Configure platform settings and preferences.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Platform Name</label>
              <input type="text" defaultValue="FunderPro" className="w-full bg-[#252542] border border-gray-700 text-white px-4 py-2 rounded-lg mt-1" />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Support Email</label>
              <input type="email" defaultValue="support@funderpro.com" className="w-full bg-[#252542] border border-gray-700 text-white px-4 py-2 rounded-lg mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Maintenance Mode</span>
              <button className="w-12 h-6 bg-gray-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Two-Factor Auth Required</span>
              <button className="w-12 h-6 bg-[#FF6B6B] rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">IP Whitelist Enabled</span>
              <button className="w-12 h-6 bg-gray-700 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition"></span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Auto Logout (hours)</span>
              <input type="number" defaultValue="24" className="w-20 bg-[#252542] border border-gray-700 text-white px-3 py-1 rounded-lg text-center" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#ff5252] transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
