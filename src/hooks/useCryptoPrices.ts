import { useState, useEffect, useCallback } from 'react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  image: string;
}

interface CryptoAPIResponse {
  prices: CryptoPrice[];
  lastUpdated: Date;
  error: string | null;
}

const CRYPTO_IDS = [
  'bitcoin', 'ethereum', 'solana', 'ripple', 'cardano',
  'dogecoin', 'polkadot', 'avalanche-2', 'chainlink', 'polygon'
];

export function useCryptoPrices() {
  const [data, setData] = useState<CryptoAPIResponse>({
    prices: [],
    lastUpdated: new Date(),
    error: null
  });
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      // Using CoinGecko free API (no API key required)
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTO_IDS.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch crypto prices');
      }

      const result = await response.json();

      const prices: CryptoPrice[] = result.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h || 0,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        image: coin.image
      }));

      setData({
        prices,
        lastUpdated: new Date(),
        error: null
      });
      setLoading(false);
    } catch (error) {
      // Fallback to demo data if API fails
      const demoPrices: CryptoPrice[] = [
        { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 67432.50, price_change_percentage_24h: 2.34, market_cap: 1325000000000, total_volume: 28500000000, high_24h: 68200, low_24h: 65800, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
        { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 3521.80, price_change_percentage_24h: 1.87, market_cap: 423000000000, total_volume: 15200000000, high_24h: 3580, low_24h: 3420, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
        { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 172.45, price_change_percentage_24h: 3.21, market_cap: 78200000000, total_volume: 3200000000, high_24h: 175.20, low_24h: 165.80, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
        { id: 'ripple', symbol: 'XRP', name: 'XRP', current_price: 0.5842, price_change_percentage_24h: -0.54, market_cap: 32500000000, total_volume: 1850000000, high_24h: 0.5980, low_24h: 0.5720, image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
        { id: 'cardano', symbol: 'ADA', name: 'Cardano', current_price: 0.4521, price_change_percentage_24h: 1.12, market_cap: 16100000000, total_volume: 524000000, high_24h: 0.4650, low_24h: 0.4410, image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
        { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', current_price: 0.1642, price_change_percentage_24h: 4.56, market_cap: 23400000000, total_volume: 1120000000, high_24h: 0.1680, low_24h: 0.1550, image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
        { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', current_price: 7.85, price_change_percentage_24h: 0.89, market_cap: 10200000000, total_volume: 342000000, high_24h: 7.98, low_24h: 7.62, image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
        { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', current_price: 38.92, price_change_percentage_24h: 2.45, market_cap: 15200000000, total_volume: 687000000, high_24h: 39.80, low_24h: 37.50, image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
        { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', current_price: 14.23, price_change_percentage_24h: 1.67, market_cap: 8500000000, total_volume: 456000000, high_24h: 14.58, low_24h: 13.82, image: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
        { id: 'polygon', symbol: 'MATIC', name: 'Polygon', current_price: 0.7215, price_change_percentage_24h: 0.23, market_cap: 7100000000, total_volume: 298000000, high_24h: 0.7380, low_24h: 0.7080, image: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
      ];

      setData({
        prices: demoPrices,
        lastUpdated: new Date(),
        error: 'Using demo data - API rate limited'
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { ...data, loading, refetch: fetchPrices };
}

// Hook for getting a single crypto price with historical data
export function useCryptoChart(symbol: string, days: number = 7) {
  const [chartData, setChartData] = useState<{ prices: number[][]; loading: boolean; error: string | null }>({
    prices: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Map symbol to coin ID
        const symbolToId: Record<string, string> = {
          'BTC': 'bitcoin',
          'ETH': 'ethereum',
          'SOL': 'solana',
          'XRP': 'ripple',
          'ADA': 'cardano',
          'DOGE': 'dogecoin',
          'DOT': 'polkadot',
          'AVAX': 'avalanche-2',
          'LINK': 'chainlink',
          'MATIC': 'polygon'
        };

        const coinId = symbolToId[symbol];
        if (!coinId) {
          setChartData({ prices: [], loading: false, error: 'Unsupported symbol' });
          return;
        }

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }

        const result = await response.json();
        setChartData({ prices: result.prices, loading: false, error: null });
      } catch (error) {
        // Generate demo chart data
        const demoData: number[][] = [];
        const basePrice = 100;
        const now = Date.now();
        for (let i = 0; i < 100; i++) {
          const timestamp = now - (100 - i) * 3600000;
          const variation = Math.sin(i / 10) * 10 + Math.random() * 5;
          demoData.push([timestamp, basePrice + variation]);
        }
        setChartData({ prices: demoData, loading: false, error: 'Using demo chart data' });
      }
    };

    fetchChartData();
  }, [symbol, days]);

  return chartData;
}

// Format price with appropriate decimal places
export function formatCryptoPrice(price: number, symbol: string): string {
  if (price >= 1000) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (price >= 1) {
    return price.toFixed(2);
  } else {
    return price.toFixed(4);
  }
}

// Format large numbers (market cap, volume)
export function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}