import { Button } from "@/components/ui/button";
import { HostNecessitiesListType } from "@/types/necessities";
import Link from "next/link";
import BreadcrumbNavigation from "../../breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";

type HostNecessitiesContainerProps = {
  hostNecessities: HostNecessitiesListType;
  eventId: string;
};

export default async function HostNecessitiesContainer({
  hostNecessities,
  eventId,
}: HostNecessitiesContainerProps) {
  return (
    <section className="grid gap-4 pb-20">
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="grid gap-4 px-4 pt-2">
        <h1 className="text-xl font-bold">Things to bring</h1>
        <ul className="list-disc pl-6">
          {hostNecessities.necessities.map(({ id, item }) => (
            <li key={id} className="py-2 font-medium">
              {item}
            </li>
          ))}
        </ul>
        {hostNecessities.noteForNecessities && (
          <div className="grid gap-2">
            <h2 className="text-base font-bold">Message to guests</h2>
            <p className="whitespace-pre-wrap rounded-lg bg-background px-6 py-8">
              {hostNecessities.noteForNecessities}
            </p>
          </div>
        )}
      </div>
      <Link href={`necessities/edit`} className="mt-6 flex p-4">
        <Button
          type="button"
          className="h-auto w-full rounded-full py-3 text-base font-bold"
        >
          Update item list
        </Button>
      </Link>
    </section>
  );
}
