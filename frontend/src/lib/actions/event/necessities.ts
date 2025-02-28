"use server"

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import {
  HostNecessitiesListType,
} from "@/types/necessities";

export const getHostNecessitiesInfo = async (
  eventId: string,
): Promise<HostNecessitiesListType> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(`/events/${eventId}/necessities`);
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Host necessity not found");
    } else {
      throw new Error(String(err));
    }
  }
};

export const getGuestNecessitiesInfo = async (
  eventId: string,
) => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(
      `/events/${eventId}/me/necessities`,
    );
    return response.data.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Guest necessity not found");
    } else {
      throw new Error(String(err));
    }
  }
};

export const switchGuestNecessitiesStatus = async (
  eventId: string,
  necessityId: string,
  isAdded: boolean,
) => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.patch(
      `/events/${eventId}/me/necessities/${necessityId}`,
      {isAdded},
    );
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message || "Guest necessity item not found");
    } else {
      throw new Error(String(err));
    }
  }
};
