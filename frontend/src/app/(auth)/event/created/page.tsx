import { ShareLinks } from "@/components/features/rsvp/ShareLinks";
import ScrollToTop from "@/components/features/scroll-to-top";
import { Button } from "@/components/ui/button";
import { getInvitationUrl } from "@/lib/helpers/url-utils";
import Image from "next/image";
import Link from "next/link";

type EventCreatedProps = {
  searchParams: {
    eventId: string;
    title: string;
    thumbnailUrl: string;
  };
};

export default async function EventCreated({
  searchParams,
}: EventCreatedProps) {
  const { eventId, title, thumbnailUrl } = await searchParams;
  const eventUrl = getInvitationUrl(eventId);

  return (
    <section className="bg-white px-4 pb-20 pt-10">
      <ScrollToTop />
      <p className="mb-6 text-center text-2xl font-bold">Created your Event!</p>
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt="thumbnail"
          width={500}
          height={500}
          className="contrast-110 aspect-[2/1] w-full rounded-xl object-cover brightness-75"
          priority
        />
        <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
          {title}
        </p>
      </div>
      <div className="mt-8">
        <ShareLinks eventUrl={eventUrl} />
      </div>
      <Link href={`/event/${eventId}`} className="mt-2 flex">
        <Button
          type="submit"
          className="mt-8 h-12 w-full rounded-full text-base font-bold"
        >
          Prepare additional details
        </Button>
      </Link>
    </section>
  );
}
