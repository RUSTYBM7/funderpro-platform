import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';
import { TrendingUp, TrendingDown, Search, Filter, RefreshCw } from 'lucide-react';
import { useCryptoPrices, formatCryptoPrice, formatLargeNumber } from '@/hooks/useCryptoPrices';
import { useState } from 'react';

const cryptoData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.50, change: 2.34, high: 68200, low: 65800, marketCap: 1325000000000, volume: 28500000000 },
  { symbol: 'ETH', name: 'Ethereum', price: 3521.80, change: 1.87, high: 3580, low: 3420, marketCap: 423000000000, volume: 15200000000 },
  { symbol: 'SOL', name: 'Solana', price: 172.45, change: 3.21, high: 175.20, low: 165.80, marketCap: 78200000000, volume: 3200000000 },
  { symbol: 'XRP', name: 'XRP', price: 0.5842, change: -0.54, high: 0.5980, low: 0.5720, marketCap: 32500000000, volume: 1850000000 },
  { symbol: 'ADA', name: 'Cardano', price: 0.4521, change: 1.12, high: 0.4650, low: 0.4410, marketCap: 16100000000, volume: 524000000 },
  { symbol: 'DOGE', name: 'Dogecoin', price: 0.1642, change: 4.56, high: 0.1680, low: 0.1550, marketCap: 23400000000, volume: 1120000000 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.85, change: 0.89, high: 7.98, low: 7.62, marketCap: 10200000000, volume: 342000000 },
  { symbol: 'AVAX', name: 'Avalanche', price: 38.92, change: 2.45, high: 39.80, low: 37.50, marketCap: 15200000000, volume: 687000000 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.23, change: 1.67, high: 14.58, low: 13.82, marketCap: 8500000000, volume: 456000000 },
  { symbol: 'MATIC', name: 'Polygon', price: 0.7215, change: 0.23, high: 0.7380, low: 0.7080, marketCap: 7100000000, volume: 298000000 },
];

export default function MarketsPage() {
  const { prices, loading, refetch } = useCryptoPrices();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');

  const filteredMarkets = cryptoData
    .filter(market =>
      market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'change') return Math.abs(b.change) - Math.abs(a.change);
      return b.marketCap - a.marketCap;
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#e2f8ff' }}>Markets</h1>
            <p className="text-sm mt-1" style={{ color: '#7f8bab' }}>Explore cryptocurrency markets and trading pairs</p>
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

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg"
              style={{ backgroundColor: '#131b32', border: '1px solid #263348', color: '#ffffff' }}
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: '#131b32', border: '1px solid #263348', color: '#e2f8ff' }}
          >
            <option value="marketCap">Sort by Market Cap</option>
            <option value="price">Sort by Price</option>
            <option value="change">Sort by Change</option>
          </select>
        </div>

        {/* Markets Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm" style={{ color: '#7f8bab', borderBottom: '1px solid #263348' }}>
                    <th className="p-4 font-medium">#</th>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">24h Change</th>
                    <th className="p-4 font-medium">Market Cap</th>
                    <th className="p-4 font-medium">24h Volume</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMarkets.map((market, index) => (
                    <tr key={market.symbol} className="text-sm hover:bg-bg-tertiary transition-colors" style={{ borderBottom: '1px solid #263348' }}>
                      <td className="p-4" style={{ color: '#7f8bab' }}>{index + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#e42338', color: '#ffffff' }}>
                            {market.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{market.symbol}</p>
                            <p className="text-xs" style={{ color: '#7f8bab' }}>{market.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-white">
                        ${formatCryptoPrice(market.price, market.symbol)}
                      </td>
                      <td className="p-4">
                        <Badge variant={market.change >= 0 ? 'success' : 'danger'}>
                          {market.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                          {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                        </Badge>
                      </td>
                      <td className="p-4" style={{ color: '#7f8bab' }}>
                        {formatLargeNumber(market.marketCap)}
                      </td>
                      <td className="p-4" style={{ color: '#7f8bab' }}>
                        {formatLargeNumber(market.volume)}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => window.location.href = '/trading'}
                          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                          style={{ backgroundColor: '#00d084' }}
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

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Total Market Cap</p>
              <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>$2.34T</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>24h Volume</p>
              <p className="text-2xl font-bold" style={{ color: '#e2f8ff' }}>$89.5B</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>BTC Dominance</p>
              <p className="text-2xl font-bold" style={{ color: '#e42338' }}>52.4%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}