import SectionReveal from "@/components/motion/section-reveal";

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
  return (
    <SectionReveal id="processo" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-14 text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">Processo</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-7 md:p-9">
              <p className="mb-6 text-sm tracking-[0.18em] text-zinc-500">{step.number}</p>
              <h3 className="mb-3 text-xl text-zinc-100 sm:text-2xl">{step.title}</h3>
              <p className="text-base leading-relaxed text-zinc-400">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
