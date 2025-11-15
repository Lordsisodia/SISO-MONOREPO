import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

/**
 * Authentication header component using Clerk
 *
 * Shows:
 * - Sign In button when user is signed out
 * - User avatar/menu when user is signed in
 */
export function ClerkAuthHeader() {
  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10"
            }
          }}
        />
      </SignedIn>
    </div>
  );
}
