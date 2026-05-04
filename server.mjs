import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { createServer } from 'node:http';

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3000);
const root = process.cwd();
const runtimeRoot = join(root, '.shipshot-runtime');
const jobsRoot = join(runtimeRoot, 'jobs');
const cacheRoot = join(runtimeRoot, 'cache');
const keywordCacheRoot = join(cacheRoot, 'keywords');
const keywordHistoryRoot = join(runtimeRoot, 'keyword-history');
const DAY_MS = 24 * 60 * 60 * 1000;
const KEYWORD_CACHE_VERSION = '2026-04-25-3';

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;

  const raw = readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    if (!key || process.env[key] !== undefined) continue;

    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(join(root, '.env'));
loadEnvFile(join(root, '.env.local'));

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.png': 'image/png',
};

function resolvePath(urlPath) {
  const pathname = urlPath === '/' ? '/index.html' : urlPath;
  const clean = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  return join(root, clean);
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload, null, 2));
}

function clientEnvScript() {
  const payload = {
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    VITE_SUPABASE_PUBLISHABLE_KEY: process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '',
  };
  const serialized = JSON.stringify(payload).replace(/</g, '\\u003c');
  return `<script>window.__SHIPSHOT_ENV__=${serialized};</script>`;
}

function jobId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

function cacheSlug(value) {
  return compactText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'default';
}

function cacheFileFor(namespace, key) {
  return join(keywordCacheRoot, namespace, `${cacheSlug(key)}.json`);
}

function keywordHistoryDirFor(appId, country, keyword) {
  return join(
    keywordHistoryRoot,
    cacheSlug(appId),
    cacheSlug(String(country || 'US').toUpperCase()),
    cacheSlug(keyword),
  );
}

async function readCacheEntry(namespace, key) {
  const path = cacheFileFor(namespace, key);
  if (!existsSync(path)) return null;
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function writeCacheEntry(namespace, key, payload) {
  const path = cacheFileFor(namespace, key);
  await ensureDir(dirname(path));
  await writeFile(path, JSON.stringify(payload, null, 2));
  return payload;
}

async function readKeywordHistory(appId, country, keyword) {
  const dir = keywordHistoryDirFor(appId, country, keyword);
  if (!existsSync(dir)) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const rows = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    try {
      const raw = await readFile(join(dir, entry.name), 'utf8');
      rows.push(JSON.parse(raw));
    } catch {
      // ignore corrupt snapshots
    }
  }

  return rows.sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

async function writeKeywordHistorySnapshot(appId, country, keyword, snapshot) {
  const dir = keywordHistoryDirFor(appId, country, keyword);
  await ensureDir(dir);
  const filename = `${snapshot.date}.json`;
  await writeFile(join(dir, filename), JSON.stringify(snapshot, null, 2));
  return snapshot;
}

function isCacheFresh(entry, ttlMs = DAY_MS) {
  if (!entry?.fetchedAt || entry?.version !== KEYWORD_CACHE_VERSION) return false;
  const fetchedAt = new Date(entry.fetchedAt).getTime();
  if (!Number.isFinite(fetchedAt)) return false;
  return (Date.now() - fetchedAt) < ttlMs;
}

function nextRefreshAt(fetchedAt, ttlMs = DAY_MS) {
  const base = new Date(fetchedAt).getTime();
  if (!Number.isFinite(base)) return null;
  return new Date(base + ttlMs).toISOString();
}

function keywordResponseMeta({ keyword = '', term = '', country = 'us', fetchedAt, cached = false, source = 'apple-itunes' }) {
  return {
    keyword: keyword || term || '',
    country: String(country || 'us').toUpperCase(),
    source,
    refreshPolicy: 'daily',
    cached,
    fetchedAt,
    nextRefreshAt: nextRefreshAt(fetchedAt),
    revenueSource: 'modeled-from-live-app-store-signals',
    paidEnrichmentConfigured: Boolean(process.env.APPSTORESPY_API_KEY),
  };
}

function keywordSuggestionSource(suggestions = []) {
  return suggestions[0]?.source || 'apple-search-hints';
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

function decodeDataUrl(input) {
  const match = String(input || '').match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid data URL payload');
  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], 'base64'),
  };
}

async function writeJob(job) {
  const dir = join(jobsRoot, job.id);
  await ensureDir(dir);
  await writeFile(join(dir, 'job.json'), JSON.stringify(job, null, 2));
  return dir;
}

async function readJob(id) {
  const path = join(jobsRoot, id, 'job.json');
  const raw = await readFile(path, 'utf8');
  return JSON.parse(raw);
}

async function listJobs() {
  if (!existsSync(jobsRoot)) return [];
  const entries = await readdir(jobsRoot, { withFileTypes: true });
  const jobs = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      jobs.push(await readJob(entry.name));
    } catch {
      // ignore corrupt jobs
    }
  }
  return jobs.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function titleCase(value) {
  return String(value || '')
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function compactText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value || ''));
  } catch {
    return String(value || '');
  }
}

function inferCategoryId(value) {
  const text = compactText(value).toLowerCase();
  const rules = [
    ['health-fitness', /(quit|nicotine|sobriety|smoking|alcohol|urge|craving|habit|routine|streak|run|running|workout|fitness|coach|strength|training|marathon|calorie|macro|nutrition|meal|fasting|weight|protein|sleep|bedtime|recovery|nap|rest|circadian|mood|mental|anxiety|therapy|journal|cbt|stress|calm|pregnan)/],
    ['finance', /(budget|finance|expense|saving|savings|invest|subscription|money|bank|tax|insurance)/],
    ['education', /(language|learn|learning|flashcard|vocabulary|course|study|education|school)/],
    ['business', /(crm|sales|erp|document|invoice|team|workspace|enterprise|manager|b2b)/],
    ['developer-tools', /(developer|coding|code editor|testing|debug|sdk|api reference)/],
    ['medical', /(doctor|medical|clinic|patient|symptom|therapy device|anatomy)/],
    ['shopping', /(shop|shopping|commerce|storefront|marketplace|coupon)/],
    ['travel', /(travel|flight|hotel|booking|trip)/],
    ['social-networking', /(community|social|chat|messaging|dating|followers)/],
    ['photo-video', /(photo|camera|video|editing|filter)/],
    ['games', /(game|gaming|arcade|puzzle|rpg|multiplayer)/],
    ['productivity', /(focus|task|todo|productivity|planner|notes|deep work|pomodoro|calendar|organize)/],
  ];
  const match = rules.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : 'productivity';
}

function inferAudience(value) {
  const text = compactText(value).toLowerCase();
  if (/(team|manager|b2b|enterprise|workspace|developer)/.test(text)) return 'Professional audience';
  if (/(premium|luxury|high-end|elevated)/.test(text)) return 'Premium audience';
  if (/(student|teen|gen z|creator)/.test(text)) return 'Younger audience';
  return 'General audience';
}

function inferCountry(value) {
  const text = compactText(value).toLowerCase();
  if (/(france|french|fr-fr)/.test(text)) return 'fr-FR';
  if (/(germany|german|de-de)/.test(text)) return 'de-DE';
  if (/(spain|spanish|es-es)/.test(text)) return 'es-ES';
  if (/(italy|italian|it-it)/.test(text)) return 'it-IT';
  if (/(uk|united kingdom|british|en-gb)/.test(text)) return 'en-GB';
  return 'en-US';
}

function guessAppNameFromPrompt(value) {
  const text = compactText(value);
  const quoted = text.match(/["“](.+?)["”]/);
  if (quoted?.[1]) return titleCase(quoted[1]);
  const appMatch = text.match(/for\s+an?\s+(.+?)\s+app/i);
  if (appMatch?.[1]) return titleCase(appMatch[1]).slice(0, 34);
  const firstChunk = text.split(/[,.]/)[0] || text;
  return titleCase(firstChunk).slice(0, 34) || 'Untitled App';
}

