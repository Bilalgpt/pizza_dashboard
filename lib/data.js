// ─────────────────────────────────────────────────────────────
// Demo data for the WhatsApp Growth dashboard.
// All figures are illustrative mock data for a Pakistan-based
// pizza / fast-food brand. Swap with a real API later.
// ─────────────────────────────────────────────────────────────

export const brand = {
  name: "Pizza Max",
  agency: "GrowthWave Agency",
  currency: "Rs.",
};

// Validated chart categorical slots (dark-surface steps)
export const SERIES = {
  blue: "#3987e5",
  orange: "#d95926",
  aqua: "#199e70",
  yellow: "#c98500",
  magenta: "#d55181",
  green: "#008300",
  violet: "#9085e9",
  red: "#e66767",
};

// ── Headline KPIs (top stat cards) ──────────────────────────
export const kpis = [
  {
    key: "customers",
    label: "Customers in database",
    value: 12480,
    delta: +8.2,
    spark: [9100, 9600, 10050, 10700, 11200, 11780, 12120, 12480],
    suffix: "",
    hint: "list growth this quarter",
  },
  {
    key: "revenue",
    label: "WhatsApp-driven revenue",
    value: 3184500,
    delta: +14.6,
    spark: [1.9, 2.1, 2.3, 2.5, 2.6, 2.8, 3.0, 3.18].map((n) => n * 1e6),
    money: true,
    hint: "last 30 days",
  },
  {
    key: "orders",
    label: "Orders this month",
    value: 4932,
    delta: +6.1,
    spark: [3600, 3900, 4100, 4300, 4500, 4650, 4820, 4932],
    hint: "all channels",
  },
  {
    key: "codes",
    label: "Promo codes redeemed",
    value: 1876,
    delta: +21.4,
    spark: [900, 1050, 1180, 1320, 1480, 1600, 1740, 1876],
    hint: "attributed to campaigns",
  },
];

// ── Orders over time (area chart) ───────────────────────────
export const ordersTrend = [
  { day: "Oct 10", online: 92, branch: 140, whatsapp: 61, phone: 34 },
  { day: "Oct 14", online: 110, branch: 155, whatsapp: 78, phone: 40 },
  { day: "Oct 18", online: 128, branch: 150, whatsapp: 96, phone: 38 },
  { day: "Oct 22", online: 142, branch: 168, whatsapp: 120, phone: 44 },
  { day: "Oct 26", online: 160, branch: 172, whatsapp: 150, phone: 41 },
  { day: "Oct 30", online: 175, branch: 180, whatsapp: 182, phone: 46 },
  { day: "Nov 03", online: 188, branch: 176, whatsapp: 210, phone: 43 },
  { day: "Nov 07", online: 205, branch: 190, whatsapp: 248, phone: 48 },
];

// ── Order channels (donut) ──────────────────────────────────
// Categorical order validated for CVD: aqua→orange→blue→yellow clears every
// adjacent gate (worst CVD ΔE 9.4, normal-vision 19.8) incl. the donut-ring wrap.
export const channels = [
  { name: "WhatsApp", value: 2110, color: SERIES.aqua },
  { name: "Branch visits", value: 1520, color: SERIES.orange },
  { name: "Online", value: 982, color: SERIES.blue },
  { name: "Phone", value: 320, color: SERIES.yellow },
];

// ── Customer segments (used in flow + segments page) ────────
export const segments = [
  {
    key: "new",
    label: "New",
    who: "First order this week",
    count: 1240,
    color: SERIES.blue,
    message: "Thanks for your first order! Here's 10% off your next one.",
  },
  {
    key: "regular",
    label: "Regulars & VIPs",
    who: "3+ orders a month",
    count: 3860,
    color: SERIES.green,
    message: "VIP early access: try our new Truffle Tikka before anyone else.",
  },
  {
    key: "inactive",
    label: "Inactive 30+ days",
    who: "No order in 30+ days",
    count: 2975,
    color: SERIES.orange,
    message: "We miss you! Rs. 300 off your next pizza this week.",
  },
  {
    key: "birthday",
    label: "Birthdays this month",
    who: "Birthday this month",
    count: 412,
    color: SERIES.magenta,
    message: "Happy birthday! Free lava cake with any order.",
  },
  {
    key: "nearby",
    label: "Nearby",
    who: "Lives near a branch",
    count: 3993,
    color: SERIES.violet,
    message: "New deal at your nearest branch, this weekend only.",
  },
];

