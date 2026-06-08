import Link from "next/link";
import Image from "next/image";

export default function IntroPage() {
  return (
    <main className="intro-page">
      <div className="intro-aura" />

      <section className="intro-content">
        <div className="intro-logo-wrap">
          <Image
            src="/horuumlogosvg.svg"
            alt="HORUUM Logo"
            width={340}
            height={340}
            priority
            className="intro-logo"
          />
        </div>

        <p className="intro-kicker">HORUUM</p>

        <h1 className="intro-title">
          Power is not given.
          <br />
          It is awakened.
        </h1>

        <p className="intro-text">
          Enter a private ritual experience designed for focus,
          presence, clarity and inner command.
        </p>

        <div className="intro-actions">
          <Link href="/home" className="btn btn-primary">
            ENTER THE SITE
          </Link>

          <Link href="/start" className="btn">
            BEGIN THE EXPERIENCE
          </Link>
        </div>
      </section>
    </main>
  );
}