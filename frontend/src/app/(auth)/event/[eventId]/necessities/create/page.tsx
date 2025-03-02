import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import NecessitiesForm from "@/components/features/event/necessities/necessities-form";
import { checkIsHost } from "@/lib/api/event";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let isHost;
  try {
    isHost = await checkIsHost(eventId);
  } catch (err) {
    console.error(err)
    notFound();
  }

  // TODO: Refactor needed for the error handling integration task
  if(!isHost) {
    redirect(`/event/${eventId}`)
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-4">
        <BreadcrumbNavigation
          path={`/event/${eventId}`}
          previousPageName="Event Home"
        />
        <div className="grid gap-2">
          <h1 className="text-xl font-bold">Things to bring</h1>
          <p className="text-sm text-textSub">
            Create a list of items for your guests to bring to the event.
          </p>
        </div>
      </div>
      <NecessitiesForm />
    </section>
  );
}
