// Animation Variables
let directions = {
  left: 0,
  right: 1
};

// Canvas Setup
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let canvas = document.getElementById("canvas");
canvas.height = canvasHeight;
canvas.width = canvasWidth;
let context = canvas.getContext("2d");

// SpriteSheet Setup
let columns = 8;
let rows = 2;
let spritesheetWidth = 864;
let spritesheetHeight = 280;
let currentDirection = directions.right;
let boyHeight = spritesheetHeight / rows;
let boyWidth = spritesheetWidth / columns;
let boy = new Image();
boy.src = "boy.png";
let x = 0;
let y = 0;
let movingBoyX = 0;
let movingBoyY = boyHeight;
let speed = 50;
let boyX = 0;
let boyY = 0;
let currentFrame = 0;

// Animation functions

move = direction => {
  if (direction == directions.right) {
    context.clearRect(movingBoyX - speed, movingBoyY, boyWidth, boyHeight);

    if (movingBoyX > canvasWidth) {
      currentDirection = direction.left;
      boyY = boyHeight;
      boyX = spritesheetWidth - boyWidth;
    } else {
      context.drawImage(
        boy,
        boyX,
        boyY,
        boyWidth,
        boyHeight,
        movingBoyX,
        movingBoyY,
        boyWidth,
        boyHeight
      );

      // change sprite
      boyX = (currentFrame % 8) * boyWidth;
      boyY = 0;
      currentFrame++;

      // Move in screen
      movingBoyX = movingBoyX + speed;
    }
  } else {
    if (movingBoyX < 0) {
      context.clearRect(movingBoyX - speed, movingBoyY, boyWidth, boyHeight);
      currentDirection = directions.right;
      boyY = 0;
    } else {
      context.clearRect(movingBoyX + speed, movingBoyY, boyWidth, boyHeight);
      context.drawImage(
        boy,
        boyX,
        boyY,
        boyWidth,
        boyHeight,
        movingBoyX,
        movingBoyY,
        boyWidth,
        boyHeight
      );

      // change sprite
      boyX = spritesheetWidth - (currentFrame % 8) * boyWidth;
      boyY = boyHeight;
      currentFrame++;

      // Move in screen
      movingBoyX = movingBoyX - speed;
    }
  }
};

jog = direction => {
  if (direction == directions.right) {
    context.clearRect(x, y, boyWidth, boyHeight);
    context.drawImage(
      boy,
      boyX,
      boyY,
      boyWidth,
      boyHeight,
      x,
      y,
      boyWidth,
      boyHeight
    );

    // change sprite
    boyX = (currentFrame % 8) * boyWidth;
    boyY = 0;
    currentFrame++;
  } else {
    context.clearRect(x, y, boyWidth, boyHeight);
    context.drawImage(
      boy,
      boyX,
      boyY,
      boyWidth,
      boyHeight,
      x,
      y,
      boyWidth,
      boyHeight
    );

    // change sprite
    boyX = (currentFrame % 8) * boyWidth;
    boyY = boyHeight;
    currentFrame++;
  }
};

setInterval(() => {
  jog(currentDirection);
  move(currentDirection);
}, 200);
