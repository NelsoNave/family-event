export type AnnouncementType = {
  id: number;
  contentText: string;
  imageUrl: string;
  isEmailSent: boolean;
  timeAgo: string;
  hostId: number;
  host: {
    name: string;
    profileImageUrl: string;
  };
  countFavorite: number;
  countMessage: number;
  hasFavorited: boolean;
};
