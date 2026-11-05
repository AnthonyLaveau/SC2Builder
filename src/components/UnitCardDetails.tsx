import type { Unit } from "../models/Unit";
import { toSlug } from "../models/toSlug";
import { StatIcon } from "../models/StatIcon";
import { UnitRelations } from "./UnitRelations";
import { BuildRelations } from "./BuildRelations";

type UnitCardDetailsProps = {
  unit: Unit;
  onBack: () => void;
};

// export function UnitCardDetails({ unit, onBack }: UnitCardDetailsProps) {
//   return (
//     <section
//       className="detail-page page"
//       data-faction={toSlug(unit.faction.nom)}
//     >
//       <button type="button" className="button" onClick={onBack}>
//         ← Retour aux unités
//       </button>

//       <div className="detail-top">
//         <h1>{unit.nom}</h1>
//       </div>

//       <div className="detail-grid">
//         <div className="detail-visual">
//           {unit.image && <img src={unit.image} alt={unit.nom} loading="lazy" />}
//           {/* <img src="{unit.image}" alt={unit.nom} /> */}
//         </div>

//         <div className="detail-summary">
//           <p>Faction : {unit.faction.nom}</p>
//           <p>{unit.attributs.join(" · ")}</p>

//           <h2>Caractéristiques</h2>
//           <ul>
//             <li>Points de vie : {unit.pv}</li>
//             <li>Boucliers : {unit.bouclier}</li>
//             {/* <li>Dégâts : {unit.armes.dps}</li> */}
//             <li>Minerais : {unit.cout.minerais}</li>
//             <li>Gaz : {unit.cout.gaz}</li>
//             <li>Temps de production : {unit.tempsProduction} s</li>
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

export function UnitCardDetails({ unit, onBack }: UnitCardDetailsProps) {
  return (
    <section className="detail-page page" data-faction={unit.faction.id}>
      <button type="button" className="button" onClick={onBack}>
        ← Retour aux unités
      </button>

      <div className="detail-top">
        <div>
          <p className="eyebrow">ARCHIVES / UNITÉS</p>
          <h1>{unit.nom}</h1>
        </div>

        {/* <span className="detail-faction">{unit.faction.nom}</span> */}
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
              <strong>{unit.cout.minerais}</strong>
            </div>

            <div>
              <small>Gaz</small>
              <strong>{unit.cout.gaz}</strong>
            </div>

            <div>
              <small>Gaz</small>
              <strong>{unit.tempsProduction}</strong>
            </div>

            <div>
              <small>Ravitaillement</small>
              <strong>{unit.cout.ravitaillement}</strong>
            </div>
          </div>
          {/* <section className="detail-section">
            <h2>Produit dans / à partir de</h2>

            <div className="relation-box">
              {unit.produitDans.map((source) => (
                <a
                  key={`${source.type}-${source.id}`}
                  className="relation-item"
                  href={`/${source.type === "batiment" ? "batiments" : "unites"}/${toSlug(source.faction.id)}/${toSlug(source.nom)}`}
                >
                  {source.image && (
                    <img src={source.image} alt="" loading="lazy" />
                  )}

                  <b>{source.nom}</b>

                  <span className="relation-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              ))}

              {unit.produitDans.length === 0 && (
                <p className="none">Aucune source de production renseignée.</p>
              )}
            </div>
            {unit.evolueVers.length > 0 && (
              <section className="detail-section">
                <h2>Évolution</h2>

                <UnitRelations title="Évolue vers" units={unit.evolueVers} />
              </section>
            )}
          </section> */}
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

        <div className="relation-box">
          {unit.capacites.map((capacite) => (
            <a
              key={capacite.id}
              className="relation-item"
              href={`/capacites/${toSlug(capacite.faction.id)}/${toSlug(capacite.nom)}`}
            >
              {capacite.image && (
                <img src={capacite.image} alt="" loading="lazy" />
              )}

              <b>{capacite.nom}</b>

              <span className="relation-arrow" aria-hidden="true">
                →
              </span>
            </a>
          ))}

          {unit.capacites.length === 0 && (
            <p className="none">Aucune capacité renseignée.</p>
          )}
        </div>
      </section>
    </section>
  );
}
