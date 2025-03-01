import { Button } from "@/components/ui/button";
import { HostNecessitiesListType } from "@/types/necessities";
import Link from "next/link";

type HostNecessitiesContainerProps = {
  hostNecessities: HostNecessitiesListType;
};

export default async function HostNecessitiesContainer({
  hostNecessities,
}: HostNecessitiesContainerProps) {
  return (
    <section className="space-y-10">
      {/* TODO: use Breadcrumb component after merge timeline PR  */}
      <p>Breadcrumb</p>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Things to bring</h1>
        <ul className="list-disc pl-6">
          {hostNecessities.necessities.map(({ id, item }) => (
            <li key={id} className="py-2 font-medium">
              {id}: {item} {/* 表示用に ID を追加（あとで消してね） */}
            </li>
          ))}
        </ul>
      </div>
      {hostNecessities.noteForNecessities && (
        <div className="space-y-2">
          <h2 className="text-base font-bold">Message to guests</h2>
          <p className="rounded-lg bg-background px-6 py-8">
            {hostNecessities.noteForNecessities}
          </p>
        </div>
      )}
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
