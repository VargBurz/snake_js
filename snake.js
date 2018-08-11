var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var accessKeyboard=true
var SCORE = 0

var WALL_LENGTH = 4
var WALL_AMOUNT = 4
var WALL = [
	{
		x: 5,
		y: 5,
	},
]

var TELEPORT_AMOUNT = 3 
var TELEPORT = [
	{
		x: 9,
		y: 9,
	},
]

var SNAKE = [
	{
		x: 10, 
		y: 10,
	},
]

var FRUIT = [
	{
		x: 10, 
		y: 10,
	},
]
var FIELD_SIZE = 27
var TIMER = 150
var DIR = 'up'
var SNAKE_TAIL = [
	{
		x: 10,
		y: 10,
	},
]

function createTeleport(teleport_amount) {
	if (typeof(teleport_amount) === 'undefined') {
		teleport_amount = 2
	}
	for (i=0; i < teleport_amount; i++) {
		i = i*2
		var x = Math.floor(Math.random()*FIELD_SIZE)
		var y = Math.floor(Math.random()*FIELD_SIZE)	
		var x1 = Math.floor(Math.random()*FIELD_SIZE)
		var y1 = Math.floor(Math.random()*FIELD_SIZE)
		if (x == x1 && y == y1) {
			createTeleport(TELEPORT_AMOUNT)
			return
		}
		for (var j = 0; j < WALL.length; j++) {
			if ((WALL[j].x == x && WALL[j].y == y) || (WALL[j].x == x1 && WALL[j].y == y1)) {
				createTeleport(TELEPORT_AMOUNT)
				return
			}
		}
		TELEPORT[i] = {x: x, y: y}
		TELEPORT[i+1] = {x: x1, y: y1}
		i = i/2
	}
}

function createWall(wall_length, wall_amount) {
	if (typeof(wall_length) === 'undefined') {
		wall_length = 6
	}
	if (typeof(wall_amount) === 'undefined') {
		wall_amount = 2
	}
	for (var j = 0; j < wall_amount; j++) {
		j = j * wall_length
		var x1 = Math.floor(Math.random()*(FIELD_SIZE - wall_length*2 + 1) + wall_length)
		var y1 = Math.floor(Math.random()*(FIELD_SIZE - wall_length*2 + 1) + wall_length) 
		WALL[j] = {x: x1, y:y1}
		for (var i = j + 1; i < j + wall_length; i++) {	
			var x1 = Math.floor(Math.random()*3)
			var y1 = 0
			if (x1 == 0) {
				x1 = -1
				y1 = 0
			}
			else if (x1 == 1) {
				y1 = Math.floor(Math.random()*2)
				if (y1 == 0) {
					y1 = -1
					x1 = 0
				}
				else {
					y1 = 1
					x1 = 0
				}
			}
			else if (x1 == 2) {  
				x1 = 0
				y1 = 1
			}
			
			WALL[i] = {x:WALL[i-1].x + x1, y:WALL[i-1].y + y1}
			
			if(i > 1) {
				if (WALL[i].x == WALL[i-2].x && WALL[i].y == WALL[i-2].y) {
					WALL[i].y = WALL[i-1].y - x1
					WALL[i].x = WALL[i-1].x - y1
					//var y = Math.floor(Math.random()*3)
					//if (y == 0) {
						//WALL[i].y = WALL[i-1].y + 1
						//WALL[i].x = WALL[i-1].x 
					//}
					//else if (y == 1) {
						//WALL[i].y = WALL[i].y - 1
						//WALL[i].x = WALL[i].x
					//}
					//else {
						//WALL[i].y = WALL[i].y
						//WALL[i].x = WALL[i].x + 1
					//}
				}
			}
		}
		j = j / wall_length
	}
}

function createFruit(){
    var x = Math.floor(Math.random()*FIELD_SIZE)
    var y = Math.floor(Math.random()*FIELD_SIZE)
	for (var i=0; i < TELEPORT.length; i++) {
		if (x == TELEPORT[i].x && y == TELEPORT[i].y) {
			createFruit()
	        return
		}
	}
	for (var i=0; i < SNAKE.length; i++) {
		if(x == SNAKE[i].x && y == SNAKE[i].y) {  
			createFruit()
	        return
		}
	}
	for(var i=0; i < WALL.length; i++) {
		if(x == WALL[i].x && y == WALL[i].y) {
			createFruit()
			return
		}
    }
    FRUIT[0].x = x
    FRUIT[0].y = y
}

