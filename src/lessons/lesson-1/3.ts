const temperature = -30

if (temperature < -10) {
    console.log('Очень холодно')
}  
if (temperature >= -10 && temperature < 10) {
    console.log('Холодно')
}

if (temperature >= 10 && temperature < 18) {
    console.log('Прохладно')
}

if (temperature >= 18 && temperature < 25) {
    console.log('Тепло')
}

if (temperature >= 25) {
    console.log('Жарко')
}