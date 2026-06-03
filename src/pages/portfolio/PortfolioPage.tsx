import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { TrendingUp, TrendingDown, PieChart, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Cell } from 'recharts';

const portfolioData = [
  { name: 'BTC', value: 45, color: '#F7931A' },
  { name: 'ETH', value: 25, color: '#627EEA' },
  { name: 'SOL', value: 15, color: '#00FFA3' },
  { name: 'XRP', value: 10, color: '#23292F' },
  { name: 'Other', value: 5, color: '#7f8bab' },
];

const holdings = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 1.234, value: 83215.50, change: 2.34, allocation: 45 },
  { symbol: 'ETH', name: 'Ethereum', amount: 8.567, value: 30189.50, change: 1.87, allocation: 25 },
  { symbol: 'SOL', name: 'Solana', amount: 45.678, value: 7875.30, change: 3.21, allocation: 15 },
  { symbol: 'XRP', name: 'XRP', amount: 5000, value: 2921.00, change: -0.54, allocation: 10 },
];

const historyData = [
  { date: 'Jan', value: 120000 },
  { date: 'Feb', value: 135000 },
  { date: 'Mar', value: 128000 },
  { date: 'Apr', value: 145000 },
  { date: 'May', value: 138000 },
  { date: 'Jun', value: 155000 },
  { date: 'Jul', value: 162000 },
  { date: 'Aug', value: 158000 },
];

export default function PortfolioPage() {
  const totalValue = 184921.30;
  const totalProfit = 28421.30;
  const profitPercentage = 18.2;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#e2f8ff' }}>Portfolio</h1>
            <p className="text-sm mt-1" style={{ color: '#7f8bab' }}>Track your crypto assets and performance</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm" style={{ color: '#7f8bab' }}>Total Value</p>
                <Wallet className="w-5 h-5" style={{ color: '#e42338' }} />
              </div>
              <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm" style={{ color: '#7f8bab' }}>Total Profit</p>
                <TrendingUp className="w-5 h-5" style={{ color: '#00d084' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: '#00d084' }}>+${totalProfit.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm" style={{ color: '#7f8bab' }}>Profit %</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#00d084' }}>+{profitPercentage}%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm" style={{ color: '#7f8bab' }}>Assets</p>
              </div>
              <p className="text-2xl font-bold text-white">{holdings.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historyData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00d084" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00d084" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#7f8bab" fontSize={12} />
                      <YAxis stroke="#7f8bab" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#131b32',
                          border: '1px solid #263348',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#e2f8ff' }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
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

          {/* Allocation Pie Chart */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#131b32',
                          border: '1px solid #263348',
                          borderRadius: '8px',
                        }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {portfolioData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span style={{ color: '#e2f8ff' }}>{item.name}</span>
                      </div>
                      <span style={{ color: '#7f8bab' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm" style={{ color: '#7f8bab', borderBottom: '1px solid #263348' }}>
                    <th className="p-4 font-medium">Asset</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Value</th>
                    <th className="p-4 font-medium">24h Change</th>
                    <th className="p-4 font-medium">Allocation</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => (
                    <tr key={holding.symbol} className="text-sm" style={{ borderBottom: '1px solid #263348' }}>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#e42338', color: '#ffffff' }}>
                            {holding.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{holding.symbol}</p>
                            <p className="text-xs" style={{ color: '#7f8bab' }}>{holding.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-white">
                        {holding.amount.toLocaleString()} {holding.symbol}
                      </td>
                      <td className="p-4 font-semibold text-white">
                        ${holding.value.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <Badge variant={holding.change >= 0 ? 'success' : 'danger'}>
                          {holding.change >= 0 ? '+' : ''}{holding.change.toFixed(2)}%
                        </Badge>
                      </td>
                      <td className="p-4" style={{ color: '#7f8bab' }}>
                        {holding.allocation}%
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => window.location.href = '/trading'}
                          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                          style={{ backgroundColor: '#1c273e' }}
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#131b32' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                    <ArrowUpRight className="w-5 h-5" style={{ color: '#00d084' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Bought 0.5 BTC</p>
                    <p className="text-sm" style={{ color: '#7f8bab' }}>2 hours ago</p>
                  </div>
                </div>
                <p className="font-semibold" style={{ color: '#00d084' }}>+$33,716.25</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#131b32' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(228, 35, 56, 0.1)' }}>
                    <ArrowDownRight className="w-5 h-5" style={{ color: '#e42338' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sold 10 ETH</p>
                    <p className="text-sm" style={{ color: '#7f8bab' }}>Yesterday</p>
                  </div>
                </div>
                <p className="font-semibold" style={{ color: '#e42338' }}>-$35,218.00</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#131b32' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                    <ArrowUpRight className="w-5 h-5" style={{ color: '#00d084' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Deposited $5,000</p>
                    <p className="text-sm" style={{ color: '#7f8bab' }}>3 days ago</p>
                  </div>
                </div>
                <p className="font-semibold" style={{ color: '#00d084' }}>+$5,000.00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}