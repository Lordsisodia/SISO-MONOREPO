import { Link } from 'react-router-dom';
import { LucideIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarMenuItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isMain?: boolean;
  isActive?: boolean;
  badge?: string;
  badgeColor?: 'green' | 'orange' | 'gray' | 'purple' | 'red';
  disabled?: boolean;
}

export const SidebarMenuItem = ({
  href,
  icon: Icon,
  label,
  collapsed,
  onClick,
  className,
  isMain,
  isActive,
  badge,
  badgeColor = 'gray',
  disabled
}: SidebarMenuItemProps) => {
  // [Analysis] Improved spring animations for smoother transitions
  const menuItemVariants = {
    initial: { 
      opacity: 0, 
      x: -20 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1.2
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // [Analysis] Enhanced highlight animation with better spring physics
  const highlightVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: "-50%"
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: "-50%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 1.2
      }
    }
  };

  const getBadgeColor = () => {
    switch (badgeColor) {
      case 'green':
        return 'bg-siso-orange/20 text-siso-orange border-siso-orange/40';
      case 'orange':
        return 'bg-siso-orange/20 text-siso-orange border-siso-orange/40';
      case 'purple':
        return 'bg-siso-red/20 text-siso-red border-siso-red/40';
      case 'red':
        return 'bg-siso-red/20 text-siso-red border-siso-red/40';
      default:
        return 'bg-siso-border text-siso-text-muted border-siso-border';
    }
  };

  const LinkComponent = disabled ? 'div' : Link;
  const linkProps = disabled ? {} : { to: href };

  const menuItem = (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={menuItemVariants}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={cn("relative", disabled && "opacity-50 cursor-not-allowed")}
    >
      <LinkComponent
        {...linkProps}
        onClick={disabled ? undefined : onClick}
        className={cn(
          'relative flex items-center gap-3 rounded-lg px-3 py-2 text-siso-text transition-all duration-300',
          isActive && !disabled && 'bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-siso-text-bold shadow-sm',
          !isActive && !disabled && 'hover:bg-gradient-to-r hover:from-siso-red/5 hover:to-siso-orange/5 hover:text-siso-text-bold',
          isMain ? 'text-base font-semibold' : 'text-sm',
          collapsed ? 'justify-center' : '',
          disabled && 'pointer-events-none',
          className
        )}
      >
        <motion.div
          whileHover={!disabled ? { scale: 1.1 } : {}}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
          }}
          className="relative"
        >
          {disabled && badge === 'Locked' ? (
            <Lock 
              className={cn(
                isMain ? "w-5 h-5" : "w-4 h-4",
                "text-siso-text-muted",
                "transition-colors duration-300"
              )} 
            />
          ) : (
            <Icon 
              className={cn(
                isMain ? "w-5 h-5" : "w-4 h-4",
                isActive ? "text-siso-orange" : "text-siso-text group-hover:text-siso-orange",
                disabled && "text-siso-text-muted",
                "transition-colors duration-300"
              )} 
            />
          )}
          {isActive && (
            <motion.div 
              className="absolute inset-0 blur-lg bg-siso-orange/30 -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                mass: 1.2
              }}
              className="flex items-center gap-2 flex-1"
            >
              <span className="truncate font-medium">{label}</span>
              {badge && (
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs", getBadgeColor())}
                >
                  {badge}
                </Badge>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {isActive && (
          <motion.div
            layoutId="sidebar-highlight"
            className="absolute left-0 top-0 h-full w-full rounded-lg bg-gradient-to-r from-siso-red/5 to-siso-orange/5 -z-10"
            initial="initial"
            animate="animate"
            variants={highlightVariants}
          >
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-gradient-to-b from-siso-red to-siso-orange rounded-r-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(255, 87, 34, 0.3)",
                  "0 0 20px rgba(255, 167, 38, 0.5)",
                  "0 0 10px rgba(255, 87, 34, 0.3)"
                ],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute w-8 h-8 bg-siso-orange/20 rounded-full blur-xl -left-3 top-1/2 -translate-y-1/2" />
            </motion.div>
          </motion.div>
        )}
      </LinkComponent>
    </motion.div>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {menuItem}
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={20}>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-medium"
            >
              {label}
            </motion.p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return menuItem;
};
