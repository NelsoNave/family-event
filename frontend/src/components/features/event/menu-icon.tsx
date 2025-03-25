"use client";

import SmoothAppearAnimation from "@/components/animation/smooth-appear";
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
  index: number;
};

export default function MenuIcon({
  iconDetail,
  eventId,
  index,
}: MenuIconProps) {
  const IconComponent = ICON_MAP[iconDetail.iconName] || Plus;

  const animationSettings = {
    initial: { opacity: 0 },
    animate: { opacity: 1, y: [0, -5, 0] },
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay: index * 0.1,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={`/event/${eventId}/${iconDetail.path}`} className="group">
        <SmoothAppearAnimation {...animationSettings}>
          <div className="relative flex h-14 w-14 items-center justify-center transition-transform duration-200 group-hover:scale-110">
            <div
              className={`absolute inset-0 rounded-full bg-${iconDetail.backgroundColor}`}
            />
            <IconComponent
              size={24}
              className={`text-${iconDetail.iconColor}`}
            />
          </div>
        </SmoothAppearAnimation>
        <SmoothAppearAnimation {...animationSettings}>
          <p className="mt-2 text-center text-sm font-semibold">
            {iconDetail.iconName}
          </p>
        </SmoothAppearAnimation>
      </Link>
    </div>
  );
}
