//the board(canvas)
const border='black';
const background='white';
const col='lightgreen';
const snake_border='blue';
const board=document.getElementById("canvas");
const board_context=canvas.getContext("2d");
var score=0;

//the snake now:
let snake=[{x: 200, y: 200},{x:190, y:200}, {x:180, y:200},
{x:170, y:200}, {x:160, y:200}, ];
let dx= 0;
let dy= 10;

main();
function main(){
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