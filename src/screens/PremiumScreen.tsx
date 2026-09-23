import { useState } from "react";
import { IconBack, IconCheck, IconTrust } from "../components/Icons";

type EarnState = "progress" | "qualifying" | "earned" | "active" | "expired";

const QUALITY_CRITERIA = [
  { label: "GPS-verified location", sub: "Report filed within 100 m of event" },
  { label: "Community confirmations", sub: "Minimum 3 confirmations per report" },
  { label: "Accuracy rate", sub: "85%+ reports confirmed, not disputed" },
  { label: "No spam or abuse", sub: "Zero flagged low-quality submissions" },
];

function EarnProCard() {
  const [earnState] = useState<EarnState>("progress");
  const contributions = 42;
  const threshold = 60;
  const pct = Math.min(100, Math.round((contributions / threshold) * 100));

  const stateLabel: Record<EarnState, { label: string; color: string }> = {
    progress:   { label: "In progress",  color: "var(--fg-3)" },
    qualifying: { label: "Qualifying",   color: "var(--c-amber)" },
    earned:     { label: "Earned",       color: "var(--c-green)" },
    active:     { label: "Pro active",   color: "var(--c-green)" },
    expired:    { label: "Expired",      color: "var(--c-red)" },
  };

  return (
    <div className="mx-5 mb-5 rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--bg-surface)" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: "linear-gradient(135deg, #19D88A08 0%, #0878FF08 100%)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IconTrust size={14} color="var(--c-green)"/>
              <span className="brand-text-gradient" style={{ font: "600 11px/1 'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Earn Pro
              </span>
            </div>
            <p style={{ font: "600 16px/1.3 'Inter', sans-serif", color: "var(--fg)" }}>
              Contribute. Qualify. Get Pro free.
            </p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 4 }}>
              Verified contributors who meet quality thresholds earn 30-day Pro access — no credit card needed.
            </p>
          </div>
          <span className="flex-shrink-0 px-2 py-1 rounded-full" style={{
            font: "500 10px/1 'Inter', sans-serif",
            color: stateLabel[earnState].color,
            background: `${stateLabel[earnState].color}12`,
            border: `1px solid ${stateLabel[earnState].color}30`,
          }}>
            {stateLabel[earnState].label}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-baseline justify-between mb-2">
          <span style={{ font: "var(--text-label)", color: "var(--fg-2)" }}>Verified contributions</span>
          <span style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>
            {contributions}
            <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginLeft: 2 }}>/ {threshold}</span>
          </span>
        </div>
        <div className="rounded-full overflow-hidden" style={{ height: 6, background: "var(--bg-subtle)" }}>
          <div style={{
            height: "100%", borderRadius: 99, width: `${pct}%`,
            background: pct >= 100 ? "var(--c-green)" : "linear-gradient(90deg, var(--c-blue), var(--c-green))",
            transition: "width 0.6s ease",
          }}/>
        </div>
        <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 6 }}>
          {threshold - contributions} more verified reports to qualify · resets monthly
        </p>
      </div>

      {/* Quality criteria */}
      <div className="px-4 pt-3 pb-1" style={{ borderBottom: "1px solid var(--border)" }}>
        <p style={{ font: "10px/1 'Inter', sans-serif", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
          Quality criteria
        </p>
        {QUALITY_CRITERIA.map((c, i) => (
          <div key={i} className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
              style={{ width: 18, height: 18, background: "var(--c-green)15" }}>
              <IconCheck size={9} color="var(--c-green)"/>
            </div>
            <div>
              <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{c.label}</p>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 py-4">
        {earnState === "earned" ? (
          <button className="pressable w-full py-3.5 rounded-lg brand-gradient"
            style={{ font: "600 14px/1 'Inter', sans-serif", color: "white", boxShadow: "0 2px 10px #19D88A30" }}>
            Activate 30-day Pro
          </button>
        ) : (
          <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textAlign: "center" }}>
            Keep reporting accurately — Pro access unlocks automatically when you qualify.
          </p>
        )}
        <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textAlign: "center", marginTop: 8 }}>
          Anti-abuse: accounts with manipulation patterns are permanently ineligible.
        </p>
      </div>
    </div>
  );
}

interface Props {
  onNavigate: (screen: string) => void;
}

const PRO_FEATURES = [
  "Ad-free experience",
  "Advanced voice alerts",
  "Custom alert radius",
  "Route intelligence",
  "Driving statistics",
  "Multiple vehicles",
  "Advanced map layers",
  "Personal alert profiles",
];

