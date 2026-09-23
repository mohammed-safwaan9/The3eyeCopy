import { useState, useEffect } from "react";
import { CategoryIcon, CATEGORY_COLORS } from "./Icons";

export interface Report {
  id: string;
  type: "traffic" | "camera" | "accident" | "hazard" | "roadwork" | "flood" | "closure";
  x: number; // percent (SVG canvas)
  y: number;
  lat?: number; // geo coords for real map
  lng?: number;
  confidence: "high" | "medium" | "low";
  confirmations: number;
  timeAgo: string;
  distance: string;
  label: string;
  stale?: boolean;
}

export const REPORTS: Report[] = [
  { id: "1", type: "traffic",  x: 52, y: 37, confidence: "high",   confirmations: 6,  timeAgo: "48s",  distance: "420 m",  label: "Traffic checking", lat: 28.4610, lng: 77.0285 },
  { id: "2", type: "camera",   x: 70, y: 54, confidence: "high",   confirmations: 12, timeAgo: "2m",   distance: "1.1 km", label: "Speed camera",    lat: 28.4582, lng: 77.0320 },
  { id: "3", type: "accident", x: 29, y: 61, confidence: "medium", confirmations: 3,  timeAgo: "6m",   distance: "2.4 km", label: "Accident",        lat: 28.4558, lng: 77.0248 },
  { id: "4", type: "hazard",   x: 62, y: 23, confidence: "low",    confirmations: 1,  timeAgo: "14m",  distance: "800 m",  label: "Road hazard",     lat: 28.4635, lng: 77.0302, stale: true },
  { id: "5", type: "roadwork", x: 19, y: 39, confidence: "high",   confirmations: 8,  timeAgo: "1m",   distance: "3.1 km", label: "Roadwork",        lat: 28.4528, lng: 77.0198 },
  { id: "6", type: "closure",  x: 77, y: 71, confidence: "high",   confirmations: 15, timeAgo: "4m",   distance: "1.8 km", label: "Road closed",     lat: 28.4601, lng: 77.0358 },
];

interface Props {
  onSelectReport: (r: Report | null) => void;
  selectedId: string | null;
}

function MapMarker({
  report, selected, onClick, index,
}: {
  report: Report; selected: boolean; onClick: () => void; index: number;
}) {
  const color = CATEGORY_COLORS[report.type];
  const isStale = report.stale || report.confidence === "low";
  const isHigh = report.confidence === "high" && !report.stale;
  const sz = selected ? 36 : isHigh ? 30 : 26;
  const opacity = isStale ? 0.48 : report.confidence === "medium" ? 0.82 : 1;
  const r = selected ? 10 : 8;

  return (
    <button
      onClick={onClick}
      className="absolute pressable anim-marker"
      style={{
        left: `${report.x}%`,
        top: `${report.y}%`,
        transform: "translate(-50%, -100%)",
        zIndex: selected ? 30 : 20,
        animationDelay: `${index * 55}ms`,
      }}
      aria-label={`${report.label} — ${report.distance}`}
    >
      {/* Selected emphasis ring — no glow, just outline */}
      {selected && (
        <span className="absolute" style={{
          inset: -4,
          borderRadius: r + 4,
          border: `1.5px solid ${color}`,
          opacity: 0.45,
          pointerEvents: "none",
        }}/>
      )}

      {/* Badge */}
      <span
        className="flex items-center justify-center"
        style={{
          width: sz, height: sz,
          borderRadius: r,
          background: color,
          opacity,
          boxShadow: selected
            ? `0 2px 8px ${color}40, 0 1px 3px rgba(0,0,0,0.3)`
            : `0 1px 4px rgba(0,0,0,0.28)`,
          transition: "all 0.2s cubic-bezier(0.34,1.3,0.64,1)",
          border: "1px solid rgba(255,255,255,0.18)",
          position: "relative",
        }}
      >
        <CategoryIcon type={report.type} size={selected ? 17 : isHigh ? 14 : 13} color="white"/>

        {/* Confidence dot — bottom-right corner */}
        {!selected && (
          <span style={{
            position: "absolute",
            bottom: -2, right: -2,
            width: 7, height: 7,
            borderRadius: 4,
            background: isHigh ? "#19D88A" : report.confidence === "medium" ? "#C97D0A" : "#3E4E62",
            border: "1.5px solid rgba(0,0,0,0.3)",
          }}/>
        )}
      </span>

      {/* Pointer tip — clean downward triangle */}
      <span style={{
        display: "block",
        width: 0, height: 0,
        marginLeft: "auto", marginRight: "auto",
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: `5px solid ${color}`,
        opacity: isStale ? 0.48 : 1,
        marginTop: -1,
      }}/>
    </button>
  );
}

