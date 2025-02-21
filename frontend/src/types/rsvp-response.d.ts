export type RsvpResponseType = {
  status: "ACCEPT" | "DECLINE";
  restriction: string;
  guest: {
    name: string;
    email: string;
  };
  companions: { name: string }[];
  message: string;
  termsAccepted: boolean;
};
