import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Shield,
  Bot,
  BarChart3,
  Users,
  Gift,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  MessageCircle,
  HelpCircle,
  Send,
} from 'lucide-react';
import { supabase, subscribeToChat, sendChatMessage, getChatMessages } from '@/lib/supabase';

const navigationItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/trading', icon: LineChart, label: 'Trading' },
  { path: '/markets', icon: LineChart, label: 'Markets' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/portfolio', icon: BarChart3, label: 'Portfolio' },
  { path: '/kyc', icon: Shield, label: 'Verification' },
  { path: '/ai-trading', icon: Bot, label: 'AI Trading' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/referrals', icon: Users, label: 'Referrals' },
  { path: '/rewards', icon: Gift, label: 'Rewards' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/support', icon: MessageCircle, label: 'Support' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  time: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string>('demo-user');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadChatHistory = async () => {
    try {
      const { data } = await getChatMessages(currentUserId, 50);
      if (data && data.length > 0) {
        const formattedMessages = data.map((msg: { id: string; content: string; sender_type: string; created_at: string }) => ({
          id: msg.id,
          text: msg.content,
          sender: msg.sender_type as 'user' | 'support',
          time: new Date(msg.created_at).toLocaleTimeString(),
        }));
        setChatMessages(formattedMessages);
      }
    } catch (error) {
      console.log('Using demo chat mode');
    }
  };

  // Subscribe to real-time chat messages
  useEffect(() => {
    const subscription = subscribeToChat(currentUserId, (newMessage: unknown) => {
      const msg = newMessage as { id: string; content: string; sender_type: string; created_at: string };
      setChatMessages(prev => [...prev, {
        id: msg.id,
        text: msg.content,
        sender: msg.sender_type as 'user' | 'support',
        time: new Date(msg.created_at).toLocaleTimeString(),
      }]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUserId]);

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        text: chatInput,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
      };
      setChatMessages(prev => [...prev, userMessage]);
      setChatInput('');
      setIsLoading(true);

      try {
        // Send message to Supabase
        await sendChatMessage(currentUserId, chatInput);

        // Simulate support response for demo mode
        setTimeout(() => {
          const supportResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: 'Thank you for contacting FunderPro support. A member of our team will assist you shortly. In the meantime, you can visit our Knowledge Base for common questions.',
            sender: 'support',
            time: new Date().toLocaleTimeString(),
          };
          setChatMessages(prev => [...prev, supportResponse]);
        }, 1500);
      } catch (error) {
        console.log('Demo mode - message not saved to database');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0f1527' }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: '#131b32', borderRight: '1px solid #263348' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo with real image */}
          <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #263348' }}>
            <div className="flex items-center space-x-3">
              <img src="/funderpro-logo.png" alt="FunderPro" className="h-10 w-auto" />
              <span className="text-xl font-semibold text-white">FunderPro</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1"
              style={{ color: '#7f8bab' }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? 'text-white' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 208, 132, 0.1)' : 'transparent',
                    color: isActive ? '#00d084' : '#e2f8ff'
                  }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4" style={{ borderTop: '1px solid #263348' }}>
            <NavLink
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors"
              style={{ backgroundColor: '#1c273e', color: '#e2f8ff' }}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e42338' }}>
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Demo User</p>
                <p className="text-xs" style={{ color: '#7f8bab' }}>demo@funderpro.com</p>
              </div>
            </NavLink>
            <button
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm transition-colors rounded-lg"
              style={{ color: '#e42338' }}
              onClick={() => window.location.href = '/'}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 backdrop-blur-lg" style={{ backgroundColor: 'rgba(15, 21, 39, 0.8)', borderBottom: '1px solid #263348' }}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2"
                style={{ color: '#7f8bab' }}
              >
                <Menu size={24} />
              </button>
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type="text"
                  placeholder="Search markets, trades..."
                  className="pl-10 pr-4 py-2 rounded-lg text-base w-64"
                  style={{
                    backgroundColor: '#131b32',
                    border: '1px solid #263348',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#1c273e', color: '#7f8bab' }}
                onClick={() => window.location.href = '/support'}
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline text-sm">Help</span>
              </button>

              <button className="relative p-2 transition-colors" style={{ color: '#7f8bab' }}>
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#e42338' }}></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-colors"
                  style={{ color: '#7f8bab' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#e42338' }}>
                    <User size={16} className="text-white" />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden" style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}>
                    <div className="p-3" style={{ borderBottom: '1px solid #263348' }}>
                      <p className="text-sm font-medium text-white">Demo User</p>
                      <p className="text-xs" style={{ color: '#7f8bab' }}>demo@funderpro.com</p>
                    </div>
                    <NavLink
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm transition-colors"
                      style={{ color: '#e2f8ff' }}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </NavLink>
                    <button
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm transition-colors"
                      style={{ color: '#e42338' }}
                      onClick={() => window.location.href = '/'}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Chat Support Widget - Intercom-like with real-time Supabase */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChat ? (
          <button
            onClick={() => setShowChat(true)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            style={{ backgroundColor: '#e42338' }}
          >
            <MessageCircle size={24} className="text-white" />
          </button>
        ) : (
          <div className="w-80 h-96 rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#131b32', border: '1px solid #263348' }}>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#1c273e', borderBottom: '1px solid #263348' }}>
              <div className="flex items-center space-x-3">
                <img src="/funderpro-logo.png" alt="FunderPro" className="h-6 w-auto" />
                <div>
                  <p className="text-sm font-semibold text-white">FunderPro Support</p>
                  <p className="text-xs flex items-center" style={{ color: '#00d084' }}>
                    <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: '#00d084' }}></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} style={{ color: '#7f8bab' }}>
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e42338' }}>
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="rounded-lg p-3 max-w-[80%]" style={{ backgroundColor: '#1c273e' }}>
                  <p className="text-sm text-white">Welcome to FunderPro Support! How can we help you today?</p>
                  <p className="text-xs mt-1" style={{ color: '#7f8bab' }}>Just now</p>
                </div>
              </div>

              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'space-x-2'}`}>
                  {msg.sender === 'support' && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#e42338' }}>
                      <MessageCircle size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className="rounded-lg p-3 max-w-[80%]"
                    style={{
                      backgroundColor: msg.sender === 'user' ? '#e42338' : '#1c273e',
                      color: '#ffffff'
                    }}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>{msg.time}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#00d084' }}>
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4" style={{ borderTop: '1px solid #263348' }}>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  className="flex-1 px-4 py-2 rounded-lg text-sm"
                  disabled={isLoading}
                  style={{
                    backgroundColor: '#0f1527',
                    border: '1px solid #263348',
                    color: '#ffffff'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !chatInput.trim()}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#e42338', color: '#ffffff' }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}