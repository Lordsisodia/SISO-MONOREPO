# SISO Monorepo Architecture Diagrams

## 1. Overall Monorepo Structure

```mermaid
graph TB
    subgraph SISO_MONOREPO["🏢 SISO-MONOREPO"]
        subgraph APPS["📱 apps/"]
            subgraph CLIENTS["clients/"]
                REST1["restaurant-lumelle"]
                REST2["restaurant-client2"]
                TOUR1["tour-guides-client1"]
                BIKE1["bike-rental-client1"]
            end

            subgraph INTERNAL["internal/"]
                PARTNERS["partnerships"]
                ECOSYSTEM["ecosystem"]
                ADMIN["admin-portal"]
                ANALYTICS["analytics"]
            end

            subgraph TEMPLATES["templates/"]
                TEMP_REST["restaurant-template"]
                TEMP_TOUR["tour-template"]
                TEMP_SAAS["saas-template"]
            end
        end

        subgraph PACKAGES["📦 packages/"]
            UI["ui/*"]
            DOMAIN["domain-models/*"]
            SERVICES["services/*"]
            TEMPLATE_ENGINE["templates/*"]
            CONFIG["config/*"]
        end

        subgraph DOCS["📚 docs/"]
            ARCH["architecture/"]
            CLIENT_DOCS["client/"]
            INTERNAL_DOCS["internal/"]
            SHARED_DOCS["shared/"]
        end
    end

    REST1 --> UI
    REST1 --> DOMAIN
    REST1 --> SERVICES
    REST2 --> UI
    REST2 --> SERVICES
    TOUR1 --> UI
    TOUR1 --> SERVICES

    PARTNERS --> SERVICES
    ECOSYSTEM --> SERVICES
    ADMIN --> UI
    ADMIN --> SERVICES

    TEMP_REST --> TEMPLATE_ENGINE
    TEMP_TOUR --> TEMPLATE_ENGINE

    style SISO_MONOREPO fill:#f9f9f9,stroke:#333,stroke-width:3px
    style PACKAGES fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style APPS fill:#fff3e0,stroke:#f57c00,stroke-width:2px
```

## 2. Domain-Based Architecture (Per App)

```mermaid
graph LR
    subgraph APP["🎯 Application (e.g., restaurant-lumelle)"]
        subgraph SRC["src/"]
            subgraph DOMAINS["domains/"]
                subgraph CUSTOMER["customer-facing/"]
                    LANDING["landing"]
                    MENU["menu"]
                    BOOKING["booking"]
                    REVIEWS["reviews"]
                    BLOG["blog"]
                    LOYALTY["loyalty"]
                end

                subgraph CLIENT["client-facing/"]
                    DASH["dashboard"]
                    ANAL["analytics"]
                    INV["inventory"]
                    MARKET["marketing"]
                    FINANCE["finance"]
                    STAFF["staff"]
                end

                subgraph SHARED_DOM["shared/"]
                    COMP["components/"]
                    HOOKS["hooks/"]
                    SERVER["server/"]
                    TYPES["types/"]
                end
            end

            APP_DIR["app/"]
            CONFIG["config/"]
            LIB["lib/"]
        end
    end

    APP_DIR --> CUSTOMER
    APP_DIR --> CLIENT
    APP_DIR --> SHARED_DOM

    CUSTOMER --> SHARED_DOM
    CLIENT --> SHARED_DOM

    style CUSTOMER fill:#c8e6c9,stroke:#388e3c,stroke-width:2px
    style CLIENT fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style SHARED_DOM fill:#e1bee7,stroke:#7b1fa2,stroke-width:2px
```

## 3. Domain Internal Structure

```mermaid
graph TB
    subgraph DOMAIN["📂 Domain (e.g., menu/)"]
        subgraph SECTIONS["sections/"]
            subgraph SEC1["menu-header/"]
                subgraph TEMPS["templates/"]
                    PRIM["primary/"]
                    T2["template-2/"]
                    T3["template-3/"]
                end

                subgraph SEC_SHARED["shared/"]
                    SEC_COMP["components/"]
                    SEC_HOOKS["hooks/"]
                    SEC_UTILS["utils/"]
                end

                TYPES_DIR["types/"]
                REGISTRY["registry.ts"]
                INDEX["index.tsx"]
            end
        end

        subgraph DOMAIN_SHARED["shared/"]
            D_TYPES["types/"]
            D_HOOKS["hooks/"]
            D_UTILS["utils/"]
            D_SERVER["server/"]
        end

        subgraph PAGES["pages/"]
            PUBLIC_PAGE["MenuPage.tsx"]
            ADMIN_PAGE["AdminMenuPage.tsx"]
        end

        PUBLIC_API["index.ts"]
    end

    INDEX --> PRIM
    INDEX --> T2
    INDEX --> T3
    INDEX --> SEC_SHARED
    INDEX --> TYPES_DIR
    INDEX --> REGISTRY

    PUBLIC_PAGE --> SECTIONS
    ADMIN_PAGE --> SECTIONS

    SECTIONS --> DOMAIN_SHARED
    PAGES --> DOMAIN_SHARED

    PUBLIC_API --> SECTIONS
    PUBLIC_API --> PAGES
    PUBLIC_API --> DOMAIN_SHARED

    style SECTIONS fill:#bbdefb,stroke:#1976d2,stroke-width:2px
    style DOMAIN_SHARED fill:#f8bbd0,stroke:#c2185b,stroke-width:2px
    style PAGES fill:#c5e1a5,stroke:#689f38,stroke-width:2px
```

