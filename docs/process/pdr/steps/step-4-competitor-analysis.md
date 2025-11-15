# Step 4: Competitor Analysis

## Purpose
Conduct detailed analysis of competitor websites and business offerings.

## Input Data Location
- Competitor list: `research/competitors/list.json`
- Competitor analysis results: `research/competitors/analysis/`

## Process
1. For each competitor:
   a. Use Playwright/MCP headless browser to access website
   b. Capture full-page screenshots
   c. Analyze website structure and navigation
   d. Document key features and functionalities
   e. Extract value propositions and marketing messages
   f. Identify UI/UX elements and design patterns
   g. Note technical implementations (if identifiable)
2. Compile comparative analysis across competitors
3. Identify common patterns and unique differentiators
4. Document strengths and weaknesses of each competitor

## Analysis Areas
- Website structure and navigation
- Key features and functionalities
- Content strategy and messaging
- Visual design and branding
- User experience patterns
- Technical implementations
- Marketing approaches
- Customer engagement methods

## Tools and Methods
- Playwright/MCP headless browser
- Screenshot capture and annotation
- Web scraping for structured data
- Manual analysis for qualitative elements
- Comparison matrices

## Output Data Location
- Individual competitor analysis: `research/competitors/analysis/{competitor-id}.json`
- Comparative analysis: `research/competitors/comparative-analysis.md`
- Screenshot repository: `research/competitors/screenshots/`
- Feature compilation: `research/competitors/features.md`

## Success Criteria
- Detailed analysis of each competitor's website
- Comprehensive feature compilation
- Clear identification of market patterns
- Documented strengths and weaknesses
- Visual documentation through screenshots
- Comparative insights across competitors

## Template Files Used
- `templates/competitor-analysis-schema.json`
- `templates/comparative-analysis-template.md`
- `templates/features-compilation-template.md`

## Next Steps
Proceed to Feature Planning (Step 5) using competitor analysis findings.