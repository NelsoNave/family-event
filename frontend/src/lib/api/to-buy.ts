import { BudgetDetailType, BudgetType, ShoppingItemType } from "@/types/to-buy";
import { AxiosError } from "axios";
import { getServerAxiosInstance } from "./axios-server";

type ThingsToBuyResponse = {
  thingsToBuy: ShoppingItemType[];
  budget: BudgetType;
};

type ThingToBuyResponse = {
  thingToBuy: { thingToBuy: ShoppingItemType };
  remainBudget: BudgetType;
};

type ThingsToBuyBudgetResponse = {
  budget: BudgetType;
  remainBudget: BudgetDetailType["remainBudget"];
  totalSpend: BudgetDetailType["totalSpend"];
};

type ThingsToBuyWithBudgetResponse = {
  thingsToBuy: ShoppingItemType[];
  budgetDetails: ThingsToBuyBudgetResponse;
};

// Fetch things to buy
export const getThingsToBuy = async (
  eventId: string,
): Promise<ThingsToBuyResponse> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(
      `/events/${eventId}/things-to-buy`,
    );

    return {
      thingsToBuy: response.data.data.thingsToBuy,
      budget: response.data.budget,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      throw new Error(
        err.response?.data?.message ||
          "An error occurred while fetching the shopping list.",
      );
    } else {
      throw new Error(
        "Failed to fetch the shopping list. Please try again.",
      );
    }
  }
};

// Fetch budget, total spend, remain budget
export const getThingsToBuyBudget = async (
  eventId: string,
): Promise<ThingsToBuyBudgetResponse> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(
      `/events/${eventId}/things-to-buy/budget`,
    );

    return {
      budget: response.data.budget,
      remainBudget: response.data.remainBudget,
      totalSpend: response.data.totalSpend,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      throw new Error(
        err.response?.data?.message ||
          "An error occurred while fetching the budget overview.",
      );
    } else {
      throw new Error("Failed to fetch the budget overview. Please try again.");
    }
  }
};

// Fetch thing to buy
export const getThingToBuy = async (
  eventId: string,
  itemId: ShoppingItemType["id"],
): Promise<ThingToBuyResponse> => {
  try {
    const axiosInstance = await getServerAxiosInstance();
    const response = await axiosInstance.get(
      `/events/${eventId}/things-to-buy/${itemId}`,
    );

    return {
      thingToBuy: response.data.data,
      remainBudget: response.data.remainBudget,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      throw new Error(
        err.response?.data?.message ||
          "An error occurred while fetching the thing to buy.",
      );
    } else {
      throw new Error("Failed to fetch the thing to buy. Please try again.");
    }
  }
};

// Fetch things to buy with budget details
export const getThingsToBuyWithBudget = async (
  eventId: string,
): Promise<ThingsToBuyWithBudgetResponse> => {
  try {
    const thingsToBuy = await getThingsToBuy(eventId);
    const budgetDetails = await getThingsToBuyBudget(eventId);

    return {
      thingsToBuy: thingsToBuy.thingsToBuy,
      budgetDetails,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response) {
      throw new Error(
        err.response?.data?.message ||
          "An error occurred while fetching the shopping list with budget details.",
      );
    } else {
      throw new Error(
        "Failed to fetch the shopping list with budget details. Please try again.",
      );
    }
  }
};
