import AllPictures from "@/components/features/event/album/all-pictures";
import FacePictures from "@/components/features/event/album/face-pictures";
import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";

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
      <BreadcrumbNavigation
        path={`/event/${eventId}/album`}
        previousPageName="Album"
      />
      {tag ? (
        <FacePictures eventId={eventId} tag={tag} />
      ) : (
        <AllPictures eventId={eventId} />
      )}
    </section>
  );
}
