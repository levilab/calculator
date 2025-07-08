/* Layout creation part:
Creating required buttons & display
*/
const body = document.querySelector("body");

// display screen
const display = document.createElement("div");
display.classList.add("display")
body.appendChild(display)

// button container
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("casual")
body.append(buttonContainer)

// background

const background = document.createElement("div");
background.setAttribute("id","background")
background.appendChild(display)
background.appendChild(buttonContainer)
body.append(background)


const buttons = {
    'functional': {'clear':'C',
                    'delete':'DEL',
                    'negative':'+/-',
                    'percent':'%'},
    'primaryButton': '789/456*123-0.=+',}

for (let key in buttons) {
    switch (key) {
        case 'primaryButton':
            for (let num of buttons[key]) {
                const buttonElement = document.createElement("button")
                buttonContainer.appendChild(buttonElement)
                buttonElement.textContent = num
                buttonElement.classList.add('0123456789.'.includes(num) ?'digit':'operator')
            }
        break;
    
        default:
            const functionalObj =  buttons[key]
            for (let button in functionalObj) {
                const buttonElement = document.createElement("button");
                buttonContainer.appendChild(buttonElement);
                buttonElement.textContent = functionalObj[button]
                buttonElement.classList.add(key, button)
                }
    }
}
/* Functions part:
Creating required buttons & display
*/

const mappedOperater = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

// an object for memory storage during calculation
const obj = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    result: undefined, 
};

// a list of current operator
let  currentOperator = []

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

function clearMemo() {
    for (key in obj) {
        obj[key] = undefined
        };
    }

function clear() {
    clearMemo()
    display.textContent = ''
}

function tempDelete() {
    // if (obj['result'] !== undefined) {
    //     obj['result'] = undefined;
    //     display.textContent = '';
    // }
    if (obj['num1'] !== undefined){
        if (obj['num2']==undefined) {
        display.textContent = display.textContent.slice(0, display.textContent.length-1)
        obj['num1'] = Number(display.textContent)
    } else {
        console.log(display.textContent.length)
        display.textContent = display.textContent.slice(0, display.textContent.length-1)
        obj['num2'] = Number(display.textContent)
    }
}
}

function calculate(operator) {
    display.textContent = ''
    obj['operator'] = mappedOperater[operator]
    
    if (currentOperator.length > 0 
        && obj['num1'] !== undefined 
        && obj['num2'] !== undefined) {
        obj['result'] = operate(currentOperator.pop(), obj['num1'],obj['num2']);
        display.textContent = obj['result'];
        obj['num1'] = obj['result'];
        obj['num2'] = undefined;
    }
    currentOperator.push(obj['operator'])

}

function addDigit(digit) {
    // chain calculation, clear the screen if previous calc. done & second num reset
    if (obj['result'] !== undefined && obj['num2'] === undefined) {
        display.textContent = '';
    }

    // edge case: float number
    if (digit === ".") {
        if (!display.textContent.includes(".")) {
            display.textContent += digit
        }
    }
    display.textContent += digit;

    
    // default behavior
    const num = display.textContent;
    if (!obj['num1'] || !obj['operator']) {
        obj['num1'] = Number(num)
    } else {
        obj['num2'] = Number(num)
        if (obj['num2']===0 && currentOperator[0] === divide) {
            display.textContent = "cannot divided by 0"
            clearMemo()
        }
    }
}


function modifyCurrent(args) {
    if (!obj['num1']) {display.textContent = ''}
    else if (!obj['num2']) {
        obj['num1'] *= args.includes('percent') ? 0.01 : -1;
        display.textContent = obj['num1']}
    else {
        obj['num2'] *= args.includes('percent') ? 0.01 : -1;
        display.textContent = obj['num2']
    }
}
// two functions, same steps, only different parameter values

buttonContainer.addEventListener("click", event => {
    const target = event.target;
    switch (target.className) {
        case 'functional clear':
            clear()
        break;

        case "functional delete":
            tempDelete()
        break;

        case "functional percent":
        case "functional negative":
            modifyCurrent(target.className)
            break;

        case 'operator':
            calculate(target.textContent)
            console.log(target.textContent)
        break;
        
        case 'digit':        
            addDigit(target.textContent)
            console.log(obj)
        break;
        
        default: // operator "="
            if (currentOperator.length !== 0 
                && obj['num1'] !== undefined
                && obj['num2'] !== undefined) {
            obj['result'] = operate(currentOperator.pop(),obj['num1'], obj['num2'])
            obj['operator'] = undefined
            const roundedResult = obj['result'].toFixed(5);
            display.textContent = roundedResult
            obj['num1'] = obj['result']
            // obj['result'] = undefined;
            }
            
            console.log(obj)
        }
}
)
