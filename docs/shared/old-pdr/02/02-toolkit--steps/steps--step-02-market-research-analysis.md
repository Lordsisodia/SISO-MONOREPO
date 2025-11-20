# Step 02: Market Research & Analysis

## Overview
Conduct comprehensive market research to understand the industry landscape, trends, and opportunities for the client's business.

## Prerequisites
- Completed Step 01 (Client Requirements Analysis)
- Access to web search tools (MCP or similar)
- Client requirements JSON available

## Input Data
**Location:** `PDR/01-discovery/client-requirements.json`
**Additional:** Web search results, industry reports

## Process & To-Do List

### 1. Industry Overview Research
- [ ] Search for "[Industry] market size [Location] 2024"
- [ ] Find industry growth rate and projections
- [ ] Identify top 5 industry trends for current year
- [ ] Research regulatory environment and compliance requirements
- [ ] Find industry-specific challenges and opportunities
- [ ] Document key industry associations and resources

### 2. Target Market Analysis
- [ ] Search demographic data for target location
- [ ] Research purchasing behavior in the industry
- [ ] Find consumer spending patterns
- [ ] Identify seasonal trends if applicable
- [ ] Research device usage statistics (mobile vs desktop)
- [ ] Analyze social media platform preferences

### 3. Local Market Specifics
- [ ] Search "[City/Region] [Industry] statistics"
- [ ] Find local competition density
- [ ] Research local consumer preferences
- [ ] Identify local economic factors
- [ ] Find regional pricing benchmarks
- [ ] Document local marketing channels

### 4. Digital Landscape Analysis
- [ ] Research online shopping behavior in the market
- [ ] Find digital adoption rates
- [ ] Identify popular payment methods
- [ ] Research delivery/service expectations
- [ ] Analyze customer review importance
- [ ] Document trust factors for online businesses

### 5. Keyword & Search Behavior
- [ ] Identify top 20 keywords for the industry
- [ ] Research search volume trends
- [ ] Find long-tail keyword opportunities
- [ ] Analyze search intent patterns
- [ ] Document seasonal search variations
- [ ] Identify content gaps in the market

### 6. Compile Market Insights
- [ ] Create market size visualization
- [ ] Build customer journey map
- [ ] Generate opportunity matrix
- [ ] Compile trend analysis report
- [ ] Create competitive landscape overview
- [ ] Generate actionable recommendations

## Parallel Agent Execution
**Note:** These searches can be run in parallel by multiple agents:
```
Agent 1: Industry overview and trends
Agent 2: Demographics and target market
Agent 3: Local market specifics
Agent 4: Digital behavior and keywords
```

## Output Data
**Primary Output:** `PDR/01-discovery/market-research.json`
```json
{
  "industry": {
    "marketSize": "",
    "growthRate": "",
    "trends": [],
    "challenges": [],
    "regulations": []
  },
  "targetMarket": {
    "size": "",
    "demographics": {},
    "behavior": {},
    "preferences": {}
  },
  "digital": {
    "adoptionRate": "",
    "platforms": [],
    "paymentMethods": [],
    "searchBehavior": {}
  },
  "keywords": {
    "primary": [],
    "longtail": [],
    "seasonal": {},
    "intent": {}
  },
  "opportunities": [],
  "recommendations": []
}
```

**Secondary Outputs:**
- `PDR/01-discovery/market-summary.md` - Executive summary
- `PDR/01-discovery/market-visuals/` - Charts and graphs
- `PDR/01-discovery/keyword-research.csv` - Detailed keyword data
- `PDR/01-discovery/opportunity-matrix.md` - Strategic opportunities

## Search Queries Template
```
# Industry Overview
"[industry] market size [location] 2024"
"[industry] industry trends 2024"
"[industry] growth projections 2025"
"[industry] regulations [location]"

# Target Market
"[location] demographics 2024"
"[industry] consumer behavior [location]"
"online shopping statistics [location] 2024"

# Competition
"top [industry] companies [location]"
"[industry] market share [location]"

# Keywords
"[product/service] search volume"
"[industry] keywords trending 2024"
```

## Quality Checks
- [ ] All data is from reputable sources
- [ ] Statistics are current (within 12 months)
- [ ] Local market data is specific to client's area
- [ ] Insights are actionable, not just informational
- [ ] All sources are documented

## Time Estimate
- AI Agents (parallel): 30-45 minutes
- Compilation: 15 minutes
- Human Review: 10 minutes

## Common Pitfalls
- Using outdated statistics
- Ignoring local market nuances
- Over-generalizing from national data
- Missing niche-specific trends
- Not considering mobile-first markets

## Next Step
Proceed to **Step 03: Competitor Analysis** with market insights

## Agent Instructions
```
AGENT TASK: Market Research
1. Load client requirements from Step 01
2. Execute searches based on templates
3. Prioritize recent data (2023-2024)
4. Focus on location-specific insights
5. Document all sources
6. Create visual representations where helpful
7. Generate actionable recommendations
```