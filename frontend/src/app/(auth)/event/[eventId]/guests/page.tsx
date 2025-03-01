import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantListItem from "@/components/features/event/participant/participant-list-item";
import { Button } from "@/components/ui/button";
import { getParticipants } from "@/lib/actions/event/participant";
import { PlusIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let participants;

  try {
    const response = await getParticipants(eventId);

    participants = [
      ...(response.acceptedParticipants ?? []),
      ...(response.tmpParticipants ?? []).map(tmp => ({
        ...tmp,
        isAccepted: false,
        profileImageUrl: "/images/profile_default.png"
      })),
    ];

    console.log(participants);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <h1 className="text-xl font-bold">
        Guest list <span className="text-base">(7)</span>
      </h1>
      <ul className="grid gap-4">
        {participants.map(({ id, isAttended, name, profileImageUrl }) => (
          <ParticipantListItem
            key={id}
            isAttended={isAttended}
            name={name}
            profileImageUrl={profileImageUrl}
          />
        ))}
      </ul>
      <Button
        type="button"
        variant="outline"
        className="rounded-full border border-primary bg-white text-primary hover:bg-primary hover:text-white justify-self-end"
      >
        <PlusIcon size={16} /> Add guest
      </Button>
    </section>
  );
}
