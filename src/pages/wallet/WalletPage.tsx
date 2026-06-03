import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Badge, Modal, Input } from '@/components/ui';
import {
  Wallet, ArrowUpRight, Plus, Copy, Check, TrendingUp, Clock, ExternalLink
} from 'lucide-react';

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', balance: 0.025, value: 1250.50, change: 2.5 },
  { symbol: 'ETH', name: 'Ethereum', balance: 0.45, value: 892.30, change: 1.8 },
  { symbol: 'USDT', name: 'Tether', balance: 5000, value: 5000.00, change: 0 },
  { symbol: 'BNB', name: 'Binance Coin', balance: 12.5, value: 3750.00, change: -0.5 },
  { symbol: 'XRP', name: 'Ripple', balance: 2500, value: 1375.00, change: 3.2 },
];

const transactions = [
  { id: 1, type: 'deposit', asset: 'BTC', amount: '+0.010', status: 'completed', date: '2024-03-15' },
  { id: 2, type: 'buy', asset: 'ETH', amount: '+0.15', status: 'completed', date: '2024-03-14' },
  { id: 3, type: 'deposit', asset: 'USDT', amount: '+5000', status: 'completed', date: '2024-03-13' },
  { id: 4, type: 'buy', asset: 'SOL', amount: '+50', status: 'completed', date: '2024-03-12' },
];

export default function WalletPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('');

  const totalBalance = assets.reduce((sum, asset) => sum + asset.value, 0);

  const copyAddress = () => {
    navigator.clipboard.writeText('0x742d35Cc6634C0532925a3b844Bc9e7595f7a5C2');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openOpenOcean = () => {
    // Open OpenOcean in new tab for crypto purchases
    window.open('https://openocean.io/', '_blank', 'noopener,noreferrer');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#e2f8ff' }}>Wallet</h1>
            <p className="text-sm mt-1" style={{ color: '#7f8bab' }}>Manage your funds and transactions</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowDepositModal(true)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
              style={{ backgroundColor: '#1c273e', color: '#e2f8ff' }}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => setShowBuyModal(true)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#e42338' }}
            >
              <Plus className="w-4 h-4" />
              <span>Buy Crypto</span>
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="overflow-hidden">
          <div style={{ background: 'linear-gradient(135deg, rgba(228, 35, 56, 0.2) 0%, rgba(0, 208, 132, 0.1) 100%)' }}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-2" style={{ color: '#7f8bab' }}>Total Balance</p>
                  <p className="text-4xl font-bold text-white">${totalBalance.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" style={{ color: '#00d084' }} />
                    <span className="text-sm font-medium" style={{ color: '#00d084' }}>+$1,250.50 (10.5%)</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#e42338' }}>
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* OpenOcean Buy Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buy Cryptocurrency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-6 rounded-xl" style={{ backgroundColor: '#131b32' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Purchase via OpenOcean</p>
                  <p className="text-sm" style={{ color: '#7f8bab' }}>Access 10,000+ tokens with best rates</p>
                </div>
              </div>
              <button
                onClick={openOpenOcean}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#00d084' }}
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Assets */}
        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y" style={{ borderColor: '#263348' }}>
              {assets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between p-4 transition-colors hover:bg-opacity-50" style={{ backgroundColor: 'transparent' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e42338' }}>
                      <span className="text-white font-bold text-sm">{asset.symbol[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{asset.symbol}</p>
                      <p className="text-sm" style={{ color: '#7f8bab' }}>{asset.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${asset.value.toLocaleString()}</p>
                    <p className="text-sm" style={{ color: asset.change >= 0 ? '#00d084' : '#e42338' }}>
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <button className="text-sm flex items-center transition-colors" style={{ color: '#00d084' }}>
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #263348' }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                      {tx.type === 'deposit' ? (
                        <ArrowUpRight className="w-5 h-5" style={{ color: '#00d084' }} />
                      ) : (
                        <Plus className="w-5 h-5" style={{ color: '#00d084' }} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {tx.type === 'deposit' ? 'Deposit' : 'Purchase'} {tx.asset}
                      </p>
                      <p className="text-sm flex items-center" style={{ color: '#7f8bab' }}>
                        <Clock className="w-3 h-3 mr-1" />
                        {tx.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" style={{ color: '#00d084' }}>{tx.amount}</p>
                    <Badge variant="success" className="mt-1">{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deposit Modal */}
        <Modal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          title="Deposit Crypto"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2" style={{ color: '#e2f8ff' }}>Select Asset</label>
              <div className="grid grid-cols-3 gap-3">
                {['BTC', 'ETH', 'USDT'].map((asset) => (
                  <button
                    key={asset}
                    onClick={() => setSelectedAsset(asset)}
                    className="p-4 rounded-lg border transition-all"
                    style={{
                      backgroundColor: selectedAsset === asset ? 'rgba(0, 208, 132, 0.1)' : '#131b32',
                      borderColor: selectedAsset === asset ? '#00d084' : '#263348'
                    }}
                  >
                    <span className="font-semibold text-white">{asset}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedAsset && (
              <>
                <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#131b32' }}>
                  <p className="text-sm mb-4" style={{ color: '#7f8bab' }}>Scan QR code or copy address</p>
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1 p-4">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: Math.random() > 0.5 ? '#000' : '#fff' }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <code className="px-4 py-2 rounded text-sm text-white" style={{ backgroundColor: '#0f1527' }}>
                      0x742d35Cc6634C0532925a3b844Bc9e7595f7a5C2
                    </code>
                    <button
                      onClick={copyAddress}
                      className="p-2 transition-colors"
                      style={{ color: '#7f8bab' }}
                    >
                      {copied ? <Check className="w-5 h-5" style={{ color: '#00d084' }} /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.2)' }}>
                  <p className="text-sm" style={{ color: '#ffc107' }}>
                    <strong>Important:</strong> Only send {selectedAsset} to this address. Sending other assets may result in permanent loss.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={() => setShowDepositModal(false)}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all"
              style={{ backgroundColor: '#1c273e' }}
            >
              Close
            </button>
          </div>
        </Modal>

        {/* Buy Crypto Modal */}
        <Modal
          isOpen={showBuyModal}
          onClose={() => setShowBuyModal(false)}
          title="Buy Cryptocurrency"
          size="md"
        >
          <div className="space-y-6">
            <div className="p-6 rounded-xl" style={{ backgroundColor: '#131b32' }}>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#00d084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">OpenOcean</p>
                  <p className="text-sm" style={{ color: '#7f8bab' }}>Powered by OpenOcean DEX Aggregator</p>
                </div>
              </div>
              <p className="text-sm" style={{ color: '#e2f8ff' }}>
                Access the best rates across 50+ DEXes and aggregators. Supports 10,000+ tokens on multiple chains including Ethereum, BSC, Polygon, and more.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: '#131b32' }}>
                <ul className="space-y-3 text-sm" style={{ color: '#e2f8ff' }}>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00d084' }}></span>
                    Best price routing across DEXes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00d084' }}></span>
                    Support for 50+ networks
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00d084' }}></span>
                    Fast execution and low slippage
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00d084' }}></span>
                    10,000+ tokens available
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBuyModal(false)}
                className="flex-1 py-3 rounded-xl font-semibold transition-all"
                style={{ backgroundColor: '#1c273e', color: '#e2f8ff' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  openOpenOcean();
                }}
                className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center space-x-2"
                style={{ backgroundColor: '#00d084' }}
              >
                <span>Continue to OpenOcean</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}