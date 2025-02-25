import { Prisma } from "@prisma/client";

//insert to participant_necessities
const addNewParticipantNecessitiesByRsvp = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  userId: number,
) => {
  const addedParticipantNecessities =
    await tx.$queryRaw`insert into participant_necessities (necessity_id, user_id, is_added)
    select id, ${userId}, false from necessities where event_id = ${eventId}`;
  return addedParticipantNecessities;
};

const createNewParticipantNecessities = async (
  tx: Prisma.TransactionClient,
  eventId: number,
  necessityId: number,
) => {
  const addedParticipantNecessities =
    await tx.$queryRaw`insert into participant_necessities (necessity_id, user_id, is_added)
    select  distinct ${necessityId}, user_id, false from event_participants where event_id = ${eventId}`;
  return addedParticipantNecessities;
};

export default {
  addNewParticipantNecessitiesByRsvp,
  createNewParticipantNecessities,
};
