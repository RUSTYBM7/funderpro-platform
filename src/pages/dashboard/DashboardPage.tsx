import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { CryptoStats } from '@/components/crypto/CryptoWatchlist';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCryptoPrices, formatCryptoPrice, formatLargeNumber } from '@/hooks/useCryptoPrices';

const performanceData = [
  { name: 'Mon', profit: 1200 },
  { name: 'Tue', profit: -400 },
  { name: 'Wed', profit: 800 },
  { name: 'Thu', profit: 1500 },
  { name: 'Fri', profit: -200 },
  { name: 'Sat', profit: 600 },
  { name: 'Sun', profit: 900 },
];

const openPositions = [
  { symbol: 'BTC', type: 'Long', entry: 67000, current: 67432.50, profit: 432.50, percentage: 0.65, icon: '₿' },
  { symbol: 'ETH', type: 'Short', entry: 3550, current: 3521.80, profit: 141.00, percentage: 1.32, icon: 'Ξ' },
  { symbol: 'SOL', type: 'Long', entry: 168.00, current: 172.45, profit: 22.25, percentage: 2.65, icon: '◎' },
];

const recentTrades = [
  { id: 1, symbol: 'BTC', type: 'Long', profit: 450, date: '2h ago', icon: '₿' },
  { id: 2, symbol: 'ETH', type: 'Short', profit: -120, date: '5h ago', icon: 'Ξ' },
  { id: 3, symbol: 'SOL', type: 'Long', profit: 890, date: '8h ago', icon: '◎' },
  { id: 4, symbol: 'XRP', type: 'Short', profit: 230, date: '1d ago', icon: '✕' },
];

export default function DashboardPage() {
  const { prices, loading, refetch } = useCryptoPrices();

  // Get BTC price for portfolio value calculation
  const btcPrice = prices.find(p => p.symbol === 'BTC')?.current_price || 67432.50;
  const totalProfit = 8240;
  const accountBalance = 125430;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#e2f8ff' }}>Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: '#7f8bab' }}>Welcome back, here's your trading overview</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#1c273e', color: '#7f8bab' }}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-sm">Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                <DollarSign className="w-5 h-5" style={{ color: '#00d084' }} />
              </div>
              <Badge variant="success">+12.5%</Badge>
            </div>
            <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Account Balance</p>
            <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>${accountBalance.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(226, 248, 255, 0.1)' }}>
                <TrendingUp className="w-5 h-5" style={{ color: '#e2f8ff' }} />
              </div>
              <Badge variant="info">This Month</Badge>
            </div>
            <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Total Profit</p>
            <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>${totalProfit.toLocaleString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(228, 35, 56, 0.1)' }}>
                <Activity className="w-5 h-5" style={{ color: '#e42338' }} />
              </div>
            </div>
            <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Active Positions</p>
            <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>{openPositions.length}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="rounded-xl p-6"
            style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                <BarChart3 className="w-5 h-5" style={{ color: '#00d084' }} />
              </div>
            </div>
            <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Win Rate</p>
            <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>78.5%</p>
          </motion.div>
        </div>

        {/* Crypto Market Stats */}
        <CryptoStats />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equity Curve */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { name: 'Jan', value: 45000 },
                      { name: 'Feb', value: 52000 },
                      { name: 'Mar', value: 48000 },
                      { name: 'Apr', value: 61000 },
                      { name: 'May', value: 55000 },
                      { name: 'Jun', value: 67000 },
                      { name: 'Jul', value: 72000 },
                      { name: 'Aug', value: 68000 },
                    ]}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00d084" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#7f8bab" fontSize={12} />
                      <YAxis stroke="#7f8bab" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#131b32',
                          border: '1px solid #263348',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#e2f8ff' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#00d084"
                        strokeWidth={2}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Performance */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <XAxis dataKey="name" stroke="#7f8bab" fontSize={12} />
                      <YAxis stroke="#7f8bab" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#131b32',
                          border: '1px solid #263348',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="profit" fill="#00d084" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span style={{ color: '#7f8bab' }}>Total</span>
                  <span className="font-semibold" style={{ color: '#00d084' }}>+$4,300</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Positions and Trades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open Positions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Open Positions</CardTitle>
                <button className="text-sm transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                  View All
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm" style={{ color: '#7f8bab', borderBottom: '1px solid #263348' }}>
                      <th className="pb-3 font-medium">Symbol</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Entry</th>
                      <th className="pb-3 font-medium">Current</th>
                      <th className="pb-3 font-medium text-right">P/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#263348' }}>
                    {openPositions.map((position, index) => (
                      <tr key={index} className="text-sm">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{position.icon}</span>
                            <span className="font-medium" style={{ color: '#e2f8ff' }}>{position.symbol}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant={position.type === 'Long' ? 'success' : 'danger'}>
                            {position.type}
                          </Badge>
                        </td>
                        <td className="py-3" style={{ color: '#7f8bab' }}>${position.entry.toLocaleString()}</td>
                        <td className="py-3" style={{ color: '#7f8bab' }}>
                          ${position.current.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className={`py-3 text-right font-medium ${
                          position.profit >= 0 ? 'text-accent-green' : 'text-accent-red'
                        }`}>
                          {position.profit >= 0 ? '+' : ''}${position.profit.toFixed(2)} ({position.percentage}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Trades</CardTitle>
                <button className="text-sm transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                  View All
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#263348' }}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        trade.profit >= 0 ? '' : ''
                      }`} style={{ backgroundColor: trade.profit >= 0 ? 'rgba(0, 208, 132, 0.1)' : 'rgba(228, 35, 56, 0.1)' }}>
                        {trade.profit >= 0 ? (
                          <ArrowUpRight className="w-5 h-5" style={{ color: '#00d084' }} />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" style={{ color: '#e42338' }} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{trade.icon}</span>
                          <p className="font-medium" style={{ color: '#e2f8ff' }}>{trade.symbol}</p>
                        </div>
                        <p className="text-sm" style={{ color: '#7f8bab' }}>{trade.type} • {trade.date}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      trade.profit >= 0 ? '' : ''
                    }`} style={{ color: trade.profit >= 0 ? '#00d084' : '#e42338' }}>
                      {trade.profit >= 0 ? '+' : ''}${trade.profit}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Cryptocurrencies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Cryptocurrencies</CardTitle>
              <a href="/trading" className="text-sm transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                View Trading Terminal
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {prices.slice(0, 5).map((crypto, index) => (
                <motion.div
                  key={crypto.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg p-4 cursor-pointer hover:bg-bg-tertiary transition-colors"
                  style={{ backgroundColor: '#131b32' }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold" style={{ color: '#e2f8ff' }}>{crypto.symbol}</p>
                      <p className="text-xs" style={{ color: '#7f8bab' }}>{crypto.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold" style={{ color: '#e2f8ff' }}>
                      ${formatCryptoPrice(crypto.current_price, crypto.symbol)}
                    </p>
                    <span className={`text-xs font-medium ${
                      crypto.price_change_percentage_24h >= 0 ? 'text-accent-green' : 'text-accent-red'
                    }`}>
                      {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}