const inputs = document.querySelector('#inputs')

const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
let i = 3 //starting inputs number
// let numbersStr = []
let numbers = []


const resultsDiv = document.querySelector('#results')
const sumDiv = document.querySelector('#sum')
const avgDiv = document.querySelector('#avg')
const minDiv = document.querySelector('#min')
const maxDiv = document.querySelector('#max')

const addInputBtn = document.querySelector('#addInput')
const removeInputBtn = document.querySelector('#removeInput')
const calcBtn = document.querySelector('#calc')


calcBtn.addEventListener('click', () => {
  let sum = 0
  for (let num of numbers) {
    sum += num;
  }
  sumDiv.textContent = `sum: ${sum}`
  avgDiv.textContent = `avg: ${sum / i}`
  minDiv.textContent = `min: ${Math.min.apply(Math, numbers)}`
  maxDiv.textContent = `max: ${Math.max.apply(Math, numbers)}`
})

addInputBtn.addEventListener('click', () => {
  i++;
  let newInput = document.createElement('input')
  newInput.setAttribute('type', 'number')
  newInput.setAttribute('id', `num${i}`)
  inputs.appendChild(newInput)
  numbers.push(+newInput.value)

  const str = 'num'+i
  const numi = document.querySelector(`#${str}`)

  numi.addEventListener('input', () => {
    updateNumbers()
    calcBtn.click();
  });
})

removeInputBtn.addEventListener('click', () => {
  if (i > 3) {
    i--
    inputs.removeChild(inputs.lastChild)
  }
})

const updateNumbers = () =>{
  const temp =  Array.from(document.querySelectorAll('input'))
  const allNums = temp.map(e=>{return +e.value})
  numbers = allNums
}

num1.addEventListener('input', () => {
  updateNumbers()
  calcBtn.click();
});

num2.addEventListener('input', () => {
  updateNumbers()
  calcBtn.click();
});

num3.addEventListener('input', () => {
  updateNumbers()
  calcBtn.click();
});

