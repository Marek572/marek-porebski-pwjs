const hole = document.querySelector('#hole')
const ball = document.querySelector('#ball')

const windowWidth = window.innerWidth-50
const windowHeight = window.innerHeight-50

let holeXPosition = 0
let holeYPosition = 0
let holeXSpeed = 8
let holeYSpeed = 8

const animateHole = () => {
    if(holeXPosition >= windowWidth || holeXPosition < 0)
        holeXSpeed = holeXSpeed*(-1)
    if(holeYPosition >= windowHeight || holeYPosition < 0)
        holeYSpeed = holeYSpeed*(-1)
    holeXPosition += holeXSpeed
    holeYPosition += holeYSpeed
    hole.style.left = `${holeXPosition}px`
    hole.style.top = `${holeYPosition}px`
    requestAnimationFrame(animateHole)
}
requestAnimationFrame(animateHole)


let ballAlphaPosition = 0
let ballBetaPosition = 90
let ballAlphaDiff
let ballBetaDiff
let ballXSpeed = 0
let ballYSpeed = 0

window.addEventListener('deviceorientation', (cb) =>{
    ballAlphaDiff = ballAlphaPosition + cb.alpha
    ballBetaDiff = cb.beta - ballBetaPosition
    console.log(ballBetaDiff)
    if(ballAlphaDiff > 0)
        ball.style.left = `${ballAlphaDiff}px`
    if(ballBetaDiff > 0)
        ball.style.top = `${ballBetaDiff}px`
})

// requestAnimationFrame(animateBall)

console.log(ballAlphaPosition)
console.log(ballBetaPosition)