import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.has("token");
  let authPath = request.nextUrl.pathname.startsWith("/auth");
  if (authPath && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/auth/:path*",
};




