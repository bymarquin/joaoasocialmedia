"use client";

import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "manifesto", label: "Manifesto" },
  { id: "amostras", label: "Amostras" },
  { id: "servicos", label: "Servicos" },
  { id: "processo", label: "Processo" },
  { id: "prova-social", label: "Prova" },
  { id: "faq", label: "FAQ" },
  { id: "contato", label: "Contato" }
];

export default function SectionNav() {
  const [activeId, setActiveId] = useState("inicio");
  const items = useMemo(() => navItems, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-3 md:px-10 xl:px-16">
        <a href="#inicio" className="text-xs tracking-[0.24em] text-zinc-200 uppercase">
          J.A
        </a>
        <ul className="hidden items-center gap-5 lg:flex">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-xs tracking-[0.16em] uppercase transition-colors ${
                    active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
