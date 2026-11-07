import type { Upgrade } from "../models/Upgrade";
import { toSlug } from "../models/toSlug";

type UpgradeCardProps = {
  upgrade: Upgrade;
};

export function UpgradeCard({ upgrade }: UpgradeCardProps) {
  return (
    <a
      href={`/ameliorations/${upgrade.categorie}/${toSlug(upgrade.faction.id)}/${toSlug(upgrade.nom)}`}
    >
      <article className="entity-card" data-faction={upgrade.faction.id}>
        <div className="card-visual">
          <span className="faction-badge">{upgrade.faction.nom}</span>

          {upgrade.image && (
            <img src={upgrade.image} alt={upgrade.nom} loading="lazy" />
          )}
        </div>

        <div className="card-body">
          <div className="card-title-line">
            <h3>{upgrade.nom}</h3>
          </div>

          <p className="card-type">
            {upgrade.categorie === "capacite" ? "Capacité" : "Passif"}
          </p>

          <div className="card-meta">
            <span className="resource" title="Minerais">
              <i className="mineral" aria-hidden="true" />
              <span className="sr-only">Minerais : </span>
              {upgrade.coutRecherche.minerais}
            </span>

            <span className="resource" title="Gaz">
              <i className="gas" aria-hidden="true" />
              <span className="sr-only">Gaz : </span>
              {upgrade.coutRecherche.gaz}
            </span>

            <span className="time">{upgrade.coutRecherche.temps} s</span>
          </div>
        </div>
      </article>
    </a>
  );
}
