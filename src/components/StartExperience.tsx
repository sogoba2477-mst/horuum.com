"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Phase = {
  label: string;
  seconds: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function StartExperience() {
  // Breath pattern: 4-2-6 (calm, premium, easy)
  const phases: Phase[] = useMemo(
    () => [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 2 },
      { label: "Exhale", seconds: 6 },
    ],
    []
  );

  const cycleSeconds = useMemo(() => phases.reduce((a, p) => a + p.seconds, 0), [phases]);

  // Session length (minutes)
  const [minutes, setMinutes] = useState<number>(3);
  const totalSeconds = useMemo(() => minutes * 60, [minutes]);

  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [remaining, setRemaining] = useState(totalSeconds);

  const [intention, setIntention] = useState("");
  const [focusMode, setFocusMode] = useState(true);

  const tickerRef = useRef<number | null>(null);

  // Load/save intention (local)
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

  // Reset when minutes changes (only if not running)
  useEffect(() => {
    if (!running) setRemaining(totalSeconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  // WebAudio beep (subtle)
  function beep() {
    if (!soundOn) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 560;
      g.gain.value = 0.03;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 120);
    } catch {}
  }

  // Phase calc from elapsed inside a cycle
  const elapsed = totalSeconds - remaining;
  const cyclePos = ((elapsed % cycleSeconds) + cycleSeconds) % cycleSeconds;

  const { phaseLabel, phaseProgress } = useMemo(() => {
    let acc = 0;
    for (const p of phases) {
      const start = acc;
      const end = acc + p.seconds;
      if (cyclePos >= start && cyclePos < end) {
        const prog = (cyclePos - start) / p.seconds; // 0..1
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
      setRemaining((r) => {
        const next = r - 1;
        return next <= 0 ? 0 : next;
      });
    }, 1000);

    return () => {
      if (tickerRef.current) window.clearInterval(tickerRef.current);
      tickerRef.current = null;
    };
  }, [running]);

  // Phase-change beep detection
  const lastPhaseRef = useRef<string>(phaseLabel);
  useEffect(() => {
    if (!running) {
      lastPhaseRef.current = phaseLabel;
      return;
    }
    if (phaseLabel !== lastPhaseRef.current) {
      lastPhaseRef.current = phaseLabel;
      beep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseLabel, running]);

  // Auto stop at end
  useEffect(() => {
    if (remaining === 0 && running) setRunning(false);
  }, [remaining, running]);

  // UI helpers
  const pct = totalSeconds === 0 ? 0 : 1 - remaining / totalSeconds;
  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  const ringScale = useMemo(() => {
    // Premium “breath ring” scaling by phase
    // Inhale: 0.75 -> 1.0
    // Hold: 1.0
    // Exhale: 1.0 -> 0.75
    if (phaseLabel === "Inhale") return 0.75 + 0.25 * phaseProgress;
    if (phaseLabel === "Hold") return 1.0;
    return 1.0 - 0.25 * phaseProgress;
  }, [phaseLabel, phaseProgress]);

  function start() {
    if (remaining === 0) setRemaining(totalSeconds);
    setRunning(true);
  }
  function pause() {
    setRunning(false);
  }
  function reset() {
    setRunning(false);
    setRemaining(totalSeconds);
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 className="h2" style={{ marginBottom: 6 }}>
            Guided ritual
          </h2>
          <p className="p">
            Set an intention, breathe with the ring, then execute one immediate action.
          </p>
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
          Sound
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
    </div>
  );
}