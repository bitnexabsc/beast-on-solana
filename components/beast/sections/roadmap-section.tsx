"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    phase: "01",
    name: "Awakening",
    icon: "🌑",
    status: "current",
    milestones: [
      "pump.fun launch",
      "Meme Lab live",
      "Community building",
      "Sniper's Promise active",
    ],
  },
  {
    phase: "02",
    name: "Bloodmoon",
    icon: "🩸",
    status: "upcoming",
    milestones: [
      "Raydium migration",
      "Beast Battles Arena",
      "NFT drop",
      "CoinGecko/CMC listing",
    ],
  },
  {
    phase: "03",
    name: "Rampage",
    icon: "🔥",
    status: "upcoming",
    milestones: [
      "CEX listings",
      "ETH bridge live",
      "Merch store",
      "Pack expansion",
    ],
  },
  {
    phase: "04",
    name: "Eclipse",
    icon: "🌑",
    status: "upcoming",
    milestones: [
      "Beast Chain meme launch",
      "Furieverse integration",
      "Cross-chain dominance",
      "Global pack rally",
    ],
  },
];

function PhaseCard({ phase, index }: { phase: (typeof phases)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isCurrent = phase.status === "current";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`rounded-3xl border p-6 min-w-[260px] flex-shrink-0 backdrop-blur ${
        isCurrent
          ? "border-beast-toxic bg-beast-toxic/5 shadow-[0_0_20px_rgba(238,28,114,0.5)]"
          : "border-beast-rage/30 bg-[#0d0030]/90"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{phase.icon}</span>
        <div>
          <p className="text-xs text-zinc-500 font-heading tracking-widest">PHASE {phase.phase}</p>
          <h3
            className={`font-heading text-xl tracking-wide ${
              isCurrent ? "text-beast-toxic" : "text-zinc-300"
            }`}
          >
            {phase.name.toUpperCase()}
          </h3>
        </div>
        {isCurrent && (
          <span className="ml-auto rounded-full bg-beast-toxic/20 border border-beast-toxic/60 px-2 py-0.5 text-xs text-beast-toxic font-bold">
            LIVE
          </span>
        )}
      </div>
      <ul className="space-y-2">
        {phase.milestones.map((m) => (
          <li key={m} className="flex items-center gap-2 text-sm text-zinc-400">
            <span className={isCurrent ? "text-beast-toxic" : "text-zinc-600"}>▸</span>
            {m}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          ROADMAP
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">
          From the void to the apex. Every phase, earned.
        </p>

        {/* Horizontal scroll on desktop, vertical on mobile */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-x-visible">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.phase} phase={phase} index={i} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500">
          <div className="w-3 h-3 rounded-full bg-beast-toxic animate-pulse" />
          <span>PHASE 01 — AWAKENING — Currently active</span>
        </div>
      </div>
    </section>
  );
}
