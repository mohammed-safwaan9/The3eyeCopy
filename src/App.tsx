import { useState, useEffect } from "react";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import PermissionsScreen from "./screens/PermissionsScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ReportScreen from "./screens/ReportScreen";
import RoutePreviewScreen from "./screens/RoutePreviewScreen";
import RouteScreen from "./screens/RouteScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PremiumScreen from "./screens/PremiumScreen";
import HistoryScreen from "./screens/HistoryScreen";
import JourneyCompleteScreen from "./screens/JourneyCompleteScreen";
import IconLibraryScreen from "./screens/IconLibraryScreen";
import { IconBack, IconCheck, CategoryIcon, CATEGORY_NAMES, CATEGORY_COLORS } from "./components/Icons";

type Screen =
  | "splash" | "onboarding" | "permissions" | "login" | "signup"
  | "home" | "report" | "route_preview" | "route" | "search"
  | "profile" | "settings" | "premium" | "history" | "journey_complete"
  | "icon_library";

const CATS = ["traffic","camera","accident","hazard","roadwork","flood","closure","congestion"] as const;
const DISTANCES = ["300 m","500 m","1 km","2 km"];
const ALERT_MODES = ["Voice","Haptic","Visual","All three"];
const ALL_CATEGORIES = ["traffic","camera","accident","hazard","roadwork","flood","closure","congestion"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [theme, setTheme] = useState("night");
  const [alertDistance, setAlertDistance] = useState(500);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    ALL_CATEGORIES.filter(c => c !== "flood")
  );
  const [destination, setDestination] = useState("Cyber City");
  const [vehicle, setVehicle] = useState("car");
  const [vehicleColor, setVehicleColor] = useState("blue");
  const [voiceBehaviour, setVoiceBehaviour] = useState("Normal");
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [prevScreen, setPrevScreen] = useState<Screen>("home");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navigate = (to: string) => {
    setPrevScreen(screen);
    setScreen(to as Screen);
  };

  const handleTheme = (t: string) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  };

  /* Insert permissions screen between onboarding and login */
  const handleOnboardingNavigate = (to: string) => {
    if (to === "login") navigate("permissions");
    else navigate(to);
  };

  return (
    <div
      className="h-full flex items-center justify-center"
      style={{ background: "#06080A" }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100vh)",
          background: "var(--bg)",
        }}
      >
        <div key={screen} className="absolute inset-0 anim-fade" style={{ animationDuration: "0.18s" }}>
          {screen === "splash"        && <SplashScreen onDone={() => navigate("onboarding")}/>}
          {screen === "onboarding"    && <OnboardingScreen onNavigate={handleOnboardingNavigate}/>}
          {screen === "permissions"   && <PermissionsScreen onNavigate={navigate}/>}
          {screen === "login"         && <LoginScreen onNavigate={navigate}/>}
          {screen === "signup"        && <SignupScreen onNavigate={navigate}/>}
          {screen === "home"          && (
            <HomeScreen
              onNavigate={navigate}
              alertDistance={alertDistance}
              activeCategories={activeCategories}
              theme={theme}
              voiceMuted={voiceMuted}
              onVoiceMutedChange={setVoiceMuted}
            />
          )}
          {screen === "report"        && <ReportScreen onNavigate={navigate} returnTo={prevScreen}/>}
          {screen === "route_preview" && (
            <RoutePreviewScreen
              onNavigate={navigate}
              destination={destination}
              vehicle={vehicle}
              vehicleColor={vehicleColor}
              onVehicleChange={setVehicle}
              onVehicleColorChange={setVehicleColor}
            />
          )}
          {screen === "route" && (
            <RouteScreen onNavigate={navigate} destination={destination} vehicle={vehicle} vehicleColor={vehicleColor} voiceBehaviour={voiceBehaviour} theme={theme} voiceMuted={voiceMuted} onVoiceMutedChange={setVoiceMuted}/>
          )}
          {screen === "search"        && (
            <SearchScreen
              onNavigate={navigate}
              onSelectDestination={(d) => { setDestination(d); navigate("route_preview"); }}
            />
          )}
          {screen === "profile"       && <ProfileScreen onNavigate={navigate}/>}
          {screen === "settings"      && (
            <SettingsScreen
              onNavigate={navigate}
              theme={theme}
              onThemeChange={handleTheme}
              alertDistance={alertDistance}
              onAlertDistanceChange={setAlertDistance}
              activeCategories={activeCategories}
              onCategoryChange={setActiveCategories}
              vehicle={vehicle}
              onVehicleChange={setVehicle}
              voiceBehaviour={voiceBehaviour}
              onVoiceBehaviourChange={setVoiceBehaviour}
            />
          )}
          {screen === "premium"          && <PremiumScreen onNavigate={navigate}/>}
          {screen === "history"          && <HistoryScreen onNavigate={navigate}/>}
          {screen === "journey_complete" && <JourneyCompleteScreen onNavigate={navigate} destination={destination}/>}
          {screen === "icon_library"    && <IconLibraryScreen onNavigate={navigate}/>}
        </div>
      </div>
    </div>
  );
}

