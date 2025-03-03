"use client";

import { Button } from "@/components/ui/button";
import { deleteFamilyInfo } from "@/lib/actions/my-page/my-page";
import { UserRoundXIcon } from "lucide-react";
import Modal from "../../modal";
import PersonModal from "../../person-modal";
import { useClerk } from "@clerk/nextjs";

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
  errorMessage: string;
  deleteErrorMessage: string;
  userDeleteAction?: DeleteAction;
  refreshData?: () => void; // refreshData type
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
  errorMessage,
  deleteErrorMessage,
  userDeleteAction,
  refreshData,
}: EditDeleteButtonsProps) {
  const { signOut } = useClerk();

  const handleDelete = async () => {
    if (type === "user" && userDeleteAction) {
      const response = await userDeleteAction();
      if (response.success) {
        signOut({ redirectUrl: "/" });
      }
      return response;
    }

    if (type === "family" && familyId) {
      const response = await deleteFamilyInfo(familyId);
      if (response.success && refreshData) {
        refreshData();
      }
      return response;
    }
    return { success: false, message: "No action performed" };
  };

  const handleUpdate = async () => {
    if (refreshData) {
      refreshData(); // If update is successful, trigger refreshData
    }
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
        deleteAction={handleDelete}
        deleteErrorMessage={deleteErrorMessage}
        id={familyId}
        onSuccess={handleUpdate}
      />
      <PersonModal
        mode="edit"
        title={title}
        defaultName={defaultName}
        defaultImage={defaultImage}
        familyId={familyId}
        type={type}
        errorMessage={errorMessage}
        onSuccess={handleUpdate} // Pass handleUpdate function
      ></PersonModal>
    </div>
  );
}
