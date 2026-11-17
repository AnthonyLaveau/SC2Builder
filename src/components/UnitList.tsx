import { useState } from "react";
import type { Unit } from "../models/Unit";
import { UnitCard } from "./UnitCard";

type UnitListProps = {
  units: Unit[];
};

export function UnitList({ units }: UnitListProps) {
  const [search, setSearch] = useState("");
  const [faction, setFaction] = useState("all");
  // const [faction, setFaction] = useState(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const factionParam = params.get("faction");

  //   const factionName = ["Terran", "Protoss", "Zerg"].find(
  //     (name) => name.toLowerCase() === factionParam,
  //   );

  //   return factionName ?? "all";
  // });
  const [sortOrder, setSortOrder] = useState("default");
  const [selectedType, setSelectedType] = useState("all");
  // const visibleUnits = units.filter((unit) =>
  //   unit.name.toLowerCase().includes(search.trim().toLowerCase()),
  // );
  const visibleUnits = units.filter((unit) => {
    const matchesSearch = unit.nom
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFaction = faction === "all" || unit.faction.nom === faction;

    const matchesType =
      selectedType === "all" || unit.attributs.includes(selectedType);

    return matchesSearch && matchesFaction && matchesType;
  });

  const sortedUnits = [...visibleUnits].sort((a, b) => {
    if (sortOrder === "az") {
      return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
    }
    if (sortOrder === "za") {
      return b.nom.localeCompare(a.nom, "fr", { sensitivity: "base" });
    }
    return a.id - b.id;
  });
  const availableFactions = [...new Set(units.map((unit) => unit.faction.nom))];
  const availableTypes = [
    ...new Set(units.flatMap((unit) => unit.attributs)),
  ].sort((a, b) => a.localeCompare(b, "fr"));
  function resetFilters() {
    setSearch("");
    setFaction("all");
    setSelectedType("all");
    setSortOrder("default");
  }
  return (
    <>
      <section className="hero">
        <div className="hero-inner page">
          <div className="hero-copy">
            <div className="eyebrow">ARCHIVES / 01 - UNITÉS</div>

            <h1>
              Les forces du <span>secteur.</span>
            </h1>

            <p>
              De la première ligne aux confins de l’espace. Explorez les unités,
              leurs caractéristiques et les technologies qui font la différence.
            </p>
          </div>
        </div>
      </section>

      <section className="catalog page" aria-labelledby="catalog-title">
        <div className="section-heading">
          <h2 id="catalog-title">Répertoire des unités</h2>
        </div>

        <div
          className="faction-tabs"
          role="group"
          aria-label="Filtrer par faction"
        >
          {["all", ...availableFactions].map((value) => (
            <button
              key={value}
              type="button"
              className={`faction-tab ${faction === value ? "active" : ""}`}
              data-faction={value.toLowerCase()}
              onClick={() => setFaction(value)}
            >
              <span>
                <b>{value === "all" ? "Toutes" : value}</b>
              </span>
            </button>
          ))}
        </div>
        <div className="toolbar">
          <div className="search-wrap">
            <label className="control-label" htmlFor="unit-search">
              Recherche
            </label>

            <input
              id="unit-search"
              type="search"
              placeholder="Rechercher une unité…"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="unit-type">
              Type d’unité
            </label>

            <select
              id="unit-type"
              value={selectedType}
              onChange={(event) => setSelectedType(event.currentTarget.value)}
            >
              <option value="all">Tous les types</option>

              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="unit-sort">
              Trier par
            </label>

            <select
              id="unit-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.currentTarget.value)}
            >
              <option value="default">Par défaut</option>
              <option value="az">Nom : A → Z</option>
              <option value="za">Nom : Z → A</option>
            </select>
          </div>
          <button
            type="button"
            className="reset"
            onClick={resetFilters}
            aria-label="Réinitialiser les filtres et le tri"
            title="Réinitialiser les filtres et le tri"
          >
            ↺
          </button>
        </div>

        <div className="results-line">
          <span role="status">
            {visibleUnits.length} / {units.length} unités affichées
          </span>
        </div>

        <div className="cards">
          {sortedUnits.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>

        {visibleUnits.length === 0 && <p>Aucune unité à afficher.</p>}
      </section>
    </>
  );
}
