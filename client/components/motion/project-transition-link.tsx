"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useState } from "react";
import { motionTokens } from "@/lib/motion-tokens";

type ProjectTransitionLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export default function ProjectTransitionLink({ href, className, children }: ProjectTransitionLinkProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isLeaving) return;

    if (reducedMotion) {
      router.push(href);
      return;
    }

    setIsLeaving(true);
    window.setTimeout(() => {
      router.push(href);
    }, 240);
  };

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      <AnimatePresence>
        {isLeaving ? (
          <motion.div
            key="route-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.smoothOut }}
            className="pointer-events-none fixed inset-0 z-[100] bg-black"
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
