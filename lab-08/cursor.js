const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');
const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

// input range with radius of THIS circle
// cursor x, y, radius, ?strength of push/pull?
// possible addon => switch between pull and push

export class Cursor {

    constructor(xPosition, yPosition/*, strength*/) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.radius = 50;
        //this.strength = radius;
    };

    drawCursorRadius = () => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(118, 200, 66, 0.1)';
        ctx.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    };

}