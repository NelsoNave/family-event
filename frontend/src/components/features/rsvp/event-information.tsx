import {
  dateFormatOptions,
  formatDateTime,
  timeFormatOptions,
} from "@/lib/helpers/format-date";
import { EventType } from "@/types/event";
import Image from "next/image";

const EventInformation = async ({ event }: { event: EventType }) => {
  return (
    <section className="space-y-4">
      <Image
        src={event.thumbnailUrl}
        width={200}
        height={200}
        alt="thumbnail"
        className="w-full"
        priority
      />
      <div className="space-y-2 px-6">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <div>
          <p className="font-semibold">
            {formatDateTime(new Date(event.startTime), dateFormatOptions)}
          </p>
          <p className="text-sm font-medium">
            {formatDateTime(new Date(event.startTime), timeFormatOptions)} -
            {formatDateTime(new Date(event.endTime), timeFormatOptions)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventInformation;
