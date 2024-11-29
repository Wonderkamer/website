import { toBoolean } from './to-boolean';

describe('toBoolean', () => {
  // Test cases for string inputs
  describe('when value is a string', () => {
    it('returns true for valid true strings', () => {
      expect(toBoolean('true')).toBe(true);
      expect(toBoolean('t')).toBe(true);
      expect(toBoolean('yes')).toBe(true);
      expect(toBoolean('y')).toBe(true);
      expect(toBoolean('on')).toBe(true);
      expect(toBoolean('1')).toBe(true);
      expect(toBoolean(' TRUE ')).toBe(true); // Case-insensitive and trimmed
    });

    it('returns false for invalid or empty strings', () => {
      expect(toBoolean('false')).toBe(false);
      expect(toBoolean('no')).toBe(false);
      expect(toBoolean('off')).toBe(false);
      expect(toBoolean('0')).toBe(false);
      expect(toBoolean('')).toBe(false);
      expect(toBoolean('random text')).toBe(false);
    });
  });

  // Test cases for number inputs
  describe('when value is a number', () => {
    it('returns true for 1 or any non-zero number', () => {
      expect(toBoolean(1)).toBe(true);
      expect(toBoolean(42)).toBe(true);
      expect(toBoolean(-1)).toBe(true);
    });

    it('returns false for 0', () => {
      expect(toBoolean(0)).toBe(false);
    });
  });

  // Test cases for boolean inputs
  describe('when value is a boolean', () => {
    it('returns the boolean value as is', () => {
      expect(toBoolean(true)).toBe(true);
      expect(toBoolean(false)).toBe(false);
    });
  });

  // Test cases for null and undefined
  describe('when value is null or undefined', () => {
    it('returns false', () => {
      expect(toBoolean(null)).toBe(false);
      expect(toBoolean(undefined)).toBe(false);
    });
  });

  // Test cases for other types
  describe('when value is of other types', () => {
    it('returns false for objects, arrays, and functions', () => {
      expect(toBoolean({})).toBe(false);
      expect(toBoolean([])).toBe(false);
      expect(toBoolean(() => {})).toBe(false);
    });
  });
});
