import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ItemDeleteButton from "@/components/features/event/to-buy/item-delete-button";
import ItemInputForm from "@/components/features/event/to-buy/item-input-form";
import { checkIsHost } from "@/lib/api/event";
import { getThingToBuy } from "@/lib/api/to-buy";
import { notFound, redirect } from "next/navigation";

export default async function EditItem({
  params,
}: {
  params: Promise<{ eventId: string; itemId: string }>;
}) {
  const { eventId, itemId } = await params;

  let thingToBuy, remainBudget;

  // Check if the value is NaN or if it's not an integer
  const numericItemId = Number(itemId);
  if (isNaN(numericItemId) || !Number.isInteger(numericItemId)) {
    notFound();
  }

  try {
    const isHost = await checkIsHost(eventId);
    if (!isHost) redirect(`/event/${eventId}`);

    const response = await getThingToBuy(eventId, numericItemId);
    thingToBuy = response.thingToBuy.thingToBuy;
    remainBudget = response.remainBudget;
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
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Edit item</h1>
          <ItemDeleteButton eventId={eventId} itemId={numericItemId} />
        </div>
      </div>
      <ItemInputForm
        eventId={eventId}
        thingToBuy={thingToBuy}
        remainBudget={remainBudget}
      />
    </section>
  );
}
