//the board(canvas)
const border='black';
const background='white';
const col='lightgreen';
const snake_border='blue';
const board=document.getElementById("canvas");
const board_context=canvas.getContext("2d");
var score=0;
document.addEventListener("keydown", moveDir)


//the snake now:
let snake=[{x: 200, y: 200},{x:190, y:200}, {x:180, y:200},
{x:170, y:200}, {x:160, y:200}, ];
let dx= 0;
let dy= 10;

main();
function main(){
  //  if(hasEnded()) return;

    //moveDir=false;
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
}

function AffSnake(){
    snake.forEach(drawSnake);
}

function drawSnake(snakeSeg){
    board_context.fillStyle='lightgreen';
    board_context.strokestyle='red';
    board_context.fillRect(snakeSeg.x, snakeSeg.y, 10, 10);
    board_context.strokeRect(snakeSeg.x, snakeSeg.y, 10, 10);
}

function move(){
    const head={x: snake[0].x + dx, y: snake[0].y +dy};
    snake.unshift(head);
    snake.pop();
}
function hasEnded(){
    for(let i=4; i< snake.length; i++){
        const has_collided= snake[i].y === snake[0].y && snake[i].x === snake[0].x;
        if(has_collided)
            return true;
    }
    const lwall= snake[0].x < 0;
    const rwall= snake[0].x > board.width - 10;
    const twall= snake[0].y &lt; 0;
    const bwall= snake[0].y > board.height - 10;

    return lwall || rwall || bwall || twall;

}

function moveDir(event){
    const left=37;
    const right=39;
    const up=38;
    const down=40;

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
}