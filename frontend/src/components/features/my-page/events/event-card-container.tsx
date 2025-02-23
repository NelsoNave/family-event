import { getMyPageEventInfo } from "@/lib/api/mypage";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const formatDateTime = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
): string => {
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Format date and time
const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

// Format time
const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export default async function EventCardContainer() {
  let eventResponse;

  try {
    eventResponse = await getMyPageEventInfo();
  } catch (err) {
    alert(err);
    return null;
  }

  if (!eventResponse) {
    notFound();
  }

  return (
    <ul className="grid grid-cols-2 gap-4">
      {eventResponse.events.map(
        ({ id, title, thumbnailUrl, startTime, endTime, isHost }) => (
          <li key={id} className="hover:opacity-70">
            <Link href="/" className="grid gap-4">
              <div className="relative">
                <Image
                  src={thumbnailUrl}
                  alt={title}
                  width={0}
                  height={118}
                  sizes="50vw"
                  className="w-full rounded-t-xl object-cover"
                />
                <p
                  className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-bold text-white ${isHost ? "bg-accentGreen/50" : "bg-primary/50"}`}
                >
                  {isHost ? "Host" : "Guest"}
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-sm font-bold text-text">{title}</h3>
                <div>
                  <p className="text-xs text-textSub">
                    {formatDateTime(startTime, dateFormatOptions)}
                  </p>
                  <p className="text-xs text-textSub">
                    {formatDateTime(startTime, timeFormatOptions)} -
                    {formatDateTime(endTime, timeFormatOptions)}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}
