import type { EntityReference } from "../models/EntityReference";
import { toSlug } from "../models/toSlug";

type UnitRelationsProps = {
  title: string;
  units: EntityReference[];
};

export function UnitRelations({ title, units }: UnitRelationsProps) {
  return (
    <div className="relation-box">
      <h3>{title}</h3>

      {units.map((relatedUnit) => (
        <a
          key={relatedUnit.id}
          className="relation-item"
          href={`/unites/${toSlug(relatedUnit.faction.id)}/${toSlug(relatedUnit.nom)}`}
        >
          {relatedUnit.image && (
            <img src={relatedUnit.image} alt="" loading="lazy" />
          )}

          <b>{relatedUnit.nom}</b>

          <span className="relation-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ))}

      {units.length === 0 && <p className="none">Aucune unité renseignée.</p>}
    </div>
  );
}
