// Uncomment the code below and write your tests
import _ from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(50);
    expect(() => account.withdraw(60)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(50);
    const friend = getBankAccount(100);
    expect(() => account.transfer(60, friend)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    // Write your test here
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(100);
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(0);
    expect(account2.getBalance()).toBe(200);
  });

  test('fetchBalance should return a number when request is successful', async () => {
    //мокаем -- он блочит random который в оригинальном методе и верент 75 и 1
    _.random = jest.fn().mockReturnValueOnce(75).mockReturnValueOnce(1); // Mock success case, для первого рандома в метоже  он вернет 75, для второго 1
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(balance).toBe(75); // Expecting the mocked value
  });

  test('should set new balance if fetchBalance returned a number', async () => {
    _.random = jest.fn().mockReturnValueOnce(50).mockReturnValueOnce(1);

    const account = getBankAccount(100);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(50); // Expecting the mocked value
  });

  test('should throw SynchronizationFailedError if fetchBalance returns null', async () => {
    _.random = jest.fn().mockReturnValueOnce(50).mockReturnValueOnce(0); // Mock failure case

    const account = getBankAccount(100);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
