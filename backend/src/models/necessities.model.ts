import { Prisma, PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

const fetchNecessities = async (eventId: number) => {
  const necessities = await prisma.necessities.findMany({
    where: { eventId: eventId },
    select: {
      id: true,
      item: true,
    },
  });
  const noteForNecessities = await prisma.events.findUnique({
    where: { id: eventId },
    select: {
      noteForNecessities: true,
    },
  });
  return { necessities, noteForNecessities };
};

const createNewNecessities = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  item: string,
) => {
  try {
    const newNecessity = await tx.necessities.create({
      data: {
        eventId: eventId,
        item: item,
      },
    });
    return newNecessity;
  } catch (err) {
    console.error("faild to add necessity", error);
    throw error;
  }
};

const lockNecessities = async (
  tx: Prisma.TransactionClient,
  eventId: number,
) => {
  try {
    await tx.$queryRaw`
    SELECT * FROM necessities n
RIGHT JOIN participant_necessities pn
ON n.id = pn.necessity_id
WHERE n.event_id = ${eventId}
FOR UPDATE;`;
  } catch (err) {
    console.error("faild to add necessity", err);
    throw err;
  }
};

const updateNecessities = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  item: string,
) => {
  try {
  } catch (err) {
    console.error("faild to add necessity", err);
    throw err;
  }
};

export default {
  fetchNecessities,
  createNewNecessities,
};
