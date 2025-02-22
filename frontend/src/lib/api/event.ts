import { EventType } from "@/types/event";
// import { useAuthAxios } from "./axios-client";

// Fetch event information
export const getEventInfo = async (eventId: string): Promise<EventType> => {
  try {
    // const axios = useAuthAxios();
    // const response = await axios.get(`events/${eventId}`);

    return {
      // Dummy Data
      id: "12345",
      title: "Emily’s Birthday Party🚀",
      thumbnail: "/images/sample-thumbnail.png",
      startTime: new Date("2025-03-01T14:00:00Z"),
      endTime: new Date("2025-03-01T16:00:00Z"),
    };
  } catch (err) {
    throw new Error("Event not found");
  }
};

