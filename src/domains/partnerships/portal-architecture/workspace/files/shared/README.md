# Shared Files Management

## Overview
The Shared Files Management system provides a centralized platform for document collaboration and file sharing within the SISO partnership portal. This module facilitates secure file sharing among partners, team members, and external collaborators with comprehensive permission management and real-time collaboration features.

## Architecture

### Directory Structure
```
files/shared/
├── components/
│   ├── SharedFileCard.tsx
│   ├── SharedFileUploader.tsx
│   ├── SharedFolderView.tsx
│   ├── CollaborationPanel.tsx
│   └── SharingPermissions.tsx
├── hooks/
│   ├── useSharedFiles.ts
│   ├── useFileCollaboration.ts
│   └── useSharingPermissions.ts
├── services/
│   ├── sharedFileService.ts
│   ├── collaborationService.ts
│   └── sharingService.ts
├── types/
│   ├── shared-files.types.ts
│   └── collaboration.types.ts
└── utils/
    ├── fileSharingUtils.ts
    └── permissionUtils.ts
```

### Core Components

#### SharedFileCard Component
```typescript
interface SharedFileCardProps {
  file: SharedFile;
  collaborationInfo: CollaborationInfo;
  currentUserPermissions: FilePermissions;
  onPreview: (file: SharedFile) => void;
  onCollaborate: (file: SharedFile) => void;
  onShare: (file: SharedFile) => void;
  onDownload: (file: SharedFile) => void;
  className?: string;
}

export const SharedFileCard: React.FC<SharedFileCardProps> = ({
  file,
  collaborationInfo,
  currentUserPermissions,
  onPreview,
  onCollaborate,
  onShare,
  onDownload,
  className
}) => {
  return (
    <Card className={cn('shared-file-card', className)}>
      <div className="shared-file-header">
        <div className="file-icon-section">
          <FileIcon type={file.type} />
          {file.isLocked && <Lock className="w-4 h-4 text-amber-500" />}
        </div>
        
        <div className="file-info-section">
          <h3 className="file-title">{file.title}</h3>
          <p className="file-description">{file.description}</p>
          
          <div className="file-metadata">
            <span className="file-size">{formatFileSize(file.size)}</span>
            <span className="file-updated">{formatDate(file.updatedAt)}</span>
            <Badge variant="outline" className="version-badge">
              v{file.version}
            </Badge>
          </div>
        </div>
        
        <div className="collaboration-indicators">
          <div className="active-collaborators">
            {collaborationInfo.activeUsers.slice(0, 3).map(user => (
              <Avatar key={user.id} className="w-6 h-6 border-2 border-background">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {collaborationInfo.activeUsers.length > 3 && (
              <div className="more-collaborators">
                +{collaborationInfo.activeUsers.length - 3}
              </div>
            )}
          </div>
          
          {file.hasUnreadComments && (
            <Badge variant="secondary" className="notification-badge">
              <MessageSquare className="w-3 h-3" />
              {file.unreadCommentCount}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="shared-file-content">
        {file.tags.length > 0 && (
          <div className="file-tags">
            {file.tags.map(tag => (
              <Tag key={tag} variant="default">{tag}</Tag>
            ))}
          </div>
        )}
        
        <div className="sharing-info">
          <div className="owner-info">
            <Avatar className="w-4 h-4">
              <AvatarImage src={file.owner.avatar} />
              <AvatarFallback>{file.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="owner-name">{file.owner.name}</span>
          </div>
          
          <div className="share-count">
            <Users className="w-4 h-4" />
            <span>Shared with {file.sharedWith.length} people</span>
          </div>
        </div>
        
        {collaborationInfo.recentActivity.length > 0 && (
          <div className="recent-activity">
            <span className="activity-label">Recent activity:</span>
            <div className="activity-items">
              {collaborationInfo.recentActivity.slice(0, 2).map((activity, index) => (
                <div key={index} className="activity-item">
                  {activity.user.name} {activity.action}
                  <span className="activity-time">{formatRelativeTime(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="shared-file-actions">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(file)}
          disabled={!currentUserPermissions.canView}
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        
        {collaborationInfo.canCollaborate && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCollaborate(file)}
            className="collaboration-btn"
          >
            <Users className="w-4 h-4 mr-1" />
            Collaborate
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onShare(file)}
          disabled={!currentUserPermissions.canShare}
        >
          <Share className="w-4 h-4 mr-1" />
          Share
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" icon={<MoreVertical className="w-4 h-4" />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDownload(file)}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            
            {currentUserPermissions.canEdit && (
              <DropdownMenuItem onClick={() => onEditFile(file)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onClick={() => onDuplicateFile(file)}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onViewVersionHistory(file)}>
              <History className="w-4 h-4 mr-2" />
              Version History
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => onViewAnalytics(file)}>
              <BarChart className="w-4 h-4 mr-2" />
              View Analytics
            </DropdownMenuItem>
            
            {currentUserPermissions.canManagePermissions && (
              <DropdownMenuItem onClick={() => onManagePermissions(file)}>
                <Settings className="w-4 h-4 mr-2" />
             Manage Permissions
            </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
```

