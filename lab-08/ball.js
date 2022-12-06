import rnd from "./functions.js";

const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');
const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

//FIXME: why is that?
const map = (value, start1, stop1, start2, stop2, withinBounds = false) => {
    const newVal = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if(!withinBounds)
        return newVal;
    if(start2 < stop2)
        return constrain(newVal, start2, stop2);
    else
        return constrain(newVal, stop2, start2);
}

export default class Ball {
    constructor() {
        this.xPosition = rnd(canvasWidhth - 10, 10);
        this.yPosition = rnd(canvasHeight - 10, 10);
        this.radius = 10;
        this.xSpeed = rnd(1, -1) / 10;
        this.ySpeed = rnd(1, -1) / 10;
    }

    moveBall = () => {
        this.xPosition += this.xSpeed;
        this.yPosition += this.ySpeed;
    }

    checkEdges = () => {
        if (this.xPosition > canvasWidhth - 10 || this.xPosition - 10 < 0)
            this.xSpeed = this.xSpeed * (-1);
        if (this.yPosition > canvasHeight - 10 || this.yPosition - 10 < 0)
            this.ySpeed = this.ySpeed * (-1);
    }

    drawBall = () => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(118, 200, 66)';
        const startAngle = 0;
        const endAngle = 2 * Math.PI;
        ctx.arc(this.xPosition, this.yPosition, this.radius, startAngle, endAngle);
        ctx.stroke();
    }

    connectBall = (otherBall) => {
        const x1 = this.xPosition
        const y1 = this.yPosition
        const x2 = otherBall.xPosition
        const y2 = otherBall.yPosition
        const a = x2 - x1;
        const b = y2 - y1;
        const c = Math.sqrt(a ** 2 + b ** 2);

        if (c <= canvasWidhth * 0.2) {
            const lineSize = map(c, 0, canvasWidhth * 0.2, 1, false) //FIXME: here too
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.strokeStyle = `rgba(101, 130, 76, ${lineSize})`;
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
}