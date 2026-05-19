import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { createItemIfNotExists, getItems } from "@/lib/db";

const ENTITY_TYPE = "EXPERIENCE";

type ExperienceInput = {
  name: string;
  title: string;
  description: string;
  skills: string[];
  href: string;
  rank?: number;
};

function validate(body: unknown): ExperienceInput | string {
  if (!body || typeof body !== "object") return "Invalid body";
  const b = body as Record<string, unknown>;
  if (typeof b.name !== "string" || !b.name.trim()) return "name is required";
  if (typeof b.title !== "string") return "title must be a string";
  if (typeof b.description !== "string") return "description must be a string";
  if (!Array.isArray(b.skills) || !b.skills.every((s) => typeof s === "string"))
    return "skills must be an array of strings";
  if (typeof b.href !== "string") return "href must be a string";
  if (b.rank !== undefined && typeof b.rank !== "number") return "rank must be a number";

  return {
    name: b.name.trim(),
    title: b.title,
    description: b.description,
    skills: b.skills as string[],
    href: b.href,
    rank: b.rank as number | undefined,
  };
}

export async function GET() {
  const guard = await requireAuth();
  if (guard) return guard;

  try {
    const items = await getItems(ENTITY_TYPE);
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/admin/experiences", err);
    return NextResponse.json({ error: "Failed to load experiences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const created = await createItemIfNotExists({
      entityType: ENTITY_TYPE,
      ...parsed,
    });
    if (!created) {
      return NextResponse.json(
        { error: `An experience named "${parsed.name}" already exists` },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: true, item: parsed }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/experiences", err);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
