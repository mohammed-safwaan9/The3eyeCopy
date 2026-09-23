import { IconBack, IconRoute, IconCheck } from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
}

const DAYS = [
  { date: "Today", trips: [
    { from: "DLF Phase 3", to: "Cyber City",  dist: "8.2 km",  time: "22 min", alerts: 2, dep: "09:14" },
    { from: "Cyber City",  to: "Sector 29",   dist: "4.1 km",  time: "18 min", alerts: 1, dep: "13:47" },
  ]},
  { date: "Yesterday", trips: [
    { from: "Home",         to: "Medanta Hospital", dist: "11.4 km", time: "31 min", alerts: 3, dep: "10:05" },
    { from: "Medanta",      to: "Ambience Mall",    dist: "6.7 km",  time: "20 min", alerts: 0, dep: "12:30" },
    { from: "Ambience Mall",to: "Home",             dist: "9.1 km",  time: "28 min", alerts: 1, dep: "17:15" },
  ]},
  { date: "Mon, Sep 4", trips: [
    { from: "Home", to: "IGI Airport", dist: "28.3 km", time: "52 min", alerts: 4, dep: "05:30" },
  ]},
];

export default function HistoryScreen({ onNavigate }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>
      <div
        style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)", position: "relative", overflow: "hidden" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(135deg, #0878FF0A 0%, transparent 60%)",
        }}/>
        <div className="flex items-center gap-4 px-4 pt-14 pb-4" style={{ position: "relative" }}>
          <button onClick={() => onNavigate("profile")}
            className="pressable w-9 h-9 flex items-center justify-center rounded"
            style={{ background: "var(--bg-raised)", border: "1px solid var(--border)" }}>
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <h1 style={{ font: "700 18px/1.3 'Inter', system-ui, sans-serif", color: "var(--fg)", letterSpacing: "-0.01em" }}>Activity</h1>
        </div>
      </div>

      {/* Month summary */}
      <div
        className="flex items-center px-5 py-4 gap-8"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {[
          { label: "Trips",      value: "24" },
          { label: "Reports",    value: "18" },
          { label: "Km driven",  value: "284" },
        ].map((s, i) => (
          <div key={i}>
            <p style={{ font: "var(--text-mono-lg)", color: "var(--fg)" }}>{s.value}</p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-0.5">{s.label}</p>
          </div>
        ))}
        <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginLeft: "auto" }}>
          September
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scroll">
        {DAYS.map((day, di) => (
          <div key={di}>
            <p
              className="px-5 pt-4 pb-2"
              style={{ font: "var(--text-caption)", color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.07em" }}
            >
              {day.date}
            </p>
            {day.trips.map((trip, ti) => (
              <div
                key={ti}
                className="px-5 py-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {/* Origin → Destination */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex flex-col items-center gap-1 pt-1 flex-shrink-0">
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--c-blue)" }}/>
                    <div style={{ width: 1, height: 20, background: "var(--border-2)" }}/>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--c-red)" }}/>
                  </div>
                  <div className="flex-1">
                    <p style={{ font: "var(--text-body)", color: "var(--fg)" }}>{trip.from}</p>
                    <p style={{ font: "var(--text-body)", color: "var(--fg-2)", marginTop: 14 }}>{trip.to}</p>
                  </div>
                  <p style={{ font: "var(--text-mono)", color: "var(--fg-3)" }}>{trip.dep}</p>
                </div>

                {/* Trip meta */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <IconRoute size={13} color="var(--fg-3)"/>
                    <span style={{ font: "var(--text-mono)", color: "var(--fg-2)" }}>{trip.dist}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"
                      stroke="var(--fg-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="10" cy="10" r="7.5"/><polyline points="10 6 10 10 13 12.5"/>
                    </svg>
                    <span style={{ font: "var(--text-mono)", color: "var(--fg-2)" }}>{trip.time}</span>
                  </div>
                  {trip.alerts > 0 ? (
                    <span style={{ font: "var(--text-caption)", color: "var(--c-amber)" }}>
                      {trip.alerts} alerts
                    </span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <IconCheck size={13} color="var(--c-green)"/>
                      <span style={{ font: "var(--text-caption)", color: "var(--c-green)" }}>Clear road</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
