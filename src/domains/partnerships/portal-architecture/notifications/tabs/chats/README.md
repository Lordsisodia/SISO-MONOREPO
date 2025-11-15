# Chats Notifications Tab

Real-time messaging notifications, chat updates, and communication alerts for seamless partnership collaboration.

## Overview

The Chats Notifications tab provides centralized access to all messaging-related notifications including new messages, chat invitations, group updates, and missed calls. This ensures partners can stay connected and respond promptly to communication opportunities.

## Domain Types

```typescript
interface ChatNotification {
  id: string;
  type: ChatNotificationType;
  category: ChatCategory;
  priority: NotificationPriority;
  chatId: string;
  chatType: ChatType;
  title: string;
  message: string;
  sender: ChatParticipant;
  timestamp: Date;
  isRead: boolean;
  metadata: ChatNotificationMetadata;
  attachments?: ChatAttachment[];
  reactions?: MessageReaction[];
  replyCount?: number;
  isUrgent?: boolean;
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  status: ParticipantStatus;
  role?: string;
  lastSeen?: Date;
  isTyping?: boolean;
}

interface ChatNotificationMetadata {
  messagePreview?: string;
  messageCount?: number;
  unreadCount: number;
  lastMessageTime: Date;
  chatTitle: string;
  participantCount?: number;
  isGroup?: boolean;
  isArchived?: boolean;
  hasMentions?: boolean;
  isThread?: boolean;
  threadParentId?: string;
}

enum ChatNotificationType {
  NEW_MESSAGE = 'new_message',
  MESSAGE_REACTION = 'message_reaction',
  MESSAGE_REPLY = 'message_reply',
  CHAT_INVITATION = 'chat_invitation',
  GROUP_UPDATE = 'group_update',
  PARTICIPANT_JOINED = 'participant_joined',
  PARTICIPANT_LEFT = 'participant_left',
  MISSED_CALL = 'missed_call',
  VOICE_MESSAGE = 'voice_message',
  FILE_SHARED = 'file_shared'
}

enum ChatCategory {
  DIRECT = 'direct',
  GROUP = 'group',
  BUSINESS = 'business',
  SUPPORT = 'support',
  SYSTEM = 'system',
  MARKETING = 'marketing'
}

enum ChatType {
  DIRECT_MESSAGE = 'direct_message',
  GROUP_CHAT = 'group_chat',
  CHANNEL = 'channel',
  THREAD = 'thread',
  SUPPORT_CHAT = 'support_chat'
}
```

## Application Hooks

