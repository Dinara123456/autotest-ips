{
    
    let legalAge = function (age: number) {
        if (age < 18) {
            console.log('Страница не доступна')
        } else {
            console.log('Страница доступна')
        }
    }
    
    const age: number = 17
    legalAge(age)
}