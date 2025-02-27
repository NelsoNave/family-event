import { EventTempParticipant } from "@prisma/client";

interface ParticipantWithUser {
  id: number;
  name: string;
  profileImageUrl: string;
  messageToHost: string;
  restrictionNote: string;
  isAccepted: boolean;
  isAttended: boolean;
}

interface TempParticipant extends Omit<EventTempParticipant, "eventId"> {
  profileImageUrl: string;
}

export type { ParticipantWithUser, TempParticipant };
