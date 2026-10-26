/**
 * RAMGOLD GYM - Razorpay Webhook Handler & Subscription Backend Architecture
 * 
 * This file demonstrates production-ready signature verification and event handling
 * for automated gym membership subscriptions.
 * 
 * To deploy:
 * Run with Node.js/Express: `node server/webhookHandler.js`
 * Or adapt into a Next.js / Supabase / Vercel Serverless Function.
 */

const crypto = require('crypto');
const http = require('http');

// Configuration (loaded from process.env)
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || 'sample_webhook_secret_987654';
const PORT = process.env.PORT || 5000;

/**
 * Validates the Razorpay webhook signature to prevent tampering/spoofing
 * @param {string} rawBody - Raw unparsed JSON string of the request body
 * @param {string} signature - Value from 'x-razorpay-signature' HTTP header
 * @param {string} secret - Razorpay Webhook Secret configured in Dashboard
 * @returns {boolean}
 */
function verifyWebhookSignature(rawBody, signature, secret) {
  if (!signature || !rawBody) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
  } catch (err) {
    return false;
  }
}

/**
 * Mock database operations for Gym Memberships
 */
const GymDatabase = {
  async activateMember({ customerId, planId, paymentId, subscriptionId, email, phone }) {
    console.log(`[DB] Activating Member: ${email || phone} for plan: ${planId}. SubId: ${subscriptionId}`);
    // Real DB query (PostgreSQL / MongoDB / Supabase):
    // UPDATE members SET status='ACTIVE', current_subscription_id=subscriptionId, expires_at=NOW() + INTERVAL '3 MONTHS'
    return { status: 'ACTIVE', memberId: `RG-${Date.now().toString().slice(-4)}` };
  },

  async recordRenewal({ subscriptionId, paymentId, amount }) {
    console.log(`[DB] Renewal Charged: ₹${amount / 100} for Sub: ${subscriptionId}. PaymentId: ${paymentId}`);
    // Real DB query:
    // INSERT INTO payments (subscription_id, amount, status) VALUES (...)
    // UPDATE members SET expires_at = expires_at + INTERVAL '1 MONTH'
  },

  async handlePaymentFailure({ subscriptionId, errorReason, phone }) {
    console.warn(`[DB] Payment Failed for Sub: ${subscriptionId}. Reason: ${errorReason}`);
    // Real action:
    // 1. Mark member status = 'PAST_DUE' (grant 3-day grace period)
    // 2. Dispatch automated WhatsApp notification with a one-time retry link
  },

  async pauseMemberSubscription({ subscriptionId }) {
    console.log(`[DB] Membership paused for Sub: ${subscriptionId} (e.g. Member Travel/Injury freeze)`);
    // UPDATE members SET status='FROZEN'
  }
};

/**
 * Core Webhook Event Router
 */
async function handleRazorpayEvent(event, payload) {
  console.log(`\n🔔 [Webhook Received] Event: ${event}`);

  switch (event) {
    case 'subscription.authenticated':
      // The customer authorized the recurring mandate (UPI AutoPay / Card)
      console.log('✅ Mandate Authenticated by Bank.');
      break;

    case 'subscription.activated':
      // The subscription is now active
      const sub = payload.subscription.entity;
      await GymDatabase.activateMember({
        subscriptionId: sub.id,
        planId: sub.plan_id,
        customerId: sub.customer_id
      });
      break;

    case 'subscription.charged':
      // Triggered every cycle when payment is successfully debited!
      const payment = payload.payment.entity;
      const chargedSub = payload.subscription.entity;
      await GymDatabase.recordRenewal({
        subscriptionId: chargedSub.id,
        paymentId: payment.id,
        amount: payment.amount
      });
      break;

    case 'payment.failed':
      // Auto-debit failed (e.g., low balance or expired card)
      const failedPayment = payload.payment.entity;
      await GymDatabase.handlePaymentFailure({
        subscriptionId: failedPayment.invoice_id || 'direct_payment',
        errorReason: failedPayment.error_description || 'Bank declined transaction'
      });
      break;

    case 'subscription.paused':
      await GymDatabase.pauseMemberSubscription({
        subscriptionId: payload.subscription.entity.id
      });
      break;

    case 'subscription.cancelled':
      console.log(`❌ Subscription cancelled: ${payload.subscription.entity.id}`);
      // Revoke turnstile/RFID access on membership end date
      break;

    default:
      console.log(`ℹ️ Unhandled event type: ${event}`);
  }
}

/**
 * Lightweight Standalone Webhook Listener Server (Node.js http)
 */
const server = http.createServer((req, res) => {
  // Only accept POST /api/webhooks/razorpay
  if (req.method === 'POST' && req.url === '/api/webhooks/razorpay') {
    let rawBody = '';

    req.on('data', (chunk) => {
      rawBody += chunk.toString();
    });

    req.on('end', async () => {
      const signature = req.headers['x-razorpay-signature'];
      const isValid = verifyWebhookSignature(rawBody, signature, RAZORPAY_WEBHOOK_SECRET);

      if (!isValid) {
        console.error('❌ Webhook signature verification failed! Rejecting request.');
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid signature' }));
        return;
      }

      try {
        const data = JSON.parse(rawBody);
        await handleRazorpayEvent(data.event, data.payload);

        // Razorpay requires an immediate 200 OK response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
      } catch (err) {
        console.error('Error parsing webhook payload:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Processing error' }));
      }
    });
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', service: 'RAMGOLD Webhook Server' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// If executed directly via node:
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`🚀 RAMGOLD Webhook Server listening on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/api/webhooks/razorpay`);
  });
}

module.exports = {
  verifyWebhookSignature,
  handleRazorpayEvent,
  GymDatabase
};
