import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import {
  Target,
  TrendingUp,
  DollarSign,
  Calendar as CalendarIcon,
  PiggyBank,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  Edit,
  Trash2,
  Bell,
  TargetIcon
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  FinancialTools,
  Budget,
  SavingsGoal,
  ExpenseTracking,
  FinancialCalendar,
  CalendarEvent
} from '../types/enhanced-wallet.types';

interface FinancialToolsProps {
  tools: FinancialTools;
  onToolsUpdate: (updates: Partial<FinancialTools>) => void;
  className?: string;
}

const categoryColors = {
  software: '#3b82f6',
  marketing: '#f97316',
  operations: '#10b981',
  professional: '#8b5cf6',
  travel: '#ec4899',
  other: '#6b7280'
};

const periodLabels = {
  weekly: 'This Week',
  monthly: 'This Month',
  yearly: 'This Year'
};

export const FinancialTools: React.FC<FinancialToolsProps> = ({
  tools,
  onToolsUpdate,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'budgets' | 'savings' | 'expenses' | 'calendar'>('budgets');
  const [showNewBudget, setShowNewBudget] = useState(false);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newBudget, setNewBudget] = useState<Partial<Budget>>({
    name: '',
    category: '',
    amount: 0,
    period: 'monthly'
  });
  const [newGoal, setNewGoal] = useState<Partial<SavingsGoal>>({
    name: '',
    target: 0,
    deadline: new Date(),
    category: '',
    autoContribution: { enabled: false, amount: 0, frequency: 'monthly' }
  });

  const handleAddBudget = () => {
    if (!newBudget.name || !newBudget.amount) return;

    const budget: Budget = {
      id: `budget-${Date.now()}`,
      name: newBudget.name,
      category: newBudget.category || 'other',
      amount: newBudget.amount,
      spent: 0,
      remaining: newBudget.amount,
      period: newBudget.period || 'monthly',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      alerts: []
    };

    onToolsUpdate({
      budgets: [...tools.budgets, budget]
    });
    setShowNewBudget(false);
    setNewBudget({ name: '', category: '', amount: 0, period: 'monthly' });
  };

  const handleAddSavingsGoal = () => {
    if (!newGoal.name || !newGoal.target) return;

    const goal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      name: newGoal.name,
      target: newGoal.target,
      current: 0,
      deadline: newGoal.deadline || new Date(),
      category: newGoal.category || 'general',
      autoContribution: newGoal.autoContribution || { enabled: false, amount: 0, frequency: 'monthly' },
      milestones: [
        {
          id: '25%',
          percentage: 25,
          amount: newGoal.target * 0.25,
          reached: false
        },
        {
          id: '50%',
          percentage: 50,
          amount: newGoal.target * 0.5,
          reached: false
        },
        {
          id: '75%',
          percentage: 75,
          amount: newGoal.target * 0.75,
          reached: false
        },
        {
          id: '100%',
          percentage: 100,
          amount: newGoal.target,
          reached: false
        }
      ]
    };

    onToolsUpdate({
      savingsGoals: [...tools.savingsGoals, goal]
    });
    setShowNewGoal(false);
    setNewGoal({ name: '', target: 0, deadline: new Date(), category: 'general' });
  };

  const updateBudgetProgress = (budgetId: string, spent: number) => {
    onToolsUpdate({
      budgets: tools.budgets.map(budget =>
        budget.id === budgetId
          ? { ...budget, spent, remaining: budget.amount - spent }
          : budget
      )
    });
  };

  const updateSavingsProgress = (goalId: string, current: number) => {
    onToolsUpdate({
      savingsGoals: tools.savingsGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map(milestone => ({
            ...milestone,
            reached: current >= milestone.amount
          }));

          return { ...goal, current, milestones: updatedMilestones };
        }
        return goal;
      })
    });
  };

  const deleteBudget = (budgetId: string) => {
    onToolsUpdate({
      budgets: tools.budgets.filter(budget => budget.id !== budgetId)
    });
  };

  const deleteGoal = (goalId: string) => {
    onToolsUpdate({
      savingsGoals: tools.savingsGoals.filter(goal => goal.id !== goalId)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBudgetStatus = (budget: Budget) => {
    const percentage = (budget.spent / budget.amount) * 100;
    if (percentage >= 100) return { color: 'text-rose-500', label: 'Over Budget' };
    if (percentage >= 80) return { color: 'text-amber-500', label: 'Nearly Limit' };
    if (percentage >= 50) return { color: 'text-blue-500', label: 'On Track' };
    return { color: 'text-emerald-500', label: 'Healthy' };
  };

  const getSavingsProgress = (goal: SavingsGoal) => {
    const percentage = (goal.current / goal.target) * 100;
    return Math.min(percentage, 100);
  };

  const getUpcomingEvents = (): CalendarEvent[] => {
    const now = new Date();
    return tools.financialCalendar.events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Tab Navigation */}
      <Card className="p-2">
        <div className="flex space-x-1">
          {[
            { id: 'budgets', label: 'Budgets', icon: BarChart3 },
            { id: 'savings', label: 'Savings Goals', icon: Target },
            { id: 'expenses', label: 'Expenses', icon: Receipt },
            { id: 'calendar', label: 'Calendar', icon: CalendarIcon }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-siso-orange" />
                <h4 className="font-semibold text-siso-text-primary">Budget Management</h4>
                <Badge variant="outline">{tools.budgets.length} budgets</Badge>
              </div>
              <Button onClick={() => setShowNewBudget(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Budget
              </Button>
            </div>

            {showNewBudget && (
              <div className="mb-4 p-4 rounded-lg border border-siso-border space-y-4">
                <h5 className="font-medium">Create New Budget</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Budget Name</Label>
                    <Input
                      value={newBudget.name}
                      onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Marketing Expenses"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newBudget.category} onValueChange={(value) => setNewBudget(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Amount</Label>
                    <Input
                      type="number"
                      value={newBudget.amount}
                      onChange={(e) => setNewBudget(prev => ({ ...prev, amount: Number(e.target.value) }))}
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select value={newBudget.period} onValueChange={(value) => setNewBudget(prev => ({ ...prev, period: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddBudget} className="flex-1">Create Budget</Button>
                  <Button variant="outline" onClick={() => setShowNewBudget(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {tools.budgets.map((budget) => {
                const status = getBudgetStatus(budget);
                const percentage = (budget.spent / budget.amount) * 100;

                return (
                  <div key={budget.id} className="p-4 rounded-lg border border-siso-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{budget.name}</span>
                          <Badge variant="outline" className="capitalize">{budget.category}</Badge>
                          <Badge className={status.color}>{status.label}</Badge>
                        </div>
                        <div className="text-sm text-siso-text-muted">
                          {periodLabels[budget.period]}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteBudget(budget.id)}
                          className="text-rose-500 hover:text-rose-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Budget Progress</span>
                        <span>{formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-siso-text-muted">
                        <span>{formatCurrency(budget.remaining)} remaining</span>
                        <span>{percentage.toFixed(0)}% used</span>
                      </div>
                    </div>

                    {budget.alerts && budget.alerts.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <Bell className="h-3 w-3 text-amber-500" />
                        <span className="text-amber-500">{budget.alerts.length} active alerts</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {tools.budgets.length === 0 && (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
                  <p className="text-siso-text-muted">No budgets created</p>
                  <p className="text-sm text-siso-text-muted/70 mt-1">
                    Create budgets to track and manage your spending
                  </p>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {/* Savings Goals Tab */}
      {activeTab === 'savings' && (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TargetIcon className="h-5 w-5 text-siso-orange" />
                <h4 className="font-semibold text-siso-text-primary">Savings Goals</h4>
                <Badge variant="outline">{tools.savingsGoals.length} goals</Badge>
              </div>
              <Button onClick={() => setShowNewGoal(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </div>

            {showNewGoal && (
              <div className="mb-4 p-4 rounded-lg border border-siso-border space-y-4">
                <h5 className="font-medium">Create New Savings Goal</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Goal Name</Label>
                    <Input
                      value={newGoal.name}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Emergency Fund"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount</Label>
                    <Input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, target: Number(e.target.value) }))}
                      placeholder="5000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={newGoal.category} onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Fund</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Date</Label>
                    <Input
                      type="date"
                      value={newGoal.deadline?.toISOString().split('T')[0]}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: new Date(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newGoal.autoContribution?.enabled}
                      onCheckedChange={(checked) =>
                        setNewGoal(prev => ({
                          ...prev,
                          autoContribution: { ...prev.autoContribution!, enabled: checked }
                        }))
                      }
                    />
                    <Label>Enable automatic contributions</Label>
                  </div>
                  {newGoal.autoContribution?.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        value={newGoal.autoContribution.amount}
                        onChange={(e) =>
                          setNewGoal(prev => ({
                            ...prev,
                            autoContribution: { ...prev.autoContribution!, amount: Number(e.target.value) }
                          }))
                        }
                        placeholder="100"
                      />
                      <Select
                        value={newGoal.autoContribution.frequency}
                        onValueChange={(value) =>
                          setNewGoal(prev => ({
                            ...prev,
                            autoContribution: { ...prev.autoContribution!, frequency: value as any }
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddSavingsGoal} className="flex-1">Create Goal</Button>
                  <Button variant="outline" onClick={() => setShowNewGoal(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {tools.savingsGoals.map((goal) => {
                const progress = getSavingsProgress(goal);
                const daysRemaining = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                return (
                  <Card key={goal.id} className="p-4 border border-siso-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-medium">{goal.name}</div>
                        <div className="text-xs text-siso-text-muted capitalize">{goal.category}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-rose-500 hover:text-rose-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-siso-text-primary">
                          {formatCurrency(goal.current)}
                        </div>
                        <div className="text-xs text-siso-text-muted">
                          of {formatCurrency(goal.target)}
                        </div>
                      </div>

                      <Progress value={progress} className="h-2" />

                      <div className="grid grid-cols-4 gap-1">
                        {goal.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            className={cn(
                              "h-1 rounded-full",
                              milestone.reached ? "bg-emerald-500" : "bg-siso-border"
                            )}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-siso-text-muted">
                        <span>{progress.toFixed(0)}% complete</span>
                        <span>{daysRemaining} days left</span>
                      </div>

                      {goal.autoContribution.enabled && (
                        <div className="flex items-center gap-1 text-xs text-emerald-500">
                          <PiggyBank className="h-3 w-3" />
                          <span>Auto: {formatCurrency(goal.autoContribution.amount)}/{goal.autoContribution.frequency}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}

              {tools.savingsGoals.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <Target className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
                  <p className="text-siso-text-muted">No savings goals</p>
                  <p className="text-sm text-siso-text-muted/70 mt-1">
                    Set goals to track your savings progress
                  </p>
                </div>
              )}
            </div>
          </Card>
        </>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 text-siso-orange" />
                <h4 className="font-semibold text-siso-text-primary">Expense Tracking</h4>
                <Badge variant="outline">{tools.expenseTracking.categories.length} categories</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {tools.expenseTracking.categories.map((category, index) => (
                <div key={category.name} className="p-4 rounded-lg border border-siso-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: categoryColors[category.name as keyof typeof categoryColors] }}
                      />
                      <span className="font-medium capitalize">{category.name}</span>
                    </div>
                    <Badge variant="outline">{category.transactionCount} transactions</Badge>
                  </div>
                  <div className="text-lg font-semibold text-siso-text-primary">
                    {formatCurrency(category.totalSpent)}
                  </div>
                  <div className="text-xs text-siso-text-muted">
                    This month • Avg {formatCurrency(category.averageTransaction)} per transaction
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Expenses */}
            <div>
              <h5 className="font-medium mb-3">Recent Expenses</h5>
              <div className="space-y-2">
                {/* Sample expenses - replace with actual data */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Receipt className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Software License</div>
                      <div className="text-xs text-siso-text-muted">Nov 10, 2024 • Software</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-rose-500">-29.99</div>
                    <div className="text-xs text-siso-text-muted">Business</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <Receipt className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Google Ads</div>
                      <div className="text-xs text-siso-text-muted">Nov 8, 2024 • Marketing</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-rose-500">-150.00</div>
                    <div className="text-xs text-siso-text-muted">Campaign</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-siso-orange" />
                <h4 className="font-semibold text-siso-text-primary">Financial Calendar</h4>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Calendar Component */}
              <div>
                <h5 className="font-medium mb-3">Calendar View</h5>
                <div className="border border-siso-border rounded-lg p-4">
                  {/* Simple calendar representation - replace with actual calendar component */}
                  <div className="text-center text-sm text-siso-text-muted">
                    Calendar View
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div>
                <h5 className="font-medium mb-3">Upcoming Events</h5>
                <div className="space-y-3">
                  {getUpcomingEvents().map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border border-siso-border">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1",
                        event.type === 'payment' ? "bg-emerald-500" :
                        event.type === 'deadline' ? "bg-rose-500" :
                        event.type === 'reminder' ? "bg-amber-500" :
                        "bg-blue-500"
                      )} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-siso-text-muted">
                          {event.date.toLocaleDateString()} • {event.time}
                        </div>
                        {event.amount && (
                          <div className="text-xs text-siso-text-primary">
                            {formatCurrency(event.amount)}
                          </div>
                        )}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                  ))}

                  {getUpcomingEvents().length === 0 && (
                    <div className="text-center py-6">
                      <CalendarIcon className="h-8 w-8 text-siso-text-muted mx-auto mb-2" />
                      <p className="text-sm text-siso-text-muted">No upcoming events</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar Templates */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Quick Templates</h5>
              <div className="grid grid-cols-3 gap-3">
                {tools.financialCalendar.templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    size="sm"
                    className="justify-start"
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};