// ── Data sources feeding the database (flow left column) ────
export const sources = [
  { key: "branch", label: "Branch visits", value: 4820, icon: "Store" },
  { key: "online", label: "Online orders", value: 3110, icon: "Globe" },
  { key: "whatsapp", label: "WhatsApp", value: 3290, icon: "MessageCircle" },
  { key: "phone", label: "Phone calls", value: 1260, icon: "Phone" },
];

// ── Campaigns table ─────────────────────────────────────────
export const campaigns = [
  {
    code: "WA20",
    name: "Truffle Tikka launch reel",
    type: "Launch video",
    segment: "Regulars & VIPs",
    sent: 3860,
    read: 3012,
    redeemed: 487,
    revenue: 612400,
    status: "live",
  },
  {
    code: "MISSYOU",
    name: "We miss you — 30 day win-back",
    type: "Win-back",
    segment: "Inactive 30+ days",
    sent: 2975,
    read: 1980,
    redeemed: 356,
    revenue: 398200,
    status: "live",
  },
  {
    code: "MONDAY15",
    name: "Slow-hour Monday night deal",
    type: "Slow-hour",
    segment: "Nearby",
    sent: 3993,
    read: 2540,
    redeemed: 402,
    revenue: 441800,
    status: "scheduled",
  },
  {
    code: "BDAYTREAT",
    name: "Birthday free dessert",
    type: "Birthday",
    segment: "Birthdays this month",
    sent: 412,
    read: 388,
    redeemed: 214,
    revenue: 162900,
    status: "live",
  },
  {
    code: "PSLKICK",
    name: "Order before the toss — PSL",
    type: "Match-day",
    segment: "All opted-in",
    sent: 11200,
    read: 7640,
    redeemed: 1021,
    revenue: 1388700,
    status: "completed",
  },
  {
    code: "WELCOME10",
    name: "First-order welcome offer",
    type: "Onboarding",
    segment: "New",
    sent: 1240,
    read: 1102,
    redeemed: 389,
    revenue: 287500,
    status: "live",
  },
];

// ── Branches ────────────────────────────────────────────────
export const branches = [
  { name: "Gulberg", city: "Lahore", customers: 3120, orders: 1180, trend: +9 },
  { name: "DHA Phase 5", city: "Lahore", customers: 2740, orders: 1020, trend: +12 },
  { name: "Bahadurabad", city: "Karachi", customers: 2460, orders: 960, trend: +4 },
  { name: "F-10 Markaz", city: "Islamabad", customers: 2210, orders: 870, trend: +7 },
  { name: "Saddar", city: "Rawalpindi", customers: 1950, orders: 740, trend: -2 },
];

// ── Recent customers (table on customers page) ──────────────
export const customers = [
  { name: "Ayesha Khan", phone: "+92 300 •• 4821", area: "Gulberg", branch: "Gulberg", fav: "Chicken Tikka", orders: 14, spend: 38400, last: "2d ago", channel: "WhatsApp", segment: "Regulars & VIPs", birthday: "Nov 21" },
  { name: "Bilal Ahmed", phone: "+92 321 •• 1190", area: "DHA 5", branch: "DHA Phase 5", fav: "Fajita", orders: 3, spend: 7200, last: "5d ago", channel: "Online", segment: "Nearby", birthday: "Mar 02" },
  { name: "Fatima Noor", phone: "+92 333 •• 7765", area: "Bahadurabad", branch: "Bahadurabad", fav: "Malai Boti", orders: 1, spend: 1850, last: "1d ago", channel: "Branch", segment: "New", birthday: "Nov 09" },
  { name: "Hamza Sheikh", phone: "+92 345 •• 3302", area: "F-10", branch: "F-10 Markaz", fav: "Pepperoni", orders: 22, spend: 61200, last: "Today", channel: "WhatsApp", segment: "Regulars & VIPs", birthday: "Jul 14" },
  { name: "Zara Malik", phone: "+92 301 •• 9043", area: "Saddar", branch: "Saddar", fav: "Chicken Tikka", orders: 0, spend: 0, last: "42d ago", channel: "Phone", segment: "Inactive 30+ days", birthday: "Nov 28" },
  { name: "Usman Tariq", phone: "+92 312 •• 5567", area: "Gulberg", branch: "Gulberg", fav: "Cheese Lover", orders: 8, spend: 19800, last: "9d ago", channel: "Online", segment: "Regulars & VIPs", birthday: "Jan 19" },
  { name: "Mahnoor Raza", phone: "+92 322 •• 2218", area: "DHA 5", branch: "DHA Phase 5", fav: "Fajita", orders: 2, spend: 4100, last: "33d ago", channel: "WhatsApp", segment: "Inactive 30+ days", birthday: "Nov 03" },
  { name: "Ali Hassan", phone: "+92 346 •• 8891", area: "Bahadurabad", branch: "Bahadurabad", fav: "Malai Boti", orders: 5, spend: 12600, last: "3d ago", channel: "Branch", segment: "Nearby", birthday: "May 30" },
];

