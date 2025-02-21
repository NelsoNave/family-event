import { EventType } from "@/types/event";
import { getServerAxiosInstance } from "./axios-server";

// Fetch event information
export const getEventInfo = async (
  eventId: string,
): Promise<{ event: EventType }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`events/${eventId}`);
    return response.data.event;

    // ********** Uncomment the data below to use dummy data **********
    // return {
    //   // Dummy data
    //   event: {
    //     id: "12345",
    //     title: "Emily’s Birthday Party🚀",
    //     thumbnailUrl: "/images/sample-thumbnail.png",
    //     startTime: new Date("2025-03-01T14:00:00Z"),
    //     endTime: new Date("2025-03-01T16:00:00Z"),
    //   },
    // };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error();
    } else {
      throw new Error(String(err));
    }
  }
};
