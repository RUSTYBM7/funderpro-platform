import { useState } from 'react';

interface KYCApplication {
  id: string;
  name: string;
  email: string;
  type: 'individual' | 'business';
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submittedAt: string;
  documents: Document[];
  riskScore: number;
  country: string;
  phone: string;
  dob?: string;
  companyName?: string;
  companyReg?: string;
}

interface Document {
  type: string;
  name: string;
  uploadedAt: string;
  verified: boolean;
}

const mockKYCApplications: KYCApplication[] = [
  {
    id: 'KYC001',
    name: 'James Miller',
    email: 'james.miller@email.com',
    type: 'individual',
    status: 'pending',
    submittedAt: '2024-06-04 10:30:00',
    documents: [
      { type: 'passport', name: 'passport_james.pdf', uploadedAt: '2024-06-04', verified: false },
      { type: 'proof_of_address', name: 'utility_bill.pdf', uploadedAt: '2024-06-04', verified: false },
      { type: 'selfie', name: 'selfie_james.jpg', uploadedAt: '2024-06-04', verified: false },
    ],
    riskScore: 15,
    country: 'United States',
    phone: '+1 555-0123',
    dob: '1990-05-15',
  },
  {
    id: 'KYC002',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    type: 'business',
    status: 'under_review',
    submittedAt: '2024-06-03 15:45:00',
    documents: [
      { type: 'business_registration', name: 'company_cert.pdf', uploadedAt: '2024-06-03', verified: true },
      { type: 'articles_of_incorporation', name: 'articles.pdf', uploadedAt: '2024-06-03', verified: true },
      { type: 'director_id', name: 'director_passport.pdf', uploadedAt: '2024-06-03', verified: false },
      { type: 'proof_of_address', name: 'office_bill.pdf', uploadedAt: '2024-06-03', verified: false },
      { type: 'tax_certificate', name: 'tax_cert.pdf', uploadedAt: '2024-06-03', verified: false },
    ],
    riskScore: 35,
    country: 'United Kingdom',
    phone: '+44 20-1234-5678',
    companyName: 'Anderson Trading Ltd',
    companyReg: 'UK12345678',
  },
  {
    id: 'KYC003',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    type: 'individual',
    status: 'pending',
    submittedAt: '2024-06-04 08:15:00',
    documents: [
      { type: 'drivers_license', name: 'license_robert.pdf', uploadedAt: '2024-06-04', verified: false },
      { type: 'proof_of_address', name: 'bank_statement.pdf', uploadedAt: '2024-06-04', verified: false },
    ],
    riskScore: 25,
    country: 'Canada',
    phone: '+1 555-0456',
    dob: '1985-11-22',
  },
  {
    id: 'KYC004',
    name: 'TechVenture Inc',
    email: 'compliance@techventure.io',
    type: 'business',
    status: 'approved',
    submittedAt: '2024-06-01 09:00:00',
    documents: [
      { type: 'business_registration', name: 'incorporation.pdf', uploadedAt: '2024-06-01', verified: true },
      { type: 'director_id', name: 'ceo_id.pdf', uploadedAt: '2024-06-01', verified: true },
      { type: 'proof_of_address', name: 'office_proof.pdf', uploadedAt: '2024-06-01', verified: true },
    ],
    riskScore: 10,
    country: 'Singapore',
    phone: '+65 6789-0123',
    companyName: 'TechVenture Inc',
    companyReg: 'SG202012345',
  },
  {
    id: 'KYC005',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    type: 'individual',
    status: 'rejected',
    submittedAt: '2024-05-28 14:20:00',
    documents: [
      { type: 'passport', name: 'passport_maria.pdf', uploadedAt: '2024-05-28', verified: false },
      { type: 'proof_of_address', name: 'utility.pdf', uploadedAt: '2024-05-28', verified: false },
    ],
    riskScore: 85,
    country: 'Spain',
    phone: '+34 612-345-678',
    dob: '1992-03-10',
  },
];

