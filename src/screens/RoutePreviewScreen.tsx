import { useState } from "react";
import { CategoryIcon, CATEGORY_COLORS } from "../components/Icons";
import { IconBack, IconCheck } from "../components/Icons";
import LeafletMap from "../components/LeafletMap";

interface Props {
  onNavigate: (screen: string) => void;
  destination?: string;
  vehicle?: string;
  vehicleColor?: string;
  onVehicleChange?: (v: string) => void;
  onVehicleColorChange?: (c: string) => void;
}

const ALERTS_ON_ROUTE = [
  { type: "traffic",  label: "Traffic check",  dist: "420 m",  confidence: "High" },
  { type: "camera",   label: "Speed camera",   dist: "1.2 km", confidence: "High" },
  { type: "roadwork", label: "Roadwork ahead", dist: "4.8 km", confidence: "Medium" },
];

const ALTERNATIVES = [
  { label: "Via NH-48",          eta: 24, dist: "14.2 km", traffic: "moderate" },
  { label: "Via Golf Course Rd", eta: 31, dist: "13.6 km", traffic: "clear" },
];

const VEHICLES = [
  { id: "car",   label: "Car" },
  { id: "scooter", label: "Scooter" },
  { id: "moto",  label: "Moto" },
  { id: "bicycle", label: "Bicycle" },
];

const VEHICLE_COLORS: { id: string; hex: string; label: string }[] = [
  { id: "black",  hex: "#1A1A1A", label: "Black" },
  { id: "white",  hex: "#E8EAED", label: "White" },
  { id: "silver", hex: "#8A9BB0", label: "Silver" },
  { id: "grey",   hex: "#5A6570", label: "Grey" },
  { id: "blue",   hex: "#2E72F0", label: "Blue" },
  { id: "red",    hex: "#D94040", label: "Red" },
  { id: "green",  hex: "#19D88A", label: "Green" },
  { id: "yellow", hex: "#D4A000", label: "Yellow" },
];

