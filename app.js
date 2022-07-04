const screen = document.querySelector(".screen--input");
const firstInput = document.querySelector(".firstInput");
const btns = document.querySelectorAll(".numberpad--btn")
const btnNumber = document.querySelectorAll(".number")
const btnOperators = document.querySelectorAll(".operator")


const nums = ["1","2","3","4","5","6","7","8","9","0"]
const operators = ["/", "*", "+", "-"] 
let numArray = []
let num1
let num2
let operator
let equals




const getNum1 = () => {
    btns.forEach(btn => {
        btn.addEventListener("click", (e)=> {
            let val = e.target.innerHTML

            if(nums.includes(val)) {

                if (numArray.length === 0 && val == 0) {
                    console.log("cannot push");
                } else {
                    if(operator == undefined) {
                        numArray.push(val)
                        num1 = numArray.join("")
                        screen.value = parseInt(num1).toLocaleString()
                    
                        if(val != 0) {
                            btnOperators.forEach(btn => {
                            btn.disabled = false
                            }) 
                        }
                    } else {
                        numArray.push(val)
                        num2 = numArray.join("")
                        screen.value = parseInt(num2).toLocaleString()

                    }
                }



            } else if(operators.includes(val)) {

                if(firstInput.innerHTML) {
                    operator = val

                    if(firstInput.innerHTML && parseInt(screen.value) > 0) {
                        firstInput.innerHTML = getResult(parseInt(firstInput.innerHTML),parseInt(screen.value), operator)
                        screen.value = operator
                        numArray = []
                    } else {
                        screen.value = operator
                        numArray = []
                    }
                } else {
                    operator = val
                    num1 = numArray.join("")
                    firstInput.innerHTML = num1
                    screen.value = operator
                    numArray = []
                }

            } else if(val === "=") {
                null
            } else if(val === "RESET") {
                num1 = num2 = operator = ""
                numArray = []
                screen.value = 0
                firstInput.innerHTML = ""
                btnOperators.forEach(btn => {
                    btn.disabled = true
                }) 
            } else if(val === "DEL") {
                if(screen.value != operator) {
                    numArray.pop()
                    console.log(num1);
                    if(numArray.length !== 0) {
                        num1 = numArray.join("")
                        screen.value = parseInt(num1).toLocaleString()
                    } else {
                        screen.value = 0  
                        btnOperators.forEach(btn => {
                            btn.disabled = true
                        })        
                    }
                } else {
                    firstInput.innerHTML = ""
                    screen.value = parseInt(num1).toLocaleString()
                }
            }

        })
    })
}

getNum1()

const getNum2 = () => {

}

const getOperator = () => {

}

const getResult = (num1, num2, operator) => {

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