import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.has("token");
  let authPath = request.nextUrl.pathname.startsWith("/auth");
  let profilePath = request.nextUrl.pathname.startsWith("/profile");
  let cartPath = request.nextUrl.pathname.startsWith("/cart");

  if (authPath && cookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (profilePath && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (cartPath && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/profile/:path*", "/cart/:path*"],
};
