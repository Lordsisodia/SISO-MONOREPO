# SISO Monorepo - Simplified Architecture Diagrams

## 1. Overall Monorepo Structure

```mermaid
graph TB
    subgraph SISO["🏢 SISO-MONOREPO"]
        subgraph APPS["📱 apps/"]
            CLIENT["client-base"]
            PARTNERS["partnerships"]
        end

        subgraph PACKAGES["📦 packages/"]
            DB["shared-database"]
            UI["shared-ui"]
            CONFIG["shared-config"]
        end
    end

    CLIENT --> DB
    CLIENT --> UI
    CLIENT --> CONFIG

    PARTNERS --> DB
    PARTNERS --> UI
    PARTNERS --> CONFIG

    style APPS fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style PACKAGES fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

## 2. Client-Base Domain Architecture

```mermaid
graph LR
    subgraph CLIENT_BASE["🎯 client-base/src/domains/"]
        subgraph CUSTOMER["customer-facing/"]
            LANDING["landing/"]
            MENU["menu/"]
            BOOKING["booking/"]
            BLOG["blog/"]
            REVIEWS["reviews/"]
            LOYALTY["loyalty/"]
        end

        subgraph CLIENT_FACING["client-facing/"]
            DASH["dashboard/"]
            ANALYTICS["analytics/"]
            INVENTORY["inventory/"]
            MARKETING["marketing/"]
            FINANCE["finance/"]
            STAFF["staff/"]
            SETTINGS["settings/"]
        end

        subgraph SHARED["shared/"]
            COMP["components/"]
            HOOKS["hooks/"]
            SERVER["server/"]
            TYPES["types/"]
            UTILS["utils/"]
        end
    end

    CUSTOMER --> SHARED
    CLIENT_FACING --> SHARED

    style CUSTOMER fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style CLIENT_FACING fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style SHARED fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px
```

## 3. Partnerships Domain Architecture

```mermaid
graph LR
    subgraph PARTNERSHIPS["🤝 partnerships/src/domains/"]
        subgraph PARTNER["partner-facing/"]
            PROJECTS["projects/"]
            BILLING["billing/"]
            ANALYTICS_P["analytics/"]
            SUPPORT["support/"]
        end

        subgraph INTERNAL["internal-admin/"]
            PARTNER_MGMT["partner-management/"]
            PLATFORM["platform-analytics/"]
            SYSTEM["system-settings/"]
            USER_MGMT["user-management/"]
        end

        subgraph SHARED_P["shared/"]
            COMP_P["components/"]
            HOOKS_P["hooks/"]
            SERVER_P["server/"]
            TYPES_P["types/"]
        end
    end

    PARTNER --> SHARED_P
    INTERNAL --> SHARED_P

    style PARTNER fill:#b2dfdb,stroke:#00796b,stroke-width:2px
    style INTERNAL fill:#ffe0b2,stroke:#ef6c00,stroke-width:2px
    style SHARED_P fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
