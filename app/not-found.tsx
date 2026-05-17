import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-beast-void px-6 text-center"
      style={{ background: "radial-gradient(circle at 50% 40%, rgba(125,2,160,0.3), transparent 60%), #0d0030" }}
    >
      <Image
        src="/beast-mascot.png"
        alt="Beast"
        width={180}
        height={180}
        className="rounded-2xl shadow-[0_0_50px_rgba(238,28,114,0.6)] border-2 border-beast-toxic/60 mb-6"
      />
      <h1 className="font-heading text-5xl text-beast-toxic tracking-wide sm:text-6xl">
        This page has been devoured.
      </h1>
      <p className="mt-4 text-zinc-400 text-lg max-w-md">
        The Beast consumed it. Nothing remains but void and ash.
      </p>
      <pre className="mt-6 text-beast-rage text-sm font-mono opacity-60 select-none">
{`  ╔══════════╗
  ║  404     ║
  ║  DEVOURED║
  ╚══════════╝`}
      </pre>
      <Link
        href="/"
        className="mt-8 rounded-full bg-beast-toxic px-6 py-3 font-bold text-white hover:brightness-90 transition shadow-[0_0_20px_rgba(238,28,114,0.5)]"
      >
        ← Return to the Pack
      </Link>
    </main>
  );
}
