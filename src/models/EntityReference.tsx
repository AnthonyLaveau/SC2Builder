export type EntityReference = {
  id: number;
  type: string;
  nom: string;
  image: string | null;
  faction: {
    id: string;
    nom: string;
  };
};
