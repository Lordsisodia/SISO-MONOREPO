# Template Library Foundation (Reusable Project Templates)

## 🎯 **ULTRA CONTEXT TASK OVERVIEW**

**Priority**: MEDIUM - Foundation for scaling and consistency
**Impact**: Enable rapid project setup and maintain quality across projects
**Timeline**: 4-5 days (Week 4, Backend Phase)
**Status**: 🔴 NEW - Build comprehensive template system
**Breaking Risk**: 🟢 ZERO - Pure addition, no existing functionality affected

## 📝 **BUSINESS CONTEXT & ULTRA THINK REASONING**

### **Problem Statement**
- **Reinventing wheel** = each project starts from scratch
- **Inconsistent quality** = no standardized project structures
- **Slow project setup** = manual configuration for every project
- **Knowledge loss** = best practices not captured in reusable form
- **Scaling bottleneck** = can't handle multiple projects efficiently

### **PDR Vision: Intelligent Template Engine**
**"Template Library Foundation"** should be the **scaling engine** that enables:
- **Rapid project initialization** from proven templates
- **Quality consistency** across all project types
- **Best practice capture** from successful projects
- **Customizable workflows** adapting templates to specific needs
- **Learning system** that improves templates over time

### **Ultra Think: Template-Driven Scaling**
- **Speed** = New projects launch 10x faster
- **Quality** = Every project starts with proven patterns
- **Consistency** = Standardized deliverables and processes
- **Learning** = Each project improves the template library
- **Scalability** = Handle 100+ projects with same team size

### **Strategic Value**
Templates enable the agency to:
- Scale to handle more clients without proportional team growth
- Maintain consistent quality across all projects
- Reduce time-to-market for new client projects
- Capture and reuse institutional knowledge
- Offer competitive pricing through efficiency gains

## 🏗️ **EXISTING INFRASTRUCTURE ANALYSIS**

### **Current Project Components**
```typescript
// EXISTING: Project-related components found
// src/components/projects/
// src/pages/admin/projects/
// src/types/project.types.ts

// ASSESSMENT: Basic project management, needs template abstraction
```

### **Database Foundation**
```sql
-- EXISTING: Basic project structure
projects (
  id UUID,
  name VARCHAR(255),
  client_id UUID,
  status VARCHAR(50),
  -- Can be extended for template relationships
);

-- STRATEGY: Build template system alongside existing project structure
```

### **File Structure Patterns**
```
src/
├── components/
├── pages/
├── services/
├── types/
└── utils/

-- EXISTING: Well-organized codebase structure
-- STRATEGY: Create templates that generate similar organized structures
```

## ✨ **TEMPLATE LIBRARY SPECIFICATIONS**

### **Component 1: Template Engine**

