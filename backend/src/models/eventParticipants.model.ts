import { Prisma, PrismaClient } from "@prisma/client";
import { DEFAULT_PROFILE_IMAGE } from "../constants/default.image";
import type {
  ParticipantWithUser,
  TempParticipant,
} from "../types/participants";

const prisma = new PrismaClient();

//insert to event_participants
const addNewEventParticipant = async (
  tx: Prisma.TransactionClient,
  newEventId: number,
  newUserId: number,
  newMessage: string,
  newNote: string,
  newIsAccepted: boolean,
  newUserFamilyId?: number,
) => {
  const addedEventParticipant = await tx.eventParticipants.create({
    data: {
      eventId: newEventId,
      userId: newUserId,
      userFamilyId: newUserFamilyId ? newUserFamilyId : null,
      messageToHost: newMessage,
      restrictionNote: newNote,
      isAccepted: newIsAccepted,
      isAttended: false,
    },
  });
  return addedEventParticipant;
};

const getEventParticipants = async (
  eventId: number,
): Promise<{
  acceptedParticipants: ParticipantWithUser[];
  declinedParticipants: ParticipantWithUser[];
  tempParticipants: TempParticipant[];
}> => {
  const participantsData = await prisma.eventParticipants.findMany({
    where: { eventId },
    select: {
      id: true,
      userId: true,
      userFamilyId: true,
      messageToHost: true,
      restrictionNote: true,
      isAccepted: true,
      isAttended: true,
      user: {
        select: {
          name: true,
          profileImageUrl: true,
        },
      },
      userFamilies: {
        select: {
          name: true,
          profileImageUrl: true,
        },
      },
    },
  });
  const participants = participantsData.map((participant) => {
    return {
      id: participant.id,
      name: participant.userFamilyId
        ? participant.userFamilies?.name ?? ""
        : participant.user?.name ?? "",
      profileImageUrl: participant.userFamilyId
        ? participant.userFamilies?.profileImageUrl ?? DEFAULT_PROFILE_IMAGE
        : participant.user?.profileImageUrl ?? DEFAULT_PROFILE_IMAGE,
      messageToHost: participant.messageToHost,
      restrictionNote: participant.restrictionNote,
      isAccepted: participant.isAccepted,
      isAttended: participant.isAttended,
    };
  });
  const acceptedParticipants = participants.filter(
    (participant) => participant.isAccepted,
  );
  const declinedParticipants = participants.filter(
    (participant) => !participant.isAccepted,
  );
  const tempParticipants = await prisma.eventTempParticipant
    .findMany({
      where: { eventId },
      select: {
        id: true,
        name: true,
        isAttended: true,
      },
    })
    .then((participants) =>
      participants.map((p) => ({
        ...p,
        profileImageUrl: DEFAULT_PROFILE_IMAGE,
      })),
    );

  return { acceptedParticipants, declinedParticipants, tempParticipants };
};

const updateParticipantAttendance = async (
  eventId: number,
  participantId: number,
  isAttended: boolean,
) => {
  return await prisma.eventParticipants.update({
    where: {
      id: participantId,
      eventId,
    },
    data: { isAttended },
  });
};

const deleteParticipant = async (eventId: number, participantId: number) => {
  return await prisma.eventParticipants.delete({
    where: {
      id: participantId,
      eventId,
    },
  });
};

const addTemporaryParticipant = async (eventId: number, name: string) => {
  return await prisma.eventTempParticipant.create({
    data: {
      eventId,
      name,
      isAttended: false,
    },
  });
};

const updateTemporaryParticipantAttendance = async (
  eventId: number,
  participantId: number,
  isAttended: boolean,
) => {
  return await prisma.eventTempParticipant.update({
    where: {
      id: participantId,
      eventId,
    },
    data: { isAttended },
  });
};

const deleteTemporaryParticipant = async (
  eventId: number,
  participantId: number,
) => {
  return await prisma.eventTempParticipant.delete({
    where: {
      id: participantId,
      eventId,
    },
  });
};

export default {
  addNewEventParticipant,
  getEventParticipants,
  updateParticipantAttendance,
  deleteParticipant,
  addTemporaryParticipant,
  updateTemporaryParticipantAttendance,
  deleteTemporaryParticipant,
};
