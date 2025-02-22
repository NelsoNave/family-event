import { PrismaClient } from "@prisma/client";
import RsvpForm from "../types/rsvpform";
import EventParticipants from "./eventParticipants.model";
import ParticipantNecessities from "./participantNecessities.model";
import ParticipantRestrictions from "./participantRestrictions.model";
import User from "./user.model";
import UserFamilies from "./userFamilies.model";

const prisma = new PrismaClient();

const submitNewUserRsvp = async (
  eventId: number,
  rsvpForm: RsvpForm,
  isAccepted: boolean,
) => {
  return await prisma.$transaction(async (tx) => {
    const newUser = await User.addNewUser(
      tx,
      rsvpForm.guest.email,
      rsvpForm.guest.name,
    );
    const newParticipant = await EventParticipants.addNewEventParticipant(
      tx,
      eventId,
      newUser.id,
      rsvpForm.message,
      isAccepted,
    );
    const newParticipantNecessities =
      await ParticipantNecessities.addNewParticipantNecessitiesByRsvp(
        tx,
        eventId,
        newUser.id,
      );

    if (rsvpForm.restriction.length) {
      const newRestriction =
        await ParticipantRestrictions.addNewParticipantRestriction(
          tx,
          eventId,
          newUser.id,
          rsvpForm.restriction,
        );
    }

    if (rsvpForm.companions.length) {
      for (let i = 0; i > rsvpForm.companions.length; i++) {
        const newUserFamily = await UserFamilies.addNewUserFamily(
          tx,
          newUser.id,
          rsvpForm.companions[i].name,
        );
        await EventParticipants.addNewEventParticipant(
          tx,
          eventId,
          newUser.id,
          rsvpForm.message,
          isAccepted,
          newUserFamily.id,
        );
      }
    }
  });
};

const submitExistingUserRsvp = async (
  eventId: number,
  userId: number,
  rsvpForm: RsvpForm,
  isAccepted: boolean,
) => {
  return await prisma.$transaction(async (tx) => {
    const newParticipant = await EventParticipants.addNewEventParticipant(
      tx,
      eventId,
      userId,
      rsvpForm.message,
      isAccepted,
    );
    const newParticipantNecessities =
      await ParticipantNecessities.addNewParticipantNecessitiesByRsvp(
        tx,
        eventId,
        userId,
      );

    if (rsvpForm.restriction.length) {
      const newRestriction =
        await ParticipantRestrictions.addNewParticipantRestriction(
          tx,
          eventId,
          userId,
          rsvpForm.restriction,
        );
    }

    //check duplication for user_families
    const userFamilies = await UserFamilies.fetchUserFamilyByUserId(userId);

    if (rsvpForm.companions.length) {
      for (let i = 0; i > rsvpForm.companions.length; i++) {
        const nameExists =
          userFamilies?.some(
            (user) => user.name === rsvpForm.companions[i].name,
          ) ?? false;
        if (!nameExists) {
          const newUserFamily = await UserFamilies.addNewUserFamily(
            tx,
            userId,
            rsvpForm.companions[i].name,
          );
          await EventParticipants.addNewEventParticipant(
            tx,
            eventId,
            userId,
            rsvpForm.message,
            isAccepted,
            newUserFamily.id,
          );
        }
      }
    }
  });
};

export default {
  submitNewUserRsvp,
  submitExistingUserRsvp,
};
