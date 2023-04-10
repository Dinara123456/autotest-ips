const legalAge = (age: number) => {
    if (age < 18) {
        console.log('Страница не доступна')
    }
    if (age >= 18) {
        console.log('Страница доступна')
    }
}

legalAge (17)