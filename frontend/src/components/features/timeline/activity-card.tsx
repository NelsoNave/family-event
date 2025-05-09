"use client";

import SmoothAppearAnimation from "@/components/animation/smooth-appear";
import { formatDateTime, timeFormatOptions } from "@/lib/helpers/format-date";
import { TimelineType } from "@/types/timeline";
import { ActionDropdown } from "./action-dropdown";

type ActivityCardProps = {
  activityData: TimelineType;
  isEven: boolean;
  eventId: string;
  isHost: boolean;
  index: number;
};

export default function ActivityCard({
  activityData,
  isEven,
  eventId,
  isHost,
  index,
}: ActivityCardProps) {
  const activityContent = (
    <div className="mb-4 flex h-[144px] items-center gap-2 overflow-y-auto">
      <div className="my-auto flex h-full flex-[2] flex-col items-center justify-center">
        <p className="pb-1 text-center text-sm font-semibold">
          {formatDateTime(new Date(activityData.startTime), timeFormatOptions)}
        </p>
        <span className="block h-14 w-2 border-l border-textSub"></span>
        <p className="pt-1 text-center text-sm font-semibold">
          {formatDateTime(new Date(activityData.endTime), timeFormatOptions)}
        </p>
      </div>
      <div
        className={`h-full flex-[8] space-y-2 rounded-xl p-4 ${
          isEven ? "bg-background" : "bg-accentGreen text-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{activityData.title}</h2>
          {isHost && (
            <ActionDropdown eventId={eventId} activityId={activityData.id} />
          )}
        </div>
        <p className="text-sm font-bold">{activityData.description}</p>
      </div>
    </div>
  );

  // An animation is triggered only on the guest side
  return isHost ? (
    activityContent
  ) : (
    <SmoothAppearAnimation
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      {activityContent}
    </SmoothAppearAnimation>
  );
}
