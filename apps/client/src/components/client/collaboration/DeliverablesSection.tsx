import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Package, Calendar, CheckCircle, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Deliverable {
  id: string;
  client_id: string;
  title: string;
  description: string;
  deliverable_type: 'wireframe' | 'mockup' | 'prototype' | 'document';
  preview_url?: string;
  file_urls?: string[];
  approval_status: 'pending' | 'approved' | 'needs_changes';
  approved_at?: string;
  created_by: string;
  created_at: string;
}

interface DeliverablesProps {
  clientId: string;
}

export function DeliverablesSection({ clientId }: DeliverablesProps) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!clientId) return;

    fetchDeliverables();
    
    // Real-time updates for new deliverables
    const subscription = supabase
      .channel(`deliverables_${clientId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'client_deliverables',
        filter: `client_id=eq.${clientId}`
      }, handleNewDeliverable)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'client_deliverables',
        filter: `client_id=eq.${clientId}`
      }, handleUpdateDeliverable)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [clientId]);

  const fetchDeliverables = async () => {
    try {
      const { data, error } = await supabase
        .from('client_deliverables')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setDeliverables(data || []);
    } catch (error) {
      console.error('Failed to fetch deliverables:', error);
      toast({
        title: 'Error',
        description: 'Failed to load deliverables',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewDeliverable = (payload: any) => {
    setDeliverables(prev => [payload.new, ...prev]);
    toast({
      title: 'New Deliverable',
      description: `${payload.new.title} is ready for review`,
    });
  };

  const handleUpdateDeliverable = (payload: any) => {
    setDeliverables(prev => prev.map(d => 
      d.id === payload.new.id ? payload.new : d
    ));
  };

  const handleApproval = async (deliverableId: string, status: 'approved' | 'needs_changes') => {
    setProcessingId(deliverableId);
    
    try {
      const { error } = await supabase
        .from('client_deliverables')
        .update({ 
          approval_status: status,
          approved_at: status === 'approved' ? new Date().toISOString() : null
        })
        .eq('id', deliverableId);

      if (error) throw error;

      // Update local state
      setDeliverables(prev => prev.map(d => 
        d.id === deliverableId 
          ? { ...d, approval_status: status, approved_at: status === 'approved' ? new Date().toISOString() : undefined }
          : d
      ));

      toast({
        title: status === 'approved' ? 'Deliverable Approved' : 'Feedback Submitted',
        description: status === 'approved' ? 'Great! The team can proceed.' : 'The team will make adjustments.',
      });

      // Update progressive unlock if this was a required approval
      if (status === 'approved') {
        await updateProgressiveUnlock(clientId);
      }
    } catch (error) {
      console.error('Approval failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update approval status',
        variant: 'destructive'
      });
    } finally {
      setProcessingId(null);
    }
  };

  const updateProgressiveUnlock = async (clientId: string) => {
    try {
      // Check if this is the first approved deliverable
      const { data, error } = await supabase
        .from('client_onboarding')
        .select('first_deliverable_approved')
        .eq('id', clientId)
        .single();

      if (!error && data && !data.first_deliverable_approved) {
        // Update the flag
        await supabase
          .from('client_onboarding')
          .update({ first_deliverable_approved: true })
          .eq('id', clientId);
      }
    } catch (error) {
      console.error('Failed to update progressive unlock:', error);
    }
  };

  if (loading) {
    return <Skeleton className="h-32" />;
  }

  if (deliverables.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No deliverables ready for review yet</p>
        <p className="text-sm mt-1">Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {deliverables.map(deliverable => (
        <DeliverableItem 
          key={deliverable.id} 
          deliverable={deliverable}
          onApprove={(status) => handleApproval(deliverable.id, status)}
          isProcessing={processingId === deliverable.id}
        />
      ))}
    </div>
  );
}

interface DeliverableItemProps {
  deliverable: Deliverable;
  onApprove: (status: 'approved' | 'needs_changes') => void;
  isProcessing: boolean;
}

function DeliverableItem({ deliverable, onApprove, isProcessing }: DeliverableItemProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-400/10 text-green-400 border-green-400/30">✅ Approved</Badge>;
      case 'needs_changes':
        return <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/30">🔄 Needs Changes</Badge>;
      case 'pending':
        return <Badge className="bg-blue-400/10 text-blue-400 border-blue-400/30">👀 Review Needed</Badge>;
      default:
        return <Badge variant="outline">⏳ In Progress</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wireframe':
        return '🎨';
      case 'mockup':
        return '🖼️';
      case 'prototype':
        return '🚀';
      case 'document':
        return '📄';
      default:
        return '📦';
    }
  };

  const formatDate = (date: string) => {
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="p-4 bg-slate-800/50 rounded-lg space-y-3 hover:bg-slate-800/70 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{getTypeIcon(deliverable.deliverable_type)}</span>
            <h4 className="font-medium text-white">{deliverable.title}</h4>
          </div>
          <p className="text-sm text-gray-300">{deliverable.description}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <Calendar className="h-3 w-3" />
            {formatDate(deliverable.created_at)}
            <span className="text-gray-600">•</span>
            <span>by {deliverable.created_by}</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {getStatusBadge(deliverable.approval_status)}
        </div>
      </div>

      {deliverable.preview_url && (
        <div className="border border-slate-600 rounded p-2 bg-slate-900/50">
          <img 
            src={deliverable.preview_url} 
            alt={deliverable.title}
            className="w-full h-32 object-cover rounded"
          />
        </div>
      )}

      {deliverable.approval_status === 'pending' && (
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            onClick={() => onApprove('approved')}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onApprove('needs_changes')}
            disabled={isProcessing}
            className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Request Changes
          </Button>
        </div>
      )}
    </div>
  );
}