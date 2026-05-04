/* Template catalog and style directions */

const TEMPLATES = [
  { id: 't1', name: 'Premium Minimal', tag: 'Utility · Productivity', density: 'Low', bg: 'linear-gradient(160deg, #e9e6dd, #c8c3b6)', accent: '#111', type: 'serif', appCategories: ['productivity-focus', 'habit-tracker', 'learning-language'] },
  { id: 't2', name: 'Feature Focus', tag: 'SaaS · B2B tools', density: 'Medium', bg: 'linear-gradient(160deg, #0f1013, #1a1d22)', accent: 'oklch(84% 0.18 130)', type: 'mono', appCategories: ['budget-finance', 'habit-tracker', 'productivity-focus'] },
  { id: 't3', name: 'Bold Conversion', tag: 'Games · Shopping', density: 'High', bg: 'linear-gradient(160deg, oklch(70% 0.17 25), oklch(55% 0.2 15))', accent: '#fff', type: 'display', appCategories: ['addiction-quit', 'calorie-nutrition', 'sports-coaching'] },
  { id: 't4', name: 'Editorial Lifestyle', tag: 'Travel · Wellness', density: 'Low', bg: 'linear-gradient(160deg, #f0ebe3, #d8c9b3)', accent: '#2a1c0d', type: 'serif', appCategories: ['pregnancy-family', 'mood-mental-health', 'sleep-recovery'] },
  { id: 't5', name: 'Before / After', tag: 'Fitness · Photo', density: 'Medium', bg: 'linear-gradient(160deg, #1f1f23, #3a3a42)', accent: '#fff', type: 'sans', appCategories: ['sports-coaching', 'calorie-nutrition', 'addiction-quit'] },
  { id: 't6', name: 'Problem / Solution', tag: 'Finance · Health', density: 'Medium', bg: 'linear-gradient(160deg, oklch(30% 0.08 250), oklch(20% 0.05 250))', accent: 'oklch(82% 0.14 85)', type: 'sans', appCategories: ['budget-finance', 'mood-mental-health', 'addiction-quit'] },
  { id: 't7', name: 'High-Clarity Utility', tag: 'Developer · Tools', density: 'Low', bg: 'linear-gradient(160deg, #f7f7f5, #e8e8e4)', accent: '#0a0b0d', type: 'sans', appCategories: ['habit-tracker', 'learning-language', 'productivity-focus'] },
  { id: 't8', name: 'Wellness Premium', tag: 'Meditation · Sleep', density: 'Low', bg: 'linear-gradient(160deg, oklch(85% 0.04 210), oklch(65% 0.08 200))', accent: '#0f2a32', type: 'serif', appCategories: ['sleep-recovery', 'mood-mental-health', 'pregnancy-family'] },
  { id: 't9', name: 'Neon Velocity', tag: 'Sports · Habit challenge', density: 'High', bg: 'linear-gradient(160deg, #07131b, #0d3551)', accent: '#f7ff7f', type: 'display', appCategories: ['sports-coaching', 'habit-tracker', 'addiction-quit'] },
  { id: 't10', name: 'Fintech Signal', tag: 'Finance · Analytics', density: 'Medium', bg: 'linear-gradient(160deg, #081018, #12324c)', accent: '#d9f5ff', type: 'sans', appCategories: ['budget-finance', 'productivity-focus', 'learning-language'] },
  { id: 't11', name: 'Soft Bloom', tag: 'Family · Wellness', density: 'Low', bg: 'linear-gradient(160deg, #fff4ef, #ffd9d2)', accent: '#422221', type: 'serif', appCategories: ['pregnancy-family', 'mood-mental-health', 'sleep-recovery'] },
  { id: 't12', name: 'Monochrome Punch', tag: 'B2B · Utility', density: 'Medium', bg: 'linear-gradient(160deg, #0d0e11, #252932)', accent: '#ffffff', type: 'mono', appCategories: ['productivity-focus', 'budget-finance', 'habit-tracker'] },
  { id: 't13', name: 'Sunset Storyboard', tag: 'Lifestyle · Consumer', density: 'Medium', bg: 'linear-gradient(160deg, #f8d7a7, #d86f5d)', accent: '#2c160e', type: 'display', appCategories: ['calorie-nutrition', 'pregnancy-family', 'mood-mental-health'] },
  { id: 't14', name: 'Clinical Light', tag: 'Health · Clarity', density: 'Low', bg: 'linear-gradient(160deg, #edf8fb, #dbeef7)', accent: '#12303d', type: 'sans', appCategories: ['addiction-quit', 'sleep-recovery', 'calorie-nutrition'] },
  { id: 't15', name: 'Arcade Pop', tag: 'Consumer · Bold hooks', density: 'High', bg: 'linear-gradient(160deg, #3a1155, #ea4d7a)', accent: '#fff9c2', type: 'display', appCategories: ['learning-language', 'habit-tracker', 'sports-coaching'] },
  { id: 't16', name: 'Forest Depth', tag: 'Nature · Calm progress', density: 'Low', bg: 'linear-gradient(160deg, #10211a, #2f5b45)', accent: '#eef6e8', type: 'serif', appCategories: ['addiction-quit', 'mood-mental-health', 'sleep-recovery'] },
];