```

## 4. Domain Internal Structure (Self-Contained)

```mermaid
graph TB
    subgraph DOMAIN["📂 menu/ (Example Domain)"]
        subgraph FILES["All domain files in one place"]
            COMPONENTS["components/
            - MenuItemCard.tsx
            - MenuCategoryFilter.tsx
            - MenuSearch.tsx"]

            SECTIONS["sections/
            - MenuHeader.tsx
            - MenuGrid.tsx
            - MenuFilters.tsx"]

            HOOKS["hooks/
            - useMenuItems.ts
            - useMenuCategories.ts
            - useMenuFilters.ts"]

            SERVER["server/
            - actions.ts
            - repository.ts
            - utils.ts"]

            TYPES["types/
            - menu.types.ts
            - index.ts"]

            UTILS["utils/
            - formatPrice.ts
            - filterMenu.ts
            - searchMenu.ts"]

            PAGES["pages/
            - MenuPage.tsx
            - AdminMenuPage.tsx"]

            INDEX["index.ts
            (Public API)"]
        end
    end

    PAGES --> SECTIONS
    PAGES --> HOOKS
    SECTIONS --> COMPONENTS
    HOOKS --> SERVER
    SERVER --> TYPES
    UTILS --> TYPES
    INDEX --> PAGES
    INDEX --> HOOKS
    INDEX --> TYPES

    style DOMAIN fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style FILES fill:#ffffff,stroke:#666,stroke-width:1px
```

## 5. Shared Packages Structure

```mermaid
graph TB
    subgraph SHARED_PKG["📦 Shared Packages (Minimal)"]
        subgraph DB_PKG["shared-database/"]
            DB_CLIENT["client/
            - supabase-client.ts
            - supabase-partners.ts"]

            DB_TYPES["types/
            - client-database.types.ts
            - partners-database.types.ts"]

            DB_UTILS["utils/
            - query-helpers.ts
            - error-handling.ts"]
        end

        subgraph UI_PKG["shared-ui/"]
            UI_PRIM["primitives/
            - Button.tsx
            - Input.tsx
            - Card.tsx
            - Modal.tsx"]

            UI_HOOKS["hooks/
            - useMediaQuery.ts
            - useDebounce.ts
            - useLocalStorage.ts"]

            UI_UTILS["utils/
            - cn.ts
            - format.ts"]
        end

        subgraph CONFIG_PKG["shared-config/"]
            CONF_ESL["eslint/"]
            CONF_TS["typescript/"]
            CONF_TW["tailwind/"]
        end
    end

    style DB_PKG fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style UI_PKG fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style CONFIG_PKG fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

## 6. Data Flow (Menu Domain Example)

```mermaid
sequenceDiagram
    participant Route as app/menu/page.tsx
    participant Page as domains/menu/pages/MenuPage.tsx
    participant Hook as domains/menu/hooks/useMenuItems.ts
    participant Server as domains/menu/server/repository.ts
    participant DB as @siso/shared-database

    Route->>Page: Render MenuPage
    Page->>Hook: Call useMenuItems()
    Hook->>Server: getMenuItems()
    Server->>DB: createClient()
    DB-->>Server: supabase client
    Server->>DB: query menu_items table
    DB-->>Server: menu items data
    Server-->>Hook: MenuItem[]
    Hook-->>Page: { items, isLoading }
    Page->>Page: Render MenuGrid with items
    Page-->>Route: Rendered page
```

## 7. Cross-Domain Communication

```mermaid
graph LR
    subgraph APP["client-base"]
        MENU_DOM["menu/
        (Domain)"]

        BOOKING_DOM["booking/
        (Domain)"]

        SHARED_DOM["shared/
        (Shared utilities)"]
    end

    subgraph SHARED_PKG["Shared Packages"]
        UI["@siso/shared-ui"]
        DB["@siso/shared-database"]
    end

    MENU_DOM -->|"uses primitives"| UI
    MENU_DOM -->|"uses DB client"| DB
    MENU_DOM -->|"uses shared hooks"| SHARED_DOM

    BOOKING_DOM -->|"uses primitives"| UI
    BOOKING_DOM -->|"uses DB client"| DB
    BOOKING_DOM -->|"uses shared hooks"| SHARED_DOM

    MENU_DOM -.->|"minimal coupling"| BOOKING_DOM

    style MENU_DOM fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style BOOKING_DOM fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style SHARED_DOM fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px
    style SHARED_PKG fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

## 8. Migration Path

```mermaid
graph TB
    subgraph BEFORE["Current State"]
        OLD_CLIENT["SISO-CLIENT-BASE/
        - Flat structure
        - Mixed concerns
        - Scattered code"]

        OLD_PARTNERS["SISO-PARTNERSHIPS/
        - Flat structure
        - Duplicate code"]
    end

    subgraph PHASE1["Phase 1: Foundation"]
        SETUP["Create monorepo
        + pnpm workspaces
        + Turbo setup"]
    end

    subgraph PHASE2["Phase 2: Reorganize"]
        DOMAINS["Reorganize into domains
        + customer-facing/
        + client-facing/
        + shared/"]
    end

    subgraph PHASE3["Phase 3: Extract Shared"]
        EXTRACT["Extract shared packages
        + shared-database
        + shared-ui
        + shared-config"]
    end

    subgraph AFTER["Final State"]
        NEW_MONO["SISO-MONOREPO/
        ✅ Domain-organized
        ✅ Self-contained domains
        ✅ Minimal sharing
        ✅ Clear structure"]
    end

    BEFORE --> PHASE1
    PHASE1 --> PHASE2
    PHASE2 --> PHASE3
    PHASE3 --> AFTER

    style BEFORE fill:#ffebee,stroke:#c62828,stroke-width:2px
    style PHASE1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style PHASE2 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style PHASE3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style AFTER fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

## 9. Decision Flow: Where Does Code Go?

```mermaid
graph TD
    START["New code to write"]

    Q1{"Used by both
    apps?"}
    Q2{"Generic or
    business-specific?"}
    Q3{"Part of existing
    domain?"}
    Q4{"Needs own
    business logic?"}

    PKG["📦 Shared Package"]
    DOMAIN_SHARED["Domain shared/"]
    EXISTING_DOM["Existing domain/"]
    NEW_DOM["New domain/"]

    START --> Q1

    Q1 -->|Yes| Q2
    Q1 -->|No| Q3

    Q2 -->|Generic| PKG
    Q2 -->|Business| DOMAIN_SHARED

    Q3 -->|Yes| EXISTING_DOM
    Q3 -->|No| Q4

    Q4 -->|Yes| NEW_DOM
    Q4 -->|No| DOMAIN_SHARED

    style START fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style PKG fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style DOMAIN_SHARED fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style EXISTING_DOM fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
    style NEW_DOM fill:#ce93d8,stroke:#7b1fa2,stroke-width:2px
```

## 10. Build & Deploy Flow

```mermaid
graph LR
    subgraph MONOREPO["SISO-MONOREPO"]
        CLIENT_APP["apps/client-base"]
        PARTNERS_APP["apps/partnerships"]
        PACKAGES["packages/*"]
    end

    subgraph BUILD["Turbo Build"]
        BUILD_PKG["Build packages"]
        BUILD_CLIENT["Build client-base"]
        BUILD_PARTNERS["Build partnerships"]
    end

    subgraph DEPLOY["Deployment"]
        VERCEL_CLIENT["Vercel: client-base"]
        VERCEL_PARTNERS["Vercel: partnerships"]
    end

    PACKAGES --> BUILD_PKG
    BUILD_PKG --> BUILD_CLIENT
    BUILD_PKG --> BUILD_PARTNERS

    CLIENT_APP --> BUILD_CLIENT
    PARTNERS_APP --> BUILD_PARTNERS

    BUILD_CLIENT --> VERCEL_CLIENT
    BUILD_PARTNERS --> VERCEL_PARTNERS

    style MONOREPO fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style BUILD fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style DEPLOY fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
```

---

## Key Principles Visualized

### 1. Self-Contained Domains
Each domain has everything it needs inside its folder.

### 2. Minimal Shared Packages
Only truly generic code goes into shared packages.

### 3. Clear Boundaries
Domains communicate through well-defined public APIs.

### 4. Independent Apps
Both apps share minimal code, deploy independently.

### 5. Domain-First Organization
Think "where does this feature belong" not "is this a component or a hook".

---

*These diagrams show the simplified SISO architecture focused on domain-based organization without complex templating.*
