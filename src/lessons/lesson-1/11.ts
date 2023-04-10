type Callback = (a: number, b: number) => number

const sum: Callback = function (a: number, b: number) {
    return a + b
}

const sub: Callback = function (a: number, b: number) {
    return a - b
}

const multi: Callback = function (a: number, b: number) {
    return a * b
}

const div: Callback = function (a: number, b: number) {
    return a / b
}

function calc(a: number, b: number, callback: Callback) {
    console.log(callback(a, b))
}

calc(4, 5, multi)
