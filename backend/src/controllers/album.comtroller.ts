import { clerkClient, getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors";
import { ValidationError } from "../errors/validation.error";
import albumModel from "../models/album.model";
import eventModel from "../models/event.model";
import usersModel from "../models/user.model";

const getAlbumPictures = async (
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

    const { userId } = getAuth(req);
    if (!userId) {
      throw new NotFoundError("User");
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await usersModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      throw new NotFoundError("User");
    }

    const event = await eventModel.fetchEventById(eventId);
    if (!event) {
      throw new NotFoundError("Event");
    }

    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const result = await albumModel.fetchAlbumPictures(eventId, limit);

    const isHost = user.id === event.hostId;
    const pictures = result.map((picture) => ({
      ...picture,
      isDeletablet: isHost ? isHost : picture.userId === user.id,
    }));
    res.status(200).json({ data: { pictures } });
  } catch (err) {
    next(err);
  }
};

const uploadAlbumPictures = async (
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
      throw new ValidationError("Invalid picture ID");
    }

    const { userId } = getAuth(req);
    if (!userId) {
      throw new NotFoundError("User");
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await usersModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      throw new NotFoundError("User");
    }

    const pictures = await albumModel.addNewPicture(eventId, user.id, files);

    res.status(200).json({
      success: true,
      message: "uploaded pictures successfully!",
      data: { pictures },
    });
  } catch (err) {
    next(err);
  }
};

const deleteAlbumPictures = async (
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

    const deleteReq = req.body.pictures;

    const deleteIds = deleteReq.map((item: any) => {
      return Number(item.id);
    });

    if (!deleteIds || deleteIds.length === 0) {
      throw new ValidationError("Invalid picture ID");
    }

    const { userId } = getAuth(req);
    if (!userId) {
      throw new NotFoundError("User");
    }
    const loginUser = await clerkClient.users.getUser(userId);
    const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

    const user = await usersModel.fetchUSerByEmail(loginEmail);
    if (!user) {
      throw new NotFoundError("User");
    }

    const event = await eventModel.fetchEventById(eventId);
    if (!event) {
      throw new NotFoundError("Event");
    }

    //check user is host
    const isHost = event.hostId === user.id;
    await albumModel.deletePicture(user.id, isHost, deleteIds);

    res
      .status(200)
      .json({ success: true, message: "Dleted pictures successfully!" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAlbumPictures,
  uploadAlbumPictures,
  deleteAlbumPictures,
};
