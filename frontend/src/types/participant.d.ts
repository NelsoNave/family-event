export type BaseParticipantsType = {
  id: number;
  name: string;
  profileImageUrl: string;
  isAccepted: boolean;
  isAttended: boolean;
  messageToHost: string;
  restrictionNote: string;
};

export type TempParticipantsType = Omit<
  BaseParticipantsType,
  "isAccepted" | "profileImageUrl"
>;

export type AllParticipantsType = BaseParticipantsType & {
  isTemp: boolean;
  uniqueId: string;
};

export type ParticipantsResponseType = {
  acceptedParticipants: BaseParticipantsType[];
  declinedParticipants: BaseParticipantsType[];
  tempParticipants: TempParticipantsType[];
};