#### **Core Template Management System**
```typescript
// NEW: services/templateEngine.ts
export class TemplateEngine {
  private templateRegistry: Map<string, ProjectTemplate>;
  private customizationEngine: CustomizationEngine;
  private validationEngine: ValidationEngine;
  private generationEngine: GenerationEngine;

  constructor() {
    this.templateRegistry = new Map();
    this.customizationEngine = new CustomizationEngine();
    this.validationEngine = new ValidationEngine();
    this.generationEngine = new GenerationEngine();
    this.loadBuiltInTemplates();
  }

  async createProjectFromTemplate(
    templateId: string,
    projectConfig: ProjectConfiguration,
    customizations: TemplateCustomizations
  ): Promise<GeneratedProject> {
    // Validate template exists
    const template = this.templateRegistry.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    // Validate project configuration
    const validationResult = await this.validationEngine.validateConfig(
      template, 
      projectConfig
    );
    if (!validationResult.valid) {
      throw new Error(`Invalid configuration: ${validationResult.errors.join(', ')}`);
    }

    // Apply customizations
    const customizedTemplate = await this.customizationEngine.applyCustomizations(
      template, 
      customizations
    );

    // Generate project structure
    const generatedProject = await this.generationEngine.generateProject(
      customizedTemplate,
      projectConfig
    );

    // Save project and template relationship
    await this.saveProjectTemplateRelationship(generatedProject, template);

    return generatedProject;
  }

  async analyzeAndCreateTemplate(sourceProjectId: string): Promise<ProjectTemplate> {
    const sourceProject = await this.getProjectDetails(sourceProjectId);
    const analysis = await this.analyzeProjectStructure(sourceProject);
    
    const template: ProjectTemplate = {
      id: generateTemplateId(),
      name: `Template from ${sourceProject.name}`,
      description: 'Auto-generated template from successful project',
      category: this.inferTemplateCategory(analysis),
      version: '1.0.0',
      structure: analysis.structure,
      workflows: analysis.workflows,
      deliverables: analysis.deliverables,
      customizationPoints: this.identifyCustomizationPoints(analysis),
      requiredSkills: analysis.requiredSkills,
      estimatedDuration: analysis.duration,
      qualityGates: analysis.qualityGates,
      metadata: {
        sourceProject: sourceProjectId,
        createdBy: 'system',
        extractedAt: new Date(),
        successMetrics: sourceProject.successMetrics
      }
    };

    await this.saveTemplate(template);
    return template;
  }

  async getRecommendedTemplate(
    clientProfile: ClientProfile,
    projectRequirements: ProjectRequirements
  ): Promise<TemplateRecommendation> {
    const availableTemplates = Array.from(this.templateRegistry.values());
    const scored = await Promise.all(
      availableTemplates.map(async template => ({
        template,
        score: await this.calculateTemplateScore(template, clientProfile, projectRequirements),
        reasoning: await this.generateRecommendationReasoning(template, clientProfile)
      }))
    );

    const sortedRecommendations = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return {
      recommendations: sortedRecommendations,
      primaryRecommendation: sortedRecommendations[0],
      confidenceScore: this.calculateConfidenceScore(sortedRecommendations)
    };
  }

  private loadBuiltInTemplates(): void {
    // Restaurant template
    this.templateRegistry.set('restaurant-standard', {
      id: 'restaurant-standard',
      name: 'Restaurant & Food Service',
      description: 'Complete restaurant solution with ordering, reservations, and management',
      category: 'food-service',
      version: '2.1.0',
      structure: {
        frontend: {
          pages: ['menu', 'ordering', 'reservations', 'contact', 'about'],
          components: ['MenuDisplay', 'OrderCart', 'ReservationForm', 'LocationMap'],
          features: ['online-ordering', 'table-reservations', 'loyalty-program']
        },
        backend: {
          apis: ['orders', 'reservations', 'menu-management', 'customer-management'],
          database: ['customers', 'orders', 'menu-items', 'reservations', 'loyalty-points'],
          integrations: ['payment-processing', 'pos-system', 'email-notifications']
        },
        infrastructure: {
          hosting: 'serverless',
          database: 'postgresql',
          cdn: 'cloudfront',
          monitoring: 'comprehensive'
        }
      },
      workflows: [
        {
          name: 'Order Processing',
          steps: ['order-received', 'payment-processed', 'kitchen-notification', 'preparation', 'ready-notification', 'fulfillment'],
          automations: ['payment-verification', 'kitchen-integration', 'customer-notifications']
        },
        {
          name: 'Reservation Management',
          steps: ['booking-request', 'availability-check', 'confirmation', 'reminder-automation', 'check-in'],
          automations: ['availability-sync', 'reminder-emails', 'waitlist-management']
        }
      ],
      deliverables: [
        { name: 'Customer-facing App', type: 'web-application', priority: 'high' },
        { name: 'Admin Dashboard', type: 'management-interface', priority: 'high' },
        { name: 'Menu Management System', type: 'content-management', priority: 'medium' },
        { name: 'Analytics Dashboard', type: 'reporting', priority: 'medium' }
      ],
      customizationPoints: [
        {
          id: 'branding',
          name: 'Brand Customization',
          type: 'visual',
          options: ['color-scheme', 'logo-placement', 'typography', 'imagery-style']
        },
        {
          id: 'features',
          name: 'Feature Selection',
          type: 'functional',
          options: ['delivery-integration', 'loyalty-program', 'multi-location', 'catering-orders']
        },
        {
          id: 'integrations',
          name: 'Third-party Integrations',
          type: 'technical',
          options: ['square-pos', 'toast-pos', 'grubhub-api', 'ubereats-api', 'mailchimp']
        }
      ],
      requiredSkills: ['react', 'nodejs', 'postgresql', 'payment-apis', 'restaurant-domain'],
      estimatedDuration: 15, // days
      qualityGates: ['mobile-responsive', 'payment-security', 'performance-optimized', 'accessibility-compliant']
    });

    // E-commerce template
    this.templateRegistry.set('ecommerce-standard', {
      id: 'ecommerce-standard',
      name: 'E-commerce Store',
      description: 'Full-featured online store with inventory, payments, and order management',
      category: 'retail',
      version: '3.0.0',
      structure: {
        frontend: {
          pages: ['home', 'products', 'product-detail', 'cart', 'checkout', 'account', 'orders'],
          components: ['ProductGrid', 'ProductCard', 'ShoppingCart', 'CheckoutFlow', 'OrderHistory'],
          features: ['product-search', 'filtering', 'shopping-cart', 'wishlist', 'reviews']
        },
        backend: {
          apis: ['products', 'orders', 'customers', 'payments', 'inventory', 'analytics'],
          database: ['products', 'categories', 'customers', 'orders', 'inventory', 'reviews'],
          integrations: ['stripe', 'inventory-management', 'shipping-apis', 'email-marketing']
        },
        infrastructure: {
          hosting: 'scalable-cloud',
          database: 'postgresql-with-redis',
          cdn: 'global-cdn',
          monitoring: 'comprehensive-plus-ecommerce'
        }
      },
      workflows: [
        {
          name: 'Order Fulfillment',
          steps: ['order-placed', 'payment-processed', 'inventory-reserved', 'picking', 'packing', 'shipping', 'delivery'],
          automations: ['inventory-sync', 'shipping-labels', 'tracking-notifications', 'review-requests']
        },
        {
          name: 'Inventory Management',
          steps: ['stock-monitoring', 'reorder-alerts', 'supplier-integration', 'stock-updates'],
          automations: ['low-stock-alerts', 'automatic-reordering', 'price-updates']
        }
      ],
      deliverables: [
        { name: 'Customer Storefront', type: 'web-application', priority: 'high' },
        { name: 'Admin Panel', type: 'management-interface', priority: 'high' },
        { name: 'Inventory Management', type: 'system-integration', priority: 'high' },
        { name: 'Analytics & Reporting', type: 'business-intelligence', priority: 'medium' }
      ],
      customizationPoints: [
        {
          id: 'product-types',
          name: 'Product Configuration',
          type: 'functional',
          options: ['physical-products', 'digital-products', 'subscriptions', 'variable-products']
        },
        {
          id: 'payment-methods',
          name: 'Payment Options',
          type: 'integration',
          options: ['credit-cards', 'paypal', 'apple-pay', 'crypto', 'buy-now-pay-later']
        },
        {
          id: 'shipping',
          name: 'Shipping Configuration',
          type: 'logistics',
          options: ['local-delivery', 'national-shipping', 'international', 'pickup-points']
        }
      ],
      requiredSkills: ['react', 'nodejs', 'postgresql', 'payment-processing', 'ecommerce-ux'],
      estimatedDuration: 18, // days
      qualityGates: ['conversion-optimized', 'security-compliant', 'mobile-first', 'performance-tuned']
    });

    // Add more built-in templates...
  }

  private async calculateTemplateScore(
    template: ProjectTemplate,
    clientProfile: ClientProfile,
    requirements: ProjectRequirements
  ): Promise<number> {
    let score = 0;
    const maxScore = 100;

    // Industry match (30 points)
    if (template.category === clientProfile.industry) {
      score += 30;
    } else if (this.isRelatedIndustry(template.category, clientProfile.industry)) {
      score += 15;
    }

    // Feature coverage (25 points)
    const featureCoverage = this.calculateFeatureCoverage(template, requirements.features);
    score += featureCoverage * 25;

    // Complexity match (20 points)
    const complexityMatch = this.calculateComplexityMatch(template, requirements.complexity);
    score += complexityMatch * 20;

    // Timeline match (15 points)
    const timelineMatch = this.calculateTimelineMatch(template, requirements.timeline);
    score += timelineMatch * 15;

    // Budget match (10 points)
    const budgetMatch = this.calculateBudgetMatch(template, requirements.budget);
    score += budgetMatch * 10;

    return Math.min(score, maxScore);
  }
}

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  version: string;
  structure: TemplateStructure;
  workflows: WorkflowDefinition[];
  deliverables: DeliverableDefinition[];
  customizationPoints: CustomizationPoint[];
  requiredSkills: string[];
  estimatedDuration: number; // in days
  qualityGates: string[];
  metadata?: TemplateMetadata;
}

interface TemplateStructure {
  frontend: {
    pages: string[];
    components: string[];
    features: string[];
  };
  backend: {
    apis: string[];
    database: string[];
    integrations: string[];
  };
  infrastructure: {
    hosting: string;
    database: string;
    cdn: string;
    monitoring: string;
  };
}

interface CustomizationPoint {
  id: string;
  name: string;
  type: 'visual' | 'functional' | 'technical' | 'integration';
  options: string[];
  required?: boolean;
  dependencies?: string[];
}
```

