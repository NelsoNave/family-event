import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import BudgetOverview from "@/components/features/event/to-buy/budget-overview";
import { Button } from "@/components/ui/button";
import { checkIsHost } from "@/lib/api/event";
import { getThingsToBuyWithBudget } from "@/lib/api/to-buy";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function ThingsToBuy({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  let thingsToBuy = [];
  let budget = 0;
  let remainBudget = 0;
  let totalSpend = 0;

  try {
    const isHost = await checkIsHost(eventId);
    if (!isHost) redirect(`/event/${eventId}`);

    const response = await getThingsToBuyWithBudget(eventId);
    thingsToBuy = response.thingsToBuy;
    ({ budget, remainBudget, totalSpend } = response.budgetDetails);

    // If the budget is not set, redirect to the create budget page
    if (budget <= 0) {
      redirect(`/event/${eventId}/to-buy/budget/create`);
    }

    if (!thingsToBuy) {
      notFound();
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-4">
      <div>
        <BreadcrumbNavigation
          path={`/event/${eventId}`}
          previousPageName="Event Home"
        />
        <h1 className="text-xl font-bold">Things to buy</h1>
      </div>
      <BudgetOverview
        thingsToBuy={thingsToBuy}
        budget={budget}
        eventId={eventId}
        remainBudget={remainBudget}
        totalSpend={totalSpend}
      />
      <div className="flex justify-end">
        <Link href={`/event/${eventId}/to-buy/create`}>
          <Button
            type="button"
            className="mt-4 h-12 rounded-full border border-primary bg-white px-12 text-base font-bold text-primary hover:text-white"
          >
            Add item
          </Button>
        </Link>
      </div>
    </section>
  );
}
