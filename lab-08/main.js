import Ball from "./ball.js";
const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');

const canvasWidhth = canvas.width
const canvasHigh = canvas.height
let i = 0;

const draw = () => {
    ctx.clearRect(0, 0, canvasWidhth, canvasHigh);

    const newBall = new Ball({
        radius: 10,
    });

    ctx.beginPath();
    const x = 50 + i;
    const y = 50 + i;
    const startAngle = 0;
    const endAngle = 2 * Math.PI;

    ctx.arc(x, y, newBall.radius, startAngle, endAngle);
    ctx.stroke();

    i++
    requestAnimationFrame(draw)
}

draw();