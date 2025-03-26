"use client";

import ScrollToTop from "@/components/features/scroll-to-top";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const SubmittedPage = () => {
  return (
    <section className="relative flex min-h-screen max-w-md flex-col items-center gap-6 bg-white px-8 pt-16 mx-auto">
      <ScrollToTop />
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-bold">
          Thank you <br /> for your response!
        </h1>
        <p className="text-center">
          Your RSVP has been successfully sent to the host. We appreciate your
          reply.
        </p>
      </div>
      <DotLottieReact
        src="https://lottie.host/fbe96fd1-b163-48a4-b4df-552ce577fa28/PbU5TLfFUz.lottie"
        loop
        autoplay
        className="absolute left-0 top-0 h-full w-full object-contain"
      />
    </section>
  );
};

export default SubmittedPage;
