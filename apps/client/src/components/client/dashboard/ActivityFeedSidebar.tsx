/**
 * Activity Feed Sidebar Component
 * A dedicated sidebar for showing real-time updates, notifications, and activity
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Bell,
  Activity,
  CheckCircle, 
  GitBranch, 
  MessageSquare, 
  FileText, 
  Zap,
  User,
  Code,
  Palette,
  Filter,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Update {
  id: string;
  type: 'milestone' | 'code' | 'design' | 'communication' | 'document' | 'notification';
  title: string;
  description: string;
  timestamp: Date;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  status?: 'completed' | 'in_progress' | 'review';
  metadata?: {
    linesChanged?: number;
    filesModified?: number;
    tasksCompleted?: number;
  };
  isNew?: boolean;
}

interface ActivityFeedSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ActivityFeedSidebar({ isOpen, onToggle }: ActivityFeedSidebarProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);

  // Mock updates data - in production, this would come from the database
  const allUpdates: Update[] = [
    {
      id: '1',
      type: 'milestone',
      title: 'Progressive Unlock System Complete',
      description: 'All components for the progressive unlock system have been implemented and tested.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      author: { name: 'Alex Rivera', role: 'Lead Developer' },
      status: 'completed',
      metadata: { linesChanged: 342, filesModified: 8 },
      isNew: true
    },
    {
      id: '2',
      type: 'design',
      title: 'Mobile Dashboard Optimization',
      description: 'Improved responsive design for client dashboard on mobile devices.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      author: { name: 'Jordan Smith', role: 'UX Designer' },
      status: 'review',
      metadata: { filesModified: 5 },
      isNew: true
    },
    {
      id: '3',
      type: 'notification',
      title: 'Payment Processed',
      description: 'Your monthly subscription payment has been processed successfully.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isNew: false
    },
    {
      id: '4',
      type: 'code',
      title: 'API Performance Improvements',
      description: 'Optimized database queries and implemented caching for better performance.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      author: { name: 'Sarah Chen', role: 'Backend Developer' },
      status: 'completed',
      metadata: { linesChanged: 156, filesModified: 3 }
    },
    {
      id: '5',
      type: 'communication',
      title: 'Client Feedback Integration',
      description: 'Incorporated latest client feedback into the design system and component library.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      author: { name: 'Taylor Kim', role: 'Project Manager' },
      status: 'completed'
    },
    {
      id: '6',
      type: 'document',
      title: 'Updated Technical Documentation',
      description: 'API documentation and deployment guides have been updated with latest changes.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      author: { name: 'Alex Rivera', role: 'Lead Developer' },
      status: 'completed',
      metadata: { filesModified: 2 }
    }
  ];

  // Filter updates based on active tab
  const filteredUpdates = allUpdates.filter(update => {
    if (activeTab === 'notifications') return update.type === 'notification';
    if (activeTab === 'activity') return update.type !== 'notification';
    if (filterType) return update.type === filterType;
    return true;
  });

  const newUpdatesCount = allUpdates.filter(u => u.isNew).length;

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'milestone': return CheckCircle;
      case 'code': return Code;
      case 'design': return Palette;
      case 'communication': return MessageSquare;
      case 'document': return FileText;
      case 'notification': return Bell;
      default: return Zap;
    }
  };

  const getUpdateColor = (type: Update['type']) => {
    switch (type) {
      case 'milestone': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'code': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'design': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'communication': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'document': return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      case 'notification': return 'text-siso-orange bg-siso-orange/10 border-siso-orange/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusColor = (status?: Update['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'in_progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'review': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  return (
    <>
      {/* Toggle Button - Always visible */}
      <motion.button
        onClick={onToggle}
        className={cn(
          "fixed right-0 top-1/2 -translate-y-1/2 z-30",
          "bg-siso-bg-secondary border border-siso-border rounded-l-lg",
          "p-2 hover:bg-siso-bg-tertiary transition-all duration-300",
          "shadow-lg hover:shadow-xl",
          isOpen ? "translate-x-80" : "translate-x-0"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-1">
          {isOpen ? (
            <ChevronRight className="w-5 h-5 text-siso-text" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 text-siso-text" />
              {newUpdatesCount > 0 && (
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-siso-orange rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{newUpdatesCount}</span>
                </div>
              )}
            </>
          )}
        </div>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 h-full w-80 z-20 bg-siso-bg border-l border-siso-border shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-siso-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-siso-orange" />
                    <h2 className="text-lg font-semibold text-siso-text">Activity Feed</h2>
                    {newUpdatesCount > 0 && (
                      <Badge variant="secondary" className="bg-siso-orange/20 text-siso-orange border-siso-orange/30">
                        {newUpdatesCount} new
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onToggle}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-siso-bg-secondary">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                    <TabsTrigger value="notifications" className="text-xs">
                      Notifications
                      {newUpdatesCount > 0 && (
                        <span className="ml-1 text-siso-orange">●</span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Filter Pills */}
                {activeTab === 'all' && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Button
                      variant={filterType === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType(null)}
                      className="h-7 text-xs"
                    >
                      All
                    </Button>
                    {['code', 'design', 'milestone'].map(type => (
                      <Button
                        key={type}
                        variant={filterType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType(filterType === type ? null : type)}
                        className="h-7 text-xs capitalize"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 p-4">
                <AnimatePresence mode="popLayout">
                  {filteredUpdates.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-muted-foreground"
                    >
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No updates to show</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      {filteredUpdates.map((update, index) => {
                        const IconComponent = getUpdateIcon(update.type);
                        
                        return (
                          <motion.div
                            key={update.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className="relative"
                          >
                            {update.isNew && (
                              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-siso-orange rounded-full" />
                            )}
                            
                            <Card className={cn(
                              "bg-siso-bg-secondary border-siso-border hover:bg-siso-bg-tertiary transition-colors",
                              update.isNew && "border-siso-orange/30"
                            )}>
                              <div className="p-3 space-y-2">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-2 flex-1">
                                    <div className={cn("p-1.5 rounded", getUpdateColor(update.type))}>
                                      <IconComponent className="h-3 w-3" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-siso-text text-sm leading-tight">
                                        {update.title}
                                      </h4>
                                      {update.status && (
                                        <Badge 
                                          variant="outline" 
                                          className={cn("text-xs mt-1", getStatusColor(update.status))}
                                        >
                                          {update.status.replace('_', ' ')}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-siso-text-muted line-clamp-2 pl-7">
                                  {update.description}
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between text-xs text-siso-text-muted pl-7">
                                  {update.author ? (
                                    <div className="flex items-center space-x-1">
                                      <User className="w-3 h-3" />
                                      <span>{update.author.name}</span>
                                    </div>
                                  ) : (
                                    <div />
                                  )}
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTimestamp(update.timestamp)}</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              </ScrollArea>

              {/* Footer */}
              <div className="p-4 border-t border-siso-border">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {/* Navigate to full activity page */}}
                >
                  View All Activity
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}