#### CollaborationPanel Component
```typescript
interface CollaborationPanelProps {
  file: SharedFile;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  file,
  isOpen,
  onClose,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'versions' | 'activity'>('comments');
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  
  const { addComment, resolveComment } = useFileCollaboration(file.id);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={cn('collaboration-panel', className)}>
        <SheetHeader>
          <SheetTitle>Collaboration: {file.title}</SheetTitle>
          <SheetDescription>
            Collaborate with {file.sharedWith.length} people
          </SheetDescription>
        </SheetHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comments
              {file.unreadCommentCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {file.unreadCommentCount}
                </Badge>
              )}
            </TabsTrigger>
            
            <TabsTrigger value="versions" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Versions
            </TabsTrigger>
            
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="comments" className="space-y-4">
            <div className="comment-input">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="comment-actions">
                <Button
                  size="sm"
                  onClick={() => handleAddComment()}
                  disabled={!newComment.trim()}
                >
                  <Send className="w-4 h-4 mr-1" />
                  Post Comment
                </Button>
              </div>
            </div>
            
            <div className="comments-list space-y-3">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onReply={(reply) => handleReplyToComment(comment.id, reply)}
                  onResolve={() => resolveComment(comment.id)}
                  onEdit={(content) => handleEditComment(comment.id, content)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="versions" className="space-y-4">
            <VersionHistory file={file} />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <ActivityTimeline file={file} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};
```

## Domain Types

### Shared Files Types
```typescript
export interface SharedFile {
  id: string;
  title: string;
  description?: string;
  type: FileType;
  size: number;
  url: string;
  thumbnailUrl?: string;
  owner: FileOwner;
  sharedWith: FileShare[];
  tags: string[];
  permissions: FilePermissions;
  isLocked: boolean;
  lockedBy?: string;
  hasUnreadComments: boolean;
  unreadCommentCount: number;
  version: number;
  versions: FileVersion[];
  metadata: SharedFileMetadata;
  collaborationSettings: CollaborationSettings;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface CollaborationInfo {
  activeUsers: ActiveUser[];
  recentActivity: FileActivity[];
  canCollaborate: boolean;
  liveEditingEnabled: boolean;
  commentCount: number;
  resolvedCommentCount: number;
}

export interface ActiveUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  currentAction?: string;
  cursor?: CursorPosition;
  lastSeen: Date;
}

export interface FileActivity {
  id: string;
  type: 'view' | 'edit' | 'comment' | 'share' | 'download' | 'upload';
  user: ActivityUser;
  action: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Comment {
  id: string;
  fileId: string;
  content: string;
  author: CommentAuthor;
  parentId?: string;
  replies: Comment[];
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  mentions: string[];
  attachments: CommentAttachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollaborationSettings {
  allowComments: boolean;
  allowEdits: boolean;
  requireApproval: boolean;
  canShare: boolean;
  canDownload: boolean;
  expiryDate?: Date;
  maxCollaborators?: number;
  notificationSettings: NotificationSettings;
}

export interface SharedFileMetadata {
  originalName: string;
  mimeType: string;
  checksum: string;
  encryptionEnabled: boolean;
  accessLog: FileAccessLog[];
  shareAnalytics: ShareAnalytics;
  collaborationAnalytics: CollaborationAnalytics;
}

export interface ShareAnalytics {
  views: number;
  downloads: number;
  shares: number;
  lastAccessed: Date;
  topViewers: AnalyticsUser[];
  geographicDistribution: GeoData[];
}

export interface CollaborationAnalytics {
  totalComments: number;
  resolvedComments: number;
  averageResponseTime: number;
  collaborationSessions: number;
  activeCollaborators: number;
  peakCollaborationTime: string;
}
```

