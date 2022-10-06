// const liczba1 = document.querySelector('#liczba1')
// console.dir(liczba1)
// const przeliczBtn = document.querySelector('#przelicz')
// przeliczBtn.addEventListener('click', () => {
//     console.log(liczba1.value)
// })

const inputs = document.querySelector('#inputs')

const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')

const num1Value = parseInt(num1.value)
const num2Value = parseInt(num2.value)
const num3Value = parseInt(num3.value)

const sum = num1Value+num2Value+num3Value
const avg = sum/3
const min = Math.min(num1Value, num2Value, num3Value)
const max = Math.max(num1Value, num2Value, num3Value)

const resultsDiv = document.querySelector('#results')
const sumDiv = document.querySelector('#sum')
const avgDiv = document.querySelector('#avg')
const minDiv = document.querySelector('#min')
const maxDiv = document.querySelector('#max')

const addInputBtn = document.querySelector('#addInput')
const calcBtn = document.querySelector('#calc')

calcBtn.addEventListener('click', () => {
    // resultsDiv.innerHTML = `results: sum: ${sum}, avg: ${avg}, min: ${min}, max: ${max}`
    sumDiv.innerHTML = `sum: ${sum}`
    avgDiv.innerHTML = `avg: ${avg}`
    minDiv.innerHTML = `min: ${min}`
    maxDiv.innerHTML = `max: ${max}`
})

let i = 3;

addInputBtn.addEventListener('click', () => {
    i++;
    console.log(i)
    let newInput = document.createElement('input');
    newInput.setAttribute('id', `num${i}`);
    inputs.appendChild(newInput);
})