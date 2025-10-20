"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

/**
 * Hook for managing Supabase authentication state on the client
 *
 * This hook:
 * - Tracks the current user's authentication state
 * - Listens for auth state changes (sign in, sign out, token refresh)
 * - Automatically updates when the user's session changes
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * export default function ProfileComponent() {
 *   const { user, loading } = useSupabaseAuth()
 *
 *   if (loading) return <div>Loading...</div>
 *   if (!user) return <div>Not authenticated</div>
 *
 *   return <div>Welcome, {user.email}</div>
 * }
 * ```
 */
export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return { user, loading };
}