function repoInfoFromInput(value) {
  const raw = compactText(value);
  const urlMatch = raw.match(/github\.com\/([^/\s]+)\/([^/\s#?]+)/i);
  const owner = urlMatch?.[1] || raw.split('/')[0] || 'owner';
  const repoRaw = (urlMatch?.[2] || raw.split('/')[1] || raw).replace(/\.git$/i, '');
  const repo = repoRaw.replace(/[^\w.-]/g, '') || 'repo';
  return {
    owner,
    repo,
    slug: `${owner}/${repo}`,
    url: urlMatch ? `https://github.com/${owner}/${repo}` : `https://github.com/${owner}/${repo}`,
    appName: titleCase(repo.replace(/[._-]+/g, ' ')),
  };
}

function appStoreInfoFromInput(value) {
  const raw = compactText(value);
  const idMatch = raw.match(/id(\d{5,})/i) || raw.match(/\b(\d{5,})\b/);
  const slugMatch = raw.match(/\/app\/([^/?#]+)/i);
  const appId = idMatch?.[1] || '000000000';
  const slug = slugMatch?.[1] ? titleCase(safeDecode(slugMatch[1]).replace(/-/g, ' ')) : '';
  const appName = slug || 'App Store Listing';
  return {
    appId,
    url: raw.startsWith('http') ? raw : `https://apps.apple.com/app/id${appId}`,
    appName,
  };
}

function playInfoFromInput(value) {
  const raw = compactText(value);
  const idMatch = raw.match(/[?&]id=([A-Za-z0-9._]+)/) || raw.match(/\b([a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+)\b/i);
  const packageName = idMatch?.[1] || raw || 'com.example.app';
  const appName = titleCase(packageName.split('.').slice(-1)[0].replace(/[_-]+/g, ' '));
  return {
    packageName,
    url: raw.startsWith('http') ? raw : `https://play.google.com/store/apps/details?id=${packageName}`,
    appName,
  };
}

function buildPromptBrief({ appName, categoryId, sourceType, sourceValue, contextPrompt }) {
  const categoryLabels = {
    books: 'book or reading',
    business: 'business',
    'developer-tools': 'developer tooling',
    education: 'education',
    entertainment: 'entertainment',
    finance: 'finance',
    'food-drink': 'food or drink',
    games: 'games',
    'graphics-design': 'design',
    'health-fitness': 'health and fitness',
    lifestyle: 'lifestyle',
    kids: 'kids',
    'magazines-newspapers': 'magazine or news publishing',
    medical: 'medical',
    music: 'music',
    navigation: 'navigation',
    news: 'news',
    'photo-video': 'photo and video',
    productivity: 'productivity',
    reference: 'reference',
    'safari-extensions': 'Safari extension',
    shopping: 'shopping',
    'social-networking': 'social networking',
    sports: 'sports',
    travel: 'travel',
    utilities: 'utilities',
    weather: 'weather',
  };
  const categoryLabel = categoryLabels[categoryId] || 'productivity';
  const context = compactText(contextPrompt);

  if (sourceType === 'repo') {
    return compactText(`Create a polished App Store screenshot brief for ${appName}, using the GitHub repository as product context. Focus the pack on the clearest ${categoryLabel} value props, product proof, and one strong conversion CTA.${context ? ` Extra direction: ${context}` : ''}`);
  }

  if (sourceType === 'app-store') {
    return compactText(`Refresh the App Store screenshot brief for ${appName} with clearer hierarchy, stronger benefit framing, and cleaner conversion hooks for a ${categoryLabel} app.${context ? ` Extra direction: ${context}` : ''}`);
  }

  if (sourceType === 'google-play') {
    return compactText(`Create a Google Play screenshot brief for ${appName} that sharpens first-screen clarity, feature proof, and install intent for a ${categoryLabel} app.${context ? ` Extra direction: ${context}` : ''}`);
  }

  return compactText(sourceValue);
}

function formatAppSummary(appName, metadata = {}, contextPrompt = '') {
  const raw = compactText(metadata.description || metadata.readme || '');
  const cleaned = raw
    .replace(/•/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\bUnlike traditional .*?(?=[A-Z]|$)/i, '')
    .trim();
  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => compactText(part))
    .filter(Boolean)
    .slice(0, 2);
  const context = compactText(contextPrompt);

  if (!sentences.length) {
    return context ? `${appName} helps users ${context.charAt(0).toLowerCase()}${context.slice(1)}.` : '';
  }

  const firstSentence = sentences[0]
    .replace(new RegExp(`^${appName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+(is|helps)\\s+`, 'i'), '')
    .replace(/^is designed to /i, '')
    .replace(/^designed to /i, '')
    .replace(/^helps users /i, '')
    .trim();

  const normalizedFirst = `${appName} helps users ${firstSentence.charAt(0).toLowerCase()}${firstSentence.slice(1)}`.replace(/\.\.+/g, '.');
  const extraSentence = sentences[1] ? sentences[1].replace(/^Unlike .*$/i, '').trim() : '';
  const parts = [normalizedFirst];
  if (extraSentence) parts.push(extraSentence);
  if (context) parts.push(context.charAt(0).toUpperCase() + context.slice(1));
  return compactText(parts.filter(Boolean).join(' '));
}

function resolveSourcePayload(payload) {
  const sourceType = payload.sourceType || 'prompt';
  const sourceValue = compactText(payload.sourceValue);
  const contextPrompt = compactText(payload.contextPrompt);
  const metadata = payload.connection?.metadata || payload.metadata || {};
  let appName = 'Untitled App';
  let sourceReference = sourceValue;

  if (sourceType === 'repo') {
    const repo = repoInfoFromInput(sourceValue || payload.connection?.ref || payload.connection?.url);
    appName = metadata.appName || repo.appName;
    sourceReference = repo.url;
  } else if (sourceType === 'app-store') {
    const store = appStoreInfoFromInput(sourceValue || payload.connection?.appId || payload.connection?.url);
    appName = metadata.appName || store.appName;
    sourceReference = store.url;
  } else if (sourceType === 'google-play') {
    const play = playInfoFromInput(sourceValue || payload.connection?.packageName || payload.connection?.url);
    appName = metadata.appName || play.appName;
    sourceReference = play.url;
  } else {
    appName = guessAppNameFromPrompt(sourceValue);
  }

  const textForInference = [
    sourceValue,
    contextPrompt,
    appName,
    metadata.subtitle,
    metadata.description,
    metadata.readme,
    metadata.topics?.join(' '),
  ].filter(Boolean).join(' ');
  const category = inferCategoryId(textForInference);
  const audience = inferAudience(textForInference);
  const country = inferCountry(textForInference);
  const brief = buildPromptBrief({
    appName,
    categoryId: category,
    sourceType,
    sourceValue,
    contextPrompt,
  });

  const appDescription = formatAppSummary(appName, metadata, contextPrompt) || summarizeMetadata(metadata);
  const enrichedBrief = sourceType === 'prompt'
    ? brief
    : (appDescription || brief);

  return {
    projectName: `${appName} launch`,
    appName,
    appDescription,
    category,
    audience,
    country,
    screenCount: 6,
    sourceType,
    sourceValue: sourceReference,
    brief: enrichedBrief,
    summary: sourceType === 'prompt'
      ? 'Prompt normalized into a production-ready screenshot brief.'
      : sourceType === 'repo'
        ? 'Repository connected, README parsed, and converted into an ASO brief.'
        : sourceType === 'app-store'
          ? 'App Store listing connected, metadata parsed, and converted into a refresh brief.'
          : 'Google Play listing connected, metadata parsed, and converted into a refresh brief.',
    metadata,
    highlights: [
      `App: ${appName}`,
      `Category: ${category}`,
      `Audience: ${audience}`,
      `Locale: ${country}`,
    ],
  };
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`Request failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`Request failed with ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.text();
}

function buildMetaAdsSearchUrl(advertiser = '') {
  return `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=${encodeURIComponent(`"${compactText(advertiser)}"`)}`;
}

function trimToSnippet(value, limit = 280) {
  const text = compactText(value);
  if (!text) return '';
  if (text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (compactText(value)) return compactText(value);
  }
  return '';
}

function scoreIdeaSimilarity(ideaWords, categoryLabel, app, index = 0) {
  const nameText = String(app?.name || '').toLowerCase();
  const appCategory = String(app?.category?.label || app?.category || '').toLowerCase();
  const wordMatches = ideaWords.filter((word) => nameText.includes(word)).length;
  const categoryMatch = appCategory && appCategory === String(categoryLabel || '').toLowerCase();
  return Math.max(35, Math.min(96, Math.round(46 + (wordMatches * 12) + (categoryMatch ? 16 : 0) - (index * 3))));
}

function inferIdeaCategoryLabel(idea) {
  const categoryId = inferCategoryId(idea);
  return titleCase(categoryId.replace(/-/g, ' '));
}

function ideaKeywords(idea) {
  return Array.from(new Set(
    String(idea || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2)
  ));
}

function buildIdeaSearchTermsServer(idea, categoryLabel = '') {
  const words = ideaKeywords(idea).filter((word) => !['with', 'that', 'this', 'from', 'into', 'your', 'users'].includes(word));
  const pairs = [];
  const compact = words.slice(0, 3).join(' ');
  if (compact) pairs.push(compact);
  if (words[0] && categoryLabel) pairs.push(`${words[0]} ${categoryLabel}`);
  if (words[1] && words[2]) pairs.push(`${words[1]} ${words[2]} app`);
  if (categoryLabel) pairs.push(`${categoryLabel} app`);
  return Array.from(new Set(pairs.filter(Boolean))).slice(0, 4);
}

async function fetchIdeaValidatorComparableApps(idea, categoryLabel = '') {
  const queries = buildIdeaSearchTermsServer(idea, categoryLabel);
  const collected = new Map();
  for (const query of queries) {
    try {
      const results = await fetchAppleSearch(query, 'us', 8);
      results.forEach((app) => {
        const key = String(app.id || app.storeId || app.url || app.name || '').trim();
        if (!key || collected.has(key)) return;
        collected.set(key, app);
      });
    } catch {}
  }
  const words = ideaKeywords(idea);
  return Array.from(collected.values()).slice(0, 8).map((app, index) => ({
    id: app.id || app.storeId || `${app.name}-${index}`,
    name: app.name || 'Unnamed app',
    developer: app.developer || 'Unknown developer',
    icon: app.icon || '',
    category: app.category || categoryLabel,
    rating: app.rating || null,
    reviews: app.reviews || 0,
    revenue: app.revenue || 0,
    downloads: app.downloads || 0,
    url: app.url || '',
    price: app.price || app.priceText || 'See store',
    similarity: scoreIdeaSimilarity(words, categoryLabel, app, index),
    note: index === 0 ? 'Closest positioning overlap.' : index === 1 ? 'Useful benchmark for onboarding and packaging.' : 'Adjacent competitor, good for feature and messaging comparison.',
  }));
}

function redditHeaders() {
  return {
    'User-Agent': 'Signal-IdeaValidator/1.0',
    'Accept': 'application/json',
  };
}

function buildRedditPermalink(permalink) {
  const normalized = String(permalink || '').trim();
  return normalized ? `https://www.reddit.com${normalized}` : 'https://www.reddit.com/';
}

function sanitizeRedditItem(item, type = 'post') {
  const data = item?.data || {};
  const permalink = buildRedditPermalink(data.permalink);
  return {
    id: String(data.id || permalink),
    platform: type === 'comment' ? 'Reddit comment' : 'Reddit post',
    title: compactText(type === 'comment' ? (data.link_title || data.title || 'Reddit discussion') : (data.title || 'Reddit post')),
    quote: trimToSnippet(type === 'comment' ? (data.body || data.selftext || '') : (data.selftext || data.title || '')),
    author: data.author || 'unknown',
    community: data.subreddit_name_prefixed || (data.subreddit ? `r/${data.subreddit}` : 'Reddit'),
    createdAt: data.created_utc ? new Date(data.created_utc * 1000).toISOString() : null,
    score: Number(data.score || 0),
    commentsCount: Number(data.num_comments || 0),
    rawText: compactText(type === 'comment'
      ? `${data.link_title || ''} ${data.body || ''} ${data.subreddit_name_prefixed || ''}`
      : `${data.title || ''} ${data.selftext || ''} ${data.subreddit_name_prefixed || ''}`),
    url: permalink,
    externalUrl: permalink,
    permalink,
  };
}

function ideaResearchKeywords(idea, categoryLabel = '') {
  const base = ideaKeywords(idea).filter((word) => ![
    'this', 'that', 'with', 'from', 'into', 'your', 'have', 'will', 'them', 'then',
    'which', 'there', 'because', 'mode', 'price', 'month', 'year', 'simple', 'daily',
  ].includes(word));
  const categoryWords = String(categoryLabel || '').toLowerCase().split(/\s+/).filter(Boolean);
  return Array.from(new Set([...base, ...categoryWords])).slice(0, 18);
}

function buildRedditQueryVariants(idea, categoryLabel = '') {
  const keywords = ideaResearchKeywords(idea, categoryLabel);
  const priority = keywords.filter((word) => word.length >= 4).slice(0, 8);
  const variants = [];
  if (priority.length >= 2) variants.push(`"${priority.slice(0, 2).join(' ')}" app`);
  if (priority.length >= 3) variants.push(`${priority[0]} ${priority[1]} ${priority[2]}`);
  if (priority.length >= 2) variants.push(`${priority[0]} ${priority[1]} reddit`);
  if (priority.length >= 1 && categoryLabel) variants.push(`${priority[0]} ${categoryLabel} app`);
  if (categoryLabel) variants.push(`${categoryLabel} app`);
  variants.push(priority.slice(0, 4).join(' '));
  return Array.from(new Set(variants.map((item) => compactText(item)).filter(Boolean))).slice(0, 5);
}

function scoreRedditResult(result, keywords) {
  const haystack = String(result.rawText || `${result.title} ${result.quote} ${result.community}`).toLowerCase();
  let score = 0;

  // PRIORITY: Pain points and frustrations
  const painPointWords = /(frustrat|annoying|hate|struggle|difficult|problem|issue|pain|suck|terrible|awful|disappoint|broken|bug|crash|slow|confusing|complicated|wish|need|want|looking for|alternative|better way|missing|lacking)/i;
  if (painPointWords.test(haystack)) score += 25; // Big boost for pain points

  keywords.forEach((keyword) => {
    if (!keyword) return;
    if (haystack.includes(keyword)) score += keyword.length >= 8 ? 8 : keyword.length >= 5 ? 6 : 4;
  });

  if (/(app|tool|habit|productivity|focus|routine|streak|accountability|procrastination|motivation|discipline)/.test(haystack)) score += 10;
  if (/(r\/productivity|r\/getdisciplined|r\/selfimprovement|r\/adhd|r\/entrepreneur|r\/sideproject|r\/iosapps|r\/androidapps|r\/apple|r\/startups)/.test(haystack)) score += 8;

  // Penalize off-topic content
  if (/https?:\/\/m\.phys\.org|eurekalert|science|news/.test(haystack)) score -= 18;
  if ((result.quote || '').length < 30) score -= 6;

  // Boost high engagement
  score += Math.min(12, Math.log10(Math.max(1, Number(result.score || 0) + 1)) * 6);

  return Math.round(score);
}

async function fetchRedditSearch(query, type = 'link', limit = 6) {
  const url = new URL('https://www.reddit.com/search.json');
  url.searchParams.set('q', query);
  url.searchParams.set('sort', 'relevance');
  url.searchParams.set('limit', String(Math.min(limit, 12)));
  if (type) url.searchParams.set('type', type);
  const payload = await fetchJson(url.toString(), { headers: redditHeaders() });
  return (((payload || {}).data || {}).children || []).map((item) => sanitizeRedditItem(item, type === 'comment' ? 'comment' : 'post'));
}

async function fetchRelevantRedditResults(idea, categoryLabel = '', type = 'link', limit = 6) {
  const queries = buildRedditQueryVariants(idea, categoryLabel);
  const keywords = ideaResearchKeywords(idea, categoryLabel);
  const collected = new Map();

  for (const query of queries) {
    try {
      const items = await fetchRedditSearch(query, type, 10);
      items.forEach((item) => {
        const key = String(item.id || item.permalink || item.url);
        if (!key) return;
        const relevance = scoreRedditResult(item, keywords);
        if (relevance < 18) return;
        const enriched = { ...item, relevance };
        const current = collected.get(key);
        if (!current || relevance > current.relevance) collected.set(key, enriched);
      });
    } catch {}
  }

  return Array.from(collected.values())
    .sort((a, b) => (b.relevance - a.relevance) || (b.score - a.score) || (b.commentsCount - a.commentsCount))
    .slice(0, limit)
    .map(({ rawText, relevance, ...rest }) => rest);
}

async function fetchXTweets(query, limit = 6) {
  const bearerToken = process.env.X_BEARER_TOKEN || '';
  if (!bearerToken) {
    return { available: false, posts: [], message: 'Set X_BEARER_TOKEN to enable live X search.' };
  }

  const url = new URL('https://api.twitter.com/2/tweets/search/recent');
  url.searchParams.set('query', `${query} -is:retweet lang:en`);
  url.searchParams.set('max_results', String(Math.min(limit, 10)));
  url.searchParams.set('tweet.fields', 'created_at,public_metrics,author_id,text');
  url.searchParams.set('expansions', 'author_id');
  url.searchParams.set('user.fields', 'name,username,profile_image_url');

  const payload = await fetchJson(url.toString(), {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Accept': 'application/json',
    },
  });

  const users = new Map((((payload || {}).includes || {}).users || []).map((user) => [String(user.id), user]));
  const posts = ((payload || {}).data || []).map((tweet) => {
    const author = users.get(String(tweet.author_id)) || {};
    const username = author.username || 'unknown';
    return {
      id: String(tweet.id),
      platform: 'X post',
      title: firstNonEmpty(author.name, `@${username}`),
      quote: trimToSnippet(tweet.text || ''),
      author: author.name || username,
      handle: username ? `@${username}` : '',
      createdAt: tweet.created_at || null,
      score: Number(tweet.public_metrics?.like_count || 0),
      commentsCount: Number(tweet.public_metrics?.reply_count || 0),
      reposts: Number(tweet.public_metrics?.retweet_count || 0),
      url: `https://x.com/${username}/status/${tweet.id}`,
      externalUrl: `https://x.com/${username}/status/${tweet.id}`,
    };
  });

  return { available: true, posts };
}

function validateIdeaIsApp(idea) {
  // First check if it's clearly a software app (skip all validation if true)
  const hasStrongAppIndicators = /(mobile app|web app|ios app|android app|software|saas|webapp|application)/i.test(idea);
  if (hasStrongAppIndicators) {
    return { isValid: true }; // Strong signal it's an app, skip other checks
  }

  // Reject obvious physical products (but be specific)
  if (/(physical product|hardware device|smart watch|smart ring|fitness band|iot device|connected device|bluetooth device)/i.test(idea)) {
    return { isValid: false, reason: 'This appears to be about a physical product or hardware device. The Idea Validator is designed for software applications only. Please describe a mobile or web app idea instead.' };
  }

  // Only reject if it mentions wearable/gadget WITHOUT app keywords
  if (/(wearable|gadget|sensor|chip|circuit)/i.test(idea) && !/(app|mobile|software|companion app|ios|android)/i.test(idea)) {
    return { isValid: false, reason: 'This appears to be focused on hardware. If you\'re building a companion app or software, please emphasize the app component of your idea.' };
  }

  // Reject services/platforms without clear app component
  if (/(consulting|agency|marketplace|platform|service) (?:that|to|for)/i.test(idea) && !/(app|mobile|software|tool)/i.test(idea)) {
    const hasAppKeywords = /(screen|feature|notification|user interface|dashboard|login|onboarding|push|sync)/i.test(idea);
    if (!hasAppKeywords) {
      return { isValid: false, reason: 'This appears to be a service or business model rather than a software application. Please describe the specific app/tool you want to build, including features users would interact with.' };
    }
  }

  // Reject generic business ideas
  if (/(start a business|business idea|business model|revenue stream)/i.test(idea) && !/(app|mobile|software|platform|tool|website)/i.test(idea)) {
    return { isValid: false, reason: 'This appears to be a general business idea. Please describe the specific software application or digital product you want to create.' };
  }

  // Reject content-only ideas
  if (/(blog|podcast|youtube channel|newsletter|course|ebook)/i.test(idea) && !/(app|tool|platform|software)/i.test(idea)) {
    return { isValid: false, reason: 'This appears to be about content creation rather than a software application. If you want to build a tool to help with this, please describe the app features specifically.' };
  }

  // Require some indication it's software/app related
  const hasAppIndicators = /(app|mobile|software|tool|platform|website|web|digital|online|saas|interface|dashboard|feature|screen|notification|sync|login|user|track|automat|generat|ios|android)/i.test(idea);
  if (!hasAppIndicators) {
    return { isValid: false, reason: 'Please clarify that this is a software/app idea by mentioning app features, user flows, or how users would interact with it digitally. Add keywords like "app", "tool", "platform", "dashboard", etc.' };
  }

  return { isValid: true };
}

function buildIdeaSummary(idea, categoryLabel, competitors, redditPosts = [], redditComments = [], xPosts = []) {
  const words = ideaKeywords(idea);
  const hasAudience = /(developer|student|founder|creator|coach|team|parent|runner|freelancer|designer|professional|manager)/i.test(idea);
  const hasProblem = /(help|reduce|improve|save|track|validate|plan|simplify|organize|compare|monitor|coach|automate|streamline|optimize)/i.test(idea);
  const hasDistributionHook = /(community|viral|share|collaborat|social|leaderboard|template|generator|agent|invite|export)/i.test(idea);

  // Analyze real user signals from Reddit and X
  const allPosts = [...redditPosts, ...redditComments, ...xPosts];
  const totalEngagement = allPosts.reduce((sum, post) => sum + (post.score || 0) + (post.commentsCount || 0), 0);
  const hasStrongSignals = allPosts.length >= 8 && totalEngagement > 100;
  const painPointMentions = allPosts.filter(post =>
    /(frustrat|annoying|wish|need|want|looking for|alternative|better way)/i.test(post.quote || '')
  ).length;

  // Enhanced scoring with real data
  const marketScore = Math.max(32, Math.min(94, Math.round(
    58 + (hasProblem ? 12 : 0) + (hasAudience ? 8 : 0) + Math.min(words.length, 8) +
    (hasStrongSignals ? 10 : 0) + Math.min(painPointMentions * 2, 12)
  )));
  const competitionScore = Math.max(32, Math.min(94, Math.round(
    82 - Math.min(competitors.length * 6, 26) + (hasDistributionHook ? 4 : -3) +
    (competitors.length > 0 && competitors[0].rating < 4.0 ? 8 : 0)
  )));
  const uniquenessScore = Math.max(32, Math.min(94, Math.round(
    48 + (hasDistributionHook ? 15 : 0) + (hasAudience ? 10 : 0) +
    (allPosts.length >= 10 ? 8 : 0)
  )));
  const feasibilityScore = Math.max(32, Math.min(94, Math.round(
    78 - Math.max(words.length - 14, 0) * 2 + (hasProblem ? 4 : -6)
  )));
  const overall = Math.max(32, Math.min(94, Math.round((marketScore + competitionScore + uniquenessScore + feasibilityScore) / 4)));

  const crowded = competitors.length >= 5;
  const topCompetitor = competitors[0] || {};
  const avgRating = competitors.length > 0
    ? competitors.reduce((sum, c) => sum + (c.rating || 0), 0) / competitors.length
    : 0;

  // Build enhanced opportunity analysis
  const opportunityInsights = [];
  if (hasStrongSignals) {
    opportunityInsights.push(`Found ${allPosts.length} relevant discussions with ${totalEngagement}+ total engagement, indicating real user interest.`);
  }
  if (painPointMentions >= 5) {
    opportunityInsights.push(`${painPointMentions} posts explicitly mention pain points or frustrations with current solutions.`);
  }
  if (crowded && avgRating < 4.2) {
    opportunityInsights.push(`Despite ${competitors.length} competitors, average rating is ${avgRating.toFixed(1)}/5.0, suggesting room for a better solution.`);
  }
  if (!crowded && hasStrongSignals) {
    opportunityInsights.push(`Low competition (${competitors.length} apps) but high discussion volume suggests an underserved market.`);
  }
  if (redditPosts.length >= 6) {
    const topSubreddits = [...new Set(redditPosts.map(p => p.community).filter(Boolean))].slice(0, 3);
    opportunityInsights.push(`Active discussions in ${topSubreddits.join(', ')} communities.`);
  }

  const opportunity = crowded
    ? `There is real demand, but the category already has broad competitors${topCompetitor.name ? ` led by ${topCompetitor.name}` : ''}. ${opportunityInsights.join(' ')} Winning will depend on a narrower ICP and a faster first-use workflow.`
    : `The category still has whitespace. There are adjacent products, but not many tools owning this exact use case cleanly. ${opportunityInsights.join(' ')}`;

  return {
    scores: { market: marketScore, competition: competitionScore, uniqueness: uniquenessScore, feasibility: feasibilityScore, overall },
    verdict: overall >= 74 ? 'Buildable with a clear wedge' : overall >= 60 ? 'Needs a sharper wedge before building' : 'Interesting, but underdefined',
    opportunity,
    moat: hasDistributionHook
      ? 'Lean into distribution loops: shareable outputs, templates, and collaboration should be product mechanics.'
      : 'Lean into workflow compression: less setup, faster first value, and a recurring trigger users feel every week.',
    researchNotes: [
      `Search demand maps reasonably well to ${categoryLabel} intent and pain-driven utility language.`,
      crowded
        ? `Top competitors already cover the generic use case${topCompetitor.name ? ` (${topCompetitor.name} has ${topCompetitor.rating ? topCompetitor.rating.toFixed(1) : 'N/A'} rating)` : ''}, so the positioning has to emphasize what they ignore.`
        : 'Few direct competitors surfaced, which suggests either whitespace or weak keyword framing.',
      allPosts.length >= 8
        ? `Found ${allPosts.length} real user discussions. ${painPointMentions > 0 ? `${painPointMentions} mention specific pain points.` : 'Review them for positioning insights.'}`
        : 'Limited social proof found. Consider validating demand through direct outreach.',
      'The launch narrative should focus on the concrete job-to-be-done, not generic AI wording.',
    ],
    differentiation: {
      angle: [
        `Target a narrower buyer than current leaders, for example "${categoryLabel} for ${titleCase(firstNonEmpty(words[0], 'operators'))}" instead of another horizontal tool.`,
        'Promise a measurable before/after state in the first session.',
        crowded
          ? `Compete on workflow depth and speed, not feature count. ${avgRating < 4.2 ? 'Current solutions have mediocre ratings - focus on better UX.' : ''}`
          : 'Use the whitespace to define a sharper category frame early.',
        painPointMentions >= 5
          ? `Address the ${painPointMentions} specific pain points found in user discussions directly in your positioning.`
          : 'Conduct user interviews to identify specific pain points for sharper positioning.',
      ],
      launchHooks: [
        `Lead with one sentence: "${titleCase(firstNonEmpty(words[0], categoryLabel))} without the usual setup overhead."`,
        'Show one concrete workflow in the first 30 seconds instead of a generic dashboard.',
        'Design screenshots and landing copy around pain, relief, and a measurable result.',
        allPosts.length >= 8 ? 'Quote real user frustrations from Reddit/X in your landing page to build credibility.' : 'Collect 5-10 user testimonials before launch.',
      ],
    },
    recommendations: [
      overall >= 74 ? 'Strong concept. Worth prototyping with a landing page and 3-5 interviews quickly.' : 'Promising, but the positioning still needs sharpening before building.',
      crowded ? `The category is competitive with ${competitors.length} known apps. Pick one persona and one high-frequency use case.` : 'The category looks less saturated. Move quickly to validate willingness to switch.',
      hasAudience ? 'Audience definition is a strength. Keep the ICP explicit in onboarding and screenshots.' : 'The audience is still too broad. Name exactly who this is for in one sentence.',
      hasDistributionHook ? 'There is a plausible growth loop here. Make it a core product mechanic, not just a marketing add-on.' : 'You still need a stronger distribution or retention loop to avoid becoming a nice-to-have utility.',
      painPointMentions >= 5
        ? `${painPointMentions} user discussions mention pain points. Reach out to these users for early beta feedback.`
        : 'Not enough organic discussions found. Consider running Reddit/X outreach to validate demand before building.',
      competitors.length > 0 && avgRating < 4.2
        ? `Competitor average rating is ${avgRating.toFixed(1)}/5.0. Read their 1-3 star reviews to find specific gaps you can fill.`
        : competitors.length > 0
          ? `Competitors have strong ratings (${avgRating.toFixed(1)}/5.0). Differentiation will need to be sharp and specific.`
          : 'No strong competitors found. Validate that users actually want this before assuming it\'s an opportunity.',
    ],
  };
}

async function buildIdeaValidatorResearch(payload = {}) {
  const idea = compactText(payload.idea || '');
  if (!idea || idea.length < 120) {
    const error = new Error('Idea must be at least 120 characters.');
    error.status = 400;
    throw error;
  }

  // Validate that the idea is actually about an app
  const validation = validateIdeaIsApp(idea);
  if (!validation.isValid) {
    const error = new Error(validation.reason);
    error.status = 400;
    throw error;
  }

  const categoryLabel = inferIdeaCategoryLabel(idea);
  const competitors = await fetchIdeaValidatorComparableApps(idea, categoryLabel);

  // Fetch more posts for better insights (increased from 6 to 12)
  const [redditPosts, redditComments, xResult] = await Promise.all([
    fetchRelevantRedditResults(idea, categoryLabel, 'link', 12).catch(() => []),
    fetchRelevantRedditResults(idea, categoryLabel, 'comment', 12).catch(() => []),
    fetchXTweets(buildIdeaSearchTermsServer(idea, categoryLabel).join(' OR ') || idea, 10).catch((error) => ({ available: false, posts: [], message: error.message || 'X search failed.' })),
  ]);

  const summary = buildIdeaSummary(idea, categoryLabel, competitors, redditPosts, redditComments, xResult.posts || []);
  return {
    idea,
    category: categoryLabel,
    summary,
    scores: summary.scores,
    researchNotes: summary.researchNotes,
    recommendations: summary.recommendations,
    differentiation: summary.differentiation,
    competitors,
    signals: {
      redditPosts,
      redditComments,
      xPosts: xResult.posts || [],
      xAvailable: !!xResult.available,
      xMessage: xResult.message || '',
    },
  };
}

function stripHtml(value) {
  return compactText(String(value || '').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '));
}

function parseMetaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, 'i');
  return safeDecode((html.match(pattern)?.[1] || '').replace(/&amp;/g, '&'));
}

function parseTitle(html) {
  return stripHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
}

function parseJsonScriptBlocks(html) {
  const blocks = [];
  const pattern = /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of String(html || '').matchAll(pattern)) {
    const raw = String(match[1] || '').trim();
    if (!raw) continue;
    try {
      blocks.push(JSON.parse(raw));
    } catch {}
  }
  return blocks;
}

function deepCollectObjects(value, bucket = []) {
  if (!value || typeof value !== 'object') return bucket;
  if (Array.isArray(value)) {
    value.forEach((item) => deepCollectObjects(item, bucket));
    return bucket;
  }
  bucket.push(value);
  Object.values(value).forEach((item) => deepCollectObjects(item, bucket));
  return bucket;
}

function coerceUrl(value) {
  if (typeof value !== 'string') return '';
  const normalized = value.replace(/\\u002F/g, '/').trim();
  return /^https?:\/\//i.test(normalized) ? normalized : '';
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === 'string' && compactText(value)) return compactText(value);
  }
  return '';
}

function firstUrl(...values) {
  for (const value of values) {
    const normalized = coerceUrl(value);
    if (normalized) return normalized;
  }
  return '';
}

function extractMetaAdsFromHtml(html, advertiser = '') {
  const normalizedAdvertiser = compactText(advertiser).toLowerCase();
  const objects = deepCollectObjects(parseJsonScriptBlocks(html));
  const ads = [];
  const seen = new Set();

  objects.forEach((node) => {
    const archiveId = String(node.ad_archive_id || node.adArchiveId || node.archive_id || node.id || '').trim();
    const pageName = firstString(node.page_name, node.pageName, node.snapshot?.page_name, node.snapshot?.pageName, node.advertiser_name);
    if (!archiveId || !pageName) return;
    if (normalizedAdvertiser && !pageName.toLowerCase().includes(normalizedAdvertiser)) return;
    const mediaUrl = firstUrl(
      node.video_hd_url,
      node.video_url,
      node.image_url,
      node.original_image_url,
      node.snapshot?.images?.[0]?.resized_image_url,
      node.snapshot?.images?.[0]?.original_image_url,
      node.snapshot?.videos?.[0]?.video_hd_url,
      node.snapshot?.videos?.[0]?.video_sd_url
    );
    const copy = firstString(node.body?.text, node.snapshot?.body?.text, node.ad_creative_body, node.caption);
    const headline = firstString(node.title, node.snapshot?.title, node.link_caption, node.snapshot?.link_caption);
    const cta = firstString(node.cta_text, node.snapshot?.cta_text, node.call_to_action_text);
    const destinationUrl = firstUrl(node.link_url, node.snapshot?.link_url, node.landing_page_url, node.snapshot?.link_description);
    const pageImage = firstUrl(node.page_profile_picture_url, node.snapshot?.page_profile_picture_url);
    const startDate = firstString(node.start_date, node.startDate, node.ad_delivery_start_time, node.snapshot?.start_date);
    if (seen.has(archiveId)) return;
    seen.add(archiveId);
    ads.push({
      id: archiveId,
      platform: 'meta',
      advertiser: pageName,
      body: copy,
      headline,
      cta,
      mediaUrl,
      thumbnailUrl: mediaUrl || pageImage,
      destinationUrl,
      detailUrl: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&id=${encodeURIComponent(archiveId)}`,
      pageImage,
      startedAt: startDate,
    });
  });

  return ads.filter((item) => item.mediaUrl || item.body || item.headline).slice(0, 24);
}

function extractTikTokAdsFromHtml(html, advertiser = '') {
  const normalizedAdvertiser = compactText(advertiser).toLowerCase();
  const objects = deepCollectObjects(parseJsonScriptBlocks(html));
  const ads = [];
  const seen = new Set();

  objects.forEach((node) => {
    const adId = String(node.ad_id || node.adId || node.id || '').trim();
    const advertiserName = firstString(node.advertiser_name, node.advertiserName, node.adv_name, node.brand_name, node.advertiser?.name);
    if (!adId || !advertiserName) return;
    if (normalizedAdvertiser && !advertiserName.toLowerCase().includes(normalizedAdvertiser)) return;
    const mediaUrl = firstUrl(
      node.video_url,
      node.videoUrl,
      node.cover_url,
      node.image_url,
      node.imageUrl,
      node.poster_url,
      node.creative?.video_url
    );
    const body = firstString(node.ad_text, node.description, node.caption, node.ad_desc, node.creative?.title, node.creative?.description);
    const cta = firstString(node.cta, node.cta_text, node.call_to_action);
    const landingPageUrl = firstUrl(node.landing_page_url, node.destination_url, node.click_url);
    const startedAt = firstString(node.first_shown_date, node.firstShownDate, node.create_time);
    const lastShownAt = firstString(node.last_shown_date, node.lastShownDate, node.end_time);
    if (seen.has(adId)) return;
    seen.add(adId);
    ads.push({
      id: adId,
      platform: 'tiktok',
      advertiser: advertiserName,
      body,
      headline: firstString(node.title, node.creative?.title),
      cta,
      mediaUrl,
      thumbnailUrl: mediaUrl,
      destinationUrl: landingPageUrl,
      detailUrl: `https://library.tiktok.com/ads/detail/?ad_id=${encodeURIComponent(adId)}`,
      startedAt,
      lastShownAt,
    });
  });

  return ads.filter((item) => item.mediaUrl || item.body || item.headline).slice(0, 24);
}

async function fetchMetaAdsByAdvertiser(advertiser = '') {
  const searchUrl = buildMetaAdsSearchUrl(advertiser);
  const html = await fetchText(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  return {
    sourceUrl: searchUrl,
    ads: extractMetaAdsFromHtml(html, advertiser),
  };
}

async function fetchTikTokAdsByAdvertiser(advertiser = '') {
  const searchUrl = `https://library.tiktok.com/ads?region=all&adv_name=${encodeURIComponent(compactText(advertiser))}&query_type=1&sort_type=last_shown_date%2Cdesc`;
  const html = await fetchText(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept-Language': 'en-GB,en;q=0.9',
    },
  });
  return {
    sourceUrl: searchUrl,
    ads: extractTikTokAdsFromHtml(html, advertiser),
  };
}

