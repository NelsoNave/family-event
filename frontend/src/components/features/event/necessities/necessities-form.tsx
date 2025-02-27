"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { HostNecessitiesListType } from "@/types/necessities";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  necessities: z
    .array(
      z.object({
        item: z.string().min(1, "Item name is required"),
      }),
    )
    .min(1, "At least one necessity is required"),
  noteForNecessities: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type NecessitiesFormProps = {
  initialData: HostNecessitiesListType | null;
};

export default function NecessitiesForm({ initialData }: NecessitiesFormProps) {
  const axios = useAuthAxios();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      necessities: [{ item: "" }],
      noteForNecessities: "",
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "necessities",
  });

  useEffect(() => {
    if (initialData) {
      reset({
        necessities: initialData.necessities,
        noteForNecessities: initialData.noteForNecessities || "",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const eventId = params?.eventId;

      const postData: HostNecessitiesListType = {
        necessities: data.necessities.map((item, index) => ({
          ...item,
          id: initialData?.necessities[index]?.id ?? ""
        })),
        noteForNecessities: data.noteForNecessities || "",
      };

      let response;
      if (initialData) {
        response = await axios.patch(
          `/events/${eventId}/necessities`,
          postData,
        );
      } else {
        response = await axios.post(`/events/${eventId}/necessities`, postData);
      }

      if (response.status !== 200) {
        throw new Error();
      }
      router.push(`/event/${eventId}/necessities`);
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to create a necessity. Please try again.",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={control}
                name={`necessities.${index}.item`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} placeholder="Item name" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ item: "" })}
              className="rounded-full border border-accentGreen bg-white text-accentGreen"
            >
              <PlusIcon size={16} /> Add item
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Message to guests</Label>
          <Textarea
            {...form.register("noteForNecessities")}
            placeholder="Write your message"
          />
        </div>

        <div className="p-4">
          <Button
            type="submit"
            className="h-auto w-full rounded-full py-3 text-base font-bold"
          >
            {initialData?.necessities && initialData.necessities.length > 0 ? "Update item list" : "Create item list"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
