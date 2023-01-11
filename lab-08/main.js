import { generateBalls, inputValueChange } from "./functions.js";
import { Cursor } from "./cursor.js";

const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');

const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

//INPUT RANGE
const inputQuantity = document.querySelector('#inputQuantity');
const outputQuantity = document.querySelector('#ballQuantityValue');
let ballsQuantity = outputQuantity.value;
inputValueChange(inputQuantity, outputQuantity);

const inputConnectDist = document.querySelector('#inputConnectDist');
const outputConnectDist = document.querySelector('#ballConnectDistValue');
let connectDist = outputConnectDist.value;
inputValueChange(inputConnectDist, outputConnectDist);


//BUTTONS
const stopSwitchBtn = document.querySelector('#stopSwitchBtn');
let stopSwitch = false;

const resetBtn = document.querySelector('#resetBtn');

const mouseRepelSwitchBtn = document.querySelector('#mouseRepelSwitchBtn');
let repelSwitch = false;

const connectEatSwitchBtn = document.querySelector('#connectEatSwitchBtn');
let connectEatSwitch = false;


stopSwitchBtn.addEventListener('click', () => {
    stopSwitchBtn.classList.toggle('btnActive');
    if (stopSwitch === false) {
        stopSwitch = true;
        stopSwitchBtn.innerHTML = 'Start';
        cancelAnimationFrame(stopDraw);
    } else if (stopSwitch === true) {
        stopSwitch = false;
        stopSwitchBtn.innerHTML = 'Stop';
        draw();
    }
});

resetBtn.addEventListener('click', () => {
    ballArray = [];
    ballsQuantity = outputQuantity.value;
    connectDist = outputConnectDist.value;
    ballArray = generateBalls(ballsQuantity);
});


mouseRepelSwitchBtn.addEventListener('click', () => {
    mouseRepelSwitchBtn.classList.toggle('btnActive');
    repelSwitch = !repelSwitch
});

connectEatSwitchBtn.addEventListener('click', () => {
    connectEatSwitchBtn.classList.toggle('btnActive');
    connectEatSwitch = !connectEatSwitch
});



//CURSOR
const cursor = new Cursor();
canvas.addEventListener('mousemove', (event) => {
    if (event.offsetX >= 0 && event.offsetX <= canvasWidhth)
        cursor.xPosition = event.offsetX;
    if(event.offsetY >= 0 && event.offsetY <= canvasHeight)
        cursor.yPosition = event.offsetY;
});

const ballClick = () => {

    for(let i = 0; i < ballArray.length; i++){
        let a = cursor.xPosition - ballArray[i].xPosition;
        let b = cursor.yPosition - ballArray[i].yPosition;
        let c = ballArray[i].radius;
        let statement = a**2 + b**2 <= c**2;

        if(statement){
            let ballIndex = ballArray.indexOf(ballArray[i]);
            ballArray.splice(ballIndex, 1);
        }
    }

}

canvas.addEventListener('click', () => {
    ballClick();
});

//else
let ballArray = generateBalls(ballsQuantity)
let stopDraw;
const draw = () => {
    ctx.clearRect(0, 0, canvasWidhth, canvasHeight);

    if(repelSwitch === true)
        cursor.drawCursorRadius();

    for (let i = 0; i < ballArray.length; i++) {

        ballArray[i].checkEdges();
        ballArray[i].moveBall();
        ballArray[i].drawBall();
        ballArray[i].checkRepel(cursor.xPosition, cursor.yPosition, cursor.radius, repelSwitch);
        for (let j = 1; j < ballArray.length; j++) {
            if (ballArray[i] !== ballArray[j])
                ballArray[j].connectBall(ballArray[i], connectDist, connectEatSwitch);
        }
        ballArray[i].checkRadius(ballArray);

    }
    stopDraw = requestAnimationFrame(draw);
}
draw();