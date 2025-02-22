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

//insert to user
const addNewUser = async (
  tx: Prisma.TransactionClient,
  newEmail: string,
  newName: string,
  newProfileImageUrl?: string,
) => {
  const addedUser = await prisma.users.create({
    data: {
      name: newName,
      email: newEmail,
      profileImageUrl: newProfileImageUrl ? newProfileImageUrl : "",
    },
  });
  return addedUser;
};

export default {
  fetchUSerById,
  fetchUSerByEmail,
  addNewUser,
};
