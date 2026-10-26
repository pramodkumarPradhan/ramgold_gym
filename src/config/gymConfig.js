// Centralized configuration for RAMGOLD GYM
// All contact details, pricing, social handles, and images are managed here.

export const GYM_CONFIG = {
  brand: {
    name: "RAMGOLD GYM",
    nameOdia: "ରାମଗୋଲ୍ଡ ଜିମ୍",
    shortName: "RAMGOLD",
    tagline: "TRAIN HARDER. BECOME MORE.",
    taglineOdia: "କଠିନ ପରିଶ୍ରମ କରନ୍ତୁ • ନିଜକୁ ଗଢ଼ନ୍ତୁ",
    localPrideBadge: "ବାଲେଶ୍ୱରର ପ୍ରିମିୟମ ଫିଟନେସ ସେଣ୍ଟର",
    locationBadge: "BALASORE, ODISHA • ବାଲେଶ୍ୱର",
    subtitle: "High-performance training for a stronger, healthier and more disciplined you.",
    subtitleOdia: "ବାଲେଶ୍ୱରର ସର୍ବୋତ୍ତମ ଓ ଆଧୁନିକ ଜିମ୍। ଆପଣଙ୍କ ସ୍ୱପ୍ନର ଶରୀର ଗଢ଼ିବା ପାଇଁ ଆଜି ହିଁ ଯୋଡ଼ି ହୁଅନ୍ତୁ।",
    description: "High-performance training for a stronger, healthier and more disciplined you. World-class equipment, expert guidance and a community that pushes you forward in Balasore.",
    preHeadline: "STRENGTH  /  DISCIPLINE  /  RESULTS",
    mottoOdia: "ଶକ୍ତି । ଶୃଙ୍ଖଳା । ସଫଳତା",
    headlineLine1: "TRAIN HARDER.",
    headlineHighlight: "BECOME MORE.",
    heroBadge: "GRAND OPENING SOON IN BALASORE",
    heroBadgeOdia: "ବାଲେଶ୍ୱରରେ ଖୁବ୍ ଶୀଘ୍ର ଶୁଭାରମ୍ଭ",
    sqft: "15,000 SQ FT",
    foundingSlots: 150,
    heroImage: "/images/hero-gym.jpg",
    heroFallbackImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
  },

  heroHighlights: [
    {
      id: "access",
      icon: "Clock",
      value: "5 AM – 11 PM",
      label: "DAILY ACCESS"
    },
    {
      id: "equipment",
      icon: "Dumbbell",
      value: "ELITE",
      label: "EQUIPMENT"
    },
    {
      id: "levels",
      icon: "Users",
      value: "ALL LEVELS",
      label: "WELCOME"
    }
  ],

  featureCards: [
    {
      id: "strength-training",
      title: "Strength Training",
      description: "Premium equipment for serious progress.",
      image: "/images/card-strength.jpg",
      icon: "Dumbbell",
      targetSection: "facilities"
    },
    {
      id: "personal-coaching",
      title: "Personal Coaching",
      description: "Expert trainers to guide your journey.",
      image: "/images/card-coaching.jpg",
      icon: "UserCheck",
      targetSection: "trainers"
    },
    {
      id: "recovery-zone",
      title: "Recovery Zone",
      description: "Rest. Recover. Come back stronger.",
      image: "/images/card-recovery.jpg",
      icon: "Sparkles",
      targetSection: "facilities"
    }
  ],

  contact: {
    // Address as requested in design
    location: "Near Hero Showroom, Above Gayatri Vaishnavi Healthcare",
    locationOdia: "ହିରୋ ସୋରୁମ ନିକଟରେ, ଗାୟତ୍ରୀ ବୈଷ୍ଣବୀ ହେଲଥକେୟାର ଉପରେ",
    city: "Balasore, Odisha",
    cityOdia: "ବାଲେଶ୍ୱର, ଓଡ଼ିଶା",
    country: "India",
    pinCode: "756001",
    
    // Clean Indian contact numbers
    phonePrimary: "+91 98765 43210",
    phoneSecondary: "+91 98765 43211",
    displayPhones: "+91 98765 43210 / +91 98765 43211",
    
    // WhatsApp configuration
    whatsappNumber: "919876543210", // International format without '+' or '-'
    whatsappDefaultMessage: "ନମସ୍କାର RAMGOLD GYM! I would like to enquire about membership plans in Balasore.",
    supportNote: "ଓଡ଼ିଆ ଓ English ରେ ସହାୟତା ଉପଲବ୍ଧ (Odia & English Support Available)",
    
    // Email concierge
    email: "concierge@ramgoldgym.com",
    
    // Hours
    operatingHours: {
      weekdays: "05:00 AM – 11:00 PM",
      sunday: "05:00 AM – 11:00 PM",
      summary: "Mon–Sun: 05:00 AM – 11:00 PM (Morning 5 AM to Night 11 PM)",
      summaryOdia: "ପ୍ରତିଦିନ ସକାଳ ୫:୦୦ ରୁ ରାତି ୧୧:୦୦",
      badge: "Open Morning 5:00 AM to Night 11:00 PM"
    },

    // Social Media
    social: {
      instagram: "@ramgoldgym_official",
      instagramUrl: "#",
      facebookUrl: "#",
      youtubeUrl: "#",
    }
  },

  heroStats: [
    { value: "100%", label: "Competition Grade" },
    { value: "5 AM - 11 PM", label: "Daily Access" },
    { value: "150", label: "Founding Slots Only" }
  ],

  facilities: [
    {
      id: "zone-01",
      badge: "ZONE 01",
      title: "Strength Training",
      description: "Power racks & calibrated plates for heavy loads.",
      colSpan: "md:col-span-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMZ6IfoY2xbQdcQk7MhmdL7BzqydGgubYyQuHZVKHGsbp83li096-Ccfh9RMQiXdrb__7hxln6Tc0afinkCkOH6kYh6b2C7L7_BZce_A9R2EnRRsREGk1OSGgV8Wj1ImE08ufThlosUl0SO2xxAV8EJ5z0zIgfpBg4rK4l5u6J43VIg30jq956dzGY5Go4uIeIiQGVM4HD6wza056AMpJBE-Wkzfua2cI_Rv-XuBG_t-j-iBePwtGK",
      fallbackImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "zone-02",
      badge: "ZONE 02",
      title: "Free Weights",
      description: "Urethane dumbbells up to 100kg & specialty bars.",
      colSpan: "md:col-span-1 lg:col-span-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBDTjWztO3zThMZlpWYKPq3Q8Yclfm2-21GYttyp-G_ioUAPim0-Sd_drnL-0iM0JcWvMjQ2GM-i5GT-9x1Fi20KFJQ3eVoImbDOFE6spumtOEU1gbqBiM7t76n1MHb3EUJHkh-steTnazAQo9C31iJWNt1qTye6igkenRQVaTI3JJjoFr0RAZSwGo2a2BY6TpqaLVhAC4fWOUO-UhHli0EUypgYCVaDG4EN5AINeYj9nc-mukUW22",
      fallbackImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "zone-03",
      badge: "ZONE 03",
      title: "Functional",
      description: "Turf tracks, sleds & battle ropes.",
      colSpan: "md:col-span-1 lg:col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1AGccUoreHenF7RAhys_KsKi4HLZZUW2KC5SJCAHUTVI2BMAo5vP8R1TAKU6CQHzcinzWmBvwx6GxMaqmIf6nNi80lHxNERPPK_XX8FibHi72Y2ThoqwCuGKavSElC3sGkMtgrYtamIj55vlgGwDfLUjTLEtDChc8yDX-13jk1t804zp8zRXC6smsjtMA18jnU-iUY2RKzNRCIg7fvxxJK1p9BzLE7PcfA-MM3ePHMsBFGgwpJnfC",
      fallbackImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "zone-04",
      badge: "ZONE 04",
      title: "Cardio Zone",
      description: "Curved treadmills & high-output rowers.",
      colSpan: "md:col-span-1 lg:col-span-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-_dgqHLCfInMadM8rAPGxcxO1r1DDijjb1KXkVgbaoC8tsH4-DmszowsTIdfphuvAi2qu2-trXHQXZEjuzHP07uRp1R0zzURClHKc2fsOJqCFeejwk3HgZxf5V7u4x37QlIOuuxQWLNVGGFuxs80SMu4l8XNwFeECe8GO7gf7DV2_8kT0sHTrRGubSmWZi4YxSzHVND2LxiWPK-yO_zwv_YgkGEUjlgEHvkkBzJY0KrapCPE7uZr-",
      fallbackImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: "zone-05",
      badge: "ZONE 05",
      title: "Private PT",
      description: "Dedicated coaching suites & analytics.",
      colSpan: "md:col-span-1 lg:col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd56BKcpSIKB363BYlLgPYoP-WErCRkmjU-m10zKvZjOcgYQ3Zs6vMXF6qIyXwnwcJGPyCKohOKKhlOtfE5lJrKl4_nkMY9LOWXp8i0wGc6iglGJdL1vZ_yF_mq02YqyD0TFGk8TQYQfY6x5RWW99IqEpfij4jH2BSQTtofZvT6MGo0dx4w1GEAcSQFLDGTYmLpNyiEpZrPgUzCsDhnITa6q-ooSgY8ub4bKf1XvLpEZCBRt2_GOcx",
      fallbackImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
    }
  ],

  methodology: [
    {
      id: "strength",
      icon: "fitness_center",
      title: "BUILD STRENGTH",
      description: "Hypertrophy & raw power via progressive overload and compound movements.",
      protocolLinkText: "EXPLORE PROTOCOL"
    },
    {
      id: "endurance",
      icon: "bolt",
      title: "PUSH ENDURANCE",
      description: "High-intensity anaerobic conditioning to elevate VO2 max and stamina.",
      protocolLinkText: "EXPLORE PROTOCOL"
    },
    {
      id: "purpose",
      icon: "psychology",
      title: "TRAIN WITH PURPOSE",
      description: "Data tracking and custom nutrition guidance for measurable results.",
      protocolLinkText: "EXPLORE PROTOCOL"
    }
  ],

  membershipPlans: [
    {
      id: "monthly",
      badge: "FLEXIBLE",
      title: "MONTHLY",
      price: "₹1,800",
      period: "/ month",
      isPopular: false,
      isBestValue: false,
      features: [
        "Full gym & cardio floor access",
        "Clean locker & shower facility",
        "Initial fitness consultation",
        "Workout routine guidance"
      ]
    },
    {
      id: "quarterly",
      badge: "MOST POPULAR",
      title: "QUARTERLY",
      price: "₹4,800",
      period: "/ 3 months",
      isPopular: true,
      isBestValue: false,
      features: [
        "Full gym & cardio floor access",
        "Locker & shower facility",
        "Bi-weekly progress checks",
        "2 Free guest passes / month",
        "Priority batch reservation"
      ]
    },
    {
      id: "annual",
      badge: "ELITE COMMITMENT",
      title: "ANNUAL",
      price: "₹15,000",
      period: "/ year",
      isPopular: false,
      isBestValue: true,
      bestValueBadge: "BEST VALUE",
      features: [
        "Full gym & cardio floor access",
        "VIP locker access",
        "Free diet & nutrition chart",
        "Unlimited guest passes",
        "2 Free 1-on-1 personal training sessions"
      ]
    }
  ],

  trainers: [
    {
      name: "Vikram Malhotra",
      title: "HEAD STRENGTH COACH",
      specialty: "Powerlifting, Biomechanics & Hypertrophy Specialist (12+ Years).",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmH3CrxU6JyzC6f60HtI3ztpNrpoczdydTocB-S3T2VZshWG75XQ4_6gQIi1DSO7TACmEddBK1f2O1H49IRmNN5yHYaGPWk2WUEPZFaU_yYW5NZi89A3oTqS5TD3byyb8A0pOjh54GJGrf-jCOGdRb0ikdRAIXdowNmcu4MYo8c1cox3debS35eDEQGx6jL450gxWBQOgaQQgJ0JExBF_2YMjn3M9DcGo1A1yDfJFE201Dl_4wOUKr",
      fallbackImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Ananya Sharma",
      title: "SENIOR PERFORMANCE COACH",
      specialty: "Functional Conditioning, Athletic Agility & Injury Prevention.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOQ3mnza-DKdqtWUV1xgViYFaqsCrMYR9B3FE8wUiRmPB4VL7i9mM0wuS3OmXB_RlXPFSI-cqGTANIYFiNMlgajHhzszwqk6vkHpLoJS897kNhNiSG8ktX2Nn7ZM2BQrzEOCCGgmjAuIBGnBd7B4sDbAPVf1n84YgmYnmTEeHChjXlJurfyCGQiZYBEoIJF-z6jZfAsbeP1KQxicDqGvQmvj6GffFDSaipfY0nyXfgPGWQ-HelBgk9",
      fallbackImage: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Kabir Mehta",
      title: "METABOLIC SPECIALIST",
      specialty: "Advanced Body Composition & High-Intensity Interval Protocols.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfC9C-NkF-W0mbOxR_ggQ_eVJhbwifrvbQx15aDsS-nkCX3gDFKQ-k-it1045zhAMG_MoCiFfeGH1geZSLOhW81E0iXzPais0vaAGSPTnwKPqWwrBRtq1viNMdG25ChYeiHitPUXeq07G_kvZ8r2XpZKXvzDdZd-PwVuAAjNIY08FvvtvwyzIMr0z2SMLjQRjZcycH6GyBiUDsJCU1uADxu5NJYVCecxbvQZCcEtfxnFpUrknAG5fG",
      fallbackImage: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=800&auto=format&fit=crop"
    }
  ],

  gallery: [
    {
      id: 1,
      title: "Heavy Deadlift Platform",
      category: "Strength",
      colSpan: "md:col-span-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABHLLrKPX90_QtFu4ioOVhr7H2SPO7XvjDI9FtRM6y0UxLUUD4BuXcQteb0nJwtYSRC1RpTY-JygfyL-0tODkKi5DOhQeAfoGHi3YqPZaafruhENfNeI7aNSH6-EmOz5P32eg49C8ZtrrJKlma2AOGYlh56XgVBK8WPOrguhl5yOmINdZF6YVc-6NJktixZ5lL7IaI8foLnmzY8wPXBGa1zc7hLRN4UcQqBXKLPmbizUu4rgCZ4zDJ",
      fallbackImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      alt: "Action shot of a dedicated athlete executing a heavy deadlift"
    },
    {
      id: 2,
      title: "Matte Black Kettlebells",
      category: "Free Weights",
      colSpan: "col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7AXuN0nQAeL0vxxZ7W7ELVvubvlrfzLCw2EesosIsOa5jBTDprSr71GFS9EoEOmigEUa4Ncx7A2dYdeUKd6rhUHCn8JPexSZlj9mVUm4fQm6xS-uJUx3HKfz85lpi-yuk6mlULY5FSblMxz1d-ed9JPLZveCo4wvfRM0bwg-9g4EMBC9V5e_mPmOaLThGajgJ6iHIuRF3RFkgMgX24OCSrt6wbasg3xqXalYdKHCLgz0RZpxnG2QU",
      fallbackImage: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=800&auto=format&fit=crop",
      alt: "Close-up of a textured matte black kettlebell"
    },
    {
      id: 3,
      title: "Luxury Athletic Lounge",
      category: "Amenities",
      colSpan: "col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCODGexCWCyTjy6MbYNqx_O7MRwokn7-B5pAcCGzQCrIzt6q6cmxFergzJRVJ7t24s6QB3mB3EFUvS62e-4GdcoegTdu6gHkb1c1QHsg7y3ur7qu4TTkrm_RjzEML5-WCS5kWck4hiJQ8y4_Womo9QGc_MyMTtxpMXp5JH9lWInZJoz2_5A1EiSJEY7i5PYUnBmtCJRdynNXp6Vv-GvFomia67ls47tWH2wqK-AOLRmOAM_1cS5xUpT",
      fallbackImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
      alt: "Modern architectural interior shot of a luxury gym lounge"
    },
    {
      id: 4,
      title: "Curved Sprint Treadmills",
      category: "Cardio",
      colSpan: "col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdtE8gFd6hOjn_aBuZRulh8KNhttURAIjFlPMSVs80Izemp2BqsUxKBHafcQOk32UHcB3u5PZzfMTN_lIvyK9oSv34e3XemjwanS96WMoCMFZauP-KkJ7oFNlKaMY12KtMyTdpXBuk2xQ9gA4CTHDseswPz8lJiHADCsi6ukkocKYkKvixnN-x-3nprANZZEplqsweDYRuLJD9vtDzehDyoqM1rauCRAU-2jL75FcbWglVp4z4Pqx2",
      fallbackImage: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
      alt: "An athlete sprinting on a curved manual treadmill"
    },
    {
      id: 5,
      title: "Calibrated Dumbbell Sanctuary",
      category: "Free Weights",
      colSpan: "md:col-span-2",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4FiPXFzXRFQdyo0U7V6gciQ-dp5gycfvXu3Pw5cIcrvU0103qZqt2UhrOFStMKNQNr9EbsVVBpJIT8GZlfmSRrbcmWIQUvETGus6oUwldJjzTPiDF_wIlAa_wGNY4GuLNmqRsDlGf-ZdcoZ7UmEGAvMh48OfBzj2-nh3Np_awxchEpwf5fonmaoZa7ZzpLLlHOcHCtMYE60V00PL1vApp-r59crESWuFNMFUfypfuwcJZUhWagNPW",
      fallbackImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop",
      alt: "Wide environmental shot of the main dumbbell rack area"
    },
    {
      id: 6,
      title: "Chalk & Iron Grip",
      category: "Strength",
      colSpan: "col-span-1",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLVUfgl8jDoqbVQW6rqpGLqz49eSZ1gsWqqwTM53FWEJEr-dQx2qkjjyPuQFkyxF0rSBw6b45KjObSJmXZBGWegBcFbSZ2Fhlydn3fh0ZV1cWMbBLXK_1JT7JDYTFVzX6LzR0Pbf3BBECeSytFGcCQVGnYw-arWVz5C0QgfVf12-Ghfli4B1Hi7eNPEP-k_TVBpd3kModQoOLsUb2LrZ00eKXvM18VFbBLF5XELLX_SAD5yYp4h7eA",
      fallbackImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      alt: "Detailed shot of hands gripping heavy parallel bars"
    }
  ]
};
