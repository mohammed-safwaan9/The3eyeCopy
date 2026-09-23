import { useState, useEffect, useRef } from "react";
import { CategoryIcon, CATEGORY_COLORS, CATEGORY_NAMES } from "../components/Icons";
import { IconReport, IconMenu, IconSpeaker, IconVoice, IconRecenter, IconBack, IconCheck, IconClose, IconLocation } from "../components/Icons";
import LeafletMap from "../components/LeafletMap";

interface Props {
  onNavigate: (screen: string) => void;
  destination?: string;
  vehicle?: string;
  vehicleColor?: string;
  voiceBehaviour?: string;
  theme?: string;
  voiceMuted?: boolean;
  onVoiceMutedChange?: (v: boolean) => void;
}

const COLOR_MAP: Record<string, string> = {
  black: "#1A1A1A", white: "#E8EAED", silver: "#8A9BB0", grey: "#5A6570",
  blue: "#2E72F0", red: "#D94040", green: "#19D88A", yellow: "#D4A000",
};

const ALERTS = [
  { type: "traffic",  label: "Traffic check",  dist: "420 m",  conf: 6 },
  { type: "camera",   label: "Speed camera",   dist: "1.2 km", conf: 12 },
  { type: "roadwork", label: "Roadwork",        dist: "4.8 km", conf: 4 },
];

const MANOEUVRES = [
  { dist: "150 m", action: "Turn right",    road: "Golf Course Road", dir: "right", voice: "Turn right in 150 metres onto Golf Course Road." },
  { dist: "400 m", action: "Keep left",     road: "NH-48",            dir: "straight", voice: "Keep left in 400 metres onto NH-48." },
  { dist: "900 m", action: "Take the exit", road: "Sector 56",        dir: "left", voice: "Take the exit in 900 metres toward Sector 56." },
];

const ALERT_VOICES = [
  "Traffic checking reported 420 metres ahead.",
  "Speed camera ahead, 1.2 kilometres.",
  "Roadwork 4.8 kilometres ahead.",
];

const SPEED_LIMIT = 60;

/* Real route polyline coords — Gurugram (simplified) */
const ROUTE_COORDS: [number, number][] = [
  [28.4595, 77.0266], // start (user)
  [28.4610, 77.0285],
  [28.4625, 77.0305],
  [28.4640, 77.0325],
  [28.4655, 77.0345],
  [28.4660, 77.0360],
  [28.4672, 77.0380],
  [28.4685, 77.0395], // destination: Cyber City
];

const DEST_COORDS: [number, number] = [28.4685, 77.0395];

const REPORT_PINS = [
  { id: "r1", lat: 28.4610, lng: 77.0285, type: "traffic",  label: "Traffic check", distance: "420 m" },
  { id: "r2", lat: 28.4625, lng: 77.0305, type: "camera",   label: "Speed camera",  distance: "1.2 km" },
];

function ManoeuvreArrow({ dir }: { dir: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {dir === "right" ? (
        <path d="M5 14 C5 10 9 6 14 6 M14 6 L10 10 M14 6 L10 2"/>
      ) : dir === "left" ? (
        <path d="M15 14 C15 10 11 6 6 6 M6 6 L10 10 M6 6 L10 2"/>
      ) : (
        <>
          <line x1="10" y1="16" x2="10" y2="4"/>
          <polyline points="6 8 10 4 14 8"/>
        </>
      )}
    </svg>
  );
}

/* TTS helper — concise, Waze-like */
function useTTS(behaviour: string) {
  const speak = (text: string) => {
    if (behaviour === "Off") return;
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = behaviour === "Less chatty" ? 1.1 : behaviour === "More detailed" ? 0.95 : 1.0;
    u.volume = 1;
    window.speechSynthesis.speak(u);
  };
  return { speak };
}

