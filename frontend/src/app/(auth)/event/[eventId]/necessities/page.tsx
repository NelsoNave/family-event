import HostNecessitiesContainer from "@/components/features/event/necessities/host/host-necessities-container";
import { getHostNecessitiesInfo } from "@/lib/actions/event/necessities";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const hostNecessities = await getHostNecessitiesInfo(Number(eventId));

  return (
    <>
    <section>
      <h1>Don&apos;t forget to Bring</h1>
    </section>
    <HostNecessitiesContainer hostNecessities={hostNecessities}  />
    </>
  );
}
