const calc = document.querySelector(".calc")
const keys = calc.querySelector(".calc-keys")
const display = calc.querySelector(".calc-display")
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
calc.dataset.firstNumber = "0";

keys.addEventListener("click", event => {
  if (!event.target.closest("button")) return

  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const {
    type
  } = key.dataset
  const {
    previousKeyType
  } = calc.dataset

  if (type === "number"
  // && displayValue.length < 9
) {
    if (displayValue === "0") {
      display.textContent = keyValue
    } else if (previousKeyType === "operator") {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }

  if (type === "coma") {
    if (display.textContent.includes(".")) {
      console.log("juz ma ,");
    } else {
      display.textContent += "."
    }
  }

  if (type === "operator") {
    operatorKeys.forEach(el => {
      el.dataset.state = ""
    })
    key.dataset.state = "selected"
    calc.dataset.firstNumber = parseFloat(displayValue)
    calc.dataset.operator = key.dataset.key
    console.log(displayValue.length);
  }

  if (type === 'equal') {
    const firstNumber = calc.dataset.firstNumber
    const secondNumber = displayValue
    const operator = calc.dataset.operator
    if (operator === undefined) {
      display.textContent = secondNumber
    } else {
      display.textContent = calculate(firstNumber, operator, secondNumber)
    }

  }

  if (type === 'all-clear') {
    display.textContent = '0'
    delete calc.dataset.firstNumber
    delete calc.dataset.operator
  }

  if (type === 'plus-minus'){
    display.textContent = -(display.textContent)
  }

  if (type === "percent"){
    display.textContent = display.textContent / 100
  }

  calc.dataset.previousKeyType = type
})


function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseFloat(firstNumber)
  secondNumber = parseFloat(secondNumber)
  if (operator === "addition") return (firstNumber + secondNumber)
  if (operator === "subtraction") return firstNumber - secondNumber
  if (operator === "multiplication") return firstNumber * secondNumber
  if (operator === "division") return firstNumber / secondNumber

}

function clearCalculator() {
  // Press the clear key
  const clearKey = document.querySelector('[data-type="all-clear"]')
  clearKey.click()

  // Clear operator states
  operatorKeys.forEach(key => {
    key.dataset.state = ''
  })
}

function testClearKey() {
  clearCalculator()
  console.assert(display.textContent === '0', 'Clear key. Display should be 0')
  console.assert(!calc.dataset.firstNumber, 'Clear key. No first number remains')
  console.assert(!calc.dataset.operator, 'Clear key. No operator remains')

}
