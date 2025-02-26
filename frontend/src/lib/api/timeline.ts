import { TimeLineType } from "@/types/time-line";
import { getServerAxiosInstance } from "./axios-server";

// Fetch event information for RSVP
export const getTimeline = async (
  eventId: string,
): Promise<{ timeLine: TimeLineType[] }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = (await axiosInstance.get(`/events/${eventId}/timelines`))
      .data.data;

    return response;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error();
    } else {
      throw new Error(String(err));
    }
  }
};
