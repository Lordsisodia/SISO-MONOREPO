import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface ClerkAuthGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ClerkAuthGuard = ({ children, adminOnly = false }: ClerkAuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isLoaded) return;

      // Not signed in, redirect to sign in
      if (!isSignedIn || !userId) {
        console.log('ClerkAuthGuard - No active session, redirecting to sign in');
        navigate('/auth/login', { replace: true });
        return;
      }

      console.log('ClerkAuthGuard - User authenticated:', userId);

      // Check if user is admin
      try {
        // Check user metadata or role in Supabase
        const { data: userData, error } = await supabase
          .from('users')
          .select('clerk_data')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          setIsAdmin(false);
        } else {
          // Check if user has admin role in Clerk metadata
          const isUserAdmin =
            user?.publicMetadata?.role === 'admin' ||
            user?.organizationMemberships?.some(m => m.role === 'admin') ||
            userData?.clerk_data?.publicMetadata?.role === 'admin';

          setIsAdmin(!!isUserAdmin);

          // Auto-redirect admin users to admin dashboard if they're on the home page
          if (isUserAdmin && location.pathname === '/home') {
            console.log('ClerkAuthGuard - Admin user detected on home page, redirecting to admin dashboard');
            toast({
              title: "Admin Access",
              description: "Redirecting to admin dashboard."
            });
            navigate('/admin', { replace: true });
            return;
          }

          // If this is an admin-only route and user is not an admin, redirect
          if (adminOnly && !isUserAdmin) {
            console.log('ClerkAuthGuard - Not an admin, redirecting to home');
            toast({
              variant: "destructive",
              title: "Access Denied",
              description: "You don't have admin privileges to access this page."
            });
            navigate('/home', { replace: true });
            return;
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        if (adminOnly) {
          toast({
            variant: "destructive",
            title: "Access Check Failed",
            description: "There was a problem verifying your access permissions."
          });
          navigate('/home', { replace: true });
          return;
        }
      } finally {
        setIsChecking(false);
      }
    };

    checkAdminStatus();
  }, [isLoaded, isSignedIn, userId, user, adminOnly, navigate, location.pathname, toast]);

  // Show loading state while checking auth
  if (!isLoaded || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-siso-orange"></div>
      </div>
    );
  }

  // If not signed in, don't render children (will be redirected)
  if (!isSignedIn) {
    return null;
  }

  // If admin only and not admin, don't render children (will be redirected)
  if (adminOnly && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};
