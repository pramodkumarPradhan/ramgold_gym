import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GYM_CONFIG } from '../config/gymConfig';

export default function Contact({ selectedPlan }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plan: 'Quarterly Membership',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Sync selected plan if user clicked from Membership or Grand Opening section
  useEffect(() => {
    if (selectedPlan) {
      const planName = typeof selectedPlan === 'string' ? selectedPlan : selectedPlan.title;
      if (planName.toLowerCase().includes('month')) {
        setFormData((prev) => ({ ...prev, plan: 'Monthly Membership' }));
      } else if (planName.toLowerCase().includes('quarter')) {
        setFormData((prev) => ({ ...prev, plan: 'Quarterly Membership' }));
      } else if (planName.toLowerCase().includes('annual')) {
        setFormData((prev) => ({ ...prev, plan: 'Annual Membership' }));
      } else if (planName.toLowerCase().includes('found')) {
        setFormData((prev) => ({ ...prev, plan: 'Founding Member Rate' }));
      }
    }
  }, [selectedPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+() -]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({ ...formData });
  };

  const getWhatsAppUrl = (customText) => {
    const text = customText || `${GYM_CONFIG.contact.whatsappDefaultMessage} Interested in: ${formData.plan}. Name: ${formData.name || 'Member'}. Phone: ${formData.phone || ''}`;
    return `https://wa.me/${GYM_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-transparent relative z-10 text-white border-t border-[#081E30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact & Facility Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-headline-lg text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6 leading-tight">
                CONNECT WITH RAMGOLD GYM.
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-medium">
                Visit our premier facility for a private walk-through or connect with our concierge team instantly.
              </p>
            </div>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#081E30] border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] flex-shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-headline-sm text-white font-bold">Location / ଠିକଣା</h4>
                  <p className="text-slate-200 text-sm font-semibold mt-0.5">
                    {GYM_CONFIG.contact.location}
                  </p>
                  <p className="text-[#25BDF2] text-xs mt-1 font-medium">
                    {GYM_CONFIG.contact.locationOdia}, {GYM_CONFIG.contact.cityOdia}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5 font-medium">
                    {GYM_CONFIG.contact.city} • PIN: {GYM_CONFIG.contact.pinCode}
                  </p>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#081E30] border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] flex-shrink-0 shadow-sm">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-headline-sm text-white font-bold">Contact / ଯୋଗାଯୋଗ</h4>
                  <p className="text-slate-200 text-sm font-medium mt-0.5">
                    {GYM_CONFIG.contact.displayPhones}
                  </p>
                  <span className="text-[#25BDF2] text-xs font-semibold block mt-1">
                    {GYM_CONFIG.contact.supportNote}
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#081E30] border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] flex-shrink-0 shadow-sm">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-headline-sm text-white font-bold">Operating Hours / ସମୟ</h4>
                  <p className="text-slate-300 text-sm font-medium mt-0.5">
                    {GYM_CONFIG.contact.operatingHours.summary}
                  </p>
                  <span className="text-[#25BDF2] text-xs font-bold block mt-0.5">
                    ★ {GYM_CONFIG.contact.operatingHours.badge}
                  </span>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#081E30] border border-[#25BDF2]/40 flex items-center justify-center text-[#25BDF2] flex-shrink-0 shadow-sm">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-headline-sm text-white font-bold">Instagram</h4>
                  <a
                    href={GYM_CONFIG.contact.social.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25BDF2] hover:underline text-sm font-semibold"
                  >
                    {GYM_CONFIG.contact.social.instagram}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="mt-8 pt-6 border-t border-[#081E30]">
              <a
                href={getWhatsAppUrl("ନମସ୍କାର RAMGOLD GYM! I want to visit the gym in Balasore and know about admission.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CHAT ON WHATSAPP / ହ୍ୱାଟ୍ସଆପ୍</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Enquiry Form & Direct WhatsApp Module */}
          <div className="lg:col-span-6 bg-[#081E30] text-white p-6 sm:p-10 border border-[#102F4A] shadow-2xl relative">
            
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#25BDF2] font-bold block mb-1">
                ONLINE REGISTRATION
              </span>
              <h3 className="font-headline-md text-2xl sm:text-3xl text-white uppercase">
                QUICK ENQUIRY
              </h3>
              <p className="text-slate-300 text-sm mt-1 font-medium">
                Reserve your slot or enquire about corporate and personal training options.
              </p>
            </div>

            {submittedData ? (
              <div className="bg-[#041626] border border-[#25BDF2]/40 p-6 sm:p-8 rounded text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-[#25BDF2]/20 text-[#25BDF2] mx-auto flex items-center justify-center rounded-full">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-headline-sm uppercase text-white">
                  Enquiry Prepared for {submittedData.name}!
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Plan Selected: <span className="text-[#25BDF2] font-semibold">{submittedData.plan}</span>
                  <br />
                  Phone: <span className="text-slate-200">{submittedData.phone}</span>
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={getWhatsAppUrl(`Hi RAMGOLD GYM, my name is ${submittedData.name}. I just submitted an enquiry for the ${submittedData.plan}. Phone: ${submittedData.phone}. Please contact me.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedData(null);
                      setFormData({ name: '', phone: '', plan: 'Quarterly Membership', message: '' });
                    }}
                    className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white py-3 px-5 text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Enquiry
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-[#25BDF2] flex-shrink-0" />
                  <span>Frontend demo form verified. Live WhatsApp link opens directly.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    FULL NAME <span className="text-[#25BDF2]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full bg-[#041626] border ${
                      errors.name ? 'border-red-500' : 'border-[#153B5C] focus:border-[#25BDF2]'
                    } text-white placeholder-slate-500 px-4 py-3 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    PHONE NUMBER <span className="text-[#25BDF2]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full bg-[#041626] border ${
                      errors.phone ? 'border-red-500' : 'border-[#153B5C] focus:border-[#25BDF2]'
                    } text-white placeholder-slate-500 px-4 py-3 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Interested Plan */}
                <div>
                  <label htmlFor="plan" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    INTERESTED PLAN
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="w-full bg-[#041626] border border-[#153B5C] focus:border-[#25BDF2] text-white px-4 py-3 text-sm focus:outline-none transition-colors"
                  >
                    <option value="Monthly Membership">Monthly Membership (₹1,800/mo)</option>
                    <option value="Quarterly Membership">Quarterly Membership (₹4,800/3mo)</option>
                    <option value="Annual Membership">Annual Membership (₹15,000/yr)</option>
                    <option value="Founding Member Rate">Founding Member Rate (₹12,000/yr - Limited 150)</option>
                    <option value="Private 1-on-1 Personal Training">Private 1-on-1 Personal Training</option>
                  </select>
                </div>

                {/* Additional Notes (Optional) */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    SPECIAL REQUEST OR FITNESS GOALS (OPTIONAL)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your training history, goals, or preferred workout hours..."
                    className="w-full bg-[#041626] border border-[#153B5C] focus:border-[#25BDF2] text-white placeholder-slate-500 px-4 py-3 text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#25BDF2] hover:bg-[#1DA3D2] text-[#041626] font-bold py-4 text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-[#25BDF2]/30 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SUBMIT ENQUIRY</span>
                </button>
              </form>
            )}

            {/* Email footer line */}
            <div className="mt-8 pt-6 border-t border-[#102F4A] text-center">
              <p className="text-slate-400 text-xs uppercase tracking-widest">
                Or email concierge directly at{' '}
                <a href={`mailto:${GYM_CONFIG.contact.email}`} className="text-[#25BDF2] hover:underline font-bold">
                  {GYM_CONFIG.contact.email}
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
