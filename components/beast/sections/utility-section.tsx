"use client";

import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TokenStats {
  burned: string;
}

export function UtilitySection() {
  // Meme Lab
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [topText, setTopText] = useState("WHEN LAMBO");
  const [bottomText, setBottomText] = useState("$BEASTSOL");
  const [memeSubmitted, setMemeSubmitted] = useState(false);

  // Burn tracker
  const { data: tokenStats } = useSWR<TokenStats>("/api/token-stats", fetcher, {
    refreshInterval: 60000,
  });
  const [fireAnim, setFireAnim] = useState(false);
  const prevBurned = useRef<string | null>(null);

  // Alpha Den
  const [holdsTokens, setHoldsTokens] = useState(false);

  // ETH Bridge
  const [solAddress, setSolAddress] = useState("");
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  // Draw meme canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, 300, 200);

    // Beast face
    ctx.fillStyle = "#ee1c72";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("⛓", 150, 110);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    if (topText) ctx.fillText(topText.toUpperCase(), 150, 24);
    if (bottomText) {
      ctx.fillStyle = "#ee1c72";
      ctx.fillText(bottomText.toUpperCase(), 150, 185);
    }
  }, [topText, bottomText]);

  // Fire animation on burn change
  useEffect(() => {
    if (tokenStats?.burned && tokenStats.burned !== prevBurned.current) {
      prevBurned.current = tokenStats.burned;
      setFireAnim(true);
      const t = setTimeout(() => setFireAnim(false), 1500);
      return () => clearTimeout(t);
    }
  }, [tokenStats?.burned]);

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "beastsol-meme.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const submitMeme = async () => {
    await fetch("/api/meme-submit", { method: "POST" }).catch(() => null);
    setMemeSubmitted(true);
    setTimeout(() => setMemeSubmitted(false), 2000);
  };

  const claimTokens = async () => {
    const res = await fetch("/api/claim", { method: "POST" });
    const data = (await res.json()) as { message: string };
    setClaimStatus(data.message);
  };

  return (
    <section
      id="utility"
      className="beast-snap-section flex min-h-screen items-start px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-10">
          UTILITY
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Card 1: Beast Battles */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur flex flex-col">
            <div className="text-3xl mb-2">⚔️</div>
            <h3 className="font-heading text-xl text-beast-rage tracking-wide mb-1">
              BEAST BATTLES ARENA
            </h3>
            <span className="mb-4 inline-block self-start rounded-full border border-beast-rage/60 bg-beast-rage/20 px-3 py-0.5 text-xs font-bold text-beast-rage tracking-widest">
              COMING SOON
            </span>
            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
              Community holders will compete in on-chain Beast Battles. Leaderboard rewards, holder
              rankings, and exclusive beast-tier perks — all powered by $BEASTSOL.
            </p>
            <div className="mt-auto rounded-xl border border-beast-rage/30 bg-beast-rage/10 p-4 text-xs text-zinc-500">
              <p className="font-bold text-beast-rage mb-1">🔒 Unlocks after launch</p>
              <p>Smart contract in development. Battle mechanics will be announced in Phase 2 of the roadmap.</p>
            </div>
          </div>

          {/* Card 2: Meme Lab */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur">
            <div className="text-3xl mb-2">🖼</div>
            <h3 className="font-heading text-xl text-beast-ember tracking-wide mb-4">MEME LAB</h3>
            <canvas
              ref={canvasRef}
              width={300}
              height={200}
              className="rounded-xl border border-zinc-700 w-full mb-3"
            />
            <input
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top text"
              className="w-full rounded-lg border border-zinc-700 bg-[#0d0030]/80 px-3 py-2 text-sm text-zinc-100 mb-2 outline-none focus:border-beast-toxic"
            />
            <input
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom text"
              className="w-full rounded-lg border border-zinc-700 bg-[#0d0030]/80 px-3 py-2 text-sm text-zinc-100 mb-3 outline-none focus:border-beast-toxic"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={downloadMeme}
                className="flex-1 rounded-xl border border-beast-toxic/60 py-2 text-xs font-bold text-beast-toxic hover:bg-beast-toxic/10 transition"
              >
                ⬇ Download
              </button>
              <button
                type="button"
                onClick={() => void submitMeme()}
                className="flex-1 rounded-xl border border-beast-ember/60 py-2 text-xs font-bold text-beast-ember hover:bg-beast-ember/10 transition"
              >
                {memeSubmitted ? "✅ Sent!" : "📤 Submit"}
              </button>
            </div>
          </div>

          {/* Card 3: Burn Tracker */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur">
            <div className={`text-3xl mb-2 transition-transform ${fireAnim ? "scale-150" : ""}`}>
              🔥
            </div>
            <h3 className="font-heading text-xl text-beast-rage tracking-wide mb-4">
              SAVAGE BURN TRACKER
            </h3>
            <div className="rounded-xl border border-beast-rage/40 bg-beast-rage/10 p-4 text-center mb-4">
              <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Total Burned</p>
              <p className="font-heading text-2xl text-beast-rage">
                {tokenStats?.burned ?? "42,069,000"}
              </p>
              <p className="text-xs text-zinc-500">BEASTSOL burned</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 uppercase tracking-wider">Top Burners</p>
              <p className="text-xs text-zinc-600 italic">Data will populate after launch</p>
            </div>
          </div>

          {/* Card 4: Alpha Den */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur">
            <div className="text-3xl mb-2">💀</div>
            <h3 className="font-heading text-xl text-beast-toxic tracking-wide mb-4">
              ALPHA DEN
            </h3>
            {!holdsTokens ? (
              <div className="text-center">
                <div className="text-5xl mb-4 opacity-50">🔒</div>
                <p className="text-zinc-400 text-sm mb-4">
                  Hold <strong className="text-beast-toxic">1,000+ $BEASTSOL</strong> to enter
                </p>
                <button
                  type="button"
                  onClick={() => alert("Connect wallet via provider")}
                  className="w-full rounded-xl border border-zinc-600 py-2 text-sm text-zinc-400 hover:border-beast-toxic hover:text-beast-toxic transition mb-2"
                >
                  Connect Wallet
                </button>
                <button
                  type="button"
                  onClick={() => setHoldsTokens(true)}
                  className="w-full rounded-xl border border-beast-toxic/60 bg-beast-toxic/10 py-2 text-sm font-bold text-beast-toxic hover:bg-beast-toxic/20 transition"
                >
                  🔓 Simulate Hold
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4 animate-pulse">🟢</div>
                <p className="text-beast-toxic font-bold mb-3 text-sm">ACCESS GRANTED, ANON</p>
                <a
                  href="https://t.me/beastonsolana"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-xl bg-beast-toxic py-3 font-bold text-black text-sm hover:brightness-90 transition shadow-[0_0_20px_rgba(238,28,114,0.4)]"
                >
                  → Enter Alpha Den
                </a>
              </div>
            )}
          </div>

          {/* Card 5: ETH Bridge */}
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-heading text-xl text-beast-ember tracking-wide mb-4">
              ETH REDEMPTION BRIDGE
            </h3>
            <button
              type="button"
              onClick={() => alert("MetaMask connection: install MetaMask to proceed")}
              className="w-full rounded-xl border border-orange-500/60 bg-orange-500/10 py-2 text-sm font-bold text-orange-400 hover:bg-orange-500/20 transition mb-3"
            >
              🦊 Connect MetaMask
            </button>
            <input
              value={solAddress}
              onChange={(e) => setSolAddress(e.target.value)}
              placeholder="Your Solana wallet address"
              className="w-full rounded-lg border border-zinc-700 bg-[#0d0030]/80 px-3 py-2 text-sm text-zinc-100 mb-3 outline-none focus:border-beast-ember"
            />
            <button
              type="button"
              onClick={() => void claimTokens()}
              className="w-full rounded-xl bg-beast-ember py-2 text-sm font-bold text-black hover:brightness-90 transition mb-3"
            >
              Claim $BEASTSOL
            </button>
            {claimStatus && (
              <p className="text-xs text-beast-toxic text-center mb-2">{claimStatus}</p>
            )}
            <p className="text-xs text-zinc-500 italic">
              For old ETH $BEAST holders. Sign to verify ownership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
