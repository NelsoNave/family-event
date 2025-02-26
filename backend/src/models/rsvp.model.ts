import { PrismaClient } from "@prisma/client";
import RsvpForm from "../types/rsvpform";
import EventParticipants from "./eventParticipants.model";
import ParticipantNecessitiesModel from "./participantNecessities.model";
import User from "./user.model";
import UserFamilies from "./userFamilies.model";

const prisma = new PrismaClient();

const submitNewUserRsvp = async (
  eventId: number,
  rsvpForm: RsvpForm,
  isAccepted: boolean,
) => {
  try {
    return prisma.$transaction(async (tx) => {
      const newUser = await User.addNewUser(
        tx,
        rsvpForm.guest.email,
        rsvpForm.guest.name,
      );
      await EventParticipants.addNewEventParticipant(
        tx,
        eventId,
        newUser.id,
        rsvpForm.message,
        rsvpForm.restriction,
        isAccepted,
      );

      if (isAccepted) {
        await ParticipantNecessitiesModel.addNewParticipantNecessitiesByRsvp(
          tx,
          eventId,
          newUser.id,
        );

        if (rsvpForm.companions.length) {
          for (let i = 0; i < rsvpForm.companions.length; i++) {
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
              rsvpForm.restriction,
              isAccepted,
              newUserFamily.id,
            );
          }
        }
      }
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

const submitExistingUserRsvp = async (
  eventId: number,
  userId: number,
  rsvpForm: RsvpForm,
  isAccepted: boolean,
) => {
  try {
    return prisma.$transaction(async (tx) => {
      await EventParticipants.addNewEventParticipant(
        tx,
        eventId,
        userId,
        rsvpForm.message,
        rsvpForm.restriction,
        isAccepted,
      );

      if (isAccepted) {
        await ParticipantNecessitiesModel.addNewParticipantNecessitiesByRsvp(
          tx,
          eventId,
          userId,
        );

        //check duplication for user_families
        const userFamilies = await UserFamilies.fetchUserFamilyByUserId(userId);

        if (rsvpForm.companions.length) {
          for (let i = 0; i < rsvpForm.companions.length; i++) {
            const nameDuplication = userFamilies?.find(
              (user) => user.name === rsvpForm.companions[i].name,
            );
            if (nameDuplication) {
              await EventParticipants.addNewEventParticipant(
                tx,
                eventId,
                userId,
                rsvpForm.message,
                rsvpForm.restriction,
                isAccepted,
                nameDuplication.id,
              );
            } else {
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
                rsvpForm.restriction,
                isAccepted,
                newUserFamily.id,
              );
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

export default {
  submitNewUserRsvp,
  submitExistingUserRsvp,
};
