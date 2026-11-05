// import { Header } from "./components/Header";
// import { demoUnits } from "./data/demoUnits";
// import { UnitList } from "./components/UnitList";
// import type { Unit } from "./models/Unit";
// import "./App.css";

// type AppProps = {
//   units?: Unit[];
//   onSelect?: (unitId: number) => void;
// };

// //function App({ units = [], onSelect }: AppProps) {
// function App({ units = demoUnits, onSelect }: AppProps) {
//   return (
//     <>
//       <Header />

//       <main>
//         <UnitList units={units} onSelect={onSelect} />
//       </main>
//     </>
//   );
// }

// export default App;

// import { useState } from "react";
import { Header } from "./components/Header";
import { UnitList } from "./components/UnitList";
import { UnitCardDetails } from "./components/UnitCardDetails";
// import { demoUnits } from "./data/demoUnits";
// import data from "./data/sc2.json";
import data from "./data/sc2_fusionne.json";
import type { Unit } from "./models/Unit";
import "./App.css";
import { toSlug } from "./models/toSlug";
import { BuildList } from "./components/BuildList";
import { BuildCardDetails } from "./components/BuildCardDetails";

type AppProps = {
  units?: Unit[];
};

// function App({ units = data.unites }: AppProps) {
//   const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

//   const selectedUnit = units.find((unit) => unit.id === selectedUnitId);

//   return (
//     <>
//       <Header />

//       <main>
//         <div hidden={selectedUnit !== undefined}>
//           <UnitList units={units} onSelect={setSelectedUnitId} />
//         </div>

//         {selectedUnit && (
//           <UnitCardDetails
//             unit={selectedUnit}
//             onBack={() => setSelectedUnitId(null)}
//           />
//         )}
//       </main>
//     </>
//   );
// }

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
