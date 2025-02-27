import NecessitiesForm from "@/components/features/event/necessities/necessities-form";
import { getHostNecessitiesInfo } from "@/lib/actions/event/necessities";

export default async function page({params}: {params: Promise<{ eventId: string }>}) {
    const { eventId } = await params;
    const hostNecessities = await getHostNecessitiesInfo(Number(eventId));

  return (
    <section className="grid gap-6">
      <div className="grid gap-4">
        {/* TODO: use Breadcrumb component after merge timeline PR  */}
        <p>Breadcrumb</p>
        <h1 className="text-xl font-bold">Things to bring</h1>
      </div>
      <NecessitiesForm initialData={hostNecessities} />
    </section>
  );
}
