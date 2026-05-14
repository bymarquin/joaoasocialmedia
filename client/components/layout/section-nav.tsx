"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "amostras", label: "Amostras" },
  { id: "contato", label: "Contato" },
  { id: "servicos", label: "Servicos" },
  { id: "processo", label: "Processo" },
  { id: "prova-social", label: "Prova" },
  { id: "faq", label: "Duvidas" }
];

type MagneticNavLinkProps = {
  href: string;
  active: boolean;
  onClick: () => void;
  children: string;
};

function MagneticNavLink({ href, active, onClick, children }: MagneticNavLinkProps) {
  const magneticEnabledRef = useRef(false);
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 360, damping: 22, mass: 0.3 });
  const y = useSpring(magneticY, { stiffness: 360, damping: 22, mass: 0.3 });

  useEffect(() => {
    const canUseMagnet = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    magneticEnabledRef.current = canUseMagnet && !reducedMotion;
  }, []);

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!magneticEnabledRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const maxPull = 6;
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    magneticX.set(relativeX * maxPull * 2);
    magneticY.set(relativeY * maxPull * 2);
  };

  const resetMagnet = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={resetMagnet}
      style={{ x, y }}
      className={`relative inline-flex rounded-full px-3 py-1.5 text-xs tracking-[0.16em] uppercase transition-colors ${
        active ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      {active ? (
        <motion.span
          layoutId="active-nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-zinc-800/70"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      ) : null}
      {children}
    </motion.a>
  );
}

export default function SectionNav() {
  const [activeId, setActiveId] = useState("inicio");
  const items = useMemo(() => navItems, []);

  useEffect(() => {
    const applyHashActive = () => {
      const hashId = window.location.hash.replace("#", "");
      if (!hashId) return;
      if (items.some((item) => item.id === hashId)) {
        setActiveId(hashId);
      }
    };

    applyHashActive();
    window.addEventListener("hashchange", applyHashActive);

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) {
      return () => window.removeEventListener("hashchange", applyHashActive);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const nextId = visible[0]?.target?.id;
        if (nextId) {
          setActiveId((current) => (current === nextId ? current : nextId));
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.2, 0.35, 0.5, 0.75] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", applyHashActive);
      observer.disconnect();
    };
  }, [items]);

  return (
    <header
      data-site-header
      className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/75 backdrop-blur-md"
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-6 py-3 md:px-10 xl:px-16">
        <a href="#inicio" className="text-xs tracking-[0.24em] text-zinc-200 uppercase">
          J.A
        </a>
        <ul className="hidden items-center gap-5 lg:flex">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <li key={item.id}>
                <MagneticNavLink
                  href={`#${item.id}`}
                  active={active}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </MagneticNavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
