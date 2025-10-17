import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";

/**
 * Creates a Supabase client for use in Client Components
 *
 * This client is configured for browser environments with:
 * - Automatic session persistence
 * - Auto token refresh
 * - Client-side cookie management
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * import { createClient } from '@/lib/supabase/client'
 *
 * export default function ClientComponent() {
 *   const supabase = createClient()
 *   // Use supabase client...
 * }
 * ```
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
