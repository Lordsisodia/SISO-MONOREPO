
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '@/components/landing/LandingPage';
import { supabase } from '@/integrations/supabase/client';
import { useAdminCheck } from '@/hooks/useAdminCheck';

const Index = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdminCheck();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    // Only check once when auth is ready
    if (isLoading || hasCheckedAuth) return;

    // Check if user has an active session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setHasCheckedAuth(true);
        // Redirect based on admin status
        if (isAdmin) {
          navigate('/admin/clients', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }
      }
    }).catch(error => {
      console.error("Auth check error:", error);
    });
  }, [navigate, isAdmin, isLoading, hasCheckedAuth]);

  return <LandingPage />;
};

export default Index;
