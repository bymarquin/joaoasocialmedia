"use client";

import SectionReveal from "@/components/motion/section-reveal";
import { gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: "+120", label: "videos entregues", target: 120, prefix: "+", suffix: "" },
  { value: "48h", label: "prazo medio por peca curta", target: 48, prefix: "", suffix: "h" },
  { value: "98%", label: "clientes recorrentes", target: 98, prefix: "", suffix: "%" }
];

const testimonials = [
  "Subimos a retencao dos videos em duas semanas.",
  "A marca ficou mais premium sem perder velocidade.",
  "Fluxo objetivo e resultado que bate meta de campanha."
];

export default function SocialProof() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const valuesRef = useRef<Array<HTMLParagraphElement | null>>([]);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".stat-item",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: motionTokens.duration.section,
            stagger: motionTokens.stagger.cards,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%"
            }
          }
        );

        if (testimonialsRef.current) {
          gsap.to(testimonialsRef.current, {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 90%",
              end: "bottom top",
              scrub: 0.25
            }
          });
        }

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            yPercent: -16,
            xPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3
            }
          });
        }

        valuesRef.current.forEach((node) => {
          if (!node) return;
          const targetRaw = node.dataset.target;
          if (!targetRaw) return;

          const numericTarget = Number(targetRaw);
          const suffix = node.dataset.suffix ?? "";
          const prefix = node.dataset.prefix ?? "";

          if (!Number.isFinite(numericTarget)) return;

          const counter = { value: 0 };
          gsap.to(counter, {
            value: numericTarget,
            ease: "none",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%",
              end: "bottom 38%",
              scrub: 0.35
            },
            onUpdate: () => {
              node.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
            }
          });
        });
      }, statsRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionReveal id="prova-social" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div ref={glowRef} className="pointer-events-none absolute -left-12 top-10 h-56 w-56 rounded-full bg-orange-200/8 blur-2xl" />
      <div className="mx-auto max-w-[1400px] border-y border-zinc-800 py-12 md:py-16">
        <p className="mb-8 text-xs tracking-[0.22em] text-zinc-500 uppercase">Prova social</p>
        <div ref={statsRef} className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              whileHover={{ y: -5 }}
              transition={{ duration: motionTokens.duration.card, ease: motionTokens.easing.softOut }}
              className="stat-item rounded-xl border border-transparent p-4 hover:border-zinc-800/80"
            >
              <p
                ref={(node) => {
                  valuesRef.current[index] = node;
                }}
                data-target={String(stat.target)}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
                className="text-4xl leading-none tracking-[-0.03em] text-zinc-100 sm:text-5xl md:text-7xl"
              >
                0
              </p>
              <p className="mt-3 text-base text-zinc-400">{stat.label}</p>
            </motion.article>
          ))}
        </div>
        <div ref={testimonialsRef} className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((text) => (
            <article key={text} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5">
              <p className="text-sm leading-relaxed text-zinc-300">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
