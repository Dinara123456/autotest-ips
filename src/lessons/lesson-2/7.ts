{
    const promise: Promise<string> = new Promise(function (resolve) {
        setTimeout(() => resolve('resolve'), 1000)
    })

    async function print(): Promise<void> {
        const result: string = await promise
        console.log(result)
    }

    print()

}
