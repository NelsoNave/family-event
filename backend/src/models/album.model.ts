import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchAlbumPictures = async (eventId: number) => {
  const pictures = await prisma.pictures.findMany({
    where: { eventId: eventId },
    orderBy: {
      id: "asc",
    },
  });
  return pictures;
};
