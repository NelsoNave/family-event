import { GuestNecessitiesListType } from "@/types/necessities";
import GuestNecessitiesListItem from "./guest-necessities-list-item";

type GuestNecessitiesProps = {
  guestNecessities: GuestNecessitiesListType;
};

export default function GuestNecessitiesContainer({
  guestNecessities,
}: GuestNecessitiesProps) {
  return (
    <section className="space-y-10">
      {/* TODO: use Breadcrumb component after merge timeline PR  */}
      <p>Breadcrumb</p>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Don&apos;t Forget to Bring</h1>
        <ul className="list-disc pl-6">
          {guestNecessities.necessities.map(({ id, item, isAdded }) => (
            <GuestNecessitiesListItem
              key={id}
              id={id}
              item={item}
              isAdded={isAdded}
            />
          ))}
        </ul>
      </div>
      {guestNecessities.noteForNecessities && (
        <div className="space-y-2">
          <h2 className="text-base font-bold">Message from the host</h2>
          <p className="rounded-lg bg-background px-6 py-8">
            {guestNecessities.noteForNecessities}
          </p>
        </div>
      )}
    </section>
  );
}
