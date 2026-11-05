export type Capacity = {
  readonly id: number;
  name: string;
  faction: "Protoss" | "Terran" | "Zerg";
  img: string;
  delay: number;
  costMin: number;
  costGaz: number;
  unit: number[];
  buildIn: number;
};
