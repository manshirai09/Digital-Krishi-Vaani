import React from "react";
import { TrendingUp, Award, Droplet, Sprout, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";

// -----------------------------------------------------------------------------
// Interactive SVG Line Chart (Yield Tendency & Soil Health Patterns over 5 Years)
// -----------------------------------------------------------------------------
export interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  unit?: string;
  color?: string;
}

export function ElegantLineChart({ data, unit = "Quintals", color = "#2E7D32" }: LineChartProps) {
  if (!data || data.length === 0) return null;
  const padding = 35;
  const width = 450;
  const height = 180;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15;
  const minVal = 0;
  const range = maxVal - minVal;

  // Chart coordinates calculation
  const points = data.map((d, index) => {
    const x = padding + (index * (width - padding * 2)) / (data.length - 1);
    const y = height - padding - ((d.value - minVal) / range) * (height - padding * 2);
    return { x, y, label: d.label, val: d.value };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  // Area under path
  const areaD = points.length > 0 ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z` : "";

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition" />
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible font-sans select-none">
        <defs>
          <linearGradient id="gradient-line-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + ratio * (height - padding * 2);
          const gridVal = maxVal - ratio * range;
          return (
            <g key={index} className="opacity-40">
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text x={padding - 8} y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                {Math.round(gridVal)}
              </text>
            </g>
          );
        })}

        {/* Filled Area */}
        <path d={areaD} fill="url(#gradient-line-area)" />

        {/* Stroke Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Interactive dots and text overlay */}
        {points.map((p, index) => (
          <g key={index} className="group/dot cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r={4}
              fill="white"
              stroke={color}
              strokeWidth={2}
              className="transition-all hover:r-6"
            />
            {/* Value Label bubble shown */}
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              className="text-[9px] font-bold fill-slate-700 dark:fill-slate-200 opacity-0 group-hover/dot:opacity-100 transition duration-150 font-mono"
            >
              {p.val} {unit}
            </text>
            
            {/* Year Label */}
            <text x={p.x} y={height - 8} textAnchor="middle" className="text-[10px] font-semibold fill-slate-500 font-sans">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Interactive Clustered Bar Chart (Commercial comparison of Expected Revenue vs Investments)
// -----------------------------------------------------------------------------
export interface BarChartItem {
  name: string;
  investment: number;
  revenue: number;
}

export function ClusteredRevenueBarChart({ data }: { data: BarChartItem[] }) {
  if (!data || data.length === 0) return null;
  const padding = 40;
  const width = 450;
  const height = 180;

  const maxVal = Math.max(...data.map((d) => Math.max(d.investment, d.revenue))) * 1.15;
  const minVal = 0;
  const range = maxVal - minVal;

  const barWidth = 24;
  const groupSpacing = (width - padding * 2) / data.length;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden text-slate-800">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none font-sans">
        {/* Horizontal grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + ratio * (height - padding * 2);
          const gridVal = maxVal - ratio * range;
          return (
            <g key={index} className="opacity-40">
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#E2E8F0"
                strokeWidth={1.2}
              />
              <text x={padding - 8} y={y + 3} textAnchor="end" className="text-[9px] fill-slate-400 font-mono">
                ₹{Math.round(gridVal / 1000)}k
              </text>
            </g>
          );
        })}

        {/* Draw bars */}
        {data.map((group, groupIdx) => {
          const groupCenterX = padding + groupIdx * groupSpacing + groupSpacing / 2;
          
          // Investment Bar
          const investHeight = ((group.investment - minVal) / range) * (height - padding * 2);
          const investX = groupCenterX - barWidth - 2;
          const investY = height - padding - investHeight;

          // Revenue Bar
          const revenueHeight = ((group.revenue - minVal) / range) * (height - padding * 2);
          const revenueX = groupCenterX + 2;
          const revenueY = height - padding - revenueHeight;

          return (
            <g key={groupIdx}>
              {/* Investment Bar (Amber / Tomato Red) */}
              <rect
                x={investX}
                y={investY}
                width={barWidth}
                height={investHeight}
                fill="#FFAB00"
                rx={3}
                className="transition-all hover:opacity-90 cursor-pointer"
              />
              
              {/* Revenue Bar (SaaS Emerald Green) */}
              <rect
                x={revenueX}
                y={revenueY}
                width={barWidth}
                height={revenueHeight}
                fill="#2E7D32"
                rx={3}
                className="transition-all hover:opacity-90 cursor-pointer"
              />

              {/* Text Values displayed vertically above bars on custom hover */}
              <text x={investX + barWidth / 2} y={investY - 5} textAnchor="middle" className="text-[8px] font-mono font-bold fill-amber-700">
                ₹{Math.round(group.investment / 1000)}k
              </text>
              <text x={revenueX + barWidth / 2} y={revenueY - 5} textAnchor="middle" className="text-[8px] font-mono font-bold fill-emerald-800 font-sans">
                ₹{Math.round(group.revenue / 1000)}k
              </text>

              {/* Group X Axis crop labels */}
              <text x={groupCenterX} y={height - 12} textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">
                {group.name}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Visual legends */}
      <div className="flex items-center justify-center gap-5 mt-3 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FFAB00]" />
          <span>Total Inputs (Seed, Fertilizer, Labor etc.)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#2E7D32]" />
          <span>Projected Crop Gross Revenue</span>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Interactive Circular Gauge Widget (Doughnuts for Water Saving Indices)
// -----------------------------------------------------------------------------
export function RadialProgressGauge({ value = 75, label = "Water Score", subtitle = "Drip System Active" }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 p-5 rounded-2xl flex flex-col items-center justify-center shadow-inner relative group text-center">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth="10"
            fill="transparent"
            className="dark:stroke-slate-700"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#4CAF50"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out fill-transparent"
          />
        </svg>
        <div className="absolute inset-x-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-slate-800 dark:text-slate-100 font-mono">{value}%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
        <Droplet className="w-3.5 h-3.5 text-blue-500 fill-blue-500 animate-bounce" /> {subtitle}
      </p>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Weather Icon Vector Generator (SVG components based on weather label)
// -----------------------------------------------------------------------------
export function WeatherVisualIcon({ type = "Sunny", className = "w-10 h-10" }) {
  switch (type.toLowerCase()) {
    case "rainy":
    case "shower":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${className} stroke-blue-500 fill-blue-100/10`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      );
    case "cloudy":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${className} stroke-slate-500 fill-slate-100`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 000-10h-.3a5.002 5.002 0 00-9.7 0H7a4 4 0 00-4 4z" />
        </svg>
      );
    case "storm":
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${className} stroke-amber-500 fill-yellow-100`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "sunny":
    default:
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${className} stroke-amber-500 fill-amber-100`}>
          <circle cx="12" cy="12" r="5" strokeWidth={2} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m16 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
        </svg>
      );
  }
}

// -----------------------------------------------------------------------------
// Sustainability badge system
// -----------------------------------------------------------------------------
export function EcoBadgeWidget({ score = 85 }) {
  const getBadgeTier = () => {
    if (score >= 90) return { title: "Dharati Mitra 👑", desc: "Gold Earth Stewardship Certificate", color: "from-amber-400 to-yellow-600", Icon: Award };
    if (score >= 75) return { title: "Harit Kranti Warrior 🌿", desc: "Silver Eco Farming Active Badge", color: "from-emerald-500 to-green-700", Icon: Sprout };
    return { title: "Jal Sanchay Patron 💧", desc: "Bronze Water Caretaker Level", color: "from-blue-400 to-sky-600", colorClass: "emerald", Icon: Droplet };
  };

  const tier = getBadgeTier();
  const Icon = tier.Icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-850 shadow-sm flex items-center gap-4 group">
      <div className={`p-4 bg-gradient-to-br ${tier.color} rounded-2xl text-white shadow-md transform group-hover:rotate-6 transition`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase font-heavy tracking-wider text-slate-400 font-mono">Current Status Tier</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <h4 className="text-md font-extrabold text-slate-800 dark:text-slate-100">{tier.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">{tier.desc}</p>
        <span className="inline-block mt-2 font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-transparent">
          Agriculture Score Index: {score}/100
        </span>
      </div>
    </div>
  );
}
