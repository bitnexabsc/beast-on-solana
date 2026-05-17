"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useBeastAudio } from "@/components/audio/audio-provider";
import { LoreSection } from "@/components/beast/sections/lore-section";
import { SniperPromiseSection } from "@/components/beast/sections/snipers-promise-section";
import { UtilitySection } from "@/components/beast/sections/utility-section";
import { HowToBuySection } from "@/components/beast/sections/how-to-buy-section";
import { TokenStatsSection } from "@/components/beast/sections/token-stats-section";
import { RoadmapSection } from "@/components/beast/sections/roadmap-section";
import { CommunitySection } from "@/components/beast/sections/community-section";
import { FaqSection } from "@/components/beast/sections/faq-section";

const launchAt = Date.parse("2026-05-23T15:00:00Z");

function getCountdownParts(timestamp: number) {
  const remaining = Math.max(0, timestamp - Date.now());
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    isLive: remaining === 0,
  };
}

export function BeastLandingPage() {
  const { hasInteracted, isMuted, playSound, toggleMute } = useBeastAudio();
  const [showLoader, setShowLoader] = useState(true);
  const [copied, setCopied] = useState(false);
  const hasPlayedRoar = useRef(false);
  const [countdown, setCountdown] = useState(() => getCountdownParts(launchAt));
  const mintAddress = process.env.NEXT_PUBLIC_BEASTSOL_MINT ?? "BEASTSOL_MINT";
  const pumpFunLink = `https://pump.fun/token/${mintAddress}`;
  const chartLink = `https://birdeye.so/token/${mintAddress}?chain=solana`;

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const hideLoader = () => {
      timeoutId = setTimeout(() => setShowLoader(false), 1200);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }

    return () => {
      window.removeEventListener("load", hideLoader);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdownParts(launchAt));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!hasInteracted || hasPlayedRoar.current) {
      return;
    }

    playSound("roar");
    hasPlayedRoar.current = true;
  }, [hasInteracted, playSound]);

  const copyContract = () => {
    void navigator.clipboard
      .writeText(mintAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((error: unknown) => {
        console.warn("Failed to copy mint address:", error);
      });
  };

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "radial-gradient(circle at 50% 40%, rgba(125,2,160,0.5), transparent 70%), #0d0030" }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src="/beast-mascot.png"
              alt="Beast"
              className="w-32 h-32 rounded-2xl object-cover shadow-[0_0_60px_rgba(238,28,114,0.8)] border-2 border-beast-toxic/60"
              animate={{ scale: [1, 1.08, 1], filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" }}
            />
            <p
              className="glitch-text mt-6 font-heading text-2xl tracking-wide text-beast-toxic"
              data-text="Summoning the Beast..."
            >
              Summoning the Beast...
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleMute}
        className="fixed right-4 bottom-4 z-40 rounded-full border border-beast-toxic/60 bg-[#0d0030]/90 px-4 py-2 text-xs font-semibold tracking-wider text-beast-toxic backdrop-blur hover:bg-[#0d0030]"
      >
        {isMuted ? "UNMUTE" : "MUTE"}
      </button>

      <main className="beast-scroll h-screen overflow-y-auto">
        <section
          id="hero"
          className="beast-snap-section relative flex min-h-screen items-center overflow-hidden px-6 py-16 sm:px-10"
        >
          {/* Brand banner as background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{ backgroundImage: "url('/beast-banner.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0030]/60 via-[#0d0030]/40 to-[#0d0030]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(238,28,114,0.35),transparent_50%),radial-gradient(circle_at_bottom,rgba(125,2,160,0.35),transparent_50%)]" />
          <motion.div
            className="absolute -top-10 -left-20 h-80 w-80 rounded-full bg-beast-ember/20 blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-beast-rage/20 blur-3xl"
            animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-8 shadow-[0_0_35px_rgba(125,2,160,0.4)] backdrop-blur sm:p-10">
              <p className="font-heading text-sm tracking-[0.25em] text-beast-ember">
                BEAST ON SOLANA
              </p>
              <h1 className="mt-3 font-heading text-5xl leading-[0.95] tracking-wide text-beast-toxic sm:text-7xl">
                $BEASTSOL
              </h1>
              <p className="mt-5 max-w-xl text-lg text-zinc-200">
                Born in the Cortex Vortex. Unleashed on pump.fun. $BEASTSOL runs free.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Minutes", value: countdown.minutes },
                  { label: "Seconds", value: countdown.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-beast-ember/45 bg-[#0d0030]/90 p-3 text-center"
                  >
                    <p
                      className="glitch-text font-countdown text-3xl text-beast-toxic"
                      data-text={item.value}
                    >
                      {item.value}
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-zinc-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
                {countdown.isLive
                  ? "Launched — The beast is live."
                  : "Launch: 23 May 2026"}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={pumpFunLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-beast-toxic px-5 py-2 text-sm font-bold text-black transition hover:brightness-95"
                >
                  Buy on pump.fun
                </a>
                <a
                  href={chartLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-beast-ember px-5 py-2 text-sm text-beast-ember transition hover:bg-beast-ember/10"
                >
                  Chart
                </a>
                <a
                  href="https://t.me/beastonsolana"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-beast-rage px-5 py-2 text-sm text-beast-rage transition hover:bg-beast-rage/10"
                >
                  Join the Pack
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center rounded-3xl border border-beast-toxic/50 bg-[#0d0030]/80 p-4 overflow-hidden shadow-[0_0_50px_rgba(238,28,114,0.35)]">
              {/* ambient glow behind mascot */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(125,2,160,0.5),transparent_70%)]" />
              <motion.img
                src="/beast-mascot.png"
                alt="Beast Mascot"
                className="relative z-10 w-full max-w-xs rounded-2xl shadow-[0_0_40px_rgba(238,28,114,0.5)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </div>
        </section>

        <LoreSection />
        <SniperPromiseSection />
        <UtilitySection />
        <HowToBuySection />
        <TokenStatsSection />
        <RoadmapSection />
        <CommunitySection />
        <FaqSection />

        <footer
          id="footer"
          className="beast-snap-section min-h-[45vh] border-t border-beast-rage/40 bg-[#0d0030]/95 px-6 py-12 sm:px-10"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            <p className="font-heading text-3xl tracking-wide text-beast-toxic">$BEASTSOL</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://x.com/AlphaSnipersolX"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-beast-toxic/40 px-4 py-2 text-sm text-zinc-100 hover:border-beast-toxic hover:text-beast-toxic"
              >
                X / @AlphaSnipersolX
              </a>
              <a
                href="https://t.me/beastonsolana"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-beast-ember/40 px-4 py-2 text-sm text-zinc-100 hover:border-beast-ember hover:text-beast-ember"
              >
                Telegram / Join the Pack
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/75 p-4">
              <span className="text-xs uppercase tracking-wider text-zinc-400">Contract</span>
              <code className="text-sm text-zinc-100">{mintAddress}</code>
              <button
                type="button"
                onClick={copyContract}
                className="rounded-md border border-beast-rage/60 px-3 py-1 text-xs text-beast-rage hover:bg-beast-rage/10"
              >
                {copied ? "Copied, ya filthy animal." : "Copy"}
              </button>
            </div>
            <p className="text-xs text-zinc-500">
              Alpha Sniper brand project. Meme token content is for entertainment and community
              engagement, not financial advice.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
