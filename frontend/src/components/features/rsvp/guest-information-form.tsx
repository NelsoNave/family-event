'use client'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { getUserInfo } from "@/lib/api/user";
import { ResponseType } from "@/types/response"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
  restrictions: z.string().optional(),
  message: z.string().optional(),
  companions: z.array(z.string()).optional(),
  termsAccepted: z.boolean(),
  updateUserInfo: z.boolean(),
  updateFamilyInfo: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const GuestInformationForm = ({ selection }: { selection: string }) => {
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
      updateUserInfo: false,
      updateFamilyInfo: false,
    },
  });

  const params = useParams();
  const [family, setFamily] = useState<
    { id: string; profileImageUrl: string; name: string }[]
  >([]);
  const [companions, setCompanions] = useState<string[]>([]);
  const [newCompanionName, setNewCompanionName] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(
    form.getValues("termsAccepted"),
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      form.setValue("name", response.user.name);
      form.setValue("email", response.user.email);
      setFamily(response.user.family);
    };

    fetchUserInfo();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      // TODO ログイン済みか確認
      const id = params?.eventId;

      const postData: ResponseType = {
        status: data.status,
        restriction: data.restriction || "",
        guest: {
          name: data.name,
          email: data.email,
        },
        companions: companions.map((companionName) => ({
          name: companionName,
        })),
        message: data.message || "",
        termsAccepted: termsAccepted,
        updateUserInfo: data.updateUserInfo,
        updateFamilyInfo: data.updateFamilyInfo,
      };

      console.log("Sending data:", postData);

      const response = await axios.post(`/event/${id}/rsvp-form`, postData);
      const { success, message } = response.data;

      if (success) {
        alert("Form submitted successfully!");
      } else {
        alert(`Error: ${message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit form");
    }
  };

  const handleCompanionSelectChange = (selectedValue: string) => {
    if (selectedValue && !companions.includes(selectedValue)) {
      setCompanions([...companions, selectedValue]);
    }
  };

  const handleAgreeClick = () => {
    setTermsAccepted(!termsAccepted);
    form.setValue("termsAccepted", !termsAccepted);
  };

  const addCompanion = () => {
    if (newCompanionName.trim() === "") return;
    setCompanions([...companions, newCompanionName]);
    setNewCompanionName("");
  };

  return (
    <div>
      <h2 className="mb-4 mt-12 text-xl font-bold">Your Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      className="font-medium text-textSub"
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
                      className="font-medium text-textSub"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selection === "accept" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Companion</h3>
              <div className="mt-4">
                {companions.map((companion, index) => (
                  <div key={index} className="mt-2">
                    <Input
                      value={companion}
                      onChange={(e) => {
                        companions[index] = e.target.value;
                        setCompanions([...companions]);
                      }}
                      className="mt-2 bg-white px-4 py-5 font-semibold"
                    />
                  </div>
                ))}
              </div>
              {family.length > 0 && (
                <FormField
                  control={form.control}
                  name="companion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="w-full rounded-md bg-white px-4 py-5">
                        <Select
                          {...field}
                          onValueChange={handleCompanionSelectChange}
                        >
                          <SelectTrigger className="w-full bg-white px-4 py-5 text-sm font-medium text-textSub">
                            <SelectValue placeholder="Select from your family" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Companion</SelectLabel>
                              {family.map((companion, index) => (
                                <SelectItem key={index} value={companion.name}>
                                  {companion.name}
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
                    className="mt-2 bg-white px-4 py-5 font-semibold"
                  />
                </label>
                <button
                  type="button"
                  onClick={addCompanion}
                  className="ml-auto flex items-center gap-2 rounded-full border border-primary bg-white px-4 py-2 text-sm font-bold text-primary"
                >
                  <Image
                    src="/plus.svg"
                    width={16}
                    height={16}
                    alt="icon for add person"
                  />
                  <span>Add person</span>
                </button>
              </div>
            </div>
          )}
          {selection === "accept" && (
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
                        className="h-28 font-medium text-textSub"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Message to the host</h3>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="bg-white px-4 py-3">
                    <Textarea
                      placeholder="Enter your message"
                      {...field}
                      className="h-28 font-medium text-textSub"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.email === undefined &&
            form.getValues("email") && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleAgreeClick}
                  className={`rounded-full px-4 py-2 font-bold text-white ${form.getValues("termsAccepted") ? "bg-green-500" : "bg-red-500"}`}
                >
                  {form.getValues("termsAccepted") ? "Unagree" : "Agree"}
                </button>
                <span>I agree with the Terms and Conditions.</span>
              </div>
            )}
          <Button
            type="submit"
            className="w-full rounded-[40px] py-8 text-lg font-bold"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default GuestInformationForm;