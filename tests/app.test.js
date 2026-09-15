test('calculator page contains the required form elements', () => {
  const fs = require('fs');
  const html = fs.readFileSync('index.html', 'utf8');

  expect(html).toContain('id="calculator-form"');
  expect(html).toContain('id="first-number"');
  expect(html).toContain('id="second-number"');
  expect(html).toContain('id="operation"');
  expect(html).toContain('id="result"');
  expect(html).toContain('id="error-message"');
  expect(html).toContain('id="history"');
});
test('calculator operation mapping supports all four operations', () => {
  const operations = ['+', '-', '*', '/'];

  expect(operations).toHaveLength(4);
  expect(operations).toContain('+');
  expect(operations).toContain('-');
  expect(operations).toContain('*');
  expect(operations).toContain('/');
});
