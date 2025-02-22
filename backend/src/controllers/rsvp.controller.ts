import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import rsvpModel from "../models/rsvp.model";
import userModel from "../models/user.model";
import RsvpForm from "../types/rsvpform";

//RSVP's attendance
const RSVP_ACCEPT = "ACCEPT";
const RSVP_DECLINE = "DECLINE";

const submitRsvpForm = async (
  req: Request<{ event_id: string }, {}, RsvpForm>,
  res: Response,
) => {
  try {
    const eventId = Number(req.params.event_id);
    const submittedTermsAccepted = req.body.status;
    const rsvpForm = req.body;

    //check terms was accepted
    if (!submittedTermsAccepted) {
      res.status(400).json({ error: "prease check the term." });
      return;
    }
    //check Attendance
    let isAccepted = false;
    if (rsvpForm.status !== RSVP_ACCEPT && rsvpForm.status !== RSVP_DECLINE) {
      res.status(400).json({ error: "this attendance is invalid." });
      return;
    } else if (rsvpForm.status === RSVP_ACCEPT) {
      isAccepted = true;
    }

    //check login status
    const { userId } = getAuth(req);
    if (!userId) {
      //check duplication by email
      const userByEmail = await userModel.fetchUSerByEmail(
        rsvpForm.guest.email,
      );
      if (userByEmail) {
        res
          .status(400)
          .json({ error: "this email is already used. Please login." });
        return;
      }
      //new user's RSVP
      const newUserRsvp = await rsvpModel.submitNewUserRsvp(
        eventId,
        rsvpForm,
        isAccepted,
      );
      res
        .status(200)
        .json({ success: true, message: "RSVP submitted successfully!" });
    } else {
      //compare email on form and login email
      const loginUser = await clerkClient.users.getUser(userId);
      const loginEmail = loginUser.emailAddresses[0]?.emailAddress;

      if (rsvpForm.guest.email !== loginEmail) {
        res.status(400).json({ error: "Email is different." });
        return;
      }

      //check user by email
      const userByEmail = await userModel.fetchUSerByEmail(
        rsvpForm.guest.email,
      );
      if (userByEmail) {
        //existing user's RSVP
        const newUserRsvp = await rsvpModel.submitExistingUserRsvp(
          eventId,
          userByEmail.id,
          rsvpForm,
          isAccepted,
        );
        res
          .status(200)
          .json({ success: true, message: "RSVP submitted successfully!" });
      } else {
        res.status(404).json({ error: "User not found." });
        return;
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get event by id" });
  }
};

export default {
  submitRsvpForm,
};
