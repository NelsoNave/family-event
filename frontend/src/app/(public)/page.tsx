import { Button } from "@/components/ui/button";
import { Lato } from "next/font/google";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Footer from "@/components/layouts/footer";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <section className="max-w-md bg-white px-4 pb-20 pt-10 md:mx-auto">
        <section className="grid justify-items-center gap-6 text-center">
          <h1 className={`text-[32px] font-bold ${lato.className}`}>
            Celebrate & Connect <br />
            with Ease!
          </h1>
          <p className="text-sm">
            Effortlessly plan and manage your child&apos;s birthday or special
            event. Create personalized invitations and share them with friends,
            all in one place!
          </p>
          <SignUpButton>
            <Button className="h-auto w-fit rounded-full px-10 py-3 text-base font-bold">
              CREATE EVENT
            </Button>
          </SignUpButton>
          <Image
            src="/images/main_image.png"
            alt="Oiwai image"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </section>

        <section className="mt-10">
          <Tabs defaultValue="host">
            <div className="sticky top-[52px] bg-white py-2">
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
              <section className="grid gap-10">
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
                      className={`text-2xl font-bold text-accentGreen ${lato.className}`}
                    >
                      Create invitations effortlessly
                    </h2>
                    <p className="text-base text-text">
                      Easily create event invitations with a few tap.
                    </p>
                  </div>
                  <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                    <h3 className={`text-lg font-bold ${lato.className}`}>
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
                  <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                    <h3 className={`text-lg font-bold ${lato.className}`}>
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
                </div>
                <div className="grid gap-6 text-text">
                  <h2
                    className={`text-center text-2xl font-bold ${lato.className}`}
                  >
                    Make your event even more special with an exclusive group
                    for participants.
                  </h2>
                  <div className="flex gap-4 overflow-x-scroll px-4 pb-6">
                    <div className="grid min-w-[280px] gap-6">
                      <Image
                        src="/images/eventhost_group_image1.png"
                        alt="AI suggests your schedule"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full"
                      />
                      <div className="grid gap-2">
                        <h3 className={`text-lg font-bold ${lato.className}`}>
                          AI suggests your schedule
                        </h3>
                        <p className="text-sm">
                          Just enter a few details, and your timeline is ready!
                        </p>
                      </div>
                    </div>
                    <div className="grid min-w-[280px] gap-6">
                      <Image
                        src="/images/eventhost_group_image2.png"
                        alt="Manage necessity"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full"
                      />
                      <div className="grid gap-2">
                        <h3 className={`text-lg font-bold ${lato.className}`}>
                          Manage necessity
                        </h3>
                        <p className="text-sm">
                          Share a list of items you want participants to bring.
                        </p>
                      </div>
                    </div>
                    <div className="grid min-w-[280px] gap-6">
                      <Image
                        src="/images/eventhost_group_image3.png"
                        alt="Announcements"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-auto w-full"
                      />
                      <div className="grid gap-2">
                        <h3 className={`text-lg font-bold ${lato.className}`}>
                          Announcements
                        </h3>
                        <p className="text-sm">
                          Send updates to participants through chat and collect
                          their responses.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </TabsContent>
            <TabsContent value="participants">
              <section className="grid gap-10 pb-20">
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
                      className={`text-2xl font-bold text-accentGreen ${lato.className}`}
                    >
                      Easily check information, create special memories
                    </h2>
                    <p className="text-base text-text">
                      Keep scattered info in one place and share photos
                      effortlessly.
                    </p>
                  </div>
                </div>
                <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                  <h3 className={`text-lg font-bold ${lato.className}`}>
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
                <div className="grid gap-2 rounded-lg border border-border px-4 py-6 text-text">
                  <h3 className={`text-lg font-bold ${lato.className}`}>
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
              </section>
            </TabsContent>
          </Tabs>
        </section>
        <section className="mt-10 flex justify-between gap-4 text-sm">
          <SignInButton>
            <Button
              variant="outline"
              className="h-auto w-full rounded-full border-2 border-primary bg-white py-3 font-bold text-primary hover:bg-primary hover:text-white"
            >
              Log in
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="h-auto w-full rounded-full py-3 font-bold">
              CREATE EVENT
            </Button>
          </SignUpButton>
        </section>
      </section>
      <Footer />
    </>
  );
}
