"use server";

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { ParticipantsResponseType } from "@/types/participant";
import { AxiosError } from "axios";

// Fetch participants
export const getParticipants = async (
  eventId: string,
): Promise<ParticipantsResponseType> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`/events/${eventId}/participants`);

    return response.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    } else {
      throw new Error("Failed to fetch participants. Please try again.");
    }
  }
};

// Update participant attendance
export const updateParticipantAttendance = async (
  eventId: string,
  participantId: number,
  isAttended: boolean,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.patch(
      `/events/${eventId}/participants/${participantId}/attendance`,
      {isAttended},
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    } else {
      throw new AxiosError(
        "Failed to update participant attendance. Please try again.",
      );
    }
  }
};

// Update temporary participant attendance
export const updateTempParticipantsAttendance = async (
  eventId: string,
  participantId: number,
  isAttended: boolean,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.patch(
      `/events/${eventId}/participants/temporary/${participantId}/attendance`,
      {isAttended},
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err;
    } else {
      throw new AxiosError(
        "Failed to update temporary participant attendance. Please try again.",
      );
    }
  }
};

// Delete participants
export const deleteParticipant = async (
  eventId: string,
  participantId: number,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.delete(
      `events/${eventId}/participants/${participantId}`,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to delete participant. Please try again.");
    }
  }
};

// Add temporary participant
export const addTemporaryParticipant = async (
  eventId: string,
  name: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/participants/temporary`,
      { name },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new AxiosError(
        "Failed to add temporary participant. Please try again.",
      );
    }
  }
};

// Delete temporary participants
export const deleteTemporaryParticipant = async (
  eventId: string,
  participantId: number,
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.delete(
      `events/${eventId}/temporary/${participantId}`,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error(
        "Failed to delete temporary participant. Please try again.",
      );
    }
  }
};
