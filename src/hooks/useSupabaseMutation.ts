'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/supabase'

type TableName = keyof Database['public']['Tables']
type InsertData<T extends TableName> = Database['public']['Tables'][T]['Insert']
type UpdateData<T extends TableName> = Database['public']['Tables'][T]['Update']

/**
 * Hook for mutating data in Supabase (insert, update, delete)
 *
 * This hook provides methods for creating, updating, and deleting records
 * with automatic loading and error states. All operations respect RLS policies.
 *
 * @param table - The name of the table to mutate
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * export default function AddExpenseForm() {
 *   const { insert, loading, error } = useSupabaseMutation('expenses')
 *
 *   const handleSubmit = async (e: React.FormEvent) => {
 *     e.preventDefault()
 *     const result = await insert({
 *       title: 'Groceries',
 *       amount: 50.00,
 *       category: 'Food',
 *       date: new Date().toISOString(),
 *       user_id: 'current-user-id'
 *     })
 *
 *     if (result.data) {
 *       console.log('Expense added:', result.data)
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {error && <p>Error: {error.message}</p>}
 *       <button type="submit" disabled={loading}>
 *         {loading ? 'Adding...' : 'Add Expense'}
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 */
export function useSupabaseMutation<T extends TableName>(table: T) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const insert = async (data: InsertData<T>) => {
    try {
      setLoading(true)
      setError(null)
      const result = await supabase.from(table).insert(data).select()
      return result
    } catch (err) {
      setError(err as Error)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: UpdateData<T>) => {
    try {
      setLoading(true)
      setError(null)
      const result = await supabase.from(table).update(data).eq('id', id).select()
      return result
    } catch (err) {
      setError(err as Error)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const result = await supabase.from(table).delete().eq('id', id)
      return result
    } catch (err) {
      setError(err as Error)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  return { insert, update, remove, loading, error }
}