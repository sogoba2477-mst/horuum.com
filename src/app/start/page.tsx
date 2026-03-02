import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "HORUUM — Start",
  description: "Start the HORUUM experience.",
};

export default function StartPage() {
  return (
    <div className="wrap">
      <header className="topbar">
        <div className="brand" aria-label="HORUUM">
          <Image
            src="/logohoruum.png"
            alt="HORUUM Logo"
            width={64}
            height={64}
            priority
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 6px 18px rgba(215,181,109,.45)) brightness(1.08)",
            }}
          />
          <div>HORUUM</div>
        </div>

        <div className="pill">/start</div>
      </header>

      <div className="panel" style={{ padding: 24 }}>
        <h1 style={{ marginTop: 6 }}>
          Begin the <span className="gold">experience</span>.
        </h1>

        <p className="slogan" style={{ maxWidth: 560 }}>
          Keep it simple: breathe, align, activate, execute. This page can later become your guided flow
          (audio, video, timer, or step-by-step).
        </p>

        <div className="card" style={{ marginTop: 12 }}>
          <h2 className="h2">Quick ritual (4 steps)</h2>

          <div className="steps" role="list">
            <div className="step" role="listitem">
              <span className="n">1</span>
              <b>Prepare</b>
              <p>Silence distractions. Set your intention for today.</p>
            </div>

            <div className="step" role="listitem">
              <span className="n">2</span>
              <b>Align</b>
              <p>Slow breathing for 60 seconds. Stable posture.</p>
            </div>

            <div className="step" role="listitem">
              <span className="n">3</span>
              <b>Activate</b>
              <p>Focus on one outcome. Make it specific.</p>
            </div>

            <div className="step" role="listitem">
              <span className="n">4</span>
              <b>Execute</b>
              <p>Take one action immediately. Start now.</p>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: 16 }}>
            <a className="btn btn-primary" href="/horuum-guide.pdf" download>
              Download PDF
            </a>

            <Link className="btn" href="/">
              Back to landing
            </Link>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div>© {new Date().getFullYear()} HORUUM.</div>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="mailto:hello@horuum.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}