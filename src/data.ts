import { MandiPriceItem, GovScheme, ForumPost, MarketplaceProduct } from "./types";

export const INITIAL_MANDI_PRICE_LIST: MandiPriceItem[] = [
  {
    id: "m-1",
    crop: "Wheat (Lok-1)",
    market: "Khanna Mandi",
    state: "Punjab",
    variety: "Sharbati / Lok-1",
    minPrice: 2150,
    maxPrice: 2350,
    modalPrice: 2275,
    change: "up",
    date: "2026-06-08"
  },
  {
    id: "m-2",
    crop: "Paddy (Basmati-1509)",
    market: "Karnal Mandi",
    state: "Haryana",
    variety: "Basmati",
    minPrice: 3800,
    maxPrice: 4250,
    modalPrice: 4100,
    change: "up",
    date: "2026-06-08"
  },
  {
    id: "m-3",
    crop: "Mustard Seed",
    market: "Alwar Mandi",
    state: "Rajasthan",
    variety: "Mustard Black",
    minPrice: 5100,
    maxPrice: 5450,
    modalPrice: 5300,
    change: "down",
    date: "2026-06-08"
  },
  {
    id: "m-4",
    crop: "Potato (Jyoti)",
    market: "Agra Mandi",
    state: "Uttar Pradesh",
    variety: "Jyoti",
    minPrice: 1200,
    maxPrice: 1550,
    modalPrice: 1400,
    change: "flat",
    date: "2026-06-08"
  },
  {
    id: "m-5",
    crop: "Onion (Nashik Red)",
    market: "Lasalgaon Mandi",
    state: "Maharashtra",
    variety: "Gavran / Red Onion",
    minPrice: 1600,
    maxPrice: 1950,
    modalPrice: 1850,
    change: "up",
    date: "2026-06-08"
  },
  {
    id: "m-6",
    crop: "Bt Cotton Long Staple",
    market: "Khandwa Mandi",
    state: "Madhya Pradesh",
    variety: "Bt Cotton",
    minPrice: 6500,
    maxPrice: 7200,
    modalPrice: 6900,
    change: "up",
    date: "2026-06-08"
  },
  {
    id: "m-7",
    crop: "Maize (Hybrid yellow)",
    market: "Dewas Mandi",
    state: "Madhya Pradesh",
    variety: "Yellow Hybrid",
    minPrice: 1900,
    maxPrice: 2150,
    modalPrice: 2050,
    change: "flat",
    date: "2026-06-08"
  },
  {
    id: "m-8",
    crop: "Soyabean (Yellow)",
    market: "Indore Mandi",
    state: "Madhya Pradesh",
    variety: "Soyabean-JS335",
    minPrice: 4200,
    maxPrice: 4600,
    modalPrice: 4450,
    change: "down",
    date: "2026-06-08"
  }
];

