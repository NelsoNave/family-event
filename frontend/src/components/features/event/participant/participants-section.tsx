"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import {
  AllParticipantsType,
  ParticipantsResponseType,
} from "@/types/participant";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PersonModal from "../../person-modal";
import ParticipantItem from "./participant-item";

type ParticipantsSectionProps = {
  eventId: string;
};

export default function ParticipantsSection({
  eventId,
}: ParticipantsSectionProps) {
  const axios = useAuthAxios();
  const { toast } = useToast();
  const { isLoaded, isSignedIn } = useAuth();
  const [participantsInfoData, setParticipantsInfoData] = useState<
    AllParticipantsType[]
  >([]);

  const refreshData = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    try {
      const response = await axios.get<{
        data: ParticipantsResponseType;
      }>(`/events/${eventId}/participants`);
      const participantsInformation = response.data.data;

      const formattedParticipants = [
        ...(participantsInformation.acceptedParticipants ?? []).map(
          (participant) => ({
            ...participant,
            isTemp: false,
            uniqueId: `accepted-${participant.id}`,
          }),
        ),
        ...(participantsInformation.tempParticipants ?? []).map((temp) => ({
          ...temp,
          isTemp: true,
          isAccepted: false,
          profileImageUrl: "/images/profile_default.png",
          uniqueId: `temp-${temp.id}`,
        })),
      ];

      setParticipantsInfoData((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(formattedParticipants)) {
          return prev;
        }
        return formattedParticipants;
      });
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to fetch participants information. Please try again.",
      );
    }
  }, [isLoaded, isSignedIn, axios, toast, eventId]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }
    refreshData();
  }, [isLoaded, isSignedIn, refreshData]);

  return (
    <>
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <section className="grid gap-4">
          <h1 className="text-xl font-bold">
            Guest list{" "}
            <span className="text-base">({participantsInfoData.length})</span>
          </h1>
          <ul className="grid gap-4">
            {participantsInfoData.map(
              ({ id, isTemp, isAttended, name, profileImageUrl, uniqueId }) => (
                <ParticipantItem
                  key={uniqueId}
                  eventId={eventId}
                  participantId={id}
                  isTemp={isTemp}
                  initialIsAttended={isAttended}
                  name={name}
                  profileImageUrl={profileImageUrl}
                  refreshData={refreshData}
                />
              ),
            )}
          </ul>
          <PersonModal
            trigger={
              <Button
                type="button"
                variant="outline"
                className="justify-self-end rounded-full border border-primary bg-white text-primary hover:bg-primary hover:text-white"
              >
                <PlusIcon size={16} /> Add guest
              </Button>
            }
            title="Add guest"
            type="guest"
            eventId={eventId}
            onSuccess={refreshData}
            errorMessage="Failed to add temporary participant"
          />
        </section>
      )}
    </>
  );
}
