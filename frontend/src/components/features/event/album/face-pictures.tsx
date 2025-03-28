import { getAllPicturesByTag } from "@/lib/actions/event/album";
import { notFound } from "next/navigation";
import FacePictureCard from "./face-picture-card";

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
          <FacePictureCard key={picture} picture={picture} />
        ))}
      </div>
    </section>
  );
}
