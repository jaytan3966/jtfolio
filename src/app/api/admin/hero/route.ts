import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { getItems, putItem } from "@/lib/db";

const ENTITY_TYPE = "HERO";
const NAME = "main";

type HeroUpdate = {
  paragraphs: string[];
};

function validate(body: unknown): HeroUpdate | string {
  if (!body || typeof body !== "object") return "Invalid body";
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.paragraphs) || !b.paragraphs.every((p) => typeof p === "string"))
    return "paragraphs must be an array of strings";
  const paragraphs = (b.paragraphs as string[]).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) return "At least one paragraph is required";
  return { paragraphs };
}

export async function GET() {
  const guard = await requireAuth();
  if (guard) return guard;

  try {
    const items = await getItems(ENTITY_TYPE);
    return NextResponse.json(items[0] ?? null);
  } catch (err) {
    console.error("GET /api/admin/hero", err);
    return NextResponse.json({ error: "Failed to load hero" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const guard = await requireAuth();
  if (guard) return guard;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = validate(body);
  if (typeof parsed === "string") {
    return NextResponse.json({ error: parsed }, { status: 400 });
  }

  try {
    await putItem({ entityType: ENTITY_TYPE, name: NAME, ...parsed });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/admin/hero", err);
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}
