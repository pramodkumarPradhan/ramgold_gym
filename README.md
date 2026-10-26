# RAMGOLD GYM - Official Website

A high-performance, responsive, production-ready website for **RAMGOLD GYM**, built with React, Vite, and Tailwind CSS following the approved Stitch desktop and mobile specifications.

---

## 🚀 Features

- **Brand-Authentic Design**: Built exactly to the approved Stitch color palette (`#38BDF8` sky blue, `#071A2B` deep navy, `#0B2238` container tones, and `#F0F9FF` light ice accents).
- **Typography**: Google Fonts `Anton` for bold, impactful headlines and `Inter` for clean, readable body typography.
- **11 Complete Sections**:
  1. **Navbar**: Sticky header with smooth blur, scroll active indicators, mobile drawer, and CTA.
  2. **Hero Section**: High-contrast headline, "BUILT BY DISCIPLINE" badge, 3 key metrics, and dual CTAs.
  3. **About**: Brand narrative, 15,000 SQ FT & 24/7 access highlights, and philosophy link.
  4. **Facilities (Bento Grid)**: Zone 01 (Strength), Zone 02 (Free Weights), Zone 03 (Functional), Zone 04 (Cardio), Zone 05 (Private PT).
  5. **Training Methodology**: Build Strength, Push Endurance, and Train With Purpose with interactive protocol detail modals.
  6. **Membership Plans**: Monthly (₹7,500), Quarterly (₹20,000 - Most Popular), and Annual (₹65,000 - Best Value).
  7. **Trainers**: Head Strength Coach, Senior Performance Coach, and Metabolic Specialist profiles.
  8. **Gallery**: 6 high-res images with interactive full-screen Lightbox modal, counter, keyboard navigation (Esc, Arrow keys), and captions.
  9. **Grand Opening Announcement**: Highlighting 150 limited founding membership slots with direct plan pre-fill.
  10. **Contact & Quick Enquiry**: Real location (`Near hero showroom above Gayatri Vaishnavi Healthcare`), operating hours, verified input validation form, and direct WhatsApp integration.
  11. **Footer**: Navigation links, legal disclaimers, and copyright.
- **Floating WhatsApp Concierge**: Instant direct messaging widget on both desktop and mobile.
- **Centralized Configuration**: All gym details, pricing, phones, addresses, and images are organized in `src/config/gymConfig.js`.

---

## 🛠️ Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Lucide React** (icons)
- **Google Fonts** (`Anton`, `Inter`, `Material Symbols`)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview the Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration & Customization

All customizable content is located in:
👉 `src/config/gymConfig.js`

To update prices, phone numbers, addresses, social handles, or gym images, simply edit that file:

```javascript
export const GYM_CONFIG = {
  brand: {
    name: "RAMGOLD GYM",
    tagline: "BUILT BY DISCIPLINE.",
    // ...
  },
  contact: {
    location: "Near hero showroom above Gayatri Vaishnavi Healthcare",
    phonePrimary: "+91 98765 43210",
    whatsappNumber: "919876543210",
    email: "concierge@ramgoldgym.com",
    // ...
  },
  membershipPlans: [
    // Modify tiers and prices here
  ]
};
```

---

## 🚢 Deployment Options

### Deploying to Vercel
1. Push this repository to GitHub/GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.

### Deploying to Netlify
1. Connect your repo to [Netlify](https://www.netlify.com).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.
3. Add a `_redirects` file if client-side routing is added in the future:
   ```
   /*    /index.html   200
   ```
