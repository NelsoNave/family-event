import AlbumCard from "@/components/features/event/album/album-card";
import FacesSection from "@/components/features/event/album/faces-section";
import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";
import { getAllPictures } from "@/lib/actions/event/album";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let albumData = [];

  try {
    albumData = await getAllPictures(eventId, 3);
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (albumData.length === 0) {
    redirect(`album/post`);
  }

  return (
    <section>
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <section className="grid gap-10 px-4 pb-20 pt-4">
        <AlbumCard albumData={albumData} />
        <FacesSection eventId={eventId} />
      </section>
    </section>
  );
}
