export type BaseNecessityType = {
  id: number; // ID は文字列じゃなくて数値で！
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
  necessities: Pick<BaseNecessityType, "id" | "item">[];
  noteForNecessities?: string;
};

export type GuestNecessitiesListType = {
  necessities: GuestNecessityType[];
  noteForNecessities?: string;
};
