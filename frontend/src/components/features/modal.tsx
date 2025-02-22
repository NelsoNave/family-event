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
import { ReactNode } from "react";
import { Button } from "../ui/button";

type ModalProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  button?: ReactNode;
};

export default function Modal({
  trigger,
  title,
  description,
  button,
}: ModalProps) {
  return (
    <Dialog>
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
          <Button type="submit" className="w-full font-bold shadow-none bg-error">
            {button}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
