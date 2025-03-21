interface AnnouncementsInfo {
  id: number;
  contentText: string;
  imageUrl: string;
  isEmailSent: boolean;
  hostId: number;
  host: UserInfo;
  createdAt: Date;
  timeAgo: string;
  countFavorite: number;
  countMessage: number;
  hasFavorited: boolean;
}

interface UserInfo {
  name: string;
  profileImageUrl: string;
}

interface RepliesInfo extends AnnouncementsInfo {
  replies: Partial<replies>[];
}

interface replies {
  replyText: string;
  createdAt: Date;
  timeAgo: string;
  isOwnReply: Boolean;
  user: UserInfo;
}

export type { AnnouncementsInfo, RepliesInfo };
