import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { Bell, Check, Clock, AlertCircle, TrendingUp, Gift } from 'lucide-react';

const notifications = [
  { id: 1, type: 'trade', title: 'Trade Executed', message: 'EUR/USD long position opened at 1.0925', time: '2 min ago', read: false },
  { id: 2, type: 'reward', title: 'Reward Earned', message: 'You earned $50 from First Trade Bonus', time: '1 hour ago', read: false },
  { id: 3, type: 'system', title: 'Account Verified', message: 'Your KYC verification is complete', time: '3 hours ago', read: true },
  { id: 4, type: 'trade', title: 'Position Closed', message: 'XAU/USD short position closed with +$250 profit', time: '5 hours ago', read: true },
  { id: 5, type: 'alert', title: 'Risk Alert', message: 'Account approaching daily loss limit', time: '1 day ago', read: true },
];

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Notifications</h1>
            <p className="text-text-secondary mt-1">Stay updated with your account activity</p>
          </div>
          <button className="text-accent-green hover:text-accent-green-hover text-sm font-medium">
            Mark all as read
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-bg-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-bg-tertiary transition-colors ${!notification.read ? 'bg-accent-green/5' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'trade' ? 'bg-accent-blue/10' :
                      notification.type === 'reward' ? 'bg-accent-green/10' :
                      notification.type === 'system' ? 'bg-accent-purple/10' : 'bg-accent-yellow/10'
                    }`}>
                      {notification.type === 'trade' && <TrendingUp className="w-5 h-5 text-accent-blue" />}
                      {notification.type === 'reward' && <Gift className="w-5 h-5 text-accent-green" />}
                      {notification.type === 'system' && <Check className="w-5 h-5 text-accent-purple" />}
                      {notification.type === 'alert' && <AlertCircle className="w-5 h-5 text-accent-yellow" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-text-primary">{notification.title}</p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-accent-green rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mt-1">{notification.message}</p>
                      <p className="text-xs text-text-muted mt-2 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}