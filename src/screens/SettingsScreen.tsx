import { useState } from "react";
import { CategoryIcon, CATEGORY_NAMES } from "../components/Icons";
import { IconBack, IconVoice, IconBell } from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
  theme: string;
  onThemeChange: (t: string) => void;
  alertDistance: number;
  onAlertDistanceChange: (d: number) => void;
  activeCategories: string[];
  onCategoryChange: (cats: string[]) => void;
  vehicle?: string;
  onVehicleChange?: (v: string) => void;
  voiceBehaviour?: string;
  onVoiceBehaviourChange?: (b: string) => void;
}

const THEMES = [
  { id: "signal",   label: "Signal",        sub: "Light" },
  { id: "night",    label: "Night Drive",   sub: "Dark" },
  { id: "midnight", label: "Midnight Blue", sub: "Dark blue" },
  { id: "contrast", label: "High Contrast", sub: "Accessibility" },
];

const ALERT_CATS = ["traffic","camera","accident","hazard","roadwork","flood","closure"];

const VOICE_BEHAVIOURS = ["Normal","Less chatty","More detailed","Alerts only","Off"] as const;
type VoiceBehaviour = typeof VOICE_BEHAVIOURS[number];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी · Hindi" },
  { code: "kn", label: "ಕನ್ನಡ · Kannada" },
  { code: "ta", label: "தமிழ் · Tamil" },
  { code: "te", label: "తెలుగు · Telugu" },
  { code: "ml", label: "മലയാളം · Malayalam" },
  { code: "mr", label: "मराठी · Marathi" },
  { code: "bn", label: "বাংলা · Bengali" },
];

const DRIVE_MODES = ["City","Highway","Mixed"] as const;
type DriveMode = typeof DRIVE_MODES[number];

const VEHICLES = [
  { id: "car",        label: "Car",         Icon: () => <VehicleSvg type="car"/> },
  { id: "suv",        label: "SUV",         Icon: () => <VehicleSvg type="suv"/> },
  { id: "motorcycle", label: "Motorcycle",  Icon: () => <VehicleSvg type="moto"/> },
  { id: "scooter",    label: "Scooter",     Icon: () => <VehicleSvg type="scooter"/> },
];

const MAP_LAYERS = [
  { id: "traffic",      label: "Live traffic" },
  { id: "alerts",       label: "Alert markers" },
  { id: "construction", label: "Construction" },
  { id: "hazards",      label: "Road hazards" },
];

function formatDistance(m: number): string {
  if (m >= 1000) return `${m / 1000} km`;
  return `${m} m`;
}

