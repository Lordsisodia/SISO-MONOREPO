/**
 * Hook for fetching team members data
 */

import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';

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
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // MOCK DATA - Realistic team members
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API call

      const mockTeamMembers: TeamMember[] = [
        {
          id: 'member-1',
          name: 'Alex Chen',
          role: 'Senior AI Engineer',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
          email: 'alex.chen@sisotech.io',
          specialties: ['Machine Learning', 'Python', 'TensorFlow', 'API Development'],
          active: true,
          joinedAt: new Date('2024-01-15')
        },
        {
          id: 'member-2',
          name: 'Sarah Rodriguez',
          role: 'Lead UI/UX Designer',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          email: 'sarah.rodriguez@sisotech.io',
          specialties: ['User Experience', 'Figma', 'Mobile Design', 'Design Systems'],
          active: true,
          joinedAt: new Date('2024-02-01')
        },
        {
          id: 'member-3',
          name: 'Marcus Johnson',
          role: 'Full Stack Developer',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
          email: 'marcus.johnson@sisotech.io',
          specialties: ['React', 'Node.js', 'PostgreSQL', 'DevOps'],
          active: true,
          joinedAt: new Date('2024-01-20')
        },
        {
          id: 'member-4',
          name: 'Dr. Emma Wilson',
          role: 'Technical Architect',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
          email: 'emma.wilson@sisotech.io',
          specialties: ['System Architecture', 'Cloud Infrastructure', 'Security', 'Scalability'],
          active: true,
          joinedAt: new Date('2023-12-10')
        },
        {
          id: 'member-5',
          name: 'David Kim',
          role: 'QA Engineer',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
          email: 'david.kim@sisotech.io',
          specialties: ['Automated Testing', 'Cypress', 'Performance Testing', 'CI/CD'],
          active: true,
          joinedAt: new Date('2024-02-15')
        },
        {
          id: 'member-6',
          name: 'Lisa Patel',
          role: 'Product Manager',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
          email: 'lisa.patel@sisotech.io',
          specialties: ['Product Strategy', 'User Research', 'Analytics', 'Roadmap Planning'],
          active: true,
          joinedAt: new Date('2024-01-05')
        },
        {
          id: 'member-7',
          name: 'James Wright',
          role: 'DevOps Specialist',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
          email: 'james.wright@sisotech.io',
          specialties: ['AWS', 'Docker', 'Kubernetes', 'Monitoring'],
          active: false, // On vacation
          joinedAt: new Date('2024-03-01')
        }
      ];

      setTeamMembers(mockTeamMembers);
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