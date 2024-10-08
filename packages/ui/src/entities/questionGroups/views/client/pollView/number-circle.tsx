"use client";

import { motion } from "framer-motion";
import { CountingNumbers } from "./counting-numbers";

export function NumberCircle({ percentage }: { percentage: number }) {
  return (
    <div className="relative h-full w-full">
      <motion.svg
        className="absolute inset-0 m-auto"
        viewBox="0 0 100 100"
        width={"100%"}
        height={"100%"}
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage }}
          //whileInView={{ pathLength: percentage }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          strokeWidth={7}
          strokeDasharray="0 1"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          cx="50"
          cy="50"
          r="45"
          fill="#DCFCE7"
          stroke="#22C55E"
        />
      </motion.svg>
      <CountingNumbers
        value={Math.round(percentage * 100)}
        duration={2000}
        className="absolute inset-0 mx-auto flex items-center justify-center font-display text-xs sm:text-sm text-green-500"
      />
    </div>
  );
}