export default function RouteScreen({
  onNavigate,
  destination = "Cyber City",
  vehicle = "car",
  vehicleColor = "blue",
  voiceBehaviour = "Normal",
  theme,
  voiceMuted: voiceMutedProp = false,
  onVoiceMutedChange,
}: Props) {
  const [eta, setEta]             = useState(24);
  const [speed, setSpeed]         = useState(52);
  const [manIdx, setManIdx]       = useState(0);
  const [showSheet, setShowSheet] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const voiceMuted = voiceMutedProp;
  const setVoiceMuted = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(voiceMutedProp) : v;
    onVoiceMutedChange?.(next);
  };
  const [liveAlert, setLiveAlert]   = useState<typeof ALERTS[0] | null>(null);
  const [recenterKey, setRecenterKey] = useState(0);
  const [mapPanned, setMapPanned]   = useState(false);
  /* In-navigation report overlay — keeps journey state intact */
  const [showReportOverlay, setShowReportOverlay] = useState(false);
  const [reportStep, setReportStep]  = useState<"pick"|"details"|"evidence"|"submitting"|"done">("pick");
  const [reportType, setReportType]  = useState<string|null>(null);
  const [reportAnswers, setReportAnswers] = useState<Record<string, string>>({});
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const man = MANOEUVRES[manIdx];
  const speedExceeded = speed > SPEED_LIMIT;
  const behaviour = voiceMuted ? "Off" : voiceBehaviour;
  const { speak } = useTTS(behaviour);

  /* Speed simulation */
  useEffect(() => {
    const t = setInterval(() => {
      setEta(e => Math.max(0, e - 1));
      setSpeed(s => Math.max(20, Math.min(90, s + (Math.random() > 0.5 ? 3 : -3))));
    }, 30000);
    return () => clearInterval(t);
  }, []);

  /* Manoeuvre cycling + voice */
  useEffect(() => {
    const t = setInterval(() => {
      setManIdx(i => {
        const next = (i + 1) % MANOEUVRES.length;
        if (behaviour !== "Off") speak(MANOEUVRES[next].voice);
        return next;
      });
    }, 8000);
    return () => clearInterval(t);
  }, [behaviour]);

  /* Speak first manoeuvre on mount */
  useEffect(() => {
    const t = setTimeout(() => {
      if (behaviour !== "Off") speak(man.voice);
    }, 1800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  /* Live alerts cycling — concise voice */
  useEffect(() => {
    let idx = 0;
    const fire = () => {
      if (behaviour === "Off") return;
      const a = ALERTS[idx % ALERTS.length];
      setLiveAlert(a);
      speak(ALERT_VOICES[idx % ALERT_VOICES.length]);
      idx++;
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
      alertTimerRef.current = setTimeout(() => {
        setLiveAlert(null);
      }, 5000);
    };
    const t = setInterval(fire, 22000);
    const first = setTimeout(fire, 5000);
    return () => { clearInterval(t); clearTimeout(first); if (alertTimerRef.current) clearTimeout(alertTimerRef.current); };
  }, [behaviour]);

  const handleRecenter = () => {
    setRecenterKey(k => k + 1);
    setMapPanned(false);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)", position: "relative" }}>

      {/* ── TOP: Manoeuvre banner ── */}
      <div
        className="absolute top-0 left-0 right-0 z-30"
        style={{
          background: "var(--overlay-nav)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          paddingTop: 48,
        }}
      >
        <div className="flex items-center gap-3 px-4 pb-4">
          {/* ☰ menu */}
          <button
            onClick={() => setShowSheet(true)}
            className="pressable flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 38, height: 38, background: "var(--bg-raised)", border: "1px solid var(--border)" }}
          >
            <IconMenu size={16} color="var(--fg-2)"/>
          </button>

          {/* Direction icon */}
          <div
            key={man.dir}
            className="flex items-center justify-center rounded-xl flex-shrink-0 anim-fade"
            style={{ width: 44, height: 44, background: "var(--c-green)" }}
          >
            <ManoeuvreArrow dir={man.dir}/>
          </div>

          {/* Instruction */}
          <div className="flex-1 min-w-0 anim-fade" key={manIdx}>
            <p style={{ font: "700 18px/1.1 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>
              {man.action}
            </p>
            <p style={{ font: "var(--text-label)", color: "var(--fg-2)", marginTop: 2 }}>
              {man.road}
            </p>
          </div>

          {/* Distance */}
          <p style={{ font: "600 22px/1 'JetBrains Mono', monospace", color: "var(--fg)", flexShrink: 0 }}>{man.dist}</p>

          {/* 🔊 voice */}
          <button
            onClick={() => setVoiceMuted(v => !v)}
            className="pressable flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 38, height: 38, background: voiceMuted ? "var(--bg-raised)" : "rgba(25,216,138,0.1)", border: "1px solid var(--border)" }}
          >
            {voiceMuted
              ? <IconVoice size={15} color="var(--fg-3)"/>
              : <IconSpeaker size={15} color="var(--c-green)"/>
            }
          </button>
        </div>
      </div>

      {/* ── MAP ── */}
      <div className="relative flex-1" style={{ minHeight: 0 }}>
        <LeafletMap
          key={recenterKey}
          reports={REPORT_PINS}
          routeCoords={ROUTE_COORDS}
          vehicleColor={vehicleColor}
          vehicle={vehicle}
          showRoute
          center={[28.4595, 77.0266]}
          zoom={15}
          destination={DEST_COORDS}
          destinationLabel={destination}
          theme={theme}
          className="absolute inset-0"
        />

        {/* Padding for top nav bar */}
        <div style={{ paddingTop: 100 }} className="pointer-events-none"/>

        {/* Live alert banner */}
        {liveAlert && (
          <div
            className="absolute left-4 right-4 anim-up"
            style={{ top: 108, zIndex: 20 }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg"
              style={{
                background: "var(--overlay-nav)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: `1px solid ${CATEGORY_COLORS[liveAlert.type]}40`,
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center justify-center rounded flex-shrink-0"
                style={{ width: 32, height: 32, background: `${CATEGORY_COLORS[liveAlert.type]}14` }}>
                <CategoryIcon type={liveAlert.type} size={14} color={CATEGORY_COLORS[liveAlert.type]}/>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{liveAlert.label}</p>
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{liveAlert.conf} confirmations · {liveAlert.dist}</p>
              </div>
              <span style={{ font: "600 13px/1 'JetBrains Mono', monospace", color: CATEGORY_COLORS[liveAlert.type] }}>
                {liveAlert.dist}
              </span>
            </div>
          </div>
        )}

        {/* Speed + limit — bottom-left */}
        <div className="absolute" style={{
          bottom: 14, left: 14, zIndex: 20,
          background: "var(--overlay-nav)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "var(--r-sm)",
          padding: "7px 11px",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <div className="flex items-baseline gap-1">
            <span style={{
              font: "600 22px/1 'JetBrains Mono', monospace",
              color: speedExceeded ? "var(--c-red)" : "var(--fg)",
              transition: "color 0.3s",
            }}>{Math.round(speed)}</span>
            <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>km/h</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <div style={{
              width: 16, height: 16, borderRadius: 8,
              border: "1.5px solid var(--fg-3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ font: "600 8px/1 'Inter', sans-serif", color: "var(--fg-3)" }}>{SPEED_LIMIT}</span>
            </div>
            <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", fontSize: 10 }}>limit</span>
          </div>
        </div>

        {/* Route status — bottom-right-ish */}
        <div className="absolute" style={{
          bottom: 14, right: 58, zIndex: 20,
          background: "var(--overlay-nav)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "var(--r-sm)",
          padding: "7px 11px",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}>
          <p style={{ font: "500 12px/1 'Inter', sans-serif", color: "var(--c-green)" }}>Mostly clear</p>
          <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 1 }}>2 alerts ahead</p>
        </div>

        {/* Report FAB */}
        <button
          onClick={() => { setReportStep("pick"); setReportType(null); setShowReportOverlay(true); }}
          className="pressable absolute flex items-center justify-center rounded-full"
          style={{ bottom: 14, right: 14, zIndex: 20, width: 38, height: 38, background: "var(--bg-surface)", border: "1px solid var(--border-2)", boxShadow: "var(--shadow-sm)" }}
        >
          <IconReport size={16} color="var(--fg-2)"/>
        </button>

        {/* Re-center + Compass stack — right */}
        <div className="absolute flex flex-col gap-2" style={{ bottom: 64, right: 14, zIndex: 20 }}>
          <button
            onClick={handleRecenter}
            className="pressable flex items-center justify-center rounded-lg"
            style={{
              width: 34, height: 34,
              background: "var(--overlay-nav)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: mapPanned ? "1px solid var(--c-green)" : "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <IconRecenter size={14} color={mapPanned ? "var(--c-green)" : "var(--fg-2)"}/>
          </button>
          <div className="flex items-center justify-center rounded-lg"
            style={{ width: 34, height: 34, background: "var(--overlay-nav)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="var(--border-2)" strokeWidth="1"/>
              <path d="M10 3 L11.2 9 L10 8 L8.8 9 Z" fill="var(--c-red)"/>
              <path d="M10 17 L11.2 11 L10 12 L8.8 11 Z" fill="var(--fg-3)"/>
              <circle cx="10" cy="10" r="1.5" fill="var(--fg-2)"/>
              <text x="10" y="2" textAnchor="middle" fontSize="3.5" fill="var(--fg-3)" fontFamily="'Inter', sans-serif" fontWeight="600">N</text>
            </svg>
          </div>
        </div>
      </div>

      {/* ── DRIVING BAR ── */}
      <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center px-4 py-3.5 gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span style={{ font: "700 34px/1 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.03em" }}>
                {eta}
              </span>
              <span style={{ font: "var(--text-body)", color: "var(--fg-2)" }}>min</span>
              <span style={{ font: "var(--text-mono)", color: "var(--fg-3)", fontSize: 13 }}>·</span>
              <span style={{ font: "600 15px/1 'JetBrains Mono', monospace", color: "var(--fg-2)" }}>14.2 km</span>
            </div>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 2 }}>
              {destination}
            </p>
          </div>

          {/* ••• route menu */}
          <button
            onClick={() => setShowSheet(true)}
            className="pressable flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 44, height: 44, background: "var(--bg-raised)", border: "1px solid var(--border-2)" }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="var(--fg-2)" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 6h12M4 10h8M4 14h5"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── ROUTE OPTIONS SHEET ── */}
      {showSheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end"
          style={{ background: "rgba(0,0,0,0.48)" }}
          onClick={() => setShowSheet(false)}>
          <div className="anim-up"
            style={{ background: "var(--bg-surface)", borderRadius: "var(--r-lg) var(--r-lg) 0 0", overflow: "hidden" }}
            onClick={e => e.stopPropagation()}>

            <div className="flex justify-center pt-3 pb-1">
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border-2)" }}/>
            </div>

            <p className="px-5 pt-1 pb-3" style={{ font: "600 15px/1 'Inter', sans-serif", color: "var(--fg)" }}>
              Route options
            </p>

            <div style={{ borderTop: "1px solid var(--border)" }}>
              {/* Alerts */}
              <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <p style={{ font: "10px/1 'Inter', sans-serif", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                  {ALERTS.length} alerts on route
                </p>
                {ALERTS.map((a, i) => {
                  const c = CATEGORY_COLORS[a.type];
                  return (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <div className="flex items-center justify-center rounded flex-shrink-0"
                        style={{ width: 28, height: 28, background: `${c}12` }}>
                        <CategoryIcon type={a.type} size={12} color={c}/>
                      </div>
                      <p style={{ font: "var(--text-label)", color: "var(--fg)", flex: 1 }}>{a.label}</p>
                      <span style={{ font: "500 12px/1 'JetBrains Mono', monospace", color: c }}>{a.dist}</span>
                    </div>
                  );
                })}
              </div>

              {/* Report */}
              <button
                onClick={() => { setShowSheet(false); setReportStep("pick"); setReportType(null); setShowReportOverlay(true); }}
                className="pressable w-full flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-center rounded flex-shrink-0"
                  style={{ width: 32, height: 32, background: "var(--c-green)10" }}>
                  <IconReport size={14} color="var(--c-green)"/>
                </div>
                <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>Report something</span>
              </button>

              {/* Voice & audio */}
              <button
                onClick={() => { setShowSheet(false); onNavigate("settings"); }}
                className="pressable w-full flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-center rounded flex-shrink-0"
                  style={{ width: 32, height: 32, background: "var(--bg-subtle)" }}>
                  <IconSpeaker size={14} color="var(--fg-2)"/>
                </div>
                <div className="flex-1 text-left">
                  <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>Voice & audio</span>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 1 }}>{behaviour}</p>
                </div>
              </button>

              {/* End journey */}
              <button
                onClick={() => { setShowSheet(false); setShowExitConfirm(true); }}
                className="pressable w-full flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 32, height: 32, background: "var(--c-red)10", border: "1.5px solid var(--c-red)25" }}>
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--c-red)" strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="10" cy="10" r="8"/>
                    <line x1="7" y1="7" x2="13" y2="13"/>
                    <line x1="13" y1="7" x2="7" y2="13"/>
                  </svg>
                </div>
                <span style={{ font: "var(--text-body)", color: "var(--c-red)" }}>End journey</span>
              </button>

              <button onClick={() => setShowSheet(false)} className="pressable w-full py-4"
                style={{ font: "var(--text-label)", color: "var(--fg-3)" }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXIT CONFIRMATION ── */}
      {/* ── IN-NAVIGATION REPORT OVERLAY — journey state preserved ── */}
      {showReportOverlay && (
        <NavReportOverlay
          onClose={() => { setShowReportOverlay(false); setReportStep("pick"); setReportType(null); setReportAnswers({}); }}
          step={reportStep}
          setStep={setReportStep}
          reportType={reportType}
          setReportType={setReportType}
          answers={reportAnswers}
          setAnswers={setReportAnswers}
        />
      )}

      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full anim-up" style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--r-lg) var(--r-lg) 0 0",
            padding: "20px 20px 36px",
          }}>
            <p style={{ font: "600 17px/1.3 'Inter', sans-serif", color: "var(--fg)", marginBottom: 6 }}>
              End this journey?
            </p>
            <p style={{ font: "var(--text-body)", color: "var(--fg-2)", marginBottom: 20 }}>
              You have {eta} min remaining to {destination}, Gurugram.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="pressable w-full py-4 rounded-xl"
                style={{ font: "600 15px/1 'Inter', sans-serif", color: "var(--fg)", background: "var(--bg-raised)" }}
              >
                Keep driving
              </button>
              <button
                onClick={() => { setShowExitConfirm(false); onNavigate("journey_complete"); }}
                className="pressable w-full py-4 rounded-xl flex items-center justify-center gap-2"
                style={{ font: "600 15px/1 'Inter', sans-serif", color: "var(--c-red)", background: "var(--c-red)10", border: "1px solid var(--c-red)22" }}
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--c-red)" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="10" cy="10" r="8"/>
                  <line x1="7" y1="7" x2="13" y2="13"/>
                  <line x1="13" y1="7" x2="7" y2="13"/>
                </svg>
                End journey
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Category-specific detail questions ── */
const NAV_REPORT_DETAILS: Record<string, { label: string; options: string[] }[]> = {
  traffic:    [{ label: "Enforcement?", options: ["Police visible", "No enforcement", "Unsure"] }],
  camera:     [{ label: "Camera type", options: ["Fixed", "Mobile van", "Average speed"] }],
  accident:   [{ label: "Severity", options: ["Minor", "Major — lanes blocked", "Road blocked"] }],
  hazard:     [{ label: "Hazard type", options: ["Debris", "Pothole", "Animal", "Other"] }],
  roadwork:   [{ label: "Impact", options: ["Lane closure", "Partial", "Full closure"] }],
  flood:      [{ label: "Depth", options: ["Passable", "Deep", "Dangerous"] }],
  closure:    [{ label: "Direction", options: ["Both ways", "One way only"] }],
  congestion: [{ label: "Severity", options: ["Slow", "Very slow", "Standstill"] }],
};

type NavReportStep = "pick" | "details" | "evidence" | "submitting" | "done";

function NavReportOverlay({
  onClose,
  step, setStep,
  reportType, setReportType,
  answers, setAnswers,
}: {
  onClose: () => void;
  step: NavReportStep; setStep: (s: NavReportStep) => void;
  reportType: string | null; setReportType: (t: string | null) => void;
  answers: Record<string, string>; setAnswers: (a: Record<string, string>) => void;
}) {
  const color = reportType ? CATEGORY_COLORS[reportType] : "var(--c-green)";
  const typeName = reportType ? CATEGORY_NAMES[reportType] : "";
  const questions = reportType ? (NAV_REPORT_DETAILS[reportType] ?? []) : [];

  const goBack = () => {
    if (step === "pick") { onClose(); return; }
    if (step === "details") { setStep("pick"); return; }
    if (step === "evidence") { setStep("details"); return; }
    onClose();
  };

  const submitReport = () => {
    setStep("submitting");
    setTimeout(() => setStep("done"), 1400);
  };

  const TITLES: Record<NavReportStep, string> = {
    pick: "What are you seeing?",
    details: typeName ? `${typeName} details` : "Details",
    evidence: "Photo evidence",
    submitting: "Submitting…",
    done: "Report submitted",
  };

  const progressWidth = step === "details" ? "40%" : step === "evidence" ? "75%" : step === "done" ? "100%" : "0%";

  return (
    <div className="absolute inset-0 z-50 flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3.5"
        style={{ borderBottom: "1px solid var(--border)" }}>
        <button
          onClick={goBack}
          className="pressable w-9 h-9 flex items-center justify-center rounded"
          style={{ background: "var(--bg-subtle)" }}>
          <IconBack size={16} color="var(--fg-2)"/>
        </button>
        <span style={{ font: "var(--text-heading)", color: "var(--fg)" }}>
          {TITLES[step]}
        </span>
        <div style={{ width: 36 }}/>
      </div>

      {/* Progress bar */}
      {step !== "pick" && step !== "submitting" && (
        <div style={{ height: 2, background: "var(--border)" }}>
          <div style={{ height: "100%", width: progressWidth, background: color, transition: "width 0.3s ease" }}/>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scroll">

        {step === "pick" && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <IconLocation size={14} color="var(--c-green)"/>
              <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1 }}>Current location · GPS accurate</span>
              <span style={{ font: "var(--text-mono)", color: "var(--fg-3)", fontSize: 11 }}>±8 m</span>
            </div>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Quick report
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {(["traffic","camera","accident","hazard","roadwork","flood","closure","congestion"] as const).map(cat => {
                const c = CATEGORY_COLORS[cat];
                return (
                  <button key={cat}
                    onClick={() => { setReportType(cat); setAnswers({}); setStep("details"); }}
                    className="pressable flex flex-col items-center gap-2 py-3.5 rounded-lg"
                    style={{ background: "var(--bg-surface)" }}>
                    <CategoryIcon type={cat} size={20} color={c}/>
                    <span style={{ font: "500 9.5px/1.3 'Inter', sans-serif", color: "var(--fg-2)", textAlign: "center" }}>
                      {CATEGORY_NAMES[cat]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === "details" && reportType && (
          <div className="p-4 flex flex-col gap-5 anim-up">
            {/* Category chip */}
            <div className="flex items-center gap-3 pb-3" style={{ borderBottom: `2px solid ${color}22` }}>
              <div className="flex items-center justify-center rounded flex-shrink-0"
                style={{ width: 36, height: 36, background: `${color}14` }}>
                <CategoryIcon type={reportType} size={18} color={color}/>
              </div>
              <p style={{ font: "var(--text-title)", color: "var(--fg)" }}>{typeName}</p>
            </div>

            {questions.map((q, qi) => (
              <div key={qi}>
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
                  {q.label}
                </p>
                <div className="flex flex-col gap-2">
                  {q.options.map(opt => {
                    const sel = answers[q.label] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswers({ ...answers, [q.label]: opt })}
                        className="pressable flex items-center gap-3 px-4 py-3 rounded-lg"
                        style={{
                          background: sel ? `${color}10` : "var(--bg-surface)",
                          border: `1px solid ${sel ? color : "var(--border)"}`,
                        }}
                      >
                        <div className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ width: 17, height: 17, border: `1.5px solid ${sel ? color : "var(--border-2)"}`, background: sel ? color : "transparent" }}>
                          {sel && <IconCheck size={9} color="white"/>}
                        </div>
                        <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              onClick={() => setStep("evidence")}
              className="pressable w-full py-4 rounded-lg"
              style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: color }}
            >
              Next →
            </button>
          </div>
        )}

        {step === "evidence" && (
          <div className="p-4 flex flex-col gap-4 anim-up">
            <div className="rounded-lg px-4 py-3 flex items-start gap-3"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="var(--c-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 1, flexShrink: 0 }}>
                <circle cx="10" cy="10" r="8"/>
                <line x1="10" y1="6" x2="10" y2="10"/>
                <circle cx="10" cy="14" r="0.5" fill="var(--c-green)"/>
              </svg>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", lineHeight: 1.6 }}>
                Photo evidence is <span style={{ color: "var(--fg-2)" }}>private</span> — never publicly shown. Used only to verify this report.
              </p>
            </div>

            <div
              className="flex flex-col items-center justify-center gap-4 py-12 rounded-lg"
              style={{ background: "var(--bg-subtle)", border: "1.5px dashed var(--border-2)" }}
            >
              <div className="flex items-center justify-center rounded-lg"
                style={{ width: 48, height: 48, background: "var(--bg-surface)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p style={{ font: "var(--text-heading)", color: "var(--fg)" }}>Tap to take a photo</p>
            </div>

            <div className="flex gap-3">
              <button onClick={submitReport} className="pressable flex-1 py-3.5 rounded-lg"
                style={{ font: "var(--text-heading)", color: "var(--fg-2)", background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                Skip photo
              </button>
              <button onClick={submitReport} className="pressable flex-1 py-3.5 rounded-lg"
                style={{ font: "var(--text-heading)", color: "white", background: color }}>
                Add photo
              </button>
            </div>
          </div>
        )}

        {step === "submitting" && (
          <div className="flex flex-col items-center justify-center py-20 gap-5">
            <div className="anim-spin"
              style={{ width: 36, height: 36, borderRadius: 18, border: `3px solid ${color}30`, borderTopColor: color }}/>
            <p style={{ font: "var(--text-body)", color: "var(--fg-2)" }}>Submitting…</p>
          </div>
        )}

        {step === "done" && reportType && (
          <div className="flex flex-col items-center px-6 py-14 gap-7 anim-pop">
            <div className="flex items-center justify-center rounded-lg"
              style={{ width: 64, height: 64, background: "var(--c-green)12" }}>
              <IconCheck size={28} color="var(--c-green)"/>
            </div>
            <div className="text-center">
              <h2 style={{ font: "700 20px/1.2 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>
                Report submitted
              </h2>
              <p style={{ font: "var(--text-body)", color: "var(--fg-2)", marginTop: 6 }}>
                {CATEGORY_NAMES[reportType]} reported ahead.
              </p>
            </div>

            <div className="w-full rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--border)" }}>
                {[
                  { label: "Drivers nearby", value: "142" },
                  { label: "Confidence", value: "High" },
                  { label: "Trust points", value: "+5" },
                ].map((s, i) => (
                  <div key={i} className="text-center py-3.5"
                    style={{ borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                    <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>{s.value}</p>
                    <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3">
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                  Expires in <span style={{ font: "var(--text-mono)", color: "var(--fg-2)" }}>30 min</span> unless confirmed.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="pressable w-full py-4 rounded-lg"
              style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: "var(--c-green)" }}
            >
              Back to navigation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
