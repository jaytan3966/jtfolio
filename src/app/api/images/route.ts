import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entityType = searchParams.get("type");
  const name = searchParams.get("name");

  if (!entityType || !name) {
    return new NextResponse("type and name params are required", { status: 400 });
  }

  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    console.error("S3_BUCKET env var is not set");
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const url = `https://${bucket}.s3.amazonaws.com/jtfolio-${entityType}/${name}.png`;
  return new NextResponse(url);
}
