"use client";

import { Button } from "@/components/ui/button";
import { deleteFamilyInfo } from "@/lib/actions/my-page/my-page";
import { UserRoundXIcon } from "lucide-react";
import Modal from "../../modal";
import PersonModal from "../../person-modal";

type DeleteAction = (
  id?: string,
) => Promise<{ success: boolean; message: string }>;

type EditDeleteButtonsProps = {
  title: string;
  deleteTitle: string;
  deleteDescription: string;
  button: string;
  defaultName: string;
  defaultImage: string;
  type: "user" | "family";
  familyId?: string;
  userDeleteAction?: DeleteAction;
};

export default function EditDeleteButtons({
  title,
  deleteTitle,
  deleteDescription,
  button,
  defaultName,
  defaultImage,
  type,
  familyId,
  userDeleteAction,
}: EditDeleteButtonsProps) {
  const deleteAction = type === "user" && userDeleteAction;
  const handleDelete = async () => {
    if (type === "family" && familyId) {
      return await deleteFamilyInfo(familyId);
    }
    return { success: false, message: "No action performed" };
  };

  return (
    <div className="flex gap-2">
      <Modal
        trigger={
          <Button className="h-8 w-8 rounded-full bg-error/15 text-error shadow-none hover:bg-error/15 hover:opacity-70">
            <UserRoundXIcon size={16} />
          </Button>
        }
        title={deleteTitle}
        description={deleteDescription}
        button={button}
        deleteAction={deleteAction || handleDelete}
      />
      <PersonModal
        mode="edit"
        title={title}
        defaultName={defaultName}
        defaultImage={defaultImage}
        familyId={familyId}
        type={type}
      ></PersonModal>
    </div>
  );
}
