import { CategoryIcon, CATEGORY_COLORS } from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
  destination?: string;
  durationMin?: number;
  distanceKm?: number;
}

const ALERTS_ENCOUNTERED = [
  { type: "traffic",  label: "Traffic check",  dist: "420 m" },
  { type: "camera",   label: "Speed camera",   dist: "1.2 km" },
];

export default function JourneyCompleteScreen({
  onNavigate,
  destination = "Cyber City",
  durationMin = 26,
  distanceKm = 14.2,
}: Props) {
  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Hero */}
      <div
        className="px-6 pt-16 pb-8 flex flex-col items-center text-center relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(160deg, #19D88A10 0%, #0878FF08 100%)",
        }}/>
        <div className="absolute pointer-events-none" style={{
          top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, #19D88A12 0%, transparent 70%)",
        }}/>
        {/* Arrival marker */}
        <div
          className="flex items-center justify-center rounded-full mb-5"
          style={{ width: 60, height: 60, background: "var(--c-green)14", position: "relative" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--c-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
        </div>

        <p style={{ font: "600 11px/1 'Inter', system-ui, sans-serif", color: "var(--c-green)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, position: "relative" }}>
          You arrived
        </p>
        <h1
          style={{ font: "700 26px/1.15 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.02em", marginBottom: 16, position: "relative" }}
        >
          {destination}
        </h1>

        {/* Summary strip */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>{durationMin}</p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>min</p>
          </div>
          <div style={{ width: 1, height: 28, background: "var(--border-2)" }}/>
          <div className="text-center">
            <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>{distanceKm}</p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>km</p>
          </div>
        </div>
      </div>

      {/* Drive summary */}
      <div className="flex-1 px-5 pt-5 overflow-y-auto no-scroll">

        <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
          Your drive
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Drive time",  value: `${durationMin} min` },
            { label: "Distance",    value: `${distanceKm} km` },
            { label: "Alerts seen", value: String(ALERTS_ENCOUNTERED.length) },
            { label: "Reports made", value: "1" },
          ].map((s, i) => (
            <div
              key={i}
              className="py-3.5 px-4 rounded-lg"
              style={{ background: "var(--bg-surface)" }}
            >
              <p style={{ font: "var(--text-mono)", color: "var(--fg)" }}>{s.value}</p>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 3 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Alerts encountered */}
        {ALERTS_ENCOUNTERED.length > 0 && (
          <>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              Alerts on route
            </p>
            {ALERTS_ENCOUNTERED.map((a, i) => {
              const c = CATEGORY_COLORS[a.type];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex items-center justify-center rounded flex-shrink-0"
                    style={{ width: 32, height: 32, background: `${c}12` }}>
                    <CategoryIcon type={a.type} size={14} color={c}/>
                  </div>
                  <p style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1 }}>{a.label}</p>
                  <span style={{ font: "var(--text-mono)", color: "var(--fg-3)", fontSize: 12 }}>{a.dist}</span>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pt-4 pb-8 flex flex-col gap-2.5" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => onNavigate("home")}
          className="pressable w-full py-4 rounded-xl"
          style={{
            font: "600 15px/1 'Inter', system-ui, sans-serif",
            color: "white",
            background: "var(--c-green)",
          }}
        >
          Done
        </button>
        <button
          onClick={() => onNavigate("history")}
          className="pressable w-full py-3"
          style={{ font: "var(--text-label)", color: "var(--fg-3)" }}
        >
          View driving history
        </button>
      </div>
    </div>
  );
}
