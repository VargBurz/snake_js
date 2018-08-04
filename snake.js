var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var accessKeyboard=true
var SCORE = 0

var SNAKE = [
	{
		x: 10, 
		y: 10,
	},
]

//var SNAKEBODY = []
var FRUIT = [
	{
		x: 10, 
		y: 10,
	},
]
var timer = 200
var dir = 'up'
var SNAKE_TAIL = [
	{
		x: 10,
		y: 10,
	},
]

function createFruit(){
    var x = Math.floor(Math.random()*15)
    var y = Math.floor(Math.random()*15)
	for(var i=0; i < SNAKE.length; i++) {
		if(x == SNAKE[i].x && y == SNAKE[i].y) {
			createFruit()
	        return
		}
	}
    FRUIT[0].x = x
    FRUIT[0].y = y
}
function drawFruit(){
    var x = FRUIT[0].x*30 + 1
    var y = FRUIT[0].y*30 + 1

    for(var i=0; i < SNAKE.length; i++) {

	if(x == SNAKE[i].x && y == SNAKE[i].y) {
		createFruit()
		return
	}

    }
    ctx.fillStyle = 'red'
    ctx.fillRect(x, y, 28, 28)
}
createFruit()
drawFruit()
function saveTail(){
	SNAKE_TAIL[0].x = SNAKE[SNAKE.length - 1].x
	SNAKE_TAIL[0].y = SNAKE[SNAKE.length - 1].y
}
function createSnake(){
    SNAKE[0].x = 7
    SNAKE[0].y = 7
    SNAKE[1] = {x:7, y:8}
}

function snakeStep() {
    for(var i = SNAKE.length - 1 ; i >0 ; i--){
    SNAKE[i].x = SNAKE[i-1].x
    SNAKE[i].y = SNAKE[i-1].y  
    }
} 

function drawSnake(){
for(var i=0; i < SNAKE.length; i++){
    var x = SNAKE[i].x*30 + 1

    var y = SNAKE[i].y*30 + 1

    ctx.fillStyle = 'green'

    ctx.fillRect(x, y, 28, 28)

    }
}
createSnake()
drawSnake()
function snakeMove(){         
    
        var y = SNAKE[0].y
        var x = SNAKE[0].x
        snakeStep()
        //SNAKEBODY[0] = {x,y}
        SNAKE[0].y = y - 1
        if (dir == 'right') {
            SNAKE[0].y = y
            SNAKE[0].x = x + 1
        }
        if (dir == 'left') {
            SNAKE[0].y = y
            SNAKE[0].x = x - 1
        }
        if (dir == 'up') {
            SNAKE[0].y = y - 1
            SNAKE[0].x = x
        }
        if (dir == 'down') {
            SNAKE[0].y = y + 1
            SNAKE[0].x = x
        }
        if (SNAKE[0].y > 14) {
            SNAKE[0].y = SNAKE[0].y - 15
        }
        if (SNAKE[0].y < 0) {
            SNAKE[0].y = SNAKE[0].y + 15
        }
        if (SNAKE[0].x < 0) {
            SNAKE[0].x = SNAKE[0].x + 15
        }
        if (SNAKE[0].x > 14) {
            SNAKE[0].x = SNAKE[0].x - 15
        }
		if (SNAKE[0].x > 14) {
            SNAKE[0].x = SNAKE[0].x - 15
        }
		for (i = 1; i < SNAKE.length; i++) {
			if (SNAKE[0].x == SNAKE[i].x && SNAKE[0].y == SNAKE[i].y) {
				deathSnake()
			}
		}
		
         
}
function deathSnake() {
	SNAKE[0].x = 7
    SNAKE[0].y = 7
    SNAKE[1] = {x:7, y:8}
	var l = SNAKE.length
	SNAKE.splice(2, l - 2)
	dir = 'up'
	SCORE = 0
}
function eatMeal(){
	if (SNAKE[0].x == FRUIT[0].x && SNAKE[0].y == FRUIT[0].y){
		//console.log('!!!!!!!!!!!!!!!!!!!!!')
		addTail()
		createFruit()
		SCORE = SCORE + 1
	}
}

function drawScore(){
	var board = document.getElementById('score');
	board.innerHTML = 'SCORE:  ' + SCORE;
}
function addTail(){
	SNAKE.push({
		x: SNAKE_TAIL[0].x,
		y: SNAKE_TAIL[0].y,
	})
}
   
function snakeChange(){
    accessKeyboard=true
    document.onkeydown
    ctx.clearRect(0, 0 ,450, 450)
    drawFruit()
	saveTail()
    snakeMove()
	eatMeal()
	drawScore()
    drawSnake()
    
}
setInterval( snakeChange, timer);
document.onkeydown = function makeDir(event) {
	if(accessKeyboard) {

		if(event.keyCode == 37 && dir != 'right') {
			dir = 'left'
		}

		if(event.keyCode==38 && dir!='down') {
			dir='up'
		}	

		if(event.keyCode==39 && dir!='left') {
			dir='right'
		}

		if(event.keyCode==40 && dir!='up') {
			dir='down'
		}

		accessKeyboard=false

	}

}

