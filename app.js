//Basic Calculator application
//Class with various methods to call in order to conduct operations
class Calculator {
    constructor(previousOperandTxtElement, currentOperandTxtElement){
        this.previousOperandTxtElement = previousOperandTxtElement
        this.currentOperandTxtElement = currentOperandTxtElement
        this.clear()
    }
//updates display with empty string to clear display
    clear(){
        this.currentOperand = ' '
        this.previousOperand = ' '
        this.operation = undefined
    }
//deletes last item in display 
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
//places number in display converts to string and checks for only one decimal allowed in display
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
//select operation on the document
    chooseOperation(operation) {
        if(this.currentOperand === " ") return
        if(this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
//add all inner text elements convert to float and execute operation
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '/': 
                computation = prev / current
                break
            default: 
                return
    
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
//obtain current and previous element innerText and display in display area
    updateDisplay() {
        this.currentOperandTxtElement.innerText = this.currentOperand
        if(this.operation != null){
            this.previousOperandTxtElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        }
    }
}
//create document elements for eventlistner
//numbers, operations, equals, delete, all clear, previous and current
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTxtElement = document.querySelector('[data-previous-operand]');
const currentOperandTxtElement = document.querySelector('[data-current-operand]');
//call calculator class and use previous and current elements
const calculator = new Calculator(previousOperandTxtElement, currentOperandTxtElement)
//loop thru each button for obtain numbers for innerText of element and listen for click
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
//loop thru each document elements to obtain operations listen for click  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
//listen for click on document element and call compute and update display area
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})
//listen for click in document and clear data and update display
allClearButton.addEventListener('click', button => {
    calculator.clear()   
    calculator.updateDisplay()
})
//listen for click in document and delete on item for display and update display
deleteButton.addEventListener('click', button => {
    calculator.delete()   
    calculator.updateDisplay()
})