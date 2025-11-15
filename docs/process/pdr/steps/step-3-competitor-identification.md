# Step 3: Competitor Identification

## Purpose
Identify and categorize the client's direct and indirect competitors.

## Input Data Location
- Structured client data: `client-input/structured.json`
- Market research findings: `research/market/`
- Competitor list: `research/competitors/list.json`

## Process
1. Generate initial competitor search terms from client data
2. Conduct web searches to identify competitors
3. Categorize competitors:
   - Direct competitors (similar business, same target market)
   - Indirect competitors (different business, same target market)
   - Market leaders
   - Local/regional competitors
4. Validate competitor relevance
5. Document competitor basic information

## Information to Collect for Each Competitor
- Business name
- Website URL
- Business description
- Target market
- Geographic focus
- Key products/services
- Market position

## Tools and Methods
- Web search using Google Search API
- Business directory searches
- Industry association websites
- Social media platform searches

## Output Data Location
- Competitor list: `research/competitors/list.json`
- Competitor categorization: `research/competitors/categorization.md`
- Competitor summary: `research/competitors/summary.md`

## Success Criteria
- Comprehensive list of relevant competitors
- Clear categorization of competitor types
- Basic information for each competitor
- Justification for inclusion of each competitor

## Template Files Used
- `templates/competitor-list-schema.json`
- `templates/competitor-summary-template.md`

## Next Steps
Proceed to Competitor Analysis (Step 4) using the competitor list.