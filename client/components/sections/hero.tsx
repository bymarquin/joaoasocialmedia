"use client";

import { gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoWrapRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          videoWrapRef.current,
          { clipPath: "inset(14% 8% 10% 8% round 24px)", scale: 1.06 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            scale: 1,
            duration: motionTokens.duration.hero,
            ease: "power3.out"
          }
        );

        gsap.to(videoWrapRef.current, {
          yPercent: 6,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.7
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="relative flex min-h-screen items-end overflow-hidden px-6 pb-12 pt-24 md:px-10 md:pb-16 xl:px-16">
      <div ref={videoWrapRef} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/img01.jpeg"
        >
          <source src="/videos/reel-hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.1),transparent_38%),linear-gradient(180deg,rgba(5,5,8,0.24)_0%,rgba(5,5,8,0.78)_58%,rgba(5,5,8,0.97)_100%)]" />

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.duration.section, ease: motionTokens.easing.smoothOut }}
        className="relative z-10 max-w-[1100px]"
      >
        <p className="mb-6 text-xs tracking-[0.26em] text-zinc-300 uppercase">Showreel 2026</p>
        <h1 className="max-w-5xl text-4xl leading-[0.88] font-semibold tracking-[-0.04em] text-zinc-50 sm:text-5xl md:text-7xl xl:text-[7.2rem]">
          Filmes de marca.
          <br />
          Conteudo que vende.
        </h1>
        <p className="mt-6 max-w-xl text-base text-zinc-300">Direcao, captacao e edicao para marcas que querem parecer maiores e vender mais.</p>
      </motion.div>
    </section>
  );
}
