import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessage {
  id: string;
  client_id: string;
  sender_type: 'client' | 'team_member' | 'ai_agent';
  sender_name: string;
  message: string;
  message_type: 'text' | 'image' | 'file';
  attachments?: any;
  created_at: string;
}

interface TeamChatProps {
  clientId: string;
}

export function TeamChatSection({ clientId }: TeamChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!clientId) return;

    fetchRecentMessages();
    
    // Real-time chat subscription
    const subscription = supabase
      .channel(`team_chat_${clientId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'team_chat_messages',
        filter: `client_id=eq.${clientId}`
      }, handleNewMessage)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [clientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRecentMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('team_chat_messages')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (payload: any) => {
    setMessages(prev => [...prev, payload.new]);
    
    // Play notification sound if message is from team
    if (payload.new.sender_type !== 'client') {
      playNotificationSound();
    }
  };

  const playNotificationSound = () => {
    // Simple notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DyvmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgceZMTu65hWGApGn+DwtmwhBSuBzvLTgjMGHY/Z8tGEOgce');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('team_chat_messages')
        .insert({
          client_id: clientId,
          sender_type: 'client',
          sender_name: 'You',
          message: newMessage.trim(),
          message_type: 'text'
        });

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'just now';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-slate-800 rounded-lg"></div>
        <div className="h-10 bg-slate-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chat messages */}
      <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-900/50 rounded-lg scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Start a conversation with your team</p>
            <p className="text-sm mt-1">Ask questions, share feedback, or request updates</p>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message input */}
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-gray-400"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          disabled={sending}
        />
        <Button 
          onClick={sendMessage} 
          disabled={!newMessage.trim() || sending}
          className="bg-green-600 hover:bg-green-700"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

interface ChatMessageItemProps {
  message: ChatMessage;
}

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isClient = message.sender_type === 'client';
  
  const getSenderIcon = (type: string) => {
    switch (type) {
      case 'ai_agent': return '🤖';
      case 'team_member': return '👤';
      case 'client': return '👤';
      default: return '💬';
    }
  };

  const formatTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'just now';
    }
  };
  
  return (
    <div className={cn("flex gap-2", isClient && "flex-row-reverse")}>
      <div className="flex-shrink-0">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
          isClient 
            ? "bg-blue-600 text-white" 
            : message.sender_type === 'ai_agent'
            ? "bg-green-600 text-white"
            : "bg-slate-700 text-gray-300"
        )}>
          {getSenderIcon(message.sender_type)}
        </div>
      </div>
      <div className={cn("flex-1 max-w-[70%]", isClient && "text-right")}>
        <div className="text-xs text-gray-400 mb-1">
          {message.sender_name} • {formatTimeAgo(message.created_at)}
        </div>
        <div className={cn(
          "p-3 rounded-lg text-sm break-words",
          isClient 
            ? "bg-blue-600 text-white ml-auto" 
            : "bg-slate-800 text-gray-100 mr-auto"
        )}>
          {message.message}
        </div>
      </div>
    </div>
  );
}