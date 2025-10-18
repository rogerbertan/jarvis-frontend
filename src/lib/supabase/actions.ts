'use server'

import { createClient } from './server'

/**
 * Creates a user profile in the database after successful registration
 *
 * This function should be called immediately after Supabase auth.signUp()
 * to create the corresponding user record in the public.users table
 */
export async function createUserProfile(userId: string, email: string, fullName: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('users')
      .insert({
        id: userId,
        email: email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      throw new Error('Falha ao criar perfil do usuário')
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error in createUserProfile:', error)
    throw error
  }
}

/**
 * Gets the current user's profile from the database
 */
export async function getUserProfile(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}