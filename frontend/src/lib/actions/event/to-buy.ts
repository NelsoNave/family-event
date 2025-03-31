"use server";

import { getServerAxiosInstance } from "@/lib/api/axios-server";
import { BaseItemType, BudgetType, ShoppingItemType } from "@/types/to-buy";
import { AxiosError } from "axios";

// Create things to buy (including budget)
export const createThingsToBuy = async ({
  eventId,
  budget,
  requestData,
}: {
  eventId: string;
  budget: BudgetType;
  requestData: BaseItemType;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/things-to-buy/init`,
      {
        budget: budget,
        item: requestData,
      },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to create the shopping list. Please try again.");
    }
  }
};

// Add item
export const addItem = async ({
  eventId,
  requestData,
}: {
  eventId: string;
  requestData: BaseItemType;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.post(
      `/events/${eventId}/things-to-buy`,
      {
        item: requestData,
      },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to add item. Please try again.");
    }
  }
};

// Update purchase status
export const updatePurchaseStatus = async ({
  eventId,
  itemId,
  isPurchased,
}: {
  isPurchased: boolean;
  eventId: string;
  itemId: ShoppingItemType["id"];
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.patch(
      `/events/${eventId}/things-to-buy/${itemId}/is-purchased`,
      { isPurchased },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new AxiosError(
        "Failed to update the purchase status. Please try again.",
      );
    }
  }
};

// Update item
export const updateItem = async ({
  eventId,
  itemId,
  requestData,
}: {
  eventId: string;
  itemId: ShoppingItemType["id"];
  requestData: BaseItemType;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.put(
      `/events/${eventId}/things-to-buy/${itemId}`,
      {
        item: requestData,
      },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new AxiosError("Failed to update item. Please try again.");
    }
  }
};

// Update budget
export const updateBudget = async ({
  eventId,
  budget,
}: {
  eventId: string;
  budget: BudgetType;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.patch(
      `/events/${eventId}/things-to-buy/budget`,
      { budget },
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new AxiosError("Failed to update budget. Please try again.");
    }
  }
};

// Delete item
export const deleteItem = async (
  eventId: string,
  itemId: ShoppingItemType["id"],
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.delete(
      `/events/${eventId}/things-to-buy/${itemId}`,
    );

    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    } else {
      throw new Error("Failed to delete item. Please try again.");
    }
  }
};
