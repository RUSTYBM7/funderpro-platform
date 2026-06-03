import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { BarChart3, TrendingUp, Download, Calendar, PieChart } from 'lucide-react';
import { AreaChart, Area, PieChart as RechartsPie, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const equityData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
  { name: 'Jul', value: 72000 },
  { name: 'Aug', value: 68000 },
];

const monthlyPerformance = [
  { month: 'Jan', profit: 3200 },
  { month: 'Feb', profit: 4500 },
  { month: 'Mar', profit: -1200 },
  { month: 'Apr', profit: 5800 },
  { month: 'May', profit: 2100 },
  { month: 'Jun', profit: 7600 },
  { month: 'Jul', profit: 4100 },
  { month: 'Aug', profit: 2900 },
];

const assetAllocation = [
  { name: 'Forex', value: 45, color: '#22C55E' },
  { name: 'Commodities', value: 30, color: '#3B82F6' },
  { name: 'Crypto', value: 15, color: '#F97316' },
  { name: 'Indices', value: 10, color: '#8B5CF6' },
];

const stats = [
  { label: 'Total Profit', value: '$28,900', change: '+15.2%', positive: true },
  { label: 'Total Trades', value: '234', change: '+12', positive: true },
  { label: 'Win Rate', value: '76.5%', change: '+2.3%', positive: true },
  { label: 'Avg R:R', value: '1:2.4', change: '+0.3', positive: true },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
            <p className="text-text-secondary mt-1">Track your trading performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" icon={<Calendar className="w-4 h-4" />}>
              Last 30 Days
            </Button>
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.positive ? 'text-accent-green' : 'text-accent-red'}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Equity Curve */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={equityData}>
                      <defs>
                        <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#71717A" fontSize={12} />
                      <YAxis stroke="#71717A" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#18181B',
                          border: '1px solid #27272A',
                          borderRadius: '8px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#22C55E"
                        strokeWidth={2}
                        fill="url(#colorEquity)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Asset Allocation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-accent-green" />
                  <CardTitle>Asset Allocation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={assetAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {assetAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {assetAllocation.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-text-secondary">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Performance</CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-accent-green mr-2" />
                  <span className="text-sm text-text-muted">Profit</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformance}>
                  <XAxis dataKey="month" stroke="#71717A" fontSize={12} />
                  <YAxis stroke="#71717A" fontSize={12} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181B',
                      border: '1px solid #27272A',
                      borderRadius: '8px',
                    }}
                    formatter={(value: unknown) => [`$${value}`, 'Profit']}
                  />
                  <Bar dataKey="profit" fill="#22C55E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Best Trade</span>
                  <span className="text-accent-green font-semibold">+$2,450</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Worst Trade</span>
                  <span className="text-accent-red font-semibold">-$850</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Avg Winner</span>
                  <span className="text-text-primary font-semibold">+$450</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Avg Loser</span>
                  <span className="text-text-primary font-semibold">-$280</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Largest Drawdown</span>
                  <span className="text-accent-red font-semibold">-8.5%</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-text-secondary">Profit Factor</span>
                  <span className="text-text-primary font-semibold">2.34</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Sharpe Ratio</span>
                  <span className="text-text-primary font-semibold">1.85</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Max Drawdown</span>
                  <span className="text-accent-red font-semibold">-12.5%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Risk/Reward Ratio</span>
                  <span className="text-text-primary font-semibold">1:2.4</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary"> expectancy</span>
                  <span className="text-text-primary font-semibold">+$185</span>
                </div>
                <div className="flex justify-between py-3 border-b border-bg-border">
                  <span className="text-text-secondary">Recovery Factor</span>
                  <span className="text-accent-green font-semibold">3.2</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-text-secondary">Consecutive Wins</span>
                  <span className="text-text-primary font-semibold">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}