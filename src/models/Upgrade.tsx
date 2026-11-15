import type { EntityReference } from "./EntityReference";

type UpgradeEntity = {
  id: number;
  nom: string;
  image: string | null;
};

type UpgradeBase = {
  readonly id: number;
  nom: string;
  image: string | null;
  faction: {
    id: string;
    nom: string;
  };
  coutRecherche: {
    minerais: number;
    gaz: number;
    temps: number;
  };
  construitDans: UpgradeEntity | null;
  pourUnite: EntityReference[];
};

export type Upgrade =
  | (UpgradeBase & {
      categorie: "capacite";
      coutActivation: {
        energie: number | null;
        vie: number | null;
      };
      coutActivationParUnite?: {
        unite: string;
        vie: number;
      }[];
    })
  | (UpgradeBase & {
      categorie: "passif";
    });