function appleAcceptLanguage(country) {
  const normalized = String(country || 'us').trim().toLowerCase();
  const tags = {
    us: 'en-US,en;q=0.9',
    gb: 'en-GB,en;q=0.9',
    fr: 'fr-FR,fr;q=0.9,en;q=0.7',
    de: 'de-DE,de;q=0.9,en;q=0.7',
    es: 'es-ES,es;q=0.9,en;q=0.7',
    it: 'it-IT,it;q=0.9,en;q=0.7',
    jp: 'ja-JP,ja;q=0.9,en;q=0.7',
    kr: 'ko-KR,ko;q=0.9,en;q=0.7',
    cn: 'zh-CN,zh;q=0.9,en;q=0.7',
  };
  return tags[normalized] || 'en-US,en;q=0.9';
}

function parseApplePageScreenshots(html) {
  const groups = { iphone: [], ipad: [], mac: [] };
  const pattern = /https:\/\/is\d+-ssl\.mzstatic\.com\/image\/thumb\/[^"'\\\s)]+?\.(?:png|jpe?g)/gi;
  const matches = [...String(html || '').matchAll(pattern)];
  const seen = new Set();

  matches.forEach((match) => {
    const url = match[0].replace(/\\u002F/g, '/');
    if (seen.has(url)) return;
    const start = Math.max(0, (match.index || 0) - 240);
    const end = Math.min(html.length, (match.index || 0) + url.length + 240);
    const context = String(html.slice(start, end)).toLowerCase();
    const screenshotHint = /screenshot|software-screenshot|app-screenshot|we-screenshot-viewer|platform-iphone|platform-ipad|platform-mac|iphone|ipad|macos|desktop/.test(context);
    const artworkHint = /artwork|appicon|app-icon|icon|avatar|editorial-artwork|subscription|offer/.test(context);
    if (!screenshotHint || artworkHint) return;
    seen.add(url);
    if (/macos|platform.?mac|desktop/.test(context)) {
      groups.mac.push(url);
      return;
    }
    if (/ipad|tablet/.test(context)) {
      groups.ipad.push(url);
      return;
    }
    groups.iphone.push(url);
  });

  return {
    screenshots: groups.iphone,
    ipadScreenshots: groups.ipad,
    macScreenshots: groups.mac,
  };
}

function parseHumanSizeToBytes(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const match = raw
    .replace(/\u00a0/g, ' ')
    .match(/(\d+(?:[.,]\d+)?)\s*(kb|mb|gb|tb|ko|mo|go|to)\b/i);
  if (!match) return null;
  const amount = Number(match[1].replace(',', '.'));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  const unit = match[2].toLowerCase();
  const powers = {
    kb: 1,
    ko: 1,
    mb: 2,
    mo: 2,
    gb: 3,
    go: 3,
    tb: 4,
    to: 4,
  };
  const power = powers[unit];
  if (power == null) return null;
  return Math.round(amount * (1024 ** power));
}

function parseApplePageSize(html) {
  const source = String(html || '');
  if (!source) return null;

  const bytePatterns = [
    /"fileSizeBytes"\s*:\s*"(\d+)"/i,
    /"fileSizeBytes"\s*:\s*(\d+)/i,
    /"sizeInBytes"\s*:\s*"(\d+)"/i,
    /"sizeInBytes"\s*:\s*(\d+)/i,
  ];
  for (const pattern of bytePatterns) {
    const match = source.match(pattern);
    if (!match) continue;
    const bytes = Number(match[1]);
    if (Number.isFinite(bytes) && bytes > 0) return bytes;
  }

  const directLabelPatterns = [
    /"size"\s*:\s*"([^"]{1,24})"/i,
    /"fileSize"\s*:\s*"([^"]{1,24})"/i,
    /"formattedSize"\s*:\s*"([^"]{1,24})"/i,
    /"sizeDescription"\s*:\s*"([^"]{1,24})"/i,
  ];
  for (const pattern of directLabelPatterns) {
    const match = source.match(pattern);
    const bytes = parseHumanSizeToBytes(match?.[1]);
    if (bytes) return bytes;
  }

  const textLabelPatterns = [
    /(?:Size|Taille|Größe|Tamaño|Dimensione|サイズ|용량|大小)\s*<\/dt>\s*<dd[^>]*>([^<]{1,32})</i,
    /(?:Size|Taille|Größe|Tamaño|Dimensione|サイズ|용량|大小)[^<]{0,40}<[^>]+>([^<]{1,32})</i,
    /(?:Size|Taille|Größe|Tamaño|Dimensione|サイズ|용량|大小)[^<]{0,80}(\d+(?:[.,]\d+)?\s*(?:KB|MB|GB|TB|Ko|Mo|Go|To))/i,
    /aria-label\s*=\s*["'][^"']*(?:Size|Taille|Größe|Tamaño|Dimensione|サイズ|용량|大小)[^"']*["'][^>]*>\s*([^<]{1,32})</i,
  ];
  for (const pattern of textLabelPatterns) {
    const match = source.match(pattern);
    const bytes = parseHumanSizeToBytes(match?.[1]);
    if (bytes) return bytes;
  }

  const genericHumanSize = source.match(/(\d+(?:[.,]\d+)?)\s*(KB|MB|GB|TB|Ko|Mo|Go|To)\b/);
  const genericBytes = parseHumanSizeToBytes(genericHumanSize?.[0]);
  if (genericBytes) return genericBytes;

  return null;
}

