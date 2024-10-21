// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        action: Action.Add,
        a: 1,
        b: 2,
      }),
    ).toBe(3);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        action: Action.Subtract,
        a: 5,
        b: 3,
      }),
    ).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        action: Action.Multiply,
        a: 4,
        b: 3,
      }),
    ).toBe(12);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        action: Action.Divide,
        a: 8,
        b: 2,
      }),
    ).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        action: Action.Exponentiate,
        a: 2,
        b: 3,
      }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        action: 'invalid',
        a: 2,
        b: 3,
      }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        action: Action.Add,
        a: 'invalid',
        b: 3,
      }),
    ).toBeNull();

    expect(
      simpleCalculator({
        action: Action.Add,
        a: 2,
        b: 'invalid',
      }),
    ).toBeNull();
  });
});
