const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
const WIDTH_BOARD = canvas.width
const HEIGHT_BOARD = canvas.height

dx = WIDTH_BOARD
dy =  0 

canvas.style.backgroundColor = '#E1E1E1'

let snakeBody = [
                {x: 100, y:WIDTH_BOARD/2, taille: 10},
                {x: 90, y: WIDTH_BOARD/2, taille: 10},
                {x: 80, y: WIDTH_BOARD/2, taille: 10},
                {x: 70, y: WIDTH_BOARD/2, taille: 10}
]
let snakeHead = {x: 110, y:WIDTH_BOARD/2, taille: 10}

setInterval(draw, 10)

function draw(){
    ctx.clearRect(0,0, WIDTH_BOARD, HEIGHT_BOARD)
    drawGrid(ctx, WIDTH_BOARD, HEIGHT_BOARD, '#FFFFFF', 10) 
    drawHead(snakeHead)
    moveHead()
    drawBody(snakeBody)
    drawSnake()
    moveBody()
}
    


//Création de la grille du canvas pour débugger la position du serpent
function drawGrid(ctx, width, height,strokeStyle, step) {
    ctx.beginPath()

    for (let x = 0.5; x < width; x += step){
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
    }
    
    for (let y = 0.5; y < height; y += step) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }
    
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
    ctx.closePath()
}

function drawHead(snakeHead){
    ctx.beginPath()
    ctx.rect(snakeHead.x,snakeHead.y, snakeHead.taille,snakeHead.taille)
    ctx.fillStyle = '#000000'
    ctx.fill()
    ctx.closePath()
}


//Création du corps du serpent
function drawBody(snakeBody){
    ctx.beginPath()
    ctx.rect(snakeBody.x,snakeBody.y, snakeBody.taille,snakeBody.taille)
    ctx.fillStyle = '#000000'
    ctx.fill()
    ctx.closePath()
}

// Afficher le corps entier du serpent
function drawSnake() {  
    snakeBody.forEach(drawBody);
}

// Déplacement du corps du serpent
function moveBody(){

    // SI la tête du serpent sur x EST SUPERIEUR à la largeur du canvas ALORS 
    if(snakeBody.x + 1 > WIDTH_BOARD){
        //On réinitialise la position de la tête sur x à 0
       snakeBody.x = 0 
    }
    snakeBody.x++
    // snakeBody.y += dy  
}


function moveHead(){

    // SI la tête du serpent sur x EST SUPERIEUR à la largeur du canvas ALORS 
    if(snakeHead.x + 1 > WIDTH_BOARD){
        //On réinitialise la position de la tête sur x à 0
       snakeHead.x = 0 
    }

    snakeHead.x++
}
