import type { Upgrade } from "../models/Upgrade";
import { toSlug } from "../models/toSlug";
import { BuildRelations } from "./BuildRelations";
import { UnitRelations } from "./UnitRelations";

// Typage des propriétés upgrade pour le composant UpgradeCardDetails
type UpgradeCardDetailsProps = {
  upgrade: Upgrade;
};

// Composant UpgradeCardDetails qui affiche les détails d'une amélioration, y compris ses caractéristiques, son coût de recherche, le bâtiment de recherche et les unités affectées
export function UpgradeCardDetails({ upgrade }: UpgradeCardDetailsProps) {
  const unitName = new URLSearchParams(window.location.search).get("unite");
  return (
    <section className="detail-page page" data-faction={upgrade.faction.id}>
      <a className="button" href="/ameliorations">
        ← Retour aux améliorations
      </a>

      <div className="detail-top">
        <div>
          <p className="eyebrow">ARCHIVES / AMÉLIORATIONS</p>
          <h1>{upgrade.nom}</h1>
        </div>

        <a
          className="detail-faction"
          href={`/ameliorations?faction=${toSlug(upgrade.faction.id)}`}
        >
          {upgrade.faction.nom}
        </a>
      </div>

      <div className="detail-grid">
        <div className="detail-visual">
          <span className="faction-badge">{upgrade.faction.nom}</span>

          {upgrade.image ? (
            <img src={upgrade.image} alt={upgrade.nom} />
          ) : (
            <p>Image indisponible</p>
          )}
        </div>

        <div className="detail-summary">
          <h2>Caractéristiques</h2>

          <div className="tags">
            <span className="tag">
              {upgrade.categorie === "capacite" ? "Capacité" : "Passif"}
            </span>
          </div>

          <section className="detail-section">
            <h2>Coût de recherche</h2>

            <div className="cost-bar">
              <div>
                <small>Minerais</small>
                <strong>{upgrade.coutRecherche.minerais} </strong>
                <img
                  src="/src/assets/images/icon-mineral.png"
                  alt="Minerais"
                  className="cost-icon"
                />
              </div>

              <div>
                <small>Gaz</small>
                <strong>{upgrade.coutRecherche.gaz} </strong>
                <img
                  src="/src/assets/images/icon-gas.png"
                  alt="Gaz"
                  className="cost-icon"
                />
              </div>

              <div>
                <small>Temps de recherche</small>
                <strong>{Math.round(upgrade.coutRecherche.temps)}s </strong>
                <img
                  src="/src/assets/images/icon-time-protoss.png"
                  alt="Temps de production"
                  className="cost-icon"
                />
              </div>
            </div>
          </section>

          {upgrade.categorie === "capacite" && (
            <section className="detail-section">
              <h2>Coût d’activation</h2>

              <dl className="stats">
                <div className="stat">
                  <dt>Énergie</dt>
                  <dd>{upgrade.coutActivation.energie ?? "Non renseigné"}</dd>
                </div>

                <div className="stat">
                  <dt>Vie</dt>

                  {upgrade.coutActivationParUnite?.length ? (
                    upgrade.coutActivationParUnite.map((cout) => (
                      <dd key={cout.unite}>
                        {cout.unite} : {cout.vie} PV
                      </dd>
                    ))
                  ) : (
                    <dd>
                      {upgrade.coutActivation.vie != null
                        ? `${upgrade.coutActivation.vie} PV`
                        : "Non renseigné"}
                    </dd>
                  )}
                </div>
              </dl>
            </section>
          )}

          <section className="detail-section">
            <h2>Recherché dans</h2>

            {upgrade.construitDans ? (
              <BuildRelations
                title="Bâtiment de recherche"
                buildings={[
                  {
                    ...upgrade.construitDans,
                    type: "batiment",
                    faction: upgrade.faction,
                  },
                ]}
              />
            ) : (
              <p className="none">Aucun bâtiment renseigné.</p>
            )}
          </section>
        </div>
      </div>
      <section className="detail-section">
        <h2>Unités affectées</h2>

        <UnitRelations title="Unités affectées" units={upgrade.pourUnite} />
      </section>
    </section>
  );
}
