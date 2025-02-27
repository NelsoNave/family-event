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
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/timelines`,
      activityData,
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create activity. Please try again.");
  }
};

// Update activity
export const updateActivity = async ({
  activityData,
  eventId,
}: {
  activityData: Omit<TimelineType, "id">;
  eventId: string;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/timelines`,
      activityData,
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update activity. Please try again.");
  }
};

// Delete activity
export const deleteActivity = async (
  eventId: string,
  timelineId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.delete(
      `events/${eventId}/timelines/${timelineId}`,
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete activity. Please try again.");
  }
};
