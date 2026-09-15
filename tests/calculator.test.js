const { add, subtract, multiply, divide } = require('../src/calculator');

test('adds two numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});

test('subtracts two numbers correctly', () => {
  expect(subtract(5, 3)).toBe(2);
});
test('multiplies two numbers correctly', () => {
  expect(multiply(4, 3)).toBe(12);
});
test('divides two numbers correctly', () => {
  expect(divide(12, 3)).toBe(4);
});
test('throws an error when dividing by zero', () => {
  expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
});
test('handles negative numbers correctly', () => {
  expect(add(-5, 3)).toBe(-2);
  expect(subtract(-5, 3)).toBe(-8);
  expect(multiply(-5, 3)).toBe(-15);
  expect(divide(-6, 3)).toBe(-2);
});
test('handles decimal numbers correctly', () => {
  expect(add(2.5, 1.5)).toBe(4);
  expect(subtract(5.5, 2.5)).toBe(3);
  expect(multiply(2.5, 2)).toBe(5);
  expect(divide(7.5, 2.5)).toBe(3);
});
test('handles zero correctly', () => {
  expect(add(0, 5)).toBe(5);
  expect(subtract(0, 5)).toBe(-5);
  expect(multiply(0, 5)).toBe(0);
  expect(divide(0, 5)).toBe(0);
});
