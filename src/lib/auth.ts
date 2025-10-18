"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

/**
 * Get the currently authenticated user
 * Returns null if not authenticated
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Require authentication - redirects to /login if not authenticated
 * Use this in Server Components to protect pages
 */
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Sign in with email and password
 */
export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=Credenciais inválidas");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Sign up with email and password
 */
export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect("/register?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/login?message=Verifique seu e-mail para confirmar sua conta");
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  await supabase.auth.signOut({ scope: "global" });

  // Delete all Supabase cookies
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    if (cookie.name.includes("sb-")) {
      cookieStore.delete({
        name: cookie.name,
        path: "/",
      });
    }
  }

  revalidatePath("/", "layout");
  redirect("/login");
}