import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ParticipantsList from "@/components/features/event/rsvp/participants-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getParticipants } from "@/lib/actions/event/participant";
import { checkIsHost } from "@/lib/api/event";
import { BaseParticipantsType } from "@/types/participant";
import { notFound, redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let isHost;
  let acceptedParticipants: BaseParticipantsType[] = [];
  let declinedParticipants: BaseParticipantsType[] = [];

  try {
    isHost = await checkIsHost(eventId);

    if (!isHost) {
      redirect(`/event/${eventId}`);
    }

    const response = await getParticipants(eventId);

    if (!response.acceptedParticipants) {
      throw new Error("Accepted participants data is missing");
    }
    if (!response.declinedParticipants) {
      throw new Error("Declined participants data is missing");
    }

    acceptedParticipants = response.acceptedParticipants;
    declinedParticipants = response.declinedParticipants;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="px-4 pb-20 pt-2 grid gap-4">
        <h1 className="text-xl font-bold">RSVP Responses</h1>
        <Tabs defaultValue="attending" className="w-full">
          <TabsList className="w-full bg-transparent">
            <TabsTrigger
              value="attending"
              className="w-full border-b-2 border-textBorderLight bg-transparent pb-2 font-bold data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accentGreen data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
            >
              Attending
            </TabsTrigger>
            <TabsTrigger
              value="notAttending"
              className="w-full border-b-2 border-textBorderLight bg-transparent pb-2 font-bold data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accentGreen data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
            >
              Not Attending
            </TabsTrigger>
          </TabsList>
          <TabsContent value="attending">
            <ParticipantsList participantsData={acceptedParticipants} />
          </TabsContent>
          <TabsContent value="notAttending">
            <ParticipantsList participantsData={declinedParticipants} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
