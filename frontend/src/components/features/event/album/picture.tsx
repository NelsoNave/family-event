"use client";

import { Button } from "@/components/ui/button";
import { deletePicture } from "@/lib/actions/event/album";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Modal from "../../modal";

import dynamic from "next/dynamic";
import "react-medium-image-zoom/dist/styles.css";

const Zoom = dynamic(() => import("react-medium-image-zoom"), { ssr: false });

type PictureProps = {
  eventId: string;
  pictureId: string;
  imageUrl: string;
  isDeletable: boolean;
  refreshData: () => void;
};

export default function Picture({
  eventId,
  pictureId,
  refreshData,
  isDeletable,
  imageUrl,
}: PictureProps) {
  const [selectedPictures, setSelectedPictures] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedPictures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    try {
      const response = await deletePicture(eventId, selectedPictures);

      if (response.success && refreshData) {
        refreshData();
      }

      setSelectedPictures([]);

      return response;
    } catch (err) {
      console.error(`Failed to delete participant`, err);
      return { success: false, message: "No action performed" };
    }
  };

  return (
    <li
      className="relative h-[100px] w-full hover:opacity-70"
      onClick={() => toggleSelection(pictureId)}
    >
      {isDeletable && (
        <Modal
          trigger={
            <Button
              variant="ghost"
              className="absolute right-2 top-2 z-10 flex h-auto items-center justify-center rounded-full bg-text/50 p-1 hover:bg-text/50"
            >
              <X size={12} className="h-3 w-3 text-white" />
            </Button>
          }
          title="Delete photo"
          description="Are you sure you want to delete this photo? This action cannot be undone."
          button="Delete"
          deleteErrorMessage="Failed to delete photo"
          deleteAction={handleDelete}
          onSuccess={refreshData}
        />
      )}
      <Zoom zoomMargin={0}>
        <div className="relative h-[100px] w-full">
          <Image src={imageUrl} alt={imageUrl} fill className="object-cover" />
        </div>
      </Zoom>
    </li>
  );
}