export default function SettingsScreen({
  onNavigate, theme, onThemeChange,
  alertDistance, onAlertDistanceChange,
  activeCategories, onCategoryChange,
  vehicle: vehicleProp = "car", onVehicleChange,
  voiceBehaviour: voiceBehaviourProp = "Normal", onVoiceBehaviourChange,
}: Props) {
  /* Alert settings */
  const [voiceAlerts, setVoiceAlerts]     = useState(true);
  const [visualAlerts, setVisualAlerts]   = useState(true);
  const [haptic, setHaptic]               = useState(true);
  const [routeOnly, setRouteOnly]         = useState(false);

  /* Driving settings */
  const [driveMode, setDriveMode]         = useState<DriveMode>("Mixed");
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [vehicle, setVehicleLocal]         = useState(vehicleProp);
  const setVehicle = (v: string) => { setVehicleLocal(v); onVehicleChange?.(v); };

  /* Voice settings */
  const [voiceBehaviour, setVoiceBehaviourLocal] = useState<VoiceBehaviour>(voiceBehaviourProp as VoiceBehaviour);
  const setVoiceBehaviour = (b: VoiceBehaviour) => { setVoiceBehaviourLocal(b); onVoiceBehaviourChange?.(b); };
  const [language, setLanguage]             = useState("en");
  const [voiceExpanded, setVoiceExpanded]   = useState(false);
  const [langExpanded, setLangExpanded]     = useState(false);
  const [voiceVol, setVoiceVol]             = useState(80);

  /* Map layers */
  const [activeLayers, setActiveLayers]   = useState(["traffic","alerts"]);

  const toggleCategory = (cat: string) => {
    onCategoryChange(
      activeCategories.includes(cat)
        ? activeCategories.filter(c => c !== cat)
        : [...activeCategories, cat]
    );
  };

  const toggleLayer = (id: string) => {
    setActiveLayers(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Header */}
      <div
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(135deg, #0878FF0A 0%, transparent 60%)",
        }}/>
        <div className="flex items-center gap-4 px-4 pt-14 pb-4" style={{ position: "relative" }}>
          <button
            onClick={() => onNavigate("profile")}
            className="pressable w-9 h-9 flex items-center justify-center rounded"
            style={{ background: "var(--bg-subtle)" }}
          >
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <h1 style={{ font: "700 18px/1.3 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scroll pb-12">

        {/* ── ALERTS ── */}
        <SectionHead>Alerts</SectionHead>

        <SubSection label="Categories">
          {ALERT_CATS.map((cat, i) => {
            const on = activeCategories.includes(cat);
            return (
              <ToggleRow
                key={cat}
                icon={<CategoryIcon type={cat} size={15} color={on ? CATEGORY_COLOR_MAP[cat] : "var(--fg-3)"}/>}
                label={CATEGORY_NAMES[cat] || cat}
                on={on}
                onToggle={() => toggleCategory(cat)}
                last={i === ALERT_CATS.length - 1}
              />
            );
          })}
        </SubSection>

        <SubSection label="Alert distance">
          <div className="px-5 py-4">
            <div className="flex justify-between items-center mb-4">
              <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>Warn me</span>
              <span style={{ font: "var(--text-mono)", color: "var(--c-green)" }}>
                {formatDistance(alertDistance)} ahead
              </span>
            </div>
            <input
              type="range" min={100} max={2000} step={100}
              value={alertDistance}
              onChange={e => onAlertDistanceChange(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--c-green)" }}
            />
            <div className="flex justify-between mt-2">
              <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>100 m</span>
              <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>2 km</span>
            </div>
          </div>
        </SubSection>

        <SubSection label="Notifications">
          <ToggleRow icon={<IconVoice size={15} color="var(--fg-3)"/>}     label="Voice alerts"    on={voiceAlerts}  onToggle={() => setVoiceAlerts(v => !v)}/>
          <ToggleRow icon={<IconBell size={15} color="var(--fg-3)"/>}      label="Visual alerts"   on={visualAlerts} onToggle={() => setVisualAlerts(v => !v)}/>
          <ToggleRow icon={<HapticIcon/>}                                   label="Haptic feedback" on={haptic}       onToggle={() => setHaptic(v => !v)}/>
          <ToggleRow icon={<RouteOnlyIcon/>} label="Route mode only"
            sub={routeOnly ? "Alerts during navigation only" : "Always active"}
            on={routeOnly} onToggle={() => setRouteOnly(v => !v)} last/>
        </SubSection>

        {/* ── DRIVING ── */}
        <SectionHead>Driving</SectionHead>

        <SubSection label="Drive mode">
          <div className="flex gap-1.5 p-3">
            {DRIVE_MODES.map(m => (
              <button key={m} onClick={() => setDriveMode(m)}
                className="pressable flex-1 py-3 rounded-lg"
                style={{
                  font: "var(--text-label)",
                  background: driveMode === m ? "var(--c-green)" : "var(--bg-subtle)",
                  color: driveMode === m ? "white" : "var(--fg-2)",
                  transition: "background 0.18s ease, color 0.18s ease",
                }}>
                {m}
              </button>
            ))}
          </div>
        </SubSection>

        <SubSection label="Route preferences">
          <ToggleRow label="Avoid highways" on={avoidHighways} onToggle={() => setAvoidHighways(v => !v)} last/>
        </SubSection>

        <SubSection label="Vehicle">
          <div className="grid grid-cols-4 gap-0">
            {VEHICLES.map((v, i) => {
              const sel = vehicle === v.id;
              return (
                <button key={v.id} onClick={() => setVehicle(v.id)}
                  className="pressable flex flex-col items-center gap-2 py-4"
                  style={{
                    borderRight: i < VEHICLES.length - 1 ? "1px solid var(--border)" : "none",
                    background: sel ? "var(--c-green)0A" : "transparent",
                  }}>
                  <div style={{ color: sel ? "var(--c-green)" : "var(--fg-3)" }}>
                    <v.Icon/>
                  </div>
                  <span style={{ font: "var(--text-caption)", color: sel ? "var(--c-green)" : "var(--fg-3)" }}>
                    {v.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SubSection>

        {/* ── MAP ── */}
        <SectionHead>Map</SectionHead>

        <SubSection label="Theme">
          <div className="grid grid-cols-2 gap-1 p-3">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => onThemeChange(t.id)}
                className="pressable flex items-center gap-3 px-3 py-3 rounded-lg"
                style={{
                  background: theme === t.id ? "var(--c-green)12" : "var(--bg-subtle)",
                  border: `1px solid ${theme === t.id ? "var(--c-green)" : "var(--border)"}`,
                }}>
                <ThemeSwatch id={t.id}/>
                <div className="text-left">
                  <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{t.label}</p>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{t.sub}</p>
                </div>
                {theme === t.id && (
                  <svg className="ml-auto" width="13" height="13" viewBox="0 0 20 20" fill="none"
                    stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3.5 10.5 8 15 16.5 6"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </SubSection>

        <SubSection label="Map layers">
          {MAP_LAYERS.map((l, i) => {
            const on = activeLayers.includes(l.id);
            return (
              <ToggleRow key={l.id} label={l.label}
                on={on} onToggle={() => toggleLayer(l.id)}
                last={i === MAP_LAYERS.length - 1}/>
            );
          })}
        </SubSection>

        {/* ── VOICE ── */}
        <SectionHead>Voice</SectionHead>

        <SubSection label="Voice behaviour">
          <div className="px-3 py-2 flex flex-col gap-1">
            {VOICE_BEHAVIOURS.map(b => (
              <button key={b} onClick={() => setVoiceBehaviour(b)}
                className="pressable flex items-center gap-3 px-3 py-3 rounded-lg"
                style={{
                  background: voiceBehaviour === b ? "var(--c-green)10" : "transparent",
                  border: `1px solid ${voiceBehaviour === b ? "var(--c-green)" : "transparent"}`,
                }}>
                <div className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 18, height: 18,
                    border: `1.5px solid ${voiceBehaviour === b ? "var(--c-green)" : "var(--border-2)"}`,
                    background: voiceBehaviour === b ? "var(--c-green)" : "transparent" }}>
                  {voiceBehaviour === b && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <circle cx="5" cy="5" r="3"/>
                    </svg>
                  )}
                </div>
                <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{b}</span>
              </button>
            ))}
          </div>
        </SubSection>

        <SubSection label="Language">
          {/* Collapsed preview */}
          <button
            onClick={() => setLangExpanded(v => !v)}
            className="pressable w-full flex items-center px-5 py-3.5"
            style={{ borderBottom: langExpanded ? "1px solid var(--border)" : "none" }}
          >
            <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1, textAlign: "left" }}>
              {LANGUAGES.find(l => l.code === language)?.label ?? "English"}
            </span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
              stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: langExpanded ? "rotate(90deg)" : "none", transition: "transform 0.18s ease" }}>
              <polyline points="7 5 13 10 7 15"/>
            </svg>
          </button>
          {langExpanded && LANGUAGES.map((l, i) => {
            const sel = language === l.code;
            return (
              <button key={l.code} onClick={() => setLanguage(l.code)}
                className="pressable w-full flex items-center gap-3 px-5 py-3.5"
                style={{ borderBottom: i < LANGUAGES.length - 1 ? "1px solid var(--border)" : "none" }}>
                <span style={{ font: "var(--text-body)", color: sel ? "var(--c-green)" : "var(--fg)", flex: 1, textAlign: "left" }}>
                  {l.label}
                </span>
                {sel && (
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
                    stroke="var(--c-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3.5 10.5 8 15 16.5 6"/>
                  </svg>
                )}
              </button>
            );
          })}
        </SubSection>

        <SubSection label="Voice volume">
          <div className="px-5 py-4">
            <div className="flex justify-between items-center mb-4">
              <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>Volume</span>
              <span style={{ font: "var(--text-mono)", color: "var(--c-green)" }}>{voiceVol}%</span>
            </div>
            <input type="range" min={0} max={100} step={5}
              value={voiceVol}
              onChange={e => setVoiceVol(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--c-green)" }}
            />
            <div className="flex justify-between mt-2">
              <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>Off</span>
              <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>Max</span>
            </div>
          </div>
        </SubSection>

        {/* ── PRIVACY & SECURITY ── */}
        <SectionHead>Privacy & Security</SectionHead>

        <SubSection>
          <LinkRow label="Data sharing"      sub="Minimal"/>
          <LinkRow label="Location history"  sub="Off"/>
          <LinkRow label="Anonymous mode"    sub="Off"/>
          <LinkRow label="Delete account"    danger last/>
        </SubSection>

        {/* ── ACCOUNT ── */}
        <SectionHead>Account</SectionHead>

        <SubSection>
          <LinkRow label="Account details"   sub="arjun@email.com"/>
          <LinkRow label="Subscription"      sub="Free" onClick={() => onNavigate("premium")}/>
          <LinkRow label="Log out"           danger last/>
        </SubSection>

        {/* ── ABOUT ── */}
        <SectionHead>About</SectionHead>

        <SubSection>
          <LinkRow label="Help & support"/>
          <LinkRow label="Terms of service"/>
          <LinkRow label="Privacy policy"/>
          <LinkRow label="About The3eye" sub="v2.4.1" last/>
        </SubSection>

      </div>
    </div>
  );
}

/* ── Sub-components ── */

const CATEGORY_COLOR_MAP: Record<string,string> = {
  traffic: "var(--c-red)", camera: "var(--c-blue)", accident: "var(--c-purple)",
  hazard: "var(--c-amber)", roadwork: "var(--c-yellow)", flood: "var(--c-cyan)",
  closure: "var(--c-dark)", congestion: "var(--c-amber)",
};

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-5 pt-6 pb-2"
      style={{ font: "600 11px/1 'Inter', sans-serif", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
      {children}
    </p>
  );
}

function SubSection({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-1">
      {label && (
        <p className="px-5 pt-2 pb-1.5"
          style={{ font: "var(--text-caption)", color: "var(--fg-3)", letterSpacing: "0.04em" }}>
          {label}
        </p>
      )}
      <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {children}
      </div>
    </div>
  );
}

function ToggleRow({ icon, label, sub, on, onToggle, last }: {
  icon?: React.ReactNode; label: string; sub?: string;
  on: boolean; onToggle: () => void; last?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className="pressable w-full flex items-center gap-3 px-5 py-3.5"
      style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <div className="flex-1 text-left">
        <p style={{ font: "var(--text-body)", color: "var(--fg)" }}>{label}</p>
        {sub && <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 1 }}>{sub}</p>}
      </div>
      <div className="toggle" style={{ background: on ? "var(--c-green)" : "var(--bg-subtle)" }}>
        <span className="toggle-knob" style={{ left: on ? 20 : 3 }}/>
      </div>
    </button>
  );
}

