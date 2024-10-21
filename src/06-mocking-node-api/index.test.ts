// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsAsync from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByTimeout(callback, 100);

    expect(callback).not.toHaveBeenCalled();
    // спровоцировать таймаут
    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 100);

    // вызвать один раз
    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const callback = jest.fn();
    doStuffByInterval(callback, 100);

    // вызвать три раза
    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = '/mock/path/file.txt';
  const mockContent = 'File content';
  test('should call join with pathToFile', async () => {
    // Write your test here
    path.join = jest.fn().mockReturnValue(mockPath);
    await readFileAsynchronously(mockPath);
    expect(path.join).toHaveBeenCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    path.join = jest.fn().mockReturnValue(mockPath);
    fs.existsSync = jest.fn().mockReturnValue(false);
    const result = await readFileAsynchronously(mockPath);
    expect(fs.existsSync).toHaveBeenCalledWith(mockPath);
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    // Write your test here
    fs.existsSync = jest.fn().mockReturnValue(true);
    fsAsync.readFile = jest.fn().mockResolvedValue(Buffer.from(mockContent));
    const result = await readFileAsynchronously('file.txt');
    expect(result).toBe(mockContent);
  });
});
