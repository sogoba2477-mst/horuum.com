import Link from "next/link";
import Image from "next/image";
import QRCodeBlock from "@/components/QRCodeBlock";
import EmailCapture from "@/components/EmailCapture";

const START_URL = "https://horuum.com/start";

export default function LandingPage() {
  return (
    <div className="wrap">
      <header className="topbar">
        <div className="brand" aria-label="HORUUM">
          <Image
            src="/logohoruum.png"
            alt="HORUUM Logo"
            width={105}
            height={105}
            priority
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 6px 18px rgba(215,181,109,.45)) brightness(1.08)",
            }}
          />
          <div>HORUUM</div>
        </div>
        <div className="pill">Black • Gold • Minimal</div>
      </header>

      <div className="hero">
        <div className="panel hero-left">
          <div className="eyebrow">
            <span className="dot" /> PREMIUM RITUAL EXPERIENCE
          </div>

          <h1>
            <span className="gold">Power</span> is not given.<br />
            It is awakened.
          </h1>

          <p className="slogan">
            HORUUM is designed as a focused, premium ritual — minimal, intentional, and built to help you
            reconnect with clarity, control, and inner momentum.
          </p>

          <div className="cta-row">
            <Link className="btn btn-primary" href="/start">
              Enter your experience
            </Link>
            <a className="btn" href="#email">
              Get early access
            </a>
          </div>
        </div>

        <div className="panel hero-right">
          <div className="shine" aria-hidden="true" />
          <div className="product-card">
            <div className="product-title">
              <b>HORUUM</b>
              <span className="meta">Luxury • Minimal • Ritual</span>
            </div>

            <div className="divider" />

            <div className="specs" role="list">
              <div className="spec" role="listitem">
                <small>Designed for</small>
                <strong>Focus & Energy</strong>
              </div>
              <div className="spec" role="listitem">
                <small>Experience</small>
                <strong>Start Ritual</strong>
              </div>
              <div className="spec" role="listitem">
                <small>Format</small>
                <strong>4-Step Guide</strong>
              </div>
              <div className="spec" role="listitem">
                <small>Access</small>
                <strong>QR / Mobile</strong>
              </div>
            </div>

            <div className="cta-row" style={{ marginTop: "auto" }}>
              <a className="btn" href="/horuum-guide.pdf" download>
                Download PDF
              </a>
              <Link className="btn" href="/start">
                How it works
              </Link>
            </div>

            <p className="meta" style={{ margin: 0 }}>
              Tip: upload your PDF as <span className="gold">/horuum-guide.pdf</span>
            </p>
          </div>
        </div>
      </div>

      <section className="grid">
        <div className="card">
          <h2 className="h2">Unlock your energy</h2>
          <p className="p">
            Energy isn’t a mood — it’s a system. HORUUM is built around a short ritual that aligns breath,
            attention, and intention in minutes, so your day starts with direction.
          </p>
        </div>

        <div className="card">
          <h2 className="h2">A premium, distraction-free design</h2>
          <p className="p">
            Minimal interface. No noise. No clutter. Just the essentials — delivered with a luxury finish
            and a mobile-first experience.
          </p>
        </div>
      </section>

      <section id="how">
        <div className="card">
          <h2 className="h2">How to use</h2>
          <p className="p">A simple 4-step ritual — designed to be consistent, repeatable, and fast.</p>

          <div className="steps" role="list">
            <div className="step" role="listitem">
              <span className="n">1</span>
              <b>Prepare</b>
              <p>Find a calm place. Silence distractions. Set a 3–5 min window.</p>
            </div>
            <div className="step" role="listitem">
              <span className="n">2</span>
              <b>Align</b>
              <p>Slow breathing. Stable posture. Let attention settle into the moment.</p>
            </div>
            <div className="step" role="listitem">
              <span className="n">3</span>
              <b>Activate</b>
              <p>Follow the guided focus cue. Lock your intention into one clear outcome.</p>
            </div>
            <div className="step" role="listitem">
              <span className="n">4</span>
              <b>Execute</b>
              <p>Choose one immediate action. Start while the signal is strong.</p>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: 16 }}>
            <a className="btn btn-primary" href="/horuum-guide.pdf" download>
              Download PDF
            </a>
            <Link className="btn" href="/start">
              Enter your experience
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="card">
          <h2 className="h2">Brand philosophy</h2>
          <p className="p">
            HORUUM stands for deliberate power — not performance. Not noise. Not motivation hacks.
            We believe strength is built through repetition, clarity, and ritual.{" "}
            <span className="gold">Power is awakened</span> when you control your attention.
          </p>
        </div>
      </section>

      <section id="email">
        <EmailCapture />

        <div className="card" style={{ marginTop: 18 }}>
          <h2 className="h2">🔗 QR CODE FINAL</h2>
          <div className="qr-box">
            <div className="qr" aria-label={`QR Code to ${START_URL}`}>
              <QRCodeBlock url={START_URL} />
            </div>
            <div className="qr-meta">
              <p className="p" style={{ marginBottom: 10 }}>
                Scan to start the experience: <span className="gold">{START_URL}</span>
              </p>
              <a className="btn" href={START_URL}>
                Open /start
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>© {new Date().getFullYear()} HORUUM. All rights reserved.</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="mailto:hello@horuum.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}