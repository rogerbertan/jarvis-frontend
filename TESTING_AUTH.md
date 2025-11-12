# Testing Authentication - Quick Guide

## 🧪 How to Test Login & Registration

### Prerequisites:

1. ✅ Supabase project configured
2. ✅ Environment variables set in `.env.local`
3. ✅ Database schema created (from `SUPABASE_SETUP.md`)
4. ✅ Development server running (`pnpm dev`)

---

## Test 1: User Registration

### Steps:

1. Navigate to http://localhost:3000/register
2. Fill in the form:
   - **Nome**: João Silva
   - **Email**: joao@test.com
   - **Senha**: 123456
   - **Confirmar senha**: 123456
3. Click "Criar conta"

### Expected Result:

- ✅ Form shows "Criando conta..." while processing
- ✅ User is created in Supabase Auth
- ✅ User profile is created in `users` table
- ✅ Redirect to dashboard (/)
- ✅ User is logged in

### Check in Supabase Dashboard:

1. **Authentication → Users** - You should see the new user
2. **Table Editor → users** - You should see the profile record

---

## Test 2: User Login

### Steps:

1. If logged in, logout first
2. Navigate to http://localhost:3000/login
3. Fill in the form:
   - **Email**: joao@test.com
   - **Senha**: 123456
4. Click "Entrar"

### Expected Result:

- ✅ Form shows "Entrando..." while processing
- ✅ User is authenticated
- ✅ Redirect to dashboard (/)
- ✅ Session is maintained (refresh page - still logged in)

---

## Test 3: Form Validation

### Test Password Mismatch:

1. Go to /register
2. Enter different passwords in "Senha" and "Confirmar senha"
3. Click "Criar conta"
4. **Expected**: Error message "As senhas não coincidem"

### Test Short Password:

1. Go to /register
2. Enter password less than 6 characters
3. Click "Criar conta"
4. **Expected**: Error message "A senha deve ter no mínimo 6 caracteres"

### Test Duplicate Email:

1. Try to register with an existing email
2. **Expected**: Error message "Este email já está cadastrado"

### Test Invalid Login:

1. Go to /login
2. Enter wrong email or password
3. **Expected**: Error message "Email ou senha inválidos"

---

## Test 4: Protected Routes

### Test Unauthenticated Access:

1. Logout (if logged in)
2. Try to access http://localhost:3000/
3. **Expected**: Redirect to /login (via middleware)

### Test Authenticated Redirect:

1. Login successfully
2. Try to access http://localhost:3000/login
3. **Expected**: Redirect to / (dashboard)

---

## Test 5: Session Persistence

### Test Page Refresh:

1. Login successfully
2. Refresh the page (F5)
3. **Expected**: Still logged in

### Test Browser Restart:

1. Login successfully
2. Close and reopen browser
3. Navigate to http://localhost:3000
4. **Expected**: Still logged in (cookies persisted)

---

## 🐛 Troubleshooting

### "Email ou senha inválidos"

- Check email/password are correct
- Verify user exists in Supabase Dashboard → Authentication → Users

### "Erro ao criar conta"

- Check browser console for detailed error
- Verify `.env.local` variables are correct
- Check Supabase project is not paused

### Profile Not Created

- Check browser console for errors from `createUserProfile`
- Verify `users` table exists in Supabase
- Check RLS policies allow INSERT for authenticated users

### Redirects Not Working

- Verify middleware is running (check `middleware.ts` exists at root)
- Check Next.js dev server console for middleware logs
- Clear browser cookies and try again

---

## 📊 What to Check in Supabase Dashboard

After successful registration:

### 1. Authentication → Users

- User should appear with:
  - Email
  - Created timestamp
  - User metadata with `full_name`

### 2. Table Editor → users

- Profile record should exist with:
  - `id` (same as auth user id)
  - `email`
  - `full_name`
  - `created_at`
  - `updated_at`

### 3. Logs → Auth Logs

- You should see:
  - `user.signup` event
  - `user.login` event

---

## ✅ Success Checklist

After testing, you should have:

- [ ] Successfully registered a new user
- [ ] User appears in Supabase Auth
- [ ] User profile created in `users` table
- [ ] Successfully logged in
- [ ] Form validation works for all cases
- [ ] Redirects work correctly
- [ ] Session persists across page refreshes
- [ ] Middleware protects routes

---

## 🎯 Next Steps

Once authentication is working:

1. Add logout functionality to the UI
2. Create a user profile page
3. Start building expense/income forms
4. Connect data to the authenticated user

## 🔐 Security Notes

- All passwords are hashed by Supabase (never stored in plain text)
- Sessions use secure HTTP-only cookies
- RLS policies prevent users from accessing other users' data
- HTTPS is required in production (enforced by Supabase)
