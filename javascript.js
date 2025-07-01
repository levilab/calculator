function add(a,b) {
    return a+b
};

function subtract(a,b) {
    return a-b
}

function multiply(a,b) {
    return a*b
}

function divide(a,b) {
    return a/b
}

function operate(operator, num1, num2) {
    return operator(num1, num2)
}

const body = document.querySelector("body");

const display = document.createElement("div");
display.classList.add("display")
// display.textContent = "Display"
// display.setAttribute("id","text")
body.appendChild(display)

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("casual")
body.append(buttonContainer)

const digitOperator = '0123456789+-*/='

for (item of digitOperator) {
    const button = document.createElement("button");
    button.textContent = item;
    if ('+-*/'.includes(item)) {
        button.classList.add('operator')
    } else if ('='.includes(item)) {
        button.classList.add('calculate')
    } else {
        button.classList.add('digit')
    }
    button.style.width = 25 + "%"
    
    buttonContainer.appendChild(button)
}

const buttonClear = document.createElement("button");
buttonContainer.appendChild(buttonClear)
buttonClear.style.width = 25 + "%"
buttonClear.textContent = "Clear"
buttonClear.classList.add("clear")

const obj = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
};

const mappedOperated = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

buttonContainer.addEventListener("click", event => {
    const target = event.target
    if (target.className === 'clear') {
        display.textContent = ''

    } else if (target.className === 'operator') {
        display.textContent = ''
        const compute = target.textContent
        obj['operator'] = mappedOperated[compute]
        console.log(obj)

    } else if (target.className === 'digit') {

        display.textContent += target.textContent
        const num = display.textContent
        if (!obj['num1']) {
            obj['num1'] = Number(num)
        } else {
            obj['num2'] = Number(num)
        }
        console.log(obj)
    } else {
        const result = operate(obj['operator'],obj['num1'], obj['num2'])
        display.textContent = result
        console.log(target)
        
    }

    
})

console.log(obj)
