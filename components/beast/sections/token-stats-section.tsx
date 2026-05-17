"use client";

import { useState } from "react";
import useSWR from "swr";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface TokenStatsData {
  marketCap: string;
  liquidity: string;
  supply: string;
  burned: string;
  holders: number;
  bondingCurvePercent: number;
  price: string;
}

export function TokenStatsSection() {
  const { data } = useSWR<TokenStatsData>("/api/token-stats", fetcher, {
    refreshInterval: 30000,
  });
  const [copied, setCopied] = useState(false);
  const mintAddress = process.env.NEXT_PUBLIC_BEASTSOL_MINT ?? "BEASTSOL_MINT";

  const copyContract = () => {
    void navigator.clipboard.writeText(mintAddress).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const stats = data ?? {
    marketCap: "$247,890",
    liquidity: "$18,400",
    supply: "1,000,000,000",
    burned: "42,069,000",
    holders: 1247,
    bondingCurvePercent: 23,
    price: "$0.000248",
  };

  const chartData = {
    labels: ["Circulating", "Burned"],
    datasets: [
      {
        data: [957931000, 42069000],
        backgroundColor: ["#ee1c72", "#7d02a0"],
        borderColor: ["#0a0a0a", "#0a0a0a"],
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#a1a1aa",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <section
      id="token-stats"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          TOKEN STATS
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">Live on-chain. No games.</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          {[
            { label: "Market Cap", value: stats.marketCap, color: "text-beast-toxic" },
            { label: "Liquidity", value: stats.liquidity, color: "text-beast-ember" },
            { label: "Supply", value: stats.supply, color: "text-zinc-100" },
            { label: "Burned", value: stats.burned, color: "text-beast-rage" },
            { label: "Holders", value: stats.holders.toString(), color: "text-yellow-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-beast-rage/30 bg-[#0d0030]/90 p-4 text-center backdrop-blur"
            >
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`font-heading text-xl tracking-wide ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bonding curve progress */}
        <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="font-heading text-sm text-zinc-300 tracking-wider uppercase">
              Bonding Curve → Raydium
            </p>
            <p className="font-heading text-beast-toxic">{stats.bondingCurvePercent}%</p>
          </div>
          <div className="w-full h-4 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-beast-toxic to-beast-ember transition-all duration-500"
              style={{ width: `${stats.bondingCurvePercent}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            {stats.bondingCurvePercent}% filled. Migration at 100%.
          </p>
        </div>

        {/* Contract address + chart */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Contract Address</p>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/75 p-3 mb-2">
              <code className="text-xs text-zinc-100 flex-1 break-all font-mono">{mintAddress}</code>
              <button
                type="button"
                onClick={copyContract}
                className="shrink-0 rounded-md border border-beast-rage/60 px-3 py-1 text-xs text-beast-rage hover:bg-beast-rage/10 transition whitespace-nowrap"
              >
                {copied ? "Copied, ya filthy animal." : "Copy"}
              </button>
            </div>
            <p className="text-xs text-zinc-600 italic">
              Verify on Solscan before interacting with any contract.
            </p>
          </div>

          <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur flex flex-col items-center">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4 self-start">
              Supply Breakdown
            </p>
            <div className="w-full max-w-[220px]">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
