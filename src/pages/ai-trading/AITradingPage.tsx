import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Modal } from '@/components/ui';
import { Bot, TrendingUp, Activity, Zap, Settings, Play, Pause, ChevronRight } from 'lucide-react';

const aiStrategies = [
  {
    id: 1,
    name: 'Smart Scalper',
    description: 'High-frequency trading for quick profits',
    enabled: true,
    profit: 1240,
    winRate: 78,
    trades: 156,
    drawdown: 2.5,
  },
  {
    id: 2,
    name: 'Trend Rider',
    description: 'Follows market trends for steady gains',
    enabled: true,
    profit: 890,
    winRate: 72,
    trades: 89,
    drawdown: 4.2,
  },
  {
    id: 3,
    name: 'Breakout Hunter',
    description: 'Captures volatility breakouts',
    enabled: false,
    profit: 560,
    winRate: 65,
    trades: 45,
    drawdown: 6.1,
  },
];

const liveSignals = [
  { time: '14:32', pair: 'EUR/USD', action: 'BUY', entry: 1.0925, sl: 1.0890, tp: 1.0980, status: 'active' },
  { time: '13:15', pair: 'XAU/USD', action: 'SELL', entry: 2030.00, sl: 2035.00, tp: 2020.00, status: 'closed' },
  { time: '11:45', pair: 'GBP/JPY', action: 'BUY', entry: 168.500, sl: 168.000, tp: 169.200, status: 'closed' },
];

export default function AITradingPage() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">AI Trading Center</h1>
          <p className="text-text-secondary mt-1">Automated trading powered by machine learning</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                </div>
              </div>
              <p className="text-text-muted text-sm mt-4 mb-1">AI Profit (30d)</p>
              <p className="text-2xl font-bold text-text-primary">$3,240</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-accent-blue" />
                </div>
              </div>
              <p className="text-text-muted text-sm mt-4 mb-1">Active Signals</p>
              <p className="text-2xl font-bold text-text-primary">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent-purple" />
                </div>
              </div>
              <p className="text-text-muted text-sm mt-4 mb-1">Win Rate</p>
              <p className="text-2xl font-bold text-text-primary">74.5%</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-orange" />
                </div>
              </div>
              <p className="text-text-muted text-sm mt-4 mb-1">Active Bots</p>
              <p className="text-2xl font-bold text-text-primary">2</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Strategies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Strategies</CardTitle>
              <Button variant="primary" icon={<Bot className="w-4 h-4" />}>
                Add Strategy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {aiStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className={`p-6 rounded-xl border ${
                    strategy.enabled ? 'border-accent-green/30 bg-accent-green/5' : 'border-bg-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        strategy.enabled ? 'bg-accent-green/10' : 'bg-bg-tertiary'
                      }`}>
                        <Bot className={`w-5 h-5 ${strategy.enabled ? 'text-accent-green' : 'text-text-muted'}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{strategy.name}</p>
                        <p className="text-xs text-text-muted">{strategy.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStrategy(strategy.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        strategy.enabled ? 'bg-accent-green text-white' : 'bg-bg-tertiary text-text-muted'
                      }`}
                    >
                      {strategy.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-text-muted text-xs">Profit</p>
                      <p className="text-lg font-bold text-accent-green">+${strategy.profit}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">Win Rate</p>
                      <p className="text-lg font-bold text-text-primary">{strategy.winRate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{strategy.trades} trades</span>
                    <span className="text-text-muted">DD: {strategy.drawdown}%</span>
                  </div>

                  <Button
                    variant="ghost"
                    fullWidth
                    className="mt-4"
                    icon={<Settings className="w-4 h-4" />}
                    onClick={() => {
                      setSelectedStrategy(strategy.id);
                      setShowSettingsModal(true);
                    }}
                  >
                    Settings
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Trading Signals */}
        <Card>
          <CardHeader>
            <CardTitle>Live Trading Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-text-muted text-sm border-b border-bg-border">
                    <th className="pb-3 font-medium">Time</th>
                    <th className="pb-3 font-medium">Pair</th>
                    <th className="pb-3 font-medium">Action</th>
                    <th className="pb-3 font-medium">Entry</th>
                    <th className="pb-3 font-medium">SL</th>
                    <th className="pb-3 font-medium">TP</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-border text-sm">
                  {liveSignals.map((signal, index) => (
                    <tr key={index}>
                      <td className="py-3 text-text-muted">{signal.time}</td>
                      <td className="py-3 font-medium text-text-primary">{signal.pair}</td>
                      <td className="py-3">
                        <Badge variant={signal.action === 'BUY' ? 'success' : 'danger'}>
                          {signal.action}
                        </Badge>
                      </td>
                      <td className="py-3 text-text-secondary">{signal.entry}</td>
                      <td className="py-3 text-accent-red">{signal.sl}</td>
                      <td className="py-3 text-accent-green">{signal.tp}</td>
                      <td className="py-3">
                        <Badge variant={signal.status === 'active' ? 'info' : 'default'}>
                          {signal.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Settings Modal */}
        <Modal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          title="Strategy Settings"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Max Positions</label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Risk per Trade (%)</label>
                <input
                  type="number"
                  defaultValue="2"
                  step="0.5"
                  className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-green"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" fullWidth onClick={() => setShowSettingsModal(false)}>
                Cancel
              </Button>
              <Button fullWidth>
                Save Settings
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}