// ── Monthly report mini-metrics ─────────────────────────────
export const reportMetrics = [
  { key: "read", label: "Messages read", value: "68.4%", sub: "avg open rate", delta: +3.1 },
  { key: "codes", label: "Codes used", value: "1,876", sub: "this month", delta: +21.4 },
  { key: "sales", label: "Orders & sales", value: "Rs. 3.18M", sub: "from WhatsApp", delta: +14.6 },
  { key: "growth", label: "List growth", value: "+1,240", sub: "new customers", delta: +8.2 },
];

// ── Example poll (engagement) ───────────────────────────────
export const poll = {
  question: "Which pizza should be our Pizza of the Month?",
  totalVotes: 1240,
  winner: "Chicken Tikka",
  options: [
    { label: "Chicken Tikka", pct: 46, color: SERIES.green },
    { label: "Fajita", pct: 28, color: SERIES.blue },
    { label: "Malai Boti", pct: 18, color: SERIES.orange },
    { label: "Pepperoni", pct: 8, color: SERIES.yellow },
  ],
};

// ── Trends & Forecast ───────────────────────────────────────
// 12 months of history (Dec 2025 → Nov 2026) + 3-month forecast.
// `band` = [low, high] confidence interval, only on forecast points.
export const forecast = [
  { month: "Dec", orders: 6100, actual: 6100, forecast: null, band: null, season: "Winter" },
  { month: "Jan", orders: 6420, actual: 6420, forecast: null, band: null, season: "Winter" },
  { month: "Feb", orders: 5780, actual: 5780, forecast: null, band: null, season: "Winter" },
  { month: "Mar", orders: 6640, actual: 6640, forecast: null, band: null, season: "Ramadan" },
  { month: "Apr", orders: 4910, actual: 4910, forecast: null, band: null, season: "Spring" },
  { month: "May", orders: 4580, actual: 4580, forecast: null, band: null, season: "Summer" },
  { month: "Jun", orders: 4390, actual: 4390, forecast: null, band: null, season: "Summer" },
  { month: "Jul", orders: 4820, actual: 4820, forecast: null, band: null, season: "Monsoon" },
  { month: "Aug", orders: 5210, actual: 5210, forecast: null, band: null, season: "Monsoon" },
  { month: "Sep", orders: 4960, actual: 4960, forecast: null, band: null, season: "Autumn" },
  { month: "Oct", orders: 5390, actual: 5390, forecast: null, band: null, season: "Autumn" },
  { month: "Nov", orders: 5920, actual: 5920, forecast: 5920, band: null, season: "Autumn" },
  { month: "Dec", orders: 6550, actual: null, forecast: 6550, band: [6050, 7050], season: "Winter" },
  { month: "Jan", orders: 6980, actual: null, forecast: 6980, band: [6330, 7630], season: "Winter" },
  { month: "Feb", orders: 6340, actual: null, forecast: 6340, band: [5600, 7080], season: "Winter" },
];

export const forecastSummary = [
  { label: "Projected orders (next 3 mo)", value: "19,870", sub: "+12% vs last winter" },
  { label: "Expected peak month", value: "January", sub: "winter comfort-food season" },
  { label: "Forecast confidence", value: "±9%", sub: "based on 12-month pattern" },
];

// Seasonal popularity index (0–100) per item per season.
export const seasons = ["Winter", "Spring", "Summer", "Monsoon", "Autumn"];
export const seasonHeatmap = [
  { item: "Chicken Tikka", values: [95, 70, 55, 80, 85] },
  { item: "Malai Boti", values: [88, 60, 45, 70, 75] },
  { item: "Cheese Lover", values: [82, 68, 50, 78, 74] },
  { item: "Pepperoni", values: [70, 65, 60, 72, 68] },
  { item: "Fajita", values: [60, 75, 88, 65, 70] },
];

