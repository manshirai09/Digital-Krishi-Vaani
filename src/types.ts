export type AppView =
  | "landing"
  | "dashboard"
  | "planner"
  | "disease"
  | "weather"
  | "market"
  | "profit"
  | "schemes"
  | "community"
  | "supplies"
  | "sustainability"
  | "analytics"
  | "settings";

export type UserRole = "farmer" | "expert" | "admin";

export interface CropRecommendationInput {
  location: string;
  soilType: string;
  waterAvailability: string;
  farmSize: string;
  season: string;
}

export interface CropRecommendationResult {
  recommendedCrop: string;
  expectedYield: string;
  expectedRevenue: string;
  riskLevel: string;
  waterRequirement: string;
  suitabilityExplanation: string;
  cropComparison: Array<{
    name: string;
    yield: number;
    revenue: number;
    risk: string;
    suitabilityScore: number;
  }>;
  isDemo?: boolean;
}

export interface DiseaseDiagnosisResult {
  diseaseName: string;
  confidence: number;
  severityLevel: string;
  treatment: string[];
  preventionTips: string[];
  isDemo?: boolean;
}

export interface MandiPriceItem {
  id: string;
  crop: string;
  market: string;
  state: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  change: "up" | "down" | "flat";
  date: string;
}

export interface GovScheme {
  id: string;
  name: string;
  category: "direct-benefit" | "subsidy" | "insurance" | "organic";
  benefits: string;
  eligibility: string;
  documents: string[];
  fundingRatio: string;
  status: "open" | "closing-soon";
  detailsLink: string;
}

export interface ForumPost {
  id: string;
  author: string;
  role: UserRole;
  avatar: string;
  region: string;
  title: string;
  content: string;
  category: "Crop Management" | "Pest Warning" | "Market Help" | "Success Story" | "Expert Advisory";
  timestamp: string;
  likes: number;
  comments: Array<{
    id: string;
    author: string;
    role: UserRole;
    text: string;
    timestamp: string;
  }>;
  likedByCurrentUser?: boolean;
  isExpertVerified?: boolean;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  category: "seeds" | "fertilizers" | "equipment" | "organic";
  price: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  ecoFriendly: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
