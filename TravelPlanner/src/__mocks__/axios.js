const axiosMock = jest.createMockFromModule('axios');

// Mocking the get request for '/destinations' endpoint
axiosMock.get.mockImplementation((url) => {
  if (url === '/destinations') {
    return Promise.resolve({ data: [{ _id: '1', place: 'MockPlace1', country: 'MockCountry1' }] });
  }
  return Promise.resolve({ data: [] }); // Default mock response for any other endpoint
});

// Mocking the get request for '/admin' endpoint
axiosMock.get.mockImplementationOnce((url) => {
  if (url === '/admin') {
    return Promise.resolve({ permission: 0 });
  }
  return Promise.resolve({}); // Default mock response for any other endpoint
});

// Mocking other HTTP methods
axiosMock.post.mockResolvedValue({ data: {} });
axiosMock.put.mockResolvedValue({ data: {} });
axiosMock.delete.mockResolvedValue({ data: {} });