```typescript
// Chat Notifications Management
export const useChatNotifications = () => {
  const [chatNotifications, setChatNotifications] = useState<ChatNotification[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadChatNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await chatService.getChatNotifications({
        includeRead: false,
        limit: 50,
        sortBy: 'timestamp',
        sortOrder: 'desc'
      });
      
      setChatNotifications(response.data);
      
      // Calculate unread counts by chat
      const counts = response.data.reduce((acc: Record<string, number>, notification: ChatNotification) => {
        acc[notification.chatId] = (acc[notification.chatId] || 0) + 1;
        return acc;
      }, {});
      
      setUnreadCounts(counts);
      setActiveChats(Object.keys(counts));
    } catch (error) {
      console.error('Failed to load chat notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    await chatService.markNotificationAsRead(notificationId);
    setChatNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    // Update unread counts
    setUnreadCounts(prev => {
      const notification = chatNotifications.find(n => n.id === notificationId);
      if (!notification) return prev;
      
      const newCounts = { ...prev };
      newCounts[notification.chatId] = Math.max(0, (newCounts[notification.chatId] || 1) - 1);
      
      if (newCounts[notification.chatId] === 0) {
        delete newCounts[notification.chatId];
      }
      
      return newCounts;
    });
  }, [chatNotifications]);

  const markChatAsRead = useCallback(async (chatId: string) => {
    await chatService.markChatAsRead(chatId);
    setChatNotifications(prev => prev.filter(n => n.chatId !== chatId));
    setUnreadCounts(prev => {
      const newCounts = { ...prev };
      delete newCounts[chatId];
      return newCounts;
    });
  }, []);

  return {
    chatNotifications,
    unreadCounts,
    activeChats,
    isLoading,
    loadChatNotifications,
    markAsRead,
    markChatAsRead
  };
};

// Real-time Chat Updates
export const useChatRealTime = () => {
  const socket = useWebSocket();
  const { loadChatNotifications } = useChatNotifications();

  useEffect(() => {
    if (!socket) return;

    socket.on('new_message', (data: NewMessageData) => {
      // Show toast for new message
      showToast({
        title: `New message from ${data.sender.name}`,
        message: data.messagePreview,
        type: 'info',
        duration: 4000,
        action: {
          label: 'View',
          onClick: () => navigateToChat(data.chatId)
        }
      });

      // Refresh notifications
      loadChatNotifications();
    });

    socket.on('message_reaction', (data: ReactionData) => {
      // Update notification for message reaction
      loadChatNotifications();
    });

    socket.on('chat_invitation', (data: InvitationData) => {
      showToast({
        title: 'Chat Invitation',
        message: `${data.inviter.name} invited you to ${data.chatTitle}`,
        type: 'info',
        duration: 6000,
        actions: [
          {
            label: 'Accept',
            onClick: () => acceptInvitation(data.chatId)
          },
          {
            label: 'Decline',
            onClick: () => declineInvitation(data.chatId)
          }
        ]
      });
    });

    return () => {
      socket.off('new_message');
      socket.off('message_reaction');
      socket.off('chat_invitation');
    };
  }, [socket, loadChatNotifications]);

  return { isConnected: !!socket };
};

// Chat Filtering and Search
export const useChatFilters = () => {
  const [filters, setFilters] = useState<ChatFilterState>({
    category: 'all',
    chatType: 'all',
    hasAttachments: false,
    isUrgent: false
  });
  const [searchQuery, setSearchQuery] = useState('');

  const applyFilter = useCallback((filterKey: keyof ChatFilterState, value: any) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      chatType: 'all',
      hasAttachments: false,
      isUrgent: false
    });
    setSearchQuery('');
  }, []);

  const filterNotifications = useCallback((notifications: ChatNotification[]): ChatNotification[] => {
    return notifications.filter(notification => {
      if (filters.category !== 'all' && notification.category !== filters.category) {
        return false;
      }
      
      if (filters.chatType !== 'all' && notification.chatType !== filters.chatType) {
        return false;
      }
      
      if (filters.hasAttachments && (!notification.attachments || notification.attachments.length === 0)) {
        return false;
      }
      
      if (filters.isUrgent && !notification.isUrgent) {
        return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          notification.title.toLowerCase().includes(query) ||
          notification.message.toLowerCase().includes(query) ||
          notification.sender.name.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  }, [filters, searchQuery]);

  return { filters, searchQuery, applyFilter, clearFilters, filterNotifications };
};
```

## Component Architecture

### ChatsNotificationsContainer

```typescript
interface ChatsNotificationsContainerProps {
  initialFilters?: Partial<ChatFilterState>;
}

export const ChatsNotificationsContainer: React.FC<ChatsNotificationsContainerProps> = ({
  initialFilters = {}
}) => {
  const {
    chatNotifications,
    unreadCounts,
    activeChats,
    isLoading,
    loadChatNotifications,
    markAsRead,
    markChatAsRead
  } = useChatNotifications();

  const { isConnected } = useChatRealTime();
  const { filters, searchQuery, applyFilter, clearFilters, filterNotifications } = useChatFilters();

  const [showFilters, setShowFilters] = useState(false);
  const [groupedNotifications, setGroupedNotifications] = useState<Record<string, ChatNotification[]>>({});

  // Group notifications by chat
  useEffect(() => {
    const filtered = filterNotifications(chatNotifications);
    const grouped = filtered.reduce((acc: Record<string, ChatNotification[]>, notification) => {
      if (!acc[notification.chatId]) {
        acc[notification.chatId] = [];
      }
      acc[notification.chatId].push(notification);
      return acc;
    }, {});
    
    setGroupedNotifications(grouped);
  }, [chatNotifications, filterNotifications]);

  const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);

  return (
    <ChatsLayout>
      <ChatsHeader>
        <HeaderLeft>
          <ChatsTitle>Messages</ChatsTitle>
          {totalUnread > 0 && (
            <UnreadCountBadge count={totalUnread} />
          )}
          <ConnectionStatus isConnected={isConnected} />
        </HeaderLeft>
        
        <HeaderActions>
          <MarkAllReadButton onClick={() => activeChats.forEach(markChatAsRead)}>
            Mark All Read
          </MarkAllReadButton>
          <FilterButton onClick={() => setShowFilters(!showFilters)} isActive={hasActiveFilters} />
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search messages..." />
        </HeaderActions>
      </ChatsHeader>

      {showFilters && (
        <ChatFiltersPanel
          filters={filters}
          onFilterChange={applyFilter}
          onClearFilters={clearFilters}
        />
      )}

      <ChatsContent>
        {isLoading && chatNotifications.length === 0 ? (
          <ChatsLoader />
        ) : Object.keys(groupedNotifications).length === 0 ? (
          <EmptyChatsState hasSearch={!!searchQuery} hasFilters={hasActiveFilters} />
        ) : (
          <GroupedChatsList
            groupedNotifications={groupedNotifications}
            unreadCounts={unreadCounts}
            onMarkAsRead={markAsRead}
            onMarkChatAsRead={markChatAsRead}
          />
        )}
      </ChatsContent>
    </ChatsLayout>
  );
};
```

