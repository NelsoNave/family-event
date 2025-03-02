import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantsContainer from "@/components/features/event/participant/participants-container";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <ParticipantsContainer eventId={eventId} />
    </section>
  );
}
