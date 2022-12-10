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
const resetBtn = document.querySelector('#resetBtn');
const stopSwitchBtn = document.querySelector('#stopSwitchBtn');
let stopSwitch = false;

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


//CURSOR
const cursor = new Cursor();
canvas.addEventListener('mousemove', (event) => {
    if (event.offsetX >= 0 && event.offsetX <= canvasWidhth)
        cursor.xPosition = event.offsetX;
    if(event.offsetY >= 0 && event.offsetY <= canvasHeight)
        cursor.yPosition = event.offsetY;
});


//else
let ballArray = generateBalls(ballsQuantity)
let stopDraw;
const draw = () => {
    ctx.clearRect(0, 0, canvasWidhth, canvasHeight);
    cursor.drawCursorRadius();
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].checkEdges();
        ballArray[i].moveBall();
        ballArray[i].drawBall();
        for (let j = 1; j < ballArray.length; j++) {
            if (ballArray[i] !== ballArray[j])
                ballArray[j].connectBall(ballArray[i], connectDist);
        }
    }

    stopDraw = requestAnimationFrame(draw);
}
draw();
