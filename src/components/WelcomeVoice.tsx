"use client";

import { useEffect } from "react";

export default function WelcomeVoice() {
  useEffect(() => {
    const speak = () => {
      if (!("speechSynthesis" in window)) return;

      const text = "Welcome to horuum dot com";
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = window.speechSynthesis.getVoices();
      const femaleVoice =
        voices.find(v => v.name.toLowerCase().includes("female")) ||
        voices.find(v => v.lang.startsWith("en")) ||
        voices[0];

      if (femaleVoice) utterance.voice = femaleVoice;

      utterance.rate = 0.85;
      utterance.pitch = 1.15;
      utterance.volume = 0.8;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    };

    const timer = setTimeout(speak, 1200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}