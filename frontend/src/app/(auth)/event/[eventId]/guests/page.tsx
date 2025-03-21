import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantsSection from "@/components/features/event/participant/participants-section";
import WhoIsComing from "@/components/features/event/participant/who-is-coming";
import ScrollToTop from "@/components/features/scroll-to-top";
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
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <section className="px-4 pb-20 pt-2">
        {isHost ? (
          <ParticipantsSection eventId={eventId} />
        ) : (
          <WhoIsComing eventId={eventId} />
        )}
      </section>
    </section>
  );
}
