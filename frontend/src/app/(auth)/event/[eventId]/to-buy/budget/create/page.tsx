import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import BudgetForm from "@/components/features/event/to-buy/budget-form";
import ScrollToTop from "@/components/features/scroll-to-top";
import { checkIsHost } from "@/lib/api/event";
import { notFound, redirect } from "next/navigation";

export default async function CreateBudget({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  try {
    const isHost = await checkIsHost(eventId);
    if (!isHost) redirect(`/event/${eventId}`);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-4">
      <ScrollToTop />
      <div className="grid gap-4">
        <BreadcrumbNavigation
          path={`/event/${eventId}`}
          previousPageName="Event Home"
        />
        <div className="px-4">
          <h1 className="text-xl font-bold">
            Create a shopping list with your budget
          </h1>
          <p className="font-sm text-textSub">
            Create a shopping list for the event.
          </p>
        </div>
      </div>
      <div className="px-4 pb-20">
        <BudgetForm eventId={eventId} />
      </div>
    </section>
  );
}
