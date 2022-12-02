const windowWidthHole = window.innerWidth-140
const windowHeightHole = window.innerHeight-140

let holeXPosition = Math.random() * windowWidthHole
let holeYPosition = Math.random() * windowHeightHole
let holeXSpeed = 2
let holeYSpeed = 2

export const animateHole = () => {
    if(holeXPosition >= windowWidthHole || holeXPosition < 0)
        holeXSpeed = holeXSpeed*(-1)
    if(holeYPosition >= windowHeightHole || holeYPosition < 0)
        holeYSpeed = holeYSpeed*(-1)
    holeXPosition += holeXSpeed
    holeYPosition += holeYSpeed
    hole.style.left = `${holeXPosition}px`
    hole.style.top = `${holeYPosition}px`
}