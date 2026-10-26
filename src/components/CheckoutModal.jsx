import React, { useState, useEffect } from 'react';
import { 
  X, Check, ShieldCheck, QrCode, Download, CreditCard, 
  Smartphone, Building2, Sparkles, ArrowRight, Lock, 
  RefreshCw, CheckCircle2, AlertCircle, Phone
} from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';
import { openLiveRazorpayCheckout, simulatePaymentProcessing } from '../utils/razorpay';

export default function CheckoutModal({ isOpen, onClose, initialPlan = 'Quarterly Membership' }) {
  // Plan options normalized with numeric values for tax calculation
  const planOptions = [
    {
      id: 'monthly',
      title: 'Monthly Membership',
      price: '₹1,800',
      priceNumber: 1800,
      period: '/ month',
      badge: 'FLEXIBLE',
      cycle: 'Renews every month'
    },
    {
      id: 'quarterly',
      title: 'Quarterly Membership',
      price: '₹4,800',
      priceNumber: 4800,
      period: '/ 3 months',
      badge: 'MOST POPULAR',
      cycle: 'Renews every 3 months'
    },
    {
      id: 'annual',
      title: 'Annual Membership',
      price: '₹15,000',
      priceNumber: 15000,
      period: '/ year',
      badge: 'BEST VALUE',
      cycle: 'Renews annually'
    },
    {
      id: 'founding',
      title: 'Founding Member Rate',
      price: '₹12,000',
      priceNumber: 12000,
      period: '/ first year',
      badge: 'LIMITED 150 SLOTS',
      cycle: 'Locked founder renewal'
    }
  ];

  // Selected plan state
  const [selectedPlanObj, setSelectedPlanObj] = useState(planOptions[1]); // default quarterly
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    upiId: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Checkout Stages: 'form' | 'processing' | 'success'
  const [stage, setStage] = useState('form');
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [confirmationData, setConfirmationData] = useState(null);

  // Sync initial plan if passed from parent component
  useEffect(() => {
    if (initialPlan) {
      const planTitle = typeof initialPlan === 'string' ? initialPlan : initialPlan.title;
      const found = planOptions.find((p) =>
        p.title.toLowerCase().includes(planTitle.toLowerCase()) ||
        planTitle.toLowerCase().includes(p.id)
      );
      if (found) setSelectedPlanObj(found);
    }
  }, [initialPlan]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStage('form');
      setFormErrors({});
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Pricing & GST breakdown (Prices include 18% GST as standard gym pricing in India)
  const gstRate = 0.18;
  const basePrice = Math.round(selectedPlanObj.priceNumber / (1 + gstRate));
  const gstAmount = selectedPlanObj.priceNumber - basePrice;

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your full name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email required for tax invoice';
    }
    if (!formData.phone.trim() || !/^[0-9+() -]{7,15}$/.test(formData.phone)) {
      errors.phone = 'Valid phone number required for WhatsApp pass';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isDemoMode) {
      // Attempt Live Razorpay Checkout
      const launched = await openLiveRazorpayCheckout({
        plan: selectedPlanObj,
        user: formData,
        onSuccess: (data) => {
          setConfirmationData({
            membershipId: `RG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            paymentId: data.paymentId,
            planTitle: selectedPlanObj.title,
            amountPaid: selectedPlanObj.price,
            mode: 'live',
            date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            expiresOn: 'In 365 Days'
          });
          setStage('success');
        },
        onFailure: (err) => {
          alert(`Payment not completed: ${err.reason || err.description || 'Cancelled'}`);
        }
      });

      if (!launched) {
        // Fallback gracefully without blocking browser alert
        setIsDemoMode(true);
      } else {
        return;
      }
    }

    // Run Demo Simulation
    setStage('processing');
    try {
      const result = await simulatePaymentProcessing({
        plan: selectedPlanObj,
        user: formData,
        paymentMethod,
        onProgress: (text, pct) => {
          setProgressText(text);
          setProgressPercent(pct);
        }
      });

      setConfirmationData(result);
      setStage('success');
    } catch (err) {
      setStage('form');
      alert('Simulation encountered an error. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#081E30] border border-[#102F4A] shadow-2xl overflow-hidden my-auto text-white text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#041626] border-b border-[#102F4A]">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-headline-md font-extrabold tracking-wider text-white">
              RAMGOLD <span className="text-[#25BDF2]">GYM</span>
            </span>
            <span className="text-slate-400 text-xs px-2 py-0.5 border border-[#102F4A] rounded-none hidden sm:inline-block">
              SECURE CHECKOUT
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit SSL</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
              aria-label="Close Checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STAGE 1 & 2: PLAN SELECTION & CHECKOUT FORM */}
        {/* ============================================================ */}
        {stage === 'form' && (
          <form onSubmit={handlePay} className="p-5 sm:p-7 space-y-6">
            {/* Mode Switcher Banner (Live vs Demo Simulation) */}
            <div className="bg-[#041626] border border-[#153B5C] p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-400 animate-pulse' : 'bg-[#25BDF2]'}`} />
                  <span className="font-bold text-slate-200">
                    {isDemoMode ? 'TEST SIMULATION MODE (Safe Demo - Generates Pass)' : 'LIVE RAZORPAY GATEWAY'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className="text-[#25BDF2] hover:underline font-semibold text-[11px] uppercase tracking-wider"
                >
                  Switch to {isDemoMode ? 'Live Gateway' : 'Demo Mode'}
                </button>
              </div>

              {!isDemoMode && (
                <p className="text-[11px] text-slate-400 bg-[#081E30] p-2 border border-[#102F4A] leading-relaxed">
                  💡 <strong className="text-white">To accept real payments:</strong> Add your free Razorpay Key ID in <code className="text-[#25BDF2] font-mono">.env</code> (<code className="text-slate-300">VITE_RAZORPAY_KEY_ID=rzp_test_...</code>). If left on sample key, the system seamlessly simulates the transaction for you.
                </p>
              )}
            </div>

            {/* Plan Picker Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. SELECT MEMBERSHIP COMMITMENT
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {planOptions.map((plan) => {
                  const isSelected = selectedPlanObj.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanObj(plan)}
                      className={`p-3 text-left border transition-all relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#25BDF2] bg-[#25BDF2]/10 shadow-[0_0_12px_rgba(37,189,242,0.25)]'
                          : 'border-[#102F4A] bg-[#041626]/70 hover:border-slate-600'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#25BDF2] text-[#041626] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] text-[#25BDF2] font-extrabold uppercase tracking-widest block leading-tight mb-1">
                          {plan.badge}
                        </span>
                        <div className="font-bold text-xs text-white leading-snug line-clamp-1">
                          {plan.title.replace(' Membership', '')}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-base font-black text-white">{plan.price}</span>
                        <span className="text-[10px] text-slate-400 block">{plan.period}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Member Details */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. MEMBER REGISTRATION DETAILS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name *"
                    className={`w-full bg-[#041626] border ${
                      formErrors.name ? 'border-red-500' : 'border-[#153B5C] focus:border-[#25BDF2]'
                    } px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {formErrors.name && <p className="text-red-400 text-[10px] mt-1">{formErrors.name}</p>}
                </div>

                {/* Email for Invoice */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email (for GST invoice) *"
                    className={`w-full bg-[#041626] border ${
                      formErrors.email ? 'border-red-500' : 'border-[#153B5C] focus:border-[#25BDF2]'
                    } px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {formErrors.email && <p className="text-red-400 text-[10px] mt-1">{formErrors.email}</p>}
                </div>

                {/* Phone for WhatsApp Pass */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="WhatsApp Phone Number *"
                    className={`w-full bg-[#041626] border ${
                      formErrors.phone ? 'border-red-500' : 'border-[#153B5C] focus:border-[#25BDF2]'
                    } px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {formErrors.phone && <p className="text-red-400 text-[10px] mt-1">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. SELECT PAYMENT CHANNEL (RBI COMPLIANT RECURRING AUTO-DEBIT)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* UPI AutoPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 border text-left flex items-start space-x-3 transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-[#25BDF2] bg-[#25BDF2]/10'
                      : 'border-[#102F4A] bg-[#041626]/70 hover:border-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#25BDF2] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">UPI AutoPay</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                </button>

                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border text-left flex items-start space-x-3 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-[#25BDF2] bg-[#25BDF2]/10'
                      : 'border-[#102F4A] bg-[#041626]/70 hover:border-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#25BDF2] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">Credit / Debit Card</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                {/* NetBanking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 border text-left flex items-start space-x-3 transition-colors ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#25BDF2] bg-[#25BDF2]/10'
                      : 'border-[#102F4A] bg-[#041626]/70 hover:border-slate-600'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#25BDF2] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white block">NetBanking / NEFT</span>
                    <span className="text-[10px] text-slate-400 block leading-tight">HDFC, ICICI, SBI, Axis</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Price & GST Summary Box */}
            <div className="bg-[#041626] border border-[#102F4A] p-4 text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Base Membership Fee</span>
                <span>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>18% Goods & Services Tax (GSTIN 27AAACR1234F1Z5)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-[#102F4A] flex justify-between items-baseline text-white">
                <div>
                  <span className="font-extrabold text-sm uppercase tracking-wide">Total Amount Payable</span>
                  <span className="text-[10px] text-slate-400 block">{selectedPlanObj.cycle}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[#25BDF2]">{selectedPlanObj.price}</span>
                  <span className="text-[10px] text-slate-400 block">All taxes inclusive</span>
                </div>
              </div>
            </div>

            {/* Submit Action CTA */}
            <button
              type="submit"
              className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] active:scale-[0.99] text-[#041626] font-black py-4 text-xs uppercase tracking-wider transition-all duration-200 shadow-xl hover:shadow-[#25BDF2]/30 flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isDemoMode ? `AUTHORIZE DEMO PAYMENT OF ${selectedPlanObj.price}` : `PAY ${selectedPlanObj.price} VIA RAZORPAY`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-slate-500 text-center leading-normal">
              By authorizing, you agree to RAMGOLD GYM membership bylaws. RBI pre-debit notifications are sent 24 hours prior to recurring renewals. Cancel anytime in 1-click.
            </p>
          </form>
        )}

        {/* ============================================================ */}
        {/* STAGE 2: PROCESSING SIMULATION ANIMATION */}
        {/* ============================================================ */}
        {stage === 'processing' && (
          <div className="p-10 sm:p-14 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-[#25BDF2]/20 border-t-[#25BDF2] rounded-full mx-auto animate-spin" />
            <div>
              <h3 className="font-headline-md text-2xl uppercase text-white mb-2">
                PROCESSING SECURE MANDATE
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                {progressText || 'Connecting to banking server...'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto bg-[#041626] border border-[#102F4A] h-2.5 overflow-hidden">
              <div
                className="bg-[#25BDF2] h-full transition-all duration-300 shadow-[0_0_10px_#25BDF2]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-xs text-slate-500 uppercase tracking-widest">
              PLEASE DO NOT REFRESH OR CLOSE THIS WINDOW
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* STAGE 3: SUCCESS & DIGITAL PASS CONFIRMATION */}
        {/* ============================================================ */}
        {stage === 'success' && confirmationData && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-fadeIn">
            {/* Top Success Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>MEMBERSHIP ENROLLED & PAYMENT CONFIRMED</span>
            </div>

            <h3 className="font-headline-lg text-3xl sm:text-4xl uppercase text-white">
              WELCOME TO RAMGOLD GYM
            </h3>

            {/* Digital Membership Pass Card (High-Tech Graphic) */}
            <div className="max-w-md mx-auto bg-gradient-to-br from-[#0C253B] to-[#041626] border-2 border-[#25BDF2] p-5 sm:p-6 shadow-2xl relative text-left overflow-hidden">
              {/* Watermark Logo */}
              <div className="absolute right-[-20px] bottom-[-20px] text-white/5 font-black text-8xl select-none pointer-events-none">
                RG
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-[#25BDF2] font-black uppercase tracking-widest block">
                    RAMGOLD ATHLETIC CLUB
                  </span>
                  <div className="text-lg font-headline-md font-extrabold text-white">
                    {formData.name || 'ELITE ATHLETE'}
                  </div>
                  <span className="text-xs text-slate-400">{formData.phone || '+91 98765 43210'}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center space-x-1.5 bg-[#25BDF2]/20 border border-[#25BDF2]/40 text-[#25BDF2] text-[10px] font-black px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25BDF2] animate-ping" />
                    <span>ACTIVE</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#102F4A] mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">MEMBER ID</span>
                  <span className="font-mono font-bold text-white">{confirmationData.membershipId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">PLAN</span>
                  <span className="font-bold text-[#25BDF2]">{confirmationData.planTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">ENROLLED ON</span>
                  <span className="text-slate-200">{confirmationData.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">VALID UNTIL</span>
                  <span className="text-slate-200 font-semibold">{confirmationData.expiresOn}</span>
                </div>
              </div>

              {/* QR Code Simulation for Turnstile Access */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white p-1 rounded-sm flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-[#041626]" />
                  </div>
                  <div className="text-[10px] text-slate-400 leading-tight">
                    Scan at entrance turnstile for keyless access (5 AM – 11 PM)
                  </div>
                </div>
                <span className="font-mono text-[9px] text-slate-500">TX: {confirmationData.paymentId.slice(-8)}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={() => {
                  const printWin = window.open('', '_blank');
                  if (printWin) {
                    printWin.document.write(`
                      <!DOCTYPE html>
                      <html>
                      <head>
                        <title>Tax Invoice - ${confirmationData.membershipId} - RAMGOLD GYM</title>
                        <style>
                          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #041626; max-width: 800px; margin: auto; }
                          .header { display: flex; justify-content: space-between; border-bottom: 3px solid #25BDF2; padding-bottom: 20px; margin-bottom: 30px; }
                          h1 { margin: 0; color: #041626; font-size: 28px; letter-spacing: 1px; }
                          h1 span { color: #25BDF2; }
                          .meta { font-size: 13px; color: #64748b; line-height: 1.5; }
                          table { width: 100%; border-collapse: collapse; margin: 30px 0; }
                          th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
                          th { background: #f8fafc; font-weight: 700; color: #334155; }
                          .total { font-size: 20px; font-weight: 800; color: #041626; text-align: right; padding-top: 15px; }
                          .badge { display: inline-block; background: #e0f7fe; color: #0284c7; font-weight: 700; padding: 3px 8px; font-size: 11px; border-radius: 3px; }
                          .footer { margin-top: 50px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <div>
                            <h1>RAMGOLD <span>GYM</span></h1>
                            <div class="meta">RAMGOLD FITNESS AND ATHLETICS</div>
                            <div class="meta">${GYM_CONFIG.contact.location}, ${GYM_CONFIG.contact.city} - 756001</div>
                            <div class="meta">GSTIN: 21AAACR1234F1Z5 • concierge@ramgoldgym.com</div>
                          </div>
                          <div style="text-align: right;">
                            <h2 style="margin: 0; color: #041626;">TAX INVOICE</h2>
                            <div class="meta"><strong>Invoice No:</strong> INV-${confirmationData.membershipId}</div>
                            <div class="meta"><strong>Date:</strong> ${confirmationData.date}</div>
                            <div class="meta"><strong>Status:</strong> <span class="badge">PAID</span></div>
                          </div>
                        </div>

                        <div style="background: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 25px;">
                          <strong style="font-size: 12px; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">Billed To:</strong>
                          <div style="font-size: 15px; font-weight: bold;">${formData.name || 'Member'}</div>
                          <div class="meta">Phone: ${formData.phone || 'N/A'}</div>
                          <div class="meta">Email: ${formData.email || 'N/A'}</div>
                          <div class="meta">Member ID: ${confirmationData.membershipId}</div>
                        </div>

                        <table>
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>SAC Code</th>
                              <th style="text-align: right;">Amount (INR)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <strong>${confirmationData.planTitle}</strong><br />
                                <span style="font-size: 12px; color: #64748b;">Daily Access (5:00 AM – 11:00 PM) • Valid Until: ${confirmationData.expiresOn}</span>
                              </td>
                              <td>999723</td>
                              <td style="text-align: right;">₹${basePrice.toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                              <td>CGST (9%)</td>
                              <td>999723</td>
                              <td style="text-align: right;">₹${Math.round(gstAmount / 2).toLocaleString('en-IN')}</td>
                            </tr>
                            <tr>
                              <td>SGST (9%)</td>
                              <td>999723</td>
                              <td style="text-align: right;">₹${Math.round(gstAmount / 2).toLocaleString('en-IN')}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="total">
                          Total Amount Paid: ${confirmationData.amountPaid}
                        </div>

                        <div class="footer">
                          This is a computer-generated tax invoice issued by RAMGOLD FITNESS AND ATHLETICS LLP.<br />
                          Thank you for choosing discipline and training with us.
                        </div>
                        <script>window.print();</script>
                      </body>
                      </html>
                    `);
                    printWin.document.close();
                  }
                }}
                className="bg-[#041626] hover:bg-[#102F4A] border border-[#102F4A] hover:border-[#25BDF2] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Download className="w-4 h-4 text-[#25BDF2]" />
                <span>TAX INVOICE (PDF)</span>
              </button>

              <a
                href={`https://wa.me/${GYM_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hi RAMGOLD GYM! I just purchased ${confirmationData.planTitle} online. My Member ID is ${confirmationData.membershipId}. Please share my onboarding schedule.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white text-xs uppercase tracking-widest underline"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
