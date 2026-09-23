import { useState } from "react";
import {
  /* Navigation & System */
  IconSearch, IconMicrophone, IconSpeaker, IconVolumeMuted, IconVoice,
  IconMenu, IconMoreHoriz, IconMoreVert, IconBack, IconForward, IconClose,
  IconShare, IconPause, IconPlay, IconEdit, IconDelete,
  IconCheck, IconWarning, IconHelp, IconInfo,
  IconRecenter, IconCompass, IconLayers, IconCurrentPosition,
  IconLocation, IconNavigation, IconMap, IconRoute,
  IconSettings, IconProfile, IconBell, IconNotification,
  IconReport, IconPrivacy, IconShield, IconTrust,
  IconHistory, IconDrive, IconStar, IconClock,
  /* Road Intelligence */
  IconTrafficCheck, IconCamera, IconAccident, IconHazard,
  IconRoadwork, IconFlood, IconClosure, IconTraffic,
  IconPothole, IconCongestion,
  /* Vehicles */
  IconCar, IconScooter, IconMotorcycle, IconBicycle, IconVehicle,
  /* Destinations */
  IconSaved, IconHome, IconWork, IconRecent,
  IconFuel, IconFood, IconParking, IconGroceries, IconCoffee,
  IconShopping, IconPharmacy, IconEVCharge, IconHospital,
  IconHotel, IconPark, IconCrisis,
  /* Other */
  IconEdit as IconPencil, IconDelete as IconTrash,
  CATEGORY_COLORS, CategoryIcon,
} from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
}

type Tab = "system" | "road" | "vehicle" | "destination" | "states";

const ROAD_INTEL = [
  { Icon: IconTrafficCheck, label: "Traffic check",  color: "var(--c-red)",    type: "traffic" },
  { Icon: IconCamera,       label: "Speed camera",   color: "var(--c-blue)",   type: "camera" },
  { Icon: IconAccident,     label: "Accident",       color: "var(--c-purple)", type: "accident" },
  { Icon: IconHazard,       label: "Road hazard",    color: "var(--c-amber)",  type: "hazard" },
  { Icon: IconPothole,      label: "Pothole",        color: "var(--c-amber)",  type: "hazard" },
  { Icon: IconRoadwork,     label: "Roadwork",       color: "var(--c-yellow)", type: "roadwork" },
  { Icon: IconFlood,        label: "Flooding",       color: "var(--c-cyan)",   type: "flood" },
  { Icon: IconClosure,      label: "Road closed",    color: "var(--c-dark)",   type: "closure" },
  { Icon: IconTraffic,      label: "Traffic queue",  color: "var(--c-red)",    type: "traffic" },
  { Icon: IconCongestion,   label: "Congestion",     color: "var(--c-amber)",  type: "congestion" },
];

const NAV_SYSTEM = [
  { Icon: IconSearch,          label: "Search" },
  { Icon: IconMicrophone,      label: "Microphone" },
  { Icon: IconSpeaker,         label: "Speaker" },
  { Icon: IconVolumeMuted,     label: "Muted" },
  { Icon: IconVoice,           label: "Voice" },
  { Icon: IconMenu,            label: "Menu" },
  { Icon: IconMoreHoriz,       label: "More horiz" },
  { Icon: IconMoreVert,        label: "More vert" },
  { Icon: IconBack,            label: "Back" },
  { Icon: IconForward,         label: "Forward" },
  { Icon: IconClose,           label: "Close" },
  { Icon: IconCheck,           label: "Check" },
  { Icon: IconShare,           label: "Share" },
  { Icon: IconPause,           label: "Pause" },
  { Icon: IconPlay,            label: "Play" },
  { Icon: IconEdit,            label: "Edit" },
  { Icon: IconDelete,          label: "Delete" },
  { Icon: IconWarning,         label: "Warning" },
  { Icon: IconHelp,            label: "Help" },
  { Icon: IconInfo,            label: "Info" },
  { Icon: IconRecenter,        label: "Recenter" },
  { Icon: IconCompass,         label: "Compass" },
  { Icon: IconLayers,          label: "Layers" },
  { Icon: IconCurrentPosition, label: "Position" },
  { Icon: IconLocation,        label: "Location" },
  { Icon: IconNavigation,      label: "Navigate" },
  { Icon: IconMap,             label: "Map" },
  { Icon: IconRoute,           label: "Route" },
  { Icon: IconSettings,        label: "Settings" },
  { Icon: IconProfile,         label: "Profile" },
  { Icon: IconBell,            label: "Bell" },
  { Icon: IconNotification,    label: "Notification" },
  { Icon: IconReport,          label: "Report" },
  { Icon: IconPrivacy,         label: "Privacy" },
  { Icon: IconShield,          label: "Shield" },
  { Icon: IconTrust,           label: "Trust" },
  { Icon: IconHistory,         label: "History" },
  { Icon: IconDrive,           label: "Drive mode" },
  { Icon: IconStar,            label: "Star / Pro" },
  { Icon: IconClock,           label: "Clock" },
];

