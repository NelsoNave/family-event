import { Button } from "@/components/ui/button";
import {
  dateFormatOptions,
  formatDateTime,
  timeFormatOptions,
} from "@/lib/helpers/format-date";
import { EventType } from "@/types/event";
import { Calendar, MapPin, PencilLineIcon } from "lucide-react";
import Image from "next/image";

type eventDataProps = {
  eventData: EventType;
  isHost: boolean;
};

export default function EventDetail({ eventData, isHost }: eventDataProps) {
  return (
    <section className="space-y-6">
      <Image
        src={eventData.thumbnailUrl}
        width={200}
        height={200}
        alt="thumbnail"
        className="aspect-[2/1] w-full h-auto rounded-xl object-cover"
        priority
      />
      <div className="space-y-3">
        <div className="flex justify-between">
          <h1 className="px-3 text-xl font-bold">{eventData.title}</h1>
          {isHost && (
            <Button className="h-8 w-8 rounded-full bg-textSub/20 text-textSub shadow-none hover:bg-textSub/20 hover:opacity-70">
              <PencilLineIcon />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4 px-3">
          <Calendar size={24} />
          <div>
            <p className="font-semibold">
              {formatDateTime(new Date(eventData.startTime), dateFormatOptions)}
            </p>
            <p className="text-sm font-medium">
              {formatDateTime(new Date(eventData.startTime), timeFormatOptions)}
              -{formatDateTime(new Date(eventData.endTime), timeFormatOptions)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3">
          <MapPin size={24} />
          <p className="text-sm font-semibold">{eventData.address}</p>
        </div>
      </div>
    </section>
  );
}
