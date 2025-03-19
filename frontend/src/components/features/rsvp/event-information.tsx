import {
  dateFormatOptions,
  formatDateTime,
  timeFormatOptions,
} from "@/lib/helpers/format-date";
import { EventType } from "@/types/event";
import { CalendarIcon, MapPin } from "lucide-react";
import Image from "next/image";

const EventInformation = async ({ event }: { event: EventType }) => {
  return (
    <section className="space-y-4">
      <Image
        src={event.thumbnailUrl}
        width={200}
        height={200}
        alt="thumbnail"
        className="h-64 w-full object-cover"
        priority
      />
      <div className="space-y-4 px-6">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="mt-[6px] self-start" />
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
          <div className="flex items-center gap-2">
            <MapPin size={17} className="mt-[3px] self-start" />
            <p className="font-semibold">{event.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventInformation;
