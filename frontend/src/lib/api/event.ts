import { EventType } from "@/types/event";
import { getServerAxiosInstance } from "./axios-server";

// Fetch event information
export const getEventInfo = async (
  eventId: string,
): Promise<{ event: EventType }> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`events/${eventId}`);
    return response.data;

    // ********** Uncomment the data below to use dummy data **********
    // return {
    //   // Dummy data
    //   event: {
    //     id: "12345ABC",
    //     hostId: "67890XYZ",
    //     title: "Spring Music Festival",
    //     thumbnailUrl: "/images/sample-thumbnail.png",
    //     startTime: new Date("2025-03-01T14:00:00Z"),
    //     endTime: new Date("2025-03-01T16:00:00Z"),
    //     country: "Canada",
    //     postalCode: "100-0001",
    //     province: "BC",
    //     city: "Vancouver",
    //     address1: "1-1 Vancouver Street",
    //     address2: "Tokyo International Hall, 5th Floor",
    //     isAskRestriction: true,
    //     theme: "#F6F2FF",
    //     noteForNecessities: "Please bring your own drinks and food.",
    //     noteForThingsToBuy: "You can buy event merchandise at the venue.",
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
