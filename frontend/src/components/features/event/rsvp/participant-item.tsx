import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ParticipantItemProps = {
  id: number;
  profileImageUrl: string;
  name: string;
};

export default function ParticipantItem({
  id,
  profileImageUrl,
  name,
}: ParticipantItemProps) {
  return (
    <li key={id} className="py-1">
      <Link
        href={`responses/${id}`}
        className="flex items-center justify-between gap-2 hover:opacity-70"
      >
        <div className="flex items-center gap-2">
          <Image
            src={profileImageUrl}
            alt={name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="font-medium">{name}</p>
        </div>
        <ChevronRightIcon size={16} />
      </Link>
    </li>
  );
}
