import { Router } from "express";
import eventController from "../controllers/event.controller";
import necesitiesModel from "../controllers/necessities.controller";
import participantNecesitiesModel from "../controllers/participantNecessities.controller";
import timelineController from "../controllers/timeline.controller";
import requireAuthMiddleware from "../middleware/auth";
import eventParticipantsController from "../controllers/eventParticipants.controller";
import timelineController from "../controllers/timeline.controller";
import { isEventHost, isEventHostOrParticipant } from "../middleware/event.auth";
const eventRouter = Router();

// Routes
eventRouter.get("/:event_id", isEventHostOrParticipant, eventController.getEventById);
eventRouter.get("/:event_id/is-host", isEventHostOrParticipant, eventController.checkIsEventHost);

eventRouter.get(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necesitiesModel.getNecessities,
);

eventRouter.post(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necesitiesModel.addNewNecessitiesInfo,
);

eventRouter.patch(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necesitiesModel.updateNecessitiesInfo,
);

eventRouter.get(
  "/:event_id/me/necessities",
  requireAuthMiddleware,
  participantNecesitiesModel.getParticipantNecessities,
);

eventRouter.patch(
  "/:event_id/me/necessities/:necessity_id",
  requireAuthMiddleware,
  participantNecesitiesModel.updateParticipantNecessities,
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
  isEventParticipant,
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
