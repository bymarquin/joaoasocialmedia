import SectionReveal from "@/components/motion/section-reveal";

export default function Statement() {
  return (
    <SectionReveal id="manifesto" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-5 text-xs tracking-[0.24em] text-zinc-500 uppercase">Manifesto</p>
        <p className="max-w-5xl text-2xl leading-[1.06] tracking-[-0.02em] text-zinc-100 sm:text-3xl md:text-5xl xl:text-6xl">
          Conteudo precisa de ritmo, clareza e intencao. Sem isso, video vira ruido.
        </p>
      </div>
    </SectionReveal>
  );
}
