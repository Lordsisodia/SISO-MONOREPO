# Feature Schedule Template

## {{featureName}} Development Schedule

### Feature Overview
**Feature Name:** {{featureName}}
**Category:** {{featureCategory}}
**Priority:** {{priority}}
**Version:** {{version}}

### Dependencies
{{#dependencies}}
- {{.}}
{{/dependencies}}

### Development Tasks
{{#tasks}}
#### {{name}}
**Description:** {{description}}
**Estimated Time:** {{estimatedTime}}
**Assigned To:** {{assignedTo}}
**Status:** {{status}}

**Subtasks:**
{{#subtasks}}
- {{.}}
{{/subtasks}}

**Deliverables:**
{{#deliverables}}
- {{.}}
{{/deliverables}}
{{/tasks}}

### Milestones
{{#milestones}}
- **{{name}}** ({{date}}): {{description}}
{{/milestones}}

### Testing Requirements
{{#testingRequirements}}
- {{.}}
{{/testingRequirements}}

### Success Criteria
{{#successCriteria}}
- {{.}}
{{/successCriteria}}