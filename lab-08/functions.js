import Ball from "./ball.js";

export const rnd = (max, min) => {
    if (min)
        return Math.random() * (max - min) + min;
    else
        return Math.random() * max;
}

//TODO: from inputs generateBalls(number, size, speed)
export const generateBalls = (number) => {
    const array = [];
    for (let i = 0; i < number; i++) {
        const newBall = new Ball();
        array.push(newBall);
    }
    return array;
}

export default rnd;