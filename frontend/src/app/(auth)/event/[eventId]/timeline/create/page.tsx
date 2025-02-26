import { ActivityForm } from "@/components/features/timeline/activity-form";

export default async function CreateActivity({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold">Add Activity</h1>
      <ActivityForm eventId={eventId} />
    </section>
  );
}
