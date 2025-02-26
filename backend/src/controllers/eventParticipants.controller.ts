import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation.error";
import eventParticipantsModel from "../models/eventParticipants.model";

const getEventParticipants = async (
  req: Request<{ event_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = Number(req.params.event_id);
    // Validate ID
    if (isNaN(eventId)) {
      throw new ValidationError("Invalid event ID");
    }

    const { acceptedParticipants, declinedParticipants, tempParticipants } =
      await eventParticipantsModel.getEventParticipants(eventId);
    // TODO use checkIsRequestFromHost
    //const isHost = await checkIsRequestFromHost(req);
    const isHost = true;
    // if guests
    let response = {};
    if (!isHost) {
      response = {
        whoIsComing: acceptedParticipants.map((participant) => ({
          id: participant.id,
          name: participant.name,
          profileImageUrl: participant.profileImageUrl,
        })),
      };
      res.status(200).json({ success: true, data: response });
      return;
    }
    // if host
    response = {
      acceptedParticipants,
      declinedParticipants,
      tempParticipants,
    };
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};

const updateParticipantAttendance = async (
  req: Request<{ event_id: string; participant_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = Number(req.params.event_id);
    const participantId = Number(req.params.participant_id);
    if (isNaN(eventId) || isNaN(participantId)) {
      throw new ValidationError("Invalid event ID or participant ID");
    }
    const isAttended = req.body.isAttended;
    if (typeof isAttended !== "boolean") {
      throw new ValidationError("Invalid isAttended value");
    }
    await eventParticipantsModel.updateParticipantAttendance(
      eventId,
      participantId,
      isAttended,
    );
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export default {
  getEventParticipants,
  updateParticipantAttendance,
};
