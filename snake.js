// Variablen werden bestimmt
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rows = 20;
let cols = 20;
let snake = [{ x: 15, y: 3 }];
let food;
let cellWidth = canvas.width / cols;
cellHeight = canvas.height / rows;
direction = "LEFT";
let foodCollected = false;
let score = 0;




// Essen wird platziert
placeFood();    

setInterval(gameloop, 140);
document.addEventListener("keydown", keyDown);

draw();  

// Canvas wird gezeichnet
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  // Snake wird platziert und neue Teile hinzugefügt
  add(snake[0].x, snake[0].y);
  snake.forEach((part) => add(part.x, part.y));

  //Food wird platziert
  ctx.fillStyle = "orange";
  add(food.x, food.y);

  requestAnimationFrame(draw);
}

// Elemente werden hinzugefügt
function add(x, y) {            
  ctx.fillRect(
    x * cellWidth,
    y * cellHeight,
    cellWidth - 1,
    cellHeight - 1
  );
}

function shiftSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];
    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

// Schlange wird bewegt
function gameloop() { 
  testGameOver()
  if (foodCollected) {
    snake = [{x: snake[0].x, 
              y: snake[0].y }, 
              ...snake];
  }
  foodCollected = false;
  shiftSnake();
  if (direction == "LEFT") {
    snake[0].x--;
  }
  if (direction == "RIGHT") {
    snake[0].x++;
  }
  if (direction == "UP") {
    snake[0].y--;
  }
  if (direction == "DOWN") {
    snake[0].y++;
  }

  if (snake[0].x == food.x && 
      snake[0].y == food.y){
        // Futter einsammeln und neu platzieren
        foodCollected = true;
    // Punkt wird gegeben und in Button eingetragen
    score += 1;
    document.getElementById('scoreButton').textContent = score;
    placeFood();
   
    
  }

}

 // Tasten werden vergeben
function keyDown(e) {               
  if (e.key === "ArrowUp") {
    direction = "UP";
  } else if (e.key === "ArrowDown") {
    direction = "DOWN";
  } else if (e.key === "ArrowLeft") {
    direction = "LEFT";
  } else if (e.key === "ArrowRight") {
    direction = "RIGHT";
  }
}

function testGameOver() {

  let firstPart = snake[0];
  let otherParts = snake.slice(1);
  let dublicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);
  

  // 1. Schlange läuft gegen die Wand
  if (snake[0].x < 0 ||
      snake[0].x > cols - 1 ||
      snake[0].y < 0 ||
      snake[0].y > rows - 1 ||
      dublicatePart
){
    alert("Du hast " + score + " Punkte erreicht!")
    placeFood();
    snake = [{ x: 15, y: 3 }];
    direction = "LEFT";
  }

}


// Position des Futters wird zufällig berechnet
function placeFood() { 
  let randomX = Math.floor(Math.random() * cols);
  let randomY = Math.floor(Math.random() * rows);

  food = {x: randomX, y: randomY};
}