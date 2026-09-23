/* THE3EYE Icon System
   — 20×20 viewBox, 1.5px stroke, round caps/joins, no fill
   — One coherent visual language across the entire app
*/

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const P = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function base(size: number, color: string, sw = 1.5) {
  return { width: size, height: size, viewBox: "0 0 20 20", stroke: color, strokeWidth: sw, ...P };
}

/* ── Category icons ── */

export function IconTrafficCheck({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Shield outline */}
    <path d="M10 2L3.5 4.5V9.5C3.5 13.2 6.3 16.7 10 17.8C13.7 16.7 16.5 13.2 16.5 9.5V4.5L10 2Z"/>
    {/* Checkmark inside */}
    <polyline points="7 10 9 12 13 8"/>
  </svg>;
}

export function IconCamera({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="2" y="5.5" width="16" height="11" rx="1.5"/>
    <circle cx="10" cy="11" r="3"/>
    <path d="M7 5.5l1.2-2h3.6l1.2 2"/>
    <circle cx="15.5" cy="8" r="0.75" fill={color}/>
  </svg>;
}

export function IconAccident({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Left car */}
    <rect x="1.5" y="8" width="6" height="4" rx="1"/>
    <path d="M1.5 9l1.5-2.5h3l1 2.5"/>
    <circle cx="3" cy="12" r="1"/>
    <circle cx="6" cy="12" r="1"/>
    {/* Right car (flipped) */}
    <rect x="12.5" y="8" width="6" height="4" rx="1"/>
    <path d="M18.5 9l-1.5-2.5h-3l-1 2.5"/>
    <circle cx="17" cy="12" r="1"/>
    <circle cx="14" cy="12" r="1"/>
    {/* Impact lines */}
    <line x1="9" y1="9.5" x2="11" y2="9.5"/>
    <line x1="9" y1="11" x2="11" y2="11"/>
  </svg>;
}

export function IconHazard({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Diamond (rotated square) — distinct from accident triangle */}
    <path d="M10 2L18 10L10 18L2 10Z"/>
    <line x1="10" y1="7" x2="10" y2="11.5"/>
    <circle cx="10" cy="13.5" r="0.75" fill={color}/>
  </svg>;
}

export function IconRoadwork({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Hard hat */}
    <path d="M4 10C4 7 6.7 4.5 10 4.5C13.3 4.5 16 7 16 10"/>
    <rect x="3" y="9.5" width="14" height="2" rx="0.5"/>
    {/* Shovel/pick handle */}
    <line x1="10" y1="14" x2="10" y2="17"/>
    <line x1="7.5" y1="17" x2="12.5" y2="17"/>
    {/* Stripes */}
    <line x1="7" y1="10" x2="7" y2="11.5"/>
    <line x1="10" y1="10" x2="10" y2="11.5"/>
    <line x1="13" y1="10" x2="13" y2="11.5"/>
  </svg>;
}

export function IconFlood({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Cloud with rain */}
    <path d="M5.5 8C5.5 5.5 7.5 3.5 10 3.5C12.2 3.5 14 5 14.3 7C15.3 7.1 16.5 7.9 16.5 9.5C16.5 11 15.3 12 14 12H6C4.3 12 3 10.8 3 9.2C3 7.8 4.1 6.7 5.5 6.6"/>
    {/* Wave / water */}
    <path d="M3 15C4.5 14 5.5 16 7 15C8.5 14 9.5 16 11 15C12.5 14 13.5 16 15 15C16.5 14 17.5 15.5 17.5 15.5" strokeLinecap="round"/>
  </svg>;
}

export function IconClosure({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Barrier posts */}
    <line x1="4" y1="9" x2="4" y2="16"/>
    <line x1="16" y1="9" x2="16" y2="16"/>
    {/* Barrier bar */}
    <rect x="3" y="7.5" width="14" height="3" rx="0.5"/>
    {/* Stripes on bar */}
    <line x1="7" y1="7.5" x2="9" y2="10.5"/>
    <line x1="11" y1="7.5" x2="13" y2="10.5"/>
    {/* Base plates */}
    <rect x="2.5" y="15.5" width="3" height="1.5" rx="0.4"/>
    <rect x="14.5" y="15.5" width="3" height="1.5" rx="0.4"/>
  </svg>;
}

export function IconTraffic({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Three cars queued */}
    <rect x="3" y="12.5" width="5" height="3.5" rx="0.8"/>
    <path d="M3 13.5l1-2h3l1 2"/>
    <rect x="9" y="10.5" width="5" height="3.5" rx="0.8"/>
    <path d="M9 11.5l1-2h3l1 2"/>
    {/* Slow indicator */}
    <path d="M4 8.5C4 7 5 5.5 7 5.5" strokeDasharray="1 1.2"/>
    <polyline points="6.5 4.5 7 5.5 8 5"/>
  </svg>;
}

/* ── Navigation / UI icons ── */

export function IconSearch({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="9" cy="9" r="5.5"/>
    <line x1="13" y1="13" x2="17.5" y2="17.5"/>
  </svg>;
}

export function IconReport({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <line x1="10" y1="3" x2="10" y2="17"/>
    <line x1="3" y1="10" x2="17" y2="10"/>
  </svg>;
}

export function IconLocation({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2C7.2 2 5 4.2 5 7C5 10.5 10 17 10 17C10 17 15 10.5 15 7C15 4.2 12.8 2 10 2Z"/>
    <circle cx="10" cy="7" r="2"/>
  </svg>;
}

export function IconRecenter({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="3"/>
    <line x1="10" y1="2" x2="10" y2="5"/>
    <line x1="10" y1="15" x2="10" y2="18"/>
    <line x1="2" y1="10" x2="5" y2="10"/>
    <line x1="15" y1="10" x2="18" y2="10"/>
  </svg>;
}

export function IconNavigation({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2L2.5 16.5L10 13.5L17.5 16.5L10 2Z"/>
  </svg>;
}

export function IconMap({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="2 5 2 18 7.5 15.5 13 18 18 15 18 2 12.5 4.5 7 2 2 5"/>
    <line x1="7" y1="2" x2="7" y2="15.5"/>
    <line x1="13" y1="4.5" x2="13" y2="18"/>
  </svg>;
}

export function IconProfile({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="7" r="3.5"/>
    <path d="M3 18C3 14.7 6.1 12 10 12C13.9 12 17 14.7 17 18"/>
  </svg>;
}

export function IconSettings({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="2.5"/>
    <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M14.5 5.5l1.4-1.4M4.1 15.9l1.4-1.4"/>
  </svg>;
}

export function IconVoice({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="7" y="2" width="6" height="9" rx="3"/>
    <path d="M4 10C4 13.3 6.7 16 10 16C13.3 16 16 13.3 16 10"/>
    <line x1="10" y1="16" x2="10" y2="19"/>
    <line x1="7" y1="19" x2="13" y2="19"/>
  </svg>;
}

export function IconBell({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2C10 2 6 4 6 9V13L4 15H16L14 13V9C14 4 10 2 10 2Z"/>
    <path d="M8.5 15C8.5 15.8 9.2 16.5 10 16.5C10.8 16.5 11.5 15.8 11.5 15"/>
  </svg>;
}

export function IconTrust({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2L3 4.5V10C3 13.9 6.1 17.4 10 18.5C13.9 17.4 17 13.9 17 10V4.5L10 2Z"/>
  </svg>;
}

export function IconCheck({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polyline points="3.5 10.5 8 15 16.5 6"/>
  </svg>;
}

export function IconClose({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <line x1="5" y1="5" x2="15" y2="15"/>
    <line x1="15" y1="5" x2="5" y2="15"/>
  </svg>;
}

export function IconBack({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polyline points="13 5 7 10 13 15"/>
  </svg>;
}

export function IconVehicle({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="2" y="7" width="16" height="7" rx="1.5"/>
    <path d="M2 9l2.5-4h11l2.5 4"/>
    <circle cx="5.5" cy="14" r="2"/>
    <circle cx="14.5" cy="14" r="2"/>
    <line x1="7.5" y1="14" x2="12.5" y2="14"/>
  </svg>;
}

export function IconStar({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="10 2 12.4 7.5 18 8.2 13.8 12.2 15 18 10 15 5 18 6.2 12.2 2 8.2 7.6 7.5"/>
  </svg>;
}

export function IconClock({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="7.5"/>
    <polyline points="10 5.5 10 10 13 12.5"/>
  </svg>;
}

export function IconRoute({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="5" cy="4.5" r="2"/>
    <circle cx="15" cy="15.5" r="2"/>
    <path d="M5 6.5V10C5 11.1 5.9 12 7 12H13C14.1 12 15 12.9 15 14"/>
  </svg>;
}

export function IconShield({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2L3.5 4.5V9.5C3.5 13.2 6.3 16.7 10 17.8C13.7 16.7 16.5 13.2 16.5 9.5V4.5L10 2Z"/>
  </svg>;
}

export function IconLayers({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="10 2 18.5 6.5 10 11 1.5 6.5"/>
    <polyline points="1.5 11 10 15.5 18.5 11"/>
    <polyline points="1.5 15.5 10 20 18.5 15.5"/>
  </svg>;
}

export function IconCompass({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="8"/>
    <polygon points="10 4.5 11.8 9 10 8 8.2 9"/>
    <polygon points="10 15.5 8.2 11 10 12 11.8 11"/>
  </svg>;
}

export function IconInfo({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="8"/>
    <line x1="10" y1="9" x2="10" y2="14"/>
    <circle cx="10" cy="6.5" r="0.75" fill={color}/>
  </svg>;
}

export function IconPrivacy({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="4" y="9" width="12" height="9" rx="1.5"/>
    <path d="M7 9V6.5C7 4.6 8.3 3 10 3C11.7 3 13 4.6 13 6.5V9"/>
    <circle cx="10" cy="14" r="1.5"/>
  </svg>;
}

export function IconDrive({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="7.5"/>
    <circle cx="10" cy="10" r="3"/>
    <line x1="10" y1="2.5" x2="10" y2="4"/>
  </svg>;
}

export function IconHistory({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polyline points="2 10 2 4 8 4"/>
    <path d="M2 4C5.3 1 10 0.5 14 2.5C18.5 4.8 20 10.5 17.5 15C15 19.5 9 21 4.5 18.5"/>
    <polyline points="10 6 10 11 13 13.5"/>
  </svg>;
}

/* ── Extended navigation & system icons ── */

export function IconMicrophone({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="7" y="2" width="6" height="9" rx="3"/>
    <path d="M4 10c0 3.3 2.7 6 6 6s6-2.7 6-6"/>
    <line x1="10" y1="16" x2="10" y2="19"/>
    <line x1="7.5" y1="19" x2="12.5" y2="19"/>
  </svg>;
}

export function IconSpeaker({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="2 7.5 6 7.5 10.5 3.5 10.5 16.5 6 12.5 2 12.5"/>
    <path d="M13 7.5a4.5 4.5 0 0 1 0 5"/>
    <path d="M15.5 5a8 8 0 0 1 0 10"/>
  </svg>;
}

export function IconVolumeMuted({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="2 7.5 6 7.5 10.5 3.5 10.5 16.5 6 12.5 2 12.5"/>
    <line x1="14" y1="7" x2="19" y2="13"/>
    <line x1="19" y1="7" x2="14" y2="13"/>
  </svg>;
}

export function IconMenu({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <line x1="3" y1="6" x2="17" y2="6"/>
    <line x1="3" y1="10" x2="17" y2="10"/>
    <line x1="3" y1="14" x2="17" y2="14"/>
  </svg>;
}

export function IconMoreHoriz({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="5" cy="10" r="1.25" fill={color} stroke="none"/>
    <circle cx="10" cy="10" r="1.25" fill={color} stroke="none"/>
    <circle cx="15" cy="10" r="1.25" fill={color} stroke="none"/>
  </svg>;
}

export function IconMoreVert({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="5" r="1.25" fill={color} stroke="none"/>
    <circle cx="10" cy="10" r="1.25" fill={color} stroke="none"/>
    <circle cx="10" cy="15" r="1.25" fill={color} stroke="none"/>
  </svg>;
}

export function IconForward({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polyline points="7 5 13 10 7 15"/>
  </svg>;
}

export function IconShare({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M3.5 13v3.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V13"/>
    <polyline points="6.5 6 10 2.5 13.5 6"/>
    <line x1="10" y1="2.5" x2="10" y2="13"/>
  </svg>;
}

export function IconPause({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="4" y="4" width="4" height="12" rx="1"/>
    <rect x="12" y="4" width="4" height="12" rx="1"/>
  </svg>;
}

export function IconPlay({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polygon points="5 3 17 10 5 17"/>
  </svg>;
}

export function IconEdit({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M14.5 2.5a2.12 2.12 0 0 1 3 3L6 17l-4 1 1-4L14.5 2.5z"/>
    <line x1="12" y1="5" x2="15" y2="8"/>
  </svg>;
}

export function IconDelete({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <polyline points="2.5 5.5 5 5.5 17.5 5.5"/>
    <path d="M16 5.5L15 17a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L4 5.5"/>
    <path d="M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5"/>
    <line x1="8" y1="9.5" x2="8" y2="14.5"/>
    <line x1="12" y1="9.5" x2="12" y2="14.5"/>
  </svg>;
}

export function IconWarning({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M9.1 3.4L1.9 16a1 1 0 0 0 .9 1.5h14.4a1 1 0 0 0 .9-1.5L10.9 3.4a1 1 0 0 0-1.8 0z"/>
    <line x1="10" y1="8" x2="10" y2="12"/>
    <circle cx="10" cy="14.5" r="0.7" fill={color}/>
  </svg>;
}

export function IconHelp({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="8"/>
    <path d="M7.5 7.5a2.5 2.5 0 0 1 4.8.8c0 1.7-2.5 2.5-2.5 2.5"/>
    <circle cx="10" cy="14.5" r="0.75" fill={color}/>
  </svg>;
}

export function IconCurrentPosition({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="3" fill={color} stroke="none"/>
    <circle cx="10" cy="10" r="7" strokeOpacity="0.3"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="10" y1="16" x2="10" y2="19"/>
    <line x1="1" y1="10" x2="4" y2="10"/>
    <line x1="16" y1="10" x2="19" y2="10"/>
  </svg>;
}

export function IconNotification({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 2a6 6 0 0 1 6 6v4.5l1.5 2H2.5L4 12.5V8a6 6 0 0 1 6-6z"/>
    <path d="M8 16.5a2 2 0 0 0 4 0"/>
    <circle cx="14" cy="4" r="2.5" fill="var(--c-red)" stroke="var(--bg)" strokeWidth="1"/>
  </svg>;
}

/* ── Road intelligence extended ── */

export function IconPothole({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M3 14C4 11.5 7.5 10 10 10C12.5 10 16 11.5 17 14"/>
    <ellipse cx="10" cy="14.5" rx="5" ry="2.5"/>
    <path d="M5 10L6 6.5M10 9V5.5M15 10L14 6.5"/>
    <path d="M5.5 6L7 4.5H13L14.5 6"/>
  </svg>;
}

export function IconCongestion({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Grid of cars — congested look */}
    <rect x="2" y="3" width="4.5" height="3" rx="0.8"/>
    <rect x="8" y="3" width="4.5" height="3" rx="0.8"/>
    <rect x="13.5" y="3" width="4.5" height="3" rx="0.8"/>
    <rect x="2" y="8.5" width="4.5" height="3" rx="0.8"/>
    <rect x="8" y="8.5" width="4.5" height="3" rx="0.8"/>
    <rect x="13.5" y="8.5" width="4.5" height="3" rx="0.8"/>
    <path d="M3 14.5h14" strokeDasharray="2 2"/>
  </svg>;
}

export function IconSignal({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Traffic signal housing */}
    <rect x="6.5" y="2" width="7" height="11.5" rx="2"/>
    <circle cx="10" cy="4.8" r="1"/>
    <circle cx="10" cy="7.8" r="1"/>
    <circle cx="10" cy="10.8" r="1"/>
    <line x1="10" y1="13.5" x2="10" y2="18"/>
  </svg>;
}

export function IconSignalBroken({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="6.5" y="2" width="7" height="11.5" rx="2"/>
    <circle cx="10" cy="4.8" r="1"/>
    <circle cx="10" cy="7.8" r="1"/>
    <circle cx="10" cy="10.8" r="1"/>
    <line x1="10" y1="13.5" x2="10" y2="18"/>
    {/* Fault slash */}
    <line x1="3.5" y1="2.5" x2="16.5" y2="13"/>
  </svg>;
}

export function IconDebris({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Scattered objects over a road line */}
    <path d="M6 14l2-3.5 2 3.5z"/>
    <path d="M11 14l1.5-2.5 1.5 2.5z"/>
    <line x1="3" y1="15.5" x2="17" y2="15.5" strokeDasharray="2.2 2"/>
    <line x1="5" y1="8" x2="6.5" y2="9"/>
  </svg>;
}

export function IconBreakdown({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Stalled car + warning */}
    <rect x="2" y="9" width="11" height="4" rx="1"/>
    <path d="M2.5 9.5L4 7h6l1.5 2.5"/>
    <circle cx="5" cy="13" r="1"/>
    <circle cx="10.5" cy="13" r="1"/>
    <line x1="16" y1="4.5" x2="16" y2="9"/>
    <circle cx="16" cy="11" r="0.6" fill={color}/>
  </svg>;
}

export function IconWrongWay({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Opposing direction arrows */}
    <line x1="6.5" y1="16" x2="6.5" y2="5"/>
    <polyline points="4 7.5 6.5 5 9 7.5"/>
    <line x1="13.5" y1="4" x2="13.5" y2="15"/>
    <polyline points="11 12.5 13.5 15 16 12.5"/>
  </svg>;
}

export function IconLaneBlocked({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Lane dividers with a blocked lane */}
    <line x1="5" y1="2.5" x2="5" y2="17.5" strokeDasharray="3 2.2"/>
    <line x1="13" y1="2.5" x2="13" y2="17.5" strokeDasharray="3 2.2"/>
    <line x1="8.5" y1="7" x2="17" y2="13"/>
    <line x1="17" y1="7" x2="8.5" y2="13"/>
  </svg>;
}

export function IconConstruction({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Traffic cone */}
    <path d="M8.7 4h2.6l3.2 12.5H5.5z"/>
    <line x1="7.4" y1="10" x2="12.6" y2="10"/>
    <line x1="6.6" y1="13" x2="13.4" y2="13"/>
    <line x1="3.5" y1="16.5" x2="16.5" y2="16.5"/>
  </svg>;
}

export function IconWaterlogging({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Rising water level */}
    <path d="M3 12c1.5-1 2.5 1 4 0s2.5 1 4 0 2.5 1 4 0 1.5 0.5 1.5 0.5"/>
    <path d="M3 15.5c1.5-1 2.5 1 4 0s2.5 1 4 0 2.5 1 4 0 1.5 0.5 1.5 0.5"/>
    <line x1="10" y1="3" x2="10" y2="8.5"/>
    <polyline points="7.5 6 10 8.5 12.5 6"/>
  </svg>;
}

export function IconVisibility({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Fog bands */}
    <line x1="3" y1="6" x2="15" y2="6"/>
    <line x1="6" y1="9" x2="17" y2="9"/>
    <line x1="3" y1="12" x2="14" y2="12"/>
    <line x1="6.5" y1="15" x2="16" y2="15"/>
  </svg>;
}

export function IconStreetlight({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Lamp post, out */}
    <line x1="6.5" y1="17.5" x2="6.5" y2="8"/>
    <path d="M6.5 8c0-2 1.4-3.5 3.3-3.5S13 6 13 8z"/>
    <line x1="4.5" y1="17.5" x2="8.5" y2="17.5"/>
    <line x1="11.5" y1="11.5" x2="16" y2="14.5"/>
  </svg>;
}

export function IconOther({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="7.5"/>
    <circle cx="6.5" cy="10" r="0.7" fill={color}/>
    <circle cx="10" cy="10" r="0.7" fill={color}/>
    <circle cx="13.5" cy="10" r="0.7" fill={color}/>
  </svg>;
}

/* ── Vehicle icons (top-down silhouettes, optimised for map markers) ── */

export function IconCar({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Body */}
    <path d="M5.5 8C5.5 8 6.8 4.5 10 4.5C13.2 4.5 14.5 8 14.5 8V14.5C14.5 15.3 13.8 16 13 16H7C6.2 16 5.5 15.3 5.5 14.5V8Z"/>
    {/* Windscreen cutout feel — inner window */}
    <path d="M7 8.5L7.8 6H12.2L13 8.5H7Z" strokeWidth="1" fill={color} fillOpacity="0.15"/>
    {/* Wheel arches */}
    <rect x="4.5" y="12" width="2.5" height="2" rx="0.6"/>
    <rect x="13" y="12" width="2.5" height="2" rx="0.6"/>
  </svg>;
}

export function IconScooter({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Long narrow body */}
    <path d="M8.5 3C8.5 3 8 4 8 6.5V14.5C8 16 9 17 10 17C11 17 12 16 12 14.5V6.5C12 4 11.5 3 11.5 3H8.5Z"/>
    {/* Handlebar */}
    <path d="M7 6H13" strokeWidth="1.8"/>
    {/* Seat area */}
    <path d="M8 11H12" strokeWidth="1"/>
    {/* Footrest */}
    <path d="M6.5 14H8.5M11.5 14H13.5"/>
  </svg>;
}

export function IconMotorcycle({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Body — elongated, narrower than car */}
    <path d="M9 4C9 4 8.5 5.5 8.5 8.5V13.5C8.5 15 9.2 16 10 16C10.8 16 11.5 15 11.5 13.5V8.5C11.5 5.5 11 4 11 4H9Z"/>
    {/* Handlebars — spread out */}
    <path d="M5.5 7L9 7.5M11 7.5L14.5 7"/>
    {/* Engine/tank area */}
    <rect x="8.5" y="9" width="3" height="3" rx="0.5" fill={color} fillOpacity="0.2"/>
  </svg>;
}

export function IconBicycle({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    {/* Two wheels visible from above */}
    <circle cx="5.5" cy="12" r="3"/>
    <circle cx="14.5" cy="12" r="3"/>
    {/* Frame */}
    <path d="M5.5 12L10 6L14.5 12"/>
    <line x1="10" y1="6" x2="10" y2="12"/>
    {/* Handlebars */}
    <path d="M8 7H12"/>
    {/* Seat */}
    <path d="M9.5 5H11.5"/>
  </svg>;
}

/* ── Destination / search category icons ── */

export function IconSaved({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M4 2.5h12a1 1 0 0 1 1 1v15l-7-4-7 4v-15a1 1 0 0 1 1-1z"/>
  </svg>;
}

export function IconHome({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M2 9L10 2.5L18 9V18.5H13V14h-6v4.5H2V9z"/>
  </svg>;
}

export function IconWork({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="2" y="7.5" width="16" height="10" rx="1.5"/>
    <path d="M7 7.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5"/>
    <line x1="2" y1="12" x2="18" y2="12"/>
  </svg>;
}

export function IconRecent({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="7.5"/>
    <polyline points="10 6 10 10.5 13 12.5"/>
    <polyline points="2.5 10 2 8 4 9"/>
  </svg>;
}

export function IconFuel({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M3.5 18V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v14"/>
    <line x1="3.5" y1="18" x2="12.5" y2="18"/>
    <line x1="7.5" y1="7" x2="7.5" y2="11"/>
    <line x1="5.5" y1="9" x2="9.5" y2="9"/>
    <path d="M12.5 4.5h1.5a1 1 0 0 1 1 1V10a1 1 0 0 0 1 1v0a1 1 0 0 0 1-1V6.5L15 4.5"/>
  </svg>;
}

export function IconFood({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <line x1="5" y1="2" x2="5" y2="18"/>
    <path d="M3 2v7a2 2 0 0 0 4 0V2"/>
    <line x1="15" y1="2" x2="15" y2="18"/>
    <path d="M12.5 2C12.5 2 12.5 7 15 9C17.5 7 17.5 2 17.5 2"/>
  </svg>;
}

export function IconParking({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="3" y="3" width="14" height="14" rx="2"/>
    <path d="M8 15V7h4a2.5 2.5 0 0 1 0 5H8"/>
  </svg>;
}

export function IconGroceries({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M1.5 1.5h3l1.8 9.5a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L19 6H5"/>
    <circle cx="8" cy="17" r="1.5"/>
    <circle cx="14" cy="17" r="1.5"/>
  </svg>;
}

export function IconCoffee({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M3 8h11v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
    <path d="M14 9h1.5a2.5 2.5 0 0 1 0 5H14"/>
    <path d="M7 5.5C7 5.5 7 4 8 3"/>
    <path d="M10 5.5C10 5.5 10 4 11 3"/>
  </svg>;
}

export function IconShopping({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M4.5 3.5h11l1.5 12a1 1 0 0 1-1 1.2H4a1 1 0 0 1-1-1.2L4.5 3.5z"/>
    <path d="M7.5 3.5V6a2.5 2.5 0 0 0 5 0V3.5"/>
  </svg>;
}

export function IconPharmacy({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="8" y="2" width="4" height="16" rx="1"/>
    <rect x="2" y="8" width="16" height="4" rx="1"/>
  </svg>;
}

export function IconEVCharge({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <circle cx="10" cy="10" r="7.5"/>
    <path d="M12 3 L7 11H10.5L8 17L15 9H11.5Z" fill={color} fillOpacity="0.2"/>
    <polyline points="12 3 7 11 10.5 11 8 17 15 9 11.5 9" strokeWidth="1.4"/>
  </svg>;
}

export function IconHospital({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <rect x="3" y="3" width="14" height="14" rx="1.5"/>
    <line x1="10" y1="7" x2="10" y2="13"/>
    <line x1="7" y1="10" x2="13" y2="10"/>
  </svg>;
}

export function IconHotel({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <line x1="2.5" y1="3.5" x2="2.5" y2="18"/>
    <line x1="2.5" y1="11" x2="18" y2="11"/>
    <rect x="9" y="6.5" width="8.5" height="4.5" rx="1"/>
    <circle cx="12" cy="8.5" r="1.5"/>
    <line x1="9" y1="18" x2="18" y2="18"/>
    <line x1="9" y1="11" x2="9" y2="18"/>
    <line x1="18" y1="11" x2="18" y2="18"/>
  </svg>;
}

export function IconPark({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M10 17V10"/>
    <path d="M4 14L10 7L16 14H4Z"/>
    <path d="M6.5 10.5L10 4L13.5 10.5H6.5Z"/>
    <line x1="7" y1="17" x2="13" y2="17"/>
  </svg>;
}

export function IconCrisis({ size = 20, color = "currentColor" }: IconProps) {
  return <svg {...base(size, color)}>
    <path d="M9.1 2.9L1.4 16A1 1 0 0 0 2.3 17.5H17.7A1 1 0 0 0 18.6 16L10.9 2.9a1 1 0 0 0-1.8 0Z" strokeWidth="1.6"/>
    <path d="M10 8L10 11.5" strokeWidth="2"/>
    <circle cx="10" cy="14" r="0.8" fill={color}/>
  </svg>;
}

/* ── Category color map — semantic, NOT brand colours */
export const CATEGORY_COLORS: Record<string, string> = {
  traffic:    "var(--c-red)",
  camera:     "var(--c-blue)",
  accident:   "var(--c-purple)",
  hazard:     "var(--c-amber)",
  roadwork:   "var(--c-yellow)",
  flood:      "var(--c-cyan)",
  closure:    "var(--c-dark)",
  congestion: "var(--c-amber)",
  /* expanded categories */
  pothole:       "var(--c-amber)",
  signal:        "var(--c-yellow)",
  signal_broken: "var(--c-red)",
  debris:        "var(--c-amber)",
  breakdown:     "var(--c-amber)",
  wrongway:      "var(--c-red)",
  lane:          "var(--c-amber)",
  construction:  "var(--c-yellow)",
  waterlogging:  "var(--c-cyan)",
  visibility:    "var(--c-dark)",
  streetlight:   "var(--c-amber)",
  other:         "var(--c-dark)",
};

export const CATEGORY_NAMES: Record<string, string> = {
  traffic:  "Traffic checking",
  camera:   "Speed camera",
  accident: "Accident",
  hazard:   "Road hazard",
  roadwork: "Roadwork",
  flood:    "Flooding",
  closure:  "Road closed",
  congestion: "Heavy traffic",
  /* expanded categories */
  pothole:       "Pothole",
  signal:        "Traffic signal",
  signal_broken: "Broken signal",
  debris:        "Debris on road",
  breakdown:     "Breakdown",
  wrongway:      "Wrong-way driver",
  lane:          "Lane blocked",
  construction:  "Construction",
  waterlogging:  "Waterlogging",
  visibility:    "Poor visibility",
  streetlight:   "Streetlight out",
  other:         "Other",
};

/* Returns the right icon component for a category */
export function CategoryIcon({ type, size = 16, color = "currentColor" }: {
  type: string; size?: number; color?: string;
}) {
  const props = { size, color };
  switch(type) {
    case "traffic":    return <IconTrafficCheck {...props}/>;
    case "camera":     return <IconCamera {...props}/>;
    case "accident":   return <IconAccident {...props}/>;
    case "hazard":     return <IconHazard {...props}/>;
    case "roadwork":   return <IconRoadwork {...props}/>;
    case "flood":      return <IconFlood {...props}/>;
    case "closure":    return <IconClosure {...props}/>;
    case "congestion": return <IconTraffic {...props}/>;
    case "pothole":       return <IconPothole {...props}/>;
    case "signal":        return <IconSignal {...props}/>;
    case "signal_broken": return <IconSignalBroken {...props}/>;
    case "debris":        return <IconDebris {...props}/>;
    case "breakdown":     return <IconBreakdown {...props}/>;
    case "wrongway":      return <IconWrongWay {...props}/>;
    case "lane":          return <IconLaneBlocked {...props}/>;
    case "construction":  return <IconConstruction {...props}/>;
    case "waterlogging":  return <IconWaterlogging {...props}/>;
    case "visibility":    return <IconVisibility {...props}/>;
    case "streetlight":   return <IconStreetlight {...props}/>;
    case "other":         return <IconOther {...props}/>;
    default:           return <IconHazard {...props}/>;
  }
}
