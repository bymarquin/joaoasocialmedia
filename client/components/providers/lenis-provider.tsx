"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type LenisProviderProps = {
  children: ReactNode;
};

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.2
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    const getHeaderOffset = () => {
      const header = document.querySelector<HTMLElement>("[data-site-header]");
      return (header?.offsetHeight ?? 0) + 12;
    };

    const scrollToHash = (hash: string) => {
      if (!hash || hash === "#") return;
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      lenis.scrollTo(target, { offset: -getHeaderOffset() });
    };

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      if (!document.querySelector(hash)) return;

      event.preventDefault();
      history.pushState(null, "", hash);
      scrollToHash(hash);
    };

    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("hashchange", onHashChange);
    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
