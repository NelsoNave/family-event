import { getWhoIsComing } from "@/lib/actions/event/participant";
import Image from "next/image";
import { notFound } from "next/navigation";

type WhoIsComingProps = {
  eventId: string;
};

export default async function WhoIsComing({ eventId }: WhoIsComingProps) {
  let response;

  try {
    response = await getWhoIsComing(eventId);
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="grid gap-4">
      <h1 className="text-xl font-bold">
        Who is coming <span className="text-base">({response.length})</span>
      </h1>
      <ul className="grid grid-cols-4 gap-x-2 gap-y-4">
        {response.map(({ id, name, profileImageUrl }) => (
          <li className="grid h-auto w-16 justify-items-center gap-2" key={id}>
            <Image
              src={profileImageUrl}
              width={64}
              height={64}
              alt={name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <p className="line-clamp-2 w-full break-words text-center text-base font-semibold">
              {name}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
