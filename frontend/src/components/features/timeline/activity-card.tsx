import { formatDateTime, timeFormatOptions } from "@/lib/helpers/format-date";
import { TimelineType } from "@/types/timeline";

type ActivityCardProps = {
  activityData: TimelineType;
  isEven: boolean;
};

export default function ActivityCard({
  activityData,
  isEven,
}: ActivityCardProps) {
  return (
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
        <h2 className="text-lg font-bold">{activityData.title}</h2>
        <p className="text-sm font-bold">{activityData.description}</p>
      </div>
    </div>
  );
}