const STYLE_DIRECTIONS = [
  { id: 'clarity-grid', name: 'Clarity Grid', tag: 'Clean utility with restrained chrome', templateId: 't7', textStyle: 'crisp', ambientStyle: 'clean', ctaStyle: 'pill', chromeStyle: 'solid', frameStyle: 'ios-classic' },
  { id: 'cinematic-glow', name: 'Cinematic Glow', tag: 'Big contrast, spotlighted product', templateId: 't9', textStyle: 'jumbo', ambientStyle: 'spotlight', ctaStyle: 'block', chromeStyle: 'floating', frameStyle: 'ios-3d-right' },
  { id: 'editorial-note', name: 'Editorial Note', tag: 'Magazine feel, softer hierarchy', templateId: 't4', textStyle: 'editorial', ambientStyle: 'mesh', ctaStyle: 'outline', chromeStyle: 'minimal', frameStyle: 'ios-classic' },
  { id: 'glass-premium', name: 'Glass Premium', tag: 'Soft reflections and premium CTA', templateId: 't8', textStyle: 'soft', ambientStyle: 'halo', ctaStyle: 'glass', chromeStyle: 'floating', frameStyle: 'ios-3d-left' },
  { id: 'mono-benchmark', name: 'Mono Benchmark', tag: 'Sharp B2B / metric-heavy look', templateId: 't12', textStyle: 'mono-label', ambientStyle: 'clean', ctaStyle: 'outline', chromeStyle: 'minimal', frameStyle: 'android-flat' },
  { id: 'playful-convert', name: 'Playful Convert', tag: 'App store punch with bright emphasis', templateId: 't15', textStyle: 'jumbo', ambientStyle: 'mesh', ctaStyle: 'pill', chromeStyle: 'solid', frameStyle: 'ios-classic' },
];

const TEXT_STYLE_OPTIONS = [
  { id: 'crisp', name: 'Crisp', tag: 'Balanced and neutral' },
  { id: 'jumbo', name: 'Jumbo', tag: 'Large headline dominance' },
  { id: 'editorial', name: 'Editorial', tag: 'More refined and spacious' },
  { id: 'mono-label', name: 'Mono Label', tag: 'Product / fintech / B2B feel' },
  { id: 'soft', name: 'Soft', tag: 'Friendlier and calmer' },
];

