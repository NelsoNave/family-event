import { AnnouncementType } from "@/types/announcement";
import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";

type AnnounceCardProps = {
  announcements: AnnouncementType;
};

export function AnnounceCard({ announcements }: AnnounceCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg p-4 shadow-[0px_1px_12px_rgba(0,0,0,0.12)]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={
              announcements.host.profileImageUrl ||
              "/images/default-profile.png"
            }
            alt={announcements.host.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{announcements.host.name}</p>
            <p className="text-sm text-gray-500">{announcements.timeAgo}</p>
          </div>
        </div>
      </div>
      <p className="font-medium">{announcements.contentText}</p>
      {announcements.imageUrl && (
        <div className="w-full">
          <Image
            src={announcements.imageUrl}
            alt="Announcement image"
            width={600}
            height={600}
            className="rounded-lg"
            priority
          />
        </div>
      )}
      <div className="flex items-center gap-3 text-sm font-medium">
        <div className="flex items-center gap-1">
          <Heart
            className="h-4 w-4"
            fill={announcements.hasFavorited ? "#FF8549" : "none"}
            stroke={announcements.hasFavorited ? "#FF8549" : "currentColor"}
          />
          <p> {announcements.countFavorite}</p>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <p> {announcements.countMessage}</p>
        </div>
      </div>
    </div>
  );
}
