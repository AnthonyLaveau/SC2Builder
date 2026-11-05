import type { EntityReference } from "./EntityReference";

export type Build = {
  readonly id: number;
  nom: string;
  faction: {
    id: string;
    nom: string;
  };
  image: string | null;
  attributs: string[];
  cout: {
    minerais: number;
    gaz: number;
    ravitaillement: number;
  };
  tempsConstruction: number;
  pv: number;
  bouclier: number;
  armure: number;
  ravitaillementFourni: number;
  armes: {
    dps: number;
    cible: string;
  }[];
  produit: EntityReference[];
  evolueVers: EntityReference[];
  evolueDepuis: EntityReference[];
};
