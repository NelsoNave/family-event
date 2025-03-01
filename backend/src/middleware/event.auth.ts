import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errors";
import {
  checkIsRequestFromHostOrParticipant,
} from "../utils/request-checker";

/**
 * Middleware to check if the user is the host of the event
 * @param {Request} req - Express request object with event_id parameter
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {ForbiddenError} If user is not the host of the event
 */
export const isEventHost = async (
  req: Request<{ event_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isHost = await checkIsRequestFromHost(req);
    if (!isHost) {
      throw new ForbiddenError("You are not host of this event");
    }
    next();
  } catch (error) {
    next(error);
  }
};


/**
 * Middleware to check if the user is a participant of the event (including the host)
 * @param {Request} req - Express request object with event_id parameter
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {ForbiddenError} If user is not a participant of the event
 */
// check if the user is a participant of the event (including the host)
export const isEventHostOrParticipant = async (
  req: Request<{ event_id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isParticipant = await checkIsRequestFromHostOrParticipant(req);
    if (!isParticipant) {
      throw new ForbiddenError("You are not participant of this event");
    }
    next();
  } catch (error) {
    next(error);
  }
};
