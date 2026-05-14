import Link from "next/link";
import Image from "next/image";
import EmailCapture from "@/components/EmailCapture";

const START_URL = "https://www.horuum.com/start";

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
        <div className="pill">First Edition</div>
      </header>

      <section className="hero">
        <div className="panel hero-left">
          <div className="eyebrow">
            <span className="dot" /> PREMIUM RITUAL OBJECT
          </div>

          <h1>
            <span className="gold">Power</span> is not given.<br />
            It is awakened.
          </h1>

          <p className="slogan">
            A premium ritual object designed for focus, clarity and inner momentum.
            HORUUM blends physical craftsmanship with a private digital experience.
          </p>

          <div className="cta-row">
            <Link className="btn btn-primary" href="/start">
              Enter your experience
            </Link>
            <a className="btn" href="#email">
              Join the private list
            </a>
          </div>
        </div>

        <div className="panel hero-right">
          <div className="shine" aria-hidden="true" />
          <div className="product-card">
            <div className="product-title">
              <b>HORUUM WANDS</b>
              <span className="meta">Copper • Gunmetal • Ritual</span>
            </div>

            <div className="divider" />

            <div className="specs">
              <div className="spec">
                <small>Material</small>
                <strong>Precision Metal</strong>
              </div>
              <div className="spec">
                <small>Experience</small>
                <strong>QR Ritual</strong>
              </div>
              <div className="spec">
                <small>Edition</small>
                <strong>First Drop</strong>
              </div>
              <div className="spec">
                <small>Access</small>
                <strong>Private Guide</strong>
              </div>
            </div>

            <div className="cta-row" style={{ marginTop: "auto" }}>
              <a className="btn" href="/horuum-guide.pdf" download>
                Access the Ritual Guide
              </a>
              <Link className="btn" href="/start">
                Start Ritual
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="card premium-section">
        <h2 className="h2">The HORUUM System</h2>
        <p className="p">
          HORUUM is not only a product. It is an entry point into a complete ritual ecosystem:
          a physical object, a digital experience, a ritual card and a private guide.
        </p>

        <div className="steps" style={{ marginTop: 18 }}>
          <div className="step">
            <span className="n">1</span>
            <b>The Object</b>
            <p>Premium wands designed to feel minimal, tactile and intentional.</p>
          </div>
          <div className="step">
            <span className="n">2</span>
            <b>The Card</b>
            <p>A physical access point to the HORUUM digital ritual.</p>
          </div>
          <div className="step">
            <span className="n">3</span>
            <b>The Experience</b>
            <p>A guided moment for breath, focus and inner activation.</p>
          </div>
          <div className="step">
            <span className="n">4</span>
            <b>The Guide</b>
            <p>A private ritual guide designed for repetition and clarity.</p>
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h2 className="h2">Unlock your energy</h2>
          <p className="p">
            Energy is not random. It is directed. HORUUM helps transform a simple moment into
            a deliberate ritual of breath, intention and execution.
          </p>
        </div>

        <div className="card">
          <h2 className="h2">Crafted for presence</h2>
          <p className="p">
            Designed with premium materials, clean proportions and a luxury black-and-gold universe,
            HORUUM is built to be held, used and remembered.
          </p>
        </div>
      </section>

      <section id="how">
        <div className="card">
          <h2 className="h2">How to use</h2>
          <p className="p">A simple 4-step ritual — designed to be consistent, repeatable and fast.</p>

          <div className="steps">
            <div className="step">
              <span className="n">1</span>
              <b>Prepare</b>
              <p>Find a calm place. Silence distractions. Set a clear intention.</p>
            </div>
            <div className="step">
              <span className="n">2</span>
              <b>Align</b>
              <p>Slow your breath. Stabilize your posture. Bring attention inward.</p>
            </div>
            <div className="step">
              <span className="n">3</span>
              <b>Activate</b>
              <p>Focus on one outcome. Give your energy a direction.</p>
            </div>
            <div className="step">
              <span className="n">4</span>
              <b>Execute</b>
              <p>Take one immediate action while the signal is strong.</p>
            </div>
          </div>

          <div className="cta-row" style={{ marginTop: 16 }}>
            <a className="btn btn-primary" href="/horuum-guide.pdf" download>
              Access the Ritual Guide
            </a>
            <Link className="btn" href="/start">
              Enter your experience
            </Link>
          </div>
        </div>
      </section>

      <section className="card premium-section">
        <h2 className="h2">Brand philosophy</h2>
        <p className="p">
          HORUUM stands for deliberate power — not noise, not performance theater, not empty motivation.
          It is a modern ritual system built around clarity, discipline and intentional living.
          <br /><br />
          <span className="gold">Power is awakened when attention is controlled.</span>
        </p>
      </section>

      <section className="card premium-section">
        <h2 className="h2">First Edition Drop</h2>
        <p className="p">
          The first HORUUM release will be produced in limited quantities.
          Join the private list to access launch details before public release.
        </p>

        <div className="cta-row">
          <a className="btn btn-primary" href="#email">
            Join the private list
          </a>
          <Link className="btn" href="/start">
            Preview the experience
          </Link>
        </div>
      </section>

      <section id="email">
        <EmailCapture />

        <div className="card" style={{ marginTop: 18 }}>
          <h2 className="h2">Private ritual access</h2>
          <div className="qr-box">
            <div className="qr" aria-label="HORUUM QR Code">
              <img
                src="/horuumqrcode.png"
                alt="HORUUM QR Code"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "contain",
                  borderRadius: "16px",
                }}
              />
            </div>

            <div className="qr-meta">
              <p className="p" style={{ marginBottom: 10 }}>
                Scan to enter the HORUUM experience:
                <br />
                <span className="gold">{START_URL}</span>
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