import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui';
import { MessageCircle, Mail, Phone, HelpCircle, Send, ChevronRight } from 'lucide-react';

const faqs = [
  { question: 'How do I pass the challenge?', answer: 'To pass the challenge, you need to meet the profit target while staying within the drawdown limits.' },
  { question: 'When can I withdraw my profits?', answer: 'You can withdraw profits weekly after reaching the minimum profit threshold.' },
  { question: 'What trading platforms are supported?', answer: 'We support MetaTrader 5 and TradingView for all trading activities.' },
];

export default function SupportPage() {
  const [message, setMessage] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Support</h1>
          <p className="text-text-secondary mt-1">We're here to help you succeed</p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:border-accent-green/30 transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-accent-green" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Live Chat</h3>
              <p className="text-sm text-text-muted">Available 24/7</p>
            </CardContent>
          </Card>

          <Card className="hover:border-accent-blue/30 transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-accent-blue" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Email Support</h3>
              <p className="text-sm text-text-muted">support@funderpro.com</p>
            </CardContent>
          </Card>

          <Card className="hover:border-accent-purple/30 transition-all cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent-purple/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="font-semibold text-text-primary mb-2">Phone Support</h3>
              <p className="text-sm text-text-muted">VIP traders only</p>
            </CardContent>
          </Card>
        </div>

        {/* Send Message */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Subject" placeholder="How can we help?" />
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue or question..."
                className="w-full h-32 bg-bg-secondary border border-bg-border rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green resize-none"
              />
            </div>
            <Button icon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-accent-green" />
              <CardTitle>Frequently Asked Questions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-text-primary">{faq.question}</p>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Helpful Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
                <p className="font-medium text-text-primary mb-1">Trading Rules Guide</p>
                <p className="text-sm text-text-muted">Understanding drawdown and profit targets</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
                <p className="font-medium text-text-primary mb-1">Platform Tutorials</p>
                <p className="text-sm text-text-muted">Learn how to use MetaTrader 5</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
                <p className="font-medium text-text-primary mb-1">Payout Process</p>
                <p className="text-sm text-text-muted">How to withdraw your profits</p>
              </div>
              <div className="p-4 bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer">
                <p className="font-medium text-text-primary mb-1">Challenge FAQ</p>
                <p className="text-sm text-text-muted">Common questions about challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}