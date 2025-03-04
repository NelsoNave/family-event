import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import BudgetForm from "@/components/features/event/to-buy/budget-form";
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
      <div>
        <BreadcrumbNavigation
          path={`/event/${eventId}/to-buy`}
          previousPageName="Things to buy"
        />
        <h1 className="text-xl font-bold">Edit budget</h1>
      </div>
      <BudgetForm eventId={eventId} budget={budget} />
    </section>
  );
}
