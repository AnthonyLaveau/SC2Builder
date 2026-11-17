import type { Unit } from "../models/Unit";
import { toSlug } from "../models/toSlug";
import { StatIcon } from "../models/StatIcon";
import { UnitRelations } from "./UnitRelations";
import { BuildRelations } from "./BuildRelations";
import { UpgradeRelations } from "./UpgradeRelations";

export function UnitCardDetails({ unit }: { unit: Unit }) {
  return (
    <section className="detail-page page" data-faction={unit.faction.id}>
      <a className="button" href="/unites">
        ← Retour aux unités
      </a>

      <div className="detail-top">
        <div>
          <p className="eyebrow">ARCHIVES / UNITÉS</p>
          <h1>{unit.nom}</h1>
        </div>

        <a
          className="detail-faction"
          href={`/unites?faction=${toSlug(unit.faction.id)}`}
        >
          {unit.faction.nom}
        </a>
      </div>

      <div className="detail-grid">
        <div className="detail-visual">
          <span className="faction-badge">{unit.faction.nom}</span>

          {unit.image ? (
            <img src={unit.image} alt={unit.nom} />
          ) : (
            <p>Image indisponible</p>
          )}
        </div>

        <div className="detail-summary">
          <h2>Caractéristiques</h2>

          <div className="tags">
            {unit.attributs.map((attribut) => (
              <span className="tag" key={attribut}>
                {attribut}
              </span>
            ))}
          </div>

          <dl className="stats">
            <div className="stat">
              <dt>Points de vie</dt>
              <dd>
                <StatIcon type="life" /> {unit.pv}
              </dd>
            </div>

            <div className="stat">
              <dt>Armure</dt>
              <dd>
                <StatIcon type="armor" /> {unit.armure}
              </dd>
            </div>

            <div className="stat">
              <dt>Boucliers</dt>
              <dd>
                <StatIcon type="shield" /> {unit.bouclier}
              </dd>
            </div>

            {unit.armes.map((arme, index) => (
              <div className="stat" key={index}>
                <dt>DPS — {arme.cible}</dt>
                <dd>
                  <StatIcon type="dps" />
                  {arme.dps}
                </dd>
              </div>
            ))}
          </dl>

          {unit.armes.length === 0 && <p>Aucune arme renseignée.</p>}

          <div className="cost-bar">
            <div>
              <small>Minerais</small>
              <strong>{unit.cout.minerais} </strong>
              <img
                src="/src/assets/images/icon-mineral.png"
                alt="Minerais"
                className="cost-icon"
              />
            </div>

            <div>
              <small>Gaz</small>
              <strong>{unit.cout.gaz} </strong>
              <img
                src="/src/assets/images/icon-gas.png"
                alt="Gaz"
                className="cost-icon"
              />
            </div>

            <div>
              <small>Temps de production</small>
              <strong>{Math.round(unit.tempsProduction)}s </strong>
              <img
                src="/src/assets/images/icon-time-protoss.png"
                alt="Temps de production"
                className="cost-icon"
              />
            </div>
            <div>
              <small>Ravitaillement</small>
              <strong>{unit.cout.ravitaillement} </strong>
              <img
                src="/src/assets/images/icon-supply-terran.png"
                alt="Ravaitaillement"
                className="cost-icon"
              />
            </div>
          </div>

          <section className="detail-section">
            <h2>Produit dans / à partir de</h2>

            {unit.produitDans.some((source) => source.type === "batiment") && (
              <BuildRelations
                title="Bâtiments"
                buildings={unit.produitDans.filter(
                  (source) => source.type === "batiment",
                )}
              />
            )}

            {unit.produitDans.some((source) => source.type === "unite") && (
              <UnitRelations
                title="Unités"
                units={unit.produitDans.filter(
                  (source) => source.type === "unite",
                )}
              />
            )}

            {unit.produitDans.length === 0 && (
              <p className="none">Aucune source de production renseignée.</p>
            )}
          </section>
        </div>
      </div>

      <section className="detail-section">
        <h2>Forces et faiblesses</h2>

        <div className="matchups">
          <UnitRelations title="Fort contre" units={unit.fortContre} />

          <UnitRelations title="Faible contre" units={unit.faibleContre} />
        </div>
      </section>

      <section className="detail-section">
        <h2>Capacités</h2>
        <UpgradeRelations
          title="Capacités disponibles"
          upgrades={unit.capacites}
        />
      </section>
      <section className="detail-section">
        <h2>Passifs</h2>
        <UpgradeRelations title="Passifs disponibles" upgrades={unit.passifs} />
      </section>
    </section>
  );
}
