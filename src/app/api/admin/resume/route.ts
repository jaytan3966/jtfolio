import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { uploadResume } from "@/lib/s3";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  const guard = await requireAuth();
  if (guard) return guard;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: `Resume must be a PDF (got ${file.type || "unknown type"})` },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File is too large (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 },
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadResume(buffer, file.type);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/admin/resume", err);
    return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 });
  }
}
