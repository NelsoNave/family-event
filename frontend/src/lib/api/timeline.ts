import { TimelineType } from "@/types/timeline";
import { AxiosError } from "axios";
import { getServerAxiosInstance } from "./axios-server";

// Fetch timeline
export const getTimeline = async (
  eventId: string,
): Promise<{ timelines: TimelineType[] }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = (await axiosInstance.get(`/events/${eventId}/timelines`))
      .data.data;

    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to create activity. Please try again.");
    }
  }
};
