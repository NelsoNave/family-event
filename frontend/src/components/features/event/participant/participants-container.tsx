"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import {
  BaseParticipantsType,
  ParticipantsResponseType,
} from "@/types/participant";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PersonModal from "../../person-modal";
import ParticipantListItem from "./participant-list-item";

type ParticipantsContainerProps = {
  participants: BaseParticipantsType[];
  eventId: string;
};

export default function ParticipantsContainer({
  participants,
  eventId,
}: ParticipantsContainerProps) {
  const axios = useAuthAxios();
  const { toast } = useToast();
  const { isLoaded, isSignedIn } = useAuth();
  const [participantsInfoData, setParticipantsInfoData] = useState<
    BaseParticipantsType[]
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
        ...(participantsInformation.acceptedParticipants ?? []),
        ...(participantsInformation.tempParticipants ?? []).map((tmp) => ({
          ...tmp,
          isAccepted: false,
          profileImageUrl: "/images/profile_default.png",
        })),
      ];

      if (
        JSON.stringify(participantsInfoData) !==
        JSON.stringify(participantsInformation)
      ) {
        setParticipantsInfoData(formattedParticipants);
      }
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
      <ul className="grid gap-4">
        {participants.map(({ id, isAttended, name, profileImageUrl }) => (
          <ParticipantListItem
            key={id}
            eventId={eventId}
            participantId={id}
            initialIsAttended={isAttended}
            name={name}
            profileImageUrl={profileImageUrl}
            onSuccess={refreshData}
          />
        ))}
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
    </>
  );
}
