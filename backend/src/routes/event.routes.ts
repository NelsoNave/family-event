import { Router } from "express";
import eventController from "../controllers/event.controller";
import eventParticipantsController from "../controllers/eventParticipants.controller";
import timelineController from "../controllers/timeline.controller";
import { isEventHost, isEventParticipant } from '../middleware/event.auth';
const eventRouter = Router();

// Routes
eventRouter.get("/:event_id", eventController.getEventById);

// Timelines
eventRouter.get("/:event_id/timelines", isEventParticipant, timelineController.getEventTimelines);
eventRouter.post("/:event_id/timelines", isEventHost, timelineController.createTimeline);
eventRouter.put("/:event_id/timelines/:timeline_id", isEventHost, timelineController.updateTimeline);
eventRouter.delete("/:event_id/timelines/:timeline_id", isEventHost, timelineController.deleteTimeline);

// Participants
eventRouter.get("/:event_id/participants",  eventParticipantsController.getEventParticipants);
export default eventRouter;
