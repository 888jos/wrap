/* Mock data for Shipshot prototype */

const APPS = [
  { id: 'lumen', name: 'Lumen', sub: 'Focus timer + ambient sound', icon: 'L', tint: 'oklch(80% 0.12 60)', tint2: 'oklch(65% 0.14 30)', category: 'Productivity' },
  { id: 'glide', name: 'Glide', sub: 'AI pickleball coach', icon: 'G', tint: 'oklch(78% 0.14 180)', tint2: 'oklch(62% 0.14 220)', category: 'Sports' },
  { id: 'breadcrumb', name: 'Breadcrumb', sub: 'Travel journal, offline-first', icon: 'B', tint: 'oklch(78% 0.12 100)', tint2: 'oklch(60% 0.15 140)', category: 'Travel' },
  { id: 'seen', name: 'Seen', sub: 'Photo-native reading list', icon: 'S', tint: 'oklch(75% 0.14 340)', tint2: 'oklch(60% 0.15 310)', category: 'Reference' },
  { id: 'otto', name: 'Otto', sub: 'Grocery scanner for families', icon: 'O', tint: 'oklch(80% 0.13 45)', tint2: 'oklch(62% 0.17 20)', category: 'Food & Drink' },
];

const PROJECTS = [
  {
    id: 'lumen-launch',
    appId: 'lumen',
    name: 'Lumen — Launch Set v3',
    status: 'Editing',
    statusTone: 'accent',
    updated: '2h ago',
    variants: 4,
    screens: 6,
    audience: 'Students, 18–24',
    country: 'US',
    tone: 'Premium minimal',
    exports: 2,
    thumb: ['headline','feature','feature','lifestyle','stat','cta'],
  },
  {
    id: 'glide-de',
    appId: 'glide',
    name: 'Glide — DE variant',
    status: 'Needs review',
    statusTone: 'warn',
    updated: 'Yesterday',
    variants: 2,
    screens: 5,
    audience: 'Weekend players',
    country: 'DE',
    tone: 'Bold conversion',
    exports: 0,
    thumb: ['headline','feature','lifestyle','stat','cta'],
  },
  {
    id: 'breadcrumb-v1',
    appId: 'breadcrumb',
    name: 'Breadcrumb — first draft',
    status: 'Draft',
    statusTone: 'muted',
    updated: '3d ago',
    variants: 1,
    screens: 6,
    audience: 'Slow travelers',
    country: 'US',
    tone: 'Editorial lifestyle',
    exports: 0,
    thumb: ['headline','lifestyle','lifestyle','feature','stat','cta'],
  },
  {
    id: 'seen-cpp',
    appId: 'seen',
    name: 'Seen — Black Friday CPP',
    status: 'Exported',
    statusTone: 'success',
    updated: '5d ago',
    variants: 3,
    screens: 6,
    audience: 'Lapsed readers',
    country: 'US, UK',
    tone: 'High clarity utility',
    exports: 4,
    thumb: ['headline','stat','feature','feature','lifestyle','cta'],
  },
  {
    id: 'otto-fr',
    appId: 'otto',
    name: 'Otto — FR localization',
    status: 'Generating',
    statusTone: 'accent',
    updated: 'Just now',
    variants: 1,
    screens: 5,
    audience: 'Parents, 30–45',
    country: 'FR',
    tone: 'Warm & playful',
    exports: 0,
    thumb: ['headline','feature','lifestyle','stat','cta'],
  },
];

const TEMPLATES = [
  { id: 't1', name: 'Premium Minimal', tag: 'Utility · Productivity', density: 'Low', bg: 'linear-gradient(160deg, #e9e6dd, #c8c3b6)', accent: '#111', type: 'serif' },
  { id: 't2', name: 'Feature Focus', tag: 'SaaS · B2B tools', density: 'Medium', bg: 'linear-gradient(160deg, #0f1013, #1a1d22)', accent: 'oklch(84% 0.18 130)', type: 'mono' },
  { id: 't3', name: 'Bold Conversion', tag: 'Games · Shopping', density: 'High', bg: 'linear-gradient(160deg, oklch(70% 0.17 25), oklch(55% 0.2 15))', accent: '#fff', type: 'display' },
  { id: 't4', name: 'Editorial Lifestyle', tag: 'Travel · Wellness', density: 'Low', bg: 'linear-gradient(160deg, #f0ebe3, #d8c9b3)', accent: '#2a1c0d', type: 'serif' },
  { id: 't5', name: 'Before / After', tag: 'Fitness · Photo', density: 'Medium', bg: 'linear-gradient(160deg, #1f1f23, #3a3a42)', accent: '#fff', type: 'sans' },
  { id: 't6', name: 'Problem / Solution', tag: 'Finance · Health', density: 'Medium', bg: 'linear-gradient(160deg, oklch(30% 0.08 250), oklch(20% 0.05 250))', accent: 'oklch(82% 0.14 85)', type: 'sans' },
  { id: 't7', name: 'High-Clarity Utility', tag: 'Developer · Tools', density: 'Low', bg: 'linear-gradient(160deg, #f7f7f5, #e8e8e4)', accent: '#0a0b0d', type: 'sans' },
  { id: 't8', name: 'Wellness Premium', tag: 'Meditation · Sleep', density: 'Low', bg: 'linear-gradient(160deg, oklch(85% 0.04 210), oklch(65% 0.08 200))', accent: '#0f2a32', type: 'serif' },
  { id: 't9', name: 'Productivity Sharp', tag: 'Notes · Calendar', density: 'Medium', bg: 'linear-gradient(160deg, #0a0b0d, #14161a)', accent: 'oklch(72% 0.17 285)', type: 'sans' },
];

