/**
 * Recent Updates Component
 * Shows a feed of recent project updates with timestamps
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { 
  Clock, 
  CheckCircle, 
  GitBranch, 
  MessageSquare, 
  FileText, 
  Zap,
  User,
  Code,
  Palette,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Update {
  id: string;
  type: 'milestone' | 'code' | 'design' | 'communication' | 'document';
  title: string;
  description: string;
  timestamp: Date;
  author: {
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
}

export function RecentUpdates() {
  const { clientData } = useClientDetails();
  const [showAll, setShowAll] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      metadata: { linesChanged: 342, filesModified: 8 }
    },
    {
      id: '2',
      type: 'design',
      title: 'Mobile Dashboard Optimization',
      description: 'Improved responsive design for client dashboard on mobile devices.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      author: { name: 'Jordan Smith', role: 'UX Designer' },
      status: 'review',
      metadata: { filesModified: 5 }
    },
    {
      id: '3',
      type: 'code',
      title: 'API Performance Improvements',
      description: 'Optimized database queries and implemented caching for better performance.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      author: { name: 'Sarah Chen', role: 'Backend Developer' },
      status: 'completed',
      metadata: { linesChanged: 156, filesModified: 3 }
    },
    {
      id: '4',
      type: 'communication',
      title: 'Client Feedback Integration',
      description: 'Incorporated latest client feedback into the design system and component library.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      author: { name: 'Taylor Kim', role: 'Project Manager' },
      status: 'completed'
    },
    {
      id: '5',
      type: 'document',
      title: 'Updated Technical Documentation',
      description: 'API documentation and deployment guides have been updated with latest changes.',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      author: { name: 'Alex Rivera', role: 'Lead Developer' },
      status: 'completed',
      metadata: { filesModified: 2 }
    },
    {
      id: '6',
      type: 'milestone',
      title: 'Database Migration Completed',
      description: 'Successfully migrated to new database schema with improved performance.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      author: { name: 'Sarah Chen', role: 'Backend Developer' },
      status: 'completed'
    },
    {
      id: '7',
      type: 'design',
      title: 'Brand Guidelines Implementation',
      description: 'Applied updated brand guidelines across all UI components.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      author: { name: 'Jordan Smith', role: 'UX Designer' },
      status: 'completed',
      metadata: { filesModified: 12 }
    }
  ];

  const displayedUpdates = showAll ? allUpdates : allUpdates.slice(0, 5);

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'milestone': return CheckCircle;
      case 'code': return Code;
      case 'design': return Palette;
      case 'communication': return MessageSquare;
      case 'document': return FileText;
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
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <span>Recent Updates</span>
            <Badge variant="outline" className="bg-blue-400/10 text-blue-400 border-blue-400/30">
              {allUpdates.length} updates
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {displayedUpdates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-muted-foreground"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent updates</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {displayedUpdates.map((update, index) => {
                const IconComponent = getUpdateIcon(update.type);
                
                return (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={cn("p-2 rounded-lg", getUpdateColor(update.type))}>
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-white text-sm truncate">
                                    {update.title}
                                  </h4>
                                  {update.status && (
                                    <Badge 
                                      variant="outline" 
                                      className={cn("text-xs", getStatusColor(update.status))}
                                    >
                                      {update.status.replace('_', ' ')}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {update.description}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <User className="w-3 h-3" />
                                <span>{update.author.name}</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-slate-400">{update.author.role}</span>
                              </div>
                              {update.metadata && (
                                <div className="flex items-center space-x-3">
                                  {update.metadata.linesChanged && (
                                    <div className="flex items-center space-x-1">
                                      <GitBranch className="w-3 h-3" />
                                      <span>{update.metadata.linesChanged} lines</span>
                                    </div>
                                  )}
                                  {update.metadata.filesModified && (
                                    <div className="flex items-center space-x-1">
                                      <FileText className="w-3 h-3" />
                                      <span>{update.metadata.filesModified} files</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(update.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Show More/Less Button */}
        {allUpdates.length > 5 && (
          <div className="border-t border-slate-700 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="w-full text-sm"
            >
              {showAll ? `Show Less` : `Show All ${allUpdates.length} Updates`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}