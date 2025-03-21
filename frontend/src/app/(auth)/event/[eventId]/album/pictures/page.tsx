import AllPictures from "@/components/features/event/album/all-pictures";
import FacePictures from "@/components/features/event/album/face-pictures";
import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ tag?: string }>;
}) {
  const { eventId } = await params;
  const { tag } = await searchParams;

  return (
    <section>
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}/album`}
        previousPageName="Album"
      />
      <section className="px-4 pb-20 pt-2">
        {tag ? (
          <FacePictures eventId={eventId} tag={tag} />
        ) : (
          <AllPictures eventId={eventId} />
        )}
      </section>
    </section>
  );
}
