// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-bg text-ink relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Gradient aura background */}
      <div className="from-primary/20 to-primary_light/20 animate-gradient absolute inset-0 bg-gradient-to-tr via-transparent bg-[length:200%_200%]" />

      {/* Floating glow orbs */}
      <div className="bg-primary/30 animate-float absolute top-10 left-10 h-32 w-32 rounded-full blur-3xl" />
      <div className="bg-primary_light/30 animate-float absolute right-20 bottom-10 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-ink/5 animate-float absolute bottom-32 left-1/3 h-24 w-24 rounded-full blur-2xl" />

      {/* Main content card */}
      <div className="border-glass_border bg-glass_bg animate-float relative z-10 flex flex-col items-center rounded-3xl border px-10 py-14 shadow-2xl backdrop-blur-xl">
        {/* 404 number with glow */}
        <h1 className="text-primary animate-pulse-glow text-[8rem] font-extrabold drop-shadow-lg">
          404
        </h1>

        {/* Illustration / emoji */}
        <div className="animate-float mt-4 text-6xl">🚀</div>

        {/* Headline */}
        <h2 className="text-ink mt-6 text-2xl font-bold">Lost in Space</h2>

        {/* Subtext */}
        <p className="text-muted mt-3 max-w-md text-center">
          The page you’re looking for has drifted into another galaxy. Let’s
          bring you back home safely.
        </p>

        {/* CTA button */}
        <Link
          href="/"
          className="bg-primary hover:bg-primary_light mt-8 inline-block rounded-xl px-8 py-3 font-medium text-white shadow-lg transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Decorative glowing particles */}
      <div className="bg-primary animate-pulse-glow absolute top-1/4 left-1/4 h-2 w-2 rounded-full" />
      <div className="bg-primary_light animate-pulse-glow absolute right-1/4 bottom-1/3 h-2 w-2 rounded-full" />
      <div className="bg-muted animate-pulse-glow absolute top-1/2 right-1/3 h-1.5 w-1.5 rounded-full" />
    </main>
  );
}
