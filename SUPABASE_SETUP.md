# Supabase Setup Guide

## 1. Configuration initiale

Crée un fichier `.env` à partir de `.env.example`:

```bash
cp .env.example .env
```

Puis renseigne:
- `VITE_SUPABASE_URL`: URL du projet Supabase
- `VITE_SUPABASE_PUBLISHABLE_KEY`: clé publique `anon`

Le serveur injecte ensuite ces variables dans `Shipshot.html` au runtime. La clé n'est plus hardcodée dans le code client.

## 2. Créer les tables dans Supabase

1. Va sur https://supabase.com/dashboard/project/wqkvcqbvbqglclhddzxg
2. Clique sur "SQL Editor" dans le menu de gauche
3. Copie-colle le contenu de `supabase-schema.sql`
4. Clique sur "Run" pour exécuter le SQL

Cela va créer:
- Table `workspaces` pour stocker les données utilisateur
- Policies RLS (Row Level Security) pour protéger les données
- Index pour optimiser les performances

## 3. Activer l'authentification

1. Va dans "Authentication" → "Providers"
2. Active les providers souhaités (Email, Google, GitHub, etc.)
3. Configure les URLs de redirection:
   - Development: `http://127.0.0.1:3000`
   - Production: Ton domaine

## 4. Migration des données

Le workspace actuel utilise `localStorage` avec la clé `shipshot-workspace`.

Pour migrer vers Supabase:
- Les données sont automatiquement sync avec Supabase quand l'utilisateur est connecté
- Le localStorage reste comme fallback si pas connecté
- Voir `lib/workspace.js` pour la logique de sync

## 5. Structure de données

```javascript
{
  trackedApps: [],        // Apps trackées par l'utilisateur
  projects: [],           // Projets de l'utilisateur
  favoriteAppIds: [],     // IDs des apps favorites
  // ... autres données
}
```

## 6. Utilisation dans le code

```javascript
import { supabase } from './lib/supabase';

// Récupérer le workspace
const { data, error } = await supabase
  .from('workspaces')
  .select('data')
  .eq('user_id', user.id)
  .single();

// Sauvegarder le workspace
const { error } = await supabase
  .from('workspaces')
  .upsert({
    user_id: user.id,
    data: workspaceData
  });
```

## 7. Sécurité

- **Row Level Security (RLS)** activé: Les utilisateurs ne peuvent voir que leurs propres données
- **Anon key**: Utilisable côté client, limitations appliquées via RLS
- **Service role key**: À utiliser UNIQUEMENT côté serveur (jamais exposé au client)
