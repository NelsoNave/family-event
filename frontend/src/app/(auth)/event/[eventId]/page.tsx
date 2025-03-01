import EventDetail from "@/components/features/event/event-detail";
import MenuIcon from "@/components/features/event/menu-icon";
import { MENU_LIST } from "@/constants/icons";
import { checkIsHost, getEventInformation } from "@/lib/api/event";
import { notFound } from "next/navigation";

export default async function EventHome({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  let eventData = null;
  let isHost = false;
  const { eventId } = await params;

  try {
    const response = await getEventInformation(eventId);
    eventData = response.event;

    isHost = await checkIsHost(eventId);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-8">
      {isHost ? "You are a host" : "You are a guest"}
      {eventData ? <EventDetail eventData={eventData} /> : <p>Loading...</p>}

      {/* TODO: Change the displayed icon based on whether the user is a host or a
      guest */}
      {/* TODO: Display the review icon after the event has ended. */}
      <section className="grid grid-cols-4 grid-rows-2 gap-4">
        {MENU_LIST.map((menu) => (
          <MenuIcon key={menu.path} iconDetail={menu} eventId={eventId} />
        ))}
      </section>

      {/* TODO: Display only on the guest's screen */}
      <section>
        <div className="flex justify-between border-b pb-2">
          <h2 className="font-semibold">Who is coming</h2>
          <p className="text-sm font-semibold text-textSub">7 Going</p>
        </div>
      </section>

      {/* TODO: Allow the host to upload photos */}
      <section>
        <p className="text-center text-sm font-medium">
          Share a photo that makes this event even more special!
        </p>
      </section>
    </section>
  );
}
