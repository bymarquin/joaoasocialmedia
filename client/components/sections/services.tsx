import SectionReveal from "@/components/motion/section-reveal";

const services = [
  "Captacao comercial para marcas e negocios locais",
  "Edicao para Reels, Shorts e anuncios",
  "Direcao de ritmo para retencao e narrativa",
  "Pacotes mensais com consistencia visual"
];

export default function Services() {
  return (
    <SectionReveal id="servicos" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <h2 className="text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">Servicos</h2>
        <ul className="space-y-6 border-t border-zinc-800 pt-6">
          {services.map((item) => (
            <li key={item} className="text-base leading-relaxed text-zinc-300 sm:text-lg md:text-2xl">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
