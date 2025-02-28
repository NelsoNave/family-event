"use client";

import BreadcrumbNavigation from "@/components/features/event/breadcrumb-navigation";
import { ActivityForm } from "@/components/features/timeline/activity-form";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { TimelineType } from "@/types/timeline";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditActivity() {
  const { eventId, timelineId } = useParams();
  const [activityData, setActivityData] = useState<TimelineType | null>(null);
  const axios = useAuthAxios();
  const { toast } = useToast();

  const eventIdStr = typeof eventId === "string" ? eventId : "";
  const timelineIdStr = typeof timelineId === "string" ? timelineId : "";

  useEffect(() => {
    if (!eventIdStr) {
      notFound();
    }

    const fetchTimelineData = async () => {
      try {
        const response = await axios.get<{
          data: { timelines: TimelineType[] };
        }>(`/events/${eventIdStr}/timelines`);

        const timelines = response.data.data.timelines;

        const selectedActivity = timelines.find(
          (timeline) => timeline.id == timelineId,
        );

        if (selectedActivity) {
          setActivityData(selectedActivity);
        }
      } catch (err) {
        showErrorToast(
          toast,
          err,
          "Failed to fetch the event information. Please try again.",
        );
      }
    };

    fetchTimelineData();
  }, [eventIdStr, timelineIdStr, axios, timelineId, toast]);

  if (!activityData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-4">
      <BreadcrumbNavigation
        path={`/event/${eventIdStr}/timeline`}
        previousPageName="Timeline"
      />
      <h1 className="text-xl font-bold">Edit Activity</h1>
      <ActivityForm eventId={eventIdStr} activityData={activityData} />
    </section>
  );
}
