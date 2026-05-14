"use client";

import SectionReveal from "@/components/motion/section-reveal";
import { gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(glowRef.current, {
          yPercent: -12,
          xPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3
          }
        });

        gsap.to(panelRef.current, {
          yPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.25
          }
        });
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionReveal id="contato" className="relative overflow-hidden px-6 pb-24 md:px-10 md:pb-32 xl:px-16">
      <section ref={sectionRef}>
      <div ref={glowRef} className="pointer-events-none absolute -right-14 top-6 h-56 w-56 rounded-full bg-amber-200/8 blur-2xl" />
      <div ref={panelRef} className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-8 backdrop-blur-sm md:flex-row md:items-end md:p-12">
        <div>
          <p className="mb-4 text-xs tracking-[0.2em] text-zinc-500 uppercase">Contato</p>
          <h2 data-reveal-headline className="max-w-3xl text-3xl leading-[0.95] font-semibold tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">
            Vamos criar algo que prende atencao e gera resultado.
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">Briefing rapido</span>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">Resposta em ate 24h</span>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">Plano por objetivo</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.a
            href="mailto:contato@javideomaker.com"
            data-cursor="Email"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ y: 0 }}
            transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
            className="cta-press inline-flex w-fit items-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
          >
            Iniciar projeto
          </motion.a>
          <motion.a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WhatsApp"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ y: 0 }}
            transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
            className="cta-press inline-flex w-fit items-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
          >
            Falar no WhatsApp
          </motion.a>
        </div>
      </div>
      </section>
    </SectionReveal>
  );
}
