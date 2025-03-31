import { AnnounceCard } from "@/components/features/event/announce/announce-card";
import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";
import { getAnnouncements } from "@/lib/actions/event/announcement";
import { checkIsHost } from "@/lib/api/event";
import { AnnouncementType } from "@/types/announcement";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Announcements({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let isHost = false;
  let announcements: AnnouncementType[] = [];

  try {
    isHost = await checkIsHost(eventId);
    announcements = await getAnnouncements();
  } catch (err) {
    console.error(err);
    return notFound();
  }

  // If no announcements data exists, redirect to the create announcement page
  if (isHost && announcements.length === 0) {
    // TODO: implement the create announcement page
    // redirect(`/event/${eventId}/announcements/create`);
  }

  return (
    <section className="space-y-4">
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="grid gap-4 px-4 pt-2">
        <h1 className="text-xl font-bold">Announcements</h1>
      </div>
      <div className="px-4 pb-20">
        {!isHost && announcements.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
            <p className="w-2/3 text-center font-semibold">
              No announcement from the host has been posted yet.
            </p>
            <Image
              src="/images/empty_announcement_icon.svg"
              alt="announcement icon"
              width={200}
              height={200}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="space-y-4 px-2">
            {announcements.map((activity) => (
              <div key={activity.id}>
                <AnnounceCard announcements={activity} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
