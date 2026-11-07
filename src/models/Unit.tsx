// export type Unit = {
//   readonly id: number;
//   name: string;
//   faction: "Protoss" | "Terran" | "Zerg";
//   img: string;
//   attributes: string[];
//   life: number;
//   shield: number;
//   dmg: number;
//   delay: number;
//   buildIn: number;
//   costMin: number;
//   costGaz: number;
//   capacities: number[];
//   strong: number[];
//   weak: number[];
// };

import type { EntityReference } from "./EntityReference";

export type Unit = {
  readonly id: number;
  nom: string;
  faction: {
    id: string;
    nom: string;
    image: string | null;
    lien: string;
  };
  image: string | null;
  attributs: string[];
  aerienne: boolean;
  pv: number;
  bouclier: number;
  armure: number;
  cout: {
    minerais: number;
    gaz: number;
    ravitaillement: number;
  };
  tempsProduction: number;
  armes: {
    dps: number;
    cible: string;
  }[];
  produitDans: EntityReference[];
  fortContre: EntityReference[];
  faibleContre: EntityReference[];
  capacites: EntityReference[];
  passifs: EntityReference[];
  evolueVers: EntityReference[];
};
