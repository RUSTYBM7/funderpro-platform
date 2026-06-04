import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const volumeChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Trading Volume',
      data: [45000000, 52000000, 48000000, 61000000, 72000000, 89000000],
      borderColor: '#FF6B6B',
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const userGrowthChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      data: [1200, 1900, 2300, 2800, 3100, 3500],
      backgroundColor: '#4ECDC4',
      borderRadius: 8
    }
  ]
};

const revenueChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [1200000, 1450000, 1320000, 1680000, 1850000, 2100000],
      borderColor: '#FFB347',
      backgroundColor: 'rgba(255, 179, 71, 0.1)',
      fill: true,
      tension: 0.4
    }
  ]
};

const tradingByAssetData = {
  labels: ['BTC', 'ETH', 'USDT', 'BNB', 'SOL', 'Others'],
  datasets: [{
    data: [35, 25, 20, 10, 5, 5],
    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFB347', '#9B59B6', '#3498DB', '#95A5A6'],
    borderWidth: 0
  }]
};

const geoDistributionData = {
  labels: ['United States', 'United Kingdom', 'Germany', 'Singapore', 'Canada', 'Others'],
  datasets: [{
    data: [35, 18, 12, 10, 8, 17],
    backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFB347', '#9B59B6', '#3498DB', '#95A5A6'],
    borderWidth: 0
  }]
};

const kpiCards = [
  { label: 'Total Revenue', value: '$9.6M', change: '+18.5%', trend: 'up' },
  { label: 'Net Profit', value: '$4.2M', change: '+12.3%', trend: 'up' },
  { label: 'Trading Fees', value: '$1.8M', change: '+24.1%', trend: 'up' },
  { label: 'Withdrawal Fees', value: '$234K', change: '-5.2%', trend: 'down' },
];

const topAssets = [
  { name: 'Bitcoin', symbol: 'BTC', volume: '$45.2M', change: '+2.34%', trades: 24532 },
  { name: 'Ethereum', symbol: 'ETH', volume: '$32.1M', change: '-1.23%', trades: 18934 },
  { name: 'Tether', symbol: 'USDT', volume: '$28.7M', change: '+0.01%', trades: 45621 },
  { name: 'BNB', symbol: 'BNB', volume: '$12.4M', change: '+0.87%', trades: 8723 },
  { name: 'Solana', symbol: 'SOL', volume: '$8.9M', change: '+4.56%', trades: 5432 },
];

const topUsers = [
  { rank: 1, name: 'David Brown', volume: '$2.4M', trades: 892, pnl: '+$124K' },
  { rank: 2, name: 'Alex Morgan', volume: '$1.8M', trades: 342, pnl: '+$89K' },
  { rank: 3, name: 'Sarah Chen', volume: '$1.5M', trades: 189, pnl: '+$67K' },
  { rank: 4, name: 'Emma Wilson', volume: '$1.2M', trades: 156, pnl: '+$45K' },
  { rank: 5, name: 'Michael Lee', volume: '$980K', trades: 234, pnl: '+$34K' },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [metric, setMetric] = useState('volume');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-1">Comprehensive platform insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">{kpi.label}</p>
            <p className="text-white text-3xl font-bold mt-2">{kpi.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {kpi.change}
              </span>
              <span className="text-gray-500 text-sm">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Trading Volume</h3>
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm">+24.5%</span>
            </div>
          </div>
          <Line data={volumeChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280', callback: (v) => '$' + (v/1000000).toFixed(0) + 'M' } } } }} />
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Revenue</h3>
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm">+12.3%</span>
            </div>
          </div>
          <Line data={revenueChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280', callback: (v) => '$' + (v/1000000).toFixed(1) + 'M' } } } }} />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Trading by Asset</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={tradingByAssetData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#9ca3af', padding: 15, usePointStyle: true, pointStyle: 'circle' } } } }} />
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-4">Geographic Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={geoDistributionData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#9ca3af', padding: 15, usePointStyle: true, pointStyle: 'circle' } } } }} />
          </div>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">New Users</h3>
            <span className="text-green-400 text-sm">+18.2%</span>
          </div>
          <Bar data={userGrowthChartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { color: '#6b7280' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#6b7280' } } } }} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Assets */}
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-white font-semibold">Top Trading Assets</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#252542]">
              <tr>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Asset</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Volume</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Change</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Trades</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {topAssets.map((asset, i) => (
                <tr key={i} className="hover:bg-[#252542]/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[#FF6B6B] font-bold">{i + 1}</span>
                      <div>
                        <p className="text-white font-medium">{asset.name}</p>
                        <p className="text-gray-500 text-sm">{asset.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{asset.volume}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={asset.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {asset.change}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400">{asset.trades.toLocaleString()}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Users */}
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-white font-semibold">Top Users by Volume</h3>
          </div>
          <table className="w-full">
            <thead className="bg-[#252542]">
              <tr>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Rank</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">User</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">Volume</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-3">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {topUsers.map((user) => (
                <tr key={user.rank} className="hover:bg-[#252542]/50 transition">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: user.rank === 1 ? '#FFD700' : user.rank === 2 ? '#C0C0C0' : user.rank === 3 ? '#CD7F32' : '#4a4a6a' }}>
                      {user.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{user.volume}</p>
                    <p className="text-gray-500 text-sm">{user.trades} trades</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-green-400">{user.pnl}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
