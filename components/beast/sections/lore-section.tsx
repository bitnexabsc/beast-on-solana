"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const characters = [
  { emoji: "💨", name: "Gasspas" },
  { emoji: "🐸", name: "Gorth" },
  { emoji: "👁️", name: "Boochie" },
  { emoji: "🍓", name: "Berry" },
  { emoji: "🍔", name: "Bossburger" },
  { emoji: "⛓️", name: "Beast" },
];

export function LoreSection() {
  const [beastClicks, setBeastClicks] = useState(0);

  return (
    <section
      id="lore"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-10">
          LORE
        </h2>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-2 mb-10">
          {/* Left: Book cover + mascot */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-8 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur flex flex-col items-center justify-center min-h-[300px] gap-6">
            <div className="relative rounded-2xl border-4 border-beast-ember bg-gradient-to-b from-beast-ember/30 to-beast-rage/20 p-6 text-center w-full max-w-xs shadow-[0_0_25px_rgba(243,2,89,0.5)]">
              <div className="text-4xl mb-2">📖</div>
              <p className="font-heading text-2xl text-beast-toxic tracking-widest">CORTEX VORTEX</p>
              <p className="mt-1 text-zinc-300 text-sm">Community-inspired universe</p>
              <div className="mt-3 inline-block rounded-full border border-beast-toxic bg-beast-toxic/20 px-3 py-1 text-xs font-bold text-beast-toxic tracking-widest">
                FAN TRIBUTE
              </div>
            </div>
            <img
              src="/beast-mascot.png"
              alt="Beast Mascot"
              className="w-32 h-32 rounded-2xl object-cover shadow-[0_0_30px_rgba(238,28,114,0.6)] border-2 border-beast-toxic/60"
            />
          </div>

          {/* Right: ETH backstory + chart */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-8 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl opacity-40">Ξ</span>
              <div>
                <p className="text-beast-rage font-heading text-xl tracking-wide">ETH: BLED DRY</p>
                <p className="text-zinc-400 text-xs">$80k → $3.3M → abandoned</p>
              </div>
            </div>
            {/* Faded chart visualization */}
            <div className="relative h-24 w-full rounded-xl bg-[#0d0030]/80 border border-beast-rage/30 overflow-hidden mb-4">
              <svg viewBox="0 0 300 80" className="w-full h-full opacity-70">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ee1c72" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#ee1c72" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,80 0,70 30,65 60,50 90,35 120,15 150,20 180,30 210,45 240,60 270,65 300,70 300,80"
                  fill="url(#chartFill)"
                />
                <polyline
                  points="0,70 30,65 60,50 90,35 120,15 150,20 180,30 210,45 240,60 270,65 300,70"
                  fill="none"
                  stroke="#ee1c72"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0030]/80 to-transparent" />
            </div>
            <p className="text-zinc-500 text-xs italic">Ethereum $BEAST — from glory to gas.</p>
          </div>
        </div>

        {/* Lore text */}
        <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-8 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur mb-10">
          <h3 className="font-heading text-2xl text-beast-ember mb-4 tracking-wide">
            THE BEAST SELLER RISES
          </h3>
          <div className="space-y-4 text-zinc-300 leading-relaxed">
            <p>
              Deep inside the Cortex Vortex — a psychedelic universe of wild characters — a new entity crawled
              out:{" "}
              <strong className="text-beast-toxic">Beast, the Beast Seller.</strong> Surrounded by Gasspas,
              Gorth, Boochie, Berry, and Bossburger, Beast emerged as the most unhinged of them all.
            </p>
            <p>
              Inspired by this lore, the community launched{" "}
              <strong className="text-beast-toxic">$BEAST on Ethereum</strong>. It exploded from{" "}
              <span className="text-beast-ember">$80k to a $3.3M market cap</span> in weeks. But gas fees and
              jeets bled the beast dry.
            </p>
            <p>
              Now, on Solana, <strong className="text-beast-toxic">$BEASTSOL is reborn on pump.fun</strong> —
              the fairest launchpad in crypto. A community-driven fan tribute to the Cortex Vortex spirit, with
              real utility, a loyal pack, and a chain that lets him run.
            </p>
            <p className="text-xs text-zinc-600 italic">
              $BEASTSOL is an independent, community-created meme token. It is not affiliated with, endorsed
              by, or officially connected to any artist, publisher, or intellectual property holder.
            </p>
          </div>
        </div>

        {/* Character gallery 2x3 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {characters.map((char) => {
            const isBeast = char.name === "Beast";
            return (
              <motion.div
                key={char.name}
                className={`relative rounded-2xl border p-6 text-center cursor-pointer transition-all ${
                  isBeast
                    ? "border-beast-toxic bg-beast-toxic/10 shadow-[0_0_20px_rgba(238,28,114,0.3)]"
                    : "border-beast-rage/40 bg-[#0d0030]/90"
                }`}
                whileHover={{ scale: 1.05, filter: "hue-rotate(20deg)" }}
                onClick={() => {
                  if (isBeast) setBeastClicks((c) => c + 1);
                }}
              >
                <div className="text-4xl mb-2">
                  {isBeast ? (
                    <img src="/beast-mascot.png" alt="Beast" className="w-16 h-16 mx-auto rounded-xl object-cover" />
                  ) : (
                    char.emoji
                  )}
                </div>
                <p className="font-heading text-sm tracking-widest text-zinc-200">{char.name}</p>
                {isBeast && beastClicks >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-beast-toxic font-bold animate-pulse"
                  >
                    The Beast is watching. 👁️
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