### **Component 2: Template Generation Engine**

#### **Automated Project Structure Generation**
```typescript
// NEW: services/generationEngine.ts
export class GenerationEngine {
  private fileTemplates: Map<string, FileTemplate>;
  private codeGenerators: Map<string, CodeGenerator>;
  private structureGenerators: Map<string, StructureGenerator>;

  async generateProject(
    template: ProjectTemplate,
    config: ProjectConfiguration
  ): Promise<GeneratedProject> {
    const projectStructure = await this.generateProjectStructure(template, config);
    const codeFiles = await this.generateCodeFiles(template, config);
    const configurations = await this.generateConfigurations(template, config);
    const documentation = await this.generateDocumentation(template, config);

    const generatedProject: GeneratedProject = {
      id: generateProjectId(),
      name: config.projectName,
      templateId: template.id,
      structure: projectStructure,
      files: codeFiles,
      configurations: configurations,
      documentation: documentation,
      metadata: {
        generatedAt: new Date(),
        templateVersion: template.version,
        customizations: config.customizations
      }
    };

    return generatedProject;
  }

  private async generateCodeFiles(
    template: ProjectTemplate,
    config: ProjectConfiguration
  ): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    // Generate frontend files
    for (const page of template.structure.frontend.pages) {
      const pageFile = await this.generatePageFile(page, template, config);
      files.push(pageFile);
    }

    for (const component of template.structure.frontend.components) {
      const componentFile = await this.generateComponentFile(component, template, config);
      files.push(componentFile);
    }

    // Generate backend files
    for (const api of template.structure.backend.apis) {
      const apiFile = await this.generateApiFile(api, template, config);
      files.push(apiFile);
    }

    // Generate database files
    const databaseFile = await this.generateDatabaseSchema(template, config);
    files.push(databaseFile);

    return files;
  }

  private async generatePageFile(
    pageName: string,
    template: ProjectTemplate,
    config: ProjectConfiguration
  ): Promise<GeneratedFile> {
    const pageTemplate = this.getPageTemplate(pageName, template.category);
    const customizations = config.customizations[pageName] || {};

    let content = pageTemplate.baseContent;

    // Apply customizations
    content = await this.applyBrandingCustomizations(content, config.branding);
    content = await this.applyFeatureCustomizations(content, customizations.features);
    content = await this.applyLayoutCustomizations(content, customizations.layout);

    return {
      path: `src/pages/${this.toPascalCase(pageName)}Page.tsx`,
      content: content,
      type: 'react-component',
      dependencies: pageTemplate.dependencies,
      metadata: {
        templateSource: pageName,
        customizations: customizations
      }
    };
  }

  private async generateComponentFile(
    componentName: string,
    template: ProjectTemplate,
    config: ProjectConfiguration
  ): Promise<GeneratedFile> {
    const componentTemplate = this.getComponentTemplate(componentName, template.category);
    const customizations = config.customizations[componentName] || {};

    let content = componentTemplate.baseContent;

    // Apply business logic customizations
    content = await this.applyBusinessLogicCustomizations(content, config.businessRules);
    content = await this.applyIntegrationCustomizations(content, config.integrations);
    content = await this.applyUICustomizations(content, config.uiPreferences);

    return {
      path: `src/components/${this.toPascalCase(componentName)}.tsx`,
      content: content,
      type: 'react-component',
      dependencies: componentTemplate.dependencies,
      metadata: {
        templateSource: componentName,
        customizations: customizations
      }
    };
  }

  private async generateApiFile(
    apiName: string,
    template: ProjectTemplate,
    config: ProjectConfiguration
  ): Promise<GeneratedFile> {
    const apiTemplate = this.getApiTemplate(apiName, template.category);
    
    let content = apiTemplate.baseContent;

    // Apply API customizations
    content = await this.applyDataModelCustomizations(content, config.dataModels);
    content = await this.applySecurityCustomizations(content, config.security);
    content = await this.applyPerformanceCustomizations(content, config.performance);

    return {
      path: `src/services/${this.toCamelCase(apiName)}Service.ts`,
      content: content,
      type: 'service',
      dependencies: apiTemplate.dependencies,
      metadata: {
        templateSource: apiName,
        endpoints: apiTemplate.endpoints
      }
    };
  }

  private getPageTemplate(pageName: string, category: string): FileTemplate {
    // Restaurant menu page template
    if (pageName === 'menu' && category === 'food-service') {
      return {
        baseContent: `
