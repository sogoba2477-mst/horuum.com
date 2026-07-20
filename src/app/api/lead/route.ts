import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "Supabase environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { error } = await supabase
      .from("leads")
      .insert([{ email }]);

    if (error) {
      console.error("Supabase insert error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks — you’re on the list.",
    });
  } catch (error) {
    console.error("Lead API error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Bad request. Could not read request body.",
      },
      { status: 400 }
    );
  }
}