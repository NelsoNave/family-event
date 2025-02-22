import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import usersModel from "../models/user.model";

const getuserById = async (req: Request, res: Response) => {
  try {
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
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get user by id" });
  }
};

const getEventInfoByEmail = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const events = await usersModel.getEventInfoByEmail(loginEmail);

    res.status(200).json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get events by email" });
  }
};

export default {
  getuserById,
  getEventInfoByEmail,
};