import React, { useState, useEffect } from 'react';
import { MenuDisplay } from '@/components/MenuDisplay';
import { MenuCategory } from '@/components/MenuCategory';
import { OrderCart } from '@/components/OrderCart';
import { useMenu } from '@/hooks/useMenu';
import { useCart } from '@/hooks/useCart';

export default function MenuPage() {
  const { menuItems, categories, loading } = useMenu();
  const { cart, addToCart, removeFromCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (loading) {
    return <MenuPageSkeleton />;
  }

  return (
    <div className="menu-page">
      <MenuCategory 
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      
      <MenuDisplay 
        items={menuItems}
        category={selectedCategory}
        onAddToCart={addToCart}
      />
      
      <OrderCart 
        items={cart}
        onRemove={removeFromCart}
        onCheckout={() => navigate('/checkout')}
      />
    </div>
  );
}
        `,
        dependencies: ['react', '@/components/MenuDisplay', '@/hooks/useMenu'],
        endpoints: ['/api/menu', '/api/categories'],
        customizationPoints: ['branding', 'layout', 'features']
      };
    }

    // E-commerce product listing template
    if (pageName === 'products' && category === 'retail') {
      return {
        baseContent: `
import React, { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilters } from '@/components/ProductFilters';
import { SearchBar } from '@/components/SearchBar';
import { useProducts } from '@/hooks/useProducts';
import { useFilters } from '@/hooks/useFilters';

export default function ProductsPage() {
  const { products, loading, searchProducts } = useProducts();
  const { filters, updateFilter, clearFilters } = useFilters();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      searchProducts(searchQuery, filters);
    }
  }, [searchQuery, filters]);

  return (
    <div className="products-page">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search products..."
      />
      
      <div className="products-layout">
        <ProductFilters 
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />
        
        <ProductGrid 
          products={products}
          loading={loading}
          onProductClick={(product) => navigate(\`/products/\${product.id}\`)}
        />
      </div>
    </div>
  );
}
        `,
        dependencies: ['react', '@/components/ProductGrid', '@/hooks/useProducts'],
        endpoints: ['/api/products', '/api/categories', '/api/search'],
        customizationPoints: ['search-features', 'filtering-options', 'product-display']
      };
    }

    // Default template
    return {
      baseContent: `
import React from 'react';

export default function ${this.toPascalCase(pageName)}Page() {
  return (
    <div className="${this.toKebabCase(pageName)}-page">
      <h1>${this.toTitleCase(pageName)}</h1>
      {/* Page content will be generated based on template customizations */}
    </div>
  );
}
      `,
      dependencies: ['react'],
      endpoints: [],
      customizationPoints: ['basic-layout', 'content-structure']
    };
  }
}

