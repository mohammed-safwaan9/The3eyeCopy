import { useState } from "react";
import {
  CategoryIcon, CATEGORY_COLORS, CATEGORY_NAMES,
  IconBack, IconVoice, IconCheck, IconLocation,
} from "../components/Icons";

/* Most common categories — always immediately accessible */
const PRIMARY_CATEGORIES = [
  "traffic", "camera", "accident", "hazard", "roadwork", "flood", "closure", "congestion",
] as const;

/* Less common categories — surfaced under "More" */
const MORE_CATEGORIES = [
  "pothole", "signal", "signal_broken", "debris", "breakdown", "wrongway",
  "lane", "construction", "waterlogging", "visibility", "streetlight", "other",
] as const;

type Category = string;

interface DetailQuestion {
  label: string;
  options: string[];
}

const CATEGORY_DETAILS: Record<string, DetailQuestion[]> = {
  traffic:    [
    { label: "Enforcement present?", options: ["Police visible", "No enforcement", "Unsure"] },
    { label: "Severity", options: ["Light slowdown", "Heavy", "Standstill"] },
  ],
  camera:     [
    { label: "Camera type", options: ["Fixed camera", "Mobile van", "Average speed"] },
    { label: "Direction", options: ["Both directions", "Your direction only", "Opposite only"] },
  ],
  accident:   [
    { label: "Severity", options: ["Minor — shoulder only", "Major — lanes blocked", "Road fully blocked"] },
  ],
  hazard:     [
    { label: "Hazard type", options: ["Object on road", "Animal", "Oil / spill", "Other"] },
  ],
  roadwork:   [
    { label: "Road impact", options: ["Lane closure", "Partial blockage", "Full closure"] },
  ],
  flood:      [
    { label: "Water depth", options: ["Passable carefully", "Deep — SUV only", "Dangerous — avoid"] },
  ],
  closure:    [
    { label: "Direction", options: ["Both directions", "One direction only"] },
  ],
  congestion: [
    { label: "Severity", options: ["Slow moving", "Very slow", "Standstill"] },
  ],
  pothole:    [
    { label: "Size", options: ["Small", "Large", "Deep — dangerous"] },
    { label: "Position", options: ["In your lane", "Roadside", "Across lanes"] },
  ],
  signal:     [
    { label: "Issue", options: ["Timing too long", "Flashing", "Stuck on red"] },
  ],
  signal_broken: [
    { label: "State", options: ["Completely dark", "Flashing", "Partial fault"] },
  ],
  debris:     [
    { label: "Lane impact", options: ["In your lane", "Roadside", "Across lanes"] },
  ],
  breakdown:  [
    { label: "Position", options: ["Hard shoulder", "In a lane", "Blocking traffic"] },
  ],
  wrongway:   [
    { label: "Direction", options: ["Oncoming in your lane", "Opposite carriageway"] },
  ],
  lane:       [
    { label: "Lanes affected", options: ["One lane", "Two lanes", "Multiple lanes"] },
  ],
  construction: [
    { label: "Road impact", options: ["Lane closure", "Partial blockage", "Full closure"] },
  ],
  waterlogging: [
    { label: "Depth", options: ["Shallow — passable", "Deep — SUV only", "Impassable"] },
  ],
  visibility: [
    { label: "Cause", options: ["Fog", "Smoke", "Heavy rain", "Dust"] },
  ],
  streetlight: [
    { label: "Extent", options: ["Single light", "Stretch of road", "Whole junction"] },
  ],
  other:      [],
};

interface Props {
  onNavigate: (screen: string) => void;
  returnTo?: string;
}

type Step = "pick" | "location" | "details" | "evidence" | "submitting" | "done";

