"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is $BEASTSOL?",
    a: "$BEASTSOL (BeastSolCoin) is a community-first meme token launched on Solana via Pump.fun. There was no presale, no team allocation, and no insider advantage — every single token entered circulation through a transparent bonding curve. The liquidity is permanently burned on Raydium.",
  },
  {
    q: "Why Solana?",
    a: "Solana gives Beast what Ethereum couldn't: speed, low fees (<$0.01/tx vs $20-$100+ on ETH), and a thriving meme culture. Pump.fun is the fairest launchpad in crypto — no VCs, no insider allocations, pure community.",
  },
  {
    q: "What happened to old ETH $BEAST?",
    a: "$BEAST on Ethereum hit $3.3M market cap before gas fees and jeet sells bled it dry. $BEASTSOL is the rebirth — same Furieverse legend, better chain. Launched exclusively on Pump.fun's bonding curve.",
  },
  {
    q: "Is the liquidity safe? Can it be rugged?",
    a: "No. After the bonding curve migration to Raydium, all LP tokens were permanently sent to a dead address (11111111111111111111111111111111). The liquidity is irreversibly burned — no individual or team can ever remove it.",
  },
  {
    q: "Can new $BEASTSOL tokens be minted?",
    a: "Absolutely not. The mint authority was revoked at token creation on Pump.fun. It is mathematically impossible to mint even one additional $BEASTSOL token. The max supply is fixed at 1,000,000,000 forever.",
  },
  {
    q: "What is the transaction tax?",
    a: "$BEASTSOL has ZERO transaction tax (0% buy/sell). The token is a standard SPL token with no custom transfer fee logic — maximum accessibility and full compatibility with all DEXs, wallets, and CEX listings.",
  },
  {
    q: "What is Pump.fun and how does the bonding curve work?",
    a: "Pump.fun is a permissionless launchpad on Solana where all tokens launch on a bonding curve — price increases deterministically as more tokens are purchased. No manual order book manipulation is possible. When the market cap reaches ~$69,000, liquidity auto-migrates to Raydium.",
  },
  {
    q: "How does the Sniper's Promise work?",
    a: "Alpha Sniper manually executes buybacks, burns, and caller rewards from designated wallets. Mechanics include: 0.5% caller reward, 5% partner share, 5% buyback & burn, and auto cashback to traders. All moves are announced publicly.",
  },
  {
    q: "How to join the Alpha Den?",
    a: "Hold at least 1,000 $BEASTSOL in your connected wallet. The Alpha Den section will automatically unlock your private invite link to the inner circle.",
  },
  {
    q: "Where can I read the full whitepaper?",
    a: "The full BeastSolCoin whitepaper — covering tokenomics, security architecture, roadmap, and governance — is available at /whitepaper on this site.",
    link: { label: "Read Whitepaper →", href: "/whitepaper" },
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
                      {faq.link && (
                        <a
                          href={faq.link.href}
                          className="inline-block mt-3 text-sm text-beast-toxic hover:underline font-semibold"
                        >
                          {faq.link.label}
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-beast-toxic/30 bg-beast-toxic/5 p-6 text-center">
          <p className="text-zinc-400 text-sm mb-3">Want the full technical and legal details?</p>
          <a
            href="/whitepaper"
            className="inline-flex items-center gap-2 rounded-full bg-beast-toxic px-6 py-2.5 text-sm font-bold text-black hover:brightness-95 transition"
          >
            📄 Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}
