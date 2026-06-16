import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sprout,
  TrendingUp,
  CloudSun,
  Camera,
  FileSpreadsheet,
  BookOpen,
  Users,
  ShoppingBag,
  Leaf,
  Settings,
  Menu,
  X,
  User,
  Sun,
  Moon,
  Bell,
  MapPin,
  CheckCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart,
  Grid,
  ShieldCheck,
  Search,
  ChevronRight,
  PlusCircle,
  ShoppingCart,
  Trash2,
  DollarSign,
  Droplet,
  AlertCircle
} from "lucide-react";
import { AppView, UserRole, CropRecommendationInput, CropRecommendationResult, DiseaseDiagnosisResult, MandiPriceItem, GovScheme, ForumPost, MarketplaceProduct } from "./types";
import { INITIAL_MANDI_PRICE_LIST, INITIAL_GOV_SCHEMES_LIST, INITIAL_FORUM_POSTS, INITIAL_MARKETPLACE_PRODUCTS } from "./data";
import { KisanMitraFloating } from "./components/KisanMitraFloating";
import { ElegantLineChart, ClusteredRevenueBarChart, RadialProgressGauge, EcoBadgeWidget, WeatherVisualIcon } from "./components/Widgets";
import { KrishiVaaniLogo } from "./components/KrishiVaaniLogo";