// Monthly order share for the top 4 items (across the year).
export const itemTrends = [
  { month: "Dec", tikka: 1820, cheese: 1340, pepperoni: 1180, fajita: 760 },
  { month: "Jan", tikka: 1980, cheese: 1420, pepperoni: 1210, fajita: 790 },
  { month: "Feb", tikka: 1710, cheese: 1250, pepperoni: 1120, fajita: 880 },
  { month: "Mar", tikka: 2040, cheese: 1480, pepperoni: 1260, fajita: 980 },
  { month: "Apr", tikka: 1360, cheese: 980, pepperoni: 1040, fajita: 1180 },
  { month: "May", tikka: 1180, cheese: 860, pepperoni: 980, fajita: 1320 },
  { month: "Jun", tikka: 1090, cheese: 820, pepperoni: 940, fajita: 1380 },
  { month: "Jul", tikka: 1280, cheese: 1060, pepperoni: 1010, fajita: 1120 },
  { month: "Aug", tikka: 1440, cheese: 1180, pepperoni: 1080, fajita: 1040 },
  { month: "Sep", tikka: 1360, cheese: 1100, pepperoni: 1020, fajita: 980 },
  { month: "Oct", tikka: 1540, cheese: 1240, pepperoni: 1090, fajita: 920 },
  { month: "Nov", tikka: 1760, cheese: 1360, pepperoni: 1150, fajita: 840 },
];

// Same CVD-validated categorical order as channels (aqua→orange→blue→yellow).
export const itemTrendDefs = [
  { key: "tikka", label: "Chicken Tikka", color: SERIES.aqua },
  { key: "cheese", label: "Cheese Lover", color: SERIES.orange },
  { key: "pepperoni", label: "Pepperoni", color: SERIES.blue },
  { key: "fajita", label: "Fajita", color: SERIES.yellow },
];

// Demand uplift during key Pakistani seasons / events (% vs baseline).
export const seasonalUplift = [
  { event: "Eid specials", uplift: 55, note: "Eid-ul-Fitr & Eid-ul-Azha" },
  { event: "Ramadan (Iftar)", uplift: 48, note: "evening Iftar rush" },
  { event: "PSL match-days", uplift: 40, note: "order before the toss" },
  { event: "Winter nights", uplift: 32, note: "Dec–Jan comfort food" },
  { event: "Rainy “barish” days", uplift: 27, note: "monsoon delivery spike" },
  { event: "Exam-night midnight", uplift: 22, note: "student late-night deals" },
];

// ── Peak order times (staffing, stock & campaign timing) ────
// Average orders per hour on a typical day — two clear peaks:
// lunch (~1 PM) and dinner (~8 PM).
export const hourlyOrders = [
  { h: 0, label: "12a", orders: 40 },
  { h: 1, label: "1a", orders: 25 },
  { h: 2, label: "2a", orders: 12 },
  { h: 3, label: "3a", orders: 6 },
  { h: 4, label: "4a", orders: 4 },
  { h: 5, label: "5a", orders: 5 },
  { h: 6, label: "6a", orders: 10 },
  { h: 7, label: "7a", orders: 22 },
  { h: 8, label: "8a", orders: 38 },
  { h: 9, label: "9a", orders: 55 },
  { h: 10, label: "10a", orders: 80 },
  { h: 11, label: "11a", orders: 140 },
  { h: 12, label: "12p", orders: 230 },
  { h: 13, label: "1p", orders: 262 },
  { h: 14, label: "2p", orders: 180 },
  { h: 15, label: "3p", orders: 110 },
  { h: 16, label: "4p", orders: 95 },
  { h: 17, label: "5p", orders: 120 },
  { h: 18, label: "6p", orders: 190 },
  { h: 19, label: "7p", orders: 280 },
  { h: 20, label: "8p", orders: 342 },
  { h: 21, label: "9p", orders: 300 },
  { h: 22, label: "10p", orders: 210 },
  { h: 23, label: "11p", orders: 110 },
];

// Day-of-week × time-slot order intensity (0–100).
export const peakDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const peakSlots = ["6–11a", "11a–2p", "2–5p", "5–8p", "8–11p", "11p–2a"];
export const peakHeatmap = [
  { day: "Mon", values: [20, 60, 35, 55, 72, 30] },
  { day: "Tue", values: [22, 58, 33, 54, 70, 28] },
  { day: "Wed", values: [24, 62, 36, 58, 75, 32] },
  { day: "Thu", values: [26, 66, 38, 62, 80, 40] },
  { day: "Fri", values: [30, 72, 42, 70, 92, 60] },
  { day: "Sat", values: [34, 70, 46, 74, 95, 68] },
  { day: "Sun", values: [32, 68, 44, 72, 90, 55] },
];

