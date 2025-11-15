# Comparative Analysis Template

## Competitive Analysis for {{clientName}}

### Feature Comparison

| Feature | {{#competitors}}{{name}} | {{/competitors}}Client Requirement |
|---------|{{#competitors}}---------|{{/competitors}}-------------------|
{{#featureComparison}}
| {{feature}} |{{#competitorFeatures}} {{.}} |{{/competitorFeatures}} {{clientRequirement}} |
{{/featureComparison}}

### Common Patterns
{{#commonPatterns}}
- {{.}}
{{/commonPatterns}}

### Unique Differentiators
{{#uniqueDifferentiators}}
- {{.}}
{{/uniqueDifferentiators}}

### Market Positioning
{{marketPositioning}}

### Recommendations
{{#recommendations}}
- {{.}}
{{/recommendations}}