export default function App() {
  // Authentication & Premium Loading States
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loginPhone, setLoginPhone] = useState<string>("9876543210");
  const [loginPin, setLoginPin] = useState<string>("1234");
  const [loginError, setLoginError] = useState<string | null>(null);

  // Navigation & Theme States
  const [view, setView] = useState<AppView>("landing");
  const [userRole, setUserRole] = useState<UserRole>("farmer");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Dynamic Favicon Generation Hook using high-res vector logo parameters
  useEffect(() => {
    // Elegant SVG string matching our verified vector logo
    const svgString = `
      <svg xmlns="http://www.w3.org/2500/svg" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="95" fill="#FCF9F1" stroke="#0E3B20" stroke-width="7" />
        <circle cx="100" cy="100" r="62" fill="#FFA726" />
        <circle cx="100" cy="85" r="16" fill="#FFFDEF" />
        <polygon points="35,115 72,85 92,115" fill="#0E331A" />
        <polygon points="108,115 128,82 165,115" fill="#0B2A15" />
        {/* Curved Crop Rows */}
        <path d="M 100,120 C 85,120 40,125 35,160 Z" fill="#2E7D32" />
        <path d="M 100,120 C 115,120 160,125 165,160 Z" fill="#1C5E33" />
      </svg>
    `;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = url;
    
    // Auto-timeout splash screen loader for organic preview UX
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => {
      URL.revokeObjectURL(url);
      clearTimeout(splashTimer);
    };
  }, []);

  // App Master States
  const [mandiPrices, setMandiPrices] = useState<MandiPriceItem[]>(INITIAL_MANDI_PRICE_LIST);
  const [govSchemes, setGovSchemes] = useState<GovScheme[]>(INITIAL_GOV_SCHEMES_LIST);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [marketplaceProducts] = useState<MarketplaceProduct[]>(INITIAL_MARKETPLACE_PRODUCTS);
  const [shoppingCart, setShoppingCart] = useState<Array<{ product: MarketplaceProduct; count: number }>>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // AI Growth Milestone Notification States
  const [hasCropMilestoneAlert, setHasCropMilestoneAlert] = useState<boolean>(true);
  const [showMilestoneDetail, setShowMilestoneDetail] = useState<boolean>(false);
  const [activeMilestoneName, setActiveMilestoneName] = useState<string>("Peak Flowering & Square Boll Transition");
  const [activeCropCycleDays, setActiveCropCycleDays] = useState<number>(68);
  const [appliedIrrigationGuideline, setAppliedIrrigationGuideline] = useState<boolean>(false);
  
  // Crop planner inputs & results
  const [plannerInput, setPlannerInput] = useState<CropRecommendationInput>({
    location: "Bathinda, Punjab",
    soilType: "clay-loam",
    waterAvailability: "high",
    farmSize: "3",
    season: "Kharif (Monsoon)"
  });
  const [plannerLoading, setPlannerLoading] = useState<boolean>(false);
  const [plannerResult, setPlannerResult] = useState<CropRecommendationResult | null>(null);

  // Disease scanner inputs & results
  const [selectedLeafImage, setSelectedLeafImage] = useState<string | null>(null);
  const [diseaseLoading, setDiseaseLoading] = useState<boolean>(false);
  const [diseaseResult, setDiseaseResult] = useState<DiseaseDiagnosisResult | null>(null);

  // Profit Calculator States
  const [profitIn, setProfitIn] = useState({
    seedCost: 4500,
    fertilizerCost: 6000,
    laborCost: 12000,
    waterCost: 2000,
    equipmentCost: 3500,
    transportCost: 3000,
    expectedPricePerQuintal: 2275,
    expectedYieldQuintals: 22
  });

  // Schemes checker state
  const [schemeQuery, setSchemeQuery] = useState({
    landSize: "small", // "marginal" | "small" | "large"
    isOrganic: false,
    cropCategory: "all"
  });
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);
  const [showApplyModal, setShowApplyModal] = useState<GovScheme | null>(null);
  const [aadhaarInput, setAadhaarInput] = useState("");

  // Mandi Filter
  const [mandiSearch, setMandiSearch] = useState("");
  const [mandiStateFilter, setMandiStateFilter] = useState("all");

  // Community State
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<"Crop Management" | "Pest Warning" | "Market Help" | "Success Story">("Crop Management");
  const [postCommentInput, setPostCommentInput] = useState<Record<string, string>>({});

  // Market Filters
  const [marketCategory, setMarketCategory] = useState<"all" | "seeds" | "fertilizers" | "equipment" | "organic">("all");
  const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState<boolean>(false);

  // Notification Feed list
  const [notifications, setNotifications] = useState([
    { id: "n-1", text: "🚨 Pest Warning: Pink Bollworm detected on Cotton in Rajasthan border.", unread: true },
    { id: "n-2", text: "🌤️ Monsoon advisories: Sump storage pipes are eligible for 55% PMKSY subsidies.", unread: true },
    { id: "n-3", text: "📈 Mandi peak: Basmati paddy prices grew by ₹250/Quintal in Khanna market today.", unread: false }
  ]);
  const [showNotificationList, setShowNotificationList] = useState(false);

  // Sync dark class on body element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Demo Preset images for Leaf checker
  const PRESET_LEAF_IMAGES = [
    {
      title: "Tomato Leaf Blight Indicator",
      src: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=300",
      alt: "Blight spots leaflet image"
    },
    {
      title: "Cotton Rosette Infestation",
      src: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=300",
      alt: "Pest warning leaf image"
    },
    {
      title: "Gleaming Rice Leaf",
      src: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=300",
      alt: "Healthy leaf tissue image"
    }
  ];

  // Quick setup of simulation planners on startup
  useEffect(() => {
    runCropPlannerSimulation();
  }, []);

  const runCropPlannerSimulation = async () => {
    setPlannerLoading(true);
    try {
      const res = await fetch("/api/gemini/crop-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plannerInput)
      });
      const data = await res.json();
      setPlannerResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setPlannerLoading(false);
    }
  };

  const handleLeafSelect = (imgSrc: string) => {
    setSelectedLeafImage(imgSrc);
    setDiseaseResult(null);
  };

  const runDiseaseDiagnosisSimulation = async () => {
    if (!selectedLeafImage) return;
    setDiseaseLoading(true);
    try {
      const res = await fetch("/api/gemini/disease-diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: selectedLeafImage })
      });
      const data = await res.json();
      setDiseaseResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDiseaseLoading(false);
    }
  };

  // Add to cart
  const addToCart = (product: MarketplaceProduct) => {
    setShoppingCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { product, count: 1 }];
    });
  };

  // Profit calculations
  const totalInvestment = 
    profitIn.seedCost + 
    profitIn.fertilizerCost + 
    profitIn.laborCost + 
    profitIn.waterCost + 
    profitIn.equipmentCost + 
    profitIn.transportCost;

  const expectedRevenue = profitIn.expectedYieldQuintals * profitIn.expectedPricePerQuintal;
  const netProfit = expectedRevenue - totalInvestment;
  const roiPercent = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;

  // Eligibility scores for schemes
  const filteredSchemes = govSchemes.filter((sch) => {
    if (schemeQuery.isOrganic && sch.category !== "organic" && sch.category !== "direct-benefit") return false;
    if (schemeQuery.landSize === "large" && sch.category === "direct-benefit") return false; // PM KISAN is for small holdings
    if (schemeQuery.cropCategory !== "all") {
      const isInsurance = sch.category === "insurance";
      if (!isInsurance && schemeQuery.cropCategory === "cotton") return true;
    }
    return true;
  });

  const handleApplySchemeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showApplyModal || !aadhaarInput) return;
    setAppliedSchemes((prev) => [...prev, showApplyModal.id]);
    setAadhaarInput("");
    setShowApplyModal(null);
  };

  // Post Discussion Forum Submit
  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      author: userRole === "farmer" ? "Ramesh Kumar" : (userRole === "expert" ? "Dr. Anil Sharma" : "Lalit Patil (Admin)"),
      role: userRole,
      avatar: userRole === "expert" 
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
        : "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=120",
      region: "Bathinda, Punjab",
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      isExpertVerified: userRole === "expert"
    };

    setForumPosts((prev) => [newPost, ...prev]);
    setNewPostTitle("");
    setNewPostContent("");
  };

  const handleLikePost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const liked = !post.likedByCurrentUser;
          return {
            ...post,
            likedByCurrentUser: liked,
            likes: liked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const text = postCommentInput[postId];
    if (!text || !text.trim()) return;

    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `c-${Date.now()}`,
                author: userRole === "farmer" ? "Ramesh Kumar" : "Agriculture Expert Partner",
                role: userRole,
                text: text,
                timestamp: "Just now"
              }
            ]
          };
        }
        return post;
      })
    );

    setPostCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-50 bg-gradient-to-br from-emerald-900 via-[#0A2F1D] to-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none ${darkMode ? "dark" : ""}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 flex flex-col items-center animate-fade-in"
        >
          {/* Centered pulsing vector logo */}
          <div className="relative p-6 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-md shadow-2xl animate-pulse" style={{ animationDuration: "2.5s" }}>
            <KrishiVaaniLogo size={120} />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-[40.5px] blur-xl opacity-20 pointer-events-none" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight font-display bg-gradient-to-r from-emerald-400 via-amber-200 to-green-300 bg-clip-text text-transparent">
              DIGITAL KRISHIVAANI
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-400/90 font-mono">
              Farmer 1st Choice • Smart Sustainable Sowing
            </p>
          </div>

          <div className="max-w-xs text-center space-y-4 pt-4">
            <div className="w-52 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-300 rounded-full"
              />
            </div>
            <p className="text-[10px] text-emerald-555/80 font-mono animate-pulse">
              Syncing live APMC Mandi price lists & agricultural metrics...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 transition-colors duration-350 ${darkMode ? "dark" : ""}`}>
        <div className="absolute inset-0 bg-[radial-gradient(#2e7d32_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06] dark:opacity-[0.12] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Soft background glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Centered logo */}
          <div className="text-center space-y-4 mb-7 animate-fade-in">
            <div className="inline-block p-4 bg-[#FCF9F1] dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-sm transform hover:scale-105 transition duration-300">
              <KrishiVaaniLogo size={90} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display tracking-tight">
                Digital KrishiVaani Portal
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Enter your secure credential to access Farmer Decision matrices
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Phone input */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono select-none">
                Mobile Number
              </label>
              <input
                type="tel"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                placeholder="Enter 10-digit mobile"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-semibold text-slate-800 dark:text-slate-100 font-mono"
              />
            </div>

            {/* PIN input */}
            <div className="space-y-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono select-none">
                Secure PIN
              </label>
              <input
                type="password"
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                placeholder="Default 1234"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-semibold text-slate-800 dark:text-slate-100 font-mono"
                maxLength={4}
              />
            </div>

            {/* Role select */}
            <div className="space-y-2 pt-1">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 block font-mono select-none">
                Select Sign In Profile
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "farmer", label: "Farmer Ramesh", emoji: "👨‍🌾" },
                  { id: "expert", label: "Lab Expert", emoji: "🧑‍🔬" },
                  { id: "admin", label: "Platform Admin", emoji: "🏛️" }
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => {
                      setUserRole(role.id as UserRole);
                      if (role.id === "farmer") setLoginPhone("9876543210");
                      if (role.id === "expert") setLoginPhone("9988776655");
                      if (role.id === "admin") setLoginPhone("9900112233");
                    }}
                    className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                      userRole === role.id
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 font-black scale-[1.02]"
                        : "border-slate-150 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-500 text-[10.5px] font-bold"
                    }`}
                  >
                    <span className="text-md leading-none">{role.emoji}</span>
                    <span className="text-[9px] leading-tight block truncate w-full">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {loginError && (
              <p className="text-[10.5px] font-semibold text-rose-500 text-center select-none">
                ⚠️ {loginError}
              </p>
            )}

            {/* Submit btn */}
            <button
              onClick={() => {
                if (loginPin === "1234") {
                  setLoginError(null);
                  setIsLoggedIn(true);
                  setView("landing");
                } else {
                  setLoginError("Invalid credentials. Try PIN 1234.");
                }
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer select-none text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 mt-2 shadow-md shadow-emerald-500/10"
            >
              Access Sustainable Sowing HUB <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center select-none">
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">
              🛡️ Punjab Agrisecure Protocol • Government Informatics Center
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      
      {/* -----------------------------------------------------------------------------
          TOP BAR & NAVIGATION CONTROLS
          ----------------------------------------------------------------------------- */}
      <header id="main-header" className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg lg:hidden"
            title="Toggle Menu Menu"
          >
            <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          
          <div 
            onClick={() => setView("landing")} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <KrishiVaaniLogo size={36} className="group-hover:rotate-6 transition-all duration-300" />
            <div>
              <h1 className="text-md sm:text-lg font-black tracking-tight text-emerald-800 dark:text-emerald-400 font-display">
                Digital KrishiVaani
              </h1>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono hidden sm:block">
                Smart Sustainable Farming
              </span>
            </div>
          </div>
        </div>

        {/* Live Metrics - Clock, Role selector, Theme switcher, Cart & notifications */}
        <div className="flex items-center gap-2.5">
          
          {/* UTC Clock */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200/55 dark:border-slate-700 rounded-full text-[10px] text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>UTC 2026-06-08 16:15</span>
          </div>

          {/* Role selector block */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 p-1 rounded-xl">
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-505 px-2 hidden lg:inline select-none">
              Role:
            </span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="text-xs bg-white dark:bg-slate-900 border-0 outline-none text-slate-700 dark:text-slate-200 font-semibold py-1 px-2 rounded-lg cursor-pointer"
            >
              <option value="farmer">Farmer Ramesh 👨‍🌾</option>
              <option value="expert">Lab Expert Anil 🧑‍🔬</option>
              <option value="admin">Platform Admin 🏛️</option>
            </select>
          </div>

          {/* Theme toggler */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-150 dark:border-slate-700 rounded-xl transition text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Notification dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationList(!showNotificationList)}
              className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-slate-700 rounded-xl transition text-slate-600 dark:text-slate-300 cursor-pointer relative"
              title="Notifications feed"
            >
              <Bell className="w-4 h-4" />
              {notifications.some(n => n.unread) && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </button>
            
            {showNotificationList && (
              <div className="absolute right-0 mt-2.5 w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in text-xs space-y-2 text-slate-800">
                <div className="flex items-center justify-between border-b pb-2 mb-1 border-slate-100 dark:border-slate-800">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200">Advisories & Alerts</h4>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                    className="text-[10px] text-emerald-600 hover:underline cursor-pointer"
                  >
                    Mark read
                  </button>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className={`p-2 rounded-xl transition border ${n.unread ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100" : "bg-slate-500/5 border-transparent"}`}>
                    <p className="text-slate-700 dark:text-slate-300 leading-tight">{n.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart trigger button */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="p-2 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800 rounded-xl transition relative cursor-pointer"
            title="Shopping cart supplies"
          >
            <ShoppingCart className="w-4 h-4" />
            {shoppingCart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-mono font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {shoppingCart.reduce((acc, c) => acc + c.count, 0)}
              </span>
            )}
          </button>

          {/* Secure Logout Portal Lock */}
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setLoginError(null);
            }}
            className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-955/20 hover:text-rose-600 border border-slate-150 dark:border-slate-700 rounded-xl transition text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Secure Portal Logout"
          >
            <User className="w-4 h-4" />
          </button>

        </div>
      </header>

      <div className="flex">
        
        {/* -----------------------------------------------------------------------------
            SIDEBAR DRAWERS / NAVIGATION (DESKTOP + RESPONSIVE MOBILE)
            ----------------------------------------------------------------------------- */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-white dark:bg-slate-900 min-h-[calc(100vh-65px)] border-r border-slate-150 dark:border-slate-850 p-4 shrink-0 flex flex-col justify-between`}
        >
          {/* Main options lists */}
          <div className="space-y-6">
            
            {/* Sidebar Brand Header Banner with Logo */}
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 select-none">
              <KrishiVaaniLogo size={42} />
              <div>
                <h2 className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider">
                  Digital KrishiVaani
                </h2>
                <span className="text-[9px] text-slate-400 font-semibold font-mono block">
                  Farmer Hub Panel
                </span>
              </div>
            </div>

            {/* Direct Dashboard Link */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-2 block mb-2 select-none">
                AgriTech Core
              </span>
              <nav className="space-y-1.5">
                {[
                  { id: "dashboard", label: "Dashboard Hub", icon: Grid },
                  { id: "planner", label: "AI Crop Planner", icon: Sprout, isAi: true },
                  { id: "disease", label: "Disease scanner", icon: Camera, isAi: true },
                  { id: "weather", label: "Weather Forecast", icon: CloudSun },
                  { id: "market", label: "Mandi Prices", icon: TrendingUp },
                  { id: "profit", label: "ROI Calculator", icon: FileSpreadsheet },
                  { id: "schemes", label: "Govt Schemes", icon: BookOpen },
                  { id: "community", label: "Farmer Forums", icon: Users },
                  { id: "supplies", label: "Supplies Market", icon: ShoppingBag },
                  { id: "sustainability", label: "Eco Tracker", icon: Leaf },
                  { id: "analytics", label: "Platform Analytics", icon: BarChart }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setView(item.id as AppView);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition cursor-pointer select-none ${
                        view === item.id
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/10"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.isAi && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${view === item.id ? "bg-emerald-800 text-amber-300" : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"}`}>
                          AI
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

          </div>

          {/* Quick legal stats / app footer */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 space-y-2.5 select-none">
            <div className="flex items-center gap-2">
              <KrishiVaaniLogo size={24} />
              <div>
                <p className="font-extrabold text-slate-500 dark:text-slate-400 leading-none">Digital KrishiVaani v1.2</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-500 text-[9px] mt-0.5">Empowering 20k+ Indian Farmers</p>
              </div>
            </div>
            <p className="leading-relaxed">Integrated real-time decision matrices & crop matching protocols active.</p>
          </div>
        </aside>

        {/* -----------------------------------------------------------------------------
            MAIN CONTENT AREA
            ----------------------------------------------------------------------------- */}
        <main className="flex-1 min-h-[calc(100vh-65px)] p-4 sm:p-6 overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* -----------------------------------------------------------------------------
                1. LANDING PAGE VIEW
                ----------------------------------------------------------------------------- */}
            {view === "landing" && (
              <motion.section
                key="landing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-16 animate-fade-in"
              >
                {/* Hero section banner */}
                <div className="grid lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-[32px] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
                  {/* Glowing background shapes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold leading-none border border-white/15">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Next-Gen Smart AgriTech Web System</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-[1.1]">
                      Smart Farming <br />Starts Here
                    </h2>

                    <p className="text-white/85 text-sm sm:text-md font-medium max-w-xl leading-relaxed">
                      Transform your harvests using our powerful Gemini AI agronomy advisor, localized mandi price forecasts, water-saving trackers, and state scheme guides in one beautiful responsive SaaS dashboard.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setView("dashboard")}
                        className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 hover:shadow-lg transition font-extrabold rounded-2xl text-xs sm:text-sm tracking-wide cursor-pointer select-none flex items-center gap-2"
                      >
                        Launch Farmer Dashboard <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setView("supplies")}
                        className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-extrabold rounded-2xl text-xs sm:text-sm border border-white/20 transition cursor-pointer select-none"
                      >
                        Browse Digital Supplying
                      </button>
                    </div>
                  </div>

                  {/* Clean responsive right graphic representation panel */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-sm bg-white/10 p-5 rounded-3xl border border-white/20 relative backdrop-blur-sm shadow-inner space-y-4">
                      <div className="flex items-center justify-between border-b border-white/15 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 bg-amber-400 rounded-full animate-ping" />
                          <span className="text-xs font-bold font-mono">LIVE SOIL STATUS</span>
                        </div>
                        <span className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded-full font-bold">PUNJAB ZONE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-white/5">
                          <p className="text-[10px] text-white/70">Organic Carbon</p>
                          <p className="text-lg font-black text-amber-300 font-mono">0.68%</p>
                        </div>
                        <div className="bg-emerald-950/30 p-3.5 rounded-2xl border border-white/5">
                          <p className="text-[10px] text-white/70">Nitrogen Index</p>
                          <p className="text-lg font-black text-green-300 font-mono">Adequate</p>
                        </div>
                      </div>
                      <div className="bg-emerald-900/40 p-3 rounded-2xl flex items-center justify-between gap-3 text-[11px] font-semibold border border-green-500/20">
                        <span>Pest alert levels: Green (Very Low)</span>
                        <ShieldCheck className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key statistics grid section */}
                <div className="space-y-4">
                  <h3 className="text-md font-black uppercase tracking-wider text-slate-400 text-center select-none">
                    Digital KrishiVaani Measured Impacts
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { val: "20-25%", title: "Yield Incremental Gain", desc: "Via precision crop planner guidelines.", color: "text-emerald-600 dark:text-emerald-400" },
                      { val: "35-40%", title: "Income Incremental Growth", desc: "Avoiding intermediates through mandi analytics.", color: "text-blue-600 dark:text-blue-400" },
                      { val: "30%", title: "Agricultural Water Conserved", desc: "Sowing drip irrigation and smart cycles.", color: "text-teal-600 dark:text-teal-400" },
                      { val: "50%+", title: "More Welfare Schemes Linked", desc: "With automated eligibility checking tools.", color: "text-amber-600 dark:text-amber-400" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-5 rounded-2xl text-center shadow-xs">
                        <p className={`text-2xl sm:text-3xl font-black font-mono ${stat.color}`}>{stat.val}</p>
                        <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1">{stat.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{stat.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature illustration tiles */}
                <div className="space-y-6">
                  <h3 className="text-lg font-black tracking-tight text-slate-800 dark:text-slate-200">
                    Innovative Farmer Tools Built-In
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: Sprout, dest: "planner", title: "AI Crop Suitability", desc: "Soil & Water recommendation suite" },
                      { icon: Camera, dest: "disease", title: "Disease Check", desc: "AI diagnosis and natural prevention sprays" },
                      { icon: TrendingUp, dest: "market", title: "Mandi Price Alerts", desc: "Real-time crop rates dynamic pricing charts" },
                      { icon: BookOpen, dest: "schemes", title: "Subsidy Finder", desc: "Instant PM-KISAN matching questionnaires" }
                    ].map((feat, idx) => {
                      const Icon = feat.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => setView(feat.dest as AppView)}
                          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl cursor-pointer group transition shadow-sm relative overflow-hidden"
                        >
                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl inline-block group-hover:scale-105 transition duration-300">
                            <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mt-4 flex items-center justify-between">
                            {feat.title} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                          </h4>
                          <p className="text-xs text-slate-400 mt-1">{feat.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Landing page elegant Footer Branding with Official Logo */}
                <div className="pt-12 border-t border-slate-100 dark:border-slate-800/80 select-none">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                    <div className="space-y-3">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                        <KrishiVaaniLogo size={48} />
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider font-display">
                            Digital KrishiVaani
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold block">
                            Integrated AgriTech Informatics Portal
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                        Transforming sustainable rural livelihood metrics across Punjab holdings via advanced real-time decision indexes and APMC Mandi trends.
                      </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start text-xs space-y-1 text-slate-500 dark:text-slate-400 font-semibold">
                      <p className="text-emerald-700 dark:text-emerald-500 uppercase tracking-widest text-[9px] font-black font-mono">Platform Nodes</p>
                      <p>• Apex AI Recommendation Grid</p>
                      <p>• Organic Sowing Advisory Active</p>
                      <p>• PMKSY Centrally Sponsored Holdings</p>
                    </div>

                    <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl flex flex-col items-center text-center space-y-1 text-[10.5px]">
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">Verified Farmer Trust Core</span>
                      <span className="text-slate-400">ISO 27001 • Punjab Agronomy Council</span>
                      <span className="text-[9px] font-extrabold text-emerald-600 mt-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full select-none">Farmer Choice Approved ✅</span>
                    </div>
                  </div>
                </div>

              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                2. DASHBOARD HUB / GENERAL OVERVIEW
                ----------------------------------------------------------------------------- */}
            {view === "dashboard" && (
              <motion.section
                key="dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100"
              >
                {/* Bento Grid Layout Wrapper */}
                <div id="dashboard-bento" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  
                  {/* CARD 1: MAIN PLOT STATUS (Welcome & Active Crop info) - col-span-2 */}
                  <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-3xl shadow-xs relative overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:shadow-md flex flex-col justify-between min-h-[220px]">
                    
                    {/* Glowing pulsate top-right action badge for AI milestone detection */}
                    {hasCropMilestoneAlert && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMilestoneDetail(true);
                        }}
                        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[9.5px] font-black uppercase px-2.5 py-1.5 rounded-full shadow-lg shadow-rose-500/30 animate-bounce select-none cursor-pointer border border-rose-500"
                        title="AI detected important crop development transition! Click to inspect"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span>AI Milestone Detcted 🔔</span>
                      </div>
                    )}

                    <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-550 font-mono">
                        <span className={`w-2.5 h-2.5 rounded-full ${hasCropMilestoneAlert ? "bg-rose-500 animate-ping" : "bg-emerald-500"}`} />
                        <span>Live IoT Plot Sowing Monitoring</span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100 font-display tracking-tight">
                          Welcome Back, Ramesh Kumar! 🌾
                        </h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          Acre Assignment: <span className="font-semibold text-slate-600 dark:text-slate-400">Bathinda Sector 4</span> • Deep loamy clay matrix • Crop health stable
                        </p>
                      </div>

                      <div className="pt-1 flex flex-wrap gap-2">
                        <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-100 dark:border-emerald-800/40 px-3 py-1.5 rounded-xl">
                          Sowing: <strong className="font-extrabold">Bt Cotton Var-5</strong>
                        </span>
                        <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/35 border border-amber-100 dark:border-amber-800/40 px-3 py-1.5 rounded-xl">
                          Maturity stage: <strong className="font-extrabold">{hasCropMilestoneAlert ? "Transitioning to Bloom" : "Peak Flowering"}</strong>
                        </span>

                        {/* Interactive Growth Milestone detail trigger button */}
                        <button
                          onClick={() => setShowMilestoneDetail(true)}
                          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-left cursor-pointer select-none ${
                            hasCropMilestoneAlert
                              ? "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-250 dark:border-rose-900/40 hover:scale-[1.02] shadow-sm"
                              : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30 hover:scale-[1.02]"
                          }`}
                        >
                          {hasCropMilestoneAlert ? (
                            <>
                              <Sparkles className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 animate-spin" style={{ animationDuration: "5s" }} />
                              <span className="animate-pulse">View Growth Milestone</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Milestone Logs Applied</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 dark:text-slate-500 pt-3.5 mt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-emerald-700 dark:text-emerald-500">Agri: Organic Neem Sprinklers active</span>
                        {!hasCropMilestoneAlert && (
                          <button
                            onClick={() => {
                              setHasCropMilestoneAlert(true);
                              setAppliedIrrigationGuideline(false);
                            }}
                            className="text-[9.5px] font-black text-amber-600 dark:text-amber-500 hover:underline hover:text-amber-700 cursor-pointer ml-1.5"
                            title="Re-simulate detecting another seedling growth spurt or flowering milestone for inspection"
                          >
                            [Re-Simulate Milestone]
                          </button>
                        )}
                      </div>
                      <button 
                        onClick={() => setView("planner")}
                        className="text-emerald-600 dark:text-emerald-500 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                      >
                        Launch AI Advisor <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* CARD 2: PREMIUM WEATHER SNAPSHOT WITH GRADIENT - col-span-1 */}
                  <div className="col-span-1 bg-gradient-to-br from-sky-400 to-blue-600 p-6 rounded-3xl text-white shadow-lg shadow-blue-500/10 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between min-h-[220px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-sky-100 font-mono">Mandi Climate Desk</span>
                        <h4 className="text-3xl font-black font-mono leading-none tracking-tight">31°C</h4>
                        <p className="text-xs font-bold text-sky-50 mt-1">Clear Sunny, Bathinda Punjab</p>
                      </div>
                      <div className="p-2 bg-white/15 rounded-2xl border border-white/20 shadow-inner">
                        <CloudSun className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3.5 border-t border-white/10 text-xs">
                      <div className="flex justify-between text-sky-100/90 text-[11px]">
                        <span>Humidity: 54%</span>
                        <span>Wind speed: 14 km/h West</span>
                      </div>
                      <div className="text-[10px] font-semibold text-amber-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                        <span>Sowing warning: Storm anticipated June 10</span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: REGIONAL MANDI LIVE PRICES LIST - col-span-1 spans 2 rows */}
                  <div className="col-span-1 row-span-1 md:row-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-3xl shadow-xs transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[460px]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/50 pb-3">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 font-display">Mandi Indices</h4>
                          <span className="text-[10px] text-slate-400 font-mono">Live APMC Modal Rates</span>
                        </div>
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div className="space-y-3 pt-1">
                        {mandiPrices.slice(0, 5).map((item) => (
                          <div key={item.id} className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/20 pb-2.5 text-xs last:border-b-0">
                            <div>
                              <p className="font-extrabold text-slate-850 dark:text-slate-200">{item.crop}</p>
                              <p className="text-[10px] text-slate-400">{item.market} ({item.state})</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold font-mono text-emerald-700 dark:text-emerald-400">₹{item.modalPrice}/Q</p>
                              <span className={`text-[9px] font-bold ${item.change === "up" ? "text-emerald-600" : "text-slate-400"}`}>
                                {item.change === "up" ? "▲ +4.5%" : "● Flat"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setView("market")}
                      className="w-full mt-4 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-slate-200/40 dark:border-transparent transition-all cursor-pointer"
                    >
                      Browse full Mandi Prices <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* CARD 4: ECO STRENGTH SHIELD STATUS - col-span-1 */}
                  <div className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-3xl shadow-xs transition-all duration-300 hover:scale-[1.01] hover:shadow-md flex flex-col justify-center">
                    <EcoBadgeWidget score={88} />
                  </div>

                  {/* CARD 5: WATER RETENTION DRY INDEX - col-span-1 */}
                  <div className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-3xl shadow-xs transition-all duration-300 hover:scale-[1.01] hover:shadow-md flex flex-col justify-center">
                    <RadialProgressGauge value={85} label="Conservation ratio" subtitle="Drip Sowing Installed" />
                  </div>

                  {/* CARD 6: ROI PROFITABILITY ACCELERATOR CARD - col-span-1 */}
                  <div className="col-span-1 bg-[#2E7D32] p-6 rounded-3xl text-white shadow-lg shadow-emerald-800/20 relative overflow-hidden group transition-all duration-300 hover:scale-[1.01] hover:shadow-xl flex flex-col justify-between min-h-[200px]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-green-150 font-mono">Cash Flow Projected</span>
                      <h4 className="text-3xl font-black font-mono tracking-tight leading-none">₹78,000</h4>
                      <p className="text-xs font-semibold text-green-50 mt-1">Expected Sowing Net Returns</p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-white/10 flex justify-between items-center text-[11px]">
                      <span className="text-yellow-300 font-bold bg-emerald-900/40 px-2.5 py-1 rounded-lg">ROI forecast: +18.5%</span>
                      <button 
                        onClick={() => setView("profit")}
                        className="text-white hover:underline font-bold"
                      >
                        Cost Model
                      </button>
                    </div>
                  </div>

                  {/* CARD 7: GOVERNMENT PM-RELIEF SUBSIDY BLOCK - col-span-1 */}
                  <div className="col-span-1 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-205/80 dark:border-amber-900/40 p-6 rounded-3xl shadow-xs transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between min-h-[220px]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-extrabold text-[10px] uppercase tracking-wider font-mono">
                        <BookOpen className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
                        <span>Central Subsidies</span>
                      </div>
                      <h4 className="font-extrabold text-[13px] text-slate-900 dark:text-slate-100 leading-tight">Solar Water Micro Pumps</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                        Under-3 Hectare small land holdings qualify for 55% direct financial compensation under PMKSY. 
                      </p>
                    </div>

                    <button 
                      onClick={() => setView("schemes")}
                      className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-xl text-xs transition duration-200 cursor-pointer text-center"
                    >
                      Verify Eligibility Now
                    </button>
                  </div>

                  {/* CARD 8: HISTORICAL COMPARISONS YIELD PLOT (Sowing lines) - col-span-1 md:col-span-2 lg:col-span-3 */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-3xl shadow-xs transition-all duration-300 hover:scale-[1.01] hover:shadow-md space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-805 pb-3">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 font-display">Crop Sowing Multi-Year Production</h4>
                        <span className="text-[10px] text-slate-400">Total historical yield per acre in Quintals (Wheat & Cotton)</span>
                      </div>
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>

                    <ElegantLineChart
                      data={[
                        { label: "2022", value: 14 },
                        { label: "2023", value: 16 },
                        { label: "2024", value: 15 },
                        { label: "2025", value: 19 },
                        { label: "2026", value: 22 }
                      ]}
                    />
                  </div>

                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                3. AI CROP RECOMMENDATION PAGE / PLANNER
                ----------------------------------------------------------------------------- */}
            {view === "planner" && (
              <motion.section
                key="planner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <Sprout className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Soil-Based AI Crop Recommendation
                      </h2>
                      <p className="text-xs text-slate-400">
                        Query the server-side Gemini 3.5 engine to decide logical crop choices depending on regional weather patterns.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left parameter inputs card */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Farm Parameters & Conditions
                    </h3>
                    
                    <div className="space-y-3.5 text-xs">
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Location / Region</label>
                        <input
                          type="text"
                          value={plannerInput.location}
                          onChange={(e) => setPlannerInput({ ...plannerInput, location: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl py-2 px-3 text-slate-800 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Soil Structure</label>
                        <select
                          value={plannerInput.soilType}
                          onChange={(e) => setPlannerInput({ ...plannerInput, soilType: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl py-2 px-3 text-slate-800 dark:text-white font-semibold cursor-pointer"
                        >
                          <option value="clay-loam">Clay-Loam (Deep rich alluvial composts)</option>
                          <option value="black-regur">Black Soil (High organic content - perfect for Cotton)</option>
                          <option value="red-yellow">Red & Yellow sandy structures (low water storage)</option>
                          <option value="sandy-clay">Sandy Clay structure</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Water Availability Index</label>
                        <select
                          value={plannerInput.waterAvailability}
                          onChange={(e) => setPlannerInput({ ...plannerInput, waterAvailability: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl py-2 px-3 text-slate-800 dark:text-white font-semibold cursor-pointer"
                        >
                          <option value="high">High (Tubewells, active canal extraction systems)</option>
                          <option value="medium">Medium (Moderate borewell rainfall dependents)</option>
                          <option value="low">Low (Strict dry winds, single annual well access)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Sowing Season</label>
                        <select
                          value={plannerInput.season}
                          onChange={(e) => setPlannerInput({ ...plannerInput, season: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl py-2 px-3 text-slate-800 dark:text-white font-semibold cursor-pointer"
                        >
                          <option value="Kharif (Monsoon)">KharifSowing (June - September Monsoon)</option>
                          <option value="Rabi (Winter)">Rabi Sowing (October - February Winter)</option>
                          <option value="Zaid (Summer)">Zaid Sowing (March - May Dry Dry)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={runCropPlannerSimulation}
                      disabled={plannerLoading}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl cursor-pointer text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
                    >
                      {plannerLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>AI Processing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                          <span>Get Intelligent Crop Match</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right analytical matching card */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 min-h-[300px]">
                    {plannerResult ? (
                      <div className="space-y-4 animate-fade-in text-xs">
                        {/* Title Match */}
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 p-4 rounded-2xl flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-mono">Recommended Match</span>
                            <h4 className="text-xl font-extrabold text-slate-950 dark:text-slate-100 mt-1">{plannerResult.recommendedCrop}</h4>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">{plannerResult.suitabilityExplanation}</p>
                          </div>
                          
                          {plannerResult.isDemo && (
                            <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wider h-fit">
                              Demo Fallback
                            </span>
                          )}
                        </div>

                        {/* Quantitative Parameters Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                          <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 block uppercase font-bold">Avg Yield</p>
                            <p className="text-xs font-black text-slate-700 dark:text-slate-105 font-mono mt-1">{plannerResult.expectedYield}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 block uppercase font-bold">Expected Revenue</p>
                            <p className="text-xs font-black text-emerald-700 font-mono mt-1">{plannerResult.expectedRevenue}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 block uppercase font-bold">Water Load</p>
                            <p className="text-xs font-black text-amber-700 font-mono mt-1">{plannerResult.waterRequirement}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-100">
                            <p className="text-[10px] text-slate-400 block uppercase font-bold">Risk Weight</p>
                            <p className="text-xs font-black text-rose-500 font-mono mt-1">{plannerResult.riskLevel}</p>
                          </div>
                        </div>

                        {/* Render Comparison metric tables */}
                        <div className="space-y-3">
                          <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] select-none">
                            Comparative Suitability Score Map
                          </h4>
                          <div className="space-y-2">
                            {plannerResult.cropComparison?.map((crop, idx) => (
                              <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
                                <div className="space-y-1 w-1/3">
                                  <p className="font-extrabold text-slate-800 dark:text-slate-200">{crop.name}</p>
                                  <span className="text-[10px] text-slate-400 block font-mono">Revenue: ₹{Math.round(crop.revenue / 1000)}k/Acre</span>
                                </div>
                                
                                {/* Score visual bars */}
                                <div className="flex-1 max-w-sm">
                                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-600 rounded-full"
                                      style={{ width: `${crop.suitabilityScore}%` }}
                                    />
                                  </div>
                                </div>
                                <span className="font-mono text-xs font-black text-emerald-800">{crop.suitabilityScore}% Match</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center py-10 text-center text-slate-400">
                        <HelpCircle className="w-12 h-12 text-slate-350 animate-bounce" />
                        <p className="font-semibold text-xs mt-3">Select your parameters and trigger the planner assessment to proceed.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                4. DISEASE DETECTION PAGE
                ----------------------------------------------------------------------------- */}
            {view === "disease" && (
              <motion.section
                key="disease"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <Camera className="w-6 h-6 animate-pulse" style={{ animationDuration: '4s' }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        AI Crop Disease Diagnostics
                      </h2>
                      <p className="text-xs text-slate-400">
                        Load a preset disease sample or upload your crop files, and query server-side computer vision models for quick actionables.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Image Selector & Presets */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Crop Image Input Source
                    </h3>

                    <div className="space-y-4">
                      {/* Leaf Image preview block */}
                      {selectedLeafImage ? (
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-100 group shadow-inner">
                          <img
                            src={selectedLeafImage}
                            alt="Target Crop leaf"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <button
                            onClick={() => setSelectedLeafImage(null)}
                            className="absolute top-2.5 right-2.5 p-1.5 bg-red-600 text-white rounded-full transition shadow hover:bg-red-700 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-5 text-center text-xs">
                          <Camera className="w-10 h-10 text-slate-300 mb-2" />
                          <p className="font-bold text-slate-500">No Target Crop loaded</p>
                          <p className="text-slate-400 mt-1">Tap a preset target sample below to check instantaneously.</p>
                        </div>
                      )}

                      {/* Diagnostic trigger trigger */}
                      <button
                        onClick={runDiseaseDiagnosisSimulation}
                        disabled={!selectedLeafImage || diseaseLoading}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase cursor-pointer tracking-wider disabled:opacity-40 transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 select-none"
                      >
                        {diseaseLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>AI Inspecting Leaf...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4.5 h-4.5 text-amber-300 fill-amber-300" />
                            <span>Run AI Disease Analysis</span>
                          </>
                        )}
                      </button>

                      <div className="space-y-2 border-t pt-4">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block select-none">
                          Or Choose from Leaf Samples Presets:
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {PRESET_LEAF_IMAGES.map((preset, i) => (
                            <div
                              key={i}
                              onClick={() => handleLeafSelect(preset.src)}
                              className={`cursor-pointer rounded-xl overflow-hidden border-2 transition absolute-block ${
                                selectedLeafImage === preset.src ? "border-emerald-600" : "border-transparent opacity-80"
                              }`}
                              title={preset.title}
                            >
                              <img
                                src={preset.src}
                                alt={preset.alt}
                                referrerPolicy="no-referrer"
                                className="w-full h-14 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scientific AI Diagnostic Result */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm min-h-[300px] flex flex-col justify-between space-y-4">
                    {diseaseResult ? (
                      <div className="space-y-4 animate-fade-in text-xs">
                        <div className="bg-rose-50 dark:bg-rose-950/25 border border-rose-100 p-4 rounded-2xl flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-black tracking-widest uppercase text-rose-800 dark:text-rose-400 font-mono">
                              Disease Detected
                            </span>
                            <h4 className="text-md font-extrabold text-slate-900 dark:text-slate-150 mt-1">
                              {diseaseResult.diseaseName}
                            </h4>
                            <div className="flex gap-2.5 mt-2">
                              <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                Confidence: {diseaseResult.confidence}%
                              </span>
                              <span className="font-mono text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                                Severity: {diseaseResult.severityLevel}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Prescribed treatment lists */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                            <h5 className="font-extrabold text-emerald-800 flex items-center gap-1.5 border-b pb-2 mb-2">
                              <Leaf className="w-4 h-4 text-emerald-600" /> Prescribed Treatments
                            </h5>
                            <ul className="text-[11px] list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
                              {diseaseResult.treatment?.map((treatment, idx) => (
                                <li key={idx}>{treatment}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                            <h5 className="font-extrabold text-amber-800 flex items-center gap-1.5 border-b pb-2 mb-2">
                              <ShieldCheck className="w-4 h-4 text-amber-600" /> Soil Prevent Tips
                            </h5>
                            <ul className="text-[11px] list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
                              {diseaseResult.preventionTips?.map((tip, idx) => (
                                <li key={idx}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center py-10 text-center text-slate-400">
                        <HelpCircle className="w-12 h-12 text-slate-350" />
                        <p className="font-semibold text-xs mt-3">Trigger diagnostics to load scientific treatment rules.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                5. WEATHER PAGE
                ----------------------------------------------------------------------------- */}
            {view === "weather" && (
              <motion.section
                key="weather"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                {/* Core Live Weather overview */}
                <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4">
                    <WeatherVisualIcon type="Sunny" className="w-16 h-16 text-yellow-350 fill-yellow-200/20" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-100 select-none">Live Conditions</span>
                      <h3 className="text-3xl font-black font-mono">31°C</h3>
                      <p className="text-xs font-semibold text-teal-100/90 mt-1">Clear Sunny sky in Bathinda, Punjab</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-center divide-x divide-teal-500/35">
                    <div className="px-3">
                      <p className="text-teal-200">Moisture Humidity</p>
                      <p className="text-md font-bold font-mono mt-0.5">54%</p>
                    </div>
                    <div className="px-3">
                      <p className="text-teal-200">Wind Direction</p>
                      <p className="text-md font-bold font-mono mt-0.5">14 km/h West</p>
                    </div>
                  </div>
                </div>

                {/* Sowing advisory suggestions layout */}
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Seven day daily weather timeline lists */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Agricultural Crop Weather Timeline
                    </h3>
                    <div className="space-y-2 text-xs">
                      {[
                        { day: "Today 2026-06-08", temp: "31°C / 22°C", cond: "Sunny", rain: "0% Rain" },
                        { day: "Tue 2026-06-09", temp: "32°C / 23°C", cond: "Cloudy", rain: "10% Rain" },
                        { day: "Wed 2026-06-10", temp: "29°C / 21°C", cond: "Storm", rain: "75% Rain (Monson)" },
                        { day: "Thu 2026-06-11", temp: "30°C / 20°C", cond: "Rainy", rain: "50% Rain" },
                        { day: "Fri 2026-06-12", temp: "31°C / 22°C", cond: "Cloudy", rain: "20% Rain" }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-850 border rounded-xl flex items-center justify-between gap-4">
                          <span className="font-bold text-slate-755">{item.day}</span>
                          <span className="font-mono text-slate-600 dark:text-slate-350">{item.temp}</span>
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                            <WeatherVisualIcon type={item.cond} className="w-5 h-5" />
                            <span>{item.cond}</span>
                          </div>
                          <span className="font-mono text-red-500 font-bold">{item.rain}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Water-saving advisory guidance advice card */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4 text-xs">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Crop Irrigation Advisories
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-teal-50 dark:bg-teal-950/20 border border-teal-100 rounded-xl flex items-start gap-2.5">
                        <Droplet className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0 animate-bounce" />
                        <div>
                          <h4 className="font-bold text-teal-900 dark:text-teal-300">Monsoon Rain Forecasted Wed</h4>
                          <p className="text-teal-700 dark:text-teal-400 mt-0.5 text-[11px]">75% chance of heavy rain on Wednesday afternoon. Turn off automated drip extraction pumps on June 10-11 to prevent fertilizer runoff.</p>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 dark:bg-amber-950/25 border border-amber-100 rounded-xl flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-amber-900 dark:text-amber-305">High Temperature Water Rate</h4>
                          <p className="text-amber-700 dark:text-amber-400/90 text-[11px]">Evapotranspiration is growing due to current dry sunny winds. Ensure sandy soils receive a moderate soil wetting cycle.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                6. MANDI PRICE ARCHIVE PAGE
                ----------------------------------------------------------------------------- */}
            {view === "market" && (
              <motion.section
                key="market"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Live Mandi Prices & Price Direction Forecasts
                      </h2>
                      <p className="text-xs text-slate-400">
                        Real-time agricultural market indices of several regions in India. Avoid intermediates and sell at high quotes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left searching index list */}
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-150 dark:border-slate-850 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                      {/* Search box */}
                      <div className="w-full sm:max-w-xs relative text-xs">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search Crop or market..."
                          value={mandiSearch}
                          onChange={(e) => setMandiSearch(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-full py-2 px-9 pl-9 text-slate-800 dark:text-white outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      
                      {/* State filter */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <label className="font-bold text-slate-400 select-none">State:</label>
                        <select
                          value={mandiStateFilter}
                          onChange={(e) => setMandiStateFilter(e.target.value)}
                          className="bg-slate-50 border border-slate-205 py-1 px-3.5 rounded-full text-slate-700 cursor-pointer text-[11px] font-bold"
                        >
                          <option value="all">All States</option>
                          <option value="punjab">Punjab</option>
                          <option value="haryana">Haryana</option>
                          <option value="rajasthan">Rajasthan</option>
                          <option value="uttar pradesh">Uttar Pradesh</option>
                          <option value="maharashtra">Maharashtra</option>
                        </select>
                      </div>
                    </div>

                    {/* Table lists */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 select-none text-slate-400 text-[10px] uppercase font-black font-mono">
                            <th className="py-2.5">Crop</th>
                            <th className="py-2.5">Market (APMC)</th>
                            <th className="py-2.5 text-right">Modal rates/Qpt</th>
                            <th className="py-2.5 text-center">Trend Indicator</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {mandiPrices
                            .filter((m) => {
                              if (mandiSearch && !m.crop.toLowerCase().includes(mandiSearch.toLowerCase()) && !m.market.toLowerCase().includes(mandiSearch.toLowerCase())) return false;
                              if (mandiStateFilter !== "all" && m.state.toLowerCase() !== mandiStateFilter) return false;
                              return true;
                            })
                            .map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                <td className="py-3 font-extrabold text-slate-800 dark:text-slate-250">{item.crop}</td>
                                <td className="py-3 text-slate-500">{item.market} ({item.state})</td>
                                <td className="py-3 text-right font-black font-mono text-emerald-800">
                                  ₹{item.modalPrice.toLocaleString("en-IN")}
                                </td>
                                <td className="py-3 text-center">
                                  {item.change === "up" ? (
                                    <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full font-bold text-[10px]">
                                      📈 +4.5%
                                    </span>
                                  ) : item.change === "down" ? (
                                    <span className="inline-flex px-2 py-0.5 bg-rose-50 text-rose-800 rounded-full font-bold text-[10px]">
                                      📉 -2.0%
                                    </span>
                                  ) : (
                                    <span className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold text-[10px]">
                                      ● Flat
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Right Price Direction analytical prediction panel */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-150 dark:border-slate-850 shadow-sm space-y-4 text-xs">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Crop Selling Intelligence
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Price advisory matched box */}
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/25 border border-amber-100 rounded-2xl space-y-1">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-amber-800">Optimized Sells recommendation</span>
                        <h4 className="font-extrabold text-amber-955 text-sm">Best Selling Window: In 10 - 15 Days</h4>
                        <p className="text-amber-800 text-[11px] leading-relaxed">
                          Basmati variety paddy rates are expected to appreciate by ₹150 - ₹200 as wholesale export warehouses increase purchase orders. Delay selling off-grade stock till next Tuesday.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-slate-400 uppercase tracking-wide text-[10px] select-none">Nearby Warehouse Storage (Cold/Dry)</h4>
                        <div className="space-y-2">
                          {[
                            { name: "APMC Bathinda Warehouse Set-A", cap: "12% Available Capacity", fee: "₹50 / quintal / month" },
                            { name: "PUNSUD Stockpile Cold storage Hub", cap: "0% Available (Fully Booked)", fee: "₹72 / quintal / month" }
                          ].map((wh, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-850 border rounded-xl flex justify-between items-center gap-3">
                              <div>
                                <p className="font-bold">{wh.name}</p>
                                <p className="text-slate-400 text-[10px] mt-0.5">{wh.cap}</p>
                              </div>
                              <span className="font-sans font-extrabold text-slate-650 h-fit rounded px-2 py-0.5 bg-slate-100">{wh.fee}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                7. PROFIT CALCULATOR PAGE
                ----------------------------------------------------------------------------- */}
            {view === "profit" && (
              <motion.section
                key="profit"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Yield ROI & Profit Cost Calculator
                      </h2>
                      <p className="text-xs text-slate-400">
                        Spreadsheet model assessing crop input costs against APMC market trends to manage net margins.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* cost parameters card */}
                  <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Crop Sowing Cost inputs
                    </h3>

                    <div className="space-y-3.5 text-xs">
                      {[
                        { key: "seedCost", label: "Seed Materials (₹)" },
                        { key: "fertilizerCost", label: "Bio-Fertilizer / Compost (₹)" },
                        { key: "laborCost", label: "Sowing & Harvesting Labor (₹)" },
                        { key: "waterCost", label: "Tubewell Irrigation Electricity (₹)" },
                        { key: "equipmentCost", label: "Tractor / Drills Rents (₹)" },
                        { key: "transportCost", label: "Market Shipping Freight (₹)" }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between gap-4">
                          <label className="font-bold text-slate-500">{item.label}</label>
                          <input
                            type="number"
                            value={profitIn[item.key as keyof typeof profitIn]}
                            onChange={(e) => setProfitIn({ ...profitIn, [item.key]: parseInt(e.target.value) || 0 })}
                            className="bg-slate-50 border border-slate-200 select-none py-1.5 px-3 rounded-lg text-right max-w-[120px] font-mono font-bold"
                          />
                        </div>
                      ))}

                      <div className="border-t pt-3.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="font-extrabold text-slate-700">Expected Yield Volume (Quintals)</label>
                          <input
                            type="number"
                            value={profitIn.expectedYieldQuintals}
                            onChange={(e) => setProfitIn({ ...profitIn, expectedYieldQuintals: parseInt(e.target.value) || 0 })}
                            className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-right max-w-[124px] font-mono font-bold"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="font-extrabold text-slate-700">Expected Selling Rate (₹/Qpt)</label>
                          <input
                            type="number"
                            value={profitIn.expectedPricePerQuintal}
                            onChange={(e) => setProfitIn({ ...profitIn, expectedPricePerQuintal: parseInt(e.target.value) || 0 })}
                            className="bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg text-right max-w-[124px] font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial projections reports */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                        Financial Margin Statements
                      </h3>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
                        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400 select-none">Total Investment</p>
                          <p className="text-md font-black text-slate-800 dark:text-slate-100 font-mono mt-1">₹{totalInvestment.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400 select-none">Gross Revenue</p>
                          <p className="text-md font-black text-slate-800 dark:text-slate-100 font-mono mt-1">₹{expectedRevenue.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400 select-none">Estimated Profit</p>
                          <p className={`text-md font-black font-mono mt-1 ${netProfit >= 0 ? "text-emerald-700" : "text-rose-500"}`}>
                            ₹{netProfit.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div className="bg-slate-0/4 opacity-10 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[9px] uppercase font-bold text-slate-400 select-none">ROI percentage</p>
                          <p className="text-md font-black text-emerald-800 font-mono mt-1">{roiPercent.toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Chart comparative graph */}
                    <div className="space-y-2 mt-4">
                      <h4 className="text-[10px] uppercase font-black tracking-widest text-slate-400 select-none">Revenue Comparison Graph</h4>
                      <ClusteredRevenueBarChart
                        data={[
                          { name: "Paddy Basmati-1509", investment: 25000, revenue: 68500 },
                          { name: "Wheat Kalyan-Sona", investment: 19000, revenue: 55000 },
                          { name: "My Hand Sown Plot", investment: totalInvestment, revenue: expectedRevenue }
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                8. GOVERNMENT WELFARE SCHEMES DIRECTORY
                ----------------------------------------------------------------------------- */}
            {view === "schemes" && (
              <motion.section
                key="schemes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Subsidies & Central Government Schemes
                      </h2>
                      <p className="text-xs text-slate-400">
                        State-shared agricultural funds checker. Apply direct subsidies, PM-KISAN rewards and safety crop crop insurance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left filter selections cards */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4 text-xs">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Eligibility Screener
                    </h3>

                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Your Land Ownership Size</label>
                        <select
                          value={schemeQuery.landSize}
                          onChange={(e) => setSchemeQuery({ ...schemeQuery, landSize: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 py-2 px-3 rounded-xl font-semibold cursor-pointer"
                        >
                          <option value="marginal">Marginal (Under 1 Hectare)</option>
                          <option value="small">Small holding (1 - 2 Hectares)</option>
                          <option value="large">Large holding (Above 3 Hectares)</option>
                        </select>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center gap-2.5 font-bold text-slate-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={schemeQuery.isOrganic}
                            onChange={(e) => setSchemeQuery({ ...schemeQuery, isOrganic: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                          />
                          <span>Practicing Organic certified Farming</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Schemes lists cards */}
                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="font-bold text-slate-455 text-[10px] uppercase tracking-widest select-none">
                      Qualified Schemes List ({filteredSchemes.length})
                    </h3>

                    <div className="space-y-3.5 text-xs">
                      {filteredSchemes.map((scheme) => {
                        const isApplied = appliedSchemes.includes(scheme.id);
                        return (
                          <div
                            key={scheme.id}
                            className={`p-5 bg-white dark:bg-slate-900 border rounded-2xl space-y-4 shadow-sm relative overflow-hidden group ${
                              isApplied ? "border-emerald-500" : "border-slate-100"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold rounded-full border border-emerald-100">
                                  {scheme.category.toUpperCase()}
                                </span>
                                <h4 className="text-sm font-extrabold text-slate-950 dark:text-slate-105 mt-2">
                                  {scheme.name}
                                </h4>
                                <p className="text-slate-500 dark:text-slate-400 mt-1">{scheme.benefits}</p>
                              </div>
                              
                              <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold h-fit ${
                                scheme.status === "open" ? "bg-green-50 text-green-700 animate-pulse" : "bg-amber-50 text-amber-700"
                              }`}>
                                {scheme.status === "open" ? "APPLICATIONS OPEN" : "CLOSING SOON"}
                              </span>
                            </div>

                            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-xl gap-4 text-[11px]">
                              <div>
                                <span className="text-slate-400 font-bold uppercase text-[9px] block">Eligibility Requirements:</span>
                                <p className="text-slate-600 dark:text-slate-300">{scheme.eligibility}</p>
                              </div>
                              
                              {isApplied ? (
                                <span className="flex items-center gap-1 text-emerald-800 font-black whitespace-nowrap">
                                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Sowing Approved
                                </span>
                              ) : (
                                <button
                                  onClick={() => setShowApplyModal(scheme)}
                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition shrink-0 cursor-pointer select-none shadow-md shadow-emerald-500/10"
                                >
                                  Apply online
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Secure Slide Apply Modal */}
                {showApplyModal && (
                  <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 max-w-md w-full border border-slate-100 shadow-2xl space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b pb-2">
                        <h4 className="font-extrabold text-slate-950 dark:text-slate-150 text-sm">Welfare Subsidy Direct apply</h4>
                        <button onClick={() => setShowApplyModal(null)} className="p-1 hover:bg-slate-50 rounded-lg cursor-pointer">
                          <X className="w-5 h-5 text-slate-500" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500 uppercase tracking-wider text-[9px] select-none">Target Scheme</label>
                        <p className="font-extrabold text-slate-800 dark:text-slate-200">{showApplyModal.name}</p>
                      </div>

                      <form onSubmit={handleApplySchemeSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <label className="block font-bold text-slate-500">Government Aadhaar Identification (12 digits)</label>
                          <input
                            type="text"
                            required
                            placeholder="6543-2109-8765"
                            value={aadhaarInput}
                            onChange={(e) => setAadhaarInput(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>

                        <div className="space-y-2 text-slate-400 text-[10px]">
                          <p>By checking, you agree to pull registered plot Khatauni documents from Central Digilocker archives securely.</p>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer select-none"
                        >
                          Confirm Aadhaar & Apply Direct Profit
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                9. DISCUSSION FORUM / COMMUNITY
                ----------------------------------------------------------------------------- */}
            {view === "community" && (
              <motion.section
                key="community"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-150 dark:border-slate-850 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <Users className="w-6 h-6 animate-pulse" style={{ animationDuration: '4s' }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Kisan Sangoshthi – Community & Expert Q&A Forum
                      </h2>
                      <p className="text-xs text-slate-400">
                        Ask agriculture scientists, review regional warnings, and check success pathways. Verified and supportive environment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left form to add posts */}
                  <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4 text-xs h-fit">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Start regional Farmer Thread
                    </h3>

                    <form onSubmit={handleCreatePostSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Advisory Title</label>
                        <input
                          type="text"
                          required
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          placeholder="E.g., Pest spotting on Cotton leaves"
                          className="w-full bg-slate-50 border border-slate-202 py-2 px-3 rounded-xl outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Category Tag</label>
                        <select
                          value={newPostCategory}
                          onChange={(e) => setNewPostCategory(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-202 py-2 px-3 rounded-xl font-bold cursor-pointer"
                        >
                          <option value="Crop Management">Crop Management</option>
                          <option value="Pest Warning">Pest Warning</option>
                          <option value="Market Help">Market Help</option>
                          <option value="Success Story">Success Story</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block font-bold text-slate-500">Your Agricultural Question / Story</label>
                        <textarea
                          required
                          rows={4}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Describe soil signs, moisture levels or pests you observed clearly..."
                          className="w-full bg-slate-50 border border-slate-202 py-2 px-3 rounded-xl outline-none leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/10"
                      >
                        <PlusCircle className="w-4.5 h-4.5" /> Post to Regional Feed
                      </button>
                    </form>
                  </div>

                  {/* Right posts listings */}
                  <div className="lg:col-span-8 space-y-4">
                    {forumPosts.map((post) => (
                      <div key={post.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 rounded-2xl space-y-4 shadow-sm text-xs">
                        {/* Author Profile block */}
                        <div className="flex items-center justify-between gap-4 border-b pb-3 border-slate-55/60">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.avatar}
                              alt={post.author}
                              referrerPolicy="no-referrer"
                              className="w-8 h-8 rounded-full border border-slate-200"
                            />
                            <div>
                              <p className="font-extrabold text-slate-800 dark:text-slate-155 flex items-center gap-1.5">
                                {post.author}
                                {post.isExpertVerified && (
                                  <span className="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase select-none">
                                    Verified scientist
                                  </span>
                                )}
                              </p>
                              <span className="text-[10px] text-slate-400 block">{post.region} • {post.timestamp}</span>
                            </div>
                          </div>

                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-md">
                            {post.category}
                          </span>
                        </div>

                        {/* Question details */}
                        <div className="space-y-1 max-w-xl">
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-150 leading-snug">{post.title}</h4>
                          <p className="text-slate-650 dark:text-slate-350 leading-relaxed text-[11px]">{post.content}</p>
                        </div>

                        {/* Likes comment actions bar */}
                        <div className="flex items-center gap-4 text-slate-450 border-t border-b py-2 text-[11px]">
                          <button
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center gap-1 cursor-pointer select-none font-bold ${
                              post.likedByCurrentUser ? "text-rose-600" : "hover:text-rose-500 text-slate-400"
                            }`}
                          >
                            ♥ {post.likes} Farmers agreed
                          </button>
                          <span>💬 {post.comments.length} Comments lists</span>
                        </div>

                        {/* Comments threads */}
                        <div className="space-y-2 pl-3 border-l-2 border-slate-100">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-0.5">
                              <p className="font-bold text-slate-800 flex items-center gap-1 text-[10px]">
                                {comment.author}
                                {comment.role === "expert" && (
                                  <span className="bg-emerald-50 text-emerald-700 text-[8px] px-1 py-0.2 rounded font-black">Advisory</span>
                                )}
                              </p>
                              <p className="text-slate-600 dark:text-slate-300 leading-snug text-[11px]">{comment.text}</p>
                            </div>
                          ))}

                          {/* Comment input form */}
                          <div className="flex gap-2 pt-2">
                            <input
                              type="text"
                              placeholder="Post agricultural comment..."
                              value={postCommentInput[post.id] || ""}
                              onChange={(e) => setPostCommentInput({ ...postCommentInput, [post.id]: e.target.value })}
                              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-[11px] outline-none"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-[10px] cursor-pointer"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                10. DIGITAL MARKETPLACE / SUPPLIES
                ----------------------------------------------------------------------------- */}
            {view === "supplies" && (
              <motion.section
                key="supplies"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <ShoppingBag className="w-6 h-6 animate-pulse" style={{ animationDuration: '4s' }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Digital Agri Supplies Portal
                      </h2>
                      <p className="text-xs text-slate-400">
                        Certified hybrid organic seeds, drip kits, organic neem nitrogen fertilizers, and solar light traps from authorized regional networks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left Filters card */}
                  <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-4 text-xs h-fit">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Farming Filters
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="block font-bold text-slate-500 mb-1 select-none">Category</label>
                        <select
                          value={marketCategory}
                          onChange={(e) => setMarketCategory(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-202 py-2 px-3 rounded-xl font-bold cursor-pointer"
                        >
                          <option value="all">All Supplies</option>
                          <option value="seeds">Certified Hybrid Seeds</option>
                          <option value="fertilizers">Bio-Fertilizers & Vermicompost</option>
                          <option value="equipment">Water Micro Irrigation / Solar Tools</option>
                          <option value="organic">Organic Pest Repellents</option>
                        </select>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-center gap-2.5 font-bold text-slate-500 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ecoFriendlyOnly}
                            onChange={(e) => setEcoFriendlyOnly(e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                          />
                          <span>PGS certified Organic Supplies only</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right products grids */}
                  <div className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                    {marketplaceProducts
                      .filter((prod) => {
                        if (marketCategory !== "all" && prod.category !== marketCategory) return false;
                        if (ecoFriendlyOnly && !prod.ecoFriendly) return false;
                        return true;
                      })
                      .map((prod) => (
                        <div key={prod.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group relative">
                          
                          {prod.ecoFriendly && (
                            <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white px-2 py-0.5 rounded-md font-black text-[8px] uppercase select-none tracking-wider z-10 flex items-center gap-0.5 shadow-sm">
                              <Leaf className="w-2.5 h-2.5 fill-white" /> PGS Organic
                            </span>
                          )}

                          <div className="relative h-36 bg-slate-100 overflow-hidden">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                            />
                            {!prod.inStock && (
                              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white font-heavy text-[10px] uppercase select-none tracking-wider">
                                Restocking Soon
                              </div>
                            )}
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 select-none">Brand: {prod.brand}</span>
                              <h4 className="font-extrabold text-slate-900 dark:text-slate-150 text-[13px] leading-snug group-hover:text-emerald-700 transition">{prod.name}</h4>
                              <p className="text-slate-450 text-[10.5px] leading-relaxed line-clamp-2">{prod.description}</p>
                            </div>

                            <div className="flex items-end justify-between gap-4 border-t pt-3 border-slate-55">
                              <div>
                                <span className="text-slate-400 font-bold block text-[9.5px] uppercase select-none">{prod.unit}</span>
                                <span className="text-md font-black text-rose-600 font-mono">₹{prod.price}</span>
                              </div>
                              
                              <button
                                onClick={() => addToCart(prod)}
                                disabled={!prod.inStock}
                                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer select-none disabled:opacity-40"
                              >
                                Add item
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                11. SUSTAINABILITY TRACKER VIEW
                ----------------------------------------------------------------------------- */}
            {view === "sustainability" && (
              <motion.section
                key="sustainability"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <Leaf className="w-6 h-6 animate-pulse" style={{ animationDuration: '4s' }} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Harit Kranti – Eco Sowing & Water Sustainability Tracker
                      </h2>
                      <p className="text-xs text-slate-400">
                        Review soil conservation audits, bio-nitrogen indicators, and collect reward badges. Gamifying organic farming.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left Column score cards */}
                  <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm space-y-6 text-xs">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b pb-2">
                      Farming Conservation Index Audits
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-slate-50 dark:bg-slate-850 border rounded-2xl">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase select-none">Water Conservation</span>
                        <p className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">94%</p>
                        <span className="text-[10px] text-green-700 font-bold block mt-1">Drip Tubes Active</span>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-850 border rounded-2xl">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase select-none">Chemical Pesticides Sells</span>
                        <p className="text-2xl font-black text-rose-500 font-mono mt-1">0% Free</p>
                        <span className="text-[10px] text-emerald-800 font-bold block mt-1">100% Neem repellent</span>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-850 border rounded-2xl">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase select-none">Soil Microbes (Organic Carbon)</span>
                        <p className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono mt-1">0.68%</p>
                        <span className="text-[10px] text-slate-500 font-bold block mt-1">Target Carbon: 0.75%+</span>
                      </div>
                    </div>

                    <div className="space-y-3.5 pt-2">
                      <h4 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] select-none">Ecological recommendations</h4>
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 rounded-2xl flex items-start gap-3">
                        <Sprout className="w-5.5 h-5.5 text-emerald-700 animate-bounce flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-extrabold text-emerald-900 border-b pb-1 mb-1">Rotational legume green-compost advice</h5>
                          <p className="text-emerald-800 leading-relaxed text-[11px]">Sow Dhaincha (Sesbania) or Black Gram in next Zaid summer plot. They fixes 40kg free natural air Nitrogen in soil root nodules, reducing urea costs next monsoon!</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right badge collectibles */}
                  <div className="lg:col-span-4 space-y-6">
                    <EcoBadgeWidget score={88} />
                    <RadialProgressGauge value={94} label="Water Conservation" subtitle="Sowing Drip Drip Tubes" />
                  </div>
                </div>
              </motion.section>
            )}

            {/* -----------------------------------------------------------------------------
                12. PLATFORM ANALYTICS PAGES
                ----------------------------------------------------------------------------- */}
            {view === "analytics" && (
              <motion.section
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6 animate-fade-in text-slate-800"
              >
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-850 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl text-emerald-700">
                      <BarChart className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-950 dark:text-slate-100">
                        Historical Yield & Crop analytics
                      </h2>
                      <p className="text-xs text-slate-400">
                        Multi-dimensional crop indicators analyzing regional rainfall quantities side-by-side with commercial APMC market prices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 text-xs font-semibold">
                  {/* Left Column line trends */}
                  <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-150 dark:border-slate-850 shadow-sm space-y-3">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Historical Yield Trends (Quintals per Acre)</h3>
                    <ElegantLineChart
                      data={[
                        { label: "2022", value: 14 },
                        { label: "2023", value: 16 },
                        { label: "2024", value: 15 },
                        { label: "2025", value: 19 },
                        { label: "2026", value: 22 }
                      ]}
                    />
                  </div>

                  {/* Right Revenue trends clustered bars */}
                  <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-155 dark:border-slate-850 shadow-sm space-y-3">
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">Revenues vs Outlay Statements</h3>
                    <ClusteredRevenueBarChart
                      data={[
                        { name: "Wheat (Rabi)", investment: 19000, revenue: 55000 },
                        { name: "Paddy (Kharif)", investment: 25000, revenue: 68500 },
                        { name: "Organic Cotton", investment: 31000, revenue: 78000 }
                      ]}
                    />
                  </div>
                </div>
              </motion.section>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* -----------------------------------------------------------------------------
          KISAN MITRA FLOATING AI VOICE ASSISTANT CHATBOT
          ----------------------------------------------------------------------------- */}
      <KisanMitraFloating />

      {/* -----------------------------------------------------------------------------
          SHOPPING CART OVERLAY SHEET
          ----------------------------------------------------------------------------- */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-end p-4">
            <motion.div
              initial={{ opacity: 0, x: 250 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 250 }}
              className="bg-white dark:bg-slate-900 h-full max-w-sm w-full border-l border-slate-150 dark:border-slate-850 shadow-2xl p-5 flex flex-col justify-between text-xs text-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-3 border-slate-55 select-none">
                <h3 className="font-black text-sm text-slate-950 dark:text-slate-150 flex items-center gap-1.5">
                  <ShoppingCart className="w-5 h-5 text-emerald-700" /> Supplies Cart
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {shoppingCart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                    <ShoppingCart className="w-10 h-10 text-slate-200 mb-2" />
                    <p className="font-bold">Supplies Cart is empty</p>
                    <p className="text-[10.5px] text-slate-500 mt-0.5">Add organic seeds or micro sprinkler setups.</p>
                  </div>
                ) : (
                  shoppingCart.map((item) => (
                    <div key={item.product.id} className="p-3 bg-slate-50 dark:bg-slate-850 border rounded-xl flex justify-between items-center gap-3">
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-slate-900 dark:text-slate-150 leading-tight">{item.product.name}</p>
                        <div className="flex items-center gap-2 text-[10.5px] text-slate-400">
                          <span className="font-mono text-rose-600 font-bold">₹{item.product.price}</span>
                          <span>Unit: {item.product.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-slate-700">x{item.count}</span>
                        <button
                          onClick={() => setShoppingCart(shoppingCart.filter((p) => p.product.id !== item.product.id))}
                          className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Calculations */}
              {shoppingCart.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold font-sans">
                    <span>Subtotal Supplies</span>
                    <span className="font-mono text-rose-605 font-black text-sm">
                      ₹{shoppingCart.reduce((acc, c) => acc + c.product.price * c.count, 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      alert("🌾 Order placed successfully! Supplies tracking ID will be generated in your dashboard notifications.");
                      setShoppingCart([]);
                      setCartOpen(false);
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer select-none text-center"
                  >
                    Confirm Order & Direct Shipping
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* -----------------------------------------------------------------------------
          AI CROP GROWTH MILESTONE INTEGRATIVE MODAL
          ----------------------------------------------------------------------------- */}
      <AnimatePresence>
        {showMilestoneDetail && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-xs text-slate-800 dark:text-slate-200 select-none"
            >
              {/* Dynamic Header Badge/Banner with Logo */}
              <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 p-6 text-white relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-4">
                  <div className="bg-[#FCF9F1] p-2.5 rounded-[22px] border border-white/20">
                    <KrishiVaaniLogo size={52} />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 bg-rose-600 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse">
                      <Sparkles className="w-3 h-3 text-yellow-300" /> AI Detection Core
                    </div>
                    <h3 className="text-lg font-black tracking-tight font-display">
                      Crop Growth Milestone Detected
                    </h3>
                  </div>
                </div>
              </div>

              {/* Informational Contents */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                
                {/* Visual Metadata Ribbon */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">Assigned Plot</span>
                    <strong className="text-slate-700 dark:text-slate-200 font-extrabold text-[11px] block mt-0.5">Bathinda Sector 4</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">Active Crop</span>
                    <strong className="text-slate-700 dark:text-slate-200 font-extrabold text-[11px] block mt-0.5">Bt Cotton Var-5</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider font-mono">Sowing Days</span>
                    <strong className="text-slate-700 dark:text-slate-200 font-bold text-[11px] block mt-0.5">{activeCropCycleDays} Days</strong>
                  </div>
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl">
                    <span className="text-[9px] text-rose-500 font-bold block uppercase tracking-wider font-mono">Status</span>
                    <strong className="text-rose-600 dark:text-rose-400 font-extrabold text-[11px] block mt-0.5 animate-pulse">Critical Change</strong>
                  </div>
                </div>

                {/* Main insights overview */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-[#2E7D32]">
                    🔬 Remote Sensing Observations
                  </span>
                  <div className="p-4 bg-emerald-50/45 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/20 rounded-2xl space-y-1.5">
                    <p className="font-extrabold text-slate-800 dark:text-slate-200 text-xs">
                      AI identified shift into: <span className="text-emerald-700 dark:text-emerald-400 underline decoration-2">{activeMilestoneName}</span>
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                      Optical spectroscopy channels on Sentinel-2 indicate chlorophyll reflectance (NDVI) has climbed to an optimal <strong className="font-mono">0.74</strong>. Ground humidity probes record deep-root saturation at <strong className="font-mono">68%</strong>. This indicates peak floral square development is initiated.
                    </p>
                  </div>
                </div>

                {/* AI Sowing Advisories */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest text-amber-600 block">
                    ⚡ Recommended Action Plans
                  </span>
                  <div className="space-y-2.5">
                    
                    {/* Item 1 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="bg-emerald-100 dark:bg-emerald-950/50 p-1.5 rounded-lg text-emerald-800 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                        <Droplet className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-750 dark:text-slate-200">Transition Irrigation Mode</p>
                        <p className="text-slate-400 text-[10.5px]">Transition water delivery from broad flooding to high-efficiency drip-mist. Recommended schedule is 45 minutes every 12-hour cycle to avoid stagnancy causing square-drop.</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="bg-[#2E7D32]/10 p-1.5 rounded-lg text-[#2E7D32] flex-shrink-0 mt-0.5">
                        <Sprout className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-750 dark:text-slate-200">Dispense Bio-Phosphate Nutrition</p>
                        <p className="text-slate-400 text-[10.5px]">Cotton flower buds require concentrated phosphate for cell extension. Water-soluble Bio-NPK compost tea application advised by the Agri Advisory Council.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-2.5 items-start">
                      <div className="bg-amber-100 dark:bg-amber-950/30 p-1.5 rounded-lg text-amber-700 flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-750 dark:text-slate-200">Whitefly Proactive Defense</p>
                        <p className="text-slate-400 text-[10.5px]">Young boll development attracts sucking whiteflies in humid climates. Apply preventative neem extracts formulation spray early morning.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simulated automation feedback */}
                {appliedIrrigationGuideline && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-850 rounded-2xl flex items-center gap-2.5 text-emerald-850 dark:text-emerald-400 font-extrabold"
                  >
                    <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" />
                    <div className="text-[10.5px] leading-tight">
                      Automation Pushed: Live smart Drip Irrigation parameters successfully remote-synchronized to the Bathinda Sector 4 IoT Solenoid Valves! ✅
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Action Buttons footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowMilestoneDetail(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-750 font-bold rounded-xl transition cursor-pointer select-none"
                >
                  Close Panel
                </button>

                {!appliedIrrigationGuideline && (
                  <button
                    type="button"
                    onClick={() => setAppliedIrrigationGuideline(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black rounded-xl transition cursor-pointer select-none"
                  >
                    Sync Smart Drip Schedule
                  </button>
                )}

                {hasCropMilestoneAlert && (
                  <button
                    type="button"
                    onClick={() => {
                      setHasCropMilestoneAlert(false);
                      setShowMilestoneDetail(false);
                    }}
                    className="px-5 py-2 bg-[#2E7D32] hover:bg-emerald-700 text-white font-extrabold rounded-xl transition cursor-pointer select-none"
                  >
                    Acknowledge Sowing Milestone
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
