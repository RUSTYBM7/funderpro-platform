import { useState } from 'react';

interface Transaction {
  id: string;
  user: string;
  userEmail: string;
  type: 'deposit' | 'withdrawal' | 'trade' | 'transfer';
  amount: number;
  currency: string;
  fee: number;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  timestamp: string;
  txHash?: string;
}

const mockTransactions: Transaction[] = [
  { id: 'TXN001', user: 'Alex Morgan', userEmail: 'alex@email.com', type: 'deposit', amount: 5000, currency: 'USD', fee: 0, status: 'completed', timestamp: '2024-06-04 14:32:15', txHash: '0x8f2e...8a3b' },
  { id: 'TXN002', user: 'Sarah Chen', userEmail: 'sarah@email.com', type: 'withdrawal', amount: 2.5, currency: 'BTC', fee: 0.0005, status: 'pending', timestamp: '2024-06-04 14:28:42' },
  { id: 'TXN003', user: 'Mike Johnson', userEmail: 'mike@email.com', type: 'trade', amount: 1.5, currency: 'ETH', fee: 0.0015, status: 'completed', timestamp: '2024-06-04 14:25:33', txHash: '0x3c4d...9e2f' },
  { id: 'TXN004', user: 'Emma Wilson', userEmail: 'emma@email.com', type: 'deposit', amount: 10000, currency: 'USD', fee: 25, status: 'completed', timestamp: '2024-06-04 14:20:18' },
  { id: 'TXN005', user: 'David Brown', userEmail: 'david@email.com', type: 'withdrawal', amount: 15000, currency: 'USD', fee: 25, status: 'failed', timestamp: '2024-06-04 14:15:55' },
  { id: 'TXN006', user: 'Lisa Anderson', userEmail: 'lisa@email.com', type: 'transfer', amount: 500, currency: 'USDT', fee: 1, status: 'completed', timestamp: '2024-06-04 14:10:22', txHash: '0x1a2b...4c5d' },
  { id: 'TXN007', user: 'James Miller', userEmail: 'james@email.com', type: 'deposit', amount: 0.8, currency: 'BTC', fee: 0, status: 'completed', timestamp: '2024-06-04 14:05:48', txHash: '0x6e7f...0a1b' },
  { id: 'TXN008', user: 'Robert Taylor', userEmail: 'robert@email.com', type: 'trade', amount: 10, currency: 'SOL', fee: 0.01, status: 'pending', timestamp: '2024-06-04 14:00:31' },
  { id: 'TXN009', user: 'Alex Morgan', userEmail: 'alex@email.com', type: 'withdrawal', amount: 1000, currency: 'USDT', fee: 1, status: 'cancelled', timestamp: '2024-06-04 13:55:12' },
  { id: 'TXN010', user: 'Sarah Chen', userEmail: 'sarah@email.com', type: 'deposit', amount: 5000, currency: 'EUR', fee: 0, status: 'completed', timestamp: '2024-06-04 13:50:44', txHash: '0x9c8d...2e3f' },
];

export default function TransactionMonitoring() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (tx.txHash && tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      case 'cancelled': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit': return { icon: '↓', color: 'text-green-400 bg-green-500/20' };
      case 'withdrawal': return { icon: '↑', color: 'text-red-400 bg-red-500/20' };
      case 'trade': return { icon: '⇄', color: 'text-blue-400 bg-blue-500/20' };
      case 'transfer': return { icon: '→', color: 'text-purple-400 bg-purple-500/20' };
      default: return { icon: '?', color: 'text-gray-400 bg-gray-500/20' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transaction Monitoring</h1>
          <p className="text-gray-400 mt-1">Real-time transaction tracking and management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Volume (24h)</p>
          <p className="text-white text-2xl font-bold mt-1">$12.5M</p>
          <p className="text-green-400 text-sm mt-1">+15.3%</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Deposits</p>
          <p className="text-white text-2xl font-bold mt-1">$8.2M</p>
          <p className="text-green-400 text-sm mt-1">+12.1%</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Withdrawals</p>
          <p className="text-white text-2xl font-bold mt-1">$3.8M</p>
          <p className="text-red-400 text-sm mt-1">-5.2%</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Trading Volume</p>
          <p className="text-white text-2xl font-bold mt-1">$4.3M</p>
          <p className="text-green-400 text-sm mt-1">+22.7%</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-yellow-400 text-2xl font-bold mt-1">47</p>
          <p className="text-yellow-400 text-sm mt-1">$1.2M</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by ID, user, email, or tx hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#FF6B6B]"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="trade">Trades</option>
          <option value="transfer">Transfers</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="today">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#252542]">
            <tr>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Transaction</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">User</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Type</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Amount</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Fee</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Time</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredTransactions.map((tx) => {
              const typeStyle = getTypeIcon(tx.type);
              return (
                <tr key={tx.id} className="hover:bg-[#252542]/50 transition cursor-pointer" onClick={() => setSelectedTx(tx)}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{tx.id}</p>
                      {tx.txHash && <p className="text-gray-500 text-xs font-mono">{tx.txHash}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm">{tx.user}</p>
                      <p className="text-gray-500 text-xs">{tx.userEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${typeStyle.color}`}>
                      <span className="font-bold">{typeStyle.icon}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">
                      {tx.type === 'deposit' || tx.type === 'trade' ? '+' : tx.type === 'withdrawal' ? '-' : ''}
                      {tx.amount.toLocaleString()} {tx.currency}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm">
                      {tx.fee > 0 ? `${tx.fee} ${tx.currency}` : '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-400 text-sm">{tx.timestamp}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="text-gray-400 hover:text-white p-1" title="View Details">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-blue-400 p-1" title="View on Explorer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-red-400 p-1" title="Flag Transaction">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#252542]">
          <p className="text-gray-400 text-sm">Showing {filteredTransactions.length} of {mockTransactions.length} transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm" disabled>Previous</button>
            <button className="px-3 py-1 bg-[#FF6B6B] text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">2</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">3</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setSelectedTx(null)}>
          <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Transaction Details</h2>
                <button onClick={() => setSelectedTx(null)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-center py-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getTypeIcon(selectedTx.type).color}`}>
                  <span className="text-2xl font-bold">{getTypeIcon(selectedTx.type).icon}</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-3xl font-bold text-white">
                  {selectedTx.type === 'deposit' ? '+' : selectedTx.type === 'withdrawal' ? '-' : ''}
                  {selectedTx.amount.toLocaleString()} {selectedTx.currency}
                </p>
                <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTx.status)}`}>
                  {selectedTx.status}
                </span>
              </div>

              <div className="bg-[#252542] rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Transaction ID</span>
                  <span className="text-white font-mono">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">User</span>
                  <span className="text-white">{selectedTx.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email</span>
                  <span className="text-white">{selectedTx.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white capitalize">{selectedTx.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fee</span>
                  <span className="text-white">{selectedTx.fee > 0 ? `${selectedTx.fee} ${selectedTx.currency}` : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timestamp</span>
                  <span className="text-white">{selectedTx.timestamp}</span>
                </div>
                {selectedTx.txHash && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tx Hash</span>
                    <span className="text-[#FF6B6B] font-mono text-sm">{selectedTx.txHash}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  View on Explorer
                </button>
                <button className="flex-1 bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition">
                  Flag Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
