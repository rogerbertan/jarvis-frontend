import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js Middleware for Supabase Authentication & Security
 *
 * This middleware provides comprehensive security and authentication:
 *
 * Authentication:
 * - Runs on every request (except static files and API routes)
 * - Refreshes the user's session automatically via Supabase
 * - Handles authentication redirects for protected routes
 * - Manages cookies for session persistence
 * - Preserves original path for post-login redirect
 *
 * Security Headers:
 * - Content Security Policy (CSP) with dynamic nonces
 * - X-Content-Type-Options: nosniff
 * - X-Frame-Options: DENY
 * - X-XSS-Protection: 1; mode=block
 * - Referrer-Policy: strict-origin-when-cross-origin
 *
 * Protected Routes:
 * - / (dashboard)
 * - /expenses
 * - /incomes
 * - /analytics
 * - /settings
 *
 * Public Routes:
 * - /login
 * - /register
 * - /auth/* (Supabase callbacks)
 *
 * @see src/lib/supabase/middleware.ts for implementation details
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

/**
 * Matcher configuration
 *
 * This config determines which routes the middleware runs on.
 * We exclude:
 * - Static files (_next/static, _next/image)
 * - Favicon and common image formats
 * - Prefetch requests (performance optimization)
 *
 * The middleware runs on all other routes for security.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (svg, png, jpg, jpeg, gif, webp)
     */
    {
      source:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