const WEB_FONT_OPTIONS = [
  { id: 'inter-tight', name: 'Inter Tight', family: '"Inter Tight", sans-serif', kind: 'sans' },
  { id: 'manrope', name: 'Manrope', family: '"Manrope", sans-serif', kind: 'sans' },
  { id: 'plus-jakarta-sans', name: 'Plus Jakarta Sans', family: '"Plus Jakarta Sans", sans-serif', kind: 'sans' },
  { id: 'sora', name: 'Sora', family: '"Sora", sans-serif', kind: 'sans' },
  { id: 'space-grotesk', name: 'Space Grotesk', family: '"Space Grotesk", sans-serif', kind: 'sans' },
  { id: 'outfit', name: 'Outfit', family: '"Outfit", sans-serif', kind: 'sans' },
  { id: 'urbanist', name: 'Urbanist', family: '"Urbanist", sans-serif', kind: 'sans' },
  { id: 'dm-sans', name: 'DM Sans', family: '"DM Sans", sans-serif', kind: 'sans' },
  { id: 'figtree', name: 'Figtree', family: '"Figtree", sans-serif', kind: 'sans' },
  { id: 'lexend', name: 'Lexend', family: '"Lexend", sans-serif', kind: 'sans' },
  { id: 'archivo', name: 'Archivo', family: '"Archivo", sans-serif', kind: 'sans' },
  { id: 'work-sans', name: 'Work Sans', family: '"Work Sans", sans-serif', kind: 'sans' },
  { id: 'rubik', name: 'Rubik', family: '"Rubik", sans-serif', kind: 'sans' },
  { id: 'karla', name: 'Karla', family: '"Karla", sans-serif', kind: 'sans' },
  { id: 'nunito-sans', name: 'Nunito Sans', family: '"Nunito Sans", sans-serif', kind: 'sans' },
  { id: 'poppins', name: 'Poppins', family: '"Poppins", sans-serif', kind: 'sans' },
  { id: 'bricolage-grotesque', name: 'Bricolage Grotesque', family: '"Bricolage Grotesque", sans-serif', kind: 'sans' },
  { id: 'ibm-plex-sans', name: 'IBM Plex Sans', family: '"IBM Plex Sans", sans-serif', kind: 'sans' },
  { id: 'anton', name: 'Anton', family: '"Anton", sans-serif', kind: 'display' },
  { id: 'bebas-neue', name: 'Bebas Neue', family: '"Bebas Neue", sans-serif', kind: 'display' },
  { id: 'oswald', name: 'Oswald', family: '"Oswald", sans-serif', kind: 'display' },
  { id: 'archivo-black', name: 'Archivo Black', family: '"Archivo Black", sans-serif', kind: 'display' },
  { id: 'barlow-condensed', name: 'Barlow Condensed', family: '"Barlow Condensed", sans-serif', kind: 'display' },
  { id: 'fjalla-one', name: 'Fjalla One', family: '"Fjalla One", sans-serif', kind: 'display' },
  { id: 'fraunces', name: 'Fraunces', family: '"Fraunces", serif', kind: 'serif' },
  { id: 'playfair-display', name: 'Playfair Display', family: '"Playfair Display", serif', kind: 'serif' },
  { id: 'cormorant-garamond', name: 'Cormorant Garamond', family: '"Cormorant Garamond", serif', kind: 'serif' },
  { id: 'libre-baskerville', name: 'Libre Baskerville', family: '"Libre Baskerville", serif', kind: 'serif' },
  { id: 'ibm-plex-serif', name: 'IBM Plex Serif', family: '"IBM Plex Serif", serif', kind: 'serif' },
  { id: 'space-mono', name: 'Space Mono', family: '"Space Mono", monospace', kind: 'mono' },
  { id: 'jetbrains-mono', name: 'JetBrains Mono', family: '"JetBrains Mono", monospace', kind: 'mono' },
];

const AMBIENT_STYLE_OPTIONS = [
  { id: 'clean', name: 'Clean', tag: 'Near-flat background' },
  { id: 'glow', name: 'Glow', tag: 'Bottom gradient bloom' },
  { id: 'spotlight', name: 'Spotlight', tag: 'Focused radial emphasis' },
  { id: 'mesh', name: 'Mesh', tag: 'Layered color atmosphere' },
  { id: 'halo', name: 'Halo', tag: 'Soft ring around product' },
];

const CTA_STYLE_OPTIONS = [
  { id: 'pill', name: 'Pill', tag: 'Default rounded CTA' },
  { id: 'block', name: 'Block', tag: 'Stronger rectangular action' },
  { id: 'outline', name: 'Outline', tag: 'Lighter / premium CTA' },
  { id: 'glass', name: 'Glass', tag: 'Translucent glass button' },
];

const CHROME_STYLE_OPTIONS = [
  { id: 'solid', name: 'Solid', tag: 'App icon + title visible' },
  { id: 'minimal', name: 'Minimal', tag: 'Smaller product chrome' },
  { id: 'floating', name: 'Floating', tag: 'Chrome on glass chip' },
  { id: 'hidden', name: 'Hidden', tag: 'No top chrome' },
];

const CAPTION_STYLE_SYSTEMS = [
  { id: 'clarity', name: 'Clarity', tag: 'Direct value first' },
  { id: 'aso', name: 'ASO push', tag: 'Benefits + hooks' },
  { id: 'premium', name: 'Premium', tag: 'More polished / aspirational' },
  { id: 'results', name: 'Results', tag: 'Outcomes and proof' },
];

const APP_CATEGORIES = [
  { id: 'addiction-quit', label: 'Quitter une addiction', short: 'Addiction', description: 'Sobriety, nicotine quit, alcohol reduction, urge support.' },
  { id: 'habit-tracker', label: 'Habit tracker', short: 'Habits', description: 'Daily streaks, routines, check-ins, consistency loops.' },
  { id: 'sports-coaching', label: 'Sport et coaching', short: 'Sports', description: 'Workout plans, running, strength, performance tracking.' },
  { id: 'calorie-nutrition', label: 'Calories et nutrition', short: 'Nutrition', description: 'Meal logging, macros, fasting, weight goals.' },
  { id: 'sleep-recovery', label: 'Sommeil et récupération', short: 'Sleep', description: 'Sleep tracking, bedtime routines, recovery scores.' },
  { id: 'mood-mental-health', label: 'Humeur et santé mentale', short: 'Mental', description: 'Mood logs, journaling, anxiety relief, CBT flows.' },
  { id: 'budget-finance', label: 'Budget et finances perso', short: 'Finance', description: 'Expense tracking, budgets, savings goals, subscriptions.' },
  { id: 'pregnancy-family', label: 'Grossesse et famille', short: 'Family', description: 'Pregnancy tracking, baby logs, family organization.' },
  { id: 'learning-language', label: 'Apprentissage et langues', short: 'Learning', description: 'Language learning, flashcards, courses, quizzes.' },
  { id: 'productivity-focus', label: 'Productivité et focus', short: 'Productivity', description: 'Task flows, focus timers, planning, deep work.' },
];