export default function RoutePreviewScreen({
  onNavigate,
  destination = "Cyber City",
  vehicle: vehicleProp = "car",
  vehicleColor: vehicleColorProp = "blue",
  onVehicleChange,
  onVehicleColorChange,
}: Props) {
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [avoidFerries, setAvoidFerries] = useState(false);
  const [selectedAlt, setSelectedAlt] = useState(0);
  const [vehicle, setVehicle] = useState(vehicleProp);
  const [vehicleColor, setVehicleColor] = useState(vehicleColorProp);

  const setV = (v: string) => { setVehicle(v); onVehicleChange?.(v); };
  const setC = (c: string) => { setVehicleColor(c); onVehicleColorChange?.(c); };

  const eta = selectedAlt === 0 ? 24 : 31;
  const dist = selectedAlt === 0 ? "14.2 km" : "13.6 km";
  const selectedColor = VEHICLE_COLORS.find(c => c.id === vehicleColor) ?? VEHICLE_COLORS[4];

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-4 pt-14 pb-4"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}
      >
        <button
          onClick={() => onNavigate("search")}
          className="pressable w-9 h-9 flex items-center justify-center rounded flex-shrink-0"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}
        >
          <IconBack size={16} color="var(--fg-2)"/>
        </button>
        <div className="flex-1 min-w-0">
          <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Route to
          </p>
          <p style={{ font: "600 17px/1.2 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }} className="truncate">
            {destination}
          </p>
        </div>
        {/* ETA pill */}
        <div className="flex items-baseline gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-lg"
          style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}>
          <span style={{ font: "700 20px/1 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.02em" }}>{eta}</span>
          <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>min</span>
          <span style={{ font: "var(--text-caption)", color: "var(--border-2)" }}>·</span>
          <span style={{ font: "500 12px/1 'JetBrains Mono', monospace", color: "var(--fg-2)" }}>{dist}</span>
        </div>
      </div>

      {/* ── Route map ── */}
      <div className="relative flex-shrink-0" style={{ height: 180 }}>
        <LeafletMap
          routeCoords={[
            [28.4595, 77.0266],[28.4610, 77.0285],[28.4625, 77.0305],
            [28.4640, 77.0325],[28.4655, 77.0345],[28.4660, 77.0360],
            [28.4672, 77.0380],[28.4685, 77.0395],
          ]}
          vehicleColor={vehicleColor}
          vehicle={vehicle}
          showRoute
          reports={[
            { id: "a1", lat: 28.4610, lng: 77.0285, type: "traffic",  label: "Traffic check", distance: "420 m" },
            { id: "a2", lat: 28.4625, lng: 77.0305, type: "camera",   label: "Speed camera",  distance: "1.2 km" },
          ]}
          center={[28.4640, 77.0330]}
          zoom={13}
          destination={[28.4685, 77.0395]}
          destinationLabel={destination}
          className="absolute inset-0"
        />
      </div>

      <div className="flex-1 overflow-y-auto no-scroll">

        {/* ── Vehicle + color ── */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="px-5 pt-4 pb-2.5" style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Vehicle
          </p>

          {/* Type */}
          <div className="flex gap-1.5 px-5 pb-3">
            {VEHICLES.map(v => (
              <button
                key={v.id}
                onClick={() => setV(v.id)}
                className="pressable flex-1 py-2.5 rounded-lg"
                style={{
                  font: "500 11px/1 'Inter', sans-serif",
                  color: vehicle === v.id ? "white" : "var(--fg-2)",
                  background: vehicle === v.id ? "var(--c-green)" : "var(--bg-raised)",
                  border: `1px solid ${vehicle === v.id ? "var(--c-green)" : "var(--border)"}`,
                  transition: "all 0.15s ease",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Color */}
          <div className="flex items-center gap-2 px-5 pb-4">
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", flexShrink: 0 }}>Colour:</p>
            <div className="flex gap-2 flex-wrap">
              {VEHICLE_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setC(c.id)}
                  title={c.label}
                  className="pressable"
                  style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: c.hex,
                    border: vehicleColor === c.id ? `2.5px solid var(--c-green)` : "1.5px solid rgba(255,255,255,0.15)",
                    boxShadow: vehicleColor === c.id ? `0 0 0 2px var(--bg), 0 0 0 4px var(--c-green)` : "none",
                    transition: "box-shadow 0.15s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Alerts ── */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="px-5 pt-4 pb-2.5" style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {ALERTS_ON_ROUTE.length} alerts on this route
          </p>
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scroll">
            {ALERTS_ON_ROUTE.map((a, i) => {
              const c = CATEGORY_COLORS[a.type];
              return (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl flex-shrink-0"
                  style={{
                    background: `${c}0A`,
                    border: `1px solid ${c}30`,
                  }}>
                  <div className="flex items-center justify-center rounded" style={{ width: 24, height: 24, background: `${c}18` }}>
                    <CategoryIcon type={a.type} size={12} color={c}/>
                  </div>
                  <div>
                    <p style={{ font: "500 12px/1.2 'Inter', sans-serif", color: "var(--fg)", whiteSpace: "nowrap" }}>{a.label}</p>
                    <p style={{ font: "var(--text-caption)", color: c, marginTop: 2 }}>{a.dist}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Alternative routes ── */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="px-5 pt-4 pb-2.5" style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Alternative routes
          </p>
          <div className="flex flex-col gap-1.5 px-4 pb-4">
            {ALTERNATIVES.map((alt, i) => (
              <button
                key={i}
                onClick={() => setSelectedAlt(i)}
                className="pressable flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: selectedAlt === i ? `${selectedColor.hex}10` : "var(--bg-surface)",
                  border: `1.5px solid ${selectedAlt === i ? selectedColor.hex : "var(--border)"}`,
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 20, height: 20, background: selectedAlt === i ? selectedColor.hex : "var(--bg-raised)", border: `1.5px solid ${selectedAlt === i ? selectedColor.hex : "var(--border-2)"}` }}
                >
                  {selectedAlt === i && <IconCheck size={10} color="white"/>}
                </div>
                <div className="flex-1 text-left">
                  <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{alt.label}</p>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{alt.dist}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p style={{ font: "var(--text-mono)", color: selectedAlt === i ? "var(--fg)" : "var(--fg-2)" }}>
                    {alt.eta} min
                  </p>
                  <p style={{ font: "500 10px/1.3 'Inter', sans-serif", color: alt.traffic === "clear" ? "var(--c-green)" : "var(--c-amber)", marginTop: 2 }}>
                    {alt.traffic}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Route preferences ── */}
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="px-5 pt-4 pb-2" style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Route preferences
          </p>
          {[
            { label: "Avoid highways", value: avoidHighways, set: setAvoidHighways },
            { label: "Avoid ferries",  value: avoidFerries,  set: setAvoidFerries },
          ].map((pref, i, arr) => (
            <button
              key={pref.label}
              onClick={() => pref.set(v => !v)}
              className="pressable w-full flex items-center px-5 py-3.5"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1, textAlign: "left" }}>
                {pref.label}
              </span>
              <div className="toggle" style={{ background: pref.value ? "var(--c-green)" : "var(--bg-raised)", border: "1px solid var(--border)" }}>
                <span className="toggle-knob" style={{ left: pref.value ? 20 : 3 }}/>
              </div>
            </button>
          ))}
        </div>

        <div style={{ height: 8 }}/>
      </div>

      {/* ── Start Journey CTA ── */}
      <div className="px-5 pt-3 pb-8" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={() => onNavigate("route")}
          className="pressable w-full py-4 rounded-xl brand-gradient"
          style={{
            font: "600 16px/1 'Inter', system-ui, sans-serif",
            color: "white",
            letterSpacing: "0.01em",
            boxShadow: "0 2px 18px rgba(8,120,255,0.32)",
          }}
        >
          Start Journey
        </button>
      </div>
    </div>
  );
}
