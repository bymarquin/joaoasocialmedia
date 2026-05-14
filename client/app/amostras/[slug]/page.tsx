"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion-tokens";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type VideoItem = {
  title: string;
  thumb: string;
  duration: string;
};

type SampleGallery = {
  title: string;
  subtitle: string;
  videos: VideoItem[];
};

type SpanKind = "s" | "w" | "t" | "l";

const spanClassByKind: Record<SpanKind, string> = {
  s: "col-span-1 row-span-1",
  w: "col-span-2 row-span-1",
  t: "col-span-1 row-span-2",
  l: "col-span-2 row-span-2"
};

function createRng(seed: number) {
  let t = seed % 2147483647;
  if (t <= 0) t += 2147483646;
  return () => {
    t = (t * 16807) % 2147483647;
    return (t - 1) / 2147483646;
  };
}

function toMdSpanClass(base: string) {
  return base
    .split(" ")
    .map((token) => `md:${token}`)
    .join(" ");
}

function buildBalancedKinds(count: number, seed: number): SpanKind[] {
  const rng = createRng(seed);
  const kinds: SpanKind[] = [];
  if (count <= 0) return kinds;

  // Guarantee visible variety first.
  kinds.push("w");
  if (count > 1) kinds.push("t");
  if (count > 3 && rng() > 0.55) kinds.push("l");

  let largeCount = 0;
  let tallCount = 0;
  let consecutiveTall = 0;

  kinds.forEach((kind) => {
    if (kind === "l") largeCount += 1;
    if (kind === "t" || kind === "l") {
      tallCount += 1;
      consecutiveTall += 1;
    } else {
      consecutiveTall = 0;
    }
  });

  for (let i = kinds.length; i < count; i += 1) {
    const pool: Array<{ kind: SpanKind; weight: number }> = [
      { kind: "s", weight: 3.2 },
      { kind: "w", weight: 2.1 },
      { kind: "t", weight: 1.5 },
      { kind: "l", weight: 0.8 }
    ];

    const filtered = pool.filter((entry) => {
      if (entry.kind === "l" && largeCount >= 2) return false;
      if ((entry.kind === "t" || entry.kind === "l") && tallCount >= 2) return false;
      if ((entry.kind === "t" || entry.kind === "l") && consecutiveTall >= 2) return false;
      return true;
    });

    const totalWeight = filtered.reduce((acc, entry) => acc + entry.weight, 0);
    let pick = rng() * totalWeight;
    let chosen: SpanKind = "s";
    for (const entry of filtered) {
      pick -= entry.weight;
      if (pick <= 0) {
        chosen = entry.kind;
        break;
      }
    }

    kinds.push(chosen);
    if (chosen === "l") largeCount += 1;
    if (chosen === "t" || chosen === "l") {
      tallCount += 1;
      consecutiveTall += 1;
    } else {
      consecutiveTall = 0;
    }
  }

  // Shuffle with seeded randomness, preserving the first tile as large/wide for rhythm.
  const head = kinds[0];
  const tail = kinds.slice(1).sort(() => rng() - 0.5);
  return [head, ...tail];
}


