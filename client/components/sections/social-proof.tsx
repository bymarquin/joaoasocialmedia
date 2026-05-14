import SectionReveal from "@/components/motion/section-reveal";

const stats = [
  { value: "+120", label: "videos entregues" },
  { value: "48h", label: "prazo medio por peca curta" },
  { value: "98%", label: "clientes recorrentes" }
];

export default function SocialProof() {
  return (
    <SectionReveal id="prova-social" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px] border-y border-zinc-800 py-12 md:py-16">
        <p className="mb-8 text-xs tracking-[0.22em] text-zinc-500 uppercase">Prova social</p>
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label}>
              <p className="text-4xl leading-none tracking-[-0.03em] text-zinc-100 sm:text-5xl md:text-7xl">{stat.value}</p>
              <p className="mt-3 text-base text-zinc-400">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
