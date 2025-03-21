import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import BudgetForm from "@/components/features/event/to-buy/budget-form";
import ScrollToTop from "@/components/features/scroll-to-top";
import { checkIsHost } from "@/lib/api/event";
import { getThingsToBuyBudget } from "@/lib/api/to-buy";
import { notFound, redirect } from "next/navigation";

export default async function CreateBudget({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  let budget;
  try {
    const isHost = await checkIsHost(eventId);
    if (!isHost) redirect(`/event/${eventId}`);

    const response = await getThingsToBuyBudget(eventId);
    budget = response.budget;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-4">
      <ScrollToTop />
      <div className="grid gap-4">
        <BreadcrumbNavigation
          path={`/event/${eventId}/to-buy`}
          previousPageName="Things to buy"
        />
        <h1 className="px-4 text-xl font-bold">Edit budget</h1>
      </div>
      <div className="px-4 pb-20">
        <BudgetForm eventId={eventId} budget={budget} />
      </div>
    </section>
  );
}
