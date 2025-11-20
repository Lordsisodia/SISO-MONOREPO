# Portfolio Public Pages - UX & Front-End Specification

**Document Version**: 1.0
**Created**: 2025-10-24
**UX Expert**: Sally (BMAD UX Agent)
**Epic**: Portfolio Public Pages Completion
**Status**: Approved for Development

---

## 🎯 **UX Vision & Goals**

### Primary UX Objectives
1. **Showcase SISO Excellence**: Portfolio demonstrates speed, quality, and AI-powered development capability
2. **Industry-Focused Navigation**: Prospects find relevant work for their industry immediately
3. **Trust Building**: Detailed case studies with real data build credibility
4. **Conversion Optimized**: Clear CTAs drive prospects to client dashboard
5. **Mobile-First Experience**: 60% of traffic is mobile - must be perfect

### User Personas

**Persona 1: Prospective Client (Primary)**
- Goals: Evaluate SISO capability, compare to competitors, estimate project cost
- Pain Points: Skeptical of "too good to be true" claims, need proof of quality
- Success: Finds relevant work → Views case study → Clicks "Get Started"

**Persona 2: Existing Client (Secondary)**
- Goals: Show work to stakeholders, reference project details
- Pain Points: Needs professional showcase to justify investment
- Success: Shares clean portfolio link → Stakeholder approves

**Persona 3: Partner/Referral (Tertiary)**
- Goals: Show portfolio to potential clients they're referring
- Pain Points: Needs impressive showcase to close referrals
- Success: Portfolio quality helps close the deal → Earns commission

---

## 🎨 **SISO Design System - Portfolio Application**

### Color Palette (Existing System)
```css
/* Primary Brand Colors */
--siso-orange: #FF5722  /* Primary CTA, accents */
--siso-red: #D32F2F     /* Gradient starts, emphasis */

/* Neutral Palette */
--siso-text: #E0E0E0         /* Primary text */
--siso-text-muted: #9E9E9E   /* Secondary text */
--siso-bg: #0A0A0A           /* Main background */
--siso-bg-alt: #121212       /* Card backgrounds */
--siso-border: #2A2A2A       /* Borders */

/* Status Colors (Portfolio Specific) */
--status-live: #4CAF50       /* Live projects */
--status-dev: #2196F3        /* In development */
--status-planning: #FFC107   /* Planning phase */
```

### Typography Scale
```css
/* Hero Headings */
h1: 3rem (48px) md:4rem (64px) lg:5rem (80px)
     font-bold, gradient text

/* Section Headings */
h2: 2rem (32px) md:2.5rem (40px)
    font-bold, text-white

/* Card Titles */
h3: 1.5rem (24px) md:1.75rem (28px)
    font-semibold, text-white

/* Body Text */
p: 1rem (16px) md:1.125rem (18px)
   leading-relaxed, text-siso-text

/* Small Text */
small: 0.875rem (14px)
       text-siso-text-muted
```

### Gradient Patterns
```tsx
// Primary Gradient (Hero Headings)
className="bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent"

// Subtle Background Gradient
className="bg-gradient-to-b from-black/50 via-transparent to-black/50"

// Button Gradient (Hover)
className="bg-gradient-to-r from-siso-red to-siso-orange"
```

### Framer Motion Animation Patterns
```tsx
// Page Entry Animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Stagger Children Pattern
const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Card Hover Effect
whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
```

### Component System (shadcn/ui)
```tsx
// Card Pattern
<Card className="border border-siso-border bg-siso-bg-alt">
  <CardHeader>
    <CardTitle className="text-white">Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>

// Button Patterns
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Tertiary Action</Button>

// Badge Pattern
<Badge className="bg-siso-orange/20 text-siso-orange">Tech</Badge>
```

### Responsive Grid System
```tsx
// 3-Column Grid (Standard)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 2-Column Grid (Wider Cards)
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// 4-Column Grid (Icons/Stats)
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
```

---

## 📱 **Page 1: PortfolioHub - Main Landing**