const GENERATIONS = [
  { id: 'g1', project: 'Lumen — Launch Set v3', time: '14 min ago', status: 'done', screens: 6, prompt: 'Premium minimal, emphasize focus sessions + ambient library' },
  { id: 'g2', project: 'Otto — FR localization', time: 'Just now', status: 'running', screens: 5, prompt: 'Translate hooks + adapt imagery for French families' },
  { id: 'g3', project: 'Glide — DE variant', time: '2h ago', status: 'done', screens: 5, prompt: 'Bold conversion, shift hook toward weekend social play' },
  { id: 'g4', project: 'Seen — Black Friday CPP', time: 'Yesterday', status: 'done', screens: 6, prompt: 'Add \"50% off annual\" hook; keep editorial tone' },
];

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'UK', flag: '🇬🇧', name: 'United Kingdom' },
];

const NAV = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'projects', label: 'Projects', icon: 'Folder', count: 12 },
  { id: 'templates', label: 'Templates', icon: 'Layers' },
  { id: 'assets', label: 'Assets', icon: 'Image' },
  { id: 'exports', label: 'Exports', icon: 'Download', badge: 2 },
];

const NAV_SECONDARY = [
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

// Inside a project
const PROJECT_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'generate', label: 'Generate' },
  { id: 'edit', label: 'Edit' },
  { id: 'variants', label: 'Variants' },
  { id: 'exports', label: 'Exports' },
  { id: 'history', label: 'History' },
];

// AI insights mock
const APP_INTEL = {
  summary: 'Lumen is a focus + ambient-audio companion. Source mix detected: 6 raw iPhone screens, App Store metadata, 3 marketing lines, Swift repo (148 files).',
  vps: [
    { label: 'Structured deep work', conf: 0.92, src: 'Repo · 23 refs' },
    { label: 'Curated ambient library', conf: 0.88, src: 'Screens 2, 5' },
    { label: 'Streak + consistency loop', conf: 0.79, src: 'Repo · Streak.swift' },
    { label: 'Shareable session recaps', conf: 0.71, src: 'Screen 6' },
  ],
  features: [
    '25/50/90-min session presets',
    'Pomodoro + classical timer modes',
    'Binaural + nature sound packs (12)',
    'Apple Watch companion',
    'Live Activity during focus',
    'Widgets: streak, today, next session',
    'Weekly insights email',
    'Focus Mode auto-sync',
  ],
  narrative: [
    { n: 1, role: 'Hook', line: '“Finally, deep work that sticks.”' },
    { n: 2, role: 'Feature', line: 'Session presets with ambient library' },
    { n: 3, role: 'Feature', line: 'Apple Watch — start from wrist' },
    { n: 4, role: 'Social proof', line: '4.9★ · 18k ratings' },
    { n: 5, role: 'Lifestyle', line: 'Morning ritual imagery' },
    { n: 6, role: 'CTA', line: '“Start your first 25.”' },
  ],
  audiences: ['Students, 18–24', 'Knowledge workers, 25–40', 'Creatives & writers', 'ADHD / focus seekers'],
  markets: ['US (primary)', 'UK', 'DE', 'JP — strong Watch share'],
  directions: ['Premium Minimal', 'Editorial Lifestyle', 'Productivity Sharp'],
};

window.DATA = { APPS, PROJECTS, TEMPLATES, GENERATIONS, COUNTRIES, NAV, NAV_SECONDARY, PROJECT_TABS, APP_INTEL };
