import { useState } from "react";
import {
  CategoryIcon, CATEGORY_COLORS,
  IconBack, IconSettings, IconTrust, IconCheck, IconClose,
  IconVehicle, IconHistory, IconLocation, IconBell, IconPrivacy, IconStar, IconRoute,
} from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
}

const MY_REPORTS = [
  { type: "traffic",  loc: "NH-48, Gurugram",     when: "2h ago",   status: "active",    conf: 8 },
  { type: "camera",   loc: "Golf Course Rd",       when: "Yesterday", status: "expired",   conf: 14 },
  { type: "hazard",   loc: "Sohna Road",           when: "2 days",   status: "confirmed", conf: 6 },
  { type: "accident", loc: "Sector 56",            when: "3 days",   status: "rejected",  conf: 1 },
];

const STATUS_COLOR: Record<string, string> = {
  active:    "var(--c-green)",
  expired:   "var(--fg-3)",
  confirmed: "var(--c-blue)",
  rejected:  "var(--c-red)",
};

export default function ProfileScreen({ onNavigate }: Props) {
  const [tab, setTab] = useState<"overview" | "reports" | "vehicles">("overview");

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>

      {/* ── Header ── */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        {/* Subtle brand ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(135deg, #0878FF0E 0%, #19D88A06 100%)",
        }}/>
        <div className="absolute pointer-events-none" style={{
          top: "-30%", right: "-10%", width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, #0878FF12 0%, transparent 70%)",
        }}/>
        <div className="flex items-center justify-between px-4 pt-14 pb-4" style={{ position: "relative" }}>
          <button onClick={() => onNavigate("home")}
            className="pressable w-9 h-9 flex items-center justify-center rounded"
            style={{ background: "var(--bg-subtle)" }}>
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <button onClick={() => onNavigate("settings")}
            className="pressable w-9 h-9 flex items-center justify-center rounded"
            style={{ background: "var(--bg-subtle)" }}>
            <IconSettings size={16} color="var(--fg-2)"/>
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 px-5 pb-5">
          <div
            className="flex items-center justify-center rounded-xl flex-shrink-0"
            style={{
              width: 54, height: 54,
              background: "var(--bg-raised)",
              border: "1px solid var(--border-2)",
              font: "600 18px/1 'Inter', sans-serif",
              color: "var(--fg-2)",
              letterSpacing: "0.01em",
            }}
          >
            AR
          </div>
          <div>
            <p style={{ font: "600 17px/1 'Inter', sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>
              Arjun Rao
            </p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">
              Member since 2023 · Gurugram
            </p>
          </div>
          <button
            onClick={() => onNavigate("premium")}
            className="pressable ml-auto"
            style={{
              font: "600 10px/1 'Inter', sans-serif",
              color: "var(--c-amber)",
              letterSpacing: "0.08em",
            }}
          >
            PRO ›
          </button>
        </div>

        {/* Trust score */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <IconTrust size={13} color="var(--c-green)"/>
              <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Trust score
              </span>
            </div>
            <span style={{ font: "var(--text-mono)", color: "var(--c-green)" }}>87 / 100</span>
          </div>
          <div className="rounded-full overflow-hidden" style={{ height: 3, background: "var(--bg-subtle)" }}>
            <div style={{ width: "87%", height: "100%", background: "var(--c-green)", borderRadius: 99 }}/>
          </div>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { label: "Reports",    value: "142" },
            { label: "Accuracy",   value: "89%" },
            { label: "Confirmed",  value: "384" },
            { label: "Impact",     value: "2.1k" },
          ].map((s, i) => (
            <div
              key={i}
              className="py-4 text-center"
              style={{ borderRight: i < 3 ? "1px solid var(--border)" : "none" }}
            >
              <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>{s.value}</p>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderTop: "1px solid var(--border)" }}>
          {(["overview", "reports", "vehicles"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="pressable flex-1 py-3 capitalize"
              style={{
                font: "var(--text-label)",
                color: tab === t ? "var(--c-green)" : "var(--fg-3)",
                borderBottom: tab === t ? "2px solid var(--c-green)" : "2px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scroll">

        {/* ── Overview ── */}
        {tab === "overview" && (
          <div className="anim-fade">
            {/* Impact — driving intelligence feel */}
            <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                This month
              </p>
              <p style={{ font: "600 17px/1.5 'Inter', sans-serif", color: "var(--fg)" }}>
                Your reports reached{" "}
                <span style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>2,481</span>
                {" "}drivers.
              </p>
              <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 4 }}>
                89% accuracy · 142 reports submitted
              </p>
            </div>

            {/* Menu items */}
            {[
              { icon: <IconRoute size={16} color="var(--fg-3)"/>,    label: "Driving history",   sub: "24 trips",  nav: "history" },
              { icon: <IconHistory size={16} color="var(--fg-3)"/>,  label: "My reports",        sub: "142 total", nav: "reports-tab" },
              { icon: <IconCheck size={16} color="var(--fg-3)"/>,    label: "Confirmations",     sub: "384 given", nav: "" },
              { icon: <IconLocation size={16} color="var(--fg-3)"/>, label: "Saved places",      sub: "3 places",  nav: "" },
              { icon: <IconBell size={16} color="var(--fg-3)"/>,     label: "Alert preferences", sub: "Customised",nav: "settings" },
              { icon: <IconVehicle size={16} color="var(--fg-3)"/>,  label: "Vehicles",          sub: "1 vehicle", nav: "vehicles-tab" },
              { icon: <IconPrivacy size={16} color="var(--fg-3)"/>,  label: "Privacy & security",sub: "",          nav: "settings" },
              { icon: <IconStar size={16} color="var(--c-amber)"/>,  label: "The3eye Pro",       sub: "Upgrade",   nav: "premium", accent: true },
            ].map((item, i, arr) => (
              <button
                key={i}
                onClick={() => {
                  if (item.nav === "premium") onNavigate("premium");
                  else if (item.nav === "history") onNavigate("history");
                  else if (item.nav === "settings") onNavigate("settings");
                  else if (item.nav === "reports-tab") setTab("reports");
                  else if (item.nav === "vehicles-tab") setTab("vehicles");
                }}
                className="pressable w-full flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  style={{
                    font: "var(--text-body)",
                    color: item.accent ? "var(--c-amber)" : "var(--fg)",
                    flex: 1, textAlign: "left",
                  }}
                >
                  {item.label}
                </span>
                {item.sub && (
                  <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
                    {item.sub}
                  </span>
                )}
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"
                  stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 5 13 10 7 15"/>
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* ── Reports tab ── */}
        {tab === "reports" && (
          <div className="anim-fade">
            {MY_REPORTS.map((r, i) => {
              const c = CATEGORY_COLORS[r.type];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-4"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div
                    className="flex items-center justify-center rounded flex-shrink-0"
                    style={{ width: 36, height: 36, background: `${c}12` }}
                  >
                    <CategoryIcon type={r.type} size={16} color={c}/>
                  </div>
                  <div className="flex-1">
                    <p style={{ font: "var(--text-body)", color: "var(--fg)" }}>{r.loc}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>{r.when}</span>
                      <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>·</span>
                      <span style={{ font: "500 11px/1 'Inter', sans-serif", color: STATUS_COLOR[r.status] }}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span style={{ font: "var(--text-mono)", color: "var(--fg-2)" }}>
                      {r.conf}
                    </span>
                    <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>conf.</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Vehicles tab ── */}
        {tab === "vehicles" && (
          <div className="p-4 anim-fade flex flex-col gap-3">
            <div
              className="p-4 rounded-lg"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center rounded"
                  style={{ width: 44, height: 44, background: "var(--bg-subtle)" }}
                >
                  <IconVehicle size={20} color="var(--fg-2)"/>
                </div>
                <div className="flex-1">
                  <p style={{ font: "var(--text-heading)", color: "var(--fg)" }}>Hyundai Creta</p>
                  <p style={{ font: "var(--text-mono)", color: "var(--c-green)" }} className="mt-0.5">
                    HR 26 AX 5421
                  </p>
                </div>
                <span
                  className="px-2 py-1 rounded"
                  style={{ font: "500 11px/1 'Inter', sans-serif", color: "var(--c-green)", background: "var(--c-green)12" }}
                >
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[["Type","SUV"],["Fuel","Petrol"],["Year","2022"]].map(([k,v]) => (
                  <div key={k} className="py-3 text-center rounded"
                    style={{ background: "var(--bg-subtle)" }}>
                    <p style={{ font: "var(--text-heading)", color: "var(--fg)" }}>{v}</p>
                    <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-1">{k}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="pressable py-4 rounded-lg"
              style={{
                font: "var(--text-heading)", color: "var(--fg-3)",
                background: "var(--bg-subtle)",
                border: "1px dashed var(--border-2)",
              }}
            >
              + Add vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
