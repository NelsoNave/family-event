"use client";

import { useToast } from "@/hooks/use-toast";
import {
  dateFormatOptions,
  formatDateTime,
  timeFormatOptions,
} from "@/lib/helpers/format-date";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { MyPageEventType } from "@/types/event";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type EventCardListProps = {
  events: MyPageEventType[];
  error?: string;
};

export default function EventCardList({ events, error }: EventCardListProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      const errorMessage = "Failed to load events";
      showErrorToast(toast, error, errorMessage);
    }
  }, [error, toast]);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {events.map(({ id, title, thumbnailUrl, startTime, endTime, isHost }) => {
        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(endTime);
        return (
          <li key={id} className="hover:opacity-70">
            <Link href={`/event/${id}`} className="grid gap-4">
              <div className="relative">
                <Image
                  src={thumbnailUrl}
                  alt={title}
                  width={0}
                  height={118}
                  sizes="50vw"
                  className="w-full h-[118px] rounded-t-xl object-cover"
                />
                <p
                  className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-bold text-white ${isHost ? "bg-accentGreen/50" : "bg-primary/50"}`}
                >
                  {isHost ? "Host" : "Guest"}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-sm font-bold text-text">{title}</h3>
                <div>
                  <p className="text-xs text-textSub">
                    {formatDateTime(startTimeDate, dateFormatOptions)}
                  </p>
                  <p className="text-xs text-textSub">
                    {formatDateTime(startTimeDate, timeFormatOptions)} -
                    {formatDateTime(endTimeDate, timeFormatOptions)}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
