# Partners Architecture Diagrams

## Feature Slice Layout

```mermaid
graph TB
    subgraph app/partners/src
        Providers[(app/providers/*)] --> Router[app/router]
        Router --> Features[/features/*/]
        Features --> Entities[/entities/*/]
        Entities --> Shared[@shared/*]
        Shared --> Supabase[(Supabase)]
        Shared --> Platform[@shared/lib/pwa]
    end
```

## Data + Offline Flow (Leads example)

```mermaid
sequenceDiagram
    participant UI as features/leads/ui
    participant API as features/leads/api/useLeads
    participant Queue as shared/lib/pwa/offlineQueue
    participant Supa as Supabase

    UI->>API: mutateLead(stage)
    API->>Queue: addAction({ type: UPDATE_LEAD })
    alt online
        Queue->>Supa: update partner_referrals
    else offline
        Queue-->>UI: enqueue + optimistic update
        Note over Queue: auto-process on navigator.online
    end
```

## Realtime & Presence

```mermaid
graph LR
    subgraph RealtimeProvider
        subgraph Hooks
            useRealtime --> subscribe
            useRealtime --> unsubscribe
        end
    end

    subscribe --> SupabaseChannel[(supabase.channel('chat:room'))]
    SupabaseChannel --> FeaturesChat[features/chat]
    SupabaseChannel --> EntitiesMessage
```

_Update or append diagrams whenever new flows (commissions, training, notifications) are implemented._