const galleries: Record<string, SampleGallery> = {
  "clinica-odontologica": {
    title: "Clinica Odontologica",
    subtitle: "Videos curtos com foco em autoridade e agenda.",
    videos: [
      { title: "Procedimento 01", thumb: "/amostras/clinica.jpg", duration: "00:21" },
      { title: "Antes e depois", thumb: "/amostras/clinica.jpg", duration: "00:18" },
      { title: "Depoimento", thumb: "/amostras/clinica.jpg", duration: "00:24" },
      { title: "Rotina de consultorio", thumb: "/amostras/clinica.jpg", duration: "00:16" },
      { title: "Equipe", thumb: "/amostras/clinica.jpg", duration: "00:20" },
      { title: "Oferta da semana", thumb: "/amostras/clinica.jpg", duration: "00:14" }
    ]
  },
  "campanhas-eventos": {
    title: "Campanhas eventos",
    subtitle: "Cobertura dinamica e conteudo para pre, durante e pos-evento.",
    videos: [
      { title: "Teaser", thumb: "/amostras/eventos.jpg", duration: "00:17" },
      { title: "Abertura", thumb: "/amostras/eventos.jpg", duration: "00:28" },
      { title: "Highlights", thumb: "/amostras/eventos.jpg", duration: "00:32" },
      { title: "Bastidores", thumb: "/amostras/eventos.jpg", duration: "00:22" },
      { title: "Reacao do publico", thumb: "/amostras/eventos.jpg", duration: "00:19" },
      { title: "Encerramento", thumb: "/amostras/eventos.jpg", duration: "00:25" }
    ]
  },
  fotos: {
    title: "Fotos",
    subtitle: "Cortes verticais e composicoes para socials e anuncios.",
    videos: [
      { title: "Fashion short", thumb: "/amostras/fotos.jpg", duration: "00:12" },
      { title: "Produto", thumb: "/amostras/fotos.jpg", duration: "00:15" },
      { title: "Lifestyle", thumb: "/amostras/fotos.jpg", duration: "00:20" },
      { title: "Editorial", thumb: "/amostras/fotos.jpg", duration: "00:18" },
      { title: "Moodboard", thumb: "/amostras/fotos.jpg", duration: "00:16" },
      { title: "Making of", thumb: "/amostras/fotos.jpg", duration: "00:14" }
    ]
  },
  diversos: {
    title: "Diversos",
    subtitle: "Criativos variados para marcas e negocios locais.",
    videos: [
      { title: "Comercio local", thumb: "/amostras/diversos.jpg", duration: "00:26" },
      { title: "Servico regional", thumb: "/amostras/diversos.jpg", duration: "00:18" },
      { title: "Institucional", thumb: "/amostras/diversos.jpg", duration: "00:23" },
      { title: "Ads vertical", thumb: "/amostras/diversos.jpg", duration: "00:15" },
      { title: "Brand cut", thumb: "/amostras/diversos.jpg", duration: "00:19" },
      { title: "Story pack", thumb: "/amostras/diversos.jpg", duration: "00:13" }
    ]
  }
};

export default function SampleGalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotion();
  const data = galleries[slug];
  if (!data) notFound();
  const seedFromQuery = Number(searchParams.get("seed") || "0");
  const layoutSeed = Number.isFinite(seedFromQuery) && seedFromQuery > 0 ? seedFromQuery : 1;
  const spanKinds = useMemo(
    () => buildBalancedKinds(data.videos.length, layoutSeed),
    [data.videos.length, layoutSeed]
  );

  return (
    <motion.main
      className="mx-auto w-full max-w-[1400px] px-6 py-10 md:py-12"
      initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
      animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: motionTokens.duration.section, ease: motionTokens.easing.smoothOut }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-zinc-500 uppercase">Amostras</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-zinc-100 md:text-5xl">{data.title}</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">{data.subtitle}</p>
        </div>
        <Link
          href="/#amostras"
          className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-200 hover:text-zinc-50"
        >
          Voltar
        </Link>
      </div>

      <section className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-4 md:grid-cols-4">
        {data.videos.map((video, index) => (
          <motion.article
            key={`${video.title}-${index}`}
            className={`group relative col-span-1 row-span-1 overflow-hidden rounded-xl ${toMdSpanClass(
              spanClassByKind[spanKinds[index] ?? "s"]
            )}`}
            initial={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.985 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : index * 0.06, duration: 0.45, ease: motionTokens.easing.softOut }}
            whileHover={reducedMotion ? undefined : { y: -3, scale: 1.01 }}
          >
            <Image
              src={video.thumb}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <h2 className="text-sm font-semibold text-white">{video.title}</h2>
              <p className="mt-1 text-xs text-white/80">{video.duration}</p>
            </div>
          </motion.article>
        ))}
      </section>
    </motion.main>
  );
}
