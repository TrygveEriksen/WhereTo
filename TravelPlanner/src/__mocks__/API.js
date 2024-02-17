const mockResponseDestinations = {
    data: {
        results: [
            {
                description: "testDescription",
                place: "trondheim",
                country: "norway",
                contintent: "europe"
            }
            
        ]
    }
}



export default {
    get: jest.fn((path) => {
        if (path === '/destinations') {
            return Promise.resolve(mockResponseDestinations);
        }
    })
}