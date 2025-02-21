import { Button } from "@/components/ui/button";
import { getMyPageEventInfo } from "@/lib/api/mypage";
import { getUserInfo } from "@/lib/api/user";
import { PencilLineIcon, PlusIcon, UserRoundXIcon } from "lucide-react";
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

export default async function MyPage() {
  let eventResponse;
  let userResponse;

  try {
    eventResponse = await getMyPageEventInfo();
  } catch (err) {
    alert(err);
    return null;
  }

  if (!eventResponse) {
    notFound();
  }

  try {
    userResponse = await getUserInfo();
  } catch (err) {
    alert(err);
    return null;
  }

  if (!userResponse) {
    notFound();
  }

  return (
    <section className="grid max-w-md gap-10 bg-white px-4 pb-20 pt-10 text-text md:mx-auto">
      <section className="grid gap-10">
        <div className="grid justify-items-center gap-2">
          <Image
            src={userResponse.profileImageUrl}
            alt={userResponse.name}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div className="grid gap-1 text-center">
            <h1 className="text-base font-bold text-text">
              {userResponse.name}
            </h1>
            <p className="text-xs text-textSub">{userResponse.email}</p>
          </div>
          <div className="flex gap-2">
            <Button className="h-8 w-8 rounded-full bg-error/15 text-error shadow-none">
              <UserRoundXIcon size={16} />
            </Button>
            <Button className="h-8 w-8 rounded-full bg-textSub/20 text-textSub shadow-none">
              <PencilLineIcon />
            </Button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between text-text">
            <h2 className="text-base font-bold">Your family</h2>
            <Button className="h-auto rounded-full py-1 font-bold shadow-none">
              <PlusIcon />
              Add
            </Button>
          </div>
          <ul className="grid gap-4">
            {userResponse.userFamilies.map(({ id, name, profileImageUrl }) => (
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
                  <Button className="h-8 w-8 rounded-full bg-error/15 text-error shadow-none">
                    <UserRoundXIcon size={16} />
                  </Button>
                  <Button className="h-8 w-8 rounded-full bg-textSub/20 text-textSub shadow-none">
                    <PencilLineIcon />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="flex items-center justify-between text-text">
          <h2 className="text-base font-bold">Your events</h2>
          <Button className="h-auto rounded-full py-1 font-bold shadow-none">
            <PlusIcon />
            Create event
          </Button>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-4">
            {eventResponse.events.map(
              ({ id, title, thumbnailUrl, startTime, endTime, isHost }) => (
                <li key={id}>
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
        </div>
      </section>
    </section>
  );
}
