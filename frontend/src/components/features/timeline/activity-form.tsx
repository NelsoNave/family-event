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

export function ActivityForm({
  eventId,
  isCreateActivity,
  activityData,
}: ActivityFormProps) {
  const router = useRouter();
  const axios = useAuthAxios();
  const [eventData, setEventData] = useState<EventType | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startTime: "00:00",
      endTime: "00:00",
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
    if (isCreateActivity) {
      console.log(activityData);
      return await addActivity({ activityData, eventId });
    } else {
      return await updateActivity({ activityData, eventId });
    }
  };

  useEffect(() => {
    if (!eventId) {
      console.error("Event ID is required.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get<{
          event: { event: EventType };
        }>(`/events/${eventId}`);

        const event = response.data.event;

        if (event) {
          setEventData(event.startTime);
        } else {
          console.error("Timeline not found.");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, [axios, eventId]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const date = new Date(eventData);
      const targetDate = date.toISOString().replace(/T.*Z$/, "");
      const formattedStartTime = `${targetDate}T${data.startTime}:00.000Z`;
      const formattedEndTime = `${targetDate}T${data.endTime}:00.000Z`;

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
