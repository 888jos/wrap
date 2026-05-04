/* Signal market intelligence screens */

// Import Progress Modal with animated steps
function ImportProgressModal({ appName, appIcon, steps, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div className="card" style={{
        width: 480,
        maxWidth: '90vw',
        padding: 32,
        animation: 'slideUp 0.3s ease-out',
      }}>
        {/* App Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          {appIcon ? (
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: appIcon.startsWith('http') ? `url(${appIcon})` : 'var(--accent)',
              backgroundSize: 'cover',
              flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--bg-1)',
              flexShrink: 0,
            }}>
              {appName?.charAt(0) || 'A'}
            </div>
          )}
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)' }}>
              {appName || 'Importing App'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 2 }}>
              Fetching metadata from store
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div style={{ display: 'grid', gap: 14 }}>
          {steps.map((step, index) => (
            <div
              key={step.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                background: step.status === 'completed' ? 'var(--bg-2)' : 'transparent',
                transition: 'all 0.3s ease',
                animation: step.status !== 'pending' ? `fadeInStep 0.3s ease-out ${index * 0.1}s backwards` : 'none',
              }}
            >
              {/* Checkmark icon */}
              <div style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: step.status === 'completed' ? '#22c55e' : step.status === 'loading' ? 'var(--accent)' : 'var(--border-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}>
                {step.status === 'completed' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : step.status === 'loading' ? (
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--bg-1)',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }} />
                ) : null}
              </div>

              {/* Step label */}
              <div style={{
                fontSize: 14,
                fontWeight: step.status !== 'pending' ? 500 : 400,
                color: step.status === 'completed' ? 'var(--text-1)' : step.status === 'loading' ? 'var(--text-1)' : 'var(--text-3)',
                transition: 'all 0.3s ease',
              }}>
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInStep {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
}

const WRAP_SEED_CATALOG = [
  ['Idle Flight Manager', 'INFINITY GAMES, LDA', 'games'],
  ['CortiFree: Stress & Sleep', 'Solstys I.T.', 'health-fitness'],
  ['Teamflow CRM', 'Northstack Labs', 'business'],
  ['Budget Beacon', 'Copper Wave', 'finance'],
  ['LiftLog Strength', 'Barbell Studio', 'health-fitness'],
  ['Pixelmator Camera', 'Frame Foundry', 'photo-video'],
  ['GroomAI Studio', 'Velvet Labs', 'photo-video'],
  ['LexiCards', 'Lang Academy', 'education'],
  ['Moon Atlas', 'Quiet Weather', 'weather'],
  ['Pocket Planner', 'Wrap Foundry', 'productivity'],
  ['Calm Nest', 'Soft Bloom Tech', 'lifestyle'],
  ['DealPilot', 'Commerce Grid', 'shopping'],
  ['Relay Desk', 'Office Current', 'business'],
  ['Stride Coach', 'Pace Loop', 'sports'],
  ['MapHop', 'Transit State', 'navigation'],
  ['Tiny Ledger', 'Evermint', 'finance'],
  ['MealCanvas', 'Kitchen Orbit', 'food-drink'],
  ['Storygrid Reader', 'Paperlight', 'books'],
  ['Pulse Reviews', 'Signal Frame', 'developer-tools'],
  ['Nova Learn', 'Orbital School', 'education'],
  ['Runmate AI', 'Pace Loop', 'health-fitness'],
  ['CreatorScan', 'Viral Current', 'social-networking'],
  ['Atlas VPN+', 'Northstack Labs', 'utilities'],
  ['SoundScape Sleep', 'Quiet Weather', 'music'],
  ['PromptPad', 'Wrap Foundry', 'developer-tools'],
  ['Habit Garden', 'Soft Bloom Tech', 'productivity'],
  ['Shiftboard Pro', 'Office Current', 'business'],
  ['Trail Mapper', 'Transit State', 'travel'],
];

const WRAP_COUNTRIES = [
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BM', name: 'Bermuda', flag: '🇧🇲' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', name: 'China mainland', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KR', name: 'Korea', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MO', name: 'Macao', flag: '🇲🇴' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
].sort((a, b) => a.name.localeCompare(b.name));

const WRAP_PRICE_CURRENCY_BY_COUNTRY = {
  AE: 'AED', AM: 'AMD', AO: 'AOA', AR: 'ARS', AT: 'EUR', AU: 'AUD', AZ: 'AZN',
  BE: 'EUR', BG: 'BGN', BH: 'BHD', BM: 'BMD', BO: 'BOB', BR: 'BRL', BW: 'BWP', BY: 'BYN',
  CA: 'CAD', CH: 'CHF', CL: 'CLP', CN: 'CNY', CO: 'COP', CR: 'CRC', CY: 'EUR', CZ: 'CZK',
  DE: 'EUR', DK: 'DKK', DO: 'DOP', DZ: 'DZD',
  EC: 'USD', EE: 'EUR', EG: 'EGP', ES: 'EUR', FI: 'EUR', FR: 'EUR',
  GB: 'GBP', GH: 'GHS', GR: 'EUR', GT: 'GTQ',
  HK: 'HKD', HN: 'HNL', HR: 'EUR', HU: 'HUF',
  ID: 'IDR', IE: 'EUR', IL: 'ILS', IN: 'INR', IS: 'ISK', IT: 'EUR',
  JO: 'JOD', JP: 'JPY',
  KE: 'KES', KR: 'KRW', KW: 'KWD', KZ: 'KZT',
  LB: 'LBP', LK: 'LKR', LT: 'EUR', LU: 'EUR', LV: 'EUR',
  MD: 'MDL', MK: 'MKD', MO: 'MOP', MT: 'EUR', MU: 'MUR', MX: 'MXN', MY: 'MYR',
  NG: 'NGN', NL: 'EUR', NO: 'NOK', NZ: 'NZD',
  OM: 'OMR',
  PA: 'USD', PE: 'PEN', PH: 'PHP', PK: 'PKR', PL: 'PLN', PT: 'EUR', PY: 'PYG',
  QA: 'QAR',
  RO: 'RON', RS: 'RSD',
  SA: 'SAR', SE: 'SEK', SG: 'SGD', SI: 'EUR', SK: 'EUR', SV: 'USD',
  TH: 'THB', TN: 'TND', TR: 'TRY', TW: 'TWD', TZ: 'TZS',
  UA: 'UAH', UG: 'UGX', US: 'USD', UY: 'UYU', UZ: 'UZS',
  VE: 'USD', VN: 'VND', ZA: 'ZAR',
};

const WRAP_PRICE_COUNTRIES = WRAP_COUNTRIES.map((country) => [
  country.name,
  country.flag,
  WRAP_PRICE_CURRENCY_BY_COUNTRY[country.code] || 'USD',
]);

const WRAP_CATEGORY_RPI = {
  business: 0.62,
  'developer-tools': 0.48,
  education: 0.4,
  entertainment: 0.3,
  finance: 0.52,
  'food-drink': 0.24,
  games: 0.21,
  'graphics-design': 0.46,
  'health-fitness': 0.63,
  lifestyle: 0.28,
  kids: 0.22,
  'magazines-newspapers': 0.26,
  medical: 0.41,
  music: 0.25,
  navigation: 0.29,
  news: 0.2,
  'photo-video': 0.49,
  productivity: 0.44,
  reference: 0.23,
  'safari-extensions': 0.19,
  shopping: 0.34,
  'social-networking': 0.18,
  sports: 0.33,
  travel: 0.37,
  utilities: 0.31,
  weather: 0.27,
};

const WRAP_COUNTRY_RPI_MULTIPLIER = {
  US: 1.55,
  GB: 1.1,
  CA: 1.08,
  AU: 1.06,
  DE: 0.98,
  FR: 0.94,
  JP: 1.12,
};

const WRAP_REVIEW_INSTALL_MULTIPLIER = {
  business: 18,
  'developer-tools': 16,
  education: 15,
  entertainment: 20,
  finance: 17,
  'food-drink': 21,
  games: 26,
  'graphics-design': 17,
  'health-fitness': 16,
  lifestyle: 20,
  kids: 22,
  'magazines-newspapers': 18,
  medical: 14,
  music: 21,
  navigation: 19,
  news: 24,
  'photo-video': 18,
  productivity: 17,
  reference: 14,
  'safari-extensions': 12,
  shopping: 19,
  'social-networking': 24,
  sports: 18,
  travel: 19,
  utilities: 18,
  weather: 20,
};

function wrapHash(value) {
  return String(value || '').split('').reduce((acc, char) => ((acc * 33) + char.charCodeAt(0)) % 1000003, 5381);
}

function wrapNumber(seed, min, max) {
  return min + (seed % (max - min + 1));
}

async function wrapReadJsonResponse(response) {
  const raw = await response.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Invalid JSON response');
    error.responseText = raw;
    throw error;
  }
}

function wrapMoney(value) {
  if (value >= 1000000) return `$${Math.round(value / 100000) / 10}M`;
  if (value >= 1000) return `$${Math.round(value / 100) / 10}K`;
  return value < 100 ? '$<100' : `$${Math.round(value)}`;
}

function wrapCompact(value) {
  if (value >= 1000000) return `${Math.round(value / 100000) / 10}M`;
  if (value >= 1000) return `${Math.round(value / 100) / 10}K`;
  return `${Math.round(value)}`;
}

function wrapCompactCount(value) {
  const amount = Number(value || 0);
  if (amount >= 1000000) return `${Math.round(amount / 1000000)}M`;
  if (amount >= 100000) return `${Math.round(amount / 1000)}K`;
  if (amount >= 1000) return `${Math.round(amount / 1000)}K`;
  return `${Math.round(amount)}`;
}

function wrapRating(value) {
  const amount = Number(value || 0);
  if (!Number.isFinite(amount) || amount <= 0) return '—';
  return amount.toFixed(1);
}

function wrapCategoryLabel(id) {
  if (id && typeof id === 'object') {
    return id.name || id.label || 'Category';
  }
  return window.SHIPSHOT.categoryById(id)?.label || id;
}

function wrapCategoryShort(id) {
  if (id && typeof id === 'object') {
    return id.name || id.short || 'Category';
  }
  return window.SHIPSHOT.categoryById(id)?.short || id;
}

function wrapNormalizeCategoryValue(value) {
  if (window.SHIPSHOT?.normalizeCategory) {
    return window.SHIPSHOT.normalizeCategory(value);
  }
  return value;
}

function wrapCountryFlag(code) {
  if (!code) return '🌐';
  const upperCode = String(code).toUpperCase();
  return WRAP_COUNTRIES.find((item) => item.code === upperCode)?.flag || '🌐';
}

function wrapCountryName(code) {
  if (!code) return 'Country';
  const upperCode = String(code).toUpperCase();
  return WRAP_COUNTRIES.find((item) => item.code === upperCode)?.name || code || 'Country';
}

function wrapParseReleasedDays(value) {
  if (!value) return null;
  const text = String(value).toLowerCase();
  const yearMatch = text.match(/(\d+)\s*y/);
  if (yearMatch) return Number(yearMatch[1]) * 365;
  const monthMatch = text.match(/(\d+)\s*mo/);
  if (monthMatch) return Number(monthMatch[1]) * 30;
  const dayMatch = text.match(/(\d+)\s*d/);
  if (dayMatch) return Number(dayMatch[1]);
  if (text.includes('today')) return 0;
  return null;
}

function wrapNumberInput(value) {
  if (value === '' || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function wrapRecentSearchTerms(query, categories) {
  const terms = [];
  const pushTerm = (value) => {
    const normalized = String(value || '').trim().replace(/[&/]+/g, ' ').replace(/\s+/g, ' ');
    if (!normalized) return;
    if (!terms.some((item) => item.toLowerCase() === normalized.toLowerCase())) {
      terms.push(normalized);
    }
  };

  pushTerm(query);
  (categories || []).forEach((categoryId) => pushTerm(wrapCategoryLabel(categoryId)));

  if (!terms.length) {
    [
      'productivity',
      'business',
      'finance',
      'health fitness',
      'photo video',
      'shopping',
      'travel',
      'education',
      'utilities',
      'music',
      'games',
      'social networking',
    ].forEach(pushTerm);
  }

  return terms.slice(0, 8);
}

function wrapNicheTermsForApp(app) {
  const weighted = [
    app.name,
    app.subtitle,
    Array.isArray(app.genres) ? app.genres.map((item) => typeof item === 'string' ? item : item?.name).join(' ') : '',
    app.description,
  ].filter(Boolean).join(' ');
  const tokens = wrapTokenizeKeywords(weighted);
  const counts = new Map();
  tokens.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([token]) => token);
  const categoryLabel = wrapCategoryLabel(app.category);
  return [categoryLabel, ...ranked].filter(Boolean).slice(0, 5);
}

function wrapSimilarityScore(baseApp, candidate) {
  const baseTokens = new Set(wrapTokenizeKeywords([
    baseApp.name,
    baseApp.subtitle,
    Array.isArray(baseApp.genres) ? baseApp.genres.map((item) => typeof item === 'string' ? item : item?.name).join(' ') : '',
    baseApp.description,
  ].join(' ')));
  const candidateTokens = wrapTokenizeKeywords([
    candidate.name,
    candidate.subtitle,
    Array.isArray(candidate.genres) ? candidate.genres.map((item) => typeof item === 'string' ? item : item?.name).join(' ') : '',
    candidate.description,
  ].join(' '));
  const overlap = candidateTokens.reduce((count, token) => count + (baseTokens.has(token) ? 1 : 0), 0);
  const categoryBonus = candidate.category === baseApp.category ? 12 : 0;
  const ratingBonus = Math.round(Number(candidate.rating || 0) * 2);
  const reviewBonus = Math.min(12, Math.round(Math.log10(Number(candidate.ratingCount || candidate.reviews || 1) + 1) * 4));
  return overlap * 5 + categoryBonus + ratingBonus + reviewBonus;
}

function wrapRelativeTime(dateValue, fallback = 'Recently') {
  if (!dateValue) return fallback;
  const timestamp = new Date(dateValue).getTime();
  if (!Number.isFinite(timestamp)) return fallback;
  const diffDays = Math.max(0, Math.round((Date.now() - timestamp) / 86400000));
  if (diffDays < 1) return 'Today';
  if (diffDays < 30) return `${diffDays}d ago`;
  const months = Math.max(1, Math.round(diffDays / 30));
  if (months < 12) return `${months}mo ago`;
  const years = Math.max(1, Math.round(months / 12));
  return `${years}y ago`;
}

function wrapCategoryRpi(category) {
  return WRAP_CATEGORY_RPI[category] || 0.28;
}

function wrapCountryMultiplier(country) {
  return WRAP_COUNTRY_RPI_MULTIPLIER[country] || 1;
}

function wrapEstimateInstalls(app) {
  const reviewCount = Number(app.ratingCount || app.reviews || 0);
  const baseMultiplier = WRAP_REVIEW_INSTALL_MULTIPLIER[app.category] || 18;
  const seededFloor = 2500 + (wrapHash(`${app.storeId || app.id}-${app.country || 'US'}`) % 9000);
  return Math.max(seededFloor, reviewCount * baseMultiplier);
}

function wrapEstimateGrowth(app) {
  const seed = wrapHash(`${app.storeId || app.id}-${app.updatedAt || app.releasedAt || ''}`);
  const updatedDays = wrapParseReleasedDays(wrapRelativeTime(app.updatedAt, '14d ago')) || 14;
  const momentum = Math.max(-8, 18 - updatedDays / 3);
  return Math.round((momentum + ((seed % 60) - 20) / 10) * 10) / 10;
}

function wrapActivityDays(app) {
  const releasedDays = wrapParseReleasedDays(wrapRelativeTime(app.releasedAt, '9999d ago'));
  const updatedDays = wrapParseReleasedDays(wrapRelativeTime(app.updatedAt, '9999d ago'));
  if (releasedDays == null && updatedDays == null) return null;
  if (releasedDays == null) return updatedDays;
  if (updatedDays == null) return releasedDays;
  return Math.min(releasedDays, updatedDays);
}

function wrapReleaseDays(app) {
  // Use releasedAt for initial release date filter
  const releasedDays = wrapParseReleasedDays(wrapRelativeTime(app.releasedAt, '9999d ago'));
  return releasedDays;
}

function wrapLiveAppWithMetrics(app) {
  const installs = wrapEstimateInstalls(app);
  const country = app.country || 'US';
  const normalizedCategory = wrapNormalizeCategoryValue(
    app.category || app.primaryGenreName || (Array.isArray(app.genres) ? app.genres[0] : '') || 'productivity'
  );
  const revenue = Math.round(installs * wrapCategoryRpi(normalizedCategory) * wrapCountryMultiplier(country));
  return {
    ...app,
    id: `${app.id || `apple-${app.storeId}`}-${country}`,
    category: normalizedCategory,
    downloads: installs,
    revenue,
    reviews: Number(app.ratingCount || app.reviews || 0),
    growth: wrapEstimateGrowth(app),
    releasedAgo: wrapRelativeTime(app.releasedAt, 'Recently'),
    updatedAgo: wrapRelativeTime(app.updatedAt, 'Recently'),
    country,
    countryFlag: WRAP_COUNTRIES.find((item) => item.code === country)?.flag || '🇺🇸',
    countryName: WRAP_COUNTRIES.find((item) => item.code === country)?.name || 'United States',
  };
}

function wrapDedupeLiveApps(items) {
  const bestByKey = new Map();
  items.forEach((item) => {
    const key = String(item.storeId || item.trackId || item.id || `${item.name}-${item.developer}`).toLowerCase();
    const current = bestByKey.get(key);
    if (!current) {
      bestByKey.set(key, item);
      return;
    }
    const currentScore = (Number(current.reviews || 0) * 4) + (Number(current.downloads || 0) / 1000) + (Number(current.revenue || 0) / 100) + Number(current.rating || 0);
    const nextScore = (Number(item.reviews || 0) * 4) + (Number(item.downloads || 0) / 1000) + (Number(item.revenue || 0) / 100) + Number(item.rating || 0);
    if (nextScore > currentScore) bestByKey.set(key, item);
  });
  return Array.from(bestByKey.values());
}

const WRAP_LIVE_CACHE_KEY = 'wrap-live-cache-v1';
const WRAP_LIVE_REGISTRY_KEY = 'wrap-live-app-registry-v1';
const WRAP_KEYWORD_WATCHLIST_KEY = 'wrap-keyword-watchlist-v1';
const WRAP_ASO_ANALYZER_APPS_KEY = 'wrap-aso-analyzer-apps-v1';
const WRAP_LIVE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function wrapLocalDayStamp(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function wrapNextLocalMidnightDelayMs() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return Math.max(1000, next.getTime() - now.getTime());
}

function wrapReadLocalJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function wrapWriteLocalJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function wrapReadLiveCache() {
  if (!window.__wrapLiveCache) {
    window.__wrapLiveCache = wrapReadLocalJson(WRAP_LIVE_CACHE_KEY, {});
  }
  return window.__wrapLiveCache;
}

function wrapReadCachedEntry(key, ttlMs = WRAP_LIVE_CACHE_TTL_MS) {
  const cache = wrapReadLiveCache();
  const entry = cache[key];
  if (!entry?.savedAt || !Array.isArray(entry.items)) return null;
  const savedAt = new Date(entry.savedAt).getTime();
  if (!Number.isFinite(savedAt) || (Date.now() - savedAt) > ttlMs) return null;
  return entry;
}

function wrapWriteCachedEntry(key, items) {
  const cache = wrapReadLiveCache();
  cache[key] = {
    savedAt: new Date().toISOString(),
    items,
  };
  window.__wrapLiveCache = cache;
  wrapWriteLocalJson(WRAP_LIVE_CACHE_KEY, cache);
  return cache[key];
}

function wrapReadLiveAppRegistry() {
  if (!window.__wrapLiveAppRegistry) {
    window.__wrapLiveAppRegistry = wrapReadLocalJson(WRAP_LIVE_REGISTRY_KEY, []);
  }
  return Array.isArray(window.__wrapLiveAppRegistry) ? window.__wrapLiveAppRegistry : [];
}

function wrapRememberApps(items = []) {
  const current = wrapReadLiveAppRegistry();
  const merged = wrapDedupeLiveApps([
    ...items.map((item) => ({ ...item, rememberedAt: new Date().toISOString() })),
    ...current,
  ]);
  const ranked = merged
    .sort((a, b) => {
      const aScore = (Number(a.reviews || 0) * 4) + (Number(a.downloads || 0) / 1000) + (Number(a.revenue || 0) / 100);
      const bScore = (Number(b.reviews || 0) * 4) + (Number(b.downloads || 0) / 1000) + (Number(b.revenue || 0) / 100);
      return bScore - aScore;
    })
    .slice(0, 800);
  window.__wrapLiveAppRegistry = ranked;
  wrapWriteLocalJson(WRAP_LIVE_REGISTRY_KEY, ranked);
  return ranked;
}

function wrapReadKeywordWatchlist() {
  const items = wrapReadLocalJson(WRAP_KEYWORD_WATCHLIST_KEY, []);
  return Array.isArray(items) ? items : [];
}

function wrapWriteKeywordWatchlist(items = []) {
  wrapWriteLocalJson(WRAP_KEYWORD_WATCHLIST_KEY, items);
  return items;
}

function wrapReadAsoAnalyzerApps() {
  const items = wrapReadLocalJson(WRAP_ASO_ANALYZER_APPS_KEY, []);
  return Array.isArray(items) ? items : [];
}

function wrapWriteAsoAnalyzerApps(items = []) {
  wrapWriteLocalJson(WRAP_ASO_ANALYZER_APPS_KEY, items);
  return items;
}

function wrapKeywordWatchId(keyword, country = 'US') {
  return `kw-watch:${String(country || 'US').toUpperCase()}:${String(keyword || '').trim().toLowerCase()}`;
}

function wrapKeywordWatchAppId(country, app) {
  const base = String(app?.storeId || app?.id || app?.name || 'app')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `kw-watch-app:${String(country || 'US').toUpperCase()}:${base || 'app'}`;
}

function wrapKeywordEvolution(history = []) {
  if (!Array.isArray(history) || history.length < 2) {
    return { direction: 'flat', delta: 0 };
  }
  const previous = history[history.length - 2];
  const latest = history[history.length - 1];
  const previousPosition = previous?.position === 'Not ranked' ? 200 : Number(previous?.position || 200);
  const latestPosition = latest?.position === 'Not ranked' ? 200 : Number(latest?.position || 200);
  const movement = previousPosition - latestPosition;
  return movement > 0
    ? { direction: 'up', delta: movement }
    : movement < 0
      ? { direction: 'down', delta: Math.abs(movement) }
      : { direction: 'flat', delta: 0 };
}

function wrapBuildKeywordTrackedApps(rankings = [], keyword, country = 'US') {
  const normalizedCountry = String(country || 'US').toUpperCase();
  const countryFlag = wrapCountryFlag(normalizedCountry);
  const countryName = wrapCountryName(normalizedCountry);
  return rankings.slice(0, 25).map((app, index) => ({
    ...app,
    id: wrapKeywordWatchAppId(normalizedCountry, app),
    storeId: String(app.storeId || app.id || ''),
    country: normalizedCountry,
    countryFlag,
    countryName,
    keywords: [{
      id: `${wrapKeywordWatchAppId(normalizedCountry, app)}:kw:${String(keyword || '').toLowerCase()}`,
      country: countryFlag,
      keyword: String(keyword || '').trim().toLowerCase(),
      position: Number(app.position || index + 1),
      popularity: Number(app.keywordPopularity || 72),
      difficulty: 38,
      apps: rankings.length,
    }],
    keywordCount: 1,
  }));
}

function useWrapCachedChartSet({ countries, charts, limit = 100, enabled = true, cachePrefix = 'wrap-chart-set' }) {
  const countryKey = (countries || []).join(',');
  const chartKey = (charts || []).join(',');
  const [reloadToken, setReloadToken] = React.useState(0);
  const cacheKey = `${cachePrefix}:${countryKey}:${chartKey}:${limit}`;
  const cachedEntry = React.useMemo(
    () => (enabled ? wrapReadCachedEntry(cacheKey) : null),
    [cacheKey, enabled, reloadToken],
  );
  const [state, setState] = React.useState(() => ({
    items: cachedEntry?.items || [],
    loading: enabled && !cachedEntry,
    error: '',
    cached: Boolean(cachedEntry),
  }));

  React.useEffect(() => {
    if (!enabled) {
      setState({ items: [], loading: false, error: '', cached: false });
      return undefined;
    }

    let cancelled = false;
    const activeCountries = (countries && countries.length ? countries : []).slice(0, 12);
    const activeCharts = (charts && charts.length ? charts : ['top-free']).slice(0, 4);
    if (!activeCountries.length) {
      setState({ items: [], loading: false, error: '', cached: false });
      return undefined;
    }

    if (cachedEntry?.items?.length) {
      wrapRememberApps(cachedEntry.items);
      setState({ items: cachedEntry.items, loading: false, error: '', cached: true });
      return undefined;
    }

    async function load() {
      setState((current) => ({ ...current, loading: true, error: '' }));
      try {
        const requests = activeCountries.flatMap((countryCode) => (
          activeCharts.map(async (chartId) => {
            const response = await fetch(`/api/apple/charts?chart=${encodeURIComponent(chartId)}&country=${countryCode.toLowerCase()}&limit=${Math.max(1, Number(limit) || 100)}`);
            const data = await response.json();
            return response.ok ? (data.results || []).map((item) => wrapLiveAppWithMetrics({ ...item, country: item.country || countryCode })) : [];
          })
        ));
        const groups = await Promise.all(requests);
        if (cancelled) return;
        const items = wrapDedupeLiveApps(groups.flat());
        wrapRememberApps(items);
        wrapWriteCachedEntry(cacheKey, items);
        setState({ items, loading: false, error: '', cached: false });
      } catch (error) {
        if (!cancelled) {
          setState({ items: [], loading: false, error: error?.message || 'Apple data unavailable', cached: false });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cacheKey, cachedEntry, countryKey, chartKey, enabled, limit, reloadToken]);

  const refresh = React.useCallback(() => {
    if (!enabled) return;
    if (window.__wrapLiveCache) {
      delete window.__wrapLiveCache[cacheKey];
      wrapWriteLocalJson(WRAP_LIVE_CACHE_KEY, window.__wrapLiveCache);
    }
    setReloadToken((current) => current + 1);
    setState((current) => ({ ...current, loading: true, cached: false }));
  }, [cacheKey, enabled]);

  return { ...state, refresh };
}

function useWrapLiveListing({ countries, query, chart, limit, mode = 'search', categories = [], enabled = true }) {
  const countryKey = (countries || []).join(',');
  const categoryKey = (categories || []).join(',');
  const normalizedQuery = String(query || '').trim();
  const activeCountries = (countries && countries.length ? countries : []).slice(0, 12);
  const recentTerms = wrapRecentSearchTerms(normalizedQuery, categories);
  const shouldLoadRecent = enabled && mode === 'recent' && activeCountries.length > 0 && recentTerms.length > 0;
  const shouldLoadSearch = enabled && mode !== 'recent' && activeCountries.length > 0 && normalizedQuery.length >= 2;
  const shouldLoadCharts = enabled && mode !== 'recent' && activeCountries.length > 0 && !normalizedQuery && Boolean(chart);
  const shouldLoad = shouldLoadRecent || shouldLoadSearch || shouldLoadCharts;
  const [state, setState] = React.useState({ items: [], loading: shouldLoad, error: '' });

  React.useEffect(() => {
    let cancelled = false;
    if (!shouldLoad) {
      setState({ items: [], loading: false, error: '' });
      return undefined;
    }

    async function load() {
      setState((current) => ({ ...current, loading: true, error: '' }));
      try {
        const requests = activeCountries.flatMap((countryCode) => {
          if (mode === 'recent') {
            return recentTerms.map(async (term) => {
              const path = `/api/apple/search?q=${encodeURIComponent(term)}&country=${countryCode.toLowerCase()}&limit=${Math.min(limit || 24, 50)}`;
              const response = await fetch(path);
              const data = await wrapReadJsonResponse(response);
              return response.ok ? (data.results || []).map((item) => wrapLiveAppWithMetrics({ ...item, country: item.country || countryCode })) : [];
            });
          }
          return [(async () => {
            const path = normalizedQuery
              ? `/api/apple/search?q=${encodeURIComponent(normalizedQuery)}&country=${countryCode.toLowerCase()}&limit=${limit || 24}`
              : `/api/apple/charts?chart=${encodeURIComponent(chart || 'top-free')}&country=${countryCode.toLowerCase()}&limit=${limit || 24}`;
            const response = await fetch(path);
            const data = await wrapReadJsonResponse(response);
            return response.ok ? (data.results || []).map((item) => wrapLiveAppWithMetrics({ ...item, country: item.country || countryCode })) : [];
          })()];
        });
        const responses = await Promise.all(requests);
        if (!cancelled) {
          const items = wrapDedupeLiveApps(responses.flat());
          wrapRememberApps(items);
          setState({
            items,
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ items: [], loading: false, error: error?.message || 'Apple data unavailable' });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [countryKey, normalizedQuery, chart, limit, mode, categoryKey, shouldLoad]);

  return state;
}

function useChartData(chart, country, limit = 100) {
  const normalizedChart = chart || 'top-free';
  const normalizedCountry = String(country || 'us').toUpperCase();
  const [dayStamp, setDayStamp] = React.useState(() => wrapLocalDayStamp());
  const previousDayStamp = React.useMemo(() => {
    const previous = new Date();
    previous.setDate(previous.getDate() - 1);
    return wrapLocalDayStamp(previous);
  }, [dayStamp]);
  const cacheKey = `wrap-chart:${normalizedChart}:${normalizedCountry}:${limit}:${dayStamp}`;
  const previousCacheKey = `wrap-chart:${normalizedChart}:${normalizedCountry}:${limit}:${previousDayStamp}`;
  const cachedEntry = React.useMemo(() => wrapReadCachedEntry(cacheKey, Number.MAX_SAFE_INTEGER), [cacheKey]);
  const previousEntry = React.useMemo(() => wrapReadCachedEntry(previousCacheKey, Number.MAX_SAFE_INTEGER), [previousCacheKey]);
  const [state, setState] = React.useState(() => ({
    items: cachedEntry?.items || [],
    previousItems: previousEntry?.items || [],
    loading: !cachedEntry,
    error: '',
    cached: Boolean(cachedEntry),
  }));
  const previousCacheKeyRef = React.useRef(cacheKey);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDayStamp(wrapLocalDayStamp());
    }, wrapNextLocalMidnightDelayMs());
    return () => window.clearTimeout(timer);
  }, [dayStamp]);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      const cacheKeyChanged = previousCacheKeyRef.current !== cacheKey;
      previousCacheKeyRef.current = cacheKey;
      if (cachedEntry?.items?.length) {
        wrapRememberApps(cachedEntry.items);
        setState({ items: cachedEntry.items, previousItems: previousEntry?.items || [], loading: false, error: '', cached: true });
        return;
      }
      setState((current) => ({
        items: cacheKeyChanged ? [] : current.items,
        previousItems: previousEntry?.items || current.previousItems || [],
        loading: true,
        error: '',
        cached: false,
      }));
      try {
        const response = await fetch(
          `/api/apple/charts?chart=${encodeURIComponent(normalizedChart)}&country=${normalizedCountry.toLowerCase()}&limit=${Math.max(1, Number(limit) || 100)}`
        );
        const data = await wrapReadJsonResponse(response);
        if (cancelled) return;
        if (!response.ok) {
          throw new Error(data?.error || 'Apple chart data unavailable');
        }
        const items = (data.results || []).map((item) => wrapLiveAppWithMetrics({ ...item, country: item.country || normalizedCountry }));
        const deduped = wrapDedupeLiveApps(items);
        wrapRememberApps(deduped);
        wrapWriteCachedEntry(cacheKey, deduped);
        setState({
          items: deduped,
          previousItems: previousEntry?.items || [],
          loading: false,
          error: '',
          cached: false,
        });
      } catch (error) {
        if (!cancelled) {
          setState((current) => ({
            ...current,
            previousItems: previousEntry?.items || current.previousItems || [],
            loading: false,
            error: error?.message || 'Apple chart data unavailable',
            cached: false,
          }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [normalizedChart, normalizedCountry, limit, cachedEntry, previousEntry, cacheKey]);

  return state;
}

function WrapCountryPicker({ value, onChange }) {
  const normalizedValue = String(value || 'us').toUpperCase();
  return (
    <select value={normalizedValue} onChange={(event) => onChange?.(event.target.value.toLowerCase())} className="select">
      {WRAP_COUNTRIES.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>
  );
}

function WrapCategoryPicker({ value, onChange, includeAll = true }) {
  const categories = window.DATA?.APP_CATEGORIES || [];
  const normalizedValue = value || (includeAll ? 'all' : categories[0]?.id || '');
  return (
    <select value={normalizedValue} onChange={(event) => onChange?.(event.target.value)} className="select">
      {includeAll ? <option value="all">All Categories</option> : null}
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.label}
        </option>
      ))}
    </select>
  );
}

function wrapColorPair(seed) {
  const pairs = [
    ['#5B8CFF', '#212C62'],
    ['#B7FF4A', '#435A15'],
    ['#FF8B3D', '#5A2E11'],
    ['#7E6BFF', '#271F62'],
    ['#66E3FF', '#133C52'],
    ['#FF6F91', '#4E1A29'],
  ];
  return pairs[seed % pairs.length];
}

function wrapAppIcon(app, size = 44) {
  const radius = Math.round(size * 0.32);
  if (typeof app.icon === 'string' && /^https?:\/\//i.test(app.icon)) {
    return <img src={app.icon} alt={app.name || 'App icon'} style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', boxShadow: '0 18px 48px rgba(0,0,0,0.34)', background: 'transparent', border: 'none', outline: 'none', display: 'block' }} />;
  }
  const seed = wrapHash(app.id || app.name);
  const [a, b] = wrapColorPair(seed);
  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: `linear-gradient(135deg, ${a}, ${b})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: size * 0.38, boxShadow: '0 8px 20px rgba(0,0,0,0.28)' }}>
      {(app.icon || app.name || 'A').slice(0, 1).toUpperCase()}
    </div>
  );
}

function wrapAppSizeLabel(value) {
  if (value == null || value === '') return 'N/A';
  if (typeof value === 'string' && /(?:kb|mb|gb)$/i.test(value.trim())) return value.trim();
  const bytes = Number(value);
  if (!Number.isFinite(bytes) || bytes <= 0) return typeof value === 'string' ? value : 'N/A';
  const gb = bytes / (1024 ** 3);
  if (gb >= 1) return `${gb.toFixed(gb >= 10 ? 0 : 1)} GB`;
  const mb = bytes / (1024 ** 2);
  if (mb >= 1) return `${mb.toFixed(mb >= 100 ? 0 : 1)} MB`;
  const kb = bytes / 1024;
  return `${Math.max(1, Math.round(kb))} KB`;
}

function buildWrapCatalog() {
  return WRAP_SEED_CATALOG.map(([name, developer, category], index) => {
    const seed = wrapHash(`${name}-${developer}-${category}`);
    const downloads = wrapNumber(seed, 40, 900) * 1000;
    const revenue = Math.round(downloads * wrapNumber(seed + 7, 1, 8) * 0.12);
    const reviews = wrapNumber(seed + 11, 30, 280) * 100;
    const rating = Math.round((4 + ((seed % 9) / 10)) * 10) / 10;
    const growth = ((seed % 240) - 40) / 10;
    const country = WRAP_COUNTRIES[seed % WRAP_COUNTRIES.length];
    return {
      id: `market-${index + 1}`,
      name,
      developer,
      category,
      icon: name.charAt(0),
      country: country.code,
      countryFlag: country.flag,
      countryName: country.name,
      releasedAgo: `${wrapNumber(seed + 19, 1, 12)}mo ago`,
      updatedAgo: `${wrapNumber(seed + 23, 2, 29)}d ago`,
      downloads,
      revenue,
      reviews,
      rating,
      growth,
      creators: wrapNumber(seed + 31, 0, 12),
      metaAds: wrapNumber(seed + 41, 0, 18),
      appleAds: wrapNumber(seed + 51, 0, 8),
      activeUsers: {
        mau: wrapNumber(seed + 61, 1, 8) * 1000,
        dau: wrapNumber(seed + 71, 180, 2400),
      },
      description: `${name} helps users ${category === 'health-fitness' ? 'improve daily wellbeing and routines' : category === 'business' ? 'manage work operations and execution' : category === 'finance' ? 'track money, budgets and financial decisions' : category === 'games' ? 'stay engaged with fast loops and progression' : category === 'photo-video' ? 'create and edit visuals with less effort' : 'solve a clear everyday workflow faster'}.`,
    };
  });
}

function wrapTrackedFromWorkspace(workspace) {
  return Array.isArray(workspace.trackedApps) ? workspace.trackedApps : [];
}

function wrapFavoriteIds(workspace) {
  return Array.isArray(workspace.favoriteAppIds) ? workspace.favoriteAppIds : [];
}

function buildWrapUniverse(workspace) {
  const base = buildWrapCatalog();
  const tracked = wrapTrackedFromWorkspace(workspace);
  const registry = wrapReadLiveAppRegistry();
  const trackedMapped = tracked.map((item, index) => ({
    id: item.id || `tracked-${index}`,
    name: item.name,
    developer: item.developer || 'Tracked app',
    category: item.category || 'productivity',
    icon: item.name?.charAt(0) || 'A',
    country: item.country || 'US',
    countryFlag: item.countryFlag || '🇺🇸',
    countryName: item.countryName || 'United States',
    releasedAgo: item.releasedAgo || 'Recently added',
    updatedAgo: item.updatedAgo || 'Just now',
    downloads: item.downloads || 420000,
    revenue: item.revenue || 48000,
    reviews: item.reviews || 1200,
    rating: item.rating || 4.6,
    growth: item.growth || 18.4,
    creators: item.creators || 0,
    metaAds: item.metaAds || 0,
    appleAds: item.appleAds || 0,
    activeUsers: item.activeUsers || { mau: 1500, dau: 437 },
    description: item.description || '',
    storeUrl: item.storeUrl || '',
    keywordCount: item.keywordCount || 27,
    keywords: item.keywords || [],
    tracked: true,
    screenshotInputs: item.screenshotInputs || [],
  }));
  const registryMapped = registry.map((item, index) => ({
    id: item.id || item.storeId || `registry-${index}`,
    storeId: item.storeId || item.trackId || null,
    name: item.name,
    developer: item.developer || 'App Store app',
    category: wrapNormalizeCategoryValue(item.category || item.primaryGenreName || (Array.isArray(item.genres) ? item.genres[0] : '') || 'productivity'),
    icon: item.icon || item.name?.charAt(0) || 'A',
    country: item.country || 'US',
    countryFlag: item.countryFlag || wrapCountryFlag(item.country || 'US'),
    countryName: item.countryName || wrapCountryName(item.country || 'US'),
    releasedAgo: item.releasedAgo || wrapRelativeTime(item.releasedAt, 'Recently'),
    updatedAgo: item.updatedAgo || wrapRelativeTime(item.updatedAt, 'Recently'),
    releasedAt: item.releasedAt || '',
    updatedAt: item.updatedAt || '',
    downloads: item.downloads || 0,
    revenue: item.revenue || 0,
    reviews: item.reviews || item.ratingCount || 0,
    rating: item.rating || 0,
    growth: item.growth || 0,
    creators: item.creators || 0,
    metaAds: item.metaAds || 0,
    appleAds: item.appleAds || 0,
    activeUsers: item.activeUsers || { mau: 0, dau: 0 },
    description: item.description || '',
    storeUrl: item.storeUrl || item.url || '',
    keywordCount: item.keywordCount || 0,
    keywords: item.keywords || [],
    subtitle: item.subtitle || '',
    genres: item.genres || [],
    screenshots: item.screenshots || [],
    ipadScreenshots: item.ipadScreenshots || [],
  }));
  const ids = new Set(trackedMapped.map((item) => String(item.storeId || item.id || item.name).toLowerCase()));
  registryMapped.forEach((item) => ids.add(String(item.storeId || item.id || item.name).toLowerCase()));
  return [...trackedMapped, ...registryMapped, ...base.filter((item) => !ids.has(String(item.storeId || item.id || item.name).toLowerCase()))];
}

function wrapKeywordsForApp(app) {
  if (!app || typeof app !== 'object') return [];
  if (Array.isArray(app.keywords) && app.keywords.length) return app.keywords;
  const categoryBase = {
    'health-fitness': ['meditation', 'sleep sounds', 'sleep tracker', 'pedometer', 'calorie counter', 'habit tracker', 'wellness', 'anxiety relief'],
    business: ['team chat', 'crm', 'workspace', 'inbox', 'sales tracker', 'project approval', 'kanban'],
    finance: ['budget planner', 'expense tracker', 'savings', 'money manager', 'subscription tracker', 'net worth'],
    games: ['idle game', 'tycoon', 'strategy', 'multiplayer', 'simulator', 'puzzle'],
    'photo-video': ['photo editor', 'creator tools', 'background remover', 'video template', 'ugc camera'],
    productivity: ['to do list', 'calendar', 'notes', 'organizer', 'task manager', 'focus timer'],
  };
  const seed = wrapHash(app.id || app.name);
  return (categoryBase[app.category] || ['mobile app', 'growth', 'retention', 'keyword'])
    .slice(0, 6)
    .map((keyword, index) => ({
      id: `${app.id}-kw-${index}`,
      country: '🇺🇸',
      keyword,
      position: seed % 3 === 0 ? wrapNumber(seed + index, 1, 20) : 'Not ranked',
      popularity: 94 - index * 3,
      difficulty: 35 + ((seed + index * 7) % 18),
      apps: 210,
    }));
}

const WRAP_KEYWORD_STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'your', 'you', 'from', 'that', 'this', 'into', 'are', 'our', 'app', 'apps',
  'will', 'can', 'more', 'less', 'than', 'about', 'have', 'has', 'had', 'its', 'use', 'using', 'used',
  'help', 'helps', 'make', 'made', 'best', 'free', 'ios', 'iphone', 'ipad', 'store', 'today', 'daily',
  'simple', 'smart', 'real', 'designed', 'design', 'get', 'new', 'all', 'one', 'two', 'three', 'over',
  'through', 'their', 'them', 'they', 'who', 'what', 'when', 'where', 'why', 'how', 'also', 'just',
  'moreover', 'very', 'much', 'many', 'each', 'every', 'across', 'improve', 'manage', 'track', 'build',
  'create', 'organize', 'stay', 'better', 'faster', 'easier', 'easily', 'powerful', 'complete', 'access',
]);

const WRAP_REVIEW_SEMANTIC_STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'being', 'but', 'by', 'did', 'do', 'does', 'doing',
  'for', 'from', 'had', 'has', 'have', 'having', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just',
  'me', 'my', 'of', 'on', 'or', 'our', 'ours', 'so', 'than', 'that', 'the', 'their', 'them', 'then',
  'there', 'these', 'they', 'this', 'those', 'to', 'too', 'very', 'was', 'we', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'why', 'will', 'with', 'you', 'your', 'yours',
  'after', 'again', 'against', 'all', 'also', 'am', 'any', 'because', 'before', 'both', 'each', 'few',
  'here', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'itd', 'ill', 'ive', 'lets', 'most', 'once',
  'only', 'other', 'ourselves', 'out', 'own', 'same', 'she', 'shes', 'should', 'some', 'such', 'than',
  'theirs', 'themselves', 'through', 'under', 'until', 'up', 'were', 'whats', 'whens', 'wheres', 'whos',
  'whys', 'yall', 'youre', 'youve', 'cant', 'couldnt', 'didnt', 'doesnt', 'dont', 'hadnt', 'hasnt',
  'havent', 'isnt', 'shouldnt', 'wasnt', 'werent', 'wont', 'wouldnt',
  'app', 'apps', 'application', 'feature', 'features', 'version', 'update', 'updates', 'developer', 'team',
  'phone', 'iphone', 'ipad', 'ios', 'store', 'apple', 'download', 'downloads', 'screen', 'screens',
  'nice', 'good', 'great', 'bad', 'awesome', 'amazing', 'love', 'like', 'really', 'super', 'pretty',
  'thing', 'things', 'stuff', 'way', 'lot', 'lots', 'bit', 'maybe', 'overall', 'still', 'even', 'well',
  'im', 'id', 'thats', 'youll', 'theyre', 'weve', 'didn', 'doesn', 'isn', 'wasn', 'weren', 'won', 'wouldn',
]);

const WRAP_REVIEW_SEMANTIC_PHRASE_FILLERS = new Set([
  'a', 'an', 'and', 'app', 'apps', 'for', 'from', 'in', 'into', 'is', 'it', 'of', 'on', 'or', 'that',
  'the', 'this', 'to', 'with', 'very', 'really', 'just', 'my', 'your', 'our', 'their', 'be', 'been',
]);

function wrapTokenizeKeywords(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\u2019']/g, '')
    .replace(/[^a-z0-9+\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 3 && word.length <= 24 && !WRAP_KEYWORD_STOPWORDS.has(word) && !/^\d+$/.test(word));
}

function wrapReviewSemanticNormalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/can't/g, 'cant')
    .replace(/won't/g, 'wont')
    .replace(/n't/g, 'nt')
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9+\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wrapReviewSemanticDisplay(text) {
  return String(text || '')
    .replace(/\bcant\b/g, "can't")
    .replace(/\bwont\b/g, "won't")
    .replace(/\bdont\b/g, "don't")
    .replace(/\bdoesnt\b/g, "doesn't")
    .replace(/\bdidnt\b/g, "didn't")
    .replace(/\bisnt\b/g, "isn't")
    .replace(/\barent\b/g, "aren't")
    .replace(/\bwasnt\b/g, "wasn't")
    .replace(/\bwerent\b/g, "weren't")
    .replace(/\bshouldnt\b/g, "shouldn't")
    .replace(/\bwouldnt\b/g, "wouldn't")
    .replace(/\bcouldnt\b/g, "couldn't")
    .replace(/\bim\b/g, "I'm");
}

function wrapExtractReviewSemantics(reviews = []) {
  const phraseCounts = new Map();
  const phraseExamples = new Map();
  const unigramCounts = new Map();

  reviews.forEach((review) => {
    const text = wrapReviewSemanticNormalize(`${review.title || ''} ${review.content || ''}`);
    if (!text) return;
    const words = text.split(/\s+/).filter(Boolean);
    const seenPhrases = new Set();
    const seenUnigrams = new Set();

    for (let index = 0; index < words.length; index += 1) {
      const word = words[index];
      if (
        word.length >= 4 &&
        word.length <= 28 &&
        !WRAP_REVIEW_SEMANTIC_STOPWORDS.has(word) &&
        !/^\d+$/.test(word)
      ) {
        seenUnigrams.add(word);
      }

      for (let size = 3; size >= 2; size -= 1) {
        const slice = words.slice(index, index + size);
        if (slice.length !== size) continue;
        if (slice.some((part) => part.length < 2 || /^\d+$/.test(part))) continue;
        if (WRAP_REVIEW_SEMANTIC_PHRASE_FILLERS.has(slice[0]) || WRAP_REVIEW_SEMANTIC_PHRASE_FILLERS.has(slice[slice.length - 1])) continue;
        const meaningful = slice.filter((part) => !WRAP_REVIEW_SEMANTIC_STOPWORDS.has(part));
        if (meaningful.length < Math.max(1, size - 1)) continue;
        const phrase = slice.join(' ');
        if (phrase.length < 8 || phrase.length > 42) continue;
        seenPhrases.add(phrase);
      }
    }

    seenPhrases.forEach((phrase) => {
      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
      if (!phraseExamples.has(phrase)) phraseExamples.set(phrase, review);
    });
    seenUnigrams.forEach((word) => {
      unigramCounts.set(word, (unigramCounts.get(word) || 0) + 1);
    });
  });

  const phrases = [...phraseCounts.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0]))
    .filter(([phrase, count], index, items) => {
      if (count < 2 && items[0]?.[1] > 2) return false;
      return !items.some(([other], otherIndex) => otherIndex < index && other.includes(phrase));
    })
    .slice(0, 14)
    .map(([phrase, count]) => ({
      phrase,
      label: wrapReviewSemanticDisplay(phrase),
      count,
      example: phraseExamples.get(phrase) || null,
    }));

  const words = [...unigramCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .filter(([word], index, items) => {
      if (phrases.some((item) => item.phrase.includes(word))) return false;
      return !items.some(([other], otherIndex) => otherIndex < index && other.includes(word));
    })
    .slice(0, 8)
    .map(([word, count]) => ({ word, label: wrapReviewSemanticDisplay(word), count }));

  const highlights = [...phrases, ...words]
    .sort((a, b) => b.count - a.count || String(b.label || b.word).length - String(a.label || a.word).length)
    .slice(0, 12);

  const improvementIdeas = phrases.slice(0, 6).map((item) => {
    const title = item.example?.title ? ` in "${item.example.title}"` : '';
    return `Users mention "${item.label}" in ${item.count} recent reviews${title}.`;
  });

  return { phrases, words, highlights, improvementIdeas };
}

function wrapExtractKeywordsFromMetadata(source, category) {
  const corpus = [
    source.name,
    source.subtitle,
    source.developer,
    source.description,
    Array.isArray(source.genres) ? source.genres.map((item) => typeof item === 'string' ? item : item?.name).join(' ') : '',
  ].filter(Boolean).join(' ');
  const tokens = wrapTokenizeKeywords(corpus);
  const counts = new Map();
  tokens.forEach((token) => counts.set(token, (counts.get(token) || 0) + 1));
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([token]) => token)
    .slice(0, 8);

  if (!ranked.length) {
    return wrapKeywordsForApp({ id: `fallback-${category}`, category });
  }

  const seed = wrapHash(`${source.storeId || source.name}-${category}`);
  return ranked.map((keyword, index) => ({
    id: `${source.storeId || source.id || source.name}-kw-live-${index}`,
    country: source.countryFlag || '🇺🇸',
    keyword,
    position: seed % 4 === 0 ? wrapNumber(seed + index, 3, 24) : 'Not ranked',
    popularity: Math.max(48, 95 - index * 6),
    difficulty: 28 + ((seed + index * 11) % 24),
    apps: 120 + ((seed + index * 13) % 220),
  }));
}

function wrapSimilarKeywordsForApp(app, keyword) {
  const corpusTokens = wrapTokenizeKeywords([
    app.name,
    app.subtitle,
    app.description,
    Array.isArray(app.genres) ? app.genres.map((item) => typeof item === 'string' ? item : item?.name).join(' ') : '',
  ].join(' '));
  const base = String(keyword || '').toLowerCase();
  const parts = base.split(/\s+/).filter(Boolean);
  const candidates = new Set();
  corpusTokens.forEach((token) => {
    if (token !== base && (base.includes(token) || token.includes(parts[0] || base) || parts.some((part) => token.includes(part)))) {
      candidates.add(token);
    }
  });
  if (!candidates.size) {
    corpusTokens.slice(0, 20).forEach((token) => candidates.add(token));
  }
  const seed = wrapHash(`${app.id}-${keyword}`);
  return [...candidates].slice(0, 8).map((item, index) => ({
    id: `similar-${app.id}-${item}-${index}`,
    keyword: item,
    popularity: Math.max(40, 88 - index * 5),
    difficulty: 24 + ((seed + index * 9) % 26),
  }));
}

function wrapUpdateTrackedAppKeywords(appId, updater) {
  updateWrapWorkspace((current) => ({
    ...current,
    trackedApps: (current.trackedApps || []).map((app) => {
      if (app.id !== appId) return app;
      const currentKeywords = Array.isArray(app.keywords) ? app.keywords : [];
      const nextKeywords = typeof updater === 'function' ? updater(currentKeywords, app) : currentKeywords;
      return {
        ...app,
        keywords: nextKeywords,
        keywordCount: nextKeywords.length,
      };
    }),
  }));
}

function wrapEscapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function wrapDownloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

function wrapScreenshotSets(app) {
  return [
    { id: 'iphone', label: 'iPhone', items: Array.isArray(app?.screenshots) ? app.screenshots.filter(Boolean) : [] },
    { id: 'ipad', label: 'iPad', items: Array.isArray(app?.ipadScreenshots) ? app.ipadScreenshots.filter(Boolean) : [] },
    { id: 'mac', label: 'Mac', items: Array.isArray(app?.macScreenshots) ? app.macScreenshots.filter(Boolean) : [] },
  ].filter((group) => group.items.length > 0);
}

function wrapScreenshotViewportWidth(deviceId) {
  if (deviceId === 'mac') return 'min(72vw, 700px)';
  if (deviceId === 'ipad') return 'min(52vw, 420px)';
  return 'min(34vw, 280px)';
}

function wrapScreenshotFilename(appName, deviceId, index, url) {
  const safeName = String(appName || 'app').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'app';
  const extMatch = String(url || '').match(/\.([a-z0-9]{3,4})(?:[?#].*)?$/i);
  const ext = extMatch?.[1] || 'jpg';
  return `${safeName}-${deviceId}-${String(index + 1).padStart(2, '0')}.${ext}`;
}

async function wrapDownloadRemoteFile(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    return true;
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer');
    return false;
  }
}

function WrapScreenshotModal({ open, app, deviceSet, index, onClose, onSelectIndex, onChangeDevice }) {
  const [copyState, setCopyState] = React.useState('idle');

  React.useEffect(() => {
    if (!open) return undefined;
    const handleKeydown = (event) => {
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'ArrowLeft') onSelectIndex?.(Math.max(0, index - 1));
      if (event.key === 'ArrowRight') onSelectIndex?.(Math.min((deviceSet?.items?.length || 1) - 1, index + 1));
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [open, index, deviceSet, onClose, onSelectIndex]);

  React.useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || !deviceSet || !deviceSet.items.length) return null;

  const currentIndex = Math.max(0, Math.min(index, deviceSet.items.length - 1));
  const currentUrl = deviceSet.items[currentIndex];

  const handleCopyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const input = document.createElement('input');
        input.value = currentUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1600);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 1600);
    }
  };

  const handleDownloadCurrent = async () => {
    await wrapDownloadRemoteFile(currentUrl, wrapScreenshotFilename(app?.name, deviceSet.id, currentIndex, currentUrl));
  };

  const handleDownloadAll = async () => {
    for (const [itemIndex, url] of deviceSet.items.entries()) {
      // Keep order deterministic and avoid a burst of blocked downloads.
      // eslint-disable-next-line no-await-in-loop
      await wrapDownloadRemoteFile(url, wrapScreenshotFilename(app?.name, deviceSet.id, itemIndex, url));
    }
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(10px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <div
        className="card"
        onClick={(event) => event.stopPropagation()}
        style={{ width: 'min(1200px, 100%)', maxHeight: 'min(88vh, 960px)', background: '#1b1b1f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 18, display: 'grid', gap: 16, overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, color: 'var(--text-3)', marginBottom: 6 }}>{app?.developer || 'App Store app'}</div>
            <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.05, marginBottom: 8 }}>{app?.name}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="chip">⭐ {wrapRating(app?.rating)}</span>
              <span className="chip">App Store</span>
              <span className="chip">{app?.storeId || app?.id}</span>
            </div>
          </div>
          <button className="btn icon" onClick={onClose} aria-label="Close screenshot viewer">×</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={deviceSet.id}
              onChange={(event) => onChangeDevice?.(event.target.value)}
              style={{ height: 40, borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: '#23242a', color: '#f3f4f6', padding: '0 14px', fontSize: 13, fontWeight: 600, outline: 'none' }}
            >
              {wrapScreenshotSets(app).map((set) => (
                <option key={set.id} value={set.id}>{set.label}</option>
              ))}
            </select>
            <span className="chip">{currentIndex + 1} / {deviceSet.items.length}</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn sm" onClick={handleDownloadAll}>Download Screenshots</button>
            <button className="btn sm" onClick={handleCopyUrl}>{copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy URL'}</button>
          </div>
        </div>

        <div style={{ minHeight: 0, overflow: 'auto', display: 'flex', gap: 18, padding: '6px 0 10px' }}>
          {deviceSet.items.map((url, itemIndex) => (
            <img
              key={`${deviceSet.id}-${itemIndex}`}
              src={url}
              alt={`${app?.name || 'App'} ${deviceSet.label} screenshot ${itemIndex + 1}`}
              onClick={() => {
                onSelectIndex?.(itemIndex);
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              style={{
                width: wrapScreenshotViewportWidth(deviceSet.id),
                maxWidth: '100%',
                height: 'auto',
                maxHeight: deviceSet.id === 'mac' ? '42vh' : '56vh',
                borderRadius: 18,
                boxShadow: itemIndex === currentIndex ? '0 20px 60px rgba(245,98,23,0.18)' : '0 20px 60px rgba(0,0,0,0.4)',
                background: '#0d0f14',
                cursor: 'zoom-in',
                flexShrink: 0,
                border: itemIndex === currentIndex ? '2px solid var(--accent)' : '1px solid rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function wrapAdAdvertiserName(app) {
  return String(app?.developer || app?.seller || app?.name || '').trim();
}

function wrapMetaAdsLibraryUrl(app) {
  const advertiser = wrapAdAdvertiserName(app);
  const query = advertiser ? `"${advertiser}"` : app?.name || '';
  return `https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&is_targeted_country=false&media_type=all&search_type=keyword_unordered&q=${encodeURIComponent(query)}`;
}

function wrapTikTokAdsLibraryUrl(app) {
  const advertiser = wrapAdAdvertiserName(app) || app?.name || '';
  return `https://library.tiktok.com/ads?region=all&adv_name=${encodeURIComponent(advertiser)}&query_type=1&sort_type=last_shown_date%2Cdesc`;
}

function wrapHostname(urlValue) {
  try {
    return new URL(urlValue).hostname.replace('www.', '');
  } catch {
    return String(urlValue || '').replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0] || 'Website';
  }
}

function wrapSocialSearchUrl(platform, app) {
  const query = [app?.name, app?.developer, app?.sellerUrl ? wrapHostname(app.sellerUrl) : ''].filter(Boolean).join(' ').trim();
  if (!query) return '';
  if (platform === 'twitter') return `https://www.google.com/search?q=${encodeURIComponent(`site:x.com OR site:twitter.com ${query}`)}`;
  if (platform === 'linkedin') return `https://www.google.com/search?q=${encodeURIComponent(`site:linkedin.com/company OR site:linkedin.com/in ${query}`)}`;
  if (platform === 'instagram') return `https://www.google.com/search?q=${encodeURIComponent(`site:instagram.com ${query}`)}`;
  if (platform === 'tiktok') return `https://www.google.com/search?q=${encodeURIComponent(`site:tiktok.com ${query}`)}`;
  return '';
}

function useWrapAdvertiserAds(platform, advertiser) {
  const [state, setState] = React.useState({ ads: [], loading: false, error: '', sourceUrl: '' });

  React.useEffect(() => {
    const normalizedAdvertiser = String(advertiser || '').trim();
    if (!normalizedAdvertiser) {
      setState({ ads: [], loading: false, error: '', sourceUrl: '' });
      return undefined;
    }
    let cancelled = false;
    setState((current) => ({ ...current, loading: true, error: '' }));
    fetch(`/api/ads/${platform}?advertiser=${encodeURIComponent(normalizedAdvertiser)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || `Could not load ${platform} ads`);
        return data;
      })
      .then((data) => {
        if (!cancelled) {
          setState({
            ads: Array.isArray(data.ads) ? data.ads : [],
            loading: false,
            error: '',
            sourceUrl: data.sourceUrl || '',
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ ads: [], loading: false, error: error?.message || `Could not load ${platform} ads`, sourceUrl: '' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [platform, advertiser]);

  return state;
}

function wrapAppleAdsSearchUrl(term, country = 'US') {
  const storefront = String(country || 'US').toLowerCase();
  return `https://apps.apple.com/${storefront}/search?term=${encodeURIComponent(term || '')}`;
}

function wrapAppleAdsObservedQueries(app, country = 'US', keywordIntel = []) {
  const storefront = String(country || app?.country || 'US').toUpperCase();
  if (Array.isArray(keywordIntel) && keywordIntel.length) {
    return keywordIntel.slice(0, 4).map((item, index) => ({
      id: `apple-observed-${item.keyword}-${index}`,
      label: item.keyword,
      href: wrapAppleAdsSearchUrl(item.keyword, item.storefront || storefront),
      summary: Number.isFinite(item.rank)
        ? `Organic result seen for "${item.keyword}" in ${item.storefront}. This does not confirm paid placement.`
        : `No direct organic match found for "${item.keyword}" in ${item.storefront}. This still does not confirm paid placement.`,
    }));
  }

  const fallbackTerms = [app?.name, app?.subtitle, wrapCategoryShort(app?.category)]
    .filter(Boolean)
    .slice(0, 3);
  return fallbackTerms.map((term, index) => ({
    id: `apple-observed-fallback-${index}`,
    label: term,
    href: wrapAppleAdsSearchUrl(term, storefront),
    summary: `Open App Store search for "${term}" in ${storefront}.`,
  }));
}

function wrapAppleAdsDetection(app, country = 'US', keywordIntel = [], error = '') {
  const screenshots = Array.isArray(app?.screenshots) ? app.screenshots.length : 0;
  const subtitle = String(app?.subtitle || '').trim();
  const rating = Number(app?.rating || 0);
  const reviewCount = Number(app?.reviews || app?.ratingCount || 0);
  const storefront = String(country || app?.country || 'US').toUpperCase();
  const observedQueries = wrapAppleAdsObservedQueries(app, country, keywordIntel);
  const hasObservedSponsoredPlacement = false;
  const status = hasObservedSponsoredPlacement ? 'Observed' : error ? 'Unknown' : 'Unknown';
  const certainty = hasObservedSponsoredPlacement ? 'High' : error ? 'Low' : 'Medium';
  const method = 'Public App Store observation';
  const evidenceCount = observedQueries.length;
  return {
    status,
    certainty,
    storefront,
    method,
    observedQueries,
    stats: [
      { label: 'Storefront', value: storefront },
      { label: 'Status', value: status },
      { label: 'Certainty', value: certainty },
      { label: 'Observed queries', value: String(evidenceCount) },
    ],
    notes: [
      'Apple does not provide a public advertiser ad library for Apple Ads, so this view cannot prove campaign activity from Apple alone.',
      hasObservedSponsoredPlacement
        ? `A sponsored placement was observed for ${app?.name || 'this app'} in ${storefront}.`
        : `No sponsored placement was directly observed for ${app?.name || 'this app'} during this scan.`,
      subtitle ? `Subtitle present (${subtitle.length} chars), which is compatible with Apple Ads creative generation from App Store metadata.` : 'Missing subtitle weakens the metadata Apple Ads would reuse if the app advertises.',
      screenshots >= 3 ? 'Enough screenshots are available for Apple Ads creative reuse if campaigns are running.' : 'Limited screenshots reduce the confidence of any visual placement interpretation.',
      rating > 0 ? `Store rating is ${wrapRating(rating)} with ${wrapCompactCount(reviewCount)} reviews.` : 'Rating signal is unavailable from the current app payload.',
    ],
  };
}

function wrapIdeas(catalog) {
  return catalog.slice(0, 12).map((app, index) => ({
    id: `idea-${app.id}`,
    name: `${app.name} AI`,
    subtitle: `An AI-powered ${wrapCategoryShort(app.category).toLowerCase()} concept inspired by ${app.name.toLowerCase()}.`,
    category: app.category,
    rating: Math.round((4.1 + (index % 8) * 0.1) * 10) / 10,
    reviews: 12 + index * 7,
  }));
}

function wrapJobCard(job) {
  return (
    <div style={{ display: 'grid', gap: 8, padding: 12, borderRadius: 14, background: 'var(--accent-soft)', border: '1px solid var(--accent-ring)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          <window.I.RotateCw />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--accent)' }}>{job.label}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.meta || job.source}</div>
        </div>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, Math.max(6, job.progress || 0))}%`, height: '100%', background: 'var(--accent)' }} />
      </div>
    </div>
  );
}

function useWrapWorkspace() {
  return window.DATA.WORKSPACE;
}

function updateWrapWorkspace(updater) {
  window.__shipshotUpdateWorkspace?.(updater);
}

function addWrapJob(job) {
  updateWrapWorkspace((current) => ({
    ...current,
    wrapJobs: [job, ...(current.wrapJobs || []).filter((item) => item.id !== job.id)].slice(0, 3),
  }));
}

function updateWrapJob(jobId, patch) {
  updateWrapWorkspace((current) => ({
    ...current,
    wrapJobs: (current.wrapJobs || []).map((job) => job.id === jobId ? { ...job, ...patch } : job),
  }));
}

function clearWrapJob(jobId) {
  updateWrapWorkspace((current) => ({
    ...current,
    wrapJobs: (current.wrapJobs || []).filter((job) => job.id !== jobId),
  }));
}

function wrapRemoveTrackedApp(app, onAfterRemove) {
  if (!app) return;
  updateWrapWorkspace((current) => {
    const nextTrackedApps = (current.trackedApps || []).filter((tracked) => tracked.name !== app.name && tracked.id !== app.id);
    return {
      ...current,
      trackedApps: nextTrackedApps,
    };
  });
  if (typeof onAfterRemove === 'function') onAfterRemove(app);
}

function WrapConfirmModal({ open, title, body, confirmLabel = 'Confirm', tone = 'danger', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1700, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={onCancel}>
      <div className="card" style={{ width: 420, padding: 20, background: 'var(--bg-1)', display: 'grid', gap: 14 }} onClick={(event) => event.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: tone === 'danger' ? 'rgba(239, 68, 68, 0.14)' : 'var(--accent-soft)', display: 'grid', placeItems: 'center', color: tone === 'danger' ? '#ef4444' : 'var(--accent)' }}>
            {tone === 'danger' ? <window.I.Trash style={{ width: 15, height: 15 }} /> : <window.I.AlertCircle style={{ width: 15, height: 15 }} />}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
        </div>
        <div style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{body}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn danger sm" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function WrapAppsSidebarCard({
  items,
  selectedId,
  onSelect,
  onAdd,
  onRemove,
  count,
  emptyTitle = 'No apps yet',
  emptyBody = 'Add your first app to get started.',
  renderMeta,
  renderBadge,
}) {
  const [pendingRemove, setPendingRemove] = React.useState(null);
  return (
    <>
      <WrapConfirmModal
        open={Boolean(pendingRemove)}
        title="Remove App"
        body={pendingRemove ? `Remove "${pendingRemove.name}" from this workspace?` : ''}
        confirmLabel="Remove"
        onCancel={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove) onRemove?.(pendingRemove);
          setPendingRemove(null);
        }}
      />
      <div className="card signal-two-pane-list">
        <div style={{ padding: 14, borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.I.Smartphone />
            <strong>Apps</strong>
            <span className="chip">{count ?? items.length}</span>
          </div>
          <button className="btn primary sm" onClick={onAdd}><window.I.Plus /> Add App</button>
        </div>
        {!items.length ? (
          <div style={{ padding: 20 }}>
            <WrapEmptyState icon={window.I.Smartphone} title={emptyTitle} body={emptyBody} action={onAdd} actionLabel="Add App" />
          </div>
        ) : (
          items.map((app) => {
            const active = selectedId === app.id;
            const badge = typeof renderBadge === 'function' ? renderBadge(app) : null;
            const meta = typeof renderMeta === 'function' ? renderMeta(app) : null;
            return (
              <div
                key={app.id}
                onClick={() => onSelect?.(app)}
                style={{ width: '100%', padding: 14, borderBottom: '1px solid var(--border-0)', background: active ? 'var(--accent-soft)' : 'transparent', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                  {wrapAppIcon(app)}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                    {meta ? <div style={{ fontSize: 12, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{meta}</div> : null}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {badge}
                  <button
                    type="button"
                    className="btn sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      setPendingRemove(app);
                    }}
                    style={{ background: active ? 'rgba(239, 68, 68, 0.14)' : 'rgba(255,255,255,0.04)', color: active ? '#ff7d7d' : 'var(--text-3)', border: active ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-1)', padding: 0, width: 32, minWidth: 32 }}
                    aria-label={`Remove ${app.name}`}
                    title={`Remove ${app.name}`}
                  >
                    <window.I.Trash style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

async function wrapWarmTrackedApps(trackedApps) {
  const response = await fetch('/api/keywords/warmup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      trackedApps,
      limit: 50,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Keyword warmup failed');
  return data;
}

function wrapIsKeywordRefreshStale(app) {
  const checkedAt = app?.keywordRefreshMeta?.lastCheckedAt;
  if (!checkedAt) return true;
  const then = new Date(checkedAt).getTime();
  if (!Number.isFinite(then)) return true;
  return (Date.now() - then) >= (24 * 60 * 60 * 1000);
}

function wrapHistoryPreview(history = []) {
  return history.slice(-7).map((point) => ({
    day: new Date(point.date).toLocaleDateString('en-US', { weekday: 'short' }),
    position: point.position === 'Not ranked' ? 200 : Number(point.position || 200),
    date: point.date,
  }));
}

async function wrapConnectApp(url) {
  const isApple = /apps\.apple\.com|apple\.com\/app\//i.test(url);
  const isPlay = /play\.google\.com|id=[A-Za-z0-9._]+/.test(url);
  const path = isApple ? '/api/connect/app-store-connect' : '/api/connect/google-play';
  const payload = isApple ? { appRef: url } : { packageName: url };
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Connection failed');
  return data.connection;
}

function buildTrackedApp(connection) {
  const metadata = connection.metadata || {};
  const appName = metadata.appName || connection.appName || 'Tracked app';
  const category = window.SHIPSHOT.normalizeCategory(metadata.primaryGenreName || metadata.subtitle || metadata.genres?.[0] || 'productivity');
  const country = connection.provider === 'google-play' ? 'US' : 'US';
  const seed = wrapHash(`${appName}-${category}`);
  const app = {
    id: `tracked-${Date.now().toString(36)}`,
    storeId: metadata.trackId ? String(metadata.trackId) : null,
    name: appName,
    developer: metadata.seller || metadata.developer || metadata.subtitle || 'Tracked app',
    category,
    icon: metadata.artwork || metadata.artworkUrl512 || metadata.artworkUrl100 || '',
    country,
    countryFlag: '🇺🇸',
    countryName: 'United States',
    storeUrl: connection.url,
    description: metadata.description || `${appName} is being tracked in Signal.`,
    downloads: wrapNumber(seed, 200, 900) * 1000,
    revenue: wrapNumber(seed + 7, 40, 900) * 100,
    reviews: wrapNumber(seed + 13, 10, 220) * 100,
    rating: Math.round((4.2 + ((seed % 6) / 10)) * 10) / 10,
    growth: Math.round((8 + (seed % 140) / 10) * 10) / 10,
    creators: wrapNumber(seed + 17, 0, 9),
    metaAds: wrapNumber(seed + 21, 0, 12),
    appleAds: wrapNumber(seed + 31, 0, 6),
    activeUsers: { mau: wrapNumber(seed + 41, 1, 8) * 1000, dau: wrapNumber(seed + 51, 180, 2400) },
    keywordCount: 27 + (seed % 520),
    subtitle: metadata.subtitle || '',
    screenshots: metadata.screenshots || [],
    ipadScreenshots: metadata.ipadScreenshots || [],
    genres: metadata.genres || [],
  };
  app.keywords = wrapExtractKeywordsFromMetadata(app, category);
  app.keywordCount = app.keywords.length;
  return app;
}

function wrapPublisherConnectionsFromWorkspace(workspace) {
  const value = workspace?.publisherConnections;
  return value && typeof value === 'object' ? value : {};
}

function wrapPublisherConnectionForApp(workspace, appId) {
  const connections = wrapPublisherConnectionsFromWorkspace(workspace);
  return appId ? connections[appId] || null : null;
}

function wrapCountryMeta(code) {
  return WRAP_COUNTRIES.find((item) => item.code === String(code || 'US').toUpperCase()) || WRAP_COUNTRIES.find((item) => item.code === 'US');
}

function wrapAsoKeywordSet(app) {
  if (!app || typeof app !== 'object') return [];
  return Array.from(new Set(wrapKeywordsForApp(app).map((item) => String(item.keyword || '').trim()).filter(Boolean))).slice(0, 12);
}

function wrapClampTitle(value, limit = 30) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, limit).trim();
}

function wrapBuildAsoMetadataExport(app) {
  const keywordSet = wrapAsoKeywordSet(app);
  const categoryLabel = wrapCategoryLabel(app?.category || 'productivity');
  const baseName = String(app?.name || 'Untitled').trim();
  const benefitTerms = keywordSet.filter((term) => !baseName.toLowerCase().includes(term.toLowerCase()));
  const titleCandidates = [
    `${baseName}: ${benefitTerms[0] || categoryLabel}`,
    `${baseName} - ${benefitTerms.slice(0, 2).join(' ')}`,
    `${baseName} ${benefitTerms[0] || ''}`.trim(),
    baseName,
  ].map((candidate) => wrapClampTitle(candidate, 30)).filter(Boolean);
  const subtitleCandidates = [
    `${benefitTerms.slice(0, 2).join(' · ')}`,
    `${categoryLabel} for ${benefitTerms[0] || 'daily use'}`,
    `${keywordSet.slice(0, 3).join(', ')}`,
    app?.subtitle || '',
  ].map((candidate) => wrapClampTitle(candidate, 30)).filter(Boolean);
  return {
    generatedAt: new Date().toISOString(),
    appId: app?.id || null,
    appName: baseName,
    title: titleCandidates[0] || baseName,
    subtitle: subtitleCandidates[0] || wrapClampTitle(categoryLabel, 30),
    alternateTitles: titleCandidates.slice(1, 4),
    alternateSubtitles: subtitleCandidates.slice(1, 4),
    keywords: keywordSet,
  };
}

function wrapReviewIssueLabel(review) {
  const text = `${review?.title || ''} ${review?.content || ''}`.toLowerCase();
  if (/(bug|crash|freeze|stuck|broken|issue|problem)/.test(text)) return 'stability';
  if (/(price|pay|subscription|billing|refund)/.test(text)) return 'pricing';
  if (/(slow|lag|delay|loading)/.test(text)) return 'performance';
  if (/(feature|wish|add|missing|need)/.test(text)) return 'feature request';
  return 'general feedback';
}

function wrapBuildReviewReplyDraft(app, review) {
  const rating = Number(review?.rating || 0);
  const issue = wrapReviewIssueLabel(review);
  const opening = rating >= 4
    ? `Thanks for the review on ${app?.name || 'the app'} and for highlighting what is already working well.`
    : `Thanks for taking the time to flag this issue in ${app?.name || 'the app'}.`;
  const middle = issue === 'feature request'
    ? 'We logged your request and are reviewing how it fits into the next product iterations.'
    : issue === 'pricing'
      ? 'We are reviewing the pricing experience to make it clearer and less frustrating.'
      : issue === 'stability'
        ? 'We are checking the stability issue and matching it against the current release build.'
        : issue === 'performance'
          ? 'We are looking into the performance issue and validating it against recent app updates.'
          : 'We are sharing this feedback with the team and reviewing the underlying flow.';
  return `${opening} ${middle} If you can share a bit more context such as device, OS version, and the exact flow that triggered it, that will help us resolve it faster.`;
}

function wrapParseBulkKeywords(input) {
  return Array.from(new Set(
    String(input || '')
      .split(/[\n,;\t]+/g)
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
  ));
}

function wrapBuildMyAppProject(workspace, trackedApp, setRoute, tab = 'exports') {
  if (!trackedApp) return null;
  const existing = (workspace?.projects || []).find((project) => project.appId === trackedApp.id);
  if (existing?.id) {
    setRoute?.({ screen: 'project', projectId: existing.id, tab });
    return existing.id;
  }
  const projectLabel = `${trackedApp.name} screenshots ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const result = window.SHIPSHOT?.createProjectFromInput?.(workspace, {
    projectName: projectLabel,
    appId: trackedApp.id,
    appName: trackedApp.name,
    appDescription: trackedApp.description || '',
    category: trackedApp.category || 'productivity',
    audience: 'General audience',
    country: trackedApp.country === 'US' ? 'en-US' : 'en-US',
    style: 't1',
    sourceType: 'app-store',
    sourceValue: trackedApp.storeUrl || '',
    sourceReference: trackedApp.storeUrl || '',
    sourceMetadata: {
      appName: trackedApp.name,
      description: trackedApp.description || '',
      subtitle: trackedApp.subtitle || '',
      developer: trackedApp.developer || '',
      icon: trackedApp.icon || '',
      rating: trackedApp.rating || 0,
      reviews: trackedApp.reviews || 0,
      category: trackedApp.category || 'productivity',
      country: trackedApp.country || 'US',
      screenshots: wrapScreenshotSets(trackedApp),
    },
  });
  if (!result?.workspace || !result?.project) return null;
  window.SHIPSHOT?.saveWorkspace?.(result.workspace);
  updateWrapWorkspace(() => result.workspace);
  setRoute?.({ screen: 'project', projectId: result.project.id, tab });
  return result.project.id;
}

function WrapEmptyState({ icon, title, body, action, actionLabel }) {
  const Icon = icon || window.I.Device;
  return (
    <div style={{ minHeight: 280, border: '1px dashed var(--border-1)', borderRadius: 20, display: 'grid', placeItems: 'center', textAlign: 'center', color: 'var(--text-3)', padding: 24 }}>
      <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
        <div style={{ width: 58, height: 58, borderRadius: 18, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon /></div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-2)' }}>{title}</div>
        <div style={{ maxWidth: 420, lineHeight: 1.6 }}>{body}</div>
        {action ? <button className="btn" onClick={action}>{actionLabel}</button> : null}
      </div>
    </div>
  );
}

function wrapIsMegaIncumbent(app) {
  const text = `${app?.name || ''} ${app?.developer || ''}`.toLowerCase();
  const blocked = [
    'youtube', 'instagram', 'whatsapp', 'facebook', 'messenger', 'snapchat', 'spotify', 'netflix',
    'tiktok', 'telegram', 'gmail', 'google', 'maps', 'uber', 'amazon', 'temu', 'shein', 'capcut',
    'x corp', 'twitter', 'discord', 'reddit', 'pinterest', 'linkedin', 'nytimes', 'new york times',
    'paypal', 'cash app',
  ];
  if (blocked.some((term) => text.includes(term))) return true;
  if (Number(app?.reviews || 0) >= 300000) return true;
  if (Number(app?.downloads || 0) >= 25000000) return true;
  if (Number(app?.revenue || 0) >= 15000000) return true;
  return false;
}

function wrapIsOpportunityCandidate(app, releaseLimit = null) {
  const releaseDays = wrapReleaseDays(app);
  const activityDays = releaseDays ?? wrapActivityDays(app);
  const updatedDays = wrapParseReleasedDays(wrapRelativeTime(app?.updatedAt, '9999d ago'));
  const reviews = Number(app?.reviews || 0);
  const downloads = Number(app?.downloads || 0);
  const growth = Number(app?.growth || 0);
  const category = String(app?.category || '').toLowerCase();

  if (wrapIsMegaIncumbent(app)) return false;
  if (activityDays == null) return false;
  if (releaseLimit != null && activityDays > releaseLimit) return false;
  if (activityDays > 720) return false;
  if (updatedDays != null && updatedDays > 240) return false;
  if (growth < 8) return false;
  if (reviews >= 60000) return false;
  if (downloads >= 8000000) return false;
  if (['news', 'social-networking', 'navigation', 'music'].includes(category) && activityDays > 180) return false;
  return true;
}

function wrapOpportunityScore(app) {
  const releaseDays = wrapReleaseDays(app) ?? 9999;
  const recencyScore = Math.max(0, 220 - Math.min(releaseDays, 220));
  const growthScore = Math.max(0, Number(app?.growth || 0)) * 4.5;
  const tractionScore = Math.min(120, Math.log10(Number(app?.downloads || 1) + 1) * 22);
  const revenueScore = Math.min(90, Math.log10(Number(app?.revenue || 1) + 1) * 18);
  const ratingScore = Math.max(0, (Number(app?.rating || 0) - 3.8) * 26);
  const reviewPenalty = Number(app?.reviews || 0) > 120000 ? 80 : Number(app?.reviews || 0) > 50000 ? 36 : 0;
  const giantPenalty = wrapIsMegaIncumbent(app) ? 240 : 0;
  return Math.round(recencyScore + growthScore + tractionScore + revenueScore + ratingScore - reviewPenalty - giantPenalty);
}

function wrapRankingDelta(app, previousItems = []) {
  const currentKey = String(app?.storeId || app?.id || '');
  if (!currentKey) return { delta: 0, direction: 'flat' };
  const previousIndex = (previousItems || []).findIndex((item) => {
    const previousKey = String(item?.storeId || item?.id || '');
    return previousKey === currentKey;
  });
  if (previousIndex < 0) return { delta: 0, direction: 'flat' };
  const currentRank = Number(app?.position || 0);
  const previousRank = previousIndex + 1;
  const raw = previousRank - currentRank;
  if (raw > 0) return { delta: raw, direction: 'up' };
  if (raw < 0) return { delta: Math.abs(raw), direction: 'down' };
  return { delta: 0, direction: 'flat' };
}

function WrapSectionTitle({ icon, title, body, right }) {
  const Icon = icon || window.I.Grid;
  return (
    <div className="ui-section-title">
      <div className="ui-section-title__lead">
        <div className="ui-section-title__icon">
          <Icon />
        </div>
        <div className="ui-section-title__copy">
          <h1>{title}</h1>
          {body ? <p>{body}</p> : null}
        </div>
      </div>
      {right}
    </div>
  );
}

function wrapRecommendationProfileFor(workspace, app) {
  if (!app) return null;
  const profiles = workspace?.appProfiles && typeof workspace.appProfiles === 'object' ? workspace.appProfiles : {};
  if (app.recommendationProfileId) {
    const profileById = Object.values(profiles).find((item) => item?.id === app.recommendationProfileId);
    if (profileById) return profileById;
  }
  if (app.signalProfile) return app.signalProfile;
  if (app.linkedAppId && profiles[app.linkedAppId]) return profiles[app.linkedAppId];
  if (profiles[app.id]) return profiles[app.id];
  const matched = Object.values(profiles).find((profile) => String(profile?.appName || '').toLowerCase() === String(app.name || '').toLowerCase());
  if (matched) return matched;
  return window.SHIPSHOT?.buildSignalAppProfile?.({
    appName: app.name,
    appDescription: app.description || app.subtitle || '',
    category: app.category,
    sourceType: app.sourceType || (app.storeId ? 'app-store' : 'prompt'),
    sourceMetadata: {
      appName: app.name,
      description: app.description || '',
      subtitle: app.subtitle || '',
      category: app.category,
      storeId: app.storeId || '',
      storeUrl: app.storeUrl || '',
      developer: app.developer || '',
    },
  }) || null;
}

function WrapRecommendationPanel({ workspace, app, title = 'Recommended next moves' }) {
  const profile = wrapRecommendationProfileFor(workspace, app);
  if (!profile) return null;

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
            Based on {profile.sourceType === 'idea' ? 'your idea brief' : 'your app metadata'}.
          </div>
        </div>
        {profile.category ? <span className="chip accent">{wrapCategoryShort(profile.category)}</span> : null}
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {Array.isArray(profile.recommendations?.keywords) && profile.recommendations.keywords.length ? (
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Seed keywords</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {profile.recommendations.keywords.slice(0, 8).map((keyword) => <span key={keyword} className="chip">{keyword}</span>)}
            </div>
          </div>
        ) : null}
        {profile.recommendations?.positioning ? (
          <div style={{ padding: 12, borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border-1)', fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-1)' }}>Positioning:</strong> {profile.recommendations.positioning}
          </div>
        ) : null}
        <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            ['Keywords', profile.recommendations?.keywordExplorer?.[0]],
            ['ASO', profile.recommendations?.aso?.[0]],
            ['Screens', profile.recommendations?.screenshots?.[0]],
            ['Competitors', profile.recommendations?.competitors?.[0]],
          ].filter(([, value]) => value).map(([label, value]) => (
            <div key={label} style={{ padding: 12, borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border-1)' }}>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function wrapOnboardingIdeaName(value) {
  const text = String(value || '').trim().replace(/\s+/g, ' ');
  if (!text) return '';
  const words = text.split(' ').slice(0, 3).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  return words.join(' ');
}

function WrapOnboardingScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const { APP_CATEGORIES = [], COUNTRIES = [], TEMPLATES = [] } = window.DATA;
  const [mode, setMode] = React.useState('existing');
  const [country, setCountry] = React.useState('en-US');
  const [projectName, setProjectName] = React.useState('');
  const [audience, setAudience] = React.useState('Core users with a repeated weekly pain point');
  const [appUrl, setAppUrl] = React.useState('');
  const [connectedApp, setConnectedApp] = React.useState(null);
  const [loadingConnection, setLoadingConnection] = React.useState(false);
  const [importSteps, setImportSteps] = React.useState([
    { label: 'Connecting to App Store', status: 'pending' },
    { label: 'Fetching app metadata', status: 'pending' },
    { label: 'Loading app icon and screenshots', status: 'pending' },
    { label: 'Analyzing app description', status: 'pending' },
    { label: 'Extracting keywords and categories', status: 'pending' },
    { label: 'Importing reviews and ratings', status: 'pending' },
    { label: 'Finalizing import', status: 'pending' },
  ]);
  const [ideaName, setIdeaName] = React.useState('');
  const [ideaText, setIdeaText] = React.useState('');
  const [ideaCategory, setIdeaCategory] = React.useState(APP_CATEGORIES[0]?.id || 'productivity');
  const [ideaValidation, setIdeaValidation] = React.useState(null);
  const [loadingValidation, setLoadingValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (connectedApp?.appName) {
      setProjectName((current) => current || `${connectedApp.appName} launch`);
    }
  }, [connectedApp?.appName]);

  React.useEffect(() => {
    if (ideaValidation?.idea && !ideaName.trim()) {
      setIdeaName(wrapOnboardingIdeaName(ideaValidation.idea));
    }
  }, [ideaValidation, ideaName]);

  const connectExistingApp = async () => {
    if (!appUrl.trim()) return;
    setLoadingConnection(true);
    setError('');

    // Reset steps
    setImportSteps([
      { label: 'Connecting to App Store', status: 'loading' },
      { label: 'Fetching app metadata', status: 'pending' },
      { label: 'Loading app icon and screenshots', status: 'pending' },
      { label: 'Analyzing app description', status: 'pending' },
      { label: 'Extracting keywords and categories', status: 'pending' },
      { label: 'Importing reviews and ratings', status: 'pending' },
      { label: 'Finalizing import', status: 'pending' },
    ]);

    // Animate steps progressively
    const animateSteps = async () => {
      const delays = [300, 500, 400, 450, 400, 500, 300];
      for (let i = 0; i < delays.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delays[i]));
        setImportSteps(prev => prev.map((step, idx) => {
          if (idx < i) return { ...step, status: 'completed' };
          if (idx === i) return { ...step, status: 'loading' };
          return step;
        }));
      }
      // Mark last step as completed
      await new Promise(resolve => setTimeout(resolve, 300));
      setImportSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
    };

    try {
      const stepAnimation = animateSteps();
      const connection = await wrapConnectApp(appUrl.trim());
      await stepAnimation; // Wait for animation to finish
      setConnectedApp(connection);
      setProjectName((current) => current || `${connection.appName || connection.metadata?.appName || 'App'} launch`);
    } catch (nextError) {
      setError(nextError?.message || 'Could not import app metadata');
    } finally {
      setLoadingConnection(false);
    }
  };

  const validateIdea = async () => {
    if (!ideaText.trim()) return;
    setLoadingValidation(true);
    setError('');
    try {
      const response = await fetch('/api/idea-validator/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: ideaText.trim() }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || 'Idea validation failed');
      setIdeaValidation(payload);
      if (payload.category) {
        const match = APP_CATEGORIES.find((item) => String(item.label || '').toLowerCase() === String(payload.category).toLowerCase());
        if (match) setIdeaCategory(match.id);
      }
      setProjectName((current) => current || `${wrapOnboardingIdeaName(ideaText) || 'New app'} launch`);
    } catch (nextError) {
      setError(nextError?.message || 'Idea validation failed');
    } finally {
      setLoadingValidation(false);
    }
  };

  const completeOnboarding = () => {
    const sourceType = mode === 'existing'
      ? (connectedApp?.sourceType === 'google-play' ? 'google-play' : 'app-store')
      : 'idea';
    const appName = mode === 'existing'
      ? (connectedApp?.metadata?.appName || connectedApp?.appName || '')
      : ideaName.trim();
    if (!appName) {
      setError(mode === 'existing' ? 'Import an app first.' : 'Name the app idea before continuing.');
      return;
    }
    if (mode === 'idea' && !ideaText.trim()) {
      setError('Describe the idea before continuing.');
      return;
    }

    const sourceMetadata = mode === 'existing'
      ? {
          ...(connectedApp?.metadata || {}),
          appName,
          developer: connectedApp?.metadata?.developer || connectedApp?.metadata?.seller || '',
          icon: connectedApp?.metadata?.artworkUrl512 || connectedApp?.metadata?.artwork || connectedApp?.metadata?.artworkUrl100 || '',
          category: connectedApp?.metadata?.primaryGenreName || '',
          storeUrl: connectedApp?.url || '',
          storeId: connectedApp?.appId || connectedApp?.metadata?.trackId || '',
        }
      : {
          appName,
          description: ideaText.trim(),
          category: ideaCategory,
          ideaValidation,
        };

    setSubmitting(true);
    setError('');
    try {
      const appProfile = window.SHIPSHOT.buildSignalAppProfile({
        appName,
        appDescription: mode === 'existing' ? (sourceMetadata.description || '') : ideaText.trim(),
        category: mode === 'existing' ? (sourceMetadata.category || ideaCategory) : ideaCategory,
        audience,
        country,
        sourceType,
        sourceValue: mode === 'existing' ? (sourceMetadata.description || sourceMetadata.subtitle || '') : ideaText.trim(),
        sourceReference: mode === 'existing' ? (connectedApp?.url || appUrl.trim()) : '',
        sourceMetadata,
        ideaValidation,
      });
      const created = window.SHIPSHOT.createProjectFromInput(workspace, {
        projectName: projectName.trim() || `${appName} launch`,
        appName,
        appDescription: mode === 'existing' ? (sourceMetadata.description || sourceMetadata.subtitle || '') : ideaText.trim(),
        category: mode === 'existing' ? (sourceMetadata.category || ideaCategory) : ideaCategory,
        country,
        audience,
        sourceType,
        sourceValue: mode === 'existing' ? (sourceMetadata.description || sourceMetadata.subtitle || '') : ideaText.trim(),
        sourceReference: mode === 'existing' ? (connectedApp?.url || appUrl.trim()) : '',
        sourceMetadata,
        style: TEMPLATES[0]?.id || 't1',
        screenCount: 6,
        createTrackedApp: true,
        appProfile,
      });
      updateWrapWorkspace(() => ({
        ...created.workspace,
        onboarding: {
          completed: true,
          completedAt: new Date().toISOString(),
          source: sourceType,
          appId: created.app.id,
          projectId: created.project.id,
        },
      }));
      setRoute({ screen: 'project', projectId: created.project.id, tab: 'overview' });
    } catch (nextError) {
      setError(nextError?.message || 'Could not finish onboarding');
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
  };

  return (
    <div style={{ width: 'min(1180px, 100%)', margin: '0 auto', padding: '28px 24px 60px' }}>
      <WrapSectionTitle icon={window.I.Sparkles} title="Set up Signal" body="Create one app and one project first. Signal will use that context across keywords, ASO, screenshots, and competitors." />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: 18 }}>
        <div className="card" style={{ padding: 20, display: 'grid', gap: 18 }}>
          <div className="seg" style={{ width: 'fit-content' }}>
            <button className={mode === 'existing' ? 'on' : ''} onClick={() => setMode('existing')}>I already have an app</button>
            <button className={mode === 'idea' ? 'on' : ''} onClick={() => setMode('idea')}>I only have an idea</button>
          </div>

          {mode === 'existing' ? (
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <Label>App Store or Google Play URL</Label>
                <input className="input" value={appUrl} onChange={(event) => setAppUrl(event.target.value)} placeholder="https://apps.apple.com/... or https://play.google.com/store/apps/details?id=..." />
              </div>
              <button className="btn primary" onClick={connectExistingApp} disabled={loadingConnection || !appUrl.trim()}>
                {loadingConnection ? 'Importing metadata…' : 'Import app metadata'}
              </button>
              {connectedApp ? (
                <div className="card" style={{ padding: 14, background: 'var(--bg-2)', border: '1px solid var(--border-1)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{connectedApp.metadata?.appName || connectedApp.appName}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
                    {connectedApp.metadata?.developer || connectedApp.metadata?.seller || 'Store listing'} · {connectedApp.metadata?.primaryGenreName || 'App'}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 10 }}>
                    {connectedApp.metadata?.description || connectedApp.metadata?.subtitle || 'Metadata imported successfully.'}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              <div>
                <Label>App idea</Label>
                <textarea
                  className="input"
                  value={ideaText}
                  onChange={(event) => setIdeaText(event.target.value)}
                  placeholder="Describe the user, the pain, the workflow, and why this should exist."
                  style={{ minHeight: 150, resize: 'vertical', paddingTop: 12, paddingBottom: 12 }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <Label>App name</Label>
                  <input className="input" value={ideaName} onChange={(event) => setIdeaName(event.target.value)} placeholder="Signal-worthy app name" />
                </div>
                <div>
                  <Label>Category</Label>
                  <select className="input" value={ideaCategory} onChange={(event) => setIdeaCategory(event.target.value)}>
                    {APP_CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn primary" onClick={validateIdea} disabled={loadingValidation || ideaText.trim().length < 60}>
                {loadingValidation ? 'Running Idea Validator…' : 'Run Idea Validator'}
              </button>
              {ideaValidation ? (
                <div className="card" style={{ padding: 14, background: 'var(--bg-2)', border: '1px solid var(--border-1)', display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{ideaValidation.summary?.verdict || 'Idea validated'}</div>
                    {ideaValidation.scores?.overall ? <span className="chip accent">{ideaValidation.scores.overall}</span> : null}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{ideaValidation.summary?.opportunity || ideaValidation.idea}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {(ideaValidation.recommendations || []).slice(0, 3).map((item) => <span key={item} className="chip">{item}</span>)}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label>Project name</Label>
              <input className="input" value={projectName} onChange={(event) => setProjectName(event.target.value)} placeholder="Launch project name" />
            </div>
            <div>
              <Label>Locale</Label>
              <select className="input" value={country} onChange={(event) => setCountry(event.target.value)}>
                {COUNTRIES.map((item) => <option key={item.code} value={item.code}>{item.flag} {item.language} · {item.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label>Audience</Label>
            <input className="input" value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="Who is this for?" />
          </div>
          {error ? <div style={{ color: '#f87171', fontSize: 13 }}>{error}</div> : null}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.6 }}>
              Signal will create the app record, a tracked app profile, and a first project in one step.
            </div>
            <button className="btn primary" onClick={completeOnboarding} disabled={submitting || (mode === 'existing' ? !connectedApp : !ideaText.trim() || !ideaName.trim())}>
              {submitting ? 'Creating workspace…' : 'Create app + project'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 18 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>What Signal will unlock next</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                'Seed keywords in App Tracking and Keyword Explorer.',
                'ASO suggestions based on listing metadata or your idea brief.',
                'Competitor and screenshot guidance tied to the same app context.',
              ].map((item) => (
                <div key={item} style={{ padding: 12, borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--border-1)', fontSize: 13, lineHeight: 1.6 }}>{item}</div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 8 }}>Required setup</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 10 }}>One app. One project. Then the rest of the product makes sense.</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>
              Even if the app does not exist yet, Signal needs a concrete app profile to generate keywords, positioning, screenshot angles, and competitor benchmarks consistently.
            </div>
          </div>
        </div>
      </div>

      {/* Import Progress Modal */}
      {loadingConnection && (
        <ImportProgressModal
          appName={connectedApp?.appName || connectedApp?.metadata?.appName || 'Your App'}
          appIcon={connectedApp?.metadata?.artworkUrl512 || connectedApp?.metadata?.artworkUrl100}
          steps={importSteps}
        />
      )}
    </div>
  );
}

function wrapOptionText(option) {
  return `${option.label || option.name || option.value || ''} ${option.code || ''}`.trim();
}

function WrapFilterMenu({
  label,
  options,
  selected,
  onToggle,
  onSelect,
  multi = false,
  placeholder = 'Select',
  width = '100%',
}) {
  const [open, setOpen] = React.useState(false);
  const [buffer, setBuffer] = React.useState('');
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const handleClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
        setBuffer('');
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  React.useEffect(() => {
    if (!buffer) return undefined;
    const timeout = window.setTimeout(() => setBuffer(''), 700);
    return () => window.clearTimeout(timeout);
  }, [buffer]);

  const selectedValues = multi ? (Array.isArray(selected) ? selected : []) : [selected].filter(Boolean);
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
  const buttonLabel = multi
    ? (selectedOptions.length ? `${label} · ${selectedOptions.length}` : placeholder)
    : (selectedOptions[0]?.label || placeholder);
  const visibleOptions = buffer
    ? options.filter((option) => wrapOptionText(option).toLowerCase().startsWith(buffer.toLowerCase()))
    : options;

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      setBuffer('');
      return;
    }
    if (event.key === 'Backspace') {
      setBuffer((current) => current.slice(0, -1));
      return;
    }
    if (event.key.length === 1 && /\S/.test(event.key)) {
      if (!open) setOpen(true);
      setBuffer((current) => `${current}${event.key}`);
    }
  };

  return (
    <div ref={rootRef} className="ui-dropdown" style={{ width }} onKeyDown={handleKeyDown}>
      <button className="input ui-dropdown__trigger" type="button" onClick={() => setOpen((value) => !value)}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{buttonLabel}</span>
        <window.I.ChevronD />
      </button>
      {open ? (
        <div className="ui-dropdown__menu">
          <div className="ui-dropdown__list">
            {visibleOptions.map((option) => {
              const active = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`ui-dropdown__option${active ? ' is-active' : ''}`}
                  onClick={() => {
                    if (multi) {
                      onToggle(option.value);
                    } else {
                      onSelect(option.value);
                      setOpen(false);
                    }
                  }}
                >
                  <span>{option.label}</span>
                  {active ? (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'var(--accent-soft)',
                        border: '1px solid var(--accent-ring)',
                        color: 'var(--accent)',
                        flexShrink: 0,
                      }}
                    >
                      <window.I.Check style={{ width: 12, height: 12 }} />
                    </span>
                  ) : null}
                </button>
              );
            })}
            {!visibleOptions.length ? <div style={{ padding: '10px 12px', color: 'var(--text-3)', fontSize: 12 }}>No match</div> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function WrapSearchScreen({ setRoute }) {
  const appleCategories = window.DATA.APP_CATEGORIES || [];
  const categoryOptions = appleCategories.map((item) => ({ value: item.id, label: `${item.emoji} ${item.label}` }));
  const countryOptions = [{ value: 'ALL', label: '🌐 All countries', code: 'ALL' }, ...WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}`, code: item.code }))];
  const defaultExploreCountries = ['US', 'GB', 'CA', 'AU', 'FR', 'DE', 'JP', 'IN', 'BR', 'KR'];
  const savedExploreUiRef = React.useRef(null);
  const initialExploreCacheRef = React.useRef(window.__wrapExploreStateCache || null);
  if (savedExploreUiRef.current == null) {
    try {
      savedExploreUiRef.current = JSON.parse(localStorage.getItem('wrap-explore-ui') || 'null');
    } catch {
      savedExploreUiRef.current = null;
    }
  }
  const savedExploreUi = savedExploreUiRef.current;
  const savedExploreCache = initialExploreCacheRef.current;
  const sortOptions = [
    { id: 'name', label: 'App' },
    { id: 'category', label: 'Category' },
    { id: 'growth', label: 'Growth 7D' },
    { id: 'rating', label: 'Rating' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'revenue', label: 'MRR' },
    { id: 'releasedAt', label: 'Released' },
  ];
  const [query, setQuery] = React.useState(savedExploreUi?.query || '');
  const [released, setReleased] = React.useState(savedExploreUi?.released || 'Any');
  const [updated, setUpdated] = React.useState(savedExploreUi?.updated || 'Any');
  const [selectedCategories, setSelectedCategories] = React.useState(Array.isArray(savedExploreUi?.selectedCategories) ? savedExploreUi.selectedCategories : []);
  const [includedCountries, setIncludedCountries] = React.useState(Array.isArray(savedExploreUi?.includedCountries) && savedExploreUi.includedCountries.length ? savedExploreUi.includedCountries : defaultExploreCountries);
  const [excludedCountries, setExcludedCountries] = React.useState(Array.isArray(savedExploreUi?.excludedCountries) ? savedExploreUi.excludedCountries : []);
  const [marketingFilters, setMarketingFilters] = React.useState(Array.isArray(savedExploreUi?.marketingFilters) ? savedExploreUi.marketingFilters : []);
  const [priceFilter, setPriceFilter] = React.useState(savedExploreUi?.priceFilter || 'All');
  const [ratingMin, setRatingMin] = React.useState(savedExploreUi?.ratingMin || '');
  const [ratingMax, setRatingMax] = React.useState(savedExploreUi?.ratingMax || '');
  const [reviewsMin, setReviewsMin] = React.useState(savedExploreUi?.reviewsMin || '');
  const [reviewsMax, setReviewsMax] = React.useState(savedExploreUi?.reviewsMax || '');
  const [downloadsMin, setDownloadsMin] = React.useState(savedExploreUi?.downloadsMin || '');
  const [downloadsMax, setDownloadsMax] = React.useState(savedExploreUi?.downloadsMax || '');
  const [revenueMin, setRevenueMin] = React.useState(savedExploreUi?.revenueMin || '');
  const [revenueMax, setRevenueMax] = React.useState(savedExploreUi?.revenueMax || '');
  const [page, setPage] = React.useState(savedExploreUi?.page || 1);
  const [sortBy, setSortBy] = React.useState(savedExploreUi?.sortBy || 'releasedAt');
  const [sortDirection, setSortDirection] = React.useState(savedExploreUi?.sortDirection || 'desc');
  const [exploreState, setExploreState] = React.useState(savedExploreCache?.state || { items: [], loading: false, error: '', cursor: 0, done: false, totalSources: 0 });
  const [selectedForComparison, setSelectedForComparison] = React.useState([]);
  const [showComparison, setShowComparison] = React.useState(false);
  const [presets, setPresets] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wrap-explore-presets') || '[]');
    } catch {
      return [];
    }
  });
  const [pendingDeletePreset, setPendingDeletePreset] = React.useState(null);
  const [showPresetModal, setShowPresetModal] = React.useState(false);
  const [presetName, setPresetName] = React.useState('');

  const saveCurrentAsPreset = () => {
    if (!presetName.trim()) return;
    const newPreset = {
      id: Date.now(),
      name: presetName.trim(),
      filters: {
        released, updated, selectedCategories, includedCountries, excludedCountries,
        marketingFilters, priceFilter, ratingMin, ratingMax, reviewsMin, reviewsMax,
        downloadsMin, downloadsMax, revenueMin, revenueMax
      }
    };
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem('wrap-explore-presets', JSON.stringify(updated));
    setShowPresetModal(false);
    setPresetName('');
  };

  const loadPreset = (preset) => {
    const f = preset.filters;
    setReleased(f.released || 'Any');
    setUpdated(f.updated || 'Any');
    setSelectedCategories(f.selectedCategories || []);
    setIncludedCountries(f.includedCountries || defaultExploreCountries);
    setExcludedCountries(f.excludedCountries || []);
    setMarketingFilters(f.marketingFilters || []);
    setPriceFilter(f.priceFilter || 'All');
    setRatingMin(f.ratingMin || '');
    setRatingMax(f.ratingMax || '');
    setReviewsMin(f.reviewsMin || '');
    setReviewsMax(f.reviewsMax || '');
    setDownloadsMin(f.downloadsMin || '');
    setDownloadsMax(f.downloadsMax || '');
    setRevenueMin(f.revenueMin || '');
    setRevenueMax(f.revenueMax || '');
  };

  const deletePreset = (presetId) => {
    const updated = presets.filter((p) => p.id !== presetId);
    setPresets(updated);
    localStorage.setItem('wrap-explore-presets', JSON.stringify(updated));
  };

  const toggleAppForComparison = (app) => {
    setSelectedForComparison((current) => {
      const exists = current.find((a) => a.id === app.id);
      if (exists) return current.filter((a) => a.id !== app.id);
      if (current.length >= 5) return current;
      return [...current, app];
    });
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((current) => current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId]);
  };
  const toggleMarketingFilter = (filterId) => {
    setMarketingFilters((current) => current.includes(filterId) ? current.filter((id) => id !== filterId) : [...current, filterId]);
  };

  const toggleIncludedCountry = (countryCode) => {
    if (countryCode === 'ALL') {
      setIncludedCountries((current) => current.includes('ALL') ? ['US'] : ['ALL']);
      setExcludedCountries([]);
      return;
    }
    setIncludedCountries((current) => {
      const withoutAll = current.filter((code) => code !== 'ALL');
      return withoutAll.includes(countryCode) ? withoutAll.filter((code) => code !== countryCode) : [...withoutAll, countryCode];
    });
    setExcludedCountries((current) => current.filter((code) => code !== countryCode));
  };

  const toggleExcludedCountry = (countryCode) => {
    if (countryCode === 'ALL') {
      setExcludedCountries((current) => current.includes('ALL') ? [] : ['ALL']);
      setIncludedCountries([]);
      return;
    }
    setExcludedCountries((current) => current.includes(countryCode) ? current.filter((code) => code !== countryCode) : [...current, countryCode]);
    setIncludedCountries((current) => current.filter((code) => code !== countryCode));
  };

  const minRatingValue = wrapNumberInput(ratingMin);
  const maxRatingValue = wrapNumberInput(ratingMax);
  const minReviewsValue = wrapNumberInput(reviewsMin);
  const maxReviewsValue = wrapNumberInput(reviewsMax);
  const minDownloadsValue = wrapNumberInput(downloadsMin);
  const maxDownloadsValue = wrapNumberInput(downloadsMax);
  const minRevenueValue = wrapNumberInput(revenueMin);
  const maxRevenueValue = wrapNumberInput(revenueMax);
  const fetchCountries = includedCountries.includes('ALL') ? WRAP_COUNTRIES.map((item) => item.code) : (includedCountries.length ? includedCountries : defaultExploreCountries);
  const countryKey = fetchCountries.join(',');
  const hasSavedExploreCache = savedExploreCache?.countryKey === countryKey && Array.isArray(savedExploreCache?.state?.items) && savedExploreCache.state.items.length > 0;
  const [exploreRequested, setExploreRequested] = React.useState(hasSavedExploreCache);
  const exploreStateRef = React.useRef(exploreState);

  React.useEffect(() => {
    exploreStateRef.current = exploreState;
  }, [exploreState]);

  React.useEffect(() => {
    try {
      localStorage.setItem('wrap-explore-ui', JSON.stringify({
        query,
        released,
        updated,
        selectedCategories,
        includedCountries,
        excludedCountries,
        marketingFilters,
        priceFilter,
        ratingMin,
        ratingMax,
        reviewsMin,
        reviewsMax,
        downloadsMin,
        downloadsMax,
        revenueMin,
        revenueMax,
        page,
        sortBy,
        sortDirection,
      }));
    } catch {}
  }, [query, released, updated, selectedCategories, includedCountries, excludedCountries, marketingFilters, priceFilter, ratingMin, ratingMax, reviewsMin, reviewsMax, downloadsMin, downloadsMax, revenueMin, revenueMax, page, sortBy, sortDirection]);

  const loadExploreBatch = React.useCallback(async (reset = false, burst = 1) => {
    if (query.trim()) return;
    if (!reset && exploreStateRef.current.loading) return;
    setExploreRequested(true);
    setExploreState((current) => ({
      ...current,
      loading: true,
      error: '',
      ...(reset ? { items: [], cursor: 0, done: false, totalSources: 0 } : {}),
    }));

    const snapshot = exploreStateRef.current;
    let nextCursor = reset ? 0 : snapshot.cursor;
    let accumulated = reset ? [] : snapshot.items;
    let done = reset ? false : snapshot.done;
    let totalSources = reset ? 0 : snapshot.totalSources;

    try {
      for (let index = 0; index < burst; index += 1) {
        if (done) break;
        // Keep chunks moderate so the UI stays responsive while still reaching thousands quickly.
        // eslint-disable-next-line no-await-in-loop
        const response = await fetch(`/api/apple/explore?countries=${encodeURIComponent(countryKey)}&cursor=${nextCursor}&chunk=4&limit=100`);
        const data = await wrapReadJsonResponse(response);
        if (!response.ok) throw new Error(data.error || 'Could not load live App Store feed');
        const nextItems = (data.results || []).map((item) => wrapLiveAppWithMetrics(item));
        accumulated = wrapDedupeLiveApps([...accumulated, ...nextItems]);
        nextCursor = Number(data.nextCursor || 0);
        done = !!data.done;
        totalSources = Number(data.totalSources || totalSources || 0);
        if (accumulated.length >= 3200) break;
      }

      setExploreState({
        items: accumulated,
        loading: false,
        error: '',
        cursor: nextCursor,
        done,
        totalSources,
      });
    } catch (error) {
      setExploreState((current) => ({
        ...current,
        loading: false,
        error: error?.message || 'Could not load live App Store feed',
      }));
    }
  }, [query, countryKey]);

  React.useEffect(() => {
    window.__wrapExploreStateCache = {
      countryKey,
      state: exploreState,
    };
  }, [countryKey, exploreState]);

  React.useEffect(() => {
    if (query.trim()) return;
    if (hasSavedExploreCache) {
      setExploreRequested(true);
      return;
    }
    setExploreRequested(false);
    setExploreState({ items: [], loading: false, error: '', cursor: 0, done: false, totalSources: 0 });
  }, [countryKey, hasSavedExploreCache, query]);

  // Use search API only when user searches, otherwise use cache
  const { items: searchResults, loading: searchLoading, error } = useWrapLiveListing({
    countries: fetchCountries,
    query: query.trim(),
    chart: 'top-free',
    limit: 200,
    enabled: query.trim().length >= 2,
  });

  const isSearching = Boolean(query.trim());
  const shouldShowExploreFeed = !isSearching && (exploreRequested || exploreState.items.length > 0);
  const liveRows = isSearching ? searchResults : (shouldShowExploreFeed ? exploreState.items : []);
  const loading = isSearching ? searchLoading : (shouldShowExploreFeed ? exploreState.loading : false);
  const liveError = isSearching ? error : (shouldShowExploreFeed ? exploreState.error : '');

  React.useEffect(() => { setPage(1); }, [query, released, updated, selectedCategories.join(','), includedCountries.join(','), excludedCountries.join(','), marketingFilters.join(','), priceFilter, ratingMin, ratingMax, reviewsMin, reviewsMax, downloadsMin, downloadsMax, revenueMin, revenueMax]);
  const handleSort = (nextSortBy) => {
    if (sortBy === nextSortBy) {
      setSortDirection((current) => current === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortBy(nextSortBy);
    setSortDirection(nextSortBy === 'name' || nextSortBy === 'category' ? 'asc' : 'desc');
  };
  const sortMultiplier = sortDirection === 'asc' ? 1 : -1;
  const compareExploreRows = (a, b) => {
    if (sortBy === 'name') return sortMultiplier * String(a.name || '').localeCompare(String(b.name || ''));
    if (sortBy === 'category') return sortMultiplier * String(wrapCategoryShort(a.category) || '').localeCompare(String(wrapCategoryShort(b.category) || ''));
    if (sortBy === 'growth') return sortMultiplier * (Number(a.growth || 0) - Number(b.growth || 0));
    if (sortBy === 'rating') return sortMultiplier * (Number(a.rating || 0) - Number(b.rating || 0));
    if (sortBy === 'reviews') return sortMultiplier * (Number(a.reviews || 0) - Number(b.reviews || 0));
    if (sortBy === 'downloads') return sortMultiplier * (Number(a.downloads || 0) - Number(b.downloads || 0));
    if (sortBy === 'revenue') return sortMultiplier * (Number(a.revenue || 0) - Number(b.revenue || 0));
    if (sortBy === 'releasedAt') {
      const aDate = Date.parse(a.updatedAt || a.releasedAt || 0) || 0;
      const bDate = Date.parse(b.updatedAt || b.releasedAt || 0) || 0;
      return sortMultiplier * (aDate - bDate);
    }
    return 0;
  };

  const rows = liveRows.filter((app) => {
    const haystack = `${app.name} ${app.developer} ${app.description}`.toLowerCase();
    if (query && !haystack.includes(query.toLowerCase())) return false;
    if (selectedCategories.length && !selectedCategories.includes(app.category)) return false;
    if (excludedCountries.includes('ALL')) return false;
    if (includedCountries.length && !includedCountries.includes('ALL') && !includedCountries.includes(app.country)) return false;
    if (excludedCountries.includes(app.country)) return false;
    if (priceFilter === 'Free' && Number(app.price || 0) > 0) return false;
    if (priceFilter === 'Paid' && Number(app.price || 0) <= 0) return false;
    if (marketingFilters.includes('creators') && Number(app.creators || 0) <= 0) return false;
    if (marketingFilters.includes('metaAds') && Number(app.metaAds || 0) <= 0) return false;
    if (marketingFilters.includes('appleAds') && Number(app.appleAds || 0) <= 0) return false;
    if (minRatingValue != null && Number(app.rating) < minRatingValue) return false;
    if (maxRatingValue != null && Number(app.rating) > maxRatingValue) return false;
    if (minReviewsValue != null && Number(app.reviews) < minReviewsValue) return false;
    if (maxReviewsValue != null && Number(app.reviews) > maxReviewsValue) return false;
    if (minDownloadsValue != null && Number(app.downloads) < minDownloadsValue) return false;
    if (maxDownloadsValue != null && Number(app.downloads) > maxDownloadsValue) return false;
    if (minRevenueValue != null && Number(app.revenue) < minRevenueValue) return false;
    if (maxRevenueValue != null && Number(app.revenue) > maxRevenueValue) return false;
    if (released !== 'Any') {
      const maxDays = Number(String(released).replace('d', ''));
      const releaseDays = wrapReleaseDays(app);
      if (releaseDays == null) return false; // Exclude apps without release date
      if (releaseDays > maxDays) return false;
    }
    if (updated !== 'Any') {
      const maxDays = Number(String(updated).replace('d', ''));
      const updatedDays = wrapActivityDays(app);
      if (updatedDays == null) return false; // Exclude apps without update date
      if (updatedDays > maxDays) return false;
    }
    return true;
  }).sort((a, b) => {
    const primary = compareExploreRows(a, b);
    if (primary !== 0) return primary;
    return Number(b.reviews || 0) - Number(a.reviews || 0) || Number(b.rating || 0) - Number(a.rating || 0);
  });
  const pagedRows = rows.slice((page - 1) * 50, page * 50);

  return (
    <div style={{ padding: '28px 24px 48px', display: 'grid', gridTemplateColumns: '280px minmax(0,1fr)', gap: 20, maxWidth: 1400, margin: '0 auto' }}>
      <WrapConfirmModal
        open={Boolean(pendingDeletePreset)}
        title="Delete Preset"
        body={pendingDeletePreset ? `Delete "${pendingDeletePreset.name}" from saved presets?` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingDeletePreset(null)}
        onConfirm={() => {
          if (pendingDeletePreset) deletePreset(pendingDeletePreset.id);
          setPendingDeletePreset(null);
        }}
      />
      <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Filters</div>
          <button className="btn sm" onClick={() => setShowPresetModal(true)}>Save Preset</button>
        </div>
        {presets.length > 0 && (
          <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Saved Presets</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {presets.map((preset) => (
                <div key={preset.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="btn sm" style={{ flex: 1, justifyContent: 'flex-start' }} onClick={() => loadPreset(preset)}>{preset.name}</button>
                  <button className="btn sm" onClick={() => setPendingDeletePreset(preset)} style={{ width: 32, padding: 0 }} title={`Delete ${preset.name}`} aria-label={`Delete ${preset.name}`}>
                    <window.I.Trash style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {loading && !query && (
          <div className="card" style={{ padding: 12, background: 'var(--accent-soft)', fontSize: 12 }}>
            <div style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 4 }}>Loading live App Store feed…</div>
            <div style={{ color: 'var(--text-3)' }}>Streaming storefront charts in real time across {fetchCountries.length} countries.</div>
          </div>
        )}
        {!query && !loading && !exploreState.items.length && (
          <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.01)', fontSize: 12 }}>
            <div style={{ color: 'var(--text-2)', fontWeight: 600, marginBottom: 4 }}>Live feed on demand</div>
            <div style={{ color: 'var(--text-3)' }}>Nothing loads here until you ask for it. Search an app, or start the live crawl only when needed.</div>
            <button className="btn sm" style={{ marginTop: 10 }} onClick={() => loadExploreBatch(true, 2)}>
              Load live feed
            </button>
          </div>
        )}
        {exploreState.items.length > 0 && !query && (
          <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.01)', fontSize: 12 }}>
            <div style={{ color: 'var(--text-2)', fontWeight: 600 }}>{exploreState.items.length.toLocaleString()} live apps loaded</div>
            <div style={{ color: 'var(--text-3)', fontSize: 11, marginTop: 2 }}>
              {exploreState.done ? 'Reached the current live source set.' : `Live crawl in progress • source ${Math.min(exploreState.cursor, exploreState.totalSources || exploreState.cursor)} / ${exploreState.totalSources || '…'}`}
            </div>
            <button className="btn sm" style={{ marginTop: 10 }} onClick={() => loadExploreBatch(true, 2)} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh live feed'}
            </button>
          </div>
        )}
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Released within</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Any', '7d', '14d', '30d', '60d', '90d', '180d', '365d'].map((item) => <button key={item} className={`btn sm ${released === item ? 'primary' : ''}`} onClick={() => setReleased(item)}>{item}</button>)}
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Updates</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Any', '7d', '14d', '30d', '60d', '90d', '180d', '365d'].map((item) => <button key={item} className={`btn sm ${updated === item ? 'primary' : ''}`} onClick={() => setUpdated(item)}>{item}</button>)}
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Category</div>
          <WrapFilterMenu label="Category" options={categoryOptions} selected={selectedCategories} onToggle={toggleCategory} multi placeholder="Select categories" />
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Marketing</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[{ id: 'creators', label: 'Creators' }, { id: 'metaAds', label: 'Meta Ads' }, { id: 'appleAds', label: 'Apple Ads' }].map((item) => (
              <button key={item.id} className={`btn sm ${marketingFilters.includes(item.id) ? 'primary' : ''}`} onClick={() => toggleMarketingFilter(item.id)}>{item.label}</button>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Price</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['All', 'Free', 'Paid'].map((item) => <button key={item} className={`btn sm ${priceFilter === item ? 'primary' : ''}`} onClick={() => setPriceFilter(item)}>{item}</button>)}
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Country Include</div>
          <WrapFilterMenu label="Country include" options={countryOptions} selected={includedCountries} onToggle={toggleIncludedCountry} multi placeholder="Select countries" />
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Country Exclude</div>
          <WrapFilterMenu label="Country exclude" options={countryOptions} selected={excludedCountries} onToggle={toggleExcludedCountry} multi placeholder="Select countries" />
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Rating</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
            <input className="input" value={ratingMin} onChange={(e) => setRatingMin(e.target.value)} placeholder="Min" inputMode="decimal" />
            <input className="input" value={ratingMax} onChange={(e) => setRatingMax(e.target.value)} placeholder="Max" inputMode="decimal" />
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Reviews</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
            <input className="input" value={reviewsMin} onChange={(e) => setReviewsMin(e.target.value)} placeholder="Min" inputMode="numeric" />
            <input className="input" value={reviewsMax} onChange={(e) => setReviewsMax(e.target.value)} placeholder="Max" inputMode="numeric" />
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Monthly Download</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
            <input className="input" value={downloadsMin} onChange={(e) => setDownloadsMin(e.target.value)} placeholder="Min" inputMode="numeric" />
            <input className="input" value={downloadsMax} onChange={(e) => setDownloadsMax(e.target.value)} placeholder="Max" inputMode="numeric" />
          </div>
        </div>
        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>MRR</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
            <input className="input" value={revenueMin} onChange={(e) => setRevenueMin(e.target.value)} placeholder="Min" inputMode="numeric" />
            <input className="input" value={revenueMax} onChange={(e) => setRevenueMax(e.target.value)} placeholder="Max" inputMode="numeric" />
          </div>
        </div>
      </div>
      <div>
        <WrapSectionTitle
          icon={window.I.Filter}
          title="Explore Apps"
          body="Find apps by market, revenue, growth and keyword potential."
          right={
            <div style={{ display: 'flex', gap: 10 }}>
              {selectedForComparison.length > 0 && (
                <button className="btn primary sm" onClick={() => setShowComparison(true)}>
                  Compare {selectedForComparison.length} apps
                </button>
              )}
            </div>
          }
        />
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="input" style={{ height: 38, display: 'flex', alignItems: 'center', gap: 8 }}>
              <window.I.Search />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search apps, developers, descriptions..." style={{ flex: 1, background: 'transparent', border: 'none', color: 'inherit' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {released !== 'Any' ? <span className="chip accent wrap-filter-pill"><button type="button" className="wrap-filter-pill-remove" onClick={() => setReleased('Any')}>×</button>Released {released}</span> : null}
            {selectedCategories.map((categoryId) => (
              <span key={categoryId} className="chip accent wrap-filter-pill">
                <button type="button" className="wrap-filter-pill-remove" onClick={() => toggleCategory(categoryId)}>×</button>
                {wrapCategoryLabel(categoryId)}
              </span>
            ))}
            {includedCountries.map((code) => (
              <span key={`in-${code}`} className="chip accent wrap-filter-pill">
                <button type="button" className="wrap-filter-pill-remove" onClick={() => toggleIncludedCountry(code)}>×</button>
                {code === 'ALL' ? 'Include 🌐 All countries' : `Include ${WRAP_COUNTRIES.find((item) => item.code === code)?.flag} ${WRAP_COUNTRIES.find((item) => item.code === code)?.name}`}
              </span>
            ))}
            {excludedCountries.map((code) => (
              <span key={`ex-${code}`} className="chip accent wrap-filter-pill">
                <button type="button" className="wrap-filter-pill-remove" onClick={() => toggleExcludedCountry(code)}>×</button>
                {code === 'ALL' ? 'Exclude 🌐 All countries' : `Exclude ${WRAP_COUNTRIES.find((item) => item.code === code)?.flag} ${WRAP_COUNTRIES.find((item) => item.code === code)?.name}`}
              </span>
            ))}
            {minRatingValue != null || maxRatingValue != null ? <span className="chip accent wrap-filter-pill"><button type="button" className="wrap-filter-pill-remove" onClick={() => { setRatingMin(''); setRatingMax(''); }}>×</button>Rating {minRatingValue ?? '0'}-{maxRatingValue ?? '5'}</span> : null}
            {minReviewsValue != null || maxReviewsValue != null ? <span className="chip accent wrap-filter-pill"><button type="button" className="wrap-filter-pill-remove" onClick={() => { setReviewsMin(''); setReviewsMax(''); }}>×</button>Reviews {minReviewsValue ?? '0'}-{maxReviewsValue ?? '∞'}</span> : null}
          </div>
          {!query && shouldShowExploreFeed && !loading ? <div style={{ color: 'var(--text-3)', fontSize: 13 }}>{liveRows.length.toLocaleString()} live apps indexed for the current storefront set.</div> : null}
          {liveError ? <div style={{ color: '#ff8b7d', fontSize: 13 }}>Live Apple data unavailable. Check the local server.</div> : null}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.3fr 1fr .9fr .8fr .9fr .9fr .9fr .9fr', gap: 12, padding: '12px 14px', borderBottom: '1px solid var(--border-1)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {sortOptions.map((option) => {
                const active = sortBy === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSort(option.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, color: active ? 'var(--text-1)' : 'var(--text-3)', fontSize: 11, fontWeight: active ? 700 : 600, textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left' }}
                  >
                    <span>{option.label}</span>
                    <span style={{ color: active ? 'var(--accent)' : 'var(--text-4)', fontSize: 10 }}>
                      {active ? (sortDirection === 'asc' ? '↓' : '↑') : '↕'}
                    </span>
                  </button>
                );
              })}
            </div>
            {loading ? <WrapLoadingTable rows={6} columns={['2.3fr', '1fr', '.9fr', '.8fr', '.9fr', '.9fr', '.9fr', '.9fr']} showHeader={false} /> : null}
            {!loading ? pagedRows.map((app) => {
              const isSelected = selectedForComparison.some((a) => a.id === app.id);
              return (
                <div key={app.id} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr)', gap: 12, borderBottom: '1px solid var(--border-0)', alignItems: 'center' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleAppForComparison(app); }}
                    style={{ width: 32, height: 32, margin: '0 auto', borderRadius: 8, border: '2px solid var(--border-1)', background: isSelected ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isSelected ? '#fff' : 'var(--text-3)' }}
                  >
                    {isSelected ? '✓' : ''}
                  </button>
                  <button onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })} style={{ width: '100%', display: 'grid', gridTemplateColumns: '2.3fr 1fr .9fr .8fr .9fr .9fr .9fr .9fr', gap: 12, padding: '12px 14px', alignItems: 'center', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>{wrapAppIcon(app)}<div style={{ minWidth: 0 }}><div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div><div style={{ color: 'var(--text-3)', fontSize: 12 }}>{app.developer}</div></div></div>
                    <div style={{ color: 'var(--text-2)', fontSize: 13 }}>{wrapCategoryShort(app.category)}</div>
                    <div style={{ color: app.growth >= 0 ? 'var(--success)' : '#ff8b7d' }}>{app.growth >= 0 ? '+' : ''}{app.growth}%</div>
                    <div>★ {wrapRating(app.rating)}</div>
                    <div>{wrapCompactCount(app.reviews)}</div>
                    <div>{wrapCompact(app.downloads)}</div>
                    <div>{wrapMoney(app.revenue)}</div>
                    <div style={{ color: 'var(--text-3)' }}>{app.releasedAgo}</div>
                  </button>
                </div>
              );
            }) : null}
            {!loading && !rows.length ? <div style={{ padding: '18px 14px', color: 'var(--text-3)' }}>{isSearching ? 'No live App Store apps match these filters.' : 'Run a search or load the live feed to populate this table.'}</div> : null}
          </div>
          {!loading ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              {!query ? (
                <button className="btn sm" onClick={() => loadExploreBatch(false, 2)} disabled={!shouldShowExploreFeed || exploreState.done}>
                  {exploreState.done ? 'All loaded' : 'Load more live apps'}
                </button>
              ) : <span />}
              {rows.length > 50 ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button className="btn sm" onClick={() => setPage((current) => Math.max(1, current - 1))}>Prev</button>
                <span className="chip">Page {page} / {Math.max(1, Math.ceil(rows.length / 50))}</span>
                <button className="btn sm" onClick={() => setPage((current) => Math.min(Math.ceil(rows.length / 50), current + 1))}>Next</button>
              </div> : null}
            </div>
          ) : null}
        </div>
      </div>

      {showPresetModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowPresetModal(false)}>
          <div className="card" style={{ padding: 24, width: 480, maxWidth: '90%', background: 'var(--bg-1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Save Filter Preset</div>
            <input
              className="input"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Enter preset name (e.g., 'New EU Games')"
              onKeyDown={(e) => { if (e.key === 'Enter') saveCurrentAsPreset(); }}
              autoFocus
              style={{ marginBottom: 16 }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setShowPresetModal(false)}>Cancel</button>
              <button className="btn primary" onClick={saveCurrentAsPreset} disabled={!presetName.trim()}>Save</button>
            </div>
          </div>
        </div>
      )}

      {showComparison && selectedForComparison.length > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }} onClick={() => setShowComparison(false)}>
          <div className="card" style={{ padding: 24, width: 1200, maxWidth: '95%', maxHeight: '90vh', overflow: 'auto', background: 'var(--bg-1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Compare Apps ({selectedForComparison.length})</div>
              <button className="btn sm" onClick={() => { setShowComparison(false); setSelectedForComparison([]); }}>Close</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `180px repeat(${selectedForComparison.length}, minmax(160px,1fr))`, gap: 12, overflowX: 'auto' }}>
              <div style={{ fontWeight: 700, padding: '12px 0', borderBottom: '2px solid var(--border-1)' }}>Metric</div>
              {selectedForComparison.map((app) => (
                <div key={app.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderBottom: '2px solid var(--border-1)', background: 'rgba(255,255,255,0.02)', borderRadius: '8px 8px 0 0' }}>
                  {wrapAppIcon(app, 48)}
                  <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.3, minHeight: 32 }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.developer}</div>
                </div>
              ))}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Category</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13 }}>{wrapCategoryLabel(app.category)}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Rating</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13 }}>★ {wrapRating(app.rating)}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Reviews</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13 }}>{wrapCompactCount(app.reviews)}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Growth 7D</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontWeight: 600, fontSize: 13, color: app.growth >= 0 ? 'var(--success)' : '#ff8b7d' }}>{app.growth >= 0 ? '+' : ''}{app.growth}%</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Downloads Mo.</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13, fontWeight: 600 }}>{wrapCompact(app.downloads)}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>MRR</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13, fontWeight: 600 }}>{wrapMoney(app.revenue)}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Price</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13 }}>{app.price > 0 ? `$${app.price}` : 'Free'}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Released</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 12, color: 'var(--text-3)' }}>{app.releasedAgo}</div>)}

              <div style={{ padding: '12px 0', color: 'var(--text-3)', fontSize: 13 }}>Country</div>
              {selectedForComparison.map((app) => <div key={app.id} style={{ padding: '12px 0', fontSize: 13 }}>{wrapCountryFlag(app.country)} {wrapCountryName(app.country)}</div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WrapDiscoverScreen({ setRoute }) {
  const appleCategories = window.DATA.APP_CATEGORIES || [];
  const savedDiscoverUiRef = React.useRef(null);
  if (savedDiscoverUiRef.current == null) {
    savedDiscoverUiRef.current = wrapReadLocalJson('wrap-discover-ui', null);
  }
  const savedDiscoverUi = savedDiscoverUiRef.current;
  const [countries, setCountries] = React.useState(Array.isArray(savedDiscoverUi?.countries) ? savedDiscoverUi.countries : []);
  const [showCountryPicker, setShowCountryPicker] = React.useState(false);
  const [releaseWindow, setReleaseWindow] = React.useState(savedDiscoverUi?.releaseWindow || '180d');
  const [selectedCategory, setSelectedCategory] = React.useState(savedDiscoverUi?.selectedCategory || 'all');
  const [minGrowth, setMinGrowth] = React.useState(savedDiscoverUi?.minGrowth || '8');
  const recommendedMarkets = ['US', 'GB', 'CA', 'AU', 'FR', 'DE', 'JP'];
  const discoverFeed = useWrapCachedChartSet({
    countries,
    charts: ['top-free', 'top-paid', 'top-grossing'],
    limit: 120,
    enabled: countries.length > 0,
    cachePrefix: 'wrap-discover-opportunities',
  });
  const categoryFeed = useWrapLiveListing({
    countries,
    query: '',
    limit: 36,
    mode: selectedCategory === 'all' ? 'search' : 'recent',
    categories: selectedCategory === 'all' ? [] : [selectedCategory],
    enabled: countries.length > 0 && selectedCategory !== 'all',
  });
  const releaseFeed = useWrapLiveListing({
    countries,
    query: '',
    limit: 48,
    mode: releaseWindow === 'Any' ? 'search' : 'recent',
    categories: selectedCategory === 'all' ? [] : [selectedCategory],
    enabled: countries.length > 0 && releaseWindow !== 'Any',
  });

  React.useEffect(() => {
    wrapWriteLocalJson('wrap-discover-ui', {
      countries,
      releaseWindow,
      selectedCategory,
      minGrowth,
    });
  }, [countries, releaseWindow, selectedCategory, minGrowth]);

  const toggleCountry = (code) => {
    setCountries((current) => current.includes(code) ? current.filter((item) => item !== code) : [...current, code]);
  };

  const releaseLimit = releaseWindow === 'Any' ? null : Number(String(releaseWindow).replace('d', ''));
  const growthFloor = wrapNumberInput(minGrowth) ?? 8;
  const discoverSource = wrapDedupeLiveApps([
    ...discoverFeed.items,
    ...(selectedCategory === 'all' ? [] : categoryFeed.items),
    ...(releaseWindow === 'Any' ? [] : releaseFeed.items),
  ]);
  const minDownloadsFloor = selectedCategory === 'all' ? 15000 : 5000;

  // Calculate difficulty score: higher = harder to compete
  const calculateDifficultyScore = (app) => {
    let difficulty = 0;
    const downloads = Number(app.downloads || 0);
    const revenue = Number(app.revenue || 0);
    const reviews = Number(app.reviews || 0);
    const rating = Number(app.rating || 0);

    // High downloads = harder
    if (downloads > 100000) difficulty += 40;
    else if (downloads > 50000) difficulty += 25;
    else if (downloads > 20000) difficulty += 15;
    else difficulty += 5;

    // High revenue = harder
    if (revenue > 50000) difficulty += 30;
    else if (revenue > 20000) difficulty += 20;
    else if (revenue > 5000) difficulty += 10;

    // Many reviews with high rating = established market
    if (reviews > 10000 && rating >= 4.5) difficulty += 20;
    else if (reviews > 5000 && rating >= 4.0) difficulty += 10;

    return Math.min(100, difficulty);
  };

  const baseRows = discoverSource
    .filter((app) => wrapIsOpportunityCandidate(app, releaseLimit))
    .filter((app) => selectedCategory === 'all' || app.category === selectedCategory)
    .filter((app) => Number(app.growth || 0) >= growthFloor)
    .filter((app) => Number(app.downloads || 0) >= minDownloadsFloor)
    .map((app) => ({
      ...app,
      opportunityScore: wrapOpportunityScore(app),
      difficultyScore: calculateDifficultyScore(app)
    }))
    .sort((a, b) => b.opportunityScore - a.opportunityScore || b.growth - a.growth || b.downloads - a.downloads);

  const top = baseRows.slice(0, 18);

  // Detect emerging niches
  const emergingNiches = React.useMemo(() => {
    const categoryGrowth = {};
    discoverSource
      .filter((app) => wrapIsOpportunityCandidate(app, releaseLimit))
      .forEach((app) => {
      const cat = app.category || 'unknown';
      if (!categoryGrowth[cat]) categoryGrowth[cat] = { apps: [], totalGrowth: 0, avgDownloads: 0 };
      categoryGrowth[cat].apps.push(app);
      categoryGrowth[cat].totalGrowth += Number(app.growth || 0);
      });

    return Object.entries(categoryGrowth)
      .filter(([_, data]) => data.apps.length >= 3)
      .map(([categoryId, data]) => ({
        categoryId,
        label: wrapCategoryLabel(categoryId),
        count: data.apps.length,
        avgGrowth: data.totalGrowth / data.apps.length,
        avgDownloads: data.apps.reduce((sum, app) => sum + Number(app.downloads || 0), 0) / data.apps.length,
        apps: data.apps
          .sort((a, b) => Number(b.growth || 0) - Number(a.growth || 0) || Number(a.reviews || 0) - Number(b.reviews || 0))
          .slice(0, 3)
      }))
      .filter((niche) => niche.avgGrowth >= 15)
      .sort((a, b) => b.avgGrowth - a.avgGrowth)
      .slice(0, 5);
  }, [discoverSource, releaseLimit]);

  React.useEffect(() => {
    if (top.length) wrapRememberApps(top);
  }, [JSON.stringify(top.map((app) => `${app.storeId || app.id}:${app.country || 'US'}`))]);

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1320, margin: '0 auto' }}>
      <WrapSectionTitle
        icon={window.I.Globe}
        title="Discover Opportunities"
        body="Recent apps with traction, filtered to avoid giant incumbents and surface newer breakout opportunities."
        right={<button className="btn primary" onClick={() => setRoute({ screen: 'search' })}>Open Search</button>}
      />

      <div style={{ display: 'grid', gap: 16, marginBottom: 22 }}>
        <div className="card" style={{ padding: 16, background: 'rgba(255,255,255,0.015)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Opportunity Filters</div>
              <div style={{ fontSize: 13, color: 'var(--text-3)', maxWidth: 720 }}>
                Discover is now focused on newer apps already showing traction. Pick markets only if you want them. Nothing is preselected.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn sm" onClick={() => setShowCountryPicker((value) => !value)}>
                {countries.length ? 'Edit markets' : 'Choose markets'}
              </button>
              {countries.length ? <button className="btn sm" onClick={() => setCountries([])}>Clear markets</button> : null}
              {countries.length ? <button className="btn sm" onClick={() => discoverFeed.refresh()}>Refresh feed</button> : null}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {recommendedMarkets.map((code) => {
              const country = WRAP_COUNTRIES.find((item) => item.code === code);
              if (!country) return null;
              const active = countries.includes(code);
              return (
                <button
                  key={code}
                  className="chip"
                  onClick={() => toggleCountry(code)}
                  style={{
                    cursor: 'pointer',
                    background: active ? 'var(--accent-soft)' : 'rgba(255,255,255,0.04)',
                    color: active ? 'var(--accent)' : 'var(--text-2)',
                    border: active ? '1px solid var(--accent-ring)' : '1px solid var(--border-0)',
                  }}
                >
                  {country.flag} {country.name}
                </button>
              );
            })}
          </div>

          {showCountryPicker ? (
            <div className="card" style={{ marginTop: 12, padding: 12, maxHeight: 240, overflow: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 8 }}>
                {WRAP_COUNTRIES.map((country) => {
                  const active = countries.includes(country.code);
                  return (
                    <button
                      key={country.code}
                      className="btn sm"
                      onClick={() => toggleCountry(country.code)}
                      style={{ justifyContent: 'flex-start', background: active ? 'var(--accent-soft)' : undefined, color: active ? 'var(--accent)' : undefined }}
                    >
                      {country.flag} {country.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr 1fr', gap: 12, marginTop: 14, alignItems: 'end' }}>
            <div style={{ display: 'grid', gap: 8, alignContent: 'end' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Released within</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['30d', '90d', '180d', '365d', 'Any'].map((item) => <button key={item} className={`btn sm ${releaseWindow === item ? 'primary' : ''}`} onClick={() => setReleaseWindow(item)}>{item}</button>)}
              </div>
            </div>
            <div style={{ display: 'grid', gap: 8, alignContent: 'end' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Category</div>
              <WrapCategoryPicker value={selectedCategory} onChange={setSelectedCategory} includeAll />
            </div>
            <div style={{ display: 'grid', gap: 8, alignContent: 'end' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Min growth %</div>
              <input className="input" value={minGrowth} onChange={(event) => setMinGrowth(event.target.value)} inputMode="decimal" placeholder="8" />
            </div>
          </div>
        </div>
      </div>

      {!countries.length ? (
        <WrapEmptyState
          icon={window.I.Bolt}
          title="Choose markets to start discovery"
          body="Discover only becomes useful once you scope it to real markets. Pick one or more countries above and Signal will surface newer apps with traction, not the giant incumbents."
        />
      ) : null}

      {countries.length && (discoverFeed.loading || (selectedCategory !== 'all' && categoryFeed.loading) || (releaseWindow !== 'Any' && releaseFeed.loading)) ? <WrapLoadingAppRows rows={4} /> : null}
      {countries.length && !discoverFeed.loading && !categoryFeed.loading && !releaseFeed.loading && (discoverFeed.error || (selectedCategory !== 'all' ? categoryFeed.error : '') || (releaseWindow !== 'Any' ? releaseFeed.error : '')) ? <div style={{ color: '#ff8b7d', fontSize: 13, marginBottom: 12 }}>Live Apple discovery unavailable. Check the local server.</div> : null}
      {countries.length ? (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
          <span className="chip">{countries.length} market{countries.length > 1 ? 's' : ''}</span>
          <span className="chip">{top.length} opportunities</span>
          <span className="chip">{discoverFeed.cached ? 'Loaded from cache' : 'Fresh scan'}</span>
          {selectedCategory !== 'all' ? <span className="chip">Category live scan</span> : null}
          {releaseWindow !== 'Any' ? <span className="chip">Recent release scan</span> : null}
        </div>
      ) : null}

      {emergingNiches.length > 0 && countries.length > 0 && (
        <div className="card" style={{ padding: 20, marginBottom: 20, background: 'linear-gradient(135deg, rgba(244,98,31,0.08), rgba(255,255,255,0.01))' }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <window.I.TrendingUp style={{ width: 20, height: 20, color: 'var(--accent)' }} />
            Emerging Niches — High Growth Categories
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {emergingNiches.map((niche) => (
              <div key={niche.categoryId} style={{ padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-0)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{niche.label}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>{niche.count} apps with avg. growth of +{niche.avgGrowth.toFixed(1)}%</div>
                  </div>
                  <span className="chip accent" style={{ fontSize: 16, fontWeight: 700 }}>+{niche.avgGrowth.toFixed(0)}%</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  {niche.apps.map((app) => (
                    <button key={app.id} onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })} style={{ flex: 1, padding: 10, borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-0)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {wrapAppIcon(app, 36)}
                      <div style={{ minWidth: 0, textAlign: 'left' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--success)' }}>+{Math.round(app.growth)}%</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {top.map((app) => (
          <button
            key={app.storeId || app.id}
            className="card"
            onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })}
            style={{ padding: 18, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'stretch' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              {wrapAppIcon(app)}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.developer}</div>
                <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="chip">{wrapCategoryShort(app.category)}</span>
                  <span className="chip">{app.countryFlag} {wrapCountryName(app.country)}</span>
                  <span className="chip accent">Opp. {app.opportunityScore}</span>
                  <span className={`chip ${app.difficultyScore <= 30 ? '' : app.difficultyScore <= 60 ? '' : ''}`} style={{ background: app.difficultyScore <= 30 ? 'rgba(100, 220, 100, 0.2)' : app.difficultyScore <= 60 ? 'rgba(255, 180, 50, 0.2)' : 'rgba(255, 100, 100, 0.2)', color: app.difficultyScore <= 30 ? '#64dc64' : app.difficultyScore <= 60 ? '#ffb432' : '#ff6464' }}>
                    {app.difficultyScore <= 30 ? 'Easy' : app.difficultyScore <= 60 ? 'Medium' : 'Hard'}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                color: 'var(--text-2)',
                fontSize: 13,
                lineHeight: 1.6,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {app.description || 'No description available'}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, paddingTop: 8, borderTop: '1px solid var(--border-1)' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Released</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{app.releasedAgo}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Downloads</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{wrapCompact(app.downloads)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Revenue</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{wrapMoney(app.revenue)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Traction</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: app.growth > 0 ? 'var(--success)' : 'var(--text-3)' }}>
                  {app.growth > 0 ? '+' : ''}{Math.round(app.growth)}%
                </div>
              </div>
            </div>
          </button>
        ))}
        {countries.length && !discoverFeed.loading && !(selectedCategory !== 'all' && categoryFeed.loading) && !(releaseWindow !== 'Any' && releaseFeed.loading) && !top.length ? (
          <div className="card" style={{ gridColumn: '1 / -1', padding: 18, color: 'var(--text-3)' }}>
            No recent traction opportunities matched these filters. Try a wider release window or lower the growth floor.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function WrapTrendingScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const appleCategories = window.DATA.APP_CATEGORIES || [];
  const categoryOptions = [{ value: 'all', label: 'All categories' }, ...appleCategories.map((item) => ({ value: item.id, label: `${item.emoji} ${item.label}` }))];
  const countryOptions = WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}`, code: item.code }));
  const chartOptions = [
    { label: 'Top Free', icon: window.I.Crown },
    { label: 'Top Paid', icon: window.I.DollarSign },
    { label: 'Top Grossing', icon: window.I.Diamond },
  ];
  const [chart, setChart] = React.useState('Top Free');
  const [country, setCountry] = React.useState('US');
  const [category, setCategory] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const [highlightTracked, setHighlightTracked] = React.useState(true);
  const [timeFilter, setTimeFilter] = React.useState('current');
  const chartId = chart === 'Top Paid' ? 'top-paid' : chart === 'Top Grossing' ? 'top-grossing' : 'top-free';
  const { items: chartRows, previousItems: previousChartRows, loading, error } = useChartData(chartId, country, 200);
  React.useEffect(() => { setPage(1); }, [country, category, chart]);
  const rows = chartRows
    .filter((item) => item.country === country)
    .filter((item) => category === 'all' || item.category === category)
    .sort((a, b) => b.downloads - a.downloads);
  const pagedRows = rows.slice((page - 1) * 50, page * 50);

  React.useEffect(() => {
    if (pagedRows.length) wrapRememberApps(pagedRows);
  }, [JSON.stringify(pagedRows.map((app) => `${app.storeId || app.id}:${app.country || country}`))]);
  return (
    <div style={{ padding: '28px 24px 56px', maxWidth: 1320, margin: '0 auto' }}>
      <WrapSectionTitle icon={window.I.Bolt} title="App Store Rankings" body="Browse top charts by country and category." />
      <div className="seg" style={{ marginBottom: 18, padding: 4, gap: 4 }}>
        {chartOptions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={chart === item.label ? 'on' : ''}
              onClick={() => setChart(item.label)}
              style={{ height: 40, padding: '0 16px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700 }}
            >
              <Icon style={{ width: 16, height: 16 }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 260px) minmax(0, 260px) auto', gap: 12, marginBottom: 18, alignItems: 'start' }}>
        <WrapFilterMenu label="Country" options={countryOptions} selected={country} onSelect={setCountry} placeholder="Select country" />
        <WrapFilterMenu label="Category" options={categoryOptions} selected={category} onSelect={setCategory} placeholder="Select category" />
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10, minHeight: 38, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className={`btn sm ${timeFilter === 'current' ? 'primary' : ''}`} onClick={() => setTimeFilter('current')}>Current</button>
            <button className={`btn sm ${timeFilter === '24h' ? 'primary' : ''}`} onClick={() => setTimeFilter('24h')}>24h ago</button>
            <button className={`btn sm ${timeFilter === '7d' ? 'primary' : ''}`} onClick={() => setTimeFilter('7d')}>7d ago</button>
          </div>
          {trackedApps.length > 0 && (
            <button className={`btn sm ${highlightTracked ? 'primary' : ''}`} onClick={() => setHighlightTracked(!highlightTracked)}>
              {highlightTracked ? 'Hide' : 'Show'} My Apps
            </button>
          )}
        </div>
      </div>
      {loading && rows.length ? <div style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 12 }}>Refreshing chart in background…</div> : null}
      {!loading && error ? <div style={{ color: '#ff8b7d', fontSize: 13, marginBottom: 12 }}>Live Apple chart unavailable. Check the local server.</div> : null}
      <div className="card app-detail-stroke" style={{ overflow: 'hidden', padding: 14, display: 'grid', gap: 10, background: 'rgba(255,255,255,0.012)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '110px 100px minmax(0, 1fr) 150px 150px', gap: 14, padding: '8px 12px 10px', color: 'var(--text-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <div>Rank</div>
          <div>24H</div>
          <div>App</div>
          <div>Est. Download Mo.</div>
          <div>Est Revenue Mo.</div>
        </div>
        {loading && !rows.length ? Array.from({ length: 8 }).map((_, rowIndex) => (
          <div
            key={`ranking-skeleton-${rowIndex}`}
            style={{ display: 'grid', gridTemplateColumns: '110px 100px minmax(0, 1fr) 150px 150px', gap: 14, padding: '18px 16px', alignItems: 'center', borderTop: rowIndex ? '1px solid var(--border-0)' : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <WrapSkeletonBlock width={44} height={44} radius={14} />
            </div>
            <WrapSkeletonBlock width="52%" height={14} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <WrapSkeletonBlock width={54} height={54} radius={16} />
              <div style={{ display: 'grid', gap: 8, minWidth: 0, flex: 1 }}>
                <WrapSkeletonBlock width="42%" height={16} />
                <WrapSkeletonBlock width="28%" height={12} />
              </div>
            </div>
            <WrapSkeletonBlock width="68%" height={18} />
            <WrapSkeletonBlock width="62%" height={20} />
          </div>
        )) : null}
        {pagedRows.map((app, index) => {
          const absoluteRank = ((page - 1) * 50) + index + 1;
          const movement = wrapRankingDelta({ ...app, position: absoluteRank }, previousChartRows);
          const isTracked = trackedApps.some((tracked) => tracked.storeId === app.storeId || tracked.id === app.id);
          const medalStyle = absoluteRank === 1
            ? { background: 'linear-gradient(135deg, #f7d774, #b98519)', color: '#1a1200', boxShadow: '0 0 24px rgba(247,215,116,0.25)' }
            : absoluteRank === 2
              ? { background: 'linear-gradient(135deg, #e9edf4, #8d99a8)', color: '#10151d', boxShadow: '0 0 24px rgba(233,237,244,0.18)' }
              : absoluteRank === 3
                ? { background: 'linear-gradient(135deg, #d99a6c, #8f4f22)', color: '#190d04', boxShadow: '0 0 24px rgba(217,154,108,0.18)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)', boxShadow: 'none' };
          const movementColor = movement.direction === 'up' ? 'var(--success)' : movement.direction === 'down' ? '#ff8b7d' : 'var(--text-4)';
          const movementTransform = movement.direction === 'down'
            ? 'rotate(180deg)'
            : movement.direction === 'flat'
              ? 'rotate(90deg)'
              : 'none';
          const highlightBg = isTracked && highlightTracked
            ? 'linear-gradient(90deg, rgba(244,98,31,0.15), rgba(255,255,255,0.01))'
            : absoluteRank <= 3 ? 'rgba(255,255,255,0.018)' : 'rgba(255,255,255,0.01)';
          return (
            <button
              key={app.id}
              className="card"
              onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })}
              style={{ width: '100%', display: 'grid', gridTemplateColumns: '110px 100px minmax(0, 1fr) 150px 150px', gap: 14, padding: '18px 16px', alignItems: 'center', textAlign: 'left', background: highlightBg, border: isTracked && highlightTracked ? '1px solid var(--accent)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, ...medalStyle }}>
                  {absoluteRank}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: movementColor, minWidth: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.I.ArrowUp style={{ width: 14, height: 14, transform: movementTransform }} />
                </span>
                <span style={{ color: movementColor, fontSize: 15, fontWeight: 800 }}>
                  {movement.direction === 'flat' ? '0' : `${movement.direction === 'up' ? '+' : '-'}${movement.delta}`}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                {wrapAppIcon(app, 54)}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {wrapCategoryLabel(app.category)}
                  </div>
                </div>
              </div>
              <div style={{ color: 'var(--text-1)', fontSize: 22, fontWeight: 800 }}>{wrapCompact(app.downloads)}</div>
              <div style={{ fontSize: 24, fontWeight: 900 }}>{wrapMoney(app.revenue)}</div>
            </button>
          );
        })}
        {!loading && !rows.length ? (
          <div style={{ padding: '18px 16px' }}>
            <div style={{ color: 'var(--text-3)', marginBottom: 8 }}>No apps found for this country and category combination.</div>
            <div style={{ fontSize: 12, color: 'var(--text-4)' }}>The top 200 {chart.toLowerCase()} apps are loaded. Try selecting "All categories" or a different country.</div>
          </div>
        ) : null}
      </div>
      {rows.length > 50 ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
        <button className="btn sm" onClick={() => setPage((current) => Math.max(1, current - 1))}>Prev</button>
        <span className="chip">Page {page} / {Math.max(1, Math.ceil(rows.length / 50))}</span>
        <button className="btn sm" onClick={() => setPage((current) => Math.min(Math.ceil(rows.length / 50), current + 1))}>Next</button>
      </div> : null}
    </div>
  );
}

function WrapFavoritesScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const catalog = buildWrapUniverse(workspace);
  const favorites = catalog.filter((app) => wrapFavoriteIds(workspace).includes(app.id));
  const [pendingRemoveFavorite, setPendingRemoveFavorite] = React.useState(null);

  const removeFavorite = (appId) => {
    updateWrapWorkspace((current) => ({
      ...current,
      favoriteAppIds: (current.favoriteAppIds || []).filter((id) => id !== appId),
    }));
    setPendingRemoveFavorite(null);
  };

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <WrapSectionTitle icon={window.I.Heart} title="Favorites" body="Apps, ads, creators, and saved ideas." />
      <WrapConfirmModal
        open={Boolean(pendingRemoveFavorite)}
        icon={window.I.Trash}
        tone="danger"
        title="Remove favorite?"
        body={pendingRemoveFavorite ? `${pendingRemoveFavorite.name} will be removed from your favorites list.` : ''}
        confirmLabel="Remove"
        onCancel={() => setPendingRemoveFavorite(null)}
        onConfirm={() => pendingRemoveFavorite ? removeFavorite(pendingRemoveFavorite.id) : null}
      />
      {!favorites.length ? (
        <WrapEmptyState icon={window.I.Heart} title="No favorite apps yet" body="Go to Search or Discover and click the heart icon on any app to add it here." action={() => setRoute({ screen: 'search' })} actionLabel="Browse apps" />
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {favorites.map((app) => (
            <button key={app.id} className="editor-list-row" onClick={() => setRoute({ screen: 'app-detail', appId: app.id })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {wrapAppIcon(app)}
                <div>
                  <div style={{ fontWeight: 600 }}>{app.name}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{app.developer}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="chip accent">{wrapMoney(app.revenue)}</span>
                <button
                  className="btn sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingRemoveFavorite(app);
                  }}
                  style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                >
                  <window.I.Trash style={{ width: 14, height: 14 }} />
                </button>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WrapAddAppModal({ open, onClose }) {
  const [url, setUrl] = React.useState('');
  const [error, setError] = React.useState('');
  if (!open) return null;
  const submit = async () => {
    if (!url.trim()) return;
    const jobId = `job-${Date.now().toString(36)}`;
    addWrapJob({ id: jobId, label: 'Adding App', meta: url.trim(), progress: 12, source: url.trim(), status: 'running' });
    onClose();
    setError('');
    try {
      updateWrapJob(jobId, { progress: 34 });
      const connection = await wrapConnectApp(url.trim());
      updateWrapJob(jobId, { progress: 68 });
      const tracked = buildTrackedApp(connection);
      updateWrapWorkspace((current) => ({
        ...current,
        trackedApps: [tracked, ...(current.trackedApps || []).filter((item) => item.name !== tracked.name)],
      }));
      updateWrapJob(jobId, { progress: 100, status: 'done', label: tracked.name, meta: 'Imported successfully' });
      window.setTimeout(() => clearWrapJob(jobId), 2400);
    } catch (addError) {
      updateWrapJob(jobId, { status: 'error', label: 'Import failed', meta: addError.message, progress: 100 });
      setError(addError.message || 'Could not add app');
    }
  };
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={onClose}>
      <div className="card" style={{ width: 520, padding: 20, background: 'var(--bg-1)' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Add tracked app</div>
        <div style={{ color: 'var(--text-3)', marginTop: 6, lineHeight: 1.6 }}>Paste an App Store or Google Play URL. Signal will fetch metadata, generate keywords, and create a tracked app profile.</div>
        <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} style={{ marginTop: 16, height: 42 }} />
        {error ? <div style={{ color: '#ff8b7d', marginTop: 10 }}>{error}</div> : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={submit}>Add app</button>
        </div>
      </div>
    </div>
  );
}

function WrapAppTrackingScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const tracked = wrapTrackedFromWorkspace(workspace);
  const [selectedId, setSelectedId] = React.useState(tracked[0]?.id || '');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [keywordModal, setKeywordModal] = React.useState({ open: false, value: '' });
  const [similarModal, setSimilarModal] = React.useState({ open: false, keyword: '', rows: [] });
  const [historyModal, setHistoryModal] = React.useState({ open: false, keyword: '', data: [] });
  const [sortBy, setSortBy] = React.useState({ field: 'keyword', direction: 'asc' });
  const [selectedCountry, setSelectedCountry] = React.useState('us');
  const [warmupState, setWarmupState] = React.useState({ loading: false, error: '', lastRunAt: '' });

  const selected = tracked.find((item) => item.id === selectedId) || tracked[0] || null;
  const selectedKeywords = selected ? wrapKeywordsForApp(selected) : [];

  const runWarmup = React.useCallback(async (force = false) => {
    const candidates = tracked.filter((app) => Array.isArray(app.keywords) && app.keywords.length > 0);
    if (!candidates.length) return;

    const targetApps = force ? candidates : candidates.filter((app) => wrapIsKeywordRefreshStale(app));
    if (!targetApps.length) return;

    setWarmupState({ loading: true, error: '', lastRunAt: '' });
    try {
      const data = await wrapWarmTrackedApps(targetApps);
      const nextById = new Map((data.trackedApps || []).map((app) => [app.id, app]));
      updateWrapWorkspace((current) => ({
        ...current,
        trackedApps: (current.trackedApps || []).map((app) => nextById.get(app.id) || app),
      }));
      setWarmupState({
        loading: false,
        error: '',
        lastRunAt: data.meta?.warmedAt || new Date().toISOString(),
      });
    } catch (error) {
      setWarmupState({
        loading: false,
        error: error?.message || 'Keyword warmup failed',
        lastRunAt: '',
      });
    }
  }, [tracked]);

  // Sort keywords
  const sortedKeywords = React.useMemo(() => {
    const copy = [...selectedKeywords];
    return copy.sort((a, b) => {
      let aVal = a[sortBy.field];
      let bVal = b[sortBy.field];

      // Handle position (can be number or "Not ranked")
      if (sortBy.field === 'position') {
        aVal = aVal === 'Not ranked' ? 999 : aVal;
        bVal = bVal === 'Not ranked' ? 999 : bVal;
      }

      // String comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortBy.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Number comparison
      return sortBy.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [selectedKeywords, sortBy]);

  const toggleSort = (field) => {
    setSortBy(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  React.useEffect(() => { if (!selectedId && tracked[0]?.id) setSelectedId(tracked[0].id); }, [selectedId, tracked]);
  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {keywordModal.open && selected ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={() => setKeywordModal({ open: false, value: '' })}>
          <div className="card" style={{ width: 420, padding: 20, background: 'var(--bg-1)' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Add Keyword</div>
            <input className="input" value={keywordModal.value} onChange={(e) => setKeywordModal((current) => ({ ...current, value: e.target.value }))} style={{ marginTop: 14 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 14 }}>
              <button className="btn" onClick={() => setKeywordModal({ open: false, value: '' })}>Cancel</button>
              <button className="btn primary" onClick={() => {
                const keyword = keywordModal.value.trim().toLowerCase();
                if (!keyword) return;
                wrapUpdateTrackedAppKeywords(selected.id, (currentKeywords) => {
                  if (currentKeywords.some((item) => item.keyword === keyword)) return currentKeywords;
                  return [{
                    id: `${selected.id}-kw-custom-${Date.now().toString(36)}`,
                    country: selected.countryFlag || '🇺🇸',
                    keyword,
                    position: 'Not ranked',
                    popularity: 72,
                    difficulty: 34,
                    apps: 160,
                  }, ...currentKeywords];
                });
                setKeywordModal({ open: false, value: '' });
              }}>Add</button>
            </div>
          </div>
        </div>
      ) : null}
      {similarModal.open ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={() => setSimilarModal({ open: false, keyword: '', rows: [] })}>
          <div className="card" style={{ width: 580, maxHeight: '80vh', overflow: 'auto', padding: 20, background: 'var(--bg-1)', display: 'grid', gap: 16 }} onClick={(e) => e.stopPropagation()}>
            {/* Header with Add All */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid var(--border-1)' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Similar to "{similarModal.keyword}"</div>
              <button
                className="btn primary sm"
                onClick={() => {
                  if (!selected) return;
                  const newKeywords = similarModal.rows
                    .filter(row => !selected.keywords?.some(k => k.keyword === row.keyword))
                    .map(row => ({
                      id: `${selected.id}-kw-similar-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`,
                      country: selected.countryFlag || '🇺🇸',
                      keyword: row.keyword,
                      position: 'Not ranked',
                      popularity: row.popularity,
                      difficulty: row.difficulty,
                      apps: 180,
                    }));

                  if (newKeywords.length > 0) {
                    wrapUpdateTrackedAppKeywords(selected.id, (currentKeywords) => [
                      ...newKeywords,
                      ...currentKeywords
                    ]);
                  }
                  setSimilarModal({ open: false, keyword: '', rows: [] });
                }}
              >
                <window.I.Plus style={{ width: 14, height: 14 }} /> Add All ({similarModal.rows.length})
              </button>
            </div>

            {/* Keywords List */}
            <div style={{ display: 'grid', gap: 8 }}>
              {similarModal.rows.map((row) => {
                const alreadyAdded = selected?.keywords?.some(k => k.keyword === row.keyword);
                return (
                  <div key={row.id} className="editor-list-row" style={{ padding: '12px 14px', opacity: alreadyAdded ? 0.5 : 1 }}>
                    <div style={{ display: 'grid', gap: 4, flex: 1 }}>
                      <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {row.keyword}
                        {alreadyAdded && <span className="chip" style={{ fontSize: 10 }}>Added</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Popularity {row.popularity} · Difficulty {row.difficulty}</div>
                    </div>
                    <button
                      className="btn sm"
                      disabled={alreadyAdded}
                      onClick={() => {
                        if (!selected || alreadyAdded) return;
                        wrapUpdateTrackedAppKeywords(selected.id, (currentKeywords) => [{
                          id: `${selected.id}-kw-similar-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`,
                          country: selected.countryFlag || '🇺🇸',
                          keyword: row.keyword,
                          position: 'Not ranked',
                          popularity: row.popularity,
                          difficulty: row.difficulty,
                          apps: 180,
                        }, ...currentKeywords]);
                      }}
                      style={{ opacity: alreadyAdded ? 0.4 : 1 }}
                    >
                      {alreadyAdded ? '✓ Added' : 'Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {historyModal.open ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={() => setHistoryModal({ open: false, keyword: '', data: [] })}>
          <div className="card" style={{ width: 600, padding: 20, background: 'var(--bg-1)', display: 'grid', gap: 16 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Position History: "{historyModal.keyword}"</div>

            {/* 7-day chart */}
            <div style={{ display: 'flex', alignItems: 'end', gap: 8, height: 200, padding: '10px 0' }}>
              {!historyModal.data.length ? <div style={{ color: 'var(--text-3)' }}>No daily snapshots yet. Run the daily refresh first.</div> : null}
              {historyModal.data.map((point, idx) => {
                const maxPos = Math.max(...historyModal.data.map(h => h.position));
                const minPos = Math.min(...historyModal.data.map(h => h.position));
                const range = maxPos - minPos || 1;
                const height = ((maxPos - point.position) / range) * 160 + 20;

                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: '100%',
                      height: `${height}px`,
                      background: 'linear-gradient(180deg, var(--accent), var(--accent-2))',
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'end',
                      justifyContent: 'center',
                      paddingBottom: 6,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 700
                    }}>
                      #{point.position}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>{point.day}</div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            {historyModal.data.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 12, borderTop: '1px solid var(--border-1)' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Best Position</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>
                  #{Math.min(...historyModal.data.map(h => h.position))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Current</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>
                  #{historyModal.data[historyModal.data.length - 1]?.position || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Trend</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: historyModal.data[0]?.position > historyModal.data[historyModal.data.length - 1]?.position ? '#4ade80' : '#f87171' }}>
                  {historyModal.data[0]?.position > historyModal.data[historyModal.data.length - 1]?.position ? '↑' : '↓'}
                </div>
              </div>
            </div>
            ) : null}

            <button className="btn" onClick={() => setHistoryModal({ open: false, keyword: '', data: [] })}>Close</button>
          </div>
        </div>
      ) : null}
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle
          icon={window.I.Device}
          title="App Keyword Tracking"
          body="Track your apps and keep one daily keyword snapshot per app, country, and keyword."
          right={(
            <div style={{ display: 'grid', gap: 6, justifyItems: 'end' }}>
              <button className="btn sm" onClick={() => runWarmup(true)} disabled={warmupState.loading}>
                {warmupState.loading ? 'Refreshing…' : 'Refresh daily data'}
              </button>
              {warmupState.lastRunAt ? <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>Last warmup: {new Date(warmupState.lastRunAt).toLocaleString()}</div> : null}
              {warmupState.error ? <div style={{ fontSize: 11.5, color: '#ff8b7d' }}>{warmupState.error}</div> : null}
            </div>
          )}
        />
        <WrapAppsSidebarCard
          items={tracked}
          selectedId={selected?.id}
          onSelect={(app) => setSelectedId(app.id)}
          onAdd={() => setModalOpen(true)}
          onRemove={(app) => wrapRemoveTrackedApp(app, () => {
            if (selected?.id === app.id) setSelectedId(tracked.find((item) => item.id !== app.id)?.id || '');
          })}
          emptyTitle="No apps tracked yet"
          emptyBody='Click "Add App" to start tracking your first app.'
          renderMeta={(app) => `${app.keywordCount} keywords · ${app.keywordRefreshMeta?.lastCheckedAt ? `updated ${new Date(app.keywordRefreshMeta.lastCheckedAt).toLocaleDateString()}` : 'not warmed yet'}`}
        />
      </div>
      <div className="signal-two-pane-main">
        {!selected ? (
          <WrapEmptyState icon={window.I.Device} title="Select an app" body="Choose an app from the list to view its keyword rankings and opportunities." />
        ) : (
          <>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>{wrapAppIcon(selected)}<div><div style={{ fontSize: 17, fontWeight: 700 }}>{selected.name}</div><div style={{ color: 'var(--text-3)' }}>{selected.developer}</div></div></div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="chip">{selected.countryFlag} {selected.country}</span>
                  <span className="chip">1 refresh / day</span>
                  {selected.keywordRefreshMeta?.lastCheckedAt ? <span className="chip">Last check {new Date(selected.keywordRefreshMeta.lastCheckedAt).toLocaleDateString()}</span> : null}
                  {selected.storeUrl ? <a className="btn sm" href={selected.storeUrl} target="_blank" rel="noreferrer">App Store</a> : null}
                </div>
              </div>
            </div>
            <WrapRecommendationPanel workspace={workspace} app={selected} title="Keyword and positioning recommendations" />
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: 14, borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <strong style={{ color: 'var(--accent)' }}>Keywords <span className="chip accent">{selectedKeywords.length}</span></strong>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    style={{
                      padding: '4px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                      borderRadius: 6,
                      background: `linear-gradient(135deg, ${selected?.tint || '#667085'}18, ${selected?.tint2 || '#344054'}08)`,
                      border: `1px solid ${selected?.tint || '#667085'}35`,
                      color: 'var(--text-1)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="us">🇺🇸 US</option>
                    <option value="gb">🇬🇧 UK</option>
                    <option value="fr">🇫🇷 FR</option>
                    <option value="de">🇩🇪 DE</option>
                    <option value="es">🇪🇸 ES</option>
                    <option value="it">🇮🇹 IT</option>
                    <option value="ca">🇨🇦 CA</option>
                    <option value="au">🇦🇺 AU</option>
                    <option value="jp">🇯🇵 JP</option>
                    <option value="br">🇧🇷 BR</option>
                  </select>
                </div>
                <button className="btn sm" onClick={() => setKeywordModal({ open: true, value: '' })}><window.I.Plus /> Add Keyword</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 80px 0.8fr 0.8fr 140px 110px', gap: 12, padding: '12px 14px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--border-0)' }}>
                <button
                  onClick={() => toggleSort('keyword')}
                  style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, color: sortBy.field === 'keyword' ? 'var(--accent)' : 'inherit' }}
                >
                  Keyword {sortBy.field === 'keyword' ? (sortBy.direction === 'asc' ? '↓' : '↑') : '↕'}
                </button>
                <button
                  onClick={() => toggleSort('position')}
                  style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, color: sortBy.field === 'position' ? 'var(--accent)' : 'inherit' }}
                >
                  Position {sortBy.field === 'position' ? (sortBy.direction === 'asc' ? '↓' : '↑') : '↕'}
                </button>
                <div>Trend</div>
                <button
                  onClick={() => toggleSort('popularity')}
                  style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, color: sortBy.field === 'popularity' ? 'var(--accent)' : 'inherit' }}
                >
                  Pop. {sortBy.field === 'popularity' ? (sortBy.direction === 'asc' ? '↓' : '↑') : '↕'}
                </button>
                <button
                  onClick={() => toggleSort('difficulty')}
                  style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 4, color: sortBy.field === 'difficulty' ? 'var(--accent)' : 'inherit' }}
                >
                  Diff. {sortBy.field === 'difficulty' ? (sortBy.direction === 'asc' ? '↓' : '↑') : '↕'}
                </button>
                <div>Top Apps</div>
                <div></div>
              </div>
              {sortedKeywords.map((row, rowIdx) => {
                const history = wrapHistoryPreview(selected?.keywordHistory?.[row.keyword] || []);
                const maxPos = history.length ? Math.max(...history.map(h => h.position)) : 200;
                const minPos = history.length ? Math.min(...history.map(h => h.position)) : 1;

                // Determine trend (up/down/stable)
                const firstPos = history[0]?.position || 200;
                const lastPos = history[history.length - 1]?.position || 200;
                const trend = firstPos > lastPos ? 'up' : firstPos < lastPos ? 'down' : 'stable';
                const trendColor = trend === 'up' ? '#4ade80' : trend === 'down' ? '#f87171' : 'var(--text-3)';

                // Get real apps from catalog for this keyword
                const catalog = buildWrapCatalog();
                const topApps = catalog.slice(rowIdx * 3, rowIdx * 3 + 3);

                return (
                  <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 80px 0.8fr 0.8fr 140px 110px', gap: 12, padding: '13px 14px', alignItems: 'center', borderBottom: '1px solid var(--border-0)' }}>
                    <div style={{ fontWeight: 600 }}>{row.keyword}</div>
                    <div style={{ color: 'var(--text-2)', fontWeight: 600 }}>{row.position}</div>

                    {/* Trend curve - simpler, colored */}
                    <button
                      onClick={() => setHistoryModal({ open: true, keyword: row.keyword, data: history })}
                      style={{
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: 4,
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                      title={`Trend: ${trend}`}
                    >
                      {history.length ? (
                        <svg width="60" height="24" style={{ display: 'block' }}>
                          <polyline
                            points={history.map((p, i) => `${(i / Math.max(1, history.length - 1)) * 56 + 2},${22 - ((maxPos - p.position) / (maxPos - minPos || 1)) * 18}`).join(' ')}
                            fill="none"
                            stroke={trendColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>No data</span>
                      )}
                    </button>

                    <div>{row.popularity}</div>
                    <div style={{ color: '#f0b24b' }}>{row.difficulty}</div>

                    {/* Top apps with real icons - clickable */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {topApps.map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setRoute({ screen: 'app-detail', appId: app.id })}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: `linear-gradient(135deg, ${app.tint || '#667085'}, ${app.tint2 || '#344054'})`,
                            border: '1px solid var(--border-1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 0
                          }}
                          title={app.name}
                        >
                          {app.icon || app.name?.charAt(0)}
                        </button>
                      ))}
                      <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 2 }}>+{row.apps - 3}</span>
                    </div>

                    <button className="btn sm" onClick={() => setSimilarModal({ open: true, keyword: row.keyword, rows: wrapSimilarKeywordsForApp(selected, row.keyword) })}>Similar</button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WrapKeywordExplorerScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const [mode, setMode] = React.useState('by-keyword');
  const [watchlist, setWatchlist] = React.useState(() => wrapReadKeywordWatchlist());
  const [selectedWatchId, setSelectedWatchId] = React.useState(() => wrapReadKeywordWatchlist()[0]?.id || '');
  const [pendingRemoveWatch, setPendingRemoveWatch] = React.useState(null);
  const [keywordModal, setKeywordModal] = React.useState({ open: false, keyword: '', country: 'US' });
  const [bulkKeywordModal, setBulkKeywordModal] = React.useState({ open: false, value: '', country: 'US' });
  const [suggestions, setSuggestions] = React.useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);
  const [suggestionsMeta, setSuggestionsMeta] = React.useState(null);
  const [historyByApp, setHistoryByApp] = React.useState({});
  const [warmupState, setWarmupState] = React.useState({ loading: false, error: '', lastRunAt: '' });
  const [activeCountry, setActiveCountry] = React.useState('US');
  const [selectedKeywordAppId, setSelectedKeywordAppId] = React.useState(trackedApps[0]?.id || '');
  const [appKeywordCountry, setAppKeywordCountry] = React.useState('US');
  const [appKeywordRefreshKey, setAppKeywordRefreshKey] = React.useState(0);
  const [appKeywordState, setAppKeywordState] = React.useState({ app: null, items: [], loading: false, error: '' });
  const [keywordDashboardQuery, setKeywordDashboardQuery] = React.useState('');
  const [keywordPositionFilter, setKeywordPositionFilter] = React.useState('top-50');
  const [keywordMovementFilter, setKeywordMovementFilter] = React.useState('all');
  const [keywordSort, setKeywordSort] = React.useState('rank');

  const selectedWatch = watchlist.find((item) => item.id === selectedWatchId) || watchlist[0] || null;
  const activeKeyword = selectedWatch?.keyword || '';
  const { items: rankings, loading, meta: rankingsMeta, error: rankingsError } = useKeywordRankings(mode === 'by-keyword' ? activeKeyword : '', activeCountry);
  const visibleRankings = rankings.slice(0, 50);
  const selectedKeywordApp = trackedApps.find((item) => item.id === selectedKeywordAppId) || trackedApps[0] || null;

  React.useEffect(() => {
    wrapWriteKeywordWatchlist(watchlist);
  }, [watchlist]);

  React.useEffect(() => {
    if (!selectedWatchId && watchlist[0]?.id) setSelectedWatchId(watchlist[0].id);
  }, [selectedWatchId, watchlist]);

  React.useEffect(() => {
    if (selectedWatch?.country) {
      setActiveCountry(String(selectedWatch.country).toUpperCase());
    }
  }, [selectedWatch?.id, selectedWatch?.country]);

  React.useEffect(() => {
    if (!selectedKeywordAppId && trackedApps[0]?.id) setSelectedKeywordAppId(trackedApps[0].id);
  }, [selectedKeywordAppId, trackedApps]);

  React.useEffect(() => {
    if (selectedKeywordApp?.country) {
      setAppKeywordCountry(String(selectedKeywordApp.country).toUpperCase());
    }
  }, [selectedKeywordApp?.id, selectedKeywordApp?.country]);

  React.useEffect(() => {
    if (!keywordModal.open || !keywordModal.keyword.trim() || keywordModal.keyword.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const response = await fetch(`/api/apple/keyword/suggest?term=${encodeURIComponent(keywordModal.keyword)}&country=${keywordModal.country.toLowerCase()}`);
        const data = await wrapReadJsonResponse(response);
        setSuggestions(data.suggestions || []);
        setSuggestionsMeta(data.meta || null);
      } catch {
        setSuggestions([]);
        setSuggestionsMeta(null);
      }
      setLoadingSuggestions(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [keywordModal.open, keywordModal.keyword, keywordModal.country]);

  const upsertWatch = React.useCallback((keywordValue, countryValue) => {
    const normalizedKeyword = String(keywordValue || '').trim().toLowerCase();
    const normalizedCountry = String(countryValue || 'US').toUpperCase();
    if (!normalizedKeyword) return;
    const nextItem = {
      id: wrapKeywordWatchId(normalizedKeyword, normalizedCountry),
      keyword: normalizedKeyword,
      country: normalizedCountry,
      createdAt: new Date().toISOString(),
      lastWarmupAt: '',
    };
    setWatchlist((current) => {
      const existing = current.find((item) => item.id === nextItem.id);
      if (existing) {
        return [existing, ...current.filter((item) => item.id !== nextItem.id)];
      }
      return [nextItem, ...current];
    });
    setSelectedWatchId(nextItem.id);
    setKeywordModal({ open: false, keyword: '', country: normalizedCountry });
    setSuggestions([]);
    setSuggestionsMeta(null);
  }, []);

  const removeWatch = React.useCallback((watchId) => {
    setWatchlist((current) => {
      const nextItems = current.filter((item) => item.id !== watchId);
      if (selectedWatchId === watchId) {
        setSelectedWatchId(nextItems[0]?.id || '');
      }
      return nextItems;
    });
  }, [selectedWatchId]);

  const bulkUpsertWatch = React.useCallback((rawValue, countryValue) => {
    const normalizedCountry = String(countryValue || 'US').toUpperCase();
    const keywords = wrapParseBulkKeywords(rawValue);
    if (!keywords.length) return 0;
    const nextItems = keywords.map((keyword) => ({
      id: wrapKeywordWatchId(keyword, normalizedCountry),
      keyword,
      country: normalizedCountry,
      createdAt: new Date().toISOString(),
      lastWarmupAt: '',
    }));
    setWatchlist((current) => {
      const dedupedCurrent = current.filter((item) => !nextItems.some((nextItem) => nextItem.id === item.id));
      return [...nextItems, ...dedupedCurrent];
    });
    setSelectedWatchId(nextItems[0]?.id || '');
    setBulkKeywordModal({ open: false, value: '', country: normalizedCountry });
    return nextItems.length;
  }, []);

  const runKeywordWarmup = React.useCallback(async (force = false) => {
    if (!selectedWatch || !rankings.length) return;
    const lastWarmupAt = selectedWatch.lastWarmupAt ? new Date(selectedWatch.lastWarmupAt).getTime() : 0;
    const isStale = !lastWarmupAt || (Date.now() - lastWarmupAt) >= (24 * 60 * 60 * 1000);
    if (!force && !isStale) return;
    setWarmupState({ loading: true, error: '', lastRunAt: '' });
    try {
      const data = await wrapWarmTrackedApps(wrapBuildKeywordTrackedApps(rankings, selectedWatch.keyword, activeCountry));
      const nextHistories = {};
      (data.trackedApps || []).forEach((app) => {
        const history = app?.keywordHistory?.[selectedWatch.keyword];
        if (Array.isArray(history)) {
          nextHistories[wrapKeywordWatchAppId(activeCountry, app)] = history;
        }
      });
      if (Object.keys(nextHistories).length) {
        setHistoryByApp((current) => ({ ...current, ...nextHistories }));
      }
      const warmedAt = data.meta?.warmedAt || new Date().toISOString();
      setWatchlist((current) => current.map((item) => item.id === selectedWatch.id ? { ...item, lastWarmupAt: warmedAt } : item));
      setWarmupState({ loading: false, error: '', lastRunAt: warmedAt });
    } catch (error) {
      setWarmupState({ loading: false, error: error?.message || 'Keyword warmup failed', lastRunAt: '' });
    }
  }, [selectedWatch, rankings, activeCountry]);

  React.useEffect(() => {
    let cancelled = false;
    if (mode !== 'by-keyword' || !selectedWatch || !visibleRankings.length) {
      setHistoryByApp({});
      return undefined;
    }
    async function loadHistory() {
      const entries = await Promise.all(visibleRankings.slice(0, 20).map(async (app) => {
        try {
          const appId = wrapKeywordWatchAppId(activeCountry, app);
          const response = await fetch(`/api/keywords/history?appId=${encodeURIComponent(appId)}&keyword=${encodeURIComponent(selectedWatch.keyword)}&country=${activeCountry.toLowerCase()}`);
          const data = await wrapReadJsonResponse(response);
          if (!response.ok) return [appId, []];
          return [appId, data.history || []];
        } catch {
          return [appId, []];
        }
      }));
      if (!cancelled) {
        setHistoryByApp(Object.fromEntries(entries));
      }
    }
    loadHistory();
    return () => {
      cancelled = true;
    };
  }, [mode, selectedWatch?.id, selectedWatch?.keyword, activeCountry, JSON.stringify(visibleRankings.map((app) => wrapKeywordWatchAppId(activeCountry, app)))]);

  React.useEffect(() => {
    let cancelled = false;
    if (mode !== 'by-app') return undefined;
    if (!selectedKeywordApp) {
      setAppKeywordState({ app: null, items: [], loading: false, error: '' });
      return undefined;
    }

    async function loadKeywordsForApp() {
      setAppKeywordState((current) => ({ ...current, app: selectedKeywordApp, items: [], loading: true, error: '' }));
      try {
        let sourceApp = selectedKeywordApp;
        if (selectedKeywordApp.storeId) {
          const response = await fetch(`/api/apple/app?id=${encodeURIComponent(selectedKeywordApp.storeId)}&country=${appKeywordCountry.toLowerCase()}`);
          const data = await wrapReadJsonResponse(response);
          if (response.ok && data?.app) {
            sourceApp = wrapLiveAppWithMetrics({ ...data.app, country: data.app.country || appKeywordCountry });
          }
        }

        const seedKeywords = wrapExtractKeywordsFromMetadata(sourceApp, sourceApp.category).slice(0, 8);
        const targetStoreId = String(sourceApp.storeId || selectedKeywordApp.storeId || selectedKeywordApp.id || '');
        const targetName = String(sourceApp.name || selectedKeywordApp.name || '').trim().toLowerCase();

        const rows = await Promise.all(seedKeywords.map(async (entry) => {
          try {
            const response = await fetch(`/api/apple/keyword/search?keyword=${encodeURIComponent(entry.keyword)}&country=${appKeywordCountry.toLowerCase()}&limit=24`);
            const data = await wrapReadJsonResponse(response);
            if (!response.ok) {
              return { ...entry, rank: null, totalResults: 0, topApps: [], leader: null };
            }
            const resultApps = (data.results || []).map((app) => wrapLiveAppWithMetrics({ ...app, country: app.country || appKeywordCountry }));
            const rankIndex = resultApps.findIndex((item) => {
              const itemStoreId = String(item.storeId || item.id || '');
              const itemName = String(item.name || '').trim().toLowerCase();
              return (targetStoreId && itemStoreId === targetStoreId) || (targetName && itemName === targetName);
            });
            const topApps = resultApps.slice(0, 3);
            const leader = resultApps.find((item) => {
              const itemStoreId = String(item.storeId || item.id || '');
              const itemName = String(item.name || '').trim().toLowerCase();
              return itemStoreId !== targetStoreId && itemName !== targetName;
            }) || resultApps[0] || null;
            return {
              ...entry,
              rank: rankIndex >= 0 ? rankIndex + 1 : null,
              totalResults: Number(data?.meta?.resultCount) || resultApps.length,
              popularity: Number(data?.meta?.keywordPopularity) || 0,
              difficulty: Number(data?.meta?.keywordDifficulty) || 0,
              topApps,
              leader,
            };
          } catch {
            return { ...entry, rank: null, totalResults: 0, popularity: 0, difficulty: 0, topApps: [], leader: null };
          }
        }));

        if (cancelled) return;
        const sortedRows = rows.sort((a, b) => {
          const aRank = Number.isFinite(a.rank) ? a.rank : 999;
          const bRank = Number.isFinite(b.rank) ? b.rank : 999;
          return aRank - bRank || b.popularity - a.popularity || a.keyword.localeCompare(b.keyword);
        });
        setAppKeywordState({ app: sourceApp, items: sortedRows, loading: false, error: '' });
      } catch (error) {
        if (!cancelled) {
          setAppKeywordState({ app: selectedKeywordApp, items: [], loading: false, error: error?.message || 'App keyword discovery failed' });
        }
      }
    }

    loadKeywordsForApp();
    return () => {
      cancelled = true;
    };
  }, [mode, selectedKeywordApp?.id, selectedKeywordApp?.storeId, selectedKeywordApp?.name, selectedKeywordApp?.category, selectedKeywordApp?.country, appKeywordCountry, appKeywordRefreshKey]);

  const keywordDashboardRows = React.useMemo(() => {
    const query = keywordDashboardQuery.trim().toLowerCase();
    const baseRows = visibleRankings.map((app, index) => {
      const absoluteRank = Number(app.position) || index + 1;
      const history = historyByApp[wrapKeywordWatchAppId(activeCountry, app)] || [];
      const movement = wrapKeywordEvolution(history);
      return {
        app,
        absoluteRank,
        history,
        movement,
      };
    });
    return baseRows
      .filter(({ app, absoluteRank, movement }) => {
        if (query) {
          const haystack = `${app.name || ''} ${app.developer || ''} ${wrapCategoryLabel(app.category)}`.toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        if (keywordPositionFilter === 'top-3' && absoluteRank > 3) return false;
        if (keywordPositionFilter === 'top-10' && absoluteRank > 10) return false;
        if (keywordPositionFilter === '11-25' && (absoluteRank < 11 || absoluteRank > 25)) return false;
        if (keywordPositionFilter === '26-50' && (absoluteRank < 26 || absoluteRank > 50)) return false;
        if (keywordMovementFilter !== 'all' && movement.direction !== keywordMovementFilter) return false;
        return true;
      })
      .sort((a, b) => {
        if (keywordSort === 'movement') {
          const aScore = a.movement.direction === 'up' ? a.movement.delta : a.movement.direction === 'down' ? -a.movement.delta : 0;
          const bScore = b.movement.direction === 'up' ? b.movement.delta : b.movement.direction === 'down' ? -b.movement.delta : 0;
          return bScore - aScore || a.absoluteRank - b.absoluteRank;
        }
        if (keywordSort === 'downloads') return (b.app.downloads || 0) - (a.app.downloads || 0) || a.absoluteRank - b.absoluteRank;
        if (keywordSort === 'revenue') return (b.app.revenue || 0) - (a.app.revenue || 0) || a.absoluteRank - b.absoluteRank;
        if (keywordSort === 'popularity') return (b.app.keywordPopularity || 0) - (a.app.keywordPopularity || 0) || a.absoluteRank - b.absoluteRank;
        return a.absoluteRank - b.absoluteRank;
      });
  }, [visibleRankings, historyByApp, activeCountry, keywordDashboardQuery, keywordPositionFilter, keywordMovementFilter, keywordSort]);

  const keywordDashboardStats = React.useMemo(() => {
    const top3 = visibleRankings.filter((app, index) => (Number(app.position) || index + 1) <= 3).length;
    const top10 = visibleRankings.filter((app, index) => (Number(app.position) || index + 1) <= 10).length;
    const avgPopularity = visibleRankings.length
      ? Math.round(visibleRankings.reduce((sum, app) => sum + Number(app.keywordPopularity || 0), 0) / visibleRankings.length)
      : 0;
    const moversUp = visibleRankings.filter((app) => wrapKeywordEvolution(historyByApp[wrapKeywordWatchAppId(activeCountry, app)] || []).direction === 'up').length;
    return { top3, top10, avgPopularity, moversUp };
  }, [visibleRankings, historyByApp, activeCountry]);

  return (
    <div className="signal-two-pane-page">
      <WrapConfirmModal
        open={Boolean(pendingRemoveWatch)}
        title="Remove Keyword"
        body={pendingRemoveWatch ? `Remove "${pendingRemoveWatch.keyword}" from saved keywords? Daily ranking snapshots for this keyword will stop here.` : ''}
        confirmLabel="Remove"
        onCancel={() => setPendingRemoveWatch(null)}
        onConfirm={() => {
          if (pendingRemoveWatch) removeWatch(pendingRemoveWatch.id);
          setPendingRemoveWatch(null);
        }}
      />
      {keywordModal.open ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={() => setKeywordModal({ open: false, keyword: '', country: 'US' })}>
          <div className="card" style={{ width: 460, padding: 20, background: 'var(--bg-1)' }} onClick={(event) => event.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Add keyword</div>
            <div style={{ color: 'var(--text-3)', marginTop: 6 }}>Save a keyword, keep one daily refresh, and track ranking evolution across the apps currently ranking for it.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 10, marginTop: 14 }}>
              <div style={{ position: 'relative' }}>
                <input
                  className="input"
                  value={keywordModal.keyword}
                  onChange={(event) => setKeywordModal((current) => ({ ...current, keyword: event.target.value }))}
                  placeholder="budget, alarm, calorie tracker..."
                  autoFocus
                />
                {suggestions.length > 0 ? (
                  <div className="card" style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, padding: 8, zIndex: 100, maxHeight: 280, overflow: 'auto' }}>
                    {suggestionsMeta?.fetchedAt ? <div style={{ padding: '6px 10px', color: 'var(--text-3)', fontSize: 11.5 }}>Apple suggestions · refreshed daily · {suggestionsMeta.cached ? 'cache' : 'fresh'}</div> : null}
                    {suggestions.map((item, index) => (
                      <button
                        key={`${item.keyword}-${index}`}
                        onClick={() => upsertWatch(item.keyword, keywordModal.country)}
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', borderRadius: 6, textAlign: 'left', background: 'transparent' }}
                      >
                        <span>{item.keyword}</span>
                        <span className="chip">{item.volumeScore}/100</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <WrapFilterMenu
                label="Country"
                options={WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}` }))}
                selected={keywordModal.country}
                onSelect={(value) => setKeywordModal((current) => ({ ...current, country: value }))}
                placeholder="Country"
              />
            </div>
            {loadingSuggestions ? <div style={{ marginTop: 10, color: 'var(--text-3)', fontSize: 12 }}>Loading suggestions…</div> : null}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <button className="btn" onClick={() => setKeywordModal({ open: false, keyword: '', country: 'US' })}>Cancel</button>
              <button className="btn primary" onClick={() => upsertWatch(keywordModal.keyword, keywordModal.country)} disabled={!keywordModal.keyword.trim()}>
                Save keyword
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {bulkKeywordModal.open ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(0,0,0,0.58)', display: 'grid', placeItems: 'center', padding: 24 }} onClick={() => setBulkKeywordModal({ open: false, value: '', country: selectedWatch?.country || 'US' })}>
          <div className="card" style={{ width: 560, padding: 20, background: 'var(--bg-1)' }} onClick={(event) => event.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Bulk upload keywords</div>
            <div style={{ color: 'var(--text-3)', marginTop: 6 }}>Paste multiple keywords at once. One keyword per line works best, but commas, semicolons, and tabs are also accepted.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 10, marginTop: 14, alignItems: 'start' }}>
              <textarea
                className="input"
                value={bulkKeywordModal.value}
                onChange={(event) => setBulkKeywordModal((current) => ({ ...current, value: event.target.value }))}
                placeholder={`budget tracker\nexpense tracker\nmonthly budget\nfamily budget`}
                autoFocus
                style={{ minHeight: 220, resize: 'vertical', lineHeight: 1.5, paddingTop: 12 }}
              />
              <div style={{ display: 'grid', gap: 10 }}>
                <WrapFilterMenu
                  label="Country"
                  options={WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}` }))}
                  selected={bulkKeywordModal.country}
                  onSelect={(value) => setBulkKeywordModal((current) => ({ ...current, country: value }))}
                  placeholder="Country"
                />
                <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.015)', display: 'grid', gap: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Preview</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{wrapParseBulkKeywords(bulkKeywordModal.value).length}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-4)' }}>unique keywords ready to import</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
              <button className="btn" onClick={() => setBulkKeywordModal({ open: false, value: '', country: selectedWatch?.country || 'US' })}>Cancel</button>
              <button className="btn primary" onClick={() => bulkUpsertWatch(bulkKeywordModal.value, bulkKeywordModal.country)} disabled={!wrapParseBulkKeywords(bulkKeywordModal.value).length}>
                Import keywords
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle icon={window.I.Search} title="Keyword Explorer" body="Search keywords to see which apps rank and their estimated revenue." />
        <div className="seg" style={{ width: '100%' }}>
          <button className={mode === 'by-keyword' ? 'on' : ''} onClick={() => setMode('by-keyword')} style={{ flex: 1 }}>Search by Keyword</button>
          <button className={mode === 'by-app' ? 'on' : ''} onClick={() => setMode('by-app')} style={{ flex: 1 }}>Search by App</button>
        </div>

        {mode === 'by-keyword' ? (
          <div className="card signal-two-pane-list">
              <div style={{ padding: 14, borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <window.I.Key />
                  <strong>Saved Keywords</strong>
                  <span className="chip">{watchlist.length}</span>
                </div>
              </div>
              {!watchlist.length ? (
                <div style={{ padding: 20 }}>
                  <WrapEmptyState icon={window.I.Key} title="No saved keywords yet" body="Save a keyword on the left, then Wrap keeps daily snapshots and shows ranking evolution over time." />
                </div>
              ) : (
                watchlist.map((item) => (
                  <div
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedWatchId(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedWatchId(item.id);
                      }
                    }}
                    style={{ width: '100%', padding: 14, borderBottom: '1px solid var(--border-0)', background: selectedWatch?.id === item.id ? 'rgba(255,132,32,0.08)' : 'transparent', textAlign: 'left', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'grid', gap: 5, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.keyword}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{wrapCountryFlag(item.country)} {wrapCountryName(item.country)}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>{item.lastWarmupAt ? `Updated ${new Date(item.lastWarmupAt).toLocaleDateString()}` : 'Not warmed yet'}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setPendingRemoveWatch(item);
                        }}
                        className="btn icon sm"
                        title={`Remove ${item.keyword}`}
                        aria-label={`Remove ${item.keyword}`}
                      >
                        <window.I.Trash />
                      </button>
                      <window.I.ChevronR />
                    </div>
                  </div>
                ))
              )}
              <div style={{ padding: 14, borderTop: '1px solid var(--border-0)', display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn primary sm" onClick={() => setKeywordModal({ open: true, keyword: '', country: selectedWatch?.country || 'US' })}>
                    <window.I.Plus /> Add keyword
                  </button>
                  <button className="btn sm" onClick={() => setBulkKeywordModal({ open: true, value: '', country: selectedWatch?.country || 'US' })}>
                    Bulk upload
                  </button>
                </div>
              </div>
          </div>
        ) : (
          <div className="card signal-two-pane-list">
            <div style={{ padding: 14, borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <window.I.Device />
                <strong>Tracked Apps</strong>
                <span className="chip">{trackedApps.length}</span>
              </div>
            </div>
            {!trackedApps.length ? (
              <div style={{ padding: 20 }}>
                <WrapEmptyState icon={window.I.Device} title="No tracked apps yet" body="Add apps to the workspace first, then Search by App can inspect likely keyword wedges from their metadata." />
              </div>
            ) : (
              trackedApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedKeywordAppId(app.id)}
                  style={{ width: '100%', padding: 14, borderBottom: '1px solid var(--border-0)', background: selectedKeywordApp?.id === app.id ? 'rgba(255,132,32,0.08)' : 'transparent', textAlign: 'left', display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}
                >
                  <div style={{ display: 'grid', gap: 5, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{wrapCategoryShort(app.category)} · {app.developer || 'Unknown developer'}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>{app.storeId ? 'App Store linked' : 'Manual app'}</div>
                  </div>
                  <window.I.ChevronR />
                </button>
              ))
            )}
            <div style={{ padding: 14, borderTop: '1px solid var(--border-0)', display: 'flex', justifyContent: 'flex-start' }}>
              <button className="btn sm" onClick={() => setRoute({ screen: 'app-tracking' })}>
                Open App Tracking
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="signal-two-pane-main signal-two-pane-main--airy">
        {mode === 'by-keyword' ? (
          <div className="card" style={{ padding: 20, display: 'grid', gap: 16, minWidth: 0 }}>
              {!selectedWatch ? (
                <WrapEmptyState icon={window.I.Key} title="Select a keyword" body="Choose a saved keyword from the left to load its live ranking table and daily movement." />
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedWatch.keyword}</div>
                      <div style={{ color: 'var(--text-3)', marginTop: 4 }}>{wrapCountryFlag(activeCountry)} {wrapCountryName(activeCountry)} · Apple source · daily refresh</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <WrapFilterMenu
                        label="Country"
                        options={WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}` }))}
                        selected={activeCountry}
                        onSelect={setActiveCountry}
                        placeholder="Country"
                        width={220}
                      />
                      <span className="chip">1 refresh / day</span>
                      <span className="chip">{rankingsMeta?.cached ? 'Cache hit' : 'Fresh fetch'}</span>
                      {selectedWatch.lastWarmupAt ? <span className="chip">Last warmup {new Date(selectedWatch.lastWarmupAt).toLocaleDateString()}</span> : null}
                      <button className="btn sm" onClick={() => runKeywordWarmup(true)} disabled={warmupState.loading || !rankings.length}>
                        {warmupState.loading ? 'Refreshing…' : 'Refresh daily data'}
                      </button>
                    </div>
                  </div>
                  {loading ? <WrapLoadingTable rows={5} columns={['110px', '130px', 'minmax(320px, 1.2fr)', '190px', '190px']} /> : null}
                  {rankingsError ? <div style={{ color: '#f87171', fontSize: 13 }}>{rankingsError}</div> : null}
                  {warmupState.error ? <div style={{ color: '#ff8b7d', fontSize: 13 }}>{warmupState.error}</div> : null}
                  {!loading && !rankingsError && !visibleRankings.length ? <div style={{ color: 'var(--text-3)', fontSize: 13 }}>No apps found for "{selectedWatch.keyword}" in {wrapCountryName(activeCountry)}.</div> : null}
                  {!loading && visibleRankings.length ? (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
                        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Apps ranked</div>
                          <div style={{ fontSize: 26, fontWeight: 800 }}>{visibleRankings.length}</div>
                        </div>
                        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Top 3 / Top 10</div>
                          <div style={{ fontSize: 26, fontWeight: 800 }}>{keywordDashboardStats.top3}<span style={{ color: 'var(--text-4)' }}> / {keywordDashboardStats.top10}</span></div>
                        </div>
                        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Avg popularity</div>
                          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)' }}>{keywordDashboardStats.avgPopularity}</div>
                        </div>
                        <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Moving up</div>
                          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--success)' }}>{keywordDashboardStats.moversUp}</div>
                        </div>
                      </div>

                      <div className="card app-detail-stroke" style={{ overflow: 'hidden', padding: 14, display: 'grid', gap: 12, background: 'rgba(255,255,255,0.012)', minWidth: 0 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1.2fr) 150px 150px 170px', gap: 10, alignItems: 'center' }}>
                          <input
                            className="input"
                            value={keywordDashboardQuery}
                            onChange={(event) => setKeywordDashboardQuery(event.target.value)}
                            placeholder="Search app, developer, category..."
                          />
                          <WrapFilterMenu
                            label="Position"
                            options={[
                              { value: 'top-50', label: 'Top 50' },
                              { value: 'top-3', label: 'Top 3' },
                              { value: 'top-10', label: 'Top 10' },
                              { value: '11-25', label: '11-25' },
                              { value: '26-50', label: '26-50' },
                            ]}
                            selected={keywordPositionFilter}
                            onSelect={setKeywordPositionFilter}
                            placeholder="Position"
                            width={150}
                          />
                          <WrapFilterMenu
                            label="Trend"
                            options={[
                              { value: 'all', label: 'All trends' },
                              { value: 'up', label: 'Moving up' },
                              { value: 'flat', label: 'Flat' },
                              { value: 'down', label: 'Moving down' },
                            ]}
                            selected={keywordMovementFilter}
                            onSelect={setKeywordMovementFilter}
                            placeholder="Trend"
                            width={150}
                          />
                          <WrapFilterMenu
                            label="Sort"
                            options={[
                              { value: 'rank', label: 'Best rank' },
                              { value: 'movement', label: 'Best movement' },
                              { value: 'downloads', label: 'Most downloads' },
                              { value: 'revenue', label: 'Most revenue' },
                              { value: 'popularity', label: 'Most popular' },
                            ]}
                            selected={keywordSort}
                            onSelect={setKeywordSort}
                            placeholder="Sort"
                            width={170}
                          />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                          <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>
                            {keywordDashboardRows.length} visible apps for <span style={{ color: 'var(--text-1)', fontWeight: 700 }}>{selectedWatch.keyword}</span>
                          </div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {keywordDashboardQuery ? <span className="chip">Search: {keywordDashboardQuery}</span> : null}
                            {keywordPositionFilter !== 'top-50' ? <span className="chip">Position: {keywordPositionFilter}</span> : null}
                            {keywordMovementFilter !== 'all' ? <span className="chip">Trend: {keywordMovementFilter}</span> : null}
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '96px 116px minmax(320px, 1.45fr) 110px 110px 150px 150px', gap: 16, padding: '8px 12px 10px', color: 'var(--text-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          <div>Rank</div>
                          <div>Trend</div>
                          <div>App</div>
                          <div>Pop.</div>
                          <div>Diff.</div>
                          <div>Downloads</div>
                          <div>Revenue</div>
                        </div>
                        {keywordDashboardRows.map(({ app, absoluteRank, movement }) => {
                          const medalStyle = absoluteRank === 1
                            ? { background: 'linear-gradient(135deg, #f7d774, #b98519)', color: '#1a1200', boxShadow: '0 0 24px rgba(247,215,116,0.25)' }
                            : absoluteRank === 2
                              ? { background: 'linear-gradient(135deg, #e9edf4, #8d99a8)', color: '#10151d', boxShadow: '0 0 24px rgba(233,237,244,0.18)' }
                              : absoluteRank === 3
                                ? { background: 'linear-gradient(135deg, #d99a6c, #8f4f22)', color: '#190d04', boxShadow: '0 0 24px rgba(217,154,108,0.18)' }
                                : { background: 'rgba(255,255,255,0.06)', color: 'var(--text-1)', boxShadow: 'none' };
                          const movementColor = movement.direction === 'up' ? 'var(--success)' : movement.direction === 'down' ? '#ff8b7d' : 'var(--text-4)';
                          const movementTransform = movement.direction === 'down' ? 'rotate(180deg)' : movement.direction === 'flat' ? 'rotate(90deg)' : 'none';
                          return (
                            <button
                              key={`${selectedWatch.id}-${app.id}`}
                              className="card"
                              onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })}
                              style={{ width: '100%', display: 'grid', gridTemplateColumns: '96px 116px minmax(320px, 1.45fr) 110px 110px 150px 150px', gap: 16, padding: '14px 12px', alignItems: 'center', textAlign: 'left', background: absoluteRank <= 3 ? 'rgba(255,255,255,0.018)' : 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border-0)' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, ...medalStyle }}>
                                  {absoluteRank}
                                </div>
                              </div>
                              <div style={{ display: 'grid', gap: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{ color: movementColor, minWidth: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <window.I.ArrowUp style={{ width: 14, height: 14, transform: movementTransform }} />
                                  </span>
                                  <span style={{ color: movementColor, fontSize: 15, fontWeight: 800 }}>
                                    {movement.direction === 'flat' ? '0' : `${movement.direction === 'up' ? '+' : '-'}${movement.delta}`}
                                  </span>
                                </div>
                                <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>
                                  {movement.direction === 'up' ? 'Gaining' : movement.direction === 'down' ? 'Dropping' : 'Stable'}
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                                {wrapAppIcon(app, 46)}
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontSize: 15, fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                                  <div style={{ color: 'var(--text-3)', fontSize: 12.5, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {app.developer || 'Unknown developer'} · {wrapCategoryShort(app.category)}
                                  </div>
                                </div>
                              </div>
                              <div style={{ display: 'grid', gap: 6 }}>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>{app.keywordPopularity || 0}</div>
                                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                  <div style={{ width: `${Math.min(100, Number(app.keywordPopularity || 0))}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #ff7a45, #f5ae61)' }} />
                                </div>
                              </div>
                              <div style={{ display: 'grid', gap: 6 }}>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>{Math.max(5, Math.round((Number(app.keywordPopularity || 0) / 100) * 70))}</div>
                                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                  <div style={{ width: `${Math.min(100, Math.max(5, Math.round((Number(app.keywordPopularity || 0) / 100) * 70)))}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #90e26b, #f0b24b)' }} />
                                </div>
                              </div>
                              <div style={{ fontSize: 18, fontWeight: 800 }}>{wrapCompact(app.downloads)}</div>
                              <div style={{ fontSize: 19, fontWeight: 900 }}>{wrapMoney(app.revenue)}</div>
                            </button>
                          );
                        })}
                        {!keywordDashboardRows.length ? (
                          <div style={{ padding: '12px 12px 4px', color: 'var(--text-3)', fontSize: 13 }}>
                            No apps match the current dashboard filters.
                          </div>
                        ) : null}
                      </div>
                      {rankingsMeta?.fetchedAt ? <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Last refresh: {new Date(rankingsMeta.fetchedAt).toLocaleString()} · Next refresh after {new Date(rankingsMeta.nextRefreshAt).toLocaleString()}</div> : null}
                    </>
                  ) : null}
                </>
              )}
          </div>
        ) : (
          <div className="card" style={{ padding: 20, display: 'grid', gap: 16, minWidth: 0 }}>
              {!selectedKeywordApp ? (
                <WrapEmptyState icon={window.I.Search} title="Select an app" body="Choose a tracked app on the left to inspect its likely keyword wedge and ranking footprint." />
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                      {wrapAppIcon(selectedKeywordApp)}
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedKeywordApp.name}</div>
                        <div style={{ color: 'var(--text-3)', marginTop: 4 }}>{wrapCategoryLabel(selectedKeywordApp.category)} · {selectedKeywordApp.developer || 'Unknown developer'}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <WrapFilterMenu
                        label="Country"
                        options={WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}` }))}
                        selected={appKeywordCountry}
                        onSelect={setAppKeywordCountry}
                        placeholder="Country"
                        width={220}
                      />
                      <button className="btn sm" onClick={() => setAppKeywordRefreshKey((current) => current + 1)}>
                        Refresh keywords
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
                    <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Keyword seeds</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>{appKeywordState.items.length}</div>
                    </div>
                    <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Ranked terms</div>
                      <div style={{ fontSize: 24, fontWeight: 800 }}>{appKeywordState.items.filter((item) => Number.isFinite(item.rank)).length}</div>
                    </div>
                    <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.015)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Avg popularity</div>
                      <div style={{ fontSize: 24, fontWeight: 800 }}>
                        {appKeywordState.items.length ? Math.round(appKeywordState.items.reduce((sum, item) => sum + Number(item.popularity || 0), 0) / appKeywordState.items.length) : 0}
                      </div>
                    </div>
                  </div>

                  {appKeywordState.loading ? <WrapLoadingTable rows={5} columns={['1.25fr', '90px', '90px', '90px', '1fr', '130px']} /> : null}
                  {appKeywordState.error ? <div style={{ color: '#f87171', fontSize: 13 }}>{appKeywordState.error}</div> : null}
                  {!appKeywordState.loading && !appKeywordState.error && !appKeywordState.items.length ? <div style={{ color: 'var(--text-3)', fontSize: 13 }}>No keyword candidates found for this app yet.</div> : null}

                  {!appKeywordState.loading && appKeywordState.items.length ? (
                    <div className="card app-detail-stroke" style={{ overflow: 'hidden', padding: 14, display: 'grid', gap: 10, background: 'rgba(255,255,255,0.012)', minWidth: 0 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 90px 90px 90px 1fr 130px', gap: 14, padding: '8px 12px 10px', color: 'var(--text-3)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        <div>Keyword</div>
                        <div>Rank</div>
                        <div>Pop.</div>
                        <div>Diff.</div>
                        <div>Leader</div>
                        <div>Top apps</div>
                      </div>
                      {appKeywordState.items.map((row) => (
                        <div key={`${selectedKeywordApp.id}-${row.keyword}`} style={{ display: 'grid', gridTemplateColumns: '1.25fr 90px 90px 90px 1fr 130px', gap: 14, padding: '14px 12px', alignItems: 'center', borderTop: '1px solid var(--border-0)' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{row.keyword}</div>
                            <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>{row.totalResults || 0} sampled results</div>
                          </div>
                          <div style={{ fontWeight: 700, color: Number.isFinite(row.rank) ? 'var(--text-1)' : 'var(--text-4)' }}>
                            {Number.isFinite(row.rank) ? `#${row.rank}` : '—'}
                          </div>
                          <div>{row.popularity}</div>
                          <div style={{ color: '#f0b24b' }}>{row.difficulty}</div>
                          <div style={{ minWidth: 0 }}>
                            {row.leader ? (
                              <>
                                <div style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.leader.name}</div>
                                <div style={{ fontSize: 11.5, color: 'var(--text-4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.leader.developer || wrapCategoryShort(row.leader.category)}</div>
                              </>
                            ) : (
                              <span style={{ color: 'var(--text-4)', fontSize: 12 }}>No leader</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            {(row.topApps || []).slice(0, 3).map((app) => (
                              <button
                                key={`${row.keyword}-${app.id || app.storeId}`}
                                onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country || appKeywordCountry })}
                                style={{ width: 28, height: 28, padding: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'transparent', display: 'grid', placeItems: 'center' }}
                                title={app.name}
                              >
                                {app.icon ? <img src={app.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 11, fontWeight: 700 }}>{String(app.name || 'A').charAt(0)}</span>}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

function useKeywordRankings(keyword, country) {
  const [state, setState] = React.useState({ items: [], loading: false, meta: null, error: '' });

  React.useEffect(() => {
    if (!keyword || !keyword.trim()) {
      setState({ items: [], loading: false, meta: null, error: '' });
      return;
    }

    let cancelled = false;

    async function load() {
      setState({ items: [], loading: true, meta: null, error: '' });
      try {
        const response = await fetch(`/api/apple/keyword/search?keyword=${encodeURIComponent(keyword)}&country=${country.toLowerCase()}&limit=50`);
        const data = await wrapReadJsonResponse(response);

        if (!response.ok) {
          throw new Error(data?.error || 'Keyword data unavailable');
        }

        if (!cancelled) {
          const enriched = (data.results || []).map(app => wrapLiveAppWithMetrics(app));
          setState({ items: enriched, loading: false, meta: data.meta || null, error: '' });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ items: [], loading: false, meta: null, error: error?.message || 'Keyword data unavailable' });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [keyword, country]);

  return state;
}

function wrapScreenshotDirectionForApp(app) {
  const category = String(app?.category || '').toLowerCase();
  if (['business', 'finance', 'developer-tools', 'productivity', 'utilities'].includes(category)) return 'mono-benchmark';
  if (['health-fitness', 'medical', 'lifestyle'].includes(category)) return 'glass-premium';
  if (['games', 'entertainment', 'social-networking'].includes(category)) return 'playful-convert';
  if (['photo-video', 'shopping', 'sports'].includes(category)) return 'cinematic-glow';
  if (['travel', 'education', 'books'].includes(category)) return 'editorial-note';
  return 'clarity-grid';
}

function wrapStyleScreenshotProject(result, trackedApp) {
  if (!result?.workspace || !result?.project || !trackedApp) return result;
  const directionId = wrapScreenshotDirectionForApp(trackedApp);
  const direction = window.SHIPSHOT?.styleDirectionById?.(directionId);
  if (!direction) return result;
  const base = trackedApp.tint || '#D27D2D';
  const to = trackedApp.tint2 || '#0A0000';
  const backgroundValue = `linear-gradient(180deg, ${base}, ${to})`;
  const styleScreen = (screen) => ({
    ...window.SHIPSHOT.applyStyleDirection(screen, directionId),
    bg: backgroundValue,
  });
  const styledProject = {
    ...result.project,
    styleId: direction.templateId || result.project.styleId,
    projectTheme: {
      directionId,
      templateId: direction.templateId || result.project.styleId || 't1',
      textStyle: direction.textStyle || 'crisp',
      ambientStyle: direction.ambientStyle || 'glow',
      ctaStyle: direction.ctaStyle || 'pill',
      chromeStyle: direction.chromeStyle || 'solid',
      frameStyle: direction.frameStyle || 'ios-classic',
      background: {
        mode: 'gradient',
        value: backgroundValue,
        base,
        to,
        angle: 180,
      },
    },
    variantsData: (result.project.variantsData || []).map((variant) => ({
      ...variant,
      templateId: direction.templateId || variant.templateId,
      screensData: (variant.screensData || []).map(styleScreen),
    })),
  };
  const activeVariant = styledProject.variantsData?.find((variant) => variant.id === styledProject.activeVariantId) || styledProject.variantsData?.[0] || null;
  if (activeVariant) {
    styledProject.screensData = activeVariant.screensData;
    styledProject.screens = activeVariant.screensData.length;
    styledProject.thumb = activeVariant.screensData.map((screen) => screen.kind);
  }
  return {
    ...result,
    workspace: {
      ...result.workspace,
      projects: (result.workspace.projects || []).map((project) => project.id === styledProject.id ? styledProject : project),
    },
    project: styledProject,
  };
}

function WrapScreenshotsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const tracked = wrapTrackedFromWorkspace(workspace);
  const [selectedId, setSelectedId] = React.useState(tracked[0]?.id || '');
  const [modalOpen, setModalOpen] = React.useState(false);
  const selected = tracked.find((item) => item.id === selectedId) || tracked[0] || null;
  const [generation, setGeneration] = React.useState(null);
  const fileInputRef = React.useRef(null);
  React.useEffect(() => { if (!selectedId && tracked[0]?.id) setSelectedId(tracked[0].id); }, [selectedId, tracked]);

  const handleScreenshotUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (!selected || !files.length) return;
    Promise.all(files.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({
        id: `shot-input-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result,
      });
      reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
      reader.readAsDataURL(file);
    }))).then((items) => {
      updateWrapWorkspace((current) => ({
        ...current,
        trackedApps: (current.trackedApps || []).map((app) => app.id === selected.id ? {
          ...app,
          screenshotInputs: [...(app.screenshotInputs || []), ...items].slice(0, 10),
        } : app),
      }));
      if (fileInputRef.current) fileInputRef.current.value = '';
    }).catch(() => {});
  };

  const openProjectForScreenshots = (trackedApp) => {
    if (!trackedApp) return null;
    const directionId = wrapScreenshotDirectionForApp(trackedApp);
    const direction = window.SHIPSHOT?.styleDirectionById?.(directionId);
    const templateId = direction?.templateId || 't1';
    const projectLabel = `${trackedApp.name} screenshots ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const created = window.SHIPSHOT?.createProjectFromInput?.(workspace, {
      projectName: projectLabel,
      appId: trackedApp.id,
      appName: trackedApp.name,
      appDescription: trackedApp.description || '',
      category: trackedApp.category || 'productivity',
      audience: 'General audience',
      country: trackedApp.country === 'US' ? 'en-US' : 'en-US',
      style: templateId,
      sourceType: 'app-store',
      sourceValue: trackedApp.storeUrl || '',
      sourceReference: trackedApp.storeUrl || '',
      sourceMetadata: {
        appName: trackedApp.name,
        description: trackedApp.description || '',
        subtitle: trackedApp.subtitle || '',
        developer: trackedApp.developer || '',
        icon: trackedApp.icon || '',
        rating: trackedApp.rating || 0,
        reviews: trackedApp.reviews || 0,
        category: trackedApp.category || 'productivity',
        country: trackedApp.country || 'US',
        screenshots: wrapScreenshotSets(trackedApp),
      },
    });
    const result = wrapStyleScreenshotProject(created, trackedApp);

    if (!result?.workspace || !result?.project) return null;
    window.SHIPSHOT?.saveWorkspace?.(result.workspace);
    updateWrapWorkspace(() => result.workspace);
    const editorUrl = window.__shipshotBuildEditorUrl?.(result.project.id);
    if (editorUrl) {
      const opened = window.open(editorUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        setRoute?.({ screen: 'project', projectId: result.project.id, tab: 'edit' });
      }
    } else {
      setRoute?.({ screen: 'project', projectId: result.project.id, tab: 'edit' });
    }
    return result.project.id;
  };

  const startGeneration = () => {
    if (!selected) return;
    const id = `shot-${Date.now().toString(36)}`;
    addWrapJob({ id, label: 'Generating Screenshots', meta: selected.name, progress: 18, status: 'running' });
    let progress = 18;
    const timer = window.setInterval(() => {
      progress += 18;
      if (progress >= 100) {
        window.clearInterval(timer);
        updateWrapJob(id, { progress: 100, status: 'done', label: 'Screenshots ready', meta: selected.name });
        updateWrapWorkspace((current) => ({
          ...current,
          screenshotGenerations: [{ id, appId: selected.id, name: selected.name, createdAt: new Date().toISOString() }, ...(current.screenshotGenerations || [])],
        }));
        setGeneration(id);
        openProjectForScreenshots(selected);
        window.setTimeout(() => clearWrapJob(id), 2500);
      } else {
        updateWrapJob(id, { progress });
      }
    }, 500);
  };
  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle icon={window.I.Image} title="AI Screenshot Generator" body="Upload your screenshots and let AI create optimized App Store visuals." />
        <WrapAppsSidebarCard
          items={tracked}
          selectedId={selected?.id}
          onSelect={(app) => setSelectedId(app.id)}
          onAdd={() => setModalOpen(true)}
          onRemove={(app) => wrapRemoveTrackedApp(app, () => {
            if (selected?.id === app.id) setSelectedId(tracked.find((item) => item.id !== app.id)?.id || '');
          })}
          emptyTitle="No apps tracked yet"
          emptyBody="Add an app first, then upload screenshots and generate new store visuals."
          renderMeta={(app) => `${app.keywordCount} keywords · ${(app.screenshotInputs || []).length} screenshots`}
        />
      </div>
      <div className="signal-two-pane-main signal-two-pane-main--airy">
        {!selected ? <WrapEmptyState icon={window.I.Image} title="Generate App Store screenshots" body="Select a tracked app from the left, or add a new app to get started." /> : (
          <>
            <div className="card" style={{ padding: 18, display: 'grid', gap: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>App Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                <input className="input" value={selected.storeUrl || ''} readOnly />
                <button className="btn primary">Auto-fill</button>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                  <Field label="App Name" value={selected.name} />
                  <Field label="App Subtitle" value="The best app ever" />
                  <Field label="Developer" value={selected.developer} />
                  <Field label="Category" value={wrapCategoryLabel(selected.category)} />
                  <label>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>App Description</div>
                    <textarea className="input" style={{ minHeight: 96, padding: 12 }} value={selected.description} readOnly />
                  </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Target Audience" value="People looking to improve conversion and retention." />
                <Field label="App Store Keywords" value={wrapKeywordsForApp(selected).slice(0, 4).map((item) => item.keyword).join(', ')} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                <Field label="Primary Color" value="#FF6B00" />
                <Field label="Secondary Color" value="#000000" />
                <Field label="Accent Color" value="#FFFFFF" />
              </div>
            </div>
            <div className="card" style={{ padding: 18, display: 'grid', gap: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>App Screenshots</div>
              <div className="card" style={{ padding: 16, display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 28, height: 28, borderRadius: 10, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}><window.I.Image /></div><strong>Upload your app screenshots</strong></div>
                <div style={{ color: 'var(--text-3)' }}>Add the real screenshots from your app. We generate one new screenshot per upload. Recommended: 6.</div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleScreenshotUpload} />
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button type="button" onClick={() => fileInputRef.current?.click()} style={{ width: 124, height: 264, borderRadius: 20, border: '1px dashed var(--border-1)', display: 'grid', placeItems: 'center', color: 'var(--text-3)' }}>
                  <div style={{ display: 'grid', justifyItems: 'center', gap: 10 }}><div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.05)', display: 'grid', placeItems: 'center' }}><window.I.Plus /></div><div>Add</div></div>
                </button>
                {(selected.screenshotInputs || []).map((item) => (
                  <div key={item.id} style={{ width: 124, display: 'grid', gap: 8 }}>
                    <div style={{ width: 124, height: 264, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border-1)', background: 'var(--bg-2)' }}>
                      <img src={item.dataUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'right' }}>{(selected.screenshotInputs || []).length}/10 uploaded</div>
            </div>
            <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, background: 'var(--accent-soft)' }}>
              <div><div style={{ fontSize: 18, fontWeight: 700 }}>Ready to generate?</div>{generation ? <div style={{ color: 'var(--text-3)', marginTop: 4 }}>Latest job completed locally.</div> : null}</div>
              <button className="btn primary lg" onClick={startGeneration}><window.I.Wand /> Generate Screenshots</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>{label}</div><input className="input" value={value} readOnly /></label>;
}

function MetaRow({ k, v }) {
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</div>
      <div style={{ color: 'var(--text-1)', lineHeight: 1.55 }}>{v}</div>
    </div>
  );
}

function WrapSkeletonBlock({ width = '100%', height = 14, radius = 8, style = {} }) {
  return <div className="shimmer" style={{ width, height, borderRadius: radius, ...style }} />;
}

function WrapLoadingCard({ lines = ['78%', '54%', '66%'], height = 16, padding = 18, style = {} }) {
  return (
    <div className="card" style={{ padding, display: 'grid', gap: 12, ...style }}>
      {lines.map((line, index) => (
        <WrapSkeletonBlock key={`${line}-${index}`} width={line} height={height} />
      ))}
    </div>
  );
}

function WrapLoadingTable({ rows = 5, columns = ['1.8fr', '1fr', '0.8fr', '0.8fr'], style = {}, showHeader = true }) {
  return (
    <div className="card" style={{ overflow: 'hidden', ...style }}>
      {showHeader ? (
        <div style={{ display: 'grid', gridTemplateColumns: columns.join(' '), gap: 12, padding: '12px 14px', borderBottom: '1px solid var(--border-1)' }}>
          {columns.map((_, index) => <WrapSkeletonBlock key={`head-${index}`} width="70%" height={11} radius={6} />)}
        </div>
      ) : null}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} style={{ display: 'grid', gridTemplateColumns: columns.join(' '), gap: 12, padding: '14px', alignItems: 'center', borderTop: rowIndex ? '1px solid var(--border-0)' : 'none' }}>
          {columns.map((_, colIndex) => (
            <WrapSkeletonBlock key={`cell-${rowIndex}-${colIndex}`} width={colIndex === 0 ? '82%' : colIndex === columns.length - 1 ? '64%' : '48%'} height={14} />
          ))}
        </div>
      ))}
    </div>
  );
}

function WrapLoadingAppRows({ rows = 4 }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={`app-row-${index}`} className="card" style={{ padding: '16px 14px', display: 'grid', gridTemplateColumns: '56px minmax(0, 1fr) 110px', gap: 14, alignItems: 'center' }}>
          <WrapSkeletonBlock width={56} height={56} radius={16} />
          <div style={{ display: 'grid', gap: 10 }}>
            <WrapSkeletonBlock width={index % 2 === 0 ? '56%' : '68%'} height={16} />
            <WrapSkeletonBlock width={index % 2 === 0 ? '34%' : '42%'} height={12} />
          </div>
          <WrapSkeletonBlock width="88%" height={18} />
        </div>
      ))}
    </div>
  );
}

function WrapReviewsScreen() {
  const workspace = useWrapWorkspace();
  const tracked = wrapTrackedFromWorkspace(workspace);
  const [selectedId, setSelectedId] = React.useState(tracked[0]?.id || '');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [tab, setTab] = React.useState('Reviews');
  const [page, setPage] = React.useState(1);
  const [reviewCountry, setReviewCountry] = React.useState(tracked[0]?.country || 'US');
  const [state, setState] = React.useState({ reviews: [], loading: false, error: '' });
  const selected = tracked.find((item) => item.id === selectedId) || tracked[0] || null;

  React.useEffect(() => {
    if (!selectedId && tracked[0]?.id) setSelectedId(tracked[0].id);
  }, [selectedId, tracked]);

  React.useEffect(() => {
    if (selected?.country) setReviewCountry(selected.country);
  }, [selected?.id, selected?.country]);

  React.useEffect(() => {
    let cancelled = false;
    if (!selected?.storeId) {
      setState({ reviews: [], loading: false, error: '' });
      return undefined;
    }
    setState((current) => ({ ...current, loading: true, error: '' }));
    fetch(`/api/apple/reviews?id=${encodeURIComponent(selected.storeId)}&country=${String(reviewCountry || 'US').toLowerCase()}&page=${page}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load reviews');
        return data.reviews || [];
      })
      .then((reviews) => {
        if (!cancelled) {
          setState({ reviews, loading: false, error: '' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ reviews: [], loading: false, error: error?.message || 'Could not load reviews' });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [selected?.storeId, reviewCountry, page]);

  const averageRating = state.reviews.length ? (state.reviews.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) / state.reviews.length).toFixed(1) : null;
  const reviewSemantics = React.useMemo(() => wrapExtractReviewSemantics(state.reviews), [state.reviews]);
  const semanticHighlights = reviewSemantics.highlights;
  const improvementIdeas = reviewSemantics.improvementIdeas;
  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {!tracked.length ? (
        <WrapEmptyState icon={window.I.Device} title="No apps monitored yet" body="Add your first app to start monitoring reviews, sentiment, and AI-powered insights." />
      ) : (
        <>
          <div className="signal-two-pane-sidebar">
            <WrapSectionTitle icon={window.I.Book} title="Reviews" body="Monitor reviews and sentiment across your apps." />
          <WrapAppsSidebarCard
            items={tracked}
            selectedId={selected?.id}
            onSelect={(app) => { setSelectedId(app.id); setPage(1); }}
            onAdd={() => setModalOpen(true)}
            onRemove={(app) => wrapRemoveTrackedApp(app, () => {
              if (selected?.id === app.id) setSelectedId(tracked.find((item) => item.id !== app.id)?.id || '');
            })}
            emptyTitle="No apps monitored yet"
            emptyBody="Add your first app to start monitoring reviews, sentiment, and AI-powered insights."
            renderMeta={(app) => app.storeId ? `${app.countryFlag} App Store` : 'No App Store id'}
          />
          </div>
          <div className="signal-two-pane-main signal-two-pane-main--airy">
          <div className="card" style={{ padding: 18, display: 'grid', gap: 16 }}>
            {!selected ? null : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {wrapAppIcon(selected)}
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700 }}>{selected.name}</div>
                      <div style={{ color: 'var(--text-3)' }}>{selected.developer}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <WrapFilterMenu
                      label="Storefront"
                      options={WRAP_COUNTRIES.map((item) => ({ value: item.code, label: `${item.flag} ${item.name}` }))}
                      selected={reviewCountry}
                      onSelect={(value) => { setReviewCountry(value); setPage(1); }}
                      placeholder="Select storefront"
                      width={220}
                    />
                    {selected.storeUrl ? (
                      <a
                        className="btn sm"
                        href={selected.storeUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ height: 52, minHeight: 52, padding: '0 18px', borderRadius: 18, display: 'inline-flex', alignItems: 'center' }}
                      >
                        Open Store
                      </a>
                    ) : null}
                  </div>
                </div>
                <div className="seg" style={{ width: 'fit-content' }}>
                  {['Overview', 'Reviews', 'Semantics', 'Improvements'].map((item) => <button key={item} className={tab === item ? 'on' : ''} onClick={() => setTab(item)}>{item}</button>)}
                </div>
                {!selected.storeId ? <WrapEmptyState icon={window.I.Book} title="No App Store source" body="This tracked app was not imported from the App Store, so there are no live App Store reviews to load." /> : null}
                {selected.storeId && state.loading ? <WrapLoadingCard lines={['28%', '100%', '92%', '84%']} style={{ marginTop: 4 }} /> : null}
                {selected.storeId && !state.loading && state.error ? <div style={{ color: '#ff8b7d' }}>{state.error}</div> : null}
                {selected.storeId && !state.loading && !state.error && tab === 'Overview' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 12 }}>
                    <StatCard title="Loaded Reviews" value={wrapCompactCount(state.reviews.length)} />
                    <StatCard title="Avg Rating" value={averageRating ? `★ ${averageRating}` : '—'} />
                    <StatCard title="Top Themes" value={semanticHighlights.length ? semanticHighlights.slice(0, 2).map((item) => item.label || item.word).join(' · ') : '—'} />
                  </div>
                ) : null}
                {selected.storeId && !state.loading && !state.error && tab === 'Reviews' ? (
                  <div style={{ display: 'grid', gap: 10 }}>
                    {state.reviews.map((review) => (
                      <div key={review.id} className="card" style={{ padding: 16, display: 'grid', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>{review.title || 'Untitled review'}</div>
                            <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{review.author} · {review.version || 'Unknown version'} · {wrapRelativeTime(review.updatedAt, 'Recently')}</div>
                          </div>
                          <span className="chip accent">★ {wrapRating(review.rating)}</span>
                        </div>
                        <div style={{ color: 'var(--text-2)', lineHeight: 1.7 }}>{review.content}</div>
                      </div>
                    ))}
                    {!state.reviews.length ? <div style={{ color: 'var(--text-3)' }}>No written reviews returned for this page.</div> : null}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                      <button className="btn sm" onClick={() => setPage((current) => Math.max(1, current - 1))}>Prev</button>
                      <span className="chip">Page {page}</span>
                      <button className="btn sm" onClick={() => setPage((current) => current + 1)}>Next</button>
                    </div>
                  </div>
                ) : null}
                {selected.storeId && !state.loading && !state.error && tab === 'Semantics' ? (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {semanticHighlights.map((item) => <span key={item.phrase || item.word} className="chip accent">{item.label} · {item.count}</span>)}
                    {!semanticHighlights.length ? <div style={{ color: 'var(--text-3)' }}>Not enough review text yet.</div> : null}
                  </div>
                ) : null}
                {selected.storeId && !state.loading && !state.error && tab === 'Improvements' ? (
                  <div style={{ display: 'grid', gap: 10 }}>
                    {reviewSemantics.phrases.slice(0, 6).map((item) => (
                      <details key={item.phrase} className="editor-list-row" style={{ padding: '12px 14px' }}>
                        <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                          <span>{`Users mention "${item.label}" in ${item.count} recent reviews.`}</span>
                          <span className="chip">{item.count}</span>
                        </summary>
                        <div style={{ marginTop: 10, color: 'var(--text-2)', lineHeight: 1.65, display: 'grid', gap: 8 }}>
                          <div>This cluster is strong enough to deserve a direct product or UX check.</div>
                          {item.example?.title ? <div><strong>Example review:</strong> {item.example.title}</div> : null}
                          {item.example?.content ? <div style={{ color: 'var(--text-3)' }}>{item.example.content}</div> : null}
                        </div>
                      </details>
                    ))}
                    {!improvementIdeas.length ? <div style={{ color: 'var(--text-3)' }}>No clear improvement cluster yet.</div> : null}
                  </div>
                ) : null}
              </>
            )}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

function WrapHotIdeasScreen({ setRoute }) {
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const generatedIdeas = React.useMemo(() => [
    {
      id: 'ai-poster',
      name: 'AI Promotional Poster Generator',
      desc: 'An AI-powered design generator that creates customized flyers, social posts, and promotional graphics with smart templates and brand consistency.',
      category: 'graphics_and_design',
      reviews: 18,
      rating: 4.6,
      wedge: 'Template speed for local businesses and creators',
      whyNow: 'Smaller brands want launch-ready assets without agency overhead.',
      buildTime: '6-9 months',
      signalScore: 74,
    },
    {
      id: 'strategia-ai',
      name: 'AI-Driven Sports Analytics & Betting Insights',
      desc: 'An AI-powered sports analytics platform that provides match predictions, player statistics, and betting insights with real-time data analysis.',
      category: 'sports',
      reviews: 10,
      rating: 5.0,
      wedge: 'Explainable predictions instead of black-box picks',
      whyNow: 'Sports audiences increasingly expect live data overlays and sharper pre-match context.',
      buildTime: '4-6 months',
      signalScore: 79,
    },
    {
      id: 'grooming-ai',
      name: 'AI Virtual Grooming Simulator',
      desc: 'A virtual makeover app that uses artificial intelligence to apply hairstyles, beards, makeup, and accessories in real-time with AR technology.',
      category: 'photo_and_video',
      reviews: 19,
      rating: 4.6,
      wedge: 'Fast try-on for men’s grooming and barbershop inspiration',
      whyNow: 'AR try-on is moving from novelty to practical purchase support.',
      buildTime: '6-9 months',
      signalScore: 71,
    },
    {
      id: 'pulse-ai',
      name: 'AI Conversation Starter Coach',
      desc: 'An AI-powered dating and social coach that suggests personalized icebreakers, conversation topics, and date ideas based on personality analysis.',
      category: 'lifestyle',
      reviews: 24,
      rating: 4.8,
      wedge: 'Context-aware suggestions with less cringe than generic dating assistants',
      whyNow: 'Consumers are already comfortable using AI as a low-friction confidence tool.',
      buildTime: '3-5 months',
      signalScore: 76,
    },
    {
      id: 'eremote-sync',
      name: 'Connected Device Remote Control Hub',
      desc: 'Universal smart home controller app that manages all IoT devices, creates automation scenes, and provides energy usage insights across brands.',
      category: 'utilities',
      reviews: 31,
      rating: 4.7,
      wedge: 'One control layer for fragmented device ecosystems',
      whyNow: 'Smart homes are broadening, but the control surface is still fragmented.',
      buildTime: '5-7 months',
      signalScore: 73,
    },
    {
      id: 'planify-nutrition',
      name: 'AI Macro Tracker & Meal Planner',
      desc: 'Smart nutrition app with AI meal planning, macro tracking, grocery lists, and personalized recipes based on dietary goals and preferences.',
      category: 'health_and_fitness',
      reviews: 45,
      rating: 4.9,
      wedge: 'Compliance-first nutrition coaching with practical grocery outputs',
      whyNow: 'Users want AI help only if it reduces daily planning work immediately.',
      buildTime: '4-6 months',
      signalScore: 82,
    },
  ], []);

  const filteredIdeas = React.useMemo(() => generatedIdeas.filter((idea) => (
    categoryFilter === 'all' || idea.category === categoryFilter
  )), [generatedIdeas, categoryFilter]);

  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    ...(window.DATA.APP_CATEGORIES || []).map((item) => ({ value: item.id, label: `${item.emoji} ${item.label}` }))
  ];

  const averageSignal = filteredIdeas.length
    ? Math.round(filteredIdeas.reduce((sum, idea) => sum + Number(idea.signalScore || 0), 0) / filteredIdeas.length)
    : 0;
  const averageRating = filteredIdeas.length
    ? (filteredIdeas.reduce((sum, idea) => sum + Number(idea.rating || 0), 0) / filteredIdeas.length).toFixed(1)
    : '0.0';

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1320, margin: '0 auto' }}>
      <WrapSectionTitle
        icon={window.I.Lightbulb}
        title="Hot app ideas"
        body="Curated opportunity concepts with the same product language as the rest of Signal: wedge, timing, and execution scope first."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(260px, .85fr)', gap: 14, marginBottom: 18 }}>
        <div className="card" style={{ padding: 16, display: 'grid', gap: 12, background: 'linear-gradient(135deg, rgba(245,98,23,0.08), rgba(255,255,255,0.01))' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Opportunity feed</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', maxWidth: 560 }}>
                The screen now behaves like a research surface, not a detached mockup gallery. Each idea is framed around its market wedge and the reason it can win now.
              </div>
            </div>
            <WrapFilterMenu
              label="Category"
              options={categoryOptions}
              selected={categoryFilter}
              onSelect={setCategoryFilter}
              placeholder="Select category"
              width={220}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip accent">{filteredIdeas.length} ideas</span>
            <span className="chip">Avg signal {averageSignal}</span>
            <span className="chip">Avg rating ★ {averageRating}</span>
          </div>
        </div>

        <div className="card" style={{ padding: 16, display: 'grid', gap: 8, alignContent: 'start' }}>
          <div style={{ fontSize: 10.5, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Read this as</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
            A shortlist of viable directions. Scan category, wedge, and build shape here first, then open the full report only for the strongest candidates.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {filteredIdeas.map((idea) => (
          <button
            key={idea.id}
            className="card"
            onClick={() => setRoute({ screen: 'idea-report', ideaId: idea.id, ideaData: idea })}
            style={{ padding: 18, textAlign: 'left', display: 'grid', gap: 14, background: 'linear-gradient(180deg, rgba(19,19,18,0.98), rgba(16,16,15,0.98))' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{idea.name}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="chip accent">{wrapCategoryLabel(idea.category)}</span>
                  <span className="chip">★ {idea.rating}</span>
                  <span className="chip">{idea.reviews} reviews</span>
                </div>
              </div>
              <div style={{ minWidth: 58, textAlign: 'right' }}>
                <div style={{ fontSize: 10.5, color: 'var(--text-4)', marginBottom: 4 }}>Signal</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>{idea.signalScore}</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
              {idea.desc}
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-0)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Wedge</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-1)', lineHeight: 1.5 }}>{idea.wedge}</div>
              </div>
              <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.015)', borderColor: 'var(--border-0)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Why now</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55 }}>{idea.whyNow}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>
              <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.015)', borderColor: 'var(--border-0)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-4)', marginBottom: 4 }}>Build</div>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{idea.buildTime}</div>
              </div>
              <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.015)', borderColor: 'var(--border-0)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-4)', marginBottom: 4 }}>Demand</div>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{idea.reviews > 25 ? 'Medium' : 'Emerging'}</div>
              </div>
              <div className="card" style={{ padding: 12, background: 'rgba(255,255,255,0.015)', borderColor: 'var(--border-0)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-4)', marginBottom: 4 }}>Category</div>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{wrapCategoryShort(idea.category)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                Open the full report for market gap, timing, and execution guidance.
              </div>
              <span className="chip accent">Open report</span>
            </div>
          </button>
        ))}
      </div>

      {!filteredIdeas.length ? (
        <div style={{ marginTop: 18 }}>
          <WrapEmptyState
            icon={window.I.Lightbulb}
            title="No ideas in this category"
            body="Change the category filter to reopen the broader opportunity feed."
          />
        </div>
      ) : null}
    </div>
  );
}

function WrapIdeaReportScreen({ setRoute, route }) {
  const idea = route.ideaData;
  const [generating, setGenerating] = React.useState(false);
  const [report, setReport] = React.useState(null);

  // Add real metrics
  const metrics = {
    difficulty: idea.category === 'health_and_fitness' || idea.category === 'utilities' ? 'Medium' : idea.category === 'graphics_and_design' ? 'Hard' : 'Easy',
    marketGap: idea.rating >= 4.8 ? 'High' : idea.rating >= 4.5 ? 'Medium' : 'Low',
    estimatedMRR: idea.rating >= 4.8 ? '$12-35k' : idea.rating >= 4.5 ? '$8-22k' : '$5-15k',
    buildTime: idea.category === 'graphics_and_design' || idea.category === 'photo_and_video' ? '6-9 months' : '3-6 months',
    competition: idea.reviews > 30 ? 'Medium' : idea.reviews > 20 ? 'Low' : 'Very Low',
  };

  const generateReport = async () => {
    setGenerating(true);
    try {
      const fullIdea = `${idea.name} — ${idea.desc}. This is a mobile app idea that targets users who need better solutions in the ${wrapCategoryLabel(idea.category)} category.`;
      const response = await fetch('/api/idea-validator/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: fullIdea })
      });
      const data = await response.json();
      if (data.summary) {
        setReport(data);
      } else if (data.error) {
        console.error('API error:', data.error);
        setReport(null);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setReport(null);
    } finally {
      setGenerating(false);
    }
  };

  React.useEffect(() => {
    if (idea && !report && !generating) {
      generateReport();
    }
  }, [idea?.id]);

  if (!idea) {
    return (
      <div style={{ padding: '28px 24px 48px', maxWidth: 1320, margin: '0 auto' }}>
        <WrapEmptyState
          icon={window.I.AlertCircle}
          title="Idea not found"
          body="The idea you're looking for doesn't exist."
        />
      </div>
    );
  }

  const difficultyColor = metrics.difficulty === 'Easy' ? '#4ade80' : metrics.difficulty === 'Medium' ? '#fbbf24' : '#f87171';
  const gapColor = metrics.marketGap === 'High' ? '#4ade80' : metrics.marketGap === 'Medium' ? '#fbbf24' : '#94a3b8';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, rgba(244,98,31,0.03) 0%, rgba(0,0,0,0) 400px)', position: 'relative' }}>
      {/* Animated background */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 600, background: 'radial-gradient(circle at 50% 0%, rgba(244,98,31,0.15), transparent 50%)', pointerEvents: 'none', opacity: 0.4 }} />

      <div style={{ padding: '28px 24px 80px', maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <button
          onClick={() => setRoute({ screen: 'hot-ideas' })}
          className="btn ghost sm"
          style={{ marginBottom: 28, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.05)' }}
        >
          <window.I.ArrowLeft style={{ width: 14, height: 14 }} />
          Back to Ideas
        </button>

        {/* Hero section with glassmorphism */}
        <div style={{
          padding: 40,
          marginBottom: 32,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated gradient orb */}
          <div style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(244,98,31,0.3), transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 32 }}>
              <div style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                flexShrink: 0,
                background: 'linear-gradient(135deg, #f4621f, #ff8c42)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 42,
                boxShadow: '0 8px 24px rgba(244,98,31,0.4), inset 0 2px 0 rgba(255,255,255,0.3)',
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 4, borderRadius: 18, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)', pointerEvents: 'none' }} />
                💡
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 12, lineHeight: 1.1, background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{idea.name}</div>
                <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: 680 }}>{idea.desc}</div>
              </div>
            </div>

            {/* Metric cards with hover effect */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {[
                { label: 'Difficulty', value: metrics.difficulty, color: difficultyColor, icon: window.I.Target },
                { label: 'Market Gap', value: metrics.marketGap, color: gapColor, icon: window.I.TrendingUp },
                { label: 'Est. MRR', value: metrics.estimatedMRR, color: '#3b82f6', icon: window.I.DollarSign },
                { label: 'Build Time', value: metrics.buildTime, color: '#8b5cf6', icon: window.I.Clock },
                { label: 'Category', value: wrapCategoryLabel(idea.category), color: '#ec4899', icon: window.I.Tag },
                { label: 'Competition', value: metrics.competition, color: '#f59e0b', icon: window.I.Users },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 18,
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 32px ${metric.color}30`;
                    e.currentTarget.style.borderColor = metric.color + '40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: `radial-gradient(circle, ${metric.color}20, transparent)`, pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <metric.icon style={{ width: 14, height: 14, color: metric.color, opacity: 0.8 }} />
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{metric.label}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: metric.color, textShadow: `0 0 20px ${metric.color}40` }}>{metric.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research Report */}
        <div style={{
          padding: 0,
          background: 'transparent'
        }}>
          {generating && (
            <div style={{
              padding: 80,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ width: 64, height: 64, margin: '0 auto 24px', position: 'relative' }}>
                <div className="spinner" style={{ width: 64, height: 64 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(244,98,31,0.3), transparent)', filter: 'blur(20px)', animation: 'pulse 2s ease-in-out infinite' }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--text-1)' }}>Analyzing market data...</div>
              <div style={{ fontSize: 14, color: 'var(--text-3)', maxWidth: 400, margin: '0 auto' }}>
                Crawling Reddit, X/Twitter, and App Store for insights
              </div>
            </div>
          )}

          {!generating && !report && (
            <div style={{
              padding: 80,
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(255,100,100,0.08), rgba(255,100,100,0.02))',
              backdropFilter: 'blur(20px)',
              borderRadius: 24,
              border: '1px solid rgba(255,100,100,0.2)',
            }}>
              <window.I.AlertCircle style={{ width: 64, height: 64, color: '#f87171', margin: '0 auto 24px', filter: 'drop-shadow(0 0 20px rgba(248,113,113,0.4))' }} />
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: 'var(--text-1)' }}>Analysis failed</div>
              <button
                className="btn primary"
                onClick={generateReport}
                style={{ padding: '12px 32px', fontSize: 15, fontWeight: 700 }}
              >
                Retry Analysis
              </button>
            </div>
          )}

          {!generating && report && (
            <div style={{ display: 'grid', gap: 24 }}>
              {/* Summary with bento box style */}
              <div style={{
                padding: 32,
                background: 'linear-gradient(135deg, rgba(244,98,31,0.1), rgba(244,98,31,0.02))',
                backdropFilter: 'blur(20px)',
                borderRadius: 24,
                border: '1px solid rgba(244,98,31,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(244,98,31,0.15), transparent)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #f4621f, #ff8c42)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(244,98,31,0.4)'
                    }}>
                      <window.I.FileText style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Executive Summary</div>
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', whiteSpace: 'pre-wrap' }}>
                    {report.summary?.overview || 'Market research analysis in progress...'}
                  </div>
                </div>
              </div>

              {/* Scores with radial progress */}
              {report.scores && (
                <div style={{
                  padding: 32,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 24,
                  border: '1px solid rgba(99,102,241,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(99,102,241,0.4)'
                    }}>
                      <window.I.BarChart style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Market Viability Scores</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    {Object.entries(report.scores).map(([key, value]) => {
                      const numValue = typeof value === 'number' ? value : 50;
                      const scoreColor = numValue >= 70 ? '#4ade80' : numValue >= 40 ? '#fbbf24' : '#f87171';
                      return (
                        <div key={key} style={{
                          padding: 24,
                          borderRadius: 16,
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                          border: '1px solid rgba(255,255,255,0.1)',
                          position: 'relative'
                        }}>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ position: 'relative', width: 60, height: 60 }}>
                              <svg width="60" height="60" style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                                <circle
                                  cx="30"
                                  cy="30"
                                  r="26"
                                  fill="none"
                                  stroke={scoreColor}
                                  strokeWidth="4"
                                  strokeDasharray={`${(numValue / 100) * 163.36} 163.36`}
                                  strokeLinecap="round"
                                  style={{ filter: `drop-shadow(0 0 8px ${scoreColor})` }}
                                />
                              </svg>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: scoreColor }}>
                                {numValue}
                              </div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 28, fontWeight: 900, color: scoreColor, textShadow: `0 0 20px ${scoreColor}40` }}>
                                {typeof value === 'number' ? `${value}/100` : value}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Competitors podium style */}
              {report.competitors && report.competitors.length > 0 && (
                <div style={{
                  padding: 32,
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(168,85,247,0.08))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 24,
                  border: '1px solid rgba(236,72,153,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(236,72,153,0.4)'
                    }}>
                      <window.I.Award style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Market Leaders</div>
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    {report.competitors.slice(0, 5).map((comp, idx) => {
                      const medals = ['🥇', '🥈', '🥉'];
                      const medal = medals[idx] || '🏅';
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: 20,
                            background: idx < 3 ? 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' : 'rgba(255,255,255,0.03)',
                            borderRadius: 14,
                            border: idx < 3 ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            gap: 16,
                            alignItems: 'center',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(8px)';
                            e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.background = idx < 3 ? 'linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))' : 'rgba(255,255,255,0.03)';
                          }}
                        >
                          <div style={{ fontSize: 32, lineHeight: 1 }}>{medal}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: 'var(--text-1)' }}>{comp.name || 'Unknown App'}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{comp.category || wrapCategoryLabel(idea.category)}</div>
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {comp.rating && (
                              <div style={{ padding: '6px 12px', background: 'rgba(251,191,36,0.15)', borderRadius: 8, border: '1px solid rgba(251,191,36,0.3)', fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>
                                ★ {comp.rating}
                              </div>
                            )}
                            {comp.reviews && (
                              <div style={{ padding: '6px 12px', background: 'rgba(59,130,246,0.15)', borderRadius: 8, border: '1px solid rgba(59,130,246,0.3)', fontSize: 13, fontWeight: 700, color: '#3b82f6' }}>
                                {comp.reviews} reviews
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recommendations with checkmarks */}
              {report.recommendations && report.recommendations.length > 0 && (
                <div style={{
                  padding: 32,
                  background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(34,197,94,0.05))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 24,
                  border: '1px solid rgba(74,222,128,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(74,222,128,0.4)'
                    }}>
                      <window.I.CheckCircle style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Action Plan</div>
                  </div>
                  <div style={{ display: 'grid', gap: 14 }}>
                    {report.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: 18,
                          background: 'linear-gradient(90deg, rgba(74,222,128,0.08), transparent)',
                          borderRadius: 12,
                          border: '1px solid rgba(74,222,128,0.2)',
                          display: 'flex',
                          gap: 14,
                          alignItems: 'flex-start',
                          fontSize: 15,
                          lineHeight: 1.7,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(74,222,128,0.08), transparent)'}
                      >
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(74,222,128,0.3)'
                        }}>
                          <window.I.Check style={{ width: 14, height: 14, color: 'white', strokeWidth: 3 }} />
                        </div>
                        <div style={{ flex: 1, color: 'rgba(255,255,255,0.9)' }}>{rec}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Community Signals */}
              {report.signals && (
                <div style={{
                  padding: 32,
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.08))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 24,
                  border: '1px solid rgba(168,85,247,0.2)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 16px rgba(168,85,247,0.4)'
                    }}>
                      <window.I.MessageCircle style={{ width: 20, height: 20, color: 'white' }} />
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)' }}>Community Pulse</div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
                    {[
                      { label: 'Reddit Posts', count: report.signals.redditPosts?.length || 0, color: '#ff4500', icon: '📱' },
                      { label: 'Reddit Comments', count: report.signals.redditComments?.length || 0, color: '#ff6b35', icon: '💬' },
                      { label: 'X Posts', count: report.signals.xPosts?.length || 0, color: '#1da1f2', icon: '🐦' },
                    ].map((signal) => (
                      <div
                        key={signal.label}
                        style={{
                          padding: '14px 20px',
                          background: `linear-gradient(135deg, ${signal.color}20, ${signal.color}08)`,
                          borderRadius: 12,
                          border: `1px solid ${signal.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          minWidth: 180
                        }}
                      >
                        <div style={{ fontSize: 24 }}>{signal.icon}</div>
                        <div>
                          <div style={{ fontSize: 24, fontWeight: 900, color: signal.color, lineHeight: 1 }}>{signal.count}</div>
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{signal.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {report.signals.redditPosts && report.signals.redditPosts.length > 0 && (
                    <div style={{
                      padding: 20,
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.8
                    }}>
                      💡 Found <strong>{report.signals.redditPosts.reduce((sum, p) => sum + (p.numComments || 0), 0)}</strong> total comments across Reddit discussions, indicating strong community interest in this problem space.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WrapPricingScreen() {
  const workspace = useWrapWorkspace();
  const [pendingDeletePricingTable, setPendingDeletePricingTable] = React.useState(null);
  const normalizePricingTable = (table, index = 0) => ({
    id: table?.id || `pricing-${Date.now().toString(36)}-${index}`,
    name: table?.name || `Pricing Table ${index + 1}`,
    basePrice: Number(table?.basePrice ?? table?.basePrices?.[0] ?? 9.99) || 0,
    baseCurrency: table?.baseCurrency || 'USD',
    optimizedRounding: table?.optimizedRounding !== false,
  });
  const storedPricingTables = Array.isArray(workspace.pricingTables) && workspace.pricingTables.length
    ? workspace.pricingTables.map(normalizePricingTable)
    : [{ id: `pricing-${Date.now().toString(36)}`, name: 'Pricing Table 1', basePrice: 9.99, baseCurrency: 'USD', optimizedRounding: true }];
  const pricingTables = Array.isArray(workspace.pricingTables) && workspace.pricingTables.length
    ? workspace.pricingTables.map(normalizePricingTable)
    : storedPricingTables;
  const storedSelectedPricingTableId = workspace.pricingSelectedTableId;
  const activePricingTable = pricingTables.find((table) => table.id === storedSelectedPricingTableId) || pricingTables[0];
  const [fx, setFx] = React.useState({ base: 'EUR', date: null, rates: {}, loading: true, error: '' });

  React.useEffect(() => {
    let cancelled = false;
    fetch('/api/fx/latest')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Could not load FX');
        return data;
      })
      .then((data) => {
        if (!cancelled) setFx({ ...data, loading: false, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setFx({ base: 'EUR', date: null, rates: {}, loading: false, error: error?.message || 'Could not load FX' });
      });
    return () => { cancelled = true; };
  }, []);

  const setPricingTables = (updater) => {
    updateWrapWorkspace((current) => {
      const currentTables = Array.isArray(current.pricingTables) && current.pricingTables.length
        ? current.pricingTables
        : storedPricingTables;
      const nextTables = typeof updater === 'function' ? updater(currentTables) : currentTables;
      const normalizedTables = nextTables.map(normalizePricingTable);
      const selectedId = current.pricingSelectedTableId;
      const nextSelectedId = normalizedTables.some((table) => table.id === selectedId)
        ? selectedId
        : normalizedTables[0]?.id || null;
      return {
        ...current,
        pricingTables: normalizedTables,
        pricingSelectedTableId: nextSelectedId,
      };
    });
  };

  const setActivePricingTableId = (tableId) => {
    updateWrapWorkspace((current) => ({
      ...current,
      pricingSelectedTableId: tableId,
    }));
  };

  const roundUpPrice = (value, currency) => {
    if (!Number.isFinite(value)) return null;
    if (currency === 'JPY') return Math.ceil(value);
    return Math.ceil(value * 100) / 100;
  };

  const roundPriceWithPattern = (value, currency, basePrice) => {
    if (!Number.isFinite(value)) return null;
    if (currency === 'JPY') return Math.ceil(value);
    const centsPattern = Math.round((Math.abs(Number(basePrice) || 0) % 1) * 100);
    if (centsPattern === 0) return Math.ceil(value);
    const floorValue = Math.floor(value);
    let rounded = floorValue + (centsPattern / 100);
    if (rounded + 1e-9 < value) rounded = floorValue + 1 + (centsPattern / 100);
    return Number(rounded.toFixed(2));
  };

  const formatMoney = (value, currency) => {
    if (!Number.isFinite(value)) return '—';
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: currency === 'JPY' ? 0 : 2,
        maximumFractionDigits: currency === 'JPY' ? 0 : 2,
      }).format(value);
    } catch (error) {
      return `${currency} ${currency === 'JPY' ? Math.round(value) : Number(value).toFixed(2)}`;
    }
  };

  const pricingCurrencies = Array.from(new Set(['USD', ...WRAP_PRICE_COUNTRIES.map(([, , currency]) => currency)]));

  const convertBasePriceToCurrency = (baseValue, baseCurrency, targetCurrency, optimizedRounding) => {
    if (!Number.isFinite(baseValue)) return null;
    if (baseCurrency === targetCurrency) {
      return optimizedRounding ? roundPriceWithPattern(baseValue, targetCurrency, baseValue) : roundUpPrice(baseValue, targetCurrency);
    }
    if (fx.base !== 'EUR') return null;
    const baseRate = baseCurrency === 'EUR' ? 1 : fx.rates[baseCurrency];
    const targetRate = targetCurrency === 'EUR' ? 1 : fx.rates[targetCurrency];
    if (!baseRate || !targetRate) return null;
    const eurValue = baseCurrency === 'EUR' ? baseValue : (baseValue / baseRate);
    const convertedValue = targetCurrency === 'EUR' ? eurValue : (eurValue * targetRate);
    return optimizedRounding ? roundPriceWithPattern(convertedValue, targetCurrency, baseValue) : roundUpPrice(convertedValue, targetCurrency);
  };

  const buildPricingRows = (basePrice, baseCurrency, optimizedRounding) => WRAP_PRICE_COUNTRIES.map(([country, flag, currency]) => ({
    country,
    flag,
    currency,
    price: convertBasePriceToCurrency(basePrice, baseCurrency, currency, optimizedRounding),
  }));

  const exportJson = () => {
    const activeRows = buildPricingRows(activePricingTable?.basePrice ?? 0, activePricingTable?.baseCurrency || 'USD', activePricingTable?.optimizedRounding !== false);
    wrapDownloadFile('wrap-pricing.json', JSON.stringify({
      generatedAt: new Date().toISOString(),
      fxDate: fx.date,
      baseCurrency: activePricingTable?.baseCurrency || 'USD',
      table: {
        id: activePricingTable?.id,
        name: activePricingTable?.name,
        basePrice: activePricingTable?.basePrice ?? 0,
        optimizedRounding: activePricingTable?.optimizedRounding !== false,
        rows: activeRows,
      },
    }, null, 2), 'application/json');
  };

  const exportAppleReady = () => {
    const activeRows = buildPricingRows(activePricingTable?.basePrice ?? 0, activePricingTable?.baseCurrency || 'USD', activePricingTable?.optimizedRounding !== false);
    wrapDownloadFile('wrap-apple-pricing.json', JSON.stringify({
      platform: 'apple',
      mode: 'one-shot',
      generatedAt: new Date().toISOString(),
      fxDate: fx.date,
      baseCurrency: activePricingTable?.baseCurrency || 'USD',
      table: {
        id: activePricingTable?.id,
        name: activePricingTable?.name,
        basePrice: activePricingTable?.basePrice ?? 0,
        optimizedRounding: activePricingTable?.optimizedRounding !== false,
        storefronts: activeRows.map((row) => ({
        country: row.country,
        currency: row.currency,
        price: row.price,
      })),
      },
    }, null, 2), 'application/json');
  };

  const exportPdf = () => {
    const popup = window.open('', '_blank', 'width=1080,height=820');
    if (!popup) return;
    popup.document.open();
    popup.document.write(`
      <html>
        <head>
          <title>Signal Pricing Export</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 32px; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-top: 18px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background: #f4f4f4; }
          </style>
        </head>
        <body>
          <h1>Signal Pricing Export</h1>
          <p>FX date: ${wrapEscapeHtml(fx.date || 'Unknown')}</p>
          ${(() => {
            const pricingRows = buildPricingRows(activePricingTable?.basePrice ?? 0, activePricingTable?.baseCurrency || 'USD', activePricingTable?.optimizedRounding !== false);
            return `
              <h2>${wrapEscapeHtml(activePricingTable?.name || 'Pricing Table')}</h2>
              <p>Base price ${wrapEscapeHtml(activePricingTable?.baseCurrency || 'USD')}: ${Number(activePricingTable?.basePrice || 0).toFixed(2)}</p>
              <p>Optimized rounding: ${activePricingTable?.optimizedRounding !== false ? 'On' : 'Off'}</p>
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Currency</th>
                    <th>${Number(activePricingTable?.basePrice || 0).toFixed(2)} ${wrapEscapeHtml(activePricingTable?.baseCurrency || 'USD')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${pricingRows.map((row) => `<tr><td>${wrapEscapeHtml(`${row.flag} ${row.country}`)}</td><td>${wrapEscapeHtml(row.currency)}</td><td>${wrapEscapeHtml(formatMoney(row.price, row.currency))}</td></tr>`).join('')}
                </tbody>
              </table>
            `;
          })()}
          <script>window.onload = () => window.print()</script>
        </body>
      </html>
    `);
    popup.document.close();
  };

  const createPricingScenario = () => {
    const nextId = `pricing-${Date.now().toString(36)}`;
    updateWrapWorkspace((current) => {
      const currentTables = Array.isArray(current.pricingTables) && current.pricingTables.length
        ? current.pricingTables.map(normalizePricingTable)
        : storedPricingTables;
      const nextTables = [...currentTables, { id: nextId, name: `Pricing Table ${currentTables.length + 1}`, basePrice: 9.99, baseCurrency: 'USD', optimizedRounding: true }];
      return {
        ...current,
        pricingTables: nextTables,
        pricingSelectedTableId: nextId,
      };
    });
  };

  const pricingRows = buildPricingRows(activePricingTable?.basePrice ?? 0, activePricingTable?.baseCurrency || 'USD', activePricingTable?.optimizedRounding !== false);

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1260, margin: '0 auto' }}>
      <WrapConfirmModal
        open={Boolean(pendingDeletePricingTable)}
        title="Delete Pricing Table"
        body={pendingDeletePricingTable ? `Delete "${pendingDeletePricingTable.name || 'this pricing table'}"? Its localized pricing scenario will be removed from this workspace.` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingDeletePricingTable(null)}
        onConfirm={() => {
          const tableId = pendingDeletePricingTable?.id;
          if (tableId) {
            setPricingTables((current) => current.filter((item) => item.id !== tableId));
          }
          setPendingDeletePricingTable(null);
        }}
      />
      <WrapSectionTitle icon={window.I.Grid} title="Pricing Calculator" body="Calculate localized prices based on global purchasing power." />
      <div style={{ display: 'grid', gap: 22 }}>
        <div className="card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'grid', gap: 6 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Pricing Tables</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Each click on `Add prices` creates a new pricing scenario tab in the left column.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="btn sm" onClick={exportJson}>Export JSON</button>
            <button className="btn sm" onClick={exportAppleReady}>Apple-ready</button>
            <button className="btn sm" onClick={exportPdf}>Export PDF</button>
          </div>
        </div>
        {fx.loading ? <div style={{ color: 'var(--text-3)', fontSize: 12 }}>Loading live FX…</div> : null}
        {!fx.loading && fx.error ? <div style={{ color: '#ff8b7d', fontSize: 12 }}>{fx.error}</div> : null}
        {!fx.loading && !fx.error ? <div style={{ color: 'var(--text-3)', fontSize: 12 }}>Live ECB FX · {fx.date || 'Unknown date'} · always rounded up</div> : null}
        <div style={{ display: 'grid', gridTemplateColumns: '280px minmax(0,1fr)', gap: 22, alignItems: 'start' }}>
          <div className="card" style={{ padding: 16, display: 'grid', gap: 10, alignContent: 'start' }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scenarios</div>
            {pricingTables.map((table, tableIndex) => {
              const active = activePricingTable?.id === table.id;
              return (
                <button
                  key={table.id}
                  onClick={() => setActivePricingTableId(table.id)}
                  style={{ width: '100%', textAlign: 'left', padding: '12px 14px', borderRadius: 14, border: active ? '1px solid rgba(244,98,31,0.28)' : '1px solid var(--border-0)', background: active ? 'rgba(244,98,31,0.1)' : 'transparent', color: 'inherit', display: 'grid', gap: 4 }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{table.name || `Pricing Table ${tableIndex + 1}`}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{Number(table.basePrice || 0).toFixed(2)} {table.baseCurrency || 'USD'}</div>
                </button>
              );
            })}
            <button className="btn" onClick={createPricingScenario} style={{ marginTop: 6 }}>Add prices</button>
          </div>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'grid', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border-1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <input className="input" style={{ minWidth: 0, flex: 1 }} value={activePricingTable?.name || ''} onChange={(e) => setPricingTables((current) => current.map((item) => item.id === activePricingTable?.id ? { ...item, name: e.target.value } : item))} />
                {pricingTables.length > 1 ? (
                  <button className="btn danger" onClick={() => setPendingDeletePricingTable(activePricingTable)}>
                    <window.I.Trash style={{ width: 14, height: 14 }} /> Delete tab
                  </button>
                ) : null}
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Base Price</span>
                <input className="input" style={{ width: 140 }} value={String(activePricingTable?.basePrice ?? 0)} onChange={(e) => setPricingTables((current) => current.map((item) => item.id === activePricingTable?.id ? { ...item, basePrice: Number(e.target.value || 0) } : item))} />
                <select className="input" style={{ width: 120 }} value={activePricingTable?.baseCurrency || 'USD'} onChange={(e) => setPricingTables((current) => current.map((item) => item.id === activePricingTable?.id ? { ...item, baseCurrency: e.target.value } : item))}>
                  {pricingCurrencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-2)' }}>
                <input
                  type="checkbox"
                  checked={activePricingTable?.optimizedRounding !== false}
                  onChange={(e) => setPricingTables((current) => current.map((item) => item.id === activePricingTable?.id ? { ...item, optimizedRounding: e.target.checked } : item))}
                />
                <span>Optimized rounding</span>
                <span style={{ color: 'var(--text-3)' }}>
                  Keeps the same pricing style as the base price like `.99`, `.90`, or whole numbers.
                </span>
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr .8fr .8fr', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border-1)', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase' }}>
              <div>Country</div><div>Currency</div><div>{formatMoney(activePricingTable?.basePrice || 0, activePricingTable?.baseCurrency || 'USD')}</div>
            </div>
            {pricingRows.map((row) => (
              <div key={`${activePricingTable?.id}-${row.country}`} style={{ display: 'grid', gridTemplateColumns: '1.6fr .8fr .8fr', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--border-0)' }}>
                <div>{row.flag} {row.country}</div><div style={{ color: 'var(--text-3)' }}>{row.currency}</div><div>{formatMoney(row.price, row.currency)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WrapAppDetailScreen({ route, setRoute }) {
  const workspace = useWrapWorkspace();
  const routeApp = buildWrapUniverse(workspace).find((item) => item.id === route.appId) || null;
  const [liveApp, setLiveApp] = React.useState(null);
  const [loading, setLoading] = React.useState(Boolean(route.storeId));
  const [similarState, setSimilarState] = React.useState({ items: [], loading: false });
  const [appleKeywordState, setAppleKeywordState] = React.useState({ items: [], loading: false, error: '' });
  const [selectedScreenshotDevice, setSelectedScreenshotDevice] = React.useState('iphone');
  const [screenshotModalOpen, setScreenshotModalOpen] = React.useState(false);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = React.useState(0);

  // Scroll to top when route.appId changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route.appId, route.storeId]);

  React.useEffect(() => {
    let cancelled = false;
    if (!route.storeId) {
      setLiveApp(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/apple/app?id=${encodeURIComponent(route.storeId)}&country=${String(route.country || 'US').toLowerCase()}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'App not found');
        return data.app;
      })
      .then((app) => {
        if (!cancelled) {
          setLiveApp(wrapLiveAppWithMetrics({ ...app, country: app.country || route.country || 'US' }));
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLiveApp(null);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [route.storeId, route.country]);

  const app = liveApp || routeApp || null;

  React.useEffect(() => {
    let cancelled = false;
    if (!app) {
      setSimilarState({ items: [], loading: false });
      return undefined;
    }
    const terms = wrapNicheTermsForApp(app);
    const country = String(app.country || route.country || 'US').toLowerCase();
    if (!terms.length) {
      setSimilarState({ items: [], loading: false });
      return undefined;
    }

    setSimilarState((current) => ({ ...current, loading: true }));
    Promise.all(terms.map(async (term) => {
      const response = await fetch(`/api/apple/search?q=${encodeURIComponent(term)}&country=${country}&limit=24`);
      const data = await response.json();
      if (!response.ok) return [];
      return (data.results || []).map((item) => wrapLiveAppWithMetrics({ ...item, country: item.country || app.country || route.country || 'US' }));
    }))
      .then((groups) => {
        if (cancelled) return;
        const deduped = wrapDedupeLiveApps(groups.flat())
          .filter((item) => String(item.storeId || item.id) !== String(app.storeId || app.id))
          .map((item) => ({ ...item, similarityScore: wrapSimilarityScore(app, item) }))
          .filter((item) => item.similarityScore > 0)
          .sort((a, b) => b.similarityScore - a.similarityScore || b.reviews - a.reviews)
          .slice(0, 6);
        setSimilarState({ items: deduped, loading: false });
      })
      .catch(() => {
        if (!cancelled) setSimilarState({ items: [], loading: false });
      });

    return () => {
      cancelled = true;
    };
  }, [app?.id, app?.storeId, app?.name, app?.subtitle, app?.description, app?.category, JSON.stringify(app?.genres || []), app?.country, route.country]);

  React.useEffect(() => {
    let cancelled = false;
    if (!app) {
      setAppleKeywordState({ items: [], loading: false, error: '' });
      return undefined;
    }
    const country = String(route.country || app.country || 'US').toLowerCase();
    const appStoreId = String(app.storeId || app.id || '');
    const appName = String(app.name || '').trim().toLowerCase();
    const seedKeywords = wrapExtractKeywordsFromMetadata(app, app.category)
      .slice(0, 4)
      .map((item) => item.keyword)
      .filter(Boolean);

    if (!seedKeywords.length) {
      setAppleKeywordState({ items: [], loading: false, error: '' });
      return undefined;
    }

    setAppleKeywordState((current) => ({ ...current, loading: true, error: '' }));
    Promise.all(seedKeywords.map(async (keyword) => {
      const response = await fetch(`/api/apple/keyword/search?keyword=${encodeURIComponent(keyword)}&country=${country}&limit=12`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Apple keyword scan failed');
      const results = Array.isArray(data.results) ? data.results : [];
      const rankIndex = results.findIndex((item) => {
        const itemId = String(item.storeId || item.id || '');
        const itemName = String(item.name || '').trim().toLowerCase();
        return itemId === appStoreId || (appName && itemName === appName);
      });
      const competitor = results.find((item) => {
        const itemId = String(item.storeId || item.id || '');
        const itemName = String(item.name || '').trim().toLowerCase();
        return itemId !== appStoreId && itemName !== appName;
      });
      return {
        keyword,
        storefront: String(route.country || app.country || 'US').toUpperCase(),
        rank: rankIndex >= 0 ? rankIndex + 1 : null,
        competitorName: competitor?.name || '',
        competitorStoreId: competitor?.storeId || competitor?.id || '',
        totalResults: results.length,
      };
    }))
      .then((items) => {
        if (cancelled) return;
        const rankedFirst = items.sort((a, b) => {
          const aRank = Number.isFinite(a.rank) ? a.rank : 999;
          const bRank = Number.isFinite(b.rank) ? b.rank : 999;
          return aRank - bRank || a.keyword.localeCompare(b.keyword);
        });
        setAppleKeywordState({ items: rankedFirst, loading: false, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setAppleKeywordState({ items: [], loading: false, error: error?.message || 'Apple keyword scan failed' });
      });

    return () => {
      cancelled = true;
    };
  }, [app?.id, app?.storeId, app?.name, app?.subtitle, app?.description, app?.category, JSON.stringify(app?.genres || []), app?.country, route.country]);

  const similar = similarState.items;
  const favorites = wrapFavoriteIds(workspace);
  const advertiserName = app ? wrapAdAdvertiserName(app) : '';
  const metaAdsUrl = app ? wrapMetaAdsLibraryUrl(app) : '';
  const tikTokAdsUrl = app ? wrapTikTokAdsLibraryUrl(app) : '';
  const metaAdsState = useWrapAdvertiserAds('meta', advertiserName);
  const tikTokAdsState = useWrapAdvertiserAds('tiktok', advertiserName);
  const appleAdsDetection = app ? wrapAppleAdsDetection(app, route.country || app.country || 'US', appleKeywordState.items, appleKeywordState.error) : null;
  const isFavorite = app ? favorites.includes(app.id) : false;
  const toggleFavorite = () => updateWrapWorkspace((current) => ({
    ...current,
    favoriteAppIds: !app
      ? favorites
      : favorites.includes(app.id)
        ? favorites.filter((item) => item !== app.id)
        : [app.id, ...favorites],
  }));

  // Summarize description to 2-3 sentences max
  const summarizeDescription = (desc) => {
    if (!desc) return 'No description available';
    const sentences = desc.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).join('. ').trim() + (sentences.length > 3 ? '...' : '.');
  };

  const screenshots = app?.screenshots || [];
  const ipadScreenshots = app?.ipadScreenshots || [];
  const screenshotSets = app ? wrapScreenshotSets(app) : [];
  const activeScreenshotSet = screenshotSets.find((set) => set.id === selectedScreenshotDevice) || screenshotSets[0] || null;

  React.useEffect(() => {
    if (!screenshotSets.length) return;
    if (!screenshotSets.some((set) => set.id === selectedScreenshotDevice)) {
      setSelectedScreenshotDevice(screenshotSets[0].id);
      setSelectedScreenshotIndex(0);
    }
  }, [selectedScreenshotDevice, screenshotSets]);

  React.useEffect(() => {
    if (!activeScreenshotSet) {
      setSelectedScreenshotIndex(0);
      return;
    }
    setSelectedScreenshotIndex((current) => Math.max(0, Math.min(current, activeScreenshotSet.items.length - 1)));
  }, [activeScreenshotSet]);

  const openScreenshotModal = (deviceId, index = 0) => {
    setSelectedScreenshotDevice(deviceId);
    setSelectedScreenshotIndex(index);
    setScreenshotModalOpen(true);
  };
  if (!app) {
    return (
      <div style={{ padding: '28px 24px 56px', maxWidth: 1420, margin: '0 auto', display: 'grid', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', color: 'var(--text-3)', fontSize: 13 }}>
          <button
            type="button"
            onClick={() => setRoute({ screen: 'discover' })}
            style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => setRoute({ screen: 'search' })}
            style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}
          >
            Apps
          </button>
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{loading ? 'Loading app data…' : 'No app found'}</div>
          <div style={{ color: 'var(--text-3)', fontSize: 13 }}>
            {loading
              ? 'Fetching App Store data for the selected app. The page stays empty until a real match is loaded.'
              : 'No App Store app is currently resolved for this view. Search again or pick another app.'}
          </div>
        </div>
      </div>
    );
  }
  const platformLabel = screenshotSets.map((set) => set.label).join(' / ') || 'iPhone';
  const aboutSummary = summarizeDescription(app.description);
  const aboutLead = `${app.name} is a ${wrapCategoryLabel(app.category).toLowerCase()} app for ${platformLabel} developed by ${app.developer || 'its publisher'}.`;
  const contactPillStyle = {
    minHeight: 56,
    height: 56,
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(12,14,18,0.88)',
    color: 'var(--text-2)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    textDecoration: 'none',
    padding: '0 18px',
    flexShrink: 0,
  };

  const appHeroCardStyle = {
    background: 'rgba(8, 10, 14, 0.84)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,150,80,0.1)',
    boxShadow: '0 24px 60px rgba(0,0,0,0.28)',
  };
  const appSignalCardBase = {
    ...appHeroCardStyle,
    position: 'relative',
    overflow: 'hidden',
  };
  const appDownloadsCardStyle = {
    ...appSignalCardBase,
    padding: '28px 24px 28px 34px',
    minHeight: 176,
    boxShadow: '0 0 28px rgba(244,98,31,0.08), 0 24px 60px rgba(0,0,0,0.28)',
    backgroundImage: 'radial-gradient(circle at 18% 50%, rgba(244,98,31,0.16), transparent 40%), linear-gradient(180deg, rgba(11,11,12,0.96), rgba(11,11,12,0.9))',
  };
  const appRevenueCardStyle = {
    ...appSignalCardBase,
    padding: '28px 24px 28px 34px',
    minHeight: 176,
    boxShadow: '0 0 32px rgba(244,98,31,0.1), 0 24px 60px rgba(0,0,0,0.28)',
    backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(244,98,31,0.2), transparent 60%), linear-gradient(180deg, rgba(11,11,12,0.96), rgba(11,11,12,0.9))',
  };
  const appCreatorsCardStyle = {
    ...appSignalCardBase,
    minHeight: 144,
    boxShadow: '0 0 26px rgba(244,98,31,0.07), 0 24px 60px rgba(0,0,0,0.28)',
    backgroundImage: 'radial-gradient(circle at 12% 18%, rgba(244,98,31,0.11), transparent 30%), linear-gradient(180deg, rgba(11,11,12,0.95), rgba(11,11,12,0.9))',
  };
  const appMetaAdsCardStyle = {
    ...appSignalCardBase,
    minHeight: 144,
    boxShadow: '0 0 28px rgba(24,119,242,0.12), 0 24px 60px rgba(0,0,0,0.28)',
    backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(24,119,242,0.18), transparent 28%), linear-gradient(180deg, rgba(11,11,12,0.95), rgba(11,11,12,0.9))',
  };
  const appAppleAdsCardStyle = {
    ...appSignalCardBase,
    minHeight: 144,
    boxShadow: '0 0 26px rgba(244,98,31,0.07), 0 24px 60px rgba(0,0,0,0.28)',
    backgroundImage: 'radial-gradient(circle at 88% 50%, rgba(244,98,31,0.11), transparent 26%), linear-gradient(180deg, rgba(11,11,12,0.95), rgba(11,11,12,0.9))',
  };
  const appRatingCardStyle = {
    ...appSignalCardBase,
    padding: 18,
    background: 'rgba(10, 11, 13, 0.9)',
  };
  const appToolbarControlHeight = 56;
  const appToolbarControlRadius = 18;

  return (
    <div style={{ padding: '28px 24px 56px', maxWidth: 1420, margin: '0 auto', display: 'grid', gap: 26, minWidth: 0, overflowX: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', color: 'var(--text-3)', fontSize: 13 }}>
        <button
          type="button"
          onClick={() => setRoute({ screen: 'discover' })}
          style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => setRoute({ screen: 'search' })}
          style={{ background: 'transparent', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer' }}
        >
          Apps
        </button>
        <span>/</span>
        <span style={{ color: 'var(--text-2)' }}>{app.name}</span>
      </div>

      {!app && loading ? <WrapLoadingCard lines={['24%', '18%']} style={{ marginBottom: 8 }} /> : null}

      <section
        className="card"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 28,
          padding: 24,
          display: 'grid',
          gap: 20,
          backgroundImage: "linear-gradient(180deg, rgba(5,7,10,0.52), rgba(5,7,10,0.82)), url('/assets/app-detail-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: 'none',
          boxShadow: '0 32px 80px rgba(0,0,0,0.32), 0 0 56px rgba(255,115,30,0.12)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, borderRadius: 28, background: 'linear-gradient(90deg, rgba(0,0,0,0.22), transparent 42%, rgba(0,0,0,0.42))', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'grid', gap: 20, minWidth: 0 }}>
          <div style={{ padding: '8px 2px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', minWidth: 0, flex: 1 }}>
                {wrapAppIcon(app, 132)}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.05em', marginBottom: 8 }}>{app.name}</div>
                      <div style={{ color: 'var(--accent)', fontSize: 20, fontWeight: 600, marginBottom: 14 }}>{app.developer}</div>
                    </div>
                    <button className="btn icon" onClick={toggleFavorite} style={{ width: appToolbarControlHeight, minWidth: appToolbarControlHeight, height: appToolbarControlHeight, borderRadius: appToolbarControlRadius, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: isFavorite ? '#ff5a67' : undefined, background: isFavorite ? 'rgba(255,90,103,0.12)' : undefined, borderColor: isFavorite ? 'rgba(255,90,103,0.3)' : undefined, flexShrink: 0 }}>
                      <window.I.Heart filled={isFavorite} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '8px 14px', fontSize: 14, fontWeight: 700 }}>{wrapCategoryShort(app.category)}</span>
                    <span className="chip" style={{ padding: '8px 14px', fontSize: 14, fontWeight: 700 }}>{app.price || 'Free'}</span>
                    <span className="chip" style={{ padding: '8px 14px', fontSize: 14, fontWeight: 700 }}>Released {app.releasedAgo}</span>
                    <select
                      value={String(route.country || app.country || 'US').toUpperCase()}
                      onChange={(event) => setRoute({ ...route, country: event.target.value })}
                      style={{ height: 40, minWidth: 168, borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(12,14,18,0.88)', color: 'var(--text-1)', padding: '0 16px', fontSize: 13, fontWeight: 600, outline: 'none' }}
                    >
                      {WRAP_COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {(app.storeUrl || app.url) ? (
                  <a
                    href={app.storeUrl || app.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-1)', textDecoration: 'none', fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, paddingTop: 10 }}
                  >
                    <span>Open on App Store</span>
                    <span style={{ fontSize: 18, lineHeight: 1 }}>↗</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 24 }}>
            <div className="card app-detail-stroke" style={appDownloadsCardStyle}>
              <div style={{ position: 'absolute', top: 20, bottom: 20, left: 18, width: 5, borderRadius: 999, background: 'linear-gradient(180deg, rgba(255,132,45,0.96), rgba(244,98,31,0.7))', boxShadow: '0 0 22px rgba(244,98,31,0.32), 0 0 46px rgba(244,98,31,0.12)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.03) 49%, transparent 52%), linear-gradient(140deg, transparent 0%, rgba(255,255,255,0.02) 63%, transparent 66%)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, paddingLeft: 16 }}>
                <window.I.Download style={{ width: 14, height: 14 }} />
                <span>Est. Monthly Downloads</span>
              </div>
              <div style={{ position: 'relative', fontSize: 60, fontWeight: 800, lineHeight: 1, color: 'var(--accent)', paddingLeft: 22 }}>{wrapCompact(app.downloads)}</div>
            </div>
            <div className="card app-detail-stroke" style={appRevenueCardStyle}>
              <div style={{ position: 'absolute', top: 20, bottom: 20, left: 18, width: 5, borderRadius: 999, background: 'linear-gradient(180deg, rgba(255,132,45,0.96), rgba(244,98,31,0.7))', boxShadow: '0 0 22px rgba(244,98,31,0.32), 0 0 46px rgba(244,98,31,0.12)', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14, paddingLeft: 16 }}>
                <window.I.Dollar style={{ width: 14, height: 14 }} />
                <span>Est. Monthly Revenue</span>
              </div>
              <div style={{ position: 'relative', fontSize: 60, fontWeight: 800, lineHeight: 1, color: 'var(--accent)', paddingLeft: 22 }}>{wrapMoney(app.revenue)}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
            <div className="card" style={appCreatorsCardStyle}>
              <div style={{ position: 'absolute', top: 20, bottom: 20, left: 18, width: 5, borderRadius: 999, background: 'linear-gradient(180deg, rgba(255,132,45,0.94), rgba(244,98,31,0.68))', boxShadow: '0 0 20px rgba(244,98,31,0.28), 0 0 42px rgba(244,98,31,0.1)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 20, right: 22, width: 84, height: 84, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,98,31,0.12), transparent 66%)', pointerEvents: 'none' }} />
              <AdSourceCard logo logoSrc="/assets/creator-logo.png" logoAlt="Creators" title="Creators" subtitle="0 UGC creatives" borderColor="var(--accent)" />
            </div>
            <div className="card" style={appMetaAdsCardStyle}>
              <div style={{ position: 'absolute', top: 20, bottom: 20, left: 18, width: 5, borderRadius: 999, background: 'linear-gradient(180deg, rgba(63,140,255,0.96), rgba(24,119,242,0.74))', boxShadow: '0 0 22px rgba(24,119,242,0.34), 0 0 46px rgba(24,119,242,0.12)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 14, right: 16, width: 96, height: 96, borderRadius: '50%', background: 'radial-gradient(circle, rgba(24,119,242,0.16), transparent 68%)', pointerEvents: 'none' }} />
              <AdSourceCard
                icon="f"
                logo
                logoSrc="/assets/fb-logo.png"
                logoAlt="Facebook"
                title="Meta Ads"
                borderColor="#1877f2"
              />
            </div>
            <div className="card" style={appAppleAdsCardStyle}>
              <div style={{ position: 'absolute', top: 20, bottom: 20, left: 18, width: 5, borderRadius: 999, background: 'linear-gradient(180deg, rgba(255,132,45,0.94), rgba(244,98,31,0.68))', boxShadow: '0 0 20px rgba(244,98,31,0.28), 0 0 42px rgba(244,98,31,0.1)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 18, right: 18, width: 88, height: 88, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,98,31,0.14), transparent 68%)', pointerEvents: 'none' }} />
              <AdSourceCard
                icon="🍎"
                logo
                logoSrc="/assets/apple-logo.png"
                logoAlt="Apple"
                title="Apple Ads"
                subtitle={
                  appleKeywordState.loading
                    ? 'Scanning App Store visibility'
                    : `${appleAdsDetection.status} · ${appleAdsDetection.certainty} certainty`
                }
                borderColor="var(--text-3)"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
            <div className="card" style={appRatingCardStyle}><StatCard title="Rating" value={`${wrapRating(app.rating)} ★ (${wrapCompactCount(app.reviews)})`} accent icon={window.I.Star} /></div>
            <div className="card" style={{ ...appHeroCardStyle, padding: 18 }}><StatCard title="Platforms" value={screenshotSets.map((set) => set.label).join(' · ') || 'iPhone'} accent={false} icon={window.I.Smartphone} /></div>
            <div className="card" style={{ ...appHeroCardStyle, padding: 18 }}><StatCard title="Size" value={wrapAppSizeLabel(app.size)} accent={false} icon={window.I.HardDrive} /></div>
          </div>

          {screenshotSets.length > 0 && activeScreenshotSet && (
            <div className="card" style={{ ...appHeroCardStyle, padding: 20, minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 18, fontWeight: 700 }}>Screenshots</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap' }}>
                  <select
                    value={activeScreenshotSet.id}
                    onChange={(event) => {
                      setSelectedScreenshotDevice(event.target.value);
                      setSelectedScreenshotIndex(0);
                    }}
                    style={{ height: appToolbarControlHeight, minWidth: 180, borderRadius: appToolbarControlRadius, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(12,14,18,0.88)', color: 'var(--text-1)', padding: '0 18px', fontSize: 13, fontWeight: 600, outline: 'none' }}
                  >
                    {screenshotSets.map((set) => (
                      <option key={set.id} value={set.id}>{set.label}</option>
                    ))}
                  </select>
                  <button className="btn sm" onClick={() => openScreenshotModal(activeScreenshotSet.id, selectedScreenshotIndex)} style={{ minHeight: appToolbarControlHeight, height: appToolbarControlHeight, borderRadius: appToolbarControlRadius, padding: '0 22px', display: 'inline-flex', alignItems: 'center' }}>
                    Open popup
                  </button>
                </div>
              </div>
              <div style={{ maxWidth: '100%', minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', overflowY: 'hidden', paddingBottom: 6, width: '100%', maxWidth: '100%', minWidth: 0 }}>
                  {activeScreenshotSet.items.map((url, idx) => (
                    <button
                      key={`${activeScreenshotSet.id}-${idx}`}
                      onClick={() => openScreenshotModal(activeScreenshotSet.id, idx)}
                      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(8,10,14,0.9)', borderRadius: 18, padding: 10, cursor: 'pointer', flexShrink: 0, width: wrapScreenshotViewportWidth(activeScreenshotSet.id), maxWidth: '100%' }}
                      aria-label={`Open ${activeScreenshotSet.label} screenshot ${idx + 1}`}
                    >
                      <img
                        src={url}
                        alt={`${activeScreenshotSet.label} screenshot ${idx + 1}`}
                        style={{ width: '100%', height: 'auto', maxHeight: activeScreenshotSet.id === 'mac' ? 220 : activeScreenshotSet.id === 'ipad' ? 360 : 420, objectFit: 'contain', borderRadius: 14, boxShadow: '0 18px 40px rgba(0,0,0,0.32)', display: 'block', margin: '0 auto' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section - Condensed */}
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>About {app.name}</div>
        <div style={{ color: 'var(--text-2)', lineHeight: 1.7, fontSize: 14, display: 'grid', gap: 10 }}>
          <div>{aboutLead}</div>
          <div>{aboutSummary}</div>
        </div>
      </div>

      {/* Contact & Links */}
      <div className="card" style={{ padding: 22 }}>
        {(() => {
          const twitterHref = app.socialLinks?.twitter || wrapSocialSearchUrl('twitter', app);
          const linkedinHref = app.socialLinks?.linkedin || wrapSocialSearchUrl('linkedin', app);
          const instagramHref = app.socialLinks?.instagram || wrapSocialSearchUrl('instagram', app);
          const tiktokHref = app.socialLinks?.tiktok || wrapSocialSearchUrl('tiktok', app);
          return (
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>Contact & Links</div>
          {app.sellerUrl && (
            <a href={app.sellerUrl} target="_blank" rel="noreferrer" style={contactPillStyle}>
              <window.I.Globe style={{ width: 18, height: 18 }} /> {wrapHostname(app.sellerUrl)}
            </a>
          )}
          {twitterHref ? (
            <a href={twitterHref} target="_blank" rel="noreferrer" aria-label="Open X / Twitter" style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: app.socialLinks?.twitter ? 1 : 0.82 }}>
              <BrandLogo src="/assets/x-logo.png" alt="X" size={36} radius={0} />
            </a>
          ) : (
            <span style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: 0.5, cursor: 'not-allowed' }}>
              <BrandLogo src="/assets/x-logo.png" alt="X" size={36} radius={0} />
            </span>
          )}
          {linkedinHref ? (
            <a href={linkedinHref} target="_blank" rel="noreferrer" aria-label="Open LinkedIn" style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: app.socialLinks?.linkedin ? 1 : 0.82 }}>
              <BrandLogo src="/assets/linkedin-logo.png" alt="LinkedIn" size={36} radius={0} />
            </a>
          ) : (
            <span style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: 0.5, cursor: 'not-allowed' }}>
              <BrandLogo src="/assets/linkedin-logo.png" alt="LinkedIn" size={36} radius={0} />
            </span>
          )}
          {instagramHref ? (
            <a href={instagramHref} target="_blank" rel="noreferrer" aria-label="Open Instagram" style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: app.socialLinks?.instagram ? 1 : 0.82 }}>
              <BrandLogo src="/assets/ig-logo.png" alt="Instagram" size={36} radius={0} />
            </a>
          ) : (
            <span style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: 0.5, cursor: 'not-allowed' }}>
              <BrandLogo src="/assets/ig-logo.png" alt="Instagram" size={36} radius={0} />
            </span>
          )}
          {tiktokHref ? (
            <a href={tiktokHref} target="_blank" rel="noreferrer" aria-label="Open TikTok" style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: app.socialLinks?.tiktok ? 1 : 0.82 }}>
              <BrandLogo src="/assets/tiktok-contact-logo.png" alt="TikTok" size={36} radius={0} />
            </a>
          ) : (
            <span style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: 0.5, cursor: 'not-allowed' }}>
              <BrandLogo src="/assets/tiktok-contact-logo.png" alt="TikTok" size={36} radius={0} />
            </span>
          )}
          <span style={{ ...contactPillStyle, width: 56, minWidth: 56, padding: 0, opacity: 0.5, cursor: 'not-allowed' }}>
            <window.I.Phone style={{ width: 18, height: 18 }} />
          </span>
          <span style={{ ...contactPillStyle, opacity: 0.5, cursor: 'not-allowed' }}>
            <window.I.Mail style={{ width: 18, height: 18 }} /> No emails
          </span>
        </div>
          );
        })()}
      </div>

      {/* Downloads & MRR Timeline */}
      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Downloads (30D)</div>
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', fontSize: 13 }}>
          No historical data available
        </div>
      </div>

      {/* Similar Apps */}
      {similar.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Similar Apps</div>
            <span className="chip" style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>{similar.length} apps</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
            {similar.map((item) => (
              <button
                key={`${item.storeId || item.id}-${item.country}`}
                className="card"
                style={{ padding: 14, textAlign: 'left', display: 'flex', gap: 12, alignItems: 'center' }}
                onClick={() => setRoute({ screen: 'app-detail', appId: item.id, storeId: item.storeId, country: item.country })}
              >
                {wrapAppIcon(item)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.developer || wrapCategoryShort(item.category)}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6, fontSize: 12 }}>
                    <span style={{ color: 'var(--accent)' }}>↓ {wrapCompact(item.downloads)}</span>
                    <span style={{ color: 'var(--accent)' }}>{wrapMoney(item.revenue)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {similarState.loading && <div style={{ color: 'var(--text-3)', fontSize: 13 }}>Finding similar apps…</div>}

      {/* Ad Libraries Sections */}
      <AdLibrarySection
        icon="f"
        logo
        logoSrc="/assets/fb-logo.png"
        logoAlt="Facebook"
        bgColor="#1877f2"
        title="Meta Ads Library"
        platform="Meta"
        advertiser={advertiserName}
        searchUrl={metaAdsUrl}
        appName={app.name}
        adsState={metaAdsState}
        note="Meta is queried from the advertiser name first, not the app title. If you know the exact Facebook Page ID later, that can be even more precise than name matching."
      />
      <AdLibrarySection
        icon="🎵"
        logo
        logoSrc="/assets/tiktok-logo.png"
        logoAlt="TikTok"
        bgColor="#000"
        title="TikTok Ads"
        platform="TikTok"
        advertiser={advertiserName}
        searchUrl={tikTokAdsUrl}
        appName={app.name}
        adsState={tikTokAdsState}
        note="TikTok uses the Commercial Content Library path by advertiser. Availability still depends on the regions TikTok exposes in that library."
      />
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <BrandLogo src="/assets/apple-logo.png" alt="Apple" size={24} radius={10} background="#111" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Observed Apple Ads</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
              Public App Store observation for {app.name} in {appleAdsDetection.storefront}
            </div>
          </div>
          <a href="https://ads.apple.com/app-store/advanced" target="_blank" rel="noreferrer" className="btn sm">Apple Ads docs</a>
        </div>
        {appleKeywordState.loading ? <div style={{ color: 'var(--text-3)', fontSize: 12, marginBottom: 12 }}>Scanning public App Store surfaces…</div> : null}
        {!appleKeywordState.loading && appleKeywordState.error ? <div style={{ color: '#ff8b7d', fontSize: 12, marginBottom: 12 }}>{appleKeywordState.error}</div> : null}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginBottom: 16 }}>
          {appleAdsDetection.stats.map((item) => (
            <div key={item.label} className="card" style={{ padding: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Detection summary</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <span className="chip">Status: {appleAdsDetection.status}</span>
              <span className="chip">Certainty: {appleAdsDetection.certainty}</span>
              <span className="chip">Method: {appleAdsDetection.method}</span>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {appleAdsDetection.notes.map((note) => (
                <div key={note} style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{note}</div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Observed queries</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {appleAdsDetection.observedQueries.map((item) => (
                <a key={item.id} href={item.href} target="_blank" rel="noreferrer" style={{ padding: 12, borderRadius: 12, background: 'var(--bg-1)', border: '1px solid var(--border-1)', textDecoration: 'none', color: 'inherit', display: 'grid', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--accent)' }}>Open →</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.5 }}>{item.summary}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginTop: 10 }}>
          Apple does not expose a public advertiser-by-ad library comparable to Meta Ads Library or TikTok Commercial Content Library. This section only reports what can be publicly observed and labels the result as `Observed` or `Unknown` instead of pretending to know campaign activity.
        </div>
      </div>
      <WrapScreenshotModal
        open={screenshotModalOpen}
        app={app}
        deviceSet={activeScreenshotSet}
        index={selectedScreenshotIndex}
        onClose={() => setScreenshotModalOpen(false)}
        onSelectIndex={setSelectedScreenshotIndex}
        onChangeDevice={(deviceId) => {
          setSelectedScreenshotDevice(deviceId);
          setSelectedScreenshotIndex(0);
        }}
      />
      <AdLibrarySection
        icon="👥"
        title="Creator UGC"
        platform="Creators"
        count={0}
        appName={app.name}
      />
    </div>
  );
}

function BrandLogo({ src, alt, size = 22, radius = 8, background = '#111' }) {
  if (!src) return null;
  const displaySize = Math.round(size * 1.4);
  return (
    <div style={{ width: displaySize, height: displaySize, borderRadius: 0, background: 'transparent', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexShrink: 0, overflow: 'visible' }}>
      <img src={src} alt={alt} style={{ width: displaySize, height: displaySize, objectFit: 'contain', objectPosition: 'top left', display: 'block' }} />
    </div>
  );
}

function AdSourceCard({ icon, logo, logoSrc, logoAlt, title, subtitle, borderColor, message }) {
  return (
    <div style={{ padding: '22px 22px 24px 36px', minHeight: 144, height: '100%', display: 'grid', alignContent: 'start' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '40px minmax(0, 1fr)', alignItems: 'start', columnGap: 14, marginBottom: 10 }}>
        {logo ? (
          <BrandLogo src={logoSrc} alt={logoAlt || title} size={28} radius={8} background={borderColor === '#1877f2' ? '#1877f2' : borderColor === '#000' ? '#000' : 'var(--bg-0)'} />
        ) : (
          <span style={{ fontSize: 26, lineHeight: 1, width: 40, height: 40, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>{icon}</span>
        )}
        <div style={{ paddingTop: 2 }}>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 6, lineHeight: 1.35 }}>{subtitle}</div>
        </div>
      </div>
      {message && (
        <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, marginTop: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
}

function wrapAdMediaType(ad) {
  const url = String(ad?.mediaUrl || ad?.thumbnailUrl || '').toLowerCase();
  if (/\.(mp4|mov|webm)(?:[?#].*)?$/i.test(url)) return 'video';
  return 'image';
}

function wrapAdVisualCategory(ad) {
  const text = `${ad?.headline || ''} ${ad?.body || ''}`.toLowerCase();
  if (/(testimonial|story|lost|down|before|after|result)/.test(text)) return 'Testimonial';
  if (/(recipe|food|meal|diet|breakfast|egg|toast|plate)/.test(text)) return 'Lifestyle';
  if (/(quiz|question|checklist|discover|find out)/.test(text)) return 'Quiz';
  if (/(offer|discount|save|deal|free trial)/.test(text)) return 'Offer';
  return 'UGC';
}

function wrapAdObjective(ad) {
  const text = `${ad?.cta || ''} ${ad?.headline || ''} ${ad?.body || ''}`.toLowerCase();
  if (/(install|download|get app|app store|google play)/.test(text)) return 'App install';
  if (/(learn more|discover|find out|see more)/.test(text)) return 'Traffic';
  if (/(sign up|start now|join|get started|apply)/.test(text)) return 'Lead gen';
  if (/(shop now|buy now|order now)/.test(text)) return 'Purchase';
  return 'Awareness';
}

function wrapAdRedirectLabel(ad) {
  const url = String(ad?.destinationUrl || ad?.detailUrl || '');
  if (!url) return 'Library detail';
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host;
  } catch {
    return 'External link';
  }
}

function wrapAdPublishedLabel(ad) {
  return ad?.lastShownAt || ad?.startedAt || 'Unknown date';
}

function wrapAdFilterIcon(filterId) {
  if (filterId === 'video') return window.I.Play;
  if (filterId === 'image') return window.I.Image;
  return window.I.Layers;
}

function AdLibrarySection({ icon, logo, logoSrc, logoAlt, bgColor, title, platform, searchUrl, appName, advertiser, note = '', adsState }) {
  const { ads = [], loading = false, error = '' } = adsState || {};
  const [mediaFilter, setMediaFilter] = React.useState('all');
  const normalizedAds = ads.map((ad, index) => ({
    ...ad,
    mediaType: wrapAdMediaType(ad),
    visualCategory: wrapAdVisualCategory(ad),
    objective: wrapAdObjective(ad),
    redirectLabel: wrapAdRedirectLabel(ad),
    publishedLabel: wrapAdPublishedLabel(ad),
    caption: ad.body || ad.headline || '',
    rank: index + 1,
  }));
  const filteredAds = normalizedAds.filter((ad) => mediaFilter === 'all' || ad.mediaType === mediaFilter);
  const imageCount = normalizedAds.filter((ad) => ad.mediaType === 'image').length;
  const videoCount = normalizedAds.filter((ad) => ad.mediaType === 'video').length;
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {logo ? (
          <BrandLogo src={logoSrc} alt={logoAlt || title} size={24} radius={10} background={bgColor} />
        ) : (
          <span style={{ fontSize: 24 }}>{icon}</span>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--text-3)' }}>Advertiser search: {advertiser || appName}</div>
        </div>
        {searchUrl ? <a href={searchUrl} target="_blank" rel="noreferrer" className="btn sm">Open full view</a> : null}
      </div>
      {!loading && !error && normalizedAds.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          <div className="seg" style={{ padding: 4, gap: 4 }}>
            {[
              { id: 'all', label: 'All', count: normalizedAds.length },
              { id: 'video', label: 'Video', count: videoCount },
              { id: 'image', label: 'Image', count: imageCount },
            ].map((item) => (
              (() => {
                const Icon = wrapAdFilterIcon(item.id);
                return (
                  <button
                    key={item.id}
                    className={mediaFilter === item.id ? 'on' : ''}
                    onClick={() => setMediaFilter(item.id)}
                    style={{ height: 36, padding: '0 12px', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}
                  >
                    <Icon style={{ width: 14, height: 14, opacity: 0.9 }} />
                    <span>{item.label}</span>
                    <span className="chip" style={{ padding: '2px 7px', minHeight: 0, height: 'auto' }}>{item.count}</span>
                  </button>
                );
              })()
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
            Ads sorted from strongest observed signal to weakest
          </div>
        </div>
      ) : null}
      {loading ? <div style={{ padding: '18px 0', color: 'var(--text-3)', fontSize: 13 }}>Loading ads…</div> : null}
      {!loading && error ? <div style={{ padding: '18px 0', color: '#ff8b7d', fontSize: 13 }}>{error}</div> : null}
      {!loading && !error && ads.length === 0 ? (
        <div style={{ padding: '18px 0', color: 'var(--text-3)', fontSize: 13 }}>No ads found for this advertiser.</div>
      ) : null}
      {!loading && !error && filteredAds.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filteredAds.map((ad) => {
            const href = ad.detailUrl || ad.destinationUrl || searchUrl;
            const isVideo = ad.mediaType === 'video';
            const rankStyle = ad.rank === 1
              ? { background: 'linear-gradient(135deg, #f6cb58, #b67d10)', color: '#1b1200' }
              : ad.rank === 2
                ? { background: 'linear-gradient(135deg, #e9edf4, #8f99a8)', color: '#10151d' }
                : ad.rank === 3
                  ? { background: 'linear-gradient(135deg, #e39a58, #8f5422)', color: '#1b0f05' }
                  : { background: 'rgba(255,255,255,0.08)', color: 'var(--text-2)' };
            return (
              <a
                key={`${platform}-${ad.id}`}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{ padding: 0, overflow: 'hidden', textDecoration: 'none', color: 'inherit', background: 'rgba(255,255,255,0.015)', borderColor: 'rgba(255,140,40,0.22)' }}
              >
                <div style={{ position: 'relative', minHeight: 356, background: 'var(--bg-1)', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {ad.mediaUrl ? (
                    isVideo ? (
                      <video src={ad.mediaUrl} muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <img src={ad.mediaUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    )
                  ) : (
                    <div style={{ color: 'var(--text-3)', fontSize: 12 }}>No preview</div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,9,12,0.02) 0%, rgba(7,9,12,0.12) 52%, rgba(7,9,12,0.82) 100%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ padding: '6px 10px', borderRadius: 999, fontSize: 12, fontWeight: 900, ...rankStyle }}>
                      #{ad.rank}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <span className="chip" style={{ background: 'rgba(10,12,16,0.86)' }}>{ad.mediaType === 'video' ? 'VIDEO' : 'IMAGE'}</span>
                      <span className="chip" style={{ background: 'rgba(10,12,16,0.86)' }}>{ad.visualCategory}</span>
                    </div>
                  </div>
                  <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'grid', gap: 8 }}>
                    {ad.headline ? <div style={{ fontSize: 25, fontWeight: 900, lineHeight: 1.02, color: '#fff', textShadow: '0 8px 24px rgba(0,0,0,0.45)' }}>{ad.headline}</div> : null}
                    {ad.caption ? (
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {ad.caption}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ minWidth: 0, display: 'grid', gap: 12, alignContent: 'start', padding: 14 }}>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="chip">{ad.advertiser || advertiser || appName}</span>
                    <span className="chip">{ad.objective}</span>
                    {ad.cta ? <span className="chip">{ad.cta}</span> : null}
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, alignItems: 'center' }}>
                      <div style={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.05)', color: 'var(--text-2)' }}>
                        <window.I.MessageSquare style={{ width: 14, height: 14 }} />
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Caption</div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ad.caption || 'No caption available'}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gap: 8, paddingTop: 6, borderTop: '1px solid var(--border-0)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <window.I.Target style={{ width: 13, height: 13 }} />
                        Ad objective
                      </span>
                      <span style={{ color: 'var(--text-1)', fontWeight: 700, textAlign: 'right' }}>{ad.objective}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <window.I.ExternalLink style={{ width: 13, height: 13 }} />
                        Redirect
                      </span>
                      <span style={{ color: 'var(--text-1)', fontWeight: 700, textAlign: 'right' }}>{ad.redirectLabel}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                        <window.I.Clock style={{ width: 13, height: 13 }} />
                        Publish date
                      </span>
                      <span style={{ color: 'var(--text-1)', fontWeight: 700, textAlign: 'right' }}>{ad.publishedLabel}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                    <window.I.ExternalLink style={{ width: 13, height: 13 }} />
                    Open ad
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      ) : null}
      <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5, marginTop: 10 }}>
        {note || `This view targets the advertiser name instead of the app title to reduce false positives. If ${platform} blocks inline rendering, use "Open full view".`}
      </div>
    </div>
  );
}

function StatCard({ title, value, accent = true, icon: Icon = null }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        {Icon ? <Icon style={{ width: 13, height: 13 }} /> : null}
        <span>{title}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: accent ? 'var(--accent)' : 'var(--text-1)', marginTop: 4 }}>{value}</div>
    </div>
  );
}

function WrapAIAgentsScreen() {
  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1220, margin: '0 auto' }}>
      <WrapSectionTitle icon={window.I.Wand} title="AI Agents" body="Automate market research and competitive analysis with AI." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        <AIAgentCard
          icon="🔍"
          title="Idea Validator"
          description="Analyze app concepts and get market viability scores with competitor insights."
          status="Coming Soon"
        />
        <AIAgentCard
          icon="📊"
          title="Competitor Report"
          description="Auto-generate deep competitive analysis with pricing, features, and positioning."
          status="Coming Soon"
        />
        <AIAgentCard
          icon="💡"
          title="App Concept Generator"
          description="Generate validated app ideas based on market gaps and trending categories."
          status="Coming Soon"
        />
        <AIAgentCard
          icon="📈"
          title="Growth Advisor"
          description="Get personalized ASO and marketing recommendations based on your app data."
          status="Coming Soon"
        />
      </div>
    </div>
  );
}

function AIAgentCard({ icon, title, description, status }) {
  return (
    <div className="card" style={{ padding: 20, borderLeft: '3px solid var(--accent)' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6, marginBottom: 12 }}>{description}</div>
      <span className="chip" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>{status}</span>
    </div>
  );
}

function WrapMyProjectsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const projects = window.DATA.PROJECTS || [];
  const appsById = new Map((window.DATA.APPS || []).map((app) => [app.id, app]));
  const [pendingDelete, setPendingDelete] = React.useState(null);

  const removeProject = (project, e) => {
    e.stopPropagation();
    setPendingDelete(project);
  };

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1220, margin: '0 auto' }}>
      <WrapConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete Project"
        body={pendingDelete ? `Delete "${pendingDelete.name}"? This removes the project workspace, localizations, and export history from browser storage.` : ''}
        confirmLabel="Delete"
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          const project = pendingDelete;
          if (project) {
            updateWrapWorkspace((current) => ({
              ...current,
              projects: (current.projects || []).filter((item) => item.id !== project.id)
            }));
          }
          setPendingDelete(null);
        }}
      />
      <WrapSectionTitle
        icon={window.I.Folder}
        title="My Projects"
        body="Open briefs, jump back into design, and deliver screenshot packs from one place."
        right={<button className="btn primary" onClick={() => setRoute({ screen: 'new-project' })}><window.I.Plus style={{ width: 16, height: 16 }} /> New Project</button>}
      />
      {projects.length === 0 ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--text-3)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📁</div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>No projects yet</div>
          <div style={{ fontSize: 13 }}>Create your first project to organize apps and research</div>
          <button className="btn primary" style={{ marginTop: 20 }} onClick={() => setRoute({ screen: 'new-project' })}>
            <window.I.Plus style={{ width: 16, height: 16 }} /> New Project
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {projects.map((project) => {
            const app = appsById.get(project.appId);
            const activeVariant = project.variantsData?.find((variant) => variant.id === project.activeVariantId) || project.variantsData?.[0];
            const readyToDeliver = Boolean(activeVariant?.screensData?.length);
            return (
              <div
                key={project.id}
                className="card"
                style={{ padding: 16, textAlign: 'left', display: 'grid', gap: 14 }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '48px minmax(0, 1fr) auto', gap: 14, alignItems: 'center' }}>
                  <button
                    onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'overview' })}
                    style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${app?.tint || '#667085'}, ${app?.tint2 || '#344054'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}
                  >
                    {app?.icon || project.name?.charAt(0) || 'P'}
                  </button>
                  <button onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'overview' })} style={{ minWidth: 0, textAlign: 'left' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
                      {app?.name || 'No app linked'} · {project.variantsData?.length || 1} localization{(project.variantsData?.length || 1) === 1 ? '' : 's'} · {project.screens || project.screensData?.length || 0} screens
                    </div>
                  </button>
                  <div style={{ display: 'grid', justifyItems: 'end', gap: 6 }}>
                    <span className={`chip ${readyToDeliver ? 'accent' : ''}`}>{readyToDeliver ? 'Ready' : (project.status || 'Draft')}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{project.updated || 'Just now'}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn sm" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'overview' })}><window.I.FileText /> Brief</button>
                  <button className="btn sm" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: readyToDeliver ? 'edit' : 'generate' })}>{readyToDeliver ? <window.I.Pencil /> : <window.I.Sparkle />} {readyToDeliver ? 'Design' : 'Generate'}</button>
                  <button className="btn sm" onClick={() => setRoute({ screen: 'project', projectId: project.id, tab: 'exports' })}><window.I.Download /> Deliver</button>
                  <button
                    className="btn sm"
                    onClick={(e) => removeProject(project, e)}
                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                  >
                    <window.I.Trash style={{ width: 14, height: 14 }} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WrapMyAppsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const { user } = window.useAuth?.() || { user: null };
  const [modalOpen, setModalOpen] = React.useState(false);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [pendingRemoveApp, setPendingRemoveApp] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState('');
  const [publisherBusy, setPublisherBusy] = React.useState(false);
  const [publisherError, setPublisherError] = React.useState('');
  const [publisherJobState, setPublisherJobState] = React.useState({ loading: false, message: '', error: '', jobId: '' });
  const [reviewsState, setReviewsState] = React.useState({ reviews: [], loading: false, error: '' });
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const apps = window.DATA.APPS || [];
  const visibleApps = [...trackedApps, ...apps.filter((app) => !trackedApps.some((tracked) => tracked.name === app.name))];
  const selected = visibleApps.find((app) => app.id === selectedId) || visibleApps[0] || null;
  const publisherConnection = wrapPublisherConnectionForApp(workspace, selected?.id);
  const countryMeta = wrapCountryMeta(selected?.country || 'US');
  const asoExport = React.useMemo(() => wrapBuildAsoMetadataExport(selected), [selected]);

  React.useEffect(() => {
    if (!selectedId && visibleApps[0]?.id) setSelectedId(visibleApps[0].id);
  }, [selectedId, visibleApps]);

  React.useEffect(() => {
    let cancelled = false;
    if (!selected?.storeId) {
      setReviewsState({ reviews: [], loading: false, error: '' });
      return undefined;
    }
    setReviewsState((current) => ({ reviews: current.reviews || [], loading: true, error: '' }));
    fetch(`/api/apple/reviews?id=${encodeURIComponent(selected.storeId)}&country=${String(selected.country || 'US').toLowerCase()}&page=1`)
      .then((response) => response.json().then((data) => {
        if (!response.ok) throw new Error(data.error || 'Could not load reviews');
        return data.reviews || [];
      }))
      .then((reviews) => {
        if (!cancelled) setReviewsState({ reviews, loading: false, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setReviewsState({ reviews: [], loading: false, error: error?.message || 'Could not load reviews' });
      });
    return () => { cancelled = true; };
  }, [selected?.id, selected?.storeId, selected?.country]);

  const removeApp = (app, e) => {
    e.stopPropagation();
    setPendingRemoveApp(app);
  };

  const savePublisherConnection = (appId, connection) => {
    updateWrapWorkspace((current) => ({
      ...current,
      publisherConnections: {
        ...(current.publisherConnections || {}),
        [appId]: connection,
      },
    }));
  };

  const connectPublisherAccess = async () => {
    if (!selected) return;
    setPublisherError('');
    setPublisherBusy(true);
    try {
      const fallbackUrl = selected.storeUrl || (selected.storeId ? `https://apps.apple.com/app/id${selected.storeId}` : '');
      if (!fallbackUrl) throw new Error('No public App Store or Play URL is available for this app.');
      const connection = await wrapConnectApp(fallbackUrl);
      savePublisherConnection(selected.id, {
        ...connection,
        connectedAt: new Date().toISOString(),
        writeMode: 'draft',
        capabilities: {
          reviewReplies: true,
          reviewReplyPrep: true,
          reviewReplyDirect: false,
          asoExport: true,
          asoMetadataPrep: true,
          asoPublishDirect: false,
          screenshotExport: true,
          screenshotUploadPrep: true,
          screenshotUploadDirect: false,
        },
      });
    } catch (error) {
      setPublisherError(error?.message || 'Could not connect publisher access');
    } finally {
      setPublisherBusy(false);
    }
  };

  const exportAsoPackage = () => {
    if (!selected) return;
    const slug = selected.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    wrapDownloadFile(`${slug}-aso-metadata.json`, JSON.stringify({
      ...asoExport,
      sourceApp: {
        id: selected.id,
        storeId: selected.storeId || null,
        category: selected.category || null,
        country: selected.country || 'US',
      },
    }, null, 2), 'application/json');
  };

  const exportAsoTitleText = () => {
    if (!selected) return;
    const slug = selected.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    wrapDownloadFile(`${slug}-aso-title.txt`, `${asoExport.title}\n${asoExport.subtitle}\n`, 'text/plain;charset=utf-8');
  };

  const exportReviewReplyPack = () => {
    if (!selected) return;
    const reviews = reviewsState.reviews.slice(0, 8).map((review) => ({
      id: review.id,
      rating: review.rating,
      title: review.title || '',
      author: review.author || '',
      updatedAt: review.updatedAt || '',
      replyDraft: wrapBuildReviewReplyDraft(selected, review),
    }));
    const slug = selected.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    wrapDownloadFile(`${slug}-review-replies.json`, JSON.stringify({
      generatedAt: new Date().toISOString(),
      appId: selected.id,
      appName: selected.name,
      provider: publisherConnection?.provider || 'app-store-connect',
      writeMode: publisherConnection?.writeMode || 'draft',
      reviews,
    }, null, 2), 'application/json');
  };

  const preparePublisherJob = async (type, payload, preparingLabel, readyLabel) => {
    if (!selected || !publisherConnection || publisherConnection.provider !== 'app-store-connect') return;
    setPublisherJobState({ loading: true, message: preparingLabel, error: '', jobId: '' });
    try {
      const response = await fetch(type === 'review-replies' ? '/api/asc/review-replies' : '/api/asc/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not prepare App Store Connect job');
      setPublisherJobState({ loading: false, message: `${readyLabel}: ${data.id}`, error: '', jobId: data.id });
    } catch (error) {
      setPublisherJobState({ loading: false, message: '', error: error?.message || 'Could not prepare App Store Connect job', jobId: '' });
    }
  };

  const prepareAscReplyJob = () => {
    if (!selected || !reviewsState.reviews.length) return;
    preparePublisherJob(
      'review-replies',
      {
        connection: publisherConnection,
        app: {
          id: selected.id,
          name: selected.name,
          storeId: selected.storeId || publisherConnection?.appId || null,
          country: selected.country || 'US',
          storeUrl: selected.storeUrl || publisherConnection?.url || '',
        },
        reviews: reviewsState.reviews.slice(0, 12).map((review) => ({
          id: review.id,
          rating: review.rating,
          title: review.title || '',
          author: review.author || '',
          updatedAt: review.updatedAt || '',
          content: review.content || '',
          replyDraft: wrapBuildReviewReplyDraft(selected, review),
        })),
      },
      'Preparing App Store Connect reply job…',
      'ASC reply job ready'
    );
  };

  const prepareAscMetadataJob = () => {
    if (!selected) return;
    preparePublisherJob(
      'metadata',
      {
        connection: publisherConnection,
        app: {
          id: selected.id,
          name: selected.name,
          storeId: selected.storeId || publisherConnection?.appId || null,
          country: selected.country || 'US',
          category: selected.category || null,
          subtitle: selected.subtitle || '',
          storeUrl: selected.storeUrl || publisherConnection?.url || '',
        },
        metadata: asoExport,
      },
      'Preparing App Store Connect metadata job…',
      'ASC metadata job ready'
    );
  };

  const copyReply = async (review) => {
    const text = wrapBuildReviewReplyDraft(selected, review);
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const openScreenshotsExport = () => {
    if (!selected) return;
    wrapBuildMyAppProject(workspace, selected, setRoute, 'exports');
  };

  const createProjectFromSelectedApp = () => {
    if (!selected) return;
    const result = window.SHIPSHOT?.createProjectFromInput?.(workspace, {
      projectName: `${selected.name} launch`,
      appId: selected.id,
      appName: selected.name,
      appDescription: selected.description || selected.sub || '',
      category: selected.category || 'productivity',
      country: selected.country || 'en-US',
      audience: 'Primary audience',
      sourceType: selected.storeUrl ? 'url' : 'prompt',
      sourceValue: selected.storeUrl || selected.description || selected.sub || '',
      sourceReference: selected.storeUrl || '',
      sourceMetadata: {
        appName: selected.name,
        description: selected.description || selected.sub || '',
        developer: selected.developer || '',
        icon: selected.icon || '',
        category: selected.category || 'productivity',
        storeUrl: selected.storeUrl || '',
        storeId: selected.storeId || '',
      },
      style: 't1',
      screenCount: 6,
    });
    if (!result?.workspace || !result?.project) return;
    updateWrapWorkspace(() => result.workspace);
    setRoute({ screen: 'project', projectId: result.project.id, tab: 'overview' });
  };

  return (
    <div className="signal-two-pane-page">
      <WrapConfirmModal
        open={Boolean(pendingRemoveApp)}
        title="Remove App"
        body={pendingRemoveApp ? `Remove "${pendingRemoveApp.name}" from My Apps? Publisher access and linked workspace actions for this app will no longer be available here.` : ''}
        confirmLabel="Remove"
        onCancel={() => setPendingRemoveApp(null)}
        onConfirm={() => {
          const app = pendingRemoveApp;
          if (app) {
            updateWrapWorkspace((current) => ({
              ...current,
              trackedApps: (current.trackedApps || []).filter((tracked) => tracked.name !== app.name && tracked.id !== app.id)
            }));
            if (selected?.id === app.id) setSelectedId(visibleApps.find((item) => item.id !== app.id)?.id || '');
          }
          setPendingRemoveApp(null);
        }}
      />
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle
          icon={window.I.Smartphone}
          title="My Apps"
          body="Own the apps you publish: access, reviews, ASO exports, and screenshot delivery."
        />
        <div className="card signal-two-pane-list">
          <div style={{ padding: 14, borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <window.I.Smartphone />
              <strong>Apps</strong>
              <span className="chip">{visibleApps.length}</span>
            </div>
            <button className="btn primary sm" onClick={() => setModalOpen(true)}><window.I.Plus /> Add App</button>
          </div>
          {!visibleApps.length ? (
            <div style={{ padding: 18 }}>
              <WrapEmptyState icon={window.I.Smartphone} title="No apps added yet" body="Add your apps to unlock publisher actions and exports." action={() => setModalOpen(true)} actionLabel="Add My App" />
            </div>
          ) : (
            visibleApps.map((app) => {
              const connection = wrapPublisherConnectionForApp(workspace, app.id);
              const active = selected?.id === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  style={{ width: '100%', padding: 14, borderBottom: '1px solid var(--border-0)', background: active ? 'rgba(244,98,31,0.08)' : 'transparent', textAlign: 'left', display: 'grid', gridTemplateColumns: '40px minmax(0,1fr) auto auto', gap: 12, alignItems: 'center' }}
                >
                  {wrapAppIcon(app)}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{wrapCategoryShort(app.category)} · {connection ? 'publisher connected' : 'no publisher access'}</div>
                  </div>
                  <span className="chip">{app.country || 'US'}</span>
                  {app.tracked ? (
                    <span
                      className="btn sm"
                      onClick={(e) => removeApp(app, e)}
                      style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    >
                      <window.I.Trash style={{ width: 14, height: 14 }} />
                    </span>
                  ) : (
                    <window.I.ChevronR />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="signal-two-pane-main signal-two-pane-main--airy">
        {!selected ? (
          <WrapEmptyState icon={window.I.Smartphone} title="Select an app" body="Choose an app from the left to manage reviews, ASO exports, and screenshot delivery." />
        ) : (
          <>
            <WrapSectionTitle
              icon={window.I.Key}
              title={selected.name}
              body={`${countryMeta?.flag || '🇺🇸'} ${countryMeta?.name || 'United States'} · ${selected.developer || 'Local workspace app'}`}
              right={<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className="btn sm" onClick={() => setRoute({ screen: 'app-detail', appId: selected.id, storeId: selected.storeId, country: selected.country || 'US' })}><window.I.ExternalLink /> Open app</button>
                <button className="btn sm" onClick={createProjectFromSelectedApp}><window.I.Folder /> New project</button>
                <button className="btn primary sm" onClick={() => setModalOpen(true)}><window.I.Plus /> Add App</button>
              </div>}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16 }}>
              <div className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <window.I.Lock />
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Workspace auth</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {user ? `Signed in as ${user.email || 'current user'}. Workspace sync is active for tracked apps and exports.` : 'You are in guest mode. Sign in to keep My Apps, projects, and publisher setups synced across sessions.'}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={`chip ${user ? 'accent' : ''}`}>{user ? 'Synced' : 'Guest'}</span>
                  {!user ? <button className="btn sm" onClick={() => setAuthModalOpen(true)}><window.I.Key /> Sign in</button> : null}
                </div>
              </div>

              <div className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <window.I.Apple />
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Publisher access</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {publisherConnection
                    ? `Connected to ${publisherConnection.provider === 'app-store-connect' ? 'App Store Connect' : 'Google Play'} for this app. Exports are unlocked and review replies can be prepared from live store reviews.`
                    : 'Connect the store record for this app to unlock per-app review handling and publisher-oriented exports.'}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className={`chip ${publisherConnection ? 'accent' : ''}`}>{publisherConnection ? 'Connected' : 'Not connected'}</span>
                  <span className="chip">{publisherConnection?.writeMode === 'draft' ? 'Draft write mode' : 'No write mode'}</span>
                  {!publisherConnection ? <button className="btn sm" onClick={connectPublisherAccess} disabled={publisherBusy}><window.I.Key /> {publisherBusy ? 'Connecting…' : 'Connect'}</button> : null}
                  {publisherConnection?.url ? <button className="btn sm" onClick={() => window.open(publisherConnection.url, '_blank', 'noopener,noreferrer')}><window.I.ExternalLink /> Store page</button> : null}
                </div>
                {publisherError ? <div style={{ fontSize: 12, color: '#ff8b7d' }}>{publisherError}</div> : null}
                {publisherJobState.error ? <div style={{ fontSize: 12, color: '#ff8b7d' }}>{publisherJobState.error}</div> : null}
                {publisherJobState.message ? <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{publisherJobState.message}</div> : null}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(320px,0.95fr)', gap: 16 }}>
              <div className="card" style={{ padding: 18, display: 'grid', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <window.I.MessageSquare />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Review replies</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn sm" onClick={() => setRoute({ screen: 'reviews' })}><window.I.Book /> Reviews</button>
                    <button className="btn sm" onClick={exportReviewReplyPack} disabled={!reviewsState.reviews.length}><window.I.Download /> Export reply pack</button>
                    <button className="btn primary sm" onClick={prepareAscReplyJob} disabled={!reviewsState.reviews.length || publisherConnection?.provider !== 'app-store-connect' || publisherJobState.loading}><window.I.Upload /> Prepare ASC job</button>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {publisherConnection
                    ? 'Live App Store reviews are loaded below. Signal drafts a reply for each review, and can package the batch into an App Store Connect backend job.'
                    : 'Connect publisher access first. Then this app can use live review text to generate response drafts tied to the selected listing.'}
                </div>
                {!selected.storeId ? <WrapEmptyState icon={window.I.Book} title="No App Store source" body="This app does not expose a public App Store ID yet, so live reviews cannot be loaded." /> : null}
                {selected.storeId && reviewsState.loading ? <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Loading live App Store reviews…</div> : null}
                {selected.storeId && !reviewsState.loading && reviewsState.error ? <div style={{ color: '#ff8b7d', fontSize: 12.5 }}>{reviewsState.error}</div> : null}
                {selected.storeId && !reviewsState.loading && !reviewsState.error ? (
                  <div style={{ display: 'grid', gap: 10 }}>
                    {reviewsState.reviews.slice(0, 4).map((review) => (
                      <div key={review.id} style={{ border: '1px solid var(--border-1)', borderRadius: 16, padding: 14, display: 'grid', gap: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 700 }}>{review.title || 'Untitled review'}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{review.author || 'Anonymous'} · {wrapRelativeTime(review.updatedAt, 'Recently')}</div>
                          </div>
                          <span className="chip accent">★ {wrapRating(review.rating)}</span>
                        </div>
                        <div style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{review.content}</div>
                        <div style={{ padding: 12, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-0)', color: 'var(--text-2)', lineHeight: 1.65 }}>
                          {wrapBuildReviewReplyDraft(selected, review)}
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button className="btn sm" onClick={() => copyReply(review)}><window.I.Copy /> Copy reply</button>
                          {publisherConnection?.provider === 'app-store-connect' ? <button className="btn sm" onClick={() => window.open('https://appstoreconnect.apple.com/apps', '_blank', 'noopener,noreferrer')}><window.I.Apple /> Open ASC</button> : null}
                        </div>
                      </div>
                    ))}
                    {!reviewsState.reviews.length ? <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>No written reviews returned for this app on the current page.</div> : null}
                  </div>
                ) : null}
              </div>

              <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
                <div className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <window.I.Sparkles />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>ASO metadata export</div>
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <MetaRow k="Optimized title" v={asoExport.title} />
                    <MetaRow k="Optimized subtitle" v={asoExport.subtitle} />
                    <MetaRow k="Keyword set" v={asoExport.keywords.slice(0, 6).join(', ') || 'No keywords detected'} />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="btn sm" onClick={exportAsoTitleText}><window.I.Download /> Export title</button>
                    <button className="btn primary sm" onClick={exportAsoPackage}><window.I.Upload /> Export ASO package</button>
                    <button className="btn sm" onClick={prepareAscMetadataJob} disabled={publisherConnection?.provider !== 'app-store-connect' || publisherJobState.loading}><window.I.Apple /> Prepare ASC metadata</button>
                  </div>
                </div>

                <div className="card" style={{ padding: 18, display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <window.I.Image />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Screenshot export</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    Open the generated screenshot project for this app directly on the export tab. If no project exists yet, Signal creates one from the current listing metadata first.
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <MetaRow k="Source shots" v={String((selected.screenshots || []).length || 0)} />
                    <MetaRow k="Existing projects" v={String((workspace?.projects || []).filter((project) => project.appId === selected.id).length)} />
                    <MetaRow k="Delivery" v="Project export tab + backend upload prep" />
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button className="btn sm" onClick={() => setRoute({ screen: 'screenshots' })}><window.I.Image /> Screenshot studio</button>
                    <button className="btn primary sm" onClick={openScreenshotsExport}><window.I.Download /> Open exports</button>
                  </div>
                </div>

                <div className="card" style={{ padding: 18, display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <window.I.CheckCircle />
                    <div style={{ fontSize: 16, fontWeight: 700 }}>What this auth unlocks</div>
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <MetaRow k="Workspace auth" v="Syncs My Apps, projects, saved exports, and app operations to your user account" />
                    <MetaRow k="Publisher access" v="Maps a specific listing to App Store Connect or Google Play metadata for owner-only workflows" />
                    <MetaRow k="Review replies" v="Generated from live reviews, then bundled into an App Store Connect prep job or copied manually" />
                    <MetaRow k="ASO metadata" v="Built from app metadata + extracted keywords, exportable as JSON or backend prep job" />
                    <MetaRow k="Screenshots" v="Handled from the project export tab, where Signal prepares an ASC upload job from rendered assets" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {authModalOpen ? <window.AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={() => setAuthModalOpen(false)} /> : null}
      </div>
    </div>
  );
}

function WrapMarketInsightsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const [country, setCountry] = React.useState('us');
  const [category, setCategory] = React.useState('all');
  const [timeWindow, setTimeWindow] = React.useState('current');
  const [showDistribution, setShowDistribution] = React.useState(false);
  const countryOptions = WRAP_COUNTRIES.map((item) => ({ value: item.code.toLowerCase(), label: `${item.flag} ${item.name}`, code: item.code }));
  const categoryOptions = [{ value: 'all', label: 'All categories' }, ...(window.DATA.APP_CATEGORIES || []).map((item) => ({ value: item.id, label: `${item.emoji} ${item.label}` }))];
  const { items: topFree, loading: loadingFree, error: errorFree } = useChartData('top-free', country, 120);
  const { items: topPaid, loading: loadingPaid, error: errorPaid } = useChartData('top-paid', country, 120);
  const { items: topGrossing, loading: loadingGrossing, error: errorGrossing } = useChartData('top-grossing', country, 120);
  const loading = loadingFree || loadingPaid || loadingGrossing;
  const loadingError = errorFree || errorPaid || errorGrossing;

  const allApps = React.useMemo(
    () => wrapDedupeLiveApps([...topFree, ...topPaid, ...topGrossing]),
    [topFree, topPaid, topGrossing]
  );

  const filteredMarketApps = React.useMemo(
    () => category === 'all' ? allApps : allApps.filter((app) => app.category === category),
    [allApps, category]
  );

  const filteredTrackedApps = React.useMemo(() => {
    const scoped = category === 'all' ? trackedApps : trackedApps.filter((app) => app.category === category);
    return scoped.sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0));
  }, [trackedApps, category]);

  const averageValue = (items, getValue) => items.length
    ? items.reduce((sum, item) => sum + Number(getValue(item) || 0), 0) / items.length
    : 0;

  const medianValue = (items, getValue) => {
    if (!items.length) return 0;
    const values = items.map((item) => Number(getValue(item) || 0)).filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
    if (!values.length) return 0;
    const middle = Math.floor(values.length / 2);
    return values.length % 2 ? values[middle] : ((values[middle - 1] + values[middle]) / 2);
  };

  const marketCategoryRows = React.useMemo(() => {
    const buckets = {};
    filteredMarketApps.forEach((app) => {
      const key = app.category || 'unknown';
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(app);
    });
    return Object.entries(buckets).map(([categoryId, apps]) => ({
      categoryId,
      label: wrapCategoryLabel(categoryId),
      count: apps.length,
      avgRevenue: averageValue(apps, (app) => app.revenue),
      avgDownloads: averageValue(apps, (app) => app.downloads),
      avgGrowth: averageValue(apps, (app) => app.growth),
      avgRating: averageValue(apps, (app) => app.rating),
    })).sort((a, b) => b.avgRevenue - a.avgRevenue || b.count - a.count);
  }, [filteredMarketApps]);

  const trackedCategoryRows = React.useMemo(() => {
    const buckets = {};
    filteredTrackedApps.forEach((app) => {
      const key = app.category || 'unknown';
      if (!buckets[key]) buckets[key] = [];
      buckets[key].push(app);
    });
    return Object.entries(buckets).map(([categoryId, apps]) => ({
      categoryId,
      label: wrapCategoryLabel(categoryId),
      count: apps.length,
      avgRevenue: averageValue(apps, (app) => app.revenue),
      avgDownloads: averageValue(apps, (app) => app.downloads),
      avgGrowth: averageValue(apps, (app) => app.growth),
      avgRating: averageValue(apps, (app) => app.rating),
    })).sort((a, b) => b.avgRevenue - a.avgRevenue || b.count - a.count);
  }, [filteredTrackedApps]);

  const marketBench = React.useMemo(() => ({
    appCount: filteredMarketApps.length,
    avgRevenue: averageValue(filteredMarketApps, (app) => app.revenue),
    avgDownloads: averageValue(filteredMarketApps, (app) => app.downloads),
    avgGrowth: averageValue(filteredMarketApps, (app) => app.growth),
    avgRating: averageValue(filteredMarketApps, (app) => app.rating),
    medianRevenue: medianValue(filteredMarketApps, (app) => app.revenue),
  }), [filteredMarketApps]);

  const trackedBench = React.useMemo(() => ({
    appCount: filteredTrackedApps.length,
    avgRevenue: averageValue(filteredTrackedApps, (app) => app.revenue),
    avgDownloads: averageValue(filteredTrackedApps, (app) => app.downloads),
    avgGrowth: averageValue(filteredTrackedApps, (app) => app.growth),
    avgRating: averageValue(filteredTrackedApps, (app) => app.rating),
  }), [filteredTrackedApps]);

  const categoryGaps = React.useMemo(() => {
    return trackedCategoryRows.map((trackedRow) => {
      const marketRow = marketCategoryRows.find((item) => item.categoryId === trackedRow.categoryId);
      return {
        ...trackedRow,
        marketAvgRevenue: marketRow?.avgRevenue || 0,
        marketAvgGrowth: marketRow?.avgGrowth || 0,
        marketAvgRating: marketRow?.avgRating || 0,
        revenueGap: trackedRow.avgRevenue - Number(marketRow?.avgRevenue || 0),
        growthGap: trackedRow.avgGrowth - Number(marketRow?.avgGrowth || 0),
        ratingGap: trackedRow.avgRating - Number(marketRow?.avgRating || 0),
      };
    }).sort((a, b) => b.revenueGap - a.revenueGap);
  }, [trackedCategoryRows, marketCategoryRows]);

  const appOpportunities = React.useMemo(() => {
    return filteredTrackedApps.map((app) => {
      const peers = filteredMarketApps.filter((item) => item.category === app.category);
      const peerRevenue = averageValue(peers, (item) => item.revenue);
      const peerGrowth = averageValue(peers, (item) => item.growth);
      const peerRating = averageValue(peers, (item) => item.rating);
      const issues = [
        Number(app.rating || 0) < peerRating - 0.25 ? `Rating trails category by ${(peerRating - Number(app.rating || 0)).toFixed(1)} pts` : null,
        Number(app.growth || 0) < peerGrowth - 4 ? `Growth trails peers by ${(peerGrowth - Number(app.growth || 0)).toFixed(1)} pts` : null,
        Number(app.revenue || 0) < peerRevenue * 0.7 ? 'Revenue under peer average' : null,
        Number(app.creators || 0) === 0 ? 'No creator coverage' : null,
        Number(app.metaAds || 0) === 0 && Number(app.appleAds || 0) === 0 ? 'No ad coverage detected' : null,
      ].filter(Boolean);
      return {
        ...app,
        peerRevenue,
        peerGrowth,
        peerRating,
        opportunityScore: Math.round(
          Math.max(
            20,
            (Math.max(0, peerRevenue - Number(app.revenue || 0)) / Math.max(1, peerRevenue || 1)) * 40 +
            Math.max(0, peerGrowth - Number(app.growth || 0)) * 3 +
            Math.max(0, peerRating - Number(app.rating || 0)) * 16 +
            (issues.length * 8)
          )
        ),
        issues,
      };
    }).sort((a, b) => b.opportunityScore - a.opportunityScore || a.revenue - b.revenue).slice(0, 6);
  }, [filteredTrackedApps, filteredMarketApps]);

  const distributionData = React.useMemo(() => {
    if (!filteredMarketApps.length) return null;
    const revenues = filteredMarketApps.map((app) => Number(app.revenue || 0)).filter((val) => val > 0).sort((a, b) => a - b);
    if (!revenues.length) return null;
    const p10 = revenues[Math.floor(revenues.length * 0.1)] || 0;
    const p25 = revenues[Math.floor(revenues.length * 0.25)] || 0;
    const p50 = revenues[Math.floor(revenues.length * 0.5)] || 0;
    const p75 = revenues[Math.floor(revenues.length * 0.75)] || 0;
    const p90 = revenues[Math.floor(revenues.length * 0.9)] || 0;
    return { p10, p25, p50, p75, p90, min: revenues[0], max: revenues[revenues.length - 1] };
  }, [filteredMarketApps]);

  const trackedDistribution = React.useMemo(() => {
    if (!distributionData || !filteredTrackedApps.length) return [];
    return filteredTrackedApps.map((app) => {
      const rev = Number(app.revenue || 0);
      let percentile = 'Below Market';
      if (rev >= distributionData.p90) percentile = 'Top 10%';
      else if (rev >= distributionData.p75) percentile = 'Top 25%';
      else if (rev >= distributionData.p50) percentile = 'Top 50%';
      else if (rev >= distributionData.p25) percentile = 'Top 75%';
      else if (rev >= distributionData.p10) percentile = 'Top 90%';
      return { ...app, percentile };
    });
  }, [distributionData, filteredTrackedApps]);

  const actionableInsights = React.useMemo(() => {
    const insights = [];

    // Detect apps with worsening gaps
    appOpportunities.forEach((app) => {
      if (app.issues.length >= 3) {
        insights.push({
          type: 'critical',
          appId: app.id,
          title: `${app.name} has ${app.issues.length} critical gaps`,
          action: 'Focus on improving rating, growth, or marketing coverage',
        });
      }
    });

    // Detect category opportunities
    categoryGaps.forEach((cat) => {
      if (cat.revenueGap < -5000 && cat.count >= 2) {
        insights.push({
          type: 'warning',
          categoryId: cat.categoryId,
          title: `${cat.label} underperforms by ${wrapMoney(Math.abs(cat.revenueGap))}`,
          action: 'Consider ASO improvements or market repositioning',
        });
      }
    });

    return insights.slice(0, 5);
  }, [appOpportunities, categoryGaps]);

  const headlineInsights = React.useMemo(() => {
    const topMarketCategory = marketCategoryRows[0];
    const strongestTrackedCategory = [...categoryGaps].sort((a, b) => b.revenueGap - a.revenueGap)[0];
    const weakestTrackedCategory = [...categoryGaps].sort((a, b) => a.revenueGap - b.revenueGap)[0];
    return [
      topMarketCategory ? {
        title: `${topMarketCategory.label} is the strongest category in ${wrapCountryName(country.toUpperCase())}`,
        body: `Top-chart apps in this category average ${wrapMoney(topMarketCategory.avgRevenue)} MRR with ${wrapCompact(topMarketCategory.avgDownloads)} downloads.`,
      } : null,
      strongestTrackedCategory ? {
        title: `${strongestTrackedCategory.label} is your strongest tracked lane`,
        body: `Your tracked apps are ${strongestTrackedCategory.revenueGap >= 0 ? 'ahead of' : 'behind'} market revenue by ${wrapMoney(Math.abs(strongestTrackedCategory.revenueGap))} on average.`,
      } : null,
      weakestTrackedCategory && weakestTrackedCategory.revenueGap < 0 ? {
        title: `${weakestTrackedCategory.label} needs attention`,
        body: `This tracked category underperforms market revenue by ${wrapMoney(Math.abs(weakestTrackedCategory.revenueGap))} and growth by ${Math.abs(weakestTrackedCategory.growthGap).toFixed(1)} pts.`,
      } : null,
    ].filter(Boolean);
  }, [marketCategoryRows, categoryGaps, country]);

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1240, margin: '0 auto' }}>
      <WrapSectionTitle icon={window.I.BarChart} title="Market Insights" body="Benchmark your tracked apps against live category leaders and spot the next action." />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 240px) minmax(0, 240px) auto', gap: 12, marginBottom: 22, alignItems: 'center' }}>
        <WrapFilterMenu label="Country" options={countryOptions} selected={country} onSelect={setCountry} placeholder="Select country" />
        <WrapFilterMenu label="Category" options={categoryOptions} selected={category} onSelect={setCategory} placeholder="Select category" />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className={`btn sm ${!showDistribution ? 'primary' : ''}`} onClick={() => setShowDistribution(false)}>Overview</button>
          <button className={`btn sm ${showDistribution ? 'primary' : ''}`} onClick={() => setShowDistribution(true)}>Distribution</button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            {Array.from({ length: 4 }).map((_, index) => <WrapLoadingCard key={`mi-stat-${index}`} lines={['42%', '68%']} style={{ minHeight: 108 }} />)}
          </div>
          <WrapLoadingCard lines={['26%', '100%', '94%', '88%']} />
          <WrapLoadingTable rows={5} columns={['1.6fr', '1fr', '1fr', '1fr']} />
        </div>
      ) : loadingError ? (
        <div className="card" style={{ padding: 18, color: '#ff8b7d' }}>Live chart data is unavailable right now. Check the local server.</div>
      ) : (
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Tracked Apps In Scope</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>{trackedBench.appCount}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 6 }}>{filteredTrackedApps.length ? `${wrapCompact(trackedBench.avgDownloads)} avg downloads` : 'Track apps to benchmark them here'}</div>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Market Benchmark</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{wrapMoney(marketBench.avgRevenue)}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 6 }}>Average MRR across live chart leaders</div>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Revenue Delta</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: trackedBench.avgRevenue >= marketBench.avgRevenue ? 'var(--accent)' : '#ff8b7d' }}>
                {trackedBench.avgRevenue >= marketBench.avgRevenue ? '+' : '-'}{wrapMoney(Math.abs(trackedBench.avgRevenue - marketBench.avgRevenue))}
              </div>
              <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 6 }}>Tracked avg MRR vs market avg</div>
            </div>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Growth Delta</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: trackedBench.avgGrowth >= marketBench.avgGrowth ? 'var(--accent)' : '#ff8b7d' }}>
                {trackedBench.avgGrowth >= marketBench.avgGrowth ? '+' : ''}{(trackedBench.avgGrowth - marketBench.avgGrowth).toFixed(1)} pts
              </div>
              <div style={{ color: 'var(--text-3)', fontSize: 12, marginTop: 6 }}>Tracked avg growth vs market avg</div>
            </div>
          </div>

          {actionableInsights.length > 0 && !showDistribution ? (
            <div className="card" style={{ padding: 18, background: 'linear-gradient(180deg, rgba(244,98,31,0.1), rgba(255,255,255,0.015))' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <window.I.AlertCircle style={{ width: 20, height: 20, color: 'var(--accent)' }} />
                Actionable Insights
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {actionableInsights.map((insight, idx) => (
                  <div key={idx} style={{ padding: 14, borderRadius: 12, background: 'rgba(0,0,0,0.2)', border: `1px solid ${insight.type === 'critical' ? '#ff8b7d' : 'var(--border-0)'}` }}>
                    <div style={{ fontWeight: 700, marginBottom: 4, color: insight.type === 'critical' ? '#ff8b7d' : 'var(--text-1)' }}>{insight.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)' }}>{insight.action}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {showDistribution && distributionData ? (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Revenue Distribution — Market Percentiles</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 12, marginBottom: 20 }}>
                <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Top 10%</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{wrapMoney(distributionData.p90)}</div>
                </div>
                <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Top 25%</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{wrapMoney(distributionData.p75)}</div>
                </div>
                <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Median</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{wrapMoney(distributionData.p50)}</div>
                </div>
                <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Top 75%</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{wrapMoney(distributionData.p25)}</div>
                </div>
                <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Top 90%</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{wrapMoney(distributionData.p10)}</div>
                </div>
              </div>
              {trackedDistribution.length > 0 ? (
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Your Apps vs Market Distribution</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {trackedDistribution.map((app) => (
                      <div key={app.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 160px 140px', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-0)' }}>
                        {wrapAppIcon(app)}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{wrapCategoryLabel(app.category)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>MRR</div>
                          <div style={{ fontWeight: 700 }}>{wrapMoney(app.revenue)}</div>
                        </div>
                        <div>
                          <span className={`chip ${app.percentile.includes('Top 10') || app.percentile.includes('Top 25') ? 'accent' : ''}`}>{app.percentile}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {headlineInsights.length && !showDistribution ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
              {headlineInsights.map((item) => (
                <div key={item.title} className="card" style={{ padding: 18, background: 'linear-gradient(180deg, rgba(244,98,31,0.08), rgba(255,255,255,0.01))' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6 }}>{item.body}</div>
                </div>
              ))}
            </div>
          ) : null}

          <div style={{ display: 'grid', gridTemplateColumns: filteredTrackedApps.length ? '1.1fr .9fr' : '1fr', gap: 20 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Category Benchmark</div>
              <div style={{ display: 'grid', gap: 10 }}>
                {marketCategoryRows.slice(0, 8).map((row) => {
                  const trackedRow = categoryGaps.find((item) => item.categoryId === row.categoryId);
                  return (
                    <div key={row.categoryId} style={{ display: 'grid', gridTemplateColumns: '1.2fr .9fr .9fr .7fr', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-0)' }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{row.label}</div>
                        <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{row.count} live leaders in scope</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Market avg MRR</div>
                        <div style={{ fontWeight: 700 }}>{wrapMoney(row.avgRevenue)}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Tracked avg MRR</div>
                        <div style={{ fontWeight: 700, color: trackedRow && trackedRow.revenueGap >= 0 ? 'var(--accent)' : 'var(--text-1)' }}>{trackedRow ? wrapMoney(trackedRow.avgRevenue) : '—'}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Gap</div>
                        <div style={{ fontWeight: 700, color: trackedRow ? (trackedRow.revenueGap >= 0 ? 'var(--accent)' : '#ff8b7d') : 'var(--text-3)' }}>
                          {trackedRow ? `${trackedRow.revenueGap >= 0 ? '+' : '-'}${wrapMoney(Math.abs(trackedRow.revenueGap))}` : '—'}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!marketCategoryRows.length ? <div style={{ color: 'var(--text-3)' }}>No live category benchmark available for this filter set.</div> : null}
              </div>
            </div>

            {filteredTrackedApps.length ? (
              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Highest-Leverage App Opportunities</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {appOpportunities.map((app) => (
                    <button key={app.id} onClick={() => setRoute({ screen: 'app-detail', appId: app.id, storeId: app.storeId, country: app.country })} style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-0)', textAlign: 'left', display: 'grid', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {wrapAppIcon(app)}
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.name}</div>
                          <div style={{ color: 'var(--text-3)', fontSize: 12 }}>{wrapCategoryLabel(app.category)} · Opportunity score {app.opportunityScore}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 8 }}>
                        <div><div style={{ fontSize: 11, color: 'var(--text-3)' }}>App MRR</div><div style={{ fontWeight: 700 }}>{wrapMoney(app.revenue)}</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-3)' }}>Peer MRR</div><div style={{ fontWeight: 700 }}>{wrapMoney(app.peerRevenue)}</div></div>
                        <div><div style={{ fontSize: 11, color: 'var(--text-3)' }}>Peer Growth</div><div style={{ fontWeight: 700 }}>{app.peerGrowth.toFixed(1)}%</div></div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {app.issues.slice(0, 3).map((issue) => <span key={issue} className="chip accent">{issue}</span>)}
                      </div>
                    </button>
                  ))}
                  {!appOpportunities.length ? <div style={{ color: 'var(--text-3)' }}>Track a few apps to unlock app-level opportunities here.</div> : null}
                </div>
              </div>
            ) : null}
          </div>

          {!filteredTrackedApps.length ? (
            <WrapEmptyState
              icon={window.I.Device}
              title="No tracked apps in this scope"
              body="Add apps to My Workspace to benchmark them against live market leaders and surface category-level opportunities."
              action={() => setRoute({ screen: 'app-tracking' })}
              actionLabel="Open App Tracking"
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

function WrapASOAnalyzerScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const [savedApps, setSavedApps] = React.useState(() => wrapReadAsoAnalyzerApps());
  const [modalOpen, setModalOpen] = React.useState(false);
  const asoApps = React.useMemo(() => wrapDedupeLiveApps([...trackedApps, ...savedApps]), [trackedApps, savedApps]);
  const [selectedId, setSelectedId] = React.useState(asoApps[0]?.id || '');
  const [appUrl, setAppUrl] = React.useState('');
  const [appId, setAppId] = React.useState('');
  const [analysisTarget, setAnalysisTarget] = React.useState(null);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(null);
  const [error, setError] = React.useState('');

  const selected = asoApps.find((app) => app.id === selectedId) || asoApps[0] || null;

  React.useEffect(() => {
    if (!selectedId && asoApps[0]?.id) setSelectedId(asoApps[0].id);
  }, [selectedId, asoApps]);

  const buildAsoAnalysis = React.useCallback((app) => {
    const title = String(app?.name || '').trim();
    const subtitle = String(app?.subtitle || '').trim();
    const description = String(app?.description || '').trim();
    const screenshots = Array.isArray(app?.screenshots) ? app.screenshots : [];
    const rating = Number(app?.rating || 0);
    const reviewCount = Number(app?.ratingCount || app?.reviews || 0);
    const version = String(app?.version || '').trim();
    const updatedDays = wrapParseReleasedDays(wrapRelativeTime(app?.updatedAt, '9999d ago')) || 9999;

    const titleTokens = wrapTokenizeKeywords(title);
    const subtitleTokens = wrapTokenizeKeywords(subtitle);
    const descriptionTokens = new Set(wrapTokenizeKeywords(description));
    const combinedListingTokens = new Set([...titleTokens, ...subtitleTokens]);
    const keywordCoverage = [...combinedListingTokens].filter((token) => descriptionTokens.has(token)).length;
    const titleLength = title.length;
    const subtitleLength = subtitle.length;
    const descLength = description.length;

    const titleScore = Math.max(25, 100 - Math.min(55, Math.abs(24 - titleLength) * 3.4) - Math.max(0, titleTokens.length - 5) * 6);
    const subtitleScore = subtitleLength
      ? Math.max(35, 100 - Math.min(45, Math.abs(26 - subtitleLength) * 2.6) - Math.max(0, subtitleTokens.length - 6) * 5)
      : 22;
    const keywordScore = Math.max(20, Math.min(100, (combinedListingTokens.size ? (keywordCoverage / combinedListingTokens.size) * 100 : 28)));
    const descriptionScore = Math.max(22, Math.min(100, 40 + (Math.min(descLength, 3200) / 3200) * 60));
    const screenshotScore = screenshots.length >= 6 ? 100 : screenshots.length > 0 ? Math.max(18, Math.round((screenshots.length / 6) * 100)) : 0;
    const ratingScore = rating > 0 ? Math.max(0, Math.min(100, Math.round((rating / 5) * 100))) : 18;
    const reviewScore = Math.max(18, Math.min(100, Math.round(Math.log10(reviewCount + 1) * 28)));
    const freshnessScore = updatedDays <= 30 ? 100 : updatedDays <= 90 ? 82 : updatedDays <= 180 ? 64 : updatedDays <= 365 ? 42 : 24;

    const weightedScore = Math.round(
      (titleScore * 0.16) +
      (subtitleScore * 0.14) +
      (keywordScore * 0.16) +
      (descriptionScore * 0.12) +
      (screenshotScore * 0.14) +
      (ratingScore * 0.14) +
      (reviewScore * 0.08) +
      (freshnessScore * 0.06)
    );

    const recommendations = [
      !subtitle ? 'Add a stronger subtitle. You are leaving high-intent keyword and value-prop space unused.' : null,
      titleLength < 18 ? 'Title is too short. Add one clearer intent or category signal.' : null,
      titleLength > 30 ? 'Title is too long. Compress it to keep the main promise readable.' : null,
      subtitle && subtitleLength > 30 ? 'Subtitle is too long. Tighten it around the clearest benefit + keyword.' : null,
      combinedListingTokens.size > 0 && keywordCoverage / combinedListingTokens.size < 0.45 ? 'Keyword coverage is weak. Reuse more title/subtitle terms naturally in the description.' : null,
      descLength < 1400 ? 'Description depth is thin. Add more benefit framing, proof points, and feature-specific language.' : null,
      screenshots.length < 5 ? 'Screenshot coverage is light. Ship at least 5-6 strong screenshots with clearer sequencing.' : null,
      rating > 0 && rating < 4.3 ? 'Rating quality is under pressure. Fix review pain points before scaling ASO acquisition.' : null,
      reviewCount < 150 ? 'Review volume is still light. Social proof is limiting listing conversion confidence.' : null,
      updatedDays > 120 ? 'Listing freshness is weak. Ship an update and refresh metadata to signal active development.' : null,
      !version ? 'Version metadata is missing or unclear. Expose a cleaner release cadence in the listing.' : null,
    ].filter(Boolean);

    return {
      app,
      metrics: {
        titleLength,
        subtitleLength,
        titleWords: titleTokens.length,
        subtitleWords: subtitleTokens.length,
        descLength,
        screenshotCount: screenshots.length,
        rating,
        reviewCount,
        updatedDays,
        keywordCoverage,
        version,
      },
      scores: {
        title: Math.round(titleScore),
        subtitle: Math.round(subtitleScore),
        keywordCoverage: Math.round(keywordScore),
        description: Math.round(descriptionScore),
        screenshots: Math.round(screenshotScore),
        ratings: Math.round(ratingScore),
        reviews: Math.round(reviewScore),
        freshness: Math.round(freshnessScore),
      },
      overallScore: weightedScore,
      recommendations,
    };
  }, []);

  const analyzeResolvedApp = React.useCallback(async ({ id, country = 'us', sourceLabel = '' }) => {
    setError('');
    setAnalyzing(true);
    try {
      const response = await fetch(`/api/apple/app?id=${encodeURIComponent(id)}&country=${encodeURIComponent(country)}`);
      const data = await response.json();
      if (!response.ok || !data.app) {
        throw new Error(data?.error || 'App not found');
      }

      const app = data.app;
      const savedApp = wrapLiveAppWithMetrics({ ...app, country: String(country || 'us').toUpperCase() });
      setSavedApps((current) => {
        const next = wrapDedupeLiveApps([savedApp, ...current]).slice(0, 100);
        wrapWriteAsoAnalyzerApps(next);
        return next;
      });
      setSelectedId(savedApp.id);
      setAppId(String(id));
      setAnalysisTarget({
        id: String(id),
        country: String(country).toUpperCase(),
        sourceLabel,
      });
      setAnalysis(buildAsoAnalysis(app));
    } catch (analysisError) {
      setError(analysisError?.message || 'Failed to analyze app.');
      setAnalysis(null);
      setAnalysisTarget(null);
    } finally {
      setAnalyzing(false);
    }
  }, [buildAsoAnalysis]);

  const analyzeApp = React.useCallback(async () => {
    const rawInput = String(appUrl || '').trim();
    const match = rawInput.match(/id(\d{5,})/i) || rawInput.match(/^\d{5,}$/);
    if (!match) {
      setError('Enter a valid App Store URL or numeric app ID.');
      setAnalysis(null);
      return;
    }
    const extractedId = match[1] || match[0];
    const countryMatch = rawInput.match(/apps\.apple\.com\/([a-z]{2})\//i);
    const country = (countryMatch?.[1] || 'us').toLowerCase();
    await analyzeResolvedApp({ id: extractedId, country, sourceLabel: 'Manual input' });
  }, [appUrl, analyzeResolvedApp]);

  React.useEffect(() => {
    if (!selected) {
      setAnalysis(null);
      setAnalysisTarget(null);
      return;
    }
    if (!selected.storeId) {
      setAppId('');
      setAnalysisTarget({
        id: selected.id || '',
        country: String(selected.country || 'US').toUpperCase(),
        sourceLabel: selected.name,
      });
      setAnalysis(buildAsoAnalysis(selected));
      return;
    }
    analyzeResolvedApp({
      id: selected.storeId,
      country: String(selected.country || 'US').toLowerCase(),
      sourceLabel: selected.name,
    });
  }, [selected?.id, selected?.storeId, selected?.country, selected?.name, buildAsoAnalysis, analyzeResolvedApp]);

  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle icon={window.I.Target} title="ASO Analyzer" body="Analyze and optimize your App Store presence." />
        <div style={{ display: 'grid', gap: 14 }}>
          <WrapAppsSidebarCard
            items={asoApps}
            selectedId={selected?.id}
            onSelect={(app) => { setSelectedId(app.id); setAppUrl(''); setError(''); }}
            onAdd={() => setModalOpen(true)}
            onRemove={(app) => {
              wrapRemoveTrackedApp(app);
              setSavedApps((current) => {
                const next = current.filter((item) => item.id !== app.id && item.storeId !== app.storeId && item.name !== app.name);
                wrapWriteAsoAnalyzerApps(next);
                return next;
              });
              if (selected?.id === app.id) setSelectedId(asoApps.find((item) => item.id !== app.id)?.id || '');
            }}
            emptyTitle="No tracked apps yet"
            emptyBody="Add apps first to analyze them here with the same left/right flow as Keyword Explorer."
            renderMeta={(app) => `${wrapCategoryShort(app.category)} · ${app.countryFlag || wrapCountryFlag(app.country)}`}
          />
          <div className="card signal-two-pane-list" style={{ padding: 14, display: 'grid', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Manual analyze</div>
            <input
              className="input"
              type="text"
              placeholder="App Store URL or App ID"
              value={appUrl}
              onChange={(e) => {
                setAppUrl(e.target.value);
                if (error) setError('');
              }}
            />
            <button className="btn primary sm" onClick={analyzeApp} disabled={analyzing || !appUrl.trim()}>
              {analyzing && appUrl.trim() ? 'Analyzing…' : 'Analyze App'}
            </button>
          </div>
        </div>
      </div>

      <div className="signal-two-pane-main signal-two-pane-main--airy">
        {error ? <div className="card" style={{ padding: 16, color: '#f87171' }}>{error}</div> : null}
        {!analysis ? (
          <WrapEmptyState icon={window.I.Target} title="Select an app" body="Choose an app from the left or paste an App Store URL to run the ASO analyzer." />
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
              <WrapRecommendationPanel workspace={workspace} app={selected || analysis.app} title="ASO recommendations from your app context" />
              <div className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {wrapAppIcon(analysis.app, 64)}
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{analysis.app.name}</div>
                      <div style={{ color: 'var(--text-3)' }}>{analysis.app.developer || analysis.app.seller || 'App Store app'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {analysisTarget?.country ? <span className="chip">{wrapCountryFlag(analysisTarget.country)} {wrapCountryName(analysisTarget.country)}</span> : null}
                    {analysisTarget?.sourceLabel ? <span className="chip">{analysisTarget.sourceLabel}</span> : null}
                    {appId ? <span className="chip">App ID {appId}</span> : null}
                    {analysis.app.storeUrl ? <a className="btn sm" href={analysis.app.storeUrl} target="_blank" rel="noreferrer">Open Store</a> : null}
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Overall ASO Score</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>
                      {analysis.overallScore}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, marginBottom: 8 }}>Your app's ASO score is based on multiple factors</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Score range: 0-100 (higher is better)</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Score Breakdown</div>
                <div style={{ display: 'grid', gap: 12 }}>
                  {Object.entries(analysis.scores).map(([key, score]) => (
                    <div key={key} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: 12, alignItems: 'center' }}>
                      <div style={{ fontSize: 13, textTransform: 'capitalize' }}>{key === 'keywordCoverage' ? 'keywords' : key}</div>
                      <div style={{ background: 'var(--bg-2)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                        <div style={{ width: `${score}%`, height: '100%', background: score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#f87171', transition: 'width 300ms' }} />
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, textAlign: 'right' }}>{Math.round(score)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {analysis.recommendations.length > 0 ? (
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recommendations</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>App Details</div>
                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Title Length</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.titleLength} characters</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Description Length</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.descLength} characters</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Subtitle Length</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.subtitleLength} characters</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Rating</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.rating ? analysis.metrics.rating.toFixed(1) : 'N/A'} ⭐</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Reviews</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.reviewCount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Screenshots</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.screenshotCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Keyword Coverage</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.keywordCoverage} matched tokens</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Last Update</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{analysis.metrics.updatedDays < 9999 ? `${analysis.metrics.updatedDays}d ago` : 'Unknown'}</div>
                  </div>
                </div>
              </div>
      </div>
        )}
      </div>
    </div>
  );
}

function WrapRankHistoryScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const [selectedId, setSelectedId] = React.useState(trackedApps[0]?.id || '');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [country, setCountry] = React.useState('us');
  const [chart, setChart] = React.useState('top-free');
  const [categoryFilter, setCategoryFilter] = React.useState('all');

  const selected = trackedApps.find(app => app.id === selectedId) || trackedApps[0] || null;

  React.useEffect(() => { if (!selectedId && trackedApps[0]?.id) setSelectedId(trackedApps[0].id); }, [selectedId, trackedApps]);

  // Get unique categories from tracked apps
  const categories = React.useMemo(() => {
    const cats = [...new Set(trackedApps.map(app => app.category))];
    return cats.sort();
  }, [trackedApps]);

  // Filter tracked apps by category
  const filteredApps = React.useMemo(() => {
    if (categoryFilter === 'all') return trackedApps;
    return trackedApps.filter(app => app.category === categoryFilter);
  }, [trackedApps, categoryFilter]);

  const { items, loading } = useChartData(chart, country, 200);

  // Find selected app in rankings and simulate historical data
  const selectedRank = items.findIndex(app => app.id === selected?.id);
  const selectedInChart = selectedRank !== -1 ? items[selectedRank] : null;

  // Simulate 7-day ranking history
  const historyData = React.useMemo(() => {
    if (!selectedInChart) return [];
    const baseRank = selectedRank + 1;
    return Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      rank: Math.max(1, baseRank + Math.floor(Math.random() * 20 - 10)),
    }));
  }, [selectedInChart, selectedRank]);

  // Category rankings
  const categoryApps = React.useMemo(() => {
    if (!selected) return [];
    return items.filter(app => app.category === selected.category).slice(0, 20).map((app, idx) => ({
      ...app,
      categoryRank: idx + 1,
      overallRank: items.findIndex(a => a.id === app.id) + 1,
    }));
  }, [items, selected]);

  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* LEFT SIDEBAR - Apps List */}
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle icon={window.I.LineChart} title="Rank History" body="Track ranking changes over time." />
        <WrapAppsSidebarCard
          items={filteredApps}
          count={trackedApps.length}
          selectedId={selected?.id}
          onSelect={(app) => setSelectedId(app.id)}
          onAdd={() => setModalOpen(true)}
          onRemove={(app) => wrapRemoveTrackedApp(app, () => {
            if (selected?.id === app.id) setSelectedId(filteredApps.find((item) => item.id !== app.id)?.id || '');
          })}
          emptyTitle={categoryFilter === 'all' ? 'No apps tracked yet' : 'No apps in this category'}
          emptyBody={categoryFilter === 'all' ? 'Add your apps to track their rankings.' : 'Change the category filter or add more apps to this category.'}
          renderMeta={(app) => wrapCategoryShort(app.category)}
        />

        <div className="card signal-two-pane-list">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div style={{ padding: 12, borderBottom: '1px solid var(--border-1)' }}>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                <option value="all">All Categories ({trackedApps.length})</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {wrapCategoryShort(cat)} ({trackedApps.filter(a => a.category === cat).length})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT CONTENT - Rank Details */}
      <div className="signal-two-pane-main">
        {!selected ? (
          <WrapEmptyState
            icon={window.I.LineChart}
            title="Select an app"
            body="Choose an app from the list to view its ranking history."
          />
        ) : (
          <>
            {/* App Header Card */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                {selected.icon ? (
                  <img src={selected.icon} alt="" style={{ width: 64, height: 64, borderRadius: 14, flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${selected.tint || '#667085'}, ${selected.tint2 || '#344054'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: 800
                  }}>
                    {selected.name?.charAt(0) || 'A'}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{selected.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="chip accent">{wrapCategoryShort(selected.category)}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 4 }}>Current Rank</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                    {selectedInChart ? `#${selectedRank + 1}` : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 14, display: 'flex', gap: 8 }}>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="select"
                  style={{ flex: 1 }}
                >
                  <option value="us">🇺🇸 US</option>
                  <option value="gb">🇬🇧 UK</option>
                  <option value="fr">🇫🇷 FR</option>
                  <option value="de">🇩🇪 DE</option>
                  <option value="es">🇪🇸 ES</option>
                  <option value="it">🇮🇹 IT</option>
                  <option value="ca">🇨🇦 CA</option>
                  <option value="au">🇦🇺 AU</option>
                  <option value="jp">🇯🇵 JP</option>
                  <option value="br">🇧🇷 BR</option>
                </select>
                <select
                  value={chart}
                  onChange={(e) => setChart(e.target.value)}
                  className="select"
                  style={{ flex: 1 }}
                >
                  <option value="top-free">📱 Top Free</option>
                  <option value="top-paid">💰 Top Paid</option>
                  <option value="top-grossing">💵 Top Grossing</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="card" style={{ padding: 60, textAlign: 'center', color: 'var(--text-3)' }}>
                Loading rankings...
              </div>
            ) : !selectedInChart ? (
              <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Not Ranked</div>
                <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                  This app is not in the Top 200 for {chart} in {country.toUpperCase()}
                </div>
              </div>
            ) : (
              <>
                {/* 7-Day History Chart */}
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>7-Day Ranking Trend</div>
                  <div style={{ display: 'flex', alignItems: 'end', gap: 8, height: 160 }}>
                    {historyData.map((point, idx) => (
                      <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <div style={{
                          width: '100%',
                          height: `${Math.max(20, 150 - point.rank)}px`,
                          background: `linear-gradient(180deg, ${selected.tint || '#667085'}, ${selected.tint2 || '#344054'})`,
                          borderRadius: '6px 6px 0 0',
                          display: 'flex',
                          alignItems: 'end',
                          justifyContent: 'center',
                          paddingBottom: 6,
                          color: '#fff',
                          fontSize: 11,
                          fontWeight: 700
                        }}>
                          #{point.rank}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{point.day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  <div className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Overall Rank</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                      #{selectedRank + 1}
                    </div>
                  </div>
                  <div className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Category Rank</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                      #{categoryApps.findIndex(a => a.id === selected.id) + 1 || 'N/A'}
                    </div>
                  </div>
                  <div className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Rating</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                      {selectedInChart.rating?.toFixed(1) || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Category Rankings */}
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
                    Top 20 in {wrapCategoryShort(selected.category)}
                  </div>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {categoryApps.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setRoute({ screen: 'app-detail', appId: app.id })}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '32px 48px 1fr auto',
                          gap: 12,
                          alignItems: 'center',
                          padding: '10px 12px',
                          borderRadius: 8,
                          background: app.id === selected.id ? `linear-gradient(135deg, ${selected.tint}15, ${selected.tint2}05)` : 'var(--bg-2)',
                          border: app.id === selected.id ? `2px solid ${selected.tint}35` : '2px solid transparent',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-3)' }}>#{app.categoryRank}</div>
                        <img src={app.icon} alt="" style={{ width: 48, height: 48, borderRadius: 10 }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{app.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Overall: #{app.overallRank}</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-4)' }}>
                          {app.rating ? `${app.rating.toFixed(1)} ⭐` : 'No rating'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function WrapCompetitorsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const [selectedId, setSelectedId] = React.useState(trackedApps[0]?.id || '');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [country, setCountry] = React.useState('us');

  const selected = trackedApps.find(app => app.id === selectedId) || trackedApps[0] || null;
  const category = selected?.category || 'productivity';

  React.useEffect(() => { if (!selectedId && trackedApps[0]?.id) setSelectedId(trackedApps[0].id); }, [selectedId, trackedApps]);

  const { items: topFree } = useChartData('top-free', country, 200);
  const { items: topGrossing } = useChartData('top-grossing', country, 200);

  // Helper function to calculate competitors for any app
  const getCompetitorsForApp = React.useCallback((app) => {
    if (!app) return [];

    const appDesc = (app.description || '').toLowerCase();
    const appKeywords = appDesc.split(/\s+/).filter(w => w.length > 3);

    const filtered = [...topFree, ...topGrossing].filter(comp => {
      if (comp.name === app.name || comp.id === app.id) return false;

      // Must be same category
      if (comp.category !== app.category) return false;

      // Keyword matching for better relevance
      const compDesc = (comp.description || '').toLowerCase();
      const matchingKeywords = appKeywords.filter(kw => compDesc.includes(kw));

      // If we have description, require at least 2 keyword matches OR high rating
      if (appKeywords.length > 5) {
        return matchingKeywords.length >= 2 || (comp.rating && comp.rating >= 4.5);
      }

      return true; // Fallback to category matching if no description
    });

    // Deduplicate and add competitive metrics
    const unique = Array.from(new Map(filtered.map(c => [c.id, c])).values());
    return unique.slice(0, 24).map((c, idx) => ({
      ...c,
      competitiveScore: Math.floor(Math.random() * 40 + 60),
      threatLevel: idx < 6 ? 'high' : idx < 14 ? 'medium' : 'low',
    }));
  }, [topFree, topGrossing]);

  const competitors = React.useMemo(() => {
    return getCompetitorsForApp(selected);
  }, [selected, getCompetitorsForApp]);

  return (
    <div className="signal-two-pane-page">
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* LEFT SIDEBAR - Apps List */}
      <div className="signal-two-pane-sidebar">
        <WrapSectionTitle icon={window.I.Users} title="Competitors" body="Monitor and analyze your competition." />

        <WrapAppsSidebarCard
          items={trackedApps}
          selectedId={selected?.id}
          onSelect={(app) => setSelectedId(app.id)}
          onAdd={() => setModalOpen(true)}
          onRemove={(app) => wrapRemoveTrackedApp(app, () => {
            if (selected?.id === app.id) setSelectedId(trackedApps.find((item) => item.id !== app.id)?.id || '');
          })}
          emptyTitle="No apps tracked yet"
          emptyBody="Add your apps to see competitor analysis."
          renderMeta={(app) => `${wrapCategoryShort(app.category)} · ${getCompetitorsForApp(app).length} competitors`}
        />
      </div>

      {/* RIGHT CONTENT - Competitor Analysis */}
      <div className="signal-two-pane-main">
        {!selected ? (
          <WrapEmptyState
            icon={window.I.Target}
            title="Select an app"
            body="Choose an app from the list to view its competitor landscape."
          />
        ) : (
          <>
            <WrapRecommendationPanel workspace={workspace} app={selected} title="Competitor and messaging recommendations" />
            {/* App Header Card */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Real app icon */}
                {selected.icon ? (
                  <img src={selected.icon} alt="" style={{ width: 64, height: 64, borderRadius: 14, flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${selected.tint || '#667085'}, ${selected.tint2 || '#344054'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: 800
                  }}>
                    {selected.name?.charAt(0) || 'A'}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{selected.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="chip accent">{wrapCategoryShort(category)}</span>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="select"
                      style={{ width: 116, height: 28, fontSize: 11 }}
                    >
                      <option value="us">🇺🇸 US</option>
                      <option value="gb">🇬🇧 UK</option>
                      <option value="fr">🇫🇷 FR</option>
                      <option value="de">🇩🇪 DE</option>
                      <option value="es">🇪🇸 ES</option>
                      <option value="it">🇮🇹 IT</option>
                      <option value="ca">🇨🇦 CA</option>
                      <option value="au">🇦🇺 AU</option>
                      <option value="jp">🇯🇵 JP</option>
                      <option value="br">🇧🇷 BR</option>
                    </select>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 4 }}>Found</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                    {competitors.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Level Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>High Threat</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                  {competitors.filter(c => c.threatLevel === 'high').length}
                </div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Medium</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                  {competitors.filter(c => c.threatLevel === 'medium').length}
                </div>
              </div>
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Low</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: selected.tint || 'var(--accent)' }}>
                  {competitors.filter(c => c.threatLevel === 'low').length}
                </div>
              </div>
            </div>

            {/* Competitors Grid */}
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Competitive Landscape</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                {competitors.map((app) => {
                  return (
                    <button
                      key={app.id}
                      onClick={() => setRoute({ screen: 'app-detail', appId: app.id })}
                      className="card"
                      style={{
                        padding: 14,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 10,
                        background: 'var(--bg-2)',
                        aspectRatio: '1',
                        position: 'relative'
                      }}
                    >
                      <img src={app.icon} alt="" style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0 }} />
                      <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                        {app.name}
                      </div>
                      {app.rating && (
                        <div style={{ fontSize: 11, color: 'var(--text-4)' }}>
                          {app.rating.toFixed(1)} ⭐
                        </div>
                      )}
                      <span className={app.threatLevel === 'high' ? 'chip accent' : 'chip'} style={{ fontSize: 10 }}>
                        {app.threatLevel === 'high' ? 'High threat' : app.threatLevel === 'medium' ? 'Medium threat' : 'Low threat'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WrapRevenueInsightsScreen({ setRoute }) {
  const workspace = useWrapWorkspace();
  const trackedApps = wrapTrackedFromWorkspace(workspace);
  const allApps = window.DATA.APPS || [];
  const [country, setCountry] = React.useState('us');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [pricingModel, setPricingModel] = React.useState('subscription');
  const [platformMix, setPlatformMix] = React.useState('ios-heavy');
  const [monthlyInstalls, setMonthlyInstalls] = React.useState('25000');
  const [listingConversion, setListingConversion] = React.useState('28');
  const [trialStartRate, setTrialStartRate] = React.useState('42');
  const [trialToPaidRate, setTrialToPaidRate] = React.useState('38');
  const [monthlyPrice, setMonthlyPrice] = React.useState('14.99');
  const [yearlyPrice, setYearlyPrice] = React.useState('69.99');
  const [yearlyMix, setYearlyMix] = React.useState('34');
  const [monthlyChurn, setMonthlyChurn] = React.useState('7');
  const [iapAttachRate, setIapAttachRate] = React.useState('6');
  const [iapArppu, setIapArppu] = React.useState('18');
  const visibleApps = React.useMemo(() => [...trackedApps, ...allApps.filter((app) => !trackedApps.some((tracked) => tracked.id === app.id || tracked.name === app.name))], [trackedApps, allApps]);
  const { items: topGrossing } = useChartData('top-grossing', country, 120);

  const revenueBenchmarks = React.useMemo(() => ({
    'health-fitness': { d14Rpi: 0.48, payRate: 0.075, monthlyPrice: 18.99, yearlyPrice: 89.99, yearlyMix: 38, trialStart: 46, trialToPaid: 40, listingCvr: 31, monthlyChurn: 6, iapAttach: 4, iapArppu: 14, note: 'Best subscription headroom and strong yearly plan behavior.' },
    business: { d14Rpi: 0.31, payRate: 0.055, monthlyPrice: 24.99, yearlyPrice: 149.99, yearlyMix: 42, trialStart: 34, trialToPaid: 36, listingCvr: 24, monthlyChurn: 4.5, iapAttach: 2, iapArppu: 29, note: 'Higher ARPPU, lower trial volume, better retained revenue.' },
    education: { d14Rpi: 0.30, payRate: 0.048, monthlyPrice: 16.99, yearlyPrice: 79.99, yearlyMix: 37, trialStart: 32, trialToPaid: 34, listingCvr: 26, monthlyChurn: 5.5, iapAttach: 3, iapArppu: 16, note: 'Good early conversion when the promise is narrow and outcome-led.' },
    productivity: { d14Rpi: 0.23, payRate: 0.036, monthlyPrice: 12.99, yearlyPrice: 59.99, yearlyMix: 32, trialStart: 28, trialToPaid: 30, listingCvr: 23, monthlyChurn: 7, iapAttach: 3, iapArppu: 12, note: 'Mid-tier monetization. Needs sharper packaging and strong retention loops.' },
    finance: { d14Rpi: 0.28, payRate: 0.043, monthlyPrice: 15.99, yearlyPrice: 84.99, yearlyMix: 35, trialStart: 29, trialToPaid: 33, listingCvr: 21, monthlyChurn: 6, iapAttach: 2, iapArppu: 18, note: 'Users pay when value is concrete and recurring.' },
    'photo-video': { d14Rpi: 0.19, payRate: 0.03, monthlyPrice: 11.99, yearlyPrice: 49.99, yearlyMix: 30, trialStart: 24, trialToPaid: 28, listingCvr: 25, monthlyChurn: 8.5, iapAttach: 7, iapArppu: 19, note: 'Often a hybrid model: subscription core plus export/credit upsells.' },
    games: { d14Rpi: 0.08, payRate: 0.014, monthlyPrice: 7.99, yearlyPrice: 29.99, yearlyMix: 18, trialStart: 12, trialToPaid: 18, listingCvr: 34, monthlyChurn: 14, iapAttach: 12, iapArppu: 22, note: 'Subscription is weaker; hybrid IAP matters more than plan price.' },
    default: { d14Rpi: 0.23, payRate: 0.035, monthlyPrice: 12.99, yearlyPrice: 59.99, yearlyMix: 30, trialStart: 26, trialToPaid: 29, listingCvr: 24, monthlyChurn: 7, iapAttach: 4, iapArppu: 15, note: 'Cross-category median subscription behavior.' },
  }), []);

  const selected = visibleApps.find((app) => app.id === selectedId) || visibleApps[0] || null;
  const selectedCategory = selected?.category || 'default';
  const benchmark = revenueBenchmarks[selectedCategory] || revenueBenchmarks.default;
  const categoryPeers = React.useMemo(() => topGrossing.filter((app) => app.category === selectedCategory), [topGrossing, selectedCategory]);
  const peerAverages = React.useMemo(() => {
    const avg = (items, getter) => items.length ? items.reduce((sum, item) => sum + Number(getter(item) || 0), 0) / items.length : 0;
    return {
      count: categoryPeers.length,
      avgRating: avg(categoryPeers, (app) => app.rating),
      avgReviews: Math.round(avg(categoryPeers, (app) => app.reviews)),
      avgPrice: avg(categoryPeers, (app) => app.price),
      freeShare: categoryPeers.length ? Math.round((categoryPeers.filter((app) => Number(app.price || 0) <= 0).length / categoryPeers.length) * 100) : 0,
    };
  }, [categoryPeers]);

  React.useEffect(() => {
    if (!selectedId && visibleApps[0]?.id) setSelectedId(visibleApps[0].id);
  }, [selectedId, visibleApps]);

  React.useEffect(() => {
    setPricingModel(selectedCategory === 'games' || selectedCategory === 'photo-video' ? 'hybrid' : 'subscription');
    setMonthlyInstalls(String(Math.max(6000, Math.round(Number(selected?.downloads || 25000) * 0.35))));
    setListingConversion(String(benchmark.listingCvr));
    setTrialStartRate(String(benchmark.trialStart));
    setTrialToPaidRate(String(benchmark.trialToPaid));
    setMonthlyPrice(String(benchmark.monthlyPrice.toFixed(2)));
    setYearlyPrice(String(benchmark.yearlyPrice.toFixed(2)));
    setYearlyMix(String(benchmark.yearlyMix));
    setMonthlyChurn(String(benchmark.monthlyChurn));
    setIapAttachRate(String(benchmark.iapAttach));
    setIapArppu(String(benchmark.iapArppu));
  }, [selected?.id, selectedCategory]);

  const num = (value, fallback = 0) => {
    const parsed = Number(String(value).replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const iosWeight = platformMix === 'ios-heavy' ? 0.78 : platformMix === 'balanced' ? 0.58 : 0.38;
  const installs = Math.max(0, num(monthlyInstalls));
  const visitors = installs / Math.max(0.01, num(listingConversion, 1) / 100);
  const convertedInstalls = installs * (num(listingConversion) / 100);
  const trialStarts = pricingModel === 'paid' ? 0 : convertedInstalls * (num(trialStartRate) / 100);
  const paidSubscribers = pricingModel === 'paid'
    ? convertedInstalls
    : pricingModel === 'iap'
      ? 0
      : trialStarts * (num(trialToPaidRate) / 100);
  const yearlySubscribers = paidSubscribers * (num(yearlyMix) / 100);
  const monthlySubscribers = paidSubscribers - yearlySubscribers;
  const subscriptionRevenue = pricingModel === 'subscription' || pricingModel === 'hybrid'
    ? (monthlySubscribers * num(monthlyPrice)) + ((yearlySubscribers * num(yearlyPrice)) / 12)
    : pricingModel === 'paid'
      ? convertedInstalls * num(monthlyPrice)
      : 0;
  const iapRevenue = pricingModel === 'iap' || pricingModel === 'hybrid'
    ? convertedInstalls * (num(iapAttachRate) / 100) * num(iapArppu)
    : 0;
  const netNewMrr = subscriptionRevenue + iapRevenue;
  const retainedBase = pricingModel === 'subscription' || pricingModel === 'hybrid'
    ? netNewMrr * ((100 - num(monthlyChurn)) / 100)
    : 0;
  const runRate90 = netNewMrr + retainedBase + (retainedBase * ((100 - num(monthlyChurn)) / 100));
  const d14RpiEstimate = installs > 0 ? ((subscriptionRevenue * 0.46) + (iapRevenue * 0.68)) / installs : 0;
  const benchmarkAdjustedRpi = (benchmark.d14Rpi * iosWeight) + ((benchmark.d14Rpi / 2.6) * (1 - iosWeight));
  const confidence = Math.max(42, Math.min(91,
    54
    + (selected?.storeId ? 8 : 0)
    + (peerAverages.count >= 12 ? 8 : 0)
    + (Math.abs(d14RpiEstimate - benchmarkAdjustedRpi) <= benchmarkAdjustedRpi * 0.35 ? 9 : 0)
    + (pricingModel === 'hybrid' ? 4 : 0)
  ));

  const recommendations = [
    d14RpiEstimate < benchmarkAdjustedRpi * 0.7 ? `Your modeled D14 RPI is below the ${wrapCategoryShort(selectedCategory)} benchmark. Improve first-session value or raise monetization intent before buying more installs.` : null,
    pricingModel === 'subscription' && num(yearlyMix) < benchmark.yearlyMix - 8 ? 'Yearly plan mix is light. Push the annual anchor harder if retention supports it.' : null,
    pricingModel !== 'paid' && num(trialStartRate) < benchmark.trialStart - 8 ? 'Trial start rate is weak versus the category baseline. The paywall is likely appearing too early or without enough value proof.' : null,
    pricingModel !== 'paid' && num(trialToPaidRate) < benchmark.trialToPaid - 8 ? 'Trial-to-paid conversion trails the category. Tighten onboarding and reduce the gap between promise and first outcome.' : null,
    pricingModel === 'hybrid' && num(iapAttachRate) < benchmark.iapAttach ? 'Hybrid monetization is under-using IAP. Add clearer credits, boosts, or unlock moments tied to intent spikes.' : null,
    num(monthlyChurn) > benchmark.monthlyChurn + 2 ? 'Churn is modeled above the category norm. Revenue scale will cap quickly unless retention improves.' : null,
  ].filter(Boolean);

  return (
    <div style={{ width: 'min(1360px, 100%)', margin: '0 auto', padding: '28px 24px 56px' }}>
      <WrapAddAppModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <WrapSectionTitle icon={window.I.BarChart} title="Revenue Insights" body="Model revenue potential from category economics, plan mix, conversion, and retention." />

      <div className="signal-two-pane-page signal-two-pane-page--stack" style={{ width: '100%', margin: 0, padding: 0 }}>
        <div style={{ display: 'grid', gap: 14 }}>
          <WrapAppsSidebarCard
            items={visibleApps}
            count={visibleApps.length}
            selectedId={selected?.id}
            onSelect={(app) => setSelectedId(app.id)}
            onAdd={() => setModalOpen(true)}
            onRemove={(app) => wrapRemoveTrackedApp(app, () => {
              if (selected?.id === app.id) setSelectedId(visibleApps.find((item) => item.id !== app.id)?.id || '');
            })}
            emptyTitle="No apps to model yet"
            emptyBody="Add an app first so Signal can prefill category and monetization assumptions."
            renderMeta={(app) => `${wrapCategoryShort(app.category)} · ${app.countryFlag || wrapCountryFlag(app.country)}`}
          />

          <div className="card signal-two-pane-list" style={{ padding: 14, display: 'grid', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Market frame</div>
            <WrapFilterMenu
              label="Storefront"
              options={WRAP_COUNTRIES.map((item) => ({ value: item.code.toLowerCase(), label: `${item.flag} ${item.name}` }))}
              selected={country}
              onSelect={setCountry}
              placeholder="Select storefront"
            />
            <div className="seg" style={{ width: '100%' }}>
              <button className={platformMix === 'ios-heavy' ? 'on' : ''} onClick={() => setPlatformMix('ios-heavy')} style={{ flex: 1 }}>iOS heavy</button>
              <button className={platformMix === 'balanced' ? 'on' : ''} onClick={() => setPlatformMix('balanced')} style={{ flex: 1 }}>Balanced</button>
              <button className={platformMix === 'play-heavy' ? 'on' : ''} onClick={() => setPlatformMix('play-heavy')} style={{ flex: 1 }}>Play heavy</button>
            </div>
          </div>
        </div>

        <div className="signal-two-pane-main signal-two-pane-main--airy">
          {!selected ? (
            <WrapEmptyState icon={window.I.BarChart} title="Select an app" body="Choose an app on the left to model its revenue potential." />
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              <WrapRecommendationPanel workspace={workspace} app={selected} title="Revenue context from this app profile" />

              <div className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {wrapAppIcon(selected, 56)}
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
                        {wrapCategoryLabel(selectedCategory)} · {wrapCountryName(String(country).toUpperCase())}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className="chip accent">Benchmark D14 RPI ${benchmarkAdjustedRpi.toFixed(2)}</span>
                    <span className="chip">{peerAverages.count} peers in top grossing</span>
                    <span className="chip">Confidence {confidence}%</span>
                  </div>
                </div>
                <div style={{ marginTop: 14, color: 'var(--text-2)', fontSize: 13.5, lineHeight: 1.6 }}>
                  {benchmark.note}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 20 }}>
                <div className="card" style={{ padding: 20, display: 'grid', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Revenue Model</div>
                    <div className="seg">
                      <button className={pricingModel === 'subscription' ? 'on' : ''} onClick={() => setPricingModel('subscription')}>Subscription</button>
                      <button className={pricingModel === 'hybrid' ? 'on' : ''} onClick={() => setPricingModel('hybrid')}>Hybrid</button>
                      <button className={pricingModel === 'iap' ? 'on' : ''} onClick={() => setPricingModel('iap')}>IAP only</button>
                      <button className={pricingModel === 'paid' ? 'on' : ''} onClick={() => setPricingModel('paid')}>Paid app</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Monthly installs</div><input className="input" value={monthlyInstalls} onChange={(e) => setMonthlyInstalls(e.target.value)} inputMode="numeric" /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Listing conversion %</div><input className="input" value={listingConversion} onChange={(e) => setListingConversion(e.target.value)} inputMode="decimal" /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Monthly price</div><input className="input" value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} inputMode="decimal" /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Yearly price</div><input className="input" value={yearlyPrice} onChange={(e) => setYearlyPrice(e.target.value)} inputMode="decimal" /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Trial start %</div><input className="input" value={trialStartRate} onChange={(e) => setTrialStartRate(e.target.value)} inputMode="decimal" disabled={pricingModel === 'paid' || pricingModel === 'iap'} /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Trial to paid %</div><input className="input" value={trialToPaidRate} onChange={(e) => setTrialToPaidRate(e.target.value)} inputMode="decimal" disabled={pricingModel === 'paid' || pricingModel === 'iap'} /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Yearly mix %</div><input className="input" value={yearlyMix} onChange={(e) => setYearlyMix(e.target.value)} inputMode="decimal" disabled={pricingModel === 'paid' || pricingModel === 'iap'} /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Monthly churn %</div><input className="input" value={monthlyChurn} onChange={(e) => setMonthlyChurn(e.target.value)} inputMode="decimal" disabled={pricingModel === 'paid' || pricingModel === 'iap'} /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>IAP attach %</div><input className="input" value={iapAttachRate} onChange={(e) => setIapAttachRate(e.target.value)} inputMode="decimal" disabled={pricingModel === 'subscription' || pricingModel === 'paid'} /></label>
                    <label><div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>IAP ARPPU</div><input className="input" value={iapArppu} onChange={(e) => setIapArppu(e.target.value)} inputMode="decimal" disabled={pricingModel === 'subscription' || pricingModel === 'paid'} /></label>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 12 }}>
                  <div className="card" style={{ padding: 20, background: 'linear-gradient(180deg, rgba(245,98,23,0.12), rgba(255,255,255,0.02))' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>Modeled monthly run-rate</div>
                    <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--accent)' }}>{wrapMoney(netNewMrr)}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>New monthly revenue from current assumption set</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 12 }}>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Modeled D14 RPI</div>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{`$${d14RpiEstimate.toFixed(2)}`}</div>
                    </div>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>90-day revenue base</div>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{wrapMoney(runRate90)}</div>
                    </div>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Visitors needed</div>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{wrapCompact(Math.round(visitors || 0))}</div>
                    </div>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Paid subscribers</div>
                      <div style={{ fontSize: 26, fontWeight: 800 }}>{wrapCompact(Math.round(paidSubscribers || 0))}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Model breakdown</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {[
                      ['Store visitors', wrapCompact(Math.round(visitors || 0))],
                      ['Installs', wrapCompact(Math.round(convertedInstalls || 0))],
                      ['Trial starts', pricingModel === 'paid' || pricingModel === 'iap' ? '—' : wrapCompact(Math.round(trialStarts || 0))],
                      ['Paid subscribers', pricingModel === 'iap' ? '—' : wrapCompact(Math.round(paidSubscribers || 0))],
                      ['Subscription revenue', wrapMoney(subscriptionRevenue)],
                      ['IAP revenue', wrapMoney(iapRevenue)],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-0)' }}>
                        <span style={{ color: 'var(--text-3)' }}>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Category reference</div>
                  <div style={{ display: 'grid', gap: 10 }}>
                    {[
                      ['Benchmark D14 RPI', `$${benchmarkAdjustedRpi.toFixed(2)}`],
                      ['Top grossing peers', peerAverages.count],
                      ['Peer avg rating', wrapRating(peerAverages.avgRating)],
                      ['Peer avg reviews', wrapCompact(peerAverages.avgReviews)],
                      ['Free share in peers', `${peerAverages.freeShare}%`],
                      ['Paid price signal', peerAverages.avgPrice ? `$${peerAverages.avgPrice.toFixed(2)}` : 'Mostly free + IAP'],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBottom: 10, borderBottom: '1px solid var(--border-0)' }}>
                        <span style={{ color: 'var(--text-3)' }}>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>What Signal would push next</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {recommendations.length ? recommendations.map((item) => (
                    <div key={item} style={{ padding: 12, borderRadius: 12, background: 'var(--bg-2)', color: 'var(--text-2)', lineHeight: 1.6 }}>{item}</div>
                  )) : (
                    <div style={{ padding: 12, borderRadius: 12, background: 'var(--bg-2)', color: 'var(--text-2)', lineHeight: 1.6 }}>
                      The modeled revenue curve is in a healthy range for this category. The next lever is scale quality: more installs into the same payback profile.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const IDEA_VALIDATOR_STAGES = [
  { id: 'reddit-posts', label: 'Checking Reddit posts', detail: 'Looking for repeated pain points and how users describe the problem in public.' },
  { id: 'x-posts', label: 'Checking X posts', detail: 'Scanning positioning hooks, launch language, and emotional triggers that get shared.' },
  { id: 'reddit-comments', label: 'Checking Reddit comments', detail: 'Finding objections, edge cases, and what users complain about after trying tools.' },
  { id: 'app-store', label: 'Checking the App Store', detail: 'Pulling comparable products to estimate crowding, pricing, and differentiation room.' },
  { id: 'google-play', label: 'Checking Google Play', detail: 'Looking for mainstream competitors and distribution-heavy utility apps.' },
  { id: 'report', label: 'Writing the report', detail: 'Summarizing opportunity, competitor overlap, and the angle worth building.' },
];

const IDEA_VALIDATOR_MIN_CHARS = 140;
const IDEA_VALIDATOR_HISTORY_KEY = 'wrap-idea-validator-history-v1';

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function loadIdeaValidatorHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(IDEA_VALIDATOR_HISTORY_KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveIdeaValidatorHistory(entries) {
  try {
    localStorage.setItem(IDEA_VALIDATOR_HISTORY_KEY, JSON.stringify(entries.slice(0, 12)));
  } catch {}
}

function formatIdeaTimestamp(value) {
  try {
    return new Date(value).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return 'Saved';
  }
}

function trimIdeaHistoryPreview(value) {
  const text = String(value || '').trim();
  if (text.length <= 140) return text;
  return `${text.slice(0, 139).trimEnd()}…`;
}

function normalizeIdeaWords(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function uniqueIdeaWords(text) {
  return Array.from(new Set(normalizeIdeaWords(text)));
}

function inferIdeaCategory(idea) {
  const words = uniqueIdeaWords(idea);
  const categories = window.DATA.APP_CATEGORIES || [];
  const match = categories.find((category) => (
    words.some((word) => category.id.includes(word) || String(category.label || '').toLowerCase().includes(word))
  ));
  return match || categories[0] || { id: 'productivity', label: 'Productivity', emoji: 'A' };
}

function clampIdeaScore(value) {
  return Math.max(32, Math.min(94, Math.round(value)));
}

function titleCaseIdeaWord(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
}

function buildIdeaSearchTerms(idea, category) {
  const words = uniqueIdeaWords(idea).filter((word) => !['with', 'that', 'this', 'from', 'into', 'your', 'users'].includes(word));
  const compact = words.slice(0, 3).join(' ');
  const pairs = [];
  if (compact) pairs.push(compact);
  if (words[0] && category?.label) pairs.push(`${words[0]} ${category.label}`);
  if (words[1] && words[2]) pairs.push(`${words[1]} ${words[2]} app`);
  if (category?.label) pairs.push(`${category.label} app`);
  return Array.from(new Set(pairs.filter(Boolean))).slice(0, 4);
}

async function fetchIdeaValidatorComparableApps(idea, category) {
  const queries = buildIdeaSearchTerms(idea, category);
  const collected = new Map();
  for (const query of queries) {
    try {
      const response = await fetch(`/api/apple/search?q=${encodeURIComponent(query)}&country=us&limit=8`);
      const payload = await response.json().catch(() => ({ results: [] }));
      (payload.results || []).forEach((app) => {
        const key = String(app.id || app.storeId || app.url || app.name);
        if (!key || collected.has(key)) return;
        collected.set(key, app);
      });
    } catch {
      // Ignore network issues and keep the rest of the report usable.
    }
  }
  return Array.from(collected.values()).slice(0, 6);
}

function buildCommunitySearchUrl(platform, idea, qualifier) {
  const query = encodeURIComponent(`${idea} ${qualifier}`.trim());
  if (platform === 'reddit') return `https://www.google.com/search?q=site%3Areddit.com+${query}`;
  if (platform === 'x') return `https://x.com/search?q=${query}&src=typed_query`;
  if (platform === 'app-store') return `https://apps.apple.com/us/search?term=${query}`;
  return `https://play.google.com/store/search?q=${query}&c=apps`;
}

function buildSignalEntry(platform, tone, title, quote, linkLabel, url) {
  return { platform, tone, title, quote, linkLabel, url };
}

function buildIdeaSignals(idea, category, competitors) {
  const words = uniqueIdeaWords(idea);
  const anchor = titleCaseIdeaWord(words[0] || category.id || 'problem');
  const second = titleCaseIdeaWord(words[1] || 'workflow');
  const competitorLead = competitors[0]?.name || `${anchor} Tracker`;
  const competitorAlt = competitors[1]?.name || `${second} Coach`;

  return {
    redditPosts: [
      buildSignalEntry(
        'Reddit post',
        'pain',
        `Users still stitch together Notes, Sheets, and ${competitorLead}`,
        `"I do this every week and still haven't found one app that makes ${anchor.toLowerCase()} feel simple."`,
        'Open Reddit search',
        buildCommunitySearchUrl('reddit', idea, 'problem')
      ),
      buildSignalEntry(
        'Reddit post',
        'intent',
        `People want a narrower tool, not a general all-in-one`,
        `"Most apps do too much. I just want something focused on ${second.toLowerCase()} with less setup."`,
        'Open Reddit search',
        buildCommunitySearchUrl('reddit', idea, 'alternative')
      ),
    ],
    xPosts: [
      buildSignalEntry(
        'X post',
        'distribution',
        'Short, outcome-led positioning performs better than feature lists',
        `"Would pay for this if it cut the first 10 minutes of setup and showed value on day one."`,
        'Open X search',
        buildCommunitySearchUrl('x', idea, 'setup friction')
      ),
      buildSignalEntry(
        'X post',
        'growth',
        `Launch angle likely needs one crisp promise around ${anchor.toLowerCase()}`,
        `"The wedge isn't AI. The wedge is finishing the job faster than the existing stack."`,
        'Open X search',
        buildCommunitySearchUrl('x', idea, 'launch angle')
      ),
    ],
    redditComments: [
      buildSignalEntry(
        'Reddit comment',
        'objection',
        'Users distrust generic AI positioning unless the workflow is extremely concrete',
        `"If it says AI but still needs me to clean up everything manually, I'm out."`,
        'Open Reddit comment search',
        buildCommunitySearchUrl('reddit', idea, 'ai complaint')
      ),
      buildSignalEntry(
        'Reddit comment',
        'retention',
        `Retention will depend on recurring triggers, not one-time novelty`,
        `"Looks cool for a week. I keep the apps that save me time every single day."`,
        'Open Reddit comment search',
        buildCommunitySearchUrl('reddit', idea, 'retention')
      ),
    ],
    appStore: [
      buildSignalEntry(
        'App Store',
        'competition',
        `Comparable apps cluster around ${category.label} and productivity framing`,
        competitors.length
          ? `${competitors.length} nearby apps found. The current leaders lean on routine, tracking, and polished onboarding.`
          : `No clean direct match found yet. This can mean whitespace or weak keyword coverage.`
      ,
        'Search App Store',
        buildCommunitySearchUrl('app-store', idea, category.label)
      ),
    ],
    googlePlay: [
      buildSignalEntry(
        'Google Play',
        'volume',
        'Google Play likely surfaces broader utility competitors with lighter branding',
        `"Android demand usually bunches around utility and habit loops before premium polish."`,
        'Search Google Play',
        buildCommunitySearchUrl('google-play', idea, category.label)
      ),
    ],
  };
}

function buildIdeaValidatorReport(idea, category, competitors) {
  const words = uniqueIdeaWords(idea);
  const wordCount = words.length;
  const hasNumbers = /\d/.test(idea);
  const hasAudience = /(developer|student|founder|creator|coach|team|parent|runner|freelancer|designer)/i.test(idea);
  const hasProblem = /(help|reduce|improve|save|track|validate|plan|simplify|organize|compare|monitor|coach)/i.test(idea);
  const hasDistributionHook = /(community|viral|share|collaborat|social|leaderboard|template|generator|agent)/i.test(idea);

  const marketScore = clampIdeaScore(58 + (hasProblem ? 12 : 0) + (hasAudience ? 8 : 0) + Math.min(wordCount, 8));
  const competitionScore = clampIdeaScore(82 - Math.min(competitors.length * 6, 26) + (hasDistributionHook ? 4 : -3));
  const uniquenessScore = clampIdeaScore(48 + (hasDistributionHook ? 15 : 0) + (hasNumbers ? 4 : 0) + (hasAudience ? 10 : 0));
  const feasibilityScore = clampIdeaScore(78 - Math.max(wordCount - 14, 0) * 2 + (hasProblem ? 4 : -6));
  const overallScore = clampIdeaScore((marketScore + competitionScore + uniquenessScore + feasibilityScore) / 4);

  const signals = buildIdeaSignals(idea, category, competitors);
  const crowded = competitors.length >= 5;
  const opportunity = crowded
    ? `There is demand, but the App Store is already full of broad competitors. The best path is to narrow the ICP, tighten the first-use workflow, and own one repeated pain point better than generic tools.`
    : `This looks like a promising wedge category. There are adjacent products, but not many sharp, clearly owned positions around this exact use case.`;
  const moat = hasDistributionHook
    ? 'Lean into distribution and compound loops: templates, shareable outputs, and collaborative moments.'
    : 'Lean into workflow compression: less setup, faster first value, and a stronger recurring trigger.';
  const differentAngle = [
    `Target a narrower buyer than current leaders, for example "${category.label} for ${titleCaseIdeaWord(words[0] || 'operators')}" instead of another horizontal tool.`,
    `Promise a measurable before/after state in the first session. The copy should focus on the outcome, not the feature list.`,
    crowded
      ? 'Compete on workflow depth and speed, not feature count. Remove setup, defaults, and empty-state confusion.'
      : 'Use the whitespace to define a new category frame before the market becomes crowded.',
  ];

  const recommendations = [
    overallScore >= 74 ? 'Strong concept. Worth prototyping with a landing page and 3-5 interviews quickly.' : 'Promising, but the positioning still needs sharpening before building.',
    crowded ? 'The category is competitive. Pick one persona and one high-frequency use case.' : 'The category looks less saturated. Move quickly to validate willingness to switch.',
    hasAudience ? 'Audience definition is a strength. Keep the ICP explicit in onboarding and screenshots.' : 'The audience is still too broad. Name exactly who this is for in one sentence.',
    hasDistributionHook ? 'There is a plausible growth loop here. Make it a core product mechanic, not just a marketing add-on.' : 'You still need a stronger distribution or retention loop to avoid becoming a nice-to-have utility.',
  ];

  return {
    idea,
    category: category.label,
    scores: {
      market: marketScore,
      competition: competitionScore,
      uniqueness: uniquenessScore,
      feasibility: feasibilityScore,
      overall: overallScore,
    },
    summary: {
      verdict: overallScore >= 74 ? 'Buildable with a clear wedge' : overallScore >= 60 ? 'Needs a sharper wedge before building' : 'Interesting, but underdefined',
      opportunity,
      moat,
    },
    researchNotes: [
      `Search demand maps well to ${category.label} intent and pain-driven utility language.`,
      crowded
        ? `The top competitors already cover the generic use case, so the pitch must emphasize what they ignore.`
        : `Few direct competitors surfaced, which suggests either whitespace or immature keyword framing.`,
      `The strongest launch narrative is not "AI-powered". It is the concrete job-to-be-done this product finishes faster.`,
    ],
    signals,
    competitors: competitors.map((app, index) => {
      const nameText = String(app.name || '').toLowerCase();
      const wordMatches = words.filter((word) => nameText.includes(word)).length;
      const categoryMatch = String(wrapCategoryLabel(app.category) || '').toLowerCase() === String(category.label || '').toLowerCase();
      const similarity = clampIdeaScore(46 + (wordMatches * 12) + (categoryMatch ? 16 : 0) - (index * 3));
      return ({
      id: app.id || app.storeId || `${app.name}-${index}`,
      name: app.name || 'Unnamed app',
      developer: app.developer || 'Unknown developer',
      icon: app.icon || '',
      category: wrapCategoryLabel(app.category),
      rating: app.rating ? Number(app.rating).toFixed(1) : null,
      reviews: app.reviews || 0,
      revenue: app.revenue || 0,
      downloads: app.downloads || 0,
      url: app.url || buildCommunitySearchUrl('app-store', app.name || idea, ''),
      price: app.price ? `${app.price}` : (app.priceText || 'See store'),
      similarity,
      note: index === 0
        ? 'Closest positioning overlap.'
        : index === 1
          ? 'Useful benchmark for onboarding and packaging.'
          : 'Adjacent competitor, good for feature and messaging comparison.',
      });
    }),
    differentiation: {
      angle: differentAngle,
      launchHooks: [
        `Lead with one sentence: "${titleCaseIdeaWord(words[0] || category.label)} without the usual setup overhead."`,
        'Show one concrete workflow in the first 30 seconds instead of a generic dashboard.',
        'Design screenshots and landing copy around pain, relief, and a measurable result.',
      ],
    },
    recommendations,
  };
}

function WrapIdeaValidatorScreen() {
  const [appIdea, setAppIdea] = React.useState('');
  const [validating, setValidating] = React.useState(false);
  const [validation, setValidation] = React.useState(null);
  const [validationHistory, setValidationHistory] = React.useState(loadIdeaValidatorHistory);
  const [analysisModalOpen, setAnalysisModalOpen] = React.useState(false);
  const [analysisStageIndex, setAnalysisStageIndex] = React.useState(-1);
  const [analysisStages, setAnalysisStages] = React.useState(() => IDEA_VALIDATOR_STAGES.map((stage) => ({ ...stage, status: 'pending' })));
  const remainingChars = Math.max(0, IDEA_VALIDATOR_MIN_CHARS - appIdea.trim().length);

  const setStageStatus = (index, status) => {
    setAnalysisStages((current) => current.map((stage, stageIndex) => (
      stageIndex === index ? { ...stage, status } : stage
    )));
  };

  React.useEffect(() => {
    saveIdeaValidatorHistory(validationHistory);
  }, [validationHistory]);

  const openSavedReadout = (entry) => {
    setValidation(entry);
    setAppIdea(entry.idea || '');
  };

  const validateIdea = async () => {
    if (!appIdea.trim()) {
      alert('Please enter an app idea');
      return;
    }

    if (appIdea.trim().length < IDEA_VALIDATOR_MIN_CHARS) {
      alert(`Please describe the idea in at least ${IDEA_VALIDATOR_MIN_CHARS} characters.`);
      return;
    }

    setValidating(true);
    setValidation(null);
    setAnalysisModalOpen(true);
    setAnalysisStageIndex(-1);
    setAnalysisStages(IDEA_VALIDATOR_STAGES.map((stage) => ({ ...stage, status: 'pending' })));

    const category = inferIdeaCategory(appIdea);
    let competitors = [];

    try {
      for (let index = 0; index < IDEA_VALIDATOR_STAGES.length; index += 1) {
        setAnalysisStageIndex(index);
        setStageStatus(index, 'running');

        if (IDEA_VALIDATOR_STAGES[index].id === 'app-store') {
          await sleep(420);
        } else if (IDEA_VALIDATOR_STAGES[index].id === 'report') {
          let response;
          try {
            response = await fetch('/api/idea-validator/research', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idea: appIdea.trim() }),
            });
          } catch (networkError) {
            throw new Error('Network error: Could not connect to the local server. Make sure the Signal backend is running.');
          }
          const payload = await response.json().catch(() => ({}));
          if (!response.ok) {
            throw new Error(payload.error || 'Idea validation failed');
          }
          competitors = payload.competitors || [];
          const nextValidation = {
            ...payload,
            id: `idea-${Date.now().toString(36)}`,
            createdAt: new Date().toISOString(),
          };
          setValidation(nextValidation);
          setValidationHistory((current) => [nextValidation, ...current.filter((entry) => entry.idea !== nextValidation.idea)].slice(0, 12));
        } else {
          await sleep(520 + (index * 110));
        }

        setStageStatus(index, 'done');
      }
      await sleep(260);
      setAnalysisModalOpen(false);
    } catch (error) {
      setAnalysisModalOpen(false);
      alert(error?.message || 'Idea validation failed');
    } finally {
      setValidating(false);
    }
  };

  return (
    <div style={{ padding: '28px 24px 48px', maxWidth: 1220, margin: '0 auto' }}>
      <WrapSectionTitle icon={window.I.CheckCircle} title="Idea Validator" body="Validate your app ideas before building." />

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(320px, 0.65fr)', gap: 18, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontSize: 14, marginBottom: 12, fontWeight: 500 }}>Describe your app idea</div>
          <textarea
            placeholder="Describe the user, the pain, the workflow, what makes this different, and why someone would switch. Aim for a concrete idea, not just a category."
            value={appIdea}
            onChange={(e) => setAppIdea(e.target.value)}
            style={{
              width: '100%',
              minHeight: 132,
              padding: '12px 14px',
              borderRadius: 12,
              border: `1px solid ${remainingChars > 0 ? 'rgba(251,191,36,0.2)' : 'var(--border-1)'}`,
              background: 'var(--bg-1)',
              color: 'var(--text-1)',
              fontSize: 13,
              lineHeight: 1.7,
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginTop: 12 }}>
            <div style={{ fontSize: 12.5, color: remainingChars > 0 ? '#fbbf24' : 'var(--text-3)' }}>
              {remainingChars > 0
                ? `${remainingChars} more characters needed before the idea is detailed enough to validate.`
                : 'Enough detail to run a proper readout.'}
            </div>
            <span className="chip">{appIdea.trim().length} / {IDEA_VALIDATOR_MIN_CHARS} min</span>
          </div>
          <button
            className="btn primary"
            onClick={validateIdea}
            disabled={validating || !appIdea.trim() || remainingChars > 0}
            style={{ marginTop: 12 }}
          >
            {validating ? 'Validating...' : 'Validate Idea'}
          </button>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 6 }}>History</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Saved Idea Readouts</div>
            </div>
            <span className="chip">{validationHistory.length}</span>
          </div>
          <div style={{ display: 'grid', gap: 10, maxHeight: 260, overflowY: 'auto' }}>
            {validationHistory.length ? validationHistory.map((entry) => (
              <button
                key={entry.id || `${entry.idea}-${entry.createdAt}`}
                onClick={() => openSavedReadout(entry)}
                style={{ textAlign: 'left', padding: 14, borderRadius: 12, background: validation?.id === entry.id ? 'var(--accent-soft)' : 'var(--bg-2)', border: `1px solid ${validation?.id === entry.id ? 'var(--accent-ring)' : 'var(--border-1)'}` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{entry.summary?.verdict || 'Idea readout'}</div>
                  <span className="chip accent">{entry.scores?.overall || '—'}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.55, marginTop: 8 }}>
                  {trimIdeaHistoryPreview(entry.idea || '')}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                  <span className="chip">{entry.category || 'Category'}</span>
                  <span className="chip">{entry.competitors?.length || 0} apps</span>
                  <span className="chip">{formatIdeaTimestamp(entry.createdAt)}</span>
                </div>
              </button>
            )) : (
              <div style={{ padding: 14, borderRadius: 12, background: 'var(--bg-2)', color: 'var(--text-3)', fontSize: 13, lineHeight: 1.6 }}>
                Your validated ideas will be saved here so you can reopen old readouts without rerunning the research.
              </div>
            )}
          </div>
        </div>
      </div>

      {analysisModalOpen ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1600, background: 'rgba(2,6,12,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div className="card" style={{ width: 720, maxWidth: '100%', padding: 22, background: 'var(--bg-1)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 8 }}>Research Plan</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>Validating the idea</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-3)', lineHeight: 1.6, marginTop: 8, maxWidth: 560 }}>
                  Simulating a market research pass across Reddit, X, App Store, Google Play, and competitor positioning before writing the report.
                </div>
              </div>
              <span className="chip accent">{Math.max(0, analysisStageIndex + 1)} / {IDEA_VALIDATOR_STAGES.length}</span>
            </div>

            <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
              {analysisStages.map((stage, index) => {
                const isRunning = stage.status === 'running';
                const isDone = stage.status === 'done';
                return (
                  <div
                    key={stage.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '36px minmax(0, 1fr) auto',
                      gap: 12,
                      alignItems: 'center',
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `1px solid ${isRunning ? 'var(--accent-ring)' : 'var(--border-1)'}`,
                      background: isRunning ? 'var(--accent-soft)' : 'var(--bg-2)',
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: isDone ? 'rgba(74,222,128,0.18)' : (isRunning ? 'rgba(183,255,74,0.18)' : 'rgba(255,255,255,0.05)') }}>
                      {isDone ? <window.I.Check /> : isRunning ? <window.I.Search /> : <span style={{ color: 'var(--text-4)', fontSize: 12 }}>{index + 1}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{stage.label}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.5, marginTop: 3 }}>{stage.detail}</div>
                    </div>
                    <div style={{ fontSize: 11.5, color: isDone ? '#4ade80' : (isRunning ? 'var(--accent)' : 'var(--text-4)'), textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                      {isDone ? 'Done' : isRunning ? 'Running' : 'Pending'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      {validation && (
        <div style={{ display: 'grid', gap: 20 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 8 }}>Idea Readout</div>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em' }}>Should you build this?</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 6 }}>{validation.summary.verdict}</div>
              </div>
              <span className="chip accent">{validation.category}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)', gap: 18, alignItems: 'stretch' }}>
              <div style={{
                borderRadius: 18,
                padding: 18,
                background: validation.scores.overall >= 70
                  ? 'linear-gradient(180deg, rgba(74,222,128,0.18), rgba(74,222,128,0.06))'
                  : validation.scores.overall >= 50
                    ? 'linear-gradient(180deg, rgba(251,191,36,0.18), rgba(251,191,36,0.05))'
                    : 'linear-gradient(180deg, rgba(248,113,113,0.18), rgba(248,113,113,0.05))',
                border: `1px solid ${validation.scores.overall >= 70 ? 'rgba(74,222,128,0.22)' : validation.scores.overall >= 50 ? 'rgba(251,191,36,0.22)' : 'rgba(248,113,113,0.22)'}`,
                display: 'grid',
                gap: 12,
              }}>
                <div style={{ fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)' }}>Opportunity score</div>
                <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.95 }}>{validation.scores.overall}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                  {validation.scores.overall >= 74
                    ? 'Demand exists and there is still room to win with a tighter wedge.'
                    : validation.scores.overall >= 60
                      ? 'There is signal, but the positioning still looks too broad.'
                      : 'The concept needs a much sharper problem and audience definition.'}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    ['Market', validation.scores.market],
                    ['Crowding', validation.scores.competition],
                    ['Uniqueness', validation.scores.uniqueness],
                    ['Feasibility', validation.scores.feasibility],
                  ].map(([label, score]) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '74px 1fr 34px', gap: 8, alignItems: 'center' }}>
                      <div style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{label}</div>
                      <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${score}%`, height: '100%', borderRadius: 999, background: 'var(--accent)' }} />
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-2)', textAlign: 'right' }}>{score}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, marginBottom: 8, fontWeight: 500 }}>Idea brief</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {validation.idea}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, marginTop: 14 }}>
                  <div style={{ padding: 14, borderRadius: 14, background: 'var(--bg-2)', fontSize: 13, lineHeight: 1.6, border: '1px solid var(--border-1)' }}>
                    <strong style={{ color: 'var(--text-1)' }}>Opportunity:</strong> {validation.summary.opportunity}
                  </div>
                  <div style={{ padding: 14, borderRadius: 14, background: 'var(--bg-2)', fontSize: 13, lineHeight: 1.6, border: '1px solid var(--border-1)' }}>
                    <strong style={{ color: 'var(--text-1)' }}>Defensibility:</strong> {validation.summary.moat}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  <span className="chip">{validation.competitors.length} similar apps found</span>
                  <span className="chip">{validation.scores.competition >= 70 ? 'Lower crowding' : validation.scores.competition >= 55 ? 'Mid crowding' : 'Crowded space'}</span>
                  <span className="chip">{validation.scores.uniqueness >= 70 ? 'Strong wedge' : 'Wedge to sharpen'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Research Summary</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {validation.researchNotes.map((note, idx) => (
                <div key={idx} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 }}>
                  {note}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Community Signals</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>Live posts and conversations</div>
            </div>

            {validation.signals.xPosts && !validation.signals.xAvailable ? (
              <div style={{ padding: 14, background: 'linear-gradient(135deg, rgba(29, 161, 242, 0.1), rgba(29, 161, 242, 0.05))', borderRadius: 10, border: '1px solid rgba(29, 161, 242, 0.2)', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                💡 <strong>Enable X/Twitter posts:</strong> {validation.signals.xMessage || 'Set X_BEARER_TOKEN environment variable to see real tweets with pain points'}
              </div>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {[...validation.signals.redditPosts, ...validation.signals.xPosts, ...validation.signals.redditComments]
                .filter(item => item && item.quote)
                .map((item, idx) => {
                  const gradients = [
                    'linear-gradient(135deg, rgba(255, 107, 53, 0.12), rgba(255, 107, 53, 0.04))',
                    'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(139, 92, 246, 0.04))',
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(59, 130, 246, 0.04))',
                    'linear-gradient(135deg, rgba(236, 72, 153, 0.12), rgba(236, 72, 153, 0.04))',
                    'linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(14, 165, 233, 0.04))',
                    'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.04))',
                  ];
                  const borderColors = [
                    'rgba(255, 107, 53, 0.25)',
                    'rgba(139, 92, 246, 0.25)',
                    'rgba(59, 130, 246, 0.25)',
                    'rgba(236, 72, 153, 0.25)',
                    'rgba(14, 165, 233, 0.25)',
                    'rgba(245, 158, 11, 0.25)',
                  ];
                  const gradient = gradients[idx % gradients.length];
                  const borderColor = borderColors[idx % borderColors.length];

                  return (
                    <div key={`signal-${idx}`} style={{
                      padding: 16,
                      background: gradient,
                      borderRadius: 14,
                      border: `1px solid ${borderColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 12,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => window.open(item.externalUrl || item.url, '_blank')}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                          <span className="chip accent" style={{ fontSize: 10.5 }}>{item.platform}</span>
                          {item.community ? <span className="chip" style={{ fontSize: 10.5 }}>{item.community}</span> : null}
                          {item.handle ? <span className="chip" style={{ fontSize: 10.5 }}>{item.handle}</span> : null}
                        </div>
                        {typeof item.score === 'number' && item.score > 0 ? (
                          <span className="chip" style={{ fontSize: 10.5, fontWeight: 600 }}>↑ {item.score}</span>
                        ) : null}
                      </div>

                      <div style={{ fontSize: 13.5, color: 'var(--text-1)', lineHeight: 1.65, fontStyle: 'italic' }}>
                        "{item.quote}"
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center', fontSize: 11, color: 'var(--text-4)', paddingTop: 4, borderTop: '1px solid var(--border-1)' }}>
                        <div>
                          {item.author ? `u/${item.author}` : 'Anonymous'}
                          {typeof item.commentsCount === 'number' && item.commentsCount > 0 ? ` · ${item.commentsCount} replies` : ''}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--accent)' }}>
                          View →
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {![...validation.signals.redditPosts, ...validation.signals.xPosts, ...validation.signals.redditComments].filter(item => item && item.quote).length ? (
              <div style={{ padding: 20, background: 'var(--bg-2)', borderRadius: 10, border: '1px solid var(--border-1)', color: 'var(--text-3)', fontSize: 13, textAlign: 'center' }}>
                No user discussions found. Try running the validation again or refine your idea description.
              </div>
            ) : null}
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginBottom: 6 }}>Market map</div>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>Apps similar to your idea</div>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-4)' }}>Live App Store lookup when available</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {validation.competitors.length ? validation.competitors.map((app) => (
                <div key={app.id} style={{ padding: 16, background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', borderRadius: 16, border: '1px solid var(--border-1)', display: 'grid', gap: 14 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ display: 'flex', gap: 12, minWidth: 0 }}>
                        {wrapAppIcon(app)}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25 }}>{app.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>{app.developer}</div>
                        </div>
                      </div>
                      <div style={{ minWidth: 64, textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Similarity</div>
                        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', color: app.similarity >= 75 ? 'var(--accent)' : 'var(--text-1)' }}>{app.similarity}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                      <span className="chip">{app.category}</span>
                      {app.rating ? <span className="chip">★ {app.rating}</span> : null}
                      {app.reviews ? <span className="chip">{wrapCompactCount(app.reviews)} reviews</span> : null}
                      {app.revenue ? <span className="chip">{wrapMoney(app.revenue)}</span> : null}
                    </div>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    {app.note}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ padding: 10, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontSize: 10.5, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>App Store signal</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{app.similarity >= 78 ? 'Direct overlap' : app.similarity >= 62 ? 'Adjacent overlap' : 'Loose overlap'}</div>
                    </div>
                    <div style={{ padding: 10, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontSize: 10.5, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>What to study</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{app.similarity >= 78 ? 'Positioning + onboarding' : 'Packaging + messaging'}</div>
                    </div>
                  </div>
                  <a href={app.url} target="_blank" rel="noreferrer" className="btn sm" style={{ textDecoration: 'none', justifyContent: 'center' }}>Open store page</a>
                </div>
              )) : (
                <div style={{ padding: 14, background: 'var(--bg-2)', borderRadius: 10, fontSize: 13, color: 'var(--text-3)', gridColumn: '1 / -1' }}>
                  No close App Store comps surfaced from the current query. That can mean whitespace, or that the wording needs better keywords.
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Where The Opportunity Is</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {validation.differentiation.angle.map((entry, idx) => (
                <div key={idx} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 }}>
                  {entry}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', marginTop: 18, marginBottom: 8 }}>Launch Hooks</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {validation.differentiation.launchHooks.map((hook, idx) => (
                <div key={idx} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 }}>
                  {hook}
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Recommendations</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {validation.recommendations.map((rec, idx) => (
                <div key={idx} style={{ padding: 12, background: 'var(--bg-2)', borderRadius: 8, fontSize: 13, lineHeight: 1.6 }}>
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  WrapConfirmModal,
  wrapJobCard,
  WrapDiscoverScreen,
  WrapSearchScreen,
  WrapTrendingScreen,
  WrapFavoritesScreen,
  WrapAppTrackingScreen,
  WrapKeywordExplorerScreen,
  WrapScreenshotsScreen,
  WrapReviewsScreen,
  WrapHotIdeasScreen,
  WrapIdeaReportScreen,
  WrapPricingScreen,
  WrapAppDetailScreen,
  WrapAIAgentsScreen,
  WrapMyProjectsScreen,
  WrapMyAppsScreen,
  WrapMarketInsightsScreen,
  WrapASOAnalyzerScreen,
  WrapRankHistoryScreen,
  WrapCompetitorsScreen,
  WrapRevenueInsightsScreen,
  WrapIdeaValidatorScreen,
  WrapOnboardingScreen,
});
