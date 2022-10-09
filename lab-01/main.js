const inputs = document.querySelector('#inputs')

let i = 3 //starting inputs number
const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
var numbers = []

const resultsDiv = document.querySelector('#results')
const sumDiv = document.querySelector('#sum')
const avgDiv = document.querySelector('#avg')
const minDiv = document.querySelector('#min')
const maxDiv = document.querySelector('#max')

const addInputBtn = document.querySelector('#addInput')
const removeInputBtn = document.querySelector('#removeInput')
const calcBtn = document.querySelector('#calc')


calcBtn.addEventListener('click', () => {
  var sum = 0
  for (var num of numbers) {
    sum += (num * 1);
  }
  sumDiv.textContent = `sum: ${sum}`
  avgDiv.textContent = `avg: ${sum / 3}`
  minDiv.textContent = `min: ${Math.min.apply(Math, numbers)}`
  maxDiv.textContent = `max: ${Math.max.apply(Math, numbers)}`
})

// addInputBtn.addEventListener('click', () => {
//   i++;
//   let newInput = document.createElement('input')
//   newInput.setAttribute('id', `num${i}`)
//   inputs.appendChild(newInput)
// })

// removeInputBtn.addEventListener('click', () => {
//   if (i != 3) {
//     i--
//     const removeInput = document.querySelector('input')
//     if (removeInput.value == '')
//       inputs.removeChild(inputs.lastChild)
//   }
// })


num1.addEventListener('change', (event) => {
  numbers.push(num1.value*1)
  calcBtn.click();
});

num2.addEventListener('change', (event) => {
  numbers.push(num2.value*1)
  calcBtn.click();
});

num3.addEventListener('change', (event) => {
  numbers.push(num3.value*1)
  calcBtn.click();
});