const VEHICLES = [
  { Icon: IconCar,        label: "Car",         color: "var(--c-blue)" },
  { Icon: IconScooter,    label: "Scooter",      color: "var(--c-blue)" },
  { Icon: IconMotorcycle, label: "Motorcycle",   color: "var(--c-blue)" },
  { Icon: IconBicycle,    label: "Bicycle",      color: "var(--c-blue)" },
];

const DESTINATIONS = [
  { Icon: IconSaved,    label: "Saved" },
  { Icon: IconHome,     label: "Home" },
  { Icon: IconWork,     label: "Work" },
  { Icon: IconRecent,   label: "Recent" },
  { Icon: IconFuel,     label: "Fuel" },
  { Icon: IconFood,     label: "Food" },
  { Icon: IconParking,  label: "Parking" },
  { Icon: IconGroceries,label: "Groceries" },
  { Icon: IconCoffee,   label: "Coffee" },
  { Icon: IconShopping, label: "Shopping" },
  { Icon: IconPharmacy, label: "Pharmacy" },
  { Icon: IconEVCharge, label: "EV Charge" },
  { Icon: IconHospital, label: "Hospital" },
  { Icon: IconHotel,    label: "Hotel" },
  { Icon: IconPark,     label: "Park" },
  { Icon: IconCrisis,   label: "Crisis" },
];

const TABS: { id: Tab; label: string }[] = [
  { id: "system",      label: "System" },
  { id: "road",        label: "Road" },
  { id: "vehicle",     label: "Vehicle" },
  { id: "destination", label: "Places" },
  { id: "states",      label: "States" },
];

