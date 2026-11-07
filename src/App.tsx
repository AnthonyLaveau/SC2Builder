import { Header } from "./components/Header";
import { UnitList } from "./components/UnitList";
import { UnitCardDetails } from "./components/UnitCardDetails";
import data from "./data/sc2_fusionne.json";
import type { Unit } from "./models/Unit";
import "./App.css";
import { toSlug } from "./models/toSlug";
import { BuildList } from "./components/BuildList";
import { BuildCardDetails } from "./components/BuildCardDetails";
import { UpgradeList } from "./components/UpgradeList";
import { UpgradeCardDetails } from "./components/UpgradeCardDetails";
import type { Upgrade } from "./models/Upgrade";

const upgrades: Upgrade[] = [
  ...data.ameliorations.capacites.map(
    (capacity): Upgrade => ({
      ...capacity,
      categorie: "capacite",
    }),
  ),

  ...data.ameliorations.passifs.map(
    (passive): Upgrade => ({
      ...passive,
      categorie: "passif",
    }),
  ),
];

type AppProps = {
  units?: Unit[];
};

function App({ units = data.unites }: AppProps) {
  const path = window.location.pathname;

  const selectedUnit = units.find(
    (unit) =>
      path === `/unites/${toSlug(unit.faction.nom)}/${toSlug(unit.nom)}`,
  );
  const selectedBuilding = data.batiments.find(
    (building) =>
      path ===
      `/batiments/${toSlug(building.faction.id)}/${toSlug(building.nom)}`,
  );
  const selectedUpgrade = upgrades.find(
    (upgrade) =>
      path ===
      `/ameliorations/${upgrade.categorie}/${toSlug(upgrade.faction.id)}/${toSlug(upgrade.nom)}`,
  );
  const isListing = path === "/" || path === "/unites";

  return (
    <>
      <Header />

      <main>
        {isListing ? (
          <UnitList units={units} />
        ) : path === "/batiments" ? (
          <BuildList buildings={data.batiments} />
        ) : selectedUnit ? (
          <UnitCardDetails
            unit={selectedUnit}
            onBack={() => {
              window.location.href = "/unites";
            }}
          />
        ) : selectedBuilding ? (
          <BuildCardDetails building={selectedBuilding} />
        ) : selectedUpgrade ? (
          <UpgradeCardDetails upgrade={selectedUpgrade} />
        ) : path === "/ameliorations" ? (
          <UpgradeList upgrades={upgrades} />
        ) : (
          <section className="page">
            <h1>Page introuvable</h1>
            <a href="/unites">Retour aux unités</a>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
