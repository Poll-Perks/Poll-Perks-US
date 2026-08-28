import { NextRequest, NextResponse } from "next/server";

// Locks down the admin review queue (the page itself, plus the two
// approve/reject API routes it calls) behind a simple username +
// password prompt, using the browser's built-in login box (HTTP Basic
// Auth). This runs before any of those pages/routes execute.
//
// The username/password live in Vercel's environment variables
// (ADMIN_USER / ADMIN_PASSWORD) — see the README for how to set them.
// If either is missing, every admin request is blocked with a 500 so
// this never silently ships wide open.
export function middleware(request: NextRequest) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Admin login is not configured. Set ADMIN_USER and ADMIN_PASSWORD.", {
      status: 500,
    });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    const encoded = authHeader.split(" ")[1] ?? "";
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    if (user === expectedUser && password === expectedPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Login required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="PollPerks Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/listings/:id/approve", "/api/listings/:id/reject"],
};
