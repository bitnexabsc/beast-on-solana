"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    phase: "01",
    name: "The Awakening",
    icon: "🌑",
    status: "completed",
    timeline: "Completed ✅",
    milestones: [
      "Launch on Pump.fun (fair bonding curve)",
      "Migration to Raydium & permanent LP burn",
      "500+ organic holders established",
      "Social media channels live (X, Telegram)",
    ],
  },
  {
    phase: "02",
    name: "The Roar",
    icon: "🦁",
    status: "current",
    timeline: "Q2 / Q3 2026",
    milestones: [
      "CoinMarketCap & CoinGecko listing",
      "Trending on DexScreener, Birdeye, GeckoTerminal",
      "Community contests (memes, raids, art)",
      "Community Treasury wallet established",
    ],
  },
  {
    phase: "03",
    name: "Sharpening the Claws",
    icon: "⚔️",
    status: "upcoming",
    timeline: "Q4 2026",
    milestones: [
      "BeastSol NFT collection — holder-exclusive perks",
      "Staking dApp: earn NFTs, partner tokens, SOL",
      "First CEX listing application",
      "Merch store + Solana project collabs",
    ],
  },
  {
    phase: "04",
    name: "King of the Jungle",
    icon: "👑",
    status: "upcoming",
    timeline: "2027+",
    milestones: [
      "Play-to-earn RPG — $BEASTSOL native currency",
      "On-chain DAO governance",
      "Cross-chain bridge (Ethereum, Base)",
      "Tier-1 CEX listing & blue-chip meme status",
    ],
  },
];

function PhaseCard({ phase, index }: { phase: (typeof phases)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isCurrent = phase.status === "current";
  const isDone = phase.status === "completed";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className={`rounded-3xl border p-6 min-w-[260px] flex-shrink-0 backdrop-blur ${
        isCurrent
          ? "border-beast-toxic bg-beast-toxic/5 shadow-[0_0_20px_rgba(238,28,114,0.5)]"
          : isDone
          ? "border-zinc-700 bg-zinc-900/30 opacity-75"
          : "border-beast-rage/30 bg-[#0d0030]/90"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{phase.icon}</span>
        <div className="flex-1">
          <p className="text-xs text-zinc-500 font-heading tracking-widest">PHASE {phase.phase}</p>
          <h3
            className={`font-heading text-xl tracking-wide ${
              isCurrent ? "text-beast-toxic" : isDone ? "text-zinc-500" : "text-zinc-300"
            }`}
          >
            {phase.name.toUpperCase()}
          </h3>
        </div>
        {isCurrent && (
          <span className="rounded-full bg-beast-toxic/20 border border-beast-toxic/60 px-2 py-0.5 text-xs text-beast-toxic font-bold animate-pulse">
            LIVE
          </span>
        )}
        {isDone && (
          <span className="rounded-full bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500 font-bold">
            DONE
          </span>
        )}
      </div>

      <p className="text-xs text-zinc-600 mb-3 tracking-wider">{phase.timeline}</p>

      <ul className="space-y-2">
        {phase.milestones.map((m) => (
          <li key={m} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className={`mt-0.5 shrink-0 ${isCurrent ? "text-beast-toxic" : isDone ? "text-zinc-600" : "text-zinc-600"}`}>
              {isDone ? "✓" : "▸"}
            </span>
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
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-2">
          ROADMAP
        </h2>
        <p className="text-zinc-400 mb-2 text-lg">
          From the void to the apex. Every phase, earned.
        </p>
        <a
          href="/whitepaper#roadmap"
          className="inline-flex items-center gap-1 text-xs text-beast-ember hover:underline mb-10"
        >
          Read full roadmap in whitepaper →
        </a>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-x-visible">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.phase} phase={phase} index={i} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 text-xs text-zinc-500">
          <div className="w-3 h-3 rounded-full bg-beast-toxic animate-pulse" />
          <span>PHASE 02 — THE ROAR — Currently active · Q2/Q3 2026</span>
        </div>
      </div>
    </section>
  );
}