export const INITIAL_GOV_SCHEMES_LIST: GovScheme[] = [
  {
    id: "sch-1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "direct-benefit",
    benefits: "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 directly transferred to farmer savings accounts.",
    eligibility: "All small and marginal landholding farmer families who own arable land registers up to 2 hectares in any state.",
    documents: ["Aadhaar Card", "Land Registry Papers (Khatauni)", "Bank Account (Aadhaar linked)", "Mobile Number Verification"],
    fundingRatio: "100% Central Government Funded",
    status: "open",
    detailsLink: "https://pmkisan.gov.in/"
  },
  {
    id: "sch-2",
    name: "PM Fasal Bima Yojana (Crop Insurance Scheme)",
    category: "insurance",
    benefits: "Comprehensive insurance coverage against crop damage due to drought, unseasonal rains, pests, landslides, and storms. Premiums capped at 1.5% for Rabi, 2.0% for Kharif, and 5% for horticultural crops.",
    eligibility: "All sharecroppers and tenant farmers growing notified crops in notified administrative agricultural regions.",
    documents: ["Aadhaar Card", "Sowing Certificate", "Land Rent receipt or self-declaration for tenant farmers", "Bank Passbook"],
    fundingRatio: "50% State, 50% Central Government",
    status: "open",
    detailsLink: "https://pmfby.gov.in/"
  },
  {
    id: "sch-3",
    name: "Pradhan Mantri Krishi Sinchayee Yojana (Drip Irrigation Subsidy)",
    category: "subsidy",
    benefits: "Financial subsidy up to 55% for small/marginal farmers and 45% for other farmers to install micro-drip irrigation systems or water sprinkler systems, saving up to 40% water intake.",
    eligibility: "Farmers with registered water extraction rights or agricultural borewells. Self Help Groups and cooperatives are also highly prioritized.",
    documents: ["Land Ownership Docs", "Detailed layout plan of micro-irrigation system", "Quotation of registered vendor", "Piped line proof"],
    fundingRatio: "60% Central, 40% State cost sharing",
    status: "closing-soon",
    detailsLink: "https://pmksy.gov.in/"
  },
  {
    id: "sch-4",
    name: "Paramparagat Krishi Vikas Yojana (PKVY Organic Farming)",
    category: "organic",
    benefits: "Financial grant of ₹50,000 per hectare over 3 years. Includes standard PGS certification support, cost of organic fertilizers, vermicomposts, and bio-manure procurement.",
    eligibility: "Groups of at least 20 organic farmers willing to form high-volume clusters of minimum 50 acres.",
    documents: ["Aadhaar verification", "PGS group registration index", "Cluster outline coordinates", "Bank mandate details"],
    fundingRatio: "Government sponsored cluster scheme",
    status: "open",
    detailsLink: "https://pgsindia-dacfw.gov.in/"
  },
  {
    id: "sch-5",
    name: "Soil Health Card Scheme",
    category: "direct-benefit",
    benefits: "Provides free laboratory soil chemical tests assessing 12 parameters (N,P,K, Sulphur, Zinc, Iron, pH, Salinity etc.) with optimal structural crop-wise fertilizer dosage recommendations.",
    eligibility: "Every single landholding farmer in India is entitled to receive an updated Soil Health Card once in 2 years.",
    documents: ["Soil Sample Collection tag", "Aadhaar number", "Survey plot number"],
    fundingRatio: "100% Free Service",
    status: "open",
    detailsLink: "https://soilhealth.dac.gov.in/"
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: "post-1",
    author: "Ramesh Kumar",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=120",
    region: "Bathinda, Punjab",
    title: "Pink Bollworm infestation alert on Bt Cotton!",
    content: "I started detecting early signs of pink bollworms in my cotton flowers in sector 4. Flower petals look twisted like rosette flowers. Experts, please suggest immediate eco-friendly controls so it doesn't spread!",
    category: "Pest Warning",
    timestamp: "8 hours ago",
    likes: 24,
    comments: [
      {
        id: "c-1",
        author: "Dr. Anil Sharma",
        role: "expert",
        text: "Remove and bury rosette cotton flowers instantly. Install 5 pheromone traps (Pheromone luring pectinophora) per acre weekly to suppress male moth mating cycles. Spray botanical neem oil (1500 ppm at 5ml/litre) in evening.",
        timestamp: "5 hours ago"
      },
      {
        id: "c-2",
        author: "Sartaj Singh",
        role: "farmer",
        text: "Thanks Dr. Anil, I'm doing the same. Pheromone traps are available on our Digital Supplies marketplace for very cheap under government-approved organic inputs!",
        timestamp: "2 hours ago"
      }
    ],
    isExpertVerified: true
  },
  {
    id: "post-2",
    author: "Dr. Swati Deshmukh (Agri Research Institute)",
    role: "expert",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120",
    region: "Pune, Maharashtra",
    title: "Soil Micro-Nutrient Balance Advice for Monsoon Sowing",
    content: "Before sowing Sugarcane or Soybean this monsoon, ensure your Zinc and Boron values are adequate. 10kg Zinc Sulphate per acre mixed with organic vermicompost prevents early yellowing (Chlorosis) of crop foliage.",
    category: "Expert Advisory",
    timestamp: "1 day ago",
    likes: 42,
    comments: [],
    isExpertVerified: true
  },
  {
    id: "post-3",
    author: "Balram Reddy",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=120",
    region: "Anantapur, Andhra Pradesh",
    title: "How I saved 35% water and doubled Onion yields using drip tubes!",
    content: "Just wanted to share a small success story. I spent ₹45,000 on drip pipe lines and received ₹25,000 subsidy via PMKSY. This dry wind season, my onions were perfectly watered, bulb sizes are uniform and my weed growth dropped by 80%. Highly recommend every farmer buddies to apply now!",
    category: "Success Story",
    timestamp: "2 days ago",
    likes: 58,
    comments: [
      {
        id: "c-3",
        author: "Jyothi Rao",
        role: "farmer",
        text: "Outstanding achievement Balram! Which local vendor did you hire for the installation?",
        timestamp: "1 day ago"
      }
    ]
  }
];

