"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import process from "process";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/";

export const axiosInstance = axios.create({
  baseURL,
});

export const getServerAxiosInstance = async () => {
  "use server";
  const { getToken } = await auth();
  const token = await getToken();

  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Public axios instance
export const publicAxios = axios.create({
  baseURL,
});
