import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { ForbiddenError, NotFoundError } from "../errors";
import cloudinaryUtil from "../utils/cloudinary.util";
import compresstionUtil from "../utils/imageCompression.util";

const prisma = new PrismaClient();

const fetchAlbumPictures = async (eventId: number, limit: number) => {
  const pictures = await prisma.pictures.findMany({
    where: { eventId: eventId },
    select: { id: true, userId: true, imageUrl: true },
    take: limit > 0 ? limit : undefined,
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
  try {
    const folder = `Album${eventId}`;

    let uploadFiles: Buffer[] = [];
    uploadFiles = await Promise.all(
      files.map(async (file) => {
        return await compresstionUtil.compressImage(file.buffer);
      }),
    );

    const uploadPromises = uploadFiles.map((file) =>
      cloudinaryUtil.uploadImage(file, folder),
    );

    const uploadedImages = await Promise.all(uploadPromises);

    return await prisma.$transaction(async (tx) => {
      await tx.pictures.createMany({
        data: uploadedImages.map(({ url, publicId }) => ({
          eventId: eventId,
          userId: userId,
          imageUrl: url,
          imagePublicId: publicId,
        })),
      });

      const createdUrls = await tx.pictures.findMany({
        where: {
          eventId: eventId,
          userId: userId,
          imageUrl: { in: uploadedImages.map(({ url }) => url) },
        },
        select: { imageUrl: true },
      });

      return createdUrls;
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw new Error("Failed to upload images and save to DB");
  }
};

const deletePicture = async (
  userId: number,
  isHost: boolean,
  pictureIds: number[],
) => {
  return await prisma.$transaction(async (tx) => {
    try {
      const existingPictures = await tx.pictures.findMany({
        where: { id: { in: pictureIds } },
      });
      if (existingPictures.length !== pictureIds.length) {
        throw new NotFoundError("Picture");
      }

      if (!isHost) {
        const isPoster = existingPictures.every(
          (image) => image.userId === userId,
        );
        if (!isPoster) {
          throw new ForbiddenError(
            "You can not  delete pictures you did not posted.",
          );
        }
      }

      const deletePromises = existingPictures.map((image) =>
        cloudinaryUtil.deleteImage(image.imagePublicId),
      );
      await Promise.all(deletePromises);

      await tx.pictures.deleteMany({
        where: {
          id: {
            in: pictureIds,
          },
        },
      });
    } catch (err) {
      console.error("Transaction failed:", error);
      throw new Error("Failed to delete images and save to DB");
    }
  });
};

const fetchPreviewPictures = async (eventId: number) => {
  const pictures = await prisma.pictures.findMany({
    where: { eventId: eventId },
    orderBy: {
      id: "asc",
    },
  });
  return pictures;
};

const fetchPicturesByTag = async (eventId: number, tag: string) => {
  const pictures = await prisma.pictures.findMany({
    where: { eventId: eventId },
    orderBy: {
      id: "asc",
    },
  });
  return pictures;
};

export default {
  fetchAlbumPictures,
  addNewPicture,
  deletePicture,
  fetchPreviewPictures,
  fetchPicturesByTag,
};
