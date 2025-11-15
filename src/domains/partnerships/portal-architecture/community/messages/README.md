# Messages - Private Messaging & Communication System

## Overview

The Messages system provides a comprehensive private messaging platform for one-on-one and group communications within the SISO partner community. This module enables direct communication between partners, team collaboration, and private discussions while maintaining security and privacy controls.

## Business Value

- **Direct Communication**: Enable efficient direct communication between partners
- **Collaboration Support**: Facilitate team collaboration and project coordination
- **Relationship Building**: Support relationship building and networking opportunities
- **Privacy & Security**: Secure private communications with proper access controls
- **Community Engagement**: Increase overall community engagement through personal connections

## Architecture

### Component Structure
```
src/domains/partnerships/portal-architecture/community/messages/
├── components/
│   ├── MessageList/
│   ├── ConversationView/
│   ├── MessageComposer/
│   ├── ContactManager/
│   ├── GroupManagement/
│   ├── MessageSearch/
│   └── NotificationSettings/
├── hooks/
│   ├── useMessages.ts
│   ├── useConversations.ts
│   ├── useContacts.ts
│   ├── useGroupChat.ts
│   └── useMessageSearch.ts
├── services/
│   ├── messageService.ts
│   ├── conversationService.ts
│   ├── contactService.ts
│   ├── groupService.ts
│   ├── notificationService.ts
├── types/
│   ├── message.types.ts
│   ├── conversation.types.ts
│   ├── contact.types.ts
│   └── group.types.ts
└── utils/
    ├── encryption.ts
    ├── messageUtils.ts
    └── notificationUtils.ts
```

### Key Components

#### MessageList
**Purpose**: Overview of all conversations with search, filtering, and management capabilities

**Features**:
- Conversation list with last message preview and unread indicators
- Search functionality across all messages and contacts
- Filtering by message type, date, and participant
- Quick actions for marking as read, archiving, and deleting
- Favorite conversations and pinned messages

```typescript
interface ConversationPreview {
  id: string;
  type: ConversationType; // 'direct', 'group', 'team'
  name?: string; // For group chats
  participants: ConversationParticipant[];
  lastMessage: MessagePreview;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isFavorite: boolean;
  lastActivity: Date;
  tags: string[];
  priority: ConversationPriority;
  status: ConversationStatus;
}

const MessageList: React.FC = () => {
  const { 
    conversations, 
    loading, 
    searchQuery,
    filters,
    updateConversation 
  } = useConversations();
  
  return (
    <div className="message-list">
      <MessagesHeader 
        onNewMessage={handleNewMessage}
        onSearch={handleSearch}
      />
      <ConversationFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <SearchBar 
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search conversations..."
      />
      <ConversationsList 
        conversations={conversations}
        loading={loading}
        onConversationSelect={handleConversationSelect}
        onConversationUpdate={updateConversation}
      />
      <QuickActions 
        actions={quickMessageActions}
        onActionClick={handleActionClick}
      />
      <ArchivedSection 
        archivedConversations={archivedConversations}
        onRestore={handleRestore}
      />
    </div>
  );
};
```

#### ConversationView
**Purpose**: Detailed conversation interface with message threading and real-time updates

**Features**:
- Real-time message updates and typing indicators
- Message threading and reply functionality
- Rich media support (images, videos, documents)
- Message reactions and emoji responses
- Message delivery and read status indicators

