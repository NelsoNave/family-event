import { Button } from "@/components/ui/button";
import { UserRoundXIcon } from "lucide-react";
import Modal from "../../modal";
import PersonModal from "../../person-modal";

type EditDeleteButtonsProps = {
  title: string;
  errorTitle: string;
  errorDescription: string;
  button: string;
  defaultName: string;
  defaultImage: string;
  type: "user" | "family";
  familyId?: string;
};

export default function EditDeleteButtons({
  title,
  errorTitle,
  errorDescription,
  button,
  defaultName,
  defaultImage,
  type,
  familyId,
}: EditDeleteButtonsProps) {
  return (
    <div className="flex gap-2">
      <Modal
        trigger={
          <Button className="h-8 w-8 rounded-full bg-error/15 text-error shadow-none hover:bg-error/15 hover:opacity-70">
            <UserRoundXIcon size={16} />
          </Button>
        }
        title={errorTitle}
        description={errorDescription}
        button={button}
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
