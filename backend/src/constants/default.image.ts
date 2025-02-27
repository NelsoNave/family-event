import dotenv from "dotenv";

dotenv.config();

export const DEFAULT_PROFILE_IMAGE =
  process.env.DEFAULT_PROFILE_IMAGE ||
  "https://res.cloudinary.com/dfv5exqy3/image/upload/v1733782881/profile_default_s7qpxj.png";
