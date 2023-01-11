import rnd from "./functions.js";

const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');
const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

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
        this.radius = rnd(1,25);
        this.xPosition = rnd(canvasWidhth - this.radius, this.radius);
        this.yPosition = rnd(canvasHeight - this.radius, this.radius);
        this.velocity = 6/this.radius;
        this.xSpeed = this.velocity*Math.round(rnd(1,-1)) === 0 ? this.velocity*(-1) : this.velocity;
        this.ySpeed = this.velocity*Math.round(rnd(1,-1)) === 0 ? this.velocity*(-1) : this.velocity;
    }

    updateVelocity = () => {
        this.velocity = 6/this.radius;
    }

    moveBall = () => {
        this.xPosition += this.xSpeed;
        this.yPosition += this.ySpeed;
    }

    checkEdges = () => {
        let boundsXBegining = this.radius
        let boundsXEnd = canvasWidhth - this.radius
        let boundsYBegining = this.radius
        let boundsYEnd = canvasHeight - this.radius

        if(this.xPosition < boundsXBegining){
            this.xPosition = boundsXBegining
            this.xSpeed = this.xSpeed * (-1);
        }
        if(this.xPosition > boundsXEnd){
            this.xPosition = boundsXEnd
            this.xSpeed = this.xSpeed * (-1);
        }
        if(this.yPosition < boundsYBegining){
            this.yPosition = boundsYBegining
            this.ySpeed = this.ySpeed * (-1);
        }
        if(this.yPosition > boundsYEnd){
            this.yPosition = boundsYEnd
            this.ySpeed = this.ySpeed * (-1);
        }
    }

    drawBall = () => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(118, 200, 66)';
        ctx.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    connectBall = (otherBall, connectDist, connectEatSwitch) => {
        const x1 = this.xPosition
        const y1 = this.yPosition
        const x2 = otherBall.xPosition
        const y2 = otherBall.yPosition
        const a = x2 - x1;
        const b = y2 - y1;
        const c = Math.sqrt(a ** 2 + b ** 2);

        if (c <= connectDist) {
            const lineSize = map(c, 0, connectDist, 1, 0, false)
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.strokeStyle = `rgba(101, 130, 76, ${lineSize})`;
            ctx.lineTo(x2, y2);
            ctx.stroke();

            if(connectEatSwitch === true) {
                if(this.radius > otherBall.radius){
                    if(this.radius < canvasHeight/2){
                        otherBall.radius -= 0.1;
                        this.radius += 0.1;
                        otherBall.updateVelocity();
                    }
                }else{
                    if(otherBall.radius < canvasHeight/2){
                        this.radius -= 0.1;
                        otherBall.radius += 0.1;
                        this.updateVelocity();
                    }
                }
            }
        }
    }

    checkRadius = (ballArray) => {
        if(this.radius < 1){
            let ballIndex = ballArray.indexOf(this)
            ballArray.splice(ballIndex, 1)
        }
    }

    checkRepel = (cursorXPos, cursorYPos, cursorRadius, repelSwitch) => {
        let a = cursorXPos - this.xPosition;
        let b = cursorYPos - this.yPosition;
        let c = cursorRadius + this.radius;
        let dist = Math.sqrt(a**2 + b**2);
        let statement = a**2 + b**2 <= c **2;

        if(statement && repelSwitch === true){
            let velocityX = a/dist;
            let velocityY = b/dist;

            this.xPosition -= velocityX*5;
            this.yPosition -= velocityY*5;
        }
    }

}