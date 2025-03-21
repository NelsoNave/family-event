import { ICON_MAP } from "@/constants/icons";
import { IconType } from "@/types/event";
import { Plus } from "lucide-react";
import Link from "next/link";

type MenuIconProps = {
  iconDetail: {
    iconName: IconType | string;
    backgroundColor: string;
    iconColor: string;
    path: string;
  };
  eventId: string;
};

export default function MenuIcon({ iconDetail, eventId }: MenuIconProps) {
  const IconComponent = ICON_MAP[iconDetail.iconName] || Plus;

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={`/event/${eventId}/${iconDetail.path}`} className="group">
        <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-200 group-hover:scale-110">
          <div
            className={`absolute inset-0 rounded-full bg-${iconDetail.backgroundColor}`}
          />
          <IconComponent size={24} className={`text-${iconDetail.iconColor}`} />
        </div>
        <p className="text-center text-sm font-semibold">
          {iconDetail.iconName}
        </p>
      </Link>
    </div>
  );
}
