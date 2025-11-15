# Client Portal Development Patterns

## 🎯 **Client-Focused Development Principles**

### Enhanced Security Patterns (From SISO-INTERNAL Learnings)
- **Tenant Isolation**: All database queries MUST include client_id filter
- **Input Validation**: Triple-layer validation (client → Zod → database)
- **Audit Logging**: Every client action logged with metadata
- **File Security**: Virus scanning + type validation + size limits

### Client Experience Patterns (Enhanced Performance)
- **Optimistic Updates**: Immediate feedback for all client actions
- **Progressive Enhancement**: Basic functionality first, JS enhancement second
- **Skeleton Loading**: Better than spinners for client perception
- **Error Recovery**: Clear paths for clients to resolve issues themselves

### Mobile-First Client Design
- **Touch-Friendly**: 44px minimum touch targets
- **Responsive Images**: Client portal loads fast on mobile data
- **Offline Graceful**: Show cached data when possible
- **Network Awareness**: Adapt UI based on connection quality

## 🧱 **Component Architecture Patterns**

### Client Dashboard Components
```tsx
// Pattern: Client data isolation built into component props
interface ClientDashboardProps {
  clientId: string; // REQUIRED - never optional
  userRole: ClientRole; // Enforces permission checks
  auditLogger: AuditLogger; // Built-in action logging
}

// Pattern: Compound components for client features
const ClientFileManager = {
  Root: ClientFileManagerRoot,
  FileList: ClientFileList,
  UploadZone: ClientUploadZone,
  PermissionGate: ClientPermissionGate
}
```

### Client API Patterns
```tsx
// Pattern: Client-scoped API calls
const useClientData = (clientId: string, endpoint: string) => {
  return useSWR(
    clientId ? [`/api/client/${clientId}/${endpoint}`] : null,
    fetcher,
    {
      // Client portal optimizations
      revalidateOnFocus: true, // Clients expect fresh data
      errorRetryCount: 3, // More resilient for client connections
      dedupingInterval: 2000 // Reduce API calls
    }
  )
}
```

## 🔒 **Security Implementation Patterns**

### Client Permission Gates
```tsx
// Pattern: Permission checking with graceful fallback
const ClientPermissionGate: React.FC<{
  clientId: string;
  requiredPermission: ClientPermission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ clientId, requiredPermission, fallback, children }) => {
  const { hasPermission, loading } = useClientPermissions(clientId);
  
  if (loading) return <SkeletonLoader />;
  if (!hasPermission(requiredPermission)) {
    return fallback || <ClientAccessDenied />;
  }
  
  return <>{children}</>;
};
```

### Client Data Isolation
```tsx
// Pattern: Database queries with mandatory client filtering
export const getClientProjects = async (clientId: string, userId: string) => {
  // MANDATORY: Always filter by clientId AND verify user access
  return await db.clientProject.findMany({
    where: {
      clientId, // NEVER optional
      OR: [
        { ownerId: userId },
        { collaborators: { some: { userId } } }
      ]
    },
    include: {
      // Only include data client should see
      files: { where: { status: 'approved' } }
    }
  });
};
```

## 🎨 **Client UI Patterns**

### Client Feedback Patterns
```tsx
// Pattern: Client-friendly error messages
const useClientErrorHandler = () => {
  return {
    handleError: (error: Error) => {
      // Never show technical errors to clients
      const clientMessage = error.message.includes('403') 
        ? "You don't have permission for this action. Please contact your admin."
        : "Something went wrong. Our team has been notified and will fix this shortly.";
      
      toast.error(clientMessage);
      
      // Log technical details for internal use
      errorLogger.log({
        userFacingMessage: clientMessage,
        technicalError: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }
  };
};
```

### Client Navigation Patterns
```tsx
// Pattern: Context-aware client navigation
const ClientNavigation = () => {
  const { client, user } = useClientAuth();
  
  return (
    <nav className="client-nav">
      <ClientBreadcrumbs client={client} />
      <ClientNotificationBell clientId={client.id} />
      <ClientProfileMenu user={user} client={client} />
    </nav>
  );
};
```