export const peakSummary = [
  { label: "Busiest hour", value: "8–9 PM", sub: "dinner rush — max staff & stock" },
  { label: "Lunch peak", value: "1 PM", sub: "office & student orders" },
  { label: "Quietest hours", value: "3–5 AM", sub: "minimal staffing needed" },
  { label: "Busiest day", value: "Saturday", sub: "weekend dinner is king" },
];

// Best times to send WhatsApp campaigns, derived from the peaks.
export const sendWindows = [
  { time: "11:30 AM", label: "Before the lunch rush", detail: "Hits office & student lunch planning", peak: "Lunch peaks ~1 PM" },
  { time: "6:30 PM", label: "Before the dinner rush", detail: "Families deciding on dinner", peak: "Dinner peaks ~8 PM" },
  { time: "Fri–Sat 7 PM", label: "Weekend prime time", detail: "Biggest window of the week", peak: "Sat dinner intensity 95/100" },
  { time: "After 11 PM", label: "Avoid late nights", detail: "Low orders & higher opt-outs", peak: "Respect meal times" },
];

// ── Customer Insights ───────────────────────────────────────
// Headline retention / value health metrics for the page top.
export const insightKpis = [
  { key: "repeat", label: "Repeat-order rate", value: "38%", delta: +4.2, sub: "customers who ordered again" },
  { key: "retain90", label: "90-day retention", value: "22%", delta: +3.1, sub: "still ordering after 3 months" },
  { key: "aov", label: "Avg order value", value: "Rs. 1,180", delta: +6.0, sub: "up from Rs. 1,110" },
  { key: "atrisk", label: "Revenue at risk", value: "Rs. 742K", delta: -0, sub: "from customers about to churn", danger: true },
];

// Cohort retention: of customers acquired in month X, what % still
// order N months later. Triangular — recent cohorts have fewer months.
// Note the IMPROVING M1 column (42% → 54%) — the system is working.
export const cohortMonths = ["M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7"];
export const cohorts = [
  { cohort: "Apr", size: 1180, retention: [100, 42, 30, 25, 22, 21, 20, 20] },
  { cohort: "May", size: 1240, retention: [100, 44, 31, 26, 23, 22, 21] },
  { cohort: "Jun", size: 1320, retention: [100, 45, 33, 27, 24, 23] },
  { cohort: "Jul", size: 1290, retention: [100, 47, 34, 28, 25] },
  { cohort: "Aug", size: 1410, retention: [100, 49, 36, 30] },
  { cohort: "Sep", size: 1380, retention: [100, 51, 38] },
  { cohort: "Oct", size: 1470, retention: [100, 54] },
  { cohort: "Nov", size: 1560, retention: [100] },
];

// RFM value tiers (Recency, Frequency, Monetary).
export const rfmTiers = [
  { key: "champions", label: "Champions", count: 1240, avgSpend: 48200, recency: "≤7 days", color: SERIES.green, action: "Reward & give VIP early access" },
  { key: "loyal", label: "Loyal Customers", count: 2680, avgSpend: 31400, recency: "≤14 days", color: SERIES.blue, action: "Upsell bundles, ask for referrals" },
  { key: "potential", label: "Potential Loyalists", count: 2310, avgSpend: 12600, recency: "≤21 days", color: SERIES.aqua, action: "Nudge toward their 3rd order" },
  { key: "atrisk", label: "At Risk", count: 2120, avgSpend: 24800, recency: "30–60 days", color: SERIES.orange, action: "Win-back offer before they churn" },
  { key: "cantlose", label: "Can't Lose Them", count: 480, avgSpend: 68400, recency: "60–90 days", color: SERIES.magenta, action: "Personal high-value win-back" },
  { key: "hibernating", label: "Hibernating", count: 3650, avgSpend: 4200, recency: "90+ days", color: SERIES.violet, action: "Low-cost reactivation blast" },
];

// RFM distribution matrix: Recency (rows, R5 = most recent) × Frequency
// (cols, F5 = most frequent). Cell = customer count.
export const rfmRecency = ["R5", "R4", "R3", "R2", "R1"];
export const rfmFrequency = ["F1", "F2", "F3", "F4", "F5"];
export const rfmMatrix = [
  [180, 240, 360, 520, 640],
  [220, 300, 420, 480, 300],
  [340, 460, 420, 260, 140],
  [520, 480, 300, 160, 80],
  [900, 560, 240, 120, 60],
];

