"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) {
    return null;
  }

  const handleDeleteActivity = () => {
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteActivity(eventId, activityId);

      if (response.success) {
        router.push(`/event/${eventId}/timeline`);
      }
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(toast, err, err.message);
      } else {
        showErrorToast(
          toast,
          err,
          "Failed to delete activity. Please try again.",
        );
      }
      setIsDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="h-full" />
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

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white">
          <DialogTitle className="text-lg font-bold">
            Delete activity
          </DialogTitle>
          <DialogDescription className="font-medium text-text">
            Are you sure you want to delete this activity? This action cannot be
            undone.
          </DialogDescription>
          <DialogFooter className="mt-4 flex flex-row justify-between gap-4">
            <Button
              variant="outline"
              onClick={cancelDelete}
              className="w-full bg-white font-bold"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="w-full bg-error font-bold shadow-none"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
