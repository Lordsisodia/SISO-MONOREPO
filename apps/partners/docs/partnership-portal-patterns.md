# Partnership Portal Development Patterns

## 🎯 **Partnership-Focused Development Principles**

### Enhanced Security Patterns (From SISO-INTERNAL Learnings)
- **Tenant Isolation**: All database queries MUST include partner_id filter
- **Input Validation**: Triple-layer validation (partner → Zod → database)
- **Audit Logging**: Every partner action logged with metadata
- **Commission Security**: Financial calculations with audit trails and verification

### Partner Experience Patterns (Enhanced Performance)
- **Optimistic Updates**: Immediate feedback for all partner actions
- **Progressive Enhancement**: Basic functionality first, JS enhancement second
- **Skeleton Loading**: Better than spinners for partner perception
- **Error Recovery**: Clear paths for partners to resolve issues themselves
- **Commission Transparency**: Real-time commission calculations and explanations

### Mobile-First Partner Design
- **Touch-Friendly**: 44px minimum touch targets for partner mobile usage
- **Responsive Dashboard**: Partner portal loads fast on mobile data
- **Offline Graceful**: Show cached commission data when possible
- **Network Awareness**: Adapt UI based on connection quality

## 🧱 **Component Architecture Patterns**

### Partner Dashboard Components
```tsx
// Pattern: Partner data isolation built into component props
interface PartnerDashboardProps {
  partnerId: string; // REQUIRED - never optional
  userRole: PartnerRole; // Enforces permission checks
  auditLogger: AuditLogger; // Built-in action logging
  commissionCalculator: CommissionCalculator; // Real-time calculations
}

// Pattern: Compound components for partner features
const PartnerCommissionManager = {
  Root: PartnerCommissionManagerRoot,
  CommissionList: PartnerCommissionList,
  PayoutRequest: PartnerPayoutRequest,
  PermissionGate: PartnerPermissionGate,
  Calculator: CommissionCalculator
}
```

### Partner API Patterns
```tsx
// Pattern: Partner-scoped API calls
const usePartnerData = (partnerId: string, endpoint: string) => {
  return useSWR(
    partnerId ? [`/api/partner/${partnerId}/${endpoint}`] : null,
    fetcher,
    {
      // Partner portal optimizations
      revalidateOnFocus: true, // Partners expect fresh commission data
      errorRetryCount: 3, // More resilient for partner connections
      dedupingInterval: 2000, // Reduce API calls
      refreshInterval: 30000 // Regular updates for commission changes
    }
  )
}
```

## 🔒 **Security Implementation Patterns**

### Partner Permission Gates
```tsx
// Pattern: Permission checking with graceful fallback
const PartnerPermissionGate: React.FC<{
  partnerId: string;
  requiredPermission: PartnerPermission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ partnerId, requiredPermission, fallback, children }) => {
  const { hasPermission, loading } = usePartnerPermissions(partnerId);
  
  if (loading) return <SkeletonLoader />;
  if (!hasPermission(requiredPermission)) {
    return fallback || <PartnerAccessDenied />;
  }
  
  return <>{children}</>;
};
```

### Partner Data Isolation
```tsx
// Pattern: Database queries with mandatory partner filtering
export const getPartnerReferrals = async (partnerId: string, userId: string) => {
  // MANDATORY: Always filter by partnerId AND verify user access
  return await db.partnerReferral.findMany({
    where: {
      partnerId, // NEVER optional
      OR: [
        { createdBy: userId },
        { assignedTo: userId }
      ]
    },
    include: {
      // Only include data partner should see
      commissions: { where: { status: 'approved' } },
      client: { 
        select: { 
          id: true, 
          name: true, 
          status: true 
          // Never expose sensitive client data
        } 
      }
    }
  });
};
```

## 💰 **Commission Calculation Patterns**

