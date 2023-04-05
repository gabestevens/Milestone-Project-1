// Set up the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the game board
const gridSize = 20;
const gameWidth = canvas.width = gridSize * 30;
const gameHeight = canvas.height = gridSize * 30;

// Set up the snake object
let snake = {
  x: gridSize * 10,
  y: gridSize * 10,
  dx: gridSize,
  dy: 0,
  cells: [],
  maxCells: 4,
  
  // Move the snake in the current direction
  move() {
    this.x += this.dx;
    this.y += this.dy;
    
    // Wrap the snake around the edges of the game board
    if (this.x < 0) {
      this.x = gameWidth - gridSize;
    } else if (this.x >= gameWidth) {
      this.x = 0;
    }
    
    if (this.y < 0) {
      this.y = gameHeight - gridSize;
    } else if (this.y >= gameHeight) {
      this.y = 0;
    }
    
    // Add a new cell to the snake's body
    this.cells.unshift({ x: this.x, y: this.y });
    
    // Remove any extra cells
    if (this.cells.length > this.maxCells) {
      this.cells.pop();
    }
  },
  
  // Change the direction of the snake based on user input
  changeDirection(event) {
    if (event.keyCode === 37 && this.dx === 0) { // left arrow
      this.dx = -gridSize;
      this.dy = 0;
    } else if (event.keyCode === 38 && this.dy === 0) { // up arrow
      this.dx = 0;
      this.dy = -gridSize;
    } else if (event.keyCode === 39 && this.dx === 0) { // right arrow
      this.dx = gridSize;
      this.dy = 0;
    } else if (event.keyCode === 40 && this.dy === 0) { // down arrow
      this.dx = 0;
      this.dy = gridSize;
    }
  },
  
  // Draw the snake on the canvas
  draw() {
    ctx.fillStyle = '#2A623D';
    this.cells.forEach(function(cell, index) {
      ctx.fillRect(cell.x, cell.y, gridSize, gridSize);
    });
  },
  
  // Check for collision with food
  checkCollision(food) {
    if (this.x === food.x && this.y === food.y) {
      this.maxCells++;
      score++;
      food.generateLocation();
    }
  },
  
  // Check for collision with game board edges or snake body
  checkGameOver() {
    for (let i = 1; i < this.cells.length; i++) {
      if (this.x === this.cells[i].x && this.y === this.cells[i].y) {
        gameOver();
      }
    }
    
    if (this.x < 0 || this.x >= gameWidth || this.y < 0 || this.y >= gameHeight) {
      gameOver();
    }
  }
};

// Set up the score
let score = 0;

// Set up an array of food objects
let foodArray = [];

// Generate initial food objects
for (let i = 0; i < 5; i++) {
  let food = {
    x: Math.floor(Math.random() * 30) * gridSize,
    y: Math.floor(Math.random() * 30) * gridSize,
    
    // Draw the food on the canvas
    draw()
    {
        ctx.fillStyle = '#EEE8D5';
        ctx.fillRect(this.x, this.y, gridSize, gridSize);
      },
      
      // Generate a new location for the food
      generateLocation() {
        this.x = Math.floor(Math.random() * 30) * gridSize;
        this.y = Math.floor(Math.random() * 30) * gridSize;
      }
    };

    // Add the food object to the array
    foodArray.push(food);
    }
    
    // Define the game loop function
    function gameLoop() {
    // Move the snake
    snake.move();
    
    // Check for collision with each food object
    foodArray.forEach(function(food, index) {
    snake.checkCollision(food);
    });
    
    // Check for game over conditions
    snake.checkGameOver();
    
    // Draw the game board
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.fillStyle = '#1C421E';
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    
    // Draw the snake and food
    snake.draw();
    foodArray.forEach(function(food, index) {
    food.draw();
    });
    
    // Draw the score
    ctx.fillStyle = '#EEE8D5';
    ctx.font = '24px "Harry Potter"';
    ctx.textAlign = 'center';
    ctx.fillText('Score: ' + score, gameWidth / 2, 30);
    
    // Call the game loop function again after a short delay
    setTimeout(function() {
    requestAnimationFrame(gameLoop);
    }, 1000 / 60);
    }
    
    // Set up event listeners for user input
    document.addEventListener('keydown', function(event) {
    snake.changeDirection(event);
    });
    
    // Start the game loop
    requestAnimationFrame(gameLoop);
    
    // Show the game over screen and reset the game
    function gameOver() {
    alert('Game over! Final score: ' + score);
    score = 0;
    snake.x = gridSize * 10;
    snake.y = gridSize * 10;
    snake.cells = [];
    snake.maxCells = 4;
    
    foodArray.forEach(function(food, index) {
    food.generateLocation();
    });
    }      