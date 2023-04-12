export class Snake {
    constructor(speed) {
        this.body = { x: 13, y: 13 }
        this.bodyID = 0
        this.bodyLength = 0
        this.bodyArr = []
        this.speed = speed
        this.direction = { x: 0, y: 0 }
        this.isEating = false
    }
    
    create() {
        let gameWorld = document.querySelector(".game-world")

            let snakeSection = document.createElement("div")
            snakeSection.style.gridRowStart = this.body.y
            snakeSection.style.gridColumnStart = this.body.x
            snakeSection.classList.add("snake")
            snakeSection.setAttribute("id", `${this.bodyID}`)
            
        gameWorld.append(snakeSection)
    }
    
    move() {
        if (this.isEating === false) {
            this.removeLast()
        }else {
            this.growSnake()
        }
        this.isEating = false

        if (this.direction.x !== 0 || this.direction.y !== 0) {
            this.bodyID++
        }
        
        this.body.x += this.direction.x
        this.body.y += this.direction.y

    }
    
    setControls() {
        window.addEventListener("keydown", e => {
            switch (e.key) {
                case "ArrowUp": 
                if (this.direction.y !== 0) break
                this.direction = { x: 0, y: -1 }
                break
                case "ArrowDown": 
                if (this.direction.y !== 0) break
                this.direction = { x: 0, y: 1 }
                break
                case "ArrowLeft": 
                if (this.direction.x !== 0) break
                this.direction = { x: -1, y: 0 }
                break
                case "ArrowRight": 
                if (this.direction.x !== 0) break
                this.direction = { x: 1, y: 0 }
                break
            }
        })
    }

    determineBody() {
        let snakePieces = document.querySelectorAll(".snake")
        let snakeBody = Array.from(snakePieces)
        this.bodyArr = []
        for (let i = 1; i < snakeBody.length; i++) {
            let coords = {x: parseInt(snakeBody[i].style.gridColumnStart), y: parseInt(snakeBody[i].style.gridRowStart)}
            this.bodyArr.push(coords)
        }
    }

    removeLast() {
        if (this.bodyID !== 0) {
            let oldSnakePiece = document.getElementById(`${this.bodyID - this.bodyLength}`)
            oldSnakePiece.remove()
        } else {
            let snakePieces = document.querySelectorAll(".snake")
            snakePieces.forEach(segment => {
                    segment.remove()
            })
        }
    }

    growSnake() {
        this.bodyLength++
    }

    reset() {
        let snakePieces = document.querySelectorAll(".snake")
        snakePieces.forEach(segment => {
            segment.remove()
        })

        this.body = { x: 13, y: 13 }
        this.direction = { x: 0, y: 0 }
        this.bodyID = 0
        this.bodyLength = 0
    }
}