function createSnake(){
    SNAKE[0].x = 7
    SNAKE[0].y = 7
    SNAKE[1] = {x:7, y:8}
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

function drawWall() {
	for(var i=0; i < WALL.length; i++){
		var x = WALL[i].x*30 + 1
		var y = WALL[i].y*30 + 1
		ctx.fillStyle = 'black'
		ctx.fillRect(x, y, 28, 28)
	}
}

function drawTeleport() {
	for (i = 0; i < TELEPORT.length/2; i++) {
		i = i*2
		
		var x = TELEPORT[i].x*30 + 1
		var y = TELEPORT[i].y*30 + 1
		ctx.fillStyle = 'rgb('+ (i*25 + 25) +','+ (i*12+46) +',' + (i*15 + 80)+ ')' 
		ctx.fillRect(x, y, 28, 28)
		
		var x1 = TELEPORT[i+1].x*30 + 1
		var y1 = TELEPORT[i+1].y*30 + 1
		ctx.fillStyle = 'rgb('+ (i*25 + 25) +','+ (i*12+46)+',' + (i*15 + 80)+')'
		ctx.fillRect(x1, y1, 28, 28)
		
		i = i/2
	}
}

function drawSnake(){
	var x = SNAKE[0].x*30 + 1
	var y = SNAKE[0].y*30 + 1
	ctx.fillStyle = 'green'
	ctx.fillRect(x, y, 28, 28)
	ctx.fillStyle = 'black'
	ctx.fillRect(x+4, y+4, 20, 20)
	
	for(var i=1; i < SNAKE.length; i++){
		var x = SNAKE[i].x*30 + 1

		var y = SNAKE[i].y*30 + 1

		ctx.fillStyle = 'green'

		ctx.fillRect(x, y, 28, 28)

	}
}

function drawScore(){
	var board = document.getElementById('score')
	board.innerHTML = 'SCORE:  ' + SCORE
}

function saveTail(){
	SNAKE_TAIL[0].x = SNAKE[SNAKE.length - 1].x
	SNAKE_TAIL[0].y = SNAKE[SNAKE.length - 1].y
}

function snakeStep() {
    for(var i = SNAKE.length - 1; i > 0; i--){
    SNAKE[i].x = SNAKE[i-1].x
    SNAKE[i].y = SNAKE[i-1].y  
    }
} 

function snakeMove(){         
    
        var y = SNAKE[0].y
        var x = SNAKE[0].x
        snakeStep()
        SNAKE[0].y = y - 1
        if (DIR == 'right') {
            SNAKE[0].y = y
            SNAKE[0].x = x + 1
        }
        if (DIR == 'left') {
            SNAKE[0].y = y
            SNAKE[0].x = x - 1
        }
        if (DIR == 'up') {
            SNAKE[0].y = y - 1
            SNAKE[0].x = x
        }
        if (DIR == 'down') {
            SNAKE[0].y = y + 1
            SNAKE[0].x = x
        }
        if (SNAKE[0].y > FIELD_SIZE-1) {
            SNAKE[0].y = SNAKE[0].y - FIELD_SIZE
        }
        if (SNAKE[0].y < 0) {
            SNAKE[0].y = SNAKE[0].y + FIELD_SIZE
        }
        if (SNAKE[0].x < 0) {
            SNAKE[0].x = SNAKE[0].x + FIELD_SIZE
        }
        if (SNAKE[0].x > FIELD_SIZE-1) {
            SNAKE[0].x = SNAKE[0].x - FIELD_SIZE
        }
		if (SNAKE[0].x > FIELD_SIZE-1) {
            SNAKE[0].x = SNAKE[0].x - FIELD_SIZE
        }
		for (i=0; i < TELEPORT.length/2; i++){
			i = i*2
			if (SNAKE[0].x == TELEPORT[i].x && SNAKE[0].y == TELEPORT[i].y){
				SNAKE[0].x = TELEPORT[i+1].x
				SNAKE[0].y = TELEPORT[i+1].y
			}
			else if (SNAKE[0].x == TELEPORT[i+1].x && SNAKE[0].y == TELEPORT[i+1].y){
				SNAKE[0].x = TELEPORT[i].x
				SNAKE[0].y = TELEPORT[i].y
			}
			i = i/2
	    }
		for (i = 0; i < WALL.length; i++) {
			if (SNAKE[0].x == WALL[i].x && SNAKE[0].y == WALL[i].y) {
				deathSnake()
			}
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
	DIR = 'up'
	sc = SCORE.toString()
	alert(' YOU DIED \n TRY AGAIN\n SCORE: ' + sc)
	SCORE = 0
	createTeleport(TELEPORT_AMOUNT)
	createWall(WALL_LENGTH, WALL_AMOUNT) // почему без аргументов создается снова 4 стены, если по дефолту стоит 2?
	createFruit()
}

function eatMeal(){
	if (SNAKE[0].x == FRUIT[0].x && SNAKE[0].y == FRUIT[0].y){
		addTail()
		createFruit()
		SCORE = SCORE + 1
	}
}

function addTail(){
	SNAKE.push({
		x: SNAKE_TAIL[0].x,
		y: SNAKE_TAIL[0].y,
	})
}

createWall(WALL_LENGTH, WALL_AMOUNT)
drawWall()
createTeleport(TELEPORT_AMOUNT)
drawTeleport()
createFruit()
drawFruit()

createSnake()
drawSnake()
   
function snakeChange(){
    accessKeyboard=true
    document.onkeydown
    ctx.clearRect(0, 0 ,810, 810)
	drawTeleport()
	drawWall()
    drawFruit()
	saveTail()
    snakeMove()
	eatMeal()
	drawScore()
    drawSnake()
    
}

setInterval( snakeChange, TIMER);
document.onkeydown = function makeDir(event) {
	if(accessKeyboard) {

		if(event.keyCode == 37 && DIR != 'right') {
			DIR = 'left'
		}

		if(event.keyCode==38 && DIR!='down') {
			DIR = 'up'
		}	

		if(event.keyCode==39 && DIR!='left') {
			DIR = 'right'
		}

		if(event.keyCode==40 && DIR!='up') {
			DIR = 'down'
		}

		accessKeyboard=false

	}

}

