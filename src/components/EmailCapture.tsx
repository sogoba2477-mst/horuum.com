"use client";

import { useState } from "react";

type LeadResponse = {
  ok?: boolean;
  message?: string;
  error?: string;
};

export default function EmailCapture() {
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value.trim() ?? "";

    setIsSubmitting(true);
    setStatus("Submitting…");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => null)) as LeadResponse | null;

      if (res.ok) {
        setStatus(
          data?.message ??
            "Welcome to the HORUUM Circle. Your place has been reserved."
        );
        form.reset();
      } else {
        setStatus(
          data?.error ??
            "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      setStatus("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card">
      <h2 className="h2">Get early access</h2>

      <p className="p">
        Leave your email to receive the launch update, the PDF ritual guide,
        and the first drop announcement.
      </p>

      <form className="email" onSubmit={onSubmit}>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="you@domain.com"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Notify me"}
        </button>
      </form>

      <p
        className="meta"
        aria-live="polite"
        style={{
          margin: "10px 0 0",
          color: "rgba(242,223,178,.95)",
        }}
      >
        {status}
      </p>
    </div>
  );
}