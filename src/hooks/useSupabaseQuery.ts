"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

type TableName = keyof Database["public"]["Tables"];

/**
 * Hook for fetching data from Supabase with RLS (Row Level Security)
 *
 * This hook provides a simple way to fetch data from your Supabase tables
 * with automatic loading and error states. It respects RLS policies.
 *
 * @param table - The name of the table to query
 * @param query - A function that builds the query using the Supabase client
 *
 * @example
 * ```tsx
 * 'use client'
 *
 * export default function ExpensesList() {
 *   const { data, loading, error } = useSupabaseQuery(
 *     'expenses',
 *     (query) => query.select('*').order('date', { ascending: false })
 *   )
 *
 *   if (loading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 *
 *   return (
 *     <ul>
 *       {data?.map((expense) => (S
 *         <li key={expense.id}>{expense.title}: ${expense.amount}</li>
 *       ))}
 *     </ul>
 *   )
 * }
 * ```
 */
export function useSupabaseQuery<T extends TableName>(
  table: T,
  query?: (q: ReturnType<ReturnType<typeof createClient>["from"]>) => any
) {
  const [data, setData] = useState<
    Database["public"]["Tables"][T]["Row"][] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let queryBuilder = supabase.from(table);

        if (query) {
          queryBuilder = query(queryBuilder);
        } else {
          queryBuilder = queryBuilder.select("*");
        }

        const { data: result, error: queryError } = await queryBuilder;

        if (queryError) {
          setError(queryError);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, query, supabase]);

  return { data, loading, error, refetch: () => setLoading(true) };
}
