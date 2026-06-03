import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f1527' }}>
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center mb-8 transition-colors hover:opacity-80"
            style={{ color: '#7f8bab' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm">Back to home</span>
          </Link>

          <div className="flex items-center space-x-3 mb-8">
            {/* FunderPro Real Logo */}
            <img src="/funderpro-logo.png" alt="FunderPro" className="h-12 w-auto" />
          </div>

          <h1 className="text-4xl font-semibold text-white mb-2">Welcome back</h1>
          <p className="mb-8 text-base" style={{ color: '#e2f8ff' }}>
            Sign in to access your funded trading account
          </p>

          {error && (
            <div className="flex items-center p-4 mb-6 rounded-lg" style={{
              backgroundColor: 'rgba(228, 35, 56, 0.1)',
              border: '1px solid rgba(228, 35, 56, 0.2)',
              color: '#e42338'
            }}>
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type="email"
                  placeholder="demo@funderpro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
                  style={{
                    backgroundColor: '#131b32',
                    borderColor: '#263348',
                    color: '#ffffff'
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-lg border text-base"
                  style={{
                    backgroundColor: '#131b32',
                    borderColor: '#263348',
                    color: '#ffffff'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#7f8bab' }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded"
                  style={{ accentColor: '#00d084' }}
                />
                <span className="ml-2 text-sm" style={{ color: '#e2f8ff' }}>Remember me</span>
              </label>
              <a href="#" className="text-sm transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all disabled:opacity-50 text-base"
              style={{ backgroundColor: '#e42338' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: '#e2f8ff' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
              Create account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Background with stats */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-lg text-center">
          <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg p-4" style={{ backgroundColor: '#0f1527' }}>
                <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Total Profit</p>
                <p className="text-xl font-bold" style={{ color: '#00d084' }}>$125,430</p>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: '#0f1527' }}>
                <p className="text-sm mb-1" style={{ color: '#7f8bab' }}>Active Traders</p>
                <p className="text-xl font-bold text-white">5,000+</p>
              </div>
            </div>
            <div className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0f1527' }}>
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-2" style={{ color: '#7f8bab' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm" style={{ color: '#7f8bab' }}>Performance Chart</p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the trading elite
          </h2>
          <p className="text-base" style={{ color: '#e2f8ff' }}>
            Get funded up to $200,000 and keep up to 90% of your profits
          </p>
        </div>
      </div>
    </div>
  );
}