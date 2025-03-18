import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import { ActivityForm } from "@/components/features/timeline/activity-form";
import { getTimeline } from "@/lib/api/timeline";

export default async function CreateActivity({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const { timelines } = await getTimeline(eventId);

  const breadcrumbProps =
    timelines.length === 0
      ? { path: `/event/${eventId}`, previousPageName: "Event home" }
      : { path: `/event/${eventId}/timeline`, previousPageName: "Timeline" };

  return (
    <section className="space-y-4">
      <BreadcrumbNavigation {...breadcrumbProps} />
      <div className="grid gap-4 px-4 pb-20 pt-2">
        <h1 className="text-xl font-bold">Add Activity</h1>
        <ActivityForm eventId={eventId} />
      </div>
    </section>
  );
}
