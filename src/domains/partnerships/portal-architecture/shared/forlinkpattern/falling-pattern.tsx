"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { cn } from "@/domains/shared/utils/cn";

interface FallingPatternProps extends ComponentProps<"div"> {
  color?: string;
  backgroundColor?: string;
  duration?: number;
  blur?: string;
}

// Lightweight animated dotted gradient (same feel as Settings panel)
export function FallingPattern({
  color = "hsla(27,94%,52%,0.22)",
  backgroundColor = "transparent",
  duration = 120,
  blur = "8px",
  className,
  ...rest
}: FallingPatternProps) {
  const backgroundImage = [
    `radial-gradient(4px 100px at 0px 235px, ${color}, transparent)`,
    `radial-gradient(4px 100px at 300px 235px, ${color}, transparent)`,
    `radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
    `radial-gradient(4px 100px at 0px 150px, ${color}, transparent)`,
    `radial-gradient(4px 100px at 300px 150px, ${color}, transparent)`,
    `radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
  ].join(", ");

  const backgroundSize = "300px 235px, 300px 235px, 300px 235px, 300px 150px, 300px 150px, 300px 150px";
  const start = "0px 220px, 3px 220px, 151.5px 337.5px, 50px 16px, 53px 16px, 201.5px 91px";
  const end = "0px 6800px, 3px 6800px, 151.5px 6917.5px, 50px 5416px, 53px 5416px, 201.5px 5491px";

  return (
    <div className={cn("relative h-full w-full", className)} {...rest}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor, backgroundImage, backgroundSize, filter: `blur(${blur})` }}
          variants={{
            initial: { backgroundPosition: start },
            animate: {
              backgroundPosition: [start, end],
              transition: { duration, ease: "linear", repeat: Infinity },
            },
          }}
          initial="initial"
          animate="animate"
        />
      </motion.div>
    </div>
  );
}
