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
import Modal from "../modal";

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
        toast({
          title: "Success",
          description: "Activity deleted successfully",
        });
        return { success: true, message: "Activity deleted successfully" };
      } else {
        toast({ title: "Error", description: "Failed to delete activity" });
        return {
          success: false,
          message: response.message || "Failed to delete activity",
        };
      }
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(toast, err, err.message);
      }
      return { success: false, message: "Failed to delete activity" };
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
        <Modal
          trigger={
            <DropdownMenuItem className="flex justify-between">
              <span className="font-medium">Delete Activity</span>
              <CircleX size={18} />
            </DropdownMenuItem>
          }
          title="Delete activity"
          description="Are you sure you want to delete this schedule? This action cannot be undone."
          button="Delete"
          deleteAction={handleDeleteActivity}
          deleteErrorMessage="Something went wrong"
          id={[activityId, eventId]}
          onSuccess={() => console.log("success")}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