## 4. Shared Packages Architecture

```mermaid
graph TB
    subgraph SHARED_PACKAGES["📦 Shared Packages"]
        subgraph UI_PKG["@siso/ui-*"]
            UI_CUSTOMER["ui-customer-facing"]
            UI_CLIENT["ui-client-facing"]
            UI_SHARED["ui-shared"]
        end

        subgraph DOMAIN_PKG["@siso/domain-*"]
            DOM_REST["domain-restaurant"]
            DOM_TOUR["domain-tour"]
            DOM_BOOK["domain-booking"]
            DOM_ANAL["domain-analytics"]
        end

        subgraph SERVICE_PKG["@siso/service-*"]
            SVC_SUPA_CLIENT["supabase-client"]
            SVC_SUPA_PARTNER["supabase-partners"]
            SVC_AI["ai-workflows"]
            SVC_AUTH["auth"]
            SVC_PAY["payments"]
        end

        subgraph TEMPLATE_PKG["@siso/templates"]
            TEMP_RENDERER["section-renderer"]
            TEMP_REGISTRY["variant-registry"]
            TEMP_BUILDER["template-builder"]
        end

        subgraph CONFIG_PKG["@siso/config-*"]
            CONF_ESL["eslint-config"]
            CONF_TS["typescript-config"]
            CONF_TW["tailwind-config"]
        end
    end

    UI_CUSTOMER --> UI_SHARED
    UI_CLIENT --> UI_SHARED

    DOM_REST --> SVC_SUPA_CLIENT
    DOM_TOUR --> SVC_SUPA_CLIENT
    DOM_BOOK --> SVC_SUPA_CLIENT

    TEMP_RENDERER --> TEMP_REGISTRY
    TEMP_BUILDER --> TEMP_REGISTRY

    style UI_PKG fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style DOMAIN_PKG fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style SERVICE_PKG fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style TEMPLATE_PKG fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style CONFIG_PKG fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

## 5. Template System Flow

```mermaid
sequenceDiagram
    participant App as Application
    participant Registry as Variant Registry
    participant Renderer as Section Renderer
    participant Template as Template Component
    participant Content as Content/Data

    App->>Registry: Get variant for "menu-header", "primary"
    Registry-->>App: Return MenuHeaderPrimary component

    App->>Content: Fetch menu header content
    Content-->>App: Return content data

    App->>Renderer: Render section
    Note over Renderer: sectionType="menu-header"<br/>variant="primary"<br/>content={data}

    Renderer->>Registry: Lookup component
    Registry-->>Renderer: MenuHeaderPrimary

    Renderer->>Template: Render with content
    Template-->>Renderer: React component tree

    Renderer-->>App: Rendered section
```

## 6. Data Flow Architecture

```mermaid
graph LR
    subgraph CLIENT_APP["Client App"]
        PAGE["Page Component"]
        DOMAIN_HOOK["Domain Hook"]
        SECTION["Section Renderer"]
    end

    subgraph SHARED["Shared Packages"]
        SERVICE["@siso/service-*"]
        DOMAIN_MODEL["@siso/domain-*"]
        TEMPLATE["@siso/templates"]
    end

    subgraph DATABASE["Database Layer"]
        SUPA_CLIENT["Supabase Client"]
        SUPA_PARTNERS["Supabase Partners"]
    end

    PAGE --> DOMAIN_HOOK
    PAGE --> SECTION

    DOMAIN_HOOK --> SERVICE
    SERVICE --> DOMAIN_MODEL
    SERVICE --> SUPA_CLIENT
    SERVICE --> SUPA_PARTNERS

    SECTION --> TEMPLATE
    TEMPLATE --> DOMAIN_HOOK

    SUPA_CLIENT --> DOMAIN_MODEL
    SUPA_PARTNERS --> DOMAIN_MODEL

    style CLIENT_APP fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style SHARED fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style DATABASE fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

## 7. Deployment Architecture

