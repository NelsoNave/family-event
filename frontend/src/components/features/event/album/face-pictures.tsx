import { getAllPicturesByTag } from "@/lib/actions/event/album";
import Image from "next/image";
import { notFound } from "next/navigation";

type FacePicturesProps = {
  eventId: string;
  tag: string;
};

export default async function FacePictures({
  eventId,
  tag,
}: FacePicturesProps) {
  let facePicturesData: string[] = [];

  try {
    facePicturesData = await getAllPicturesByTag(eventId, tag);

    if (!facePicturesData) {
      throw new Error(`No face data`);
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-bold">{tag}</h2>
      <div className="grid grid-cols-2 gap-[6px]">
        {facePicturesData.map((picture) => (
          <Image
            key={picture}
            src={picture}
            alt="test"
            width={168}
            height={184}
            className="h-[184px] w-full rounded-lg object-cover"
          />
        ))}
      </div>
    </section>
  );
}
