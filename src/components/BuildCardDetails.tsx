import type { Build } from "../models/Build";
import { StatIcon } from "../models/StatIcon";
import { toSlug } from "../models/toSlug";
import { UnitRelations } from "./UnitRelations";
import { BuildRelations } from "./BuildRelations";
import { UpgradeRelations } from "./UpgradeRelations";

type BuildCardDetailsProps = {
  building: Build;
};

export function BuildCardDetails({ building }: BuildCardDetailsProps) {
  return (
    <section className="detail-page page" data-faction={building.faction.id}>
      <a className="button" href="/batiments">
        ← Retour aux bâtiments
      </a>

      <div className="detail-top">
        <div>
          <p className="eyebrow">ARCHIVES / BÂTIMENTS</p>
          <h1>{building.nom}</h1>
        </div>

        <a
          className="detail-faction"
          href={`/batiments?faction=${toSlug(building.faction.id)}`}
        >
          {building.faction.nom}
        </a>
      </div>

      <div className="detail-grid">
        <div className="detail-visual">
          <span className="faction-badge">{building.faction.nom}</span>

          {building.image ? (
            <img src={building.image} alt={building.nom} />
          ) : (
            <p>Image indisponible</p>
          )}
        </div>

        <div className="detail-summary">
          <h2>Caractéristiques</h2>

          <div className="tags">
            {building.attributs.map((attribut) => (
              <span className="tag" key={attribut}>
                {attribut}
              </span>
            ))}
          </div>

          <dl className="stats">
            <div className="stat">
              <dt>Points de vie</dt>
              <dd>
                <StatIcon type="life" />
                {building.pv}
              </dd>
            </div>

            <div className="stat">
              <dt>Armure</dt>
              <dd>
                <StatIcon type="armor" />
                {building.armure}
              </dd>
            </div>

            <div className="stat">
              <dt>Boucliers</dt>
              <dd>
                <StatIcon type="shield" />
                {building.bouclier}
              </dd>
            </div>

            {building.armes.map((arme, index) => (
              <div className="stat" key={index}>
                <dt>DPS — {arme.cible}</dt>
                <dd>
                  <StatIcon type="dps" />
                  {arme.dps}
                </dd>
              </div>
            ))}
          </dl>

          {building.armes.length === 0 && <p>Aucune arme renseignée.</p>}

          <div className="cost-bar">
            <div>
              <small>Minerais</small>
              <strong>{building.cout.minerais}</strong>
            </div>

            <div>
              <small>Gaz</small>
              <strong>{building.cout.gaz}</strong>
            </div>

            <div>
              <small>Temps de construction</small>
              <strong>{building.tempsConstruction} s</strong>
            </div>

            <div>
              <small>Ravitaillement fourni</small>
              <strong>{building.ravitaillementFourni}</strong>
            </div>
          </div>
          {building.produit.length > 0 && (
            <section className="detail-section">
              <h2>Production</h2>

              <UnitRelations
                title="Unités produites"
                units={building.produit}
              />
            </section>
          )}
          {(building.evolueDepuis.length > 0 ||
            building.evolueVers.length > 0) && (
            <section className="detail-section">
              <h2>Évolutions</h2>

              {building.evolueDepuis.length > 0 && (
                <BuildRelations
                  title="Évolue depuis"
                  buildings={building.evolueDepuis}
                />
              )}

              {building.evolueVers.length > 0 && (
                <BuildRelations
                  title="Évolue vers"
                  buildings={building.evolueVers}
                />
              )}
            </section>
          )}
        </div>
      </div>
      <section className="detail-section">
        <h2>Capacités à rechercher</h2>
        <UpgradeRelations title="Recherches disponibles" upgrades={building.capacites} />
      </section>
      <section className="detail-section">
        <h2>Passifs à rechercher</h2>
        <UpgradeRelations title="Recherches disponibles" upgrades={building.passifs} />
      </section>
    </section>
  );
}