function LinkRow({ label, sub, danger, onClick, last }: {
  label: string; sub?: string; danger?: boolean; onClick?: () => void; last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="pressable w-full flex items-center px-5 py-3.5"
      style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}
    >
      <span style={{ font: "var(--text-body)", color: danger ? "var(--c-red)" : "var(--fg)", flex: 1, textAlign: "left" }}>
        {label}
      </span>
      {sub && <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginRight: danger ? 0 : 6 }}>{sub}</span>}
      {!danger && (
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"
          stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 5 13 10 7 15"/>
        </svg>
      )}
    </button>
  );
}

function ThemeSwatch({ id }: { id: string }) {
  const bg = id === "signal" ? "#F4F5F7" : id === "midnight" ? "#070C18" : id === "contrast" ? "#000000" : "#111418";
  const accent = id === "contrast" ? "#00E87A" : "#19B87A";
  return (
    <div style={{ width: 22, height: 22, borderRadius: 5, background: bg, border: "1px solid var(--border-2)", position: "relative", flexShrink: 0 }}>
      <div style={{ position: "absolute", bottom: 2, right: 2, width: 6, height: 6, borderRadius: 3, background: accent }}/>
    </div>
  );
}

/* Inline micro-icons */
function HapticIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round">
      <rect x="6" y="2" width="8" height="14" rx="2"/><line x1="10" y1="18" x2="10" y2="19"/>
    </svg>
  );
}
function RouteOnlyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14M3 10h10M3 15h6"/>
    </svg>
  );
}

