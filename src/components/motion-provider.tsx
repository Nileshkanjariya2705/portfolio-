"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUp, Pause, Play } from "lucide-react";

const MotionContext = createContext({
  enabled: false,
  systemReduced: false,
  toggle: () => {},
});
export const useMotionPreferences = () => useContext(MotionContext);
const preferenceKey = "nk-motion-preference";

export function MotionProvider({ children }: { children: ReactNode }) {
  // Identical server and hydration state; device preferences are read after mount.
  const [enabled, setEnabled] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let paused = false;
      try {
        paused = localStorage.getItem(preferenceKey) === "paused";
      } catch {
        /* Storage is optional. */
      }
      const active = !media.matches && !paused;
      document.documentElement.dataset.motion = active ? "running" : "paused";
      setEnabled(active);
      setSystemReduced(media.matches);
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function toggle() {
    if (systemReduced) return;
    const next = !enabled;
    try {
      localStorage.setItem(preferenceKey, next ? "running" : "paused");
    } catch {
      /* Continue without persistence. */
    }
    document.documentElement.dataset.motion = next ? "running" : "paused";
    setEnabled(next);
  }

  return (
    <MotionContext.Provider value={{ enabled, systemReduced, toggle }}>
      <MotionConfig reducedMotion={enabled ? "user" : "always"}>
        {children}
        <MotionControls />
      </MotionConfig>
    </MotionContext.Provider>
  );
}

function MotionControls() {
  const { enabled, systemReduced, toggle } = useMotionPreferences();
  const { scrollY, scrollYProgress } = useScroll();
  const [showTop, setShowTop] = useState(false);
  const visible = useRef(false);
  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > 650;
    if (visible.current !== next) {
      visible.current = next;
      setShowTop(next);
    }
  });
  const label = systemReduced
    ? "Animations disabled by your device settings"
    : enabled
      ? "Pause animations"
      : "Resume animations";

  return (
    <>
      <motion.div
        className="reading-progress"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <div className="motion-controls" role="group" aria-label="Page controls">
        <button
          type="button"
          className="motion-control"
          onClick={toggle}
          disabled={systemReduced}
          aria-label={label}
          title={label}
          aria-pressed={!enabled}
        >
          {enabled ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <AnimatePresence initial={false}>
          {showTop && (
            <motion.button
              key="back-to-top"
              type="button"
              className="motion-control back-to-top"
              aria-label="Back to top"
              title="Back to top"
              initial={enabled ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: enabled ? 0.2 : 0 }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: enabled ? "smooth" : "instant",
                });
                document
                  .querySelector<HTMLElement>(".brand")
                  ?.focus({ preventScroll: true });
              }}
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