```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: MessageType; // 'text', 'image', 'video', 'file', 'audio', 'location', 'contact'
  attachments: MessageAttachment[];
  reactions: MessageReaction[];
  replies: MessageReply[];
  mentions: MessageMention[];
  replyToId?: string;
  status: MessageStatus; // 'sending', 'sent', 'delivered', 'read', 'failed'
  priority: MessagePriority;
  metadata: MessageMetadata;
  encryption: MessageEncryption;
  createdAt: Date;
  updated_at?: Date;
  expiresAt?: Date;
}

const ConversationView: React.FC = () => {
  const { 
    conversation, 
    messages, 
    loading,
    sendMessage,
    markAsRead 
  } = useMessages(conversationId);
  
  return (
    <div className="conversation-view">
      <ConversationHeader 
        conversation={conversation}
        onInfoClick={handleInfoClick}
        onSearchClick={handleSearchClick}
      />
      <MessagesContainer 
        messages={messages}
        loading={loading}
        onMessageClick={handleMessageClick}
        onReactionAdd={handleReactionAdd}
        onLoadMore={handleLoadMore}
      />
      <TypingIndicator 
        typingUsers={typingUsers}
      />
      <MessageComposer 
        conversationId={conversationId}
        onMessageSend={sendMessage}
        onFileAttach={handleFileAttach}
      />
      <ConversationSidebar 
        conversation={conversation}
        onParticipantAdd={handleParticipantAdd}
        onSettingsClick={handleSettingsClick}
      />
    </div>
  );
};
```

#### GroupManagement
**Purpose**: Tools for creating and managing group conversations and team chats

**Features**:
- Group creation with customizable settings and permissions
- Member management with role-based permissions
- Group settings and privacy controls
- Group analytics and activity monitoring
- Bulk operations for message management

```typescript
interface GroupConversation {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  type: GroupType; // 'team', 'project', 'community', 'private'
  creatorId: string;
  members: GroupMember[];
  admins: string[];
  settings: GroupSettings;
  permissions: GroupPermissions;
  inviteLink?: InviteLink;
  welcomeMessage?: string;
  pinnedMessages: PinnedMessage[];
  sharedMedia: SharedMedia[];
  files: SharedFile[];
  created_at: Date;
  lastActivity: Date;
}

const GroupManagement: React.FC = () => {
  const { 
    groups, 
    creatingGroup, 
    updateGroup,
    manageMembers 
  } = useGroupChat();
  
  return (
    <div className="group-management">
      <GroupHeader 
        onCreateGroup={handleCreateGroup}
      />
      <GroupsList 
        groups={groups}
        onGroupSelect={handleGroupSelect}
        onGroupEdit={handleGroupEdit}
      />
      <CreateGroupModal 
        isOpen={showCreateModal}
        onCreate={handleCreateGroupSubmit}
        onCancel={handleCreateCancel}
      />
      <GroupSettings 
        group={selectedGroup}
        onUpdate={updateGroup}
      />
      <MemberManagement 
        group={selectedGroup}
        members={selectedGroup?.members}
        onMemberUpdate={manageMembers}
      />
      <GroupAnalytics 
        groupId={selectedGroup?.id}
        analytics={groupAnalytics}
      />
    </div>
  );
};
```

## Domain Types

```typescript
// Message Structure
interface MessageContent {
  text: string;
  mentions: MessageMention[];
  hashtags: string[];
  links: LinkPreview[];
  formatting: MessageFormatting;
  embeds: MessageEmbed[];
}

interface MessageAttachment {
  id: string;
  type: AttachmentType;
  name: string;
  url: string;
  size: number;
  mimeType: string;
  thumbnail?: string;
  metadata: AttachmentMetadata;
  uploadedAt: Date;
  downloadedAt?: Date;
  encryption?: AttachmentEncryption;
}

interface MessageReaction {
  id: string;
  messageId: string;
  senderId: string;
  emoji: string;
  createdAt: Date;
}

// Conversation Structure
interface Conversation {
  id: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  settings: ConversationSettings;
  permissions: ConversationPermissions;
  metadata: ConversationMetadata;
  analytics: ConversationAnalytics;
  createdAt: Date;
  updatedAt: Date;
  lastActivity: Date;
}

interface ConversationParticipant {
  userId: string;
  role: ParticipantRole;
  joinedAt: Date;
  lastSeen?: Date;
  nickname?: string;
  permissions: ParticipantPermissions;
  notifications: NotificationSettings;
  typing: boolean;
  online: boolean;
}

// Group System
interface GroupSettings {
  privacy: GroupPrivacy;
  messagePermissions: MessagePermissions;
  memberPermissions: MemberPermissions;
  inviteSettings: InviteSettings;
  moderationSettings: ModerationSettings;
  fileSharing: FileSharingSettings;
  callSettings: CallSettings;
  retention: RetentionSettings;
}

interface GroupMember {
  userId: string;
  role: MemberRole;
  permissions: MemberPermissions;
  joinedAt: Date;
  invitedBy: string;
  nickname?: string;
  avatar?: string;
  lastMessage?: Date;
  messageCount: number;
  contributions: MemberContribution[];
  status: MemberStatus;
}
```

