const windowWidthBall = window.innerWidth-100
const windowHeightBall = window.innerHeight-100

let ballGammaPosition = Math.random() * windowWidthBall
let ballBetaPosition = Math.random() * windowHeightBall
let ballXVelocity = 0
let ballYVelocity = 0

const xVelocity = document.querySelector('#xVelocity')
const yVelocity = document.querySelector('#yVelocity')
const xPosition = document.querySelector('#xCoords')
const yPosition = document.querySelector('#yCoords')

const ballInfo = () => {
    xVelocity.innerHTML = `x velocity: ${ballXVelocity}`
    yVelocity.innerHTML = `y velocity: ${ballYVelocity}`
    xPosition.innerHTML = `x coords: ${ballGammaPosition}`
    yPosition.innerHTML = `y coords: ${ballBetaPosition}`
}

export const accelerationChange = (e) => {
    ballXVelocity = e.gamma/20
    ballYVelocity = e.beta/20
}

export const moveBall = () => {
    let x = ballGammaPosition+ballXVelocity
    if(x<windowWidthBall && x>0){
        ballGammaPosition+=ballXVelocity
        ball.style.left = `${ballGammaPosition}px`
    }

    let y = ballBetaPosition+ballYVelocity
    if(y<windowHeightBall && y>0){
        ballBetaPosition+=ballYVelocity
        ball.style.top = `${ballBetaPosition}px`
    }
    ballInfo()
}