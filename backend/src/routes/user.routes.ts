import { Router } from "express";
import usersController from "../controllers/user.controller";
import requireAuthMiddleware from "../middleware/auth";

const usersRouter = Router();

// Routes
usersRouter.get("/", requireAuthMiddleware, usersController.getuserById);
usersRouter.get(
  "/events",
  requireAuthMiddleware,
  usersController.getEventInfoByEmail,
);

export default usersRouter;