### ChatNotificationGroup

```typescript
interface ChatNotificationGroupProps {
  chatId: string;
  notifications: ChatNotification[];
  unreadCount: number;
  onMarkAsRead: (notificationId: string) => void;
  onMarkChatAsRead: (chatId: string) => void;
}

export const ChatNotificationGroup: React.FC<ChatNotificationGroupProps> = ({
  chatId,
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkChatAsRead
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const latestNotification = notifications[0];

  const handleGroupClick = useCallback(() => {
    navigateToChat(chatId);
  }, [chatId]);

  const handleExpandClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleMarkChatRead = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMarkChatAsRead(chatId);
  }, [chatId, onMarkChatAsRead]);

  return (
    <ChatGroupContainer>
      <ChatGroupHeader onClick={handleGroupClick}>
        <ChatGroupLeft>
          <ChatAvatar
            src={latestNotification.sender.avatar}
            name={latestNotification.sender.name}
            status={latestNotification.sender.status}
            isTyping={latestNotification.sender.isTyping}
          />
          
          <ChatGroupContent>
            <ChatGroupTitle>
              {latestNotification.metadata.chatTitle}
              {unreadCount > 0 && (
                <UnreadBadge count={unreadCount} />
              )}
            </ChatGroupTitle>
            
            <ChatGroupMessage>
              {latestNotification.sender.name}: {latestNotification.metadata.messagePreview}
            </ChatGroupMessage>
            
            <ChatGroupMetadata>
              <Timestamp timestamp={latestNotification.timestamp} />
              <MessageCount count={latestNotification.metadata.messageCount || notifications.length} />
              {latestNotification.metadata.hasMentions && <MentionIndicator />}
            </ChatGroupMetadata>
          </ChatGroupContent>
        </ChatGroupLeft>

        <ChatGroupRight>
          {unreadCount > 0 && (
            <MarkChatReadButton onClick={handleMarkChatRead}>
              Mark Read
            </MarkChatReadButton>
          )}
          <ExpandButton onClick={handleExpandClick} isExpanded={isExpanded} />
        </ChatGroupRight>
      </ChatGroupHeader>

      {isExpanded && (
        <ChatExpandedContent>
          {notifications.map((notification) => (
            <ChatNotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              showChatHeader={false}
            />
          ))}
        </ChatExpandedContent>
      )}
    </ChatGroupContainer>
  );
};
```

### ChatNotificationItem

