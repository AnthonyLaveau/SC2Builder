import type { Upgrade } from "../models/Upgrade";
import { toSlug } from "../models/toSlug";
import { BuildRelations } from "./BuildRelations";
import { UnitRelations } from "./UnitRelations";

type UpgradeCardDetailsProps = {
  upgrade: Upgrade;
};

export function UpgradeCardDetails({ upgrade }: UpgradeCardDetailsProps) {
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
                <strong>{upgrade.coutRecherche.minerais}</strong>
              </div>

              <div>
                <small>Gaz</small>
                <strong>{upgrade.coutRecherche.gaz}</strong>
              </div>

              <div>
                <small>Temps de recherche</small>
                <strong>{upgrade.coutRecherche.temps} s</strong>
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
                  <dd>{upgrade.coutActivation.vie ?? "Non renseigné"}</dd>
                </div>
              </dl>

              {upgrade.coutActivationParUnite?.map((cout) => (
                <p key={cout.unite}>
                  {cout.unite} : {cout.vie} points de vie par activation.
                </p>
              ))}
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
    </section>
  );
}
