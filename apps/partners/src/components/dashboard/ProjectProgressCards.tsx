import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, CreditCard, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMainUserProject } from "@/hooks/useUserProjects";
import { useRealTasks } from "@/hooks/useRealTasks";
import CountUp from "react-countup";

interface StatCardProps { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  bgColor: string; 
  textColor: string; 
  delay?: number;
  progress?: number;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  isLive?: boolean;
}

function StatCard({ 
  title, 
  value, 
  icon, 
  bgColor, 
  textColor, 
  delay = 0,
  progress,
  subtitle,
  linkText,
  linkHref,
  isLive = false
}: StatCardProps) {
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
    : value;
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className={`border border-siso-border ${bgColor} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full relative`}>
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Circle className="h-2 w-2 fill-green-400 text-green-400" />
            </motion.div>
            <span className="text-xs text-green-400">Live</span>
          </div>
        )}

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <p className="text-siso-text-secondary text-sm font-medium">{title}</p>
              <p className={`text-2xl font-bold mt-1 ${textColor}`}>
                {isNumeric ? (
                  <CountUp
                    start={0}
                    end={numericValue}
                    duration={2}
                    separator=","
                    decimals={typeof value === 'string' && value.includes('%') ? 0 : 0}
                    suffix={typeof value === 'string' && value.includes('%') ? '%' : ''}
                    prefix={typeof value === 'string' && value.includes('£') ? '£' : ''}
                  />
                ) : (
                  value
                )}
              </p>
              {subtitle && <p className="text-xs text-siso-text-muted mt-1">{subtitle}</p>}
            </div>
            <motion.div 
              className={`h-12 w-12 rounded-full bg-siso-bg-tertiary/40 flex items-center justify-center ${textColor}`}
              whileHover={{ rotate: 10 }}
            >
              {icon}
            </motion.div>
          </div>
          
          {progress !== undefined && (
            <div className="mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: delay * 0.2 }}
              >
                <Progress 
                  value={progress} 
                  className="h-1.5 bg-siso-bg-tertiary/30" 
                  indicatorClassName={`${progress >= 70 ? 'bg-green-500' : progress >= 40 ? 'bg-siso-orange' : 'bg-siso-red'}`} 
                />
              </motion.div>
              <div className="flex justify-between mt-1.5">
                <p className="text-xs text-siso-text-muted">{progress}% Complete</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs py-0 px-1.5 ${
                    progress >= 70 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                    progress >= 40 ? 'bg-siso-orange/10 text-siso-orange border-siso-orange/20' : 
                    'bg-siso-red/10 text-siso-red border-siso-red/20'
                  }`}
                >
                  {progress >= 70 ? 'On track' : progress >= 40 ? 'In progress' : 'Needs attention'}
                </Badge>
              </div>
            </div>
          )}

          {linkText && linkHref && (
            <div className="mt-auto pt-4">
              <Button 
                variant="link" 
                className="p-0 h-auto text-siso-orange hover:text-siso-red transition-colors" 
                asChild
              >
                <Link to={linkHref}>{linkText}</Link>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectProgressCards() {
  const { project, hasProjects, loading } = useMainUserProject();
  const { remainingTasks, completedTasks, loading: tasksLoading } = useRealTasks();

  if (loading || tasksLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border border-siso-border bg-siso-bg-secondary">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24 bg-siso-bg-tertiary" />
                  <Skeleton className="h-6 w-16 bg-siso-bg-tertiary" />
                  <Skeleton className="h-3 w-32 bg-siso-bg-tertiary" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full bg-siso-bg-tertiary" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-1.5 w-full bg-siso-bg-tertiary" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16 bg-siso-bg-tertiary" />
                  <Skeleton className="h-4 w-20 bg-siso-bg-tertiary" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!hasProjects) {
    return null; // Don't show progress cards if no projects
  }

  // Calculate real metrics
  const totalTasks = (remainingTasks || 0) + (completedTasks || 0);
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate project timeline (mock calculation based on completion)
  const projectStartDate = project?.created_at ? new Date(project.created_at) : new Date();
  const estimatedDuration = 45; // 45 days estimated project duration
  const daysElapsed = Math.floor((Date.now() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, estimatedDuration - daysElapsed);
  const endDate = new Date(Date.now() + (daysRemaining * 24 * 60 * 60 * 1000));
  
  // Calculate budget info
  const projectBudget = project?.budget || 5000;
  const spentPercentage = Math.min(overallProgress * 0.8, 100); // Assume 80% correlation
  const spentAmount = (projectBudget * spentPercentage) / 100;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <StatCard 
        title="Overall Progress"
        value={`${overallProgress}%`}
        subtitle={`${completedTasks || 0} of ${totalTasks} tasks completed`}
        icon={<CheckSquare className="h-6 w-6 text-siso-orange" />}
        bgColor="bg-siso-bg-secondary"
        textColor="text-siso-orange"
        delay={0}
        progress={overallProgress}
        isLive={true}
        linkText="View Timeline"
        linkHref="/projects/timeline"
      />
      
      <StatCard 
        title="Timeline Remaining"
        value={`${daysRemaining} days`}
        subtitle={`until ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        icon={<Clock className="h-6 w-6 text-blue-400" />}
        bgColor="bg-siso-bg-secondary"
        textColor="text-blue-400"
        delay={1}
        progress={Math.max(0, ((estimatedDuration - daysRemaining) / estimatedDuration) * 100)}
        linkText="View Timeline"
        linkHref="/projects/timeline"
      />
      
      <StatCard 
        title="Next Milestone"
        value="Phase Completion"
        subtitle={`${remainingTasks || 0} tasks remaining to complete current phase`}
        icon={<CheckSquare className="h-6 w-6 text-green-400" />}
        bgColor="bg-siso-bg-secondary"
        textColor="text-green-400"
        delay={2}
        progress={overallProgress}
        isLive={remainingTasks > 0}
        linkText="View Tasks"
        linkHref="/tasks"
      />
      
      <StatCard 
        title="Budget Utilization"
        value={`£${Math.round(spentAmount)}`}
        subtitle={`${Math.round(spentPercentage)}% of £${projectBudget.toLocaleString()} budget used`}
        icon={<CreditCard className="h-6 w-6 text-purple-400" />}
        bgColor="bg-siso-bg-secondary"
        textColor="text-purple-400"
        delay={3}
        progress={spentPercentage}
        linkText="View Financial Details"
        linkHref="/financials"
      />
    </div>
  );
}
