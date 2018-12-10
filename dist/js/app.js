"use strict";

var levels = document.querySelector(".levels");
var img1 = document.querySelector(".img1");
var img2 = document.querySelector(".img2");
var img3 = document.querySelector(".img3");
var imgContainer = document.querySelector(".imgContainer");
var levelCount = 1;
var lives = 3; // Enemies our player must avoid

var Enemy = function Enemy(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/enemy-bug.png';
}; // Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * (levelCount * 0.10) * dt;

  if (this.x > 520) {
    this.x = 0;
  } //  Detection of Collision


  if (this.x + 83 > player.x && this.x < player.x + 80 && this.y + 60 > player.y && this.y < player.y + 60) {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'You Died!'
    });
    player.x = 200;
    player.y = 410;
    lives--;

    if (lives === 2) {
      img1.remove();
    } else if (lives === 1) {
      img1.remove();
      img2.remove();
    } else if (lives === 0) {
      img1.remove();
      img2.remove();
      img3.remove();
      swal({
        type: 'error',
        title: 'Game Over',
        text: 'Play Again!'
      });
      setTimeout(function () {
        restart();
      }, 1000);
    }
  }
};

function randomEnemyMovement(min, max) {
  return Math.random() * (max - min) + min;
} // Draw the enemy on the screen, required method for game


Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function Player(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
  if (this.y < 10) {
    this.y = this.y + 420;
    levelCount++;
    levels.textContent = levelCount;
    swal('Good job!', 'LEVEL UP!', 'success');
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (position) {
  if (position === "left" && this.x > 0) {
    this.x = this.x - 100;
  }

  if (position === "up" && this.y > 0) {
    this.y = this.y - 85;
  }

  if (position === "right" && this.x < 400) {
    this.x = this.x + 100;
  }

  if (position === "down" && this.y < 385) {
    this.y = this.y + 85;
  }
}; // Restart function


var restart = function restart() {
  player.x = 200;
  player.y = 410;
  enemy.y = 60;
  enemy1.y = 140;
  enemy2.y = 220;
  levels.innerHTML = 1;
  lives = 3;
  levelCount = 1;
  imgContainer.appendChild(img1);
  imgContainer.appendChild(img2);
  imgContainer.appendChild(img3);
};

var allEnemies = [];
var enemy = new Enemy(0, 60, randomEnemyMovement(100, 200));
var enemy1 = new Enemy(0, 140, randomEnemyMovement(200, 300));
var enemy2 = new Enemy(0, 220, randomEnemyMovement(300, 400));
allEnemies.push(enemy, enemy1, enemy2);
var player = new Player(200, 410); // Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});