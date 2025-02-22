import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import eventsRouter from "./routes/event.routes";
import rsvpRouter from "./routes/rsvp.routes";
import usersRouter from "./routes/user.routes";

dotenv.config();

const app = express();

app.use(express.json());

const CLIENT_PORT = process.env.CLIENT_PORT || 8080;
app.use(
  cors({
    origin: [`http://localhost:${CLIENT_PORT}`],
    credentials: true,
  }),
);

// middleware
app.use(clerkMiddleware());

// Routes
app.use("/api/v1/me", usersRouter);
app.unsubscribe("/api/events");
app.use("/api/v1/event", rsvpRouter);
app.use("/api/v1/events", eventsRouter);

// Start server
const SERVER_PORT = process.env.SERVER_PORT || 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}...`);
});
