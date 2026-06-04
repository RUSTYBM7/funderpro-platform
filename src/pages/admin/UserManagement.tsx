import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  kyc: 'verified' | 'pending' | 'rejected';
  balance: number;
  joined: string;
  lastActive: string;
  trades: number;
}

const mockUsers: User[] = [
  { id: 'USR001', name: 'Alex Morgan', email: 'alex.morgan@email.com', status: 'active', kyc: 'verified', balance: 12543.67, joined: '2024-01-15', lastActive: '2 min ago', trades: 342 },
  { id: 'USR002', name: 'Sarah Chen', email: 'sarah.chen@email.com', status: 'active', kyc: 'verified', balance: 8945.23, joined: '2024-02-20', lastActive: '15 min ago', trades: 189 },
  { id: 'USR003', name: 'Mike Johnson', email: 'mike.j@email.com', status: 'pending', kyc: 'pending', balance: 0, joined: '2024-06-01', lastActive: '1 hour ago', trades: 0 },
  { id: 'USR004', name: 'Emma Wilson', email: 'emma.w@email.com', status: 'suspended', kyc: 'rejected', balance: 2341.50, joined: '2024-03-10', lastActive: '3 days ago', trades: 56 },
  { id: 'USR005', name: 'David Brown', email: 'david.brown@email.com', status: 'active', kyc: 'verified', balance: 45678.90, joined: '2024-01-05', lastActive: '5 min ago', trades: 892 },
  { id: 'USR006', name: 'Lisa Anderson', email: 'lisa.a@email.com', status: 'active', kyc: 'verified', balance: 7823.12, joined: '2024-04-18', lastActive: '30 min ago', trades: 234 },
  { id: 'USR007', name: 'James Miller', email: 'james.m@email.com', status: 'active', kyc: 'pending', balance: 500.00, joined: '2024-06-02', lastActive: '2 hours ago', trades: 12 },
  { id: 'USR008', name: 'Robert Taylor', email: 'robert.t@email.com', status: 'suspended', kyc: 'rejected', balance: 0, joined: '2024-02-28', lastActive: '1 week ago', trades: 0 },
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesKyc = kycFilter === 'all' || user.kyc === kycFilter;
    return matchesSearch && matchesStatus && matchesKyc;
  });

  const handleUserAction = (user: User, action: string) => {
    alert(`${action} for ${user.name}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage platform users, permissions, and access</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition">
            Add User Manually
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-white text-2xl font-bold mt-1">12,847</p>
          <p className="text-green-400 text-sm mt-1">+234 this week</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-white text-2xl font-bold mt-1">8,932</p>
          <p className="text-green-400 text-sm mt-1">69.5%</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Suspended</p>
          <p className="text-white text-2xl font-bold mt-1">127</p>
          <p className="text-red-400 text-sm mt-1">-12 this week</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">KYC Verified</p>
          <p className="text-white text-2xl font-bold mt-1">7,234</p>
          <p className="text-green-400 text-sm mt-1">89.2%</p>
        </div>
        <div className="bg-[#1a1a2e] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending KYC</p>
          <p className="text-white text-2xl font-bold mt-1">127</p>
          <p className="text-yellow-400 text-sm mt-1">Needs review</p>
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
            placeholder="Search by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#FF6B6B]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All KYC</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#252542]">
            <tr>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">User</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">KYC</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Balance</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Trades</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Last Active</th>
              <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#252542]/50 transition cursor-pointer" onClick={() => { setSelectedUser(user); setShowUserModal(true); }}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#FF6B6B] font-semibold">{user.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    user.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.kyc === 'verified' ? 'bg-green-500/20 text-green-400' :
                    user.kyc === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {user.kyc}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-white font-medium">${user.balance.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-400">{user.trades}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-gray-400">{user.lastActive}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleUserAction(user, 'View')}
                      className="text-gray-400 hover:text-white p-1"
                      title="View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleUserAction(user, 'Suspend')}
                      className="text-gray-400 hover:text-red-400 p-1"
                      title="Suspend"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleUserAction(user, 'Email')}
                      className="text-gray-400 hover:text-blue-400 p-1"
                      title="Email"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleUserAction(user, 'Reset KYC')}
                      className="text-gray-400 hover:text-yellow-400 p-1"
                      title="Reset KYC"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#252542]">
          <p className="text-gray-400 text-sm">Showing 1-{filteredUsers.length} of {mockUsers.length} users</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">Previous</button>
            <button className="px-3 py-1 bg-[#FF6B6B] text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">2</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">3</button>
            <span className="text-gray-400">...</span>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">128</button>
            <button className="px-3 py-1 bg-[#1a1a2e] border border-gray-700 text-white rounded-lg text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowUserModal(false)}>
          <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B6B] text-xl font-bold">{selectedUser.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedUser.name}</h2>
                    <p className="text-gray-400">{selectedUser.email}</p>
                    <p className="text-gray-500 text-sm">ID: {selectedUser.id}</p>
                  </div>
                </div>
                <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#252542] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Balance</p>
                  <p className="text-white text-xl font-bold mt-1">${selectedUser.balance.toLocaleString()}</p>
                </div>
                <div className="bg-[#252542] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Total Trades</p>
                  <p className="text-white text-xl font-bold mt-1">{selectedUser.trades}</p>
                </div>
                <div className="bg-[#252542] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                    selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    selectedUser.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{selectedUser.status}</span>
                </div>
                <div className="bg-[#252542] rounded-xl p-4 text-center">
                  <p className="text-gray-400 text-sm">KYC</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
                    selectedUser.kyc === 'verified' ? 'bg-green-500/20 text-green-400' :
                    selectedUser.kyc === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{selectedUser.kyc}</span>
                </div>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Member Since</label>
                  <p className="text-white mt-1">{selectedUser.joined}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Last Active</label>
                  <p className="text-white mt-1">{selectedUser.lastActive}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="flex-1 bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  View Transactions
                </button>
                <button className="flex-1 bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  View Wallets
                </button>
                <button className="flex-1 bg-[#252542] text-white px-4 py-2 rounded-lg hover:bg-[#303050] transition">
                  Edit Profile
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Send Email
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                  Reset Password
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Suspend User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
