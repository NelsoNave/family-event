import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation.error";
import albumModel from "../models/album.model";
import usersModel from "../models/user.model";

const fetchAlbumPictures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = Number(req.params.event_id);
    // Validate ID
    if (isNaN(eventId)) {
      throw new ValidationError("Invalid event ID");
    }

    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await usersModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    //check user is same as poster

    const image = await albumModel.addNewPicture(eventId, user.id, files);

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default {
  fetchAlbumPictures,
};
