import Link from "next/link";
import Image from "next/image";
import QRCodeBlock from "@/components/QRCodeBlock";
import EmailCapture from "@/components/EmailCapture";

const START_URL = "https://www.horuum.com/start";

export default function LandingPage() {
  return (
    <div className="wrap">
      <header className="topbar">
        <Link href="/" className="brand" aria-label="HORUUM">
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
        </Link>
        <div className="pill">Black • Gold • Minimal</div>
      </header>

      <div className="hero">
        <div className="panel hero-left">
          <div className="eyebrow">
            <span className="dot" /> PREMIUM RITUAL EXPERIENCE
          </div>

<h1>
  <span className="gold">Power</span> is not<br />
  given.<br />
  It is<br />
  awakened.
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

          <section>
  <div className="card inner-chamber">
    <div className="eyebrow">
      <span className="dot" /> THE INNER CHAMBER
    </div>

    <h2 className="h2">A private space for personal meaning</h2>

    <p className="p">
      HORUUM Wands are fully designed to be used exactly as they are — with their natural metallic balance,
      weight and tactile presence.
    </p>

    <p className="p" style={{ marginTop: 16 }}>
      For those who wish to make the experience more personal, each wand also includes an optional internal chamber:
      a private space intended for symbolic meaning and personal ritual.
    </p>

    <div className="inner-grid">
      <div className="inner-box">
        <h3>What it may hold</h3>

        <ul>
          <li>A mineral fragment</li>
          <li>Fine dry sand</li>
          <li>A written intention</li>
          <li>A small keepsake connected to focus, grounding, memory or purpose</li>
        </ul>
      </div>

      <div className="inner-box">
        <h3>Suggested uses</h3>

        <ul>
          <li>Meditation rituals</li>
          <li>Breathwork sessions</li>
          <li>Focus and grounding routines</li>
          <li>Symbolic intention practices</li>
          <li>Personal reflection moments</li>
        </ul>
      </div>
    </div>

    <p className="p" style={{ marginTop: 22 }}>
      Others may prefer to leave the chamber empty.
    </p>

    <p className="p" style={{ marginTop: 14 }}>
      The chamber is not meant for storage, but for intention.
      Each HORUUM Wand ultimately becomes unique to its owner —
      shaped not only by design, but by personal significance.
    </p>

    <div className="notice-box">
      <h3>Important Notice</h3>

      <ul>
        <li>Only insert dry and clean materials.</li>
        <li>Avoid liquids or corrosive substances.</li>
        <li>Do not overfill the chamber.</li>
        <li>Ensure the cap is securely closed before use.</li>
        <li>
          HORUUM products are designed for wellness, relaxation,
          mindfulness and personal ritual experiences only.
        </li>
      </ul>
    </div>

    <div className="signature">
      <strong>HORUUM</strong>
      <span>Power is not given. It is awakened.</span>
    </div>
  </div>
</section>

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

<section>
  <div className="card testimonials-card">
    <div className="eyebrow testimonials-eyebrow">
      <span className="dot" /> EARLY IMPRESSIONS
    </div>

    <h2 className="h2 testimonials-title">A ritual people remember</h2>

    <p className="p testimonials-subtitle">
      First impressions from early members discovering the HORUUM ritual experience.
    </p>

    <div className="rating-strip">
      <div>
        <strong>4.9</strong>
        <span>/5</span>
      </div>
      <p>Average early experience rating</p>
    </div>

    <div className="testimonials">
      <div className="testimonial featured-testimonial">
        <img src="/user1.jpg" alt="Sarah M." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “The moment I hold the wands, everything slows down. It has become part
          of my morning focus ritual.”
        </p>
        <h3>Sarah M.</h3>
        <span className="testimonial-role">Meditation & Focus</span>
      </div>

      <div className="testimonial">
        <img src="/user2.jpg" alt="Michael R." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “The craftsmanship feels exceptional. More like a luxury object than a
          simple wellness accessory.”
        </p>
        <h3>Michael R.</h3>
        <span className="testimonial-role">Executive Performance</span>
      </div>

      <div className="testimonial">
        <img src="/user3.jpg" alt="Emma L." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “Elegant, minimalist and deeply personal. HORUUM creates a unique ritual experience.”
        </p>
        <h3>Emma L.</h3>
        <span className="testimonial-role">Wellness Routine</span>
      </div>

      <div className="testimonial">
        <img src="/user4.jpg" alt="David K." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “A beautiful reminder to pause, focus and reconnect with my intentions each day.”
        </p>
        <h3>David K.</h3>
        <span className="testimonial-role">Daily Grounding</span>
      </div>

      <div className="testimonial">
        <img src="/user5.jpg" alt="Sophia C." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “The packaging, the weight, the details — everything feels thoughtfully designed.”
        </p>
        <h3>Sophia C.</h3>
        <span className="testimonial-role">Design Lover</span>
      </div>

      <div className="testimonial">
        <img src="/user6.jpg" alt="James T." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “I use HORUUM before important decisions and planning sessions. It helps me stay centered.”
        </p>
        <h3>James T.</h3>
        <span className="testimonial-role">Executive Focus</span>
      </div>

      <div className="testimonial">
        <img src="/user7.jpg" alt="Olivia B." className="testimonial-avatar" />
        <div className="stars">★★★★★</div>
        <p>
          “More than an object — it feels like a personal ritual that brings clarity and focus.”
        </p>
        <h3>Olivia B.</h3>
        <span className="testimonial-role">Personal Ritual</span>
      </div>
    </div>
  </div>
</section>

      <section id="email">
        <EmailCapture />

        <div className="card" style={{ marginTop: 18 }}>
          <h2 className="h2">🔗 QR CODE FINAL</h2>
          <div className="qr-box">
<div className="qr" aria-label="QR Code">
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