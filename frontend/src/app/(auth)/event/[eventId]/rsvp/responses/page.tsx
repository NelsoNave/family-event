import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import AcceptedParticipantsContainer from "@/components/features/event/rsvp/accepted-participants-container";
import DeclinedParticipantsContainer from "@/components/features/event/rsvp/declined-participants-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getParticipants } from "@/lib/actions/event/participant";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  let acceptedParticipants;
  let declinedParticipants;

  try {
    const response = await getParticipants(eventId)
    acceptedParticipants = response.acceptedParticipants;
    declinedParticipants = response.declinedParticipants;
  } catch(err) {
    console.error(err)
    notFound()
  }

  return (
    <section className="grid gap-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
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
          <AcceptedParticipantsContainer acceptedParticipants={acceptedParticipants} />
        </TabsContent>
        <TabsContent value="notAttending">
          <DeclinedParticipantsContainer declinedParticipants={declinedParticipants} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
