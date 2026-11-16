import { useState } from "react";
import type { Build } from "../models/Build";
import { BuildCard } from "./BuildCard";

type BuildListProps = {
  buildings: Build[];
};

export function BuildList({ buildings }: BuildListProps) {
  const [search, setSearch] = useState("");
  const [faction, setFaction] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const visibleBuildings = buildings.filter((building) => {
    const matchesSearch = building.nom
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFaction =
      faction === "all" || building.faction.nom === faction;

    return matchesSearch && matchesFaction;
  });

  const sortedBuildings = [...visibleBuildings].sort((a, b) => {
    if (sortOrder === "az") {
      return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
    }
    if (sortOrder === "za") {
      return b.nom.localeCompare(a.nom, "fr", { sensitivity: "base" });
    }
    return a.id - b.id;
  });
  function resetFilters() {
    setSearch("");
    setFaction("all");
    setSortOrder("default");
  }
  return (
    <>
      <section className="hero">
        <div className="hero-inner page">
          <div className="hero-copy">
            <div className="eyebrow">ARCHIVES / 01 - BÂTIMENTS</div>

            <h1>
              Les bâtiments du <span>secteur.</span>
            </h1>

            <p>
              De la première ligne aux confins de l’espace. Explorez les
              bâtiments, leurs caractéristiques et les technologies qui font la
              différence.
            </p>
          </div>
        </div>
      </section>

      <section className="catalog page" aria-labelledby="catalog-title">
        <div className="section-heading">
          <h2 id="catalog-title">Répertoire des bâtiments</h2>
        </div>

        <div
          className="faction-tabs"
          role="group"
          aria-label="Filtrer par faction"
        >
          {["all", "Terran", "Protoss", "Zerg"].map((value) => (
            <button
              key={value}
              type="button"
              className={`faction-tab ${faction === value ? "active" : ""}`}
              data-faction={value.toLowerCase()}
              aria-pressed={faction === value}
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
            <label className="control-label" htmlFor="building-search">
              Recherche
            </label>

            <input
              id="building-search"
              type="search"
              placeholder="Rechercher un bâtiment…"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="building-sort">
              Trier par
            </label>

            <select
              id="building-sort"
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
            {visibleBuildings.length} / {buildings.length} bâtiments affichées
          </span>
        </div>

        <div className="cards">
          {sortedBuildings.map((building) => (
            <BuildCard key={building.id} building={building} />
          ))}
        </div>

        {visibleBuildings.length === 0 && <p>Aucune bâtiments à afficher.</p>}
      </section>
    </>
  );
}
