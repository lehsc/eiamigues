const baseUrl = "http://localhost:3000"
const userEndpoint = baseUrl + "/user"
const postEndpoint = baseUrl + "/post"
const endpoints = {
    users: {
        base: userEndpoint,
        id: (id: Required<number>) => userEndpoint + "/" + id 
    },
    posts: {
        base: postEndpoint,
        id: (id: number) => postEndpoint + "/" + id 
    }
}


export {
    baseUrl,
    endpoints
}

