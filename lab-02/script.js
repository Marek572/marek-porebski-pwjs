const slides = document.querySelector('.slides')
const btnR = document.querySelector('#arrow-r')
const btnL = document.querySelector('#arrow-l')

btnR.addEventListener('click', () => {
    slides.setAttribute('id', 'slide-r')
})

btnL.addEventListener('click', () => {
    slides.setAttribute('id', 'slide-l')
})