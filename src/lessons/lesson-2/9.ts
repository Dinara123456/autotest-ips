{
    const promise: Promise<string> = new Promise(function (resolve, reject) {

        setTimeout(() => reject(('reject')), 100)
        setTimeout(() => resolve('resolve'), 1000)
    })

    async function print(): Promise<void> {
        try {
            console.log('kek', await promise)
        } catch (error) {
            console.log('lol', error)
        }
    }

    print()

}

