import { Button } from "@/components/ui/button";
import { PencilLineIcon, UserRoundXIcon } from "lucide-react";
import Image from "next/image";
import Modal from "../../modal";

type FamilyCardProps = {
  id: string;
  name: string;
  profileImageUrl: string;
};

export default function FamilyCard({
  id,
  name,
  profileImageUrl,
}: FamilyCardProps) {
  return (
    <li key={id} className="flex justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={profileImageUrl}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <p className="text-sm font-semibold">{name}</p>
      </div>
      <div className="flex gap-2">
        <Modal
          trigger={
            <Button className="h-8 w-8 rounded-full bg-error/15 text-error shadow-none hover:bg-error/15 hover:opacity-70">
              <UserRoundXIcon size={16} />
            </Button>
          }
          title="Remove family member"
          description="Are you sure you want to remove this member? This action cannot be undone."
          button={
            <Button className="w-full bg-error font-bold shadow-none hover:bg-error hover:opacity-70">
              Remove
            </Button>
          }
        />
        <Modal
          trigger={
            <Button className="h-8 w-8 rounded-full bg-textSub/20 text-textSub shadow-none hover:bg-textSub/20 hover:opacity-70">
              <PencilLineIcon />
            </Button>
          }
          title="Edit account"
          button={
            <Button className="w-full font-bold shadow-none">Update</Button>
          }
        >
          <p>Hello</p>{" "}
        </Modal>
      </div>
    </li>
  );
}
