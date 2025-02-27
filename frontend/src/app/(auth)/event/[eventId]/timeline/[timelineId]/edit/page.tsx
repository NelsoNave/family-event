"use client";

import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import { ActivityForm } from "@/components/features/timeline/activity-form";
import { useAuthAxios } from "@/lib/api/axios-client";
import { TimelineType } from "@/types/timeline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditActivity() {
  const { eventId, timelineId } = useParams();

  const eventIdStr = typeof eventId === "string" ? eventId : "";
  const timelineIdStr = typeof timelineId === "string" ? timelineId : "";

  const [eventData, setEventData] = useState<TimelineType | null>(null);
  const axios = useAuthAxios();

  useEffect(() => {
    if (!eventIdStr) {
      console.error("Event ID is required.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<{
          data: { timelines: TimelineType[] };
        }>(`/events/${eventIdStr}/timelines`);

        const timelines = response.data.data.timelines;

        const selectedTimeline = timelines.find(
          (timeline) => timeline.id == timelineId,
        );

        if (selectedTimeline) {
          setEventData(selectedTimeline);
        } else {
          console.error("Timeline not found.");
        }

        console.log("Fetched data:", timelines);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [eventIdStr, timelineIdStr, axios]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-4">
      <BreadcrumbNavigation
        path={`/event/${eventIdStr}/timeline`}
        previousPageName="Timeline"
      />
      <h1 className="text-xl font-bold">Edit Activity</h1>
      <ActivityForm
        eventId={eventIdStr}
        isCreateActivity={false}
        // timelineId={timelineIdStr}
        // activityData={eventData}
      />
    </section>
  );
}
