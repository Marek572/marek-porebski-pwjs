import { accelerationChange, moveBall } from "./ball.js"
import { animateHole } from "./hole.js"
const hole = document.querySelector('#hole')
const ball = document.querySelector('#ball')

const radiusBall = 50
const radiusHole = 70

let pauseGame = false

let winTriangleX
let winTriangleY
let winTriangleZ = radiusBall + radiusHole
const winCheck = () => {
    let xBallPos = parseInt(ball.style.left.slice(0, -2) + 50)
    let yBallPos = parseInt(ball.style.top.slice(0, -2) + 50)
    let xHolePos = parseInt(hole.style.left.slice(0, -2) + 70)
    let yHolePos = parseInt(hole.style.top.slice(0, -2) + 70)
    winTriangleX = xBallPos - xHolePos
    winTriangleY = yBallPos - yHolePos
    let ifStatement = winTriangleX ** 2 + winTriangleY ** 2 < (winTriangleZ - (2*radiusBall)) ** 2
    if (ifStatement) {
        pauseGame = true
        alert('wygrales!')
    }
}

const gameMaster = () => {
    if (pauseGame !== true) {
        animateHole()
        window.addEventListener('deviceorientation', accelerationChange)
        moveBall()
        winCheck()
    }
    requestAnimationFrame(gameMaster)
}
gameMaster()