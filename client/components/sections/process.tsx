"use client";

import SectionReveal from "@/components/motion/section-reveal";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";
import { MouseEvent, useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Briefing",
    text: "Objetivo, publico, canal e referencia visual."
  },
  {
    number: "02",
    title: "Producao",
    text: "Captacao e montagem com foco em retencao."
  },
  {
    number: "03",
    title: "Entrega",
    text: "Ajustes finais e formatos prontos para publicar."
  }
];

export default function Process() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const lineFillRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".process-card", gridRef.current);
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            yPercent: -14,
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35
            }
          });
        }

        if (lineRef.current && lineFillRef.current) {
          gsap.fromTo(
            lineFillRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 82%",
                end: "bottom 45%",
                scrub: 0.35
              }
            }
          );
        }

        gsap.fromTo(
          ".process-card",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: motionTokens.duration.section,
            stagger: motionTokens.stagger.cards,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: motionTokens.reveal.start
            }
          }
        );

        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 72%",
            end: "bottom 36%",
            onEnter: () => gsap.to(card, { y: -4, scale: 1.014, opacity: 1, duration: 0.3, ease: "power2.out" }),
            onEnterBack: () => gsap.to(card, { y: -4, scale: 1.014, opacity: 1, duration: 0.3, ease: "power2.out" }),
            onLeave: () => gsap.to(card, { y: 0, scale: 1, opacity: 0.8, duration: 0.28, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(card, { y: 0, scale: 1, opacity: 0.8, duration: 0.28, ease: "power2.out" })
          });
        });
      }, gridRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionReveal id="processo" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div ref={glowRef} className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-violet-200/8 blur-2xl" />
      <div className="pointer-events-none absolute left-8 top-20 h-40 w-40 rounded-full bg-sky-200/7 blur-2xl md:h-52 md:w-52" />
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 text-xs tracking-[0.22em] text-zinc-500 uppercase">Processo</p>
        <h2 data-reveal-headline className="mb-14 text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">Roteiro simples, execucao precisa</h2>
        <div className="mb-8 hidden h-px w-full bg-zinc-800 md:block">
          <div ref={lineRef} className="h-full w-full">
            <div ref={lineFillRef} className="h-full w-full bg-zinc-400/90" />
          </div>
        </div>
        <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <motion.article
              key={step.number}
              onMouseMove={(event: MouseEvent<HTMLElement>) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
                const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
                event.currentTarget.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
              }}
              onMouseLeave={(event: MouseEvent<HTMLElement>) => {
                event.currentTarget.style.transform = "";
              }}
              whileHover={{ y: -6 }}
              transition={{ duration: motionTokens.duration.card, ease: motionTokens.easing.softOut }}
              className="process-card rounded-2xl border border-zinc-800 bg-zinc-900/30 p-7 opacity-80 shadow-[0_0_0_rgba(0,0,0,0)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] md:p-9"
            >
              <p className="mb-6 text-sm tracking-[0.18em] text-zinc-500">{step.number}</p>
              <h3 className="mb-3 text-xl text-zinc-100 sm:text-2xl">{step.title}</h3>
              <p className="text-base leading-relaxed text-zinc-400">{step.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
