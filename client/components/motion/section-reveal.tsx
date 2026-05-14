"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionReveal({ children, className, id }: SectionRevealProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          rootRef.current,
          { autoAlpha: 0, y: motionTokens.reveal.y },
          {
            autoAlpha: 1,
            y: 0,
            duration: motionTokens.duration.section,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: motionTokens.reveal.start
            }
          }
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} id={id} className={className}>
      {children}
    </section>
  );
}