export default function IconLibraryScreen({ onNavigate }: Props) {
  const [tab, setTab] = useState<Tab>("system");
  const [iconSize, setIconSize] = useState<20 | 28 | 40>(20);

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3 px-4 pt-14 pb-3">
          <button
            onClick={() => onNavigate("profile")}
            className="pressable w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ background: "var(--bg-subtle)" }}
          >
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <div className="flex-1 min-w-0">
            <h1 style={{ font: "700 15px/1 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>
              THE3EYE
            </h1>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 2 }}>
              Icon Library · {NAV_SYSTEM.length + ROAD_INTEL.length + VEHICLES.length + DESTINATIONS.length} icons
            </p>
          </div>

          {/* Size picker */}
          <div className="flex gap-1">
            {([20, 28, 40] as const).map(s => (
              <button
                key={s}
                onClick={() => setIconSize(s)}
                className="pressable px-2.5 py-1.5 rounded-lg"
                style={{
                  font: "500 11px/1 'Inter', sans-serif",
                  color: iconSize === s ? "var(--c-green)" : "var(--fg-3)",
                  background: iconSize === s ? "var(--c-green)12" : "transparent",
                }}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto no-scroll">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="pressable flex-shrink-0 px-4 py-3"
              style={{
                font: "var(--text-label)",
                color: tab === t.id ? "var(--c-green)" : "var(--fg-3)",
                borderBottom: `2px solid ${tab === t.id ? "var(--c-green)" : "transparent"}`,
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scroll">

        {/* ── System icons ── */}
        {tab === "system" && (
          <div className="anim-fade">
            <SectionHead label="Navigation & System" count={NAV_SYSTEM.length}/>
            <div className="px-4 py-3">
              {/* Light surface grid */}
              <div
                className="rounded-xl p-4 mb-3"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
              >
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  On surface
                </p>
                <IconGrid icons={NAV_SYSTEM} size={iconSize} color="var(--fg-2)"/>
              </div>
              {/* Dark surface demo */}
              <div className="rounded-xl p-4" style={{ background: "#0D1117" }}>
                <p style={{ font: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Dark surface
                </p>
                <IconGrid icons={NAV_SYSTEM} size={iconSize} color="rgba(255,255,255,0.7)"/>
              </div>
            </div>
          </div>
        )}

        {/* ── Road intelligence ── */}
        {tab === "road" && (
          <div className="anim-fade">
            <SectionHead label="Road Intelligence" count={ROAD_INTEL.length}/>

            {/* Semantic color showcase */}
            <div className="px-4 pt-3 pb-1">
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <div className="px-4 pt-3 pb-2" style={{ background: "var(--bg-subtle)" }}>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Semantic colours
                  </p>
                </div>
                {ROAD_INTEL.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-4 py-3"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {/* Icon on semantic-coloured bg */}
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0"
                      style={{ width: 40, height: 40, background: `${item.color}16` }}
                    >
                      <item.Icon size={iconSize > 20 ? 22 : 18} color={item.color}/>
                    </div>
                    {/* Label */}
                    <span style={{ font: "var(--text-body)", color: "var(--fg)", flex: 1 }}>
                      {item.label}
                    </span>
                    {/* Color chip */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: item.color }}/>
                      {/* Raw icon — mono */}
                      <item.Icon size={16} color="var(--fg-3)"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark surface */}
            <div className="px-4 py-3">
              <div className="rounded-xl p-4" style={{ background: "#0A0E14" }}>
                <p style={{ font: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  On dark map surface
                </p>
                <div className="flex flex-wrap gap-5">
                  {ROAD_INTEL.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2" style={{ width: 56 }}>
                      <div
                        className="flex items-center justify-center rounded-xl"
                        style={{
                          width: 44, height: 44,
                          background: `${item.color}22`,
                          border: `1px solid ${item.color}40`,
                        }}
                      >
                        <item.Icon size={iconSize > 20 ? 22 : 18} color={item.color}/>
                      </div>
                      <span style={{
                        font: "500 9px/1.3 'Inter', sans-serif",
                        color: "rgba(255,255,255,0.4)",
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Vehicle markers ── */}
        {tab === "vehicle" && (
          <div className="anim-fade">
            <SectionHead label="Vehicle Markers" count={VEHICLES.length}/>
            <p className="px-4 pb-3" style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
              Top-down silhouettes optimised for use as live navigation markers.
            </p>

            {/* Hero — large markers */}
            <div
              className="mx-4 rounded-xl p-5 mb-3"
              style={{ background: "var(--map-ground)", border: "1px solid var(--border)" }}
            >
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                As navigation marker · on map
              </p>
              <div className="flex justify-around">
                {VEHICLES.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    {/* Marker shell */}
                    <div style={{ position: "relative" }}>
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: 52, height: 52,
                          borderRadius: 26,
                          background: "var(--c-blue)",
                          boxShadow: "0 0 0 4px rgba(255,255,255,0.15), 0 4px 16px rgba(59,130,246,0.4)",
                        }}
                      >
                        <v.Icon size={26} color="white"/>
                      </div>
                      {/* Direction indicator */}
                      <div style={{
                        position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
                        width: 0, height: 0,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "7px solid var(--c-blue)",
                      }}/>
                    </div>
                    <span style={{ font: "var(--text-label)", color: "var(--fg-2)", marginTop: 10 }}>
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes demo */}
            <div className="mx-4 rounded-xl overflow-hidden mb-3" style={{ border: "1px solid var(--border)" }}>
              {VEHICLES.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ borderBottom: i < VEHICLES.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  {/* Multiple sizes */}
                  <div className="flex items-center gap-4 flex-1">
                    {[16, 20, 28, 40].map(s => (
                      <v.Icon key={s} size={s} color="var(--fg-2)"/>
                    ))}
                  </div>
                  <span style={{ font: "var(--text-label)", color: "var(--fg-3)" }}>{v.label}</span>
                </div>
              ))}
            </div>

            {/* Stroke vs filled */}
            <div className="mx-4 rounded-xl p-4 mb-4" style={{ background: "#0A0E14" }}>
              <p style={{ font: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                On dark surface · monochrome
              </p>
              <div className="flex justify-around">
                {VEHICLES.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <v.Icon size={32} color="rgba(255,255,255,0.8)"/>
                    <span style={{ font: "9px/1 'Inter', sans-serif", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Destination icons ── */}
        {tab === "destination" && (
          <div className="anim-fade">
            <SectionHead label="Search & Destinations" count={DESTINATIONS.length}/>
            <div className="px-4 py-3">
              {/* Grid on surface */}
              <div
                className="rounded-xl p-4 mb-3"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
              >
                <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Category tiles
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {DESTINATIONS.map((d, i) => (
                    <div
                      key={i}
                      className="pressable flex flex-col items-center gap-2 py-3 rounded-xl"
                      style={{ background: "var(--bg-raised)" }}
                    >
                      <d.Icon size={iconSize} color="var(--fg-2)"/>
                      <span style={{
                        font: "500 9px/1.2 'Inter', sans-serif",
                        color: "var(--fg-3)",
                        textAlign: "center",
                      }}>
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark surface */}
              <div className="rounded-xl p-4" style={{ background: "#0D1117" }}>
                <p style={{ font: "var(--text-caption)", color: "rgba(255,255,255,0.35)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Dark surface
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {DESTINATIONS.map((d, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 py-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <d.Icon size={iconSize} color="rgba(255,255,255,0.6)"/>
                      <span style={{
                        font: "500 9px/1.2 'Inter', sans-serif",
                        color: "rgba(255,255,255,0.3)",
                        textAlign: "center",
                      }}>
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── States & actions ── */}
        {tab === "states" && (
          <div className="anim-fade">
            <SectionHead label="States & Actions"/>

            {/* Default / Active / Disabled */}
            <div className="px-4 py-3">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-3" style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Icon states
                  </p>
                </div>

                {[
                  { label: "Default",       color: "var(--fg-2)",          bg: "transparent" },
                  { label: "Active",         color: "var(--c-green)",       bg: "var(--c-green)12" },
                  { label: "Danger",         color: "var(--c-red)",         bg: "var(--c-red)12" },
                  { label: "Warning",        color: "var(--c-amber)",       bg: "var(--c-amber)10" },
                  { label: "Informational",  color: "var(--c-blue)",        bg: "var(--c-blue)10" },
                  { label: "Disabled",       color: "var(--fg-3)",          bg: "transparent" },
                ].map((state, i, arr) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-4 py-3"
                    style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
                  >
                    <span style={{ font: "var(--text-label)", color: "var(--fg-3)", width: 110, flexShrink: 0 }}>
                      {state.label}
                    </span>
                    <div className="flex items-center gap-3 flex-1">
                      {[IconSettings, IconReport, IconBell, IconRoute].map((Icon, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-center rounded-lg"
                          style={{ width: 36, height: 36, background: state.bg, opacity: state.label === "Disabled" ? 0.35 : 1 }}
                        >
                          <Icon size={18} color={state.color}/>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom nav icons at actual scale */}
            <div className="px-4 pb-3">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-3" style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Bottom navigation · actual scale
                  </p>
                </div>
                <div className="flex" style={{ borderBottom: "1px solid var(--border)" }}>
                  {[
                    { Icon: IconMap,     label: "Map",    active: true },
                    { Icon: IconSearch,  label: "Search", active: false },
                    { Icon: IconProfile, label: "Profile",active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center py-3 gap-1">
                      <item.Icon size={22} color={item.active ? "var(--c-green)" : "var(--fg-3)"}/>
                      <span style={{
                        font: "var(--text-caption)",
                        color: item.active ? "var(--c-green)" : "var(--fg-3)",
                      }}>{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* Map control icons */}
                <div className="px-4 py-3 flex items-center gap-3">
                  <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginRight: 4 }}>Map controls</span>
                  {[IconRecenter, IconCompass, IconLayers, IconMoreVert].map((Icon, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded-lg"
                      style={{ width: 34, height: 34, background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                    >
                      <Icon size={16} color="var(--fg-2)"/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Report category quick-reference */}
            <div className="px-4 pb-4">
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-3" style={{ background: "var(--bg-subtle)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                    Semantic colour reference
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  {ROAD_INTEL.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        borderBottom: i < ROAD_INTEL.length - 2 ? "1px solid var(--border)" : "none",
                        borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <r.Icon size={16} color={r.color}/>
                      <div>
                        <p style={{ font: "var(--text-label)", color: "var(--fg)" }}>{r.label}</p>
                        <div style={{ width: 24, height: 3, borderRadius: 2, background: r.color, marginTop: 3 }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function SectionHead({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-baseline gap-2 px-4 pt-5 pb-2">
      <h2 style={{ font: "600 13px/1 'Inter', system-ui, sans-serif", color: "var(--fg)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </h2>
      {count !== undefined && (
        <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{count}</span>
      )}
    </div>
  );
}

function IconGrid({
  icons, size, color,
}: {
  icons: { Icon: React.ComponentType<{ size?: number; color?: string }>; label: string }[];
  size: number;
  color: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {icons.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5" style={{ width: 52 }}>
          <div
            className="flex items-center justify-center rounded-lg"
            style={{ width: 40, height: 40 }}
          >
            <item.Icon size={size} color={color}/>
          </div>
          <span style={{
            font: "500 8.5px/1.3 'Inter', sans-serif",
            color: color === "var(--fg-2)" ? "var(--fg-3)" : "rgba(255,255,255,0.3)",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
