"use client";

import { useEffect, useRef } from "react";

export default function GlobalAudio() {
  const ambientRef = useRef<HTMLAudioElement>(null);
  const introRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const startAudio = async () => {
      if (startedRef.current) return;

      const ambient = ambientRef.current;
      const intro = introRef.current;

      if (!ambient || !intro) return;

      startedRef.current = true;

      ambient.volume = 0.12;
      intro.volume = 0.85;

      try {
        ambient.currentTime = 0;
        intro.currentTime = 0;

        await ambient.play();

        setTimeout(() => {
          intro
            .play()
            .then(() => console.log("HORUUM intro playing"))
            .catch((err) => console.error("HORUUM intro blocked:", err));
        }, 900);
      } catch (err) {
        startedRef.current = false;
        console.error("Ambient blocked:", err);
      }
    };

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, []);

  return (
    <>
      <audio ref={ambientRef} loop preload="auto" playsInline>
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={introRef} preload="auto" playsInline>
        <source src="/audio/horuum-intro.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}