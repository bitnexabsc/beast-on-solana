"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Why Solana?",
    a: "Solana gives Beast what Ethereum couldn't: speed, low fees, and a vibrant meme culture. Pump.fun is the fairest launchpad in crypto — no VCs, no insider allocations.",
  },
  {
    q: "What happened to old ETH $BEAST?",
    a: "$BEAST on Ethereum hit $3.3M market cap before gas fees and jeet sells bled it dry. $BEASTSOL is the rebirth — same legend, better chain.",
  },
  {
    q: "What is pump.fun?",
    a: "Pump.fun is a fair-launch meme token platform on Solana. Every token launches on a bonding curve — no presale, no team tokens. When the curve completes, it migrates to Raydium.",
  },
  {
    q: "How does the Sniper's Promise work?",
    a: "Alpha Sniper manually executes buybacks, burns, and caller rewards from designated wallets. All mechanics are transparent and community-verifiable.",
  },
  {
    q: "How to join the Alpha Den?",
    a: "Hold at least 1,000 $BEASTSOL in your connected wallet. The Alpha Den section will automatically unlock your private invite link.",
  },
  {
    q: "Wen Lambo?",
    a: "When the chart goes parabolic, anon. Stay in the pack.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          FAQ
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">No fluff. Just answers.</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border-2 border-beast-rage/40 bg-[#0d0030]/90 backdrop-blur"
              style={{ borderRadius: 0 }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-beast-rage/5 transition"
              >
                <span className="font-heading text-lg text-zinc-100 tracking-wide">{faq.q}</span>
                <span
                  className={`text-beast-toxic font-heading text-xl transition-transform ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 border-t-2 border-beast-rage/20 pt-4">
                      <p className="text-zinc-300 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
