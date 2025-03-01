import GuestNecessitiesContainer from "@/components/features/event/necessities/guest/guest-necessities-container";
import HostNecessitiesContainer from "@/components/features/event/necessities/host/host-necessities-container";
import {
  getGuestNecessitiesInfo,
  getHostNecessitiesInfo,
} from "@/lib/actions/event/necessities";
import { checkIsHost } from "@/lib/api/event";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  let hostNecessities;
  let guestNecessities;
  let isHost = false;
  const { eventId } = await params;

  try {
    isHost = await checkIsHost(eventId);

    if (isHost) {
      hostNecessities = await getHostNecessitiesInfo(eventId);
    } else {
      guestNecessities = await getGuestNecessitiesInfo(eventId);
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (
    isHost &&
    (!hostNecessities ||
      !hostNecessities.necessities ||
      hostNecessities.necessities.length === 0)
  ) {
    redirect("necessities/create");
  }

  return (
    <>
      {isHost ? (
        <HostNecessitiesContainer
          hostNecessities={
            hostNecessities ?? { necessities: [], noteForNecessities: "" }
          }
          eventId={eventId}
        />
      ) : (
        <GuestNecessitiesContainer
          guestNecessities={guestNecessities}
          eventId={eventId}
        />
      )}
    </>
  );
}
