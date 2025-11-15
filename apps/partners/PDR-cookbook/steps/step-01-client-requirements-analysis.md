# Step 01: Client Requirements Analysis

## Overview
Transform raw client input into structured, actionable requirements that form the foundation of the entire project.

## Prerequisites
- Client has provided initial business information
- PDR folder structure is created

## Input Data
**Location:** `client-input/raw-input.txt` or form submission
**Format:** Unstructured text, form data, or conversation transcript

## Process & To-Do List

### 1. Parse Client Input
- [ ] Read raw client input from designated location
- [ ] Identify key business information sections
- [ ] Extract all mentioned requirements, goals, and constraints
- [ ] Note any ambiguities for clarification

### 2. Structure Core Business Information
- [ ] **Business Name:** Extract and validate
- [ ] **Business Type:** Categorize (e-commerce, service, portfolio, etc.)
- [ ] **Industry/Niche:** Identify specific market segment
- [ ] **Products/Services:** List all offerings with descriptions
- [ ] **Unique Value Proposition:** What sets them apart
- [ ] **Mission Statement:** If provided or infer from context

### 3. Identify Target Audience
- [ ] **Primary Demographics:** Age, gender, income, education
- [ ] **Geographic Location:** Country, region, city specifics
- [ ] **Psychographics:** Interests, values, lifestyle
- [ ] **Pain Points:** Problems the business solves
- [ ] **User Personas:** Create 2-3 initial personas

### 4. Extract Business Goals
- [ ] **Primary Objective:** Main goal for the website
- [ ] **Secondary Objectives:** Supporting goals
- [ ] **Success Metrics:** How they measure success
- [ ] **Timeline Expectations:** Urgency and milestones
- [ ] **Budget Range:** If provided
- [ ] **Growth Plans:** Future expansion considerations

### 5. Technical Requirements
- [ ] **Existing Assets:** Current website, social media, branding
- [ ] **Integration Needs:** CRM, payment systems, APIs
- [ ] **Content Management:** Who will update content
- [ ] **Special Features:** Any specific functionality requested
- [ ] **Compliance Needs:** GDPR, accessibility, industry regulations

### 6. Create Structured Output
- [ ] Generate `client-requirements.json` with all structured data
- [ ] Create `client-summary.md` for human review
- [ ] Build `clarification-needed.md` for ambiguous items
- [ ] Generate `initial-scope.md` outlining project boundaries

## Output Data
**Primary Output:** `PDR/01-discovery/client-requirements.json`
```json
{
  "business": {
    "name": "",
    "type": "",
    "industry": "",
    "description": "",
    "uniqueValue": ""
  },
  "target": {
    "demographics": {},
    "geography": {},
    "personas": []
  },
  "goals": {
    "primary": "",
    "secondary": [],
    "metrics": [],
    "timeline": "",
    "budget": ""
  },
  "technical": {
    "integrations": [],
    "features": [],
    "compliance": []
  }
}
```

**Secondary Outputs:**
- `PDR/01-discovery/client-summary.md` - Executive summary
- `PDR/01-discovery/clarifications.md` - Questions for client
- `PDR/01-discovery/initial-scope.md` - Project boundaries

## Quality Checks
- [ ] All client-provided information is captured
- [ ] JSON validates against schema
- [ ] No critical information is missing
- [ ] Ambiguities are documented
- [ ] Summary is clear and concise

## Time Estimate
- AI Agent: 15-30 minutes
- Human Review: 5-10 minutes

## Common Pitfalls
- Missing implied requirements
- Not identifying target audience clearly
- Overlooking compliance needs
- Assuming technical capabilities

## Next Step
Proceed to **Step 02: Market Research & Analysis** with structured client data

## Agent Instructions
```
AGENT TASK: Client Requirements Analysis
1. Read input from specified location
2. Follow the to-do list sequentially
3. Check each item as completed
4. Save outputs to exact locations specified
5. Flag any unclear items for human review
6. Validate JSON before saving
```