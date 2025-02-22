import { Router } from "express";
import rsvpController from "../controllers/rsvp.controller";

const rsvpRouter = Router();

// Routes
rsvpRouter.post("/:event_id/rsvp-form", rsvpController.submitRsvpForm);

export default rsvpRouter;
