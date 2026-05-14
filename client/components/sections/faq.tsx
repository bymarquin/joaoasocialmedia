import SectionReveal from "@/components/motion/section-reveal";

const items = [
  {
    q: "Qual o prazo medio de entrega?",
    a: "Videos curtos costumam ficar entre 2 e 5 dias uteis, dependendo do volume."
  },
  {
    q: "Tem revisao no processo?",
    a: "Sim. O fluxo inclui rodadas de ajuste alinhadas no briefing inicial."
  },
  {
    q: "Quais formatos sao entregues?",
    a: "Reels, TikTok, Shorts, anuncios e pecas institucionais."
  }
];

export default function Faq() {
  return (
    <SectionReveal id="faq" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-14 text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">FAQ</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-zinc-800 px-6 py-5 open:bg-zinc-900/30">
              <summary className="cursor-pointer list-none text-base text-zinc-100 marker:hidden sm:text-lg">{item.q}</summary>
              <p className="mt-3 max-w-3xl text-base text-zinc-400">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
