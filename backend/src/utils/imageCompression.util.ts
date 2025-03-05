import sharp from "sharp";

const compressImage = async (buffer: Buffer) => {
  const compressedBuffer = await sharp(buffer)
    .resize(1000)
    .jpeg({ quality: 80 })
    .toBuffer();
  return compressedBuffer;
};

export default {
  compressImage,
};
