import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { TodoItem, ClientData } from '@/types/client.types';
import { TodoList } from '@/components/admin/clients/TodoList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Clock, FilterIcon, Users, Package, MessageSquare } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientDashboardLayout } from "@/components/client/ClientDashboardLayout";
import { TeamActivityFeed } from '@/components/client/collaboration/TeamActivityFeed';
import { DeliverablesSection } from '@/components/client/collaboration/DeliverablesSection';
import { TeamChatSection } from '@/components/client/collaboration/TeamChatSection';

export default function ClientTasksPage() {
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Use RPC to fetch client ID safely
        const { data: clientIdData, error: clientIdError } = await supabase.rpc('get_client_by_user_id', { user_uuid: user.id });

        if (clientIdError || !clientIdData || clientIdData.length === 0) return;
        const clientId = clientIdData[0].client_id;

        // Fetch client data
        const { data, error } = await supabase
          .from('client_onboarding')
          .select('*')
          .eq('id', clientId)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          // Parse todos array with safe fallback and proper casting
          let todos: TodoItem[] = [];
          if (data.todos && Array.isArray(data.todos)) {
            // Ensure each todo item has the required properties of TodoItem
            todos = (data.todos as any[]).map(item => ({
              id: item.id || `temp-${Math.random().toString(36).substr(2, 9)}`,
              text: item.text || '',
              completed: !!item.completed,
              priority: item.priority || 'medium',
              due_date: item.due_date,
              related_to: item.related_to,
              assigned_to: item.assigned_to
            })) as TodoItem[];
          }
          
          const clientData = {
            ...(data as any),
            todos
          } as ClientData;
          
          setClient(clientData);
        }
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load tasks",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [toast]);

  const handleUpdateTodos = async (todos: TodoItem[]) => {
    if (!client) return;

    try {
      // Serialize the todos to JSON to meet Supabase type requirements
      const { error } = await supabase
        .from('client_onboarding')
        .update({ todos: JSON.parse(JSON.stringify(todos)) })
        .eq('id', client.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error updating todos",
          description: error.message,
        });
      } else {
        setClient(prev => prev ? { ...prev, todos } : null);
        toast({
          title: "Tasks updated",
          description: "Your tasks have been successfully updated.",
        });
      }
    } catch (error) {
      console.error('Unexpected error updating todos:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating tasks.",
      });
    }
  };

  const filteredTodos = () => {
    if (!client?.todos) return [];
    
    switch (filter) {
      case 'completed':
        return client.todos.filter(todo => todo.completed);
      case 'pending':
        return client.todos.filter(todo => !todo.completed);
      default:
        return client.todos;
    }
  };

  const getTaskStats = () => {
    if (!client?.todos) return { total: 0, completed: 0, pending: 0 };
    
    const total = client.todos.length;
    const completed = client.todos.filter(todo => todo.completed).length;
    
    return {
      total,
      completed,
      pending: total - completed
    };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <ClientDashboardLayout>
        <div>
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </ClientDashboardLayout>
    );
  }

  return (
    <ClientDashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white">Work in Progress</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 border-slate-700 bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <CheckCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-semibold text-white">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 border-slate-700 bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-semibold text-white">{stats.completed}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 border-slate-700 bg-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-semibold text-white">{stats.pending}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Team Activity Section */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Team Working Now
              <Badge variant="outline" className="bg-green-400/10 text-green-400 border-green-400/30">
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamActivityFeed clientId={client?.id || ''} />
          </CardContent>
        </Card>
        
        {/* Tasks Section */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              🎯 Need Your Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <p className="text-sm text-gray-400">Tasks that require your attention</p>
              
              <div className="flex items-center gap-3">
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger className="w-[180px] bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Filter</SelectLabel>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {client?.todos && client.todos.length > 0 ? (
              <TodoList 
                todos={filteredTodos()} 
                onUpdate={handleUpdateTodos} 
                clientId={client.id} 
              />
            ) : (
              <div className="text-center py-8">
                <Circle className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                <h3 className="text-lg font-medium mb-1 text-white">No Tasks Available</h3>
                <p className="text-gray-400">
                  You don't have any tasks assigned currently.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Deliverables Section */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-400" />
              📦 Recent Deliverables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DeliverablesSection clientId={client?.id || ''} />
          </CardContent>
        </Card>

        {/* Team Chat Section */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-400" />
              💬 Team Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TeamChatSection clientId={client?.id || ''} />
          </CardContent>
        </Card>
      </div>
    </ClientDashboardLayout>
  );
}
