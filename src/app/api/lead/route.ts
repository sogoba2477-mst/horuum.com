import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { ok: false, error: "Missing Supabase environment variables." },
        { status: 500 }
      );
    }

    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({ email }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: text || "Supabase insert failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, inserted: text });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Bad request. Could not read request body." },
      { status: 400 }
    );
  }
}