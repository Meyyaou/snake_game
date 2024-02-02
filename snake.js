//the board(canvas)
const border='white';
const background='#727e4e';
const col='lightgreen';
const snake_border='white';
const board=document.getElementById("canvas");
const board_context=canvas.getContext("2d");
var score=0;
document.addEventListener("keydown", moveDir)
//const restart=document.getElementById("play");

//the snake now:
let snake=[{x: 200, y: 200},{x:190, y:200}, {x:180, y:200},
{x:170, y:200}, {x:160, y:200}, ];
let dx= 0;
let dy= 10;

main();
function main(){
  

    moveDir=false;
    setTimeout(function onTick(){
        Restart(); //demarrer a  nouveau
        move(); //le bouger
        AffSnake(); //IMPORTANT sinon we dont see the game
        main();
        //mettre des checkpoints
       
        //
    
    }, 100)}
    

function Restart(){
    board_context.fillStyle=background;
    board_context.strokestyle=border;
    board_context.fillRect(0, 0, board.width, board.height);
    board_context.strokeRect(0, 0, board.width, board.height);
    endGame();
}

function AffSnake(){
    snake.forEach(drawSnake);
}

function drawSnake(snakeSeg){
    board_context.fillStyle='white';
    board_context.strokestyle='white';
    board_context.fillRect(snakeSeg.x, snakeSeg.y, 10, 10);
    board_context.strokeRect(snakeSeg.x, snakeSeg.y, 10, 10);  
    
}

function move(){
    const head={x: snake[0].x + dx, y: snake[0].y +dy};
    snake.unshift(head);
    snake.pop();
}

function endGame(){
    //collision with walls
    if(snake[0].x < 0 || snake[0].x >board.width -10 || snake[0].y <0|| snake[0].y > board.height- 10){
        //alert("game ovvvver");
        console.log("game over");    
    }
    for( i=0; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ //for collide to itself
           Restart();
        }
    }
}

function moveDir(event){
    const left=37;
    const right=39;
    const up=38;
    const down=40;
    const space=32; //pause

    const pressed= event.keyCode;
    const moveRight= dx === 10;
    const moveLeft= dx === -10;
    const moveDown= dy === 10;
    const moveUp= dy === -10;

    if(pressed === left && !moveRight){
        dx = -10;
          dy = 0;  
     }
 
     if (pressed === up && !moveDown)
     {    
          dx = 0;
          dy = -10;
     }
 
     if (pressed === right && !moveLeft)
     {    
          dx = 10;
          dy = 0;
     }
 
     if (pressed === down && !moveUp)
     {    
          dx = 0;
          dy = 10;
     }
     if(pressed === space){
        dx= 0;
        dy=0;
     }
    
}