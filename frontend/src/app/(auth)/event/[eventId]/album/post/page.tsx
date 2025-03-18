import Post from "@/components/features/event/album/post";
import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import { getAllPictures } from "@/lib/actions/event/album";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let albumData = [];

  try {
    albumData = await getAllPictures(eventId, 1);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section>
      <BreadcrumbNavigation
        path={
          albumData.length === 0
            ? `/event/${eventId}`
            : `/event/${eventId}/album`
        }
        previousPageName={albumData.length === 0 ? "Event Home" : "Album"}
      />
      <section className="px-4 pb-20 pt-2">
        <Post eventId={eventId} />
      </section>
    </section>
  );
}