## Application Hooks

### useSharedFiles Hook
```typescript
export const useSharedFiles = (filters?: SharedFilesFilters) => {
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [folders, setFolders] = useState<SharedFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSharedFiles = useCallback(async () => {
    try {
      setLoading(true);
      const [filesData, foldersData] = await Promise.all([
        sharedFileService.getSharedFiles(filters),
        sharedFileService.getSharedFolders(filters)
      ]);
      
      setFiles(filesData);
      setFolders(foldersData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const shareFiles = useCallback(async (
    fileIds: string[], 
    shareData: ShareFilesData
  ) => {
    const shareResults = await sharedFileService.shareFiles(fileIds, shareData);
    
    setFiles(prev => prev.map(file => {
      if (fileIds.includes(file.id)) {
        return {
          ...file,
          sharedWith: [...file.sharedWith, ...shareResults.newShares]
        };
      }
      return file;
    }));
    
    return shareResults;
  }, []);

  const updateCollaborationSettings = useCallback(async (
    fileId: string, 
    settings: CollaborationSettings
  ) => {
    await sharedFileService.updateCollaborationSettings(fileId, settings);
    
    setFiles(prev => prev.map(file =>
      file.id === fileId 
        ? { ...file, collaborationSettings: settings }
        : file
    ));
  }, []);

  useEffect(() => {
    fetchSharedFiles();
  }, [fetchSharedFiles]);

  return {
    files,
    folders,
    loading,
    error,
    refetch: fetchSharedFiles,
    shareFiles,
    updateCollaborationSettings
  };
};
```

### useFileCollaboration Hook
```typescript
export const useFileCollaboration = (fileId: string) => {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activity, setActivity] = useState<FileActivity[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.emit('join-file-collaboration', { fileId });
    
    socket.on('user-joined', (user: ActiveUser) => {
      setActiveUsers(prev => [...prev.filter(u => u.id !== user.id), user]);
    });
    
    socket.on('user-left', (userId: string) => {
      setActiveUsers(prev => prev.filter(u => u.id !== userId));
    });
    
    socket.on('comment-added', (comment: Comment) => {
      setComments(prev => [...prev, comment]);
    });
    
    socket.on('file-updated', (activity: FileActivity) => {
      setActivity(prev => [activity, ...prev]);
    });

    return () => {
      socket.emit('leave-file-collaboration', { fileId });
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('comment-added');
      socket.off('file-updated');
    };
  }, [socket, fileId]);

  const addComment = useCallback(async (content: string, parentId?: string) => {
    const comment = await collaborationService.addComment(fileId, {
      content,
      parentId
    });
    
    setComments(prev => [...prev, comment]);
    return comment;
  }, [fileId]);

  const resolveComment = useCallback(async (commentId: string) => {
    await collaborationService.resolveComment(fileId, commentId);
    
    setComments(prev => prev.map(comment =>
      comment.id === commentId 
        ? { ...comment, isResolved: true, resolvedAt: new Date() }
        : comment
    ));
  }, [fileId]);

  return {
    activeUsers,
    comments,
    activity,
    addComment,
    resolveComment
  };
};
```

## Service Layer

