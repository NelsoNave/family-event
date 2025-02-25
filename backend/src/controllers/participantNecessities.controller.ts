import { clerkClient, getAuth } from "@clerk/express";
import { Request, Response } from "express";
import participantNecessitiesModel from "../models/participantNecessities.model";
import usersModel from "../models/user.model";

const getParticipantNecessities = async (
  req: Request<{ event_id: string }>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);
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

    const result = await participantNecessitiesModel.findParticipantNecessities(
      eventId,
      user.id,
    );
    const necessities = result.necessities;
    const noteForNecessities = result.note?.noteForNecessities;

    res.status(200).json({
      uccess: true,
      message: "get guest necessities successfully!",
      data: { necessities },
      noteForNecessities,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get guest necessities" });
  }
};

const updateParticipantNecessities = async (
  req: Request<{ necessity_id: string }>,
  res: Response,
) => {
  try {
    const necessityId = Number(req.params.necessity_id);
    const isAdded = req.body.isAdded;

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

    const necessity =
      await participantNecessitiesModel.updateParticipantNecessities(
        user.id,
        necessityId,
        isAdded,
      );
    res.status(200).json({
      success: true,
      message: "updated guest necessities successfully!",
      data: { necessity },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update guest necessities" });
  }
};

export default {
  getParticipantNecessities,
  updateParticipantNecessities,
};
