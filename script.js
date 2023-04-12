import { Snake } from "./snake.js"
import { Food } from "./food.js"

const greenSnake = new Snake(10)
    greenSnake.setControls()

let food = new Food()
    food.reset()

let currentFrame = 0
let previousFrame = 0

function update(frame) {
    window.requestAnimationFrame(update)
    currentFrame = (frame - previousFrame) / 1000
    if (currentFrame < 1 / greenSnake.speed) return
    
    previousFrame = frame
    main()
}
window.requestAnimationFrame(update)

function main() {
    checkEating()
    greenSnake.move()
    greenSnake.create()
    checkLose()
    greenSnake.determineBody()
}

function isCollision(asset1, asset2) {
    return (asset1.x === asset2.x && asset1.y === asset2.y)
}

function isCollisionArr(asset1, asset2) {
    return asset1.some(segment => {
        return (segment.x === asset2.x && segment.y === asset2.y)
    })
}

function checkEating() {
    if (isCollision(greenSnake.body, food.coords)) {
        food.reset()
        greenSnake.isEating = true
    }
}

function checkLose() {
    if (
        greenSnake.body.x <= 0 ||
        greenSnake.body.x > 25 ||
        greenSnake.body.y <= 0 ||
        greenSnake.body.y > 25 ||
        isCollisionArr(greenSnake.bodyArr, greenSnake.body)
    ) {
        onLose()
    }
}

function onLose() {
    let loseScreen = document.querySelector(".lose-screen")
    let scoreDisplay = document.querySelector(".score")
    let score = greenSnake.bodyLength
    scoreDisplay.innerHTML = `Score: ${score}`
    loseScreen.classList.remove("hide")
    scoreDisplay.classList.remove("hide")
    greenSnake.reset()
    food.reset()

    setTimeout(() => {
        loseScreen.classList.add("hide")
        scoreDisplay.classList.add("hide")
    }, 5000)
}