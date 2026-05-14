"use client";

import { ScrollTrigger, gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";

const services = [
  "Captacao comercial para marcas e negocios locais",
  "Edicao para Reels, Shorts e anuncios",
  "Direcao de ritmo para retencao e narrativa",
  "Pacotes mensais com consistencia visual"
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;

    const items = gsap.utils.toArray<HTMLLIElement>(".service-item", listRef.current);
    if (!items.length) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            yPercent: -12,
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.3
            }
          });
        }

        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "bottom 35%",
                scrub: 0.35
              }
            }
          );
        }

        gsap.set(items, { opacity: 0.4, y: 30, x: 0, scale: 0.98 });

        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.45, y: 20, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 45%",
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(sectionRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(items, { clearProps: "all" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="servicos" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div ref={glowRef} className="pointer-events-none absolute -left-14 top-8 h-56 w-56 rounded-full bg-emerald-200/8 blur-2xl" />
      <div className="mx-auto mb-8 h-px max-w-[1400px] overflow-hidden rounded-full bg-zinc-800/80">
        <div ref={progressRef} className="h-full w-full bg-zinc-300/90" />
      </div>
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="mb-3 text-xs tracking-[0.22em] text-zinc-500 uppercase">Servicos</p>
          <h2 data-reveal-headline className="text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">Direcao criativa com entrega continua</h2>
        </div>
        <ul ref={listRef} className="space-y-4 border-t border-zinc-800 pt-6">
          {services.map((item) => (
            <li
              key={item}
              className="service-item group rounded-xl border border-zinc-800/70 bg-zinc-900/25 px-5 py-4 text-base leading-relaxed text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900/40 sm:text-lg md:text-2xl"
            >
              <span className="mb-2 block h-px w-0 bg-zinc-300/70 transition-all duration-300 group-hover:w-14" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
