// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const mockResponseData = { data: 'test data' };

  test('should create instance with provided base url', async () => {
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponseData),
    });
    await throttledGetDataFromApi('/posts/1');
    // Check if axios.create was called with the correct baseURL
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi('/posts/1');

    // Check if the response data is returned correctly
    expect(result).toEqual(mockResponseData.data);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: mockResponseData });
    axios.create = jest.fn().mockReturnValue({ get: mockGet });

    const result = await throttledGetDataFromApi('/posts/1');
    expect(result).toBe(mockResponseData.data);
  });
});
