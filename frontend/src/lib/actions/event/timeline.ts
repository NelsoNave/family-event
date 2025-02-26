"use server";

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { TimelineType } from "@/types/timeline";

// Add activity
export const addActivity = async ({
  activityData,
  eventId,
}: {
  activityData: Omit<TimelineType, "id">;
  eventId: string;
}) => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/timelines`,
      activityData,
    );

    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unknown error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
