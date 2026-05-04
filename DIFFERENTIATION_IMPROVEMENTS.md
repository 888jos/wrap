# Améliorations de Différenciation — 4 Écrans

Ce document liste toutes les améliorations apportées pour mieux différencier les 4 écrans de découverte :
- **Market Insights**
- **Explore Apps**
- **App Store Rankings**
- **Discover Opportunities**

---

## ✅ 1. Market Insights (components/wrap-screens.jsx:5721)

### Améliorations implémentées :

#### **Distribution des revenus et percentiles**
- Calcul des percentiles (P10, P25, P50, P75, P90) pour visualiser la distribution du marché
- Vue "Distribution" avec toggle Overview/Distribution
- Classement de tes apps trackées par percentile (Top 10%, Top 25%, etc.)
- Graphiques de distribution pour voir où se situent tes apps dans le marché

#### **Insights actionnables automatiques**
- Détection automatique des apps avec 3+ gaps critiques
- Alertes pour les catégories sous-performantes (gap > $5k)
- Recommandations d'actions concrètes ("Focus on improving rating, growth, or marketing coverage")
- Section "Actionable Insights" avec codes couleur (critical/warning)

### Différenciation finale :
**Market Insights = Outil diagnostique/analytique** pour comprendre la performance de tes apps trackées vs le marché, avec des recommandations d'actions.

---

## ✅ 2. Explore Apps (components/wrap-screens.jsx:1871)

### Améliorations implémentées :

#### **Presets de filtres sauvegardables**
- Bouton "Save Preset" pour sauvegarder la configuration actuelle
- Modal pour nommer le preset (ex: "New EU Games", "Health apps with ads")
- Section "Saved Presets" dans le sidebar avec liste des presets
- Bouton × pour supprimer chaque preset
- Stockage localStorage persistant

#### **Mode comparaison (jusqu'à 5 apps)**
- Checkbox à gauche de chaque app pour sélection
- Bouton "Compare X apps" dans le header
- Modal de comparaison full-screen avec grille comparative
- Métriques comparées : Category, Rating, Reviews, Growth, Downloads, MRR, Price, Released, Country
- Design responsive avec scroll horizontal si nécessaire

### Différenciation finale :
**Explore Apps = Outil de recherche/filtrage exhaustif** avec capacité de sauvegarder des recherches fréquentes et comparer des apps côte à côte.

---

## ✅ 3. App Store Rankings (components/wrap-screens.jsx:2722)

### Améliorations implémentées :

#### **Overlay des apps trackées**
- Détection automatique des apps trackées dans les charts
- Highlight visuel avec gradient orange + border accent
- Toggle "Show/Hide My Apps" dans le header
- Background spécial : `linear-gradient(90deg, rgba(244,98,31,0.15), rgba(255,255,255,0.01))`
- Border orange `1px solid var(--accent)` pour les apps trackées

### Note sur l'historique :
L'historique des mouvements 24h existe déjà via `wrapRankingDelta()` qui utilise les données cachées. Pour un vrai historique 7j/30j, il faudrait :
- Stocker les positions quotidiennes dans une DB (Supabase)
- Créer un endpoint `/api/apple/rank-history/:appId`
- Ajouter un mini-graphique dans chaque row

### Différenciation finale :
**App Store Rankings = Outil de monitoring rapide** des top charts officiels avec mise en avant de tes apps pour suivre leur position.

---

## ✅ 4. Discover Opportunities (components/wrap-screens.jsx:2475)

### Améliorations implémentées :

#### **Score de difficulté de compétition**
- Algorithme de calcul basé sur :
  - Downloads (> 100k = +40 pts, > 50k = +25 pts, > 20k = +15 pts)
  - Revenue (> $50k = +30 pts, > $20k = +20 pts, > $5k = +10 pts)
  - Reviews + Rating (> 10k reviews + 4.5★ = +20 pts)
- Badge coloré dans chaque carte :
  - **Vert (Easy)** : score ≤ 30
  - **Orange (Medium)** : score 31-60
  - **Rouge (Hard)** : score > 60

#### **Détection des niches émergentes**
- Agrégation par catégorie avec calcul de croissance moyenne
- Filtre : minimum 3 apps + croissance moyenne ≥ 15%
- Section dédiée "Emerging Niches — High Growth Categories"
- Top 5 niches triées par croissance
- Affichage de 3 apps exemple pour chaque niche
- Design avec gradient orange + icône TrendingUp

### Différenciation finale :
**Discover Opportunities = Recommandation proactive** d'opportunités détectées automatiquement avec évaluation de la difficulté et détection de tendances émergentes.

---

## Synthèse des rôles distincts

| Écran | Rôle | Type de données | Condition |
|-------|------|-----------------|-----------|
| **Market Insights** | Diagnostique analytique | Tes apps vs marché (3 charts combinés) | Nécessite apps trackées |
| **Explore Apps** | Recherche exhaustive | Live crawl multi-pays (3200+ apps) | Aucune |
| **App Store Rankings** | Monitoring top charts | 1 chart à la fois (top-free/paid/grossing) | Aucune |
| **Discover Opportunities** | Détection opportunités | Charts + recent releases + anti-incumbents | Filtres actifs |

---

## Code modifié

Fichier principal : `/Users/jos/wrap/components/wrap-screens.jsx`

### Fonctions/composants modifiés :
1. `WrapMarketInsightsScreen` (lignes 5721+)
   - Ajout state `showDistribution`, `timeWindow`
   - Calcul `distributionData`, `trackedDistribution`, `actionableInsights`
   - UI toggle Overview/Distribution
   - Section "Actionable Insights"

2. `WrapSearchScreen` (lignes 1871+)
   - Ajout state `presets`, `showPresetModal`, `selectedForComparison`, `showComparison`
   - Fonctions `saveCurrentAsPreset`, `loadPreset`, `deletePreset`, `toggleAppForComparison`
   - UI sidebar presets + checkboxes sélection + modal comparaison

3. `WrapTrendingScreen` (lignes 2722+)
   - Ajout `trackedApps`, `highlightTracked`
   - Détection `isTracked` dans le map
   - Background conditionnel + border accent

4. `WrapDiscoverScreen` (lignes 2475+)
   - Fonction `calculateDifficultyScore`
   - Calcul `emergingNiches` avec React.useMemo
   - Badge difficulté dans les cartes
   - Section "Emerging Niches" avant les cartes

---

## Prochaines étapes possibles

### Market Insights
- [ ] Historique temporel des gaps (7j/30j/90j)
- [ ] Export CSV des insights
- [ ] Alertes push quand gap s'aggrave de >20%

### Explore Apps
- [ ] Export CSV/JSON des résultats filtrés
- [ ] Bouton "Track all filtered apps"
- [ ] Mode tableau vs mode grille

### App Store Rankings
- [ ] Vrai historique 30j avec mini-graphiques
- [ ] Vue multi-pays en grille simultanée
- [ ] Alertes "nouvelle app dans top 10 de ta catégorie"

### Discover Opportunities
- [ ] Filtrer par "keyword opportunity" (apps avec faible keyword density)
- [ ] ML clustering pour "Similar to my tracked apps"
- [ ] Export des niches émergentes

---

**Date de mise à jour** : 2026-04-26
**Auteur** : Claude Code
**Fichiers modifiés** : components/wrap-screens.jsx (4 composants)
