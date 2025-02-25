import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findParticipantNecessities = async (eventId: number, userId: number) => {
  const necessities = await prisma.$queryRaw`
    SELECT n.id, n.item, pn.is_added AS "isAdded"
    FROM necessities n
    INNER JOIN participant_necessities pn on n.id = pn.necessity_id
    WHERE n.event_id = ${eventId} and pn.user_id = ${userId};`;

  const note = await prisma.events.findUnique({
    where: {
      id: eventId,
    },
    select: {
      noteForNecessities: true,
    },
  });

  return { necessities, note };
};
//insert to participant_necessities
const addNewParticipantNecessitiesByRsvp = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  userId: number,
) => {
  const addedParticipantNecessities = await tx.$queryRaw`
    insert into participant_necessities (necessity_id, user_id, is_added)
    select id, ${userId}, false from necessities where event_id = ${eventId}`;
  return addedParticipantNecessities;
};

const createNewParticipantNecessities = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  necessityId: number,
) => {
  const addedParticipantNecessities = await tx.$queryRaw`
    insert into participant_necessities (necessity_id, user_id, is_added)
    select  distinct ${necessityId}, user_id, false from event_participants where event_id = ${eventId}`;
  return addedParticipantNecessities;
};

const updateParticipantNecessities = async (
  userId: number,
  necessityId: number,
  isAdded: boolean,
) => {
  try {
    const result = await prisma.participantNecessities.update({
      where: { necessity_id: { necessityId: necessityId, userId: userId } },
      data: { isAdded: isAdded },
    });
    return result;
  } catch (err) {
    console.error("faild to add participant necessity", err);
    throw err;
  }
};

export default {
  findParticipantNecessities,
  addNewParticipantNecessitiesByRsvp,
  createNewParticipantNecessities,
  updateParticipantNecessities,
};
