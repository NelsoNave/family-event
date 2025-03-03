import { BaseParticipantsType } from "@/types/participant";
import ParticipantItem from "./participant-item";

type ParticipantsListProps = {
  participantsData: BaseParticipantsType[];
};

export default function ParticipantsList({participantsData}: ParticipantsListProps) {
  return (
    <ul className="grid gap-4">
      {participantsData.map(({ id, name, profileImageUrl }) => (
        <ParticipantItem
          key={id}
          id={id}
          name={name}
          profileImageUrl={profileImageUrl}
        />
      ))}
    </ul>
  );
}
