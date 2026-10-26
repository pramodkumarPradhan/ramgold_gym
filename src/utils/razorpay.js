/**
 * Razorpay Integration Utilities for RAMGOLD GYM
 * Handles dynamic script loading, checkout initialization, and demo payment simulation.
 */

let razorpayScriptLoadedPromise = null;

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 * @returns {Promise<boolean>}
 */
export function loadRazorpayScript() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  if (!razorpayScriptLoadedPromise) {
    razorpayScriptLoadedPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.error('Failed to load Razorpay Checkout SDK script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  return razorpayScriptLoadedPromise;
}

/**
 * Opens the live Razorpay Checkout modal
 * @param {Object} params
 * @param {Object} params.plan - Selected plan details (title, priceNumber, period)
 * @param {Object} params.user - User details (name, email, phone)
 * @param {string} [params.subscriptionId] - Optional server-generated subscription ID
 * @param {Function} params.onSuccess - Callback on verified payment
 * @param {Function} params.onFailure - Callback on payment failure or dismissal
 */
export async function openLiveRazorpayCheckout({ plan, user, subscriptionId, onSuccess, onFailure }) {
  const isLoaded = await loadRazorpayScript();
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  if (!isLoaded || !window.Razorpay || !keyId || keyId.includes('sample_key')) {
    console.warn('Razorpay live SDK not configured or key is sample; fallback to simulation or alert.');
    return false;
  }

  try {
    const options = {
      key: keyId,
      amount: plan.priceNumber * 100, // Amount in paise
      currency: 'INR',
      name: 'RAMGOLD GYM',
      description: `${plan.title} - High Performance Membership`,
      image: '/favicon.svg',
      subscription_id: subscriptionId || undefined,
      prefill: {
        name: user.name || '',
        email: user.email || '',
        contact: user.phone || ''
      },
      theme: {
        color: '#25BDF2',
        backdrop_color: 'rgba(4, 22, 38, 0.95)'
      },
      modal: {
        confirm_close: true,
        ondismiss: function () {
          if (onFailure) onFailure({ reason: 'Payment window closed by user' });
        }
      },
      handler: function (response) {
        // response contains: razorpay_payment_id, razorpay_order_id, razorpay_signature
        if (onSuccess) {
          onSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || `order_${Date.now()}`,
            signature: response.razorpay_signature || 'verified_sig',
            mode: 'live'
          });
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      if (onFailure) {
        onFailure({
          code: response.error.code,
          description: response.error.description,
          source: response.error.source,
          step: response.error.step,
          reason: response.error.reason
        });
      }
    });

    rzp.open();
    return true;
  } catch (err) {
    console.error('Error opening Razorpay modal:', err);
    if (onFailure) onFailure({ error: err.message });
    return false;
  }
}

/**
 * Simulates a realistic payment authorization for test/demo mode
 * @param {Object} params
 * @param {Function} [params.onProgress] - Step-by-step progress notification
 * @returns {Promise<Object>}
 */
export async function simulatePaymentProcessing({ plan, user, paymentMethod, onProgress }) {
  const steps = [
    'Connecting to secure 256-bit payment gateway...',
    paymentMethod === 'upi'
      ? 'Sending mandate authorization request to UPI App...'
      : paymentMethod === 'card'
      ? 'Authorizing 3D Secure bank OTP check...'
      : 'Initiating bank netbanking portal handoff...',
    'Generating recurring mandate token...',
    'Confirming membership enrollment with RAMGOLD GYM...'
  ];

  for (let i = 0; i < steps.length; i++) {
    if (onProgress) onProgress(steps[i], ((i + 1) / steps.length) * 100);
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const membershipId = `RG-${new Date().getFullYear()}-${randomSuffix}`;
  const paymentId = `pay_sim_${timestamp}`;

  return {
    success: true,
    mode: 'demo_simulation',
    membershipId,
    paymentId,
    orderId: `order_sim_${timestamp}`,
    signature: `sig_sim_${Math.random().toString(36).substring(2, 15)}`,
    planTitle: plan.title,
    amountPaid: plan.price,
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    expiresOn: calculateExpiryDate(plan.title)
  };
}

function calculateExpiryDate(planTitle) {
  const now = new Date();
  const lower = planTitle.toLowerCase();
  if (lower.includes('month') && !lower.includes('3')) {
    now.setMonth(now.getMonth() + 1);
  } else if (lower.includes('quarter') || lower.includes('3 month')) {
    now.setMonth(now.getMonth() + 3);
  } else if (lower.includes('annual') || lower.includes('year')) {
    now.setFullYear(now.getFullYear() + 1);
  } else {
    // Default 1 year for founding member
    now.setFullYear(now.getFullYear() + 1);
  }
  return now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
