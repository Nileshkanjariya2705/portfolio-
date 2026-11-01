"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode, type PointerEvent } from "react";
import { useMotionPreferences } from "./motion-provider";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { enabled } = useMotionPreferences();
  const hero = className.startsWith("hero-");
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={false}
      whileInView={
        enabled && !hero
          ? { y: [28, 0], opacity: [0.68, 1] }
          : { y: 0, opacity: 1 }
      }
      viewport={{ once: true, margin: "0px 0px -35px 0px" }}
      onViewportEnter={(entry) =>
        entry?.target.setAttribute("data-revealed", "true")
      }
      transition={{
        duration: enabled ? 0.7 : 0,
        delay: enabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveArt({ children }: { children: ReactNode }) {
  const { enabled } = useMotionPreferences();
  const bounds = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 120, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 120, damping: 24 });
  useEffect(() => {
    if (!enabled) {
      x.set(0);
      y.set(0);
      rotateX.jump(0);
      rotateY.jump(0);
    }
  }, [enabled, x, y, rotateX, rotateY]);
  function move(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || event.pointerType !== "mouse" || !bounds.current) return;
    const rect = bounds.current;
    x.set(-((event.clientY - rect.top) / rect.height - 0.5) * 6);
    y.set(((event.clientX - rect.left) / rect.width - 0.5) * 6);
  }
  return (
    <div
      className="art-perspective"
      onPointerEnter={(event) => {
        bounds.current = event.currentTarget.getBoundingClientRect();
      }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
        bounds.current = null;
      }}
    >
      <motion.div
        className="art-tilt"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