### Page Structure
```
┌─────────────────────────────────────────┐
│          PORTFOLIO HERO SECTION         │
│  "Our Work" Gradient Title + Subtitle   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         INDUSTRY FILTER TABS            │
│   All | Restaurants | Crypto | Agencies │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          INDUSTRY GRID (3x3)            │
│  ┌───────┐  ┌───────┐  ┌───────┐       │
│  │ Rest  │  │ Crypto│  │ Agency│       │
│  └───────┘  └───────┘  └───────┘       │
│  ┌───────┐  ┌───────┐  ┌───────┐       │
│  │ eComm │  │ Health│  │ SaaS  │       │
│  └───────┘  └───────┘  └───────┘       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│       FEATURED PROJECTS CAROUSEL        │
│     (Top 3-5 recent/impressive)         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          PARTNER CTA SECTION            │
│   "Earn 30% Commission - Refer Clients" │
└─────────────────────────────────────────┘
```

### Component Details

#### 1. Portfolio Hero
```tsx
<section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center space-y-6 z-10"
  >
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
      <span className="bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
        Our Work
      </span>
    </h1>
    <p className="text-xl md:text-2xl text-siso-text max-w-3xl mx-auto">
      AI-powered websites and PWAs delivered in 48-72 hours.
      See how we've transformed businesses across industries.
    </p>
  </motion.div>

  {/* Waves background (reuse from HeroSection) */}
  <Waves {...waveProps} />
</section>
```

**UX Notes:**
- Gradient headline creates visual hierarchy
- Waves animation adds premium feel
- Concise value prop reinforces speed advantage
- Max-width prevents text from becoming too wide

#### 2. Industry Grid
```tsx
<div className="container mx-auto px-4 py-16">
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    variants={containerVariants}
  >
    {industries.map((industry) => (
      <motion.div
        key={industry.id}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate(`/portfolio/${industry.slug}`)}
      >
        <Card className="h-full border border-siso-border bg-siso-bg-alt hover:border-siso-orange/50 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <IndustryIcon className="w-8 h-8 text-siso-orange" />
              <CardTitle className="text-xl font-semibold text-white">
                {industry.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-siso-text-muted">
              {industry.projectCount} projects
            </p>
            <p className="text-siso-text mt-2">
              {industry.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
</div>
```

**UX Notes:**
- Hover scale creates interactive feedback
- Project count builds credibility
- Card click area is large (full card)
- Border color change on hover indicates clickability

#### 3. Featured Projects Carousel
```tsx
<section className="py-16 bg-gradient-to-b from-transparent to-black/20">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
      Featured Projects
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project) => (
        <PortfolioCard
          key={project.id}
          project={project}
          onProjectClick={() => navigate(`/portfolio/${project.industry}/${project.slug}`)}
        />
      ))}
    </div>
  </div>
</section>
```

**UX Notes:**
- Reuses existing PortfolioCard component
- Background gradient creates visual section
- 3-column grid on desktop, stacks on mobile
- Clicking any card navigates to detail page

---

## 📂 **Page 2: IndustryLanding - Category Pages**

### Page Structure
```
┌─────────────────────────────────────────┐
│         INDUSTRY HERO SECTION           │
│     "Restaurants" Title + Stats Bar     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          BREADCRUMB NAVIGATION          │
│    Portfolio > Restaurants              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│      VALUE PROPOSITION SECTION          │
│   Why SISO for Restaurant Websites?     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         PROJECT GRID (Filtered)         │
│   All restaurant projects in cards      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          INDUSTRY CTA SECTION           │
│   "Ready to transform your restaurant?" │
└─────────────────────────────────────────┘
```

### Component Details

#### 1. Industry Hero
```tsx
<section className="min-h-[40vh] flex items-center justify-center relative">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center space-y-6"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <IndustryBadge industry={industry} size="lg" />
    </div>

    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
      {industry.name} Websites
    </h1>

    <p className="text-lg md:text-xl text-siso-text max-w-2xl mx-auto">
      {industry.tagline}
    </p>

    {/* Stats Bar */}
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      <Stat icon={FolderOpen} value={industry.projectCount} label="Projects" />
      <Stat icon={Clock} value="48-72h" label="Avg Delivery" />
      <Stat icon={Star} value="4.9/5" label="Client Rating" />
    </div>
  </motion.div>
</section>
```

