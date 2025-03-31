"use client";

import MapWithMarkers from "@/components/features/create-invitation/map-with-markers";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { THEME_CONFIG } from "@/constants/theme-colors";
import { toast } from "@/hooks/use-toast";
import { createInvitation } from "@/lib/actions/create-invitation/create-invitation";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  FerrisWheel,
  House,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    title: z.string().min(1, "Title is required."),
    startTime: z.string().min(1, {
      message: "Please select the start time.",
    }),
    endTime: z.string().min(1, {
      message: "Please select the end time.",
    }),
    thumbnail: z.custom<File[]>().optional(),
    date: z.date({
      required_error: "A date of an event is required.",
    }),
    isAskRestrictions: z.boolean({
      required_error: "Please select an options to display.",
    }),
    theme: z.string({
      required_error: "Please select a theme to display.",
    }),
    latitude: z.number(),
    longitude: z.number(),
    address: z.string(),
  })
  .refine(
    (data) => {
      if (!data.startTime || !data.endTime) return true;
      return data.startTime < data.endTime;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );

type FormData = z.infer<typeof formSchema>;

const MemoizedMapComponent = React.memo(MapWithMarkers);

export default function CreateEventPage() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const inputImageRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [eventType, setEventType] = useState<string>("homeParty");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<keyof typeof THEME_CONFIG>("orange");

  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startTime: "00:00",
      endTime: "00:00",
      isAskRestrictions: false,
      theme: THEME_CONFIG.orange.color,
      thumbnail: [],
      latitude: 0,
      longitude: 0,
      address: "",
    },
  });

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleEventTypeChange = (value: string) => {
    setEventType(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", [file]);

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleImageClick = () => {
    inputImageRef.current?.click();
  };

  const onSubmit = async (requestData: FormData) => {
    let response;
    try {
      setLoading(true);

      const { address } = requestData;
      if (!address) {
        throw new Error("Please select a valid address.");
      }

      const eventDate = new Date(requestData.date);
      const targetDate = eventDate.toISOString().replace(/T.*Z$/, "");

      const formattedStartDateTime = new Date(
        `${targetDate}T${requestData.startTime}:00`,
      ).toISOString();

      const formattedEndDateTime = new Date(
        `${targetDate}T${requestData.endTime}:00`,
      ).toISOString();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { date, ...eventDetails } = requestData;

      response = await createInvitation({
        requestData: {
          ...eventDetails,
          startTime: formattedStartDateTime,
          endTime: formattedEndDateTime,
          thumbnail:
            requestData.thumbnail && requestData.thumbnail[0] instanceof File
              ? requestData.thumbnail[0]
              : new File([], ""),
        },
      });

      if (response?.success) {
        router.push(
          `/event/created?eventId=${response.data.event.id}&title=${response.data.event.title}&thumbnailUrl=${response.data.event.thumbnailUrl}`,
        );
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = useCallback(
    (place: { latitude: number; longitude: number; address: string }) => {
      form.setValue("latitude", place.latitude);
      form.setValue("longitude", place.longitude);
      form.setValue("address", place.address);
    },
    [form],
  );

  const ThemeOption = ({
    value,
    src,
    alt,
    label,
  }: {
    value: string;
    src: string;
    alt: string;
    label: string;
  }) => (
    <SelectItem value={value}>
      <div className="flex h-full w-full items-center gap-2">
        <Image
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="h-12 w-[70px] rounded object-cover"
        />
        <p className="text-base font-medium">{label}</p>
      </div>
    </SelectItem>
  );

  const memoizedMapProps = useMemo(
    () => ({
      apiKey: googleMapsApiKey,
      center: { lat: 49.2827, lng: -123.1207 },
      onPlaceSelect: handleAddressSelect,
    }),
    [googleMapsApiKey, handleAddressSelect],
  );

  return (
    <section className="container mx-auto space-y-6 p-4 pb-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <div
                  className="relative flex h-[240px] w-full cursor-pointer flex-col items-center justify-center rounded-lg"
                  onClick={handleImageClick}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={500}
                      height={500}
                      className="h-full w-full rounded object-cover"
                    />
                  ) : (
                    <div className="relative h-full w-full rounded-lg border border-dashed border-textBorder bg-background">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PlusIcon className="text-textSub" size={32} />
                      </div>
                      <p className="absolute bottom-4 w-full text-center text-sm font-bold text-textSub">
                        Add an image of the guest of honor!
                      </p>
                    </div>
                  )}
                  <FormControl>
                    <input
                      type="file"
                      ref={(e) => {
                        field.ref(e);
                        inputImageRef.current = e;
                      }}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        handleImageChange(e);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add Event Title"
                    className="w-full py-4 text-2xl font-bold outline-none placeholder:text-textBorder"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="w-full bg-white text-base hover:bg-white">
                      <Button
                        variant="outline"
                        className="flex h-12 w-full justify-start pl-3 text-left"
                      >
                        <CalendarIcon size={16} className="text-textSub" />
                        {field.value ? (
                          <span className="font-normal">
                            {format(field.value, "PPP")}
                          </span>
                        ) : (
                          <span className="text-textSub">Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date <= new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                      className="font-bold"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full gap-6">
            <FormField
              control={form.control}
              name="startTime"
              render={() => (
                <FormItem className="flex w-full flex-col space-y-2">
                  <FormLabel className="font-semibold">Start time</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          const startTimeInput = document.getElementById(
                            "start-time-input",
                          ) as HTMLInputElement;
                          startTimeInput?.showPicker();
                        }}
                      >
                        <Clock size={16} className="text-textSub" />
                      </button>
                      <Controller
                        name="startTime"
                        control={form.control}
                        render={({ field }) => (
                          <input
                            type="time"
                            id="start-time-input"
                            {...field}
                            className="font-base h-12 w-full rounded-md border border-border p-4 pl-10"
                            onClick={() => {
                              const startTimeInput = document.getElementById(
                                "start-time-input",
                              ) as HTMLInputElement;
                              startTimeInput?.showPicker();
                            }}
                          />
                        )}
                      />
                    </div>
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
                    <div className="relative flex">
                      <button
                        type="button"
                        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                          const endTimeInput = document.getElementById(
                            "end-time-input",
                          ) as HTMLInputElement;
                          endTimeInput?.showPicker();
                        }}
                      >
                        <Clock size={16} className="text-textSub" />
                      </button>
                      <Controller
                        name="endTime"
                        control={form.control}
                        render={({ field }) => (
                          <input
                            type="time"
                            id="end-time-input"
                            {...field}
                            className="font-base h-12 w-full rounded-md border border-border p-4 pl-10"
                            onClick={() => {
                              const endTimeInput = document.getElementById(
                                "end-time-input",
                              ) as HTMLInputElement;
                              endTimeInput?.showPicker();
                            }}
                          />
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormItem className="flex flex-col">
            <FormLabel className="font-semibold">Event type</FormLabel>
            <Select
              defaultValue="homeParty"
              value={eventType}
              onValueChange={handleEventTypeChange}
            >
              <FormControl className="h-12">
                <SelectTrigger
                  className={`${eventType ? "text-black" : "text-textSub"}`}
                >
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="homeParty">
                  <div className="flex h-6 items-center gap-2 text-base">
                    <House size={16} className="text-textSub" />
                    House party
                  </div>
                </SelectItem>
                <SelectItem value="outside">
                  <div className="flex h-6 items-center gap-2 text-base">
                    <FerrisWheel size={16} className="text-textSub" />
                    Outside
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>

          <div>
            <p className="mb-2 text-sm font-semibold">Location</p>
            {eventType === "outside" ? (
              <Tabs defaultValue="Current location" className="w-full">
                <TabsList className="mb-2 flex w-full bg-transparent">
                  <TabsTrigger
                    value="Current location"
                    className="w-full border-b-2 border-textBorderLight bg-transparent pb-2 font-bold data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accentGreen data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
                  >
                    Current location
                  </TabsTrigger>
                  <TabsTrigger
                    value="Based on activities"
                    className="w-full border-b-2 border-textBorderLight bg-transparent pb-2 font-bold data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accentGreen data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
                  >
                    Based on activities
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Current location">
                  <MemoizedMapComponent {...memoizedMapProps} />
                </TabsContent>
                <TabsContent value="Based on activities">
                  <MemoizedMapComponent
                    {...memoizedMapProps}
                    isSuggest={true}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <MemoizedMapComponent {...memoizedMapProps} />
            )}
          </div>

          <FormField
            control={form.control}
            name="isAskRestrictions"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-semibold">Options</FormLabel>
                <FormItem className="flex h-12 flex-row items-center justify-between rounded-lg border px-4 shadow-sm">
                  <FormLabel className="text-sm">
                    Ask allergies or dietary restrictions
                  </FormLabel>
                  <FormControl style={{ margin: 0 }}>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-accentGreen data-[state=checked]:bg-accentGreen"
                    />
                  </FormControl>
                </FormItem>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Invitation Theme
                </FormLabel>
                <Select
                  value={theme as string}
                  onValueChange={(value) => {
                    setTheme(value as keyof typeof THEME_CONFIG);
                    form.setValue(
                      "theme",
                      THEME_CONFIG[value as keyof typeof THEME_CONFIG].color,
                    );
                  }}
                >
                  <FormControl className="h-16">
                    <SelectTrigger>
                      <SelectValue placeholder="Select an invitation theme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(THEME_CONFIG).map((key) => (
                      <ThemeOption
                        key={key}
                        value={key}
                        src={`/images/theme-${key}.svg`}
                        alt={`${key} theme`}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                      />
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-12 w-full rounded-full text-base font-bold"
            style={{ backgroundColor: THEME_CONFIG[theme].color }}
            disabled={loading}
          >
            {loading ? (
              <span>Creating invitation...</span>
            ) : (
              "Create invitation"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
