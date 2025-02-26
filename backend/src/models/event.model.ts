import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";
import necessitiesModel from "../models/necessities.model";
import participantNecessitiesModel from "../models/participantNecessities.model";
import Event from "../types/event";

const prisma = new PrismaClient();

type Necessity = { item: string };

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

  const user = await prisma.events.update({
    where: { id: eventId },
    data: { ...filteredUpdates },
  });

  return user;
};

const createNewNecessitiesInfo = async (
  eventId: number,
  newNecessitiesList: Necessity[],
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

export default {
  fetchEventById,
  createNewNecessitiesInfo,
};
