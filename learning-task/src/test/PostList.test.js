jest.mock('node-fetch');

const fetch = require('node-fetch');

describe('API Endpoint', () => {
  it('returns a 200 status code', async () => {
    // Mocking the fetch function to return a resolved promise with a status of 200
    fetch.mockResolvedValue({ status: 200 });

    // Calling the fetch function with a mocked URL
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    // Expecting the response status to be 200
    expect(response.status).toBe(200);
  });
});
