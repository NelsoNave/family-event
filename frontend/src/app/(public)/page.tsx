import { Button } from "@/components/ui/button";
import { Lato } from "next/font/google";
import Image from "next/image";

import FadeInScale from "@/components/animation/fade-in-scale";
import TabSection from "@/components/features/landing-page/tab-section";
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
          <div className="relative h-[324px] w-full">
            <FadeInScale delay={0}>
              <Image
                src="/images/main_image_bg.png"
                alt="Oiwai image"
                width={375}
                height={324}
                sizes="100vw"
                className="absolute top-0 h-[324px] w-full object-contain"
              />
            </FadeInScale>
            <FadeInScale delay={0.6}>
              <Image
                src="/images/main_image.png"
                alt="Oiwai image"
                width={375}
                height={324}
                sizes="100vw"
                className="absolute top-0 h-[324px] w-full object-contain"
              />
            </FadeInScale>
          </div>
        </section>
        <TabSection font={lato} />
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
