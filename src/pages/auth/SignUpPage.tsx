import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft, AlertCircle, Check } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'One number', met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0f1527' }}>
      {/* Left side - Background */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-lg text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-4" style={{
              backgroundColor: 'rgba(0, 208, 132, 0.1)',
              border: '1px solid rgba(0, 208, 132, 0.2)'
            }}>
              <span className="text-sm font-medium" style={{ color: '#00d084' }}>Limited Time Offer</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Start your trading journey today
            </h2>
            <p className="text-base mb-8" style={{ color: '#e2f8ff' }}>
              Get funded up to $200,000 with our instant funding program. Keep up to 90% of your profits.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: '#1c273e', border: '1px solid #263348' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm" style={{ color: '#7f8bab' }}>Your Progress</p>
                <p className="text-2xl font-bold text-white">3/5</p>
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00d084' }} />
                ))}
                {[4, 5].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: '#263348' }} />
                ))}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex items-center" style={{ color: '#e2f8ff' }}>
                <Check className="w-5 h-5 mr-3" style={{ color: '#00d084' }} />
                Instant funding decisions
              </div>
              <div className="flex items-center" style={{ color: '#e2f8ff' }}>
                <Check className="w-5 h-5 mr-3" style={{ color: '#00d084' }} />
                Up to 90% profit split
              </div>
              <div className="flex items-center" style={{ color: '#e2f8ff' }}>
                <Check className="w-5 h-5 mr-3" style={{ color: '#00d084' }} />
                Weekly payouts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
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

          <h1 className="text-4xl font-semibold text-white mb-2">Create your account</h1>
          <p className="mb-8 text-base" style={{ color: '#e2f8ff' }}>
            Start your journey to becoming a funded trader
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
                    style={{ backgroundColor: '#131b32', borderColor: '#263348', color: '#ffffff' }}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border text-base"
                  style={{ backgroundColor: '#131b32', borderColor: '#263348', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
                  style={{ backgroundColor: '#131b32', borderColor: '#263348', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-lg border text-base"
                  style={{ backgroundColor: '#131b32', borderColor: '#263348', color: '#ffffff' }}
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

            {formData.password && (
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm"
                    style={{ color: req.met ? '#00d084' : '#7f8bab' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border flex items-center justify-center mr-2"
                      style={{
                        backgroundColor: req.met ? '#00d084' : 'transparent',
                        borderColor: req.met ? '#00d084' : '#263348'
                      }}
                    >
                      {req.met && <Check className="w-3 h-3 text-white" />}
                    </div>
                    {req.label}
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: '#e2f8ff' }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#7f8bab' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg border text-base"
                  style={{ backgroundColor: '#131b32', borderColor: '#263348', color: '#ffffff' }}
                />
              </div>
            </div>

            <label className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded"
                style={{ accentColor: '#00d084' }}
                required
              />
              <span className="ml-2 text-sm" style={{ color: '#e2f8ff' }}>
                I agree to the{' '}
                <a href="/terms" className="transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all disabled:opacity-50 text-base"
              style={{ backgroundColor: '#e42338' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm" style={{ color: '#e2f8ff' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold transition-colors hover:opacity-80" style={{ color: '#00d084' }}>
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}