# 🚀 Clerk + Supabase Quick Start

Your Clerk authentication is now integrated with Supabase! Follow these steps to get it working.

## ✅ Already Completed

- [x] Clerk React SDK installed
- [x] ClerkSupabaseProvider created
- [x] Authenticated Supabase hook (`useClerkSupabase`)
- [x] Main.tsx updated with providers
- [x] Auth components created
- [x] Webhook handler for user sync

## 📋 Required Configuration

### 1. Get Clerk API Keys (5 min)

1. Go to [clerk.com](https://clerk.com) and sign up/login
2. Create a new application (or use existing)
3. Go to **API Keys** in the dashboard
4. Copy your **Publishable Key** and **Secret Key**

### 2. Configure Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# Clerk Keys
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2FyZWZ1bC1wdW1hLTE0LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_...

# Supabase (already configured)
VITE_SUPABASE_URL=https://tcidaytqzruxqhsbfofy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Create Clerk JWT Template (CRITICAL)

This allows Clerk tokens to work with Supabase:

1. In Clerk Dashboard → **JWT Templates** → **New Template**
2. **Template Name**: `supabase` (must be exactly this)
3. **Template Type**: Choose "Blank" or "Supabase"
4. Click **Create**
5. **Copy the signing secret** (looks like: `clerk_jwt_secret_...`)

### 4. Configure Supabase to Accept Clerk JWTs

1. Go to your **Supabase Dashboard** → **Authentication** → **Providers**
2. Scroll to **Custom JWT Provider**
3. **Enable** it
4. **JWT Secret**: Paste the signing secret from Clerk (step 3)
5. Click **Save**

### 5. Create User Table in Supabase (Optional but Recommended)

Run this SQL in Supabase SQL Editor:

```sql
-- Create partners table
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users view own data"
  ON public.partners FOR SELECT
  USING (auth.jwt() ->> 'sub' = clerk_user_id);

-- Users can update their own data
CREATE POLICY "Users update own data"
  ON public.partners FOR UPDATE
  USING (auth.jwt() ->> 'sub' = clerk_user_id);
```

### 6. Test It!

Start your dev server:

```bash
npm run dev
```

**Test the integration:**

1. Go to `http://localhost:5173`
2. Click "Sign In" (or use the `<ClerkAuthHeader />` component)
3. Create a test account
4. You should be authenticated!

**Verify Supabase connection:**

```tsx
import { useClerkSupabase } from '@/hooks/useClerkSupabase';

function TestComponent() {
  const { user, supabase, isReady } = useClerkSupabase();

  const testQuery = async () => {
    const { data, error } = await supabase.from('partners').select('*');
    console.log('Supabase data:', data);
  };

  return (
    <div>
      <h1>Hello, {user?.firstName}!</h1>
      <button onClick={testQuery}>Test Supabase</button>
    </div>
  );
}
```

## 🎯 Usage Examples

### Add Authentication UI

```tsx
import { ClerkAuthHeader } from '@/components/auth/ClerkAuthHeader';

function App() {
  return (
    <header>
      <ClerkAuthHeader />
    </header>
  );
}
```

### Protect Routes

```tsx
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function ProtectedPage() {
  return (
    <>
      <SignedIn>
        <YourProtectedContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
```

### Query Supabase with Auth

```tsx
import { useClerkSupabase } from '@/hooks/useClerkSupabase';

function Dashboard() {
  const { user, supabase } = useClerkSupabase();

  const fetchUserData = async () => {
    const { data } = await supabase
      .from('partners')
      .select('*')
      .eq('clerk_user_id', user.id);

    return data;
  };

  return <div>Your dashboard</div>;
}
```

## 🔗 Optional: Set Up Webhooks (for user sync)

If you want to automatically sync Clerk users to Supabase:

1. Deploy your webhook endpoint (see `src/api/webhooks/clerk.ts`)
2. In Clerk Dashboard → **Webhooks** → **Add Endpoint**
3. URL: `https://your-domain.com/api/webhooks/clerk`
4. Events: `user.created`, `user.updated`, `user.deleted`
5. Copy the **Signing Secret** to `.env`:
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

## 📚 Documentation

- Full setup guide: `docs/CLERK-SUPABASE-SETUP.md`
- Clerk Docs: https://clerk.com/docs
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security

## 🆘 Troubleshooting

**"Missing Clerk Publishable Key"**
- Add `VITE_CLERK_PUBLISHABLE_KEY` to `.env`
- Restart dev server

**"Invalid JWT" errors**
- Verify JWT template in Clerk is named exactly `supabase`
- Check Supabase has correct JWT secret
- Ensure JWT template is "enabled"

**RLS Policy errors**
- Check that `clerk_user_id` column exists in your table
- Verify RLS policies use `auth.jwt() ->> 'sub'`
- Test queries in Supabase SQL editor

## ✨ Next Steps

1. [ ] Get Clerk API keys
2. [ ] Create Clerk JWT template
3. [ ] Configure Supabase JWT settings
4. [ ] Add `<ClerkAuthHeader />` to your app
5. [ ] Test sign in/sign up flow
6. [ ] Create user table in Supabase
7. [ ] Set up webhooks (optional)

---

**You're all set!** Your Clerk authentication is now fully integrated with Supabase. Users can sign in with Clerk and their data is secured with Supabase RLS policies.
