export type BaseNecessityType = {
  id: string;
  item: string;
};

export type GuestNecessityType = BaseNecessityType & {
  isAdded: boolean;
};

export type HostNecessitiesListType = {
  necessities: BaseNecessityType[];
  noteForNecessities?: string;
};

export type HostNecessitiesPostType = {
  necessities: Omit<BaseNecessityType, "id">[];
  noteForNecessities?: string;
};

export type GuestNecessitiesListType = {
  necessities: GuestNecessityType[];
  noteForNecessities?: string;
};
