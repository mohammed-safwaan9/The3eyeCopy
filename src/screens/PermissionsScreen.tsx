import { useState } from "react";

interface Props {
  onNavigate: (screen: string) => void;
}

const PERMISSIONS = [
  {
    id: "location",
    color: "var(--c-green)",
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="15" r="5"/>
        <path d="M18 2C11.4 2 6 7.4 6 14c0 8.4 12 20 12 20S30 22.4 30 14C30 7.4 24.6 2 18 2z"/>
      </svg>
    ),
    title: "Location",
    why: "To show your position on the map, display nearby alerts, and provide turn-by-turn navigation.",
    detail: "Used only while the app is open. Never stored or shared with third parties.",
    required: true,
  },
  {
    id: "camera",
    color: "var(--c-blue)",
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="10" width="30" height="22" rx="3"/>
        <circle cx="18" cy="21" r="6"/>
        <path d="M13 10l2-4h6l2 4"/>
        <circle cx="27" cy="15" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: "Camera",
    why: "To add photo evidence to reports, making them more trustworthy to other drivers.",
    detail: "Camera activates only when you choose to add a photo. Nothing is captured automatically.",
    required: false,
  },
  {
    id: "microphone",
    color: "var(--c-purple)",
    Icon: () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="13" y="3" width="10" height="18" rx="5"/>
        <path d="M7 19c0 6.075 4.925 11 11 11s11-4.925 11-11"/>
        <line x1="18" y1="30" x2="18" y2="34"/>
        <line x1="13" y1="34" x2="23" y2="34"/>
      </svg>
    ),
    title: "Microphone",
    why: "For voice reporting while driving — safer than typing. Say what you see, we transcribe it instantly.",
    detail: "Audio is never recorded without your action. Nothing leaves your device without consent.",
    required: false,
  },
];

export default function PermissionsScreen({ onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const perm = PERMISSIONS[step];
  const isLast = step === PERMISSIONS.length - 1;

  const handleAllow = () => {
    if (isLast) onNavigate("login");
    else setStep(s => s + 1);
  };

  const handleSkip = () => {
    if (perm.required) return;
    if (isLast) onNavigate("login");
    else setStep(s => s + 1);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-6 pt-14">
        {PERMISSIONS.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= step ? perm.color : "var(--border-2)",
            transition: "background 0.25s ease",
          }}/>
        ))}
      </div>

      {/* Content */}
      <div key={step} className="flex-1 flex flex-col items-center justify-center px-8 anim-fade">

        {/* Icon circle */}
        <div
          className="flex items-center justify-center rounded-2xl mb-8"
          style={{
            width: 88, height: 88,
            background: `${perm.color}14`,
            color: perm.color,
          }}
        >
          <perm.Icon/>
        </div>

        {/* Step label */}
        <p
          style={{
            font: "600 11px/1 'Inter', system-ui, sans-serif",
            color: perm.color,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}
        >
          {step + 1} of {PERMISSIONS.length}
        </p>

        {/* Title */}
        <h1
          style={{
            font: "700 28px/1.15 'Inter', system-ui, sans-serif",
            color: "var(--fg)",
            letterSpacing: "-0.02em",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {perm.title} access
        </h1>

        {/* Why we need it */}
        <p
          style={{
            font: "var(--text-body)",
            color: "var(--fg-2)",
            textAlign: "center",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {perm.why}
        </p>

        {/* Fine print */}
        <div
          className="w-full px-4 py-3 rounded-lg"
          style={{ background: "var(--bg-subtle)" }}
        >
          <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textAlign: "center", lineHeight: 1.55 }}>
            {perm.detail}
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="px-6 pb-10 flex flex-col gap-2">
        <button
          onClick={handleAllow}
          className="pressable w-full py-4 rounded-xl"
          style={{
            font: "600 15px/1 'Inter', system-ui, sans-serif",
            color: "white",
            background: perm.color,
          }}
        >
          Allow {perm.title.toLowerCase()} access
        </button>

        {!perm.required && (
          <button
            onClick={handleSkip}
            className="pressable w-full py-3"
            style={{ font: "var(--text-label)", color: "var(--fg-3)" }}
          >
            Skip for now
          </button>
        )}

        {perm.required && (
          <p className="text-center" style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
            Location is required for The3eye to work.
          </p>
        )}
      </div>
    </div>
  );
}
