var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var SNAKE = [{x:10, y:10}];
var FRUIT = [{x:10, y:10}];
function createFruit(){
    var x = Math.floor(Math.random()*15);

    var y = Math.floor(Math.random()*15);
    FRUIT[0].x = x;
    FRUIT[0].y = y;
}
function drawFruit(){
    var x = FRUIT[0].x*30 + 1;

    var y = FRUIT[0].y*30 + 1;

    for(var i=0; i < SNAKE.length; i++) {

	if(x == SNAKE[i].x && y == SNAKE[i].y) {

		createFruit();

		return;

	}

    }
    ctx.fillStyle = 'red';

    ctx.fillRect(x, y, 28, 28);

}
createFruit();
drawFruit();

function createSnake(){
    SNAKE[0].x = 7;
    SNAKE[0].y = 7;
    SNAKE[1] = {x:7,y:8};

}
function drawSnake(){
for(var i=0; i < SNAKE.length; i++){
    var x = SNAKE[i].x*30 + 1;

    var y = SNAKE[i].y*30 + 1;

    ctx.fillStyle = 'green';

    ctx.fillRect(x, y, 28, 28);

    }
}
createSnake();
drawSnake();
function snakeMove(){
    var x = SNAKE[0].x
    var y = SNAKE[0].y
    rmove = x + 1;
}
