export const motionTokens = {
  spacing: {
    sectionY: "clamp(4.5rem, 8vw, 8.5rem)",
    sectionGap: "clamp(1rem, 2vw, 2rem)"
  },
  easing: {
    smoothOut: [0.16, 1, 0.3, 1] as const,
    softOut: [0.22, 1, 0.36, 1] as const
  },
  duration: {
    section: 0.9,
    hero: 1.2,
    card: 0.5,
    micro: 0.25
  },
  stagger: {
    cards: 0.08
  },
  reveal: {
    y: 34,
    start: "top 88%",
    end: "top 60%",
    scrub: 0.45
  }
};