```mermaid
graph TB
    subgraph MONOREPO["SISO-MONOREPO"]
        APP1["restaurant-lumelle"]
        APP2["tour-guides-1"]
        INTERNAL1["partnerships"]
        INTERNAL2["admin-portal"]
    end

    subgraph VERCEL["Vercel Platform"]
        subgraph PROJ1["Project: lumelle"]
            EDGE1["Edge Functions"]
            STATIC1["Static Assets"]
        end

        subgraph PROJ2["Project: tour-guides"]
            EDGE2["Edge Functions"]
            STATIC2["Static Assets"]
        end

        subgraph PROJ3["Project: partnerships"]
            EDGE3["Edge Functions"]
            STATIC3["Static Assets"]
        end
    end

    subgraph DATABASE["Supabase"]
        DB_CLIENT["Client Database"]
        DB_PARTNERS["Partners Database"]
    end

    APP1 --> PROJ1
    APP2 --> PROJ2
    INTERNAL1 --> PROJ3

    PROJ1 --> DB_CLIENT
    PROJ2 --> DB_CLIENT
    PROJ3 --> DB_PARTNERS

    style MONOREPO fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style VERCEL fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style DATABASE fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

## 8. Migration Path

```mermaid
graph LR
    subgraph CURRENT["Current State"]
        SISO_CLIENT["SISO-CLIENT-BASE"]
        SISO_PARTNERS["SISO-PARTNERSHIPS"]
        TEMPLATES_DIR["templates/"]
    end

    subgraph PHASE1["Phase 1: Foundation"]
        MONO_SETUP["Monorepo Setup"]
        PKG_EXTRACT["Extract Shared Packages"]
        TEMP_ENGINE["Build Template Engine"]
    end

    subgraph PHASE2["Phase 2: Client Migration"]
        MIGRATE_CLIENTS["Migrate Client Apps"]
        REFACTOR_DOMAINS["Refactor to Domains"]
        UPDATE_DEPLOYS["Update Deployments"]
    end

    subgraph PHASE3["Phase 3: Internal Migration"]
        MIGRATE_INTERNAL["Migrate Internal Apps"]
        CONSOLIDATE["Consolidate Services"]
        ADMIN_BUILD["Build Admin Portal"]
    end

    subgraph FINAL["Final State"]
        UNIFIED_MONO["Unified Monorepo"]
        SCALED["Scalable Architecture"]
        OPTIMIZED["Optimized Workflows"]
    end

    CURRENT --> PHASE1
    PHASE1 --> PHASE2
    PHASE2 --> PHASE3
    PHASE3 --> FINAL

    style CURRENT fill:#ffebee,stroke:#c62828,stroke-width:2px
    style PHASE1 fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style PHASE2 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    style PHASE3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style FINAL fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

## 9. Component Dependency Graph

```mermaid
graph TB
    subgraph CLIENT_APPS["Client Applications"]
        APP_A["Restaurant App"]
        APP_B["Tour App"]
    end

    subgraph UI_LAYER["UI Layer"]
        UI_CUST["@siso/ui-customer-facing"]
        UI_CLIENT["@siso/ui-client-facing"]
    end

    subgraph BUSINESS_LAYER["Business Logic"]
        DOMAIN_REST["@siso/domain-restaurant"]
        DOMAIN_TOUR["@siso/domain-tour"]
    end

    subgraph SERVICE_LAYER["Service Layer"]
        SUPABASE["@siso/supabase-client"]
        AI["@siso/ai-workflows"]
        AUTH["@siso/auth"]
    end

    subgraph INFRA_LAYER["Infrastructure"]
        CONFIG["@siso/config-*"]
        TEMPLATES["@siso/templates"]
    end

    APP_A --> UI_CUST
    APP_A --> UI_CLIENT
    APP_A --> DOMAIN_REST
    APP_A --> TEMPLATES

    APP_B --> UI_CUST
    APP_B --> UI_CLIENT
    APP_B --> DOMAIN_TOUR
    APP_B --> TEMPLATES

    DOMAIN_REST --> SUPABASE
    DOMAIN_REST --> AI
    DOMAIN_TOUR --> SUPABASE
    DOMAIN_TOUR --> AI

    UI_CUST --> AUTH
    UI_CLIENT --> AUTH

    SUPABASE --> CONFIG
    TEMPLATES --> CONFIG

    style CLIENT_APPS fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style UI_LAYER fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style BUSINESS_LAYER fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style SERVICE_LAYER fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style INFRA_LAYER fill:#fce4ec,stroke:#c2185b,stroke-width:2px
```

---

## Key Architecture Principles

### 1. **Separation of Concerns**
- Customer-facing domains handle public features
- Client-facing domains handle business admin
- Shared domains provide common utilities

### 2. **Template-Based Variants**
- Each section supports multiple design variants
- Variants share the same data contract
- Easy to swap without code changes

### 3. **Independent Deployments**
- Each app has its own deployment pipeline
- Shared packages published to registry
- Zero-downtime deployments

### 4. **Shared Code Reusability**
- UI components shared across all apps
- Domain models encapsulate business logic
- Services provide common functionality

### 5. **Scalable Architecture**
- Add new client apps easily
- Extract patterns to shared packages
- Template system for rapid customization

---

*These diagrams visualize the SISO monorepo architecture from multiple perspectives to aid understanding and implementation.*
