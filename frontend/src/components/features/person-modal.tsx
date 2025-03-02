"use client";

import { useToast } from "@/hooks/use-toast";
import {
  addFamilyMember,
  updateFamilyInfo,
  updateUserInfo,
} from "@/lib/actions/my-page/my-page";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { PencilLineIcon, X } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { addTemporaryParticipant } from "@/lib/actions/event/participant";

type PersonModalProps = {
  trigger?: ReactNode;
  title: string;
  defaultName?: string;
  defaultImage?: string;
  type: "user" | "family" | "guest";
  mode?: "new" | "edit";
  familyId?: string;
  eventId?: string;
  errorMessage: string;
  onSuccess?: () => void;
};

export default function PersonModal({
  trigger,
  title,
  defaultName,
  defaultImage = "/images/profile_default.png",
  type,
  mode,
  familyId,
  eventId,
  errorMessage,
  onSuccess,
}: PersonModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(defaultImage);
  const [imageUrlData, setImageUrlData] = useState<File | null>(null);
  const [name, setName] = useState<string>(defaultName || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputImageRef = useRef<HTMLInputElement>(null!);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setName(defaultName || "");
      setImageUrl(defaultImage);
    }
  }, [isOpen, defaultName, defaultImage]);

  // image functions
  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    inputImageRef.current.click();
  };

  const revokeObjectURL = useCallback(() => {
    if (imageUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  const handleImageDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    revokeObjectURL();
    setImageUrl("/images/profile_default.png");
    setImageUrlData(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrlData(file);
      setImageUrl(imageUrl);
      revokeObjectURL();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const resetForm = () => {
    setName(defaultName || "");
    revokeObjectURL();
    setImageUrl(defaultImage);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (type === "user") {
        response = await updateUserInfo({
          name,
          profileImageUrl: imageUrlData,
        });
      } else if (familyId && type === "family") {
        response = await updateFamilyInfo({
          familyId,
          name,
          profileImageUrl: imageUrlData,
        });
      } else if(eventId && type === "guest") {
        response = await addTemporaryParticipant(eventId, name)
      }

      if (mode === "new") {
        response = await addFamilyMember({
          name,
          profileImageUrl: imageUrlData,
        });
      }

      if (!response?.success) {
        notFound();
      }

      setIsOpen(false);
      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        showErrorToast(toast, err.message, errorMessage);
      } else {
        showErrorToast(toast, "Unknown error occurred", errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      revokeObjectURL();
    };
  }, [revokeObjectURL, imageUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="h-8 w-8 rounded-full bg-textSub/20 text-textSub shadow-none hover:bg-textSub/20 hover:opacity-70">
            <PencilLineIcon />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="gap-6 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid justify-items-center gap-4">
            {type !== "guest" && (
              <>
                <div className="relative">
                  <button
                    type="button"
                    className="absolute -right-8"
                    onClick={handleImageDelete}
                  >
                    <X size={14} />
                  </button>
                  <button type="button" onClick={handleImageClick}>
                    <Image
                      src={imageUrl}
                      alt={name}
                      className="h-16 w-16 rounded-full object-cover"
                      width={64}
                      height={64}
                    />
                  </button>
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  hidden
                  ref={inputImageRef}
                />
              </>
            )}
            <div className="grid w-full gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                onChange={handleNameChange}
                value={name}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-row justify-between gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full font-bold shadow-none">
              {isLoading
                ? "Updating..."
                : mode === "new"
                  ? "Add"
                  : mode === "edit"
                    ? "Update"
                    : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
