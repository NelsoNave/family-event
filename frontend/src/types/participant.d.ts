export type BaseParticipantsType = {
  id: string;
  name: string;
  profileImageUrl: string;
  isAccepted: boolean;
  isAttended: boolean;
  messageToHost: string;
  restrictionNote: string;
};

export type TmpParticipantsType = Omit<BaseParticipantsType, "isAccepted" | "profileImageUrl">;

export type ParticipantsResponseType = {
  acceptedParticipants: BaseParticipantsType[];
  declinedParticipants: BaseParticipantsType[];
  tmpParticipants: TmpParticipantsType[];
};
