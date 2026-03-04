"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Phase = { label: string; seconds: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  // prefer English voices (often smoother for this script)
  const preferred =
    voices.find(v => /en/i.test(v.lang) && /google|siri|microsoft|neural/i.test(v.name)) ||
    voices.find(v => /en/i.test(v.lang)) ||
    voices[0];
  return preferred ?? null;
}

export default function StartExperience() {
  const phases: Phase[] = useMemo(
    () => [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 2 },
      { label: "Exhale", seconds: 6 },
    ],
    []
  );

  const cycleSeconds = useMemo(() => phases.reduce((a, p) => a + p.seconds, 0), [phases]);

  const [minutes, setMinutes] = useState<number>(3);
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);

  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [guidedOn, setGuidedOn] = useState(true);
  const [cinematicOn, setCinematicOn] = useState(true);
  const [remaining, setRemaining] = useState(totalSeconds);

  const [intention, setIntention] = useState("");
  const [focusMode, setFocusMode] = useState(true);

  const tickerRef = useRef<number | null>(null);

  // Ambient audio element
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  // cinematic overlay state
  const [overlay, setOverlay] = useState(false);

  // Load/save intention
  useEffect(() => {
    try {
      const saved = localStorage.getItem("horuum_intention");
      if (saved) setIntention(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("horuum_intention", intention);
    } catch {}
  }, [intention]);

  // Reset when minutes changes (if not running)
  useEffect(() => {
    if (!running) setRemaining(totalSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  // Create ambient audio once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio("/audio/ambient.mp3");
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.22; // premium subtle
    ambientRef.current = a;

    return () => {
      try {
        a.pause();
        ambientRef.current = null;
      } catch {}
    };
  }, []);

  function setAmbientVolume(v: number) {
    const a = ambientRef.current;
    if (!a) return;
    a.volume = clamp(v, 0, 1);
  }

  async function ensureAmbientPlaying() {
    const a = ambientRef.current;
    if (!a) return;
    try {
      // iOS/Chrome may require user gesture; Start click counts.
      await a.play();
    } catch {
      // If blocked, user can toggle Sound off/on to retry
    }
  }

  function stopAmbient() {
    const a = ambientRef.current;
    if (!a) return;
    try {
      a.pause();
      a.currentTime = 0;
    } catch {}
  }

  // Voice guidance using SpeechSynthesis
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    // voices can load async
    const load = () => {
      voiceRef.current = pickVoice();
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;

    return () => {
      try {
        window.speechSynthesis.onvoiceschanged = null;
      } catch {}
    };
  }, []);

  function speak(text: string) {
    if (!guidedOn) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      const v = voiceRef.current ?? pickVoice();
      if (v) u.voice = v;
      u.rate = 0.92; // premium slow
      u.pitch = 1.0;
      u.volume = 0.9;
      window.speechSynthesis.speak(u);
    } catch {}
  }

  // Phase calc
  const elapsed = totalSeconds - remaining;
  const cyclePos = ((elapsed % cycleSeconds) + cycleSeconds) % cycleSeconds;

  const { phaseLabel, phaseProgress } = useMemo(() => {
    let acc = 0;
    for (const p of phases) {
      const start = acc;
      const end = acc + p.seconds;
      if (cyclePos >= start && cyclePos < end) {
        const prog = (cyclePos - start) / p.seconds;
        return { phaseLabel: p.label, phaseProgress: prog };
      }
      acc = end;
    }
    return { phaseLabel: phases[0].label, phaseProgress: 0 };
  }, [cyclePos, phases]);

  // Tick
  useEffect(() => {
    if (!running) return;

    tickerRef.current = window.setInterval(() => {
      setRemaining((r) => (r - 1 <= 0 ? 0 : r - 1));
    }, 1000);

    return () => {
      if (tickerRef.current) window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    };
  }, [running]);

  // Guidance at phase changes (gentle, not spammy)
  const lastPhaseRef = useRef<string>(phaseLabel);
  const lastCueAtRef = useRef<number>(-999);

  useEffect(() => {
    if (!running) {
      lastPhaseRef.current = phaseLabel;
      return;
    }

    if (phaseLabel !== lastPhaseRef.current) {
      lastPhaseRef.current = phaseLabel;

      // Cue max every ~4 seconds to avoid noisy voice on short phases
      const now = Date.now();
      if (now - lastCueAtRef.current > 3500) {
        lastCueAtRef.current = now;

        if (phaseLabel === "Inhale") speak("Inhale.");
        else if (phaseLabel === "Hold") speak("Hold.");
        else speak("Exhale.");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseLabel, running]);

  // End
  useEffect(() => {
    if (remaining === 0 && running) {
      setRunning(false);
      speak("Complete. Take one immediate action now.");
      // ease out ambient
      setAmbientVolume(0.12);
      setTimeout(() => setAmbientVolume(0.22), 800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, running]);

  // UI
  const pct = totalSeconds === 0 ? 0 : 1 - remaining / totalSeconds;
  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  const ringScale = useMemo(() => {
    if (phaseLabel === "Inhale") return 0.75 + 0.25 * phaseProgress;
    if (phaseLabel === "Hold") return 1.0;
    return 1.0 - 0.25 * phaseProgress;
  }, [phaseLabel, phaseProgress]);

  async function start() {
    // cinematic
    if (cinematicOn) {
      setOverlay(true);
      setTimeout(() => setOverlay(false), 900);
    }

    // audio
    if (soundOn) {
      await ensureAmbientPlaying();
      setAmbientVolume(0.22);
    } else {
      stopAmbient();
    }

    // guidance intro
    if (guidedOn) {
      const intro = intention?.trim()
        ? `Begin. Your intention is: ${intention.trim()}. Breathe with me.`
        : "Begin. Breathe with me.";
      speak(intro);
    }

    if (remaining === 0) setRemaining(totalSeconds);
    setRunning(true);
  }

  function pause() {
    setRunning(false);
    // soften ambient when paused
    if (soundOn) setAmbientVolume(0.14);
    try {
      window.speechSynthesis?.cancel();
    } catch {}
  }

  function reset() {
    setRunning(false);
    setRemaining(totalSeconds);
    if (soundOn) setAmbientVolume(0.18);
    try {
      window.speechSynthesis?.cancel();
    } catch {}
  }

  // handle toggles live
  useEffect(() => {
    if (!soundOn) stopAmbient();
    else if (running) ensureAmbientPlaying();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundOn]);

  const blurClass = overlay ? "cine-blur" : "";

  return (
    <>
      {/* Cinematic overlay */}
      <div className={`cine-overlay ${overlay ? "on" : ""}`} aria-hidden="true">
        <div className="cine-vignette" />
        <div className="cine-title">
          <div className="kicker">HORUUM</div>
          <p className="headline">Power is awakened.</p>
          <div className="sub">Breathe • Align • Activate • Execute</div>
        </div>
      </div>

      <div className={`card fade-up ${blurClass}`} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 className="h2" style={{ marginBottom: 6 }}>
              Guided ritual
            </h2>
            <p className="p">Ambient + guided breathing. Minimal. Repeatable. Premium.</p>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span className="pill" style={{ cursor: "default" }}>
              {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
            </span>

            <button
              className={`btn ${running ? "" : "btn-primary"}`}
              onClick={running ? pause : start}
              type="button"
            >
              {running ? "Pause" : "Start"}
            </button>

            <button className="btn" onClick={reset} type="button">
              Reset
            </button>
          </div>
        </div>

        {/* Intention */}
        <div style={{ marginTop: 14 }}>
          <label className="meta" style={{ display: "block", marginBottom: 8 }}>
            Intention (one outcome)
          </label>
          <input
            className="input"
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Example: Close 1 key task today."
            maxLength={120}
          />
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
          <div className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
            Session
            <select
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
              className="input"
              style={{ padding: "8px 10px", borderRadius: 12, width: 110 }}
              disabled={running}
            >
              <option value={2}>2 min</option>
              <option value={3}>3 min</option>
              <option value={5}>5 min</option>
            </select>
          </div>

          <label className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={soundOn}
              onChange={(e) => setSoundOn(e.target.checked)}
              style={{ accentColor: "var(--gold)" }}
            />
            Ambient
          </label>

          <label className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={guidedOn}
              onChange={(e) => setGuidedOn(e.target.checked)}
              style={{ accentColor: "var(--gold)" }}
            />
            Guidance
          </label>

          <label className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={cinematicOn}
              onChange={(e) => setCinematicOn(e.target.checked)}
              style={{ accentColor: "var(--gold)" }}
            />
            Cinematic
          </label>

          <label className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={focusMode}
              onChange={(e) => setFocusMode(e.target.checked)}
              style={{ accentColor: "var(--gold)" }}
            />
            Focus mode
          </label>
        </div>

        {/* Breath ring + progress */}
        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: focusMode ? "1fr" : "1fr 1fr",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          <div
            className="panel"
            style={{
              padding: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 240,
            }}
          >
            <div className="meta" style={{ marginBottom: 8 }}>
              {running ? "Breath" : "Ready"}
            </div>

            <div
              aria-label="Breathing ring"
              style={{
                width: 170,
                height: 170,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.14)",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(242,223,178,.14), rgba(0,0,0,.20) 60%)",
                boxShadow: "0 18px 55px rgba(0,0,0,.35)",
                display: "grid",
                placeItems: "center",
                transform: `scale(${ringScale})`,
                transition: "transform 900ms ease",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    fontSize: 18,
                    background: "linear-gradient(90deg, var(--gold2), var(--gold))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {phaseLabel.toUpperCase()}
                </div>
                <div className="meta" style={{ marginTop: 6 }}>
                  4–2–6 pattern
                </div>
              </div>
            </div>

            {/* session progress */}
            <div style={{ width: "100%", marginTop: 16 }}>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(0,0,0,.18)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${clamp(pct, 0, 1) * 100}%`,
                    background: "linear-gradient(90deg, rgba(242,223,178,.85), rgba(215,181,109,.85))",
                    transition: "width 600ms ease",
                  }}
                />
              </div>
              <div className="meta" style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
                <span>Session progress</span>
                <span>{Math.round(clamp(pct, 0, 1) * 100)}%</span>
              </div>
            </div>
          </div>

          {!focusMode && (
            <div className="panel" style={{ padding: 18 }}>
              <div className="meta">Execute (1 action)</div>
              <h2 className="h2" style={{ marginTop: 8 }}>
                What will you do immediately after this ritual?
              </h2>
              <p className="p">
                Choose one action that takes less than 5 minutes. Momentum is the product.
              </p>

              <div style={{ marginTop: 12 }}>
                <div className="steps" role="list">
                  <div className="step" role="listitem" style={{ minHeight: 0 }}>
                    <span className="n">A</span>
                    <b>One task</b>
                    <p>Define 1 micro-step you can do right now.</p>
                  </div>
                  <div className="step" role="listitem" style={{ minHeight: 0 }}>
                    <span className="n">B</span>
                    <b>Start</b>
                    <p>Open the tab / file / note — begin instantly.</p>
                  </div>
                </div>
              </div>

              <div className="cta-row" style={{ marginTop: 14 }}>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    const msg = intention?.trim()
                      ? `HORUUM — Your intention: ${intention.trim()}\nNow: take 1 immediate action.`
                      : "HORUUM — Take 1 immediate action now.";
                    navigator.clipboard?.writeText(msg).catch(() => {});
                  }}
                >
                  Copy intention
                </button>

                <button className="btn" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Back to top
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="meta" style={{ marginTop: 14 }}>
          Tip: if ambient audio doesn’t start, tap <span className="gold">Start</span> again (some mobile browsers block autoplay).
        </p>
      </div>
    </>
  );
}