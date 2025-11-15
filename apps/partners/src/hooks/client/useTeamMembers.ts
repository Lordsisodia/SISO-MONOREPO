/**
 * Hook for fetching team members data
 */

import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  email?: string;
  specialties: string[];
  active: boolean;
  joinedAt: Date;
}

export function useTeamMembers(projectId?: string) {
  const { user } = useSupabaseAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    if (!projectId || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call the database function to get team members
      const { data, error: functionError } = await supabase
        .rpc('get_project_team_members', {
          project_uuid: projectId
        });

      if (functionError) {
        throw functionError;
      }

      if (data) {
        const transformedData: TeamMember[] = (data || []).map((member: any) => ({
          id: member.id,
          name: member.name,
          role: member.role,
          avatarUrl: member.avatar_url,
          email: member.email,
          specialties: member.specialties || [],
          active: member.active,
          joinedAt: new Date(member.joined_at)
        }));

        setTeamMembers(transformedData);
      }
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [projectId, user?.id]);

  return {
    teamMembers,
    loading,
    error,
    refresh: fetchTeamMembers
  };
}