## Application Hooks

```typescript
// Messages Hook
export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  
  useEffect(() => {
    const socket = io(messageConfig.websocketUrl, {
      auth: { conversationId }
    });
    
    socket.on('new-message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });
    
    socket.on('message-updated', (updatedMessage: Message) => {
      setMessages(prev => 
        prev.map(message => 
          message.id === updatedMessage.id ? updatedMessage : message
        )
      );
    });
    
    socket.on('typing-indicator', (typingData: TypingData) => {
      setTypingUsers(prev => 
        typingData.isTyping 
          ? [...prev.filter(u => u.userId !== typingData.userId), typingData]
          : prev.filter(u => u.userId !== typingData.userId)
      );
    });
    
    socket.on('message-status-update', (statusUpdate: MessageStatusUpdate) => {
      setMessages(prev => 
        prev.map(message => 
          message.id === statusUpdate.messageId 
            ? { ...message, status: statusUpdate.status }
            : message
        )
      );
    });
    
    return () => socket.disconnect();
  }, [conversationId]);
  
  const loadMessages = useCallback(async (page: number = 1) => {
    if (loading || (!hasMore && page > 1)) return;
    
    setLoading(true);
    try {
      const response = await messageService.getMessages(conversationId, { page, limit: 50 });
      
      if (page === 1) {
        setMessages(response.messages);
      } else {
        setMessages(prev => [...response.messages, ...prev]);
      }
      
      setHasMore(response.hasMore);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  }, [conversationId, loading, hasMore]);
  
  const sendMessage = useCallback(async (messageData: CreateMessageData) => {
    const message = await messageService.sendMessage(conversationId, messageData);
    setMessages(prev => [...prev, message]);
    return message;
  }, [conversationId]);
  
  const addReaction = useCallback(async (messageId: string, emoji: string) => {
    const reaction = await messageService.addReaction(messageId, emoji);
    
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, reactions: [...message.reactions.filter(r => r.senderId !== reaction.senderId), reaction] }
          : message
      )
    );
    
    return reaction;
  }, []);
  
  return {
    messages,
    loading,
    hasMore,
    typingUsers,
    loadMessages,
    sendMessage,
    addReaction,
    markAsRead: messageService.markAsRead,
    deleteMessage: messageService.deleteMessage,
    editMessage: messageService.editMessage,
    loadMore: () => loadMessages(Math.ceil(messages.length / 50) + 1)
  };
};

// Conversations Hook
export const useConversations = (partnerId: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [archivedConversations, setArchivedConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ConversationFilters>({});
  
  const loadConversations = useCallback(async () => {
    setLoading(true);
    try {
      const [activeConversations, archived] = await Promise.all([
        conversationService.getActiveConversations(partnerId, filters),
        conversationService.getArchivedConversations(partnerId)
      ]);
      setConversations(activeConversations);
      setArchivedConversations(archived);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  }, [partnerId, filters]);
  
  const updateConversation = useCallback(async (
    conversationId: string, 
    updates: ConversationUpdate
  ) => {
    const updatedConversation = await conversationService.updateConversation(
      conversationId, 
      updates
    );
    
    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId ? updatedConversation : conversation
      )
    );
    
    return updatedConversation;
  }, []);
  
  const startConversation = useCallback(async (participants: string[], message?: string) => {
    const conversation = await conversationService.startConversation(participants, message);
    setConversations(prev => [conversation, ...prev]);
    return conversation;
  }, []);
  
  return {
    conversations,
    archivedConversations,
    loading,
    searchQuery,
    filters,
    loadConversations,
    updateConversation,
    startConversation,
    archiveConversation: conversationService.archiveConversation,
    unarchiveConversation: conversationService.unarchiveConversation,
    deleteConversation: conversationService.deleteConversation,
    setSearchQuery,
    setFilters
  };
};

// Group Chat Hook
export const useGroupChat = (partnerId: string) => {
  const [groups, setGroups] = useState<GroupConversation[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const groupsData = await groupService.getUserGroups(partnerId);
      setGroups(groupsData);
    } catch (error) {
      console.error('Failed to load groups:', error);
    } finally {
      setLoading(false);
    }
  }, [partnerId]);
  
  const createGroup = useCallback(async (groupData: CreateGroupData) => {
    const newGroup = await groupService.createGroup(partnerId, groupData);
    setGroups(prev => [newGroup, ...prev]);
    return newGroup;
  }, [partnerId]);
  
  const updateGroup = useCallback(async (groupId: string, updates: GroupUpdate) => {
    const updatedGroup = await groupService.updateGroup(groupId, updates);
    
    setGroups(prev => 
      prev.map(group => group.id === groupId ? updatedGroup : group)
    );
    
    return updatedGroup;
  }, []);
  
  const manageMembers = useCallback(async (
    groupId: string, 
    memberId: string, 
    action: MemberAction
  ) => {
    const result = await groupService.manageMembers(groupId, memberId, action);
    
    if (action === 'add') {
      setGroups(prev => 
        prev.map(group => 
          group.id === groupId 
            ? { ...group, members: [...group.members, result.member] }
            : group
        )
      );
    } else if (action === 'remove') {
      setGroups(prev => 
        prev.map(group => 
          group.id === groupId 
            ? { ...group, members: group.members.filter(m => m.userId !== memberId) }
            : group
        )
      );
    } else if (action === 'update-role') {
      setGroups(prev => 
        prev.map(group => 
          group.id === groupId 
            ? { 
                ...group, 
                members: group.members.map(m => 
                  m.userId === memberId ? result.member : m
                )
              }
            : group
        )
      );
    }
    
    return result;
  }, []);
  
  return {
    groups,
    loading,
    loadGroups,
    createGroup,
    updateGroup,
    manageMembers,
    leaveGroup: groupService.leaveGroup,
    inviteToGroup: groupService.inviteToGroup,
    getGroupAnalytics: groupService.getGroupAnalytics
  };
};
```

