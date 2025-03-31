"use server";

import { AnnouncementType } from "@/types/announcement";

const dummyAnnouncements: AnnouncementType[] = [
  {
    id: 1,
    contentText:
      "Thank you for coming to the event today! The photos from today are uploaded to the album, so be sure to check them out!",
    imageUrl: "",
    isEmailSent: true,
    timeAgo: "2 hours ago",
    hostId: 103,
    host: {
      name: "Tracy Smith",
      profileImageUrl: "/images/sample_profile.png",
    },
    countFavorite: 2,
    countMessage: 0,
    hasFavorited: true,
  },
  {
    id: 2,
    contentText:
      "Hi, everyone! The event is coming tomorrow. Can’t wait to see you all :) ",
    imageUrl: "",
    isEmailSent: false,
    timeAgo: "1 days ago",
    hostId: 103,
    host: {
      name: "Tracy Smith",
      profileImageUrl: "/images/sample_profile.png",
    },
    countFavorite: 2,
    countMessage: 7,
    hasFavorited: false,
  },
  {
    id: 3,
    contentText:
      "I'm thinking of making this dish on the event day, what do you think?",
    imageUrl: "/images/sample_announcement_image.png",
    isEmailSent: true,
    timeAgo: "5 day ago",
    hostId: 103,
    host: {
      name: "Tracy Smith",
      profileImageUrl: "/images/sample_profile.png",
    },
    countFavorite: 2,
    countMessage: 0,
    hasFavorited: true,
  },
];

export const getAnnouncements = async (): Promise<AnnouncementType[]> => {
  try {
    return dummyAnnouncements;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Announcements not found");
    } else {
      throw new Error(String(err));
    }
  }
};