```typescript
interface ChatNotificationItemProps {
  notification: ChatNotification;
  onMarkAsRead: (notificationId: string) => void;
  showChatHeader?: boolean;
}

export const ChatNotificationItem: React.FC<ChatNotificationItemProps> = ({
  notification,
  onMarkAsRead,
  showChatHeader = true
}) => {
  const handleMarkAsRead = useCallback(() => {
    onMarkAsRead(notification.id);
  }, [notification.id, onMarkAsRead]);

  const handleReplyClick = useCallback(() => {
    navigateToChat(notification.chatId, { focusReply: true, messageId: notification.metadata.replyId });
  }, [notification.chatId, notification.metadata.replyId]);

  return (
    <ChatNotificationContainer isRead={notification.isRead}>
      {showChatHeader && (
        <ChatNotificationHeader>
          <ChatTitle>{notification.metadata.chatTitle}</ChatTitle>
          <ChatTypeBadge type={notification.chatType} />
        </ChatNotificationHeader>
      )}
      
      <ChatNotificationContent>
        <MessageSender>
          <SenderAvatar
            src={notification.sender.avatar}
            name={notification.sender.name}
          />
          <SenderInfo>
            <SenderName>{notification.sender.name}</SenderName>
            <SenderStatus status={notification.sender.status} />
          </SenderInfo>
          <MessageTimestamp timestamp={notification.timestamp} />
        </MessageSender>
        
        <MessageContent>
          <MessageText>{notification.message}</MessageText>
          
          {notification.attachments && notification.attachments.length > 0 && (
            <MessageAttachments attachments={notification.attachments} />
          )}
          
          {notification.reactions && notification.reactions.length > 0 && (
            <MessageReactions reactions={notification.reactions} />
          )}
        </MessageContent>
        
        {notification.replyCount && notification.replyCount > 0 && (
          <ReplySection onClick={handleReplyClick}>
            <ReplyIcon />
            <ReplyText>{notification.replyCount} replies</ReplyText>
          </ReplySection>
        )}
        
        <NotificationActions>
          <ActionButton onClick={() => navigateToChat(notification.chatId)}>
            View Chat
          </ActionButton>
          <ActionButton onClick={handleMarkAsRead}>
            Mark as Read
          </ActionButton>
          {notification.isUrgent && (
            <UrgentIndicator />
          )}
        </NotificationActions>
      </ChatNotificationContent>
    </ChatNotificationContainer>
  );
};
```

## Implementation Guidelines

### Real-time Message Handling

```typescript
export const useRealtimeMessageHandling = () => {
  const socket = useWebSocket();

  const handleNewMessage = useCallback((messageData: NewMessageData) => {
    // Update notification count
    updateNotificationCount(messageData.chatId, 1);
    
    // Show appropriate notification based on user preferences
    if (shouldShowNotification(messageData)) {
      showChatNotification(messageData);
    }
    
    // Play notification sound if enabled
    if (isSoundEnabled()) {
      playNotificationSound('message');
    }
  }, []);

  const handleTypingIndicator = useCallback((typingData: TypingData) => {
    updateTypingIndicator(typingData.chatId, typingData.userId, typingData.isTyping);
  }, []);

  const handleMessageRead = useCallback((readData: MessageReadData) => {
    updateMessageReadStatus(readData.messageId, readData.userId);
  }, []);

  return { handleNewMessage, handleTypingIndicator, handleMessageRead };
};
```

### Notification Prioritization

```typescript
export const useChatNotificationPriority = () => {
  const calculatePriority = useCallback((notification: ChatNotification): number => {
    let score = 0;
    
    // Urgent messages get highest priority
    if (notification.isUrgent) score += 100;
    
    // Priority based on message type
    switch (notification.type) {
      case 'chat_invitation':
        score += 80;
        break;
      case 'missed_call':
        score += 75;
        break;
      case 'voice_message':
        score += 70;
        break;
      case 'new_message':
        score += 50;
        break;
    }
    
    // Priority based on mentions
    if (notification.metadata.hasMentions) score += 30;
    
    // Priority based on sender relationship
    if (notification.sender.role === 'admin' || notification.sender.role === 'support') {
      score += 25;
    }
    
    // Decrease priority over time
    const ageInMinutes = (Date.now() - notification.timestamp.getTime()) / (1000 * 60);
    score -= Math.min(ageInMinutes * 0.1, 20);
    
    return score;
  }, []);

  const sortNotifications = useCallback((notifications: ChatNotification[]): ChatNotification[] => {
    return [...notifications].sort((a, b) => {
      const priorityA = calculatePriority(a);
      const priorityB = calculatePriority(b);
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }
      
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [calculatePriority]);

  return { calculatePriority, sortNotifications };
};
```

## Features

### Real-time Messaging
- Live message notifications
- Typing indicators
- Read receipts
- Online status tracking

### Smart Grouping
- Group notifications by chat
- Unread count per conversation
- Message previews and context
- Thread support for organized discussions

### Rich Content Support
- File attachments
- Voice messages
- Image previews
- Message reactions

### Interactive Actions
- Quick reply options
- Chat navigation
- Message marking and archiving
- Search and filtering capabilities

## Security Considerations

- End-to-end encryption for message content
- Authentication for chat access
- Message integrity verification
- Privacy controls for read receipts

## Accessibility

- Screen reader support for message content
- Keyboard navigation for chat actions
- High contrast mode support
- Audio cues for new messages