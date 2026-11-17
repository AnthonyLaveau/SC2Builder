import type { EntityReference } from "../models/EntityReference";
import { toSlug } from "../models/toSlug";

// Typage des propriétés title et buildings pour le composant BuildRelations
type BuildRelationsProps = {
  title: string;
  buildings: EntityReference[];
};

// Composant BuildRelations qui affiche une liste de bâtiments liés à une entité (unité ou amélioration)
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
