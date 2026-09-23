import { useEffect } from "react";
import logo from "../imports/image.png";

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Ambient gradient — matches Premium hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(160deg, #0878FF14 0%, #00C9E80A 50%, #19D88A06 100%)",
      }}/>
      <div className="absolute pointer-events-none" style={{
        top: "-20%", right: "-15%",
        width: 280, height: 280, borderRadius: "50%",
        background: "radial-gradient(circle, #0878FF18 0%, transparent 70%)",
      }}/>
      <div className="absolute pointer-events-none" style={{
        bottom: "-10%", left: "-10%",
        width: 200, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, #19D88A10 0%, transparent 70%)",
      }}/>

      <div className="anim-pop flex flex-col items-center gap-6 relative">
        <div className="relative">
          {/* Subtle glow ring behind logo */}
          <div className="absolute inset-0 rounded-3xl" style={{
            background: "radial-gradient(circle, #0878FF22 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}/>
          <img
            src={logo}
            alt="The3eye"
            style={{ width: 100, height: 100, borderRadius: 24, display: "block", position: "relative" }}
          />
        </div>

        <div className="text-center">
          <p
            className="brand-text-gradient"
            style={{
              font: "700 26px/1 'Inter', system-ui, sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            THE3EYE
          </p>
          <p
            style={{
              font: "var(--text-caption)",
              color: "var(--fg-3)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Drive with less noise
          </p>
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute flex gap-1.5" style={{ bottom: 52 }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: 4, height: 4, borderRadius: 2,
              background: "var(--brand-green)",
              opacity: 0.5,
              animation: `pulse-live 1.4s ease-in-out ${i * 0.22}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
