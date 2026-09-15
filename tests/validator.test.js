const { isValidNumber } = require('../src/validator');

test('accepts valid numbers', () => {
  expect(isValidNumber('5')).toBe(true);
  expect(isValidNumber('-5')).toBe(true);
  expect(isValidNumber('2.5')).toBe(true);
  expect(isValidNumber('0')).toBe(true);
});

test('rejects invalid numbers', () => {
  expect(isValidNumber('abc')).toBe(false);
  expect(isValidNumber('')).toBe(false);
  expect(isValidNumber('   ')).toBe(false);
});
test('rejects numbers with surrounding whitespace', () => {
  expect(isValidNumber(' 5')).toBe(false);
  expect(isValidNumber('5 ')).toBe(false);
  expect(isValidNumber(' 5 ')).toBe(false);
});
test('rejects non-string values', () => {
  expect(isValidNumber(null)).toBe(false);
  expect(isValidNumber(undefined)).toBe(false);
  expect(isValidNumber(5)).toBe(false);
  expect(isValidNumber({})).toBe(false);
});
test('rejects unsupported numeric formats', () => {
  expect(isValidNumber('0x10')).toBe(false);
  expect(isValidNumber('1e3')).toBe(false);
  expect(isValidNumber('5.')).toBe(false);
});
