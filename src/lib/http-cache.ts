import { createHash } from "crypto";
import { NextResponse } from "next/server";

/**
 * Browser cache window for public read endpoints. Short enough that an edit
 * shows up on a visitor's next visit, long enough that hammering refresh does
 * not produce a request per reload.
 */
export const PUBLIC_MAX_AGE = 60;

/** How long a shared cache (CDN) may serve a response before revalidating. */
export const PUBLIC_S_MAXAGE = 300;

/** How long a stale response may be served while revalidating in background. */
export const PUBLIC_SWR = 86400;

export function publicCacheControl({
  maxAge = PUBLIC_MAX_AGE,
  sMaxAge = PUBLIC_S_MAXAGE,
  swr = PUBLIC_SWR,
}: { maxAge?: number; sMaxAge?: number; swr?: number } = {}): string {
  return `public, max-age=${maxAge}, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}`;
}

function etagFor(body: string): string {
  return `"${createHash("sha1").update(body).digest("base64url")}"`;
}

/**
 * JSON response with cache headers and a content ETag. When the client already
 * holds the same version it gets a bodyless 304 instead of the payload.
 */
export function cachedJson(
  request: Request,
  data: unknown,
  cacheControl: string = publicCacheControl(),
): NextResponse {
  const body = JSON.stringify(data);
  const etag = etagFor(body);
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": cacheControl,
    ETag: etag,
    Vary: "Accept-Encoding",
  };

  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304, headers });
  }
  return new NextResponse(body, { status: 200, headers });
}

/** Same contract as cachedJson, for plain-text payloads. */
export function cachedText(
  request: Request,
  body: string,
  cacheControl: string = publicCacheControl(),
): NextResponse {
  const etag = etagFor(body);
  const headers = {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": cacheControl,
    ETag: etag,
  };

  if (request.headers.get("if-none-match") === etag) {
    return new NextResponse(null, { status: 304, headers });
  }
  return new NextResponse(body, { status: 200, headers });
}
