import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input } from '@/components/ui';
import { Users, Gift, Copy, Check, ChevronRight, TrendingUp, Award } from 'lucide-react';

const referralTiers = [
  { tier: 1, name: 'Bronze', referrals: 0, required: 5, reward: '5%' },
  { tier: 2, name: 'Silver', referrals: 2, required: 15, reward: '7%' },
  { tier: 3, name: 'Gold', referrals: 8, required: 30, reward: '10%' },
  { tier: 4, name: 'Platinum', referrals: 8, required: 50, reward: '12%' },
];

const recentReferrals = [
  { name: 'John D.', date: '2024-03-15', status: 'Active', reward: '$125' },
  { name: 'Sarah M.', date: '2024-03-14', status: 'Active', reward: '$89' },
  { name: 'Mike R.', date: '2024-03-12', status: 'Pending', reward: '-' },
  { name: 'Emma L.', date: '2024-03-10', status: 'Active', reward: '$210' },
];

const leaderboard = [
  { rank: 1, name: 'Alex T.', referrals: 47, earnings: '$12,450' },
  { rank: 2, name: 'Maria S.', referrals: 38, earnings: '$9,800' },
  { rank: 3, name: 'Chris P.', referrals: 32, earnings: '$8,200' },
  { rank: 4, name: 'You', referrals: 8, earnings: '$1,850', isYou: true },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://funderpro.com/ref/demo123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Referrals</h1>
          <p className="text-text-secondary mt-1">Invite friends and earn rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-accent-green" />
              </div>
              <p className="text-text-muted text-sm mb-1">Total Referrals</p>
              <p className="text-2xl font-bold text-text-primary">8</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-5 h-5 text-accent-blue" />
              </div>
              <p className="text-text-muted text-sm mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-text-primary">$1,850</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-accent-purple" />
              </div>
              <p className="text-text-muted text-sm mb-1">Active Referrals</p>
              <p className="text-2xl font-bold text-text-primary">6</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-accent-orange" />
              </div>
              <p className="text-text-muted text-sm mb-1">Current Tier</p>
              <p className="text-2xl font-bold text-text-primary">Silver</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Input
                value="https://funderpro.com/ref/demo123"
                readOnly
                className="flex-1"
              />
              <Button
                variant={copied ? 'primary' : 'secondary'}
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                onClick={copyReferralLink}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-text-muted text-sm mt-4">
              Share this link with friends. When they sign up and pass a challenge, you earn reward.
            </p>
          </CardContent>
        </Card>

        {/* Tier Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Tier Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {referralTiers.map((tier) => {
                const progress = (tier.referrals / tier.required) * 100;
                const isActive = tier.referrals >= tier.required;
                return (
                  <div
                    key={tier.tier}
                    className={`p-4 rounded-lg border ${
                      isActive ? 'border-accent-green bg-accent-green/5' : 'border-bg-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-text-muted text-sm">Tier {tier.tier}</span>
                        <span className="font-semibold text-text-primary">{tier.name}</span>
                      </div>
                      <span className="text-accent-green font-semibold">{tier.reward} reward</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-bg-border rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${isActive ? 'bg-accent-green' : 'bg-accent-blue'}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <span className="text-text-muted text-sm">
                        {tier.referrals} / {tier.required}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Referrals */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-bg-border last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent-green/10 rounded-full flex items-center justify-center">
                        <span className="text-accent-green font-semibold">{referral.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{referral.name}</p>
                        <p className="text-sm text-text-muted">{referral.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={referral.status === 'Active' ? 'success' : 'warning'}>
                        {referral.status}
                      </Badge>
                      <p className="text-sm text-text-muted mt-1">{referral.reward}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-3 border-b border-bg-border last:border-0 ${
                      user.isYou ? 'bg-accent-green/5 -mx-4 px-4 rounded-lg' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        index === 0 ? 'bg-accent-yellow text-black' :
                        index === 1 ? 'bg-text-muted text-white' :
                        index === 2 ? 'bg-accent-orange text-white' :
                        'bg-bg-tertiary text-text-secondary'
                      }`}>
                        #{user.rank}
                      </span>
                      <span className="font-medium text-text-primary">{user.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-text-muted text-sm">{user.referrals} refs</p>
                      <p className="font-semibold text-text-primary">{user.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}