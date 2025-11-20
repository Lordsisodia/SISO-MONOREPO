# Step 1: Client Information Collection

## Purpose
Gather and structure all initial client information to form the foundation of the PDR.

## Input Data Location
- Raw client input: `client-input/raw.txt`
- Structured client data: `client-input/structured.json`

## Process
1. Parse client's initial request
2. Extract key information:
   - Business name and description
   - Products/services offered
   - Target market and demographics
   - Geographic location
   - Business goals and objectives
   - Preferred timeline
   - Budget considerations (if provided)
3. Structure data in JSON format
4. Save to `client-input/structured.json`

## Output Data Location
- Structured client data: `client-input/structured.json`
- Processed client summary: `client-input/summary.md`

## Success Criteria
- All client-provided information is captured
- Data is structured for easy AI processing
- JSON format validates against schema
- Summary document is human-readable

## Template Files Used
- `templates/client-input-schema.json`
- `templates/client-summary-template.md`

## Next Steps
Proceed to Market Research (Step 2) using the structured client data.