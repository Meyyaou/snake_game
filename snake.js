//the board(canvas)
const border='white';
const background='#727e4e';
const col='lightgreen';
const snake_border='white';
const board=document.getElementById("canvas");
const board_context=canvas.getContext("2d");
document.addEventListener("keydown", move)
//const restart=document.getElementById("play");
let sameDir=false;
let xF;
let yF;
//the snake now:
let snake=[{x: 200, y: 200},{x:190, y:200}, {x:180, y:200},
{x:170, y:200}, {x:160, y:200}, {x:150, y:200}, {x:140, y:200}, {x:130, y:200}  ];
let dx= 0;
let dy= 10;
main();
generatefood();

function main(){
  
    if(isGameOver()) return;

    sameDir=false;
    setTimeout(function onTick(){
        Restart(); //demarrer a  nouveau
        drawFood();
        moveSnake(); //le bouger
        AffSnake(); //IMPORTANT sinon we dont see the game
        main();
        //mettre des checkpoints
       
        //
    
    }, 100)}
   
    function generatefood() {  
        xF=Math.floor((Math.random()* (board.width - 10)+ 0)/ 10)*10;
        yF=Math.floor((Math.random()* (board.height - 10)+ 0)/ 10)*10;

       snake.forEach(function did_snake_eat_food(part) {
            const ate = part.x == xF && part.y ==yF;
            if (ate) {
              generatefood();}
          });
    }

    function drawFood(){

      board_context.fillStyle = 'black';
      board_context.strokestyle = 'darkgreen';
      board_context.fillRect(xF, yF, 10, 10);
      board_context.strokeRect(xF, yF, 10, 10);
}

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
    board_context.fillStyle='white';
    board_context.strokestyle='white';
    board_context.fillRect(snakeSeg.x, snakeSeg.y, 10, 10);
    board_context.strokeRect(snakeSeg.x, snakeSeg.y, 10, 10);  
    
}

function moveSnake(){
    const head={x: snake[0].x + dx, y: snake[0].y +dy};
    snake.unshift(head);
    const ate = snake[0].x === xF && snake[0].y === yF;
    if (ate) {
        let score =parseInt(document.querySelector(".score").innerHTML);
        document.querySelector('.score').innerHTML = parseInt(score) +10;//tofix error of display?
        generatefood();
      } else {
        snake.pop();
      }
}

function isGameOver(){
    //collision with walls
    if(snake[0].x < 0 || snake[0].x >board.width -10 || snake[0].y <0|| snake[0].y > board.height- 10){
        alert("game over");
        return true;    
    }
    for( i=4; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){ //for collide to itself
           alert("game over");
           //console.log("game?"); to fix i think ther ei san error here
            return true;   
        }
    }
}

function move(event){
    const left=37;
    const right=39;
    const up=38;
    const down=40;
    const space=32; //pause

    if(sameDir) return;
    sameDir=true;

    const pressed= event.keyCode;
    const moveRight= dx === 10;
    const moveLeft= dx === -10;
    const moveDown= dy === 10;
    const moveUp= dy === -10;

    let pausedDx = dx;
    let pausedDy = dy;
    let isPaused= false;

    switch (pressed) {
        case left:
          if (!moveRight) {
            dx = -10;
            dy = 0;
          }
          break;
        case up:
          if (!moveDown) {
            dx = 0;
            dy = -10;
          }
          break;
        case right:
          if (!moveLeft) {
            dx = 10;
            dy = 0;
          }
          break;
        case down:
          if (!moveUp) {
            dx = 0;
            dy = 10;
          }
          break;
        case space:   //tofix pause depause     
        if(!isPaused){   
          pausedDx=dx;
          pausedDy=dy;
          dx = 0;
          dy = 0;
          isPaused=true;
         }else{
          dy=pausedDy;
          dx=pausedDx;
          isPaused=false;
           }
           break;
        default:
          break;
      }
      

    
}