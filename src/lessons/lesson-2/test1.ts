const menu = {
    width: 200,
    height: 300,
    title: 'Me menu'
};

function multipleNumeric(obj: any) {
    for (let key in obj) {
        console.log(obj[key])
        if (typeof obj[key] == 'number') {
            obj[key] *= 2;
        }
        console.log(obj[key])
    }
}

multipleNumeric(menu);
console.log(menu)