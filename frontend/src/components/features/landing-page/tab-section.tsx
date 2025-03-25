"use client";

import FadeIn from "@/components/animation/fade-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NextFont } from "next/dist/compiled/@next/font";
import Image from "next/image";
import { useRef } from "react";
import HostFeatureCard from "./host-feature-card";

type TabSectionProps = {
  font: NextFont;
};

export default function TabSection({ font }: TabSectionProps) {
  const hostRef = useRef<HTMLElement | null>(null);
  const participantsRef = useRef<HTMLElement | null>(null);

  const handleScrollTop = () => {
    const tab = document.getElementById("tabContainer")
    if (tab) {
      window.scrollTo({
        top: tab.offsetTop - 48,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mt-10" id="tabContainer">
      <Tabs defaultValue="host" onValueChange={handleScrollTop}>
        <div className="sticky top-[52px] bg-white py-2 z-50">
          <TabsList className="h-auto w-full border border-textBorder bg-white p-2">
            <TabsTrigger
              value="host"
              className="w-full border border-white font-bold hover:opacity-70 data-[state=active]:border data-[state=active]:border-accentGreen data-[state=active]:bg-white data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
            >
              EVENT HOST
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="w-full border border-white font-bold hover:opacity-70 data-[state=active]:border data-[state=active]:border-accentGreen data-[state=active]:bg-white data-[state=active]:text-accentGreen data-[state=active]:shadow-none"
            >
              PARTICIPANTS
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="host">
          <section className="grid gap-10" ref={hostRef}>
            <div className="grid gap-6">
              <Image
                src="/images/eventhost_main_image.png"
                alt="For the event host"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
              <div className="grid gap-2 text-center">
                <h2
                  className={`text-2xl font-bold text-accentGreen ${font.className}`}
                >
                  Create invitations effortlessly
                </h2>
                <p className="text-base text-text">
                  Easily create event invitations with a few tap.
                </p>
              </div>
              <FadeIn>
                <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                  <h3 className={`text-lg font-bold ${font.className}`}>
                    Get AI-generated venue suggestions
                  </h3>
                  <p className="text-sm">
                    Find recommended spots on the map based on activities.
                  </p>
                  <Image
                    src="/images/eventhost_sub_image1.png"
                    alt="AI gives recommendations for good places."
                    className="h-auto w-full"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              </FadeIn>
              <FadeIn>
                <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                  <h3 className={`text-lg font-bold ${font.className}`}>
                    Various invitation theme
                  </h3>
                  <p className="text-sm">
                    Find recommended spots on the map based on activities.
                  </p>
                  <Image
                    src="/images/eventhost_sub_image2.png"
                    alt="Various invitation theme"
                    className="h-auto w-full"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="grid gap-6 text-text">
              <h2
                className={`text-center text-2xl font-bold ${font.className}`}
              >
                Make your event even more special with an exclusive group for
                participants.
              </h2>
              <div className="flex gap-6 overflow-x-scroll px-4 pb-6">
                <HostFeatureCard
                  imageSrc="/images/eventhost_group_image1.png"
                  title="AI suggests your schedule"
                  description="Just enter a few details, and your timeline is ready!"
                />
                <HostFeatureCard
                  imageSrc="/images/eventhost_group_image2.png"
                  title="Manage necessity"
                  description="Share a list of items you want participants to bring."
                />
                <HostFeatureCard
                  imageSrc="/images/eventhost_group_image3.png"
                  title="Announcements"
                  description="Send updates to participants through chat and collect their responses."
                />
              </div>
            </div>
          </section>
        </TabsContent>
        <TabsContent value="participants">
          <section className="grid gap-10" ref={participantsRef}>
            <div className="grid gap-6">
              <Image
                src="/images/participants_main_image.png"
                alt="For the participants"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
              <div className="grid gap-2 text-center">
                <h2
                  className={`text-2xl font-bold text-accentGreen ${font.className}`}
                >
                  Easily check information, create special memories
                </h2>
                <p className="text-base text-text">
                  Keep scattered info in one place and share photos
                  effortlessly.
                </p>
              </div>
            </div>
            <FadeIn>
              <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                <h3 className={`text-lg font-bold ${font.className}`}>
                  Check the schedule and necessity
                </h3>
                <p className="text-sm">
                  Access host-shared information anytime. Engage with the host
                  on the feed to make the event even more exciting!
                </p>
                <Image
                  src="/images/participants_sub_image1.png"
                  alt="Check announcement and necessity."
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            </FadeIn>
            <FadeIn>
              <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                <h3 className={`text-lg font-bold ${font.className}`}>
                  Share and view group memories in one place
                </h3>
                <p className="text-sm">
                  Easily find photos of your child with AI-powered sorting.
                </p>
                <Image
                  src="/images/participants_sub_image2.png"
                  alt="Easy to find your child photos."
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </div>
            </FadeIn>
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}
