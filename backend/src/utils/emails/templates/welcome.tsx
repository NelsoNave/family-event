import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface WelcomeEmailProps {
  eventName: string;
  inviterName: string;
  eventDate: string;
  eventLocation: string;
}

export const WelcomeEmail = ({
  eventName,
  inviterName,
  eventDate,
  eventLocation,
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for joining the event</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-5 px-4 max-w-xl">
            <Heading className="text-2xl font-bold text-gray-800 mb-4">
              Thank you for joining {eventName}!
            </Heading>

            <Section className="bg-gray-50 rounded-lg p-6 mb-6">
              <Text className="text-gray-700 mb-4">
                {inviterName} has approved your participation.
              </Text>

              <Text className="text-gray-700">
                <strong>Event Details:</strong>
                <br />
                Date & Time: {eventDate}
                <br />
                Location: {eventLocation}
              </Text>
            </Section>

            <Section>
              <Button className="w-full bg-red-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 text-center">
                View Event Details
              </Button>
            </Section>

            <Text className="text-sm text-gray-500 mt-6">
              If you did not request this email, please ignore it.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
