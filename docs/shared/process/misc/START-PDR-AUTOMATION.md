# 🤖 PDR Automation Launcher

## One-Command PDR Generation

### For Claude Code Execution
```bash
# Copy this entire block and execute:

# 1. Setup
PROJECT_NAME="NEW_CLIENT"
cp -r PDR-cookbook/ $PROJECT_NAME/
cd $PROJECT_NAME
mkdir -p client-input PDR/{01-discovery,02-planning,03-design,04-technical,05-implementation}

# 2. Create automation task
echo "Create comprehensive PDR following PDR-cookbook/EXECUTION-GUIDE.md
Use parallel agents where possible.
Input: client-input/raw-input.txt
Time limit: 4 hours
Auto-progress through all steps." > START-AUTOMATION.txt
```

### Automation Instruction for AI
```
AUTONOMOUS PDR GENERATION TASK

OBJECTIVE: Generate complete PDR autonomously
COOKBOOK: Follow PDR-cookbook steps 01-15
APPROACH: Maximum automation, minimal human input

EXECUTION STEPS:
1. Read client-input/raw-input.txt
2. Initialize TodoWrite with all 15 steps
3. Execute Phase 1 (Steps 1-4) with parallel agents
4. Execute Phase 2 (Steps 5-9) with parallel agents  
5. Execute Phase 3 (Steps 10-12) with parallel agents
6. Execute Phase 4 (Steps 13-15) sequentially
7. Generate final PDR document
8. Create executive summary

PARALLEL EXECUTION MAP:
Phase 1: After Step 1, run Steps 2,3,4 in parallel
Phase 2: Run Steps 7,8 in parallel after Step 6
Phase 3: Run Steps 11,12 in parallel after Step 10

USE THESE TOOLS:
- Task: For parallel agent execution
- WebSearch: For market research
- Puppeteer: For competitor screenshots (headless)
- TodoWrite: Track all progress
- Read/Write: File operations

QUALITY STANDARDS:
- Every step must have outputs in correct location
- All JSON must validate
- All screenshots must be captured
- Every feature must have user story
- Version roadmap must be realistic

OUTPUT LOCATIONS:
See config/master-config.json for exact paths

BEGIN AUTOMATION NOW.
```

## 🚀 Quick Commands for Common Scenarios

### E-commerce Site PDR
```
SCENARIO: E-commerce
FOCUS: Product catalog, cart, checkout, payments
VERSIONS: Prioritize quick launch with Stripe
COMPETITORS: Analyze Shopify stores
```

### Service Business PDR
```
SCENARIO: Service business  
FOCUS: Booking, calendar, service showcase
VERSIONS: Simple booking in v0.5
COMPETITORS: Local service providers
```

### SaaS Platform PDR
```
SCENARIO: SaaS startup
FOCUS: User dashboard, subscriptions, API
VERSIONS: Waitlist in v0.1, MVP in v1.0
COMPETITORS: Similar SaaS tools
```

## 📊 Monitoring Progress

### Real-time Status Check
```
CHECK STATUS:
1. View TodoWrite list
2. Check completed steps
3. Verify output files exist
4. Monitor time elapsed
```

### Quality Verification
```
VERIFY EACH PHASE:
- Phase 1: Research data fresh? Competitors analyzed?
- Phase 2: Wireframes created? Features prioritized?
- Phase 3: Database designed? APIs documented?
- Phase 4: Tests planned? Deployment ready?
```

## 🔥 Turbo Mode Instructions

### For Urgent Projects (2-hour PDR)
```
TURBO MODE ACTIVE:
- Limit to 5 competitors
- Focus on v0.1 and v1.0 only  
- Skip advanced features
- Use templates extensively
- Parallel everything possible
- Skip nice-to-have research
```

### Parallel Agent Orchestration
```
MAXIMUM PARALLEL EXECUTION:

START: 4 agents simultaneously
Agent 1: Client requirements
Agent 2: Start market research (use assumptions)
Agent 3: Find competitors (start immediately)
Agent 4: Prepare templates and structure

MERGE POINT 1: After client requirements
- Update all agents with client data
- Refine research queries
- Target specific competitors

SPLIT AGAIN: 
Agent 1: Deep competitor analysis
Agent 2: Feature extraction
Agent 3: Design patterns
Agent 4: Technical requirements

Continue pattern through all phases...
```

## ⚡ Emergency Procedures

### If Blocked on Client Info
```
CREATE: assumptions.md
DOCUMENT: All assumptions made
MARK: Clearly as "NEEDS CONFIRMATION"
CONTINUE: With reasonable defaults
```

### If No Competitors Found
```
EXPAND: Search geography
USE: Related industries
ANALYZE: International best-in-class
DOCUMENT: Why direct competitors missing
```

### If Scope Too Large
```
ENFORCE: Strict version limits
CUT: Nice-to-have features
FOCUS: Core business needs
DEFER: Advanced features to v2.0+
```

## 🎯 Final Checklist

Before marking PDR complete:
- [ ] All 15 steps have outputs
- [ ] Version roadmap is realistic
- [ ] Wireframes cover main flows
- [ ] Database supports all features
- [ ] Test plans are comprehensive
- [ ] Deployment steps are clear
- [ ] Executive summary is created
- [ ] All files in correct locations

## 🚦 GO Signal

```
To start autonomous PDR generation:
1. Ensure client-input/raw-input.txt exists
2. Copy this entire file's automation instruction
3. Execute with maximum agent capability
4. Monitor progress via TodoWrite
5. Review final PDR after 4 hours
```

**LET'S BUILD SOMETHING AMAZING! 🚀**