const screen = document.querySelector(".screen--input");
const btns = document.querySelectorAll(".numberpad--btn")
const btnNumber = document.querySelectorAll(".number")
const btnOperators = document.querySelectorAll(".operator")




const nums = ["1","2","3","4","5","6","7","8","9","0"]
const operators = ["/", "*", "+", "-"]
let prevEntry
let num1
let num2
let operator
let justSolved = false
btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        //get the value of the btn
        const value = e.target.value

        //check if the value is a number
        if(nums.includes(value)) {
            //check if the current screen value is 0
            if(screen.value === "0") {
                //remove the 0 if the current screen value is 0
                screen.value = ""
                screen.value += value
            } else {
                if(justSolved) {
                    screen.value = ""
                    screen.value += value
                    justSolved = false
                } else {
                    screen.value += value
                }
            }
        
        } else if(value === "." && !screen.value.includes(".")) {
            screen.value += value
        //check if the value is an operator
        } else if(operators.includes(value)) {
            //check if there was already a number before an operator is selected
            if(screen.value === "0") {
                alert("enter a number first")
            } else {
                prevEntry = screen.value.charAt(screen.value.length-1);
                //change to the operator if the previous entry was an operator
                if(operators.includes(prevEntry)) {
                    let screen2 = screen.value.slice(0, -1)
                    screen.value = screen2
                    screen.value += value
                    operator = value   
                } else {
                    //resolve the operation if there's already an operator in the screen
                    if(screen.value.includes("/") || screen.value.includes("*") || screen.value.includes("-") || screen.value.includes("+")) {
                        // screen.value = getResult(num1, num2, operator)
                        // screen.value += value
                        null
                    } else {
                        screen.value += value
                        operator = value
                    }

                }
            }
        //reset the screen value
        } else if(value === "RESET") {
            screen.value = "0"
        //delete the last character on the screen
        } else if(value === "DEL") {
            if(screen.value !== "0") { 
                let screen2 = screen.value.slice(0, -1)
                if (screen.value.length <= 1) {
                    screen.value = "0"
                } else {
                    screen.value = screen2
                }
            }
        //solved the operation
        } else if(value === "=" && justSolved === false) {
            num1 = screen.value.substr(0, screen.value.indexOf(operator))
            num2 = screen.value.substr(screen.value.indexOf(operator)+1)
            if (num1 && num2) {
                screen.value = getResult(num1, num2, operator)
                justSolved = true
            } else {
                num1 = ""
                num2 = ""
            }
        }
    })
})


let equals
const getResult = (num1, num2, operator) => {
    num1 = parseFloat(num1)
    num2 = parseFloat(num2)
    switch(operator) {
        case "/":
            equals = num1 / num2;
            break;
        case "*":
            equals = num1 * num2;
            break;
        case "+":
            equals = num1 + num2;
            break;
        case "-":
            equals = num1 - num2;
        default:
            break;
    }

    return equals
}