interface FileTemplate {
  baseContent: string;
  dependencies: string[];
  endpoints: string[];
  customizationPoints: string[];
}

interface GeneratedFile {
  path: string;
  content: string;
  type: string;
  dependencies: string[];
  metadata: Record<string, any>;
}
```

### **Component 3: Template Analytics & Optimization**

#### **Template Performance and Improvement System**
```typescript
// NEW: services/templateAnalytics.ts
export class TemplateAnalytics {
  async analyzeTemplatePerformance(templateId: string): Promise<TemplatePerformanceReport> {
    const projectsUsingTemplate = await this.getProjectsUsingTemplate(templateId);
    const successMetrics = await this.calculateSuccessMetrics(projectsUsingTemplate);
    const commonCustomizations = await this.analyzeCommonCustomizations(projectsUsingTemplate);
    const improvementOpportunities = await this.identifyImprovements(projectsUsingTemplate);

    return {
      templateId,
      totalProjects: projectsUsingTemplate.length,
      successRate: successMetrics.successRate,
      averageDeliveryTime: successMetrics.averageDeliveryTime,
      clientSatisfactionScore: successMetrics.clientSatisfactionScore,
      commonCustomizations,
      improvementOpportunities,
      recommendations: await this.generateTemplateRecommendations(
        successMetrics,
        commonCustomizations,
        improvementOpportunities
      )
    };
  }

