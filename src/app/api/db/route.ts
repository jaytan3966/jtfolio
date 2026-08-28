import { NextResponse } from "next/server";
import { getItemsCached } from "@/lib/db";
import { cachedJson } from "@/lib/http-cache";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get("type");

    if (!entityType) {
      return NextResponse.json(
        { error: "Type parameter is required" },
        { status: 400 },
      );
    }

    const items = await getItemsCached(entityType);
    return cachedJson(request, items);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
