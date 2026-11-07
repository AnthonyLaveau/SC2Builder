import type { EntityReference } from "../models/EntityReference";
import { toSlug } from "../models/toSlug";

type UpgradeRelationsProps = {
  title: string;
  upgrades: EntityReference[];
};

export function UpgradeRelations({ title, upgrades }: UpgradeRelationsProps) {
  return (
    <div className="relation-box">
      <h3>{title}</h3>

      {upgrades.map((upgrade) => (
        <a
          key={`${upgrade.type}-${upgrade.id}`}
          className="relation-item"
          href={`/ameliorations/${upgrade.type}/${toSlug(upgrade.faction.id)}/${toSlug(upgrade.nom)}`}
        >
          {upgrade.image && <img src={upgrade.image} alt="" loading="lazy" />}

          <b>{upgrade.nom}</b>

          <span className="relation-arrow" aria-hidden="true">
            →
          </span>
        </a>
      ))}

      {upgrades.length === 0 && (
        <p className="none">Aucune amélioration renseignée.</p>
      )}
    </div>
  );
}