  async optimizeTemplate(templateId: string): Promise<OptimizedTemplate> {
    const currentTemplate = await this.getTemplate(templateId);
    const performanceReport = await this.analyzeTemplatePerformance(templateId);
    
    const optimizations: TemplateOptimization[] = [];

    // Optimize based on common customizations
    for (const customization of performanceReport.commonCustomizations) {
      if (customization.frequency > 0.7) { // Used in 70%+ of projects
        optimizations.push({
          type: 'incorporate-common-customization',
          description: `Make ${customization.name} a default feature`,
          impact: 'high',
          effort: 'medium'
        });
      }
    }

    // Optimize based on performance issues
    for (const issue of performanceReport.improvementOpportunities) {
      optimizations.push({
        type: 'performance-improvement',
        description: issue.description,
        impact: issue.impact,
        effort: issue.estimatedEffort
      });
    }

    const optimizedTemplate = await this.applyOptimizations(currentTemplate, optimizations);
    
    return {
      originalTemplate: currentTemplate,
      optimizedTemplate,
      optimizations,
      expectedImprovements: this.calculateExpectedImprovements(optimizations)
    };
  }

  async generateTemplateFromSuccessfulProject(projectId: string): Promise<GeneratedTemplate> {
    const project = await this.getProjectDetails(projectId);
    const analysis = await this.analyzeProjectForTemplateCreation(project);
    
    // Extract reusable patterns
    const patterns = await this.extractReusablePatterns(project);
    const workflows = await this.extractWorkflows(project);
    const qualityGates = await this.extractQualityGates(project);
    
    const generatedTemplate: GeneratedTemplate = {
      id: generateTemplateId(),
      name: `Template from ${project.name}`,
      description: this.generateTemplateDescription(analysis),
      category: this.inferCategory(project),
      confidence: this.calculateExtractionConfidence(analysis),
      structure: patterns.structure,
      workflows: workflows,
      qualityGates: qualityGates,
      customizationPoints: this.identifyCustomizationPoints(patterns),
      metadata: {
        sourceProject: projectId,
        extractionDate: new Date(),
        successMetrics: project.successMetrics
      }
    };

    return generatedTemplate;
  }

  private async calculateSuccessMetrics(projects: Project[]): Promise<SuccessMetrics> {
    const completedProjects = projects.filter(p => p.status === 'completed');
    const successfulProjects = completedProjects.filter(p => p.clientSatisfaction >= 4.0);

    return {
      successRate: successfulProjects.length / projects.length,
      averageDeliveryTime: this.calculateAverageDeliveryTime(completedProjects),
      clientSatisfactionScore: this.calculateAverageClientSatisfaction(completedProjects),
      onTimeDeliveryRate: this.calculateOnTimeDeliveryRate(completedProjects),
      budgetAdherenceRate: this.calculateBudgetAdherenceRate(completedProjects)
    };
  }