**UX Notes:**
- Industry badge provides visual identity
- Stats build immediate credibility
- Tagline is industry-specific value prop
- Centered layout with breathing room

#### 2. Breadcrumb Navigation
```tsx
<BreadcrumbNav
  items={[
    { label: 'Portfolio', href: '/portfolio' },
    { label: industry.name, current: true }
  ]}
/>
```

**UX Notes:**
- Helps users understand location
- Quick navigation back to hub
- Subtle, doesn't dominate page

#### 3. Value Proposition Grid
```tsx
<section className="py-12 container mx-auto px-4">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
    Why SISO for {industry.name}?
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {industry.valueProps.map((prop) => (
      <Card key={prop.title} className="bg-siso-bg-alt border-siso-border">
        <CardHeader>
          <prop.Icon className="w-10 h-10 text-siso-orange mb-3" />
          <CardTitle className="text-lg text-white">{prop.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-siso-text">{prop.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</section>
```

**UX Notes:**
- Industry-specific value props (not generic)
- Icons create visual interest
- Concise descriptions (2-3 sentences)
- Builds confidence before viewing projects

---

## 📋 **Page 3: ClientDetail - Project Case Study**

### Page Structure
```
┌─────────────────────────────────────────┐
│          BREADCRUMB NAVIGATION          │
│  Portfolio > Restaurants > Mayorker     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│          PROJECT HERO/HEADER            │
│   Mayorker Logo + Name + Status + CTA   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         QUICK STATS / METADATA          │
│   Duration | Budget | Tech | Industry   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│       TABBED CONTENT SECTIONS           │
│  Overview | Features | Screenshots |    │
│  Pricing | Timeline | Testimonial       │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│           RELATED PROJECTS              │
│     "More in Restaurants" (3 cards)     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│             CTA SECTION                 │
│   "Ready for your own website?"         │
└─────────────────────────────────────────┘
```

### Component Details

#### 1. Project Header
```tsx
<header className="container mx-auto px-4 py-12">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      {/* Client Logo */}
      {project.media.logo && (
        <img
          src={project.media.logo}
          alt={project.name}
          className="w-16 h-16 rounded-lg object-contain bg-white/5 p-2"
        />
      )}

      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {project.name}
        </h1>
        <p className="text-lg text-siso-text mt-1">
          {project.tagline}
        </p>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <Badge className={getStatusColor(project.status)}>
        {project.status}
      </Badge>

      {project.liveUrl && (
        <Button
          onClick={() => window.open(project.liveUrl, '_blank')}
          className="bg-gradient-to-r from-siso-red to-siso-orange"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Live Site
        </Button>
      )}
    </div>
  </div>
</header>
```

**UX Notes:**
- Logo adds professionalism and branding
- Status badge shows project state
- Live site CTA is primary action
- Responsive: stacks on mobile, side-by-side on desktop

#### 2. Quick Stats Metadata
```tsx
<section className="container mx-auto px-4 py-6 border-y border-siso-border">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <MetadataStat
      icon={Calendar}
      label="Delivery Time"
      value={project.deliveryTime}
    />
    <MetadataStat
      icon={DollarSign}
      label="Investment"
      value={formatCurrency(project.pricing.min)}
    />
    <MetadataStat
      icon={FolderOpen}
      label="Industry"
      value={project.industry}
    />
    <MetadataStat
      icon={Star}
      label="Tech Stack"
      value={`${project.techStack.frontend.length}+ tools`}
    />
  </div>
</section>
```

**UX Notes:**
- Quick scannable facts
- Icons create visual consistency
- Grid adapts to mobile (2 cols) and desktop (4 cols)
- Border separation creates clear section

