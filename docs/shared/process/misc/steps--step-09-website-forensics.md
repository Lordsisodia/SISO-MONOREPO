# Step 09: Website Forensics - Deep Technical Analysis

## Overview
Conduct forensic-level analysis of competitor websites, extracting every technical detail that influences user experience and conversion.

## Prerequisites
- Competitor list from Step 6
- Playwright MCP (headless mode)
- Network analysis tools
- Performance monitoring setup

## Input Data
**Location:** `PDR/01-discovery/competitor-matrix.json`
**Required:** List of competitor URLs to analyze

## Process & To-Do List

### 1. Technical Stack Detection
- [ ] Identify CMS/Framework (WordPress, Shopify, custom)
- [ ] Detect frontend frameworks (React, Vue, Angular)
- [ ] Find CSS frameworks (Bootstrap, Tailwind)
- [ ] Identify JavaScript libraries
- [ ] Detect analytics tools (GA, GTM, Segment)
- [ ] Find marketing tools (pixels, chat widgets)
- [ ] Check CDN usage (Cloudflare, Fastly)
- [ ] Identify hosting provider
- [ ] Detect payment processors
- [ ] Find email service providers

### 2. Performance Metrics Capture
- [ ] Run Lighthouse audit (mobile & desktop)
- [ ] Measure Time to First Byte (TTFB)
- [ ] Record First Contentful Paint (FCP)
- [ ] Track Largest Contentful Paint (LCP)
- [ ] Monitor First Input Delay (FID)
- [ ] Calculate Cumulative Layout Shift (CLS)
- [ ] Count total page weight
- [ ] List all resource requests
- [ ] Identify render-blocking resources
- [ ] Check gzip/brotli compression

### 3. Page-by-Page Analysis
For each major page type:

#### Homepage
- [ ] Full page screenshot (desktop)
- [ ] Full page screenshot (mobile)
- [ ] Above-fold screenshot
- [ ] Video record of page load
- [ ] DOM structure analysis
- [ ] Resource waterfall chart
- [ ] JavaScript execution timeline
- [ ] Critical rendering path
- [ ] Third-party script impact

#### Product/Service Pages
- [ ] Image optimization check
- [ ] Lazy loading implementation
- [ ] Interactive element timing
- [ ] Form submission flow
- [ ] Error state handling
- [ ] Loading state design
- [ ] Skeleton screen usage
- [ ] Progressive enhancement

#### Checkout/Contact
- [ ] Security indicators
- [ ] SSL certificate details
- [ ] Form field validation
- [ ] Payment gateway integration
- [ ] Trust badge placement
- [ ] Privacy policy links
- [ ] Terms acceptance flow

### 4. Mobile Experience Audit
- [ ] Responsive breakpoints used
- [ ] Touch target sizes
- [ ] Gesture support
- [ ] Mobile navigation pattern
- [ ] Viewport configuration
- [ ] Mobile-specific features
- [ ] App download prompts
- [ ] PWA capabilities check
- [ ] Offline functionality

### 5. SEO Technical Audit
- [ ] Meta tags extraction
- [ ] Schema markup detection
- [ ] Canonical URL check
- [ ] Robots.txt analysis
- [ ] XML sitemap verification
- [ ] Hreflang implementation
- [ ] Open Graph tags
- [ ] Twitter Card data
- [ ] Structured data validation

### 6. Accessibility Scan
- [ ] WCAG compliance level
- [ ] Alt text coverage
- [ ] ARIA label usage
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Color contrast ratios
- [ ] Screen reader compatibility
- [ ] Skip navigation links
- [ ] Form label associations

### 7. Security Analysis
- [ ] HTTPS enforcement
- [ ] Security headers check
- [ ] Content Security Policy
- [ ] Cookie configuration
- [ ] Input sanitization evidence
- [ ] API endpoint exposure
- [ ] Source map availability
- [ ] Vulnerable dependencies
- [ ] Information disclosure

### 8. Code Quality Indicators
- [ ] HTML validation errors
- [ ] CSS organization method
- [ ] JavaScript error logging
- [ ] Console warnings/errors
- [ ] Deprecated API usage
- [ ] Bundle size analysis
- [ ] Code splitting evidence
- [ ] Tree shaking implementation
- [ ] Minification status

## Automation Script Template
```javascript
async function forensicAnalysis(url) {
  const results = {
    url,
    timestamp: new Date(),
    technical: {},
    performance: {},
    security: {},
    seo: {},
    accessibility: {}
  };

  // Navigate and wait for full load
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Capture performance metrics
  const metrics = await page.metrics();
  const performance = await page.evaluate(() => 
    JSON.stringify(window.performance.timing)
  );
  
  // Extract all technologies
  const technologies = await page.evaluate(() => {
    // Detection logic for frameworks, libraries, etc.
  });
  
  // Take comprehensive screenshots
  await page.screenshot({ 
    path: `forensics/${domain}/full-desktop.png`, 
    fullPage: true 
  });
  
  // More forensic data collection...
  
  return results;
}
```

## Output Data
**Primary Output:** `PDR/02-forensics/[competitor-name]/technical-audit.json`
```json
{
  "url": "https://competitor.com",
  "auditDate": "2024-01-15T10:30:00Z",
  "technology": {
    "cms": "WordPress 6.4",
    "frontend": ["React 18.2", "Redux"],
    "css": ["Tailwind 3.2"],
    "analytics": ["GA4", "Hotjar"],
    "cdn": "Cloudflare",
    "hosting": "AWS us-east-1"
  },
  "performance": {
    "lighthouse": {
      "mobile": 76,
      "desktop": 94
    },
    "metrics": {
      "ttfb": "0.4s",
      "fcp": "1.2s",
      "lcp": "2.5s",
      "cls": 0.05
    },
    "resources": {
      "total": 89,
      "size": "3.2MB",
      "requests": {
        "images": 34,
        "scripts": 12,
        "stylesheets": 5
      }
    }
  },
  "security": {
    "https": true,
    "hsts": true,
    "csp": false,
    "securityHeaders": 7/10
  }
}
```

**Secondary Outputs:**
- `PDR/02-forensics/[competitor]/screenshots/` - All visual captures
- `PDR/02-forensics/[competitor]/performance/` - Detailed metrics
- `PDR/02-forensics/[competitor]/lighthouse/` - Audit reports
- `PDR/02-forensics/comparison-matrix.xlsx` - Tech stack comparison

## Quality Checks
- [ ] All competitors analyzed with same depth
- [ ] Performance tests run 3x for accuracy
- [ ] Screenshots captured at standard resolutions
- [ ] All security checks completed
- [ ] Technology detection verified
- [ ] Mobile experience fully tested

## Time Estimate
- Per competitor: 15-20 minutes
- 20 competitors: 5-7 hours
- With 8 parallel agents: 45-60 minutes

## Common Issues
- Rate limiting (add delays between requests)
- Dynamic content loading (increase wait times)
- Cookie banners blocking view (handle dismissal)
- Geographic restrictions (use VPN if needed)
- Protected assets (note but don't bypass)

## Next Step
Proceed to **Step 10: UI/UX Pattern Extraction** with forensic data

## Agent Instructions
```
AGENT TASK: Website Forensics
1. Use Playwright in headless mode
2. Capture EVERYTHING - assume nothing
3. Run performance tests 3 times, use median
4. Screenshot at 1920x1080 and 375x667
5. Extract actual values, not approximations
6. Flag any security concerns found
7. Compare against industry benchmarks
```