// Churn-risk: specific customers about to lapse + the recommended save.
export const churnSummary = {
  atRisk: 2600,
  revenueAtRisk: 742000,
  savedLastMonth: 418,
};
export const churnRisk = [
  { name: "Hamza Sheikh", lastDays: 34, orders: 22, spend: 61200, tier: "Can't Lose Them", score: 92, offer: "Rs. 500 off + free dessert" },
  { name: "Ayesha Khan", lastDays: 41, orders: 14, spend: 38400, tier: "At Risk", score: 88, offer: "Rs. 300 off next order" },
  { name: "Usman Tariq", lastDays: 38, orders: 8, spend: 19800, tier: "At Risk", score: 76, offer: "Buy 1 get 1 — this week" },
  { name: "Mahnoor Raza", lastDays: 33, orders: 2, spend: 4100, tier: "At Risk", score: 71, offer: "Rs. 200 welcome-back" },
  { name: "Zara Malik", lastDays: 42, orders: 3, spend: 6300, tier: "At Risk", score: 69, offer: "Free drink with any pizza" },
  { name: "Ali Hassan", lastDays: 31, orders: 5, spend: 12600, tier: "At Risk", score: 64, offer: "20% off nearest branch" },
];

export function formatMoney(n) {
  if (n >= 1e6) return `Rs. ${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `Rs. ${(n / 1e3).toFixed(0)}K`;
  return `Rs. ${n}`;
}

export function formatNum(n) {
  return n.toLocaleString("en-US");
}

// ── AI-generated ad creatives (served from /public/ads) ─────
export const aiAds = [
  {
    key: "pizza-wings-drop",
    title: "Wings Drop",
    product: "Loaded Wings",
    desc: "Hero launch spot for the new wings bucket — slow-mo drop, dipping sauce pull, end-card CTA.",
    src: "/ads/pizza-wings-drop.mp4",
    poster: "/ads/pizza-wings-drop.jpg",
    duration: "0:36",
    ratio: "16 / 9",
    tags: ["Product hero", "9:16 ready", "Sound on"],
    featured: true,
  },
  {
    key: "pizza-burger",
    title: "Burger Commercial",
    product: "Signature Burger",
    desc: "Full 36-second commercial for the signature burger — stacked build, flame-grill glow and a music-backed end card.",
    src: "/ads/pizza-burger.mp4",
    poster: "/ads/pizza-burger.jpg",
    duration: "0:36",
    ratio: "16 / 9",
    tags: ["Commercial", "Sound on", "Paid-ready"],
  },
  {
    key: "pizza-max",
    title: "Pizza Max Signature",
    product: "Signature Pizza",
    desc: "Flagship brand film — cheese pull, oven glow and a clean logo lock-up for top-of-funnel awareness.",
    src: "/ads/pizza-max.mp4",
    poster: "/ads/pizza-max.jpg",
    duration: "0:27",
    ratio: "16 / 9",
    tags: ["Brand film", "Awareness"],
  },
  {
    key: "pizza-ad2",
    title: "Pizza Max — Spot 2",
    product: "Signature Pizza",
    desc: "Second pizza spot — appetite-driven close-ups and a punchy end card built for paid and Status placements.",
    src: "/ads/pizza-ad2.mp4",
    poster: "/ads/pizza-ad2.jpg",
    duration: "0:20",
    ratio: "16 / 9",
    tags: ["Product hero", "Paid-ready"],
  },
  {
    key: "coffee-ad-1",
    title: "Coffee Pour",
    product: "Barista Coffee",
    desc: "Short-form coffee teaser, pour-and-steam close-up tuned for WhatsApp status and Reels.",
    src: "/ads/coffee-ad-1.mp4",
    poster: "/ads/coffee-ad-1.jpg",
    duration: "0:15",
    ratio: "16 / 9",
    tags: ["Short-form", "Status / Reels"],
  },
];

export const adStats = [
  { key: "creatives", label: "AI creatives ready", value: "5", sub: "across 4 products" },
  { key: "cost", label: "Cost vs. agency shoot", value: "-94%", sub: "no studio, no crew" },
  { key: "turnaround", label: "Avg. turnaround", value: "< 1 day", sub: "brief to broadcast" },
  { key: "formats", label: "Delivery formats", value: "Reels · Status · Ads", sub: "one source, every channel" },
];
