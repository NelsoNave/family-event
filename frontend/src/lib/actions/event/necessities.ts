import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { GuestNecessitiesListType, HostNecessitiesListType } from "@/types/necessities";

export const getHostNecessitiesInfo = async (
  eventId: string,
): Promise<HostNecessitiesListType> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`/events/${eventId}/necessities`);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Necessity not found");
    } else {
      throw new Error(String(err));
    }
  }
};

export const getGuestNecessitiesInfo = async (eventId: string): Promise<GuestNecessitiesListType> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`/events/${eventId}/me/necessities`);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Event not found");
    } else {
      throw new Error(String(err));
    }
  }
};
