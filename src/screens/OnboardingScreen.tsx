import { useState } from "react";
import logo from "../imports/image.png";

const SLIDES = [
  {
    label: "Community intelligence",
    title: "Drive with\nless noise.",
    body: "Real-time road reports from drivers around you. Cameras, traffic checks, hazards — all in one calm, focused view.",
    accent: "var(--brand-green)",
    glow: "#19D88A",
  },
  {
    label: "One tap reporting",
    title: "Spot something.\nHelp everyone.",
    body: "Report in under five seconds. Your report reaches hundreds of nearby drivers immediately.",
    accent: "var(--brand-cyan)",
    glow: "#00C9E8",
  },
  {
    label: "Privacy first",
    title: "Your data.\nYour control.",
    body: "Evidence photos are private and verified. We only use what you choose to share, and nothing more.",
    accent: "var(--brand-blue)",
    glow: "#0878FF",
  },
];

interface Props {
  onNavigate: (screen: string) => void;
}

export default function OnboardingScreen({ onNavigate }: Props) {
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Ambient glow — shifts per slide */}
      <div key={slide} className="absolute inset-0 pointer-events-none anim-fade" style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${s.glow}12 0%, transparent 70%)`,
      }}/>

      {/* Skip */}
      <div className="flex justify-end pt-14 px-5 relative">
        <button
          onClick={() => onNavigate("login")}
          className="pressable"
          style={{ font: "var(--text-label)", color: "var(--fg-3)", padding: "6px 12px" }}
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
        {/* Logo — shown only on first slide */}
        {slide === 0 && (
          <div className="relative mb-10">
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: "radial-gradient(circle, #19D88A18 0%, transparent 70%)",
              transform: "scale(1.8)",
            }}/>
            <img
              src={logo}
              alt="The3eye"
              style={{ width: 72, height: 72, borderRadius: 18, display: "block", position: "relative" }}
            />
          </div>
        )}

        <div key={slide} className="text-center">
          <p
            className="anim-up"
            style={{
              font: "600 11px/1 'Inter', system-ui, sans-serif",
              color: s.accent,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            {s.label}
          </p>
          <h1
            className="anim-up"
            style={{
              font: "700 30px/1.15 'Inter', system-ui, sans-serif",
              color: "var(--fg)",
              whiteSpace: "pre-line",
              letterSpacing: "-0.02em",
              marginBottom: 18,
              animationDelay: "0.04s",
            }}
          >
            {s.title}
          </h1>
          <p
            className="anim-up"
            style={{
              font: "var(--text-body)",
              color: "var(--fg-2)",
              lineHeight: 1.65,
              animationDelay: "0.08s",
            }}
          >
            {s.body}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 pb-12 relative">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                height: 4,
                width: i === slide ? 22 : 4,
                borderRadius: 2,
                background: i === slide ? s.accent : "var(--border-2)",
                transition: "width 0.22s ease, background 0.22s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => isLast ? onNavigate("login") : setSlide(slide + 1)}
          className="pressable w-full py-4 rounded-xl"
          style={{
            font: "600 15px/1 'Inter', system-ui, sans-serif",
            color: "white",
            background: isLast
              ? "linear-gradient(135deg, var(--brand-blue), var(--brand-cyan), var(--brand-green))"
              : s.accent,
          }}
        >
          {isLast ? "Get started" : "Continue"}
        </button>
      </div>
    </div>
  );
}
