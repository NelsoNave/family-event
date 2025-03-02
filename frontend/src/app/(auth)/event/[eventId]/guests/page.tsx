import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantsContainer from "@/components/features/event/participant/participants-container";
import { getParticipants } from "@/lib/actions/event/participant";
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
      ...(response.tempParticipants ?? []).map((tmp) => ({
        ...tmp,
        isAccepted: false,
        profileImageUrl: "/images/profile_default.png",
      })),
    ];
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
        Guest list <span className="text-base">({participants.length})</span>
      </h1>
      <ParticipantsContainer participants={participants} eventId={eventId} />
    </section>
  );
}
