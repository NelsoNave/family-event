import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchUSerById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: { id },
    include: {
      userFamilies: {
        select: {
          id: true,
          profileImageUrl: true,
          name: true,
        },
      },
    },
  });
  return user;
};

const fetchUSerByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
    include: {
      userFamilies: {
        select: {
          id: true,
          profileImageUrl: true,
          name: true,
        },
      },
    },
  });
  return user;
};

const getEventInfoByEmail = async (email: string) => {
  const eventInfo = await prisma.$queryRaw`
      SELECT distinct e.id, false As "isHost", e.title,
            e.thumbnail_url As "thumbnailUrl",
            e.start_time As "startTime",
            e.end_time As "endTime"
      FROM events e
      LEFT JOIN event_participants p
      ON p.event_id = e.id
      LEFT JOIN users participant_u
      ON participant_u.id = p.user_id
      WHERE participant_u.email = ${email}
      UNION
      SELECT e.id,  true as "isHost", e.title,
            e.thumbnail_url As "thumbnailUrl",
            e.start_time As "startTime",
            e.end_time AS "endTime"
      FROM events e
      LEFT JOIN users host_u
      ON host_u.id = e.host_id
      WHERE host_u.email = ${email}`;
  return eventInfo;
};

//insert to user
const addNewUser = async (
  tx: Prisma.TransactionClient,
  newEmail: string,
  newName: string,
  newProfileImageUrl?: string,
) => {
  const addedUser = await tx.users.create({
    data: {
      name: newName,
      email: newEmail,
      profileImageUrl: newProfileImageUrl ? newProfileImageUrl : "",
      isDeleted: true,
    },
  });
  return addedUser;
};

const updateUser = async (
  tx: Prisma.TransactionClient,
  userId: number,
  updates: { name?: string; profileImageUrl?: string },
) => {
  if (Object.keys(updates).length === 0) {
    throw new Error("no update needed");
  }

  const user = await prisma.users.update({
    where: { id: userId },
    data: { ...updates },
  });

  return user;
};

const deleteUser = async (userId: number) => {
  await prisma.$transaction(async (tx) => {
    await tx.users.update({
      where: { id: userId },
      data: { isDeleted: true },
    });

    await tx.userFamilies.updateMany({
      where: { userId: userId },
      data: { isDeleted: true },
    });
  });
};

export default {
  fetchUSerById,
  fetchUSerByEmail,
  getEventInfoByEmail,
  addNewUser,
  updateUser,
  deleteUser,
};
