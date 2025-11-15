
import { motion } from 'framer-motion';
import { useDayPeriod } from '@/hooks/useDayPeriod';
import { useUser } from '@/hooks/useUser';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useClientData } from '@/hooks/useClientData';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Circle } from 'lucide-react';

export function WelcomeHeader() {
  const { period, greeting, icon: PeriodIcon, gradientClass } = useDayPeriod();
  const { user } = useUser();
  const { user: authUser } = useAuthSession();
  const { data: clientData, isLoading: clientLoading } = useClientData();
  
  // Enhanced name detection
  const getDisplayName = () => {
    if (clientData?.contact_name) {
      return clientData.contact_name.split(' ')[0]; // First name only
    }
    if (clientData?.company_name) {
      return clientData.company_name;
    }
    if (authUser?.user_metadata?.full_name) {
      return authUser.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'there';
  };

  const displayName = getDisplayName();
  const isClient = !!clientData;
  
  // Loading state
  if (clientLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative border-0 bg-gradient-to-r from-siso-bg-primary via-siso-bg-secondary to-siso-bg-tertiary backdrop-blur-sm shadow-lg mb-6 overflow-hidden">
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="h-14 w-14 rounded-full bg-white/20 animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-48 bg-white/20" />
                  <Skeleton className="h-5 w-32 bg-white/20" />
                </div>
              </div>
              <Skeleton className="h-12 w-40 rounded-full bg-white/20" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`relative border-0 bg-gradient-to-r ${gradientClass} backdrop-blur-sm shadow-lg mb-6 overflow-hidden`}>
        {/* Live indicator for active sessions */}
        <div className="absolute top-4 right-4 flex items-center gap-1 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Circle className="h-2 w-2 fill-green-400 text-green-400" />
          </motion.div>
          <span className="text-xs text-white/80">Live</span>
        </div>

        <div className="absolute inset-0 bg-grid-white/10 mask-gradient-to-r" />
        <CardContent className="p-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center ring-4 ring-white/30"
              >
                <PeriodIcon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {greeting}, {displayName}
                </motion.h1>
                <motion.p 
                  className="text-white/90 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {isClient 
                    ? `Welcome to your ${clientData?.company_name || 'client'} dashboard`
                    : 'Welcome to your SISO dashboard'
                  }
                </motion.p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 bg-white/10 rounded-full px-6 py-3 text-white/90 text-lg backdrop-blur-sm"
              >
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </motion.div>
              
              {isClient && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-white/70 bg-white/10 rounded-full px-3 py-1"
                >
                  Client Portal
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
