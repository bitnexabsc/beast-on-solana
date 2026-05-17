"use client";

import { motion } from "framer-motion";

const MOCK_HOLDERS = [
  "7xKXtg2C", "4vJ9JU1b", "3Fn1ydEH", "9mPqRsTu", "6bNwXyZa",
  "2cDeFgHi", "8jKlMnOp", "5qRsTeUv", "1wXyZaBc", "0dEfGhIj",
  "KlMnOpQr", "StUvWxYz", "AbCdEfGh", "IjKlMnOp", "QrStUvWx",
  "YzAbCdEf", "GhIjKlMn", "OpQrStUv", "WxYzAbCd", "EfGhIjKl",
];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          COMMUNITY
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">The pack runs together.</p>

        {/* Social links */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          <a
            href="https://t.me/beastonsolana"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-3xl border border-beast-toxic/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(238,28,114,0.3)] backdrop-blur hover:border-beast-toxic hover:shadow-[0_0_30px_rgba(238,28,114,0.3)] transition group"
          >
            <span className="text-4xl">✈️</span>
            <div>
              <p className="font-heading text-lg text-beast-toxic tracking-wide">TELEGRAM</p>
              <p className="text-zinc-400 text-sm">@beastonsolana</p>
              <p className="text-beast-toxic text-sm font-bold mt-1">Join the Pack</p>
            </div>
            <span className="ml-auto text-beast-toxic opacity-0 group-hover:opacity-100 transition text-xl">→</span>
          </a>

          <a
            href="https://x.com/AlphaSnipersolX"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-3xl border border-beast-ember/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(243,2,89,0.3)] backdrop-blur hover:border-beast-ember hover:shadow-[0_0_30px_rgba(243,2,89,0.3)] transition group"
          >
            <span className="text-4xl">𝕏</span>
            <div>
              <p className="font-heading text-lg text-beast-ember tracking-wide">X / TWITTER</p>
              <p className="text-zinc-400 text-sm">@AlphaSnipersolX</p>
              <p className="text-beast-ember text-sm font-bold mt-1">8,200 followers</p>
            </div>
            <span className="ml-auto text-beast-ember opacity-0 group-hover:opacity-100 transition text-xl">→</span>
          </a>
        </div>

        {/* Mock tweet */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 mb-10 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-beast-toxic/20 border border-beast-toxic/40 flex items-center justify-center text-beast-toxic font-bold text-sm shrink-0">
              AS
            </div>
            <div>
              <p className="font-bold text-zinc-100">@AlphaSnipersolX</p>
              <p className="text-zinc-400 text-xs mb-2">Alpha Sniper · Solana Beast</p>
              <p className="text-zinc-300 text-sm leading-relaxed">
                🔥 $BEASTSOL is live on pump.fun. The Beast is out of the cage. Cortex Vortex
                energy. This is the rebirth the Furieverse deserves. Get in or get left behind.
                #BEASTSOL #Solana #pumpfun
              </p>
              <div className="flex gap-4 mt-3 text-xs text-zinc-500">
                <span>❤️ 847</span>
                <span>🔁 312</span>
                <span>💬 94</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wall of Alphas */}
        <div>
          <p className="font-heading text-xl text-zinc-300 tracking-wide mb-4 uppercase">
            Wall of Alphas
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {MOCK_HOLDERS.map((addr, i) => (
              <motion.div
                key={addr}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl border border-beast-toxic/20 bg-beast-toxic/5 px-3 py-2 text-center hover:border-beast-toxic/60 hover:shadow-[0_0_10px_rgba(238,28,114,0.4)] transition cursor-default"
              >
                <p className="text-xs font-mono text-beast-toxic truncate">
                  {addr.slice(0, 6)}...{addr.slice(-4)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
