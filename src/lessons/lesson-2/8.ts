{
    const promise: Promise<string> = new Promise(function (resolve, reject) {
    
    setTimeout(() => reject(('reject')), 100)
    setTimeout(() => resolve('resolve'), 1000)
})

promise
    .then(
        result => console.log(result),
        error => console.log(error)
    )
}
