import React, { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
import { CryptoWatchlist, CryptoStats } from '@/components/crypto/CryptoWatchlist';
import {
  LineChart, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Clock, BarChart3, Activity, Settings, Search, RefreshCw, ChevronDown
} from 'lucide-react';
import { useCryptoPrices, formatCryptoPrice, formatLargeNumber } from '@/hooks/useCryptoPrices';

const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W'];
const orderTypes = ['Market', 'Limit', 'Stop'];

export default function TradingTerminal() {
  const { prices, loading, lastUpdated, refetch } = useCryptoPrices();
  const [selectedSymbol, setSelectedSymbol] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [orderType, setOrderType] = useState('Market');
  const [lotSize, setLotSize] = useState('0.10');
  const [showCryptoSearch, setShowCryptoSearch] = useState(false);

  const currentPair = prices.find(p => p.symbol === selectedSymbol);

  // Update selected symbol when prices load
  useEffect(() => {
    if (prices.length > 0 && !currentPair) {
      setSelectedSymbol(prices[0].symbol);
    }
  }, [prices]);

  const handleCryptoSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    setShowCryptoSearch(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#e2f8ff' }}>Trading Terminal</h1>
            <p className="text-sm mt-1" style={{ color: '#7f8bab' }}>Execute trades and monitor crypto markets</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="success" className="px-3 py-1">
              <Activity className="w-4 h-4 mr-1" />
              Market Open
            </Badge>
            <Button variant="outline" icon={<Settings className="w-4 h-4" />}>
              Settings
            </Button>
          </div>
        </div>

        {/* Crypto Stats */}
        <CryptoStats />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Watchlist */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Crypto Watchlist</CardTitle>
                  <button
                    onClick={() => refetch()}
                    className="p-1 rounded hover:bg-bg-tertiary transition-colors"
                    style={{ color: '#7f8bab' }}
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y" style={{ borderColor: '#263348' }}>
                  {prices.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => handleCryptoSelect(crypto.symbol)}
                      className={`w-full p-4 text-left hover:bg-bg-tertiary transition-colors ${
                        selectedSymbol === crypto.symbol ? 'border-l-2' : ''
                      }`}
                      style={{
                        backgroundColor: selectedSymbol === crypto.symbol ? 'rgba(0, 208, 132, 0.1)' : 'transparent',
                        borderLeftColor: '#00d084'
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                        <div className="flex-1">
                          <span className="font-semibold" style={{ color: '#e2f8ff' }}>{crypto.symbol}</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          crypto.price_change_percentage_24h >= 0 ? 'text-accent-green' : 'text-accent-red'
                        }`}>
                          ${formatCryptoPrice(crypto.current_price, crypto.symbol)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: '#7f8bab' }}>
                          Vol: {formatLargeNumber(crypto.total_volume)}
                        </span>
                        <span className={`text-xs font-medium ${
                          crypto.price_change_percentage_24h >= 0 ? 'text-accent-green' : 'text-accent-red'
                        }`}>
                          {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowCryptoSearch(!showCryptoSearch)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg"
                        style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}
                      >
                        {currentPair && (
                          <img src={currentPair.image} alt={currentPair.name} className="w-6 h-6 rounded-full" />
                        )}
                        <span className="font-semibold" style={{ color: '#e2f8ff' }}>{selectedSymbol}</span>
                        <ChevronDown className="w-4 h-4" style={{ color: '#7f8bab' }} />
                      </button>
                      {showCryptoSearch && (
                        <div
                          className="absolute top-full left-0 mt-2 w-64 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto"
                          style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}
                        >
                          {prices.map((crypto) => (
                            <button
                              key={crypto.id}
                              onClick={() => handleCryptoSelect(crypto.symbol)}
                              className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-bg-tertiary transition-colors"
                            >
                              <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
                              <span className="font-medium" style={{ color: '#e2f8ff' }}>{crypto.symbol}</span>
                              <span className="text-sm" style={{ color: '#7f8bab' }}>{crypto.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className={`text-2xl font-bold ${
                      (currentPair?.price_change_percentage_24h || 0) >= 0 ? 'text-accent-green' : 'text-accent-red'
                    }`}>
                      ${currentPair ? formatCryptoPrice(currentPair.current_price, selectedSymbol) : '---'}
                    </span>
                    {currentPair && (
                      <Badge variant={(currentPair.price_change_percentage_24h) >= 0 ? 'success' : 'danger'}>
                        {currentPair.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {currentPair.price_change_percentage_24h.toFixed(2)}%
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          selectedTimeframe === tf
                            ? 'text-white'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                        style={{
                          backgroundColor: selectedTimeframe === tf ? '#00d084' : '#1c273e'
                        }}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* TradingView Chart Placeholder */}
                <div
                  className="rounded-xl h-80 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: '#131b32' }}
                >
                  {/* Simple chart visualization */}
                  <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00d084" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00d084" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#263348" strokeWidth="0.5" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#263348" strokeWidth="0.5" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#263348" strokeWidth="0.5" />
                    {/* Chart line */}
                    <path
                      d="M0,150 Q50,120 100,130 T200,80 T300,100 T400,60"
                      fill="none"
                      stroke="#00d084"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,150 Q50,120 100,130 T200,80 T300,100 T400,60 L400,200 L0,200 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                  <div className="absolute top-4 left-4 text-center">
                    <p className="text-xs" style={{ color: '#7f8bab' }}>Live Chart</p>
                    <p className="text-sm font-medium" style={{ color: '#e2f8ff' }}>{selectedSymbol}/USD • {selectedTimeframe}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-lg p-3" style={{ backgroundColor: '#131b32' }}>
                    <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>24h High</p>
                    <p className="text-sm font-semibold" style={{ color: '#e2f8ff' }}>
                      ${currentPair ? formatCryptoPrice(currentPair.high_24h, selectedSymbol) : '---'}
                    </p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: '#131b32' }}>
                    <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>24h Low</p>
                    <p className="text-sm font-semibold" style={{ color: '#e2f8ff' }}>
                      ${currentPair ? formatCryptoPrice(currentPair.low_24h, selectedSymbol) : '---'}
                    </p>
                  </div>
                  <div className="rounded-lg p-3" style={{ backgroundColor: '#131b32' }}>
                    <p className="text-xs mb-1" style={{ color: '#7f8bab' }}>Market Cap</p>
                    <p className="text-sm font-semibold" style={{ color: '#e2f8ff' }}>
                      {currentPair ? formatLargeNumber(currentPair.market_cap) : '---'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Panel */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Order Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Type */}
                  <div className="flex space-x-2">
                    {orderTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className="flex-1 py-2 text-sm rounded-lg transition-colors"
                        style={{
                          backgroundColor: orderType === type ? '#00d084' : '#1c273e',
                          color: orderType === type ? '#ffffff' : '#7f8bab'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Direction */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className="py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center"
                      style={{ backgroundColor: '#00d084' }}
                    >
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      Buy
                    </button>
                    <button
                      className="py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center"
                      style={{ backgroundColor: '#e42338' }}
                    >
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                      Sell
                    </button>
                  </div>

                  {/* Lot Size */}
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#e2f8ff' }}>Amount ({selectedSymbol})</label>
                    <input
                      type="number"
                      value={lotSize}
                      onChange={(e) => setLotSize(e.target.value)}
                      className="w-full rounded-lg px-4 py-2.5"
                      style={{
                        backgroundColor: '#131b32',
                        border: '1px solid #263348',
                        color: '#ffffff'
                      }}
                      step="0.01"
                      min="0.01"
                      max="100"
                    />
                  </div>

                  {/* Value in USD */}
                  {currentPair && (
                    <div className="rounded-lg p-4" style={{ backgroundColor: '#1c273e' }}>
                      <p className="text-xs mb-2" style={{ color: '#7f8bab' }}>Order Value</p>
                      <p className="text-xl font-bold" style={{ color: '#e2f8ff' }}>
                        ${(parseFloat(lotSize) * currentPair.current_price).toFixed(2)} USD
                      </p>
                    </div>
                  )}

                  {/* Risk Info */}
                  <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#131b32' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#7f8bab' }}>Fee (0.1%)</span>
                      <span style={{ color: '#e2f8ff' }}>$2.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#7f8bab' }}>Est. Slippage</span>
                      <span style={{ color: '#e2f8ff' }}>$0.50</span>
                    </div>
                  </div>

                  {/* Quick Lots */}
                  <div className="flex space-x-2">
                    {['0.01', '0.05', '0.10', '0.50'].map((lot) => (
                      <button
                        key={lot}
                        onClick={() => setLotSize(lot)}
                        className="flex-1 py-2 text-xs rounded-lg transition-colors"
                        style={{
                          backgroundColor: lotSize === lot ? '#00d084' : '#1c273e',
                          color: lotSize === lot ? '#ffffff' : '#7f8bab'
                        }}
                      >
                        {lot}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Crypto Transactions</CardTitle>
              <div className="flex items-center space-x-2 text-sm" style={{ color: '#7f8bab' }}>
                <Clock className="w-4 h-4" />
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm" style={{ color: '#7f8bab', borderBottom: '1px solid #263348' }}>
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Symbol</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Price</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#263348' }}>
                  <tr className="text-sm">
                    <td className="py-3" style={{ color: '#7f8bab' }}>14:32</td>
                    <td className="py-3 font-medium" style={{ color: '#e2f8ff' }}>
                      <div className="flex items-center space-x-2">
                        <img src={currentPair?.image} alt="" className="w-5 h-5 rounded-full" />
                        <span>{selectedSymbol}</span>
                      </div>
                    </td>
                    <td className="py-3"><Badge variant="success">BUY</Badge></td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>0.10</td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>
                      ${currentPair ? formatCryptoPrice(currentPair.current_price, selectedSymbol) : '---'}
                    </td>
                    <td className="py-3" style={{ color: '#e2f8ff' }}>
                      ${currentPair ? (0.10 * currentPair.current_price).toFixed(2) : '---'}
                    </td>
                    <td className="py-3"><Badge variant="info">Filled</Badge></td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-3" style={{ color: '#7f8bab' }}>13:45</td>
                    <td className="py-3 font-medium" style={{ color: '#e2f8ff' }}>
                      <div className="flex items-center space-x-2">
                        <img src={prices[1]?.image} alt="" className="w-5 h-5 rounded-full" />
                        <span>ETH</span>
                      </div>
                    </td>
                    <td className="py-3"><Badge variant="danger">SELL</Badge></td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>0.50</td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>
                      ${prices[1] ? formatCryptoPrice(prices[1].current_price, 'ETH') : '---'}
                    </td>
                    <td className="py-3" style={{ color: '#e2f8ff' }}>
                      ${prices[1] ? (0.50 * prices[1].current_price).toFixed(2) : '---'}
                    </td>
                    <td className="py-3"><Badge variant="info">Filled</Badge></td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-3" style={{ color: '#7f8bab' }}>12:15</td>
                    <td className="py-3 font-medium" style={{ color: '#e2f8ff' }}>
                      <div className="flex items-center space-x-2">
                        <img src={prices[2]?.image} alt="" className="w-5 h-5 rounded-full" />
                        <span>SOL</span>
                      </div>
                    </td>
                    <td className="py-3"><Badge variant="success">BUY</Badge></td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>5.00</td>
                    <td className="py-3" style={{ color: '#7f8bab' }}>
                      ${prices[2] ? formatCryptoPrice(prices[2].current_price, 'SOL') : '---'}
                    </td>
                    <td className="py-3" style={{ color: '#e2f8ff' }}>
                      ${prices[2] ? (5 * prices[2].current_price).toFixed(2) : '---'}
                    </td>
                    <td className="py-3"><Badge variant="warning">Pending</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}