import { useState, useRef, useEffect } from "react";
import {
  IconSearch, IconBack, IconLocation, IconClose,
  IconMicrophone,
  IconFuel, IconFood, IconParking, IconGroceries, IconCoffee,
  IconShopping, IconPharmacy, IconEVCharge, IconHospital, IconHotel, IconPark, IconCrisis,
} from "../components/Icons";

const DEST_CATEGORIES = [
  { icon: IconFuel,     label: "Fuel",      color: "var(--c-amber)" },
  { icon: IconFood,     label: "Food",      color: "var(--c-red)" },
  { icon: IconParking,  label: "Parking",   color: "var(--c-blue)" },
  { icon: IconGroceries,label: "Groceries", color: "var(--c-green)" },
  { icon: IconCoffee,   label: "Coffee",    color: "#A0694A" },
  { icon: IconShopping, label: "Shopping",  color: "var(--c-purple)" },
  { icon: IconPharmacy, label: "Pharmacy",  color: "var(--c-green)" },
  { icon: IconEVCharge, label: "EV Charge", color: "#00C9E8" },
  { icon: IconHospital, label: "Hospital",  color: "var(--c-red)" },
  { icon: IconHotel,    label: "Hotel",     color: "var(--c-amber)" },
  { icon: IconPark,     label: "Park",      color: "var(--c-green)" },
  { icon: IconCrisis,   label: "Crisis",    color: "var(--c-red)" },
];

interface Props {
  onNavigate: (screen: string) => void;
  onSelectDestination?: (destination: string) => void;
}

const SAVED = [
  { label: "Home",      sub: "DLF Phase 3", color: "var(--c-green)" },
  { label: "Work",      sub: "Cyber City",  color: "var(--c-blue)" },
  { label: "Gym",       sub: "Sector 43",   color: "var(--c-purple)" },
];

const RECENT = [
  { label: "Cyber City, Gurugram",    sub: "Business district" },
  { label: "Medanta Hospital",        sub: "Sector 38, Gurugram" },
  { label: "Ambience Mall",           sub: "NH-48, Gurugram" },
  { label: "IGI Airport, New Delhi",  sub: "28.3 km away" },
];

const RESULTS = [
  { label: "Cyber Hub",              sub: "Gurugram · 3.2 km", eta: "12 min" },
  { label: "Cybercity Rapid Metro",  sub: "Gurugram · 3.5 km", eta: "14 min" },
  { label: "Cyber Park, Manesar",    sub: "12 km away",         eta: "28 min" },
];

type ListenState = "idle" | "listening" | "error";

