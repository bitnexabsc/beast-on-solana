"use client";

export function HowToBuySection() {
  const mintAddress = process.env.NEXT_PUBLIC_BEASTSOL_MINT ?? "BEASTSOL_MINT";

  return (
    <section
      id="how-to-buy"
      className="beast-snap-section flex min-h-screen items-center px-6 py-16 sm:px-10"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-4xl tracking-wide text-beast-toxic sm:text-5xl mb-4">
          HOW TO BUY
        </h2>
        <p className="text-zinc-400 mb-10 text-lg">Three steps. No excuses. Get the beast.</p>

        {/* Step cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {[
            {
              step: "01",
              icon: "👻",
              title: "Get Phantom",
              desc: "Download the Phantom wallet. Available on Chrome, Firefox, and mobile.",
              btn: "Download Phantom",
              href: "https://phantom.app",
              color: "border-beast-toxic/40",
              btnColor: "bg-beast-toxic text-black",
            },
            {
              step: "02",
              icon: "💸",
              title: "Fund with SOL",
              desc: "Buy SOL on any Solana supported DEX (Coinbase, Binance, Kraken) and transfer to your Phantom/Jupiter wallet.",
              btn: null,
              href: null,
              color: "border-beast-ember/40",
              btnColor: "",
            },
            {
              step: "03",
              icon: "🚀",
              title: "Buy on pump.fun",
              desc: "Visit pump.fun and search $BEASTSOL. Swap SOL for BEASTSOL on the bonding curve.",
              btn: "Open pump.fun",
              href: `https://pump.fun/token/${mintAddress}`,
              color: "border-beast-rage/40",
              btnColor: "bg-beast-rage text-white",
            },
          ].map((card) => (
            <div
              key={card.step}
              className={`rounded-3xl border bg-[#0d0030]/90 p-8 shadow-[0_0_25px_rgba(125,2,160,0.3)] backdrop-blur ${card.color}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="font-heading text-5xl text-zinc-700">{card.step}</span>
                <div>
                  <div className="text-3xl">{card.icon}</div>
                  <h3 className="font-heading text-xl text-zinc-100 tracking-wide mt-1">
                    {card.title}
                  </h3>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{card.desc}</p>
              {card.btn && card.href && (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-block rounded-xl px-5 py-2 text-sm font-bold transition hover:brightness-90 ${card.btnColor}`}
                >
                  {card.btn} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* pump.fun embed */}
        <div className="rounded-3xl border border-beast-rage/40 bg-[#0d0030]/90 shadow-[0_0_30px_rgba(125,2,160,0.35)] overflow-hidden mb-6">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-beast-rage" />
            <div className="w-3 h-3 rounded-full bg-beast-ember" />
            <div className="w-3 h-3 rounded-full bg-beast-toxic" />
            <span className="text-xs text-zinc-500 ml-2 font-mono">pump.fun — live bonding curve</span>
          </div>
          <iframe
            src={`https://pump.fun/token/${mintAddress}`}
            style={{ width: "100%", height: "500px", border: "none", borderRadius: "0" }}
            title="pump.fun $BEASTSOL"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-beast-ember/40 bg-beast-ember/10 px-5 py-2 text-xs text-beast-ember">
          📈 Trade directly on the bonding curve. After migration, trading goes live on Raydium.
        </div>
      </div>
    </section>
  );
}
