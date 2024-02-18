const mockResponses = {
    '/destinations': {data: [
        {_id: '1', place: "MockPlace1", country: 'MockCountry1', continent: "MockContinent1", description: "MockDescription2"},
        {_id: '2', place: "MockPlace2", country: 'MockCountry2'},
    ]},
    "/admin": {permission: 0}
}


console.log("ok");


class API {
    static async get(path) {
        console.log("yes");
        if (mockResponses.hasOwnProperty(path)) {
            return Promise.resolve({
                data: mockResponses[path],
                status: 200,
                statusText: 'OK',
                headers: {}, // Add any necessary headers here
                // Add other properties if needed
            });
        } else {
            return Promise.resolve({
                data: null,
                status: 404, // Or any other appropriate status code
                statusText: 'Not Found',
                headers: {}, // Add any necessary headers here
                // Add other properties if needed
            });
        }
    }
}


export {API}