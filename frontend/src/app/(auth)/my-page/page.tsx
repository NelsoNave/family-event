import EventCardContainer from "@/components/features/my-page/events/event-card-container";
import UserFamilyContainer from "@/components/features/my-page/user-family/user-family-container";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function MyPage() {
  return (
    <section className="grid gap-10">
      <UserFamilyContainer />
      <section className="grid gap-4">
        <div className="flex items-center justify-between text-text">
          <h2 className="text-base font-bold">Your events</h2>
          {/* TODO: modify the actual path after implementing the event creation page */}
          <Link href="/">
            <Button className="h-auto rounded-full py-1 font-bold shadow-none">
              <PlusIcon />
              Create event
            </Button>
          </Link>
        </div>
        <EventCardContainer />
      </section>
    </section>
  );
}
