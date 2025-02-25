import { Router } from "express";
import eventController from "../controllers/event.controller";
import necesitiesModel from "../controllers/necessities.controller";
import requireAuthMiddleware from "../middleware/auth";

const eventRouter = Router();

// Routes
eventRouter.get("/:event_id", eventController.getEventById);

eventRouter.get(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necesitiesModel.getNessities,
);

eventRouter.post(
  "/:event_id/necessities",
  requireAuthMiddleware,
  necesitiesModel.addNewNessitiesInfo,
);

export default eventRouter;
