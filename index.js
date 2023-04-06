//Creating the table for the snake game
let table;
let tableSize = 25;
let columns = 30;
let rows = 30;
let ctx;


//Creating the snake
let snakeX = tableSize * 5;
let snakeY = tableSize * 5;

//Creating the velocity of the snake
let velocityX = 0;
let velocityY = 0;

//Creating the body of the snake
let snakeBody = [];

//Creating the apples
let appleX;
let appleY;

//create the score
let scoreNumber = 0;

//Game is over
let gameOver = false;

// //When the window loads, a title screen pops up with a start button that starts the game
// window.onload = function() {
//     table = document.getElementById("table");
//     table.width = rows * tableSize;
//     table.height = columns * tableSize;

//     ctx = table.getContext("2d");

//     ctx.fillStyle = "#8f9d99";
//     ctx.fillRect(0, 0, table.width, table.height);

//     ctx.fillStyle = "white";
//     ctx.font = "32px Arial  ";
//     ctx.fillText("Snake Game", 285, 200);

//     ctx.fillStyle = "#4a646c";
//     ctx.fillRect(285, 300, 130, 50);
//     ctx.fillStyle = "white";
//     ctx.font = "32px Arial  ";
//     ctx.fillText("Start", 315, 335);
//     ctx.shadowColor = '#92bdff';
//     ctx.shadowBlur = 8;
//     ctx.shadowOffsetX = 5;

//     //clicking the button starts the game
//     table.addEventListener("click", function(event) {
//         if (event.offsetX > 50 && event.offsetX < 400 && event.offsetY > 120 && event.offsetY < 400) {
//             startGame();
//         }
//     });
// }

window.onload = function() {
    
     table = document.getElementById("table");
     table.width = rows * tableSize;
     table.height = columns * tableSize;
    
     ctx = table.getContext("2d");
    
     setInterval(game, 1000/10);

     placeApple();
     document.addEventListener("keydown", keyPush);

     }

//Creating the game
function game() {
    if (gameOver) {
        return;
    }

    //game is over
    if (snakeX < 0 || snakeX > columns*tableSize || snakeY < 0 || snakeY > rows*tableSize) {
        gameOver = true;
    }
    
    //Drawing the table
    function drawTable() {
        ctx.fillStyle = "#afbdbb";
        ctx.shadowColor = '#4a646c';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.fillRect(0, 0, table.width, table.height);
        
        for (let i = 0; i < rows; i++) {
            ctx.moveTo(i * tableSize, 0);
            ctx.lineTo(i * tableSize, table.height);
        }
        for (let i = 0; i < columns; i++) {
            ctx.moveTo(0, i * tableSize);
            ctx.lineTo(table.width, i * tableSize);
        }
        ctx.strokeStyle = "#717c7a";
        ctx.stroke();

    }
    
    //Drawing the score
    function drawScore() {
        ctx.fillStyle = "#4a646c";
        ctx.font = "bold 32px Arial  ";
        ctx.fillText("Score: " + scoreNumber, 10, 40);
        }

    //Drawing the apples
    function drawApple() {
        ctx.fillStyle = "#5d777f";
        ctx.fillRect(appleX, appleY, tableSize, tableSize);

        //if the snake eats the apple, the snake grows
        if (snakeX == appleX && snakeY == appleY) {
            snakeBody.push([appleX, appleY]);
            placeApple();
            scoreNumber++;
            scoreNumber.textContent = scoreNumber;
        }
        for (let i = snakeBody.length-1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }


    }

    //Drawing the snake
    function drawSnake() {
        ctx.fillStyle = "#5d777f";

        snakeX += velocityX * tableSize;
        snakeY += velocityY * tableSize;
        
        ctx.fillRect(snakeX, snakeY, tableSize, tableSize);
        for (let i = 0; i < snakeBody.length; i++) {
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tableSize, tableSize);
        }
        
        //if the snake eats itself, the game is over
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
            }
        }

        // When the game is over, a menu pops up with the score number and a button to restart the game
        if (gameOver) {
            ctx.fillStyle = "#8f9d99";
            ctx.fillRect(0, 0, table.width, table.height);

            ctx.fillStyle = "white";
            ctx.font = "32px Arial  ";
            ctx.fillText("Game Over", 285, 200);

            ctx.fillText("Score: " + scoreNumber, 285, 250);
            ctx.fillStyle = "#4a646c";
            
            ctx.fillRect(285, 300, 130, 50);
            ctx.fillStyle = "white";
            ctx.font = "32px Arial  ";
            ctx.fillText("Restart", 295, 335);
            ctx.shadowColor = '#92bdff';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 5;

            drawApple = false;
            drawSnake = false;

            //clicking the button restarts the game
            table.addEventListener("click", function(event) {
                if (event.offsetX > 50 && event.offsetX < 400 && event.offsetY > 120 && event.offsetY < 335) {
                    snakeX = tableSize * 5;
                    snakeY = tableSize * 5;
                    velocityX = 0;
                    velocityY = 0;
                    snakeBody = [];
                    gameOver = false;
                    scoreNumber = 0;
                    placeApple();
                    setInterval(game, 100/10);
                }
            });
        }

        // //if the game ends, the snake is reset
        // if (gameOver) {
        //     snakeX = tableSize * 5;
        //     snakeY = tableSize * 5;
        //     velocityX = 0;
        //     velocityY = 0;
        //     snakeBody = [];
        //     gameOver = false;
        //     scoreNumber = 0;
        //     placeApple();
        // }
        

    }

    drawTable();
    drawSnake();
    drawApple();
    drawScore();

    
}

//Placing the apples 
function placeApple() {
    appleX = Math.floor(Math.random() * columns) * tableSize;
    appleY = Math.floor(Math.random() * rows) * tableSize;
}


//Moving the snake
function keyPush(event) {
    switch(event.keyCode) {
        case 37: //Left
            velocityX = -1;
            velocityY = 0;
            break;
        case 38: //Up
            velocityX = 0;
            velocityY = -1;
            break;
        case 39: //Right
            velocityX = 1;
            velocityY = 0;
            break;
        case 40: //Down
            velocityX = 0;
            velocityY = 1;
            break;
    }
}



// //creates a button that restarts the game when clicked
// function restart() {
//     snakeX = tableSize * 5;
//     snakeY = tableSize * 5;
//     velocityX = 0;
//     velocityY = 0;
//     snakeBody = [];
//     gameOver = false;
//     scoreNumber = 0;
//     placeApple();
// }