### Commission Calculator Component
```tsx
// Pattern: Real-time commission calculations
const useCommissionCalculator = (partnerId: string) => {
  return {
    calculateCommission: (projectValue: number, tier: PartnerTier) => {
      const baseRate = 0.20; // 20% base commission
      const overrideRate = tier === 'platinum' ? 0.10 : 0.05; // 10% or 5% override
      
      const baseCommission = projectValue * baseRate;
      const overrideCommission = projectValue * overrideRate;
      const totalCommission = baseCommission + overrideCommission;
      
      return {
        baseCommission,
        overrideCommission,
        totalCommission,
        effectiveRate: (totalCommission / projectValue) * 100
      };
    },
    
    trackCommissionEvent: (event: CommissionEvent) => {
      // Audit trail for all commission calculations
      auditLogger.log({
        partnerId,
        event: 'commission_calculated',
        details: event,
        timestamp: new Date().toISOString()
      });
    }
  };
};
```

### Commission Transparency Patterns
```tsx
// Pattern: Partner-friendly commission explanations
const CommissionBreakdown: React.FC<{
  projectValue: number;
  partnerId: string;
}> = ({ projectValue, partnerId }) => {
  const { partner } = usePartner(partnerId);
  const { calculateCommission } = useCommissionCalculator(partnerId);
  
  const breakdown = calculateCommission(projectValue, partner.tier);
  
  return (
    <div className="commission-breakdown">
      <div className="base-commission">
        <span>Base Commission (20%)</span>
        <span>${breakdown.baseCommission.toLocaleString()}</span>
      </div>
      <div className="override-commission">
        <span>Tier Bonus ({partner.tier} - {breakdown.overrideRate * 100}%)</span>
        <span>${breakdown.overrideCommission.toLocaleString()}</span>
      </div>
      <div className="total-commission">
        <span>Total Commission</span>
        <span>${breakdown.totalCommission.toLocaleString()}</span>
      </div>
    </div>
  );
};
```

## 🎨 **Partner UI Patterns**

### Partner Feedback Patterns
```tsx
// Pattern: Partner-friendly error messages
const usePartnerErrorHandler = () => {
  return {
    handleError: (error: Error) => {
      // Never show technical errors to partners
      const partnerMessage = error.message.includes('403') 
        ? "You don't have permission for this action. Please contact your partner manager."
        : "Something went wrong. Our team has been notified and will fix this shortly.";
      
      toast.error(partnerMessage);
      
      // Log technical details for internal use
      errorLogger.log({
        userFacingMessage: partnerMessage,
        technicalError: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        context: 'partner_portal'
      });
    }
  };
};
```

### Partner Navigation Patterns
```tsx
// Pattern: Context-aware partner navigation
const PartnerNavigation = () => {
  const { partner, user } = usePartnerAuth();
  
  return (
    <nav className="partner-nav">
      <PartnerBreadcrumbs partner={partner} />
      <PartnerNotificationBell partnerId={partner.id} />
      <CommissionSummary partnerId={partner.id} />
      <PartnerProfileMenu user={user} partner={partner} />
    </nav>
  );
};
```

## 📱 **Responsive Partner Patterns**

### Mobile-First Partner Layout
```tsx
// Pattern: Partner portal mobile optimization
const PartnerDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile: Full-width header */}
      <PartnerHeader className="lg:hidden" />
      
      <div className="lg:flex">
        {/* Desktop: Sidebar */}
        <PartnerSidebar className="hidden lg:block lg:w-64" />
        
        {/* Main content: Mobile-first */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile: Bottom navigation */}
      <PartnerBottomNav className="lg:hidden" />
    </div>
  );
};
```

## 🧪 **Partner Testing Patterns**

### Partner Journey Testing
```tsx
// Pattern: Full partner workflow testing
describe('Partner Onboarding Journey', () => {
  it('should complete full partner registration flow', async () => {
    // Test as actual partner would experience
    await page.goto('/partner/register');
    
    // Fill registration form
    await page.fill('[data-testid="company-name"]', 'Test Agency');
    await page.fill('[data-testid="partner-email"]', 'admin@testagency.com');
    
    // Test email verification flow
    await page.click('[data-testid="submit-registration"]');
    await expect(page.locator('[data-testid="verification-sent"]')).toBeVisible();
    
    // Simulate email verification
    const verificationLink = await getEmailVerificationLink('admin@testagency.com');
    await page.goto(verificationLink);
    
    // Test dashboard access
    await expect(page.locator('[data-testid="partner-dashboard"]')).toBeVisible();
    
    // Test partner data isolation
    await expect(page.locator('[data-testid="other-partner-data"]')).not.toBeVisible();
  });
});
```

