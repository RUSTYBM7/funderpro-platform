import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { Gift, TrendingUp, Star, Zap, Award, Clock } from 'lucide-react';

const rewards = [
  { name: 'First Trade Bonus', status: 'completed', amount: '$50', date: '2024-03-15' },
  { name: 'Weekly Profit Reward', status: 'completed', amount: '$120', date: '2024-03-14' },
  { name: 'Streak Bonus (5 trades)', status: 'completed', amount: '$75', date: '2024-03-12' },
  { name: 'Referral Reward', status: 'pending', amount: '$150', date: '2024-03-10' },
  { name: 'Monthly Challenge Bonus', status: 'available', amount: '$200', date: '-' },
];

const achievementBadges = [
  { name: 'First Profit', icon: Star, earned: true },
  { name: '10 Trades', icon: TrendingUp, earned: true },
  { name: '100 Trades', icon: Zap, earned: false },
  { name: 'Elite Trader', icon: Award, earned: false },
];

export default function RewardsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Rewards</h1>
          <p className="text-text-secondary mt-1">Track your earned rewards and achievements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center mb-4">
                <Gift className="w-5 h-5 text-accent-green" />
              </div>
              <p className="text-text-muted text-sm mb-1">Total Earned</p>
              <p className="text-2xl font-bold text-text-primary">$595</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-accent-blue" />
              </div>
              <p className="text-text-muted text-sm mb-1">Pending Rewards</p>
              <p className="text-2xl font-bold text-text-primary">$350</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-5 h-5 text-accent-purple" />
              </div>
              <p className="text-text-muted text-sm mb-1">Achievements</p>
              <p className="text-2xl font-bold text-text-primary">2/4</p>
            </CardContent>
          </Card>
        </div>

        {/* Rewards History */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-bg-border last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      reward.status === 'completed' ? 'bg-accent-green/10' :
                      reward.status === 'pending' ? 'bg-accent-yellow/10' : 'bg-accent-blue/10'
                    }`}>
                      <Gift className={`w-5 h-5 ${
                        reward.status === 'completed' ? 'text-accent-green' :
                        reward.status === 'pending' ? 'text-accent-yellow' : 'text-accent-blue'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{reward.name}</p>
                      <p className="text-sm text-text-muted flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {reward.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent-green">{reward.amount}</p>
                    <Badge variant={
                      reward.status === 'completed' ? 'success' :
                      reward.status === 'pending' ? 'warning' : 'info'
                    }>
                      {reward.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievementBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border text-center ${
                    badge.earned
                      ? 'border-accent-green bg-accent-green/5'
                      : 'border-bg-border opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    badge.earned ? 'bg-accent-green/10' : 'bg-bg-tertiary'
                  }`}>
                    <badge.icon className={`w-8 h-8 ${badge.earned ? 'text-accent-green' : 'text-text-muted'}`} />
                  </div>
                  <p className={`font-medium ${badge.earned ? 'text-text-primary' : 'text-text-muted'}`}>
                    {badge.name}
                  </p>
                  {badge.earned && (
                    <Badge variant="success" className="mt-2">Earned</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}