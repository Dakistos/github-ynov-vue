const myLoginRoutine = user => new Promise ((resolve, reject) => {
    axios({url: 'auth', data: user, method: 'POST' })
        .then(resp => {
            const token = resp.data.token
            localStorage.setItem('user-token', token); // store the token in localstorage monToken :3d3a9e363fe77f7ca5b69a9a10af8a29b0a6cca6
            resolve(resp)
        })
        .catch(err => {
            localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
            reject(err)
        })
})