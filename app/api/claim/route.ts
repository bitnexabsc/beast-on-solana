import { NextResponse } from "next/server";
export async function POST() {
  return NextResponse.json({ success: true, message: "Claim received. Beast tokens incoming, anon." });
}
