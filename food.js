export class Food {
    constructor() {
        this.coords = {x: 13, y: 5}
        this.gridSize = 25
    }

    create() {
        let gameWorld = document.querySelector(".game-world")
            let food = document.createElement("div")
            food.style.gridRowStart = this.coords.y
            food.style.gridColumnStart = this.coords.x
            food.classList.add("food")
            gameWorld.append(food)
    }

    remove() {
        let currentFood = document.querySelectorAll(".food")
        currentFood.forEach(crumb => {
            crumb.remove()
        })
    }

    getNewCoords() {
            return {
                x: Math.floor(Math.random() * this.gridSize + 1),
                y: Math.floor(Math.random() * this.gridSize + 1)
            }
    }

    reset() {
        this.remove()
        let newCoords = this.getNewCoords()
        this.coords = { x: newCoords.x, y: newCoords.y }
        this.create()
    }
}