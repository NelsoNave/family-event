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
import { HostNecessitiesListType, HostNecessitiesPostType } from "@/types/necessities";
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
        id: z.string().optional(),
        item: z.string().min(1, "Item name is required"),
      }),
    )
    .default([]),
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
      necessities: initialData?.necessities.map((n) => ({
        id: n.id ?? "",
        item: n.item ?? "",
      })) ?? [{ id: "", item: "" }],
      noteForNecessities: initialData?.noteForNecessities || "",
    },
    shouldUnregister: true,
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

      const postData: HostNecessitiesPostType = {
        necessities: data.necessities.map((item) => {
          const initialItem = initialData?.necessities.find(
            (init) => init.id === item.id,
          );
          return {
            ...item,
            id: initialItem?.id ?? "",
          };
        }),
        noteForNecessities: data.noteForNecessities || "",
      };

      console.log("postData", postData)

      let response;
      if (initialData) {
        response = await axios.patch(
          `/events/${eventId}/necessities`,
          postData,
        );
      } else {
        response = await axios.post(`/events/${eventId}/necessities`, postData);
      }

      console.log("response", response)

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
            {fields.map((field, index) => {
              // const initialItem = initialData?.necessities.find(
              //   (init) => init.id === field.id,
              // );
              return (
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
                          // NOTE: confirm whether it's okay to submit with zero item
                          // disabled={fields.length <= 1}
                          className="hover:opacity-70 peer-disabled:hover:cursor-not-allowed"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      <FormMessage />
                      {/* <input
                        type="hidden"
                        {...register(`necessities.${index}.id`)}
                        value={initialItem?.id || ""}
                      /> */}
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ item: "" })}
              className="rounded-full border border-accentGreen bg-white text-accentGreen hover:bg-accentGreen hover:text-white"
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
            {initialData?.necessities && initialData.necessities.length > 0
              ? "Update item list"
              : "Create item list"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
