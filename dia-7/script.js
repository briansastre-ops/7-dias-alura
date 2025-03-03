function suma(a, b) {
    return a + b
  }
  
  function resta(a, b) {
    return a - b
  }
  
  function multiplicacion(a, b) {
    return a * b
  }
  
  function division(a, b) {
    if (b === 0) {
      return "Error: División por cero no permitida"
    }
    return a / b
  }
  
  // Clase Calculadora para manejar la lógica
  class Calculadora {
    constructor() {
      this.currentOperand = "0"
      this.previousOperand = ""
      this.operation = undefined
      this.historial = []
      this.initElements()
      this.initEventListeners()
      this.loadHistoryFromLocalStorage()
    }
  
    initElements() {
      this.currentOperandElement = document.getElementById("current-operand")
      this.previousOperandElement = document.getElementById("previous-operand")
      this.historyListElement = document.getElementById("history-list")
      this.numberButtons = document.querySelectorAll("[data-number]")
      this.operationButtons = document.querySelectorAll("[data-operation]")
      this.equalsButton = document.getElementById("equals")
      this.clearButton = document.getElementById("clear")
      this.deleteButton = document.getElementById("delete")
      this.clearHistoryButton = document.getElementById("clear-history")
    }
  
    initEventListeners() {
      this.numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
          this.appendNumber(button.getAttribute("data-number"))
          this.updateDisplay()
        })
      })
  
      this.operationButtons.forEach((button) => {
        button.addEventListener("click", () => {
          this.chooseOperation(button.getAttribute("data-operation"))
          this.updateDisplay()
        })
      })
  
      this.equalsButton.addEventListener("click", () => {
        this.compute()
        this.updateDisplay()
      })
  
      this.clearButton.addEventListener("click", () => {
        this.clear()
        this.updateDisplay()
      })
  
      this.deleteButton.addEventListener("click", () => {
        this.delete()
        this.updateDisplay()
      })
  
      this.clearHistoryButton.addEventListener("click", () => {
        this.clearHistory()
      })
  
      // Agregar soporte para teclado
      document.addEventListener("keydown", (e) => {
        if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
          this.appendNumber(e.key)
        } else if (e.key === "+") {
          this.chooseOperation("suma")
        } else if (e.key === "-") {
          this.chooseOperation("resta")
        } else if (e.key === "*") {
          this.chooseOperation("multiplicacion")
        } else if (e.key === "/") {
          e.preventDefault()
          this.chooseOperation("division")
        } else if (e.key === "Enter" || e.key === "=") {
          e.preventDefault()
          this.compute()
        } else if (e.key === "Escape") {
          this.clear()
        } else if (e.key === "Backspace") {
          this.delete()
        }
        this.updateDisplay()
      })
    }
  
    appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return
      if (this.currentOperand === "0" && number !== ".") {
        this.currentOperand = number
      } else {
        this.currentOperand += number
      }
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === "Error: División por cero no permitida") return
      if (this.currentOperand === "") return
  
      if (this.previousOperand !== "") {
        this.compute()
      }
  
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ""
    }
  
    compute() {
      if (this.operation === undefined || this.previousOperand === "" || this.currentOperand === "") return
  
      const prev = Number.parseFloat(this.previousOperand)
      const current = Number.parseFloat(this.currentOperand)
      let result
  
      switch (this.operation) {
        case "suma":
          result = suma(prev, current)
          break
        case "resta":
          result = resta(prev, current)
          break
        case "multiplicacion":
          result = multiplicacion(prev, current)
          break
        case "division":
          result = division(prev, current)
          break
        default:
          return
      }
  
      // Formatear la operación para el historial
      const operationSymbol = this.getOperationSymbol(this.operation)
      const operationText = `${prev} ${operationSymbol} ${current}`
  
      // Agregar al historial solo si no es un error
      if (typeof result === "number") {
        this.addToHistory(operationText, result)
        this.currentOperand = result.toString()
      } else {
        this.currentOperand = result // Para errores como división por cero
      }
  
      this.operation = undefined
      this.previousOperand = ""
    }
  
    getOperationSymbol(operation) {
      switch (operation) {
        case "suma":
          return "+"
        case "resta":
          return "−"
        case "multiplicacion":
          return "×"
        case "division":
          return "÷"
        default:
          return ""
      }
    }
  
    addToHistory(operation, result) {
      const historyItem = { operation, result }
      this.historial.unshift(historyItem) // Agregar al inicio para mostrar los más recientes primero
  
      // Limitar el historial a 10 elementos
      if (this.historial.length > 10) {
        this.historial.pop()
      }
  
      this.updateHistoryDisplay()
      this.saveHistoryToLocalStorage()
    }
  
    updateHistoryDisplay() {
      this.historyListElement.innerHTML = ""
      this.historial.forEach((item) => {
        const li = document.createElement("li")
        li.innerHTML = `
                  <span class="operation">${item.operation}</span>
                  <span class="result">${item.result}</span>
              `
        this.historyListElement.appendChild(li)
      })
    }
  
    saveHistoryToLocalStorage() {
      localStorage.setItem("calculatorHistory", JSON.stringify(this.historial))
    }
  
    loadHistoryFromLocalStorage() {
      const savedHistory = localStorage.getItem("calculatorHistory")
      if (savedHistory) {
        this.historial = JSON.parse(savedHistory)
        this.updateHistoryDisplay()
      }
    }
  
    clearHistory() {
      this.historial = []
      this.updateHistoryDisplay()
      localStorage.removeItem("calculatorHistory")
    }
  
    clear() {
      this.currentOperand = "0"
      this.previousOperand = ""
      this.operation = undefined
    }
  
    delete() {
      if (this.currentOperand === "Error: División por cero no permitida") {
        this.currentOperand = "0"
        return
      }
  
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
      if (this.currentOperand === "") {
        this.currentOperand = "0"
      }
    }
  
    getDisplayNumber(number) {
      if (number === "Error: División por cero no permitida") return number
  
      const stringNumber = number.toString()
      const integerDigits = Number.parseFloat(stringNumber.split(".")[0])
      const decimalDigits = stringNumber.split(".")[1]
  
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ""
      } else {
        integerDisplay = integerDigits.toLocaleString("es-ES", { maximumFractionDigits: 0 })
      }
  
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand)
  
      if (this.operation != null) {
        const operationSymbol = this.getOperationSymbol(this.operation)
        this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${operationSymbol}`
      } else {
        this.previousOperandElement.textContent = ""
      }
    }
  }
  
  // Inicializar la calculadora cuando el DOM esté cargado
  document.addEventListener("DOMContentLoaded", () => {
    new Calculadora()
  })
  
  