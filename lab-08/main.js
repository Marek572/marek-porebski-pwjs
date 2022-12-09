import { generateBalls, inputValueChange } from "./functions.js";

const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');

const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

let ballArray = generateBalls(30)

let stopDraw;
const draw = () => {
    ctx.clearRect(0, 0, canvasWidhth, canvasHeight);

    for (let i = 0; i < ballArray.length; i++) {
        for (let j = 1; j < ballArray.length; j++) {
            ballArray[i].drawBall();
            ballArray[i].moveBall();
            ballArray[i].checkEdges();
            if (ballArray[i] !== ballArray[j])
                ballArray[j].connectBall(ballArray[i]);
        }
    }

    stopDraw = requestAnimationFrame(draw);
}
draw();

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
    ballArray = generateBalls(30);
});

const inputQuantity = document.querySelector('#inputQuantity');
const quantityValue = document.querySelector('#ballQuantityValue');
inputValueChange(inputQuantity, quantityValue);

const inputConnectDist = document.querySelector('#inputConnectDist');
const connectDistValue = document.querySelector('#ballConnectDistValue');
inputValueChange(inputConnectDist, connectDistValue);