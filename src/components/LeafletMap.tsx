import { useEffect, useRef } from "react";
import type { Map as LMap, Marker, TileLayer } from "leaflet";

export interface ReportPin {
  id: string;
  lat: number;
  lng: number;
  type: string;
  label: string;
  distance: string;
}

interface Props {
  reports?: ReportPin[];
  routeCoords?: [number, number][];
  vehicleColor?: string;
  vehicle?: string;
  onSelectReport?: (id: string | null) => void;
  showRoute?: boolean;
  center?: [number, number];
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  theme?: string;
  destination?: [number, number];
  destinationLabel?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  traffic:    "#E04545",
  camera:     "#2E72F0",
  accident:   "#6E54CC",
  hazard:     "#C97D0A",
  roadwork:   "#B89910",
  flood:      "#00B8D4",
  closure:    "#2D3340",
  congestion: "#E04545",
};

const COLOR_MAP: Record<string, string> = {
  black: "#1A1A1A", white: "#E8EAED", silver: "#8A9BB0", grey: "#5A6570",
  blue: "#2E72F0",  red: "#D94040",   green: "#19D88A",  yellow: "#D4A000",
};

/* Marker SVG factory */
function reportSvg(type: string): string {
  const c = CATEGORY_COLORS[type] ?? "#19D88A";
  const icons: Record<string, string> = {
    traffic:    `<circle cx="12" cy="12" r="4" fill="white"/><circle cx="12" cy="6" r="2.5" fill="white" opacity=".6"/>`,
    camera:     `<rect x="7" y="9" width="10" height="7" rx="1.5" fill="white"/><circle cx="16.5" cy="8" r="1.5" fill="white" opacity=".7"/>`,
    accident:   `<path d="M12 7l1.5 4h3.5l-2.8 2 1.1 3.5L12 14.5l-3.3 2 1.1-3.5L7 11h3.5z" fill="white"/>`,
    hazard:     `<path d="M12 7l5 8.5H7z" fill="white" opacity=".9"/><rect x="11.3" y="10" width="1.4" height="3" rx=".7" fill="${c}"/><circle cx="12" cy="14.5" r=".8" fill="${c}"/>`,
    roadwork:   `<rect x="7" y="11" width="10" height="2" fill="white"/><rect x="9" y="8" width="6" height="1.5" fill="white" opacity=".6"/>`,
    flood:      `<path d="M8 13 Q10 11 12 13 Q14 15 16 13" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>`,
    closure:    `<line x1="8" y1="8" x2="16" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/><line x1="16" y1="8" x2="8" y2="16" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>`,
    congestion: `<circle cx="12" cy="12" r="4" fill="white"/><circle cx="12" cy="6" r="2.5" fill="white" opacity=".6"/>`,
  };
  const inner = icons[type] ?? `<circle cx="12" cy="12" r="4" fill="white"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="${c}"/>${inner}</svg>`;
}

function vehicleSvg(vehicle: string, color: string): string {
  const c = COLOR_MAP[color] ?? "#2E72F0";
  if (vehicle === "bicycle") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="${c}20"/><circle cx="18" cy="18" r="10" fill="${c}" stroke="white" strokeWidth="2"/><path d="M14 18l4-5 4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>`;
  }
  if (vehicle === "scooter" || vehicle === "moto") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="${c}20"/><ellipse cx="18" cy="18" rx="6" ry="8" fill="${c}" stroke="white" strokeWidth="2"/><path d="M18 10 L20 18 L18 15.5 L16 18 Z" fill="white"/></svg>`;
  }
  /* car top-down */
  return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="18" fill="${c}20"/><rect x="12" y="9" width="12" height="18" rx="4" fill="${c}" stroke="white" strokeWidth="1.5"/><rect x="14" y="11" width="8" height="5" rx="1.5" fill="white" opacity="0.5"/><path d="M18 10 L21 18 L18 15 L15 18 Z" fill="white" opacity=".9"/></svg>`;
}

export default function LeafletMap({
  reports = [],
  routeCoords,
  vehicleColor = "blue",
  vehicle = "car",
  onSelectReport,
  showRoute = false,
  center,
  zoom = 14,
  className = "",
  style,
  theme,
  destination,
  destinationLabel,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<LMap | null>(null);
  const tileRef      = useRef<TileLayer | null>(null);
  const routeRef     = useRef<any>(null);
  const markerRefs   = useRef<Marker[]>([]);
  const vehicleRef   = useRef<Marker | null>(null);
  const destRef      = useRef<Marker | null>(null);
  const userCenter   = center ?? [28.4595, 77.0266]; /* Gurugram default */

  /* Init map once */
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    /* Capture container ref so the async callback can check it's still valid */
    const container = containerRef.current;

    import("leaflet").then(({ default: L }) => {
      /* Guard: component may have unmounted while the import was in-flight */
      if (!container || mapRef.current) return;
      /* Guard: Leaflet marks the DOM node with _leaflet_id on first init;
         clear it so StrictMode's double-invoke doesn't throw. */
      (container as any)._leaflet_id = undefined;

      /* Fix asset paths */
      (L.Icon.Default.prototype as any)._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "",
      });

      const isDark = (theme ?? "night") !== "signal";
      const tileUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      const map = L.map(container, {
        center: userCenter,
        zoom,
        zoomControl: false,
        attributionControl: false,
      });

      const tile = L.tileLayer(tileUrl, {
        maxZoom: 20,
        attribution: "© OpenStreetMap © CARTO",
      }).addTo(map);

      tileRef.current = tile;
      mapRef.current  = map;

      /* User location dot */
      const userIcon = L.divIcon({
        className: "",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        html: vehicleSvg(vehicle, vehicleColor),
      });
      L.marker(userCenter, { icon: userIcon }).addTo(map);

      /* Destination */
      if (destination) {
        const destIcon = L.divIcon({
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#19D88A"/><circle cx="14" cy="14" r="6" fill="white"/></svg>`,
        });
        const m = L.marker(destination, { icon: destIcon }).addTo(map);
        if (destinationLabel) m.bindTooltip(destinationLabel, { permanent: false, direction: "top" });
        destRef.current = m;
      }

      /* Route polyline */
      if (showRoute && routeCoords && routeCoords.length > 1) {
        const col = COLOR_MAP[vehicleColor] ?? "#2E72F0";
        const rl = L.polyline(routeCoords, { color: col, weight: 5, opacity: 0.85 }).addTo(map);
        routeRef.current = rl;
        map.fitBounds(rl.getBounds(), { padding: [48, 48] });
      }

      /* Report markers */
      reports.forEach(rep => {
        const icon = L.divIcon({
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          html: reportSvg(rep.type),
        });
        const m = L.marker([rep.lat, rep.lng], { icon }).addTo(map);
        m.on("click", () => onSelectReport?.(rep.id));
        markerRefs.current.push(m);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      /* Clear Leaflet's DOM marker so StrictMode re-init doesn't throw */
      if (container) (container as any)._leaflet_id = undefined;
    };
  }, []); // eslint-disable-line

  /* Update tile on theme change */
  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    import("leaflet").then(({ default: L }) => {
      const isDark = (theme ?? "night") !== "signal";
      const url = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
      tileRef.current?.setUrl(url);
    });
  }, [theme]);

  return (
    <div className={className} style={{ isolation: "isolate", overflow: "hidden", ...style }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
