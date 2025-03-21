import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";
import { getParticipants } from "@/lib/actions/event/participant";
import { checkIsHost } from "@/lib/api/event";
import { BaseParticipantsType } from "@/types/participant";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string; responseId: string }>;
}) {
  const { eventId, responseId } = await params;
  let isHost;
  let participant: BaseParticipantsType | undefined;

  try {
    isHost = await checkIsHost(eventId);

    if (!isHost) {
      redirect(`/event/${eventId}`);
    }

    const response = await getParticipants(eventId);
    const { acceptedParticipants, declinedParticipants } = response;

    participant =
      acceptedParticipants.find((p) => p.id === Number(responseId)) ||
      declinedParticipants.find((p) => p.id === Number(responseId));

    if (!participant) {
      throw new Error(`Participant not found`);
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  const { name, profileImageUrl, messageToHost, restrictionNote } = participant;

  return (
    <section className="grid gap-4">
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}/rsvp/responses`}
        previousPageName="RSVP Responses"
      />
      <div className="grid gap-10 px-4 pb-20 pt-2">
        <div className="grid justify-center gap-2">
          <Image
            src={profileImageUrl}
            alt={name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <h1 className="text-center font-bold">{name}</h1>
        </div>
        {restrictionNote && (
          <div className="grid gap-2">
            <h2 className="font-bold">Allergies or dietary restrictions</h2>
            <p className="whitespace-pre-wrap border-l-2 border-accentGreen pl-4 text-sm font-bold leading-6">
              {restrictionNote}
            </p>
          </div>
        )}
        {messageToHost && (
          <div className="grid gap-2">
            <h2 className="font-bold">Message</h2>
            <p className="whitespace-pre-wrap border-l-2 border-accentGreen pl-4 text-sm font-bold leading-6">
              {messageToHost}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
