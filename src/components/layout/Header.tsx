import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

// Nav items with dropdown
const navItems = [
  {
    label: 'Platform',
    items: ['Trading Platforms', 'Products & Spreads', 'Trading Tools', 'Economic Calendar', 'Technology'],
    href: '/platforms'
  },
  {
    label: 'Trading',
    items: ['Trading Challenges', 'How it Works', 'Trading Rules', 'Rewards'],
    href: '/challenges'
  },
  {
    label: 'Company',
    items: ['About Us', 'Careers', 'Blog', 'Contact Us'],
    href: '/about'
  },
  {
    label: 'Resources',
    items: ['Help Center', 'Trading Guides', 'Market Analysis', 'Webinars'],
    href: '/tools'
  },
];

// Dropdown content for each nav item
const dropdownContent: Record<string, { title: string; items: string[] }[]> = {
  'Platform': [
    { title: 'Trading Platforms', items: ['MetaTrader 4', 'MetaTrader 5', 'cTrader', 'TradingView'] },
    { title: 'Trading Tools', items: ['Economic Calendar', 'Trading Signals', 'Market Analysis'] },
  ],
  'Trading': [
    { title: 'Challenges', items: ['Instant Funding', 'Evaluation', 'Elite Program'] },
    { title: 'Resources', items: ['Trading Rules', 'Profit Targets', 'Drawdown Limits'] },
  ],
  'Company': [
    { title: 'About', items: ['Our Story', 'Careers', 'Press'] },
    { title: 'Connect', items: ['Blog', 'Contact Us', 'Affiliate Program'] },
  ],
  'Resources': [
    { title: 'Learning', items: ['Trading Guides', 'Webinars', 'FAQ'] },
    { title: 'Tools', items: ['Market Analysis', 'Economic Calendar'] },
  ],
};

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isTransparent = transparent && !isScrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isTransparent ? 'transparent' : 'rgba(15, 21, 39, 0.95)',
        backdropFilter: isScrolled || !transparent ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid #263348' : 'none'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/funderpro-logo.png" alt="FunderPro" className="h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center space-x-1 px-4 py-6 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: isTransparent ? '#fff' : '#e2f8ff' }}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </Link>

                {/* Dropdown Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === item.label && dropdownContent[item.label] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div
                        className="rounded-2xl p-6 grid grid-cols-2 gap-6"
                        style={{ backgroundColor: '#1c273e', border: '1px solid #263348', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                      >
                        {dropdownContent[item.label].map((section, idx) => (
                          <div key={idx}>
                            <h4 className="text-sm font-semibold mb-3" style={{ color: '#7f8bab' }}>{section.title}</h4>
                            <ul className="space-y-2">
                              {section.items.map((link) => (
                                <li key={link}>
                                  <Link
                                    to="/"
                                    className="block py-2 text-sm transition-colors hover:opacity-80"
                                    style={{ color: '#e2f8ff' }}
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    {link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: isTransparent ? '#fff' : '#e2f8ff' }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: '#e42338' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: '#e2f8ff' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t"
            style={{ backgroundColor: '#131b32', borderColor: '#263348' }}
          >
            <div className="px-6 py-4">
              {/* Mobile Nav Items */}
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  <button
                    className="w-full flex items-center justify-between py-3 text-sm font-medium"
                    style={{ color: '#e2f8ff' }}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && dropdownContent[item.label] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 py-2 space-y-1"
                      >
                        {dropdownContent[item.label].map((section, idx) => (
                          <div key={idx} className="py-2">
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#7f8bab' }}>{section.title}</p>
                            {section.items.map((link) => (
                              <Link
                                key={link}
                                to="/"
                                className="block py-2 text-sm"
                                style={{ color: '#e2f8ff' }}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                {link}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 mt-4 space-y-3" style={{ borderTop: '1px solid #263348' }}>
                <Link
                  to="/login"
                  className="block w-full py-3 text-center text-sm font-medium rounded-lg"
                  style={{ backgroundColor: '#1c273e', color: '#e2f8ff' }}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full py-3 text-center text-sm font-semibold text-white rounded-lg"
                  style={{ backgroundColor: '#e42338' }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}