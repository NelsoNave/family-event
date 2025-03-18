import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import CreateReviewForm from "@/components/features/event/review/create-review-form";
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
    console.error(err);
    notFound();
  }

  if (isHost) {
    redirect(`/event/${eventId}`);
  }

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="grid gap-4 px-4 pb-20 pt-2">
        <h1 className="text-xl font-bold">Review the event</h1>
        <p className="text-sm font-medium text-textSub">
          The host would love to see your photos and hear your review on the
          event!
        </p>
        <CreateReviewForm />
      </div>
    </section>
  );
}
