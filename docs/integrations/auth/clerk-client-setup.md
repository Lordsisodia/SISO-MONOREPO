# Clerk + Supabase Integration Setup

This guide explains how to complete the Clerk authentication setup and connect it to Supabase.

## ✅ What's Already Done

1. ✅ Clerk React SDK installed
2. ✅ ClerkProvider configured in `main.tsx`
3. ✅ Supabase users table schema created
4. ✅ Webhook endpoint created at `api/webhooks/clerk.ts`
5. ✅ API server configured to run with Vite

## 🔑 Step 1: Get Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys)
2. Select **React** as your framework
3. Copy your **Publishable Key**
4. Copy your **Secret Key** (from the same page)

## 📝 Step 2: Update `.env.local`

Replace the placeholders in `.env.local`:

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_XXXXX  # Paste your Clerk publishable key
CLERK_SECRET_KEY=sk_test_XXXXX            # Paste your Clerk secret key
CLERK_WEBHOOK_SECRET=whsec_XXXXX          # Get this in Step 3

# API Configuration
API_PORT=3001

# Supabase Service Key
SUPABASE_URL=https://yeqosbhihojkrgexenzj.supabase.co
SUPABASE_SERVICE_KEY=YOUR_SUPABASE_SERVICE_KEY  # Get from Supabase dashboard
```

### Getting Supabase Service Key:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **service_role** key (NOT the anon key)

## 🔗 Step 3: Configure Clerk Webhook

1. Go to [Clerk Dashboard → Webhooks](https://dashboard.clerk.com/last-active?path=webhooks)
2. Click **+ Add Endpoint**
3. Enter your webhook URL:
   - **Development**: `http://localhost:3001/api/webhooks/clerk`
   - **Production**: `https://your-domain.com/api/webhooks/clerk`
4. Subscribe to these events:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
5. Copy the **Signing Secret** and add it to `.env.local` as `CLERK_WEBHOOK_SECRET`

## 🗄️ Step 4: Run Supabase Migrations

Apply the database schema:

```bash
# Connect to Supabase (if using Supabase CLI)
npx supabase db push

# OR run migrations manually in Supabase SQL Editor
# Copy contents of:
# - supabase/migrations/001_init_client_portal.sql
# - supabase/migrations/002_clerk_integration.sql
```

## 🚀 Step 5: Start the App

```bash
npm run dev
```

This will start:
- ✅ Vite dev server on `http://localhost:5173`
- ✅ API server on `http://localhost:3001`

## 🧪 Step 6: Test Authentication

1. Open `http://localhost:5173`
2. Sign up with a test account
3. Check Supabase dashboard → `users` table
4. Verify user was created

## 🔐 How It Works

### Authentication Flow:
1. User signs up/in via Clerk components
2. Clerk handles authentication
3. Clerk sends webhook to `http://localhost:3001/api/webhooks/clerk`
4. Webhook syncs user data to Supabase `users` table
5. Client data links to `users.id` (Clerk user ID)

### Database Structure:
- `users` table → Stores Clerk user data
- `clients` table → Links to `users.clerk_user_id`
- `client_projects`, `client_files`, etc. → Link to `clients.id`

## 🛡️ Security Notes

- ✅ `.env.local` is gitignored (secrets safe)
- ✅ Webhook uses Svix for signature verification
- ✅ Supabase uses service key (server-side only)
- ✅ Row Level Security (RLS) enabled on all tables

## 📚 Next Steps

1. Update `AuthGuard` component to use Clerk hooks
2. Replace existing auth components with Clerk components
3. Test all authenticated routes
4. Deploy webhook endpoint to production

## 🐛 Troubleshooting

### "Missing Clerk Publishable Key" error
- Check `.env.local` has `VITE_CLERK_PUBLISHABLE_KEY`
- Restart dev server after updating `.env.local`

### Webhook not syncing users
- Check webhook URL is correct
- Verify `CLERK_WEBHOOK_SECRET` matches Clerk dashboard
- Check API server logs for errors
- Test webhook manually: `curl -X POST http://localhost:3001/api/health`

### Supabase connection errors
- Verify `SUPABASE_SERVICE_KEY` is the service_role key
- Check Supabase project is active
- Run migrations if tables don't exist

## 📖 Resources

- [Clerk React Docs](https://clerk.com/docs/quickstarts/react)
- [Clerk Webhooks](https://clerk.com/docs/integrations/webhooks)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
