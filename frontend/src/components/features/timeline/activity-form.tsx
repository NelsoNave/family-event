"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { addActivity, updateActivity } from "@/lib/actions/event/timeline";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { EventType } from "@/types/event";
import { TimelineType } from "@/types/timeline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ActivityFormProps = {
  eventId: string;
  timelineId?: string;
  isCreateActivity: boolean;
  activityData?: TimelineType;
};

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Activity title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Activity detail must be at least 2 characters.",
  }),
  startTime: z.string(),
  endTime: z.string(),
});

const extractTime = (datetime: string) => {
  const date = new Date(datetime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function ActivityForm({
  eventId,
  isCreateActivity,
  activityData,
}: ActivityFormProps) {
  const router = useRouter();
  const axios = useAuthAxios();
  const [eventDate, setEventDate] = useState<EventType["startTime"] | null>(
    null,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startTime: isCreateActivity
        ? ""
        : extractTime(activityData?.startTime || ""),
      endTime: isCreateActivity ? "" : extractTime(activityData?.endTime || ""),
      title: isCreateActivity ? "" : activityData?.title || "",
      description: isCreateActivity ? "" : activityData?.description || "",
    },
  });

  const handleActivitySubmission = async (activityData: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
  }) => {
    try {
      if (isCreateActivity) {
        return await addActivity({ activityData, eventId });
      } else {
        return await updateActivity({ activityData, eventId });
      }
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(toast, err, err.message);
      } else {
        showErrorToast(
          toast,
          err,
          "An error occurred while processing your request. Please try again.",
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{
          event: EventType;
        }>(`/events/${eventId}`);

        const eventData = response.data.event;

        if (eventData) {
          setEventDate(eventData.startTime);
        }
      } catch (err) {
        showErrorToast(
          toast,
          err,
          "Failed to fetch event information. Please try again.",
        );
      }
    };

    fetchData();
  }, [axios, eventId]);

  if (!eventDate) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const date = new Date(eventDate);
      const targetDate = date.toISOString().replace(/T.*Z$/, "");
      const formattedStartTime = new Date(
        `${targetDate}T${data.startTime}:00`,
      ).toISOString();
      const formattedEndTime = new Date(
        `${targetDate}T${data.endTime}:00`,
      ).toISOString();

      const activityData = {
        title: data.title,
        description: data.description,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };

      const response = await handleActivitySubmission(activityData);

      if (response?.success) {
        router.push(`/event/${eventId}/timeline`);
      }
    } catch (err) {
      showErrorToast(toast, err, "Failed to add activity. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="startTime"
            render={() => (
              <FormItem className="flex w-full flex-col space-y-2">
                <FormLabel className="font-semibold">Start time</FormLabel>
                <FormControl>
                  <Controller
                    name="startTime"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="time"
                        id="start-time"
                        {...field}
                        className="h-10 rounded-md border border-border p-4 font-medium"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={() => (
              <FormItem className="flex w-full flex-col space-y-2">
                <FormLabel className="font-semibold">End time</FormLabel>
                <FormControl>
                  <Controller
                    name="endTime"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="time"
                        id="end-time"
                        {...field}
                        className="h-10 rounded-md border border-border p-4 font-medium"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Activity title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter activity title"
                  {...field}
                  className="h-12 font-medium placeholder:text-textSub"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Activity detail</FormLabel>
              <FormControl>
                <textarea
                  className="w-full rounded-md border p-4 font-medium placeholder:text-textSub"
                  rows={4}
                  placeholder="Enter activity details"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-10 w-full rounded-full text-base font-bold"
        >
          {isCreateActivity ? "Add timeline" : "Update timeline"}
        </Button>
      </form>
    </Form>
  );
}
