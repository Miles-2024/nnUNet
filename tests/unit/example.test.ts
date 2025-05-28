// tests/unit/example.test.ts
import { expect, test, describe } from 'vitest';

describe('Simple Math Test', () => {
  test('should add two numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });
});

// Example test for a hypothetical utility function
// function sum(a: number, b: number) { return a + b; }
// describe('Sum Function', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });
