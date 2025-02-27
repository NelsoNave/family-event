import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";
import necessitiesModel from "../models/necessities.model";
import participantNecessitiesModel from "../models/participantNecessities.model";
import Event from "../types/event";
import { Necessity, NecessityItem } from "../types/necessities";

const prisma = new PrismaClient();

// Fetch event infomation by id
const fetchEventById = async (id: number) => {
  const event = await prisma.events.findUnique({
    where: { id },
  });
  return event;
};

const updateEvent = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  updates: Partial<Event>,
) => {
  const filteredUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined),
  );

  if (Object.keys(filteredUpdates).length === 0) {
    throw new Error("no valid update fields");
  }
  // check if the user is the host of the event
  const isHost = await prisma.events.findFirst({
    where: {
      id: eventId,
      hostId: user.id,
    },
  });
  if (isHost) {
    return true;
  }
  // check if the user is a participant of the event
  const isParticipant = await prisma.eventParticipants.findFirst({
    where: { eventId, userId: user.id },
  });
  return isParticipant ? true : false;
};

  const user = await tx.events.update({
    where: { id: eventId },
    data: { ...filteredUpdates },
  });

  return user;
};

const createNewNecessitiesInfo = async (
  eventId: number,
  newNecessitiesList: NecessityItem[],
  newNote: string,
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      let necessities = [];
      if (newNecessitiesList.length) {
        for (let i = 0; i < newNecessitiesList.length; i++) {
          const newNecessity = await necessitiesModel.createNewNecessities(
            tx,
            eventId,
            newNecessitiesList[i].item,
          );
          necessities.push(newNecessity);
          await participantNecessitiesModel.createNewParticipantNecessities(
            tx,
            eventId,
            newNecessity.id,
          );
        }
      }
      const updates = { noteForNecessities: newNote };
      const updatedNote = await updateEvent(tx, eventId, updates);
      const resultNote = updatedNote.noteForNecessities;

      return { necessities, updatedNote };
    });
  } catch (err) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

const updateNewNecessities = async (
  eventId: number,
  newNote: string,
  newNecessitiesList: Necessity[],
  updateNecessitiesList: Necessity[],
  deleteNecessitiesList: Necessity[],
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      await necessitiesModel.lockNecessities(tx, eventId);

      const updates = { noteForNecessities: newNote };
      const result = await updateEvent(tx, eventId, updates);
      const note = result?.noteForNecessities;

      let necessities = [];
      if (newNecessitiesList.length) {
        for (let i = 0; i < newNecessitiesList.length; i++) {
          const newNecessity = await necessitiesModel.createNewNecessities(
            tx,
            eventId,
            newNecessitiesList[i].item,
          );
          necessities.push(newNecessity);
          await participantNecessitiesModel.createNewParticipantNecessities(
            tx,
            eventId,
            newNecessity.id,
          );
        }
      }

      if (updateNecessitiesList.length) {
        for (let i = 0; i < updateNecessitiesList.length; i++) {
          console.log(i);
          const updatedNecessity = await necessitiesModel.updateNecessities(
            tx,
            updateNecessitiesList[i].id,
            updateNecessitiesList[i].item,
          );
          necessities.push(updatedNecessity);
        }
      }

      if (deleteNecessitiesList.length) {
        for (let i = 0; i < deleteNecessitiesList.length; i++) {
          await participantNecessitiesModel.deleteParticipantNecessities(
            tx,
            deleteNecessitiesList[i].id,
          );
          const deletedNecessity = await necessitiesModel.deleteNecessities(
            tx,
            deleteNecessitiesList[i].id,
          );
          necessities.push(deletedNecessity);
        }
      }

      return { necessities, note };
    });
  } catch (err) {
    console.error("Transaction failed:", error);
    throw error;
  }
};

export default {
  fetchEventById,
  createNewNecessitiesInfo,
  updateNewNecessities,
};
