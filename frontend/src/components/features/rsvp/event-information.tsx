import { getEventInfo } from "@/lib/api/event";
import {
  dateFormatOptions,
  formatDateTime,
  timeFormatOptions,
} from "@/lib/helpers/format-date";
import Image from "next/image";
import { notFound } from "next/navigation";

type EventInformationProps = {
  id: string;
};

const EventInformation = async ({ id }: EventInformationProps) => {
  let eventData = null;

  try {
    const response = await getEventInfo(id);
    eventData = response.event;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-4">
      <Image
        src={eventData.thumbnailUrl}
        width={200}
        height={200}
        alt="thumbnail"
        className="w-full"
        priority
      />
      <div className="space-y-2 px-6">
        <h1 className="text-2xl font-bold">{eventData.title}</h1>
        <div>
          <p className="font-semibold">
            {formatDateTime(eventData.startTime, dateFormatOptions)}
          </p>
          <p className="text-sm font-medium">
            {formatDateTime(eventData.startTime, timeFormatOptions)} -
            {formatDateTime(eventData.endTime, timeFormatOptions)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventInformation;
