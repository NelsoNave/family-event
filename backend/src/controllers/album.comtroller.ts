import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import usersModel from "../models/user.model";

const fetchAlbumPictures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.event_id);
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

    if (user.profileImageUrl === "") {
      user.profileImageUrl = defaultProfileImage;
    }
    for (let i = 0; i < user.userFamilies.length; i++) {
      if (user.userFamilies[i].profileImageUrl === "") {
        user.userFamilies[i].profileImageUrl = defaultProfileImage;
      }
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

export default {
  fetchAlbumPictures,
};
