import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "$BEASTSOL Whitepaper — Beast on Solana",
  description:
    "Official BeastSolCoin ($BEASTSOL) whitepaper. Fair launch mechanics, tokenomics, security architecture, and long-term vision.",
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-[#0d0030] text-zinc-100">
      {/* Top nav */}
      <nav className="sticky top-0 z-40 border-b border-beast-rage/30 bg-[#0d0030]/95 backdrop-blur px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-beast-toxic tracking-widest hover:brightness-110 transition text-sm"
        >
          ← $BEASTSOL
        </Link>
        <span className="font-heading text-xs tracking-[0.3em] text-zinc-500 uppercase">
          Whitepaper v1.0 · May 2026
        </span>
        <a
          href="/whitepaper.txt"
          download
          className="rounded-full border border-beast-ember/60 px-4 py-1.5 text-xs font-bold text-beast-ember hover:bg-beast-ember/10 transition"
        >
          ↓ Download
        </a>
      </nav>

      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10">
        {/* Header */}
        <div className="mb-14 border-b border-beast-rage/30 pb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-beast-toxic/40 bg-beast-toxic/10 px-4 py-1.5 text-xs font-bold text-beast-toxic tracking-widest">
            OFFICIAL DOCUMENT
          </div>
          <h1 className="font-heading text-4xl leading-tight tracking-wide text-beast-toxic sm:text-6xl">
            BeastSolCoin
          </h1>
          <p className="mt-2 font-heading text-2xl text-beast-ember tracking-widest">$BEASTSOL</p>
          <p className="mt-4 text-zinc-400 text-lg">
            A Community-Driven Meme Beast Born on Solana via Pump.fun
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-zinc-600">Version 1.0 · May 2026</p>
        </div>

        {/* Abstract */}
        <Section id="abstract" title="Abstract" color="ember">
          <p className="text-zinc-300 leading-relaxed">
            BeastSolCoin ($BEASTSOL) is a community-first meme token launched on Solana via the
            Pump.fun launchpad. There was no presale, no team allocation, and no insider
            advantage—every single token entered circulation through a transparent bonding curve.
            At the moment of market cap maturity, all liquidity was automatically migrated to
            Raydium and permanently burned, making $BEASTSOL a truly decentralized and unstoppable
            asset. This whitepaper outlines the token&apos;s fair launch mechanics, tokenomics,
            security architecture, and long-term vision to become the apex beast of the Solana meme
            ecosystem.
          </p>
        </Section>

        {/* Section 1 */}
        <Section id="introduction" number="1" title="Introduction" color="toxic">
          <p className="text-zinc-300 leading-relaxed">
            The meme token landscape is flooded with unfair launches, snipers, team dumps, and
            rugs. BeastSolCoin was conceived to tear that playbook apart. By launching exclusively
            on{" "}
            <strong className="text-beast-toxic">Pump.fun</strong>, the most widely used
            fair-launch platform on Solana, $BEASTSOL guarantees that every holder got in at the
            same level playing field. No early allocations, no VC unlocks, no dev wallets—just a
            raw, organic community takeover.
          </p>
          <p className="mt-4 text-zinc-300 leading-relaxed">
            This whitepaper serves as the foundational document for BeastSolCoin, providing full
            transparency for our community, exchange listing applications (including CoinMarketCap
            and CoinGecko), and any future partners.
          </p>
        </Section>

        {/* Section 2 */}
        <Section id="launch" number="2" title="The Pump.fun Launch: A New Standard of Fairness" color="ember">
          <SubSection title="2.1 What is Pump.fun?">
            <p className="text-zinc-300 leading-relaxed">
              Pump.fun is a permissionless launchpad on Solana that allows anyone to create a token
              with a bonding curve pricing mechanism. All tokens are created as standard SPL tokens,
              with mint and freeze authorities automatically revoked at creation—meaning no one can
              ever mint new tokens or freeze wallet balances.
            </p>
          </SubSection>

          <SubSection title="2.2 The Bonding Curve Explained">
            <p className="text-zinc-300 leading-relaxed mb-4">
              $BEASTSOL launched on a bonding curve where the price of the token increases
              deterministically as more tokens are purchased. This means early buyers and later
              buyers all pay a price that reflects real-time demand. The bonding curve acts as a
              decentralized market maker until the token&apos;s market cap reaches{" "}
              <strong className="text-beast-ember">~$69,000</strong>.
            </p>
            <p className="text-zinc-400 text-sm mb-3">During the bonding curve phase:</p>
            <ul className="space-y-2">
              {[
                "100% of the token supply was available for purchase; no tokens were reserved.",
                "The bonding curve mathematically defined the price; no manual order book manipulation was possible.",
                "The token could be bought and sold directly on Pump.fun's interface against SOL.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <span className="text-beast-toxic mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="2.3 Migration to Raydium">
            <p className="text-zinc-300 leading-relaxed mb-4">
              Once the bonding curve market cap threshold was reached, the following automated
              process occurred:
            </p>
            <ul className="space-y-2">
              {[
                "$12,000 worth of liquidity (in $BEASTSOL and SOL) was taken from the bonding curve and deposited into a brand-new liquidity pool on Raydium, Solana's leading AMM.",
                "The remaining tokens in the bonding curve were paired with SOL to form this initial LP.",
                "The LP tokens were then burned (sent to a dead address) permanently and irreversibly, ensuring that the liquidity can never be removed by any individual or team.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                  <span className="text-beast-ember mt-0.5 shrink-0">▸</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl border border-beast-toxic/30 bg-beast-toxic/5 p-4">
              <p className="text-sm text-beast-toxic font-semibold">
                🔒 This mechanism creates an immutable, community-owned liquidity base. From that
                point forward, $BEASTSOL trades freely on Raydium like any other established token,
                driven purely by supply and demand.
              </p>
            </div>
          </SubSection>
        </Section>

        {/* Section 3 — Tokenomics */}
        <Section id="tokenomics" number="3" title="Tokenomics" color="toxic">
          <SubSection title="3.1 Token Summary">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {[
                    ["Token Name", "BeastSolCoin"],
                    ["Symbol", "$BEASTSOL"],
                    ["Blockchain", "Solana"],
                    ["Token Standard", "SPL"],
                    ["Total Supply", "1,000,000,000 $BEASTSOL"],
                    ["Decimals", "6"],
                    ["Initial Circulating Supply", "1,000,000,000 (100% at launch)"],
                    ["Transaction Tax", "0% (zero)"],
                    ["Contract Address", "To be announced at token deployment"],
                  ].map(([label, value]) => (
                    <tr key={label} className="border-b border-zinc-800">
                      <td className="py-3 pr-6 text-zinc-400 font-medium whitespace-nowrap">{label}</td>
                      <td className="py-3 text-zinc-100">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="3.2 Supply Distribution">
            <p className="text-zinc-300 leading-relaxed mb-4">
              Due to the Pump.fun fair launch model, the entire supply was released to the public
              through the bonding curve.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Public Buyers", pct: "100%", desc: "All tokens purchased on the open bonding curve.", color: "border-beast-toxic/40 bg-beast-toxic/5 text-beast-toxic" },
                { label: "Liquidity Pool", pct: "Locked ∞", desc: "Paired with SOL on Raydium; LP tokens permanently burned.", color: "border-beast-ember/40 bg-beast-ember/5 text-beast-ember" },
                { label: "Team / Insiders", pct: "0%", desc: "No tokens minted to any developer, founder, or insider wallet.", color: "border-zinc-600/40 bg-zinc-800/40 text-zinc-400" },
              ].map((item) => (
                <div key={item.label} className={`rounded-2xl border p-4 ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <p className={`font-heading text-2xl tracking-wide ${item.color.split(" ")[2]}`}>{item.pct}</p>
                  <p className="font-bold text-sm text-zinc-200 mt-1">{item.label}</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="3.3 Circulating Supply & Market Cap Reporting">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 space-y-2 text-sm text-zinc-300">
              <p>
                <span className="text-beast-toxic font-semibold">Circulating Supply:</span>{" "}
                1,000,000,000 $BEASTSOL — all tokens are in public hands. No tokens are locked, vested, or held back.
              </p>
              <p>
                <span className="text-beast-ember font-semibold">Max Supply:</span>{" "}
                1,000,000,000 $BEASTSOL (fixed, immutable — mint authority revoked).
              </p>
              <p className="text-zinc-500 text-xs italic">
                Note: LP burn address tokens may hold a percentage of supply. Those tokens are permanently removed from circulation and are treated as burned. Official submission will reflect the full 1B as issued, with a clear note of the burned LP amount.
              </p>
            </div>
          </SubSection>

          <SubSection title="3.4 Transaction Tax">
            <div className="flex items-center gap-4 rounded-xl border border-beast-toxic/30 bg-beast-toxic/5 p-5">
              <span className="text-4xl">🎯</span>
              <div>
                <p className="font-heading text-2xl text-beast-toxic">0% Tax</p>
                <p className="text-zinc-400 text-sm mt-1">
                  $BEASTSOL has zero transaction tax. The token contract is a standard SPL token with no custom transfer fee logic, ensuring maximum accessibility and full compatibility with all Solana protocols, wallets, and CEX listings.
                </p>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* Section 4 — Security */}
        <Section id="security" number="4" title="Security & Transparency" color="rage">
          <SubSection title="4.1 Mint & Freeze Authority">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: "🔒",
                  title: "Mint Authority Revoked",
                  desc: "Revoked at token creation. It is mathematically impossible to mint even one additional $BEASTSOL.",
                  color: "border-beast-toxic/40",
                },
                {
                  icon: "🛡️",
                  title: "No Freeze Authority",
                  desc: "None. No entity can freeze any holder's tokens. Verify independently on Solscan under the token's metadata.",
                  color: "border-beast-ember/40",
                },
              ].map((item) => (
                <div key={item.title} className={`rounded-2xl border bg-[#0d0030]/80 p-5 ${item.color}`}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-bold text-zinc-100 mb-1">{item.title}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="4.2 Liquidity Pool Burn">
            <div className="rounded-xl border border-beast-rage/40 bg-beast-rage/5 p-5">
              <p className="text-zinc-300 text-sm leading-relaxed">
                After the migration to Raydium, all LP tokens representing the initial $12,000 pool were sent to a known burner address (
                <code className="text-beast-toxic font-mono text-xs bg-zinc-900 px-1.5 py-0.5 rounded">
                  11111111111111111111111111111111
                </code>
                ), effectively destroying them forever. This means the foundational liquidity can never be pulled, offering immediate protection against rug pulls.
              </p>
            </div>
          </SubSection>

          <SubSection title="4.3 Smart Contract Audit">
            <p className="text-zinc-300 leading-relaxed text-sm">
              $BEASTSOL is an unmodified SPL token created by Pump.fun&apos;s audited factory contract. While the token itself does not contain custom code that requires auditing, the project team is committed to pursuing additional security validations (e.g., an audit of any future staking or utility contracts) before deployment. The Pump.fun launchpad has been extensively battle-tested and remains the gold standard for fair launches on Solana.
            </p>
          </SubSection>
        </Section>

        {/* Section 5 — Roadmap */}
        <Section id="roadmap" number="5" title="Vision & Roadmap" color="toxic">
          <p className="text-zinc-400 mb-6 leading-relaxed">
            BeastSolCoin isn&apos;t just a one-day meme; it&apos;s a community brand built to dominate the Solana jungle. Our roadmap is phased, community-driven, and focused on long-term engagement rather than hype cycles.
          </p>
          <div className="space-y-4">
            {[
              {
                phase: "Phase 1",
                name: "The Awakening",
                status: "completed",
                icon: "🌑",
                items: [
                  "Launch on Pump.fun with fair bonding curve.",
                  "Migration to Raydium and permanent LP burn.",
                  "500+ organic holders and active community channels.",
                  "Social media establishment (X, Telegram).",
                ],
              },
              {
                phase: "Phase 2",
                name: "The Roar",
                status: "current",
                timeline: "Q2 / Q3 2026",
                icon: "🦁",
                items: [
                  "Application for CoinMarketCap and CoinGecko listing.",
                  "Trending campaigns on DexScreener, Birdeye, and GeckoTerminal.",
                  "Community contests (memes, raids, art) to grow organic reach.",
                  "Establishment of a Community Treasury wallet via voluntary donations.",
                ],
              },
              {
                phase: "Phase 3",
                name: "Sharpening the Claws",
                timeline: "Q4 2026",
                icon: "⚔️",
                items: [
                  "Launch of the BeastSol NFT collection — hand-drawn art with holder-exclusive perks.",
                  "Staking dApp: stake $BEASTSOL to earn NFTs, partner tokens, or SOL rewards.",
                  "First Centralized Exchange (CEX) listing application based on community volume.",
                  "Full branding expansion: merchandise, collabs with other Solana projects.",
                ],
              },
              {
                phase: "Phase 4",
                name: "King of the Jungle",
                timeline: "2027 and Beyond",
                icon: "👑",
                items: [
                  "Play-to-earn or idle RPG mini-game where $BEASTSOL is the native currency.",
                  "On-chain DAO governance — holders vote on treasury use, partnerships, and upgrades.",
                  "Cross-chain bridge exploration (Ethereum, Base) to expand the beast's territory.",
                  "Tier-1 CEX listing and permanent status as a blue-chip meme coin.",
                ],
              },
            ].map((p) => (
              <div
                key={p.phase}
                className={`rounded-3xl border p-6 ${
                  p.status === "completed"
                    ? "border-zinc-700 bg-zinc-900/40 opacity-80"
                    : p.status === "current"
                    ? "border-beast-toxic bg-beast-toxic/5 shadow-[0_0_20px_rgba(238,28,114,0.3)]"
                    : "border-beast-rage/30 bg-[#0d0030]/80"
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 font-heading tracking-widest uppercase">{p.phase}</p>
                    <h3 className={`font-heading text-xl tracking-wide ${p.status === "completed" ? "text-zinc-400" : p.status === "current" ? "text-beast-toxic" : "text-zinc-300"}`}>
                      {p.name.toUpperCase()}
                    </h3>
                  </div>
                  {p.status === "completed" && (
                    <span className="rounded-full border border-zinc-600 px-3 py-0.5 text-xs text-zinc-500 font-bold">COMPLETED ✅</span>
                  )}
                  {p.status === "current" && (
                    <span className="rounded-full border border-beast-toxic/60 bg-beast-toxic/20 px-3 py-0.5 text-xs text-beast-toxic font-bold animate-pulse">CURRENT 🔄</span>
                  )}
                  {p.timeline && p.status !== "current" && (
                    <span className="rounded-full border border-zinc-700 px-3 py-0.5 text-xs text-zinc-500">{p.timeline}</span>
                  )}
                  {p.timeline && p.status === "current" && (
                    <span className="text-xs text-zinc-500">{p.timeline}</span>
                  )}
                </div>
                <ul className="space-y-1.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className={`mt-0.5 shrink-0 ${p.status === "completed" ? "text-zinc-600" : p.status === "current" ? "text-beast-toxic" : "text-zinc-600"}`}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
            <p className="text-xs text-zinc-500 italic">
              ⚠️ Note: This roadmap is a statement of intent. As a community-driven token, exact timelines and features may adapt based on collective input and market conditions.
            </p>
          </div>
        </Section>

        {/* Section 6 — Community */}
        <Section id="community" number="6" title="Community & Governance" color="ember">
          <p className="text-zinc-300 leading-relaxed mb-6">
            The BeastSol community is the heart of the project. We are building an ecosystem where every holder has a voice.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 mb-6">
            {[
              { platform: "X (Twitter)", link: "https://x.com/AlphaSnipersolX", handle: "@AlphaSnipersolX", icon: "𝕏" },
              { platform: "Telegram", link: "https://t.me/beastonsolana", handle: "@beastonsolana", icon: "✈️" },
              { platform: "Discord", link: "#", handle: "Coming soon", icon: "💬" },
            ].map((c) => (
              <a
                key={c.platform}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-beast-rage/40 bg-[#0d0030]/80 p-4 hover:border-beast-toxic transition"
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-xs font-bold text-zinc-300">{c.platform}</p>
                  <p className="text-xs text-zinc-500">{c.handle}</p>
                </div>
              </a>
            ))}
          </div>
          <SubSection title="Governance Model">
            <p className="text-zinc-300 text-sm leading-relaxed">
              In Phase 4, governance will transition to a full DAO. Before that, major decisions (such as treasury usage or partnership selection) will be discussed openly in community channels and put to snapshot votes weighted by token holdings.
            </p>
          </SubSection>
          <SubSection title="Community Treasury">
            <p className="text-zinc-300 text-sm leading-relaxed">
              A multi-signature wallet controlled by trusted community members and project leads will be established to hold any donated or revenue-generated SOL. Its purpose will be to fund marketing, exchange listing fees, giveaways, and development. All transactions will be transparently reported.
            </p>
          </SubSection>
        </Section>

        {/* Section 7 — Team */}
        <Section id="team" number="7" title="Team" color="rage">
          <p className="text-zinc-300 leading-relaxed mb-6">
            In the spirit of a true meme coin, the founding contributors initially operated under pseudonyms—a common and accepted practice in the space. However, for increased trust and to meet listing standards, the core team will progressively dox identities via official social channels and LinkedIn.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { handle: "BeastAlpha", role: "Strategy & Operations" },
              { handle: "SolClaws", role: "Community & Marketing" },
              { handle: "CryptoSavage", role: "Smart Contract & Tech" },
            ].map((member) => (
              <div key={member.handle} className="rounded-2xl border border-beast-rage/30 bg-[#0d0030]/80 p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-beast-toxic/20 border border-beast-toxic/40 flex items-center justify-center text-beast-toxic font-bold text-lg mx-auto mb-3">
                  {member.handle[0]}
                </div>
                <p className="font-heading text-sm tracking-widest text-zinc-200">{member.handle}</p>
                <p className="text-xs text-zinc-500 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 8 — Disclaimer */}
        <Section id="disclaimer" number="8" title="Legal Disclaimer" color="rage">
          <div className="rounded-xl border border-beast-rage/40 bg-beast-rage/5 p-6">
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              This whitepaper is for informational purposes only and does not constitute financial, investment, legal, or tax advice. $BEASTSOL is a meme token with no intrinsic value; it is purely a community-driven social experiment. Cryptocurrencies are highly volatile, and you could lose all of your capital. You should only participate if you fully understand and accept the risks.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              The BeastSolCoin project, its contributors, and community members are not liable for any financial losses incurred from trading or holding $BEASTSOL. All roadmap items are forward-looking statements and are subject to change based on market realities, regulatory environment, and community consensus.
            </p>
            <p className="text-zinc-400 text-sm">
              By engaging with $BEASTSOL, you confirm that you are in compliance with the laws of your jurisdiction.
            </p>
          </div>
        </Section>

        {/* Section 9 — Conclusion */}
        <Section id="conclusion" number="9" title="Conclusion" color="toxic">
          <div className="rounded-3xl border border-beast-toxic/40 bg-beast-toxic/5 p-8 text-center shadow-[0_0_30px_rgba(238,28,114,0.2)]">
            <p className="text-zinc-300 leading-relaxed mb-6 text-lg">
              BeastSolCoin ($BEASTSOL) is more than a token—it&apos;s a movement that started the way every meme coin should: fair, transparent, and completely in the hands of the community. Thanks to Pump.fun&apos;s revolutionary launch model, no single entity holds the keys; the liquidity is burned, the supply is fixed, and the beast roams free.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              We invite you to join our jungle, contribute your roar, and help us build a legacy that will echo through the Solana ecosystem.
            </p>
            <p className="font-heading text-2xl text-beast-toxic tracking-widest">
              Stay wild. Stay beastly. $BEASTSOL. ⛓️
            </p>
          </div>
        </Section>

        {/* Quick Reference */}
        <div className="mt-10 rounded-3xl border border-beast-ember/40 bg-[#0d0030]/80 p-8">
          <h3 className="font-heading text-xl text-beast-ember tracking-wide mb-5 uppercase">
            Quick Reference for Listings
          </h3>
          <div className="grid gap-3 text-sm">
            {[
              { label: "Website", value: "https://beastsol.xyz (Live at launch)" },
              { label: "Contract Address", value: "To be announced at token deployment — verify on Solscan" },
              { label: "Block Explorer", value: "Solscan — link published at token deployment" },
              { label: "Raydium Pool", value: "Published after bonding curve migration" },
              { label: "LP Burn Tx", value: "Published at migration — verify on-chain" },
              { label: "X (Twitter)", value: "@AlphaSnipersolX" },
              { label: "Telegram", value: "t.me/beastonsolana" },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4 border-b border-zinc-800 pb-3">
                <span className="text-zinc-500 w-32 shrink-0">{label}</span>
                <span className="text-zinc-200">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to site */}
        <div className="mt-14 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-beast-toxic px-8 py-3 font-heading font-bold text-black hover:brightness-95 transition"
          >
            ← Back to $BEASTSOL
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  id,
  number,
  title,
  children,
  color,
}: {
  id: string;
  number?: string;
  title: string;
  children: React.ReactNode;
  color: "toxic" | "ember" | "rage";
}) {
  const colorClass = {
    toxic: "text-beast-toxic border-beast-toxic/40",
    ember: "text-beast-ember border-beast-ember/40",
    rage: "text-beast-rage border-beast-rage/40",
  }[color];

  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <div className={`flex items-center gap-3 mb-6 pb-3 border-b ${colorClass.split(" ")[1]}`}>
        {number && (
          <span className="font-heading text-4xl text-zinc-800">{number}.</span>
        )}
        <h2 className={`font-heading text-2xl tracking-wide sm:text-3xl ${colorClass.split(" ")[0]}`}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="font-heading text-lg text-zinc-300 tracking-wide mb-3">{title}</h3>
      {children}
    </div>
  );
}
