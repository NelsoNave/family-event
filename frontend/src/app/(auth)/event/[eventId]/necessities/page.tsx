import GuestNecessitiesContainer from "@/components/features/event/necessities/guest/guest-necessities-container";
import HostNecessitiesContainer from "@/components/features/event/necessities/host/host-necessities-container";
import {
  getGuestNecessitiesInfo,
  getHostNecessitiesInfo,
} from "@/lib/actions/event/necessities";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const hostNecessities = await getHostNecessitiesInfo(eventId);

  if (
    !hostNecessities.necessities ||
    hostNecessities.necessities.length === 0 ||
    !hostNecessities.noteForNecessities
  ) {
    redirect("necessities/create");
  }

  const guestNecessities = await getGuestNecessitiesInfo(eventId);

  return (
    <>
      <GuestNecessitiesContainer
        guestNecessities={guestNecessities}
        eventId={eventId}
      />
      <HostNecessitiesContainer hostNecessities={hostNecessities} />
    </>
  );
}
