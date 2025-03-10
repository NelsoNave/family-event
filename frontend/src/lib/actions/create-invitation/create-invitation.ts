"use server";

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { CreateEventType } from "@/types/event";

import { AxiosError } from "axios";

type CreateEventRequestType = {
  event: CreateEventType;
  thumbnail: File;
};

// Create invitation
export const createInvitation = async ({
  requestData,
}: {
  requestData: CreateEventRequestType;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const formData = new FormData();

    // Append thumbnail if available
    if (requestData.thumbnail && requestData.thumbnail.size !== 0) {
      formData.append("thumbnail", requestData.thumbnail);
    } else {
      formData.append("thumbnail", "");
    }

    if (requestData.event) {
      formData.append(
        "event",
        JSON.stringify({
          ...requestData.event,
        }),
      );
    }

    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(`/events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error(
        "Failed to create the event invitation. Please try again.",
      );
    }
  }
};
