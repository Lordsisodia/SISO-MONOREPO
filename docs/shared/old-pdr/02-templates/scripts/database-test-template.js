// Database Test Template

import { expect, test } from '@jest/globals';
{{#imports}}
import { {{functionName}} } from '../{{modulePath}}';
{{/imports}}

describe('{{tableName}}', () => {
  beforeEach(async () => {
    {{#setup}}
    {{.}}
    {{/setup}}
  });

  afterEach(async () => {
    {{#teardown}}
    {{.}}
    {{/teardown}}
  });

  test('{{testDescription}}', async () => {
    {{testImplementation}}
    
    expect({{result}}).{{assertion}};
  });

  {{#additionalTests}}
  test('{{description}}', async () => {
    {{implementation}}
    
    expect({{result}}).{{assertion}};
  });
  {{/additionalTests}}
});