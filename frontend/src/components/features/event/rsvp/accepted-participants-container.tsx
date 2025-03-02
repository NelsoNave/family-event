import { BaseParticipantsType } from "@/types/participant";
import ParticipantItem from "./participant-item";

type AcceptedParticipantsContainerProps = {
  acceptedParticipants: BaseParticipantsType[];
};

export default function AcceptedParticipantsContainer({
  acceptedParticipants,
}: AcceptedParticipantsContainerProps) {
  return (
    <ul className="grid gap-4">
      {acceptedParticipants.map(({ id, name, profileImageUrl }) => (
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