#### 3. Tabbed Content (Main Content)
```tsx
<Tabs defaultValue="overview" className="container mx-auto px-4 py-12">
  <TabsList className="bg-siso-bg-alt border border-siso-border">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="features">Features</TabsTrigger>
    <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
    <TabsTrigger value="pricing">Pricing</TabsTrigger>
    <TabsTrigger value="timeline">Timeline</TabsTrigger>
    {project.testimonial && (
      <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
    )}
  </TabsList>

  <TabsContent value="overview" className="mt-8">
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold text-white mb-4">
        Project Overview
      </h2>
      <p className="text-lg text-siso-text leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <TechStackSection
          title="Frontend"
          technologies={project.techStack.frontend}
        />
        <TechStackSection
          title="Backend"
          technologies={project.techStack.backend}
        />
        <TechStackSection
          title="Infrastructure"
          technologies={project.techStack.hosting}
        />
      </div>
    </div>
  </TabsContent>

  <TabsContent value="features" className="mt-8">
    <FeatureShowcase features={project.features} />
  </TabsContent>

  <TabsContent value="screenshots" className="mt-8">
    <ScreenshotGallery screenshots={project.media.screenshots} />
  </TabsContent>

  <TabsContent value="pricing" className="mt-8">
    <PricingBreakdown pricing={project.pricing} />
  </TabsContent>

  <TabsContent value="timeline" className="mt-8">
    <TimelineVisualization timeline={project.timeline} />
  </TabsContent>

  {project.testimonial && (
    <TabsContent value="testimonial" className="mt-8">
      <TestimonialSection testimonial={project.testimonial} />
    </TabsContent>
  )}
</Tabs>
```

**UX Notes:**
- Tabs organize dense information
- Default to "Overview" (most important)
- Conditional testimonial tab (only if exists)
- Each tab has focused, scannable content
- Prose classes for readable text blocks

#### 4. Screenshot Gallery (Tab Content)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {screenshots.map((screenshot, index) => (
    <motion.div
      key={screenshot.url}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative aspect-video rounded-lg overflow-hidden border border-siso-border group cursor-pointer"
      onClick={() => openLightbox(index)}
    >
      <img
        src={screenshot.url}
        alt={screenshot.caption}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white font-medium">
            {screenshot.caption}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
```

**UX Notes:**
- 2-column grid for screenshots
- Hover effect reveals caption
- Stagger animation creates polished entrance
- Click opens full-screen lightbox (future enhancement)
- Maintains aspect ratio (16:9)

#### 5. Related Projects
```tsx
<section className="container mx-auto px-4 py-16 border-t border-siso-border">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
    More in {project.industry}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {relatedProjects.map((related) => (
      <PortfolioCard
        key={related.id}
        project={related}
        onProjectClick={() => navigate(`/portfolio/${related.industry}/${related.slug}`)}
      />
    ))}
  </div>
</section>
```

**UX Notes:**
- Keeps users engaged with more content
- Industry-filtered (relevant to current project)
- Reuses PortfolioCard for consistency
- Limited to 3 projects (not overwhelming)

---

## 🎯 **Interaction Patterns & States**

### Loading States
```tsx
// Page Loading Skeleton
<div className="space-y-8">
  <Skeleton className="h-48 w-full bg-siso-border" />
  <div className="grid grid-cols-3 gap-6">
    <Skeleton className="h-64 bg-siso-border" />
    <Skeleton className="h-64 bg-siso-border" />
    <Skeleton className="h-64 bg-siso-border" />
  </div>
</div>

// Incremental Loading (Better UX)
- Hero loads first (instant)
- Industry grid fades in (stagger)
- Images lazy load below fold
```

### Empty States
```tsx
// No Projects in Industry
<div className="text-center py-20">
  <FolderOpen className="w-16 h-16 text-siso-text-muted mx-auto mb-4" />
  <h3 className="text-xl font-semibold text-white mb-2">
    No Projects Yet
  </h3>
  <p className="text-siso-text-muted">
    We're currently building amazing {industry.name} projects.
    Check back soon!
  </p>
</div>
```

### Error States
```tsx
// Failed to Load Project
<div className="text-center py-20">
  <AlertTriangle className="w-16 h-16 text-siso-red mx-auto mb-4" />
  <h3 className="text-xl font-semibold text-white mb-2">
    Unable to Load Project
  </h3>
  <p className="text-siso-text-muted mb-6">
    We're having trouble loading this project. Please try again.
  </p>
  <Button onClick={() => window.location.reload()}>
    Retry
  </Button>
