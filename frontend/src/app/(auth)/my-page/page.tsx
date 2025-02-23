import EventCardContainer from "@/components/features/my-page/events/event-card-container";
import FamilyCard from "@/components/features/my-page/family/family-card";
import ProfileCard from "@/components/features/my-page/profile/profile-card";
import PersonModal from "@/components/features/person-modal";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/api/user";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MyPage() {
  let userResponse;

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
        <ProfileCard
          name={userResponse.name}
          email={userResponse.email}
          profileImageUrl={userResponse.profileImageUrl}
        />
        <div className="grid gap-4">
          <div className="flex items-center justify-between text-text">
            <h2 className="text-base font-bold">Your family</h2>
            <PersonModal
              mode="new"
              type="family"
              trigger={
                <Button className="h-auto rounded-full py-1 font-bold shadow-none">
                  <PlusIcon />
                  Add
                </Button>
              }
              title="Add family member"
            />
          </div>
          <ul className="grid gap-4">
            {userResponse.userFamilies.map(({ id, name, profileImageUrl }) => (
              <FamilyCard
                key={id}
                name={name}
                profileImageUrl={profileImageUrl}
                familyId={id}
              />
            ))}
          </ul>
        </div>
      </section>
      <section className="grid gap-4">
        <div className="flex items-center justify-between text-text">
          <h2 className="text-base font-bold">Your events</h2>
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
