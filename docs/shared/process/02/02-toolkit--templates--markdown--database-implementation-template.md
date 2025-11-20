# Database Implementation Template

## {{tableName}} Table Implementation

### Table Schema
**Table Name:** {{tableName}}
**Description:** {{tableDescription}}

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
{{#columns}}
| {{name}} | {{dataType}} | {{constraints}} | {{description}} |
{{/columns}}

### Relationships
{{#relationships}}
- {{.}}
{{/relationships}}

### Indexes
{{#indexes}}
- {{.}}
{{/indexes}}

### Implementation Plan
1. Create migration script
2. Implement table creation
3. Add constraints and indexes
4. Create seed data
5. Write database tests
6. Document table API

### Migration Script
```sql
{{migrationScript}}
```

### Seed Data
```json
{{seedData}}
```

### Queries
{{#queries}}
#### {{name}}
```sql
{{sql}}
```
**Parameters:** {{parameters}}
**Returns:** {{returns}}
{{/queries}}

### Testing
**Test Scenarios:**
{{#testScenarios}}
- {{.}}
{{/testScenarios}}

### Documentation
**Usage Examples:**
{{#usageExamples}}
```javascript
{{.}}
```
{{/usageExamples}}