export default function SearchScreen({ onNavigate, onSelectDestination }: Props) {
  const goToRoute = (name: string) => {
    if (onSelectDestination) onSelectDestination(name);
    else onNavigate("route_preview");
  };
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [listenState, setListenState] = useState<ListenState>("idle");
  const recognitionRef = useRef<any>(null);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setListenState("error"); setTimeout(() => setListenState("idle"), 2000); return; }
    const r = new SR();
    recognitionRef.current = r;
    r.lang = "en-IN";
    r.interimResults = true;
    r.maxAlternatives = 1;
    setListenState("listening");
    r.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setQ(text);
    };
    r.onend = () => setListenState("idle");
    r.onerror = () => { setListenState("error"); setTimeout(() => setListenState("idle"), 2000); };
    r.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListenState("idle");
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Search bar */}
      <div className="px-4 pt-14 pb-3">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate("home")}
            className="pressable w-9 h-9 flex items-center justify-center rounded flex-shrink-0"
            style={{ background: "var(--bg-subtle)" }}>
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <div
            className="flex-1 flex items-center gap-2.5 px-3"
            style={{
              height: 44,
              borderRadius: "var(--r-md)",
              background: "var(--bg-input)",
              border: `1px solid ${focused ? "var(--c-green)" : "var(--border)"}`,
              transition: "border-color 0.15s ease",
            }}
          >
            <IconSearch size={15} color="var(--fg-3)"/>
            <input
              autoFocus
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search places, addresses…"
              style={{
                flex: 1, background: "none",
                font: "var(--text-body)", color: "var(--fg)",
                outline: "none", border: "none",
              }}
            />
            {q ? (
              <button onClick={() => setQ("")} className="pressable">
                <IconClose size={14} color="var(--fg-3)"/>
              </button>
            ) : listenState === "listening" ? (
              <button onClick={stopListening} className="pressable flex items-center justify-center rounded-full"
                style={{ width: 28, height: 28, background: "var(--c-red)15", border: "1.5px solid var(--c-red)40", flexShrink: 0, animation: "pulse-live 1.2s ease-in-out infinite" }}>
                <IconMicrophone size={13} color="var(--c-red)"/>
              </button>
            ) : listenState === "error" ? (
              <button onClick={startListening} className="pressable flex items-center justify-center rounded"
                style={{ width: 28, height: 28, flexShrink: 0 }}>
                <IconMicrophone size={13} color="var(--fg-3)"/>
              </button>
            ) : (
              <button onClick={startListening} className="pressable flex items-center justify-center rounded"
                style={{ width: 28, height: 28, background: "var(--bg-raised)", flexShrink: 0 }}>
                <IconMicrophone size={13} color="var(--fg-2)"/>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Listening indicator */}
      {listenState === "listening" && (
        <div className="flex items-center justify-center gap-2 py-2.5 mx-4 mb-1 rounded-lg anim-fade"
          style={{ background: "var(--c-red)08", border: "1px solid var(--c-red)20" }}>
          <div className="flex gap-1 items-center">
            {[0, 0.15, 0.3].map(d => (
              <div key={d} style={{
                width: 3, height: 10, borderRadius: 2, background: "var(--c-red)",
                animation: "pulse-live 0.8s ease-in-out infinite",
                animationDelay: `${d}s`,
              }}/>
            ))}
          </div>
          <span style={{ font: "var(--text-label)", color: "var(--c-red)" }}>Listening…</span>
        </div>
      )}
      {listenState === "error" && (
        <div className="flex items-center justify-center py-2 mx-4 mb-1 anim-fade">
          <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>Microphone unavailable</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scroll">
        {q ? (
          /* Results */
          <div className="anim-fade">
            <SectionLabel>Results</SectionLabel>
            {RESULTS.map((r, i) => (
              <ResultRow
                key={i}
                label={r.label}
                sub={r.sub}
                right={<span style={{ font: "var(--text-mono)", color: "var(--c-blue)" }}>{r.eta}</span>}
                onClick={() => goToRoute(r.label)}
                last={i === RESULTS.length - 1}
              />
            ))}
          </div>
        ) : (
          <>
            {/* Destination categories */}
            <SectionLabel>Explore nearby</SectionLabel>
            <div className="px-5 mb-2">
              <div className="grid grid-cols-4 gap-2">
                {DEST_CATEGORIES.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => goToRoute(cat.label)}
                      className="pressable flex flex-col items-center gap-1.5 py-3 rounded-xl"
                      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                    >
                      <div className="flex items-center justify-center rounded-lg"
                        style={{ width: 34, height: 34, background: `${cat.color}12` }}>
                        <Icon size={16} color={cat.color}/>
                      </div>
                      <span style={{ font: "500 10px/1.2 'Inter', sans-serif", color: "var(--fg-2)", textAlign: "center" }}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Saved */}
            <SectionLabel>Saved places</SectionLabel>
            <div className="flex gap-2 px-5 mb-4">
              {SAVED.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goToRoute(s.label)}
                  className="pressable flex-1 flex flex-col items-center gap-2 py-3 rounded-lg"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                >
                  <div
                    className="flex items-center justify-center rounded"
                    style={{ width: 32, height: 32, background: `${s.color}15` }}
                  >
                    <IconLocation size={15} color={s.color}/>
                  </div>
                  <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{s.label}</p>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{s.sub}</p>
                </button>
              ))}
            </div>

            {/* Recent */}
            <SectionLabel>Recent</SectionLabel>
            {RECENT.map((r, i) => (
              <ResultRow
                key={i}
                label={r.label}
                sub={r.sub}
                onClick={() => goToRoute(r.label)}
                last={i === RECENT.length - 1}
              />
            ))}

            {/* Road conditions */}
            <SectionLabel>Area conditions</SectionLabel>
            <div className="px-5 mb-4">
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                {[
                  { road: "NH-48",        status: "Active alerts",  color: "var(--c-amber)" },
                  { road: "MG Road",      status: "Clear",          color: "var(--c-green)" },
                  { road: "Golf Course",  status: "Roadwork",       color: "var(--c-yellow)" },
                ].map((a, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{a.road}</span>
                    <span style={{ font: "var(--text-label)", color: a.color }}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="px-5 pt-4 pb-2"
      style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}
    >
      {children}
    </p>
  );
}

function ResultRow({ label, sub, right, onClick, last }: {
  label: string; sub: string; right?: React.ReactNode;
  onClick: () => void; last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="pressable w-full flex items-center gap-3 px-5 py-3.5"
      style={{ borderBottom: last ? "none" : "1px solid var(--border)" }}
    >
      <IconLocation size={15} color="var(--fg-3)"/>
      <div className="flex-1 text-left">
        <p style={{ font: "var(--text-body)", color: "var(--fg)" }}>{label}</p>
        <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-0.5">{sub}</p>
      </div>
      {right}
    </button>
  );
}
