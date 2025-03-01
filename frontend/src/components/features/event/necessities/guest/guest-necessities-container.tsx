import { GuestNecessitiesListType } from "@/types/necessities";
import BreadcrumbNavigation from "../../breadcrumb-navigation";
import GuestNecessitiesListItem from "./guest-necessities-list-item";

type GuestNecessitiesProps = {
  guestNecessities: GuestNecessitiesListType;
  eventId: string;
};

export default function GuestNecessitiesContainer({
  guestNecessities,
  eventId,
}: GuestNecessitiesProps) {
  const necessities = guestNecessities.necessities;

  return (
    <section className="grig gap-10">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="grid gap-4">
        <h1 className="text-xl font-bold">Don&apos;t Forget to Bring</h1>
        <ul className="list-disc">
          {necessities.map(({ id, item, isAdded }) => (
            <GuestNecessitiesListItem
              key={id}
              necessityId={id}
              item={item}
              initialIsAdded={isAdded}
              eventId={eventId}
            />
          ))}
        </ul>
        {guestNecessities.noteForNecessities && (
          <div className="grid gap-2">
            <h2 className="text-base font-bold">Message from the host</h2>
            <p className="whitespace-pre-wrap rounded-lg bg-background px-6 py-8">
              {guestNecessities.noteForNecessities}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