  private async analyzeCommonCustomizations(projects: Project[]): Promise<CustomizationAnalysis[]> {
    const customizationFrequency = new Map<string, number>();
    const customizationDetails = new Map<string, CustomizationDetail[]>();

    for (const project of projects) {
      for (const customization of project.customizations) {
        const key = `${customization.type}:${customization.name}`;
        customizationFrequency.set(key, (customizationFrequency.get(key) || 0) + 1);
        
        if (!customizationDetails.has(key)) {
          customizationDetails.set(key, []);
        }
        customizationDetails.get(key)!.push({
          projectId: project.id,
          value: customization.value,
          effort: customization.effort,
          impact: customization.impact
        });
      }
    }

    return Array.from(customizationFrequency.entries()).map(([key, count]) => {
      const [type, name] = key.split(':');
      const details = customizationDetails.get(key)!;
      
      return {
        type,
        name,
        frequency: count / projects.length,
        averageEffort: details.reduce((sum, d) => sum + d.effort, 0) / details.length,
        averageImpact: details.reduce((sum, d) => sum + d.impact, 0) / details.length,
        examples: details.slice(0, 3) // Top 3 examples
      };
    }).sort((a, b) => b.frequency - a.frequency);
  }
}

interface TemplatePerformanceReport {
  templateId: string;
  totalProjects: number;
  successRate: number;
  averageDeliveryTime: number;
  clientSatisfactionScore: number;
  commonCustomizations: CustomizationAnalysis[];
  improvementOpportunities: ImprovementOpportunity[];
  recommendations: string[];
}

interface CustomizationAnalysis {
  type: string;
  name: string;
  frequency: number;
  averageEffort: number;
  averageImpact: number;
  examples: CustomizationDetail[];
}

interface TemplateOptimization {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
}
```

## 🗄️ **DATABASE SCHEMA EXTENSIONS**

```sql
-- EXTEND existing projects table (no breaking changes)
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS template_id VARCHAR(100),
ADD COLUMN IF NOT EXISTS template_version VARCHAR(20),
ADD COLUMN IF NOT EXISTS customizations JSONB,
ADD COLUMN IF NOT EXISTS generation_metadata JSONB;

-- NEW: Template definitions
CREATE TABLE IF NOT EXISTS project_templates (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  version VARCHAR(20),
  structure JSONB NOT NULL,
  workflows JSONB,
  deliverables JSONB,
  customization_points JSONB,
  required_skills TEXT[],
  estimated_duration_days INTEGER,
  quality_gates TEXT[],
  metadata JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Template usage tracking
CREATE TABLE IF NOT EXISTS template_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(100) REFERENCES project_templates(id),
  project_id UUID REFERENCES projects(id),
  customizations_applied JSONB,
  generation_success BOOLEAN,
  client_satisfaction DECIMAL,
  delivery_time_days INTEGER,
  budget_adherence DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Template performance metrics
CREATE TABLE IF NOT EXISTS template_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(100) REFERENCES project_templates(id),
  metric_date DATE DEFAULT CURRENT_DATE,
  total_projects INTEGER DEFAULT 0,
  successful_projects INTEGER DEFAULT 0,
  average_delivery_time DECIMAL,
  average_satisfaction DECIMAL,
  common_customizations JSONB,
  improvement_opportunities JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Generated files tracking
CREATE TABLE IF NOT EXISTS template_generated_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  template_id VARCHAR(100) REFERENCES project_templates(id),
  file_path VARCHAR(500),
  file_type VARCHAR(100),
  file_size INTEGER,
  dependencies TEXT[],
  customizations_applied JSONB,
  generation_success BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Template customization tracking
CREATE TABLE IF NOT EXISTS template_customizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  template_id VARCHAR(100) REFERENCES project_templates(id),
  customization_point_id VARCHAR(100),
  customization_type VARCHAR(50),
  customization_name VARCHAR(255),
  applied_value JSONB,
  effort_hours DECIMAL,
  impact_score DECIMAL,
  success_rating INTEGER, -- 1-5 scale
  created_at TIMESTAMP DEFAULT NOW()
);

-- FUNCTION: Calculate template success rate
CREATE OR REPLACE FUNCTION calculate_template_success_rate(template_uuid VARCHAR(100))
RETURNS DECIMAL AS $$
DECLARE
  total_usage INTEGER;
  successful_usage INTEGER;
  success_rate DECIMAL;
