import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { createItemIfNotExists, getItems } from "@/lib/db";

const ENTITY_TYPE = "COURSES";

type CourseInput = {
  name: string;
  courseTitle: string;
  description: string;
  lessons: string[];
  href: string;
  rigor: number;
};

function validate(body: unknown): CourseInput | string {
  if (!body || typeof body !== "object") return "Invalid body";
  const b = body as Record<string, unknown>;
  if (typeof b.name !== "string" || !b.name.trim()) return "name is required";
  if (typeof b.courseTitle !== "string") return "courseTitle must be a string";
  if (typeof b.description !== "string") return "description must be a string";
  if (!Array.isArray(b.lessons) || !b.lessons.every((s) => typeof s === "string"))
    return "lessons must be an array of strings";
  if (typeof b.href !== "string") return "href must be a string";
  if (typeof b.rigor !== "number") return "rigor must be a number";

  return {
    name: b.name.trim(),
    courseTitle: b.courseTitle,
    description: b.description,
    lessons: b.lessons as string[],
    href: b.href,
    rigor: b.rigor,
  };
}

export async function GET() {
  const guard = await requireAuth();
  if (guard) return guard;

  try {
    const items = await getItems(ENTITY_TYPE);
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/admin/courses", err);
    return NextResponse.json({ error: "Failed to load courses" }, { status: 500 });
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
        { error: `A course named "${parsed.name}" already exists` },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: true, item: parsed }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/courses", err);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
