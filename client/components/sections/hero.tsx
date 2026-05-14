"use client";

import { gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const headlineLineARef = useRef<HTMLSpanElement | null>(null);
  const headlineLineBRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Reduced motion: reveal everything instantly
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
      }, sectionRef);
      return () => ctx.revert();
    });

    // Entrance stagger — all devices
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          videoWrapRef.current,
          { scale: 1.06 },
          { scale: 1, duration: motionTokens.duration.hero }
        )
          .fromTo('[data-hero="badge"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.8")
          .fromTo('[data-hero="sub"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.52")
          .fromTo('[data-hero="headline"]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
          .fromTo('[data-hero="desc"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, "-=0.55")
          .fromTo('[data-hero="tags"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.48")
          .fromTo('[data-hero="ctas"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.42")
          .fromTo('[data-hero="scroll-hint"]', { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");

        gsap.to('[data-hero="scroll-hint"]', {
          y: 7,
          repeat: -1,
          yoyo: true,
          duration: 1.1,
          ease: "sine.inOut",
          delay: tl.duration()
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Scroll-driven — desktop only
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        gsap.to(videoWrapRef.current, {
          yPercent: 10,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.45
          }
        });

        gsap.to(overlayRef.current, {
          opacity: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5
          }
        });

        gsap.to(sheenRef.current, {
          xPercent: 18,
          yPercent: -10,
          opacity: 0.75,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.55
          }
        });

        gsap.to(contentRef.current, {
          yPercent: -12,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 0.6
          }
        });

        gsap.to(headlineLineARef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.45
          }
        });

        gsap.to(headlineLineBRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.4
          }
        });

        gsap.fromTo(
          progressRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.35
            }
          }
        );

        gsap.to('[data-hero="scroll-hint"]', {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "15% top",
            scrub: true
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen items-end overflow-hidden px-6 pb-12 pt-24 md:px-10 md:pb-16 xl:px-16"
    >
      <div ref={videoWrapRef} className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-[center_22%] md:object-[center_18%] xl:object-[center_16%]"
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
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.1),transparent_38%),linear-gradient(180deg,rgba(5,5,8,0.24)_0%,rgba(5,5,8,0.78)_58%,rgba(5,5,8,0.97)_100%)]"
      />
      <div
        ref={sheenRef}
        className="pointer-events-none absolute -left-1/4 top-0 h-[70%] w-[55%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(255,255,255,0)_65%)] opacity-45"
      />
      <div className="pointer-events-none absolute inset-4 z-[1] hidden md:block">
        <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-white/25" />
        <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-white/25" />
        <div className="absolute left-0 bottom-0 h-8 w-8 border-l border-b border-white/25" />
        <div className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-white/25" />
      </div>
      <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden h-40 w-px -translate-y-1/2 bg-white/20 md:block">
        <div ref={progressRef} className="h-full w-full bg-white/70" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1100px]">
        <p
          data-hero="badge"
          className="mb-3 inline-flex rounded-full border border-zinc-500/40 bg-zinc-900/35 px-3 py-1 text-[10px] tracking-[0.22em] text-zinc-300 uppercase opacity-0"
        >
          Direcao audiovisual
        </p>
        <p data-hero="sub" className="mb-6 text-xs tracking-[0.26em] text-zinc-300 uppercase opacity-0">
          Showreel 2026
        </p>
        <h1
          data-hero="headline"
          data-reveal-headline
          className="max-w-5xl text-4xl leading-[0.88] font-semibold tracking-[-0.04em] text-zinc-50 sm:text-5xl md:text-7xl xl:text-[7.2rem] opacity-0"
        >
          <span ref={headlineLineARef} className="block will-change-transform">Filmes de marca.</span>
          <span ref={headlineLineBRef} className="block will-change-transform">Conteudo que vende.</span>
        </h1>
        <p data-hero="desc" className="mt-6 max-w-xl text-base text-zinc-300 opacity-0">
          Direcao, captacao e edicao para marcas que querem parecer maiores e vender mais.
        </p>
        <div data-hero="tags" className="mt-5 flex flex-wrap gap-2 opacity-0">
          <span className="rounded-full border border-zinc-500/35 px-3 py-1 text-xs text-zinc-300">Reels</span>
          <span className="rounded-full border border-zinc-500/35 px-3 py-1 text-xs text-zinc-300">Campanhas</span>
          <span className="rounded-full border border-zinc-500/35 px-3 py-1 text-xs text-zinc-300">Conteudo de marca</span>
        </div>
        <div data-hero="ctas" className="mt-8 flex flex-wrap gap-3 opacity-0">
          <motion.a
            href="#amostras"
            data-cursor="Ver cases"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
            className="cta-press rounded-full bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-950"
          >
            Ver amostras
          </motion.a>
          <motion.a
            href="#contato"
            data-cursor="Contato"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
            className="cta-press rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-100"
          >
            Falar comigo
          </motion.a>
        </div>
      </div>

      <div
        data-hero="scroll-hint"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.25em] text-zinc-500 uppercase">Scroll</span>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <line x1="7" y1="0" x2="7" y2="12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="text-zinc-500" />
          <path d="M3.5 8.5L7 12l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500" />
        </svg>
      </div>
    </section>
  );
}
