import type { Build } from "../models/Build";
import { toSlug } from "../models/toSlug";

//typage de la propriété building pour le composant BuildCard
type BuildCardProps = {
  building: Build;
};

// Composant BuildCard qui affiche les informations d'un bâtiment sous forme de carte cliquable
export function BuildCard({ building }: BuildCardProps) {
  return (
    <a
      href={`/batiments/${toSlug(building.faction.id)}/${toSlug(building.nom)}`}
    >
      <article className="entity-card" data-faction={building.faction.id}>
        <div className="card-visual">
          <span className="faction-badge">{building.faction.nom}</span>
          {/* Affiche l'image du bâtiment si elle est disponible, sinon affiche un message indiquant que l'image est indisponible */}
          {building.image && (
            <img src={building.image} alt={building.nom} loading="lazy" />
          )}
        </div>

        <div className="card-body">
          <div className="card-title-line">
            <h3>{building.nom}</h3>
          </div>

          <p className="card-type">{building.attributs.join(" · ")}</p>

          <div className="card-meta">
            <span className="resource" title="Minerais">
              <i className="mineral" aria-hidden="true" />
              <span className="sr-only">Minerais : </span>
              {building.cout.minerais}
            </span>

            <span className="resource" title="Gaz">
              <i className="gas" aria-hidden="true" />
              <span className="sr-only">Gaz : </span>
              {building.cout.gaz}
            </span>

            <span className="time">
              {Math.round(building.tempsConstruction)} s
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
