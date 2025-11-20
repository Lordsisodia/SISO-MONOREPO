# Database Schema Template

## {{projectName}} Database Design

### Entity Relationship Diagram
```
[Diagram would be inserted here]
```

### Tables

{{#tables}}
#### {{tableName}}
**Description:** {{description}}

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
{{#columns}}
| {{name}} | {{dataType}} | {{constraints}} | {{description}} |
{{/columns}}

{{/tables}}

### Relationships
{{#relationships}}
- {{.}}
{{/relationships}}

### Indexes
{{#indexes}}
- {{.}}
{{/indexes}}