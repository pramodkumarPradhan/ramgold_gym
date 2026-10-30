import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login({ onClose, onLoginSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with your real authentication API call, e.g.
      // const res = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, remember }),
      // });
      // if (!res.ok) throw new Error('Invalid credentials');
      await new Promise((r) => setTimeout(r, 900));
      if (onLoginSuccess) onLoginSuccess({ email, remember });
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#081E30] border-2 border-[#25BDF2] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(37,189,242,0.4)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Member Login"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#25BDF2]/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
          aria-label="Close login"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 mb-3">
          <span className="w-4 h-[2px] bg-[#25BDF2]" />
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#25BDF2]">
            RAMGOLD ARENA • MEMBER ACCESS
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black uppercase mb-1 text-white">
          WELCOME BACK
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Log in to manage your membership and bookings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25BDF2]" />
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full bg-[#041626] border border-[#25BDF2]/30 focus:border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] outline-none rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#25BDF2]" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-[#041626] border border-[#25BDF2]/30 focus:border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] outline-none rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#25BDF2] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-[#25BDF2] w-3.5 h-3.5"
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-[#25BDF2] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] disabled:opacity-60 disabled:cursor-not-allowed text-[#041626] font-bold text-sm uppercase tracking-wider px-5 py-3 rounded-full shadow-[0_0_25px_rgba(37,189,242,0.5)] transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>{loading ? 'LOGGING IN...' : 'LOG IN'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          New to Ramgold Arena?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-[#25BDF2] font-semibold hover:underline"
          >
            Join now
          </button>
        </p>
      </div>
    </div>
  );
}