function VehicleSvg({ type }: { type: string }) {
  if (type === "moto") return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="15" r="4"/><circle cx="23" cy="15" r="4"/>
      <path d="M5 15 L8 8 L16 8 L19 11 L23 11"/>
      <path d="M16 8 L18 5 L22 5"/>
    </svg>
  );
  if (type === "scooter") return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="15" r="4"/><circle cx="22" cy="15" r="4"/>
      <path d="M6 15 L9 9 L15 9 C15 9 17 7 20 8 L22 11"/>
      <path d="M15 9 L14 5 L19 5"/>
    </svg>
  );
  if (type === "suv") return (
    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="28" height="8" rx="2"/>
      <path d="M4 8 L6 3 L26 3 L28 8"/>
      <circle cx="7" cy="17" r="2.5"/><circle cx="25" cy="17" r="2.5"/>
      <rect x="8" y="4" width="5" height="4" rx="1"/><rect x="15" y="4" width="9" height="4" rx="1"/>
    </svg>
  );
  /* car (default) */
  return (
    <svg width="30" height="18" viewBox="0 0 30 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10 L8 5 L22 5 L25 10 L25 14 L5 14 Z"/>
      <circle cx="8.5" cy="14.5" r="2.5"/><circle cx="21.5" cy="14.5" r="2.5"/>
      <rect x="9" y="5.5" width="4" height="3.5" rx="1"/><rect x="15" y="5.5" width="6" height="3.5" rx="1"/>
    </svg>
  );
}
