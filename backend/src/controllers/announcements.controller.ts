import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { NotFoundError, UnauthorizedError, ValidationError } from "../errors";
import announcementsModel from "../models/announcements.model";
import userModel from "../models/user.model";

const getAnnouncementsInfo = async (
  req: Request<{ event_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = Number(req.params.event_id);
    // Validate IDs
    if (isNaN(eventId)) {
      throw new ValidationError("Invalid event ID");
    }

    const { userId } = getAuth(req);
    if (!userId) {
      throw new UnauthorizedError();
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await userModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      throw new NotFoundError("User");
    }

    const announcements = await announcementsModel.fetchAnnouncements(
      eventId,
      user.id,
    );

    res.status(200).json({ data: { announcements } });
  } catch (err) {
    next(err);
  }
};

const getRepliesInfo = async (
  req: Request<{ announcement_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const announcementId = Number(req.params.announcement_id);
    // Validate IDs
    if (isNaN(announcementId)) {
      throw new ValidationError("Invalid event ID");
    }

    const { userId } = getAuth(req);
    if (!userId) {
      throw new UnauthorizedError();
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await userModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      throw new NotFoundError("User");
    }

    const announcement = await announcementsModel.fetchReplies(
      announcementId,
      user.id,
    );

    if (!announcement) {
      throw new NotFoundError("Announcement");
    }

    res.status(200).json({ data: { announcement } });
  } catch (err) {
    next(err);
  }
};

export default {
  getAnnouncementsInfo,
  getRepliesInfo,
};
