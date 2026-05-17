"use client";

export function SniperPromiseSection() {
  return (
    <section
      id="snipers-promise"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          SNIPER&apos;S PROMISE
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">The pack is protected. Always.</p>

        <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-8 sm:p-10 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur mb-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">🎯</span>
            <div>
              <h3 className="font-heading text-3xl text-beast-ember tracking-wide">
                SNIPER&apos;S PROMISE
              </h3>
              <p className="text-zinc-400 text-sm">Alpha Sniper&apos;s commitment to the pack</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "🎯",
                title: "0.5% Caller Reward",
                desc: "0.5% of total supply – rewarded to Alpha Sniper for every token they call/signal",
                color: "border-beast-toxic/40 bg-beast-toxic/5",
              },
              {
                icon: "🤝",
                title: "5% Partner Share",
                desc: "Ongoing upside on every fair launch, forever",
                color: "border-beast-ember/40 bg-beast-ember/5",
              },
              {
                icon: "🔥",
                title: "5% Buyback & Burn",
                desc: "Manual buyback & burn applied regularly, deflationary",
                color: "border-beast-rage/40 bg-beast-rage/5",
              },
              {
                icon: "💰",
                title: "Auto Cashback",
                desc: "Creator rewards automatically distributed to traders",
                color: "border-yellow-500/40 bg-yellow-500/5",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border p-6 ${item.color}`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-heading text-lg text-zinc-100 tracking-wide mb-2">
                  {item.title}
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-zinc-500 italic border-t border-zinc-800 pt-4">
            These are manual mechanisms funded and executed by the team to protect and reward the pack.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 p-6 shadow-[0_0_30px_rgba(125,2,160,0.35)] backdrop-blur">
          <p className="font-heading text-sm text-zinc-400 tracking-widest mb-4 uppercase">Token Flow</p>
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <div className="rounded-xl border border-beast-toxic/60 bg-beast-toxic/10 px-4 py-3 text-center">
              <p className="font-heading text-beast-toxic text-sm tracking-wide">TOKEN</p>
            </div>
            {[
              { label: "Caller Reward", color: "border-beast-toxic/40 text-beast-toxic" },
              { label: "Partner Share", color: "border-beast-ember/40 text-beast-ember" },
              { label: "Buyback Burn", color: "border-beast-rage/40 text-beast-rage" },
              { label: "Trader Cashback", color: "border-yellow-500/40 text-yellow-400" },
            ].map((flow) => (
              <div key={flow.label} className="flex items-center gap-2">
                <span className="text-zinc-600">→</span>
                <div className={`rounded-xl border px-4 py-3 text-center ${flow.color}`}>
                  <p className={`text-xs font-bold tracking-wide ${flow.color.split(" ")[1]}`}>
                    {flow.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