export default function KYCManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<KYCApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const filteredApps = mockKYCApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'under_review': return 'bg-blue-500/20 text-blue-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRiskLevel = (score: number) => {
    if (score <= 25) return { label: 'Low', color: 'text-green-400 bg-green-500/20' };
    if (score <= 50) return { label: 'Medium', color: 'text-yellow-400 bg-yellow-500/20' };
    if (score <= 75) return { label: 'High', color: 'text-orange-400 bg-orange-500/20' };
    return { label: 'Critical', color: 'text-red-400 bg-red-500/20' };
  };

  const handleApprove = () => {
    alert('KYC Application Approved');
    setSelectedApp(null);
  };

  const handleReject = () => {
    if (!reviewNotes) {
      alert('Please provide rejection reason');
      return;
    }
    alert('KYC Application Rejected');
    setSelectedApp(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">KYC Management</h1>
          <p className="text-gray-400 mt-1">Identity verification and compliance management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Report
          </button>
          <button className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition">
            Auto-Review Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Applications</p>
          <p className="text-white text-2xl font-bold mt-1">1,247</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Pending Review</p>
          <p className="text-yellow-400 text-2xl font-bold mt-1">127</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Under Review</p>
          <p className="text-blue-400 text-2xl font-bold mt-1">34</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Approved (Month)</p>
          <p className="text-green-400 text-2xl font-bold mt-1">892</p>
        </div>
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#252542] border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Rejected (Month)</p>
          <p className="text-red-400 text-2xl font-bold mt-1">45</p>
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
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-[#1a1a2e] border border-gray-700 text-white px-4 py-2 rounded-lg"
        >
          <option value="all">All Types</option>
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.map((app) => {
          const risk = getRiskLevel(app.riskScore);
          return (
            <div
              key={app.id}
              className="bg-[#1a1a2e] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B6B] text-xl font-bold">
                      {app.name.split(' ').map(n => n[0]).slice(0, app.type === 'business' ? 2 : 2).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold text-lg">{app.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status.replace('_', ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${risk.color}`}>
                        {risk.label} Risk
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{app.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="text-gray-500">{app.type === 'business' ? 'Business' : 'Individual'}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{app.country}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{app.documents.length} documents</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Submitted</p>
                  <p className="text-white mt-1">{app.submittedAt}</p>
                  <p className="text-[#FF6B6B] text-sm mt-2 font-medium">{app.id}</p>
                </div>
              </div>

              {/* Quick Actions */}
              {app.status === 'pending' && (
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-800" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => { setSelectedApp(app); setReviewNotes(''); }}
                    className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition text-sm"
                  >
                    Start Review
                  </button>
                  <button
                    onClick={() => { setSelectedApp(app); handleApprove(); }}
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition text-sm"
                  >
                    Quick Approve
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* KYC Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedApp(null)}>
          <div className="bg-[#1a1a2e] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#1a1a2e] p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center">
                    <span className="text-[#FF6B6B] font-bold">
                      {selectedApp.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedApp.name}</h2>
                    <p className="text-gray-400">{selectedApp.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedApp.status)}`}>
                    {selectedApp.status.replace('_', ' ')}
                  </span>
                  <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Left Column - Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Personal Information</h3>
                  <div className="bg-[#252542] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type</span>
                      <span className="text-white capitalize">{selectedApp.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Country</span>
                      <span className="text-white">{selectedApp.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phone</span>
                      <span className="text-white">{selectedApp.phone}</span>
                    </div>
                    {selectedApp.dob && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date of Birth</span>
                        <span className="text-white">{selectedApp.dob}</span>
                      </div>
                    )}
                    {selectedApp.companyName && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Company</span>
                        <span className="text-white">{selectedApp.companyName}</span>
                      </div>
                    )}
                    {selectedApp.companyReg && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reg Number</span>
                        <span className="text-white">{selectedApp.companyReg}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Score</span>
                      <span className={`font-medium ${getRiskLevel(selectedApp.riskScore).color}`}>
                        {selectedApp.riskScore}/100 ({getRiskLevel(selectedApp.riskScore).label})
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Submitted Documents</h3>
                  <div className="space-y-2">
                    {selectedApp.documents.map((doc, i) => (
                      <div key={i} className="bg-[#252542] rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#FF6B6B]/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#FF6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white text-sm capitalize">{doc.type.replace('_', ' ')}</p>
                            <p className="text-gray-500 text-xs">{doc.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${doc.verified ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {doc.verified ? 'Verified' : 'Pending'}
                          </span>
                          <button className="text-gray-400 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Review */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3">Verification Checks</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Document Authenticity', status: 'pass' },
                      { name: 'Address Verification', status: 'pass' },
                      { name: 'Sanctions Screening', status: 'pass' },
                      { name: 'PEP Check', status: 'review' },
                      { name: 'Adverse Media', status: 'pass' },
                    ].map((check, i) => (
                      <div key={i} className="flex items-center justify-between bg-[#252542] rounded-xl p-3">
                        <span className="text-white text-sm">{check.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          check.status === 'pass' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {check.status === 'pass' ? 'Pass' : 'Review'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3">Review Notes</h3>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add review notes or rejection reason..."
                    className="w-full h-32 bg-[#252542] border border-gray-700 text-white p-3 rounded-xl resize-none focus:outline-none focus:border-[#FF6B6B]"
                  />
                </div>

                {selectedApp.status !== 'approved' && selectedApp.status !== 'rejected' && (
                  <div className="space-y-3">
                    <button
                      onClick={handleApprove}
                      className="w-full bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition font-medium"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={handleReject}
                      className="w-full bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition font-medium"
                    >
                      Reject Application
                    </button>
                    <button
                      onClick={() => alert('Put on hold')}
                      className="w-full bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition font-medium"
                    >
                      Request More Info
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
