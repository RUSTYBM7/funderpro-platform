import { useCryptoPrices, formatCryptoPrice, formatLargeNumber } from '@/hooks/useCryptoPrices';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function CryptoWatchlist() {
  const { prices, loading, error, lastUpdated, refetch } = useCryptoPrices();

  if (loading && prices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crypto Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin w-8 h-8 border-2 rounded-full" style={{ borderColor: '#e42338', borderTopColor: 'transparent' }} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crypto Markets</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-xs" style={{ color: '#7f8bab' }}>
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <button
              onClick={() => refetch()}
              className="p-1 rounded hover:bg-bg-tertiary transition-colors"
              style={{ color: '#7f8bab' }}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {prices.map((crypto, index) => (
            <motion.div
              key={crypto.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold text-text-primary">{crypto.symbol}</p>
                  <p className="text-xs text-text-muted">{crypto.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-text-primary">
                  ${formatCryptoPrice(crypto.current_price, crypto.symbol)}
                </p>
                <div className="flex items-center justify-end">
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" style={{ color: '#00d084' }} />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" style={{ color: '#e42338' }} />
                  )}
                  <span
                    className="text-xs font-medium"
                    style={{ color: crypto.price_change_percentage_24h >= 0 ? '#00d084' : '#e42338' }}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {error && (
          <p className="text-xs text-center mt-4" style={{ color: '#7f8bab' }}>
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function CryptoStats() {
  const { prices, loading } = useCryptoPrices();

  if (loading && prices.length === 0) {
    return null;
  }

  // Calculate totals
  const totalMarketCap = prices.reduce((sum, crypto) => sum + crypto.market_cap, 0);
  const totalVolume = prices.reduce((sum, crypto) => sum + crypto.total_volume, 0);
  const gainers = prices.filter(c => c.price_change_percentage_24h > 0).length;
  const losers = prices.filter(c => c.price_change_percentage_24h < 0).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-lg"
        style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
      >
        <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>Market Cap</p>
        <p className="text-lg font-bold" style={{ color: '#e2f8ff' }}>{formatLargeNumber(totalMarketCap)}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-lg"
        style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
      >
        <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>24h Volume</p>
        <p className="text-lg font-bold" style={{ color: '#e2f8ff' }}>{formatLargeNumber(totalVolume)}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-lg"
        style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
      >
        <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>Gainers</p>
        <p className="text-lg font-bold" style={{ color: '#00d084' }}>{gainers}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-lg"
        style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
      >
        <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>Losers</p>
        <p className="text-lg font-bold" style={{ color: '#e42338' }}>{losers}</p>
      </motion.div>
    </div>
  );
}