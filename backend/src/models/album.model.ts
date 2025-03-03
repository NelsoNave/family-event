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

const addNewPicture = async (
  eventId: number,
  userId: number,
  url: string,
  publicId: string,
) => {
  const addedPicture = await prisma.pictures.create({
    data: {
      eventId: eventId,
      userId: userId,
      imageUrl: url,
      imagePublicId: publicId,
    },
  });
  return addedPicture;
};

const deletePicture = async (
  eventId: number,
  userId: number,
  url: string,
  publicId: string,
) => {
  const addedPicture = await prisma.pictures.create({
    data: {
      eventId: eventId,
      userId: userId,
      imageUrl: url,
      imagePublicId: publicId,
    },
  });
  return addedPicture;
};

export default {
  fetchAlbumPictures,
  addNewPicture,
  deletePicture,
};
