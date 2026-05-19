import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { ImageEntityType, uploadImage } from "@/lib/s3";

const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  const guard = await requireAuth();
  if (guard) return guard;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const entityType = form.get("entityType");
  const name = form.get("name");
  const file = form.get("file");

  if (entityType !== "experience" && entityType !== "courses") {
    return NextResponse.json(
      { error: "entityType must be 'experience' or 'courses'" },
      { status: 400 },
    );
  }
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported image type: ${file.type}` },
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
    await uploadImage(entityType as ImageEntityType, name.trim(), buffer, file.type);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/admin/upload", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