## Implementation Guidelines

### Message Security
1. **End-to-End Encryption**: Implement proper encryption for sensitive messages
2. **Access Controls**: Ensure proper authorization for message access
3. **Data Retention**: Implement appropriate message retention policies
4. **Secure File Sharing**: Secure handling of shared files and media
5. **Audit Trails**: Comprehensive logging of message activities

### User Experience
- **Real-time Updates**: Smooth real-time message updates and status indicators
- **Intuitive Interface**: Clean, intuitive interface for easy communication
- **Mobile Optimization**: Full mobile experience with responsive design
- **Offline Support**: Limited offline functionality for reading and drafting
- **Search Functionality**: Powerful search across all messages and conversations

### Performance Optimization
- **Efficient Loading**: Progressive loading of messages for performance
- **Smart Caching**: Intelligent caching of frequently accessed conversations
- **Image Optimization**: Optimized image loading and compression
- **Background Sync**: Background synchronization of message data
- **Memory Management**: Efficient memory usage for large conversation histories

## Analytics & Optimization

### Messaging Metrics
```typescript
interface MessagingMetrics {
  messageVolume: MessageVolumeMetrics;
  responseTimes: ResponseTimeMetrics;
  engagementMetrics: EngagementMetrics;
  groupActivity: GroupActivityMetrics;
  mediaSharing: MediaSharingMetrics;
  searchUsage: SearchUsageMetrics;
  performanceMetrics: PerformanceMetrics;
}

interface MessageVolumeMetrics {
  totalMessages: number;
  messagesByType: MessageTypeCount[];
  messagesByHour: HourlyMessageCount[];
  peakActivityTimes: TimeSlot[];
  averageMessagesPerConversation: number;
  messageGrowthRate: number;
  activeConversations: number;
  archivedConversations: number;
}
```

