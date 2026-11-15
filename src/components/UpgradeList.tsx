import { useState } from "react";
import type { Upgrade } from "../models/Upgrade";
import { UpgradeCard } from "./UpgradeCard";

type UpgradeListProps = {
  upgrades: Upgrade[];
};

export function UpgradeList({ upgrades }: UpgradeListProps) {
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
  const [filterOrder, setFilterOrder] = useState("all");
  const visibleUpgrades = upgrades.filter((upgrade) => {
    const matchesSearch = upgrade.nom
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFaction = faction === "all" || upgrade.faction.nom === faction;

    const matchesFilter =
      filterOrder === "all" || upgrade.categorie === filterOrder;

    return matchesSearch && matchesFaction && matchesFilter;
  });

  const sortedUpgrades = [...visibleUpgrades].sort((a, b) => {
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
            <div className="eyebrow">ARCHIVES / 03 - AMÉLIORATIONS</div>

            <h1>
              Les améliorations du <span>secteur.</span>
            </h1>

            <p>
              De la première ligne aux confins de l’espace. Explorez les
              capacités, leurs caractéristiques et les technologies qui font la
              différence.
            </p>
          </div>
        </div>
      </section>

      <section className="catalog page" aria-labelledby="catalog-title">
        <div className="section-heading">
          <h2 id="catalog-title">Répertoire des améliorations</h2>
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
            <label className="control-label" htmlFor="capacity-search">
              Recherche
            </label>

            <input
              id="capacity-search"
              type="search"
              placeholder="Rechercher une amélioration…"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="capacity-sort">
              Trier par
            </label>

            <select
              id="capacity-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.currentTarget.value)}
            >
              <option value="default">Par défaut</option>
              <option value="az">Nom : A → Z</option>
              <option value="za">Nom : Z → A</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label" htmlFor="capacity-sort">
              Filtrer par
            </label>

            <select
              id="capacity-sort"
              value={filterOrder}
              onChange={(event) => setFilterOrder(event.currentTarget.value)}
            >
              <option value="all">Tous les types</option>
              <option value="capacite">Capacités</option>
              <option value="passif">Passifs</option>
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
            {visibleUpgrades.length} / {upgrades.length} améliorations affichées
          </span>
        </div>

        <div className="cards">
          {sortedUpgrades.map((upgrade) => (
            <UpgradeCard
              key={`${upgrade.categorie}-${upgrade.id}`}
              upgrade={upgrade}
            />
          ))}
        </div>

        {visibleUpgrades.length === 0 && <p>Aucune amélioration à afficher.</p>}
      </section>
    </>
  );
}
