const canvas = document.querySelector('#ballsContainer');
const ctx = canvas.getContext('2d');
const canvasWidhth = canvas.width;
const canvasHeight = canvas.height;

// if cursor x y is in bound of canvas => create circle around it
// if ball close to THIS circle => push to opposite direction
// input range with radius of THIS circle
// cursor x, y, radius, ?strength of push/pull?
// possible addon => switch between pull and push

export class Cursor{

    constructor(xPosition, yPosition/*, radius, strength*/) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.radius = 10;
        // this.strength = radius;
    };

    drawCursorRadius = () => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(118, 200, 66)';
        ctx.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    };
}