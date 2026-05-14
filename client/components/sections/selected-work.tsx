"use client";

import SectionReveal from "@/components/motion/section-reveal";
import ProjectTransitionLink from "@/components/motion/project-transition-link";
import { gsap } from "@/lib/gsap";
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

  useEffect(() => {
    if (!gridRef.current) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
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
      }, gridRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionReveal id="amostras" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-16 text-3xl leading-[0.95] font-semibold tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">
          Selected Work
        </h2>

        <div ref={gridRef} className="grid gap-10 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="work-card group"
            >
              <div className="mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900/80">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: motionTokens.duration.card, ease: motionTokens.easing.softOut }}
                />
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
