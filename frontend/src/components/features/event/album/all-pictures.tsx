"use client";

import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { BasePictureType } from "@/types/album";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Picture from "./picture";

type AllPicturesProps = {
  eventId: string;
};

export default function AllPictures({ eventId }: AllPicturesProps) {
  const [pictures, setPictures] = useState<BasePictureType[]>([]);
  const axios = useAuthAxios();
  const { toast } = useToast();
  const { isLoaded, isSignedIn } = useAuth();

  const refreshData = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    try {
      const response = await axios.get<{
        data: { pictures: BasePictureType[] };
      }>(`/events/${eventId}/album`);

      const picturesData = response.data.data.pictures;

      setPictures((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(picturesData)) {
          return prev;
        }
        return picturesData;
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
    <section>
      <ul className="grid grid-cols-3 gap-1">
        <Link
          href="post"
          className="flex h-[100px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-textBorderLight hover:opacity-70"
        >
          <PlusIcon size={18} className="text-textSub" />
          <p className="text-base font-bold text-textSub">Add</p>
        </Link>
        {pictures.map(({ id, isDeletable, imageUrl }) => (
          <Picture
            key={id}
            eventId={eventId}
            imageUrl={imageUrl}
            isDeletable={isDeletable}
            pictureId={id}
            refreshData={refreshData}
          />
        ))}
      </ul>
    </section>
  );
}
