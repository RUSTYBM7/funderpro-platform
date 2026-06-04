import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const mockStats = {
  totalUsers: 12847,
  activeUsers: 8932,
  totalVolume: 45678234,
  pendingKYC: 127,
  totalDeposits: 12345678,
  totalWithdrawals: 8765432,
  tradingVolume: 34567890,
  activeTrades: 234
};

const volumeData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Trading Volume (USD)',
      data: [5200000, 7100000, 5900000, 8200000, 9400000, 10500000],
      borderColor: '#FF6B6B',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const userGrowthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      data: [1200, 1900, 2300, 2800, 3100, 3500],
      borderColor: '#4ECDC4',
      backgroundColor: 'rgba(78, 205, 196, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const recentTransactions = [
  { id: 'TXN001', user: 'alex.morgan', type: 'deposit', amount: 5000, currency: 'USD', status: 'completed', time: '2 min ago' },
  { id: 'TXN002', user: 'sarah.chen', type: 'withdrawal', amount: 2500, currency: 'BTC', status: 'pending', time: '5 min ago' },
  { id: 'TXN003', user: 'mike.johnson', type: 'trade', amount: 1.5, currency: 'ETH', status: 'completed', time: '8 min ago' },
  { id: 'TXN004', user: 'emma.wilson', type: 'deposit', amount: 10000, currency: 'USD', status: 'completed', time: '12 min ago' },
  { id: 'TXN005', user: 'david.brown', type: 'trade', amount: 0.8, currency: 'BTC', status: 'failed', time: '15 min ago' },
];

const pendingKYC = [
  { id: 1, name: 'James Miller', email: 'james@example.com', type: 'Individual', submitted: '2 hours ago', documents: 3 },
  { id: 2, name: 'Lisa Anderson', email: 'lisa@example.com', type: 'Business', submitted: '3 hours ago', documents: 5 },
  { id: 3, name: 'Robert Taylor', email: 'robert@example.com', type: 'Individual', submitted: '5 hours ago', documents: 2 },
];

const cryptoPrices = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.50, change: 2.34, icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', price: 3456.78, change: -1.23, icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', price: 1.00, change: 0.01, icon: '₮' },
  { symbol: 'BNB', name: 'BNB', price: 584.32, change: 0.87, icon: '◈' },
  { symbol: 'SOL', name: 'Solana', price: 142.56, change: 4.56, icon: '◎' },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Platform overview and key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition">
            Export Report
          </button>
        </div>
      </div>

      {/* Crypto Prices Ticker */}
      <div className="grid grid-cols-5 gap-4">
        {cryptoPrices.map((crypto) => (
          <div key={crypto.symbol} className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{crypto.icon}</span>
              <div>
                <p className="text-white font-semibold">{crypto.symbol}</p>
                <p className="text-gray-500 text-sm">{crypto.name}</p>
              </div>
            </div>
            <p className="text-white text-xl font-bold">${crypto.price.toLocaleString()}</p>
            <p className={`text-sm ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change}%
            </p>
          </div>
        ))}
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded">+12.5%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Users</p>
          <p className="text-white text-3xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-2">{mockStats.activeUsers.toLocaleString()} active</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded">+8.2%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Trading Volume</p>
          <p className="text-white text-3xl font-bold">${(mockStats.tradingVolume / 1000000).toFixed(1)}M</p>
          <p className="text-gray-500 text-sm mt-2">{mockStats.activeTrades} active trades</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Deposits</p>
          <p className="text-white text-3xl font-bold">${(mockStats.totalDeposits / 1000000).toFixed(1)}M</p>
          <p className="text-green-400 text-sm mt-2">+${(mockStats.totalDeposits * 0.15 / 1000000).toFixed(1)}M today</p>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-yellow-400 text-sm bg-yellow-400/10 px-2 py-1 rounded">Pending</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">KYC Verification</p>
          <p className="text-white text-3xl font-bold">{mockStats.pendingKYC}</p>
          <p className="text-yellow-400 text-sm mt-2">Requires review</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Trading Volume</h3>
          <Line data={volumeData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } } } }} />
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">User Growth</h3>
          <Line data={userGrowthData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } } } }} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Recent Transactions</h3>
            <button className="text-[#FF6B6B] text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-[#252542] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'deposit' ? 'bg-green-500/20' : tx.type === 'withdrawal' ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    <span className={tx.type === 'deposit' ? 'text-green-400' : tx.type === 'withdrawal' ? 'text-red-400' : 'text-blue-400'}>
                      {tx.type === 'deposit' ? '↓' : tx.type === 'withdrawal' ? '↑' : '⇄'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm">{tx.user}</p>
                    <p className="text-gray-500 text-xs">{tx.id} • {tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{tx.amount} {tx.currency}</p>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{tx.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending KYC */}
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Pending KYC Verification</h3>
            <button className="text-[#FF6B6B] text-sm hover:underline">Review All</button>
          </div>
          <div className="space-y-3">
            {pendingKYC.map((kyc) => (
              <div key={kyc.id} className="flex items-center justify-between p-3 bg-[#252542] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B6B] font-semibold">{kyc.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm">{kyc.name}</p>
                    <p className="text-gray-500 text-xs">{kyc.email} • {kyc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">{kyc.documents} docs</span>
                  <button className="bg-[#FF6B6B] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#ff5252]">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
