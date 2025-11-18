export type TaskPriority = 'critical' | 'high' | 'medium' | 'low' | 'backlog';

export const TASK_PRIORITY_CONFIG: Record<TaskPriority, { label: string; icon: string }> = {
  critical: { label: 'Critical', icon: '🔥' },
  high: { label: 'High', icon: '🔴' },
  medium: { label: 'Medium', icon: '🟡' },
  low: { label: 'Low', icon: '🟢' },
  backlog: { label: 'Backlog', icon: '⚪' },
};
