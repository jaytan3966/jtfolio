import { NextResponse } from "next/server";
import { resumeExists, resumeUrl } from "@/lib/s3";

// Public endpoint: always points at the latest resume. Redirects to the
// S3-hosted copy when one has been uploaded, otherwise the bundled PDF.
export async function GET(request: Request) {
  let target: string;
  try {
    target = (await resumeExists())
      ? resumeUrl()
      : new URL("/JAYDEN_TAN_RESUME.pdf", request.url).toString();
  } catch (err) {
    console.error("GET /api/resume", err);
    target = new URL("/JAYDEN_TAN_RESUME.pdf", request.url).toString();
  }

  const res = NextResponse.redirect(target, 307);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
