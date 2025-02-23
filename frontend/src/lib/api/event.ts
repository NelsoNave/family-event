import { EventType } from "@/types/event";
import { getServerAxiosInstance } from "./axios-server";

// Fetch event information for RSVP
export const getEventForRsvp = async (
  eventId: string,
): Promise<{ event: EventType }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`events/${eventId}`);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error();
    } else {
      throw new Error(String(err));
    }
  }
};

