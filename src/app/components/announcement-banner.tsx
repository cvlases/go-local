import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ANNOUNCEMENT } from "../config";
import { motion, AnimatePresence } from "motion/react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!ANNOUNCEMENT.active) return;

    const dismissed = sessionStorage.getItem("announcement-dismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (!ANNOUNCEMENT.active || isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed top-16 left-0 right-0 z-40 bg-[var(--coral)] text-white shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold">{ANNOUNCEMENT.text}</span>
                {ANNOUNCEMENT.linkUrl && (
                  <Link
                    to={ANNOUNCEMENT.linkUrl}
                    className="text-sm underline hover:no-underline font-medium"
                  >
                    {ANNOUNCEMENT.linkText} →
                  </Link>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 rounded p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
