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
import { useToast } from "@/hooks/use-toast";
import { addActivity } from "@/lib/actions/event/timeline";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ActivityFormProps = {
  eventId: string;
  timelineId?: string;
  isCreateActivity: boolean;
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

export function ActivityForm({ eventId, isCreateActivity }: ActivityFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "00:00",
      endTime: "00:00",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      if (isCreateActivity) {
        const response = await addActivity({
          activityData: {
            title: data.title,
            description: data.description,
            startTime: data.startTime,
            endTime: data.endTime,
          },
          eventId,
        });

        if (response && response.success) {
          router.push(`/event/${eventId}/timeline`);
        }
      } else {
        // TODO: update activity
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
                  placeholder="Enter activity details"
                  className="w-full rounded-md border p-4 font-medium placeholder:text-textSub"
                  rows={4}
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
          {isCreateActivity ? "Add timeline" : "Edit timeline"}
        </Button>
      </form>
    </Form>
  );
}
