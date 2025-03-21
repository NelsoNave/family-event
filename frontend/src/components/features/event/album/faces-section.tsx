import { getPreviewPictureByTag } from "@/lib/actions/event/album";
import { PreviewPictureType } from "@/types/album";
import Image from "next/image";
import Link from "next/link";
type FacesSectionProps = {
  eventId: string;
};

export default async function FacesSection({ eventId }: FacesSectionProps) {
  let facesPreviewData: PreviewPictureType[] = [];

  try {
    facesPreviewData = await getPreviewPictureByTag(eventId);
    if (!facesPreviewData || facesPreviewData.length === 0) {
      return null;
    }

    return (
      <>
        {facesPreviewData && (
          <section className="grid gap-4">
            <div className="grid gap-2">
              <h2 className="text-xl font-bold">Faces of the Event</h2>
              <p className="text-sm text-textSub">
                AI creates a personal album for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-[6px]">
              {facesPreviewData.map(({ tag, previewImageUrl }) => (
                <Link
                  key={tag}
                  href={`album/pictures?tag=${tag}`}
                  className="relative w-full cursor-pointer"
                >
                  <Image
                    src={previewImageUrl}
                    alt="test"
                    width={168}
                    height={184}
                    className="h-[184px] w-full rounded-lg object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg"></div>
                  <p className="absolute bottom-2 left-2 font-bold text-white">
                    {tag}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </>
    );
  } catch (err) {
    console.error(err);
    return (
      <div className="rounded-lg bg-red-100 p-4 text-sm text-red-500">
        Failed to load faces. Please try again later.
      </div>
    );
  }
}
