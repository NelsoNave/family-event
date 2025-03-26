import EventInformation from "@/components/features/rsvp/event-information";
import RsvpForm from "@/components/features/rsvp/rsvp-form";
import { THEME_BACKGROUND_COLORS } from "@/constants/theme-colors";
import { getEventInformation } from "@/lib/api/event";
import { getInvitationUrl } from "@/lib/helpers/url-utils";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const response = await getEventInformation(eventId);

  return {
    title: response.event.title,
    description: `Join us for a fun event: ${response.event.title}!`,
    openGraph: {
      title: response.event.title,
      description: `A special event "${response.event.title}" is happening soon. We'd love to see you there!`,
      images: [{ url: response.event.thumbnailUrl, alt: "Oiwai" }],
      url: getInvitationUrl(eventId),
      type: "website",
      siteName: "Oiwai",
    },
  };
}

const RSVP = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  let eventData = null;
  const { eventId } = await params;

  try {
    const response = await getEventInformation(eventId);
    eventData = response.event;
  } catch (err) {
    console.error(err);
    notFound();
  }

  const getBackgroundColor = (theme: string): string =>
    THEME_BACKGROUND_COLORS[theme] ?? "#FFFBF2";

  return (
    <section
      className="max-w-md pb-3 mx-auto"
      style={{ backgroundColor: getBackgroundColor(eventData.theme) }}
    >
      <EventInformation event={eventData} />
      <RsvpForm theme={eventData.theme} />
    </section>
  );
};

export default RSVP;