</div>
```

### Hover States
```tsx
// Card Hover
- Border: siso-border → siso-orange/50
- Scale: 1 → 1.02
- Shadow: none → shadow-lg shadow-siso-orange/10
- Duration: 200ms

// Button Hover
- Background: gradient intensifies
- Scale: 1 → 1.05
- Shadow: shadow-md → shadow-lg
```

---

## 📱 **Responsive Breakpoints**

### Mobile (< 768px)
- Single column layouts
- Stack hero content
- Hamburger menu (if navigation added)
- Touch-friendly tap targets (min 44x44px)
- Reduced motion (respect prefers-reduced-motion)

### Tablet (768px - 1024px)
- 2-column grids
- Side-by-side hero elements
- Compressed spacing (py-12 instead of py-16)
- Optimized image sizes

### Desktop (> 1024px)
- 3-column grids
- Full spacing (py-16, py-20)
- Hover effects enabled
- Larger typography scale

---

## ♿ **Accessibility Requirements**

### WCAG 2.1 AA Compliance
- [x] Color contrast ≥ 4.5:1 for all text
- [x] Focus indicators visible on all interactive elements
- [x] Keyboard navigation for all interactions
- [x] Semantic HTML (nav, main, section, article)
- [x] Alt text for all images
- [x] ARIA labels for icon buttons
- [x] Skip links for keyboard users
- [x] Proper heading hierarchy (h1 → h2 → h3)

### Screen Reader Support
```tsx
// Industry Card Example
<Card
  role="button"
  tabIndex={0}
  aria-label={`View ${industry.projectCount} projects in ${industry.name}`}
  onKeyDown={(e) => e.key === 'Enter' && navigate(...)}
>
  {/* Card content */}
</Card>

// Status Badge Example
<Badge aria-label={`Project status: ${project.status}`}>
  {project.status}
</Badge>
```

### Focus Management
```tsx
// Page transitions should focus h1
useEffect(() => {
  const heading = document.querySelector('h1');
  heading?.focus();
}, []);
```

---

## ⚡ **Performance Requirements**

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.0s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Strategies
1. **Image Optimization**
   - WebP format with JPG fallback
   - Lazy loading below fold
   - Responsive srcset for different screen sizes
   - Max width: 1920px (no larger)

2. **Code Splitting**
   - Route-based splitting (PortfolioHub, IndustryLanding, ClientDetail separate bundles)
   - Lazy load heavy components (screenshot galleries)

3. **Data Loading**
   - Prefetch industry data on hub page
   - Cache project data with React Query
   - Stale-while-revalidate strategy

4. **Animation Performance**
   - Use `transform` and `opacity` (GPU accelerated)
   - Avoid animating `width`, `height`, `top`, `left`
   - Respect `prefers-reduced-motion`

---

## 🎨 **Design Tokens (Developer Reference)**

### Spacing Scale
```css
--spacing-1: 0.25rem  /* 4px */
--spacing-2: 0.5rem   /* 8px */
--spacing-3: 0.75rem  /* 12px */
--spacing-4: 1rem     /* 16px */
--spacing-6: 1.5rem   /* 24px */
--spacing-8: 2rem     /* 32px */
--spacing-12: 3rem    /* 48px */
--spacing-16: 4rem    /* 64px */
--spacing-20: 5rem    /* 80px */
```

### Border Radius
```css
--radius-sm: 0.375rem  /* 6px - badges */
--radius-md: 0.5rem    /* 8px - cards */
--radius-lg: 0.75rem   /* 12px - large cards */
--radius-full: 9999px  /* Fully rounded */
```

### Shadow Scale
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.2)
--shadow-md: 0 4px 6px rgba(0,0,0,0.3)
--shadow-lg: 0 10px 15px rgba(0,0,0,0.4)
--shadow-glow: 0 0 20px rgba(255,87,34,0.3) /* Orange glow */
```

---