BEGIN
  -- Count total and successful usage
  SELECT 
    COUNT(*),
    SUM(CASE WHEN generation_success = TRUE AND client_satisfaction >= 4.0 THEN 1 ELSE 0 END)
  INTO total_usage, successful_usage
  FROM template_usage
  WHERE template_id = template_uuid;

  -- Calculate success rate
  IF total_usage > 0 THEN
    success_rate := successful_usage::DECIMAL / total_usage;
  ELSE
    success_rate := 0;
  END IF;

  RETURN success_rate;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION: Get template recommendations
CREATE OR REPLACE FUNCTION get_template_recommendations(
  client_industry VARCHAR(100),
  project_complexity VARCHAR(50),
  required_features TEXT[]
)
RETURNS TABLE(
  template_id VARCHAR(100),
  template_name VARCHAR(255),
  match_score DECIMAL,
  recommendation_reason TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pt.id,
    pt.name,
    (
      -- Industry match (40 points)
      CASE WHEN pt.category = client_industry THEN 40 ELSE 0 END +
      -- Feature coverage (40 points)
      (
        SELECT COUNT(*) * 40.0 / array_length(required_features, 1)
        FROM unnest(required_features) AS feature
        WHERE pt.structure::text ILIKE '%' || feature || '%'
      ) +
      -- Success rate bonus (20 points)
      calculate_template_success_rate(pt.id) * 20
    ) AS match_score,
    CASE 
      WHEN pt.category = client_industry THEN 'Perfect industry match'
      ELSE 'Good feature coverage'
    END AS reason
  FROM project_templates pt
  WHERE pt.is_active = TRUE
  ORDER BY match_score DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION: Update template performance metrics
CREATE OR REPLACE FUNCTION update_template_performance_metrics(template_uuid VARCHAR(100))
RETURNS VOID AS $$
DECLARE
  performance_data RECORD;
BEGIN
  -- Calculate current performance metrics
  SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN generation_success = TRUE AND client_satisfaction >= 4.0 THEN 1 ELSE 0 END) as successful,
    AVG(delivery_time_days) as avg_delivery,
    AVG(client_satisfaction) as avg_satisfaction
  INTO performance_data
  FROM template_usage
  WHERE template_id = template_uuid;

  -- Insert or update performance record
  INSERT INTO template_performance (
    template_id,
    total_projects,
    successful_projects,
    average_delivery_time,
    average_satisfaction
  )
  VALUES (
    template_uuid,
    performance_data.total,
    performance_data.successful,
    performance_data.avg_delivery,
    performance_data.avg_satisfaction
  )
  ON CONFLICT (template_id, metric_date) 
  DO UPDATE SET
    total_projects = performance_data.total,
    successful_projects = performance_data.successful,
    average_delivery_time = performance_data.avg_delivery,
    average_satisfaction = performance_data.avg_satisfaction,
    created_at = NOW();
END;
$$ LANGUAGE plpgsql;
```

## 🎯 **SUCCESS METRICS**

### **Template System Success**
- [ ] 90% faster project initialization using templates
- [ ] 95% template generation success rate
- [ ] 85% client satisfaction with template-based projects
- [ ] 50% reduction in project setup time

### **Quality & Consistency Success**
- [ ] 95% of template projects meet quality gates
- [ ] 80% consistency score across template-generated projects
- [ ] 90% of customizations applied successfully
- [ ] 75% reduction in project-to-project variations

### **Business Impact Success**
- [ ] 3x increase in project throughput capacity
- [ ] 40% improvement in profit margins
- [ ] 60% reduction in junior developer onboarding time
- [ ] 25% increase in client retention through consistency

## 📋 **ACCEPTANCE CRITERIA**

### **Must Have**
- [ ] Complete template system for restaurant and e-commerce projects
- [ ] Template generation from existing projects
- [ ] Customization system for branding and features
- [ ] Template performance analytics
- [ ] Integration with existing project management

### **Should Have**
- [ ] Advanced template optimization recommendations
- [ ] Template versioning and migration system
- [ ] Custom template creation interface
- [ ] Template marketplace functionality

### **Could Have**
- [ ] AI-powered template suggestions
- [ ] Community template sharing
- [ ] Advanced analytics and reporting
- [ ] Template collaboration features

This Template Library Foundation provides the infrastructure needed to scale the agency efficiently while maintaining quality and consistency across all projects.