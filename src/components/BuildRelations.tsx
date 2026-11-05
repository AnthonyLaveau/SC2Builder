import type { EntityReference } from "../models/EntityReference";
import { toSlug } from "../models/toSlug";

type BuildRelationsProps = {
  title: string;
  buildings: EntityReference[];
};

export function BuildRelations({ title, buildings }: BuildRelationsProps) {
  return (
    <div className="relation-box">
      <h3>{title}</h3>

      {buildings.map((building) => (
        <a
          key={building.id}
          className="relation-item"
          href={`/batiments/${toSlug(building.faction.id)}/${toSlug(building.nom)}`}
        >
          {building.image && <img src={building.image} alt="" loading="lazy" />}

          <b>{building.nom}</b>

          <span className="relation-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ))}
    </div>
  );
}
