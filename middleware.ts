import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookies or headers
  const token = request.cookies.get("adminToken")?.value || request.headers.get("Authorization")?.split(" ")[1]

  // Check if the path is dashboard or other protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/roles") ||
    pathname.startsWith("/permissions") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/logs") ||
    pathname.startsWith("/settings")

  // Check if the path is auth routes
  const isAuthRoute = pathname.startsWith("/auth")

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If trying to access auth routes with token, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/roles/:path*",
    "/permissions/:path*",
    "/profile/:path*",
    "/logs/:path*",
    "/settings/:path*",
    "/auth/:path*",
  ],
}
