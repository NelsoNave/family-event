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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { getUserInfo } from "@/lib/api/user";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { RsvpResponseType } from "@/types/rsvp-response";
import { useAuth } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  status: z.enum(["ACCEPT", "DECLINE"]),
  restriction: z.string().optional(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(2, {
      message: "Email must be at least 2 characters.",
    }),
  message: z.string().optional(),
  companions: z.array(z.string()).optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type GuestInformationFormProps = {
  selection: RsvpResponseType["status"];
};

const GuestInformationForm = ({ selection }: GuestInformationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "ACCEPT",
      restriction: "",
      name: "",
      email: "",
      message: "",
      companions: [],
      termsAccepted: false,
    },
  });

  const axios = useAuthAxios();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, isSignedIn } = useAuth();

  const [familyMemberOptions, setFamilyMemberOptions] = useState<
    { name: string; profileImageUrl: string }[]
  >([]);
  const [companions, setCompanions] = useState<
    { name: string; profileImageUrl?: string }[]
  >([]);
  const [newCompanionName, setNewCompanionName] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(
    form.getValues("termsAccepted"),
  );
  const [isEmailFetched, setIsEmailFetched] = useState(false);
  const [selectedFamilyValue, setSelectedFamilyValue] = useState<
    string | undefined
  >("");
  const [registeredFamilyMembers, setRegisteredFamilyMembers] = useState<
    { name: string; profileImageUrl: string }[]
  >([]);

  useEffect(() => {
    // Fetch user information when they are logged in
    const fetchUserInfo = async () => {
      if (isLoaded && !isSignedIn) {
        return;
      }

      try {
        const response = await getUserInfo();
        const userInformation = response.user;

        form.setValue("name", userInformation.name);
        form.setValue("email", userInformation.email);

        setFamilyMemberOptions(userInformation.userFamilies);
        setIsEmailFetched(true);

        const registeredFamily = userInformation.userFamilies.map((member) => {
          return { name: member.name, profileImageUrl: member.profileImageUrl };
        });

        setRegisteredFamilyMembers(registeredFamily);
      } catch (err: unknown) {
        showErrorToast(
          toast,
          err,
          "Failed to fetch user information. Please try again.",
        );
      }
    };

    fetchUserInfo();
  }, [form, toast, isLoaded, isSignedIn]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (isLoaded && !isSignedIn) {
        return;
      }

      const eventId = params?.eventId;

      const postData: RsvpResponseType = {
        status: data.status,
        restriction: data.restriction || "",
        guest: {
          name: data.name,
          email: data.email,
        },
        companions: companions.map((companion) => ({
          name: companion.name,
        })),
        message: data.message || "",
        termsAccepted: termsAccepted,
      };

      const response = await axios.post(
        `/event/${eventId}/rsvp-form`,
        postData,
      );

      if (response.status !== 200) {
        throw new Error();
      }

      router.push(`/rsvp/${eventId}/submitted`);
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to submit your RSVP. Please try again.",
      );
    }
  };

  // Companion
  const handleFamilySelectChange = (selectedMember: string) => {
    if (
      selectedMember &&
      !companions.some((companion) => companion.name === selectedMember)
    ) {
      const selectedFamilyMember = familyMemberOptions.find(
        (member) => member.name === selectedMember,
      );

      if (selectedFamilyMember) {
        setCompanions([...companions, selectedFamilyMember]);
      }

      setFamilyMemberOptions(
        familyMemberOptions.filter((member) => member.name !== selectedMember),
      );

      setSelectedFamilyValue("");
    }
  };

  const handleAddCompanion = () => {
    if (newCompanionName.trim() === "") return;
    setCompanions([...companions, { name: newCompanionName }]);
    setNewCompanionName("");
  };

  const handleCompanionChange = (index: number, value: string) => {
    const updatedCompanions = [...companions];
    updatedCompanions[index] = {
      name: value,
      profileImageUrl: companions[index].profileImageUrl,
    };
    setCompanions(updatedCompanions);
  };

  const handleDeleteFamilyMembers = (companion: {
    name: string;
    profileImageUrl?: string;
  }) => {
    const updatedCompanions = companions.filter(
      (existingCompanion) => existingCompanion.name !== companion.name,
    );

    setCompanions(updatedCompanions);

    // Add the companion back to the family options
    if (
      registeredFamilyMembers.some((member) => member.name === companion.name)
    ) {
      setFamilyMemberOptions([
        ...familyMemberOptions,
        {
          name: companion.name,
          profileImageUrl: companion.profileImageUrl || "",
        },
      ]);
    }
  };

  // Toggle terms accepted
  const handleTermsAgreement = () => {
    setTermsAccepted(!termsAccepted);
    form.setValue("termsAccepted", !termsAccepted);
  };

  return (
    <div>
      <h2 className="mb-4 mt-12 text-xl font-bold">Your Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 space-y-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Your name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="bg-white px-4 py-5">
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="font-semibold placeholder:text-textSub"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="bg-white px-4 py-5">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="text-te font-semibold"
                      disabled={isEmailFetched}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {selection === "ACCEPT" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Companion</h3>
              <div className="mt-4">
                {companions.map(
                  (
                    companion: { name: string; profileImageUrl?: string },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      className="mt-2 flex items-center space-x-2"
                    >
                      <div className="relative flex w-full items-center">
                        {companion.profileImageUrl && (
                          <Image
                            src={companion.profileImageUrl}
                            width={32}
                            height={32}
                            alt="profile image"
                            className="absolute left-2 top-[13px] h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <Input
                          value={companion.name}
                          onChange={(e) =>
                            handleCompanionChange(index, e.target.value)
                          }
                          className={`mt-2 w-full bg-white p-4 py-5 font-semibold ${companion.profileImageUrl ? "pl-12" : "pl-4"}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteFamilyMembers(companion)}
                        className="text-red-500"
                      >
                        <Image
                          src="/images/delete.svg"
                          width={100}
                          height={100}
                          alt="delete icon"
                          className="w-full"
                        />
                      </button>
                    </div>
                  ),
                )}
              </div>
              {/* If the user is logged in, they can select companions from their family. */}
              {familyMemberOptions.length > 0 && (
                <FormField
                  control={form.control}
                  name="companions"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full rounded-md bg-white px-4 py-5">
                        <Select
                          {...field}
                          value={selectedFamilyValue}
                          onValueChange={handleFamilySelectChange}
                        >
                          <SelectTrigger className="w-full bg-white px-4 py-5 text-sm font-semibold text-textSub">
                            <SelectValue placeholder="Select from your family" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {familyMemberOptions.map((member, index) => (
                                <SelectItem
                                  key={index}
                                  value={member.name}
                                  className="font-semibold"
                                >
                                  <div className="flex items-center gap-4 font-semibold">
                                    <Image
                                      src={member.profileImageUrl}
                                      width={100}
                                      height={100}
                                      alt="profile image"
                                      className="h-8 w-8 rounded-full object-cover"
                                    />
                                    <p>{member.name}</p>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <div className="mt-4 space-y-2">
                <label className="pt-4 text-sm font-bold">
                  Companion name
                  <Input
                    value={newCompanionName}
                    onChange={(e) => setNewCompanionName(e.target.value)}
                    placeholder="Enter companion's name"
                    className="mt-2 bg-white px-4 py-5 font-semibold placeholder:text-textSub"
                  />
                </label>
                <button
                  type="button"
                  onClick={handleAddCompanion}
                  className="ml-auto flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-bold text-primary hover:opacity-70"
                >
                  <Image
                    src="/images/plus.svg"
                    width={16}
                    height={16}
                    alt="icon for add person"
                  />
                  <span>Add person</span>
                </button>
              </div>
            </div>
          )}
          {selection === "ACCEPT" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">
                  Allergies or dietary restrictions
                </h3>
                <p className="text-sm">
                  If you have any allergies or dietary restrictions, please let
                  us know.
                </p>
              </div>
              <FormField
                control={form.control}
                name="restriction"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="bg-white px-4 py-3">
                      <Textarea
                        placeholder="Enter your note"
                        {...field}
                        className="h-28 font-semibold placeholder:text-textSub"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="space-y-4">
            <h3
              className={`text-lg font-bold ${selection !== "ACCEPT" ? "text-sm" : ""}`}
            >
              Message to the host
            </h3>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white px-4 py-3">
                    <Textarea
                      placeholder="Enter your message"
                      {...field}
                      className="h-28 font-semibold placeholder:text-textSub"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="termsAccepted"
            render={() => (
              <FormItem>
                <FormControl className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTermsAgreement}
                    className="flex items-center gap-2 rounded-full font-bold text-white hover:opacity-70"
                  >
                    {form.getValues("termsAccepted") ? (
                      <Image
                        src="/images/checked.svg"
                        width={16}
                        height={16}
                        alt="icon for add unchecked"
                      />
                    ) : (
                      <Image
                        src="/images/unchecked.svg"
                        width={16}
                        height={16}
                        alt="icon for add checked"
                      />
                    )}
                    <span className="text-sm font-medium text-text">
                      I agree with the Terms and Conditions.
                    </span>
                  </button>
                </FormControl>
                <FormMessage className="mt-2 text-sm text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full rounded-[40px] py-8 text-lg font-bold hover:opacity-70"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default GuestInformationForm;
