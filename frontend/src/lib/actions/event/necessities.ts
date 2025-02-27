import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { HostNecessitiesType } from "@/types/necessities/necessities";

export const getHostNecessitiesInfo =
  async (eventId: number): Promise<HostNecessitiesType> => {
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

// export const getGuestNecessitiesInfo = async (): Promise<MyPageEventReturnType> => {
//   try {
//     const axiosInstance = await getServerAxiosInstance();
//     const response = await axiosInstance.get(`/me/events`);
//     return response.data;
//   } catch (err) {
//     if (err instanceof Error) {
//       throw new Error(err.message || "Event not found");
//     } else {
//       throw new Error(String(err));
//     }
//   }
// };
