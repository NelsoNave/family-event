import EventInformation from "@/components/features/rsvp/event-information";
import RsvpForm from "@/components/features/rsvp/rsvp-form";
import { getEventInfo } from "@/lib/api/event";
import { notFound } from "next/navigation";

const RSVP = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  let eventData = null;
  const { eventId } = await params;

  try {
    const response = await getEventInfo(eventId);
    eventData = response.event;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section
      className="max-w-md pb-3 md:mx-auto"
      style={{ backgroundColor: eventData.theme }}
    >
      <EventInformation event={eventData} />
      <RsvpForm />
    </section>
  );
};

export default RSVP;
