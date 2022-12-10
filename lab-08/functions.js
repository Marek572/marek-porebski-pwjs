import Ball from "./ball.js";

export const rnd = (max, min) => {
    if (min)
        return Math.random() * (max - min) + min;
    else
        return Math.random() * max;
}

export const generateBalls = (quantity) => {
    const array = [];
    for (let i = 0; i < quantity; i++) {
        const newBall = new Ball();
        array.push(newBall);
    }
    return array;
}

export const inputValueChange = (input, output) => {
    input.addEventListener("input", () => {
        output.value = input.value;
    });
};

export default rnd;