import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ItemInputForm from "@/components/features/event/to-buy/item-input-form";
import { checkIsHost } from "@/lib/api/event";
import { getThingsToBuyBudget } from "@/lib/api/to-buy";
import { redirect } from "next/navigation";

export default async function Budget({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ budget?: number }>;
}) {
  const { eventId } = await params;

  const isHost = await checkIsHost(eventId);
  if (!isHost) redirect(`/event/${eventId}`);

  // If adding an item for the first time, the budget amount is get from the parameter
  const { budget } = await searchParams;

  // Get budget if items are added for the second time or later
  const response = await getThingsToBuyBudget(eventId);

  let remainBudget;
  let isInitialCreate = false;

  if (budget) {
    remainBudget = budget;
    isInitialCreate = true;
  } else {
    remainBudget = response.budget;
  }

  const breadcrumbProps = {
    path: budget
      ? `/event/${eventId}/to-buy/budget/create`
      : `/event/${eventId}/to-buy`,
    previousPageName: budget ? "Set budget" : "Things to buy",
  };

  return (
    <section className="space-y-4">
      <div>
        <BreadcrumbNavigation {...breadcrumbProps} />
        <h1 className="px-4 text-xl font-bold">Add item</h1>
      </div>
      <div className="px-4 pb-20">
        <ItemInputForm
          eventId={eventId}
          remainBudget={remainBudget}
          isInitialCreate={isInitialCreate}
        />
      </div>
    </section>
  );
}
