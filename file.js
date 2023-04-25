// constants && variables
let dir = { x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const board = document.querySelector(".board")
const scorebox = document.querySelector(".scoreBox")
const hiscoreBox = document.querySelector(".hiscoreBox")
let speed = 4;
let ltime = 0;
let snake = [
      {x:13, y:15}
];
let food = {x: 6, y:7}
let score=0;



// game functions

const main = (ctime)=>{
    window.requestAnimationFrame(main)
    if((ctime-ltime)/1000 < 1/speed){
       return;
    }
    ltime= ctime;
    gameEngine();
}



function isCollide(snake){
    for(i =1; i<snake.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
       }
    }
    if(snake[0].x>16|| snake[0].x<0 || snake[0].y>16 || snake[0].y<0){
        return true
    }

}
let musicPlaying = false;

function playMusic() {
    musicPlaying = true;
    musicSound.play();
    gameEngine(); // add this line
  }
  
  playMusic(); // call playMusic() immediately after it's defined
  

document.addEventListener("click", playMusic, { once: true });
function gameEngine(){
    if (!musicPlaying) {
        return;
      }
    //on collide
    if(isCollide(snake)){
        location.reload
        gameOverSound.play();
        musicSound.pause();
        dir= {x:0, y:0};
        alert("game over");
        snake = [
            {x:13, y:15}
        ]
        musicSound.play();
        scorebox.innerHTML = `Score: ${0}`

    }

    //increament score and snake when eaten the food
    if(snake[0].y=== food.y && snake[0].x===food.x){
        foodSound.play();
        score += 1;
        speed ++;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = `High Score: ${hiscoreval}   `
        }
        scorebox.innerHTML = `Score: ${score}`
        snake.unshift({
            x: snake[0].x + dir.x,
            y: snake[0].y + dir.y
        });
        let a, b;
        let myCondition = true;
        while (myCondition) {
            a=Math.ceil(Math.random()*16);
            b=Math.ceil(Math.random()*16);
            myCondition = snake.some(snake=> snake.x === a && snake.y===a)
        }
        food = {
            x: a,
            y: b
        }
    }

    //Moving the snake

    for (let i = snake.length - 2; i>=0; i--) { 
        snake[i+1] = {...snake[i]};
    }

    snake[0].x += dir.x;
    snake[0].y += dir.y;


    //display snake
    board.innerHTML = "";
    snake.forEach((e, index)=>{
        snakeElement= document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add("head")
        }else snakeElement.classList.add("snake")
        board.appendChild(snakeElement)
    });

    //display food
    foodElement= document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)

}

let hiscore = localStorage.getItem("hiscore")
if(hiscore=== null){
    let hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}else{
    hiscoreval = JSON.parse(hiscore)
    hiscoreBox.innerHTML = `High Score: ${hiscore}`
}
//logic building

window.requestAnimationFrame(main)

window.addEventListener("keydown", e=>{
    dir = {x:0, y:1};
    moveSound.play()
    switch(e.key){
        case "ArrowUp": console.log("Arrow Up"); dir.x=0; dir.y=-1; ;break;
        case "ArrowDown": console.log("Arrow Down"); dir.x=0; dir.y=1 ;break;
        case "ArrowLeft": console.log("Arrow Left"); dir.x=-1; dir.y=0 ;break;
        case "ArrowRight": console.log("Arrow Right"); dir.x=1; dir.y=0 ;break;
        default:break
    }

})
