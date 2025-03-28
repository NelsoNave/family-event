import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ScrollToTop from "@/components/features/scroll-to-top";
import ActivityCard from "@/components/features/timeline/activity-card";
import { Button } from "@/components/ui/button";
import { checkIsHost, getEventInformation } from "@/lib/api/event";
import { getTimeline } from "@/lib/api/timeline";
import {
  dayFormatOptions,
  formatDateTime,
  monthAndYearFormatOptions,
  weekdayFormatOptions,
} from "@/lib/helpers/format-date";
import { EventType } from "@/types/event";
import { TimelineType } from "@/types/timeline";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function TimeLine({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  let timeline: TimelineType[] = [];
  let eventData: EventType | null = null;
  const { eventId } = await params;

  let isHost = false;

  try {
    isHost = await checkIsHost(eventId);

    // Fetch event data
    const responseEvent = await getEventInformation(eventId);
    eventData = responseEvent.event;

    // Fetch timeline
    const responseTimeline = await getTimeline(eventId);
    timeline = responseTimeline.timelines;
  } catch (err) {
    console.error(err);
    notFound();
  }

  // If no timeline data exists, redirect to the create timeline page
  if (isHost && timeline.length === 0) {
    redirect(`/event/${eventId}/timeline/create`);
  }

  return (
    <section className="space-y-4">
      <ScrollToTop />
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
      <div className="px-4 pt-2">
        <div className="flex gap-3">
          <p className="text-5xl font-bold">
            {formatDateTime(new Date(eventData.startTime), dayFormatOptions)}
          </p>
          <div className="font-semibold">
            <p>
              {formatDateTime(
                new Date(eventData.startTime),
                weekdayFormatOptions,
              )}
            </p>
            <p>
              {formatDateTime(
                new Date(eventData.startTime),
                monthAndYearFormatOptions,
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 pb-20">
        {!isHost && timeline.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <p className="text-center font-semibold">
              The host is working on the timeline.
              <br /> Stay tuned!
            </p>
            <Image
              src="/images/empty_timeline_Icon.png"
              alt="calendar icon"
              width={200}
              height={200}
              className="h-36 w-36 object-cover"
            />
          </div>
        ) : (
          <div>
            {timeline.map((activity, index) => {
              const previousActivity = timeline[index - 1];

              // Not display the add button if the end time of the previous activity matches the start time of the current activity.
              const isHideAddButton =
                previousActivity &&
                new Date(previousActivity.endTime).getTime() ===
                  new Date(activity.startTime).getTime();

              return (
                <div key={activity.id}>
                  {isHost && !isHideAddButton && (
                    <Link href={`/event/${eventId}/timeline/create`}>
                      <Button className="hover: mb-4 ml-auto flex w-4/5 border-[0.3px] border-textSub bg-white shadow-sm hover:bg-textSub/10">
                        <Plus className="text-primary" />
                      </Button>
                    </Link>
                  )}
                  <ActivityCard
                    activityData={activity}
                    key={activity.id}
                    isEven={index % 2 === 0}
                    eventId={eventId}
                    isHost={isHost}
                    index={index}
                  />
                  {isHost && index === timeline.length - 1 && (
                    <Link href={`/event/${eventId}/timeline/create`}>
                      <Button className="hover: mb-4 ml-auto flex w-4/5 border-[0.3px] border-textSub bg-white shadow-sm hover:bg-textSub/10">
                        <Plus className="text-primary" />
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
