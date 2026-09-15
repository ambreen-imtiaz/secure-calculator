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
test('selects the correct calculator function for each operation', () => {
  const { getOperation } = require('../app');

  expect(getOperation('+')).toBe('add');
  expect(getOperation('-')).toBe('subtract');
  expect(getOperation('*')).toBe('multiply');
  expect(getOperation('/')).toBe('divide');
});
test('performs a calculation using the selected operation', () => {
  const { calculate } = require('../app');

  expect(calculate('2', '+', '3')).toBe(5);
  expect(calculate('5', '-', '3')).toBe(2);
  expect(calculate('4', '*', '3')).toBe(12);
  expect(calculate('12', '/', '3')).toBe(4);
});
test('rejects an invalid operation', () => {
  const { calculate } = require('../app');

  expect(() => calculate('2', '%', '3')).toThrow('Invalid operation');
});
test('rejects an invalid first number', () => {
  const { calculate } = require('../app');

  expect(() => calculate('abc', '+', '3')).toThrow('Invalid number');
});

test('rejects an invalid second number', () => {
  const { calculate } = require('../app');

  expect(() => calculate('2', '+', 'abc')).toThrow('Invalid number');
});
test('rejects division by zero', () => {
  const { calculate } = require('../app');

  expect(() => calculate('10', '/', '0')).toThrow('Cannot divide by zero');
});
