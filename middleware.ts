import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Next.js Middleware for Supabase Authentication
 *
 * This middleware:
 * - Runs on every request (except static files)
 * - Refreshes the user's session automatically
 * - Handles authentication redirects
 * - Manages cookies for session persistence
 *
 * Routes protected by this middleware:
 * - All routes except /login, /register, /auth/*
 * - Static assets are excluded via the matcher config
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}