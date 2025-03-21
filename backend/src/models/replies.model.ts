import { PrismaClient, Replies } from "@prisma/client";

const prisma = new PrismaClient();

const createReply = async (creates: Omit<Replies, "id">) => {
  const filteredCreates = Object.fromEntries(
    Object.entries(creates).filter(([_, v]) => v !== undefined),
  );
  if (Object.keys(filteredCreates).length === 0) {
    throw new Error("no valid update fields");
  }

  const reply = await prisma.replies.create({
    data: { ...creates },
  });
  return reply;
};

const updateReplyFavorite = async (
  announcementId: number,
  userId: number,
  isFavorite: boolean,
  createdAt: Date,
) => {
  const existingReply = await prisma.replies.findMany({
    where: { announcementId: announcementId, userId: userId, isMessage: false },
  });

  let reply: Partial<Replies> = {};
  if (existingReply.length > 0) {
    const id = existingReply[0].id;
    reply = await prisma.replies.update({
      where: { id },
      data: {
        isFavorite,
      },
    });
  } else {
    reply = await prisma.replies.create({
      data: {
        announcementId: announcementId,
        userId: userId,
        replyText: "",
        isMessage: false,
        isFavorite: isFavorite,
        createdAt: createdAt,
      },
    });
  }
  return reply;
};

const deleteReply = async (replyId: number) => {
  const reply = await prisma.announcements.delete({
    where: { id: replyId },
  });
  return reply;
};

export default {
  createReply,
  updateReplyFavorite,
  deleteReply,
};
