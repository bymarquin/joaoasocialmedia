"use client";

import SectionReveal from "@/components/motion/section-reveal";
import ProjectTransitionLink from "@/components/motion/project-transition-link";
import { ScrollTrigger, gsap } from "@/lib/gsap";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Clinica Odontologica",
    slug: "clinica-odontologica",
    tag: "Social clips",
    description: "Cortes curtos com foco em autoridade e conversao.",
    image: "/amostras/clinica.jpg"
  },
  {
    title: "Campanhas Eventos",
    slug: "campanhas-eventos",
    tag: "Evento + campanha",
    description: "Narrativa pre, durante e pos-evento para ampliar alcance.",
    image: "/amostras/eventos.jpg"
  },
  {
    title: "Visual Branding",
    slug: "fotos",
    tag: "Fotos + Reels",
    description: "Conteudo visual consistente para feed e anuncios.",
    image: "/amostras/fotos.jpg"
  }
];

export default function SelectedWork() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const glowLeftRef = useRef<HTMLDivElement | null>(null);
  const glowRightRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card", gridRef.current);
        const medias = gsap.utils.toArray<HTMLElement>(".work-media", gridRef.current);

        if (progressRef.current) {
          gsap.fromTo(
            progressRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 82%",
                end: "bottom 35%",
                scrub: 0.35
              }
            }
          );
        }

        if (glowLeftRef.current) {
          gsap.to(glowLeftRef.current, {
            yPercent: -12,
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35
            }
          });
        }
        if (glowRightRef.current) {
          gsap.to(glowRightRef.current, {
            yPercent: -16,
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35
            }
          });
        }

        medias.forEach((media) => {
          gsap.to(media, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: media,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.25
            }
          });
        });

        gsap.fromTo(
          ".work-card",
          { autoAlpha: 0, y: 36 },
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
            start: "top 68%",
            end: "bottom 32%",
            onEnter: () => gsap.to(card, { scale: 1.015, opacity: 1, duration: 0.35, ease: "power2.out" }),
            onEnterBack: () => gsap.to(card, { scale: 1.015, opacity: 1, duration: 0.35, ease: "power2.out" }),
            onLeave: () => gsap.to(card, { scale: 1, opacity: 0.82, duration: 0.35, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(card, { scale: 1, opacity: 0.82, duration: 0.35, ease: "power2.out" })
          });
        });
      }, gridRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionReveal id="amostras" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div ref={glowLeftRef} className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/6 blur-2xl" />
      <div ref={glowRightRef} className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-sky-200/8 blur-2xl" />
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 text-xs tracking-[0.22em] text-zinc-500 uppercase">Amostras</p>
        <h2 data-reveal-headline className="mb-5 text-3xl leading-[0.95] font-semibold tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">
          Edicao para atencao real.
        </h2>
        <p className="mb-16 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Cada projeto nasce para segurar os primeiros segundos, conduzir o olhar e converter em acao.
        </p>
        <div className="mb-10 h-px w-full overflow-hidden rounded-full bg-zinc-800/80">
          <div ref={progressRef} className="h-full w-full bg-zinc-300/90" />
        </div>

        <div ref={gridRef} className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="work-card group rounded-2xl border border-zinc-800/70 bg-zinc-900/25 p-4 opacity-80 backdrop-blur-sm transition-colors hover:border-zinc-700"
            >
              <div className="work-media relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900/80">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: motionTokens.duration.card, ease: motionTokens.easing.softOut }}
                />
                <div className="absolute left-3 top-3 rounded-full border border-zinc-200/30 bg-zinc-900/50 px-2.5 py-1 text-[10px] tracking-[0.18em] text-zinc-100 uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  case
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <p className="mb-2 text-xs tracking-[0.18em] text-zinc-400 uppercase">{project.tag}</p>
              <h3 className="mb-3 text-xl text-zinc-100 sm:text-2xl">{project.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">{project.description}</p>
              <ProjectTransitionLink
                href={`/amostras/${project.slug}`}
                className="mt-4 inline-block text-xs tracking-[0.16em] text-zinc-200 uppercase hover:text-zinc-50"
              >
                Ver projeto
              </ProjectTransitionLink>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
