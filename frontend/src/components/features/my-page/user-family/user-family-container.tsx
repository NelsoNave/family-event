"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthAxios } from "@/lib/api/axios-client";
import { showErrorToast } from "@/lib/toast/toast-utils";
import { UserType } from "@/types/user";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PersonModal from "../../person-modal";
import Spinner from "../../spinner";
import FamilyCard from "../family/family-card";
import ProfileCard from "../profile/profile-card";

export default function UserFamilyContainer() {
  const axios = useAuthAxios();
  const { toast } = useToast();
  const { isLoaded, isSignedIn } = useAuth();

  const [userInfoData, setUserInfoData] = useState<UserType>();

  const refreshData = useCallback(async () => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    try {
      const response = await axios.get<{ user: UserType }>("/me");
      const userInformation = response.data.user;

      if (JSON.stringify(userInfoData) !== JSON.stringify(userInformation)) {
        setUserInfoData(userInformation);
      }
    } catch (err: unknown) {
      showErrorToast(
        toast,
        err,
        "Failed to fetch user information. Please try again.",
      );
    }
  }, [isLoaded, isSignedIn, axios, toast, userInfoData]);

  useEffect(() => {
    refreshData();
  }, [isLoaded, isSignedIn, refreshData]);

  if (!userInfoData) {
    return <Spinner color="text-primary" />;
  }

  return (
    <section className="grid gap-10">
      <ProfileCard
        name={userInfoData.name}
        email={userInfoData.email}
        profileImageUrl={userInfoData.profileImageUrl}
        refreshData={refreshData}
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
            errorMessage="Failed to add new family member. Please try again."
            onSuccess={refreshData}
          />
        </div>
        <ul className="grid gap-4">
          {userInfoData.userFamilies.map(({ id, name, profileImageUrl }) => (
            <FamilyCard
              key={id}
              name={name}
              profileImageUrl={profileImageUrl}
              familyId={id}
              refreshData={refreshData}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
