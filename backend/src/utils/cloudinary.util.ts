import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (
  fileBuffer: Buffer,
  folder: string,
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(new Error("faild to upload image"));
        } else {
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      },
    );

    uploadStream.end(fileBuffer);
  });
};

const deleteImage = (publicId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(new Error("Failed to delete image"));
      } else if (result.result === "not found") {
        reject(new Error("Image not found"));
      } else {
        resolve(true);
      }
    });
  });
};

export default {
  uploadImage,
  deleteImage,
};
