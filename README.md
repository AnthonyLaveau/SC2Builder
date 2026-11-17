# SC2Builder

SC2Builder est une encyclopédie interactive en français consacrée à **StarCraft II**, développée en binôme dans le cadre d’un projet front-end de deuxième année à l’EPSI Bordeaux. Elle permet d’explorer les unités, les bâtiments et les améliorations des trois factions du jeu : Terran, Zerg et Protoss.

L’interface reprend l’idée de la maquette HTML/CSS du projet : consulter les archives du secteur de Koprulu comme une base de données du jeu. Les cartes illustrées servent de point d’entrée. Chaque fiche relie un élément à ceux qui lui sont associés.

## Explorer le catalogue

| Rubrique | Ce qu’on peut y faire |
| --- | --- |
| Unités | Rechercher une unité par nom, filtrer par faction ou par type et trier les résultats par ordre alphabétique. Ouvrir sa fiche pour consulter ses caractéristiques, ses conditions de production, ses forces, ses faiblesses, ses capacités et ses passifs. |
| Bâtiments | Parcourir les bâtiments de chaque faction et ouvrir leur fiche pour consulter leurs caractéristiques et suivre les liens vers les éléments associés. |
| Améliorations | Explorer les capacités et les passifs, puis ouvrir une fiche pour retrouver les unités concernées. |

Par exemple, depuis l’accueil, on peut sélectionner la faction **Terran**, rechercher le **Marine**, puis ouvrir sa fiche. Dans la rubrique « Produit dans / à partir de », un clic sur **Caserne** mène directement à la fiche du bâtiment qui le produit.

## Technologies et organisation

| Technologie | Rôle dans le projet |
| --- | --- |
| React | Affiche les listes et les fiches à partir de composants réutilisables et actualise les résultats lorsque les filtres changent. |
| TypeScript | Décrit les unités, les bâtiments, les améliorations et leurs relations dans les [modèles](src/models). |
| CSS | Définit l’apparence des cartes, des fiches et de la navigation. |
| JSON | Regroupe les [données du jeu](src/data/sc2_fusionne.json) utilisées directement par le front-end. |
| Vite et Oxlint | Vite lance le serveur de développement et génère la version de production. Oxlint analyse le code. |

La [navigation](src/App.tsx) utilise l’adresse de la page pour choisir le [composant](src/components) à afficher. L’accueil ouvre la liste des unités. Chaque fiche possède sa propre URL, par exemple `/unites/terran/marine`.

## Lancer le projet en local

Avec Node.js et npm installés, exécuter ces commandes à la racine du dépôt :

```bash
npm ci
npm run dev
```

Ouvrir l’adresse affichée par Vite dans le terminal.

| Commande | Action |
| --- | --- |
| `npm run lint` | Analyser le code avec Oxlint. |
| `npm run build` | Vérifier les types avec TypeScript et générer le site dans `dist/`. |
| `npm run preview` | Prévisualiser localement la version générée après le build. |
