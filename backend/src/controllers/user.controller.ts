import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import usersModel from "../models/user.model";
import {
  default as UserFamilies,
  default as userFamiliesModel,
} from "../models/userFamilies.model";
import { MulterFile } from "../types/multerfile";
import uploadImage from "../utils/cloudinary.util";

const prisma = new PrismaClient();

const defaultProfileImage = process.env.DEFAULT_PROFILE_IMAGE || "";

const getUserById = async (req: Request, res: Response) => {
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

const updateUser = async (req: Request, res: Response) => {
  try {
    prisma.$transaction(async (tx) => {
      const newName = req.body.name;
      const is_remove_image = req.body.remove_image;
      const file = req.file as MulterFile;

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

      if (!file && !newName && !is_remove_image) {
        return res.status(400).json({ error: "request has no info" });
      }

      let newProfileImageUrl = { url: "", publicId: "" };
      if (file) {
        const newProfileImageUrl = await uploadImage.uploadImage(
          file.buffer,
          "profiles",
        );
      }

      let updates: Record<string, any> = {};

      updates.name = newName;
      if (is_remove_image || file)
        updates.profileImageUrl = newProfileImageUrl.url;

      const updatedUser = await usersModel.updateUser(tx, user.id, updates);

      res.status(200).json({
        success: true,
        message: "user updated successfully!",
        user: updatedUser,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to update user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
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

    await usersModel.deleteUser(user.id, user.email);

    res.status(200).json({
      success: true,
      message: "user deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to delete user" });
  }
};

const addNewUserFamily = async (req: Request, res: Response) => {
  try {
    prisma.$transaction(async (tx) => {
      const newName = req.body.name;
      const file = req.file as MulterFile;

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
      let newProfileImageUrl = { url: "", publicId: "" };
      if (file) {
        newProfileImageUrl = await uploadImage.uploadImage(
          file.buffer,
          "profiles",
        );
      }

      const familyMember = await UserFamilies.addNewUserFamily(
        tx,
        user.id,
        newName,
        newProfileImageUrl.url,
      );

      res.status(200).json({
        success: true,
        message: "user family  added successfully!",
        familyMember: familyMember,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to added user" });
  }
};

const updateUserFamily = async (
  req: Request<{ family_id: string }>,
  res: Response,
) => {
  try {
    prisma.$transaction(async (tx) => {
      const familyId = Number(req.params.family_id);
      const newName = req.body.name;
      const is_remove_image = req.body.remove_image;
      const file = req.file as MulterFile;

      if (!file && !newName && !is_remove_image) {
        return res.status(400).json({ error: "request has no info" });
      }

      let newProfileImageUrl = { url: "", publicId: "" };
      if (file) {
        newProfileImageUrl = await uploadImage.uploadImage(
          file.buffer,
          "profiles",
        );
      }

      let updates: Record<string, any> = {};

      updates.name = newName;
      if (is_remove_image || file)
        updates.profileImageUrl = newProfileImageUrl.url;

      const updatedUser = await userFamiliesModel.updateUserFamily(
        tx,
        familyId,
        updates,
      );

      res.status(200).json({
        success: true,
        message: "user family updated successfully!",
        user: updatedUser,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to update user family" });
  }
};

const deleteUserFamily = async (
  req: Request<{ family_id: string }>,
  res: Response,
) => {
  try {
    const familyId = Number(req.params.family_id);

    await userFamiliesModel.deleteUserFamily(familyId);

    res.status(200).json({
      success: true,
      message: "user family deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to update user family" });
  }
};

export default {
  getUserById,
  getEventInfoByEmail,
  updateUser,
  deleteUser,
  addNewUserFamily,
  updateUserFamily,
  deleteUserFamily,
};
