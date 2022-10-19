const slides = document.querySelector('.slides')
const allImgNum = document.querySelectorAll('.img').length-1
const btnR = document.querySelector('#arrow-r')
const btnL = document.querySelector('#arrow-l')

let imgIndex = 0
let translateX = 0

const dots = document.querySelectorAll('input[type=radio')
const dot1 = document.querySelector('#radio1')
const dot2 = document.querySelector('#radio2')
const dot3 = document.querySelector('#radio3')
const dot4 = document.querySelector('#radio4')
const dot5 = document.querySelector('#radio5')


btnR.addEventListener('click', () => {
    if(imgIndex < allImgNum){
        imgIndex++
        translateX -= 600
    }else if(imgIndex === 4){
        imgIndex = 0
        translateX = 0
    }
    slides.style.transform = `translateX(${translateX}px)`
    dots.forEach(e=>e.removeAttribute('class','currentDot'))
    dots[imgIndex].setAttribute('class', 'currentDot')
})

let autoSlide = setInterval( () => {
    btnR.click()
}, 3000)

slides.addEventListener('mouseover', () => {
    clearInterval(autoSlide)
})

slides.addEventListener('mouseout', () => {
    autoSlide = setInterval( () => {
        btnR.click()
    }, 3000)
})

btnL.addEventListener('click', () => {
    if(imgIndex > 0){
        imgIndex--
        translateX += 600
    }else if(imgIndex === 0){
        imgIndex = 4
        translateX = -2400
    }
    slides.style.transform = `translateX(${translateX}px)`
    dots.forEach(e=>e.removeAttribute('class','currentDot'))
    dots[imgIndex].setAttribute('class', 'currentDot')
})


dot1.addEventListener('click', () => {
    imgIndex = 0
    translateX = 0
})
dot2.addEventListener('click', () => {
    imgIndex = 1
    translateX = -600
})
dot3.addEventListener('click', () => {
    imgIndex = 2
    translateX = -1200
})
dot4.addEventListener('click', () => {
    imgIndex = 3
    translateX = -1800
})
dot5.addEventListener('click', () => {
    imgIndex = 4
    translateX = -2400
})

dots.forEach((dot)=>{
    dot.addEventListener('click', () => {
        slides.style.transform = `translateX(${translateX}px)`
        dots.forEach(e=>e.removeAttribute('class','currentDot'))
        dot.setAttribute('class', 'currentDot')
    })

    dot.addEventListener('mouseover', () => {
        clearInterval(autoSlide)
    })

    dot.addEventListener('mouseout', () => {
        autoSlide = setInterval( () => {
            btnR.click()
        }, 3000)
    })
})