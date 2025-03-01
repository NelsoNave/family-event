import { EventType } from "@/types/event";
import { getServerAxiosInstance } from "./axios-server";

// Fetch event information for RSVP
export const getEventInformation = async (
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

export const checkIsHost = async (eventId: string): Promise<boolean> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get<{ isHost: boolean }>(
      `events/${eventId}/is-host`,
    );
    return response.data.isHost;
  } catch (err) {
    throw new Error(String(err));
  }
};
