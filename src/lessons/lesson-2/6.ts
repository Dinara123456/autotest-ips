const promise = new Promise(function(resolve) {
    setTimeout(() => resolve('resolve'), 1000)
})

promise
    .then(
        result => console.log(result)
    )