import { Router } from "express";
import eventController from "../controllers/event.controller";
import necessitiesModel from "../controllers/necessities.controller";
import participantNecessitiesModel from "../controllers/participantNecessities.controller";
import timelineController from "../controllers/timeline.controller";
import requireAuthMiddleware from "../middleware/auth";
import eventParticipantsController from "../controllers/eventParticipants.controller";
import { isEventHost, isEventHostOrParticipant } from "../middleware/event.auth";
const eventRouter = Router();

// Routes
eventRouter.get("/:event_id", eventController.getEventById);

eventRouter.get(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necessitiesModel.getNecessities,
);

eventRouter.post(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necessitiesModel.addNewNecessitiesInfo,
);

eventRouter.patch(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necessitiesModel.updateNecessitiesInfo,
);

eventRouter.get(
  "/:event_id/me/necessities",
  requireAuthMiddleware,
  participantNecessitiesModel.getParticipantNecessities,
);

eventRouter.patch(
  "/:event_id/me/necessities/:necessity_id",
  requireAuthMiddleware,
  participantNecessitiesModel.updateParticipantNecessities,
);

// Timelines
eventRouter.get(
  "/:event_id/timelines",
  isEventHostOrParticipant,
  timelineController.getEventTimelines,
);
eventRouter.post(
  "/:event_id/timelines",
  isEventHost,
  timelineController.createTimeline,
);
eventRouter.put(
  "/:event_id/timelines/:timeline_id",
  isEventHost,
  timelineController.updateTimeline,
);
eventRouter.delete(
  "/:event_id/timelines/:timeline_id",
  isEventHost,
  timelineController.deleteTimeline,
);
// Participants
eventRouter.get(
  "/:event_id/who-is-coming",
  isEventHostOrParticipant,
  eventParticipantsController.getWhoIsComing,
);

eventRouter.get(
  "/:event_id/participants",
  isEventHost,
  eventParticipantsController.getEventParticipants,
);
eventRouter.patch(
  "/:event_id/participants/:participant_id/attendance",
  isEventHost,
  eventParticipantsController.updateParticipantAttendance,
);
eventRouter.delete(
  "/:event_id/participants/:participant_id",
  isEventHost,
  eventParticipantsController.deleteParticipant,
);
eventRouter.post(
  "/:event_id/participants/temporary",
  isEventHost,
  eventParticipantsController.addTemporaryParticipant,
);
eventRouter.delete(
  "/:event_id/participants/temporary/:participant_id",
  isEventHost,
  eventParticipantsController.deleteTemporaryParticipant,
);

export default eventRouter;