export default function ReportScreen({ onNavigate, returnTo = "home" }: Props) {
  const [step, setStep] = useState<Step>("pick");
  const [type, setType] = useState<Category | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [addPhoto, setAddPhoto] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const color = type ? CATEGORY_COLORS[type] : "var(--c-green)";
  const name  = type ? CATEGORY_NAMES[type] : "";
  const questions = type ? CATEGORY_DETAILS[type] : [];

  const STEPS: Step[] = ["pick", "location", "details", "evidence", "submitting", "done"];
  const stepIndex = STEPS.indexOf(step);
  const progress = stepIndex <= 1 ? stepIndex / 4 : stepIndex <= 3 ? stepIndex / 4 : 1;

  const goBack = () => {
    if (step === "pick") { onNavigate(returnTo); return; }
    if (step === "location") { setStep("pick"); return; }
    if (step === "details") { setStep("location"); return; }
    if (step === "evidence") { setStep("details"); return; }
    onNavigate(returnTo);
  };

  const submit = () => {
    setStep("submitting");
    setTimeout(() => setStep("done"), 1600);
  };

  const STEP_TITLES: Record<Step, string> = {
    pick: "What are you seeing?",
    location: "Confirm location",
    details: name ? `${name} details` : "Details",
    evidence: "Photo evidence",
    submitting: "Submitting…",
    done: "Done",
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 pt-14 pb-3.5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={goBack}
          className="pressable w-9 h-9 flex items-center justify-center rounded"
          style={{ background: "var(--bg-subtle)" }}
        >
          <IconBack size={16} color="var(--fg-2)"/>
        </button>

        <span style={{ font: "var(--text-heading)", color: "var(--fg)" }}>
          {STEP_TITLES[step]}
        </span>

        <button
          onClick={() => setVoiceActive(v => !v)}
          className="pressable w-9 h-9 flex items-center justify-center rounded"
          style={{ background: voiceActive ? "var(--c-green)18" : "var(--bg-subtle)" }}
        >
          <IconVoice size={16} color={voiceActive ? "var(--c-green)" : "var(--fg-3)"}/>
        </button>
      </div>

      {/* Progress bar */}
      {step !== "pick" && step !== "submitting" && step !== "done" && (
        <div style={{ height: 2, background: "var(--border)" }}>
          <div style={{
            height: "100%",
            width: `${Math.round(progress * 100)}%`,
            background: color,
            transition: "width 0.35s ease",
          }}/>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scroll">

        {/* STEP 1: Pick category */}
        {step === "pick" && (
          <div className="p-4">
            {voiceActive && (
              <div
                className="flex items-center gap-3 mb-4 px-3 py-3 rounded-lg anim-up"
                style={{ background: "var(--c-green)10", border: "1px solid var(--c-green)30" }}
              >
                <span style={{ font: "var(--text-label)", color: "var(--c-green)" }}>Listening…</span>
                <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                  Say "traffic check" or "speed camera"
                </span>
                <span className="ml-auto flex-shrink-0"
                  style={{ width: 8, height: 8, borderRadius: 4, background: "var(--c-red)", animation: "pulse-live 1s infinite" }}
                />
              </div>
            )}

            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <IconLocation size={14} color="var(--c-green)"/>
              <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1 }}>
                NH-48, near Huda City Centre
              </span>
              <span style={{ font: "var(--text-mono)", color: "var(--fg-3)", fontSize: 11 }}>±8 m</span>
            </div>

            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              What are you seeing?
            </p>

            <div className="grid grid-cols-4 gap-1.5">
              {PRIMARY_CATEGORIES.map(cat => {
                const c = CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => { setType(cat); setAnswers({}); setStep("location"); }}
                    className="pressable flex flex-col items-center gap-2 py-3.5 rounded-lg"
                    style={{ background: "var(--bg-surface)" }}
                  >
                    <CategoryIcon type={cat} size={20} color={c}/>
                    <span style={{ font: "500 9.5px/1.3 'Inter', sans-serif", color: "var(--fg-2)", textAlign: "center" }}>
                      {CATEGORY_NAMES[cat]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* More categories */}
            {showMore && (
              <div className="grid grid-cols-4 gap-1.5 mt-1.5 anim-up">
                {MORE_CATEGORIES.map(cat => {
                  const c = CATEGORY_COLORS[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => { setType(cat); setAnswers({}); setStep("location"); }}
                      className="pressable flex flex-col items-center gap-2 py-3.5 rounded-lg"
                      style={{ background: "var(--bg-surface)" }}
                    >
                      <CategoryIcon type={cat} size={20} color={c}/>
                      <span style={{ font: "500 9.5px/1.3 'Inter', sans-serif", color: "var(--fg-2)", textAlign: "center" }}>
                        {CATEGORY_NAMES[cat]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setShowMore(v => !v)}
              className="pressable w-full mt-3 py-3 rounded-lg flex items-center justify-center gap-2"
              style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
            >
              <span style={{ font: "var(--text-label)", color: "var(--fg-2)" }}>
                {showMore ? "Show fewer" : "More categories"}
              </span>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="var(--fg-3)"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
                <polyline points="5 8 10 13 15 8"/>
              </svg>
            </button>
          </div>
        )}

        {/* STEP 2: Confirm location */}
        {step === "location" && type && (
          <div className="p-4 flex flex-col gap-4 anim-up">
            {/* Selected type chip */}
            <div className="flex items-center gap-3 pb-4" style={{ borderBottom: `2px solid ${color}22` }}>
              <div
                className="flex items-center justify-center rounded flex-shrink-0"
                style={{ width: 40, height: 40, background: `${color}14` }}
              >
                <CategoryIcon type={type} size={20} color={color}/>
              </div>
              <div>
                <p style={{ font: "var(--text-title)", color: "var(--fg)" }}>{name}</p>
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-0.5">
                  Reporting this category
                </p>
              </div>
            </div>

            {/* Location details */}
            <div
              className="rounded-lg px-4 py-3.5 flex flex-col gap-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <IconLocation size={14} color="var(--c-green)"/>
                <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1 }}>
                  NH-48, near Huda City Centre
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>GPS accuracy</span>
                <span style={{ font: "var(--text-mono)", color: "var(--c-green)", fontSize: 11 }}>±8 m · High</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>Coordinates</span>
                <span style={{ font: "var(--text-mono)", color: "var(--fg-2)", fontSize: 11 }}>28.4595° N, 77.0266° E</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>Timestamp</span>
                <span style={{ font: "var(--text-mono)", color: "var(--fg-2)", fontSize: 11 }}>
                  {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>

            {/* Mini map */}
            <div
              className="rounded-lg overflow-hidden relative"
              style={{ height: 130, background: "var(--map-ground)", border: "1px solid var(--border)" }}
            >
              <svg viewBox="0 0 300 130" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                <rect width="300" height="130" fill="var(--map-ground)"/>
                {([[0,22],[0,60],[0,98]] as [number,number][]).map(([x,y],i) => (
                  <rect key={i} x={x} y={y} width="300" height="12" fill="var(--map-road-hwy)"/>
                ))}
                {([[110,0],[190,0]] as [number,number][]).map(([x,y],i) => (
                  <rect key={i+3} x={x} y={y} width="10" height="130" fill="var(--map-road-hwy)"/>
                ))}
                {[[5,8,95,10],[205,8,85,10],[5,42,95,10],[205,42,85,10],[5,78,95,10],[205,78,85,10]] .map(([x,y,w,h],i) => (
                  <rect key={`blk-${i}`} x={x} y={y} width={w} height={h} fill="var(--map-block)" rx="1"/>
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex items-center justify-center rounded"
                  style={{ width: 34, height: 34, background: color, boxShadow: `0 2px 8px ${color}40` }}
                >
                  <CategoryIcon type={type} size={16} color="white"/>
                </div>
              </div>
              <div
                className="absolute bottom-2 right-2 px-2 py-1 rounded"
                style={{ background: "var(--overlay-nav)", font: "var(--text-caption)", color: "var(--fg-2)" }}
              >
                GPS · accurate
              </div>
            </div>

            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textAlign: "center" }}>
              Location is set automatically. Tap Continue to confirm.
            </p>

            <button
              onClick={() => setStep("details")}
              className="pressable w-full py-4 rounded-lg"
              style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: color }}
            >
              Confirm location →
            </button>
          </div>
        )}

        {/* STEP 3: Category-specific details */}
        {step === "details" && type && (
          <div className="p-4 flex flex-col gap-5 anim-up">
            {questions.map((q, qi) => (
              <div key={qi}>
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                  {q.label}
                </p>
                <div className="flex flex-col gap-2">
                  {q.options.map(opt => {
                    const selected = answers[q.label] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswers(a => ({ ...a, [q.label]: opt }))}
                        className="pressable flex items-center gap-3 px-4 py-3.5 rounded-lg"
                        style={{
                          background: selected ? `${color}10` : "var(--bg-surface)",
                          border: `1px solid ${selected ? color : "var(--border)"}`,
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{
                            width: 18, height: 18,
                            border: `1.5px solid ${selected ? color : "var(--border-2)"}`,
                            background: selected ? color : "transparent",
                          }}
                        >
                          {selected && <IconCheck size={10} color="white"/>}
                        </div>
                        <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Optional note */}
            <div>
              <label style={{
                display: "block", marginBottom: 6,
                font: "var(--text-caption)", color: "var(--fg-3)",
                textTransform: "uppercase", letterSpacing: "0.07em",
              }}>
                Note (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any useful detail…"
                style={{
                  width: "100%", padding: "12px 14px",
                  borderRadius: "var(--r-md)",
                  background: "var(--bg-input)",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                  font: "var(--text-body)",
                  resize: "none",
                  outline: "none",
                }}
              />
            </div>

            <button
              onClick={() => setStep("evidence")}
              className="pressable w-full py-4 rounded-lg"
              style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: color }}
            >
              Next →
            </button>
          </div>
        )}

        {/* STEP 4: Evidence */}
        {step === "evidence" && (
          <div className="p-4 flex flex-col gap-4 anim-up">
            <div
              className="rounded-lg px-4 py-3 flex items-start gap-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--c-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 1, flexShrink: 0 }}>
                <circle cx="10" cy="10" r="8"/>
                <line x1="10" y1="6" x2="10" y2="10"/>
                <circle cx="10" cy="14" r="0.5" fill="var(--c-green)"/>
              </svg>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", lineHeight: 1.6 }}>
                Photo evidence is <span style={{ color: "var(--fg-2)" }}>private</span> — used only to verify this report. It is never shown publicly.
              </p>
            </div>

            <div
              className="flex flex-col items-center justify-center gap-4 py-14 rounded-lg"
              style={{ background: "var(--bg-subtle)", border: "1.5px dashed var(--border-2)" }}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: 52, height: 52, background: "var(--bg-surface)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div className="text-center px-6">
                <p style={{ font: "var(--text-heading)", color: "var(--fg)" }}>
                  Tap to take a photo
                </p>
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-2 leading-relaxed">
                  Private photo evidence strengthens your report
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={submit}
                className="pressable flex-1 py-3.5 rounded-lg"
                style={{ font: "var(--text-heading)", color: "var(--fg-2)", background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
              >
                Skip photo
              </button>
              <button
                onClick={submit}
                className="pressable flex-1 py-3.5 rounded-lg"
                style={{ font: "var(--text-heading)", color: "white", background: color }}
              >
                Add photo
              </button>
            </div>
          </div>
        )}

        {/* STEP: Submitting */}
        {step === "submitting" && (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="anim-spin"
              style={{
                width: 40, height: 40, borderRadius: 20,
                border: `3px solid ${color}30`, borderTopColor: color,
              }}
            />
            <p style={{ font: "var(--text-body)", color: "var(--fg-2)" }}>
              Submitting report…
            </p>
          </div>
        )}

        {/* STEP: Done */}
        {step === "done" && (
          <div className="flex flex-col items-center px-6 py-16 gap-8 anim-pop">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 72, height: 72, background: "var(--c-green)12" }}
            >
              <IconCheck size={32} color="var(--c-green)"/>
            </div>

            <div className="text-center">
              <h2 style={{ font: "700 22px/1.2 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>
                Report submitted
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--fg-2)" }} className="mt-2">
                Thanks — you helped nearby drivers.
              </p>
            </div>

            <div
              className="w-full rounded-lg overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="grid grid-cols-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {[
                  { label: "Drivers nearby", value: "142" },
                  { label: "Confidence", value: "High" },
                  { label: "Trust points", value: "+5" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="text-center py-4"
                    style={{ borderRight: i < 2 ? "1px solid var(--border)" : "none" }}
                  >
                    <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>
                      {s.value}
                    </p>
                    <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3">
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                  This report expires in{" "}
                  <span style={{ font: "var(--text-mono)", color: "var(--fg-2)" }}>30 min</span>
                  {" "}unless confirmed by nearby drivers.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate(returnTo)}
              className="pressable w-full py-4 rounded-lg"
              style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: "var(--c-green)" }}
            >
              {returnTo === "route" ? "Back to navigation" : "Back to map"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
