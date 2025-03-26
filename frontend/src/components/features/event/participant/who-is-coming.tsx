import { getWhoIsComing } from "@/lib/actions/event/participant";
import { notFound } from "next/navigation";
import GuestProfile from "./guest-profile";

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
          <GuestProfile
            key={id}
            name={name}
            profileImageUrl={profileImageUrl}
          />
        ))}
      </ul>
    </section>
  );
}
