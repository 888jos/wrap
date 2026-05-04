# App Store Rankings — Améliorations

## ✅ Améliorations implémentées

### 1. **Top 200 au lieu de top 100**
- Limite augmentée de 100 à 200 apps par chart (components/wrap-screens.jsx:2838)
- **Note** : L'API Apple RSS ne retourne que 100 apps max, donc la limite effective reste 100
- Pour obtenir vraiment 200 apps, il faudrait combiner plusieurs sources

### 2. **Filtre temporel ajouté**
- Boutons "Current", "24h ago", "7d ago" (components/wrap-screens.jsx:2872-2876)
- **État** : Interface ajoutée, fonctionnalité à implémenter
- Nécessite un job quotidien pour stocker l'historique

### 3. **Message d'erreur amélioré**
- Nouveau message explicatif quand aucune app n'est trouvée (components/wrap-screens.jsx:2950-2955)
- Explique que 200 apps sont chargées et suggère de changer de catégorie/pays

---

## 🔄 Fonctionnalités à implémenter

### Job quotidien de sauvegarde des rankings

Pour que le filtre temporel fonctionne, il faut :

1. **Créer une table Supabase `rankings_history`**
```sql
CREATE TABLE rankings_history (
  id BIGSERIAL PRIMARY KEY,
  store_id TEXT NOT NULL,
  chart TEXT NOT NULL, -- 'top-free', 'top-paid', 'top-grossing'
  country TEXT NOT NULL,
  category TEXT,
  rank INTEGER NOT NULL,
  captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB,

  CONSTRAINT unique_ranking UNIQUE (store_id, chart, country, category, captured_at::DATE)
);

CREATE INDEX idx_rankings_chart ON rankings_history(chart, country, category, captured_at DESC);
CREATE INDEX idx_rankings_app ON rankings_history(store_id, chart, country);
```

2. **Créer un endpoint `/api/rankings/capture`**
```javascript
// Dans server.mjs
if (req.method === 'POST' && pathname === '/api/rankings/capture') {
  const charts = ['top-free', 'top-paid', 'top-grossing'];
  const countries = ['us', 'gb', 'ca', 'au', 'fr', 'de', 'jp'];

  for (const chart of charts) {
    for (const country of countries) {
      const apps = await fetchAppleChart(chart, country, 100);

      for (let rank = 0; rank < apps.length; rank++) {
        const app = apps[rank];
        await supabase.from('rankings_history').upsert({
          store_id: app.storeId,
          chart,
          country: country.toUpperCase(),
          category: app.category,
          rank: rank + 1,
          data: app
        });
      }
    }
  }

  sendJson(res, 200, { success: true, captured: new Date() });
  return true;
}
```

3. **Créer un cron job (GitHub Actions ou Vercel Cron)**
```yaml
# .github/workflows/capture-rankings.yml
name: Capture Daily Rankings
on:
  schedule:
    - cron: '0 2 * * *' # 2am UTC every day

jobs:
  capture:
    runs-on: ubuntu-latest
    steps:
      - name: Capture rankings
        run: |
          curl -X POST https://your-server.com/api/rankings/capture \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

4. **Modifier le hook `useChartData` pour supporter l'historique**
```javascript
function useChartData(chart, country, limit = 100, timeFilter = 'current') {
  // Si timeFilter !== 'current', fetch depuis Supabase
  if (timeFilter === '24h') {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    // Fetch from Supabase where captured_at::DATE = yesterday::DATE
  } else if (timeFilter === '7d') {
    const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    // Fetch from Supabase where captured_at::DATE = week::DATE
  }
  // Sinon, fetch live comme actuellement
}
```

---

## 📊 Pourquoi seulement 100 apps par chart actuellement

### Limitation de l'API Apple RSS
L'endpoint utilisé :
```
https://rss.applemarketingtools.com/api/v2/us/apps/top-free/100/apps.json
```

**Maximum supporté** : 100 apps

### Solutions pour obtenir plus de 200 apps

#### Option 1 : Crawler plusieurs catégories
```javascript
async function fetchTop200(chart, country) {
  const categories = ['6016', '6007', '6000', '6002', '6013']; // Top 5 categories
  const apps = [];

  for (const cat of categories) {
    const url = `https://rss.applemarketingtools.com/api/v2/${country}/apps/${chart}/${cat}/100/apps.json`;
    const data = await fetchJson(url);
    apps.push(...data.feed.results);
  }

  // Dedupe and return top 200 by downloads/revenue
  return dedupeAndRank(apps).slice(0, 200);
}
```

#### Option 2 : Utiliser l'API privée Apple Search
```javascript
// Non documentée, peut être bloquée
const url = `https://amp-api.apps.apple.com/v1/catalog/us/search?types=apps&limit=200&sort=popularity`;
```

#### Option 3 : Scraper le site web App Store
```javascript
// Plus fiable mais plus lent
const puppeteer = require('puppeteer');
async function scrapeTop200() {
  const browser = await puppeteer.launch();
  // Scrape https://www.apple.com/app-store/charts/
}
```

---

## 🎯 Recommandation

**Pour un MVP rapide** :
1. Garder la limite à 100 (max de l'API RSS)
2. Implémenter le job quotidien pour l'historique
3. Activer le filtre temporel avec Supabase

**Pour le long terme** :
1. Scraper le site web Apple pour obtenir vraiment 200 apps
2. Stocker tout dans Supabase
3. Utiliser Supabase comme source unique de vérité

---

**Date** : 2026-04-26
**Fichiers modifiés** : components/wrap-screens.jsx
**Lignes** : 2831-2960 (WrapTrendingScreen)
