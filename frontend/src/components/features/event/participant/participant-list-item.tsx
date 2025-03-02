"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  deleteParticipant,
  updateParticipantAttendance,
  updateTempParticipantsAttendance,
} from "@/lib/actions/event/participant";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "../../modal";
import { notFound } from "next/navigation";

type ParticipantListItemProps = {
  initialIsAttended: boolean;
  isTemp: boolean;
  eventId: string;
  participantId: number;
  name: string;
  profileImageUrl: string;
  onSuccess: () => void;
};

export default function ParticipantListItem({
  initialIsAttended,
  isTemp,
  eventId,
  participantId,
  name,
  profileImageUrl,
  onSuccess
}: ParticipantListItemProps) {
  const { toast } = useToast();
  const [isAttended, setIsAttended] = useState<boolean>(initialIsAttended);

  const handleChangeAttendStatus = async () => {
    let response;
    try {
      console.log("Before request: ", { eventId, participantId, isAttended });
      if(isTemp) {
        response = await updateTempParticipantsAttendance(
          eventId,
          participantId,
          !isAttended,
        )
      } else {
        response = await updateParticipantAttendance(
          eventId,
          participantId,
          !isAttended,
        );
      }

    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to change the status. Please try again.",
      );
    }

    if(!response) {
      showErrorToast(toast, "Response was not received. Event or participant might not be found.");
      notFound()
    }

    if (response.success) {
      setIsAttended((prev) => !prev);
    }

    if (!response.success) {
      throw new Error(`Failed to update attendance status.`);
    }
  };

  return (
    <li className="flex">
      <Button
        type="button"
        variant="ghost"
        className="flex h-auto w-full items-center justify-start gap-4 px-0 py-1 hover:bg-transparent hover:opacity-70"
        onClick={handleChangeAttendStatus}
      >
        {isAttended ? (
          <Image
            src="/images/checked.svg"
            width={16}
            height={16}
            alt="icon for add checked"
          />
        ) : (
          <Image
            src="/images/unchecked.svg"
            width={16}
            height={16}
            alt="icon for add unchecked"
          />
        )}
        <div className="flex items-center gap-2">
          <Image
            src={profileImageUrl}
            width={40}
            height={40}
            alt="name"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-base font-medium">{name}</p>
        </div>
      </Button>
      <Modal
        trigger={
          <Button type="button" variant="ghost" className="h-auto p-4">
            <X size={16} />
          </Button>
        }
        title="Remove guest"
        // TODO: implement
        deleteAction={deleteParticipant}
        deleteErrorMessage="Failed to delete guest. Please try again."
        onSuccess={onSuccess}
      />
    </li>
  );
}
