import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAnnouncements = async (eventId: number) => {
  const annoumcements = await prisma.announcements.findMany({
    where: { eventId: eventId },
    select: { id: true, userId: true, imageUrl: true },
    orderBy: {
      id: "asc",
    },
  });
  return annoumcements;
};

const createAnnouncement = async (eventId: number, userId: number) => {};

export default {
  fetchAnnouncements,
  createAnnouncement,
};