export const INITIAL_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "p-1",
    name: "Pusa Bold Certified Mustard Seeds",
    category: "seeds",
    price: 490,
    unit: "5 Kg Bag",
    rating: 4.8,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=400",
    description: "High oil content (41%), certified organic by PGS-India. Highly tolerant to white rust and aphid populations.",
    brand: "National Seeds Corporation",
    inStock: true,
    ecoFriendly: true
  },
  {
    id: "p-2",
    name: "Neem Gold Slow-Release Bio-Fertilizer",
    category: "fertilizers",
    price: 750,
    unit: "20 Kg Sack",
    rating: 4.9,
    reviewsCount: 320,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400",
    description: "Naturally enriched neem seed processing cake acts both as standard organic nutrition and keeps subterranean nematodes away.",
    brand: "Varuna Organic Inputs",
    inStock: true,
    ecoFriendly: true
  },
  {
    id: "p-3",
    name: "Prithvi Micro-Drip Irrigation Starter Kit",
    category: "equipment",
    price: 2450,
    unit: "Coverage Level: 0.5 Acre",
    rating: 4.6,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1563514223300-b3b0c23a8507?auto=format&fit=crop&q=80&w=400",
    description: "Anti-clog drippers, inline tubes with flexible joints, and pressure locks. Perfectly eligible for agricultural sinchayee direct subsidies.",
    brand: "Prithvi Agrotech",
    inStock: true,
    ecoFriendly: true
  },
  {
    id: "p-4",
    name: "Pheromone Trap for Cotton Moths (Pack of 5)",
    category: "organic",
    price: 290,
    unit: "Pack of 5 Traps",
    rating: 4.7,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=400",
    description: "Chemically secure pheromone dispenser designed to trap male Pink Bollworms without spraying hazardous chemical insecticides. Safe for bees.",
    brand: "Ecosense Solutions",
    inStock: true,
    ecoFriendly: true
  },
  {
    id: "p-5",
    name: "Premium Earthworm Vermicompost",
    category: "fertilizers",
    price: 320,
    unit: "50 Kg Bag",
    rating: 4.9,
    reviewsCount: 450,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400",
    description: "100% decomposed organic earthworm compost. Stimulates crop root length and enriches soil porosity instantly.",
    brand: "Krishi Organic Farm",
    inStock: true,
    ecoFriendly: true
  },
  {
    id: "p-6",
    name: "Solar Insect Light Trap (Automated waterproof)",
    category: "equipment",
    price: 1850,
    unit: "Unit with Stand",
    rating: 4.8,
    reviewsCount: 55,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400",
    description: "Charges on solar rays during daylight, automatically switch-on lights under dark to attract and trap flying crop bugs.",
    brand: "SolTech Agriculture",
    inStock: false,
    ecoFriendly: true
  }
];
