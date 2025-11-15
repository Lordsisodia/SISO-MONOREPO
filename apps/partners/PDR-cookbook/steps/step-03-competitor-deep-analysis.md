# Step 03: Competitor Deep Analysis

## Overview
Conduct thorough competitor analysis using automated tools to understand their offerings, design patterns, features, and strategies.

## Prerequisites
- Completed Step 02 (Market Research)
- Playwright MCP configured (headless mode)
- Web search capabilities
- Screenshot storage setup

## Input Data
**Location:** 
- `PDR/01-discovery/client-requirements.json`
- `PDR/01-discovery/market-research.json`

## Process & To-Do List

### 1. Competitor Identification
- [ ] Search for "best [industry] [location]" 
- [ ] Find "top [product/service] providers [location]"
- [ ] Identify direct competitors (same products/services)
- [ ] Identify indirect competitors (solve same problem differently)
- [ ] Find aspirational competitors (best in class globally)
- [ ] Create list of 5-10 competitors to analyze

### 2. Automated Website Analysis (Per Competitor)
Using Playwright MCP in headless mode:

#### Homepage Analysis
- [ ] Navigate to competitor website
- [ ] Take full-page screenshot
- [ ] Capture above-the-fold screenshot
- [ ] Extract hero section text and CTA
- [ ] Document loading time
- [ ] Identify trust signals (testimonials, certifications)
- [ ] Extract value proposition

#### Feature Discovery
- [ ] Navigate through main menu items
- [ ] Screenshot key feature pages
- [ ] Document all interactive elements
- [ ] Identify unique features
- [ ] Note payment options
- [ ] Find integration partners
- [ ] Document customer support options

#### Design Analysis
- [ ] Extract color scheme (primary, secondary, accent)
- [ ] Identify font families used
- [ ] Document layout patterns
- [ ] Note animation/interaction styles
- [ ] Capture mobile responsive behavior
- [ ] Document UI component library

#### Content Strategy
- [ ] Analyze blog/content section
- [ ] Document content types
- [ ] Note update frequency
- [ ] Identify SEO strategies
- [ ] Extract social proof elements
- [ ] Document email capture strategies

### 3. Feature Compilation Matrix
- [ ] Create comprehensive feature list
- [ ] Mark features by competitor presence
- [ ] Categorize features (core, nice-to-have, innovative)
- [ ] Identify industry-standard features
- [ ] Find unique differentiators
- [ ] Note missing opportunities

### 4. Pricing & Business Model Analysis
- [ ] Document pricing structures
- [ ] Identify revenue models
- [ ] Note free vs paid features
- [ ] Find upsell strategies
- [ ] Document guarantee/refund policies
- [ ] Analyze value positioning

### 5. Technical Analysis
- [ ] Check page load speeds
- [ ] Test mobile responsiveness
- [ ] Verify SSL certificates
- [ ] Check accessibility compliance
- [ ] Analyze SEO implementation
- [ ] Document tech stack (where visible)

### 6. Synthesis & Recommendations
- [ ] Create competitor comparison matrix
- [ ] Identify best practices to adopt
- [ ] Find gaps in the market
- [ ] Generate differentiation strategies
- [ ] Create feature priority list
- [ ] Document "must-have" vs "nice-to-have"

## Playwright Automation Script
```javascript
// Headless competitor analysis
const analyzeCompetitor = async (url) => {
  // Navigate and screenshot
  await page.goto(url);
  await page.screenshot({ path: `competitors/${domain}/homepage.png`, fullPage: true });
  
  // Extract key elements
  const heroText = await page.$eval('.hero', el => el.textContent);
  const features = await page.$$eval('.feature', els => els.map(el => el.textContent));
  
  // Navigate key pages
  const pages = ['features', 'pricing', 'about', 'contact'];
  for (const pageName of pages) {
    await page.goto(`${url}/${pageName}`);
    await page.screenshot({ path: `competitors/${domain}/${pageName}.png` });
  }
};
```

## Output Data
**Primary Output:** `PDR/01-discovery/competitor-analysis.json`
```json
{
  "competitors": [{
    "name": "",
    "url": "",
    "type": "direct|indirect|aspirational",
    "features": {
      "core": [],
      "unique": [],
      "missing": []
    },
    "design": {
      "colors": {},
      "typography": {},
      "style": ""
    },
    "pricing": {},
    "strengths": [],
    "weaknesses": []
  }],
  "marketInsights": {
    "standardFeatures": [],
    "innovations": [],
    "gaps": []
  },
  "recommendations": {
    "mustHave": [],
    "shouldHave": [],
    "niceToHave": [],
    "differentiators": []
  }
}
```

**Secondary Outputs:**
- `PDR/01-discovery/competitor-screenshots/` - All screenshots
- `PDR/01-discovery/feature-matrix.md` - Comparison table
- `PDR/01-discovery/competitor-summary.md` - Executive summary
- `PDR/01-discovery/differentiation-strategy.md` - How to stand out

## Quality Checks
- [ ] All major competitors analyzed
- [ ] Screenshots are clear and complete
- [ ] Features are comprehensively documented
- [ ] Technical assessments are accurate
- [ ] Recommendations are actionable
- [ ] Differentiation opportunities identified

## Time Estimate
- AI Agents (parallel): 45-60 minutes
- Screenshot processing: 20 minutes
- Analysis compilation: 20 minutes
- Human Review: 15 minutes

## Common Pitfalls
- Analyzing outdated versions (check last update)
- Missing mobile-specific features
- Overlooking local competitors
- Focusing only on design, not functionality
- Not documenting pricing models

## Next Step
Proceed to **Step 04: Technical Stack Research** with competitor insights

## Agent Instructions
```
AGENT TASK: Competitor Analysis
1. Use Playwright in headless mode only
2. Run parallel analysis for multiple competitors
3. Organize screenshots by competitor/page
4. Extract actual data, not just observe
5. Focus on features client can realistically implement
6. Identify both standard and innovative elements
7. Create visual comparison matrices
```