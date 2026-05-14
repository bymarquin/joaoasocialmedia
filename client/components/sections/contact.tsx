"use client";

import SectionReveal from "@/components/motion/section-reveal";
import { motionTokens } from "@/lib/motion-tokens";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <SectionReveal id="contato" className="px-6 pb-24 md:px-10 md:pb-32 xl:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 border-t border-zinc-800 pt-12 md:flex-row md:items-end">
        <div>
          <p className="mb-4 text-xs tracking-[0.2em] text-zinc-500 uppercase">Contato</p>
          <h2 className="max-w-3xl text-3xl leading-[0.95] font-semibold tracking-[-0.02em] text-zinc-100 sm:text-4xl md:text-6xl">
            Vamos criar algo que prende atencao e gera resultado.
          </h2>
        </div>

        <motion.a
          href="mailto:contato@javideomaker.com"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ duration: motionTokens.duration.micro, ease: motionTokens.easing.softOut }}
          className="inline-flex w-fit items-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
        >
          Iniciar projeto
        </motion.a>
      </div>
    </SectionReveal>
  );
}
