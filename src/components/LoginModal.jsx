import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Phone, Mail, User, KeyRound, ArrowRight, 
  CheckCircle2, Sparkles, Shield, QrCode, LogOut, Eye, EyeOff, Dumbbell
} from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function LoginModal({ isOpen, onClose, onOpenCheckout }) {
  const [userType, setUserType] = useState('member'); // 'member' | 'staff'
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Form states
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage('');
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtp('7560'); // auto-fill demo OTP
    }, 600);
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (!phone) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (otpSent && !otp) {
      setErrorMessage('Please enter the 4-digit OTP.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setCurrentUser({
        name: phone === '9876543210' ? 'Pramod Mohanty' : 'Alex Mohanty',
        phone: `+91 ${phone}`,
        id: `RG-BAL-${Math.floor(1000 + Math.random() * 9000)}`,
        tier: 'Quarterly All-Access Member',
        status: 'Active',
        validUntil: '31 Jan 2027',
        role: userType === 'staff' ? 'Strength Coach' : 'Member'
      });
    }, 700);
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both your email/ID and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setCurrentUser({
        name: userType === 'staff' ? 'Coach Vikram Malhotra' : 'Alex Mohanty',
        email: email,
        id: userType === 'staff' ? 'STAFF-RG-01' : 'RG-BAL-2026-084',
        tier: userType === 'staff' ? 'Head Coach & Trainer' : 'Annual VIP Elite Member',
        status: 'Active',
        validUntil: '31 Dec 2027',
        role: userType === 'staff' ? 'Head Coach' : 'Member'
      });
    }, 700);
  };

  const handleQuickDemoMember = () => {
    setErrorMessage('');
    setUserType('member');
    setPhone('9876543210');
    setOtpSent(true);
    setOtp('7560');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setCurrentUser({
        name: 'Alex Mohanty',
        phone: '+91 98765 43210',
        id: 'RG-BAL-2026-084',
        tier: 'Annual VIP Elite Member',
        status: 'Active',
        validUntil: '24 Oct 2027',
        role: 'Member'
      });
    }, 400);
  };

  const handleQuickDemoTrainer = () => {
    setErrorMessage('');
    setUserType('staff');
    setLoginMethod('email');
    setEmail('coach.vikram@ramgoldgym.com');
    setPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setCurrentUser({
        name: 'Vikram Malhotra',
        email: 'coach.vikram@ramgoldgym.com',
        id: 'STAFF-RG-01',
        tier: 'Head Strength Coach & Floor Master',
        status: 'Staff Active',
        validUntil: 'Permanent Staff',
        role: 'Head Coach'
      });
    }, 400);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setOtpSent(false);
    setPhone('');
    setOtp('');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-[#041626] border border-[#25BDF2]/40 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(37,189,242,0.2)] rounded-xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Glowing Header Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#25BDF2] via-[#00e5ff] to-[#25BDF2]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#081E30] flex items-center justify-between bg-[#081E30]/70">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25BDF2]/10 border border-[#25BDF2]/30 flex items-center justify-center text-[#25BDF2]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-white text-sm sm:text-base tracking-wider">RAMGOLD</span>
                <span className="font-extrabold text-[#25BDF2] text-sm sm:text-base">GYM</span>
                <span className="text-[10px] bg-[#25BDF2]/20 text-[#25BDF2] px-1.5 py-0.5 rounded font-bold uppercase ml-1">PORTAL</span>
              </div>
              <p className="text-[11px] text-slate-400">Balasore Member & Staff Access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close Login"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer Review Notice (Prototype Demo Banner) */}
        <div className="bg-[#081E30]/90 border-b border-[#102F4A] px-4 py-2 flex items-center justify-between text-[11px]">
          <span className="text-amber-400 font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-1" />
            PREVIEW LOGIN SECTION
          </span>
          <span className="text-slate-400">Ready for Customer Review</span>
        </div>

        {/* ============================================================== */}
        {/* STATE A: LOGGED IN MEMBER DASHBOARD PREVIEW */}
        {/* ============================================================== */}
        {isLoggedIn && currentUser ? (
          <div className="p-5 sm:p-6 space-y-5">
            {/* Member Digital ID Card */}
            <div className="bg-gradient-to-br from-[#081E30] via-[#041626] to-[#0A2640] border border-[#25BDF2]/50 p-4 sm:p-5 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#25BDF2]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] tracking-widest text-[#25BDF2] font-mono uppercase block">RAMGOLD DIGITAL PASS</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{currentUser.name}</h3>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">ID: {currentUser.id}</p>
                </div>
                <div className="flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentUser.status}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-[#102F4A] pt-3 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Membership Tier:</span>
                  <span className="font-semibold text-white">{currentUser.tier}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Access Period:</span>
                  <span className="text-slate-200">{currentUser.validUntil}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Home Facility:</span>
                  <span className="text-[#25BDF2]">Balasore Arena (5 AM – 11 PM)</span>
                </div>
              </div>

              {/* QR Code Section for Gym Entry */}
              <div className="mt-4 pt-3 border-t border-[#102F4A] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <QrCode className="w-5 h-5 text-[#25BDF2]" />
                  <span>Scan pass at front reception turnstile</span>
                </div>
                <div className="bg-white p-1 rounded">
                  <div className="w-8 h-8 bg-[#041626] rounded flex items-center justify-center text-[9px] font-mono text-[#25BDF2] font-bold">
                    QR
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => alert('Workout tracker demo: In final release, this connects to your tailored split and coach notes!')}
                className="p-2.5 bg-[#081E30] hover:bg-[#102F4A] border border-[#102F4A] rounded-lg text-slate-200 font-semibold transition-colors text-center"
              >
                Today's Workout
              </button>
              <button 
                onClick={() => {
                  onClose();
                  if (onOpenCheckout) onOpenCheckout('Annual Membership');
                }}
                className="p-2.5 bg-[#25BDF2]/10 hover:bg-[#25BDF2]/20 border border-[#25BDF2]/40 rounded-lg text-[#25BDF2] font-semibold transition-colors text-center"
              >
                Renew / Upgrade
              </button>
            </div>

            {/* Sign Out Button */}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 border border-[#102F4A] hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg text-xs font-bold transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>SIGN OUT OF DEMO ACCOUNT</span>
              </button>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* STATE B: LOGIN FORM */
          /* ============================================================== */
          <div className="p-4 sm:p-6 space-y-4">
            {/* Quick 1-Click Demo Buttons for Client Review */}
            <div className="bg-[#081E30]/70 border border-[#25BDF2]/25 p-2.5 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                <span className="flex items-center text-[#25BDF2]">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Instant 1-Click Demo Test
                </span>
                <span className="text-slate-400">For Client Review</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleQuickDemoMember}
                  className="bg-[#25BDF2]/15 hover:bg-[#25BDF2]/25 border border-[#25BDF2]/50 text-[#25BDF2] text-xs py-1.5 px-2 rounded font-semibold transition-all text-center flex items-center justify-center space-x-1"
                >
                  <span>⚡ Member Test</span>
                </button>
                <button
                  type="button"
                  onClick={handleQuickDemoTrainer}
                  className="bg-white/5 hover:bg-white/10 border border-slate-700 text-slate-200 text-xs py-1.5 px-2 rounded font-semibold transition-all text-center flex items-center justify-center space-x-1"
                >
                  <span>⚡ Coach Test</span>
                </button>
              </div>
            </div>

            {/* Member vs Staff Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-[#081E30] p-1 rounded-lg border border-[#102F4A]">
              <button
                type="button"
                onClick={() => { setUserType('member'); setErrorMessage(''); }}
                className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                  userType === 'member'
                    ? 'bg-[#25BDF2] text-[#041626] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                MEMBER LOGIN
              </button>
              <button
                type="button"
                onClick={() => { setUserType('staff'); setErrorMessage(''); }}
                className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                  userType === 'staff'
                    ? 'bg-[#25BDF2] text-[#041626] shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                COACH / STAFF
              </button>
            </div>

            {/* Method Toggle (Phone OTP vs Email & Password) */}
            <div className="flex border-b border-[#102F4A] text-xs">
              <button
                type="button"
                onClick={() => { setLoginMethod('phone'); setErrorMessage(''); }}
                className={`pb-2 px-3 font-semibold transition-colors relative ${
                  loginMethod === 'phone' ? 'text-[#25BDF2]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Mobile & OTP
                {loginMethod === 'phone' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#25BDF2]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => { setLoginMethod('email'); setErrorMessage(''); }}
                className={`pb-2 px-3 font-semibold transition-colors relative ${
                  loginMethod === 'email' ? 'text-[#25BDF2]' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Email / Member ID
                {loginMethod === 'email' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#25BDF2]" />
                )}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/40 text-red-400 text-xs rounded-lg">
                {errorMessage}
              </div>
            )}

            {/* FORM A: PHONE & OTP */}
            {loginMethod === 'phone' ? (
              <form onSubmit={otpSent ? handlePhoneLogin : handleSendOtp} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Registered Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="98765 43210"
                      className="w-full bg-[#081E30] border border-[#102F4A] focus:border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] text-white pl-12 pr-3 py-2 text-sm rounded-lg outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                        Enter 4-Digit OTP
                      </label>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[10px] text-[#25BDF2] hover:underline"
                      >
                        Resend OTP
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP (demo: 7560)"
                      className="w-full bg-[#081E30] border border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] text-white px-3 py-2 text-sm rounded-lg outline-none transition-all text-center tracking-widest font-mono text-base"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      * Demo OTP auto-filled. In live version, sent via SMS.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] disabled:opacity-50 text-[#041626] font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(37,189,242,0.3)] mt-2"
                >
                  {isLoading ? (
                    <span>Verifying...</span>
                  ) : otpSent ? (
                    <>
                      <span>SIGN IN TO PORTAL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <span>GET OTP CODE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* FORM B: EMAIL & PASSWORD */
              <form onSubmit={handleEmailLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email / Member ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. member@ramgold.com or RG-8842"
                      className="w-full bg-[#081E30] border border-[#102F4A] focus:border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] text-white pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset link will be sent to your registered email.')}
                      className="text-[10px] text-[#25BDF2] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-[#081E30] border border-[#102F4A] focus:border-[#25BDF2] focus:ring-1 focus:ring-[#25BDF2] text-white pl-9 pr-10 py-2 text-sm rounded-lg outline-none transition-all placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] disabled:opacity-50 text-[#041626] font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(37,189,242,0.3)] mt-2"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>SIGN IN TO PORTAL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Footer / Join Callout */}
            <div className="pt-3 border-t border-[#102F4A] text-center space-y-1">
              <p className="text-xs text-slate-400">
                Not a Ramgold Gym member yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onOpenCheckout) onOpenCheckout('Quarterly Membership');
                  }}
                  className="text-[#25BDF2] hover:underline font-bold"
                >
                  Join Now
                </button>
              </p>
              <p className="text-[10px] text-slate-500">
                For in-person access: Balasore Facility Above Gayatri Vaishnavi Healthcare
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
