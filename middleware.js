import { NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest, COOKIE_NAME } from "./lib/auth";

const PUBLIC_API_PATHS = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/me",
  "/api/health",
];

function isPublicApi(pathname) {
  return PUBLIC_API_PATHS.some((p) => pathname === p || pathname.startsWith(p + "?"));
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /api/* except auth and health
  if (pathname.startsWith("/api/") && !isPublicApi(pathname)) {
    const token = getTokenFromRequest(request);
    const payload = await verifyToken(token);
    if (!payload?.sub || payload.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
