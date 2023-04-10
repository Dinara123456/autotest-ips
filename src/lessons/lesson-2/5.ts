class Car {
    protected engineState: boolean
    
    constructor() {
        this.engineState = false
    }
    
    turnOn(): void {
        this.engineState = true
    }

    turnOff(): void {
        this.engineState = false
    }

    getState() {
        if (this.engineState) {
            console.log('Engine on')
        } else {
            console.log ('Engine off')
        }
    }
}

const car: Car = new Car
car.turnOn()
car.getState()
car.turnOff()
car.getState()


