"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

type FadeInScaleProps = {
  children: ReactNode;
  delay?: number;
};

const FadeInScale = ({ children, delay = 0, ...rest }: FadeInScaleProps) => {
  return (
    <motion.div
      variants={{
        offscreen: {
          opacity: 0,
          scale: 0,
        },
        onscreen: {
          opacity: 1,
          scale: 1,
          transformOrigin: "center",
        },
      }}
      initial="offscreen"
      animate="onscreen"
      exit="offscreen"
      transition={{
        duration: 0.3,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        delay: delay,
      }}
      viewport={{ once: false, amount: 0.5 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default FadeInScale;
