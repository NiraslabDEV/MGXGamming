import { NextResponse } from "next/server";

export async function GET() {
  const envKeys = Object.keys(process.env)
    .filter((k) => !k.startsWith("npm_") && !k.startsWith("NODE_") && !k.startsWith("PATH") && !k.startsWith("HOSTNAME") && !k.startsWith("HOME"))
    .sort();

  return NextResponse.json({
    envKeys,
    EMAIL_KEY_set: !!process.env.EMAIL_KEY,
    EMAIL_KEY_length: process.env.EMAIL_KEY?.length ?? 0,
    RESEND_API_KEY_set: !!process.env.RESEND_API_KEY,
    ORGANIZER_EMAIL_set: !!process.env.ORGANIZER_EMAIL,
  });
}
