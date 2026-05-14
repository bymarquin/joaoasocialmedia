"use client";

import SectionReveal from "@/components/motion/section-reveal";
import { motionTokens } from "@/lib/motion-tokens";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionReveal id="faq" className="px-6 py-24 md:px-10 md:py-32 xl:px-16">
      <div className="mx-auto max-w-[1400px]">
        <h2 data-reveal-headline className="mb-14 text-3xl leading-[0.95] tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">Duvidas</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.article
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: motionTokens.duration.card, delay: index * 0.05, ease: motionTokens.easing.softOut }}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/20 px-6 py-5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-base text-zinc-100 sm:text-lg"
                aria-expanded={openIndex === index}
              >
                <span>{item.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
                  className="text-zinc-400"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index ? (
                  <motion.div
                    key="faq-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: motionTokens.easing.softOut }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 max-w-3xl text-base text-zinc-400">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
