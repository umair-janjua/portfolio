import { NextResponse } from "next/server";
import { PROFILE } from "@/data/portfolio";

interface ContactPayload {
  name?: string;
  email?: string;
  track?: string;
  timeline?: string;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const track = (body.track || "General Inquiry").trim();
    const timeline = (body.timeline || "Flexible").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { delivered: false, error: "Please provide your name, email, and project/role brief." },
        { status: 400 }
      );
    }

    const subject = `[Portfolio Inquiry · ${track}] from ${name}`;
    const formattedText = [
      `New Portfolio Inquiry for ${PROFILE.name}`,
      `----------------------------------------`,
      `From     : ${name} <${email}>`,
      `Track    : ${track}`,
      `Timeline : ${timeline}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    // 1. Optional Resend integration (set RESEND_API_KEY in Vercel env vars)
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [PROFILE.email],
          reply_to: email,
          subject,
          text: formattedText,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ delivered: true, provider: "resend" });
      }
    }

    // 2. Optional Web3Forms integration (set WEB3FORMS_ACCESS_KEY in Vercel env vars)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      const w3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: name,
          email,
          track,
          timeline,
          message,
        }),
      });

      if (w3Res.ok) {
        return NextResponse.json({ delivered: true, provider: "web3forms" });
      }
    }

    // Graceful client-channel handoff when no server mail key is configured
    return NextResponse.json({ delivered: false, fallback: true });
  } catch {
    return NextResponse.json({ delivered: false, fallback: true });
  }
}

