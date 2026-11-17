import type { Unit } from "../models/Unit";
import { toSlug } from "../models/toSlug";

type UnitCardProps = {
  unit: Unit;
};

export function UnitCard({ unit }: UnitCardProps) {
  return (
    <a href={`/unites/${toSlug(unit.faction.nom)}/${toSlug(unit.nom)}`}>
      <article
        className="entity-card"
        data-faction={unit.faction.nom.toLowerCase()}
      >
        <div className="card-visual">
          <span className="faction-badge">{unit.faction.nom}</span>
          {unit.image && <img src={unit.image} alt={unit.nom} loading="lazy" />}
          {/* <img src="{unit.image}" alt={unit.nom} loading="lazy" /> */}
        </div>

        <div className="card-body">
          <div className="card-title-line">
            <h3>{unit.nom}</h3>
          </div>

          <p className="card-type">{unit.attributs.join(" · ")}</p>

          <div className="card-meta">
            <span className="resource" title="Minerais">
              <i className="mineral" aria-hidden="true" />
              <span className="sr-only">Minerais : </span>
              {unit.cout.minerais}
            </span>

            <span className="resource" title="Gaz">
              <i className="gas" aria-hidden="true" />
              <span className="sr-only">Gaz : </span>
              {unit.cout.gaz}
            </span>

            <span className="time">{Math.round(unit.tempsProduction)} s</span>
          </div>
        </div>
      </article>
    </a>
  );
}