const FREE_FEATURES = [
  "Live map & community reports",
  "Still there / Not there confirmations",
  "Basic voice alerts",
  "Reporting",
];

export default function PremiumScreen({ onNavigate }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header — brand gradient hero */}
      <div
        className="px-5 pt-14 pb-8 relative overflow-hidden"
        style={{ borderBottom: "1px solid var(--border-2)" }}
      >
        {/* Gradient backdrop */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(160deg, #0878FF18 0%, #00C9E812 50%, #19D88A0A 100%)",
          pointerEvents: "none",
        }} />
        {/* Subtle noise texture top-right */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{
          background: "radial-gradient(circle, #0878FF20 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
          pointerEvents: "none",
        }} />

        <button
          onClick={() => onNavigate("profile")}
          className="pressable w-9 h-9 flex items-center justify-center rounded mb-6 relative"
          style={{ background: "var(--bg-raised)" }}
        >
          <IconBack size={16} color="var(--fg-2)"/>
        </button>

        <p
          className="brand-text-gradient relative mb-2"
          style={{ font: "600 11px/1 'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          The3eye Pro
        </p>
        <h1
          className="relative mb-2"
          style={{ font: "700 28px/1.15 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.02em" }}
        >
          Drive smarter.<br/>Stay focused.
        </h1>
        <p className="relative" style={{ font: "var(--text-body)", color: "var(--fg-2)" }}>
          Everything in free, and the tools serious drivers need.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scroll">
        {/* Pricing */}
        <div className="px-5 pt-5 pb-2 grid grid-cols-2 gap-3">
          <PriceCard plan="Monthly" price="₹149" per="/month" highlight={false}/>
          <PriceCard plan="Annual" price="₹999" per="/year" highlight badge="Save 44%"/>
        </div>

        {/* Earn Pro path */}
        <SectionLabel>Or earn it free</SectionLabel>
        <EarnProCard/>

        {/* Divider */}
        <div className="mx-5 mb-1 flex items-center gap-3">
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
          <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>or subscribe</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}/>
        </div>

        {/* Pro features */}
        <SectionLabel>Pro features</SectionLabel>
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          {PRO_FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ borderBottom: i < PRO_FEATURES.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 20, height: 20, background: "var(--c-green)15" }}
              >
                <IconCheck size={11} color="var(--c-green)"/>
              </div>
              <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Free */}
        <SectionLabel>Always free</SectionLabel>
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          {FREE_FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ borderBottom: i < FREE_FEATURES.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 20, height: 20, background: "var(--bg-subtle)" }}
              >
                <IconCheck size={11} color="var(--fg-3)"/>
              </div>
              <span style={{ font: "var(--text-body)", color: "var(--fg-2)" }}>{f}</span>
            </div>
          ))}
        </div>

        <div className="px-5 pt-5 pb-8 flex flex-col gap-3">
          <button
            className="pressable brand-gradient w-full py-4 rounded-lg"
            style={{
              font: "600 15px/1 'Inter', sans-serif",
              color: "white",
              boxShadow: "0 2px 12px #0878FF40",
            }}
          >
            Start 7-day free trial
          </button>
          <p className="text-center" style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
            Cancel anytime. No commitment.
          </p>
          <div className="flex justify-center gap-6 mt-1">
            {["Terms", "Privacy", "Restore purchase"].map(t => (
              <button key={t} className="pressable" style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceCard({ plan, price, per, highlight, badge }: {
  plan: string; price: string; per: string; highlight: boolean; badge?: string;
}) {
  return (
    <div
      className="relative py-4 px-4 rounded-lg"
      style={{
        background: highlight ? "var(--bg-surface)" : "var(--bg-surface)",
        border: `1.5px solid ${highlight ? "var(--c-green)" : "var(--border)"}`,
      }}
    >
      {badge && (
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full"
          style={{ background: "var(--c-green)", whiteSpace: "nowrap" }}
        >
          <span style={{ font: "600 10px/1 'Inter', sans-serif", color: "white" }}>{badge}</span>
        </div>
      )}
      <p style={{ font: "var(--text-label)", color: "var(--fg-2)" }} className="mb-2">{plan}</p>
      <p style={{ font: "700 24px/1 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.02em" }}>
        {price}
      </p>
      <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">{per}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-5 pt-5 pb-2" style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
      {children}
    </p>
  );
}
