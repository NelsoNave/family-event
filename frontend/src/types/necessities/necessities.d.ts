export type NecessitiesType = {
  id: string;
  item: string;
};

export type HostNecessitiesType = {
  necessities: NecessitiesType[];
  noteForNecessities: string;
};
