import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/supabase";

/**
 * Protected routes that require authentication
 * Users not logged in will be redirected to /login
 */
const protectedRoutes = [
  "/",
  "/expenses",
  "/incomes",
  "/analytics",
  "/settings",
];

/**
 * Public routes accessible without authentication
 * Authenticated users on these routes will be redirected to dashboard
 */
const publicRoutes = ["/login", "/register"];

/**
 * Auth callback routes (handled by Supabase)
 * These routes are excluded from auth checks
 */
const authCallbackRoutes = ["/auth/callback", "/auth/confirm"];

/**
 * Updates the user session in Next.js middleware with enhanced security
 *
 * This function:
 * - Creates a Supabase client configured for middleware
 * - Refreshes the user session automatically
 * - Handles authentication redirects based on route type
 * - Manages cookies with security flags (HttpOnly, Secure, SameSite)
 * - Adds Content Security Policy headers
 * - Generates nonces for inline scripts
 *
 * IMPORTANT: This must be called from your middleware.ts file
 *
 * Security features:
 * - HttpOnly cookies to prevent XSS attacks
 * - Secure flag for HTTPS-only transmission
 * - SameSite=Lax to prevent CSRF attacks
 * - Dynamic CSP with nonces for inline scripts
 *
 * @param request - The incoming Next.js request
 * @returns A NextResponse with updated cookies and security headers
 *
 * @example
 * ```ts
 * // middleware.ts
 * import { updateSession } from '@/lib/supabase/middleware'
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request)
 * }
 * ```
 */
export async function updateSession(request: NextRequest) {
  // Generate a unique nonce for CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              httpOnly: true,
              secure: !isDev,
              sameSite: "lax",
            })
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  );
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthCallback = authCallbackRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isAuthCallback) {
    return supabaseResponse;
  }

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  if (isPublicRoute && user) {
    const url = request.nextUrl.clone();
    const from = request.nextUrl.searchParams.get("from");
    url.pathname =
      from && from !== "/login" && from !== "/register" ? from : "/";
    url.searchParams.delete("from");
    return NextResponse.redirect(url);
  }

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""};
    style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`};
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  supabaseResponse.headers.set("Content-Security-Policy", cspHeader);
  supabaseResponse.headers.set("X-Content-Type-Options", "nosniff");
  supabaseResponse.headers.set("X-Frame-Options", "DENY");
  supabaseResponse.headers.set("X-XSS-Protection", "1; mode=block");
  supabaseResponse.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  supabaseResponse.headers.set("x-nonce", nonce);

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
