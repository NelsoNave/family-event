"use server";

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { TimelineType } from "@/types/timeline";
import { AxiosError } from "axios";

// Add activity
export const addActivity = async ({
  requestData,
  eventId,
}: {
  requestData: Omit<TimelineType, "id">;
  eventId: string;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/timelines`,
      requestData,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to create activity. Please try again.");
    }
  }
};

// Update activity
export const updateActivity = async ({
  requestData,
  eventId,
  activityId,
}: {
  requestData: Omit<TimelineType, "id">;
  eventId: string;
  activityId: number;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.put(
      `/events/${eventId}/timelines/${activityId}`,
      requestData,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new AxiosError("Failed to update activity. Please try again.");
    }
  }
};

// Delete activity
export const deleteActivity = async (
  eventId: string,
  activityId: number,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.delete(
      `events/${eventId}/timelines/${activityId}`,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to delete activity. Please try again.");
    }
  }
};
