// Composants React utilisés pour afficher l'en-tête, les listes et les fiches détaillées.
import { Header } from "./components/Header";
import { UnitList } from "./components/UnitList";
import { UnitCardDetails } from "./components/UnitCardDetails";
import data from "./data/sc2_fusionne.json";
import "./App.css";
import { toSlug } from "./models/toSlug";
import { BuildList } from "./components/BuildList";
import { BuildCardDetails } from "./components/BuildCardDetails";
import { UpgradeList } from "./components/UpgradeList";
import { UpgradeCardDetails } from "./components/UpgradeCardDetails";
import type { Upgrade } from "./models/Upgrade";
import { Footer } from "./components/Footer";

// Réunit les capacités et les passifs dans un seul tableau d'améliorations.
// Upgrade[] indique que chaque élément du tableau doit respecter le type Upgrade.
const upgrades: Upgrade[] = [
  ...data.ameliorations.capacites.map(
    (capacity): Upgrade => ({
      ...capacity,
      categorie: "capacite",

      // Recherche les unités concernées par cette capacité dans le JSON.
      pourUnite: data.unites
        .filter((unit) =>
          capacity.pourUnite.some((reference) => reference.id === unit.id),
        )
        .map((unit) => ({
          id: unit.id,
          type: "unite",
          nom: unit.nom,
          image: unit.image,
          faction: unit.faction,
        })),
    }),
  ),

  ...data.ameliorations.passifs.map(
    (passive): Upgrade => ({
      ...passive,
      categorie: "passif",

      // Recherche les unités qui possèdent ce passif.
      pourUnite: data.unites
        .filter((unit) =>
          unit.passifs.some((reference) => reference.id === passive.id),
        )
        .map((unit) => ({
          id: unit.id,
          type: "unite",
          nom: unit.nom,
          image: unit.image,
          faction: unit.faction,
        })),
    }),
  ),
];

// Composant principal de l'application qui gère la navigation et l'affichage des différentes pages.
function App() {
  const path = window.location.pathname;

  // Recherche de l'unité, du bâtiment ou de l'amélioration correspondant à l'URL actuelle.
  const selectedUnit = data.unites.find(
    (unit) => path === `/unites/${toSlug(unit.faction.id)}/${toSlug(unit.nom)}`,
  );

  // Recherche du bâtiment correspondant à l'URL actuelle.
  const selectedBuilding = data.batiments.find(
    (building) =>
      path ===
      `/batiments/${toSlug(building.faction.id)}/${toSlug(building.nom)}`,
  );

  // Recherche de l'amélioration correspondant à l'URL actuelle.
  const selectedUpgrade = upgrades.find(
    (upgrade) =>
      path ===
      `/ameliorations/${upgrade.categorie}/${toSlug(upgrade.faction.id)}/${toSlug(upgrade.nom)}`,
  );

  // Contient le composant JSX correspondant à l'adresse courante.
  let content;

  // 1. Accueil et 2. Liste des unités
  if (path === "/" || path === "/unites") {
    content = <UnitList units={data.unites} />;

    // 3. Détail d’une unité
  } else if (selectedUnit) {
    content = <UnitCardDetails unit={selectedUnit} />;

    // 4. Liste des bâtiments
  } else if (path === "/batiments") {
    content = <BuildList buildings={data.batiments} />;

    // 5. Détail d’un bâtiment
  } else if (selectedBuilding) {
    content = <BuildCardDetails building={selectedBuilding} />;

    // 6. Liste des améliorations
  } else if (path === "/ameliorations") {
    content = <UpgradeList upgrades={upgrades} />;

    // 7. Détail d’une amélioration
  } else if (selectedUpgrade) {
    content = <UpgradeCardDetails upgrade={selectedUpgrade} />;

    // Adresse inconnue
  } else {
    content = (
      <section className="page">
        <h1>Page introuvable</h1>
        <a href="/unites">Retour aux unités</a>
      </section>
    );
  }
  // Renvoie le JSX qui décrit l'interface à afficher.
  return (
    // Ce fragment regroupe plusieurs éléments sans ajouter de balise HTML.
    <>
      {/* En-tête commun à toutes les pages. */}
      <Header />

      <main>{content}</main>

      <Footer />
    </>
  );
}

export default App;