### SharedFileService
```typescript
export class SharedFileService {
  private api: ApiClient;
  private collaboration: CollaborationService;
  private sharing: SharingService;

  constructor() {
    this.api = new ApiClient();
    this.collaboration = new CollaborationService();
    this.sharing = new SharingService();
  }

  async getSharedFiles(filters?: SharedFilesFilters): Promise<SharedFile[]> {
    const params = new URLSearchParams();
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters?.owner) {
      params.append('owner', filters.owner);
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }

    const response = await this.api.get(`/shared-files?${params}`);
    return response.data.map(this.transformSharedFileData);
  }

  async shareFiles(fileIds: string[], shareData: ShareFilesData): Promise<ShareFilesResult> {
    const response = await this.api.post('/shared-files/share', {
      fileIds,
      ...shareData
    });

    return {
      shareLinks: response.data.shareLinks,
      newShares: response.data.newShares,
      notificationSent: response.data.notificationSent
    };
  }

  async updateCollaborationSettings(
    fileId: string, 
    settings: CollaborationSettings
  ): Promise<void> {
    await this.api.put(`/shared-files/${fileId}/collaboration-settings`, settings);
  }

  async getFileAnalytics(fileId: string): Promise<ShareAnalytics> {
    const response = await this.api.get(`/shared-files/${fileId}/analytics`);
    return response.data;
  }

  private transformSharedFileData(data: any): SharedFile {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      size: data.size,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
      owner: {
        id: data.owner.id,
        name: data.owner.name,
        avatar: data.owner.avatar,
        email: data.owner.email
      },
      sharedWith: data.sharedWith || [],
      tags: data.tags || [],
      permissions: data.permissions,
      isLocked: data.isLocked,
      lockedBy: data.lockedBy,
      hasUnreadComments: data.hasUnreadComments,
      unreadCommentCount: data.unreadCommentCount,
      version: data.version,
      versions: data.versions || [],
      metadata: {
        originalName: data.metadata.originalName,
        mimeType: data.metadata.mimeType,
        checksum: data.metadata.checksum,
        encryptionEnabled: data.metadata.encryptionEnabled,
        accessLog: data.metadata.accessLog || [],
        shareAnalytics: data.metadata.shareAnalytics,
        collaborationAnalytics: data.metadata.collaborationAnalytics
      },
      collaborationSettings: data.collaborationSettings,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### Collaboration Features
- Real-time collaboration with WebSocket connections
- Live cursors and user presence indicators
- Comment threads with @mentions and replies
- Version control with detailed changelogs
- Activity timeline and audit trails

### Sharing & Permissions
- Granular permission controls (view, edit, comment, share, download)
- Share link generation with password protection and expiry
- Role-based access control for teams
- External collaborator management
- Bulk sharing operations

### User Experience
- Drag-and-drop file sharing
- Thumbnail previews for documents and images
- Advanced search and filtering
- Bulk operations on multiple files
- Keyboard shortcuts for power users

### Performance & Scalability
- Lazy loading for large file collections
- Caching for frequently accessed files
- CDN integration for fast file delivery
- Background processing for file operations
- Optimistic updates for responsive UI

### Security & Compliance
- End-to-end encryption for sensitive files
- Access logging and audit trails
- GDPR compliance for personal data
- Data retention policies
- Secure file sharing with authentication

### Analytics & Insights
- File engagement metrics and usage patterns
- Collaboration effectiveness analytics
- Storage usage optimization recommendations
- User behavior insights
- Performance monitoring and alerts

### Mobile Optimization
- Touch-friendly collaboration interface
- Offline file access with sync
- Mobile file sharing and commenting
- Push notifications for collaboration updates
- Responsive design for all screen sizes

## Testing Strategy
- Unit tests for collaboration features and permissions
- Integration tests for real-time file sharing
- E2E tests for complete collaboration workflows
- Performance tests for large file operations
- Security testing for access controls
- Cross-browser and mobile compatibility tests

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for collaboration actions
- User avatars and presence indicators
- Activity timeline with visual icons
- Loading states for file operations
- Responsive grid layouts for file galleries
- Dark mode support for professional interface