"use client";

import { motion, useAnimation } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

type ReviewRequestProps = {
  eventId: string;
};

export default function ReviewRequest({ eventId }: ReviewRequestProps) {
  const controls = useAnimation();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    const startAnimation = async () => {
      while (true) {
        await controls.start({ pathLength: 1 }, { duration: 0.5 });
        await controls.start({ pathLength: 1 }, { duration: 0.8 });
        await controls.start(
          { rotate: [0, -10, 0] },
          { duration: 0.6, delay: 1, ease: "easeInOut" },
        );
        await new Promise((resolve) => setTimeout(resolve, 4000));

        if (!isMounted.current) break;

        await controls.start({ pathLength: 0, rotate: 0 }, { duration: 0 });
      }
    };

    startAnimation();

    return () => {
      isMounted.current = false;
    };
  }, [controls]);
  return (
    <Link
      href={`/event/${eventId}/review/create`}
      className="group grid gap-2 rounded-lg border border-textSub bg-background p-4"
    >
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          animate={controls}
          fill="none"
          stroke="#179686"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <motion.path
            d="M7 10v12"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
          <motion.path
            d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
            initial={{ pathLength: 0 }}
            animate={controls}
          />
        </motion.svg>
        How Was the Event?
      </h2>
      <p className="text-xs font-medium">
        We&apos;d love to hear your thoughts and memories from the day!
      </p>
      <div className="mt-2 justify-self-end rounded-full bg-accentGreen px-5 py-2 text-sm font-bold text-white duration-200 group-hover:scale-105 group-hover:opacity-70">
        Add your review
      </div>
    </Link>
  );
}
