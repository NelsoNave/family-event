import { BaseParticipantsType } from "@/types/participant";
import ParticipantItem from "./participant-item";

type DeclinedParticipantsContainerProps = {
  declinedParticipants: BaseParticipantsType[];
};

export default function DeclinedParticipantsContainer({
  declinedParticipants,
}: DeclinedParticipantsContainerProps) {
  return (
    <ul className="grid gap-4">
      {declinedParticipants.map(({ id, name, profileImageUrl }) => (
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