function ClusterMarker({ count, x, y }: { count: number; x: number; y: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: 15,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          width: 32, height: 20,
          borderRadius: 10,
          background: "var(--bg-raised)",
          border: "1px solid var(--border-2)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <span style={{ font: "600 10px/1 'Inter', system-ui, sans-serif", color: "var(--fg-2)" }}>
          +{count}
        </span>
      </div>
    </div>
  );
}

export default function MapCanvas({ onSelectReport, selectedId }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "var(--map-ground)" }}>
      <svg
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >

        {/* ── Water body — Badshahpur drain ─────────── */}
        <path
          d="M 374 0 C 388 52 392 118 382 182 C 372 240 358 272 364 332 C 370 388 356 444 340 492 L 328 490 C 343 440 357 386 350 328 C 343 268 358 238 368 178 C 378 114 374 50 360 0 Z"
          fill="var(--map-water)"
        />

        {/* ── Parks ──────────────────────────────────── */}
        {/* Leisure Valley Park — center-left */}
        <path
          d="M 44 316 C 36 282 55 260 80 254 C 106 248 133 260 138 286 C 143 312 128 340 104 350 C 80 360 50 342 44 316 Z"
          fill="var(--map-park)"
        />
        {[
          [70,292],[92,280],[114,286],[88,308],[110,320],[74,324],[96,300]
        ].map(([cx,cy],i) => (
          <circle key={`pt${i}`} cx={cx} cy={cy} r="4.5" fill="var(--map-park-2)" opacity="0.65"/>
        ))}
        {/* South park */}
        <path
          d="M 156 600 C 148 572 166 556 190 550 C 212 544 232 558 228 582 C 224 606 206 620 184 618 C 162 616 160 620 156 600 Z"
          fill="var(--map-park)"
        />

        {/* ── Building fabric ────────────────────────── */}
        {/* Far west strip, above expressway */}
        <rect x="4"  y="8"   width="42" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="4"  y="98"  width="42" height="76"  rx="1" fill="var(--map-block)"/>
        {/* Near-west strip, above expressway */}
        <rect x="54" y="8"   width="26" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="84" y="8"   width="18" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="54" y="98"  width="48" height="76"  rx="1" fill="var(--map-block)"/>
        {/* Between DLF and Golf Course Rd, above expressway */}
        <rect x="108" y="8"  width="28" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="140" y="8"  width="26" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="108" y="98" width="58" height="76"  rx="1" fill="var(--map-block)"/>
        {/* East of Golf Course, above expressway */}
        <rect x="176" y="8"  width="60" height="84"  rx="1" fill="var(--map-block)"/>
        <rect x="240" y="8"  width="70" height="40"  rx="1" fill="var(--map-block)"/>
        <rect x="240" y="52" width="70" height="40"  rx="1" fill="var(--map-block)"/>
        <rect x="176" y="96" width="62" height="78"  rx="1" fill="var(--map-block)"/>
        <rect x="242" y="96" width="68" height="78"  rx="1" fill="var(--map-block)"/>
        {/* y=178–295 band */}
        <rect x="4"   y="186" width="42" height="104" rx="1" fill="var(--map-block)"/>
        <rect x="54"  y="186" width="46" height="50"  rx="1" fill="var(--map-block)"/>
        <rect x="54"  y="242" width="46" height="48"  rx="1" fill="var(--map-block)"/>
        <rect x="108" y="186" width="26" height="104" rx="1" fill="var(--map-block)"/>
        <rect x="138" y="186" width="26" height="50"  rx="1" fill="var(--map-block)"/>
        <rect x="138" y="242" width="26" height="48"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="186" width="56" height="50"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="186" width="52" height="50"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="240" width="56" height="48"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="240" width="52" height="48"  rx="1" fill="var(--map-block)"/>
        {/* y=295–428 band */}
        <rect x="4"   y="302" width="42" height="55"  rx="1" fill="var(--map-block)"/>
        <rect x="4"   y="364" width="42" height="58"  rx="1" fill="var(--map-block)"/>
        <rect x="54"  y="302" width="46" height="120" rx="1" fill="var(--map-block)"/>
        {/* Center-park area — fewer blocks */}
        <rect x="108" y="302" width="26" height="55"  rx="1" fill="var(--map-block)"/>
        <rect x="138" y="302" width="26" height="55"  rx="1" fill="var(--map-block)"/>
        <rect x="108" y="364" width="26" height="58"  rx="1" fill="var(--map-block)"/>
        <rect x="138" y="364" width="26" height="58"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="302" width="56" height="55"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="302" width="52" height="55"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="364" width="56" height="58"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="364" width="52" height="58"  rx="1" fill="var(--map-block)"/>
        {/* y=428–560 band */}
        <rect x="4"   y="436" width="42" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="4"   y="498" width="42" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="54"  y="436" width="46" height="118" rx="1" fill="var(--map-block)"/>
        <rect x="108" y="436" width="26" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="138" y="436" width="26" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="108" y="498" width="52" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="436" width="56" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="436" width="52" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="200" y="498" width="56" height="56"  rx="1" fill="var(--map-block)"/>
        <rect x="260" y="498" width="52" height="56"  rx="1" fill="var(--map-block)"/>
        {/* y=560–800 band */}
        {[568,642,718].map((y,i) => (
          [4,54,108,200,260].map((x,j) => (
            <rect key={`lb-${i}-${j}`} x={x} y={y} width={x<=54?42:x===108?52:56} height={70} rx="1" fill="var(--map-block)"/>
          ))
        ))}

        {/* ── Minor roads ─────────────────────────────── */}
        <line x1="0"   y1="248" x2="106" y2="246" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="0"   y1="360" x2="106" y2="358" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="0"   y1="500" x2="106" y2="498" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="0"   y1="643" x2="400" y2="640" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="0"   y1="720" x2="400" y2="718" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="78"  y1="178" x2="76"  y2="428" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="140" y1="178" x2="138" y2="295" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="228" y1="295" x2="232" y2="560" stroke="var(--map-road-min)" strokeWidth="3"/>
        <line x1="382" y1="285" x2="380" y2="560" stroke="var(--map-road-min)" strokeWidth="3"/>

        {/* ── Secondary roads ─────────────────────────── */}
        {/* E-W upper secondary — slight angle */}
        <path d="M 0 295 C 80 287 172 300 264 291 L 362 287 L 400 285"
          stroke="var(--map-road-sec)" strokeWidth="6.5" fill="none" strokeLinecap="butt"/>
        {/* E-W lower secondary */}
        <path d="M 0 560 C 105 552 218 566 320 557 L 400 553"
          stroke="var(--map-road-sec)" strokeWidth="6" fill="none" strokeLinecap="butt"/>
        {/* N-S east secondary */}
        <path d="M 320 0 C 318 90 316 220 318 385 C 320 500 322 640 322 800"
          stroke="var(--map-road-sec)" strokeWidth="6" fill="none" strokeLinecap="butt"/>
        {/* N-S far-west secondary */}
        <line x1="50" y1="0" x2="48" y2="430" stroke="var(--map-road-sec)" strokeWidth="6"/>
        {/* NE diagonal connector */}
        <path d="M 322 178 C 352 208 384 250 400 287"
          stroke="var(--map-road-sec)" strokeWidth="5.5" fill="none" strokeLinecap="butt"/>

        {/* ── Primary arterials ──────────────────────── */}
        {/* Sohna Road — slightly diagonal W→E */}
        <path d="M 0 428 C 92 416 188 436 285 421 C 344 412 378 420 400 414"
          stroke="var(--map-road-hwy)" strokeWidth="10" fill="none" strokeLinecap="butt"/>
        {/* DLF Avenue — near-straight N-S */}
        <path d="M 105 0 C 104 200 102 420 103 620 C 103 720 105 760 106 800"
          stroke="var(--map-road-hwy)" strokeWidth="10" fill="none" strokeLinecap="butt"/>
        {/* Golf Course Road — diagonal NW→SE */}
        <path d="M 168 0 C 172 92 184 224 200 344 C 216 464 234 604 256 800"
          stroke="var(--map-road-hwy)" strokeWidth="10" fill="none" strokeLinecap="butt"/>

        {/* ── Expressway — NH-48 ─────────────────────── */}
        <path d="M 0 178 C 68 168 148 185 232 174 C 312 163 372 180 400 173"
          stroke="var(--map-road-hwy2)" strokeWidth="14" fill="none" strokeLinecap="butt"/>
        {/* Center dash */}
        <path d="M 0 178 C 68 168 148 185 232 174 C 312 163 372 180 400 173"
          stroke="var(--map-dash)" strokeWidth="1.5" fill="none" strokeLinecap="butt"
          strokeDasharray="9 7" opacity="1"/>

        {/* ── Roundabouts at major intersections ─────── */}
        {/* NH-48 × Golf Course Rd */}
        <circle cx="173" cy="175" r="11" fill="var(--map-ground)" stroke="var(--map-road-hwy)" strokeWidth="5"/>
        {/* NH-48 × DLF Avenue */}
        <circle cx="104" cy="177" r="10" fill="var(--map-ground)" stroke="var(--map-road-hwy)" strokeWidth="5"/>

        {/* ── Road labels ────────────────────────────── */}
        <defs>
          <path id="hwy-text-path"
            d="M 24 178 C 68 168 148 185 232 174 C 312 163 372 180 376 173"/>
          <path id="gc-text-path"
            d="M 170 40 C 174 130 185 270 202 400"/>
          <path id="dlf-text-path"
            d="M 105 60 L 104 390"/>
          <path id="sohna-text-path"
            d="M 38 428 C 120 416 222 436 328 420"/>
        </defs>

        <text fontSize="8" fill="var(--map-label)" fontFamily="'Inter', system-ui, sans-serif"
          letterSpacing="0.6" fontWeight="500">
          <textPath href="#hwy-text-path" startOffset="18%">NH-48 · Dwarka Expressway</textPath>
        </text>
        <text fontSize="7" fill="var(--map-label-sm)" fontFamily="'Inter', system-ui, sans-serif"
          letterSpacing="0.4" fontWeight="400">
          <textPath href="#gc-text-path" startOffset="10%">Golf Course Rd</textPath>
        </text>
        <text fontSize="7" fill="var(--map-label-sm)" fontFamily="'Inter', system-ui, sans-serif"
          letterSpacing="0.4" fontWeight="400">
          <textPath href="#dlf-text-path" startOffset="18%">DLF Avenue</textPath>
        </text>
        <text fontSize="7" fill="var(--map-label-sm)" fontFamily="'Inter', system-ui, sans-serif"
          letterSpacing="0.4" fontWeight="400">
          <textPath href="#sohna-text-path" startOffset="12%">Sohna Road</textPath>
        </text>

        {/* Place labels */}
        <text x="92" y="318" fontSize="7.5" fill="var(--map-label-sm)"
          fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.6" fontWeight="500"
          textAnchor="middle" opacity="0.9">LEISURE VALLEY</text>

        <text x="200" y="238" fontSize="10.5" fill="var(--map-label)"
          fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.5" fontWeight="600"
          textAnchor="middle">Gurugram</text>

        <text x="130" y="232" fontSize="7.5" fill="var(--map-label-sm)"
          fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.3"
          textAnchor="middle" opacity="0.8">Sector 29</text>

        <text x="270" y="460" fontSize="7.5" fill="var(--map-label-sm)"
          fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.3"
          textAnchor="middle" opacity="0.7">DLF Phase 3</text>

        <text x="56" y="464" fontSize="7.5" fill="var(--map-label-sm)"
          fontFamily="'Inter', system-ui, sans-serif" letterSpacing="0.3"
          textAnchor="middle" opacity="0.75">Sector 55</text>

        {/* ── User location ──────────────────────────── */}
        {/* Accuracy ring */}
        <circle cx="208" cy="286" r="22" fill="var(--c-blue)" opacity="0.06"/>
        {/* Heading cone — clean filled triangle */}
        <polygon points="208,264 203,279 213,279"
          fill="var(--c-blue)" opacity="0.32"/>
        {/* White ring */}
        <circle cx="208" cy="286" r="7.5" fill="white" opacity="0.95"/>
        {/* Inner fill */}
        <circle cx="208" cy="286" r="5" fill="var(--c-blue)"/>
        {/* White center */}
        <circle cx="208" cy="286" r="1.8" fill="white"/>
      </svg>

      {/* ── Interactive DOM markers ── */}
      {mounted && REPORTS.map((r, i) => (
        <MapMarker
          key={r.id}
          report={r}
          selected={r.id === selectedId}
          onClick={() => onSelectReport(r.id === selectedId ? null : r)}
          index={i}
        />
      ))}
      {mounted && <ClusterMarker count={3} x={42} y={73}/>}
    </div>
  );
}
