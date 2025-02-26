import { Router } from "express";
import eventController from "../controllers/event.controller";
import necesitiesModel from "../controllers/necessities.controller";
import participantNecesitiesModel from "../controllers/participantNecessities.controller";
import requireAuthMiddleware from "../middleware/auth";

const eventRouter = Router();

// Routes
eventRouter.get("/:event_id", eventController.getEventById);

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
  //requireAuthMiddleware,
  necesitiesModel.updateNecessities,
);

eventRouter.get(
  "/:event_id/me/necessities",
  requireAuthMiddleware,
  participantNecesitiesModel.getParticipantNecessities,
);

eventRouter.patch(
  "/:event_id/me/necessities/:necessity_id",
  //requireAuthMiddleware,
  participantNecesitiesModel.updateParticipantNecessities,
);

export default eventRouter;
