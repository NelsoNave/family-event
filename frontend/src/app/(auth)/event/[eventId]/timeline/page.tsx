import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import ActivityCard from "@/components/features/timeline/activity-card";
import { Button } from "@/components/ui/button";
import { getEventInformation } from "@/lib/api/event";
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
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TimeLine({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  let timeline: TimelineType[] = [];
  let eventData: EventType | null = null;
  const { eventId } = await params;

  try {
    // Fetch event date
    const responseEvent = await getEventInformation(eventId);
    eventData = responseEvent.event;

    // Fetch timeline
    const responseTimeline = await getTimeline(eventId);
    timeline = responseTimeline.timelines;
  } catch (err) {
    console.error(err);
    notFound();
  }

  return (
    <section className="space-y-4 px-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}`}
        previousPageName="Event Home"
      />
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
      <div>
        {timeline.length > 0 ? (
          timeline.map((activity, index) => (
            <div key={activity.id}>
              <ActivityCard
                activityData={activity}
                key={activity.id}
                isEven={index % 2 === 0}
                eventId={eventId}
              />
              <Link href={`/event/${eventId}/timeline/create`}>
                <Button className="hover: mb-4 ml-auto flex w-4/5 border-[0.3px] border-textSub bg-white shadow-sm hover:bg-textSub/10">
                  <Plus className="text-primary" />
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p>No activities found.</p>
        )}
      </div>
    </section>
  );
}
