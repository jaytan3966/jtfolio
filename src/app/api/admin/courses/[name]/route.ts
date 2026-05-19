import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-utils";
import { deleteItem, putItem } from "@/lib/db";

const ENTITY_TYPE = "COURSES";

type CourseUpdate = {
  courseTitle: string;
  description: string;
  lessons: string[];
  href: string;
  rigor: number;
};

function validate(body: unknown): CourseUpdate | string {
  if (!body || typeof body !== "object") return "Invalid body";
  const b = body as Record<string, unknown>;
  if (typeof b.courseTitle !== "string") return "courseTitle must be a string";
  if (typeof b.description !== "string") return "description must be a string";
  if (!Array.isArray(b.lessons) || !b.lessons.every((s) => typeof s === "string"))
    return "lessons must be an array of strings";
  if (typeof b.href !== "string") return "href must be a string";
  if (typeof b.rigor !== "number") return "rigor must be a number";

  return {
    courseTitle: b.courseTitle,
    description: b.description,
    lessons: b.lessons as string[],
    href: b.href,
    rigor: b.rigor,
  };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const guard = await requireAuth();
  if (guard) return guard;

  const { name } = await params;
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

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
    await putItem({ entityType: ENTITY_TYPE, name, ...parsed });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/admin/courses/[name]", err);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const guard = await requireAuth();
  if (guard) return guard;

  const { name } = await params;
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

  try {
    await deleteItem(ENTITY_TYPE, name);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/courses/[name]", err);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
