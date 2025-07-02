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

const buttonClear = document.createElement("button");
buttonContainer.appendChild(buttonClear)
buttonClear.style.width = 20 + "%"
buttonClear.textContent = "Clear"
buttonClear.classList.add("clear")

const buttonDel = document.createElement("button");
buttonContainer.appendChild(buttonDel)
buttonDel.style.width = 20 + "%"
buttonDel.textContent = "DEL"
buttonDel.classList.add("delete")

const buttonDot = document.createElement("button");
buttonContainer.appendChild(buttonDot)
buttonDot.style.width = 20 + "%"
buttonDot.textContent = "."
buttonDot.classList.add("digit")

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
    button.style.width = 20 + "%"
    
    buttonContainer.appendChild(button)
}



const obj = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
};

const mappedOperater = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

// a list of current operator
let  currentOperator = []
let result;

buttonContainer.addEventListener("click", event => {
    const target = event.target;
    
    function clearMemo() {
        for (key in obj) {
            obj[key] = undefined
        };
    }
    if (target.className === 'clear') {
        clearMemo()
        display.textContent = ''
        console.log(obj)

    } else if (target.className === 'operator') {
        
        display.textContent = ''
        const compute = target.textContent
        obj['operator'] = mappedOperater[compute]
        

        if (currentOperator.length > 0 
            && obj['num1'] !== undefined 
            && obj['num2'] !== undefined) {
            const lastOperator = currentOperator.pop();
            const tempResult = operate(lastOperator, obj['num1'],obj['num2']);
            display.textContent = tempResult;
            obj['num1'] = tempResult;
        }
        currentOperator.push(obj['operator'])
        console.log(currentOperator)
        console.log(obj)

    } else if (target.className === 'digit') {
        if (result !== undefined) {
            clearMemo();
            display.textContent = '';
        }
        if (currentOperator.length !== 0 && obj['num2'] === undefined) {
            display.textContent = ''
        }
        if (target.textContent === ".") {
            if (!display.textContent.includes(".")) {
                display.textContent += target.textContent
            }
        } else {display.textContent += target.textContent;}

        
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
        console.log(obj)
    } else if (target.className === "delete") {
        if (result !== undefined) {
            result = undefined;
            display.textContent = '';
        }
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
    
    else {
        if (currentOperator.length !== 0 
            && obj['num1'] !== undefined
            && obj['num2'] !== undefined) {
        result = operate(currentOperator.pop(),obj['num1'], obj['num2'])
        const roundedResult = result - result.toFixed(6) > 0 ? result.toFixed(5) : result
        display.textContent = roundedResult
        obj['num1'] = result
        result = undefined;
        }
        else {
            // display.textContent = obj['num1']
            result = undefined;
        }
        console.log(currentOperator)
        console.log(obj)
    }
}
)
