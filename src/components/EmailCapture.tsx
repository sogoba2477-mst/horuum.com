"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [status, setStatus] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Submitting…");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("Thanks — you’re on the list.");
      form.reset();
    } else {
      const data = await res.json().catch(() => null);
      setStatus(data?.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="card">
      <h2 className="h2">Get early access</h2>
      <p className="p">
        Leave your email to receive the launch update, the PDF ritual guide, and the first drop announcement.
      </p>

      <form className="email" onSubmit={onSubmit}>
        <input className="input" type="email" name="email" placeholder="you@domain.com" required />
        <button className="btn btn-primary" type="submit">Notify me</button>
      </form>

      <p className="meta" style={{ margin: "10px 0 0", color: "rgba(242,223,178,.95)" }}>
        {status}
      </p>
    </div>
  );
}