## 🧪 **Component Testing Checklist**

### Visual Testing (Each Page)
- [ ] Renders correctly on mobile (375px)
- [ ] Renders correctly on tablet (768px)
- [ ] Renders correctly on desktop (1920px)
- [ ] Dark mode colors are correct
- [ ] Gradients render smoothly
- [ ] Animations are smooth (60fps)
- [ ] No layout shift during loading

### Interaction Testing
- [ ] All links navigate correctly
- [ ] Breadcrumbs work in both directions
- [ ] Tabs switch content correctly
- [ ] Image carousels advance/reverse
- [ ] CTAs trigger correct actions
- [ ] Keyboard navigation works
- [ ] Screen reader announces content

### Performance Testing
- [ ] Page loads < 2s on 4G
- [ ] Images lazy load correctly
- [ ] No unnecessary re-renders
- [ ] Lighthouse score > 90

---

## 📐 **Design Handoff Notes for Developers**

### Story 1: PortfolioHub
**Components to Build:**
- `PortfolioHubHero` (new)
- `IndustryGrid` (new)
- `FeaturedProjectsCarousel` (new)
- `PartnerCTA` (new)

**Reuse:**
- `PortfolioCard` (existing)
- `Waves` background (existing)
- `Button`, `Card`, `Badge` (shadcn)

---

### Story 2: IndustryLanding + ClientDetail
**Components to Build:**
- `IndustryHero` (new)
- `IndustryValueProps` (new)
- `BreadcrumbNav` (new)
- `ClientDetailHeader` (new)
- `QuickStatsMetadata` (new)
- `ScreenshotGallery` (new)
- `TimelineVisualization` (new)
- `PricingBreakdown` (new)
- `TestimonialSection` (new)

**Reuse:**
- `PortfolioCard` (existing)
- `TechStackBadge` (existing)
- `IndustryBadge` (existing)
- `Tabs`, `Card`, `Button` (shadcn)

---

## ✅ **UX Quality Gates**

### Before Story Completion
- [ ] All interactive elements have hover states
- [ ] All pages have proper page titles (SEO)
- [ ] All images have alt text
- [ ] All buttons have aria-labels
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works fully
- [ ] Mobile experience is smooth
- [ ] Loading states don't cause layout shift
- [ ] Error states are user-friendly
- [ ] Empty states are informative

---

## 🎓 **UX Best Practices Reference**

### Card Design
1. Clear visual hierarchy (title > description > metadata)
2. Hover states indicate interactivity
3. Consistent spacing inside cards (p-6)
4. Border on hover for clickable cards

### Hero Sections
1. Gradient text for main headline
2. Subtle background animation (waves, gradients)
3. Clear value proposition in subtitle
4. Breathing room (min-h-[50vh])

### CTAs
1. Primary action uses gradient button
2. Secondary actions use outline or ghost
3. Clear action verbs ("Get Started", "View Live Site")
4. Positioned where user attention naturally flows

### Typography
1. White for headings (maximum contrast)
2. siso-text for body (softer, readable)
3. siso-text-muted for metadata
4. Line length < 75 characters for readability
5. Line height 1.6-1.8 for body text

---

## 📚 **Reference Links**

**Design System Files:**
- `src/components/landing/sections/HeroSection.tsx` (hero patterns)
- `src/components/landing/sections/PricingSection.tsx` (card layouts)
- `src/components/portfolio/PortfolioCard.tsx` (card component)
- `src/components/ui/*` (shadcn component library)
- `tailwind.config.ts` (SISO color tokens)

**Type Definitions:**
- `src/types/portfolio.ts` (all TypeScript interfaces)
- `src/domain/portfolio/types/*` (domain types)

**Data Examples:**
- `src/domain/portfolio/data/clients/mayorker.ts` (complete client reference)
- `src/domain/portfolio/data/industries.ts` (industry data)

---

**UX Spec Complete** ✅
**Next Step**: Story Manager creates detailed user stories
**Handoff**: Development team implements with design system compliance

---

*Created by BMAD UX Expert (Sally) | Portfolio Pages UX Specification | 2025-10-24*
