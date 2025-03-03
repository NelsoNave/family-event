import { PrismaClient } from "@prisma/client";
import { error } from "console";
import cloudinaryUtil from "../utils/cloudinary.util";

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
  files: Express.Multer.File[],
) => {
  return await prisma.$transaction(async (tx) => {
    try {
      const folder = `Album${eventId}`;

      const uploadPromises = files.map((file) =>
        cloudinaryUtil.uploadImage(file.buffer, folder),
      );

      const uploadedImages = await Promise.all(uploadPromises);

      const createdImages = await tx.pictures.createMany({
        data: uploadedImages.map(({ url, publicId }) => ({
          eventId: eventId,
          userId: userId,
          imageUrl: url,
          imagePublicId: publicId,
        })),
      });

      return createdImages;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to upload images and save to DB");
    }
  });
};

const deletePicture = async (
  eventId: number,
  userId: number,
  pictureIds: number[],
  publicIds: string[],
) => {
  return await prisma.$transaction(async (tx) => {
    try {
      const existingPictures = await tx.pictures.findMany({
        where: { id: { in: pictureIds } },
      });

      if (existingPictures.length === 0) {
        throw new Error("No images found in DB");
      }
      const deletePromises = existingPictures.map((image) =>
        cloudinaryUtil.deleteImage(image.imagePublicId),
      );
      await Promise.all(deletePromises);

      const deletedPicture = await tx.pictures.deleteMany({
        where: {
          id: {
            in: pictureIds,
          },
        },
      });
    } catch (err) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to upload images and save to DB");
    }
  });
};

export default {
  fetchAlbumPictures,
  addNewPicture,
  deletePicture,
};
