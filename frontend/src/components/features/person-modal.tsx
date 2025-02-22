"use client";

import { updateFamilyInfo, updateUserInfo } from "@/lib/api/user";
import { PencilLineIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";
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

type PersonModalProps = {
  trigger?: ReactNode;
  title: string;
  defaultName?: string;
  defaultImage?: string;
  type: "user" | "family";
  mode: "new" | "edit";
  familyId?: string;
};

export default function PersonModal({
  trigger,
  title,
  defaultName,
  defaultImage,
  type,
  mode,
  familyId,
}: PersonModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>(defaultName || "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const imageUrl = image ? URL.createObjectURL(image) : defaultImage;

    try {
      let response;
      if (type === "user") {
        response = await updateUserInfo({ name, profileImageUrl: imageUrl });
      } else if (familyId && type === "family") {
        response = await updateFamilyInfo({
          familyId,
          name,
          profileImageUrl: imageUrl,
        });
      }

      if (!response) {
        notFound();
      }

      if (response?.success) {
        setIsOpen(false);
        // TODO: implement toast
      } else {
        notFound();
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error();
      } else {
        throw new Error(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-4">
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
            <div className="grid gap-2">
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