## 📱 **Responsive Client Patterns**

### Mobile-First Client Layout
```tsx
// Pattern: Client portal mobile optimization
const ClientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile: Full-width header */}
      <ClientHeader className="lg:hidden" />
      
      <div className="lg:flex">
        {/* Desktop: Sidebar */}
        <ClientSidebar className="hidden lg:block lg:w-64" />
        
        {/* Main content: Mobile-first */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile: Bottom navigation */}
      <ClientBottomNav className="lg:hidden" />
    </div>
  );
};
```

## 🧪 **Client Testing Patterns**

### Client Journey Testing
```tsx
// Pattern: Full client workflow testing
describe('Client Onboarding Journey', () => {
  it('should complete full client registration flow', async () => {
    // Test as actual client would experience
    await page.goto('/client/register');
    
    // Fill registration form
    await page.fill('[data-testid="company-name"]', 'Test Company');
    await page.fill('[data-testid="admin-email"]', 'admin@testcompany.com');
    
    // Test email verification flow
    await page.click('[data-testid="submit-registration"]');
    await expect(page.locator('[data-testid="verification-sent"]')).toBeVisible();
    
    // Simulate email verification
    const verificationLink = await getEmailVerificationLink('admin@testcompany.com');
    await page.goto(verificationLink);
    
    // Test dashboard access
    await expect(page.locator('[data-testid="client-dashboard"]')).toBeVisible();
    
    // Test client data isolation
    await expect(page.locator('[data-testid="other-client-data"]')).not.toBeVisible();
  });
});
```

### Client Accessibility Testing
```tsx
// Pattern: WCAG compliance testing
describe('Client Portal Accessibility', () => {
  it('should meet WCAG 2.1 AA standards', async () => {
    await page.goto('/client/dashboard');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('data-testid', 'main-nav-home');
    
    // Test screen reader support
    const ariaLabel = await page.locator('[data-testid="client-stats"]').getAttribute('aria-label');
    expect(ariaLabel).toContain('Client statistics dashboard');
    
    // Test color contrast (using axe-core)
    const violations = await page.evaluate(() => {
      return new Promise((resolve) => {
        axe.run(document, (err, results) => {
          resolve(results.violations.filter(v => v.tags.includes('wcag2aa')));
        });
      });
    });
    expect(violations).toHaveLength(0);
  });
});
```

## 📊 **Client Performance Patterns**

### Client Portal Optimization
```tsx
// Pattern: Client-specific performance monitoring
const useClientPerformanceMonitoring = (clientId: string) => {
  useEffect(() => {
    // Track Core Web Vitals for client portal
    getCLS((metric) => {
      analytics.track('Client Portal CLS', {
        value: metric.value,
        clientId,
        page: window.location.pathname
      });
    });
    
    getLCP((metric) => {
      analytics.track('Client Portal LCP', {
        value: metric.value,
        clientId,
        page: window.location.pathname
      });
    });
  }, [clientId]);
};
```

## 🔄 **Client Workflow Patterns**

### Client Communication Flows
```tsx
// Pattern: Client notification system
const useClientNotifications = (clientId: string) => {
  const [notifications, setNotifications] = useState<ClientNotification[]>([]);
  
  useEffect(() => {
    // Real-time notifications for clients
    const ws = new WebSocket(`${WS_URL}/client/${clientId}/notifications`);
    
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      
      // Client-friendly notification formatting
      setNotifications(prev => [
        {
          ...notification,
          message: formatClientMessage(notification.message),
          timestamp: new Date(notification.timestamp),
          read: false
        },
        ...prev
      ]);
      
      // Show toast for important notifications
      if (notification.priority === 'high') {
        toast.info(notification.message, {
          duration: 8000, // Longer for clients to read
          action: {
            label: 'View Details',
            onClick: () => navigate(`/client/notifications/${notification.id}`)
          }
        });
      }
    };
    
    return () => ws.close();
  }, [clientId]);
  
  return { notifications, markAsRead, markAllAsRead };
};
```

---

*Enhanced with SISO-INTERNAL Learnings | Client Portal Optimized | BMAD-METHOD™ Integrated*