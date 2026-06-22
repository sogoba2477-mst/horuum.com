"use client";

import { useEffect, useRef } from "react";

export default function IntroAudio() {
  const ambientRef = useRef<HTMLAudioElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const startAudio = async () => {
      if (startedRef.current) return;

      const ambient = ambientRef.current;
      const voice = voiceRef.current;

      if (!ambient || !voice) return;

      startedRef.current = true;

      ambient.volume = 0.1;
      voice.volume = 0.75;

      try {
        await ambient.play();

        setTimeout(() => {
          voice.play().catch(() => {});
        }, 900);
      } catch {
        startedRef.current = false;
      }
    };

    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, []);

  return (
    <>
      <audio ref={ambientRef} loop preload="auto" playsInline>
        <source src="/audio/ambient.mp3" type="audio/mpeg" />
      </audio>

      <audio ref={voiceRef} preload="auto" playsInline>
        <source src="/audio/horuum-intro.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}