"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, ReactNode, useState } from "react";
import { Button } from "../ui/button";

type ModalProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  button?: ReactNode;
  deleteAction: (id?: string) => Promise<{ success: boolean; message: string }>;
  id?: string;
};

export default function Modal({
  trigger,
  title,
  description,
  button,
  deleteAction,
  id,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let response;
    try {
      if (id) {
        response = await deleteAction(id);
      } else {
        response = await deleteAction();
      }
      if (response.success) {
        setIsOpen(false);
        // TODO: implement toast
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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full bg-white">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="w-full bg-error font-bold shadow-none"
            onClick={handleDelete}
          >
            {isLoading ? "Loading..." : button}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
