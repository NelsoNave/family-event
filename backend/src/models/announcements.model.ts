import { Announcements, PrismaClient } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { AnnouncementsInfo, RepliesInfo } from "../types/announcements";
const prisma = new PrismaClient();

const fetchAnnouncements = async (eventId: number, userId: number) => {
  const announcements: Partial<AnnouncementsInfo>[] =
    await prisma.announcements.findMany({
      where: { eventId: eventId },
      select: {
        id: true,
        hostId: true,
        contentText: true,
        imageUrl: true,
        isEmailSent: true,
        createdAt: true,
        host: {
          select: { name: true, profileImageUrl: true },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

  for (let i = 0; i < announcements.length; i++) {
    const messageCount = await prisma.replies.findMany({
      where: { announcementId: announcements[i].id, isMessage: true },
    });
    announcements[i].countMessage = messageCount.length;

    const favoriteCount = await prisma.replies.findMany({
      where: { announcementId: announcements[i].id, isFavorite: true },
    });
    announcements[i].countFavorite = favoriteCount.length;

    const hasFavorited = favoriteCount.some((value) => value.userId === userId);
    announcements[i].hasFavorited = hasFavorited;

    const date = announcements[i].createdAt;
    let timeAgo = "";
    if (date) {
      timeAgo = formatDistanceToNow(date, { addSuffix: true });
    }
    announcements[i].timeAgo = timeAgo;
  }
  return announcements;
};

const fetchReplies = async (annoumcementId: number, userId: number) => {
  const result = await prisma.announcements.findUnique({
    where: { id: annoumcementId },
    select: {
      id: true,
      hostId: true,
      contentText: true,
      imageUrl: true,
      isEmailSent: true,
      createdAt: true,
      host: {
        select: { name: true, profileImageUrl: true },
      },
      replies: {
        where: { isMessage: true },
        select: {
          userId: true,
          replyText: true,
          createdAt: true,
        },
      },
    },
  });
  if (!result) {
    return result;
  }
  const annoumcement: Partial<RepliesInfo> = result ?? {};

  annoumcement?.replies?.forEach((reply) => {});
  return annoumcement;
};

const createAnnouncement = async (creates: Omit<Announcements, "id">) => {
  const filteredCreates = Object.fromEntries(
    Object.entries(creates).filter(([_, v]) => v !== undefined),
  );

  if (Object.keys(filteredCreates).length === 0) {
    throw new Error("no valid update fields");
  }

  const announcement = await prisma.announcements.create({
    data: {
      ...creates,
    },
  });

  return announcement;
};

const updateAnnouncement = async (
  announcementId: number,
  updates: Partial<Announcements>,
) => {
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined),
  );

  if (Object.keys(filteredUpdates).length === 0) {
    throw new Error("no valid update fields");
  }

  const announcement = await prisma.announcements.update({
    where: { id: announcementId },
    data: {
      ...filteredUpdates,
    },
  });

  return announcement;
};

const deleteAnnouncement = async (announcementId: number) => {
  const announcement = await prisma.announcements.delete({
    where: { id: announcementId },
  });
  return announcement;
};

export default {
  fetchAnnouncements,
  fetchReplies,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
