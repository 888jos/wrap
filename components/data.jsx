/* Static catalogs + local workspace helpers */

const TEMPLATES = [
  { id: 't1', name: 'Premium Minimal', tag: 'Utility · Productivity', density: 'Low', bg: 'linear-gradient(160deg, #e9e6dd, #c8c3b6)', accent: '#111', type: 'serif', appCategories: ['productivity', 'education', 'utilities'] },
  { id: 't2', name: 'Feature Focus', tag: 'SaaS · B2B tools', density: 'Medium', bg: 'linear-gradient(160deg, #0f1013, #1a1d22)', accent: 'oklch(84% 0.18 130)', type: 'mono', appCategories: ['business', 'finance', 'productivity'] },
  { id: 't3', name: 'Bold Conversion', tag: 'Games · Shopping', density: 'High', bg: 'linear-gradient(160deg, oklch(70% 0.17 25), oklch(55% 0.2 15))', accent: '#fff', type: 'display', appCategories: ['shopping', 'health-fitness', 'games'] },
  { id: 't4', name: 'Editorial Lifestyle', tag: 'Travel · Wellness', density: 'Low', bg: 'linear-gradient(160deg, #f0ebe3, #d8c9b3)', accent: '#2a1c0d', type: 'serif', appCategories: ['lifestyle', 'health-fitness', 'travel'] },
  { id: 't5', name: 'Before / After', tag: 'Fitness · Photo', density: 'Medium', bg: 'linear-gradient(160deg, #1f1f23, #3a3a42)', accent: '#fff', type: 'sans', appCategories: ['health-fitness', 'photo-video', 'sports'] },
  { id: 't6', name: 'Problem / Solution', tag: 'Finance · Health', density: 'Medium', bg: 'linear-gradient(160deg, oklch(30% 0.08 250), oklch(20% 0.05 250))', accent: 'oklch(82% 0.14 85)', type: 'sans', appCategories: ['finance', 'health-fitness', 'medical'] },
  { id: 't7', name: 'High-Clarity Utility', tag: 'Developer · Tools', density: 'Low', bg: 'linear-gradient(160deg, #f7f7f5, #e8e8e4)', accent: '#0a0b0d', type: 'sans', appCategories: ['developer-tools', 'productivity', 'utilities'] },
  { id: 't8', name: 'Wellness Premium', tag: 'Meditation · Sleep', density: 'Low', bg: 'linear-gradient(160deg, oklch(85% 0.04 210), oklch(65% 0.08 200))', accent: '#0f2a32', type: 'serif', appCategories: ['health-fitness', 'lifestyle', 'medical'] },
  { id: 't9', name: 'Neon Velocity', tag: 'Sports · Habit challenge', density: 'High', bg: 'linear-gradient(160deg, #07131b, #0d3551)', accent: '#f7ff7f', type: 'display', appCategories: ['sports', 'health-fitness', 'games'] },
  { id: 't10', name: 'Fintech Signal', tag: 'Finance · Analytics', density: 'Medium', bg: 'linear-gradient(160deg, #081018, #12324c)', accent: '#d9f5ff', type: 'sans', appCategories: ['finance', 'business', 'productivity'] },
  { id: 't11', name: 'Soft Bloom', tag: 'Family · Wellness', density: 'Low', bg: 'linear-gradient(160deg, #fff4ef, #ffd9d2)', accent: '#422221', type: 'serif', appCategories: ['lifestyle', 'health-fitness', 'kids'] },
  { id: 't12', name: 'Monochrome Punch', tag: 'B2B · Utility', density: 'Medium', bg: 'linear-gradient(160deg, #0d0e11, #252932)', accent: '#ffffff', type: 'mono', appCategories: ['business', 'productivity', 'utilities'] },
  { id: 't13', name: 'Sunset Storyboard', tag: 'Lifestyle · Consumer', density: 'Medium', bg: 'linear-gradient(160deg, #f8d7a7, #d86f5d)', accent: '#2c160e', type: 'display', appCategories: ['lifestyle', 'food-drink', 'health-fitness'] },
  { id: 't14', name: 'Clinical Light', tag: 'Health · Clarity', density: 'Low', bg: 'linear-gradient(160deg, #edf8fb, #dbeef7)', accent: '#12303d', type: 'sans', appCategories: ['medical', 'health-fitness', 'utilities'] },
  { id: 't15', name: 'Arcade Pop', tag: 'Consumer · Bold hooks', density: 'High', bg: 'linear-gradient(160deg, #3a1155, #ea4d7a)', accent: '#fff9c2', type: 'display', appCategories: ['games', 'education', 'entertainment'] },
  { id: 't16', name: 'Forest Depth', tag: 'Nature · Calm progress', density: 'Low', bg: 'linear-gradient(160deg, #10211a, #2f5b45)', accent: '#eef6e8', type: 'serif', appCategories: ['health-fitness', 'lifestyle', 'medical'] },
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

const DEFAULT_SCREEN_LAYOUTS = {
  headline: {
    chrome: { x: 7, y: 6, w: 28 },
    headline: { x: 7, y: 18, w: 74, align: 'left' },
    sub: { x: 7, y: 35, w: 58, align: 'left' },
    phone: { x: 12, y: 54, w: 76 },
    cta: { x: 50, y: 84, w: 42, align: 'center' },
  },
  feature: {
    chrome: { x: 7, y: 6, w: 28 },
    headline: { x: 7, y: 16, w: 72, align: 'left' },
    sub: { x: 7, y: 28, w: 64, align: 'left' },
    phone: { x: 12, y: 48, w: 76 },
    cta: { x: 50, y: 84, w: 42, align: 'center' },
  },
  lifestyle: {
    chrome: { x: 7, y: 6, w: 28 },
    headline: { x: 7, y: 16, w: 78, align: 'left' },
    sub: { x: 8, y: 31, w: 56, align: 'left' },
    phone: { x: 18, y: 46, w: 64 },
    cta: { x: 50, y: 84, w: 42, align: 'center' },
  },
  stat: {
    chrome: { x: 7, y: 6, w: 28 },
    headline: { x: 7, y: 18, w: 52, align: 'left' },
    sub: { x: 7, y: 11, w: 34, align: 'left' },
    phone: { x: 12, y: 60, w: 76 },
    cta: { x: 50, y: 84, w: 42, align: 'center' },
  },
  cta: {
    chrome: { x: 7, y: 6, w: 28 },
    headline: { x: 7, y: 18, w: 72, align: 'left' },
    sub: { x: 7, y: 31, w: 66, align: 'left' },
    phone: { x: 12, y: 51, w: 76 },
    cta: { x: 50, y: 84, w: 42, align: 'center' },
  },
};

const SCREEN_LAYOUT_PRESETS = [
  {
    id: 'hero-stack',
    name: 'Hero Stack',
    tag: 'Top copy + full device',
    kind: 'headline',
    templateId: 't1',
    layout: {
      headline: { x: 7, y: 14, w: 76, align: 'left' },
      sub: { x: 7, y: 30, w: 54, align: 'left' },
      phone: { x: 10, y: 48, w: 80 },
      cta: { x: 50, y: 84, w: 42, align: 'center' },
    },
  },
  {
    id: 'split-feature',
    name: 'Split Feature',
    tag: 'Left copy + right device',
    kind: 'feature',
    templateId: 't7',
    layout: {
      headline: { x: 8, y: 18, w: 42, align: 'left' },
      sub: { x: 8, y: 31, w: 34, align: 'left' },
      phone: { x: 48, y: 16, w: 42 },
      cta: { x: 28, y: 82, w: 34, align: 'center' },
    },
  },
  {
    id: 'editorial-pullquote',
    name: 'Editorial Pullquote',
    tag: 'Large quote + narrow device',
    kind: 'lifestyle',
    templateId: 't4',
    layout: {
      headline: { x: 8, y: 14, w: 70, align: 'left' },
      sub: { x: 8, y: 32, w: 46, align: 'left' },
      phone: { x: 58, y: 40, w: 28 },
      cta: { x: 34, y: 84, w: 38, align: 'center' },
    },
  },
  {
    id: 'stat-spotlight',
    name: 'Stat Spotlight',
    tag: 'Metric first',
    kind: 'stat',
    templateId: 't2',
    layout: {
      headline: { x: 8, y: 16, w: 46, align: 'left' },
      sub: { x: 8, y: 10, w: 30, align: 'left' },
      phone: { x: 18, y: 58, w: 64 },
      cta: { x: 50, y: 84, w: 42, align: 'center' },
    },
  },
  {
    id: 'closing-cta',
    name: 'Closing CTA',
    tag: 'Device + action',
    kind: 'cta',
    templateId: 't3',
    layout: {
      headline: { x: 8, y: 16, w: 72, align: 'left' },
      sub: { x: 8, y: 30, w: 62, align: 'left' },
      phone: { x: 22, y: 44, w: 56 },
      cta: { x: 50, y: 86, w: 48, align: 'center' },
    },
  },
  {
    id: 'immersive-device',
    name: 'Immersive Device',
    tag: 'Large tilted device + lower copy',
    kind: 'feature',
    templateId: 't10',
    layout: {
      headline: { x: 8, y: 12, w: 52, align: 'left' },
      sub: { x: 8, y: 25, w: 42, align: 'left' },
      phone: { x: 34, y: 18, w: 54 },
      cta: { x: 12, y: 84, w: 34, align: 'center' },
    },
  },
  {
    id: 'center-manifesto',
    name: 'Center Manifesto',
    tag: 'Centered copy and calm device',
    kind: 'headline',
    templateId: 't11',
    layout: {
      headline: { x: 12, y: 14, w: 76, align: 'center' },
      sub: { x: 18, y: 30, w: 64, align: 'center' },
      phone: { x: 24, y: 48, w: 52 },
      cta: { x: 31, y: 86, w: 38, align: 'center' },
    },
  },
  {
    id: 'stacked-proof',
    name: 'Stacked Proof',
    tag: 'Social proof + compact device',
    kind: 'stat',
    templateId: 't6',
    layout: {
      headline: { x: 8, y: 14, w: 44, align: 'left' },
      sub: { x: 8, y: 28, w: 34, align: 'left' },
      phone: { x: 44, y: 42, w: 38 },
      cta: { x: 10, y: 84, w: 34, align: 'center' },
    },
  },
  {
    id: 'full-bleed-story',
    name: 'Full-Bleed Story',
    tag: 'Lifestyle hero with edge framing',
    kind: 'lifestyle',
    templateId: 't13',
    layout: {
      headline: { x: 8, y: 12, w: 72, align: 'left' },
      sub: { x: 8, y: 30, w: 40, align: 'left' },
      phone: { x: 44, y: 18, w: 46 },
      cta: { x: 10, y: 84, w: 34, align: 'center' },
    },
  },
];

const DECORATIVE_ELEMENTS = [
  { id: 'text', name: 'Text', tag: 'Free text', defaults: { x: 10, y: 12, w: 40, text: 'New text', style: 'plain' } },
  { id: 'image', name: 'Image', tag: 'Free image asset', defaults: { x: 12, y: 18, w: 30, text: 'Image', style: 'photo', mediaSrc: '', shadowColor: '#000000', shadowX: 0, shadowY: 0, shadowBlur: 0, borderRadius: 12, borderWidth: 0, borderColor: '#000000', flipX: false, flipY: false } },
  { id: 'chrome', name: 'Top chrome', tag: 'App logo + name', defaults: { x: 7, y: 6, w: 28, text: 'App', style: 'solid' } },
  { id: 'laurel', name: 'Laurel', tag: 'Award / featured', defaults: { x: 8, y: 8, w: 22, text: 'App of the Day', style: 'light' } },
  { id: 'stars', name: 'Stars', tag: 'Ratings', defaults: { x: 9, y: 10, w: 20, text: '4.9 rating', style: 'dark' } },
  { id: 'badge', name: 'Badge', tag: 'Short pill', defaults: { x: 10, y: 74, w: 24, text: 'New', style: 'accent' } },
  { id: 'burst', name: 'Burst', tag: 'Promo sticker', defaults: { x: 72, y: 10, w: 18, text: 'No ads', style: 'accent' } },
  { id: 'quote', name: 'Review quote', tag: 'Social proof', defaults: { x: 8, y: 70, w: 34, text: 'Loved by teams', style: 'light' } },
  { id: 'ribbon', name: 'Ribbon', tag: 'Top banner', defaults: { x: 8, y: 9, w: 30, text: 'Editors choice', style: 'dark' } },
];

const APPLE_LOCALIZATIONS = [
  { code: 'ar-SA', locale: 'ar-SA', flag: '🇸🇦', name: 'Saudi Arabia', language: 'Arabic', aliases: [] },
  { code: 'bn-BD', locale: 'bn-BD', flag: '🇧🇩', name: 'Bangladesh', language: 'Bangla', aliases: [] },
  { code: 'ca', locale: 'ca', flag: '🇪🇸', name: 'Spain', language: 'Catalan', aliases: [] },
  { code: 'zh-Hans', locale: 'zh-Hans', flag: '🇨🇳', name: 'China', language: 'Chinese (Simplified)', aliases: ['CN'] },
  { code: 'zh-Hant', locale: 'zh-Hant', flag: '🇹🇼', name: 'Taiwan', language: 'Chinese (Traditional)', aliases: ['TW'] },
  { code: 'hr', locale: 'hr', flag: '🇭🇷', name: 'Croatia', language: 'Croatian', aliases: [] },
  { code: 'cs', locale: 'cs', flag: '🇨🇿', name: 'Czech Republic', language: 'Czech', aliases: [] },
  { code: 'da', locale: 'da', flag: '🇩🇰', name: 'Denmark', language: 'Danish', aliases: [] },
  { code: 'nl-NL', locale: 'nl-NL', flag: '🇳🇱', name: 'Netherlands', language: 'Dutch', aliases: [] },
  { code: 'en-AU', locale: 'en-AU', flag: '🇦🇺', name: 'Australia', language: 'English (Australia)', aliases: ['AU'] },
  { code: 'en-CA', locale: 'en-CA', flag: '🇨🇦', name: 'Canada', language: 'English (Canada)', aliases: ['CA'] },
  { code: 'en-GB', locale: 'en-GB', flag: '🇬🇧', name: 'United Kingdom', language: 'English (U.K.)', aliases: ['UK'] },
  { code: 'en-US', locale: 'en-US', flag: '🇺🇸', name: 'United States', language: 'English (U.S.)', aliases: ['US'] },
  { code: 'fi', locale: 'fi', flag: '🇫🇮', name: 'Finland', language: 'Finnish', aliases: [] },
  { code: 'fr-FR', locale: 'fr-FR', flag: '🇫🇷', name: 'France', language: 'French', aliases: ['FR'] },
  { code: 'fr-CA', locale: 'fr-CA', flag: '🇨🇦', name: 'Canada', language: 'French (Canada)', aliases: [] },
  { code: 'de-DE', locale: 'de-DE', flag: '🇩🇪', name: 'Germany', language: 'German', aliases: ['DE'] },
  { code: 'el', locale: 'el', flag: '🇬🇷', name: 'Greece', language: 'Greek', aliases: [] },
  { code: 'gu-IN', locale: 'gu-IN', flag: '🇮🇳', name: 'India', language: 'Gujarati', aliases: [] },
  { code: 'he', locale: 'he', flag: '🇮🇱', name: 'Israel', language: 'Hebrew', aliases: [] },
  { code: 'hi', locale: 'hi', flag: '🇮🇳', name: 'India', language: 'Hindi', aliases: [] },
  { code: 'hu', locale: 'hu', flag: '🇭🇺', name: 'Hungary', language: 'Hungarian', aliases: [] },
  { code: 'id', locale: 'id', flag: '🇮🇩', name: 'Indonesia', language: 'Indonesian', aliases: [] },
  { code: 'it', locale: 'it', flag: '🇮🇹', name: 'Italy', language: 'Italian', aliases: [] },
  { code: 'ja', locale: 'ja', flag: '🇯🇵', name: 'Japan', language: 'Japanese', aliases: ['JP'] },
  { code: 'kn-IN', locale: 'kn-IN', flag: '🇮🇳', name: 'India', language: 'Kannada', aliases: [] },
  { code: 'ko', locale: 'ko', flag: '🇰🇷', name: 'South Korea', language: 'Korean', aliases: ['KR'] },
  { code: 'ms', locale: 'ms', flag: '🇲🇾', name: 'Malaysia', language: 'Malay', aliases: [] },
  { code: 'ml-IN', locale: 'ml-IN', flag: '🇮🇳', name: 'India', language: 'Malayalam', aliases: [] },
  { code: 'mr-IN', locale: 'mr-IN', flag: '🇮🇳', name: 'India', language: 'Marathi', aliases: [] },
  { code: 'no', locale: 'no', flag: '🇳🇴', name: 'Norway', language: 'Norwegian', aliases: [] },
  { code: 'or-IN', locale: 'or-IN', flag: '🇮🇳', name: 'India', language: 'Odia', aliases: [] },
  { code: 'pl', locale: 'pl', flag: '🇵🇱', name: 'Poland', language: 'Polish', aliases: [] },
  { code: 'pt-BR', locale: 'pt-BR', flag: '🇧🇷', name: 'Brazil', language: 'Portuguese (Brazil)', aliases: ['BR'] },
  { code: 'pt-PT', locale: 'pt-PT', flag: '🇵🇹', name: 'Portugal', language: 'Portuguese (Portugal)', aliases: ['PT'] },
  { code: 'pa-IN', locale: 'pa-IN', flag: '🇮🇳', name: 'India', language: 'Punjabi', aliases: [] },
  { code: 'ro', locale: 'ro', flag: '🇷🇴', name: 'Romania', language: 'Romanian', aliases: [] },
  { code: 'ru', locale: 'ru', flag: '🇷🇺', name: 'Russia', language: 'Russian', aliases: [] },
  { code: 'sk', locale: 'sk', flag: '🇸🇰', name: 'Slovakia', language: 'Slovak', aliases: [] },
  { code: 'sl', locale: 'sl', flag: '🇸🇮', name: 'Slovenia', language: 'Slovenian', aliases: [] },
  { code: 'es-MX', locale: 'es-MX', flag: '🇲🇽', name: 'Mexico', language: 'Spanish (Mexico)', aliases: ['MX'] },
  { code: 'es-ES', locale: 'es-ES', flag: '🇪🇸', name: 'Spain', language: 'Spanish (Spain)', aliases: ['ES'] },
  { code: 'sv', locale: 'sv', flag: '🇸🇪', name: 'Sweden', language: 'Swedish', aliases: [] },
  { code: 'ta-IN', locale: 'ta-IN', flag: '🇮🇳', name: 'India', language: 'Tamil', aliases: [] },
  { code: 'te-IN', locale: 'te-IN', flag: '🇮🇳', name: 'India', language: 'Telugu', aliases: [] },
  { code: 'th', locale: 'th', flag: '🇹🇭', name: 'Thailand', language: 'Thai', aliases: [] },
  { code: 'tr', locale: 'tr', flag: '🇹🇷', name: 'Turkey', language: 'Turkish', aliases: [] },
  { code: 'uk', locale: 'uk', flag: '🇺🇦', name: 'Ukraine', language: 'Ukrainian', aliases: [] },
  { code: 'ur-PK', locale: 'ur-PK', flag: '🇵🇰', name: 'Pakistan', language: 'Urdu', aliases: [] },
  { code: 'vi', locale: 'vi', flag: '🇻🇳', name: 'Vietnam', language: 'Vietnamese', aliases: [] },
];

const COUNTRIES = APPLE_LOCALIZATIONS;

const APP_CATEGORIES = [
  { id: 'books', label: 'Books', short: 'Books', emoji: '📚', description: 'Interactive reading, stories, comics, eReaders, and graphic novels.' },
  { id: 'business', label: 'Business', short: 'Business', emoji: '💼', description: 'Collaboration, CRM, job search, document management, and point of sale.' },
  { id: 'developer-tools', label: 'Developer Tools', short: 'Dev Tools', emoji: '⚙️', description: 'Coding, testing, debugging, workflow management, and code editing.' },
  { id: 'education', label: 'Education', short: 'Education', emoji: '🎓', description: 'Interactive learning experiences on a specific skill or subject.' },
  { id: 'entertainment', label: 'Entertainment', short: 'Entertainment', emoji: '🎬', description: 'Interactive media, fan experiences, ticketing, and audio or visual content.' },
  { id: 'finance', label: 'Finance', short: 'Finance', emoji: '💰', description: 'Personal finance, banking, investment, budgets, debt, tax, and insurance.' },
  { id: 'food-drink', label: 'Food & Drink', short: 'Food', emoji: '🍽️', description: 'Recipes, restaurant discovery, cooking guidance, and beverage reviews.' },
  { id: 'games', label: 'Games', short: 'Games', emoji: '🎮', description: 'Single-player or multiplayer interactive entertainment experiences.' },
  { id: 'graphics-design', label: 'Graphics & Design', short: 'Design', emoji: '🎨', description: 'Art, drawing, image editing, and graphic design creation tools.' },
  { id: 'health-fitness', label: 'Health & Fitness', short: 'Health', emoji: '💪', description: 'Stress management, workouts, meditation, pregnancy, and healthy living.' },
  { id: 'lifestyle', label: 'Lifestyle', short: 'Lifestyle', emoji: '✨', description: 'General-interest services such as parenting, hobbies, fashion, and home.' },
  { id: 'kids', label: 'Kids', short: 'Kids', emoji: '👶', description: 'Apps designed specifically for children ages 11 and under.' },
  { id: 'magazines-newspapers', label: 'Magazines & Newspapers', short: 'Magazines', emoji: '📰', description: 'Recurring magazine and newspaper content with issue-based delivery.' },
  { id: 'medical', label: 'Medical', short: 'Medical', emoji: '⚕️', description: 'Medical education, information management, health reference, and companion devices.' },
  { id: 'music', label: 'Music', short: 'Music', emoji: '🎵', description: 'Music discovery, listening, recording, performing, and composition.' },
  { id: 'navigation', label: 'Navigation', short: 'Navigation', emoji: '🧭', description: 'Driving, walking, transit, maritime, and route assistance.' },
  { id: 'news', label: 'News', short: 'News', emoji: '📡', description: 'Current events, digest formats, and frequently updated news content.' },
  { id: 'photo-video', label: 'Photo & Video', short: 'Photo', emoji: '📸', description: 'Capturing, editing, storing, or sharing photos and videos.' },
  { id: 'productivity', label: 'Productivity', short: 'Productivity', emoji: '✅', description: 'Task management, notes, calendars, translation, cloud storage, and workflow.' },
  { id: 'reference', label: 'Reference', short: 'Reference', emoji: '📖', description: 'Atlas, dictionaries, encyclopedias, research, religion, and how-to resources.' },
  { id: 'safari-extensions', label: 'Safari Extensions', short: 'Safari', emoji: '🧩', description: 'Extensions that enhance and customize the Safari browsing experience.' },
  { id: 'shopping', label: 'Shopping', short: 'Shopping', emoji: '🛍️', description: 'Commerce, marketplaces, coupons, reviews, and Apple Pay-enhanced shopping.' },
  { id: 'social-networking', label: 'Social Networking', short: 'Social', emoji: '💬', description: 'Communities and communication through text, voice, photo, or video.' },
  { id: 'sports', label: 'Sports', short: 'Sports', emoji: '⚽', description: 'Professional, amateur, collegiate, and recreational sporting activities.' },
  { id: 'travel', label: 'Travel', short: 'Travel', emoji: '✈️', description: 'Planning, purchasing, and tracking travel experiences and bookings.' },
  { id: 'utilities', label: 'Utilities', short: 'Utilities', emoji: '🔧', description: 'Problem-solving and specific task completion tools like calculators and scanners.' },
  { id: 'weather', label: 'Weather', short: 'Weather', emoji: '🌤️', description: 'Forecasts, alerts, radar, and weather-condition information.' },
];

const APP_CATEGORY_ALIASES = {
  'addiction-quit': 'health-fitness',
  'habit-tracker': 'productivity',
  'sports-coaching': 'health-fitness',
  'calorie-nutrition': 'health-fitness',
  'sleep-recovery': 'health-fitness',
  'mood-mental-health': 'health-fitness',
  'budget-finance': 'finance',
  'pregnancy-family': 'lifestyle',
  'learning-language': 'education',
  'productivity-focus': 'productivity',
};

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

const CAPTION_STYLE_SYSTEMS = [
  { id: 'clarity', name: 'Clarity', tag: 'Direct value first' },
  { id: 'aso', name: 'ASO push', tag: 'Benefits + hooks' },
  { id: 'premium', name: 'Premium', tag: 'More polished / aspirational' },
  { id: 'results', name: 'Results', tag: 'Outcomes and proof' },
];

const COUNTRY_TO_LOCALE = Object.fromEntries(
  APPLE_LOCALIZATIONS.flatMap((item) => [[item.code, item.locale], ...(item.aliases || []).map((alias) => [alias, item.locale])])
);

const LOCALIZED_COPY = {
  'en-US': {
    headline: (app) => `${app}, clearly explained.`,
    feature: () => ['Show the core value fast', 'Lead with the primary feature and keep the copy tight.'],
    stat: () => ['3 steps', 'Simple story, clear sequence'],
    lifestyle: (app) => `Designed around how people use ${app}.`,
    cta: (app) => [`Open ${app}.`, 'Finish with a direct call to action.'],
  },
  'en-GB': {
    headline: (app) => `${app}, made easy to grasp.`,
    feature: () => ['Lead with the main benefit', 'Keep the message sharp and practical.'],
    stat: () => ['3 steps', 'A simple, useful flow'],
    lifestyle: (app) => `${app}, built for everyday use.`,
    cta: (app) => [`Try ${app}.`, 'End on a clear next step.'],
  },
  'de-DE': {
    headline: (app) => `${app}, auf einen Blick verständlich.`,
    feature: () => ['Den Hauptnutzen sofort zeigen', 'Klarer Nutzen statt Wort-fuer-Wort-Uebersetzung.'],
    stat: () => ['3 Schritte', 'Klarer Ablauf, schnell erfassbar'],
    lifestyle: (app) => `${app}, passend fuer den echten Alltag.`,
    cta: (app) => [`${app} ausprobieren.`, 'Mit einer klaren Aktion abschliessen.'],
  },
  'fr-FR': {
    headline: (app) => `${app}, compris en un instant.`,
    feature: () => ['Montrer le benefice principal tout de suite', 'Un message plus naturel qu une traduction litterale.'],
    stat: () => ['3 etapes', 'Un parcours simple et fluide'],
    lifestyle: (app) => `${app}, pense pour un usage reel au quotidien.`,
    cta: (app) => [`Ouvrir ${app}.`, 'Terminer avec une action nette.'],
  },
  'ja-JP': {
    headline: (app) => `${app}の価値をすぐ伝える。`,
    feature: () => ['最初にいちばん大事な価値を見せる', '直訳ではなく日本語として自然に整える'],
    stat: () => ['3ステップ', '流れがすぐ分かる構成'],
    lifestyle: (app) => `${app}を日常の使い方に合わせて見せる。`,
    cta: (app) => [`${app}を始める`, '最後は迷わない行動で締める'],
  },
  'pt-BR': {
    headline: (app) => `${app}, facil de entender de cara.`,
    feature: () => ['Mostre o beneficio principal primeiro', 'Texto adaptado ao contexto, nao literal.'],
    stat: () => ['3 etapas', 'Fluxo simples e direto'],
    lifestyle: (app) => `${app}, pensado para o uso real do dia a dia.`,
    cta: (app) => [`Abrir ${app}.`, 'Feche com uma acao clara.'],
  },
};

const NAV_SECONDARY = [
  { id: 'my-apps', label: 'My Apps', icon: 'Smartphone' },
  { id: 'my-projects', label: 'My Projects', icon: 'Folder' },
  { id: 'favorites', label: 'Favorites', icon: 'Heart' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

const PROJECT_TABS = [
  { id: 'overview', label: 'Brief' },
  { id: 'generate', label: 'Generate' },
  { id: 'edit', label: 'Design' },
  { id: 'variants', label: 'Localize' },
  { id: 'exports', label: 'Deliver' },
  { id: 'history', label: 'Activity' },
];

const STORAGE_KEY = 'shipshot-workspace-v1';

function defaultWorkspace() {
  return {
    account: {
      workspaceName: 'Signal',
      initials: 'J',
      plan: 'Pro',
    },
    apps: [],
    projects: [],
    generations: [],
    exports: [],
    trackedApps: [],
    favoriteAppIds: [],
    wrapJobs: [],
    screenshotGenerations: [],
    reviewMonitorIds: [],
    appProfiles: {},
    onboarding: {
      completed: false,
      completedAt: '',
      source: '',
      appId: '',
      projectId: '',
    },
  };
}

async function loadWorkspace() {
  try {
    // Load from Supabase (which also handles localStorage fallback)
    const data = await (window.SHIPSHOT_WORKSPACE?.loadWorkspace
      ? window.SHIPSHOT_WORKSPACE.loadWorkspace()
      : defaultWorkspace());

    // Validate and sanitize workspace data
    const validated = window.Security?.validateWorkspaceData(data, defaultWorkspace()) || defaultWorkspace();

    return {
      ...defaultWorkspace(),
      ...validated,
      account: { ...defaultWorkspace().account, ...(validated.account || {}) },
      apps: Array.isArray(validated.apps) ? validated.apps : [],
      projects: Array.isArray(validated.projects) ? validated.projects : [],
      generations: Array.isArray(validated.generations) ? validated.generations : [],
      exports: Array.isArray(validated.exports) ? validated.exports : [],
      trackedApps: Array.isArray(validated.trackedApps) ? validated.trackedApps : [],
      favoriteAppIds: Array.isArray(validated.favoriteAppIds) ? validated.favoriteAppIds : [],
      wrapJobs: Array.isArray(validated.wrapJobs) ? validated.wrapJobs : [],
      screenshotGenerations: Array.isArray(validated.screenshotGenerations) ? validated.screenshotGenerations : [],
      reviewMonitorIds: Array.isArray(validated.reviewMonitorIds) ? validated.reviewMonitorIds : [],
      appProfiles: validated.appProfiles && typeof validated.appProfiles === 'object' ? validated.appProfiles : {},
      onboarding: validated.onboarding && typeof validated.onboarding === 'object'
        ? { ...defaultWorkspace().onboarding, ...validated.onboarding }
        : defaultWorkspace().onboarding,
    };
  } catch (error) {
    console.error('Error loading workspace:', error);
    return defaultWorkspace();
  }
}

async function saveWorkspace(workspace) {
  if (window.SHIPSHOT_WORKSPACE?.saveWorkspace) {
    await window.SHIPSHOT_WORKSPACE.saveWorkspace(workspace);
  }
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'project';
}

function titleCase(value) {
  return String(value || '')
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function paletteForIndex(index) {
  const palettes = [
    ['oklch(80% 0.12 60)', 'oklch(65% 0.14 30)'],
    ['oklch(78% 0.14 180)', 'oklch(62% 0.14 220)'],
    ['oklch(75% 0.14 340)', 'oklch(60% 0.15 310)'],
    ['oklch(80% 0.13 45)', 'oklch(62% 0.17 20)'],
  ];
  return palettes[index % palettes.length];
}

function makeThumbs(screenCount) {
  const base = ['headline', 'feature', 'feature', 'lifestyle', 'stat', 'cta'];
  return base.slice(0, Math.max(3, Math.min(10, Number(screenCount) || 6)));
}

function cloneLayout(layout) {
  return JSON.parse(JSON.stringify(layout));
}

function defaultLayoutForKind(kind) {
  return cloneLayout(DEFAULT_SCREEN_LAYOUTS[kind] || DEFAULT_SCREEN_LAYOUTS.feature);
}

function normalizeLayout(kind, layout) {
  const base = defaultLayoutForKind(kind);
  const next = layout || {};
  return {
    chrome: { z: 10, rotation: 0, hidden: false, fontFamily: '', ...base.chrome, ...(next.chrome || {}) },
    headline: { z: 40, rotation: 0, hidden: false, fontFamily: '', fontSizeScale: 1, fontWeight: null, fontStyle: '', textDecoration: '', color: '', lineHeight: null, ...base.headline, ...(next.headline || {}) },
    sub: { z: 30, rotation: 0, hidden: false, fontFamily: '', fontSizeScale: 1, fontWeight: null, fontStyle: '', textDecoration: '', color: '', lineHeight: null, ...base.sub, ...(next.sub || {}) },
    phone: {
      z: 20,
      rotation: 0,
      hidden: false,
      fontFamily: '',
      mediaSrc: '',
      mediaType: '',
      mediaFit: 'cover',
      shadowColor: 'rgba(0,0,0,0.28)',
      shadowX: 0,
      shadowY: 20,
      shadowBlur: 36,
      ...base.phone,
      ...(next.phone || {}),
    },
    cta: { z: 50, rotation: 0, hidden: false, fontFamily: '', fontSizeScale: 1, fontWeight: null, fontStyle: '', textDecoration: '', color: '', lineHeight: null, ...base.cta, ...(next.cta || {}) },
  };
}

function normalizeDecorations(decorations) {
  if (!Array.isArray(decorations)) return [];
  return decorations.map((item, index) => {
    const definition = DECORATIVE_ELEMENTS.find((entry) => entry.id === item.type) || DECORATIVE_ELEMENTS[0];
    const defaults = definition.defaults || {};

    // Sanitize media source for security
    const rawMediaSrc = item.mediaSrc || defaults.mediaSrc || '';
    const mediaSrc = window.Security?.sanitizeMediaSrc(rawMediaSrc) || '';

    // Sanitize colors
    const shadowColor = window.Security?.sanitizeColor(item.shadowColor || '#000000', '#000000') || '#000000';
    const borderColor = window.Security?.sanitizeColor(item.borderColor || '#000000', '#000000') || '#000000';
    const color = window.Security?.sanitizeColor(item.color || '', '') || '';

    return {
      id: item.id || `deco-${definition.id}-${index}`,
      type: item.type || definition.id,
      x: typeof item.x === 'number' ? item.x : defaults.x,
      y: typeof item.y === 'number' ? item.y : defaults.y,
      w: typeof item.w === 'number' ? item.w : defaults.w,
      text: item.text || defaults.text || definition.name,
      style: item.style || defaults.style || 'light',
      rotation: typeof item.rotation === 'number' ? item.rotation : 0,
      z: typeof item.z === 'number' ? item.z : (60 + index),
      hidden: Boolean(item.hidden),
      align: item.align || 'left',
      fontFamily: item.fontFamily || '',
      fontSizeScale: typeof item.fontSizeScale === 'number' ? item.fontSizeScale : 1,
      fontWeight: item.fontWeight != null ? item.fontWeight : null,
      fontStyle: item.fontStyle || '',
      textDecoration: item.textDecoration || '',
      color,
      lineHeight: typeof item.lineHeight === 'number' ? item.lineHeight : null,
      mediaSrc,
      shadowColor,
      shadowX: typeof item.shadowX === 'number' ? item.shadowX : 0,
      shadowY: typeof item.shadowY === 'number' ? item.shadowY : 0,
      shadowBlur: typeof item.shadowBlur === 'number' ? item.shadowBlur : 0,
      borderRadius: typeof item.borderRadius === 'number' ? item.borderRadius : 12,
      borderWidth: typeof item.borderWidth === 'number' ? item.borderWidth : 0,
      borderColor,
      flipX: Boolean(item.flipX),
      flipY: Boolean(item.flipY),
    };
  });
}

function createDecoration(type) {
  const definition = DECORATIVE_ELEMENTS.find((entry) => entry.id === type) || DECORATIVE_ELEMENTS[0];
  return normalizeDecorations([{
    id: `deco-${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    type: definition.id,
    ...definition.defaults,
  }])[0];
}

function presetById(presetId) {
  return SCREEN_LAYOUT_PRESETS.find((preset) => preset.id === presetId) || null;
}

function applyScreenPreset(screen, presetId) {
  const preset = presetById(presetId);
  if (!preset) return normalizeScreen(screen);
  return normalizeScreen({
    ...screen,
    kind: preset.kind || screen.kind,
    template: preset.templateId || screen.template,
    presetId: preset.id,
    layout: normalizeLayout(preset.kind || screen.kind, preset.layout),
  });
}

function normalizeScreen(screen) {
  const kind = screen.kind || 'feature';
  const next = { ...screen };
  next.template = next.template || 't1';
  next.presetId = next.presetId || null;
  next.ctaLabel = next.ctaLabel || '';
  next.bg = next.bg || '';
  next.frameStyle = next.frameStyle || 'ios-classic';
  next.textStyle = next.textStyle || 'crisp';
  next.ambientStyle = next.ambientStyle || 'glow';
  next.ctaStyle = next.ctaStyle || 'pill';
  next.chromeStyle = next.chromeStyle || 'solid';
  next.fontFamily = next.fontFamily || '';
  next.layout = normalizeLayout(kind, next.layout);
  next.decorations = normalizeDecorations(next.decorations);
  return next;
}

function makeScreenRecords(screenCount, styleId) {
  return makeThumbs(screenCount).map((kind, index) => ({
    id: `screen-${index + 1}-${kind}`,
    kind,
    template: styleId || 't1',
    headline: '',
    sub: '',
    ctaLabel: '',
    bg: '',
    frameStyle: 'ios-classic',
    textStyle: 'crisp',
    ambientStyle: 'glow',
    ctaStyle: 'pill',
    chromeStyle: 'solid',
    fontFamily: '',
    presetId: null,
    layout: defaultLayoutForKind(kind),
    decorations: [],
  }));
}

function styleDirectionById(directionId) {
  return STYLE_DIRECTIONS.find((item) => item.id === directionId) || null;
}

function applyStyleDirection(screen, directionId) {
  const direction = styleDirectionById(directionId);
  if (!direction) return normalizeScreen(screen);
  return normalizeScreen({
    ...screen,
    template: direction.templateId || screen.template,
    textStyle: direction.textStyle || screen.textStyle,
    ambientStyle: direction.ambientStyle || screen.ambientStyle,
    ctaStyle: direction.ctaStyle || screen.ctaStyle,
    chromeStyle: direction.chromeStyle || screen.chromeStyle,
    frameStyle: direction.frameStyle || screen.frameStyle,
  });
}

function makePrimaryVariant(input, template) {
  const country = input.country || 'en-US';
  const audience = (input.audience || '').trim() || 'General audience';
  const screensData = makeScreenRecords(input.screenCount, template.id);
  return {
    id: `variant-primary-${Date.now().toString(36)}`,
    name: 'Primary',
    country,
    locale: localeForCountry(country),
    audience,
    templateId: template.id,
    assetLocale: 'en-US',
    screensData,
    isPrimary: true,
  };
}

function localeForCountry(country) {
  return COUNTRY_TO_LOCALE[country] || COUNTRY_TO_LOCALE[String(country || '').trim()] || 'en-US';
}

function localizationOptionByCode(value) {
  const normalized = String(value || '').trim();
  const locale = localeForCountry(normalized);
  return APPLE_LOCALIZATIONS.find((item) => item.code === normalized)
    || APPLE_LOCALIZATIONS.find((item) => item.locale === locale)
    || APPLE_LOCALIZATIONS.find((item) => (item.aliases || []).includes(normalized))
    || APPLE_LOCALIZATIONS.find((item) => item.locale === 'en-US')
    || APPLE_LOCALIZATIONS[0];
}

function localizationLabel(value, mode = 'full') {
  const option = localizationOptionByCode(value);
  if (!option) return String(value || '');
  if (mode === 'compact') return `${option.flag} ${option.language}`;
  if (mode === 'country') return `${option.flag} ${option.name}`;
  return `${option.flag} ${option.language} · ${option.name}`;
}

function categoryById(categoryId) {
  const normalizedId = APP_CATEGORY_ALIASES[categoryId] || categoryId;
  return APP_CATEGORIES.find((item) => item.id === normalizedId) || null;
}

function normalizeCategory(categoryValue) {
  if (!categoryValue) return APP_CATEGORIES[0].id;
  if (APP_CATEGORY_ALIASES[categoryValue]) return APP_CATEGORY_ALIASES[categoryValue];
  if (categoryById(categoryValue)) return categoryById(categoryValue).id;
  const lowered = String(categoryValue).toLowerCase().trim();
  if (APP_CATEGORY_ALIASES[lowered]) return APP_CATEGORY_ALIASES[lowered];
  const match = APP_CATEGORIES.find((item) =>
    item.id === lowered
    || item.label.toLowerCase() === lowered
    || item.short.toLowerCase() === lowered
  );
  return match ? match.id : APP_CATEGORIES[0].id;
}

function availableAssetLocales(app) {
  return Array.isArray(app?.assetLocales) && app.assetLocales.length ? app.assetLocales : ['en-US'];
}

function pickAssetLocale(app, country) {
  const desired = localeForCountry(country);
  const locales = availableAssetLocales(app);
  if (locales.includes(desired)) return desired;
  const desiredLang = desired.split('-')[0];
  const langMatch = locales.find((locale) => locale.split('-')[0] === desiredLang);
  if (langMatch) return langMatch;
  if (locales.includes('en-US')) return 'en-US';
  return locales[0];
}

function localizedCopyForLocale(kind, appName, locale) {
  const lib = LOCALIZED_COPY[locale] || LOCALIZED_COPY['en-US'];
  if (kind === 'headline') return { headline: lib.headline(appName), sub: '' };
  if (kind === 'feature') {
    const [headline, sub] = lib.feature(appName);
    return { headline, sub };
  }
  if (kind === 'stat') {
    const [headline, sub] = lib.stat(appName);
    return { headline, sub };
  }
  if (kind === 'lifestyle') return { headline: lib.lifestyle(appName), sub: '' };
  if (kind === 'cta') {
    const [headline, sub] = lib.cta(appName);
    return { headline, sub, ctaLabel: headline };
  }
  return { headline: '', sub: '' };
}

function restyledCopyForMode(kind, appName, locale, mode) {
  const base = localizedCopyForLocale(kind, appName, locale);
  const headline = base.headline || `${appName}, clearly explained.`;
  const sub = base.sub || '';
  const ctaLabel = base.ctaLabel || `Open ${appName}`;

  if (mode === 'clarity') {
    return {
      headline,
      sub: sub || 'Lead with the core feature and keep the story simple.',
      ctaLabel,
    };
  }

  if (mode === 'aso') {
    return {
      headline: kind === 'headline' ? `Turn ${appName} into a clearer App Store story.` : `${headline}`,
      sub: sub || 'Sharper benefits, faster comprehension, stronger conversion framing.',
      ctaLabel: kind === 'cta' ? `Try ${appName}` : ctaLabel,
    };
  }

  if (mode === 'premium') {
    return {
      headline: kind === 'headline' ? `${appName}, presented with more polish.` : headline,
      sub: sub || 'Use calmer language, clearer hierarchy, and a more premium finish.',
      ctaLabel: kind === 'cta' ? `Discover ${appName}` : ctaLabel,
    };
  }

  if (mode === 'results') {
    return {
      headline: kind === 'stat' ? 'See the result faster' : `${headline}`,
      sub: sub || 'Anchor the pack around progress, outcomes, and confidence.',
      ctaLabel: kind === 'cta' ? `Get results with ${appName}` : ctaLabel,
    };
  }

  return { headline, sub, ctaLabel };
}

function localizeScreensForVariant(sourceScreens, app, country) {
  const locale = localeForCountry(country);
  return sourceScreens.map((screen) => {
    const adapted = localizedCopyForLocale(screen.kind, app.name, locale);
    return normalizeScreen({
      ...screen,
      id: `screen-${Date.now().toString(36)}-${screen.kind}-${Math.random().toString(36).slice(2, 6)}`,
      headline: screen.headline ? adapted.headline : adapted.headline,
      sub: screen.sub ? adapted.sub : adapted.sub,
      ctaLabel: screen.kind === 'cta' ? (adapted.ctaLabel || screen.ctaLabel || '') : screen.ctaLabel,
    });
  });
}

function generateVariantCaptions(variant, app, mode = 'clarity') {
  const locale = variant.locale || localeForCountry(variant.country || 'en-US');
  return {
    ...variant,
    screensData: variant.screensData.map((screen) => {
      const nextCopy = restyledCopyForMode(screen.kind, app.name, locale, mode);
      return normalizeScreen({
        ...screen,
        headline: nextCopy.headline,
        sub: nextCopy.sub,
        ctaLabel: screen.kind === 'cta' ? nextCopy.ctaLabel : screen.ctaLabel,
      });
    }),
  };
}

function exportPresetById(presetId) {
  return STORE_EXPORT_PRESETS.find((item) => item.id === presetId) || STORE_EXPORT_PRESETS[0];
}

function formatRelative(isoString) {
  if (!isoString) return 'Just now';
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.max(0, Math.round(diff / 60000));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function ensureAppRecord(workspace, input) {
  const existing = workspace.apps.find((app) => app.id === input.appId);
  if (existing) return { workspace, app: existing };

  const tracked = (workspace.trackedApps || []).find((app) => app.id === input.appId);
  if (tracked) {
    const [tint, tint2] = paletteForIndex(workspace.apps.length);
    const trackedAppRecord = {
      id: `app-${slugify(tracked.name || input.appName || 'tracked-app')}-${Date.now().toString(36)}`,
      name: tracked.name || input.appName || 'Untitled app',
      sub: tracked.subtitle || tracked.description || 'Imported from tracked app',
      icon: tracked.icon || tracked.name?.charAt(0)?.toUpperCase() || 'A',
      tint: tracked.tint || tint,
      tint2: tracked.tint2 || tint2,
      category: normalizeCategory(tracked.category || input.category),
      assetLocales: [pickAssetLocale(tracked, input.country || tracked.country || 'en-US')],
      storeUrl: tracked.storeUrl || '',
      storeId: tracked.storeId || '',
    };
    return {
      workspace: { ...workspace, apps: [trackedAppRecord, ...workspace.apps] },
      app: trackedAppRecord,
    };
  }

  const appName = (input.appName || '').trim() || 'Untitled app';
  const appDescription = (input.appDescription || '').trim();
  const [tint, tint2] = paletteForIndex(workspace.apps.length);
  const app = {
    id: `app-${slugify(appName)}-${Date.now().toString(36)}`,
    name: appName,
    sub: appDescription || (input.sourceType === 'repo' ? 'Created from repository source' : 'Created in local workspace'),
    icon: appName.charAt(0).toUpperCase() || 'A',
    tint,
    tint2,
    category: normalizeCategory(input.category),
    assetLocales: ['en-US'],
    sourceType: input.sourceType || 'prompt',
    sourceReference: (input.sourceReference || '').trim(),
    sourceMetadata: input.sourceMetadata || null,
  };
  return {
    workspace: { ...workspace, apps: [app, ...workspace.apps] },
    app,
  };
}

const SIGNAL_RECOMMENDATION_STOPWORDS = new Set([
  'about', 'after', 'again', 'also', 'an', 'and', 'app', 'are', 'because', 'been', 'before', 'being', 'build', 'built',
  'can', 'clear', 'coach', 'daily', 'does', 'each', 'easy', 'faster', 'focus', 'from', 'good', 'have', 'helps', 'idea',
  'into', 'just', 'make', 'more', 'most', 'need', 'not', 'only', 'people', 'product', 'real', 'save', 'ship', 'should',
  'signal', 'simple', 'some', 'that', 'the', 'their', 'them', 'there', 'they', 'this', 'through', 'tool', 'users',
  'using', 'value', 'with', 'workflow', 'your',
]);

function signalKeywordCandidates(...values) {
  const bag = String(values.filter(Boolean).join(' ').toLowerCase())
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !SIGNAL_RECOMMENDATION_STOPWORDS.has(token));

  const scores = new Map();
  bag.forEach((token, index) => {
    const current = scores.get(token) || 0;
    scores.set(token, current + Math.max(1, 8 - Math.min(index, 7)));
  });
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([token]) => token);
}

function signalKeywordRows(keywords = [], country = 'US') {
  return keywords.slice(0, 8).map((keyword, index) => ({
    id: `kw-${slugify(keyword)}-${index}`,
    keyword,
    country: wrapCountryFlag(country),
    position: 'Not ranked',
    popularity: Math.max(42, 88 - index * 5),
    difficulty: Math.min(74, 26 + index * 5),
    apps: 120 + (index * 35),
  }));
}

function wrapCountryFlag(country = 'US') {
  const code = String(country || 'US').slice(0, 2).toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return '🇺🇸';
  return String.fromCodePoint(...[...code].map((char) => 127397 + char.charCodeAt(0)));
}

function buildSignalAppProfile(input) {
  const sourceMetadata = input.sourceMetadata || {};
  const ideaValidation = sourceMetadata.ideaValidation || input.ideaValidation || null;
  const appName = String(input.appName || sourceMetadata.appName || 'Untitled app').trim();
  const category = normalizeCategory(input.category || sourceMetadata.category || sourceMetadata.primaryGenreName || ideaValidation?.category || 'productivity');
  const description = String(
    input.appDescription
    || sourceMetadata.description
    || sourceMetadata.subtitle
    || ideaValidation?.idea
    || input.sourceValue
    || ''
  ).trim();
  const combinedText = [
    appName,
    description,
    sourceMetadata.subtitle,
    sourceMetadata.description,
    sourceMetadata.readme,
    input.audience,
    input.sourceValue,
    ideaValidation?.summary?.opportunity,
    ideaValidation?.summary?.moat,
    Array.isArray(ideaValidation?.researchNotes) ? ideaValidation.researchNotes.join(' ') : '',
    Array.isArray(ideaValidation?.recommendations) ? ideaValidation.recommendations.join(' ') : '',
  ].filter(Boolean).join(' ');
  const keywords = Array.from(new Set([
    ...signalKeywordCandidates(combinedText, category, appName).slice(0, 6),
    ...signalKeywordCandidates(sourceMetadata.primaryGenreName, sourceMetadata.genres?.join(' ')).slice(0, 2),
  ])).slice(0, 8);

  const categoryLabel = categoryById(category)?.label || titleCase(category);
  const audience = String(input.audience || ideaValidation?.differentiation?.angle?.[0] || 'Defined audience needed').trim();
  const positioning = ideaValidation?.summary?.opportunity
    || `Position ${appName} around one narrow ${categoryLabel.toLowerCase()} outcome and remove setup friction in the first session.`;
  const screenshotAngle = ideaValidation?.differentiation?.launchHooks?.[0]
    || `Lead screenshots with the core outcome, then show the first workflow and end on a confident CTA.`;
  const competitorStudy = Array.isArray(ideaValidation?.competitors)
    ? ideaValidation.competitors.slice(0, 3).map((item) => item.name).filter(Boolean)
    : [];

  return {
    id: `profile-${slugify(appName)}-${Date.now().toString(36)}`,
    appName,
    category,
    audience,
    sourceType: input.sourceType || 'prompt',
    summary: description || positioning,
    keywords,
    recommendations: {
      keywords,
      keywordExplorer: [
        `Start by tracking ${keywords.slice(0, 3).join(', ') || categoryLabel.toLowerCase()} and keep the set narrow until ranking data stabilizes.`,
        `Use ${keywords.slice(0, 2).join(' + ') || categoryLabel.toLowerCase()} as the first ASO wedge rather than broad generic terms.`,
      ],
      aso: [
        `Reuse the main promise in title, subtitle, and the first third of the description.`,
        `Keep the listing focused on ${categoryLabel.toLowerCase()} value, not a long feature inventory.`,
      ],
      screenshots: [
        screenshotAngle,
        `Show why ${appName} is easier to adopt than the current alternative in 3 to 5 frames.`,
      ],
      competitors: competitorStudy.length
        ? [`Study ${competitorStudy.join(', ')} for packaging, onboarding, and proof structure.`]
        : [`Search adjacent ${categoryLabel.toLowerCase()} apps and compare onboarding, value props, and trust signals.`],
      positioning,
    },
    ideaValidation,
    sourceMetadata,
  };
}

function buildTrackedAppFromProfile(app, profile, input) {
  const sourceMetadata = input.sourceMetadata || {};
  const nowId = Date.now().toString(36);
  const storeId = sourceMetadata.storeId || sourceMetadata.trackId ? String(sourceMetadata.storeId || sourceMetadata.trackId) : null;
  const country = String(input.country || 'en-US').slice(-2).toUpperCase() || 'US';
  const seedKeywords = signalKeywordRows(profile.keywords || [], country);
  return {
    id: `tracked-${slugify(app.name)}-${nowId}`,
    linkedAppId: app.id,
    storeId,
    name: app.name,
    developer: sourceMetadata.developer || sourceMetadata.seller || 'Signal workspace app',
    category: profile.category || app.category,
    icon: sourceMetadata.icon || app.icon || '',
    country,
    countryFlag: wrapCountryFlag(country),
    countryName: country,
    storeUrl: sourceMetadata.storeUrl || input.sourceReference || '',
    description: profile.summary || app.sub || '',
    downloads: 0,
    revenue: 0,
    reviews: 0,
    rating: 0,
    growth: 0,
    creators: 0,
    metaAds: 0,
    appleAds: 0,
    activeUsers: { mau: 0, dau: 0 },
    subtitle: sourceMetadata.subtitle || '',
    screenshots: Array.isArray(sourceMetadata.screenshots) ? sourceMetadata.screenshots : [],
    ipadScreenshots: Array.isArray(sourceMetadata.ipadScreenshots) ? sourceMetadata.ipadScreenshots : [],
    genres: Array.isArray(sourceMetadata.genres) ? sourceMetadata.genres : [],
    keywords: seedKeywords,
    keywordCount: seedKeywords.length,
    recommendationProfileId: profile.id,
    signalProfile: profile,
    sourceType: input.sourceType || 'prompt',
  };
}

function createProjectFromInput(workspace, input) {
  const now = new Date().toISOString();
  const withApp = ensureAppRecord(workspace, input);
  const profile = input.appProfile || buildSignalAppProfile(input);
  const app = {
    ...withApp.app,
    sourceType: input.sourceType || withApp.app.sourceType || 'prompt',
    sourceReference: (input.sourceReference || withApp.app.sourceReference || '').trim(),
    sourceMetadata: input.sourceMetadata || withApp.app.sourceMetadata || null,
    recommendationProfileId: profile.id,
    signalProfile: profile,
  };
  let nextWorkspace = {
    ...withApp.workspace,
    apps: (withApp.workspace.apps || []).map((item) => item.id === app.id ? app : item),
    appProfiles: {
      ...(withApp.workspace.appProfiles || {}),
      [app.id]: profile,
    },
  };
  const existingTracked = (nextWorkspace.trackedApps || []).find((item) => (
    item.linkedAppId === app.id
    || (app.storeId && item.storeId && String(item.storeId) === String(app.storeId))
    || String(item.name || '').toLowerCase() === String(app.name || '').toLowerCase()
  ));
  if (!existingTracked && input.createTrackedApp !== false) {
    nextWorkspace = {
      ...nextWorkspace,
      trackedApps: [buildTrackedAppFromProfile(app, profile, input), ...(nextWorkspace.trackedApps || [])],
    };
  }
  const template = TEMPLATES.find((item) => item.id === input.style) || TEMPLATES[0];
  const primaryVariant = makePrimaryVariant(input, template);
  primaryVariant.assetLocale = pickAssetLocale(app, primaryVariant.country);
  primaryVariant.screensData = localizeScreensForVariant(primaryVariant.screensData, app, primaryVariant.country);
  const project = {
    id: `project-${slugify(input.projectName || app.name)}-${Date.now().toString(36)}`,
    appId: app.id,
    name: (input.projectName || '').trim() || `${app.name} launch`,
    status: 'Draft',
    statusTone: 'muted',
    updated: 'Just now',
    updatedAt: now,
    variants: 1,
    screens: primaryVariant.screensData.length,
    audience: (input.audience || '').trim() || 'General audience',
    appDescription: (input.appDescription || '').trim(),
    country: input.country || 'en-US',
    tone: template.name,
    exports: 0,
    thumb: primaryVariant.screensData.map((screen) => screen.kind),
    screensData: primaryVariant.screensData,
    variantsData: [primaryVariant],
    sourceType: input.sourceType || 'prompt',
    sourceValue: (input.sourceValue || '').trim(),
    sourceReference: (input.sourceReference || '').trim(),
    sourceMetadata: input.sourceMetadata || null,
    styleId: template.id,
    history: [
      { id: `history-${Date.now().toString(36)}`, when: now, label: 'Project created locally' },
    ],
  };
  return {
    workspace: {
      ...nextWorkspace,
      projects: [project, ...nextWorkspace.projects],
    },
    project,
    app,
  };
}

function buildData(workspace) {
  const projects = workspace.projects.map((project) => ({
    ...project,
    variantsData: Array.isArray(project.variantsData) && project.variantsData.length
      ? project.variantsData.map((variant, index) => ({
          ...variant,
          id: variant.id || `variant-${index}`,
          name: variant.name || (index === 0 ? 'Primary' : `Localization ${index + 1}`),
          country: variant.country || project.country || 'en-US',
          locale: variant.locale || localeForCountry(variant.country || project.country || 'en-US'),
          audience: variant.audience || project.audience || 'General audience',
          templateId: variant.templateId || project.styleId || 't1',
          assetLocale: variant.assetLocale || pickAssetLocale(workspace.apps.find((app) => app.id === project.appId), variant.country || project.country || 'en-US'),
          screensData: Array.isArray(variant.screensData) && variant.screensData.length
            ? variant.screensData.map((screen) => normalizeScreen(screen))
            : makeScreenRecords(project.screens || project.thumb?.length || 6, variant.templateId || project.styleId).map((screen) => normalizeScreen(screen)),
          isPrimary: index === 0 ? true : !!variant.isPrimary,
        }))
      : [makePrimaryVariant({ country: project.country, audience: project.audience, screenCount: project.screens || project.thumb?.length || 6 }, TEMPLATES.find((item) => item.id === project.styleId) || TEMPLATES[0])],
    activeVariantId: project.activeVariantId || (project.variantsData?.[0]?.id),
    updated: formatRelative(project.updatedAt),
  })).map((project) => {
    const activeVariant = project.variantsData.find((variant) => variant.id === project.activeVariantId) || project.variantsData[0];
    return {
      ...project,
      activeVariantId: activeVariant.id,
      screensData: activeVariant.screensData,
      screens: activeVariant.screensData.length,
      thumb: activeVariant.screensData.map((screen) => screen.kind),
      styleId: activeVariant.templateId || project.styleId,
      variants: project.variantsData.length,
    };
  });
  const generations = workspace.generations.map((generation) => ({
    ...generation,
    time: formatRelative(generation.createdAt),
  }));
  const nav = [
    { id: 'home', label: 'Home', icon: 'Home', section: 'Discover' },
    { id: 'discover', label: 'Discover Opportunities', icon: 'Globe', section: 'Discover' },
    { id: 'trending', label: 'App Store Rankings', icon: 'Bolt', section: 'Discover' },
    { id: 'search', label: 'Explore Apps', icon: 'Filter', section: 'Discover' },
    { id: 'market-insights', label: 'Market Insights', icon: 'BarChart', section: 'Discover' },
    { id: 'hot-ideas', label: 'Hot App Ideas', icon: 'Bolt', section: 'Discover' },

    { id: 'keyword-explorer', label: 'Keyword Explorer', icon: 'Search', section: 'Analyze' },
    { id: 'aso-analyzer', label: 'ASO Analyzer', icon: 'Target', section: 'Analyze' },
    { id: 'reviews', label: 'Reviews', icon: 'Book', section: 'Analyze' },
    { id: 'rank-history', label: 'Rank History', icon: 'LineChart', section: 'Analyze' },
    { id: 'competitors', label: 'Competitors', icon: 'Users', section: 'Analyze' },

    { id: 'app-tracking', label: 'App Tracking', icon: 'Activity', section: 'Track' },
    { id: 'revenue-insights', label: 'Revenue Insights', icon: 'BarChart', section: 'Track' },
    { id: 'pricing', label: 'Pricing Calculator', icon: 'Grid', section: 'Track' },

    { id: 'screenshots', label: 'AI Screenshot Generator', icon: 'Image', section: 'Create' },
    { id: 'idea-validator', label: 'Idea Validator', icon: 'CheckCircle', section: 'Create' },
    { id: 'ai-agents', label: 'AI Agents', icon: 'Wand', section: 'Create', badge: 'Beta' },
  ];
  const navSecondary = NAV_SECONDARY.map((item) => (
    item.id === 'favorites'
      ? { ...item, count: workspace.favoriteAppIds?.length || null }
      : item
  ));
  return {
    WORKSPACE: workspace,
    APPS: workspace.apps.map((app) => ({ ...app, category: normalizeCategory(app.category) })),
    TRACKED_APPS: (workspace.trackedApps || []).map((app) => ({ ...app, category: normalizeCategory(app.category) })),
    APP_PROFILES: workspace.appProfiles && typeof workspace.appProfiles === 'object' ? workspace.appProfiles : {},
    ONBOARDING: workspace.onboarding || defaultWorkspace().onboarding,
    PROJECTS: projects,
    TEMPLATES,
    SCREEN_LAYOUT_PRESETS,
    DECORATIVE_ELEMENTS,
    APP_CATEGORIES,
    STYLE_DIRECTIONS,
    TEXT_STYLE_OPTIONS,
    WEB_FONT_OPTIONS,
    AMBIENT_STYLE_OPTIONS,
    CTA_STYLE_OPTIONS,
    CHROME_STYLE_OPTIONS,
    STORE_EXPORT_PRESETS,
    CAPTION_STYLE_SYSTEMS,
    GENERATIONS: generations,
    COUNTRIES,
    NAV: nav,
    NAV_SECONDARY: navSecondary,
    PROJECT_TABS,
  };
}

window.SHIPSHOT = {
  STORAGE_KEY,
  defaultWorkspace,
  loadWorkspace,
  saveWorkspace,
  buildData,
  createProjectFromInput,
  buildSignalAppProfile,
  buildTrackedAppFromProfile,
  makeScreenRecords,
  makePrimaryVariant,
  categoryById,
  normalizeCategory,
  defaultLayoutForKind,
  normalizeLayout,
  normalizeScreen,
  applyScreenPreset,
  applyStyleDirection,
  styleDirectionById,
  presetById,
  WEB_FONT_OPTIONS,
  normalizeDecorations,
  createDecoration,
  localeForCountry,
  localizationOptionByCode,
  localizationLabel,
  pickAssetLocale,
  localizedCopyForLocale,
  localizeScreensForVariant,
  restyledCopyForMode,
  generateVariantCaptions,
  exportPresetById,
  formatRelative,
};

// Initialize with default workspace first
window.DATA = buildData(defaultWorkspace());

// Then load from Supabase asynchronously
loadWorkspace().then((workspace) => {
  window.DATA = buildData(workspace);
  // Trigger a re-render if the app is already mounted
  if (window.onWorkspaceLoaded) {
    window.onWorkspaceLoaded(workspace);
  }
});
