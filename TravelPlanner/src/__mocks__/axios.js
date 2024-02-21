const axiosMock = jest.createMockFromModule('axios');

const urlBuilder = (path) => `http://localhost:3001${path}`;

// Mocking the get request for the different endpoints
axiosMock.get.mockImplementation((path) => {

  switch(path) {
    case urlBuilder('/destinations'):
      return Promise.resolve({ data: [
      { _id: '1', place: 'MockPlace1', country: 'MockCountry1'},
      { _id: '2', place: 'MockPlace2', country: 'MockCountry2'},
      { _id: '3', place: 'MockPlace3', country: 'MockCountry3'}
    ] });

    case urlBuilder('/admin'):
      return Promise.resolve({data: {permission: 0}});
    
    default:
      return Promise.reject(new Error('Not found'));
  }
});

// Mocking other HTTP methods
axiosMock.post.mockImplementation((path, {username, password}) => {
  switch(path) {
    case urlBuilder('/entry/login'):
      if(username === 'mockuser' && password === 'mockpassword') {
        return Promise.resolve({data: {message: 'login', jwtToken: 'testToken'}})
      }
    
    default:
      return Promise.reject(new Error('not valid'))
  }


});
axiosMock.put.mockResolvedValue({ data: {} });
axiosMock.delete.mockResolvedValue({ data: {} });


export default axiosMock;