/* ── Signup / Personalization flow ── */
function SignupScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [step, setStep] = useState<"info" | "cats" | "prefs" | "distance" | "mode">("info");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDist, setSelectedDist] = useState("500 m");
  const [selectedMode, setSelectedMode] = useState("All three");
  const [selectedDrive, setSelectedDrive] = useState("Mixed");

  const goNext = () => {
    const steps = ["info","cats","prefs","distance","mode"] as const;
    const i = steps.indexOf(step);
    if (i < steps.length - 1) setStep(steps[i + 1]);
    else onNavigate("home");
  };

  if (step === "info") {
    const valid = name.length > 1 && email.includes("@");
    return (
      <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>
        <div
          className="flex items-center gap-4 px-4 pt-14 pb-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button onClick={() => onNavigate("login")}
            className="pressable w-9 h-9 flex items-center justify-center rounded"
            style={{ background: "var(--bg-subtle)" }}>
            <IconBack size={16} color="var(--fg-2)"/>
          </button>
          <h1 style={{ font: "var(--text-title)", color: "var(--fg)" }}>Create account</h1>
        </div>

        <div className="flex-1 px-5 py-5 flex flex-col gap-4 overflow-y-auto no-scroll">
          {[
            { label: "Full name", type: "text",     value: name,  set: setName,  ph: "Arjun Rao" },
            { label: "Email",     type: "email",    value: email, set: setEmail, ph: "you@example.com" },
            { label: "Password",  type: "password", value: "",    set: ()=>{},   ph: "Min. 8 characters" },
          ].map(f => (
            <div key={f.label}>
              <label style={{
                display: "block", marginBottom: 6,
                font: "var(--text-caption)", color: "var(--fg-3)",
                textTransform: "uppercase", letterSpacing: "0.07em",
              }}>{f.label}</label>
              <input
                type={f.type}
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder={f.ph}
                style={{
                  width: "100%", padding: "12px 14px",
                  borderRadius: "var(--r-md)",
                  background: "var(--bg-input)", color: "var(--fg)",
                  border: "1px solid var(--border)",
                  font: "var(--text-body)", outline: "none",
                }}
              />
            </div>
          ))}

          <div className="flex items-start gap-3 mt-1">
            <div className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{ background: "var(--c-green)", borderRadius: 5 }}>
              <IconCheck size={11} color="white"/>
            </div>
            <p style={{ font: "var(--text-caption)", color: "var(--fg-3)", lineHeight: 1.6 }}>
              I agree to the{" "}
              <span style={{ color: "var(--c-green)" }}>Terms of Service</span> and{" "}
              <span style={{ color: "var(--c-green)" }}>Privacy Policy</span>.
              Your personal data is never sold.
            </p>
          </div>
        </div>

        <div className="px-5 pb-8">
          <button
            onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); goNext(); }, 900); }}
            disabled={!valid}
            className="pressable w-full py-4 rounded-lg"
            style={{
              font: "600 15px/1 'Inter', sans-serif",
              color: valid ? "white" : "var(--fg-3)",
              background: valid ? "var(--c-green)" : "var(--bg-subtle)",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {loading
              ? <span className="flex items-center justify-center gap-2">
                  <span className="anim-spin inline-block" style={{ width: 14, height: 14, borderRadius: 7, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }}/>
                  Creating…
                </span>
              : "Create account"
            }
          </button>
        </div>
      </div>
    );
  }

  /* Personalization steps */
  const stepMeta: Record<string, { q: string; sub: string }> = {
    cats:     { q: "What matters to you?",         sub: "Select all that apply" },
    prefs:    { q: "How should we alert you?",      sub: "You can change this later" },
    distance: { q: "Alert distance",                sub: "How far ahead to warn you" },
    mode:     { q: "Your driving type",             sub: "Affects alert sensitivity" },
  };
  const meta = stepMeta[step];

  return (
    <div className="h-full flex flex-col" style={{ background: "var(--bg)" }}>
      <div
        className="flex items-center gap-4 px-4 pt-14 pb-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={() => {
            const steps = ["info","cats","prefs","distance","mode"] as const;
            const i = steps.indexOf(step);
            setStep(steps[Math.max(0, i - 1)]);
          }}
          className="pressable w-9 h-9 flex items-center justify-center rounded"
          style={{ background: "var(--bg-subtle)" }}
        >
          <IconBack size={16} color="var(--fg-2)"/>
        </button>
        <div>
          <h1 style={{ font: "var(--text-title)", color: "var(--fg)" }}>{meta.q}</h1>
          <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-0.5">{meta.sub}</p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 px-5 pt-3 pb-1">
        {["cats","prefs","distance","mode"].map((s, i) => (
          <div key={s} className="flex-1 h-0.5 rounded-full"
            style={{ background: ["cats","prefs","distance","mode"].indexOf(step) >= i ? "var(--c-green)" : "var(--border)" }}
          />
        ))}
      </div>

      <div className="flex-1 px-5 py-4 overflow-y-auto no-scroll">
        {step === "cats" && (
          <div className="grid grid-cols-2 gap-2">
            {CATS.map(cat => {
              const c = CATEGORY_COLORS[cat];
              return (
                <div key={cat}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-lg"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${c}` }}>
                  <CategoryIcon type={cat} size={16} color={c}/>
                  <span style={{ font: "var(--text-label)", color: "var(--fg)" }}>
                    {CATEGORY_NAMES[cat]}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {step === "prefs" && (
          <div className="flex flex-col gap-2">
            {ALERT_MODES.map(m => (
              <button key={m}
                onClick={() => setSelectedMode(m)}
                className="pressable flex items-center gap-3 px-4 py-4 rounded-lg"
                style={{
                  background: selectedMode === m ? "var(--c-green)10" : "var(--bg-surface)",
                  border: `1px solid ${selectedMode === m ? "var(--c-green)" : "var(--border)"}`,
                }}>
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 20, height: 20, border: `1.5px solid ${selectedMode === m ? "var(--c-green)" : "var(--border-2)"}`, background: selectedMode === m ? "var(--c-green)" : "transparent" }}
                >
                  {selectedMode === m && <IconCheck size={11} color="white"/>}
                </div>
                <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{m}</span>
              </button>
            ))}
          </div>
        )}

        {step === "distance" && (
          <div className="flex flex-col gap-2">
            {DISTANCES.map(d => (
              <button key={d}
                onClick={() => setSelectedDist(d)}
                className="pressable flex items-center gap-3 px-4 py-4 rounded-lg"
                style={{
                  background: selectedDist === d ? "var(--c-green)10" : "var(--bg-surface)",
                  border: `1px solid ${selectedDist === d ? "var(--c-green)" : "var(--border)"}`,
                }}>
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 20, height: 20, border: `1.5px solid ${selectedDist === d ? "var(--c-green)" : "var(--border-2)"}`, background: selectedDist === d ? "var(--c-green)" : "transparent" }}
                >
                  {selectedDist === d && <IconCheck size={11} color="white"/>}
                </div>
                <span style={{ font: "var(--text-body)", color: "var(--fg)" }}>{d}</span>
                {d === "500 m" && (
                  <span style={{ font: "var(--text-caption)", color: "var(--fg-3)", marginLeft: "auto" }}>
                    Recommended
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {step === "mode" && (
          <div className="flex flex-col gap-2">
            {[
              { id: "City",    sub: "Dense traffic, frequent stops" },
              { id: "Highway", sub: "High speed, fewer intersections" },
              { id: "Mixed",   sub: "Adapts to your route" },
            ].map(m => (
              <button key={m.id}
                onClick={() => setSelectedDrive(m.id)}
                className="pressable flex items-center gap-3 px-4 py-4 rounded-lg"
                style={{
                  background: selectedDrive === m.id ? "var(--c-green)10" : "var(--bg-surface)",
                  border: `1px solid ${selectedDrive === m.id ? "var(--c-green)" : "var(--border)"}`,
                }}>
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{ width: 20, height: 20, border: `1.5px solid ${selectedDrive === m.id ? "var(--c-green)" : "var(--border-2)"}`, background: selectedDrive === m.id ? "var(--c-green)" : "transparent" }}
                >
                  {selectedDrive === m.id && <IconCheck size={11} color="white"/>}
                </div>
                <div className="text-left">
                  <p style={{ font: "var(--text-body)", color: "var(--fg)" }}>{m.id}</p>
                  <p style={{ font: "var(--text-caption)", color: "var(--fg-3)" }} className="mt-0.5">{m.sub}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 pb-8">
        <button
          onClick={goNext}
          className="pressable w-full py-4 rounded-lg"
          style={{ font: "600 15px/1 'Inter', sans-serif", color: "white", background: "var(--c-green)" }}
        >
          {step === "mode" ? "Start driving" : "Continue"}
        </button>
        <button
          onClick={goNext}
          className="pressable w-full py-3 mt-2"
          style={{ font: "var(--text-label)", color: "var(--fg-3)" }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
