// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule, // Spread the original module to preserve unmocked functions
    mockOne: jest.fn(), // мокаем все кроме unmocked
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    const consolelogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //
    });
    mockOne();
    mockTwo();
    mockThree();
    expect(consolelogSpy).not.toHaveBeenCalled();
    consolelogSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consolelogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      //
    });
    unmockedFunction();
    expect(consolelogSpy).toHaveBeenCalled();
  });
});
