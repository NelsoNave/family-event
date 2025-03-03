export type BaseUserType = {
  id: string;
  profileImageUrl: string;
  name: string;
};

export type FamilyMemberType = BaseUserType & {
  isDeleted: boolean;
};

export type UserType = BaseUserType & {
  email: string;
  userFamilies: FamilyMemberType[];
};
