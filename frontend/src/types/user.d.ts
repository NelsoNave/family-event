export type UserType = {
  id: string;
  name: string;
  profileImageUrl: string;
  email: string;
  userFamilies: { id: string; profileImageUrl: string; name: string }[];
};
