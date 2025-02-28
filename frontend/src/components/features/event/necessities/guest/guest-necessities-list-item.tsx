"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { switchGuestNecessitiesStatus } from "@/lib/actions/event/necessities";
import { showErrorToast } from "@/lib/toast/toast-utils";
import Image from "next/image";
import { useState } from "react";

type GuestNecessitiesListItemProps = {
  necessityId: string;
  item: string;
  initialIsAdded: boolean;
  eventId: string;
};

export default function GuestNecessitiesListItem({
  necessityId,
  item,
  initialIsAdded,
  eventId,
}: GuestNecessitiesListItemProps) {
  const [isAdded, setIsAdded] = useState<boolean>(initialIsAdded);
  const { toast } = useToast();

  const handleBringingToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await switchGuestNecessitiesStatus(
        eventId,
        necessityId,
        !isAdded,
      );
      setIsAdded(response.data.necessity.isAdded);

      if (!response.success) {
        throw new Error();
      }
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to change the status. Please try again.",
      );
    }
  };

  return (
    <li className="list-none py-2 pl-0">
      <Button
        variant="ghost"
        onClick={handleBringingToggle}
        className="flex w-full justify-between gap-2 p-0 text-base hover:bg-transparent hover:opacity-75"
      >
        {item}
        {isAdded ? (
          <Image
            src="/images/checked.svg"
            width={20}
            height={20}
            alt="icon for item checked"
          />
        ) : (
          <Image
            src="/images/unchecked.svg"
            width={20}
            height={20}
            alt="icon for item unchecked"
          />
        )}
      </Button>
    </li>
  );
}
