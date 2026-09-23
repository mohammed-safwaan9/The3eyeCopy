import { useState } from "react";
import logo from "../imports/image.png";
import { IconBack, IconCheck } from "../components/Icons";

interface Props {
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({ onNavigate }: Props) {
  const [mode, setMode] = useState<"social" | "email">("social");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const go = (delay = 1100) => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onNavigate("home"); }, delay);
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(160deg, #0878FF12 0%, #00C9E808 50%, transparent 80%)",
      }}/>
      <div className="absolute pointer-events-none" style={{
        top: "-15%", right: "-15%",
        width: 260, height: 260, borderRadius: "50%",
        background: "radial-gradient(circle, #0878FF15 0%, transparent 70%)",
      }}/>

      <div className="flex-1 flex flex-col justify-center px-6 pt-16 pb-4 overflow-y-auto no-scroll relative">

        {/* Logo mark + wordmark */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: "radial-gradient(circle, #0878FF20 0%, transparent 70%)",
              transform: "scale(1.8)",
            }}/>
            <img
              src={logo}
              alt="The3eye"
              style={{ width: 72, height: 72, borderRadius: 18, display: "block", position: "relative" }}
            />
          </div>
          <div className="text-center">
            <p
              className="brand-text-gradient"
              style={{ font: "700 20px/1 'Inter', system-ui, sans-serif", letterSpacing: "0.05em" }}
            >
              THE3EYE
            </p>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginTop: 4 }}>
              Drive with less noise.
            </p>
          </div>
        </div>

        {mode === "social" ? (
          <div className="flex flex-col gap-3">
            <SocialBtn icon={<GoogleSVG />} label="Continue with Google" onClick={() => go()} />
            <SocialBtn icon={<AppleSVG />}  label="Continue with Apple"  onClick={() => go()} />
            <SocialBtn icon={<SamsungSVG/>} label="Continue with Samsung" onClick={() => go()} />

            <Divider />

            <button
              onClick={() => setMode("email")}
              className="pressable w-full py-3.5 rounded-xl"
              style={{
                font: "var(--text-heading)",
                color: "var(--fg)",
                background: "var(--bg-subtle)",
              }}
            >
              Continue with email
            </button>

            <button
              onClick={() => onNavigate("home")}
              className="pressable text-center py-3"
              style={{ font: "var(--text-label)", color: "var(--fg-3)" }}
            >
              Explore without account
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 anim-up">
            <button
              onClick={() => setMode("social")}
              className="pressable flex items-center gap-2 mb-1"
              style={{ font: "var(--text-label)", color: "var(--fg-3)" }}
            >
              <IconBack size={15} color="var(--fg-3)" />
              Back
            </button>

            <Field label="Email"    type="email"    value={email} onChange={setEmail} placeholder="you@example.com" />
            <Field label="Password" type="password" value={pw}    onChange={setPw}    placeholder="••••••••" />

            <button
              onClick={() => go()}
              disabled={loading || !email}
              className="pressable w-full py-4 rounded-xl mt-1"
              style={{
                font: "600 15px/1 'Inter', system-ui, sans-serif",
                color: email ? "white" : "var(--fg-3)",
                background: email ? "var(--brand-green)" : "var(--bg-subtle)",
                transition: "background 0.18s, color 0.18s",
              }}
            >
              {loading ? <Spinner color="white" /> : "Sign in"}
            </button>

            <button className="pressable text-center py-1" style={{ font: "var(--text-label)", color: "var(--fg-3)" }}>
              Forgot password?
            </button>

            <Divider />

            <button
              onClick={() => onNavigate("signup")}
              className="pressable w-full py-3.5 rounded-xl"
              style={{ font: "var(--text-heading)", color: "var(--fg)", background: "var(--bg-subtle)" }}
            >
              Create account
            </button>
          </div>
        )}
      </div>

      <p className="text-center px-8 pb-8" style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>
        By continuing you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label style={{
        display: "block", marginBottom: 6,
        font: "var(--text-caption)", color: "var(--fg-3)",
        textTransform: "uppercase", letterSpacing: "0.07em",
      }}>
        {label}
      </label>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "12px 14px",
          borderRadius: "var(--r-md)",
          background: "var(--bg-input)", color: "var(--fg)",
          border: "1px solid var(--border)",
          font: "var(--text-body)", outline: "none",
        }}
      />
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      <span style={{ font: "var(--text-caption)", color: "var(--fg-3)" }}>or</span>
      <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}

function SocialBtn({ icon, label, onClick }: {
  icon: React.ReactNode; label: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="pressable w-full py-3.5 rounded-xl flex items-center justify-center gap-3"
      style={{
        font: "var(--text-heading)",
        background: "var(--bg-surface)",
        color: "var(--fg)",
        border: "1px solid var(--border-2)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

export function Spinner({ color = "var(--fg-3)" }: { color?: string }) {
  return (
    <span className="flex items-center justify-center gap-2">
      <span
        className="anim-spin inline-block"
        style={{
          width: 14, height: 14, borderRadius: 7,
          border: `2px solid ${color}30`, borderTopColor: color,
        }}
      />
      Loading…
    </span>
  );
}

function GoogleSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
function AppleSVG() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.3.07 2.22.65 2.99.65.81 0 2.33-.8 3.92-.68 1.35.12 2.62.79 3.35 2.04-3.26 1.92-2.72 6.15.74 7.66-.5 1.25-.96 2.5-2 3.21zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}
function SamsungSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#1428A0"/>
      <text x="12" y="16.5" textAnchor="middle" fill="white"
        style={{ font: "700 11px/1 sans-serif" }}>S</text>
    </svg>
  );
}
