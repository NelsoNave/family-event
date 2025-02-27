"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { deleteActivity } from "@/lib/actions/event/timeline";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { CircleX, Ellipsis, PencilLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ActionDropdownProps = {
  eventId: string;
  activityId: string;
};

export function ActionDropdown({ eventId, activityId }: ActionDropdownProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  const handleDeleteActivity = async () => {
    try {
      const response = await deleteActivity(eventId, activityId);

      if (response.success) {
        router.push(`/event/${eventId}/timeline`);
      }
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(toast, err, err.message);
      } else {
        showErrorToast(toast, err, "Failed to delete activity");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>
          <Link
            href={`/event/${eventId}/timeline/${activityId}/edit`}
            className="flex w-full justify-between"
          >
            <span className="font-medium">Edit Activity</span>
            <PencilLine size={18} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between"
          onClick={handleDeleteActivity}
        >
          <span className="font-medium">Delete Activity</span>
          <CircleX size={18} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
