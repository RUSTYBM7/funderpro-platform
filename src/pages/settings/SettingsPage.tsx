import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@/components/ui';
import { User, Shield, Bell, CreditCard, Settings as SettingsIcon, Check, Eye, EyeOff } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trades: true,
    rewards: true,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your account preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-64">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-accent-green/10 text-accent-green'
                          : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-accent-purple rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">DU</span>
                    </div>
                    <Button variant="outline">Change Photo</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Demo" />
                    <Input label="Last Name" defaultValue="User" />
                    <Input label="Email" type="email" defaultValue="demo@funderpro.com" />
                    <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-bg-border">
                    <div>
                      <p className="font-medium text-text-primary">Two-Factor Authentication</p>
                      <p className="text-sm text-text-muted">Add an extra layer of security to your account</p>
                    </div>
                    <button
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        twoFactorEnabled ? 'bg-accent-green' : 'bg-bg-border'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="py-4 border-b border-bg-border">
                    <p className="font-medium text-text-primary mb-2">Change Password</p>
                    <div className="space-y-4">
                      <Input label="Current Password" type="password" placeholder="Enter current password" />
                      <Input label="New Password" type="password" placeholder="Enter new password" />
                      <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="py-4">
                    <p className="font-medium text-text-primary mb-4">Active Sessions</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">Chrome on MacOS</p>
                          <p className="text-sm text-text-muted">Last active: 2 hours ago</p>
                        </div>
                        <Badge variant="success">Current</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                        <div>
                          <p className="font-medium text-text-primary">Safari on iPhone</p>
                          <p className="text-sm text-text-muted">Last active: 3 days ago</p>
                        </div>
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                      { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications' },
                      { key: 'sms', label: 'SMS Notifications', desc: 'Receive text messages' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-bg-border">
                        <div>
                          <p className="font-medium text-text-primary">{item.label}</p>
                          <p className="text-sm text-text-muted">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-accent-green' : 'bg-bg-border'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="font-medium text-text-primary mb-4">Alert Types</p>
                    <div className="space-y-4">
                      {[
                        { key: 'trades', label: 'Trade Alerts', desc: 'Get notified about your trades' },
                        { key: 'rewards', label: 'Reward Updates', desc: 'Get notified about earned rewards' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-bg-border">
                          <div>
                            <p className="font-medium text-text-primary">{item.label}</p>
                            <p className="text-sm text-text-muted">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-accent-green' : 'bg-bg-border'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'payment' && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Payment Methods</CardTitle>
                    <Button variant="primary" size="sm">Add New</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-accent-blue rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">•••• •••• •••• 4242</p>
                          <p className="text-sm text-text-muted">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="success">Default</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-accent-green rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">MC</span>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">•••• •••• •••• 8888</p>
                          <p className="text-sm text-text-muted">Expires 08/26</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Set Default</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="py-4 border-b border-bg-border">
                    <p className="font-medium text-text-primary mb-4">Language & Region</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Language</label>
                        <select className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>Italian</option>
                          <option>Arabic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Timezone</label>
                        <select className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary">
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+0 (London)</option>
                          <option>UTC+1 (Paris)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 border-b border-bg-border">
                    <p className="font-medium text-text-primary mb-4">Display</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Theme</label>
                        <select className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary">
                          <option>Dark</option>
                          <option>Light</option>
                          <option>System</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Currency</label>
                        <select className="w-full bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary">
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}