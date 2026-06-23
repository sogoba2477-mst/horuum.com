import Link from "next/link";
import Image from "next/image";

export default function IntroPage() {
  return (
    <main className="intro-page">
      <div className="intro-aura" />

      <section className="intro-content">
        <div className="intro-logo-wrap">
          <div className="intro-light-ring" />
          <div className="intro-light-core" />

          <Image
            src="/horuum3D.gif"
            alt="HORUUM 3D Logo"
            width={1500}
            height={750}
            priority
            unoptimized
            className="intro-logo-video"
          />
        </div>

        <p className="intro-kicker"> <br /> <br /> <br /> HORUUM</p>

<h1 className="intro-title">
  Power is not given.
  <br />
  <span className="awakened">It is awakened.</span>
</h1>

        <p className="intro-text">
         A ritual object for focus, presence and inner mastery.
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