### Communication Analytics
- **Response Time Analysis**: Track average response times and patterns
- **Engagement Patterns**: Analyze message engagement and interaction patterns
- **Group Dynamics**: Analyze group communication patterns and effectiveness
- **Media Usage**: Track media sharing patterns and preferences
- **Search Patterns**: Analyze search behavior and effectiveness

### Optimization Strategies
- **Smart Notifications**: Optimize notification timing and frequency
- **Conversation Prioritization**: Prioritize important conversations
- **Auto-Responses**: Intelligent auto-response suggestions
- **Message Suggestions**: AI-powered message composition suggestions
- **Connection Recommendations**: Recommend valuable connections based on communication patterns

## Integration Points

### Partner Directory Integration
```typescript
interface DirectoryIntegration {
  partnerLookup: (searchQuery: string) => Promise<PartnerProfile[]>;
  conversationInitiation: (partnerId: string) => Promise<Conversation>;
  availabilityStatus: (partnerIds: string[]) => Promise<AvailabilityStatus[]>;
  commonConnections: (partnerId: string) => Promise<PartnerProfile[]>;
  suggestedConnections: (partnerId: string) => Promise<PartnerSuggestion[]>;
}
```

### Academy Integration
```typescript
interface AcademyIntegration {
  studyGroupMessaging: (courseId: string) => Promise<GroupConversation>;
  mentorCommunication: (mentorId: string) => Promise<Conversation>;
  collaborationRequests: (projectData: ProjectData) => Promise<MessageTemplate>;
  knowledgeSharing: (resourceId: string) => Promise<MessageComposer>;
  peerSupportGroups: (skillArea: string) => Promise<GroupConversation[]>;
}
```

## Security & Privacy

### Privacy Controls
- **Message Encryption**: End-to-end encryption for sensitive communications
- **Read Receipts Control**: User control over read receipt functionality
- **Last Seen Privacy**: Configurable last seen visibility settings
- **Message Deletion**: Secure message deletion with proper cleanup
- **Screenshot Prevention**: Where appropriate, prevent screenshotting sensitive content

### Content Moderation
- **Automated Filtering**: AI-powered content filtering for inappropriate content
- **Report System**: Easy reporting system for inappropriate messages
- **Moderation Tools**: Tools for moderators to manage conversations
- **Blocking System**: Robust blocking and muting capabilities
- **Harassment Prevention**: Proactive harassment detection and prevention

## Mobile Optimization

### Mobile Messaging Experience
- **Native-Feel Interface**: Mobile interface that feels like native messaging apps
- **Touch Gestures**: Intuitive touch gestures for common actions
- **Push Notifications**: Rich push notifications with message previews
- **Camera Integration**: Easy photo and video capture directly in messaging
- **Voice Messages**: Native voice message recording and playback

### Performance Features
- **Efficient Scrolling**: Smooth scrolling through long message histories
- **Image Optimization**: Optimized image loading and caching
- **Background Sync**: Background message sync when app is not active
- **Offline Drafts**: Save message drafts when offline
- **Battery Optimization**: Efficient battery usage for real-time messaging

## Future Enhancements

### AI-Powered Features
- **Smart Replies**: AI-powered reply suggestions based on conversation context
- **Message Translation**: Real-time message translation for global communication
- **Sentiment Analysis**: AI analysis of message sentiment and emotional tone
- **Spam Detection**: Advanced spam and unwanted message detection
- **Conversation Summarization**: AI-powered summaries of long conversations

### Advanced Features
- **Video Calling**: Integrated video and voice calling capabilities
- **Screen Sharing**: Screen sharing for collaborative discussions
- **Message Broadcasting**: Ability to broadcast messages to multiple groups
- **Scheduled Messages**: Schedule messages to be sent at specific times
- **Message Polls**: Interactive polls within conversations

### Enhanced Collaboration
- **Document Collaboration**: Real-time document editing and collaboration
- **Task Management**: Task creation and assignment within conversations
- **Calendar Integration**: Calendar event scheduling and management
- **Project Management**: Project coordination and management features
- **Whiteboard Sharing**: Collaborative whiteboard sessions within conversations