const STORE_EXPORT_PRESETS = [
  {
    id: 'essential',
    name: 'Essential iOS & Android',
    note: 'Couvre les tailles de base pour sortir un pack iPhone + Android phone.',
    specs: [
      { id: 'apple-69', platform: 'apple', label: 'iPhone 6.9"', width: 1290, height: 2796, requirement: 'Apple primary iPhone slot' },
      { id: 'apple-65', platform: 'apple', label: 'iPhone 6.5"', width: 1284, height: 2778, requirement: 'Apple fallback slot' },
      { id: 'apple-55', platform: 'apple', label: 'iPhone 5.5"', width: 1242, height: 2208, requirement: 'Legacy iPhone slot' },
      { id: 'google-phone', platform: 'google', label: 'Android phone', width: 1080, height: 1920, requirement: 'Play phone screenshots' },
    ],
  },
  {
    id: 'full',
    name: 'All iOS & Android sizes',
    note: 'Ajoute plus de slots Apple et les sorties Android phone/tablet.',
    specs: [
      { id: 'apple-69', platform: 'apple', label: 'iPhone 6.9"', width: 1290, height: 2796, requirement: 'Apple primary iPhone slot' },
      { id: 'apple-65', platform: 'apple', label: 'iPhone 6.5"', width: 1284, height: 2778, requirement: 'Apple fallback slot' },
      { id: 'apple-63', platform: 'apple', label: 'iPhone 6.3"', width: 1179, height: 2556, requirement: 'Apple secondary iPhone slot' },
      { id: 'apple-61', platform: 'apple', label: 'iPhone 6.1"', width: 1170, height: 2532, requirement: 'Apple scaled fallback slot' },
      { id: 'apple-55', platform: 'apple', label: 'iPhone 5.5"', width: 1242, height: 2208, requirement: 'Legacy iPhone slot' },
      { id: 'apple-ipad', platform: 'apple', label: 'iPad portrait', width: 1536, height: 2048, requirement: 'Apple iPad slot' },
      { id: 'google-phone', platform: 'google', label: 'Android phone', width: 1080, height: 1920, requirement: 'Play phone screenshots' },
      { id: 'google-tablet-7', platform: 'google', label: 'Android tablet 7"', width: 1200, height: 1920, requirement: 'Play large-screen portrait' },
      { id: 'google-tablet-10', platform: 'google', label: 'Android tablet 10"', width: 1600, height: 2560, requirement: 'Play large-screen portrait' },
    ],
  },
];

// Helper functions
function styleDirectionById(directionId) {
  return STYLE_DIRECTIONS.find((item) => item.id === directionId) || null;
}

function exportPresetById(presetId) {
  return STORE_EXPORT_PRESETS.find((item) => item.id === presetId) || STORE_EXPORT_PRESETS[0];
}

function categoryById(categoryId) {
  return APP_CATEGORIES.find((item) => item.id === categoryId) || null;
}

function normalizeCategory(categoryValue) {
  if (!categoryValue) return APP_CATEGORIES[0].id;
  if (categoryById(categoryValue)) return categoryValue;
  const lowered = String(categoryValue).toLowerCase().trim();
  const match = APP_CATEGORIES.find((item) =>
    item.id === lowered
    || item.label.toLowerCase() === lowered
    || item.short.toLowerCase() === lowered
  );
  return match ? match.id : APP_CATEGORIES[0].id;
}

// Export to global namespace
Object.assign(window, {
  TEMPLATES,
  STYLE_DIRECTIONS,
  TEXT_STYLE_OPTIONS,
  WEB_FONT_OPTIONS,
  AMBIENT_STYLE_OPTIONS,
  CTA_STYLE_OPTIONS,
  CHROME_STYLE_OPTIONS,
  CAPTION_STYLE_SYSTEMS,
  APP_CATEGORIES,
  STORE_EXPORT_PRESETS,
  styleDirectionById,
  exportPresetById,
  categoryById,
  normalizeCategory,
});
