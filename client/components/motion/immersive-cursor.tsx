"use client";

import { useEffect, useRef } from "react";

export default function ImmersiveCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const halo = haloRef.current;
    const label = labelRef.current;
    if (!dot || !halo || !label) return;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let haloX = 0;
    let haloY = 0;

    const update = () => {
      haloX += (mouseX - haloX) * 0.16;
      haloY += (mouseY - haloY) * 0.16;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      raf = window.requestAnimationFrame(update);
    };

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button");
      if (interactive) {
        halo.dataset.active = "true";
        const cue = interactive.getAttribute("data-cursor") || "Explorar";
        label.textContent = cue;
      } else {
        halo.dataset.active = "false";
        label.textContent = "";
      }
    };

    const onLeave = () => {
      halo.dataset.active = "false";
      label.textContent = "";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = window.requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="immersive-cursor" aria-hidden="true">
      <div ref={haloRef} data-active="false" className="immersive-cursor-halo">
        <span ref={labelRef} className="immersive-cursor-label" />
      </div>
      <div ref={dotRef} className="immersive-cursor-dot" />
    </div>
  );
}

