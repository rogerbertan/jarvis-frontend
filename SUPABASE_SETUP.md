# Supabase Setup Guide

This guide will help you set up Supabase as the backend for your Jarvis expense tracking application.

> **Note**: All UI-facing text (buttons, labels, messages, etc.) should be in Portuguese. Code, documentation, and technical content remain in English.

## Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Project Name**: jarvis-backend (or your choice)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Wait for the project to be created (~2 minutes)

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials from: **Project Settings → API**
   - `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key

3. Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Create Database Schema

Run this SQL in your Supabase SQL Editor (**SQL Editor → New Query**):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incomes table
CREATE TABLE public.incomes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX idx_expenses_date ON public.expenses(date);
CREATE INDEX idx_incomes_user_id ON public.incomes(user_id);
CREATE INDEX idx_incomes_date ON public.incomes(date);
CREATE INDEX idx_categories_user_id ON public.categories(user_id);
```

### 4. Enable Row Level Security (RLS)

**IMPORTANT**: RLS ensures users can only access their own data. Run this SQL:

```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incomes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Users can view own categories" ON public.categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own categories" ON public.categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories" ON public.categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories" ON public.categories
  FOR DELETE USING (auth.uid() = user_id);

-- Expenses policies
CREATE POLICY "Users can view own expenses" ON public.expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own expenses" ON public.expenses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses" ON public.expenses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses" ON public.expenses
  FOR DELETE USING (auth.uid() = user_id);

-- Incomes policies
CREATE POLICY "Users can view own incomes" ON public.incomes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own incomes" ON public.incomes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own incomes" ON public.incomes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own incomes" ON public.incomes
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Set Up Authentication

1. Go to **Authentication → Providers**
2. Enable **Email** provider (enabled by default)
3. Configure email settings:
   - Go to **Authentication → Email Templates**
   - Customize confirmation and reset password emails in Portuguese

### 6. Generate TypeScript Types (Optional but Recommended)

To get accurate types from your database schema:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
npx supabase login

# Generate types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/supabase.ts
```

## Usage Examples

### Client Component with Authentication (UI in Portuguese)

```tsx
'use client'

import { useSupabaseAuth } from '@/hooks/useSupabaseAuth'

export default function Profile() {
  const { user, loading } = useSupabaseAuth()

  if (loading) return <div>Carregando...</div>
  if (!user) return <div>Não autenticado</div>

  return <div>Bem-vindo, {user.email}</div>
}
```

### Server Component with Data Fetching

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function ExpensesList() {
  const supabase = await createClient()

  const { data: expenses } = await supabase
    .from('expenses')
    .select('*')
    .order('date', { ascending: false })

  return (
    <ul>
      {expenses?.map((expense) => (
        <li key={expense.id}>
          {expense.title}: R$ {expense.amount}
        </li>
      ))}
    </ul>
  )
}
```

### Server Action for Mutations

```tsx
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addExpense(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Não autenticado')

  const { error } = await supabase.from('expenses').insert({
    user_id: user.id,
    title: formData.get('title') as string,
    amount: parseFloat(formData.get('amount') as string),
    category: formData.get('category') as string,
    date: new Date().toISOString(),
  })

  if (error) throw error

  revalidatePath('/expenses')
}
```

### Using Custom Hooks

```tsx
'use client'

import { useSupabaseMutation } from '@/hooks/useSupabaseMutation'

export default function AddExpenseForm() {
  const { insert, loading } = useSupabaseMutation('expenses')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await insert({
      title: 'Supermercado',
      amount: 50.00,
      category: 'Alimentação',
      date: new Date().toISOString(),
      user_id: 'current-user-id'
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Despesa'}
      </button>
    </form>
  )
}
```

## Security Best Practices

### 1. **Never Expose Service Role Key**
- Only use `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your frontend
- Service role keys bypass RLS - only use on trusted servers

### 2. **Always Use RLS Policies**
- Every table should have RLS enabled
- Policies should check `auth.uid()` to ensure users only access their data
- Test policies thoroughly before going to production

### 3. **Validate User Input**
- Always validate and sanitize data on the server
- Use TypeScript types for compile-time safety
- Implement proper error handling

### 4. **Secure Environment Variables**
- Never commit `.env.local` to version control
- Use different credentials for development and production
- Rotate keys periodically

## Troubleshooting

### "Invalid JWT" or "Session Expired" Errors
- Clear browser cookies and local storage
- Check that your middleware is running correctly
- Verify environment variables are set correctly

### RLS Policy Errors
- Ensure policies reference `auth.uid()` correctly
- Check that user is authenticated before queries
- Use Supabase dashboard to test policies

### CORS Errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is not paused
- Ensure you're using the correct API keys

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Next Steps

1. ✅ Complete the setup steps above
2. Create login/register pages using the auth utilities (UI in Portuguese)
3. Implement expense/income forms using Server Actions
4. Add real-time subscriptions for live updates (optional)
5. Set up database backups in Supabase dashboard
6. Configure email templates in Portuguese for better user experience

## 📝 Translation Note

Remember to translate all user-facing text to Portuguese:
- Error messages
- Form labels and placeholders
- Button text
- Success/confirmation messages
- Email templates

Example:
```tsx
// Good ✅
<Button>Entrar</Button>
<Input placeholder="Digite seu e-mail" />
{error && <p>Credenciais inválidas</p>}

// Bad ❌
<Button>Login</Button>
<Input placeholder="Enter your email" />
{error && <p>Invalid credentials</p>}
```