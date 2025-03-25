import { motion, TargetAndTransition } from "framer-motion";

type SmoothAppearAnimationProps = {
  children: React.ReactNode;
  initial?: boolean | TargetAndTransition;
  animate?: TargetAndTransition;
  transition?: TargetAndTransition["transition"];
};

export default function SmoothAppearAnimation({
  children,
  initial,
  animate,
  transition,
}: SmoothAppearAnimationProps) {
  return (
    <motion.div initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
}
