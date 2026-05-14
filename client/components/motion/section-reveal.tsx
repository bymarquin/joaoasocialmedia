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
    const node = rootRef.current;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inview = entry?.isIntersecting;
        node.dataset.inview = inview ? "true" : "false";
        if (inview && node.id) {
          document.documentElement.dataset.atmo = node.id;
        }
      },
      { threshold: 0.25, rootMargin: "-8% 0px -12% 0px" }
    );
    visibilityObserver.observe(node);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const headline = rootRef.current?.querySelector<HTMLElement>("[data-reveal-headline]");
        if (headline) {
          gsap.fromTo(
            headline,
            { autoAlpha: 0, y: 18, filter: "blur(6px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: motionTokens.reveal.start,
                end: motionTokens.reveal.end,
                scrub: motionTokens.reveal.scrub,
                invalidateOnRefresh: true
              }
            }
          );
        }

        gsap.fromTo(
          rootRef.current,
          { autoAlpha: 0, y: motionTokens.reveal.y },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: motionTokens.reveal.start,
              end: motionTokens.reveal.end,
              scrub: motionTokens.reveal.scrub,
              invalidateOnRefresh: true
            }
          }
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => {
      visibilityObserver.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id={id} data-inview="false" className={`immersive-section ${className ?? ""}`}>
      {children}
    </section>
  );
}
