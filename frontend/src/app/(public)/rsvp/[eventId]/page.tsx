import EventInformation from "@/components/features/rsvp/event-information";
import RsvpForm from "@/components/features/rsvp/rsvp-form";

const RSVP = ({ params }: { params: { id: string } }) => {
  return (
    <section className="max-w-md bg-background pb-3 md:mx-auto">
      <EventInformation id={params.id} />
      <RsvpForm />
    </section>
  );
};

export default RSVP;
