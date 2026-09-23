import { useState, useEffect } from "react";
import { REPORTS, type Report } from "../components/MapCanvas";
import {
  CategoryIcon, CATEGORY_COLORS,
  IconSearch, IconReport, IconRecenter,
  IconMap, IconProfile, IconLayers, IconSettings,
  IconClose, IconCheck, IconVoice, IconSpeaker, IconMenu,
} from "../components/Icons";
import LeafletMap, { type ReportPin } from "../components/LeafletMap";

interface Props {
  onNavigate: (screen: string) => void;
  alertDistance?: number;
  activeCategories?: string[];
  theme?: string;
  voiceMuted?: boolean;
  onVoiceMutedChange?: (v: boolean) => void;
}

const CONF_BAR_W  = { high: "84%", medium: "52%", low: "18%" };
const CONF_COLOR  = { high: "var(--c-green)", medium: "var(--c-amber)", low: "var(--fg-3)" };
const CONF_LABEL  = { high: "High", medium: "Medium", low: "Low" };

function parseDistance(d: string): number {
  if (d.includes("km")) return parseFloat(d) * 1000;
  return parseFloat(d);
}

type ConfirmFeedback = "idle" | "confirmed" | "disputed";

const PIN_CENTER: [number, number] = [28.4595, 77.0266];

