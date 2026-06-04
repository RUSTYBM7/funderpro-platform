import { useState } from 'react';

interface Wallet {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  currency: string;
  balance: number;
  lockedBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  lastTransaction: string;
}

const mockWallets: Wallet[] = [
  { id: 'WAL001', userId: 'USR001', userName: 'Alex Morgan', userEmail: 'alex@email.com', currency: 'USD', balance: 12543.67, lockedBalance: 500, totalDeposits: 25000, totalWithdrawals: 12456.33, lastTransaction: '2024-06-04 14:32:15' },
  { id: 'WAL002', userId: 'USR001', userName: 'Alex Morgan', userEmail: 'alex@email.com', currency: 'BTC', balance: 1.2345, lockedBalance: 0, totalDeposits: 3.5, totalWithdrawals: 2.2655, lastTransaction: '2024-06-04 10:15:00' },
  { id: 'WAL003', userId: 'USR002', userName: 'Sarah Chen', userEmail: 'sarah@email.com', currency: 'USDT', balance: 8945.23, lockedBalance: 1000, totalDeposits: 15000, totalWithdrawals: 6054.77, lastTransaction: '2024-06-04 14:28:42' },
  { id: 'WAL004', userId: 'USR003', userName: 'Mike Johnson', userEmail: 'mike@email.com', currency: 'ETH', balance: 5.678, lockedBalance: 0.5, totalDeposits: 10, totalWithdrawals: 3.822, lastTransaction: '2024-06-04 14:25:33' },
  { id: 'WAL005', userId: 'USR004', userName: 'Emma Wilson', userEmail: 'emma@email.com', currency: 'USD', balance: 0, lockedBalance: 0, totalDeposits: 10000, totalWithdrawals: 10000, lastTransaction: '2024-06-01 12:00:00' },
  { id: 'WAL006', userId: 'USR005', userName: 'David Brown', userEmail: 'david@email.com', currency: 'USD', balance: 45678.90, lockedBalance: 5000, totalDeposits: 80000, totalWithdrawals: 29321.10, lastTransaction: '2024-06-04 13:50:00' },
  { id: 'WAL007', userId: 'USR005', userName: 'David Brown', userEmail: 'david@email.com', currency: 'BTC', balance: 2.5678, lockedBalance: 0, totalDeposits: 5, totalWithdrawals: 2.4322, lastTransaction: '2024-06-04 09:30:00' },
  { id: 'WAL008', userId: 'USR006', userName: 'Lisa Anderson', userEmail: 'lisa@email.com', currency: 'EUR', balance: 7823.12, lockedBalance: 500, totalDeposits: 12000, totalWithdrawals: 4176.88, lastTransaction: '2024-06-04 11:20:00' },
];

const cryptoIcons: Record<string, string> = {
  USD: '$',
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮',
  BNB: '◈',
  SOL: '◎',
  EUR: '€',
};

export default function WalletManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyFilter, setCurrencyFilter] = useState('all');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const filteredWallets = mockWallets.filter(wallet => {
    const matchesSearch = wallet.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallet.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallet.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallet.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCurrency = currencyFilter === 'all' || wallet.currency === currencyFilter;
    return matchesSearch && matchesCurrency;
  });

  const totalByCurrency = mockWallets.reduce((acc, wallet) => {
    if (!acc[wallet.currency]) {
      acc[wallet.currency] = { balance: 0, locked: 0 };
    }
    acc[wallet.currency].balance += wallet.balance;
    acc[wallet.currency].locked += wallet.lockedBalance;
    return acc;
  }, {} as Record<string, { balance: number; locked: number }>);

  const handleFreeze = (wallet: Wallet) => {
    alert(`Freeze wallet ${wallet.id} for ${wallet.userName}`);
  };

  const handleUnfreeze = (wallet: Wallet) => {
    alert(`Unfreeze wallet ${wallet.id} for ${wallet.userName}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Wallet Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage user wallets across all currencies</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition">
            Wallet Settings
          </button>
        </div>
      </div>

      {/* Platform Summary */}
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(totalByCurrency).map(([currency, data]) => (
          <div key={currency} className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{cryptoIcons[currency] || '$'}</span>
              <span className="text-white font-semibold">{currency}</span>
            </div>
            <p className="text-2xl font-bold text-white">${data.balance.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-1">
              Locked: ${data.locked.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Wallets</p>
          <p className="text-white text-2xl font-bold mt-1">{mockWallets.length}</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Active Users</p>
          <p className="text-white text-2xl font-bold mt-1">6</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <p className="text-white text-2xl font-bold mt-1">$73,991</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Frozen Wallets</p>
          <p className="text-yellow-400 text-2xl font-bold mt-1">0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by user or wallet ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#FF6B6B]"
          />
        </div>
        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Currencies</option>
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      {/* Wallets Table */}
      <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#252542]">
            <tr>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Wallet</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">User</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Currency</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Balance</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Locked</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Total Deposits</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Total Withdrawals</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredWallets.map((wallet) => (
              <tr key={wallet.id} className="hover:bg-[#252542]/50 transition cursor-pointer" onClick={() => setSelectedWallet(wallet)}>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white font-medium">{wallet.id}</p>
                    <p className="text-gray-500 text-xs">{wallet.userId}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#FF6B6B] text-xs font-semibold">
                        {wallet.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm">{wallet.userName}</p>
                      <p className="text-gray-500 text-xs">{wallet.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cryptoIcons[wallet.currency] || '$'}</span>
                    <span className="text-white font-medium">{wallet.currency}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-white font-medium">
                    {wallet.balance.toLocaleString()} {wallet.currency}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className={wallet.lockedBalance > 0 ? 'text-yellow-400' : 'text-gray-400'}>
                    {wallet.lockedBalance.toLocaleString()} {wallet.currency}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-green-400">
                    +{wallet.totalDeposits.toLocaleString()} {wallet.currency}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-red-400">
                    -{wallet.totalWithdrawals.toLocaleString()} {wallet.currency}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button className="text-gray-400 hover:text-white p-1" title="View Transactions">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleFreeze(wallet)}
                      className="text-gray-400 hover:text-yellow-400 p-1"
                      title="Freeze Wallet"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-blue-400 p-1" title="Adjust Balance">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Wallet Detail Modal */}
      {selectedWallet && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setSelectedWallet(null)}>
          <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#252542] rounded-full flex items-center justify-center">
                    <span className="text-2xl">{cryptoIcons[selectedWallet.currency] || '$'}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedWallet.currency} Wallet</h2>
                    <p className="text-gray-400 font-mono">{selectedWallet.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedWallet(null)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Available Balance</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {selectedWallet.balance.toLocaleString()} {selectedWallet.currency}
                </p>
                {selectedWallet.lockedBalance > 0 && (
                  <p className="text-yellow-400 text-sm mt-2">
                    Locked: {selectedWallet.lockedBalance.toLocaleString()} {selectedWallet.currency}
                  </p>
                )}
              </div>

              <div className="bg-[#252542] rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">User</span>
                  <span className="text-white">{selectedWallet.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{selectedWallet.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Deposits</span>
                  <span className="text-green-400">+{selectedWallet.totalDeposits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Withdrawals</span>
                  <span className="text-red-400">-{selectedWallet.totalWithdrawals.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Transaction</span>
                  <span className="text-white">{selectedWallet.lastTransaction}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  View Transactions
                </button>
                <button className="bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  Adjust Balance
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                  Freeze Wallet
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Contact User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
