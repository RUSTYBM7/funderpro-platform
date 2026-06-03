import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, TrendingUp, Shield, Zap, Users, Award, Globe, Star, Play, ArrowRight, Check } from 'lucide-react';

// Nav items with dropdown
const navItems = [
  { label: 'Platform', items: ['Trading Platforms', 'Products & Spreads', 'Trading Tools', 'Economic Calendar', 'Technology'] },
  { label: 'Trading', items: ['Trading Challenges', 'How it Works', 'Trading Rules', 'Rewards'] },
  { label: 'Company', items: ['About Us', 'Careers', 'Blog', 'Contact Us'] },
  { label: 'Resources', items: ['Help Center', 'Trading Guides', 'Market Analysis', 'Webinars'] },
];

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1527' }}>
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(15, 21, 39, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid #263348' : 'none'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="#e42338"/>
                <path d="M24 8L40 24L24 40L8 24L24 8Z" fill="#0f1527"/>
                <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="Gellix, sans-serif">F</text>
              </svg>
              <span className="text-xl font-semibold" style={{ color: '#fff' }}>FunderPro</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className="flex items-center space-x-1 text-sm font-medium py-6 transition-colors hover:opacity-80"
                    style={{ color: '#e2f8ff' }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: activeDropdown === item.label ? 1 : 0, y: activeDropdown === item.label ? 0 : 10 }}
                    className="absolute top-full left-0 pt-4 min-w-[200px]"
                    style={{ display: activeDropdown === item.label ? 'block' : 'none' }}
                  >
                    <div
                      className="rounded-2xl p-4"
                      style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}
                    >
                      {item.items.map((link) => (
                        <a
                          key={link}
                          href="#"
                          className="block py-2.5 text-sm transition-colors hover:opacity-80"
                          style={{ color: '#7f8bab' }}
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: '#e2f8ff' }}
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
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" style={{ color: '#e2f8ff' }} /> : <Menu className="w-6 h-6" style={{ color: '#e2f8ff' }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden border-t"
            style={{ backgroundColor: '#131b32', borderColor: '#263348' }}
          >
            <div className="px-6 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  <button
                    className="w-full flex items-center justify-between py-2 text-sm font-medium"
                    style={{ color: '#e2f8ff' }}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="pl-4 py-2 space-y-2">
                      {item.items.map((link) => (
                        <a key={link} href="#" className="block py-1 text-sm" style={{ color: '#7f8bab' }}>{link}</a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                <Link to="/login" className="w-full py-2.5 text-center text-sm font-medium" style={{ color: '#e2f8ff' }}>Sign In</Link>
                <Link to="/signup" className="w-full py-2.5 text-center text-sm font-semibold text-white rounded-lg" style={{ backgroundColor: '#e42338' }}>Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-[72px]" style={{
        background: 'radial-gradient(ellipse at top, rgba(228, 35, 56, 0.08) 0%, transparent 50%), #0f1527'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(228, 35, 56, 0.1) 0%, transparent 70%)' }}
          />
          <motion.div
            animate={{ y: [20, -20, 20], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(1, 167, 225, 0.08) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)', border: '1px solid rgba(0, 208, 132, 0.2)' }}
          >
            <span className="w-2 h-2 rounded-full mr-2 animate-pulse" style={{ backgroundColor: '#00d084' }}></span>
            <span className="text-sm font-medium" style={{ color: '#00d084' }}>Instant Funding Decisions</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ color: '#fff' }}
          >
            Become a Funded Trader{' '}
            <span className="relative inline-block">
              <span style={{ color: '#e42338' }}>Today</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C50 2 150 2 198 10" stroke="#e42338" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
            style={{ color: '#e2f8ff' }}
          >
            Get funded up to <span className="font-bold" style={{ color: '#00d084' }}>$200,000</span> with our industry-leading funding program. Keep up to <span className="font-bold" style={{ color: '#00d084' }}>90%</span> of your profits.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/signup"
              className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:scale-105 flex items-center"
              style={{ backgroundColor: '#e42338' }}
            >
              Start Your Challenge
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="px-8 py-4 rounded-xl text-lg font-medium transition-all flex items-center border-2 hover:bg-white/5" style={{ borderColor: '#263348', color: '#e2f8ff' }}>
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '$125M+', label: 'Funded Traders' },
              { value: '5,000+', label: 'Active Traders' },
              { value: '50+', label: 'Countries' },
              { value: '90%', label: 'Profit Split' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1" style={{ color: '#00d084' }}>{stat.value}</p>
                <p className="text-sm" style={{ color: '#7f8bab' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: '#263348' }}>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#7f8bab' }}
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-24" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fff' }}>How It Works</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#e2f8ff' }}>
              Start trading, prove your skills, and get funded in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose Your Challenge', desc: 'Select from our range of funded accounts starting from $5,000 up to $200,000', icon: TrendingUp },
              { step: '02', title: 'Pass the Challenge', desc: 'Meet profit targets and trading rules to prove your consistency and discipline', icon: Shield },
              { step: '03', title: 'Get Funded', desc: 'Receive a funded account with up to 90% profit split and weekly payouts', icon: Zap },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-3xl"
                style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}
              >
                <span className="text-6xl font-bold absolute -top-4 -right-4 opacity-10" style={{ color: '#e42338' }}>{item.step}</span>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(228, 35, 56, 0.1)' }}>
                  <item.icon className="w-8 h-8" style={{ color: '#e42338' }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#fff' }}>{item.title}</h3>
                <p style={{ color: '#7f8bab' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Platforms Section */}
      <section className="py-24" style={{ backgroundColor: '#0f1527' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider mb-4 block" style={{ color: '#e42338' }}>Trading Platforms</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#fff' }}>Trade on Your Preferred Platform</h2>
              <p className="text-xl mb-8" style={{ color: '#e2f8ff' }}>
                Access powerful trading platforms with institutional-grade execution and competitive spreads.
              </p>
              <div className="space-y-4 mb-8">
                {['MetaTrader 4 & 5', 'cTrader', 'TradingView', 'Proprietary Platform'].map((platform, i) => (
                  <div key={i} className="flex items-center">
                    <Check className="w-5 h-5 mr-3" style={{ color: '#00d084' }} />
                    <span className="text-lg" style={{ color: '#e2f8ff' }}>{platform}</span>
                  </div>
                ))}
              </div>
              <Link to="#" className="inline-flex items-center font-semibold transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                View All Platforms<ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #131b32 0%, #1c273e 100%)', border: '1px solid #263348' }}>
                <div className="aspect-video rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#0f1527' }}>
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(228, 35, 56, 0.2)' }}>
                      <Play className="w-10 h-10 ml-1" style={{ color: '#e42338' }} />
                    </div>
                    <p className="text-sm" style={{ color: '#7f8bab' }}>Platform Demo Video</p>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 px-4 py-2 rounded-full" style={{ backgroundColor: '#1c273e', border: '1px solid #00d084' }}>
                <span className="text-sm font-semibold" style={{ color: '#00d084' }}>Low Latency</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Plans Section */}
      <section className="py-24" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider mb-4 block" style={{ color: '#e42338' }}>Funding Programs</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fff' }}>Choose Your Path to Funding</h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#e2f8ff' }}>
              Multiple funding programs to match your trading style and goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Instant Funding', price: '$5K - $50K', features: ['Instant funding approval', 'Up to 90% profit split', 'Weekly payouts', 'No time limits'], popular: true },
              { name: 'Evaluation', price: '$10K - $200K', features: ['Two-phase evaluation', 'Up to 90% profit split', 'Weekly payouts', 'Management fee option'], popular: false },
              { name: 'Elite Program', price: 'Up to $300K', features: ['Fast-track funding', 'Up to 90% profit split', 'Priority support', 'Exclusive benefits'], popular: false },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl p-8"
                style={{ backgroundColor: '#1c273e', border: plan.popular ? '2px solid #00d084' : '1px solid #263348' }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full" style={{ backgroundColor: '#00d084' }}>
                    <span className="text-sm font-semibold text-white">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#fff' }}>{plan.name}</h3>
                <p className="text-3xl font-bold mb-6" style={{ color: '#e42338' }}>{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center">
                      <Check className="w-5 h-5 mr-3" style={{ color: '#00d084' }} />
                      <span style={{ color: '#e2f8ff' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="block w-full text-center py-4 rounded-xl font-semibold transition-all"
                  style={{
                    backgroundColor: plan.popular ? '#00d084' : 'transparent',
                    color: plan.popular ? '#0f1527' : '#e2f8ff',
                    border: plan.popular ? 'none' : '1px solid #263348'
                  }}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24" style={{ backgroundColor: '#0f1527' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="rounded-3xl p-12" style={{ background: 'linear-gradient(135deg, #1c273e 0%, #131b32 100%)', border: '1px solid #263348' }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { value: '$125M+', label: 'Total Payouts', icon: TrendingUp },
                { value: '5,000+', label: 'Active Traders', icon: Users },
                { value: '50+', label: 'Countries', icon: Globe },
                { value: '4.9/5', label: 'Trust Rating', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(228, 35, 56, 0.1)' }}>
                    <stat.icon className="w-8 h-8" style={{ color: '#e42338' }} />
                  </div>
                  <p className="text-4xl font-bold mb-2" style={{ color: '#00d084' }}>{stat.value}</p>
                  <p className="text-sm" style={{ color: '#7f8bab' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#fff' }}>What Traders Say</h2>
            <p className="text-xl" style={{ color: '#e2f8ff' }}>Join thousands of successful funded traders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Michael Chen', role: 'Professional Trader', text: 'FunderPro has been game-changing for my trading career. The funding process is seamless and payouts are always on time.', avatar: 'MC' },
              { name: 'Sarah Johnson', role: 'Day Trader', text: 'The best prop trading firm I have worked with. Professional support and excellent trading conditions.', avatar: 'SJ' },
              { name: 'David Williams', role: 'Swing Trader', text: 'Got funded within weeks of passing my challenge. The 90% profit split is unmatched in the industry.', avatar: 'DW' },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl"
                style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-current" style={{ color: '#f97316' }} />
                  ))}
                </div>
                <p className="text-lg mb-6" style={{ color: '#e2f8ff' }}>"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold mr-4" style={{ backgroundColor: '#e42338', color: '#fff' }}>{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold" style={{ color: '#fff' }}>{testimonial.name}</p>
                    <p className="text-sm" style={{ color: '#7f8bab' }}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: '#0f1527' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e42338 0%, #b8182c 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10">
              <svg viewBox="0 0 200 200" fill="white"><polygon points="100,0 200,100 100,200 0,100"/></svg>
            </div>
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10">
              <svg viewBox="0 0 100 100" fill="white"><polygon points="50,0 100,50 50,100 0,50"/></svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#fff' }}>Ready to Become a Funded Trader?</h2>
              <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90">
                Start your journey today and get funded up to $200,000 with industry-leading profit splits
              </p>
              <Link to="/signup" className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105" style={{ backgroundColor: '#fff', color: '#e42338' }}>
                Start Your Challenge<ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0a0f1a' }}>
        <div className="max-w-[1440px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
                  <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="#e42338"/>
                  <path d="M24 8L40 24L24 40L8 24L24 8Z" fill="#0f1527"/>
                  <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="600" fontFamily="Gellix, sans-serif">F</text>
                </svg>
                <span className="text-xl font-semibold" style={{ color: '#fff' }}>FunderPro</span>
              </div>
              <p className="text-sm" style={{ color: '#7f8bab' }}>Industry-leading prop trading firm providing funded accounts to talented traders worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#fff' }}>Platform</h4>
              <ul className="space-y-3">
                {['Trading Platforms', 'Products & Spreads', 'Trading Tools', 'Economic Calendar'].map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#fff' }}>Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Contact Us'].map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#fff' }}>Legal</h4>
              <ul className="space-y-3">
                {['Terms & Conditions', 'Privacy Notice', 'Cookies Policy', 'Risk Disclaimer'].map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#fff' }}>Trading</h4>
              <ul className="space-y-3">
                {['Trading Challenges', 'How It Works', 'Trading Rules', 'Rewards'].map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid #263348' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm" style={{ color: '#7f8bab' }}>© 2025 FunderPro. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>Facebook</a>
                <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>Twitter</a>
                <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>LinkedIn</a>
                <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#7f8bab' }}>Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}