export default function HomeScreen({ onNavigate, alertDistance = 2000, activeCategories, theme, voiceMuted: voiceMutedProp = false, onVoiceMutedChange }: Props) {
  const [selected, setSelected]     = useState<Report | null>(null);
  const [feedback, setFeedback]     = useState<ConfirmFeedback>("idle");
  const [confirmCount, setConfirmCount] = useState(REPORTS[0].confirmations);
  const [showMenuSheet, setShowMenuSheet] = useState(false);
  const voiceMuted = voiceMutedProp;
  const setVoiceMuted = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(voiceMutedProp) : v;
    onVoiceMutedChange?.(next);
  };
  const [isOffCenter, setIsOffCenter] = useState(false);
  const [recenterKey, setRecenterKey] = useState(0);

  const visibleReports = REPORTS.filter(r => {
    const inRange = parseDistance(r.distance) <= alertDistance;
    const catOk = !activeCategories || activeCategories.includes(r.type);
    return inRange && catOk;
  });

  const pins: ReportPin[] = visibleReports
    .filter(r => r.lat && r.lng)
    .map(r => ({
      id: r.id, lat: r.lat!, lng: r.lng!,
      type: r.type, label: r.label, distance: r.distance,
    }));

  const handleStillThere = () => {
    setConfirmCount(c => c + 1);
    setFeedback("confirmed");
    setTimeout(() => { setFeedback("idle"); setSelected(null); }, 2600);
  };

  const handleNotThere = () => {
    setFeedback("disputed");
    setTimeout(() => { setFeedback("idle"); setSelected(null); }, 2600);
  };

  const handleSelectPin = (id: string | null) => {
    const r = id ? REPORTS.find(x => x.id === id) ?? null : null;
    setSelected(r);
    setFeedback("idle");
  };

  const handleRecenter = () => {
    setRecenterKey(k => k + 1);
    setIsOffCenter(false);
  };

  const color = selected ? CATEGORY_COLORS[selected.type] : "var(--c-green)";

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "var(--map-ground)" }}>

      {/* ── Real world map ── */}
      <LeafletMap
        key={recenterKey}
        reports={pins}
        center={PIN_CENTER}
        zoom={14}
        theme={theme}
        className="absolute inset-0"
        onSelectReport={handleSelectPin}
      />

      {/* ── Universal top controls ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-4" style={{ paddingTop: 52 }}>
        <MapCtrl onClick={() => setShowMenuSheet(true)}>
          <IconMenu size={16} color="var(--fg-2)"/>
        </MapCtrl>
        <MapCtrl onClick={() => setVoiceMuted(v => !v)} accent={!voiceMuted}>
          {voiceMuted
            ? <IconVoice size={15} color="var(--fg-3)"/>
            : <IconSpeaker size={15} color="var(--c-green)"/>
          }
        </MapCtrl>
      </div>

      {/* Re-center + Compass — mid-right */}
      <div className="absolute z-20 flex flex-col gap-2" style={{ top: 108, right: 16 }}>
        {isOffCenter && (
          <MapCtrl onClick={handleRecenter}>
            <IconRecenter size={15} color="var(--c-green)"/>
          </MapCtrl>
        )}
        <MapCtrl onClick={() => {}}>
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8.5" stroke="var(--border-2)" strokeWidth="1"/>
            <path d="M10 3 L11.2 9 L10 8 L8.8 9 Z" fill="var(--c-red)"/>
            <path d="M10 17 L11.2 11 L10 12 L8.8 11 Z" fill="var(--fg-3)"/>
            <circle cx="10" cy="10" r="1.5" fill="var(--fg-2)"/>
            <text x="10" y="2.2" textAnchor="middle" fontSize="3.5" fill="var(--fg-3)" fontFamily="'Inter', sans-serif" fontWeight="600">N</text>
          </svg>
        </MapCtrl>
        {/* Show recenter button after 5s to demo the feature */}
        {!isOffCenter && (
          <MapCtrl onClick={() => setIsOffCenter(true)}>
            <IconRecenter size={15} color="var(--fg-2)"/>
          </MapCtrl>
        )}
      </div>

      {/* ── Bottom area ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">

        {/* Report detail card */}
        {selected && (
          <div className="px-3 pb-2 anim-up">
            <div style={{
              background: "var(--sheet-bg)",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-md)",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}>
              {feedback === "confirmed" ? (
                <div className="flex items-center justify-center gap-2 py-4"
                  style={{ background: "var(--c-green)08" }}>
                  <IconCheck size={13} color="var(--c-green)"/>
                  <span style={{ font: "var(--text-label)", color: "var(--c-green)" }}>
                    {confirmCount} drivers confirmed · just now
                  </span>
                </div>
              ) : feedback === "disputed" ? (
                <div className="flex items-center justify-center gap-2 py-4">
                  <IconClose size={13} color="var(--fg-3)"/>
                  <span style={{ font: "var(--text-label)", color: "var(--fg-3)" }}>
                    Marked as no longer active
                  </span>
                </div>
              ) : (
                <>
                  <div className="px-4 pt-4 pb-2 flex items-start gap-3">
                    <div className="flex items-center justify-center rounded flex-shrink-0"
                      style={{ width: 36, height: 36, background: `${color}14`, marginTop: 2 }}>
                      <CategoryIcon type={selected.type} size={16} color={color}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ font: "500 10px/1 'Inter', system-ui, sans-serif", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                        {selected.label}
                      </p>
                      <p style={{ font: "700 32px/1 'Inter', sans-serif", color, letterSpacing: "-0.01em" }}>
                        {selected.distance}
                      </p>
                    </div>
                    <button onClick={() => setSelected(null)} className="pressable mt-1 flex-shrink-0">
                      <IconClose size={15} color="var(--fg-3)"/>
                    </button>
                  </div>

                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 rounded-full overflow-hidden" style={{ height: 2, background: "var(--bg-subtle)" }}>
                        <div style={{
                          height: "100%", borderRadius: 99,
                          width: CONF_BAR_W[selected.confidence],
                          background: CONF_COLOR[selected.confidence],
                          transition: "width 0.4s ease",
                        }}/>
                      </div>
                      <span style={{ font: "500 10px/1 'Inter', sans-serif", color: CONF_COLOR[selected.confidence] }}>
                        {CONF_LABEL[selected.confidence]}
                      </span>
                    </div>
                    <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                      {selected.confirmations} confirmed · {selected.timeAgo} ago
                    </p>
                  </div>

                  <div className="grid grid-cols-2" style={{ borderTop: "1px solid var(--border)" }}>
                    <button onClick={handleStillThere}
                      className="pressable flex items-center justify-center gap-2 py-3.5"
                      style={{ font: "var(--text-label)", color: "var(--c-green)" }}>
                      <IconCheck size={13} color="var(--c-green)"/>Still there
                    </button>
                    <button onClick={handleNotThere}
                      className="pressable flex items-center justify-center gap-2 py-3.5"
                      style={{ font: "var(--text-label)", color: "var(--c-red)", borderLeft: "1px solid var(--border)" }}>
                      <IconClose size={13} color="var(--c-red)"/>Not there
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Search + Report row */}
        <div className="flex items-center gap-2 px-3 pb-2">
          <button
            onClick={() => onNavigate("search")}
            className="pressable flex-1 flex items-center gap-2.5 px-4 py-3"
            style={{
              background: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "var(--r-sm)",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border)",
            }}
          >
            <IconSearch size={14} color="var(--fg-3)"/>
            <span style={{ font: "var(--text-label)", color: "var(--fg-3)", flex: 1 }}>Where to?</span>
            <span className="flex items-center justify-center"
              style={{ width: 24, height: 24, borderRadius: "var(--r-xs)", background: "var(--bg-raised)" }}>
              <IconVoice size={12} color="var(--fg-3)"/>
            </span>
          </button>

          <button
            onClick={() => onNavigate("report")}
            className="pressable flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: 46, height: 46, background: "var(--c-green)", boxShadow: "0 2px 10px rgba(25,216,138,0.35)" }}
          >
            <IconReport size={18} color="white"/>
          </button>
        </div>

        {/* Bottom nav */}
        <div className="nav-surface">
          <div className="flex items-end pt-2.5 pb-4 px-2">
            <NavTab label="Map"     active  icon={<IconMap     size={20} color="var(--c-green)"/>}/>
            <NavTab label="Search"          icon={<IconSearch  size={20} color="var(--fg-3)"/>}  onClick={() => onNavigate("search")}/>
            <NavTab label="Profile"         icon={<IconProfile size={20} color="var(--fg-3)"/>}  onClick={() => onNavigate("profile")}/>
          </div>
        </div>
      </div>

      {/* ☰ Menu sheet */}
      {showMenuSheet && (
        <div className="absolute inset-0 z-50" onClick={() => setShowMenuSheet(false)}>
          <div
            className="absolute top-12 left-4 anim-fade"
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--r-md)",
              boxShadow: "var(--shadow-md)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              minWidth: 174,
            }}
            onClick={e => e.stopPropagation()}
          >
            {[
              { icon: <IconRecenter size={14} color="var(--c-green)"/>, label: "Recenter map",  accent: true,  action: () => handleRecenter() },
              { icon: <IconLayers   size={14} color="var(--fg-2)"/>,    label: "Map layers" },
              { icon: <IconSettings size={14} color="var(--fg-2)"/>,    label: "Settings",     nav: "settings" },
              { icon: <IconProfile  size={14} color="var(--fg-2)"/>,    label: "Profile",      nav: "profile" },
            ].map((item, i, arr) => (
              <button
                key={i}
                onClick={() => {
                  setShowMenuSheet(false);
                  if (item.nav) onNavigate(item.nav);
                  item.action?.();
                }}
                className="pressable w-full flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span style={{ font: "var(--text-label)", color: item.accent ? "var(--c-green)" : "var(--fg)" }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MapCtrl({ children, onClick, accent }: {
  children: React.ReactNode; onClick?: () => void; accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="pressable flex items-center justify-center"
      style={{
        width: 36, height: 36,
        borderRadius: "var(--r-sm)",
        background: accent ? "rgba(25,216,138,0.12)" : "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </button>
  );
}

function NavTab({ label, icon, active, onClick }: {
  label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="pressable flex-1 flex flex-col items-center gap-1 py-1">
      {icon}
      <span style={{ font: "var(--text-caption)", color: active ? "var(--c-green)" : "var(--fg-3)" }}>
        {label}
      </span>
    </button>
  );
}