### Commission Calculation Testing
```tsx
// Pattern: Commission accuracy testing
describe('Partner Commission Calculations', () => {
  it('should calculate accurate commissions for different tiers', async () => {
    const projectValue = 10000;
    
    // Test Bronze tier (20% + 5% = 25%)
    const bronzeCommission = calculateCommission(projectValue, 'bronze');
    expect(bronzeCommission.totalCommission).toBe(2500);
    
    // Test Platinum tier (20% + 10% = 30%)
    const platinumCommission = calculateCommission(projectValue, 'platinum');
    expect(platinumCommission.totalCommission).toBe(3000);
    
    // Test commission breakdown transparency
    expect(bronzeCommission.baseCommission).toBe(2000);
    expect(bronzeCommission.overrideCommission).toBe(500);
  });
});
```

## 📊 **Partner Performance Patterns**

### Partner Portal Optimization
```tsx
// Pattern: Partner-specific performance monitoring
const usePartnerPerformanceMonitoring = (partnerId: string) => {
  useEffect(() => {
    // Track Core Web Vitals for partner portal
    getCLS((metric) => {
      analytics.track('Partner Portal CLS', {
        value: metric.value,
        partnerId,
        page: window.location.pathname
      });
    });
    
    getLCP((metric) => {
      analytics.track('Partner Portal LCP', {
        value: metric.value,
        partnerId,
        page: window.location.pathname
      });
    });
  }, [partnerId]);
};
```

## 🔄 **Partner Workflow Patterns**

### Partner Communication Flows
```tsx
// Pattern: Partner notification system
const usePartnerNotifications = (partnerId: string) => {
  const [notifications, setNotifications] = useState<PartnerNotification[]>([]);
  
  useEffect(() => {
    // Real-time notifications for partners
    const ws = new WebSocket(`${WS_URL}/partner/${partnerId}/notifications`);
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      
      // Partner-friendly notification formatting
      setNotifications(prev => [
        {
          ...notification,
          message: formatPartnerMessage(notification.message),
          timestamp: new Date(notification.timestamp),
          read: false
        },
        ...prev
      ]);
      
      // Show toast for important notifications (commission updates)
      if (notification.type === 'commission_update' || notification.priority === 'high') {
        toast.info(notification.message, {
          duration: 8000, // Longer for partners to read
          action: {
            label: 'View Details',
            onClick: () => navigate(`/partner/notifications/${notification.id}`)
          }
        });
      }
    };
    
    return () => ws.close();
  }, [partnerId]);
  
  return { notifications, markAsRead, markAllAsRead };
};
```

### Partner Tier Management
```tsx
// Pattern: Partner tier progression tracking
const usePartnerTierManagement = (partnerId: string) => {
  const { partner } = usePartner(partnerId);
  
  const getTierRequirements = (targetTier: PartnerTier) => {
    const requirements = {
      bronze: { minReferrals: 0, minRevenue: 0 },
      silver: { minReferrals: 5, minRevenue: 25000 },
      gold: { minReferrals: 15, minRevenue: 75000 },
      platinum: { minReferrals: 30, minRevenue: 150000 }
    };
    
    return requirements[targetTier];
  };
  
  const getProgressToNextTier = () => {
    const currentStats = partner.stats;
    const nextTier = getNextTier(partner.tier);
    const requirements = getTierRequirements(nextTier);
    
    return {
      referralsProgress: (currentStats.totalReferrals / requirements.minReferrals) * 100,
      revenueProgress: (currentStats.totalRevenue / requirements.minRevenue) * 100,
      nextTier,
      requirements
    };
  };
  
  return {
    currentTier: partner.tier,
    progress: getProgressToNextTier(),
    requirements: getTierRequirements
  };
};
```

---

*Enhanced with SISO-INTERNAL Learnings | Partnership Portal Optimized | BMAD-METHOD™ Integrated*