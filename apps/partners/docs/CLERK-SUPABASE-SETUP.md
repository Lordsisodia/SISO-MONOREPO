# Clerk + Supabase Integration Guide

This guide explains how to set up Clerk authentication with Supabase database for SISO Partnerships.

## Architecture Overview

- **Clerk**: Handles authentication (login, signup, session management)
- **Supabase**: Database backend with Row Level Security (RLS)
- **Integration**: Clerk JWT tokens authenticate Supabase queries

## Setup Steps

### 1. Configure Clerk

1. **Create a Clerk Application** at [clerk.com](https://clerk.com)

2. **Get your API keys** from the Clerk Dashboard:
   - Publishable Key: `pk_test_...`
   - Secret Key: `sk_test_...`

3. **Add keys to `.env`**:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY
   CLERK_SECRET_KEY=sk_test_YOUR_KEY
   ```

4. **Create Supabase JWT Template** in Clerk:
   - Go to: Clerk Dashboard → JWT Templates → New Template
   - Name: `supabase`
   - Template type: `Supabase`
   - Copy the signing secret (you'll need this for Supabase)

### 2. Configure Supabase

1. **Go to your Supabase project** → Authentication → Providers

2. **Enable Custom JWT Provider**:
   ```
   JWT Secret: [Paste the signing secret from Clerk JWT template]
   ```

3. **Update your Supabase JWT settings**:
   - Go to: Project Settings → API
   - Scroll to "JWT Settings"
   - Add custom JWT secret from Clerk

### 3. Set Up User Sync (Recommended)

Create a Supabase table to store user data:

\`\`\`sql
-- Create partners/users table
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

-- Enable RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own data"
  ON public.partners
  FOR SELECT
  USING (auth.jwt() ->> 'sub' = clerk_user_id);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON public.partners
  FOR UPDATE
  USING (auth.jwt() ->> 'sub' = clerk_user_id);
\`\`\`

### 4. Create Clerk Webhook (for user sync)

1. **Create webhook endpoint** (see `src/api/webhooks/clerk.ts`)

2. **Configure in Clerk**:
   - Go to: Clerk Dashboard → Webhooks → Add Endpoint
   - URL: `https://your-domain.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`

3. **Add webhook secret to `.env`**:
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_...
   ```

## Usage in Components

### Basic Usage

\`\`\`tsx
import { useClerkSupabase } from '@/hooks/useClerkSupabase';

function MyComponent() {
  const { user, isSignedIn, supabase, isReady } = useClerkSupabase();

  if (!isReady) return <div>Loading...</div>;

  if (!isSignedIn) return <div>Please sign in</div>;

  // Fetch data with authenticated Supabase client
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('clerk_user_id', user.id);

    if (error) console.error(error);
    return data;
  };

  return <div>Hello, {user.firstName}!</div>;
}
\`\`\`

### With Clerk Components

\`\`\`tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </header>
  );
}
\`\`\`

### Protected Routes

\`\`\`tsx
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) return <Navigate to="/sign-in" />;

  return <>{children}</>;
}
\`\`\`

## Testing the Integration

1. **Start dev server**: `npm run dev`

2. **Sign up a new user** via Clerk UI

3. **Verify JWT token**:
   \`\`\`tsx
   const { getToken } = useAuth();
   const token = await getToken({ template: 'supabase' });
   console.log('Supabase JWT:', token);
   \`\`\`

4. **Test Supabase query**:
   \`\`\`tsx
   const { data } = await supabase.from('partners').select('*');
   console.log('Partner data:', data);
   \`\`\`

## Troubleshooting

### Error: "Missing Clerk Publishable Key"
- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is in your `.env` file
- Restart dev server after adding env variables

### Error: "JWT expired" or "Invalid JWT"
- Verify Clerk JWT template is configured correctly
- Check that Supabase has the correct JWT secret from Clerk
- Ensure JWT template name is exactly `supabase`

### RLS Policy Errors
- Verify RLS policies use `auth.jwt() ->> 'sub'` to get Clerk user ID
- Check that Clerk user ID is stored in your database table
- Test policies in Supabase SQL editor

## Security Best Practices

1. **Always use RLS policies** for data access control
2. **Store Clerk user ID** in database for policy enforcement
3. **Use Clerk's UserButton** for secure sign-out
4. **Enable MFA** in Clerk for sensitive operations
5. **Validate webhook signatures** for user sync endpoints

## Next Steps

- [ ] Set up Clerk JWT template
- [ ] Configure Supabase JWT settings
- [ ] Create user sync webhook
- [ ] Add Clerk components to your app
- [ ] Test authentication flow
- [ ] Set up RLS policies

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Clerk + Supabase Integration](https://clerk.com/docs/integrations/databases/supabase)