function decodeHtmlEntities(value) {
  return String(value || '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function cleanAbsoluteUrl(raw, baseUrl = '') {
  const text = decodeHtmlEntities(String(raw || '').trim());
  if (!text || /^(javascript:|mailto:|tel:|#)/i.test(text)) return '';
  try {
    return new URL(text, baseUrl || undefined).toString();
  } catch {
    return '';
  }
}

function normalizeSocialUrl(raw) {
  const absolute = cleanAbsoluteUrl(raw);
  if (!absolute) return '';
  let parsed;
  try {
    parsed = new URL(absolute);
  } catch {
    return '';
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  const first = pathname.split('/').filter(Boolean)[0] || '';

  if (host === 'twitter.com' || host === 'x.com') {
    if (!first || ['home', 'share', 'intent', 'search', 'i', 'hashtag', 'compose', 'messages', 'explore'].includes(first.toLowerCase())) return '';
    return `https://x.com${pathname}`;
  }

  if (host === 'linkedin.com' || host === 'fr.linkedin.com') {
    const lower = pathname.toLowerCase();
    if (!/^\/(company|in|school|showcase)\//.test(lower)) return '';
    return `https://www.linkedin.com${pathname}`;
  }

  if (host === 'instagram.com') {
    if (!first || ['accounts', 'explore', 'reels', 'stories', 'p', 'tv', 'reel', 'about', 'developer'].includes(first.toLowerCase())) return '';
    return `https://www.instagram.com/${first}/`;
  }

  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
    if (!first || ['discover', 'tag', 'music', 'explore', 'about', 'business', 'legal'].includes(first.toLowerCase())) return '';
    return `https://www.tiktok.com/${pathname}`;
  }

  return '';
}

function socialKeyFromUrl(raw) {
  const normalized = normalizeSocialUrl(raw);
  if (!normalized) return '';
  if (/x\.com\//i.test(normalized)) return 'twitter';
  if (/linkedin\.com\//i.test(normalized)) return 'linkedin';
  if (/instagram\.com\//i.test(normalized)) return 'instagram';
  if (/tiktok\.com\//i.test(normalized)) return 'tiktok';
  return '';
}

function extractSocialLinksFromHtml(html, baseUrl = '') {
  const source = String(html || '');
  const links = { twitter: '', linkedin: '', instagram: '', tiktok: '' };
  if (!source) return links;

  const pushLink = (candidate) => {
    const key = socialKeyFromUrl(candidate);
    if (!key || links[key]) return;
    links[key] = normalizeSocialUrl(candidate);
  };

  const hrefPattern = /href\s*=\s*["']([^"'<>]+)["']/gi;
  for (const match of source.matchAll(hrefPattern)) pushLink(cleanAbsoluteUrl(match[1], baseUrl));

  const urlPattern = /https?:\/\/[^"' <>()]+/gi;
  for (const match of source.matchAll(urlPattern)) pushLink(match[0]);

  const sameAsPattern = /"sameAs"\s*:\s*\[(.*?)\]/gis;
  for (const sameAsMatch of source.matchAll(sameAsPattern)) {
    const block = sameAsMatch[1] || '';
    for (const urlMatch of block.matchAll(/https?:\/\/[^"' ,\]\s]+/gi)) pushLink(urlMatch[0]);
  }

  const escapedUrlPattern = /https?:\\\/\\\/[^"' <>()]+/gi;
  for (const match of source.matchAll(escapedUrlPattern)) pushLink(match[0].replace(/\\\//g, '/'));

  return links;
}

async function fetchSocialLinksForApp({ sellerUrl, url }) {
  const merged = { twitter: '', linkedin: '', instagram: '', tiktok: '' };
  const merge = (next) => {
    ['twitter', 'linkedin', 'instagram', 'tiktok'].forEach((key) => {
      if (!merged[key] && next?.[key]) merged[key] = next[key];
    });
  };

  const targets = [sellerUrl, url].filter(Boolean);
  for (const target of targets) {
    try {
      const html = await fetchText(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      merge(extractSocialLinksFromHtml(html, target));
      if (merged.twitter && merged.linkedin && merged.instagram && merged.tiktok) break;

      let parsed;
      try {
        parsed = new URL(target);
      } catch {
        parsed = null;
      }
      if (parsed) {
        const extraPaths = ['/about', '/contact', '/contacts', '/social', '/links'];
        for (const extraPath of extraPaths) {
          if (merged.twitter && merged.linkedin && merged.instagram && merged.tiktok) break;
          try {
            const nextUrl = new URL(extraPath, parsed.origin).toString();
            const extraHtml = await fetchText(nextUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept-Language': 'en-US,en;q=0.9',
              },
            });
            merge(extractSocialLinksFromHtml(extraHtml, nextUrl));
          } catch {
            // ignore missing extra pages
          }
        }
      }
    } catch {
      // ignore social scraping failures per target
    }
  }

  return merged;
}

async function fetchAppleLocalizedPageMedia(trackId, country = 'us') {
  const url = `https://apps.apple.com/${toAppleCountry(country)}/app/id${trackId}`;
  const html = await fetchText(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept-Language': appleAcceptLanguage(country),
    },
  });
  return {
    ...parseApplePageScreenshots(html),
    size: parseApplePageSize(html),
  };
}

function summarizeMetadata(metadata = {}) {
  const source = compactText(metadata.subtitle || metadata.description || metadata.readme || '');
  if (!source) return '';
  const firstSentence = source.match(/(.{40,220}?[.!?])(\s|$)/)?.[1];
  return compactText(firstSentence || source.slice(0, 220));
}

async function fetchAppleMetadata(appRef) {
  const store = appStoreInfoFromInput(appRef);
  const lookupUrl = `https://itunes.apple.com/lookup?id=${store.appId}&entity=software`;
  const data = await fetchJson(lookupUrl);
  const result = Array.isArray(data.results)
    ? data.results.find((item) => /software/i.test(String(item.kind || item.wrapperType || ''))) || null
    : null;
  if (!result) {
    const html = await fetchText(store.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const title = parseMetaContent(html, 'og:title') || parseTitle(html).replace(/\s+on the App Store$/i, '');
    const description = parseMetaContent(html, 'og:description') || parseMetaContent(html, 'description');
    return {
      provider: 'app-store-connect',
      appId: store.appId,
      url: store.url,
      appName: title || store.appName,
      subtitle: 'App Store listing',
      description,
      genres: [],
      artwork: parseMetaContent(html, 'og:image'),
    };
  }
  return {
    provider: 'app-store-connect',
    appId: store.appId,
    url: result?.trackViewUrl || store.url,
    appName: result?.trackName || store.appName,
    subtitle: result?.primaryGenreName || (result?.genres || []).find(Boolean) || '',
    description: result?.description || '',
    genres: result?.genres || [],
    artwork: result?.artworkUrl512 || result?.artworkUrl100 || '',
    screenshots: result?.screenshotUrls || [],
    ipadScreenshots: result?.ipadScreenshotUrls || [],
    seller: result?.sellerName || '',
    trackId: result?.trackId || store.appId,
  };
}

async function fetchPlayMetadata(appRef) {
  const play = playInfoFromInput(appRef);
  const html = await fetchText(play.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  const title = parseMetaContent(html, 'og:title') || parseTitle(html).replace(/\s*-\s*Apps on Google Play$/i, '');
  const description = parseMetaContent(html, 'og:description') || parseMetaContent(html, 'description');
  return {
    provider: 'google-play',
    packageName: play.packageName,
    url: play.url,
    appName: title || play.appName,
    subtitle: 'Google Play listing',
    description,
    artwork: parseMetaContent(html, 'og:image'),
  };
}

function toAppleCountry(value) {
  return String(value || 'us').trim().toLowerCase();
}

function normalizeCategoryText(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function normalizeAppleCategoryId(value) {
  const text = normalizeCategoryText(value);
  if (!text) return 'productivity';
  const rules = [
    ['books', /(books?|reading|reader|stories|comics)/],
    ['business', /(business|crm|sales|work|jobs?|office|point of sale)/],
    ['developer-tools', /(developer|coding|code|debug|terminal|api|dev tools)/],
    ['education', /(education|learn|learning|school|study|language|course)/],
    ['entertainment', /(entertainment|stream|video|tv|fan|ticket)/],
    ['finance', /(finance|bank|banking|budget|money|investment|tax|insurance)/],
    ['food-drink', /(food|drink|recipe|restaurant|cooking)/],
    ['games', /(games?|gaming|arcade|puzzle|rpg|simulator|strategy|tycoon)/],
    ['graphics-design', /(design|drawing|art|graphics|creative)/],
    ['health-fitness', /(health|fitness|sleep|meditation|stress|workout|wellness|pregnancy|sante|forme|bien[- ]?etre|entrainement|grossesse|remise en forme)/],
    ['lifestyle', /(lifestyle|parenting|home|fashion|hobby)/],
    ['kids', /(kids|children|child)/],
    ['magazines-newspapers', /(magazine|newspaper)/],
    ['medical', /(medical|doctor|clinic|patient|medicine)/],
    ['music', /(music|audio|song|songs|recording|instrument)/],
    ['navigation', /(navigation|maps?|driving|route|transit)/],
    ['news', /(news|current events|headlines)/],
    ['photo-video', /(photo|camera|video|editing|filter)/],
    ['productivity', /(productivity|task|todo|planner|calendar|notes|focus|organize)/],
    ['reference', /(reference|dictionary|encyclopedia|atlas|religion)/],
    ['safari-extensions', /(safari)/],
    ['shopping', /(shopping|marketplace|commerce|coupon)/],
    ['social-networking', /(social|community|chat|messaging|networking)/],
    ['sports', /(sports?|coach|scores?)/],
    ['travel', /(travel|trip|booking|flight|hotel)/],
    ['utilities', /(utilities|calculator|scanner|tool)/],
    ['weather', /(weather|forecast|radar)/],
  ];
  const match = rules.find(([, pattern]) => pattern.test(text));
  return match ? match[0] : 'productivity';
}

function normalizeAppleCategory(result) {
  const primary = result.primaryGenreName;
  if (typeof primary === 'string' && primary.trim()) {
    return normalizeAppleCategoryId(primary);
  }
  const genre = result.genres?.[0];
  if (typeof genre === 'string' && genre.trim()) {
    return normalizeAppleCategoryId(genre);
  }
  if (genre && typeof genre === 'object' && typeof genre.name === 'string') {
    return normalizeAppleCategoryId(genre.name);
  }
  return 'productivity';
}

function normalizeAppleAppResult(result, fallbackCountry = 'us') {
  const trackId = String(result.id || result.trackId || result.appId || '');
  return {
    storeId: trackId,
    id: `apple-${trackId}`,
    name: result.name || result.trackName || result.appName || 'Untitled app',
    developer: result.artistName || result.sellerName || result.seller || '',
    category: normalizeAppleCategory(result),
    categoryId: result.primaryGenreId ? String(result.primaryGenreId) : '',
    url: result.url || result.trackViewUrl || result.artistViewUrl || '',
    icon: result.artworkUrl100 || result.artworkUrl512 || result.artwork || '',
    screenshots: result.screenshotUrls || result.screenshots || [],
    ipadScreenshots: result.ipadScreenshotUrls || result.ipadScreenshots || [],
    macScreenshots: result.desktopScreenshotUrls || result.macScreenshots || [],
    description: result.description || '',
    subtitle: result.subtitle || result.primaryGenreName || '',
    rating: Number(result.averageUserRating || result.averageUserRatingForCurrentVersion || 0) || null,
    ratingCount: Number(result.userRatingCount || result.userRatingCountForCurrentVersion || 0) || 0,
    price: result.formattedPrice || result.price || 'Free',
    currency: result.currency || '',
    size: result.fileSizeBytes || result.fileSize || result.size || null,
    releasedAt: result.releaseDate || result.currentVersionReleaseDate || null,
    updatedAt: result.currentVersionReleaseDate || result.releaseDate || null,
    version: result.version || '',
    sellerUrl: result.sellerUrl || '',
    artistId: result.artistId || null,
    country: String(result.country || fallbackCountry || 'us').toUpperCase(),
    genres: result.genres || [],
  };
}

function keywordPopularityScore(suggestion, index, seedTerm = '') {
  const value = compactText(suggestion).toLowerCase();
  const seed = compactText(seedTerm).toLowerCase();

  let score = 22;
  if (index === 0) score = 100;
  else if (index <= 2) score = 88;
  else if (index <= 5) score = 74;
  else if (index <= 9) score = 58;
  else if (index <= 14) score = 44;
  else score = 32;

  if (seed && value === seed) score += 8;
  else if (seed && value.startsWith(seed)) score += 4;

  return Math.max(5, Math.min(100, score));
}

function buildSuggestionRows(hints = [], term = '') {
  return hints
    .map((hint) => hint?.term || '')
    .filter(Boolean)
    .map((suggestion, index) => ({
      keyword: suggestion,
      volumeScore: keywordPopularityScore(suggestion, index, term),
      source: 'apple-search-hints',
      rank: index + 1,
    }));
}

function buildKeywordPopularityMap(suggestions = []) {
  const scores = new Map();
  suggestions.forEach((item) => {
    scores.set(String(item.keyword || '').toLowerCase(), Number(item.volumeScore || 0));
  });
  return scores;
}

function deriveKeywordDifficulty(results = []) {
  if (!Array.isArray(results) || !results.length) return 0;
  const sample = results.slice(0, 10);
  const avgDownloads = sample.reduce((sum, item) => sum + Number(item.downloads || 0), 0) / sample.length;
  const avgRevenue = sample.reduce((sum, item) => sum + Number(item.revenue || 0), 0) / sample.length;
  const avgReviews = sample.reduce((sum, item) => sum + Number(item.reviews || item.ratingCount || 0), 0) / sample.length;
  const avgRating = sample.reduce((sum, item) => sum + Number(item.rating || 0), 0) / sample.length;
  const top3Downloads = sample.slice(0, 3).reduce((sum, item) => sum + Number(item.downloads || 0), 0);
  const top10Downloads = sample.reduce((sum, item) => sum + Number(item.downloads || 0), 0);
  const concentration = top10Downloads > 0 ? top3Downloads / top10Downloads : 0;

  let score = 8;
  if (avgDownloads > 200000) score += 28;
  else if (avgDownloads > 100000) score += 22;
  else if (avgDownloads > 50000) score += 16;
  else if (avgDownloads > 15000) score += 10;
  else score += 4;

  if (avgRevenue > 120000) score += 24;
  else if (avgRevenue > 60000) score += 18;
  else if (avgRevenue > 20000) score += 12;
  else if (avgRevenue > 5000) score += 7;
  else score += 2;

  if (avgReviews > 25000) score += 18;
  else if (avgReviews > 10000) score += 14;
  else if (avgReviews > 3000) score += 10;
  else if (avgReviews > 800) score += 6;
  else score += 2;

  if (avgRating >= 4.7) score += 10;
  else if (avgRating >= 4.4) score += 7;
  else if (avgRating >= 4.1) score += 4;

  if (concentration >= 0.7) score += 12;
  else if (concentration >= 0.55) score += 8;
  else if (concentration >= 0.4) score += 4;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function escapeRegex(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function deriveKeywordSuggestionsFromApps(term, results = []) {
  const normalizedTerm = compactText(term).toLowerCase();
  if (!normalizedTerm) return [];

  const escapedTerm = escapeRegex(normalizedTerm);
  const patterns = [
    new RegExp(`\\b${escapedTerm}\\b`, 'gi'),
    new RegExp(`\\b${escapedTerm}\\s+[a-z0-9]+(?:\\s+[a-z0-9]+)?`, 'gi'),
    new RegExp(`\\b[a-z0-9]+\\s+${escapedTerm}(?:\\s+[a-z0-9]+)?`, 'gi'),
  ];
  const phrases = new Map([[normalizedTerm, 100]]);

  results.forEach((item) => {
    const fields = [
      item.trackName,
      item.primaryGenreName,
      item.genres?.join(' '),
      item.description,
    ].filter(Boolean);

    fields.forEach((field) => {
      const text = compactText(field).toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
      patterns.forEach((pattern) => {
        const matches = text.match(pattern) || [];
        matches.forEach((match) => {
          const phrase = compactText(match).replace(/\s+/g, ' ');
          if (!phrase || !phrase.includes(normalizedTerm) || phrase.length > 36) return;
          phrases.set(phrase, Math.max(phrases.get(phrase) || 0, 88 - (phrases.size * 6)));
        });
      });
    });
  });

  return Array.from(phrases.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([keyword, score], index) => ({
      keyword,
      volumeScore: Math.max(24, Math.min(100, Math.round(score))),
      source: 'apple-search-results-fallback',
      rank: index + 1,
    }));
}

function keywordDateKey(date = new Date()) {
  return new Date(date).toISOString().slice(0, 10);
}

function normalizeTrackedKeywordRow(row = {}, country = 'US') {
  return {
    id: row.id || `kw-${cacheSlug(row.keyword || '')}`,
    keyword: compactText(row.keyword || ''),
    position: row.position === 'Not ranked' ? 'Not ranked' : (Number.isFinite(Number(row.position)) ? Number(row.position) : 'Not ranked'),
    popularity: Number(row.popularity || row.volumeScore || 0) || 0,
    difficulty: Number(row.difficulty || 0) || 0,
    apps: Number(row.apps || 0) || 0,
    country: row.country || country,
  };
}

async function appStoreSpyEnrichKeywordBatch({ keyword, country, results }) {
  if (!process.env.APPSTORESPY_API_KEY) {
    return {
      results,
      source: 'modeled-from-live-app-store-signals',
    };
  }

  // Placeholder adapter boundary for future paid enrichment.
  return {
    results,
    source: 'appstorespy-not-yet-implemented',
  };
}

async function buildKeywordSnapshotForTrackedApp(app, keywordRow, options = {}) {
  const keyword = compactText(keywordRow.keyword || '');
  const country = String(app.country || options.country || 'US').toLowerCase();
  const appId = String(app.id || app.storeId || app.name || 'tracked-app');
  const storeId = String(app.storeId || '');
  const today = keywordDateKey();
  const history = await readKeywordHistory(appId, country, keyword);
  const existingToday = history.find((item) => item.date === today);

  if (existingToday) {
    return {
      snapshot: existingToday,
      history,
      cachedToday: true,
    };
  }

  const search = await getAppleKeywordSearch(keyword, country, Math.max(50, Number(options.limit) || 50));
  const enriched = await appStoreSpyEnrichKeywordBatch({
    keyword,
    country,
    results: search.results || [],
  });
  const matched = (enriched.results || []).find((item) => String(item.storeId || item.id) === storeId);
  const todaySnapshot = {
    version: KEYWORD_CACHE_VERSION,
    date: today,
    appId,
    storeId,
    keyword,
    country: String(country).toUpperCase(),
    position: matched?.position || 'Not ranked',
    popularity: matched?.keywordPopularity || Number(keywordRow.popularity || 0) || null,
    difficulty: Number(keywordRow.difficulty || 0) || null,
    apps: Number(keywordRow.apps || 0) || (search.results || []).length,
    source: matched?.popularitySource || keywordSuggestionSource(search.suggestions || []),
    fetchedAt: new Date().toISOString(),
    revenueSource: enriched.source,
  };

  await writeKeywordHistorySnapshot(appId, country, keyword, todaySnapshot);
  return {
    snapshot: todaySnapshot,
    history: [...history, todaySnapshot].sort((a, b) => String(a.date).localeCompare(String(b.date))),
    cachedToday: false,
  };
}

async function warmTrackedKeywords(trackedApps = [], options = {}) {
  const warmedApps = [];

  for (const app of trackedApps) {
    const rawKeywords = Array.isArray(app.keywords) ? app.keywords : [];
    const country = String(app.country || options.country || 'US').toUpperCase();
    const normalizedKeywords = rawKeywords
      .map((row) => normalizeTrackedKeywordRow(row, country))
      .filter((row) => row.keyword);

    const warmedKeywords = [];
    const keywordHistory = {};
    let refreshedCount = 0;

    for (const keywordRow of normalizedKeywords) {
      const { snapshot, history, cachedToday } = await buildKeywordSnapshotForTrackedApp(app, keywordRow, options);
      if (!cachedToday) refreshedCount += 1;
      keywordHistory[keywordRow.keyword] = history;
      warmedKeywords.push({
        ...keywordRow,
        position: snapshot.position,
        popularity: snapshot.popularity ?? keywordRow.popularity,
        apps: snapshot.apps || keywordRow.apps,
        lastCheckedAt: snapshot.fetchedAt,
        historyDays: history.length,
      });
    }

    warmedApps.push({
      ...app,
      keywords: warmedKeywords,
      keywordCount: warmedKeywords.length,
      keywordHistory,
      keywordRefreshMeta: {
        lastCheckedAt: new Date().toISOString(),
        refreshPolicy: 'daily',
        refreshedCount,
        cachedCount: Math.max(0, warmedKeywords.length - refreshedCount),
      },
    });
  }

  return warmedApps;
}

async function fetchAppleKeywordSuggestionsFresh(term, country = 'us') {
  const normalizedTerm = compactText(term);
  const normalizedCountry = toAppleCountry(country);
  const suggestUrl = `https://search.itunes.apple.com/WebObjects/MZSearchHints.woa/wa/hints?clientApplication=Software&term=${encodeURIComponent(normalizedTerm)}&country=${normalizedCountry}`;
  const raw = await fetchText(suggestUrl, {
    headers: { 'User-Agent': 'Signal-Local' },
  });

  const hintsBlock = raw.match(/<key>hints<\/key>\s*<array>([\s\S]*?)<\/array>/i)?.[1] || '';
  const matches = [...hintsBlock.matchAll(/<string>([^<]+)<\/string>/g)];
  const hints = matches
    .map((match) => ({
      term: String(match[1] || '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>'),
    }))
    .filter((item) => item.term);

  const directSuggestions = buildSuggestionRows(hints, normalizedTerm);
  if (directSuggestions.length) return directSuggestions;

  const searchUrl = new URL('https://itunes.apple.com/search');
  searchUrl.searchParams.set('term', normalizedTerm);
  searchUrl.searchParams.set('country', normalizedCountry);
  searchUrl.searchParams.set('entity', 'software');
  searchUrl.searchParams.set('media', 'software');
  searchUrl.searchParams.set('limit', '25');

  const searchData = await fetchJson(searchUrl.toString(), {
    headers: { 'User-Agent': 'Signal-Local' },
  });

  return deriveKeywordSuggestionsFromApps(normalizedTerm, searchData.results || []);
}

async function getAppleKeywordSuggestions(term, country = 'us') {
  const normalizedTerm = compactText(term);
  const normalizedCountry = String(country || 'us').toLowerCase();
  const cacheKey = `${normalizedCountry}__${normalizedTerm}`;
  const cached = await readCacheEntry('suggestions', cacheKey);

  if (isCacheFresh(cached)) {
    const source = keywordSuggestionSource(cached.suggestions || []);
    return {
      term: normalizedTerm,
      suggestions: cached.suggestions || [],
      meta: keywordResponseMeta({
        term: normalizedTerm,
        country: normalizedCountry,
        fetchedAt: cached.fetchedAt,
        cached: true,
        source,
      }),
    };
  }

  const suggestions = await fetchAppleKeywordSuggestionsFresh(normalizedTerm, normalizedCountry);
  const fetchedAt = new Date().toISOString();
  await writeCacheEntry('suggestions', cacheKey, {
    version: KEYWORD_CACHE_VERSION,
    term: normalizedTerm,
    country: normalizedCountry,
    suggestions,
    fetchedAt,
  });

  return {
    term: normalizedTerm,
    suggestions,
    meta: keywordResponseMeta({
      term: normalizedTerm,
      country: normalizedCountry,
      fetchedAt,
      cached: false,
      source: keywordSuggestionSource(suggestions),
    }),
  };
}

async function fetchAppleKeywordSearchFresh(keyword, country = 'us') {
  const searchUrl = new URL('https://itunes.apple.com/search');
  searchUrl.searchParams.set('term', keyword);
  searchUrl.searchParams.set('country', toAppleCountry(country));
  searchUrl.searchParams.set('entity', 'software');
  searchUrl.searchParams.set('media', 'software');
  searchUrl.searchParams.set('limit', '200');

  const [searchData, suggestionPayload] = await Promise.all([
    fetchJson(searchUrl.toString(), {
      headers: { 'User-Agent': 'Signal-Local' },
    }),
    getAppleKeywordSuggestions(keyword, country).catch(() => ({
      suggestions: [],
      meta: null,
    })),
  ]);

  const popularityByKeyword = buildKeywordPopularityMap(suggestionPayload.suggestions || []);
  const results = (searchData.results || []).map((app, index) => {
    const normalized = normalizeAppleAppResult(app, country);
    return {
      ...normalized,
      position: index + 1,
      keywordPopularity: popularityByKeyword.get(String(keyword || '').toLowerCase()) || null,
      popularitySource: suggestionPayload.suggestions?.length ? keywordSuggestionSource(suggestionPayload.suggestions) : null,
    };
  });

  return {
    keyword,
    country,
    results,
    suggestions: suggestionPayload.suggestions || [],
    difficulty: deriveKeywordDifficulty(results),
    popularity: popularityByKeyword.get(String(keyword || '').toLowerCase()) || 0,
  };
}

async function getAppleKeywordSearch(keyword, country = 'us', limit = 50) {
  const normalizedKeyword = compactText(keyword);
  const normalizedCountry = String(country || 'us').toLowerCase();
  const cacheKey = `${normalizedCountry}__${normalizedKeyword}`;
  const cached = await readCacheEntry('search', cacheKey);

  if (isCacheFresh(cached)) {
    const suggestionSource = keywordSuggestionSource(cached.suggestions || []);
    return {
      keyword: normalizedKeyword,
      country: normalizedCountry,
      results: (cached.results || [])
        .map((item) => ({
          ...item,
          popularitySource: item.keywordPopularity ? suggestionSource : item.popularitySource || null,
        }))
        .slice(0, Math.min(limit, 200)),
      suggestions: cached.suggestions || [],
      meta: {
        ...keywordResponseMeta({
          keyword: normalizedKeyword,
          country: normalizedCountry,
          fetchedAt: cached.fetchedAt,
          cached: true,
        }),
        keywordPopularity: Number(cached.popularity || 0) || 0,
        keywordDifficulty: Number(cached.difficulty || 0) || 0,
        resultCount: Array.isArray(cached.results) ? cached.results.length : 0,
      },
    };
  }

  const fresh = await fetchAppleKeywordSearchFresh(normalizedKeyword, normalizedCountry);
  const fetchedAt = new Date().toISOString();
  await writeCacheEntry('search', cacheKey, {
    version: KEYWORD_CACHE_VERSION,
    keyword: normalizedKeyword,
    country: normalizedCountry,
    results: fresh.results,
    suggestions: fresh.suggestions,
    popularity: fresh.popularity,
    difficulty: fresh.difficulty,
    fetchedAt,
  });

  return {
    keyword: normalizedKeyword,
    country: normalizedCountry,
    results: fresh.results.slice(0, Math.min(limit, 200)),
    suggestions: fresh.suggestions,
    meta: {
      ...keywordResponseMeta({
        keyword: normalizedKeyword,
        country: normalizedCountry,
        fetchedAt,
        cached: false,
      }),
      keywordPopularity: Number(fresh.popularity || 0) || 0,
      keywordDifficulty: Number(fresh.difficulty || 0) || 0,
      resultCount: fresh.results.length,
    },
  };
}

async function fetchAppleSearch(query, country = 'us', limit = 24) {
  const url = new URL('https://itunes.apple.com/search');
  url.searchParams.set('term', query);
  url.searchParams.set('country', toAppleCountry(country));
  url.searchParams.set('entity', 'software');
  url.searchParams.set('media', 'software');
  url.searchParams.set('limit', String(Math.max(1, Math.min(200, limit))));
  const data = await fetchJson(url.toString(), {
    headers: { 'User-Agent': 'Signal-Local' },
  });
  return (data.results || []).map((item) => normalizeAppleAppResult(item, country));
}

async function fetchAppleLookup(trackId, country = 'us') {
  const url = new URL('https://itunes.apple.com/lookup');
  url.searchParams.set('id', String(trackId));
  url.searchParams.set('country', toAppleCountry(country));
  url.searchParams.set('entity', 'software');
  const data = await fetchJson(url.toString(), {
    headers: { 'User-Agent': 'Signal-Local' },
  });
  const match = (data.results || []).find((item) => String(item.trackId || item.id) === String(trackId)) || data.results?.[0];
  if (!match) return null;
  const normalized = normalizeAppleAppResult(match, country);
  try {
    const localizedMedia = await fetchAppleLocalizedPageMedia(trackId, country);
    const socialLinks = await fetchSocialLinksForApp({ sellerUrl: normalized.sellerUrl, url: normalized.url });
    return {
      ...normalized,
      socialLinks,
      // Keep official iTunes screenshots whenever Apple already returns them.
      // The storefront page scraper is only a fallback when lookup/search omits them.
      size: normalized.size || localizedMedia.size || null,
      screenshots: normalized.screenshots.length ? normalized.screenshots : localizedMedia.screenshots,
      ipadScreenshots: localizedMedia.ipadScreenshots.length ? localizedMedia.ipadScreenshots : normalized.ipadScreenshots,
      macScreenshots: localizedMedia.macScreenshots.length ? localizedMedia.macScreenshots : normalized.macScreenshots,
    };
  } catch {
    const socialLinks = await fetchSocialLinksForApp({ sellerUrl: normalized.sellerUrl, url: normalized.url }).catch(() => ({ twitter: '', linkedin: '', instagram: '', tiktok: '' }));
    return { ...normalized, socialLinks };
  }
}

async function fetchAppleChartFeed(chart = 'top-free', country = 'us', limit = 50) {
  const chartMap = {
    'top-free': 'top-free',
    'top-paid': 'top-paid',
    'top-grossing': 'top-grossing',
  };
  const feedUrl = `https://rss.applemarketingtools.com/api/v2/${toAppleCountry(country)}/apps/${chartMap[chart] || 'top-free'}/${Math.min(limit, 100)}/apps.json`;
  try {
    const data = await fetchJson(feedUrl, {
      headers: { 'User-Agent': 'Signal-Local' },
    });
    return (data.feed?.results || []).map((item) => normalizeAppleAppResult(item, country));
  } catch {
    const legacyMap = {
      'top-free': 'topfreeapplications',
      'top-paid': 'toppaidapplications',
      'top-grossing': 'topgrossingapplications',
    };
    const legacyUrl = `https://itunes.apple.com/${toAppleCountry(country)}/rss/${legacyMap[chart] || 'topfreeapplications'}/limit=${Math.min(limit, 100)}/json`;
    const data = await fetchJson(legacyUrl, {
      headers: { 'User-Agent': 'Signal-Local' },
    });
    const entries = Array.isArray(data.feed?.entry) ? data.feed.entry : [];
    const base = entries.map((entry) => normalizeAppleAppResult({
      id: entry.id?.attributes?.['im:id'] || entry.id?.label || '',
      name: entry['im:name']?.label || entry.title?.label || 'Untitled app',
      artistName: entry['im:artist']?.label || '',
      url: entry.id?.label || entry.link?.attributes?.href || '',
      artworkUrl100: Array.isArray(entry['im:image']) ? entry['im:image'][entry['im:image'].length - 1]?.label : '',
      genres: entry.category?.attributes?.term ? [entry.category.attributes.term] : (entry.category?.attributes?.label ? [entry.category.attributes.label] : []),
      primaryGenreName: entry.category?.attributes?.term || entry.category?.attributes?.label || '',
      primaryGenreId: entry.category?.attributes?.['im:id'] || '',
      releaseDate: entry['im:releaseDate']?.label || null,
    }, country));
    return base;
  }
}

async function fetchAppleChart(chart = 'top-free', country = 'us', limit = 50) {
  const base = await fetchAppleChartFeed(chart, country, limit);
  const enriched = await Promise.all(base.map(async (item) => {
    if (!item.storeId) return item;
    try {
      return await fetchAppleLookup(item.storeId, country) || item;
    } catch {
      return item;
    }
  }));
  return enriched;
}

function dedupeAppleApps(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.storeId || item.id}-${String(item.country || 'US').toUpperCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchAppleExplorePage(countries = ['us'], cursor = 0, chunk = 6, limit = 100) {
  const normalizedCountries = [...new Set((countries || []).map((item) => toAppleCountry(item)).filter(Boolean))];
  const charts = ['top-free', 'top-paid', 'top-grossing'];
  const sources = normalizedCountries.flatMap((country) => charts.map((chart) => ({ country, chart })));
  const start = Math.max(0, Number(cursor) || 0);
  const pageSources = sources.slice(start, start + Math.max(1, Math.min(12, Number(chunk) || 6)));
  const groups = await Promise.all(pageSources.map(async ({ chart, country }) => {
    try {
      return await fetchAppleChartFeed(chart, country, limit);
    } catch {
      return [];
    }
  }));
  return {
    results: dedupeAppleApps(groups.flat()),
    nextCursor: start + pageSources.length,
    done: start + pageSources.length >= sources.length,
    totalSources: sources.length,
    fetchedSources: pageSources,
  };
}

async function fetchAppleReviews(trackId, country = 'us', page = 1) {
  const urls = [
    `https://itunes.apple.com/${toAppleCountry(country)}/rss/customerreviews/page=${page}/id=${trackId}/sortby=mostrecent/json`,
    `https://itunes.apple.com/${toAppleCountry(country)}/rss/customerreviews/id=${trackId}/sortBy=mostRecent/json`,
  ];
  for (const url of urls) {
    try {
      const data = await fetchJson(url, {
        headers: { 'User-Agent': 'Signal-Local' },
      });
      const entries = Array.isArray(data.feed?.entry) ? data.feed.entry.slice(1) : [];
      return entries.map((entry, index) => ({
        id: entry.id?.label || `${trackId}-${page}-${index}`,
        author: entry.author?.name?.label || 'Anonymous',
        title: entry.title?.label || '',
        content: entry.content?.label || entry.summary?.label || '',
        rating: Number(entry['im:rating']?.label || 0) || null,
        version: entry['im:version']?.label || '',
        updatedAt: entry.updated?.label || '',
      }));
    } catch {}
  }
  return [];
}

async function fetchEcbRates() {
  const xml = await fetchText('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', {
    headers: { 'User-Agent': 'Signal-Local' },
  });
  const rates = { EUR: 1 };
  const matches = [...xml.matchAll(/currency='([A-Z]{3})'\s+rate='([0-9.]+)'/g)];
  matches.forEach(([, currency, rate]) => {
    rates[currency] = Number(rate);
  });
  return {
    base: 'EUR',
    date: (xml.match(/time='(\d{4}-\d{2}-\d{2})'/) || [])[1] || null,
    rates,
  };
}

const FX_FALLBACK_RATES = {
  AED: 3.97,
  AMD: 418.0,
  AOA: 972.0,
  ARS: 1170.0,
  AZN: 1.84,
  BHD: 0.408,
  BMD: 1.08,
  BOB: 7.47,
  BWP: 14.71,
  BYN: 3.53,
  CLP: 1015.0,
  COP: 4240.0,
  CRC: 545.0,
  DOP: 68.5,
  DZD: 145.0,
  EGP: 55.0,
  GHS: 16.3,
  GTQ: 8.3,
  HNL: 27.2,
  JOD: 0.767,
  KES: 140.0,
  KWD: 0.331,
  KZT: 552.0,
  LBP: 96800.0,
  MDL: 19.3,
  MKD: 61.5,
  MUR: 49.5,
  OMR: 0.415,
  PEN: 4.0,
  PKR: 302.0,
  PYG: 8600.0,
  QAR: 3.93,
  RSD: 117.0,
  SAR: 4.04,
  LKR: 349.0,
  TND: 3.4,
  TWD: 35.0,
  TZS: 2900.0,
  UAH: 45.5,
  UGX: 4300.0,
  UYU: 45.3,
  UZS: 13800.0,
  VND: 27500.0,
};

async function fetchBroadFxRates() {
  const data = await fetchJson('https://open.er-api.com/v6/latest/EUR', {
    headers: { 'User-Agent': 'Signal-Local' },
  });
  if (String(data?.result || '').toLowerCase() !== 'success' || !data?.rates || typeof data.rates !== 'object') {
    throw new Error('Broad FX provider returned an invalid payload');
  }
  return {
    base: data.base_code || 'EUR',
    date: data.time_last_update_utc || null,
    rates: data.rates,
  };
}

async function fetchMergedFxRates() {
  const ecb = await fetchEcbRates();
  let broadRates = {};
  try {
    const broad = await fetchBroadFxRates();
    if ((broad.base || 'EUR') === 'EUR') broadRates = broad.rates || {};
  } catch {}

  return {
    base: 'EUR',
    date: ecb.date,
    rates: {
      ...FX_FALLBACK_RATES,
      ...broadRates,
      ...ecb.rates,
    },
  };
}

async function fetchGithubMetadata(repoUrl, token = '') {
  const repo = repoInfoFromInput(repoUrl);
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Signal-Local',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const repoData = await fetchJson(`https://api.github.com/repos/${repo.owner}/${repo.repo}`, { headers });
    let readme = '';
    try {
      const readmeResponse = await fetchText(`https://api.github.com/repos/${repo.owner}/${repo.repo}/readme`, {
        headers: { ...headers, Accept: 'application/vnd.github.raw+json' },
      });
      readme = compactText(readmeResponse);
    } catch {}

    return {
      provider: 'github',
      ref: repo.slug,
      url: repoData.html_url || repo.url,
      appName: repoData.name ? titleCase(repoData.name.replace(/[._-]+/g, ' ')) : repo.appName,
      description: repoData.description || '',
      homepage: repoData.homepage || '',
      topics: repoData.topics || [],
      readme,
      private: !!repoData.private,
      visibility: repoData.visibility || (repoData.private ? 'private' : 'public'),
    };
  } catch (error) {
    if (error.status === 401 || error.status === 403 || error.status === 404) {
      const authError = new Error('Private or inaccessible repository. Add a GitHub token with repo read access.');
      authError.code = 'GITHUB_AUTH_REQUIRED';
      throw authError;
    }
    throw error;
  }
}

async function createRenderPack(payload) {
  const id = jobId('render');
  const dir = join(jobsRoot, id);
  await ensureDir(dir);
  const manifest = payload.manifest || {};
  const files = [];

  for (const asset of payload.assets || []) {
    const { buffer } = decodeDataUrl(asset.dataUrl);
    const relativePath = normalize(asset.path || asset.filename || `${asset.id || files.length}.png`).replace(/^(\.\.[/\\])+/, '');
    const fullPath = join(dir, relativePath);
    await ensureDir(dirname(fullPath));
    await writeFile(fullPath, buffer);
    files.push({
      path: relativePath,
      bytes: buffer.byteLength,
      variant: asset.variant || null,
      screen: asset.screen || null,
      slot: asset.slot || null,
    });
  }

  const manifestPath = join(dir, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  const job = {
    id,
    type: 'render-pack',
    status: 'ready',
    createdAt: new Date().toISOString(),
    projectName: manifest.projectName || payload.projectName || 'Untitled project',
    exportPreset: manifest.exportPreset || payload.exportPreset || null,
    fileCount: files.length,
    files,
    paths: {
      dir: dir.slice(root.length + 1),
      manifest: manifestPath.slice(root.length + 1),
    },
  };
  await writeJob(job);
  return job;
}

async function createUploadJob(provider, payload) {
  const renderJob = await readJob(payload.renderJobId);
  const id = jobId(provider === 'app-store-connect' ? 'asc' : 'play');
  const instructions = provider === 'app-store-connect'
    ? [
        'Sign a JWT with your App Store Connect API key on the backend.',
        'Create appScreenshotSets for each required locale and display family.',
        'Reserve upload operations, upload each PNG, then commit the screenshot records.',
      ]
    : [
        'Authenticate with a Google service account that can manage Play Console listing assets.',
        'Upload phone and tablet screenshots for the target locale and listing.',
        'Associate the uploaded screenshots with the main listing or custom listing flow.',
      ];
  const job = {
    id,
    type: 'upload-prep',
    provider,
    status: 'prepared',
    createdAt: new Date().toISOString(),
    renderJobId: renderJob.id,
    projectName: payload.manifest?.projectName || renderJob.projectName,
    integration: payload.integration || {},
    instructions,
    paths: {
      renderDir: renderJob.paths?.dir,
      renderManifest: renderJob.paths?.manifest,
    },
    summary: {
      fileCount: renderJob.fileCount,
      exportPreset: payload.manifest?.exportPreset || renderJob.exportPreset || null,
      variantCount: Array.isArray(payload.manifest?.outputs) ? payload.manifest.outputs.length : null,
    },
  };
  await writeJob(job);
  return job;
}

async function createAscReviewReplyJob(payload) {
  const id = jobId('asc-reviews');
  const reviews = Array.isArray(payload.reviews) ? payload.reviews : [];
  const job = {
    id,
    type: 'asc-review-replies',
    provider: 'app-store-connect',
    status: 'prepared',
    createdAt: new Date().toISOString(),
    app: payload.app || {},
    connection: payload.connection || {},
    summary: {
      reviewCount: reviews.length,
      appName: payload.app?.name || 'Untitled app',
    },
    instructions: [
      'Sign a JWT with your App Store Connect API key on the backend.',
      'Resolve the app and customerReview resources for the selected listing.',
      'Submit each replyDraft as the review response body for its matching review record.',
    ],
    payload: {
      reviews,
    },
  };
  await writeJob(job);
  return job;
}

async function createAscMetadataJob(payload) {
  const id = jobId('asc-metadata');
  const job = {
    id,
    type: 'asc-metadata',
    provider: 'app-store-connect',
    status: 'prepared',
    createdAt: new Date().toISOString(),
    app: payload.app || {},
    connection: payload.connection || {},
    summary: {
      appName: payload.app?.name || 'Untitled app',
      keywordCount: Array.isArray(payload.metadata?.keywords) ? payload.metadata.keywords.length : 0,
    },
    instructions: [
      'Sign a JWT with your App Store Connect API key on the backend.',
      'Resolve the editable appStoreVersionLocalization and appInfoLocalization records for the target locale.',
      'Patch title, subtitle, and keywords with the prepared metadata payload, then submit for review if desired.',
    ],
    payload: {
      metadata: payload.metadata || {},
    },
  };
  await writeJob(job);
  return job;
}

async function handleApi(req, res, url) {
  const pathname = url.pathname;
  if (req.method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'signal-local-api', now: new Date().toISOString() });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/jobs') {
    const jobs = await listJobs();
    sendJson(res, 200, { jobs });
    return true;
  }

  if (req.method === 'GET' && pathname.startsWith('/api/jobs/')) {
    const id = pathname.split('/').pop();
    try {
      const job = await readJob(id);
      sendJson(res, 200, job);
    } catch {
      sendJson(res, 404, { error: 'Job not found' });
    }
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/render-pack') {
    const payload = await readJsonBody(req);
    const job = await createRenderPack(payload);
    sendJson(res, 200, job);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/connect/github') {
    const payload = await readJsonBody(req);
    try {
      const metadata = await fetchGithubMetadata(payload.repoUrl || '', payload.accessToken || '');
      const repo = repoInfoFromInput(payload.repoUrl || '');
      sendJson(res, 200, {
        ok: true,
        connection: {
          provider: 'github',
          status: 'connected',
          label: repo.slug,
          ref: repo.slug,
          url: metadata.url || repo.url,
          appName: metadata.appName || repo.appName,
          sourceType: 'repo',
          metadata,
        },
      });
    } catch (error) {
      sendJson(res, error.code === 'GITHUB_AUTH_REQUIRED' ? 403 : 500, {
        error: error.message || 'GitHub connection failed',
        needsAuth: error.code === 'GITHUB_AUTH_REQUIRED',
      });
    }
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/connect/app-store-connect') {
    const payload = await readJsonBody(req);
    try {
      const metadata = await fetchAppleMetadata(payload.appRef || '');
      sendJson(res, 200, {
        ok: true,
        connection: {
          provider: 'app-store-connect',
          status: 'connected',
          label: `App ID ${metadata.appId}`,
          appId: metadata.appId,
          url: metadata.url,
          appName: metadata.appName,
          sourceType: 'app-store',
          metadata,
        },
      });
    } catch (error) {
      sendJson(res, 500, { error: error.message || 'App Store Connect connection failed' });
    }
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/connect/google-play') {
    const payload = await readJsonBody(req);
    try {
      const metadata = await fetchPlayMetadata(payload.packageName || '');
      sendJson(res, 200, {
        ok: true,
        connection: {
          provider: 'google-play',
          status: 'connected',
          label: metadata.packageName,
          packageName: metadata.packageName,
          url: metadata.url,
          appName: metadata.appName,
          sourceType: 'google-play',
          metadata,
        },
      });
    } catch (error) {
      sendJson(res, 500, { error: error.message || 'Google Play connection failed' });
    }
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/resolve-source') {
    const payload = await readJsonBody(req);
    sendJson(res, 200, {
      ok: true,
      output: resolveSourcePayload(payload),
    });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/upload/app-store-connect') {
    const payload = await readJsonBody(req);
    const job = await createUploadJob('app-store-connect', payload);
    sendJson(res, 200, job);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/asc/review-replies') {
    const payload = await readJsonBody(req);
    const job = await createAscReviewReplyJob(payload);
    sendJson(res, 200, job);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/asc/metadata') {
    const payload = await readJsonBody(req);
    const job = await createAscMetadataJob(payload);
    sendJson(res, 200, job);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/upload/google-play') {
    const payload = await readJsonBody(req);
    const job = await createUploadJob('google-play', payload);
    sendJson(res, 200, job);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/search') {
    const query = url.searchParams.get('q') || '';
    const country = url.searchParams.get('country') || 'us';
    const limit = Number(url.searchParams.get('limit') || 24);
    const results = query.trim() ? await fetchAppleSearch(query.trim(), country, limit) : [];
    sendJson(res, 200, { results });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/idea-validator/research') {
    const payload = await readJsonBody(req);
    try {
      console.log('[Idea Validator] Starting research for idea:', payload.idea?.substring(0, 80) + '...');
      const report = await buildIdeaValidatorResearch(payload);
      console.log('[Idea Validator] Research completed successfully. Found', report.signals?.redditPosts?.length || 0, 'Reddit posts,', report.signals?.xPosts?.length || 0, 'X posts');
      sendJson(res, 200, report);
    } catch (error) {
      console.error('[Idea Validator] Error:', error.message);
      sendJson(res, Number(error.status) || 500, { error: error.message || 'Idea validation failed' });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/charts') {
    const chart = url.searchParams.get('chart') || 'top-free';
    const country = url.searchParams.get('country') || 'us';
    const limit = Number(url.searchParams.get('limit') || 50);
    const results = await fetchAppleChart(chart, country, limit);
    sendJson(res, 200, { results });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/explore') {
    const countries = String(url.searchParams.get('countries') || 'us')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    const cursor = Number(url.searchParams.get('cursor') || 0);
    const chunk = Number(url.searchParams.get('chunk') || 6);
    const limit = Number(url.searchParams.get('limit') || 100);
    const page = await fetchAppleExplorePage(countries, cursor, chunk, limit);
    sendJson(res, 200, page);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/app') {
    const id = url.searchParams.get('id');
    const country = url.searchParams.get('country') || 'us';
    if (!id) {
      sendJson(res, 400, { error: 'Missing app id' });
      return true;
    }
    const app = await fetchAppleLookup(id, country);
    sendJson(res, app ? 200 : 404, app ? { app } : { error: 'App not found' });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/reviews') {
    const id = url.searchParams.get('id');
    const country = url.searchParams.get('country') || 'us';
    const page = Number(url.searchParams.get('page') || 1);
    if (!id) {
      sendJson(res, 400, { error: 'Missing app id' });
      return true;
    }
    const reviews = await fetchAppleReviews(id, country, page);
    sendJson(res, 200, { reviews });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/fx/latest') {
    const data = await fetchMergedFxRates();
    sendJson(res, 200, data);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/keyword/search') {
    const keyword = url.searchParams.get('keyword') || '';
    const country = url.searchParams.get('country') || 'us';
    const limit = Number(url.searchParams.get('limit') || 50);

    if (!keyword.trim()) {
      sendJson(res, 400, { error: 'Missing keyword parameter' });
      return true;
    }

    const payload = await getAppleKeywordSearch(keyword, country, limit);
    sendJson(res, 200, payload);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/apple/keyword/suggest') {
    const term = url.searchParams.get('term') || '';
    const country = url.searchParams.get('country') || 'us';

    if (!term.trim()) {
      sendJson(res, 400, { error: 'Missing term parameter' });
      return true;
    }

    const payload = await getAppleKeywordSuggestions(term, country);
    sendJson(res, 200, payload);
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/keywords/history') {
    const appId = url.searchParams.get('appId') || '';
    const keyword = url.searchParams.get('keyword') || '';
    const country = url.searchParams.get('country') || 'us';

    if (!appId || !keyword) {
      sendJson(res, 400, { error: 'Missing appId or keyword parameter' });
      return true;
    }

    const history = await readKeywordHistory(appId, country, keyword);
    sendJson(res, 200, {
      appId,
      keyword,
      country: String(country).toUpperCase(),
      history,
      meta: {
        refreshPolicy: 'daily',
        source: history[history.length - 1]?.source || null,
      },
    });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/keywords/warmup') {
    const payload = await readJsonBody(req);
    const trackedApps = Array.isArray(payload.trackedApps) ? payload.trackedApps : [];

    if (!trackedApps.length) {
      sendJson(res, 400, { error: 'Missing trackedApps payload' });
      return true;
    }

    const warmedApps = await warmTrackedKeywords(trackedApps, {
      limit: Number(payload.limit || 50),
    });

    sendJson(res, 200, {
      trackedApps: warmedApps,
      meta: {
        refreshPolicy: 'daily',
        processedApps: warmedApps.length,
        processedKeywords: warmedApps.reduce((sum, app) => sum + (app.keywords?.length || 0), 0),
        warmedAt: new Date().toISOString(),
      },
    });
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/ads/meta') {
    const advertiser = url.searchParams.get('advertiser') || '';
    if (!compactText(advertiser)) {
      sendJson(res, 400, { error: 'Missing advertiser', ads: [] });
      return true;
    }
    try {
      const result = await fetchMetaAdsByAdvertiser(advertiser);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 200, {
        ads: [],
        sourceUrl: buildMetaAdsSearchUrl(advertiser),
        warning: error?.message || 'Meta ads lookup failed',
        blocked: error?.status === 403,
      });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/ads/tiktok') {
    const advertiser = url.searchParams.get('advertiser') || '';
    if (!compactText(advertiser)) {
      sendJson(res, 400, { error: 'Missing advertiser', ads: [] });
      return true;
    }
    try {
      const result = await fetchTikTokAdsByAdvertiser(advertiser);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 502, { error: error.message || 'TikTok ads lookup failed', ads: [] });
    }
    return true;
  }

  return false;
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (pathname.startsWith('/api/')) {
      const handled = await handleApi(req, res, url);
      if (!handled) sendJson(res, 404, { error: 'Unknown API route' });
      return;
    }

    const target = resolvePath(pathname);
    if (!target.startsWith(root) || !existsSync(target)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const type = mimeTypes[extname(target)] || 'application/octet-stream';

    if (extname(target) === '.html') {
      const html = await readFile(target, 'utf8');
      const injected = html.includes('window.__SHIPSHOT_ENV__=')
        ? html
        : html.replace('</head>', `  ${clientEnvScript()}\n</head>`);
      res.writeHead(200, {
        'Content-Type': type,
        'Cache-Control': 'no-store',
      });
      res.end(injected);
      return;
    }

    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
    });
    createReadStream(target).pipe(res);
  } catch (error) {
    sendJson(res, 500, { error: error.message || 'Server error' });
  }
}).listen(port, host, async () => {
  await ensureDir(jobsRoot);
  console.log(`signal running at http://${host}:${port}`);
});
