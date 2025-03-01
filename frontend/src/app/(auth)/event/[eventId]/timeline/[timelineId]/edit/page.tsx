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

  useEffect(() => {
    if (!eventId) {
      notFound();
    }

    const fetchTimelineData = async () => {
      try {
        const response = await axios.get<{
          data: { timelines: TimelineType[] };
        }>(`/events/${eventId}/timelines`);

        const timelines = response.data.data.timelines;

        const selectedActivity = timelines.find(
          (timeline) => timeline.id === Number(timelineId),
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
  }, [eventId, timelineId, axios, toast]);

  if (!activityData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="space-y-4">
      <BreadcrumbNavigation
        path={`/event/${eventId}/timeline`}
        previousPageName="Timeline"
      />
      <h1 className="text-xl font-bold">Edit Activity</h1>
      <ActivityForm eventId={eventId as string} activityData={activityData} />
    </section>
  );
}
