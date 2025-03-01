import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

type ParticipantListItemProps = {
  isAttended: boolean;
  name: string;
  profileImageUrl: string;
};

export default function ParticipantListItem({
  isAttended,
  name,
  profileImageUrl,
}: ParticipantListItemProps) {
  return (
    <li className="flex">
      <Button
        variant="ghost"
        className="flex h-auto w-full items-center justify-start gap-4 px-0 py-1"
      >
        {isAttended ? (
          <Image
            src="/images/checked.svg"
            width={16}
            height={16}
            alt="icon for add checked"
          />
        ) : (
          <Image
            src="/images/unchecked.svg"
            width={16}
            height={16}
            alt="icon for add unchecked"
          />
        )}
        <div className="flex items-center gap-2">
          <Image
            src={profileImageUrl}
            width={40}
            height={40}
            alt="name"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-base font-medium">{name}</p>
        </div>
      </Button>
      <Button variant="ghost" className="h-auto p-4">
        <X size={16} />
      </Button>
    </li>
  );
}
