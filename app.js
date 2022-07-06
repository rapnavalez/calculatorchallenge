const allBtns = document.querySelectorAll(".numberpad--btn")
const numberBtns = document.querySelectorAll(".number")
const operatorBtns = document.querySelectorAll(".operator")
const delBtn = document.querySelector(".del")
const resetBtn = document.querySelector(".reset")
const equalsBtn = document.querySelector(".equals")
const display = document.querySelector(".screen--display")
const prevInput = document.querySelector(".screen--prevInput")


class Calculator {
    constructor(screenDisplay, prevInput) {
        this.screenDisplay = screenDisplay
        this.prevInput = prevInput
        this.reset()
    }

    reset() {
        this.prevInput.innerText = ""
        this.screenDisplay.innerText = "0"
        this.screenDisplay.style.fontSize = "2.4rem"
        this.currentAction = ""
        this.prevAction = ""
        this.operator = undefined
    }

    delete() {
        this.currentAction = this.currentAction.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentAction.includes(".")) return
        if (this.screenDisplay.innerText.length > 15) return
        this.currentAction = this.currentAction.toString() + number.toString()
    }

    selectOperator(operator) {
        if (this.currentAction === "") return
        if (this.currentAction !== "") {
            this.compute()
        }
        this.operator = operator
        this.prevAction = this.currentAction
        this.currentAction = ""
    }

    displayPrevAction () {
        if(this.screenDisplay.innerText === "") {
            this.screenDisplay.innerText = this.prevAction
        }
    }
    
    compute() {
        let result
        if(isNaN(parseFloat(this.prevAction)) || isNaN(parseFloat(this.currentAction))) return
        switch(this.operator) {
            case "+":
                result = parseFloat(this.prevInput.innerText) + parseFloat(this.currentAction)
                break;
            case "-":
                result = parseFloat(this.prevInput.innerText) - parseFloat(this.currentAction)
                break;
            case "×":
                result = parseFloat(this.prevInput.innerText) * parseFloat(this.currentAction)
                break;
            case "÷":
                result = parseFloat(this.prevInput.innerText) / parseFloat(this.currentAction)
                break;
            default:
                break;
        }
        this.currentAction = result
        this.prevAction = ""
        this.operator = undefined
    }

    modifyDisplay(display) {
        //to be updated later
        return display
    }


    ifScreenIsEmpty() {
        if(this.screenDisplay.innerText === "") {
            this.screenDisplay.innerText = 0
        }
    }

    updateDisplay() {
        this.screenDisplay.innerText = this.currentAction
        if (this.screenDisplay.innerText.length > 11) {
            this.screenDisplay.style.fontSize = ".6em"
        } else {
            this.screenDisplay.style.fontSize = "2.4rem"
        }
        if (this.operator) {
            this.prevInput.innerText = `${this.modifyDisplay(this.prevAction)} ${this.operator}`
        }
        
    }

}

const calculator = new Calculator(display, prevInput)

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.selectOperator(btn.innerText)
        calculator.compute()
        calculator.updateDisplay()
        calculator.displayPrevAction()
    })
})

equalsBtn.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

resetBtn.addEventListener("click", () => {
    calculator.reset()
})

delBtn.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
    calculator.ifScreenIsEmpty()
})





// ******************THEME RELATED CODES************************

const radioBtn = document.querySelectorAll('[name="theme-option"]')
const html = document.querySelector("html")

let theme
let btn
window.onload = () => {
    theme = localStorage.getItem("theme") || "theme=1"
    html.setAttribute("data-theme", theme)
    btn = document.querySelector(`#${theme}`)
    btn.checked = true
}

const saveTheme = (selected) => {
    localStorage.setItem("theme", selected)
}

radioBtn.forEach(btn => {

    btn.addEventListener("click", e => {
        e.target.id
        saveTheme(e.target.id)
        switch(e.target.id){
            case "theme-1":
                html.setAttribute("data-theme", "theme-1")
                break;
            case "theme-2":
                html.setAttribute("data-theme", "theme-2")
                break;
            case "theme-3":
                html.setAttribute("data-theme", "theme-3")
                break;
            default:
                break;
        }
    })
})
