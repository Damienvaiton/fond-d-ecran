# Fond d'écran — Nouvel onglet

Extension Chrome qui remplace la page « Nouvel onglet » : fond d'écran aléatoire,
horloge, recherche Google (avec historique et Google Lens), raccourcis et dossiers,
stores des artistes, et anniversaires de sorties d'albums.

Deux profils (Carotte et Alex) ont chacun leurs raccourcis, leurs réglages, leurs
artistes et leurs fonds d'écran.

## Installation

1. Ouvrir `chrome://extensions` et activer le **mode développeur**.
2. **Charger l'extension non empaquetée** → choisir ce dossier.
3. Ouvrir un nouvel onglet.

> Si `npm install` a été lancé dans ce dossier, Chrome refusera de le charger
> (`node_modules` contient des fichiers commençant par « _ ») : lancer
> `npm run build` et charger le dossier `dist/` à la place.

Après une mise à jour du code : bouton ↻ de l'extension dans `chrome://extensions`.
Les données déjà enregistrées (raccourcis, préférences…) sont conservées et migrées
automatiquement.

## Tâches courantes

| Je veux…                       | Où / comment                                                                                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ajouter un fond d'écran        | Déposer l'image (WebP de préférence, ≤ 2560 px de large) dans `assets/backgrounds/`, puis `npm run assets`.                                           |
| Masquer un fond pour un profil | `hiddenBackgrounds` du profil dans `src/config.js`.                                                                                                   |
| Ajouter / corriger un store    | `DEFAULT_ARTISTS` dans `src/config.js` (chaque store a un `id` unique). Pris en compte immédiatement par tous les profils.                            |
| Ajouter la photo d'un artiste  | `assets/artists/<nom_en_minuscules>.webp` (ex. `taylor_swift.webp`, ~400 px), puis `npm run assets`.                                                  |
| Ajouter des sorties d'albums   | Directement dans l'interface (🎵), puis ⚙ → Exporter `events.json` et remplacer `data/events.json` pour les partager. Ou éditer le fichier à la main. |
| Ajouter un profil              | `PROFILES` dans `src/config.js`, et le nom dans `profiles` des artistes concernés.                                                                    |

## Développement

Aucune dépendance n'est nécessaire pour faire tourner l'extension. Les outils de
développement demandent Node.js ≥ 20 :

```sh
npm install
npm run check    # tout vérifier : manifeste des images, lint, format, tests
npm test         # tests unitaires (node:test)
npm run format   # formater avec Prettier
npm run assets   # régénérer data/assets.json après un ajout d'image
npm run build    # copier l'extension seule dans dist/ (à charger dans Chrome)
```

Pour tester hors extension : `python3 -m http.server` à la racine puis
<http://localhost:8000> (les modules ES et `fetch` ne fonctionnent pas en `file://`).

## Organisation

```
index.html, manifest.json
css/                    styles, un fichier par zone (base, contrôles, horloge…)
data/
  events.json           discographies (anniversaires de sorties)
  assets.json           liste des fonds et photos (générée : npm run assets)
assets/                 images, polices, icônes de l'extension
src/
  main.js               point d'entrée
  config.js             profils, artistes et stores par défaut
  core/                 briques génériques : stockage, migrations, état partagé,
                        modales, liste déroulante, dates, URLs…
  features/             une fonctionnalité par module
    artists/            catalogue (données), barre latérale, onglet de config
    events/             modèle, chargement, bandeau, compte à rebours, ajout
    shortcuts/          données, grille/dossiers, modales
scripts/               update-assets.mjs (manifeste des images), build.mjs (dist/)
tests/                  tests unitaires (modèle, catalogue, migrations, données)
```

Les modules ne s'appellent pas directement pour se rafraîchir : ils émettent et
écoutent des événements via `src/core/state.js` (`profile`, `shortcuts`, `artists`,
`events`, `settings`, `day`).

## Données stockées dans le navigateur

Tout est dans le `localStorage` de l'extension :

| Clé                    | Contenu                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `currentUser`          | dernier profil utilisé                                                                                           |
| `shortcuts_<profil>`   | raccourcis et dossiers                                                                                           |
| `settings_<profil>`    | nom affiché, horloge visible, filtre des événements                                                              |
| `artistPrefs_<profil>` | **différences** par rapport à `src/config.js` : ordre, artistes retirés, stores ajoutés / supprimés / désactivés |
| `customArtists`        | artistes ajoutés dans l'interface (partagés entre profils)                                                       |
| `customEvents`         | sorties ajoutées dans l'interface                                                                                |
| `searchHistory`        | 12 dernières recherches                                                                                          |
| `releaseCache`         | pochettes iTunes du jour                                                                                         |
| `schemaVersion`        | version du format, pour les migrations (`src/core/migrations.js`)                                                |

## Crédits

Polices : _Share Tech Mono_ (SIL Open Font License) et _OPTIPirogi_.
Pochettes : API de recherche iTunes.
