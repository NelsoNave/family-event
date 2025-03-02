import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantsContainer from "@/components/features/event/participant/participants-container";
import WhoIsComing from "@/components/features/event/participant/who-is-coming";
import { checkIsHost } from "@/lib/api/event";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let isHost = false;

  try {
    isHost = await checkIsHost(eventId);
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
      {isHost ? <ParticipantsContainer eventId={eventId} /> : <WhoIsComing eventId={eventId} />}
    </section>
  );
}
