# PDR Cookbook Execution Guide

## 🚀 Quick Start for AI Agents

### Initialize New Project
```bash
# 1. Copy cookbook to new project
cp -r PDR-cookbook/ CLIENT_NAME/

# 2. Create project structure
cd CLIENT_NAME
mkdir -p client-input PDR/{01-discovery,02-planning,03-design,04-technical,05-implementation}

# 3. Start with client input
# Place raw client information in: client-input/raw-input.txt
```

### Execution Command
```
TASK: Create comprehensive PDR for [CLIENT_NAME]
INPUT: client-input/raw-input.txt
COOKBOOK: Follow PDR-cookbook steps 01-15
MODE: Autonomous with parallel agents
OUTPUT: Complete PDR in standardized format
```

## 📋 Step-by-Step Execution

### Phase 1: Discovery (2-3 hours)

#### Single Agent Flow:
1. **Step 01**: Parse client requirements → structured JSON
2. **Step 02**: Market research → industry insights
3. **Step 03**: Competitor analysis → feature matrix
4. **Step 04**: Technical research → stack recommendations

#### Parallel Agent Flow:
```
Agent 1: Step 01 (Client requirements)
Wait for completion...
Then split:
- Agent 2: Step 02 (Market research)
- Agent 3: Step 03 (Competitor analysis)
- Agent 4: Step 04 (Technical research)
```

### Phase 2: Planning (2-3 hours)

#### Tasks:
5. **Step 05**: Feature roadmap (versions 0.1 to 3.0)
6. **Step 06**: Site architecture & navigation
7. **Step 07**: Page wireframes & layouts
8. **Step 08**: UI component library
9. **Step 09**: Branding & design system

#### Parallel Opportunity:
- Wireframes and component library can be done simultaneously
- Branding can start once competitors are analyzed

### Phase 3: Technical (1-2 hours)

10. **Step 10**: Database schema design
11. **Step 11**: API integration planning
12. **Step 12**: Security & performance specs

### Phase 4: Implementation (1 hour)

13. **Step 13**: Development task breakdown
14. **Step 14**: Testing procedures
15. **Step 15**: Deployment planning

## 🔧 Tool Usage Patterns

### Web Search Pattern
```javascript
// For market research
const searches = [
  `${industry} market size ${location} 2024`,
  `${industry} trends 2024`,
  `${industry} consumer behavior ${location}`
];
// Execute in parallel, aggregate results
```

### Playwright Pattern
```javascript
// For competitor analysis
const analyzeCompetitor = async (url) => {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: `PDR/01-discovery/screenshots/${domain}-home.png`,
    fullPage: true 
  });
  // Extract features, colors, content...
};
```

### Data Storage Pattern
```javascript
// Always validate before saving
const saveData = (path, data) => {
  validateJSON(data);
  writeFile(path, JSON.stringify(data, null, 2));
  log(`Saved: ${path}`);
};
```

## 📊 Progress Tracking

### Using TodoWrite
```
At start of each step:
1. Create todos for all subtasks
2. Mark current task as "in_progress"
3. Update as each subtask completes
4. Mark step complete before moving on
```

### Quality Checkpoints
- After Phase 1: Validate all research data
- After Phase 2: Ensure feature roadmap is realistic
- After Phase 3: Verify technical feasibility
- After Phase 4: Confirm all deliverables present

## 🎯 Success Criteria

### Minimum Viable PDR
- [ ] Client requirements documented
- [ ] 5+ competitors analyzed
- [ ] Feature roadmap with 5 versions
- [ ] Wireframes for all main pages
- [ ] Database schema defined
- [ ] Testing plan created

### Excellent PDR
- [ ] All minimum requirements PLUS:
- [ ] 10+ competitors with deep analysis
- [ ] Detailed user personas
- [ ] Interactive prototypes
- [ ] Performance benchmarks
- [ ] Growth strategy included

## 🚨 Common Issues & Solutions

### Issue: Unclear client requirements
**Solution:** Create clarifications.md with specific questions, proceed with assumptions marked clearly

### Issue: No direct competitors found
**Solution:** Expand search to indirect competitors and aspirational brands from other markets

### Issue: Feature scope too large
**Solution:** Strictly enforce version limits - Day 1 max 5 features, Day 2 max 10 features

### Issue: Parallel agents conflict
**Solution:** Use unique paths for each agent, merge results after completion

## 💡 Pro Tips

1. **Start Fast**: Day 1 version should be planneable in 1 hour
2. **Think Mobile**: Every design should be mobile-first
3. **Document Why**: For each feature, document the business reason
4. **Use Templates**: Don't create new formats, use provided templates
5. **Visual > Text**: Create diagrams and wireframes whenever possible

## 📈 Metrics for Success

- **Speed**: Complete PDR in <4 hours (with parallel agents)
- **Completeness**: All required files present
- **Quality**: Passes all validation checks
- **Actionability**: Developer can start immediately
- **Client Satisfaction**: Clear vision presented

## 🔄 Continuous Improvement

After each PDR:
1. Note what took longest
2. Identify missing templates
3. Update cookbook with learnings
4. Refine time estimates
5. Improve parallel execution

---

**Remember**: The goal is a PDR so comprehensive that development can begin immediately without clarification. Every decision should be documented, every assumption noted, every feature justified.